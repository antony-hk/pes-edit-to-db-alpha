import {
    offByOneFunc,
} from '../../../pes2020/format/common-utils.mjs';

export const isFullyCovered = true;

export const recordLength = 0x0C;

export function sortFn(a, b) {
    return (a.tacticId - b.tacticId);
};

export const format = [
    { key: 'tacticId',       startByte: 0x00, length: 4 },
    { key: 'teamId',          startByte: 0x04, length: 4 },

    // 0x08
    { key: 'compactness',     startByte: 0x08, startBit: 0, lengthInBit: 4, ...offByOneFunc },
    { key: 'supportRange',    startByte: 0x08, startBit: 4, lengthInBit: 4, ...offByOneFunc },
    { key: 'defensiveLine',   startByte: 0x08, startBit: 8, lengthInBit: 4, ...offByOneFunc },
    { key: 'unknown1',        startByte: 0x08, startBit: 12, lengthInBit: 4 },

    // 0x08
    { key: 'unknown2',          startByte: 0x08, startBit: 16, lengthInBit: 3 },
    { key: 'attackingNumber?',  startByte: 0x08, startBit: 19, lengthInBit: 2 },
    { key: 'defendingNumber?',  startByte: 0x08, startBit: 21, lengthInBit: 2 },

    // 1 bit - Positioning (0: Maintain Formation, 1: Flexible)
    { key: 'positioning',       startByte: 0x08, startBit: 23, lengthInBit: 1 },

    // 1 bit - Strategy Type (0: ATT, 1: DEF)
    { key: 'strategyType',      startByte: 0x08, startBit: 24, lengthInBit: 1 },

    // 1 bit - Attacking Styles (0: Counter Attack, 1: Possession Game)
    { key: 'attackingStyle',    startByte: 0x08, startBit: 25, lengthInBit: 1 },

    // 1 bit - Pressuring (0: Aggressive, 1: Conservative)
    { key: 'pressuring',        startByte: 0x08, startBit: 26, lengthInBit: 1 },

    // 1 bit - Containment Area (0: Middle, 1: Wide)
    { key: 'containmentArea',   startByte: 0x08, startBit: 27, lengthInBit: 1 },

    // 1 bit - Attacking Area (0: Wide, 1: Centre)
    { key: 'attackingArea',     startByte: 0x08, startBit: 28, lengthInBit: 1 },

    // 1 bit - Defensive Style (0: Frontline Pressure, 1: Allout Defence)
    { key: 'defensiveStyle',    startByte: 0x08, startBit: 29, lengthInBit: 1 },

    // 1 bit - Build Up (0: Long Pass, 1: Short Pass)
    { key: 'buildUp',           startByte: 0x08, startBit: 30, lengthInBit: 1 },
];
