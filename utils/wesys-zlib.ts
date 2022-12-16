import { Buffer as NpmBuffer } from 'npm:buffer';
import { equal } from 'https://deno.land/x/equal@v1.5.0/mod.ts';
import {
    zlib as denoflateZlib,
    unzlib as denoflateUnzlib
} from 'https://deno.land/x/denoflate@1.2.1/mod.ts';

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

export const zlib = (buf: Uint8Array) => {
    const zlibbed = denoflateZlib(buf, undefined);

    const wesysHeader = NpmBuffer.alloc(0x10);
    wesysHeader.writeUInt8(0xFF, 0x00);
    wesysHeader.writeUInt8(0x10, 0x01);
    wesysHeader.writeUInt8(0x01, 0x02);
    wesysHeader.writeUInt8(0x01, 0x02);
    NpmBuffer.from(WESYS_UINT8ARRAY).copy(wesysHeader, 0x03);
    wesysHeader.writeUInt32LE(zlibbed.length, 0x08);
    wesysHeader.writeUInt32LE(buf.length, 0x08);

    return Uint8Array.from(NpmBuffer.concat([wesysHeader, buf]));
};

export const unzlib = (buf: Uint8Array) => {
    return denoflateUnzlib(buf.slice(0x10));
};
