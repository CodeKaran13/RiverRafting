import MatchManager from "./MatchManager";
import GameManager, { GameState } from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component
{
    // Canvas Windows
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    MainMenuWindow: cc.Node = null;

    // Canvas Labels
    @property({
        type: cc.Label,
        visible: true,
        serializable: true
    })
    HealthLabel: cc.Label = null;
    @property({
        type: cc.Label,
        visible: true,
        serializable: true
    })
    ScoreLabel: cc.Label = null;

    // All Script Refs
    @property({
        type: MatchManager,
        visible: true,
        serializable: true
    })
    _matchManager: MatchManager = null;
    @property({
        type: GameManager,
        visible: true,
        serializable: true
    })
    _gameManager: GameManager = null;

    onLoad()
    {
        this._matchManager._UIManager = this;
    }

    start()
    {
        
    }

    // All UI update functions

    OnUIUpdateHealth(health: number)
    {
        this.HealthLabel.string = '' + health;
    }

    OnUIUpdateScore(score: number)
    {
        this.ScoreLabel.string = '' + score;
    }

    // All Button functions

    OnPlayButtonClick()
    {
        GameManager.currentGameState = GameState.InGame;

        this._matchManager._timeManager.restartTimer();
        this._matchManager._timeManager.startTimer();
        this._matchManager.StartGame();

        // close main menu window

        this.MainMenuWindow.active = false;
    }

    OnSubmitButtonClick()
    {

    }

}
