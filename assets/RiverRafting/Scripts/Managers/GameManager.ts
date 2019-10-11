import { Difficulty } from "../Enums";
import MatchManager from "./MatchManager";
import BonusSystem from "../GamePlay/BonusSystem";
import TimeManager from "./TimeManager";
import UIManager from "./UIManager";
import ScoreManager from "./ScoreManager";
import Player from "../Player";
import AudioScript from "../Sound/AudioScript";

export enum GameState {
    PreGame = 0,
    InGame = 1,
    PostGame = 2
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
    _matchManager: MatchManager = null;

    @property(cc.Animation)
    ImpactPE: cc.Animation = null;
    @property(cc.ParticleSystem)
    rainPS: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    boatEmitterPS: cc.ParticleSystem = null;
    @property(cc.Animation)
    leftWindEffect: cc.Animation = null;
    @property(cc.Animation)
    rightWindEffect: cc.Animation = null;

    @property
    IsPublicBuild: boolean = false;

    public static currentGameState: GameState = GameState.PreGame;
    public static currentDifficulty: Difficulty = Difficulty.Easy;

    public static Seed: number = null;
    public static isHighEndDevice: boolean = true;

    public static Instance: GameManager = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;

        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;

        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;
    }

    start() {
        if (GameManager.Instance == null) {
            GameManager.Instance = this;
        }

        this.startFPSsequence();

        // AudioScript.Instance.PlayMainMenuMusic();
        // AudioScript.Instance.PlayAmbientMusic();

        this.GetData();

        if (!this.IsSoundOn()) {
            UIManager.Instance.SwitchSoundMode(false);
            AudioScript.Instance.StopMusic();
            // UIManager.Instance.GameSoundSprite.children[0].active = false;
            // UIManager.Instance.GameSoundSprite.children[1].active = true;
            UIManager.Instance.MenuSoundSprite.children[0].active = false;
            UIManager.Instance.MenuSoundSprite.children[1].active = true;
        }
        else {
            UIManager.Instance.SwitchSoundMode(true);
            AudioScript.Instance.PlayMainMenuMusic();
            AudioScript.Instance.PlayAmbientMusic();
            // UIManager.Instance.GameSoundSprite.children[0].active = true;
            // UIManager.Instance.GameSoundSprite.children[1].active = false;
            UIManager.Instance.MenuSoundSprite.children[0].active = true;
            UIManager.Instance.MenuSoundSprite.children[1].active = false;
        }
    }

    GetData() {
        if (!this.IsPublicBuild) {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });

            var gameSeconds;

            if (vars["time"] == null) {
                TimeManager.Instance.totaltime = 180;
            }
            else {
                TimeManager.Instance.totaltime = vars["time"];
            }
        }
        else {
            var gamedata = window.$Arena.getGameData();
            TimeManager.Instance.totaltime = gamedata.play_time_seconds;
            GameManager.Seed = gamedata.seed;
        }
    }

    PlayImpactEffectAtPos(pos: cc.Vec2) {
        this.ImpactPE.node.group = 'default';
        this.ImpactPE.node.setPosition(pos);
        // this.ImpactPE.node.active = true;
        this.ImpactPE.play();
    }

    PlayWindEffect(direction: number) {
        if (direction == -1) {
            // this.leftWindEffect.node.active = true;
            this.leftWindEffect.node.group = 'Weather';
            this.leftWindEffect.play();
        }
        else {
            // this.rightWindEffect.node.active = true;
            this.rightWindEffect.node.group = 'Weather';
            this.rightWindEffect.play();
        }
    }

    StopWindEffect() {
        this.leftWindEffect.stop();
        // this.leftWindEffect.node.active = false;
        this.leftWindEffect.node.group = 'Cull';
        this.rightWindEffect.stop();
        this.rightWindEffect.node.group = 'Cull';
        // this.rightWindEffect.node.active = false;
    }

    OnGameOver() {
        AudioScript.Instance.PlayGameOverSoundEffect();

        GameManager.currentGameState = GameState.PostGame;
        AudioScript.Instance.StopMusic();
        this.boatEmitterPS.stopSystem();

        ScoreManager.Instance.AddHumanSavedBonus();
        ScoreManager.Instance.AddCoinsBonus();
        BonusSystem.Instance.stopAction();

        UIManager.Instance.OpenSubmitWindow();
    }

    // FPS sequence
    fpsSequence: cc.ActionInterval = null;
    startFPSsequence() {
        var time = cc.delayTime(2);
        this.fpsSequence = cc.sequence(time, cc.callFunc(this.checkFPS, this));
        this.node.runAction(this.fpsSequence.repeatForever());
    }
    checkFPS() {
        if (Math.floor(1 / cc.director.getDeltaTime()) <= 35) {
            GameManager.isHighEndDevice = false;
            if (this.rainPS.active) {
                this.rainPS.stopSystem();
            }
        }
        else {
            GameManager.isHighEndDevice = true;
            if (!this.rainPS.active) {
                this.rainPS.resetSystem();
            }
        }
    }
    IsSoundOn(): boolean {
        var value = cc.sys.localStorage.getItem('Sound');

        if (value == null || value != 1) {
            return true;
        }
        else {
            return false;
        }
    }
    SetLocalData(itemName: string, value: number) {
        cc.sys.localStorage.setItem(itemName, value);
    }
}
