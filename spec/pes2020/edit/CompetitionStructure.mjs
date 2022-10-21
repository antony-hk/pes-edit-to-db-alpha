export const recordLength = 0x80;
export const isFullyCovered = true;
export const format = [
    { key: 'teamIds', startByte: 0x00, isArray: true, length: 4, arrayLength: 32 },
];
export default format;
