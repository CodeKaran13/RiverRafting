const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioScript extends cc.Component {

    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    bgMusic: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    buttonSound: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        serializable: true,
        visible: true
    })
    mainMenuMusic: cc.AudioClip = null;
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
    playButtonSound: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    ambientSound: cc.AudioClip = null;
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
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    windSound: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    boatBlastSound: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    popUpSound: cc.AudioClip = null;
    @property({
        type: cc.AudioClip,
        visible: true,
        serializable: true
    })
    gameOverSound: cc.AudioClip = null;

    @property
    isSoundOn: boolean = true;

    public static Instance: AudioScript = null;

    onLoad() {
        if (AudioScript.Instance == null) {
            AudioScript.Instance = this;
        }
    }

    audioid = 0;
    menuid = 0;
    ambientid = 0;
    windid = 0;

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
            cc.audioEngine.playMusic(this.bgMusic, true);
        }
    }

    PlayMainMenuMusic() {
        if (this.isSoundOn) {
            this.menuid = this.PlayEffect(this.mainMenuMusic, true);
        }
    }

    PlayAmbientMusic() {
        if (this.isSoundOn) {
            this.ambientid = this.PlayEffect(this.ambientSound, true);
        }
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
    PlayWindSoundEffect() {
        if (this.isSoundOn) {
            this.windid = this.PlayEffect(this.windSound, true);
        }
    }
    PlayBoatBlastSoundEffect() {
        if (this.isSoundOn) {
            cc.audioEngine.playEffect(this.boatBlastSound, false);
        }
    }
    PlayPopUpSoundEffect() {
        if (this.isSoundOn) {
            cc.audioEngine.playEffect(this.popUpSound, false);
        }
    }
    PlayGameOverSoundEffect() {
        if (this.isSoundOn) {
            cc.audioEngine.playEffect(this.gameOverSound, false);
        }
    }

    PlayUIButtonClickSound() {
        if (this.isSoundOn)
            this.PlayEffect(this.buttonSound, false);
    }
    PlayButtonSound() {
        if (this.isSoundOn)
            this.PlayEffect(this.playButtonSound, false);
    }
}
