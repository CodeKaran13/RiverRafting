import BonusSystem from "../GamePlay/BonusSystem";
import Player from "../Player";
import GameManager from "../Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CollisionDetection extends cc.Component {

    _player: Player = null;

    start() {
        this._player = Player.Instance;
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider, otherCollider) {
        if (otherCollider.node.group == 'Bound') {
            // stop clean run on collision and restart timer for bonus system
            // console.log('collided: ' + otherCollider.node.parent.parent.name);
            if (BonusSystem.Instance.IS_5_SEC_SEQUENCE_ON()) {
                BonusSystem.Instance.STOP_5_SEC_SEQUENCE();
            }

            if (BonusSystem.Instance.isBonusSequenceOn)
                BonusSystem.Instance.stopAction();
            var position = contact.getWorldManifold().points[0];
            GameManager.Instance.PlayImpactEffectAtPos(position);
        }
    }

    // onCollisionStay(other, self) {
    //     if (other.node.group == 'Bound') {
    //         if (BonusSystem.Instance.IS_5_SEC_SEQUENCE_ON()) {
    //             BonusSystem.Instance.STOP_5_SEC_SEQUENCE();
    //         }
    //         if (BonusSystem.Instance.isBonusSequenceOn)
    //             BonusSystem.Instance.stopAction();
    //     }
    // }
}