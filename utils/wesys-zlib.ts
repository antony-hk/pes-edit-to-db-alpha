import { equal } from 'https://deno.land/x/equal@v1.5.0/mod.ts';
import { unzlib as denoflateUnzlib } from 'https://deno.land/x/denoflate@1.2.1/mod.ts';

const WESYS_UINT8ARRAY = new TextEncoder().encode('WESYS');

export const isZlibbedFile = async (file: Deno.FsFile) => {
    file.seek(3, Deno.SeekMode.Start);
    const comparingBuf = new Uint8Array(5);
    await file.read(comparingBuf);

    return equal(WESYS_UINT8ARRAY, comparingBuf);
};

export const isZlibbedBuf = (buf: Uint8Array) => {
    return equal(WESYS_UINT8ARRAY, buf.slice(0x03, 0x08));
};

export const unzlib = (buf: Uint8Array) => {
    return denoflateUnzlib(buf.slice(0x10));
};
