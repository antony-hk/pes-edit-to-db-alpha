import {
    booleanFunc,
} from '../../common.mjs';

const TED_FIRST_KIT_OFFSET = 0x05B0;
const TED_FIRST_KIT_OFFSET_2020 = 0x648;

function shortNumberSideGetter(input) {
    switch (input) {
        case 0:
            return null;
        case 1:
            return 'L';
        case 2:
            return 'R';
        default:
            return null;
    }
}

function shortNumberSideSetter(input) {
    switch (input) {
        case 'L':
            return 1;
        case 'R':
            return 2;
        default:
            return 0;
    }
}

export const recordLength = 0x84;
export const isFullyCovered = false;

export const format = [
    { key: 'uniformId', startByte: 0x00, length: 4 },
    { key: 'imageListIndex', startByte: (0x05B4 - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 11, isSigned: true }, // 2047 = unset
    { key: 'isCollarModified', startByte: (0x05C7 - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 1 },
    { key: 'isMarkingModified', startByte: (0x05CF - TED_FIRST_KIT_OFFSET), startBit: 6, lengthInBit: 1 },
    { key: 'isImageSet', startByte: (0x05CF - TED_FIRST_KIT_OFFSET), startBit: 7, lengthInBit: 1, ...booleanFunc },
    { key: 'hasChestNumber', startByte: (0x05D7 - TED_FIRST_KIT_OFFSET), startBit: 7, lengthInBit: 1 },
    { key: 'nameR', startByte: (0x05E9 - TED_FIRST_KIT_OFFSET), startBit: 4, lengthInBit: 6 },
    { key: 'nameG', startByte: (0x05EA - TED_FIRST_KIT_OFFSET), startBit: 2, lengthInBit: 6 },
    { key: 'nameB', startByte: (0x05EB - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 6 },
    { key: 'numberR', startByte: (0x05EE - TED_FIRST_KIT_OFFSET), startBit: 2, lengthInBit: 6 },
    { key: 'numberG', startByte: (0x05EF - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 6 },
    { key: 'numberB', startByte: (0x05F0 - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 6 },
    { key: 'chestNumberR', startByte: (0x05F3 - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 6 },
    { key: 'chestNumberG', startByte: (0x05F4 - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 6 },
    { key: 'chestNumberB', startByte: (0x05F4 - TED_FIRST_KIT_OFFSET), startBit: 6, lengthInBit: 6 },
    { key: 'shortNumberR', startByte: (0x05F8 - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 6 },
    { key: 'shortNumberG', startByte: (0x05F8 - TED_FIRST_KIT_OFFSET), startBit: 6, lengthInBit: 6 },
    { key: 'shortNumberB', startByte: (0x05F9 - TED_FIRST_KIT_OFFSET), startBit: 4, lengthInBit: 6 },
    { key: 'collar', startByte: (0x05FC - TED_FIRST_KIT_OFFSET), startBit: 6, lengthInBit: 4, getter: (input) => (input + 1), setter: (input) => (input - 1) },
    { key: 'namePosition', startByte: (0x05FF - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 6 },    // From +0 to +39 (愈大愈高)
    { key: 'nameSize', startByte: (0x05B7 - TED_FIRST_KIT_OFFSET), startBit: 3, lengthInBit: 5, getter: (input) => (input - 10), setter: (input) => (input + 10) }, // From -10 to +10
    { key: 'nameFontStyle', startByte: (0x0601 - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 4, getter: (input) => (input + 1), setter: (input) => (input - 1) },
    { key: 'numberPosition', startByte: (0x601 - TED_FIRST_KIT_OFFSET), startBit: 5, lengthInBit: 5 },  // From +0 to +29 (愈大愈高)
    { key: 'numberSize', startByte: (0x602 - TED_FIRST_KIT_OFFSET), startBit: 2, lengthInBit: 5, getter: (input) => (input - 14), setter: (input) => (input + 14) }, // From -14 to +14
    { key: 'numberFontStyle', startByte: (0x0602 - TED_FIRST_KIT_OFFSET), startBit: 7, lengthInBit: 4, getter: (input) => (input + 1), setter: (input) => (input - 1) },
    { key: 'nameArcStyle', startByte: (0x0603 - TED_FIRST_KIT_OFFSET), startBit: 4, lengthInBit: 2, getter: (input) => (input + 1), setter: (input) => (input - 1) },
    { key: 'shortNumberVPos', startByte: (0x605 - TED_FIRST_KIT_OFFSET), startBit: 2, lengthInBit: 5 }, // From +0 to +29 (愈大愈高)
    { key: 'shortNumberHPos', startByte: (0x605 - TED_FIRST_KIT_OFFSET), startBit: 7, lengthInBit: 5 },   // From +0 to +29 (愈大愈外)
    { key: 'shortNumberSize', startByte: (0x606 - TED_FIRST_KIT_OFFSET), startBit: 4, lengthInBit: 5, getter: (input) => (input - 14), setter: (input) => (input + 14) }, // From -14 to +14
    { key: 'shortNumberSide', startByte: (0x608 - TED_FIRST_KIT_OFFSET), startBit: 5, lengthInBit: 2, getter: shortNumberSideGetter, setter: shortNumberSideSetter },

    { key: 'isImageSmall', startByte: (0x05D3 - TED_FIRST_KIT_OFFSET), startBit: 6, lengthInBit: 1, ...booleanFunc }, // 1 if the image is 1024x1024
    { key: 'imageFileName', startByte: (0x0612 - TED_FIRST_KIT_OFFSET), length: 32, isString: true },
    { key: 'shirtR', startByte: (0x05C7 - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 6 },
    { key: 'shirtG', startByte: (0x0609 - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 6 },
    { key: 'shirtB', startByte: (0x0609 - TED_FIRST_KIT_OFFSET), startBit: 6, lengthInBit: 6 },
    { key: 'shortR', startByte: (0x05D0 - TED_FIRST_KIT_OFFSET), startBit: 6, lengthInBit: 6 },
    { key: 'shortG', startByte: (0x05D1 - TED_FIRST_KIT_OFFSET), startBit: 4, lengthInBit: 6 },
    { key: 'shortB', startByte: (0x05D2 - TED_FIRST_KIT_OFFSET), startBit: 2, lengthInBit: 6 },
    { key: 'sockR', startByte: (0x05D9 - TED_FIRST_KIT_OFFSET), startBit: 4, lengthInBit: 6 },
    { key: 'sockG', startByte: (0x05DA - TED_FIRST_KIT_OFFSET), startBit: 2, lengthInBit: 6 },
    { key: 'sockB', startByte: (0x05DB - TED_FIRST_KIT_OFFSET), startBit: 0, lengthInBit: 6 },

    { key: 'shirtDesign1R', startByte: (0x660 - TED_FIRST_KIT_OFFSET_2020), startBit: 0,  lengthInBit: 6 },
    { key: 'shirtDesign1G', startByte: (0x660 - TED_FIRST_KIT_OFFSET_2020), startBit: 6,  lengthInBit: 6 },
    { key: 'shirtDesign1B', startByte: (0x660 - TED_FIRST_KIT_OFFSET_2020), startBit: 12, lengthInBit: 6 },

    { key: 'hasShirtName', startByte: (0x66F - TED_FIRST_KIT_OFFSET_2020), startBit: 6, lengthInBit: 1 },

    { key: 'chestNumberHPos', startByte: (0x69C - TED_FIRST_KIT_OFFSET_2020), startBit: 0, lengthInBit: 5 }, // From +0 to +29
    { key: 'chestNumberSize', startByte: (0x69C - TED_FIRST_KIT_OFFSET_2020), startBit: 5, lengthInBit: 5, getter: (input) => (input - 14), setter: (input) => (input + 14) }, // From -14 to +14

    { key: 'chestNumberVPos', startByte: (0x6A0 - TED_FIRST_KIT_OFFSET_2020), startBit: 0, lengthInBit: 5 }, // From +0 to +29
];
export default format;
