import * as Bitten from 'npm:bitten';
import { Buffer as NpmBuffer } from 'npm:buffer';

import { isZlibbedFile } from './wesys-zlib.ts';

export default async function loadData(
    dbFilePath: string,
    Format: any,
    isBigEndian = false
) {
    console.log(`Load data: ${dbFilePath}`);

    const file = await Deno.open(dbFilePath);

    if (isZlibbedFile(file)) {
        // TODO: Unzlib the file
        throw new Error('TODO: Unzlib the file');
    }

    const {size: fileSize} = await file.stat();
    const buf = new Uint8Array(fileSize);
    await file.seek(0, Deno.SeekMode.Start);
    await file.read(buf);

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
            const regenFilePath = `${dbFilePath}_regen`;
            console.warn([
                `Warning: Format is not fully covered. A regenerated binary file "${regenFilePath}" is written for debugging.`,
                `On Windows, you can run the following command to compare two binary files.`,
                `   fc "${dbFilePath}" "${regenFilePath}" /b`   // TODO: The command maybe incorrect, need to be verified.
            ].join('\n'));
            await Deno.writeFile(`${dbFilePath}_regen`, regenResult);
        }
    }

    return result;
}
