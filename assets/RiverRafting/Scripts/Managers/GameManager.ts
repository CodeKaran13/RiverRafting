import { Difficulty } from "../Enums";
import MatchManager from "./MatchManager";
import BonusSystem from "../GamePlay/BonusSystem";

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
    @property(cc.Animation)
    leftWindEffect: cc.Animation = null;
    @property(cc.Animation)
    rightWindEffect: cc.Animation = null;

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

        // this.GetData();
    }
    update(dt) {
        if (Math.floor(1 / dt) <= 35) {
            GameManager.isHighEndDevice = false;
        }
        else {
            GameManager.isHighEndDevice = true;
        }
    }

    GetData() {
        // var vars = {};
        // var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value)
        // {
        //     vars[key] = value;
        // });

        // var gameSeconds;

        // if (vars["time"] == null)
        // {
        //     this._matchManager._timeManager.totaltime = 180;
        // }
        // else
        // {
        //     this._matchManager._timeManager.totaltime = vars["time"];
        // }


        var gamedata = window.$Arena.getGameData();
        this._matchManager._timeManager.totaltime = gamedata.play_time_seconds;
        GameManager.Seed = gamedata.seed;
    }

    PlayImapactEffectAtPos(pos: cc.Vec2) {
        this.ImpactPE.node.setPosition(pos);
        this.ImpactPE.node.active = true;
        this.ImpactPE.play();
    }

    PlayWindEffect(direction: number) {
        if (direction == -1) {
            this.leftWindEffect.node.active = true;
            this.leftWindEffect.play();
        }
        else {
            this.rightWindEffect.node.active = true;
            this.rightWindEffect.play();
        }
    }

    StopWindEffect() {
        this.leftWindEffect.stop();
        this.leftWindEffect.node.active = false;
        this.rightWindEffect.stop();
        this.rightWindEffect.node.active = false;
    }

    OnGameOver() {
        // window.$Arena.submitScore(this._matchManager._scoreManager.totalScore, GameManager.Seed);
        this._matchManager._scoreManager.AddHumanSavedBonus();
        this._matchManager._scoreManager.AddCoinsBonus();
        BonusSystem.Instance.stopAction();

        this._matchManager._UIManager.OpenSubmitWindow();
    }
}
