import BonusSystem from "../GamePlay/BonusSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CollisionDetection extends cc.Component
{
    @property({
        type: BonusSystem,
        visible: true,
        serializable: true
    })
    _bonusSystem: BonusSystem = null;


    onBeginContact(contact, selfCollider, otherCollider)
    {
        if(otherCollider.node.group == 'Bound')
        {
            // stop clean run on collision and restart timer for bonus system
            // console.log('physics collided');

            this._bonusSystem.stopAction();
        }
    }
}