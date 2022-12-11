import { createReverseMap } from './utils/createReverseMap.ts';

type DataGetAndSet<T, U> = {
    getter: (input: T) => U | undefined;
    setter: (input: U) => T | undefined;
}

type DataRecordRow<T, U> = {
    key: string;
    startByte: number;
    length: number;
    isString?: boolean;
} & Partial<DataGetAndSet<T, U>>;

type Format = DataRecordRow<unknown, unknown>[];

// Age
const ageFunc: DataGetAndSet<number, number> = {
    getter: (i: number) => i + 15,
    setter: (i: number) => i - 15,
};

// Height
const heightFunc: DataGetAndSet<number, number> = {
    getter: (i: number) => i + 100,
    setter: (i: number) => i - 100,
};

// Playing Style
const PlayingStyle = {
    goalPoacher: 1,
    dummyRunner: 2,
    foxInTheBox: 3,
    prolificWinger: 4,
    classicNo10: 5,
    holePlayer: 6,
    boxToBox: 7,
    anchorMan: 8,
    theDestroyer: 9,
    extraFrontman: 10,
    offensiveFullBack: 11,
    defensiveFullBack: 12,
    targetMan: 13,
    creativePlaymaker: 14,
    buildUp: 15,
    offensiveGoalkeeper: 16,
    defensiveGoalkeeper: 17,
    roamingFlank: 18,
    crossSpecialist: 19,
    orchestrator: 20,
    fullBackFinisher: 21,
} as const;

const ReversePlayingStyle = createReverseMap(PlayingStyle);

type TPlayingStyleKey = keyof typeof PlayingStyle;
type TPlayingStyle = typeof PlayingStyle[TPlayingStyleKey];

const playingStyleFunc: DataGetAndSet<TPlayingStyle, TPlayingStyleKey> = {
    getter: (i: TPlayingStyle) => (
        ReversePlayingStyle.get(i) as TPlayingStyleKey || undefined
    ),
    setter: (i: TPlayingStyleKey) => PlayingStyle[i],
};

