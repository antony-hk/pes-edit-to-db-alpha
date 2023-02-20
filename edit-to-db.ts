import * as denoPath from "https://deno.land/std@0.168.0/path/mod.ts";
import mkdirp from 'npm:mkdirp';

import * as SpecEditData2021PC from './spec/pes2021/edit/EditDataPC.mjs';
import {
    Formation as EditedFormation,
    Instructions,
    Positioning,
    PresetSettings
} from './spec/pes2020/edit/Tactics.ts';
// import * as DbPlayerFormat from './spec/pes2021/pesdb/Player.ts';
import * as DbPlayerAssignmentFormat from './spec/pes2021/pesdb/PlayerAssignment.mjs';
import * as DbTacticsFormat from './spec/pes2021/pesdb/Tactics.ts';
import { Tactics } from './spec/pes2021/pesdb/Tactics.ts';
import * as DbTacticsFormationFormat from './spec/pes2021/pesdb/TacticsFormation.ts';
import { TacticsFormation } from './spec/pes2021/pesdb/TacticsFormation.ts';
import loadData from './utils/loadData.ts';
import saveData from './utils/saveData.ts';
import relativePath from './utils/relativePath.ts';

const SKIP_DISABLED_FLUID_FORMATIONS = false;

const pesXdecrypterPath = relativePath('third_party', 'pesXdecrypter_2021', 'decrypter21.exe');
const tempEncryptedEditFilePath = relativePath('temp', 'EDIT00000000');
const tempDecryptedEditDirPath = relativePath('temp', 'EDIT00000000_decrypt');

// https://stackoverflow.com/questions/39494689/is-it-possible-to-restrictnumber-to-a-certain-range/70307091#70307091
type Opaque<name, T> = T & { _type: name };

type PlayerId = Opaque<'PlayerId', number>;
type TypedPlayerId = Opaque<'TypedPlayerId', number>;
type TeamId = Opaque<'TeamId', number>;
export type TypedTeamId = Opaque<'TypedTeamId', number>;

type EditedPlayerAssignment = {
    teamId: TypedTeamId;
    playerIds: TypedPlayerId[];
    shirtNumbers: number[];
    areTransferred: boolean[];
};
type EditedPlayerAssignments = EditedPlayerAssignment[];

type DbPlayerAssignment = {
    entryId: number;
    playerId: TypedPlayerId;
    teamId: TypedTeamId;
    shirtNumber: number;
    orderNumber: number;
    rightCkTaker: boolean;
    leftCkTaker: boolean;
    shortFkTaker: boolean;
    longFkTaker: boolean;
    pkTaker: boolean;
    captain: boolean;
};
type DbTacticses = Tactics[];
type DbTacticsFormations = TacticsFormation[];

function generateTacticsFromPreset(
    teamId: TypedTeamId,
    targetTacticsId: number,
    strategyType: 0 | 1,
    preset: {
        positioning: Positioning[];
        instructions: Instructions;
        settings: PresetSettings;
    }
) {
    const { positioning, instructions, settings } = preset;

    const generatedTactics: Tactics = {
        tacticId: targetTacticsId,
        teamId,
        strategyType: strategyType,

        attackingStyle: !!instructions['反攻/控球遊戲'],
        buildUp: !!instructions['長傳/短傳'],
        attackingArea: !!instructions['側翼/中央'],
        positioning: !!instructions['保持隊形/彈性'],
        defensiveStyle: !!instructions['前線施壓/全體球員防守'],
        containmentArea: !!instructions['防守中央/側翼'],
        pressuring: !!instructions['積極性/防守'],

        supportRange: settings['支援'],
        defensiveLine: settings['防線'],
        compactness: settings['嚴密'],
    };

    let allFormationsSame = true;
    for (let i = 0; i < 11 && allFormationsSame; i++) {
        allFormationsSame = 
            (positioning[0].placements[i].x === positioning[1].placements[i].x) &&
            (positioning[1].placements[i].x === positioning[2].placements[i].x) &&
            (positioning[0].placements[i].y === positioning[1].placements[i].y) &&
            (positioning[1].placements[i].y === positioning[2].placements[i].y);
    }
    const numNeededFormations = (
        allFormationsSame ||
        (!settings.isFluidFormationEnabled && SKIP_DISABLED_FLUID_FORMATIONS)
    ) ? 1 : 3;

    const generatedTacticsFormations: TacticsFormation[] = [];
    for (let i = 0; i < numNeededFormations; i++) {
        for (let j = 0 ; j < 11; j++) {
            const generatedTacticsFormation: TacticsFormation = {
                tacticId: targetTacticsId,
                positionRole: positioning[i].positions[j],
                xPos: positioning[i].placements[j].x,
                yPos: positioning[i].placements[j].y,
                formationIndex: i,
                playerAssignmentOrderNumber: j,
            };
            generatedTacticsFormations.push(generatedTacticsFormation);
        }
    }

    return {
        tactics: generatedTactics,
        tacticsFormations: generatedTacticsFormations,
    }; 
}

