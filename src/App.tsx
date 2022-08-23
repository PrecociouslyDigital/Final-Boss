import React, { ReactNode } from 'react';
import { OnChar, WindupChildren } from 'windups';
import './App.css';
import { BgmPlayer, sfx, SfxTracks, Sprites, sprites, bgm, MusicTracks, Loader } from './assets';
import { startingLoop, secondLoop, LoopInstance, DialogueChain } from './loops/index';

const defaultDialogueInfo = {
    previousChoices:[],
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
        typing: boolean;
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
                typing: true
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
            return <div>Game over!</div>
        }
        if(dialogueInfo.choice != null){
            if(dialogueInfo.previousChoices.includes(dialogueInfo.choice)){
                return (
                    <UI
                        animation={dialogueInfo.choice.animation}
                        bgmTrack={settings.music ? loop.music : undefined}
                    >
                        <Dialogue
                            enableSFX={settings.sfx}
                            chain={dialogueInfo.choice.second(
                                flags,
                                previousLoops
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
    React.PropsWithChildren<{ animation: Sprites; bgmTrack?: MusicTracks }>
> = ({ children, animation, bgmTrack }) => (
    <div className="app">
        <Loader>
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

    constructor(props: any) {
        super(props);
        this.state = {
            index:0,
            typing:true,
        };
        this.advanceDialogue = this.advanceDialogue.bind(this);
        this.finishTyping = this.finishTyping.bind(this);
        this.audio = new Audio('/voice_sans.mp3');
    }

    finishTyping(){
        this.setState({
            typing:false,
        })
    }

    advanceDialogue(){
        const nextIndex = this.state.index + 1;
        if(nextIndex >= this.props.chain.length){
            this.props.onChainComplete();
        }else{
            this.setState({
                index:nextIndex,
                typing:true,
            });
        }
    }

    render(): React.ReactNode {
        const {index, typing } = this.state;
        if(typing){
            return <div className="DialogBox" onClick={this.finishTyping}>
                <WindupChildren onFinished={this.finishTyping}>
                    <OnChar fn={debounce(() => {
                        if(this.props.enableSFX){
                            this.audio.currentTime = 0;
                            this.audio.play();
                        }
                        
                    })}>
                        {this.props.chain[index]}
                    </OnChar>
                </WindupChildren>
            </div>;
        }else{
            return (
                <div className="DialogBox" onClick={this.advanceDialogue}>
                    {this.props.chain[index]}
                </div>
            );
        }

        
    }

}

export function debounce(func:()=>void, timeout = 800) {
    let timer: NodeJS.Timeout | null = null;
    if(timer == null){
        
        return () => {
            func();
            timer = setTimeout(() => {
                clearTimeout(timer!);
            }, timeout);
        };
    }else{
        return ()=>{};
    }
    
}


export default App;
