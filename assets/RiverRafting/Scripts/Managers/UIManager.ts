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
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    GameWindow: cc.Node = null;
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    SubmitScoreWindow: cc.Node = null;
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    MenuCrossWindow: cc.Node = null;
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    GameCrossWindow: cc.Node = null;

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
    @property({
        type: cc.Label,
        visible: true,
        serializable: true
    })
    SubmitScoreLabel: cc.Label = null;

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

    OpenSubmitWindow()
    {
        this.SubmitScoreLabel.string = '' + this._matchManager._scoreManager.totalScore;
        this.SubmitScoreWindow.active = true;
    }

    CloseSubmitWindow()
    {
        this.SubmitScoreWindow.active = false;
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
        this.GameWindow.active = true;
    }

    // Final submit button
    OnSubmitButtonClick()
    {
        window.$Arena.submitScore(this._matchManager._scoreManager.totalScore, GameManager.Seed);
    }

    // In game cross button functions
    OnGameCrossButtonClick()
    {
        this.GameCrossWindow.active = true;
    }
    OnGameYesButtonClick()
    {
        window.$Arena.submitScore(this._matchManager._scoreManager.totalScore, GameManager.Seed);
    }
    OnGameNoButtonClick()
    {
        this.GameCrossWindow.active = false;
    }

    // Menu cross button functions
    OnMenuCrossButtonClick()
    {
        this.MenuCrossWindow.active = true;
    }
    OnMenuYesButtonClick()
    {
        this._matchManager._scoreManager.totalScore = 0;
        window.$Arena.submitScore(this._matchManager._scoreManager.totalScore, GameManager.Seed);
    }
    OnMenuNoButtonClick()
    {
        this.MenuCrossWindow.active = false;
    }
}
