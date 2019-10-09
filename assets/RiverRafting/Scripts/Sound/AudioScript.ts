const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioScript extends cc.Component {

    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    gameMusic: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    ButtonClickSound: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    humanSavedSound: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    TitlePopUpSound: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    AmbientSound: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    coinCollect: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    dockImpact: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    healthCollect: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    floatingWoodImpact: cc.AudioClip = null;

    @property
    isSoundOn: boolean = true;

    public static Instance: AudioScript = null;

    onLoad() {
        if (AudioScript.Instance == null) {
            AudioScript.Instance = this;
        }
    }

    audioid = 0;
    bellSoundID = 0;

    PlayEffect(AudioClip: cc.AudioClip, loop: boolean) {
        if (this.isSoundOn) {
            this.audioid = cc.audioEngine.playEffect(AudioClip, loop);
        }
        else {
            this.audioid = -1;
        }
        return this.audioid;
    }
    LowerSoundEffectVolume(effectid: number, volume: number) {
        if (this.isSoundOn) {
            cc.audioEngine.setVolume(effectid, volume);
        }
    }
    StopEffect(effectid: number) {
        if (this.isSoundOn) {
            cc.audioEngine.stopEffect(effectid);
        }
    }
    LowerSoundMusicVolume(volume: number) {
        if (this.isSoundOn) {
            cc.audioEngine.setMusicVolume(volume);
        }
    }
    StopMusic() {
        if (this.isSoundOn) {
            cc.audioEngine.stopMusic();
        }
    }

    PlayBgMusic() {
        if (this.isSoundOn) {
            cc.audioEngine.playMusic(this.gameMusic, true);
        }
    }
    StopBgMusic() {
        cc.audioEngine.stopMusic();
    }

    PlayCoinCollectSound() {
        if (this.isSoundOn) {
            cc.audioEngine.playEffect(this.coinCollect, false);
        }
    }
    PlayHealthCollectSound() {
        if (this.isSoundOn) {
            cc.audioEngine.playEffect(this.healthCollect, false);
        }
    }
    PlayHumanCollectSound() {
        if (this.isSoundOn) {
            cc.audioEngine.playEffect(this.humanSavedSound, false);
        }
    }
    PlayDockImpactSound() {
        if (this.isSoundOn) {
            cc.audioEngine.playEffect(this.dockImpact, false);
        }
    }
    PlayWoodImpactSound() {
        if (this.isSoundOn) {
            cc.audioEngine.playEffect(this.floatingWoodImpact, false);
        }
    }
    PlayButtonClickSound() {
        // console.log("Playing bonus sound");
        this.PlayEffect(this.ButtonClickSound, false);
    }
}
