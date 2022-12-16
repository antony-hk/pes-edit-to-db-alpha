// import childProcess from 'child_process';
// import commandLineArgs from 'command-line-args';
// import fs from 'fs';
import mkdirp from 'npm:mkdirp';

import * as SpecEditData2021PC from './spec/pes2021/edit/EditDataPC.mjs';
import { Formation as EditedFormation } from './spec/pes2020/edit/Tactics.ts';
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

type EditedFormations = EditedFormation[];

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
type DbTacticses = Record<string, any>;
type DbTacticsFormations = Record<string, any>;

async function applyFormationsToDb(
    inputEditData: { playerAssignments: EditedPlayerAssignments, formations: EditedFormations },
    inputDbData: {
        playerAssignments: DbPlayerAssignment[],
        tacticses: DbTacticses,
        tacticsFormations: DbTacticsFormations
    },
) {
    const { formations, playerAssignments: editedPlayerAssignments } = inputEditData;
    const { playerAssignments: dbPlayerAssignments } = inputDbData;
    // console.log(formations);

    const editedPlayerAssignmentMap = new Map<TypedTeamId, EditedPlayerAssignment>();
    const generatedDbPlayerAssignments: DbPlayerAssignment[] = [];
    const maxInputDbPlayerAssignmentEntryId = Math.max(...dbPlayerAssignments.map(r => r.entryId));

    for (let i = 0; i < editedPlayerAssignments.length; i++) {
        const record = editedPlayerAssignments[i];
        const {
            playerIds,
            shirtNumbers,
            teamId, 
        } = record;

        if (teamId !== 262143) {
            editedPlayerAssignmentMap.set(teamId, record);

            playerIds.forEach((playerId, index) => {
                if (playerId) {
                    generatedDbPlayerAssignments.push({
                        entryId: maxInputDbPlayerAssignmentEntryId+index+1,
                        playerId,
                        teamId,
                        shirtNumber: shirtNumbers[index],
                        orderNumber: 0,
                        rightCkTaker: false,
                        leftCkTaker: false,
                        longFkTaker: false,
                        pkTaker: false,
                        captain: false
                    });
                }
            })
        }
    }

    for (let i = 0; i < formations.length; i++) {
        const formation = formations[i];

        if (!formation || formation.teamId === 262143) {
            continue;   
        }
        
        const {
            teamId: typedTeamId,
            longFkTaker: longFkTakerIndex,
            shortFkTaker: shortFkTakerIndex,
            secondFkTaker: secondFkTakerIndex,
            leftCkTaker: leftCkTakerIndex,
            rightCkTaker: rightCkTakerIndex,
            pkTaker: pkTakerIndex,
            captain: captainIndex,
            preset1Formations,
            preset1Instructions,
            preset1Settings,
            preset2Formations,
            preset2Instructions,
            preset2Settings,
            preset3Formations,
            preset3Instructions,
            preset3Settings,
            playerOrders,
        } = formation;

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

        presets.forEach(({ positioning, instructions, settings }) => {
            const generatedTactics: Tactics = {
                tacticId: NaN,  // TODO
                teamId: typedTeamId,
    
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
            console.log(generatedTactics);

            for (let ii = 0 ; ii < 11; ii++) {
                const generatedTacticsFormation: TacticsFormation = {
                    tacticId: NaN,  // TODO
                    positionRole: positioning.positions[ii],
                    xPos: positioning.placements[ii].x,
                    yPos: positioning.placements[ii].y,
                    formationIndex: 0,
                    playerAssignmentOrderNumber: ii
                };
                console.log(generatedTacticsFormation);
            }
        });

        // const {
        //     playerIds: typedPlayerIds,
        //     shirtNumbers,
        // } = editedPlayerAssignmentMap.get(typedTeamId)!;
        // const reorderedTypedPlayerIds = playerOrders.map((index) => {
        //     return typedPlayerIds[index];
        // });
        // const reorderedShirtNumbers = playerOrders.map((index) => {
        //     return shirtNumbers[index];
        // });

        // const longFkTakerPlayerId = typedPlayerIds[longFkTakerIndex];
        // const shortFkTakerPlayerId = typedPlayerIds[shortFkTakerIndex];
        // const secondFkTakerPlayerId = typedPlayerIds[secondFkTakerIndex];
        // const leftCkTakerPlayerId = typedPlayerIds[leftCkTakerIndex];
        // const rightCkTakerPlayerId = typedPlayerIds[rightCkTakerIndex];
        // const pkTakerPlayerId = typedPlayerIds[pkTakerIndex];
        // const captainPlayerId = typedPlayerIds[captainIndex];
    }
}

export default async function main(
    editFilePath = relativePath('./input/EDIT00000000'),
    baseDbPath,
    outputDbPath
) {
    // Copy edit file to temp
    await Deno.copyFile(editFilePath, tempEncryptedEditFilePath);

    // Decrypt edit file
    await Deno.mkdir(tempDecryptedEditDirPath, { recursive: true });

    // TODO: Rewrite the decrypt stuff to make it work on the OS other than Windows
    // await Deno.run({
    //     cmd: [pesXdecrypterPath, tempEncryptedEditFilePath, tempDecryptedEditDirPath]
    // });

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
            tactics: EditedFormations;
        }[]>,
        // loadData(relativePath('./input/pesdb/Player.bin'), DbPlayerFormat),
        loadData(relativePath('./input/pesdb/PlayerAssignment.bin'), DbPlayerAssignmentFormat),
        loadData(relativePath('./input/pesdb/Tactics.bin'), DbTacticsFormat) as Promise<DbTacticses>,
        loadData(relativePath('./input/pesdb/TacticsFormation.bin'), DbTacticsFormationFormat) as Promise<DbTacticsFormations>,
    ]);
    console.timeEnd('Load files');

    console.log(editedTactics);

    applyFormationsToDb(
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
    await saveData(relativePath('./output/pesdb/PlayerAssignment.bin'), DbPlayerAssignmentFormat, playerAssignments);
    await saveData(relativePath('./output/pesdb/Tactics.bin'), DbTacticsFormat, tacticses);
    await saveData(relativePath('./output/pesdb/TacticsFormation.bin'), DbTacticsFormationFormat, tacticsFormations);
    
}
