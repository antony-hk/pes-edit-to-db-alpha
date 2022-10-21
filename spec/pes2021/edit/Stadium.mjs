export const recordLength = 0xBC;
export const isFullyCovered = false;
export const format = [
    { key: 'stadiumId', startByte: 0x00, startBit: 0, lengthInBit: 16, isSigned: true },
    { key: 'stadiumName', startByte: 0x04, length: 0xB8, isString: true },
];
export default format;