function applyFormationsToDb(
    inputEditData: { playerAssignments: EditedPlayerAssignments, formations: EditedFormation[] },
    inputDbData: {
        playerAssignments: DbPlayerAssignment[],
        tacticses: DbTacticses,
        tacticsFormations: DbTacticsFormations
    },
) {
    const { formations, playerAssignments: editedPlayerAssignments } = inputEditData;
    let {
        playerAssignments: dbPlayerAssignments,
        tacticses,
        tacticsFormations,
    } = inputDbData;

    const occupiedTacticsIdSet = new Set<number>();
    const formationsMap = new Map<TypedTeamId, EditedFormation>();

    tacticses.forEach(t => occupiedTacticsIdSet.add(t.tacticId));

    for (let i = 0; i < formations.length; i++) {
        const formation = formations[i];

        if (!formation || formation.teamId === 262143) {
            continue;   
        }
        
        const {
            teamId: typedTeamId,
            preset1Formations,
            preset1Instructions,
            preset1Settings,
            preset2Formations,
            preset2Instructions,
            preset2Settings,
            preset3Formations,
            preset3Instructions,
            preset3Settings,
        } = formation;

        formationsMap.set(typedTeamId, formation);

        // Remove original tactics for the team
        const tacticsIdsToRemove = tacticses.filter(dbt => dbt.teamId === typedTeamId).map(dbt => dbt.tacticId);
        tacticses = tacticses.filter(tactics => tactics.teamId !== typedTeamId);
        tacticsFormations = tacticsFormations.filter(tf => tacticsIdsToRemove.indexOf(tf.tacticId) === -1);

        const presets = [
            {
                positioning: preset1Formations,
                instructions: preset1Instructions,
                settings: preset1Settings,
            },
            {
                positioning: preset2Formations,
                instructions: preset2Instructions,
                settings: preset2Settings,
            },
            {
                positioning: preset3Formations,
                instructions: preset3Instructions,
                settings: preset3Settings,
            },
        ];

        const numDbAllowedPresets = 2;
        const candidateTacticsIds = tacticsIdsToRemove.slice();
        for (let ii = candidateTacticsIds.length; ii < numDbAllowedPresets; ii++) {
            for (let candidate = 1; !candidateTacticsIds[ii]; candidate++) {
                if (!occupiedTacticsIdSet.has(candidate)) {
                    candidateTacticsIds[ii] = candidate;
                    occupiedTacticsIdSet.add(candidate);
                }
            }
        }

        presets.forEach((preset, presetIndex) => {
            if (presetIndex >= numDbAllowedPresets) {
                return;
            }

            const {
                tactics: generatedTactics,
                tacticsFormations: generatedTacticsFormations
            } = generateTacticsFromPreset(
                typedTeamId,
                candidateTacticsIds[presetIndex],
                (presetIndex === 0) ? 0 : 1,
                preset
            );

            tacticses.push(generatedTactics);
            tacticsFormations.push(...generatedTacticsFormations);
        });
    }

    // const editedPlayerAssignmentMap = new Map<TypedTeamId, EditedPlayerAssignment>();
    const generatedDbPlayerAssignments: DbPlayerAssignment[] = [];
    const maxInputDbPlayerAssignmentEntryId = Math.max(...dbPlayerAssignments.map(r => r.entryId));

    for (let i = 0; i < editedPlayerAssignments.length; i++) {
        const record = editedPlayerAssignments[i];
        const {
            playerIds,
            shirtNumbers,
            teamId, 
        } = record;

        if (teamId === 262143) {
            continue;
        }

        const {
            longFkTaker: longFkTakerIndex,
            shortFkTaker: shortFkTakerIndex,
            // secondFkTaker: secondFkTakerIndex,
            leftCkTaker: leftCkTakerIndex,
            rightCkTaker: rightCkTakerIndex,
            pkTaker: pkTakerIndex,
            captain: captainIndex,
            playerOrders,
        } = formationsMap.get(teamId)!;

        // editedPlayerAssignmentMap.set(teamId, record);

        playerIds.forEach((playerId, index) => {
            if (playerId) {
                generatedDbPlayerAssignments.push({
                    entryId: maxInputDbPlayerAssignmentEntryId + index + 1,
                    playerId,
                    teamId,
                    shirtNumber: shirtNumbers[index],
                    orderNumber: playerOrders.indexOf(index),
                    rightCkTaker: index === rightCkTakerIndex,
                    leftCkTaker: index === leftCkTakerIndex,
                    longFkTaker: index === longFkTakerIndex,
                    shortFkTaker: index === shortFkTakerIndex,
                    pkTaker: index === pkTakerIndex,
                    captain: index === captainIndex
                });
            }
        });

        // dbPlayerAssignments = dbPlayerAssignments.filter((dbpa) => dbpa.teamId !== teamId);
    }

    // dbPlayerAssignments.push(...generatedDbPlayerAssignments);

    return {
        playerAssignments: generatedDbPlayerAssignments,
        tacticses,
        tacticsFormations,
    };
}

