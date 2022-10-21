// TODO: Investigate in the future
export const format = [
    {
        key: 'neckLength',
        startByte: 0x00,    // 0x178
        startBit: 0,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'neckSize',
        startByte: 0x00,
        startBit: 4,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'shoulderHeight',
        startByte: 0x00,
        startBit: 8,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'shoulderWidth',
        startByte: 0x00,
        startBit: 12,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'chestMeasurement',
        startByte: 0x00,
        startBit: 16,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'waistSize',
        startByte: 0x00,
        startBit: 20,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'armSize',
        startByte: 0x00,
        startBit: 24,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'armLength',
        startByte: 0x00,
        startBit: 28,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'thighSize',
        startByte: 0x04,
        startBit: 0,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'calfSize',
        startByte: 0x04,
        startBit: 4,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'legLength',
        startByte: 0x04,
        startBit: 8,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },

    // Face --> Head Ratio / Skin Colour (Head related)
    {
        key: 'headLength',
        startByte: 0x04,
        startBit: 12,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'headWidth',
        startByte: 0x04,
        startBit: 16,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'headDepth',
        startByte: 0x04,
        startBit: 20,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },

    // Face --> Head Ratio / Skin Colour (Skin colour)
    {
        key: 'skinColor',
        startByte: 0x20,
        startBit: 8,
        lengthInBit: 4,
    },

    // Face --> Head Ratio / Skin Colour (Face size related)
    {
        key: 'faceSize',
        startByte: 0x24,
        startBit: 24,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
    {
        key: 'faceHeight',
        startByte: 0x24,
        startBit: 28,
        lengthInBit: 4,
        getter: (rawValue) => (rawValue - 7),
        setter: (rawValue) => (rawValue + 7),
    },
];
export const recordLength = 0x38;
