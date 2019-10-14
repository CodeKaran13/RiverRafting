import BonusSystem from "../GamePlay/BonusSystem";
import HealthManager from "../Managers/HealthManager";
import Player from "../Player";
import GameManager from "../Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CollisionDetection extends cc.Component {

    _player: Player = null;

    start() {
        this._player = Player.Instance;
    }
    update() {
        if (!this._player.IsCollidingBound() && !BonusSystem.Instance.isBonusSequenceOn && !this._player.IsCycloned) {
            // console.log('starting bonus system');
            BonusSystem.Instance.isBonusSequenceOn = true;
            BonusSystem.Instance.restartCounter();
        }
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider, otherCollider) {
        if (otherCollider.node.group == 'Bound') {
            // stop clean run on collision and restart timer for bonus system
            console.log('collided: ' + otherCollider.node.parent.parent.name);

            BonusSystem.Instance.stopAction();
            this.node.getComponent(HealthManager).takeDamage(5);

            var position = contact.getWorldManifold().points[0];
            // console.log('' + position);
            GameManager.Instance.PlayImpactEffectAtPos(position);
        }
    }
}