export default async function main(
    editFilePath = relativePath('sample_input/EDIT00000000'),
    baseDbPath = relativePath('sample_input/pesdb'),
    outputDbPath = relativePath('output/pesdb'),
) {
    console.log({
        editFilePath,
        baseDbPath,
        outputDbPath,
    });
    // Copy edit file to temp
    await Deno.copyFile(editFilePath, tempEncryptedEditFilePath);

    // Decrypt edit file
    await Deno.mkdir(tempDecryptedEditDirPath, { recursive: true });

    // TODO: Rewrite the decrypt stuff to make it work on the OS other than Windows
    const subprocess = Deno.run({
        cmd: [pesXdecrypterPath, tempEncryptedEditFilePath, tempDecryptedEditDirPath]
    });
    await subprocess.status();

    console.time('Load files');
    const editDataPath = denoPath.join(tempDecryptedEditDirPath, 'data.dat');

    const [
        [{ playerAssignments: editedPlayerAssignments, tactics: editedTactics }],
        // players,
        playerAssignments,
        tacticses,
        tacticsFormations,
    ] = await Promise.all([
        loadData(editDataPath, SpecEditData2021PC) as Promise<{
            playerAssignments: EditedPlayerAssignments;
            tactics: EditedFormation[];
        }[]>,
        // loadData(relativePath(([baseDbPath, 'Player.bin']), DbPlayerFormat),
        loadData(denoPath.join(baseDbPath, 'PlayerAssignment.bin'), DbPlayerAssignmentFormat),
        loadData(denoPath.join(baseDbPath, 'Tactics.bin'), DbTacticsFormat) as Promise<DbTacticses>,
        loadData(denoPath.join(baseDbPath, 'TacticsFormation.bin'), DbTacticsFormationFormat) as Promise<DbTacticsFormations>,
    ]);
    console.timeEnd('Load files');

    const result = applyFormationsToDb(
        { playerAssignments: editedPlayerAssignments, formations: editedTactics },
        { playerAssignments: playerAssignments, tacticses: tacticses, tacticsFormations: tacticsFormations }
    );
    
    console.time('Save files');
    mkdirp.sync(denoPath.join(outputDbPath));
    // await saveData(relativePath('./output/pesdb/Player.bin'), DbPlayerFormat, players);
    await saveData(denoPath.join(outputDbPath, 'PlayerAssignment.bin'), DbPlayerAssignmentFormat, result.playerAssignments);
    await saveData(denoPath.join(outputDbPath, 'Tactics.bin'), DbTacticsFormat, result.tacticses);
    await saveData(denoPath.join(outputDbPath, 'TacticsFormation.bin'), DbTacticsFormationFormat, result.tacticsFormations);
    console.timeEnd('Save files');
}
