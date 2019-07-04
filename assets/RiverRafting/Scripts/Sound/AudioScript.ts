const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioScript extends cc.Component {

    @property(
        {
            type: cc.AudioClip,
            visible: true,
            serializable: true
        }
    )
    BullPhussSounds: cc.AudioClip[] = [];

    @property(
        {
            type: cc.AudioClip,
            visible: true,
            serializable: true
        }
    )
    BullSpawnSounds: cc.AudioClip[] = [];

    @property(
        {
            type: cc.AudioClip,
            visible: true,
            serializable: true
        }
    )
    ButtonClickSound: cc.AudioClip = null;

    @property(
        {
            type: cc.AudioClip,
            visible: true,
            serializable: true
        }
    )
    BellSound: cc.AudioClip = null;

    @property(
        {
            type: cc.AudioClip,
            visible: true,
            serializable: true
        }
    )
    TitlePopUpSound: cc.AudioClip = null;

    @property(
        {
            type: cc.AudioClip,
            visible: true,
            serializable: true
        }
    )
    CarCrashSound: cc.AudioClip = null;

    @property(
        {
            type: cc.AudioClip,
            visible: true,
            serializable: true
        }
    )
    AmbientSound: cc.AudioClip = null;

    @property(
        {
            type: cc.AudioClip,
            visible: true,
            serializable: true
        }
    )
    public BgMusic: cc.AudioClip = null;

    @property(
        {
            type: cc.AudioClip,
            visible: true,
            serializable: true
        }
    )
    public UIButtonSound: cc.AudioClip = null;

    @property(
        {
            type: cc.AudioClip,
            visible: true,
            serializable: true
        }
    )
    public OilSound: cc.AudioClip = null;

    @property(
        {
            type: cc.AudioClip,
            visible: true,
            serializable: true
        }
    )
    public SpeedBreakerSound: cc.AudioClip = null;

    @property(
        {
            type: cc.AudioClip,
            visible: true,
            serializable: true
        }
    )
    public PotHoleSound: cc.AudioClip = null;


    @property
    isSoundOn: boolean = true;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.PlayAmbientSound();
    }
    audioid = 0;
    carpullsoundid = 0;
    carmovingsoundid = 0;
    carbonussoundid = 0;
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


    PlayMusic(AudioClip: cc.AudioClip, loop: boolean) {
        if (this.isSoundOn) {
            cc.audioEngine.playMusic(AudioClip, loop);
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


    PlayBullSpawnSound(type: number) {
        //console.log("Playing Car pull sound");
        // var rand = Math.floor(Math.random() * 4 + 1);

        // this.PlayEffect(this.BullSpawnSounds[rand], false);

        switch (type) {
            case 10:
                this.PlayEffect(this.BullSpawnSounds[0], false);
                break;
            case 20:
                this.PlayEffect(this.BullSpawnSounds[1], false);
                break;
            case 30:
                this.PlayEffect(this.BullSpawnSounds[1], false);
                break;
            case 50:
                this.PlayEffect(this.BullSpawnSounds[2], false);
                break;
            default:
                break;
        }
    }

    PlayBullPhusssSound() {
        //console.log("Playing Move pull sound");

        // var rand = Math.floor(Math.random() * 2 + 1);
        this.PlayEffect(this.BullPhussSounds[0], false);
    }

    StopCarMovingSound() {
        this.StopEffect(this.carmovingsoundid);
    }

    LowerCarMovingVolume() {
        this.LowerSoundEffectVolume(this.carmovingsoundid, 0.5);
    }

    PlayBellSound(loop: boolean) {
        // console.log("Playing WellDone sound");
        this.bellSoundID = this.PlayEffect(this.BellSound, loop);
    }

    StopBellSound() {
        this.StopEffect(this.bellSoundID);
    }

    PlayButtonClickSound() {
        // console.log("Playing bonus sound");
        this.PlayEffect(this.ButtonClickSound, false);
    }

    PlayTitlePopUpSound() {
        // console.log("Playing penalty sound");
        this.PlayEffect(this.TitlePopUpSound, false);
    }

    PlayCrashSound() {
        console.log("Playing crash sound");
        // this.PlayEffect(this.CarCrashSound,false);
    }

    PlayBGSound() {
        console.log("Playing bg sound");
        // this.PlayMusic(this.BgMusic,true);
    }

    PlayAmbientSound() {
        // console.log("Playing Ambient sound");
        this.LowerSoundMusicVolume(0.3);
        this.PlayMusic(this.AmbientSound, true);
    }

    PlayUISound() {
        // console.log("Playing Ambient sound");
        this.PlayEffect(this.UIButtonSound, false);
    }

    PlayOilSound() {
        // console.log("Playing Oil sound");
        this.PlayEffect(this.OilSound, false);
    }

    PlaySpeedBreakerSound() {
        // console.log("Playing Oil sound");
        this.PlayEffect(this.SpeedBreakerSound, false);
    }

    PlayPotHoleSound() {
        // console.log("Playing Oil sound");
        this.PlayEffect(this.PotHoleSound, false);
    }

    // update (dt) {}
}
