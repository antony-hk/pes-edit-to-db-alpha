// import childProcess from 'child_process';
// import commandLineArgs from 'command-line-args';
// import fs from 'fs';
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

// const optionDefintiions = [
//     { name: 'edit', alias: 'e', type: String, defaultOption: true },
//     { name: 'input', alias: 'i', type: String },
//     { name: 'output', alias: 'o', type: String },
// ];

const pesXdecrypterPath = relativePath('./lib/pesXdecrypter_2021/decrypter21.exe');
const tempEncryptedEditFilePath = relativePath('./temp/EDIT00000000');
const tempDecryptedEditDirPath = relativePath('./temp/EDIT00000000_decrypt');

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
    longFkTaker: boolean;
    pkTaker: boolean;
    captain: boolean;
};
type DbTacticses = Tactics[];
type DbTacticsFormations = TacticsFormation[];

function generateTacticsFromPreset(
    teamId: TypedTeamId,
    targetTacticsId: number,
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

        strategyType: false,    // TODO: Missing in edit

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
    // console.log(generatedTactics);

    const generatedTacticsFormations: TacticsFormation[] = [];
    for (let ii = 0 ; ii < 11; ii++) {
        const generatedTacticsFormation: TacticsFormation = {
            tacticId: targetTacticsId,
            positionRole: positioning[0].positions[ii],
            xPos: positioning[0].placements[ii].x,
            yPos: positioning[0].placements[ii].y,
            formationIndex: 0,
            playerAssignmentOrderNumber: ii
        };
        generatedTacticsFormations.push(generatedTacticsFormation);
    }

    return {
        tactics: generatedTactics,
        tacticsFormations: generatedTacticsFormations,
    }; 
}

async function applyFormationsToDb(
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

        // Fill tacticsIds
        const candidateTacticsIds = tacticsIdsToRemove.slice();
        for (let ii = candidateTacticsIds.length; ii < presets.length; ii++) {
            for (let candidate = 1; !candidateTacticsIds[ii]; candidate++) {
                // console.log('hi', candidate);
                if (!occupiedTacticsIdSet.has(candidate)) {
                    candidateTacticsIds[ii] = candidate;
                    occupiedTacticsIdSet.add(candidate);
                }
            }
        }

        presets.forEach((preset, presetIndex) => {
            const {
                tactics: generatedTactics,
                tacticsFormations: generatedTacticsFormations
            } = generateTacticsFromPreset(
                typedTeamId,
                candidateTacticsIds[presetIndex],
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
            // shortFkTaker: shortFkTakerIndex,
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
                const playerOrderIndex = playerOrders.indexOf(index);
                generatedDbPlayerAssignments.push({
                    entryId: maxInputDbPlayerAssignmentEntryId + index + 1,
                    playerId,
                    teamId,
                    shirtNumber: shirtNumbers[index],
                    orderNumber: playerOrderIndex,
                    rightCkTaker: playerOrderIndex === rightCkTakerIndex,
                    leftCkTaker: playerOrderIndex === leftCkTakerIndex,
                    longFkTaker: playerOrderIndex === longFkTakerIndex,
                    pkTaker: playerOrderIndex === pkTakerIndex,
                    captain: playerOrderIndex === captainIndex
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
    editFilePath = relativePath('./input/EDIT00000000'),
    // baseDbPath,
    // outputDbPath
) {
    // Copy edit file to temp
    await Deno.copyFile(editFilePath, tempEncryptedEditFilePath);

    // Decrypt edit file
    await Deno.mkdir(tempDecryptedEditDirPath, { recursive: true });

    // TODO: Rewrite the decrypt stuff to make it work on the OS other than Windows
    await Deno.run({
        cmd: [pesXdecrypterPath, tempEncryptedEditFilePath, tempDecryptedEditDirPath]
    });

    console.time('Load files');
    const editDataPath = `${tempDecryptedEditDirPath}/data.dat`;

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
        // loadData(relativePath('./input/pesdb/Player.bin'), DbPlayerFormat),
        loadData(relativePath('./input/pesdb/PlayerAssignment.bin'), DbPlayerAssignmentFormat),
        loadData(relativePath('./input/pesdb/Tactics.bin'), DbTacticsFormat) as Promise<DbTacticses>,
        loadData(relativePath('./input/pesdb/TacticsFormation.bin'), DbTacticsFormationFormat) as Promise<DbTacticsFormations>,
    ]);
    console.timeEnd('Load files');

    // console.log(editedTactics);

    const result = await applyFormationsToDb(
        { playerAssignments: editedPlayerAssignments, formations: editedTactics },
        { playerAssignments: playerAssignments, tacticses: tacticses, tacticsFormations: tacticsFormations }
    );

    // Requirements:
    // * Tactics
    // * TacticsFormations
    // * Players?
    // * PlayerAssignments
    
    // console.log(players);
    // console.log(playerAssignments);
    // console.log(tacticses);
    // console.log(tacticsFormations);
    // let result;
    
    // result = await temp(editedTactics, { tacticses, tacticsFormations });
    
    mkdirp.sync(relativePath('./output/pesdb'));
    // await saveData(relativePath('./output/pesdb/Player.bin'), DbPlayerFormat, players);
    console.time('Save PlayerAssignment.bin');
    await saveData(relativePath('./output/pesdb/PlayerAssignment.bin'), DbPlayerAssignmentFormat, result.playerAssignments);
    console.timeEnd('Save PlayerAssignment.bin');
    await saveData(relativePath('./output/pesdb/Tactics.bin'), DbTacticsFormat, result.tacticses);
    await saveData(relativePath('./output/pesdb/TacticsFormation.bin'), DbTacticsFormationFormat, result.tacticsFormations);
    
}
