import {
    booleanFunc,
} from '../../common.mjs';

export const recordLength = 0x0C;
export const isFullyCovered = true;
export const format = [
    { key: 'dataPackMajorVersion', startByte: 0x00, length: 2 },
    { key: 'dataPackMinorVersion', startByte: 0x02, length: 2 },
    { key: 'dataPackPatchVersion', startByte: 0x04, length: 2 },
    { key: 'unknown1',   startByte: 0x06, length: 2 },
    { key: 'isLicensedTeam', startByte: 0x08, length: 2, ...booleanFunc },
    { key: 'unknown3',   startByte: 0x0A, length: 2 },
];
export default format;
