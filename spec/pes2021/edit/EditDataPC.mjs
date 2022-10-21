import * as PlayerEditFormat from './Player.mjs';
import * as TeamEditFormat from './Team.mjs';
import * as CoachEditFormat from './Coach.mjs';
import * as CompetitionEditFormat from '../../pes2020/edit/Competition.mjs';
import * as StadiumEditFormat from './Stadium.mjs';
import * as UniformEditFormat from './Uniform.mjs';
import * as PlayerAssignmentEditFormat from './PlayerAssignment.mjs';
import * as CompetitionStructureEditFormat from '../../pes2020/edit/CompetitionStructure.mjs';
import * as OtherClubsStructureEditFormat from '../../pes2020/edit/OtherClubsStructure.mjs';
import * as TacticsEditFormat from './Tactics.mjs';

export const recordLength = 10995800;
export const isFullyCovered = false;

export const format = [
    { key: 'header',
        startByte: 0x00,
        length: 0x7C,
        subFormat: [
            { key: 'gameVersion',      startByte: 0x0C, length: 4 },
            { key: 'dataPackVersion',  startByte: 0x10, length: 4 },
            { key: 'dataPackVersion2', startByte: 0x14, length: 4 },
            { key: 'numTeams',         startByte: 0x64, length: 2 },
            { key: 'numCoaches',       startByte: 0x66, length: 2 },
            { key: 'numCompetitions',  startByte: 0x68, length: 2 },
            { key: 'numTeams2',        startByte: 0x70, length: 4 },
            { key: 'numTeams3',        startByte: 0x74, length: 4 },
        ],
    },
    { key: 'players',
        startByte: 0x7C,
        arrayLength: 30000,
        length: PlayerEditFormat.recordLength,
        subFormat: PlayerEditFormat.format,
    },
    { key: 'teams',
        startByte: 0x8ED2FC,
        arrayLength: 750,
        length: TeamEditFormat.recordLength,
        subFormat: TeamEditFormat.format,
    },
    { key: 'coaches',
        startByte: 0x958DA4,
        arrayLength: 1300,
        length: CoachEditFormat.recordLength,
        subFormat: CoachEditFormat.format,
    },
    { key: 'competitions',
        startByte: 0x974C84,
        arrayLength: 65,
        length: CompetitionEditFormat.recordLength, // 0x2F8
        subFormat: CompetitionEditFormat.format,
    },
    { key: 'stadiums',
        startByte: 0x980D7C,
        arrayLength: 65,
        length: StadiumEditFormat.recordLength,
        subFormat: StadiumEditFormat.format,
    },
    { key: 'uniforms',
        startByte: 0x983D38,
        arrayLength: 2500,
        length: UniformEditFormat.recordLength,
        subFormat: UniformEditFormat.format,
    },
    // playerAssignments 6773C0
    { key: 'playerAssignments',
        startByte: 0x9D4648,
        arrayLength: 750,
        length: PlayerAssignmentEditFormat.recordLength,
        subFormat: PlayerAssignmentEditFormat.format,
    },
    // Length is incorrect at this moment
    { key: 'competitionStructure',
        startByte: 0xA08650,
        arrayLength: 27,
        length: CompetitionStructureEditFormat.recordLength,
        subFormat: CompetitionStructureEditFormat.format,
    },
    { key: 'otherClubsStructure',
        startByte: 0xA093D0,
        arrayLength: 3,
        length: OtherClubsStructureEditFormat.recordLength,
        subFormat: OtherClubsStructureEditFormat.format,
    },
    // tactics 69DC8C
    { key: 'tactics',
        startByte: 0xA09880,
        arrayLength: 750,
        length: TacticsEditFormat.recordLength,
        subFormat: TacticsEditFormat.format,
    },
];
