import { Difficulty } from "../Enums";
import MatchManager from "./MatchManager";

export enum GameState
{
    PreGame = 0,
    InGame = 1,
    PostGame = 2
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component
{
    _matchManager: MatchManager = null;

    public static currentGameState: GameState = GameState.PreGame;
    public static currentDifficulty: Difficulty = Difficulty.Easy;

    public static Seed: number = null;

    onLoad()
    {
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

    start()
    {
        this.GetData();
    }

    GetData()
    {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value)
        {
            vars[key] = value;
        });

        var gameSeconds;

        if (vars["time"] == null)
        {
            this._matchManager._timeManager.totaltime = 180;
        }
        else
        {
            this._matchManager._timeManager.totaltime = vars["time"];
        }


        // var gamedata = window.$Arena.getGameData();
        // this._matchManager._timeManager.totaltime = gamedata.play_time_seconds;
        // GameManager.Seed = gamedata.seed;
    }

    OnGameOver()
    {
        // window.$Arena.submitScore(this._matchManager._scoreManager.totalScore, GameManager.Seed);
        this._matchManager._scoreManager.AddHumanSavedBonus();
        this._matchManager._scoreManager.AddCoinsBonus();


        this._matchManager._UIManager.OpenSubmitWindow();
    }
}
