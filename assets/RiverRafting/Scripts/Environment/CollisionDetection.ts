import BonusSystem from "../GamePlay/BonusSystem";
import HealthManager from "../Managers/HealthManager";
import Player from "../Player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CollisionDetection extends cc.Component {
    @property({
        type: BonusSystem,
        visible: true,
        serializable: true
    })
    _bonusSystem: BonusSystem = null;
    _player: Player = null;

    start() {
        this._player = this.node.getComponent(Player);
    }
    update() {
        if (!this._player.IsCollidingBound() && !this._bonusSystem.isBonusSequenceOn && !this._player.IsCycloned) {
            // console.log('starting bonus system');
            this._bonusSystem.isBonusSequenceOn = true;
            this._bonusSystem.restartCounter();
        }
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.group == 'Bound') {
            // stop clean run on collision and restart timer for bonus system
            // console.log('collided: ' + otherCollider.node.parent.parent.name);

            this._bonusSystem.stopAction();
            this.node.getComponent(HealthManager).takeDamage(5);
        }
    }
}