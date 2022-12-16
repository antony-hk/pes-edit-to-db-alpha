const PC_PRESET_LENGTH = 0xA0;

const placementFormat = [
    { key: 'x', startByte: 0x00, length: 1 },
    { key: 'y', startByte: 0x01, length: 1 },
];

const formationFormat = [
    { key: 'positions', startByte: 0x00, length: 0x01, arrayLength: 11 },
    { key: 'placements', startByte: 0x0B, length: 0x02, arrayLength: 11, subFormat: placementFormat },
];

const instructionsFormat = [
    { key: '反攻/控球遊戲', startByte: 0x00, length: 1 },    // 6AD38B 00 (反攻) --> 01 (控球遊戲)
    { key: '長傳/短傳', startByte: 0x01, length: 1 },    // 6AD38C 01 (短傳) --> 00 (長傳)
    { key: '側翼/中央', startByte: 0x02, length: 1 }, // 6AD38D 01 (中央) --> 00 (側翼)
    { key: '保持隊形/彈性', startByte: 0x03, length: 1 },// 6AD38E 00 (保持隊形) --> 01 (彈性)
    { key: '前線施壓/全體球員防守', startByte: 0x04, length: 1 },    // 6AD38F 01 (全體球員防守) --> 00 (前線施壓)
    { key: '防守中央/側翼', startByte: 0x05, length: 1 },// 6AD390 00 (中央) --> 01 (側翼)
    { key: '積極性/防守', startByte: 0x06, length: 1 }, // 6AD391 00 (積極性) --> 01 (防守)
    { key: 'unk1', startByte: 0x07, length: 1 },
    { key: 'unk2', startByte: 0x08, length: 1 },
];

const advInstructionFormat = [
    { key: 'advInstruction', startByte: 0x00, length: 1 },
    { key: 'unused1', startByte: 0x01, length: 3 },
    { key: 'playerIndex',    startByte: 0x04, length: 1 },
    { key: 'unused2', startByte: 0x05, length: 3 },
];

const settingsFormat = [
    { key: '支援', startByte: 0x00, length: 1 },    // Correct
    { key: 'unk3', startByte: 0x01, length: 1 },
    { key: '防線', startByte: 0x02, length: 1 },    // Correct
    { key: '嚴密', startByte: 0x03, length: 1 },    // Correct
    { key: 'unk4', startByte: 0x04, length: 1 },
    { key: 'unused1', startByte: 0x05, length: 3 },
    { key: 'unused2', startByte: 0x08, length: 4 },

    { key: 'manMarking1', startByte: 0x0C, length: 1 },
    { key: 'manMarking2', startByte: 0x0D, length: 1 },
    { key: 'manMarking3', startByte: 0x0E, length: 1 },
    { key: 'manMarking4', startByte: 0x0F, length: 1 },
];

