import { ReactNode } from "react";
import { Effect, Pause } from "windups";
import { debounce } from "../App";
import { MusicTracks, playSFX, Sprites } from '../assets';

export type LoopInstance = {
    id: string,
    animation: Sprites;
    options: DialogueChain[],
    enables: LoopInstance[],
    music: MusicTracks;
};
export type DialogueChain = {
    text: string;
    second: (flags: string[], loops: LoopInstance[]) => ReactNode[];
    first: (flags: string[], loops: LoopInstance[]) => ReactNode[];
    flag?: string;
    animation: Sprites;
};

const attackLines: DialogueChain = {
    text: "Attack",
    second: () => ["Shouldn't be possible"],
    first: (flags) => [
        <>
            <Effect fn={() => playSFX("hurt")} />
            You swing your sword at the boss.{" "}
        </>,
        "it's very sad",
    ],
    animation: "attack",
};


export const thirdLoop: LoopInstance = {
    id: "third",
    animation: "idle",
    music:"quiet",
    options: [
        attackLines,
        {
            text: "Check flags",
            first: (flags) => [
                `Currently set flags are: ${flags.join(", ")}.`,
                `You ${
                    flags.includes("talk") ? "did" : "didn't"
                } talk to the boss on loop 2`,
            ],
            second: (flags) => [
                `You've already checked your flags!`,
                <div>
                    but <Pause ms={1000} /> I'll make an exception this once
                </div>,

                `Currently set flags are: ${flags.join(", ")}.`,
                `You ${
                    flags.includes("talk") ? "did" : "didn't"
                } talk to the boss on loop 2`,
            ],
            animation: "meow",
        },
        {
            text: "Check loops",
            first: (_, loops) => [
                `Currently you've been through: ${loops.length}.`,
            ],
            second: (_, loops) => [
                `You've already checked your loops!`,
                <div>
                    but <Pause ms={1000} /> I'll make an exception this once
                </div>,

                `Currently you've been through: ${loops.length}.`,
            ],
            animation: "meow",
        },
        {
            text: "set a flag",
            second: () => ["You've already set a flag"],
            first: (flags) => ["You just set a flag.", "It's ThirdFlag"],
            flag: "ThirdFlag",
            animation: "talk",
        },
    ],
    enables: [],
};

const fillerLoop: LoopInstance = {
    id: "filler",
    animation: "filler",
    music: "piano",
    options: [attackLines, {
        text: "Filler",
        second: () => ["You really clicked on the filler option twice huh"],
        first: () => ["Filler loop to test rng", "there should be 5 of these"],
        animation: "filler2"
    }],
    enables: [],
};

export const secondLoop: LoopInstance = {
    id:"second",
    animation: "idle",
    music: "breakdown",
    options: [attackLines, {
        text: "Talk",
        second: () => ["I have nothing more to say"],
        first: () => ["You really think talking will help now?", "Have at thee!"],
        flag:"talk",
        animation: "talk",
    }],
    enables: [thirdLoop, fillerLoop, fillerLoop, fillerLoop, fillerLoop, fillerLoop],
};


export const startingLoop: LoopInstance = {
    id: "starting",
    animation: "idle",
    music:"fight",
    options: [attackLines],
    // First loop is special; it will always go to the second loop based on initial state in app.tsx
    enables: [],
}; 