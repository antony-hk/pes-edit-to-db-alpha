import {
    booleanFunc,
    leftRightFunc,
    positionFunc,
    offByOneFunc,
    registeredPositionFunc,
} from '../../common.mjs';
import playerAppearance from './PlayerAppearance.mjs';

export const playingStyleFunc = {
    // Follow PES 2019
    getter: function (input) {
        switch (input) {
            case 0:     return null;
            case 1:     return 'goalPoacher';           // 01 - 偷獵者 (Goal Poacher / ラインブレイカー)
            case 2:     return 'dummyRunner';           // 02 - 虛假跑位 (Dummy Runner / デコイラン)
            case 3:     return 'foxInTheBox';           // 03 - 禁區之狐 (Fox in the Box / ボックスストライカー)
            case 4:     return 'targetMan';             // 04 - 目標中鋒 (Target Man / ポストプレイヤー)
            case 5:     return 'creativePlaymaker';     // 05 - 有創意的中場指揮官 (Creative Playermaker / チャンスメイカー)
            case 6:     return 'prolificWinger';        // 06 - 高產翼鋒 (Prolific Winger / ウイングストライカー)
            case 7:     return 'roamingFlank';          // 07 - 自由側翼 (Roaming Flank / インサイドレシーバー)
            case 8:     return 'crossSpecialist';       // 08 - 傳中專家 (Cross Specialist / クロサー)
            case 9:     return 'classicNo10';           // 09 - 傳統十號位置 (Classic No. 10 / ナンバー10)
            case 10:    return 'holePlayer';            // 10 - 影子前鋒 (Hole Player / 2列目からの飛び出し)
            case 11:    return 'boxToBox';              // 11 - 全能中場 (Box-to-box / ボックストゥボックス)
            case 12:    return 'theDestroyer';          // 12 - 破壞型中場 (The Destroyer / ハードブレス)
            case 13:    return 'orchestrator';          // 13 - 指揮官 (Orchestrator / プレイメイカー)
            case 14:    return 'anchorMan';             // 14 - 靠山 (Anchor Man / アンカー)
            case 15:    return 'offensiveFullBack';
            case 16:    return 'fullBackFinisher';
            case 17:    return 'defensiveFullBack';
            case 18:    return 'buildUp';
            case 19:    return 'extraFrontman';         // 19 - 額外前鋒 (Extra Frontman / オーバーラップ)
            case 20:    return 'offensiveGoalkeeper';   // 20 - 進攻型守門員 (Offensive Goalkeeper / 攻擊的GK)
            case 21:    return 'defensiveGoalkeeper';   // 21 - 防守型守門員 (Defensive Goalkeeper / 守備的GK)
            default:    return input;
        }
    },
    setter: function (input) {
        switch (input) {
            case 'goalPoacher':         return 1;
            case 'dummyRunner':         return 2;
            case 'foxInTheBox':         return 3;
            case 'targetMan':           return 4;
            case 'creativePlaymaker':   return 5;
            case 'prolificWinger':      return 6;
            case 'roamingFlank':        return 7;
            case 'crossSpecialist':     return 8;
            case 'classicNo10':         return 9;
            case 'holePlayer':          return 10;
            case 'boxToBox':            return 11;
            case 'theDestroyer':        return 12;
            case 'orchestrator':        return 13;
            case 'anchorMan':           return 14;
            case 'offensiveFullBack':   return 15;
            case 'fullBackFinisher':    return 16;
            case 'defensiveFullBack':   return 17;
            case 'buildUp':             return 18;
            case 'extraFrontman':       return 19;
            case 'offensiveGoalkeeper': return 20;
            case 'defensiveGoalkeeper': return 21;
            default:                    return 0;
        };
    },
}

