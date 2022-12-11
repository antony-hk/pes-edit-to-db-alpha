export default function (buf) {
    return (Buffer.from('WESYS', 'utf8').compare(buf.slice(0x03, 0x03 + 5)) === 0);
}
