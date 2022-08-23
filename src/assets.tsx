import React, { ReactNode } from 'react';

export const bgm = {
    "first": "/first.mp3",
    "second" : "/second.mp3",
    "third": "/third.mp3"
}

export const sfx = {
    "talk" : "/voice_sans.mp3",
    "hurt": "/oof.mp3",

}

export const sprites = {
    "idle": "/sans_undertale.jpg",
    "attack": "/papyrus.webp",
    "talk": "/weiss.webp",
    "filler2": "/filler.png",
    "filler": "/filler.png",
    "meow": "/weiss.webp"
}

export class BgmPlayer extends React.Component<
    { track: MusicTracks },
    { currentTrack?: MusicTracks }
> {
    audioRef: React.RefObject<HTMLAudioElement>;

    constructor(props: any) {
        super(props);
        this.updateCurrentTrack = this.updateCurrentTrack.bind(this);
        this.state = {
            currentTrack: props.track,
        };
        this.audioRef = React.createRef();
    }
    updateCurrentTrack() {
        this.setState({
            currentTrack: this.props.track,
        });
        setTimeout(() => {
            this.audioRef.current!.play();
        }, 1);
        
    }

    render() {
        if (this.state.currentTrack != null) {
            return (
                <audio
                    src={bgm[this.state.currentTrack]}
                    autoPlay
                    ref={this.audioRef}
                    onEnded={this.updateCurrentTrack}
                    controls={false}
                />
            );
        }
        return null;
    }
}
const audioPlayer = new Audio();
export const playSFX = async (reqSFX: SfxTracks) => {
    if (audioPlayer.currentSrc.endsWith(sfx[reqSFX]) && !audioPlayer.paused){
        return;
    }
    audioPlayer.pause();
    audioPlayer.src = sfx[reqSFX];
    audioPlayer.currentTime = 0;
    try{
        await audioPlayer.play();
    }catch(e){
        console.log("ignoring e for dupe useEffect");
    }
    
};

export type MusicTracks = keyof typeof bgm;
export type SfxTracks = keyof typeof sfx;
export type Sprites = keyof typeof sprites;