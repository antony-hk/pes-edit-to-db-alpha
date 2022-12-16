import * as Bitten from 'npm:bitten';
import { Buffer as NpmBuffer } from 'npm:buffer';

import {
    isZlibbedBuf,
    unzlib,
} from './wesys-zlib.ts';

export default async function loadData(
    filePath: string,
    Format: any,
    isBigEndian = false
) {
    console.log(`Load data: ${filePath}`);

    const file = await Deno.open(filePath);
    const {size: fileSize} = await file.stat();
    let buf = new Uint8Array(fileSize);
    await file.seek(0, Deno.SeekMode.Start);
    await file.read(buf);

    if (isZlibbedBuf(buf)) {
        buf = await unzlib(buf);
    }

    const npmBuf = NpmBuffer.from(buf);
    const rawResult = Bitten.toJS(
        npmBuf,
        Format.recordLength,
        Format.format,
        !Format.isFullyCovered,
        isBigEndian,
    );

    let result = rawResult;

    if (Format.sortFn) {
        result = rawResult.slice(); // Shallow copy
        result.sort(Format.sortFn);

        // Reserved code for testing sorting function.
        //
        // for (let i = 0; i < result.length; i++) {
        //     if (rawResult[i].playerId !== result[i].playerId) {
        //         console.log('not ok', rawResult[i], result[i]);
        //     }
        // }
    }

    if (Format.isFullyCovered) {
        const regenResult = Bitten.fromJS(result, Format.recordLength, Format.format, isBigEndian);

        if (npmBuf.compare(regenResult) !== 0) {
            const regenFilePath = `${filePath}_regen`;
            console.warn([
                `Warning: Format is not fully covered. A regenerated binary file "${regenFilePath}" is written for debugging.`,
                `On Windows, you can run the following command to compare two binary files.`,
                `   fc "${filePath}" "${regenFilePath}" /b`   // TODO: The command maybe incorrect, need to be verified.
            ].join('\n'));
            await Deno.writeFile(`${filePath}_regen`, regenResult);
        }
    }

    return result;
}
