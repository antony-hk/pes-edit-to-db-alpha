export const booleanFunc = {
    getter: function(input) {
        return Boolean(input);
    },
    setter: function (input) {
        return (Boolean(input) ? 1 : 0);
    }
};

export const offByOneFunc = {
    getter(input) {
        return input + 1;
    },

    setter(input) {
        return input - 1;
    },
};

export const ageFunc = {
    getter: function (input) {
        return input + 15;
    },
    setter: function (input) {
        return input - 15;
    },
};

export const generalStatsFunc = {
    getter: function (input) {
        return input + 40;
    },
    setter: function (input) {
        return input - 40;
    },
};

export const heightFunc = {
    getter: function (input) {
        return input + 132;
    },
    setter: function (input) {
        return input - 132;
    },
};

export const leftRightFunc = {
    getter: function (input) {
        return (input ? 'L' : 'R');
    },
    setter: function (input) {
        return (input === 'L' ? 1 : 0);
    },
};

export const playingStyleFunc = {
    // Follow PES 2019
    getter: function (input) {
        switch (input) {
            case 0:     return null;
            case 1:     return 'goalPoacher';           // 01 - 偷獵者 (Goal Poacher / ラインブレイカー)
            case 2:     return 'dummyRunner';           // 02 - 虛假跑位 (Dummy Runner / デコイラン)
            case 3:     return 'foxInTheBox';           // 03 - 禁區之狐 (Fox in the Box / ボックスストライカー)
            case 4:     return 'prolificWinger';        // 06 - 高產翼鋒 (Prolific Winger / ウイングストライカー)
            case 5:     return 'classicNo10';           // 09 - 傳統十號位置 (Classic No. 10 / ナンバー10)
            case 6:     return 'holePlayer';            // 10 - 影子前鋒 (Hole Player / 2列目からの飛び出し)
            case 7:     return 'boxToBox';              // 11 - 全能中場 (Box-to-box / ボックストゥボックス)
            case 8:     return 'anchorMan';             // 14 - 靠山 (Anchor Man / アンカー)
            case 9:     return 'theDestroyer';          // 12 - 破壞型中場 (The Destroyer / ハードブレス)
            case 10:    return 'extraFrontman';         // 19 - 額外前鋒 (Extra Frontman / オーバーラップ)
            case 11:    return 'offensiveFullBack';     // 16 - 進攻型後衛 (Offensive Full-back / 攻擊的サイドバック)
            case 12:    return 'defensiveFullBack';     // 18 - 防守型後衛 (Defensive Full-back / 守備的サイドバック)
            case 13:    return 'targetMan';             // 04 - 目標中鋒 (Target Man / ポストプレイヤー)
            case 14:    return 'creativePlaymaker';     // 05 - 有創意的中場指揮官 (Creative Playermaker / チャンスメイカー)
            case 15:    return 'buildUp';               // 15 - 建立 (Build Up / ビルドアップ)
            case 16:    return 'offensiveGoalkeeper';   // 20 - 進攻型守門員 (Offensive Goalkeeper / 攻擊的GK)
            case 17:    return 'defensiveGoalkeeper';   // 21 - 防守型守門員 (Defensive Goalkeeper / 守備的GK)
            case 18:    return 'roamingFlank';          // 07 - 自由側翼 (Roaming Flank / インサイドレシーバー)
            case 19:    return 'crossSpecialist';       // 08 - 傳中專家 (Cross Specialist / クロサー)
            case 20:    return 'orchestrator';          // 13 - 指揮官 (Orchestrator / プレイメイカー)
            case 21:    return 'fullBackFinisher';      // 17 - 疊瓦式閘位 (Full-back Finisher / インナーラップサイドバック)
            default:    {
                console.warn('Unsupported playing style.');
                return input;
            }
        }
    },
    setter: function (input) {
        switch (input) {
            case null:                  return 0;
            case 'goalPoacher':         return 1;
            case 'dummyRunner':         return 2;
            case 'foxInTheBox':         return 3;
            case 'targetMan':           return 13;
            case 'creativePlaymaker':   return 14;
            case 'prolificWinger':      return 4;
            case 'roamingFlank':        return 18;
            case 'crossSpecialist':     return 19;
            case 'classicNo10':         return 5;
            case 'holePlayer':          return 6;
            case 'boxToBox':            return 7;
            case 'theDestroyer':        return 9;
            case 'orchestrator':        return 20;
            case 'anchorMan':           return 8;
            case 'buildUp':             return 15;
            case 'offensiveFullBack':   return 11;
            case 'fullBackFinisher':    return 21;
            case 'defensiveFullBack':   return 12;
            case 'extraFrontman':       return 10;
            case 'offensiveGoalkeeper': return 16;
            case 'defensiveGoalkeeper': return 17;
            default:                    return 0;
        }
    },
};

export const positionFunc = {
    getter: function (input) {
        switch (input) {
            case 0:  return 'C';
            case 1:  return 'B';
            case 2:  return 'A';
            case 3:  return 'B?';
            default: return 'N/A';
        }
    },
    setter: function (input) {
        switch (input) {
            case 'A': return 2;
            case 'B': return 1;
            case 'B?': return 3;
            case 'C': return 0;
            default:  return 0;
        }
    },
};

export const registeredPositionFunc = {
    getter: function (input) {
        switch (input) {
            case 0:  return 'GK';
            case 1:  return 'CB';
            case 2:  return 'LB';
            case 3:  return 'RB';
            case 4:  return 'DMF';
            case 5:  return 'CMF';
            case 6:  return 'LMF';
            case 7:  return 'RMF';
            case 8:  return 'AMF';
            case 9:  return 'LWF';
            case 10: return 'RWF';
            case 11: return 'SS';
            case 12: return 'CF';
            default: return input;
        }
    },
    setter: function (input) {
        input = (input && input.toUpperCase && input.toUpperCase()) || input;
        switch (input) {
            case 'GK':  return 0;
            case 'CB':  return 1;
            case 'LB':  return 2;
            case 'RB':  return 3;
            case 'DMF': return 4;
            case 'CMF': return 5;
            case 'LMF': return 6;
            case 'RMF': return 7;
            case 'AMF': return 8;
            case 'LWF': return 9;
            case 'RWF': return 10;
            case 'SS':  return 11;
            case 'CF':  return 12;
            default: return 0;
        }
    },
};

export const weightFunc = {
    getter: function (input) {
        return input + 30;
    },
    setter: function (input) {
        return input - 30;
    },
};
