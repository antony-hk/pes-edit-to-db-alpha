import {
    booleanFunc,
} from '../../common.mjs';

// Based on PS4 ted files
export const recordLength = 0x58;
export const isFullyCovered = true;
export const format = [
    // 0x00
    { key: 'coachId', startByte: 0x00, length: 4 },
    // 0x04
    { key: 'countryId', startByte: 0x04, length: 2 },
    { key: 'imageListIndex', startByte: 0x06, length: 2, isSigned: true }, // -1 = unset
    // 0x08
    { key: 'isCoachNameModified', startByte: 0x08, startBit: 0, lengthInBit: 1, ...booleanFunc },
    { key: 'isImageSet', startByte: 0x08, startBit: 2, lengthInBit: 1, ...booleanFunc },
    { key: 'isFromLiveUpdate', startByte: 0x08, startBit: 7, lengthInBit: 1, ...booleanFunc },
    // string
    { key: 'coachName', startByte: 0x09, isString: true, length: 46 },
    { key: 'imageFileName', startByte: 0x37, isString: true, length: 33 },
];
export default format;