export const recordLength = 0x274;
export const isFullyCovered = false;
export const format = [
    { key: 'teamId',  startByte: 0x00, length: 4 },

    { key: 'preset1Formations',      startByte: 0x04, length: 0x21, arrayLength: 3, subFormat: formationFormat },
    { key: 'preset1Instructions',    startByte: 0x67, length: 0x09, subFormat: instructionsFormat },
    // { key: 'preset1AdvInstruction1', startByte: 0x70, length: 0x08, subFormat: advInstructionFormat },  // 上
    // { key: 'preset1AdvInstruction2', startByte: 0x78, length: 0x08, subFormat: advInstructionFormat },  // 下
    // { key: 'preset1AdvInstruction3', startByte: 0x80, length: 0x08, subFormat: advInstructionFormat },  // 左
    // { key: 'preset1AdvInstruction4', startByte: 0x88, length: 0x08, subFormat: advInstructionFormat },  // 右
    { key: 'preset1Settings',        startByte: 0x90, length: 0x12, subFormat: settingsFormat },

    { key: 'preset2Formations',      startByte: (0x04 + PC_PRESET_LENGTH), length: 0x21, arrayLength: 3, subFormat: formationFormat },
    { key: 'preset2Instructions',    startByte: (0x67 + PC_PRESET_LENGTH), length: 0x09, subFormat: instructionsFormat },
    // { key: 'preset2AdvInstruction1', startByte: (0x70 + PC_PRESET_LENGTH), length: 0x08, subFormat: advInstructionFormat },  // 上
    // { key: 'preset2AdvInstruction2', startByte: (0x78 + PC_PRESET_LENGTH), length: 0x08, subFormat: advInstructionFormat },  // 下
    // { key: 'preset2AdvInstruction3', startByte: (0x80 + PC_PRESET_LENGTH), length: 0x08, subFormat: advInstructionFormat },  // 左
    // { key: 'preset2AdvInstruction4', startByte: (0x88 + PC_PRESET_LENGTH), length: 0x08, subFormat: advInstructionFormat },  // 右
    { key: 'preset2Settings',        startByte: (0x90 + PC_PRESET_LENGTH), length: 0x12, subFormat: settingsFormat },

    { key: 'preset3Formations',      startByte: (0x04 + PC_PRESET_LENGTH * 2), length: 0x21, arrayLength: 3, subFormat: formationFormat },
    { key: 'preset3Instructions',    startByte: (0x67 + PC_PRESET_LENGTH * 2), length: 0x09, subFormat: instructionsFormat },
    // { key: 'preset3AdvInstruction1', startByte: (0x70 + PC_PRESET_LENGTH * 2), length: 0x08, subFormat: advInstructionFormat },  // 上
    // { key: 'preset3AdvInstruction2', startByte: (0x78 + PC_PRESET_LENGTH * 2), length: 0x08, subFormat: advInstructionFormat },  // 下
    // { key: 'preset3AdvInstruction3', startByte: (0x80 + PC_PRESET_LENGTH * 2), length: 0x08, subFormat: advInstructionFormat },  // 左
    // { key: 'preset3AdvInstruction4', startByte: (0x88 + PC_PRESET_LENGTH * 2), length: 0x08, subFormat: advInstructionFormat },  // 右
    { key: 'preset3Settings',        startByte: (0x90 + PC_PRESET_LENGTH * 2), length: 0x12, subFormat: settingsFormat },

    { key: 'playerOrders',     startByte: 0x1E4, length: 1, arrayLength: 40 },
    { key: 'longFkTaker',      startByte: 0x20C, length: 1 }, // 6AD530 長自由球 04(index=4球員) 01(index=1球員)
    { key: 'shortFkTaker',     startByte: 0x20D, length: 1 }, // 6AD531 短自由球 04(index=4球員) 01(index=1球員)
    { key: 'secondFkTaker',    startByte: 0x20E, length: 1 }, // 6AD532 第二自由球 03(index=3球員) 01(index=1球員)
    { key: 'leftCkTaker',      startByte: 0x20F, length: 1 }, // 6AD533 左角球 04(index=4球員) 01(index=1球員)
    { key: 'rightCkTaker',     startByte: 0x210, length: 1 }, // 6AD534 右角球 04(index=4球員) 03(index=3球員)
    { key: 'pkTaker',          startByte: 0x211, length: 1 }, // 6AD535 十二碼 09(index=9球員) 01(index=1球員)
    { key: 'playerAttacking1', startByte: 0x212, length: 1 }, // 6AD536 加入進攻的球員(選擇次序1) FF(沒有) 01(index=1球員)
    { key: 'playerAttacking2', startByte: 0x213, length: 1 }, // 6AD537 加入進攻的球員(選擇次序2) FF(沒有) 01(index=1球員)
    { key: 'playerAttacking3', startByte: 0x214, length: 1 }, // 6AD538 加入進攻的球員(選擇次序3) FF(沒有) 01(index=1球員)
    { key: 'captain',          startByte: 0x215, length: 1 }, // 6AD539 隊長 04(index=4球員) 01(index=1球員)
    // { key: 'autoSub',          startByte: 0x216, length: 1 }, // 6AD53A 自動換人 00關 01非常消極 02彈性 03非常積極
    // { key: 'autoOffsideTrap',  startByte: 0x217, length: 1 }, // 6AD53B 自動佈置越位陷阱 00關 01開
    // { key: 'autoPreset',       startByte: 0x218, length: 1 }, // 6AD53C ???????? 自動變更預設戰術 ????????
    // { key: 'switchPreset',     startByte: 0x219, length: 1 }, // 6AD53D 切換預設戰術 00關 01開
    // { key: 'autoAtkLevel',     startByte: 0x21A, length: 1 }, // 6AD53E 自動更變進攻防守等級 00關 01開
    // { key: 'autoLineup',       startByte: 0x21B, length: 1 }, // 6AD53F 00未編輯 02依能力

    // { key: 'presets', startByte: 0x04, length: 0xA0, arrayLength: 2, subFormat: presetFormat },
];

// PC

