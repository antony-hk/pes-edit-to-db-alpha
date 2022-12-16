export const isFullyCovered = true;

export const recordLength = 0x0C;

export function sortFn(a: TacticsFormation, b: TacticsFormation) {
    if (a.tacticId !== b.tacticId) {
        // Ascending
        return (a.tacticId - b.tacticId);
    }

    if (a.formationIndex !== b.formationIndex) {
        // Ascending
        return (a.formationIndex - b.formationIndex);
    }

    // Ascending
    return (a.playerAssignmentOrderNumber - b.playerAssignmentOrderNumber);
}

export type TacticsFormation = {
    tacticId: number;   // TODO: Rename to `tacticsId`
    positionRole: number;
    xPos: number;
    yPos: number;
    playerAssignmentOrderNumber: number;
    formationIndex: number;
};
export const format = [
    { key: 'tacticId',    startByte: 0x00, length: 4 },
    { key: 'positionRole', startByte: 0x04, length: 4 },

    { key: 'xPos',      startByte: 0x08, startBit: 0, lengthInBit: 8 },
    { key: 'yPos',      startByte: 0x08, startBit: 8, lengthInBit: 8 },

    { key: 'playerAssignmentOrderNumber',    startByte: 0x08, startBit: 16,  lengthInBit: 4 },
    { key: 'formationIndex', startByte: 0x08, startBit: 20,  lengthInBit: 4 },
    // { key: 'padding',        startByte: 0x08, startBit: 24,  lengthInBit: 8 },
];
