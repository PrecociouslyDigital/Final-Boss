import React, { ReactNode } from 'react';
import { OnChar, WindupChildren, Linebreaker, Pause } from 'windups';
import './App.css';
import { BgmPlayer, sfx, SfxTracks, Sprites, sprites, bgm, MusicTracks, Loader } from './assets';
import { startingLoop, secondLoop, LoopInstance, DialogueChain } from './loops/index';

const defaultDialogueInfo: DialogueInfo = {
    previousChoices: [],
    choice: {
        text: "never",
        animation:"idle",
        second: () => [],
        first: () => [
        <>
            The last of the drakes between you and the boss fall to your bow. On the dais stands a
            solitary figure, awaiting your arrival.
        </>,
        <>
            "Excellent! At last! Take your stand, champion of the gods! This all
            ends now."
        </>,
    ],}
};

type DialogueInfo = {
    choice?: DialogueChain,
    previousChoices: DialogueChain[],
}

type AppState = {
    loop: LoopInstance;
    dialogueInfo: DialogueInfo;
    loopPool: LoopInstance[];
    previousLoops: LoopInstance[];
    flags: string[];
    gameOver: boolean;
    settings: {
        sfx: boolean;
        music: boolean;
    };
};

class App extends React.Component<{}, AppState>{

    constructor(props:any) {
        super(props);
        this.state = {
            loop: startingLoop,
            dialogueInfo:defaultDialogueInfo,
            loopPool:[secondLoop],
            previousLoops:[],
            flags: [],
            gameOver:false,
            settings:{
                sfx: true,
                music: true,
            }
        };
        this.completeDialogueChain = this.completeDialogueChain.bind(this);
        this.selectDialogueChain = this.selectDialogueChain.bind(this);
    }

    completeDialogueChain(){
        this.setState({
            ...this.state,
            dialogueInfo: {
                choice: undefined,
                previousChoices:[...this.state.dialogueInfo.previousChoices, this.state.dialogueInfo.choice!],
            },
        });
    }

    selectDialogueChain(index: number){
        const {dialogueInfo, loop, loopPool, previousLoops, flags} = this.state;

        if (index === 0) {
            // If we have more than once choice, We need at least one other choice
            if(loop.options.length > 1 && !loop.options.slice(1).some(c => dialogueInfo.previousChoices.includes(c))){
                    this.setState({
                        ...this.state,
                        dialogueInfo: {
                            ...dialogueInfo,
                            // set the new choice
                            choice: loop.options[0],
                            //hack to force the second choice to appear
                            previousChoices: [...dialogueInfo.previousChoices, loop.options[0]],
                        }
                    });
                    return;
            }
            let newLoopPool = [...loopPool, ...loop.enables];
            if(newLoopPool.length === 0){
                //We're out of loops, this should always be game over
                this.setState({
                    gameOver:true,
                });
                return;
            }
            //0 should always be fight/progress
            const newLoopIndex = Math.floor(Math.random() * newLoopPool.length);
            const newLoop = newLoopPool[newLoopIndex];
            // Remove the selected loop so we don't roll it again
            newLoopPool.splice(newLoopIndex,1);
            // Get the new loop and remove the old loop from the pool
            this.setState({
                // Make sure we get any "required" flags from this loop,
                flags:loop.options[0].flag != null ? [...flags, loop.options[0].flag]: flags,
                loop: newLoop,
                loopPool: newLoopPool,
                previousLoops:[...previousLoops, loop],

                dialogueInfo:{
                    //we still need to push the fight dialogue into the dialogueInfo
                    // This will pollute the previousChoices for the next loop, but since this choice should be gone it should be fine.
                    choice:loop.options[0],
                    previousChoices:[],
                } 
            })
        } else {
            const selectedOption = loop.options[index];
            this.setState({
                ...this.state,
                dialogueInfo: {
                    ...dialogueInfo,
                    // set the new choice
                    choice: selectedOption,
                    previousChoices: dialogueInfo.previousChoices,
                },
                // Add flags from the new choice
                flags: selectedOption.flag!= null && !flags.includes(selectedOption.flag) ? [...flags, selectedOption.flag] : flags,
            });
        }
    }
    render() {
        const { dialogueInfo, loop, loopPool, previousLoops, flags, gameOver, settings } = this.state;
        if(gameOver){
            return (
                <UI
                    animation={"idle"}
                    bgmTrack={settings.music ? "ambient" : undefined}
                    changeSettings={(newSettings) =>
                        this.setState({
                            settings: {
                                ...settings,
                                ...newSettings,
                            },
                        })
                    }
                >
                    <div className="loadingLightbox">
                        <WindupChildren>
                            The world seems frozen around you. There is no more
                            road to travel. Nothing more to do. Just you, and
                            Kaiisse, and the setting sun. <br />
                            <Pause ms={3000} />
                            "There is nothing more for us in this place. Shall
                            we part ways then? Each of us to explore the far
                            reaches of this world."
                            <br />
                            <Pause ms={3000} />
                            Of course I shall miss you. But we will meet again,
                            and next time we will have more stories to tell. If
                            you ever need me, you know how to find me. Go on,
                            then! See you soon, <Pause ms={700} /> my friend.
                        </WindupChildren>
                    </div>
                </UI>
            );
        }
        
        if(dialogueInfo.choice != null){
            if(dialogueInfo.previousChoices.includes(dialogueInfo.choice)){
                return (
                    <UI
                        animation={dialogueInfo.choice.animation}
                        bgmTrack={settings.music ? loop.music : undefined}
                        changeSettings={(newSettings) =>
                            this.setState({
                                settings: {
                                    ...settings,
                                    ...newSettings,
                                },
                            })
                        }
                    >
                        <Dialogue
                            enableSFX={settings.sfx}
                            chain={dialogueInfo.choice.second(
                                flags,
                                previousLoops,

                            )}
                            onChainComplete={this.completeDialogueChain}
                        />
                    </UI>
                );
            }else{
                return (
                    <UI
                        animation={dialogueInfo.choice.animation}
                        bgmTrack={settings.music ? loop.music : undefined}
                        changeSettings={(newSettings) =>
                            this.setState({
                                settings: {
                                    ...settings,
                                    ...newSettings,
                                },
                            })
                        }
                    >
                        <Dialogue
                            enableSFX={settings.sfx}
                            chain={dialogueInfo.choice.first(
                                flags,
                                previousLoops
                            )}
                            onChainComplete={this.completeDialogueChain}
                        />
                    </UI>
                );
            }
        }else{
            return (
                <UI
                    animation={loop.animation}
                    bgmTrack={settings.music ? loop.music : undefined}
                    changeSettings={(newSettings) => this.setState({
                        settings:{
                            ...settings,
                            ...newSettings,
                        }
                    })}
                >
                    <Options onSelect={this.selectDialogueChain}>
                        {this.state.loop.options.map((a) => a.text)}
                    </Options>
                </UI>
            );
        }
    }
}