// 6AD328: PlayerIndex0?? Must be GK? 00(GK?)
// 6AD329: PlayerIndex1 01(CB)
// 6AD32A: PlayerIndex2
// 6AD32B: PlayerIndex3
// 6AD32C: PlayerIndex4 04(DMF)
// 6AD32D: PlayerIndex5
// 6AD32E: PlayerIndex6 07(RMF)
// 6AD32F: PlayerIndex7 06(LMF)
// 6AD330: PlayerIndex8 08(AMF)
// 6AD331: PlayerIndex9
// 6AD332: PlayerIndex10 Position 0C(CF) 0B(SS)
// 6AD333: GK位置 前後 (推測)
// 6AD334: GK位置 左右 (推測)
// 006AD335: 0B --> 0A 閂咗流暢陣形嗰陣移後咗一格 Player 1
// 006AD336: 34 --> 33 閂咗流暢陣形嗰陣移向左一格 Player 1 05(最左)
// ...
// 6AD347: Player10 前後
// 6AD348: Player10 左右

// 6AD349: PlayerIndex0?? Must be GK? 00(GK?)
// 6AD34A: PlayerIndex1 01(CB)
// 6AD34B: PlayerIndex2
// 6AD34C: PlayerIndex3
// 6AD34D: PlayerIndex4 04(DMF)
// 6AD34E: PlayerIndex5
// 6AD34F: PlayerIndex6 07(RMF)
// 6AD350: PlayerIndex7 06(LMF)
// 6AD351: PlayerIndex8 08(AMF)
// 6AD352: PlayerIndex9
// 6AD353: PlayerIndex10 Position 0C(CF) 0B(SS)
// 6AD354: GK位置 前後 (推測)
// 6AD355: GK位置 左右 (推測)
// 006AD356: 0B 0A  --> 閂咗流暢陣形嗰陣移後咗一格 Player 1
// 006AD357: 34 33 -->  閂咗流暢陣形嗰陣移向左一格 Player 1
// ...
// 6AD368: Player10 前後
// 6AD369: Player10 左右

// 6AD36A: PlayerIndex0?? Must be GK? 00(GK?)
// ...
// 006AD374: PlayerIndex10 Position 0C(CF) 0B(SS)
// 006AD377: 0B 0A  --> 閂咗流暢陣形嗰陣移後咗一格 Player 1
// 006AD378: 34 33 -->  閂咗流暢陣形嗰陣移向左一格 Player 1
// ...
// 6AD389: Player10 前後
// 6AD38A: Player10 左右

// 進攻指示
// 6AD38B 00 (反攻) --> 01 (控球遊戲)
// 6AD38C 01 (短傳) --> 00 (長傳)
// 6AD38D 01 (中央) --> 00 (側翼)
// 6AD38E 00 (保持隊形) --> 01 (彈性)
//
// 6AD3B4 支援 05 (5格) --> 01 (1格)

// 防守指示
// 6AD38F 01 (全體球員防守) --> 00 (前線施壓)
// 6AD390 00 (中央) --> 01 (側翼)
// 6AD391 00 (積極性) --> 01 (防守)
//
// 6AD3B6 防線 06 (6格) 01 (1格)
// 6AD3B7 嚴密 07 (7格) 01 (1格)

// 6AD394 上進攻能力　05 (側翼交替) --> 00 (關閉)
// 6AD39C 下進攻能力 00(關閉) 09(假翼鋒) 08(防守[要選擇球員]) 01(沿邊線) 04(邊後衛進攻) 05(側翼交替) 06(TikiTaka) 02(假9號) 07(𠑍先接横傳) 03(假邊後衛)

// 當下進攻能力改為防守時 (選擇了index = 1的球員)，數值出現以下變化，關閉後則完全回復為之前的模樣
// 006AD39C: 00 08
// 006AD39D: 00 FF
// 006AD39E: 00 FF
// 006AD39F: 00 FF
// 006AD3A0: 00 01
// 006AD3A1: 00 FF
// 006AD3A2: 00 FF
// 006AD3A3: 00 FF

// 6AD3A4 左防守能力
// 6AD3AC 右防守能力
// 00 關閉
// 0F 鋒線拖後
// 0B 緃深防線
// 0A 湧向禁區
// 0E 反攻要員[要選擇球員]
// 0C 快速壓迫

// 左防守能力: 反攻要員
// 006AD3A4: 0F 0E
// 006AD3A5: 00 FF
// 006AD3A6: 00 FF
// 006AD3A7: 00 FF
// 006AD3A8: 00 01
// 006AD3A9: 00 FF
// 006AD3AA: 00 FF
// 006AD3AB: 00 FF
// 006AD3AC: 00 0C

// 其他
// 6AD3C4 流暢隊形 00(關) --> 01(開)
// 6AD3C5?
// 6AD3C6?
// 6AD3C7?

// 下一個陣式 start from 0x6AD3C8