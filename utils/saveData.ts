import * as Bitten from 'npm:bitten';

import { zlib } from './wesys-zlib.ts';

export default async function saveData(
    filePath: string,
    Format: any,
    data: any,
    shouldZlib = false,
    isBigEndian = false
) {
    if (Format.sortFn) {
        data = data.slice();    // Shallow copy
        data.sort(Format.sortFn);
    }

    const bitten = Bitten.fromJS(data, Format.recordLength, Format.format, isBigEndian);

    console.log(`Save file: ${filePath}`);
    if (shouldZlib) {
        await Deno.writeFile(filePath, zlib(bitten));
    } else {
        await Deno.writeFile(filePath, bitten);
    }
}
