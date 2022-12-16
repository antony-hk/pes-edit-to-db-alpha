// import childProcess from 'child_process';
// import commandLineArgs from 'command-line-args';
// import fs from 'fs';
import mkdirp from 'npm:mkdirp';

import * as SpecEditData2021PC from './spec/pes2021/edit/EditDataPC.mjs';
import * as DbPlayerFormat from './spec/pes2021/pesdb/Player.ts';
import * as DbPlayerAssignmentFormat from './spec/pes2021/pesdb/PlayerAssignment.mjs';
import * as DbTacticsFormat from './spec/pes2021/pesdb/Tactics.ts';
import * as DbTacticsFormationFormat from './spec/pes2021/pesdb/TacticsFormation.ts';
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

    const editDataPath = `${tempDecryptedEditDirPath}/data.dat`;
    const {
        // players: editedPlayers,
        tactics: editedTactics,
        // ...others
    } = (await loadData(editDataPath, SpecEditData2021PC))[0];

    // const players = await loadData(relativePath('./input/pesdb/Player.bin'), DbPlayerFormat);
    const playerAssignments = await loadData(relativePath('./input/pesdb/PlayerAssignment.bin'), DbPlayerAssignmentFormat);
    const tacticses = await loadData(relativePath('./input/pesdb/Tactics.bin'), DbTacticsFormat);
    const tacticsFormations = await loadData(relativePath('./input/pesdb/TacticsFormation.bin'), DbTacticsFormationFormat);
    
    // Requirements:
    // * Tactics
    // * TacticsFormations
    // * Players?
    // * PlayerAssignments
    
    // console.log(players);
    console.log(playerAssignments);
    console.log(tacticses);
    console.log(tacticsFormations);
    // let result;
    
    // result = await temp(editedTactics, { tacticses, tacticsFormations });
    
    mkdirp.sync(relativePath('./output/pesdb'));
    // await saveData(relativePath('./output/pesdb/Player.bin'), DbPlayerFormat, players);
    await saveData(relativePath('./output/pesdb/PlayerAssignment.bin'), DbPlayerAssignmentFormat, playerAssignments);
    await saveData(relativePath('./output/pesdb/Tactics.bin'), DbTacticsFormat, tacticses);
    await saveData(relativePath('./output/pesdb/TacticsFormation.bin'), DbTacticsFormationFormat, tacticsFormations);
    
}
