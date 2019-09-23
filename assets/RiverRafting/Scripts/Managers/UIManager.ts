import MatchManager from "./MatchManager";
import GameManager, { GameState } from "./GameManager";
import HealthManager from "./HealthManager";
import TimeManager from "./TimeManager";
import ScoreManager from "./ScoreManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
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
    @property({
        type: cc.Label,
        visible: true,
        serializable: true
    })
    CleanRunBonusLabel: cc.Label = null;
    @property({
        type: cc.Label,
        visible: true,
        serializable: true
    })
    HumansSavedLabel: cc.Label = null;
    @property({
        type: cc.Label,
        visible: true,
        serializable: true
    })
    CoinsCollectedLabel: cc.Label = null;

    // All Script Refs
    @property({
        type: HealthManager,
        visible: true,
        serializable: true
    })
    _healthManager: HealthManager = null;

    //Sprite refs
    @property(cc.Sprite)
    healthBarSprite: cc.Sprite = null;

    public static Instance: UIManager = null;

    onLoad() {
        // this._matchManager._UIManager = this;
        this._healthManager._UIManager = this;
    }

    start() {
        if (UIManager.Instance == null) {
            UIManager.Instance = this;
        }
    }

    // All UI update functions

    OnUIUpdateHealth(health: number) {
        this.HealthLabel.string = '' + health;

        var fillValue = health / 100;

        this.healthBarSprite.fillRange = fillValue;
    }

    OnUIUpdateScore(score: number) {
        this.ScoreLabel.string = '' + score;
    }

    OpenSubmitWindow() {
        this.CleanRunBonusLabel.string = '' + ScoreManager.Instance.cleanRunBonus;
        this.HumansSavedLabel.string = '' + ScoreManager.Instance.totalHumanSaved + ' X ' + ScoreManager.Instance.perHumanSavedBonus;
        this.CoinsCollectedLabel.string = '' + ScoreManager.Instance.totalCoinsCollected + ' X ' + ScoreManager.Instance.perCoinBonus;
        this.SubmitScoreLabel.string = '' + ScoreManager.Instance.totalScore;
        this.SubmitScoreWindow.active = true;
    }

    CloseSubmitWindow() {
        this.SubmitScoreWindow.active = false;
    }

    // All Button functions
    OnPlayButtonClick() {
        GameManager.currentGameState = GameState.InGame;

        TimeManager.Instance.restartTimer();
        TimeManager.Instance.startTimer();
        MatchManager.Instance.StartGame();

        // close main menu window

        this.MainMenuWindow.active = false;
        this.GameWindow.active = true;
    }

    // Final submit button
    OnSubmitButtonClick() {
        window.$Arena.submitScore(ScoreManager.Instance.totalScore, GameManager.Seed);
    }

    // In game cross button functions
    OnGameCrossButtonClick() {
        this.GameCrossWindow.active = true;
    }
    OnGameYesButtonClick() {
        window.$Arena.submitScore(ScoreManager.Instance.totalScore, GameManager.Seed);
    }
    OnGameNoButtonClick() {
        this.GameCrossWindow.active = false;
    }

    // Menu cross button functions
    OnMenuCrossButtonClick() {
        this.MenuCrossWindow.active = true;
    }
    OnMenuYesButtonClick() {
        ScoreManager.Instance.totalScore = 0;
        window.$Arena.submitScore(ScoreManager.Instance.totalScore, GameManager.Seed);
    }
    OnMenuNoButtonClick() {
        this.MenuCrossWindow.active = false;
    }
}
