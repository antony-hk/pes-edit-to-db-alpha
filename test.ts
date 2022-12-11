import { createReverseMap } from './utils/createReverseMap.ts';

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

type DataGetAndSet<T, U> = {
    getter: (input: T) => U | undefined;
    setter: (input: U) => T | undefined;
}

export const playingStyleFunc: DataGetAndSet<TPlayingStyle, TPlayingStyleKey> = {
    getter: (i: TPlayingStyle) => (
        ReversePlayingStyle.get(i) as TPlayingStyleKey || undefined
    ),
    setter: (i: TPlayingStyleKey) => PlayingStyle[i],
};
