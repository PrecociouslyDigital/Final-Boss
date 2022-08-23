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
    "filler2": "/filler copy.png",
    "filler": "/filler.png",
    "meow": "/weiss copy.webp"
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

const loadCache: {
    bgm: {
        [key in MusicTracks]?: HTMLAudioElement;
    };
    sfx: {
        [key in SfxTracks]?: HTMLAudioElement;
    };
    sprites: {
        [key in Sprites]?: HTMLImageElement;
    };
} = {
    bgm: {},
    sfx: {},
    sprites: {},
};

const loadState: {
    bgm: {
        [key in MusicTracks]?: boolean;
    };
    sfx: {
        [key in SfxTracks]?: boolean;
    };
    sprites: {
        [key in Sprites]?: boolean;
    };
} = {
    bgm: {},
    sfx: {},
    sprites: {},
};

for (const bgmKey in bgm) {
    loadState.bgm[
        bgmKey as MusicTracks
    ] = false;
}
for (const sfxKey in sfx) {
    loadState.sfx[
        sfxKey as SfxTracks
    ] = false;
}
for (const spriteKey in sprites) {
    loadState.sprites[
        spriteKey as Sprites
    ] = false;
}
console.log(loadState);

export class Loader extends React.Component<
    React.PropsWithChildren> {
    constructor(props: any){
        super(props);
    }

    componentDidMount(){
        for(const key in bgm){
            const audio = new Audio();
            audio.oncanplaythrough = () => {
                loadState.bgm[key as MusicTracks] = true;
                this.forceUpdate();
            };
            audio.src = bgm[key as MusicTracks];
            loadCache.bgm[key as MusicTracks] = audio;
        }
        for (const key in sfx) {
            const audio = new Audio();
            audio.oncanplaythrough = () =>{
                loadState.sfx[key as SfxTracks] = true;
                this.forceUpdate();
            }
                
            audio.src = sfx[key as SfxTracks];
            loadCache.sfx[key as SfxTracks] = audio;
        }
        for (const key in sprites) {
            const img = new Image();
            img.onload = () =>{
                loadState.sprites[key as Sprites] = true;
                this.forceUpdate();
            }
            setTimeout(() => img.src = sprites[key as Sprites], 10);
            loadCache.sprites[key as Sprites] = img;
        }
    }

    isAllLoaded() : boolean{
        for(const bgmKey in loadState.bgm){
            if(loadState.bgm[bgmKey as MusicTracks] === false){
                return false;
            }
        }
        for (const sfxKey in loadState.sfx) {
            if (loadState.sfx[sfxKey as SfxTracks] === false) {
                return false;
            }
        }
        for (const spriteKey in loadState.sprites) {
            if (loadState.sprites[spriteKey as Sprites] === false) {
                return false;
            }
        }
        
        return true;
    }
    render() {
        return (
            <div>
                {this.isAllLoaded() ? this.props.children : (
                    <div className="loadingLightbox">Loading...</div>
                )}
            </div>
        );
    }


}

export type MusicTracks = keyof typeof bgm;
export type SfxTracks = keyof typeof sfx;
export type Sprites = keyof typeof sprites;