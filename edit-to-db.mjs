// import childProcess from 'child_process';
// import commandLineArgs from 'command-line-args';
import fs from 'fs';
import mkdirp from 'mkdirp';

import * as SpecEditData2021PC from './spec/pes2021/edit/EditDataPC.mjs';
import loadData from './utils/loadData.mjs';
import relativePath from './utils/relativePath.mjs';

// const optionDefintiions = [
//     { name: 'edit', alias: 'e', type: String, defaultOption: true },
//     { name: 'input', alias: 'i', type: String },
//     { name: 'output', alias: 'o', type: String },
// ];

// const pesXdecrypterPath = relativePath('./lib/pesXdecrypter_2021/decrypter21.exe');
const tempEncryptedEditFilePath = relativePath('./temp/EDIT00000000');
const tempDecryptedEditDirPath = relativePath('./temp/EDIT00000000_decrypt');

export default function main(
    editFilePath = relativePath('./sample_input/EDIT00000000'),
    baseDbPath,
    outputDbPath
) {
    // Copy edit file to temp
    fs.copyFileSync(editFilePath, tempEncryptedEditFilePath);

    // Decrypt edit file
    mkdirp.sync(tempDecryptedEditDirPath);
    childProcess.execSync(`"${pesXdecrypterPath}" "${tempEncryptedEditFilePath}" "${tempDecryptedEditDirPath}"`);

    const editDataPath = `${tempDecryptedEditDirPath}/data.dat`;
    const result = loadData(editDataPath, SpecEditData2021PC);
    const {
        players: editPlayers
    } = loadData(editDataPath, SpecEditData2021PC);

    console.log(result);
}

// (async function main() {
//     const {
//         edit: editFilePath,
//         input: inputFilePath,
//         output: outputFilePath,
//     } = commandLineArgs(optionDefintiions);
// })();


// // import loadData from 'pes-ted/bin/common/loadData.mjs';
// // import { relativePath } from 'pes-ted/bin/utils/fs-helper.mjs';

// // const pesXdecrypterPath = relativePath('../others/pesXdecrypter_2021/decrypter21.exe');
// // const customizedTacticsJsonPath = 'C:\\git\\pes-ted-data\\wehk\\pes2021\\EvoWebTactics.json';
// // const customizedPlayerAssignmentJsonPath = 'C:\\git\\pes-ted-data\\wehk\\pes2021\\EvoWebPlayerAssignment.json';
// // // ----------------------------------------------------------------------------
// // const filePaths = [
// //     'D:\\temp\\EvoWeb Patch 2021 3.0\\EDIT00000000', // 000
// // ];
// // // ----------------------------------------------------------------------------
// // const tacticsMap = new Map();
// // // ----------------------------------------------------------------------------
// // const filterFns = [];
// // filterFns[0] = (teamId) => {
// //     return [
// //         111,    // OMONOIA
// //         199,    // LUDOGORETS
// //         203,    // LECH POZNAŃ
// //         325,    // HNK RIJEKA
// //         368,    // ZORYA LUHANSK
// //         1589,   // RAPID WIEN
// //         1981,   // CRVENA ZVEZDA
// //         2293,   // BORUSSIA DORTMUND
// //         2297,   // VfL WOLFSBURG
// //         2298,   // TSG HOFFENHEIM
// //         2300,   // RB LEIPZIG
// //         2301,   // BORUSSIA M'GLADBACH
// //         2344,   // FC AUGSBURG
// //         2345,   // CSKA SOFIA
// //         2346,   // UNION BERLIN
// //         2347,   // SC FREIBURG
// //         2348,   // WERDER BREMEN
// //         2349,   // HERTHA BSC
// //         2350,   // FC SALZBURG
// //         2351,   // MAINZ 05
// //         2352,   // VfB STUTTGART
// //         2353,   // FERENCVÁROS
// //         2354,   // 1. FC KÖLN
// //         2355,   // ARMINIA BIELEFELD
// //         2356,   // EINTRACHT FRANKFURT
// //         2382,   // MOLDE
// //         4077,   // CFR CLUJ
// //         4143,   // LASK LINZ
// //         4240,   // QARABAG
// //         4938,   // WOLFSBERGER AC
// //         5127,   // DUNDALK
// //         5225,   // SLOVAN LIBEREC
// //         5301,   // MACCABI TEL AVIV
// //         5346,   // HAPOEL BE'ER SHEVA

// //         2357,   // WORLD ALL STARS
// //     ].indexOf(teamId) !== -1;
// // };

// // for (let i = 0; i < filePaths.length; i++) {
// //     const filePath = filePaths[i];

// //     // Decrypt edit file
// //     const encryptedEditFilePath = filePath;
// //     const decryptedEditDirPath = `${filePath}_decrypt`;
// //     mkdirp.sync(decryptedEditDirPath);

// //     const editDataPath = `${decryptedEditDirPath}/data.dat`;

// //     if (!fs.existsSync(editDataPath)) {
// //         console.log(`"${pesXdecrypterPath}" "${encryptedEditFilePath}" "${decryptedEditDirPath}"`);
// //         childProcess.execSync(`"${pesXdecrypterPath}" "${encryptedEditFilePath}" "${decryptedEditDirPath}"`);
// //     }

