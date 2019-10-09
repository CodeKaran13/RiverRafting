import MatchManager from "./MatchManager";
import GameManager, { GameState } from "./GameManager";
import HealthManager from "./HealthManager";
import TimeManager from "./TimeManager";
import ScoreManager from "./ScoreManager";
import WindTimeManager from "../Environment/WindTimeManager";
import AudioScript from "../Sound/AudioScript";

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

    @property(cc.Animation)
    explosionEffect: cc.Animation = null;
    @property(cc.Animation)
    scorePopUpEffect: cc.Animation = null;

    @property(cc.Node)
    GameSoundSprite: cc.Node = null;
    @property(cc.Node)
    MenuSoundSprite: cc.Node = null;

    public static Instance: UIManager = null;

    onLoad() {
        // this._matchManager._UIManager = this;
        this._healthManager._UIManager = this;

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
        WindTimeManager.Instance.startSequence();
        MatchManager.Instance.StartGame();

        // close main menu window

        this.MainMenuWindow.active = false;
        this.GameWindow.active = true;
    }
    OnSoundButtonClick() {
        AudioScript.Instance.PlayButtonClickSound();

        if (GameManager.Instance.IsSoundOn()) {
            this.SwitchSoundMode(false);
            AudioScript.Instance.StopBgMusic();
            this.GameSoundSprite.children[0].active = false;
            this.GameSoundSprite.children[1].active = true;
        }
        else {
            this.SwitchSoundMode(true);
            AudioScript.Instance.PlayBgMusic();
            this.GameSoundSprite.children[0].active = true;
            this.GameSoundSprite.children[1].active = false;
        }
    }
    OnMenuSoundButtonClick() {
        AudioScript.Instance.PlayButtonClickSound();

        if (GameManager.Instance.IsSoundOn()) {
            this.SwitchSoundMode(false);
            AudioScript.Instance.StopBgMusic();
            this.MenuSoundSprite.children[0].active = false;
            this.MenuSoundSprite.children[1].active = true;
        }
        else {
            this.SwitchSoundMode(true);
            AudioScript.Instance.PlayBgMusic();
            this.MenuSoundSprite.children[0].active = true;
            this.MenuSoundSprite.children[1].active = false;
        }
    }
    SwitchSoundMode(bool: boolean) {
        AudioScript.Instance.isSoundOn = bool;

        if (bool) {
            GameManager.Instance.SetLocalData('Sound', 0);
        }
        else {
            GameManager.Instance.SetLocalData('Sound', 1);
        }
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

    // Effect/Particle System
    playExplosionEffectAtPos(pos: cc.Vec2) {
        this.explosionEffect.node.group = 'default';
        this.explosionEffect.node.setPosition(pos);
        this.explosionEffect.play();
    }
    playScorePopUpAtPos(pos: cc.Vec2) {
        this.scorePopUpEffect.node.group = 'UI';
        // console.log(pos);
        this.scorePopUpEffect.node.setPosition(pos);
        this.scorePopUpEffect.play();
    }
}
