import {
    booleanFunc,
} from '../../common.mjs';

export const recordLength = 0x11C;
export const isFullyCovered = true;
export const format = [
    { key: 'teamId',         startByte: 0x0248 - 0x0248, length: 4 },
    { key: 'playerIds',      startByte: 0x024C - 0x0248, length: 4, isArray: true, arrayLength: 40 },
    { key: 'shirtNumbers',   startByte: 0x02EC - 0x0248, length: 2, isArray: true, arrayLength: 40 },
    { key: 'areTransferred', startByte: 0x03AC - 0x02B8, length: 1, isArray: true, arrayLength: 40, ...booleanFunc },
];
export default format;