export const recordLength = 0x138;
export const isFullyCovered = false;
export const format = [
    { key: 'playerId', startByte: 0x00, length: 4 },
    { key: 'callnameId', startByte: 0x04, length: 4 },

    // Name settings
    { key: 'playerName',    startByte: 0x36,            length: 0x3D, isString: true },
    { key: 'clubShirtName', startByte: 0x36 + 0x3D,     length: 0x3D, isString: true },
    { key: 'ntShirtName',   startByte: 0x36 + 0x3D * 2, length: 0x3D, isString: true },

    { key: 'countryId1', startByte: 0x08, length: 2 },
    { key: 'height', startByte: 0x0A,   length: 1 },
    { key: 'weight', startByte: 0x0B,   length: 1 },

    { key: 'goalCelebration1', startByte: 0x0C, length: 1 },
    { key: 'goalCelebration2', startByte: 0x0D, length: 1 },

    { key: 'age', startByte: 0x20, startBit: 7, lengthInBit: 6 },
    { key: 'isFromLiveUpdate', startByte: 0x2C, startBit: 28, lengthInBit: 1, ...booleanFunc },
    { key: 'strongerFoot',     startByte: 0x2C, startBit: 29, lengthInBit: 1, ...leftRightFunc },
    { key: 'strongerHand',     startByte: 0x2C, startBit: 30, lengthInBit: 1, ...leftRightFunc },

    { key: 'isPlayerNameChanged',       startByte: 0x1C, startBit: 31, lengthInBit: 1, ...booleanFunc },
    // { key: 'isBasicSettingChanged',     startByte: 0x2C, startBit: 0, lengthInBit: 1, ...booleanFunc },
    // { key: 'isRegisteredPositionChanged', startByte: 0x2C, startBit: 1, lengthInBit: 1, ...booleanFunc },
    // { key: 'isPositionChanged',         startByte: 0x2C, startBit: 2, lengthInBit: 1, ...booleanFunc },
    // { key: 'isStatChanged',             startByte: 0x2C, startBit: 3, lengthInBit: 1, ...booleanFunc },
    // { key: 'isSpecialSkillChanged',    startByte: 0x2C, startBit: 4, lengthInBit: 1, ...booleanFunc },
    // { key: 'isPlayingStyleChanged',     startByte: 0x2C, startBit: 5, lengthInBit: 1, ...booleanFunc },
    // { key: 'isComPlayingStyleChanged',  startByte: 0x2C, startBit: 6, lengthInBit: 1, ...booleanFunc },
    // { key: 'isMotionChanged',           startByte: 0x2C, startBit: 7, lengthInBit: 1, ...booleanFunc },

    // TBC flags
    { key: 'unsafe_isDifferenceFromDefault', startByte: 0x2C, startBit: 22, lengthInBit: 1, ...booleanFunc },

    // Registered position
    { key: 'registeredPosition', startByte: 0x20, startBit: 13, lengthInBit: 4, ...registeredPositionFunc },

    // Position
    { key: 'positionGk',  startByte: 0x28, startBit: 13, lengthInBit: 2, ...positionFunc },
    { key: 'positionCb',  startByte: 0x28, startBit: 15, lengthInBit: 2, ...positionFunc },
    { key: 'positionLb',  startByte: 0x28, startBit: 17, lengthInBit: 2, ...positionFunc },
    { key: 'positionRb',  startByte: 0x28, startBit: 19, lengthInBit: 2, ...positionFunc },
    { key: 'positionDmf', startByte: 0x28, startBit: 21, lengthInBit: 2, ...positionFunc },
    { key: 'positionCmf', startByte: 0x28, startBit: 23, lengthInBit: 2, ...positionFunc },
    { key: 'positionLmf', startByte: 0x28, startBit: 25, lengthInBit: 2, ...positionFunc },
    { key: 'positionRmf', startByte: 0x28, startBit: 27, lengthInBit: 2, ...positionFunc },
    { key: 'positionAmf', startByte: 0x28, startBit: 29, lengthInBit: 2, ...positionFunc },
    { key: 'positionRwf', startByte: 0x2C, startBit: 0,  lengthInBit: 2, ...positionFunc },
    { key: 'positionLwf', startByte: 0x2C, startBit: 20, lengthInBit: 2, ...positionFunc },
    { key: 'positionSs',  startByte: 0x2C, startBit: 2,  lengthInBit: 2, ...positionFunc },
    { key: 'positionCf',  startByte: 0x2C, startBit: 4,  lengthInBit: 2, ...positionFunc },

    // Stats
    // "tightPossession" (New ability)
    // "header" -> "headingAbility"
    // "explosivePower" -> "acceleration"
    // "bodyControl" -> "balance"
    // "goalkeeping" -> "gkAwareness"
    // "gkCatch" -> "gkCatching"
    // "gkCoverage" -> "gkReach"
    // "swerve" -> "curl"
    // 0x0C
    { key: 'attackingProwess',  startByte: 0x0C, startBit: 16, lengthInBit: 7 }, // A01 Attacking Prowess
    { key: 'ballControl',       startByte: 0x0C, startBit: 23, lengthInBit: 7 }, // A02 控球 Ball Control
    { key: 'weakFootUsage',     startByte: 0x0C, startBit: 30, lengthInBit: 2, ...offByOneFunc }, // D09 非慣用腳使用頻密度 Weak Foot Usage 8B 6 2 +1
    // 0x10
    { key: 'tightPossession',   startByte: 0x10, startBit: 0,  lengthInBit: 7 }, // A04 Tight Possession
    { key: 'lowPass',           startByte: 0x10, startBit: 7,  lengthInBit: 7 }, // A05 地面傳球 Low Pass 8C 0
    { key: 'loftedPass',        startByte: 0x10, startBit: 14, lengthInBit: 7 }, // A06 空中傳球 Lofted Pass 8C 7
    { key: 'finishing',         startByte: 0x10, startBit: 21, lengthInBit: 7 }, // A07 射門 Finishing 8D 6
    // 0x14
    { key: 'placeKicking',      startByte: 0x14, startBit: 0,  lengthInBit: 7 }, // A08 定位球 Place Kicking 8E 5
    { key: 'curl',              startByte: 0x14, startBit: 7,  lengthInBit: 7 }, // A09 孤度 Swerve "Curl" 9D 7
    { key: 'speed',             startByte: 0x14, startBit: 14, lengthInBit: 7 }, // A11 速度 Speed 9E 6
    { key: 'acceleration',      startByte: 0x14, startBit: 21, lengthInBit: 7 }, // A12 爆發力 Explosive Power (named "Acceleration" in PES2020) 94 0
    // 0x18
    { key: 'jump',              startByte: 0x18, startBit: 0,  lengthInBit: 7 }, // A14 跳躍 Jump 96 5
    { key: 'physicalContact',   startByte: 0x18, startBit: 7,  lengthInBit: 7 }, // A15 身體碰撞 Physical Contact 95 6
    { key: 'balance',           startByte: 0x18, startBit: 14, lengthInBit: 7 }, // A16 軀幹平衡 Unwavering Balance (named "Balance" in PES2020) 94 7
    { key: 'stamina',           startByte: 0x18, startBit: 21, lengthInBit: 7 }, // A17 體力 Stamina A0 0
    // 0x1C
    { key: 'ballWinning',       startByte: 0x1C, startBit: 0,  lengthInBit: 7 }, // D02 搶球 Ball Winning 91 6
    { key: 'aggression',        startByte: 0x1C, startBit: 7,  lengthInBit: 7 }, // D03 Aggression
    { key: 'gkAwareness',       startByte: 0x1C, startBit: 14, lengthInBit: 7 }, // D04 守門 Goalkeeping (named "GK Awareness") A0 7
    { key: 'gkCatching',        startByte: 0x1C, startBit: 21, lengthInBit: 7 }, // D05 接球能力 GK Catch (named "GK Catching") 98 0
    { key: 'form',              startByte: 0x1C, startBit: 28, lengthInBit: 3, ...offByOneFunc }, // D11 狀態持續性 Form 9B 4 3 +1
    // 0x20
    { key: 'gkReach',           startByte: 0x20, startBit: 0,  lengthInBit: 7 }, // D08 撲救範圍 Coverage (named "GK Reach") 9A 5
    // 0x24
    { key: 'defensiveProwess',  startByte: 0x24, startBit: 0,  lengthInBit: 7 }, // D01 防守能力 DefensiveProwess 90 7
    { key: 'gkClearing',        startByte: 0x24, startBit: 7,  lengthInBit: 7 }, // D06 解圍 GK Clearing 98 7
    { key: 'headingAbility',    startByte: 0x24, startBit: 14, lengthInBit: 7 }, // A10 頭球 Header (named "Heading" in PES2020) 90 0
    // 0x28
    { key: 'dribbling',         startByte: 0x28, startBit: 0,  lengthInBit: 7 }, // A03 盤球 Dribbling
    { key: 'injuryResistance',  startByte: 0x28, startBit: 7,  lengthInBit: 2, ...offByOneFunc }, // D12 抗受傷程度 Injury Resistance A3 2 2 +1 max 3 instead of 4
    { key: 'attitude',          startByte: 0x28, startBit: 9,  lengthInBit: 2, ...offByOneFunc },

    { key: 'gkReflexes',        startByte: 0x2C, startBit: 6,  lengthInBit: 7 }, // D07 撲救反應 Reflexes (named "GK Reflexes") 99 6
    { key: 'kickingPower',      startByte: 0x2C, startBit: 13, lengthInBit: 7 }, // A13 腳下力量 Kicking Power 92 5
    { key: 'weakFootAccuracy',  startByte: 0x24, startBit: 30, lengthInBit: 2, ...offByOneFunc }, // D10 非慣用腳精準度 Weak Foot Accuracy A3 0 2 +1

    // Special skills (max 10)
    { key: 'scissorsFeint',         startByte: 0x30, startBit: 6,  lengthInBit: 1, ...booleanFunc }, // PS01 剪刀腳假動作 Scissors Feint
    { key: 'doubleTouch',           startByte: 0x30, startBit: 7,  lengthInBit: 1, ...booleanFunc }, // PS02 二次觸球 Double Touch
    { key: 'flipFlap',              startByte: 0x30, startBit: 8,  lengthInBit: 1, ...booleanFunc }, // PS03 牛擺尾 Flip Flap
    { key: 'marseilleTurn',         startByte: 0x30, startBit: 9,  lengthInBit: 1, ...booleanFunc }, // PS04 施丹轉身 Marseille Turn
    { key: 'sombrero',              startByte: 0x30, startBit: 10, lengthInBit: 1, ...booleanFunc }, // PS05 海底撈月 Sombrero
    { key: 'crossOverTurn',         startByte: 0x30, startBit: 11, lengthInBit: 1, ...booleanFunc }, // PS06 壓步轉彎 Cross Over Turn
    { key: 'cutBehindAndTurn',      startByte: 0x30, startBit: 12, lengthInBit: 1, ...booleanFunc }, // PS07 向後切球並轉身 Cut Behind & Turn
    { key: 'scotchMove',            startByte: 0x30, startBit: 13, lengthInBit: 1, ...booleanFunc }, // PS08 內部彈起 Scotch Move
    { key: 'stepOnSkillControl',    startByte: 0x30, startBit: 14, lengthInBit: 1, ...booleanFunc }, // PS09 踏球技巧操控 Step on Skill Control
    { key: 'headingSkill',          startByte: 0x30, startBit: 15, lengthInBit: 1, ...booleanFunc }, // PS10 頭球 Heading
    { key: 'longRangeDrive',        startByte: 0x30, startBit: 16, lengthInBit: 1, ...booleanFunc }, // PS11 遠距離抽射 Long Range Drive
    { key: 'chipShotControl',       startByte: 0x30, startBit: 17, lengthInBit: 1, ...booleanFunc }, // PS12 吊射控制 Chip shot control
    { key: 'longRangeShooting',     startByte: 0x30, startBit: 18, lengthInBit: 1, ...booleanFunc }, // PS13 Long Range Shooting
    { key: 'knuckleShot',           startByte: 0x30, startBit: 19, lengthInBit: 1, ...booleanFunc }, // PS14 落葉球射門 Knuckle Shot
    { key: 'dippingShot',           startByte: 0x30, startBit: 20, lengthInBit: 1, ...booleanFunc }, // PS15 急墜射門 Dipping Shot
    { key: 'risingShot',            startByte: 0x30, startBit: 21, lengthInBit: 1, ...booleanFunc }, // PS16 急升射門 Rising Shot
    { key: 'acrobaticFinishing',    startByte: 0x30, startBit: 22, lengthInBit: 1, ...booleanFunc }, // PS17 雜技般入球 Acrobatic Finishing
    { key: 'heelTrick',             startByte: 0x30, startBit: 23, lengthInBit: 1, ...booleanFunc }, // PS18 腳跟絕技 Heel Trick
    { key: 'firstTimeShot',         startByte: 0x30, startBit: 24, lengthInBit: 1, ...booleanFunc }, // PS19 一控即射 First-time Shot
    { key: 'oneTouchPass',          startByte: 0x30, startBit: 25, lengthInBit: 1, ...booleanFunc }, // PS20 單觸傳球 One-touch Pass
    { key: 'throughPassing',        startByte: 0x30, startBit: 26, lengthInBit: 1, ...booleanFunc }, // PS21 Through Passing
    { key: 'weightedPass',          startByte: 0x30, startBit: 27, lengthInBit: 1, ...booleanFunc }, // PS22 加重傳球 Weighted Pass
    { key: 'pinpointCrossing',      startByte: 0x30, startBit: 28, lengthInBit: 1, ...booleanFunc }, // PS23 精確横傳球 Pinpoint Crossing
    { key: 'outsideCurler',         startByte: 0x30, startBit: 29, lengthInBit: 1, ...booleanFunc }, // PS24 外部弧線球 Outside Curler
    { key: 'rabona',                startByte: 0x30, startBit: 30, lengthInBit: 1, ...booleanFunc }, // PS25 插花腳 Rabona
    { key: 'noLookPass',            startByte: 0x30, startBit: 31, lengthInBit: 1, ...booleanFunc }, // PS26 不看人傳球 No Look Pass
    { key: 'lowLoftedPass',         startByte: 0x34, startBit: 0,  lengthInBit: 1, ...booleanFunc }, // PS27 低空傳球 Low Lofted Pas
    { key: 'gkLowPunt',             startByte: 0x34, startBit: 1,  lengthInBit: 1, ...booleanFunc }, // PS28 守門員踢低球 GK Low Punt
    { key: 'gkHighPunt',            startByte: 0x34, startBit: 2,  lengthInBit: 1, ...booleanFunc }, // PS29 守門員踢高球 GK High Punt
    { key: 'longThrow',             startByte: 0x34, startBit: 3,  lengthInBit: 1, ...booleanFunc }, // PS30 長距離投擲 Long Throw
    { key: 'gkLongThrow',           startByte: 0x34, startBit: 4,  lengthInBit: 1, ...booleanFunc }, // PS31 守門員長距離投擲 GK Long Throw
    { key: 'penaltySpecialist',     startByte: 0x34, startBit: 5,  lengthInBit: 1, ...booleanFunc }, // PS32 十二碼專家 Penalty Specialist
    { key: 'gkPenaltySaver',        startByte: 0x34, startBit: 6,  lengthInBit: 1, ...booleanFunc }, // PS33 十二碼撲救高手 GK Penalty Saver
    { key: 'gamesmanship',          startByte: 0x34, startBit: 7,  lengthInBit: 1, ...booleanFunc }, // PS34 蠱惑招 Malicia
    { key: 'manMarking',            startByte: 0x34, startBit: 8,  lengthInBit: 1, ...booleanFunc }, // PS35 盯人 Man Marking
    { key: 'trackBack',             startByte: 0x34, startBit: 9,  lengthInBit: 1, ...booleanFunc }, // PS36 壓迫 Track Back
    { key: 'interception',          startByte: 0x34, startBit: 10, lengthInBit: 1, ...booleanFunc }, // PS37 截球 Interception
    { key: 'acrobaticClear',        startByte: 0x34, startBit: 11, lengthInBit: 1, ...booleanFunc }, // PS38 雜技般解圍 Acrobatic Clear
    { key: 'captaincy',             startByte: 0x34, startBit: 12, lengthInBit: 1, ...booleanFunc }, // PS39 隊長 Captaincy
    { key: 'superSub',              startByte: 0x34, startBit: 13, lengthInBit: 1, ...booleanFunc }, // PS40 超級候補 Super-sub
    { key: 'fightingSpirit',        startByte: 0x34, startBit: 14, lengthInBit: 1, ...booleanFunc }, // PS41 戰鬥精神 Fighting Spirit

    // Playing style
    { key: 'playingStyle', startByte: 0x20, startBit: 18, lengthInBit: 5, ...playingStyleFunc },

    // 電腦比賽風格 (max 5)
    { key: 'trickster',      startByte: 0x2C, startBit: 31, lengthInBit: 1, ...booleanFunc }, // CPS01 魔術師 Trickster
    { key: 'mazingRun',      startByte: 0x30, startBit: 0,  lengthInBit: 1, ...booleanFunc }, // CPS02 驚人突破 Mazing Run
    { key: 'speedingBullet', startByte: 0x30, startBit: 1,  lengthInBit: 1, ...booleanFunc }, // CPS03 疾速子彈 Speeding Bullet
    { key: 'incisiveRun',    startByte: 0x30, startBit: 2,  lengthInBit: 1, ...booleanFunc }, // CPS04 內切突破 Incisive Run
    { key: 'longBallExpert', startByte: 0x30, startBit: 3,  lengthInBit: 1, ...booleanFunc }, // CPS05 長球專家 Long Ball Expert
    { key: 'earlyCross',     startByte: 0x30, startBit: 4,  lengthInBit: 1, ...booleanFunc }, // CPS06 快速傳中 Early Cross
    { key: 'longRanger',     startByte: 0x30, startBit: 5,  lengthInBit: 1, ...booleanFunc }, // CPS07 重炮手 Long Ranger

    { key: 'reputation',  startByte: 0x20, startBit: 28, lengthInBit: 3, ...offByOneFunc }, // Thanks to SMcCutcheon

    { key: 'dribHunch',   startByte: 0x24, startBit: 21, lengthInBit: 3, ...offByOneFunc }, // 盤球：背部弓起程度
    { key: 'dribArmMove', startByte: 0x10, startBit: 28, lengthInBit: 4, ...offByOneFunc }, // 盤球：手臂動作
    { key: 'runHunch',    startByte: 0x24, startBit: 24, lengthInBit: 3, ...offByOneFunc }, // 奔跑動作：背部弓起程度
    { key: 'runArmMove',  startByte: 0x14, startBit: 28, lengthInBit: 4, ...offByOneFunc }, // 奔跑動作：手臂動作
    { key: 'dribMotion',  startByte: 0x28, startBit: 11, lengthInBit: 2, ...offByOneFunc },
    { key: 'ckMotion',    startByte: 0x18, startBit: 28, lengthInBit: 4, ...offByOneFunc },
    { key: 'fkMotion',    startByte: 0x20, startBit: 23, lengthInBit: 5, ...offByOneFunc },
    { key: 'pkMotion',    startByte: 0x24, startBit: 27, lengthInBit: 3, ...offByOneFunc },

    { key: 'playerAppearance', startByte: 0xF0, length: 0x48, subFormat: playerAppearance },
];
export default format;
