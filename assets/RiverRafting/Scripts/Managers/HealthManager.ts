import UIManager from "./UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HealthManager extends cc.Component
{

    @property(Number)
    currentHealth: number = 0;

    @property(Number)
    MaxHealth: number = 100;

    @property({
        type: UIManager,
        visible: true,
        serializable: true
    })
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
        if (this.currentHealth < 0)
        {
            this.currentHealth = 0;
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