// //     const result = loadData(editDataPath, EditData2021PcFormat);
// //     const {
// //         playerAssignments,
// //         tactics,
// //         // teams,
// //     } = result[0];

// //     const filterFn = filterFns[i];

// //     const playerAssignmentMap = new Map();

// //     for (let ii = 0; ii < playerAssignments.length; ii++) {
// //         const { teamId: typedTeamId } = playerAssignments[ii];
// //         if (filterFn(typedTeamId)) {
// //             playerAssignmentMap.set(typedTeamId, playerAssignments[ii]);
// //         }
// //     }

// //     for (let ii = 0; ii < tactics.length; ii++) {
// //         const tactic = tactics[ii];

// //         if (!tactic) {
// //             continue;   // eslint-disable-line no-continue
// //         }

// //         if (!filterFn(tactic.teamId)) {
// //             continue;   // eslint-disable-line no-continue
// //         }

// //         const {
// //             teamId: typedTeamId,
// //             longFkTaker: longFkTakerIndex,
// //             shortFkTaker: shortFkTakerIndex,
// //             secondFkTaker: secondFkTakerIndex,
// //             leftCkTaker: leftCkTakerIndex,
// //             rightCkTaker: rightCkTakerIndex,
// //             pkTaker: pkTakerIndex,
// //             captain: captainIndex,
// //             preset1Formations,
// //             preset1Instructions,
// //             preset1Settings,
// //             // preset2Formations,
// //             // preset2Instructions,
// //             // preset2Settings,
// //             // preset3Formations,
// //             // preset3Instructions,
// //             // preset3Settings,
// //             playerOrders,
// //         } = tactic;

// //         // const actualTeamId = typedTeamId % 16384;

// //         const {
// //             playerIds: typedPlayerIds,
// //             shirtNumbers,
// //         } = playerAssignmentMap.get(typedTeamId);
// //         const reorderedTypedPlayerIds = playerOrders.map((index) => {
// //             return typedPlayerIds[index];
// //         });
// //         const reorderedShirtNumbers = playerOrders.map((index) => {
// //             return shirtNumbers[index];
// //         });

// //         const longFkTakerPlayerId = typedPlayerIds[longFkTakerIndex];
// //         const shortFkTakerPlayerId = typedPlayerIds[shortFkTakerIndex];
// //         const secondFkTakerPlayerId = typedPlayerIds[secondFkTakerIndex];
// //         const leftCkTakerPlayerId = typedPlayerIds[leftCkTakerIndex];
// //         const rightCkTakerPlayerId = typedPlayerIds[rightCkTakerIndex];
// //         const pkTakerPlayerId = typedPlayerIds[pkTakerIndex];
// //         const captainPlayerId = typedPlayerIds[captainIndex];

// //         const outputPlayerIds = [];
// //         const outputShirtNumbers = [];

// //         reorderedTypedPlayerIds.forEach((typedPlayerId, iii) => {
// //             if (typedPlayerId) {
// //                 outputPlayerIds.push(typedPlayerId);
// //                 outputShirtNumbers.push(reorderedShirtNumbers[iii]);
// //             }
// //         });

// //         const presets = [
// //             {
// //                 formations: preset1Formations,
// //                 instruction: preset1Instructions,
// //                 settings: preset1Settings,
// //             },
// //             // {
// //             //     formations: preset2Formations,
// //             //     instructions: preset2Instructions,
// //             //     settings: preset2Settings,
// //             // },
// //             // {
// //             //     formations: preset3Formations,
// //             //     instructions: preset3Instructions,
// //             //     settings: preset3Settings,
// //             // },
// //         ];

// //         const outputFormationForTeam = [];

// //         for (let t = 0; t < presets.length; t++) {
// //             const preset = presets[t];
// //             const {
// //                 formations,
// //                 instruction,
// //                 settings,
// //             } = preset;

// //             const outputPositionForPreset = [];

// //             for (let tt = 0; tt < 3; tt++) {
// //                 const {
// //                     positions,
// //                     placements,
// //                 } = formations[tt];

// //                 outputPositionForPreset[tt] = [];

// //                 for (let ttt = 0; ttt < 11; ttt++) {
// //                     outputPositionForPreset[tt][ttt] = [positions[ttt], placements[ttt].x, placements[ttt].y];
// //                 }
// //                 outputPositionForPreset[tt] = JSON.stringify(outputPositionForPreset[tt]);
// //             }

// //             outputFormationForTeam.push({
// //                 position: outputPositionForPreset,
// //                 instruction: instruction,
// //                 settings: settings,
// //             });
// //         }

// //         tacticsMap.set(typedTeamId, {
// //             playerIds: JSON.stringify(outputPlayerIds),
// //             shirtNumbers: JSON.stringify(outputShirtNumbers),
// //             longFkTakerPlayerId,
// //             shortFkTakerPlayerId,
// //             secondFkTakerPlayerId,
// //             leftCkTakerPlayerId,
// //             rightCkTakerPlayerId,
// //             pkTakerPlayerId,
// //             captainPlayerId,
// //             formation: outputFormationForTeam,
// //         });
// //     }
// // }

// // // console.log(tacticsMap);

// // fs.writeFileSync(customizedTacticsJsonPath, JSON.stringify(Array.from(tacticsMap), null, 2));
