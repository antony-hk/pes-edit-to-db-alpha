export const recordLength = 0x2F8;
export const isFullyCovered = false;
export const format = [
    { key: 'competitionRegulationId', startByte: 0x00, startBit: 0, lengthInBit: 16 },

    // 0x68
    { key: 'competitionId', startByte: 0x68 - 0x50, startBit: 0,  lengthInBit: 16, isSigned: true },
    { key: 'imageListIndex', startByte: 0x68 - 0x50, startBit: 16, lengthInBit: 16, isSigned: true },

    // 0x6C

    // 0x70
    { key: 'isNameModified',   startByte: 0x70 - 0x50, startBit: 5, lengthInBit: 1 },
    { key: 'isImageSet',       startByte: 0x70 - 0x50, startBit: 6, lengthInBit: 1 },
    { key: 'isBallModified',   startByte: 0x70 - 0x50, startBit: 7, lengthInBit: 1 },

    { key: 'competitionName', startByte: 0x22, length: 0x72, isString: true },
    { key: 'compeSubName1', startByte: 0x22 + 0x73, length: 0x72, isString: true },
    { key: 'compeSubName2', startByte: 0x22 + 0x73 + 0x72, length: 0x72, isString: true },

    { key: 'competitionImageFileName', startByte: 0x324 - 0x50, length: 36, isString: true },
];
export default format;
