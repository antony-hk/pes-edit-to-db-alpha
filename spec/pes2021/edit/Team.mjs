import {
    booleanFunc,
    offByOneFunc,
} from '../../common.mjs';

export const recordLength = 0x24C;
export const isFullyCovered = false;
export const format = [
    // 0x00
    { key: 'teamId',    startByte: 0x00, length: 4 },
    // 0x04
    { key: 'coachId',   startByte: 0x04, length: 4 },
    // 0x08
    { key: 'emblemImageListIndex',  startByte: 0x08, length: 2, isSigned: true },  // 65535 = unset
    { key: 'stadiumId',             startByte: 0x0A, length: 2, isSigned: true },
    // 0x0C
    { key: 'stadiumImageListIndex', startByte: 0x0C, length: 2, isSigned: true },
    { key: 'countryId',             startByte: 0x0E, length: 2 },
    // 0x10
    { key: 'callnameId',            startByte: 0x10, length: 2, isSigned: true },   // 65535 = default, 65534 = off
    // 0x14
    { key: 'teamColor1R',            startByte: 0x16, startBit: 2, lengthInBit: 6 },
    { key: 'teamColor1G',            startByte: 0x17, startBit: 0, lengthInBit: 6 },
    { key: 'isAtLeastOneNameEdited', startByte: 0x17, startBit: 6, lengthInBit: 1, booleanFunc },
    { key: 'isEmblemImageSet',       startByte: 0x17, startBit: 7, lengthInBit: 1, booleanFunc },
    // 0x18
    { key: 'teamColor2G',         startByte: 0x18, startBit: 0, lengthInBit: 6 },
    { key: 'teamColor2B',         startByte: 0x18, startBit: 6, lengthInBit: 6 },
    { key: 'backdropColorR',      startByte: 0x19, startBit: 4, lengthInBit: 6 },
    { key: 'backdropColorG',      startByte: 0x1A, startBit: 2, lengthInBit: 6 },
    { key: 'backdropColorB',      startByte: 0x1B, startBit: 0, lengthInBit: 6 },
    { key: 'isStadiumNameEdited', startByte: 0x1B, startBit: 7, lengthInBit: 1, ...booleanFunc },
    // 0x1C
    { key: 'goalStyle',     startByte: 0x1C, startBit: 0, lengthInBit: 2, ...offByOneFunc }, // Goal style (-1)
    { key: 'turfPattern',   startByte: 0x1C, startBit: 4, lengthInBit: 4 }, // turf style
    { key: 'sidelineColor', startByte: 0x1D, startBit: 0, lengthInBit: 4 }, // sideline color
    { key: 'seatColor',     startByte: 0x1D, startBit: 4, lengthInBit: 4 }, // seat color
    { key: 'teamColor1B',   startByte: 0x1E, startBit: 0, lengthInBit: 6 },
    { key: 'teamColor2R',   startByte: 0x1E, startBit: 6, lengthInBit: 6 },
    { key: 'netPattern',    startByte: 0x1F, startBit: 4, lengthInBit: 1, ...offByOneFunc },
    // 0x20
    { key: 'isStadiumImageSet',  startByte: 0x20, startBit: 6, lengthInBit: 1, ...booleanFunc },
    { key: 'isBannerEdited',     startByte: 0x21, startBit: 2, lengthInBit: 1, ...booleanFunc },
    { key: 'isSponsorEdited',    startByte: 0x21, startBit: 5, lengthInBit: 1, ...booleanFunc },
    { key: 'isBackdropColorSet', startByte: 0x21, startBit: 6, lengthInBit: 1, ...booleanFunc },
    // 0x24
    { key: 'sponsor1ImageListIndex',  startByte: 0x24, length: 4 },
    // 0x28
    { key: 'sponsor2ImageListIndex',  startByte: 0x28, length: 4 },
    // 0x2C
    { key: 'sponsor3ImageListIndex',  startByte: 0x2C, length: 4 },
    // 0x30 ... 0x54
    { key: 'uniformIds', startByte: 0x30, length: 4, arrayLength: 10 },
    // 0x58
    { key: 'rivalTeamId1', startByte: 0x58, lengthInBit: 18, isSinged: true }, // -1 = unset
    // 0x5C
    { key: 'rivalTeamId2', startByte: 0x5C, lengthInBit: 18, isSinged: true }, // -1 = unset
    // 0x60
    { key: 'rivalTeamId3', startByte: 0x60, lengthInBit: 18, isSinged: true }, // -1 = unset
    // 0x64
    { key: 'banner1Pointer', startByte: 0x64, length: 1 },  // This value should always be 0
    { key: 'banner2Pointer', startByte: 0x65, length: 1 },  // If banner 2 exists, this value should be 1
    { key: 'banner3Pointer', startByte: 0x66, length: 1 },  // If banner 3 exists, this value should be 2
    { key: 'banner4Pointer', startByte: 0x67, length: 1 },  // If banner 4 exists, this value should be 3

    { key: 'teamName',  startByte: 0x68, length: 70, isString: true },
    { key: 'shortName', startByte: 0xAE, length: 4,  isString: true },
    { key: 'stadiumName',         startByte: 0xB2, length: 120, isString: true }, // Length is not yet validated
    { key: 'banner1', startByte: 0x167, length: 16, isString: true },
    { key: 'banner2', startByte: 0x177, length: 16, isString: true },
    { key: 'banner3', startByte: 0x187, length: 16, isString: true },
    { key: 'banner4', startByte: 0x197, length: 16, isString: true },
    { key: 'emblemImageFileName', startByte: 0x1A7, length: 32, isString: true },  // Length is not yet validated
    { key: 'stadiumImageFileName', startByte: 0x1C8, length: 32, isString: true }, // Length is not yet validated
    { key: 'sponsor1ImageFileName', startByte: 0x1E9, length: 32, isString: true }, // Length is not yet validated
    { key: 'sponsor2ImageFileName', startByte: 0x20A, length: 32, isString: true }, // Length is not yet validated
    { key: 'sponsor3ImageFileName', startByte: 0x22B, length: 32, isString: true }, // Length is not yet validated

];
export default format;
