import UIManager from "./UIManager";
import GameManager from "./GameManager";
import Player from "../Player";
import AudioScript from "../Sound/AudioScript";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HealthManager extends cc.Component {

    @property(Number)
    currentHealth: number = 0;

    @property(Number)
    MaxHealth: number = 100;

    start() {
        this.updateHealthLabel();
    }

    takeDamage(damage: number) {
        this.currentHealth -= damage;
        if (this.currentHealth <= 30) {
            UIManager.Instance.playLowHealthAnim();
        }
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            GameManager.Instance.OnGameOver();
            Player.Instance.node.group = 'Cull';
            UIManager.Instance.playExplosionEffectAtPos(Player.Instance.node.position);
            AudioScript.Instance.PlayBoatBlastSoundEffect();
        }
        this.updateHealthLabel();
    }

    increaseHP(value: number) {
        this.currentHealth += value;

        if (this.currentHealth > 30) {
            UIManager.Instance.stopLowHealthAnim();
        }

        if (this.currentHealth > this.MaxHealth) {
            this.currentHealth = this.MaxHealth;
        }
        this.updateHealthLabel();
    }

    updateHealthLabel() {
        UIManager.Instance.OnUIUpdateHealth(this.currentHealth);
    }
}
