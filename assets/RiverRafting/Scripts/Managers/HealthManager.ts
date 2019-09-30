// import MatchManager from "./MatchManager";
import UIManager from "./UIManager";
import MatchManager from "./MatchManager";
import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HealthManager extends cc.Component
{

    @property(Number)
    currentHealth: number = 0;

    @property(Number)
    MaxHealth: number = 100;

    // @property({
    //     type: MatchManager,
    //     visible: true,
    //     serializable: true
    // })
    _UIManager: UIManager = null;

    // onLoad () {}

    start()
    {
        // this.currentHealth = this.MaxHealth;
        this.updateHealthLabel();
    }

    takeDamage(damage: number)
    {
        this.currentHealth -= damage;
        if (this.currentHealth <= 0)
        {
            this.currentHealth = 0;
            GameManager.Instance.OnGameOver();
        }
        this.updateHealthLabel();
    }

    increaseHP(value: number)
    {
        this.currentHealth += value;
        if (this.currentHealth > this.MaxHealth)
        {
            this.currentHealth = this.MaxHealth;
        }
        this.updateHealthLabel();
    }

    updateHealthLabel()
    {
        this._UIManager.OnUIUpdateHealth(this.currentHealth);
    }
}
