// import {Buffer} from 'https://deno.land/std/io/buffer.ts';
import { equal } from "https://deno.land/x/equal@v1.5.0/mod.ts";

const WESYS_UINT8ARRAY = new TextEncoder().encode('WESYS');

// export const isZlibbed = (buf: Uint8Array) => {
//     return false;
// };

export const isZlibbedFile = (file: Deno.FsFile) => {
    // TODO: Not yet tested with DB files
    // Deno.seek(file.rid, 3, Deno.SeekMode.Start);
    file.seek(3, Deno.SeekMode.Start);
    const comparingBuf = new Uint8Array(5);
    file.read(comparingBuf);

    return equal(WESYS_UINT8ARRAY, comparingBuf);
};