const UI: React.FC<
    React.PropsWithChildren<{ animation: Sprites; bgmTrack?: MusicTracks, changeSettings: (settings: {
        sfx?:boolean,
        music?: boolean,
    }) => void }>
> = ({ children, animation, bgmTrack, changeSettings }) => (
    <div className="app">
        <Loader changeSettings={changeSettings}>
            <div className="boss">
                <img src={sprites[animation]} />
            </div>
            <div className="dialogue">{children}</div>
            {bgmTrack != null ? <BgmPlayer track={bgmTrack}></BgmPlayer> : null}
        </Loader>
    </div>
);

const Options: React.FC<React.PropsWithChildren<{onSelect: (child: number) => void}>> = ({ children, onSelect }) => (
    <ul>
        {children != null ? React.Children.map(children, (child, index) => 
            <li onClick={() => onSelect(index)}>{child}</li>
        ) : <li></li>}
    </ul>
);


class Dialogue extends React.Component<{chain: ReactNode[], onChainComplete: () => void, enableSFX: boolean},{index:number, typing:boolean}>{

    audio: HTMLAudioElement;
    beingVoiced: boolean;

    constructor(props: any) {
        super(props);
        this.state = {
            index:0,
            typing:props.enableSFX,
        };
        this.advanceDialogue = this.advanceDialogue.bind(this);
        this.finishTyping = this.finishTyping.bind(this);
        this.audio = new Audio('/sfx/voicebit.wav');
        this.beingVoiced = false;

    }

    finishTyping(){
        this.setState({
            typing:false,
        });
        this.beingVoiced = false;
    }

    advanceDialogue(){
        const nextIndex = this.state.index + 1;
        if(nextIndex >= this.props.chain.length){
            this.props.onChainComplete();
        }else{
            this.setState({
                index:nextIndex,
                typing:this.props.enableSFX,
            });
        }
    }

    render(): React.ReactNode {
        const {index, typing } = this.state;
        if(typing){
            return (
                <div className="DialogBox" onClick={this.finishTyping}>
                    <WindupChildren onFinished={this.finishTyping}>
                        <OnChar
                            fn={debounce((char) => {
                                if(char === '"'){
                                    this.beingVoiced = !this.beingVoiced;
                                }
                                if (this.props.enableSFX && this.beingVoiced) {
                                    this.audio.currentTime = 0;
                                    this.audio.play();
                                }
                            })}
                        >
                            {this.props.chain[index]}
                        </OnChar>
                    </WindupChildren>
                </div>
            );
        }else{
            return (
                <div className="DialogBox" onClick={this.advanceDialogue}>
                    {this.props.chain[index]}
                </div>
            );
        }

        
    }

}

export function debounce(func:(c:string)=>void, timeout = 800) {
    let timer: NodeJS.Timeout | null = null;
    if(timer == null){
        
        return (c : string) => {
            func(c);
            timer = setTimeout(() => {
                clearTimeout(timer!);
            }, timeout);
        };
    }else{
        return ()=>{};
    }
    
}


export default App;
