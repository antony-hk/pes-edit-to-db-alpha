export const isFullyCovered = true;

function shirtNumberGetter(input) {
    return input + 1;
}

function shirtNumberSetter(input) {
    return input - 1;
}

export const recordLength = 0x10;

export const format = [
    { key: 'entryId',  startByte: 0x00, length: 4 },

    { key: 'playerId', startByte: 0x04, length: 4 },

    { key: 'teamId',   startByte: 0x08, length: 4 },

    { key: 'shirtNumber',  startByte: 0x0C, startBit: 0,  lengthInBit: 10, getter: shirtNumberGetter, setter: shirtNumberSetter },
    { key: 'orderNumber',  startByte: 0x0C, startBit: 10, lengthInBit: 6 },
    { key: 'rightCkTaker', startByte: 0x0C, startBit: 16, lengthInBit: 1 },
    { key: 'shortFkTaker', startByte: 0x0C, startBit: 17, lengthInBit: 1 },
    { key: 'leftCkTaker',  startByte: 0x0C, startBit: 18, lengthInBit: 1 },
    { key: 'longFkTaker',  startByte: 0x0C, startBit: 19, lengthInBit: 1 },
    { key: 'pkTaker',      startByte: 0x0C, startBit: 20, lengthInBit: 1 },
    { key: 'captain',      startByte: 0x0C, startBit: 21, lengthInBit: 1 },
    // { key: 'empty2',       startByte: 0x0C, startBit: 22, lengthInBit: 10 },
];

export function sortFn(a, b) {
    if (a.teamId !== b.teamId) {
        return (a.teamId - b.teamId);
    }

    return (a.entryId - b.entryId);
}
