import React from 'react';
import './App.css';
import { startingLoop, secondLoop, LoopInstance, DialogueChain } from './loops/index';

const defaultDialogueInfo = {
    previousChoices:[],
};

type DialogueInfo = {
    choice?: DialogueChain,
    previousChoices: DialogueChain[],
}

class App extends React.Component<{}, {
        loop: LoopInstance;
        dialogueInfo: DialogueInfo;
        loopPool: LoopInstance[];
        previousLoops: LoopInstance[];
        flags: string[];
        gameOver: boolean;
    }>{

    constructor(props:any) {
        super(props);
        this.state = {
            loop: startingLoop,
            dialogueInfo:defaultDialogueInfo,
            loopPool:[secondLoop],
            previousLoops:[],
            flags: [],
            gameOver:false,
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
        const { dialogueInfo, loop, loopPool, previousLoops, flags, gameOver } = this.state;
        if(gameOver){
            return <div>Game over!</div>
        }
        if(dialogueInfo.choice != null){
            if(dialogueInfo.previousChoices.includes(dialogueInfo.choice)){
                return <UI animation={dialogueInfo.choice.animation}>
                    <Dialogue
                            chain={dialogueInfo.choice.second(flags)}
                            onChainComplete={this.completeDialogueChain}
                        />
                </UI>;
            }else{
                return (
                    <UI animation={dialogueInfo.choice.animation}>
                        <Dialogue
                            chain={dialogueInfo.choice.first(flags)}
                            onChainComplete={this.completeDialogueChain}
                        />
                    </UI>
                );
            }
        }else{
            return <UI animation={loop.animation}>
                <Options onSelect={this.selectDialogueChain}>
                    {this.state.loop.options.map(a => a.text)}
                </Options>
            </UI>
        }
    }
}

const UI: React.FC<React.PropsWithChildren<{animation:string}>> = ({children, animation}) => 
    <div className="App">
        <div className="Boss">animation: {animation}</div>
        <div className="Dialogue">{children}</div>
    </div>;

const Options: React.FC<React.PropsWithChildren<{onSelect: (child: number) => void}>> = ({ children, onSelect }) => (
    <ul>
        {children != null ? React.Children.map(children, (child, index) => 
            <li onClick={() => onSelect(index)}>{child}</li>
        ) : <li></li>}
    </ul>
);

class Dialogue extends React.Component<{chain: string[], onChainComplete: () => void},{index:number}>{
    constructor(props: {chain: string[], onChainComplete: () => void}) {
        super(props);
        this.state = {
            index:0
        };
        this.advanceDialogue = this.advanceDialogue.bind(this);
    }

    advanceDialogue(){
        const nextIndex = this.state.index + 1;
        if(nextIndex >= this.props.chain.length){
            this.props.onChainComplete();
        }else{
            this.setState({
                index:nextIndex,
            });
        }
    }

    render(): React.ReactNode {
        return <div className="DialogBox"
            onClick={this.advanceDialogue}
        >{this.props.chain[this.state.index]}</div>
    }

}


export default App;
