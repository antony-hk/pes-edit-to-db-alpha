import {
    booleanFunc,
} from '../../common.mjs';

import { format as playerAppearanceDataFormat } from '../player-appearance-data.mjs';

// Shared by PES2018 and PES2019
export default [
    // 0x00
    { key: 'playerId', startByte: 0x00, length: 4 },
    // 0x04
    { key: 'unknown1',          startByte: 0x04, startBit: 0, lengthInBit: 1, ...booleanFunc },
    { key: 'unknown2',          startByte: 0x04, startBit: 1, lengthInBit: 1, ...booleanFunc },
    { key: 'isPhysiqueChanged', startByte: 0x04, startBit: 2, lengthInBit: 1, ...booleanFunc },
    { key: 'unsafe_isBootsOrGloveChanged', startByte: 0x04, startBit: 3, lengthInBit: 1, ...booleanFunc },
    { key: 'bootsId',           startByte: 0x04, startBit: 4,  lengthInBit: 14 },
    { key: 'gloveId',           startByte: 0x04, startBit: 18, lengthInBit: 14 },
    // 0x08
    { key: 'relinkPlayerId', startByte: 0x08, length: 3 },
    // 0x0C
    { key: 'playerAppearanceData', startByte: 0x0C, length: 0x38, subFormat: playerAppearanceDataFormat },
];
