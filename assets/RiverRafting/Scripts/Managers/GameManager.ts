const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component
{

    onLoad()
    {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
    //     cc.director.getCollisionManager().enabledDebugDraw = true;
    //     cc.director.getCollisionManager().enabledDrawBoundingBox = true;

    //     cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
    //         cc.PhysicsManager.DrawBits.e_pairBit |
    //         cc.PhysicsManager.DrawBits.e_centerOfMassBit |
    //         cc.PhysicsManager.DrawBits.e_jointBit |
    //         cc.PhysicsManager.DrawBits.e_shapeBit;
    }

    start()
    {

    }

    // update (dt) {}
}
