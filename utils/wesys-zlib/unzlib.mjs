import zlib from 'zlib';

export default function (buf) {
    return zlib.inflateSync(buf.slice(0x10));
}
