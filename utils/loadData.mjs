import fs from 'fs';
import * as Bitten from 'bitten';

import relativePath from './relativePath.mjs';
// import isZlibbed from 'pes-ted/bin/utils/wesys-zlib/isZlibbed.mjs';
// import unzlib from 'pes-ted/bin/utils/wesys-zlib/unzlib.mjs';

export default function loadData(dbFilePath, Format, isBigEndian = false) {
    console.log(`Load data: ${dbFilePath}`);

    let buf = fs.readFileSync(relativePath(dbFilePath));
    if (isZlibbed(buf)) {
        buf = unzlib(buf);
    }

    const rawResult = bin2obj(
        buf,
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
    const writeBackResult = obj2bin(result, Format.recordLength, Format.format, isBigEndian);

    if (Format.isFullyCovered && buf.compare(writeBackResult) !== 0) {
        console.warn('Warning: Format is not fully covered.');
        fs.writeFileSync(`${relativePath(dbFilePath)}_rewrite`, writeBackResult);
    }

    return rawResult;
}
