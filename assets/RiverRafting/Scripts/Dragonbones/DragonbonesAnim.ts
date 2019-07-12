const { ccclass, property } = cc._decorator;

@ccclass
export default class DragonbonesAnim extends cc.Component
{
    @property({
        type: dragonBones.ArmatureDisplay,
        visible: true,
        serializable: true
    })
    dragonAnim: dragonBones.ArmatureDisplay = null;

    // onLoad () {}

    start()
    {
        this.dragonAnim.playAnimation('animtion0', 0);
    }

    // update (dt) {}
}