export const format: Format = [
    // 0x00
    { key: 'careerStartTeamId', startByte: 0x00, length: 4 },
    // 0x04
    { key: 'loanFromTeamId',    startByte: 0x04, length: 4 },
    // 0x08
    { key: 'playerId',          startByte: 0x08, length: 4 },

    // Names
    { key: 'jaPlayerName',  startByte: 0x44, length: 0x3D, isString: true },
    { key: 'clubShirtName', startByte: 0x81, length: 0x3D, isString: true },
    { key: 'ntShirtName',   startByte: 0xBE, length: 0x3D, isString: true },
    { key: 'playerName',    startByte: 0xFB, length: 0x3D, isString: true },

    // 0x0C
    { key: 'contractExpiryDate', startByte: 0x0C, startBit: 0, lengthInBit: 27 },
    { key: 'fkMotion',           startByte: 0x0C, startBit: 27, lengthInBit: 5, ...offByOneFunc },

    // 0x10
    { key: 'loanExpiryDate', startByte: 0x10, startBit: 0, lengthInBit: 27 },
    { key: 'playingStyle',   startByte: 0x10, startBit: 27, lengthInBit: 5, ...playingStyleFunc },   // Confirmed

    // 0x14
    { key: 'marketValue', startByte: 0x14, startBit: 0,  lengthInBit: 24 },
    { key: 'numCaps',     startByte: 0x14, startBit: 24, lengthInBit: 8 },

    // 0x18
    { key: 'unknown1',          startByte: 0x18, startBit: 0,  lengthInBit: 24 },
    { key: 'height',            startByte: 0x18, startBit: 24, lengthInBit: 8, ...heightFunc },

    // 0x1C
    { key: 'countryId2',        startByte: 0x1C, startBit: 0,  lengthInBit: 9 },
    { key: 'countryId1',        startByte: 0x1C, startBit: 9,  lengthInBit: 9 },
    { key: 'goalCelebration1',  startByte: 0x1C, startBit: 18, lengthInBit: 8 },
    { key: 'placeKicking',      startByte: 0x1C, startBit: 26, lengthInBit: 6, ...generalStatsFunc },

    // 0x20
    { key: 'weight',           startByte: 0x20, startBit: 0,  lengthInBit: 7, ...weightFunc },
    { key: 'lowPass',          startByte: 0x20, startBit: 7,  lengthInBit: 6, ...generalStatsFunc },   // 地面傳球
    { key: 'gkClearing',       startByte: 0x20, startBit: 13, lengthInBit: 6, ...generalStatsFunc }, // 解圍
    { key: 'defensiveProwess', startByte: 0x20, startBit: 19, lengthInBit: 6, ...generalStatsFunc },   // 防守能力
    { key: 'ballControl',      startByte: 0x20, startBit: 25, lengthInBit: 6, ...generalStatsFunc },   // 控球
    { key: 'crossOverTurn',   startByte: 0x20, startBit: 31, lengthInBit: 1, ...booleanFunc },  // PS06 "Cross Over Turn" 壓步轉彎

    // 0x24
    { key: 'headingAbility', startByte: 0x24, startBit: 0,  lengthInBit: 6, ...generalStatsFunc },   // 頭球
    { key: 'jump',        startByte: 0x24, startBit: 6,  lengthInBit: 6, ...generalStatsFunc },   // 跳躍
    { key: 'gkReach',     startByte: 0x24, startBit: 12, lengthInBit: 6, ...generalStatsFunc },   // 撲救範圍
    { key: 'speed',       startByte: 0x24, startBit: 18, lengthInBit: 6, ...generalStatsFunc },   // 速度
    { key: 'ballWinning', startByte: 0x24, startBit: 24, lengthInBit: 6, ...generalStatsFunc },   // 搶球
    { key: 'positionLb',  startByte: 0x24, startBit: 30, lengthInBit: 2, ...positionFunc },

    // 0x28
    { key: 'gkReflexes',     startByte: 0x28, startBit: 0,  lengthInBit: 6, ...generalStatsFunc },   // 撲救反應
    { key: 'gkAwareness',    startByte: 0x28, startBit: 6,  lengthInBit: 6, ...generalStatsFunc },   // 守門
    { key: 'curl',           startByte: 0x28, startBit: 12, lengthInBit: 6, ...generalStatsFunc },   // 孤度
    { key: 'stamina',        startByte: 0x28, startBit: 18, lengthInBit: 6, ...generalStatsFunc },   // 體力
    { key: 'acceleration',   startByte: 0x28, startBit: 24, lengthInBit: 6, ...generalStatsFunc },   // 爆發力
    { key: 'positionGk',     startByte: 0x28, startBit: 30, lengthInBit: 2, ...positionFunc },

    // 0x2C
    { key: 'dribbling',        startByte: 0x2C, startBit: 0,  lengthInBit: 6, ...generalStatsFunc },   // 盤球
    { key: 'kickingPower',     startByte: 0x2C, startBit: 6,  lengthInBit: 6, ...generalStatsFunc },   // 腳下力量
    { key: 'gkCatching',       startByte: 0x2C, startBit: 12, lengthInBit: 6, ...generalStatsFunc },   // 接球能力
    { key: 'attackingProwess', startByte: 0x2C, startBit: 18, lengthInBit: 6, ...generalStatsFunc }, // 攻擊能力
    { key: 'balance',          startByte: 0x2C, startBit: 24, lengthInBit: 6, ...generalStatsFunc }, // 軀幹平衡
    { key: 'attitude',         startByte: 0x2C, startBit: 30, lengthInBit: 2, ...offByOneFunc },   // Playing Attitude ?_?

    // 0x30
    { key: 'aggression',      startByte: 0x30, startBit: 0,  lengthInBit: 6, ...generalStatsFunc }, // New in PES 2020
    { key: 'physicalContact', startByte: 0x30, startBit: 6,  lengthInBit: 6, ...generalStatsFunc }, // 身體碰撞
    { key: 'finishing',       startByte: 0x30, startBit: 12, lengthInBit: 6, ...generalStatsFunc }, // 射門
    { key: 'loftedPass',      startByte: 0x30, startBit: 18, lengthInBit: 6, ...generalStatsFunc }, // 空中傳球
    { key: 'age',             startByte: 0x30, startBit: 24, lengthInBit: 6, ...ageFunc },
    { key: 'positionDmf',     startByte: 0x30, startBit: 30, lengthInBit: 2, ...positionFunc },

    // 0x34
    { key: 'tightPossession',    startByte: 0x34, startBit: 0,  lengthInBit: 6, ...generalStatsFunc },
    { key: 'ckMotion',           startByte: 0x34, startBit: 6,  lengthInBit: 4, ...offByOneFunc },
    { key: 'dribArmMove',        startByte: 0x34, startBit: 10, lengthInBit: 4, ...offByOneFunc },
    { key: 'runArmMove',         startByte: 0x34, startBit: 14, lengthInBit: 4, ...offByOneFunc },
    { key: 'registeredPosition', startByte: 0x34, startBit: 18, lengthInBit: 4, ...registeredPositionFunc },
    { key: 'form',               startByte: 0x34, startBit: 22, lengthInBit: 3, ...offByOneFunc },
    { key: 'dribHunch',          startByte: 0x34, startBit: 25, lengthInBit: 3, ...offByOneFunc },
    { key: 'pkMotion',           startByte: 0x34, startBit: 28, lengthInBit: 3, ...offByOneFunc },
    { key: 'earlyCross',         startByte: 0x34, startBit: 31, lengthInBit: 1, ...booleanFunc }, // CPS06 "Early Cross" 快速傳中

    // 0x38
    { key: 'runHunch',         startByte: 0x38, startBit: 0,  lengthInBit: 3, ...offByOneFunc },
    { key: 'reputation',       startByte: 0x38, startBit: 3,  lengthInBit: 3, ...offByOneFunc },
    { key: 'weakFootUsage',    startByte: 0x38, startBit: 6,  lengthInBit: 2, ...offByOneFunc },
    { key: 'positionCmf',      startByte: 0x38, startBit: 8,  lengthInBit: 2, ...positionFunc },
    { key: 'injuryResistance', startByte: 0x38, startBit: 10, lengthInBit: 2, ...offByOneFunc }, // int InjuryResistance:2;
    { key: 'positionRmf',      startByte: 0x38, startBit: 12, lengthInBit: 2, ...positionFunc }, // int RMF:2;//correct
    { key: 'weakFootAccuracy', startByte: 0x38, startBit: 14, lengthInBit: 2, ...offByOneFunc }, // int WeakFootAccuracy:2;
    { key: 'positionAmf',      startByte: 0x38, startBit: 16, lengthInBit: 2, ...positionFunc }, // int AMF:2;
    { key: 'positionLmf',      startByte: 0x38, startBit: 18, lengthInBit: 2, ...positionFunc }, // int LMF:2;
    { key: 'positionCb',       startByte: 0x38, startBit: 20, lengthInBit: 2, ...positionFunc }, // int CB:2;
    { key: 'positionCf',       startByte: 0x38, startBit: 22, lengthInBit: 2, ...positionFunc }, // int CF:2;
    { key: 'positionLwf',      startByte: 0x38, startBit: 24, lengthInBit: 2, ...positionFunc }, // int LWF:2;
    { key: 'positionRb',       startByte: 0x38, startBit: 26, lengthInBit: 2, ...positionFunc }, // int RB:2;
    { key: 'positionRwf',      startByte: 0x38, startBit: 28, lengthInBit: 2, ...positionFunc }, // int RWF:2;
    { key: 'positionSs',       startByte: 0x38, startBit: 30, lengthInBit: 2, ...positionFunc }, // int SS:2;

    // 0x3C
    { key: 'dribMotion',         startByte: 0x3C, startBit: 0,  lengthInBit: 2, ...offByOneFunc }, // int DribblingMotion:2;
    { key: 'sombrero',           startByte: 0x3C, startBit: 2,  lengthInBit: 1, ...booleanFunc }, // PS05 "Sombrero" 海底撈月
    { key: 'pinpointCrossing',   startByte: 0x3C, startBit: 3,  lengthInBit: 1, ...booleanFunc }, // PS21 "Pinpoint Crossing" 精確橫傳球
    { key: 'weightedPass',       startByte: 0x3C, startBit: 4,  lengthInBit: 1, ...booleanFunc }, // PS20 "Weighted Pass" 加重傳球
    { key: 'flipFlap',           startByte: 0x3C, startBit: 5,  lengthInBit: 1, ...booleanFunc }, // PS03 "Flip Flap" 牛擺尾
    { key: 'fightingSpirit',     startByte: 0x3C, startBit: 6,  lengthInBit: 1, ...booleanFunc }, // PS39 "Fighting Spirit" 戰鬥精神
    { key: 'throughPassing',     startByte: 0x3C, startBit: 7,  lengthInBit: 1, ...booleanFunc }, // PS19.5 Through Passing (new in PES2020) 直傳
    { key: 'lowLoftedPass',      startByte: 0x3C, startBit: 8,  lengthInBit: 1, ...booleanFunc }, // PS25 "Low Lofted Pass" 低空傳球
    { key: 'trickster',          startByte: 0x3C, startBit: 9,  lengthInBit: 1, ...booleanFunc }, // CPS01 Trickster 魔術師
    { key: 'gkLowPunt',          startByte: 0x3C, startBit: 10, lengthInBit: 1, ...booleanFunc }, // PS26 "GK Low Punt" 守門員踢低球
    { key: 'gamesmanship',       startByte: 0x3C, startBit: 11, lengthInBit: 1, ...booleanFunc }, // PS32 "Gamesmanship" (prev. "Malicia") 蠱惑招
    { key: 'captaincy',          startByte: 0x3C, startBit: 12, lengthInBit: 1, ...booleanFunc }, // PS37 "Captaincy" 隊長
    { key: 'outsideCurler',      startByte: 0x3C, startBit: 13, lengthInBit: 1, ...booleanFunc }, // PS22 "Outside Curler" 外部弧線球
    { key: 'dippingShot',        startByte: 0x3C, startBit: 14, lengthInBit: 1, ...booleanFunc }, // PS14 "Dipping Shot" "急墜射門"
    { key: 'headingSkill',       startByte: 0x3C, startBit: 15, lengthInBit: 1, ...booleanFunc }, // PS10 "Heading" 頭球
    { key: 'gkHighPunt',         startByte: 0x3C, startBit: 16, lengthInBit: 1, ...booleanFunc }, // PS27 "GK High Punt" 守門員踢高球
    { key: 'marseilleTurn',      startByte: 0x3C, startBit: 17, lengthInBit: 1, ...booleanFunc }, // PS04 "Marseille Turn" 施丹轉身
    { key: 'wonBallonDor',       startByte: 0x3C, startBit: 18, lengthInBit: 1, ...booleanFunc },
    { key: 'risingShot',         startByte: 0x3C, startBit: 19, lengthInBit: 1, ...booleanFunc }, // PS15 "Rising Shots" 急升射門
    { key: 'stepOnSkillControl', startByte: 0x3C, startBit: 20, lengthInBit: 1, ...booleanFunc }, // PS09 "Step On Skill control" 踏球技巧操控
    { key: 'penaltySpecialist',  startByte: 0x3C, startBit: 21, lengthInBit: 1, ...booleanFunc }, // PS30 "Penalty Specialist" 十二碼專家
    { key: 'gkPenaltySaver',     startByte: 0x3C, startBit: 22, lengthInBit: 1, ...booleanFunc }, // PS31 "GK Penalty Saver" 十二碼撲救高手
    { key: 'interception',       startByte: 0x3C, startBit: 23, lengthInBit: 1, ...booleanFunc }, // PS35 "Interception" 截球
    { key: 'manMarking',         startByte: 0x3C, startBit: 24, lengthInBit: 1, ...booleanFunc }, // PS33 "Man Marking" 盯人
    { key: 'heelTrick',          startByte: 0x3C, startBit: 25, lengthInBit: 1, ...booleanFunc }, // PS17 "Heel Trick" 腳跟絕技
    { key: 'chipShotControl',    startByte: 0x3C, startBit: 26, lengthInBit: 1, ...booleanFunc }, // PS12 "Chip shot control" 吊射控制
    { key: 'oneTouchPass',       startByte: 0x3C, startBit: 27, lengthInBit: 1, ...booleanFunc }, // PS19 "One-touch Pass" 單觸傳球
    { key: 'legendImagine',      startByte: 0x3C, startBit: 28, lengthInBit: 1, ...booleanFunc },
    { key: 'strongerHand',       startByte: 0x3C, startBit: 29, lengthInBit: 1, ...leftRightFunc },
    { key: 'incisiveRun',        startByte: 0x3C, startBit: 30, lengthInBit: 1, ...booleanFunc }, // CPS04 "Incisive Run" 內切突破
    { key: 'firstTimeShot',      startByte: 0x3C, startBit: 31, lengthInBit: 1, ...booleanFunc }, // PS18 "First-time Shot" 一控即射

    // 0x40
    { key: 'noLookPass',          startByte: 0x40, startBit: 0,  lengthInBit: 1, ...booleanFunc }, // PS24 "No Look Pass" 不看人傳球
    { key: 'knuckleShot',         startByte: 0x40, startBit: 1,  lengthInBit: 1, ...booleanFunc }, // PS13 "Knuckle Shot" 落葉球射門
    { key: 'strongerFoot',        startByte: 0x40, startBit: 2,  lengthInBit: 1, ...leftRightFunc },
    { key: 'rabona',              startByte: 0x40, startBit: 3,  lengthInBit: 1, ...booleanFunc }, // PS23 "Rabona" 插花腳
    { key: 'superSub',            startByte: 0x40, startBit: 4,  lengthInBit: 1, ...booleanFunc }, // PS38 "Super-sub" 超級候補
    { key: 'trackBack',           startByte: 0x40, startBit: 5,  lengthInBit: 1, ...booleanFunc }, // PS34 "Track Back" 壓迫
    { key: 'longRangeShooting',   startByte: 0x40, startBit: 6,  lengthInBit: 1, ...booleanFunc }, // PS12.5 "Long Range Shooting" (new in PES2020) 遠射
    { key: 'scissorsFeint',       startByte: 0x40, startBit: 7,  lengthInBit: 1, ...booleanFunc }, // PS01 "Scissors Feint" 剪刀腳假動作
    { key: 'longRanger',          startByte: 0x40, startBit: 8,  lengthInBit: 1, ...booleanFunc }, // CPS07 "Long Ranger" 重炮手
    { key: 'longThrow',           startByte: 0x40, startBit: 9,  lengthInBit: 1, ...booleanFunc }, // PS28 "Long Throw" 長距離投擲
    { key: 'gkLongThrow',         startByte: 0x40, startBit: 10, lengthInBit: 1, ...booleanFunc }, // PS29 "GK Long Throw" 守門員長距離投擲
    { key: 'doubleTouch',         startByte: 0x40, startBit: 11, lengthInBit: 1, ...booleanFunc }, // PS02 "Double Touch" 兩次觸球
    { key: 'acrobaticFinishing',  startByte: 0x40, startBit: 12, lengthInBit: 1, ...booleanFunc }, // PS16 "Acrobatic Finishing" 雜技般入球
    { key: 'scotchMove',          startByte: 0x40, startBit: 13, lengthInBit: 1, ...booleanFunc }, // PS08 "Scotch Move" 內部彈起
    { key: 'speedingBullet',      startByte: 0x40, startBit: 14, lengthInBit: 1, ...booleanFunc }, // CPS03 Speeding Bullet 疾速子彈
    { key: 'longRangeDrive',      startByte: 0x40, startBit: 15, lengthInBit: 1, ...booleanFunc }, // PS11 "Long Range Drive" 遠距離抽射
    { key: 'cutBehindAndTurn',    startByte: 0x40, startBit: 16, lengthInBit: 1, ...booleanFunc }, // PS07 "Cut Behind & Turn" 向後切球並轉身
    { key: 'longBallExpert',      startByte: 0x40, startBit: 17, lengthInBit: 1, ...booleanFunc }, // CPS05 Long Ball Expert 長球專家
    { key: 'acrobaticClear',      startByte: 0x40, startBit: 18, lengthInBit: 1, ...booleanFunc }, // PS36 "Acrobatic Clear" 雜技般解圍
    { key: 'mazingRun',           startByte: 0x40, startBit: 19, lengthInBit: 1, ...booleanFunc }, // CPS02 Mazing Run 驚人突破
];
