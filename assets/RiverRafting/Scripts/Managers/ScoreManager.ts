import UIManager from "./UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScoreManager extends cc.Component {

    @property
    perCoinBonus: number = 10;
    @property
    perHumanSavedBonus: number = 20;

    cleanRunBonus: number = 0;
    totalHumanSaved: number = 0;
    humanSavedBonus: number = 0;
    totalCoinsCollected: number = 0;
    coinsCollectedBonus: number = 0;
    totalScore: number = 0;

    public static Instance: ScoreManager = null;

    start() {
        if (ScoreManager.Instance == null) {
            ScoreManager.Instance = this;
        }
    }

    AddBonus(value: number) {
        this.cleanRunBonus += value;
        // this.AddScore(this.cleanRunBonus);
    }
    AddCoinsBonus() {
        this.coinsCollectedBonus = this.totalCoinsCollected * this.perCoinBonus;
    }
    AddHumanSavedBonus() {
        this.humanSavedBonus = this.totalHumanSaved * this.humanSavedBonus;
    }

    AddScore(value: number) {
        this.totalScore += value;
        UIManager.Instance.OnUIUpdateScore(this.totalScore);
    }
    SubScore(value: number) {
        this.totalScore -= value;
        if (this.totalScore < 0) {
            this.totalScore = 0;
        }

        UIManager.Instance.OnUIUpdateScore(this.totalScore);
    }
}
