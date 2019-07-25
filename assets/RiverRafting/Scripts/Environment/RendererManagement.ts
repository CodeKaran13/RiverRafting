const { ccclass, property } = cc._decorator;

@ccclass
export default class RendererManagement extends cc.Component
{
    onCollisionEnter(other, self)
    {
        if (other.node.name == 'EndCollider')
        {
            if (self.node.getComponent(dragonBones.ArmatureDisplay) != null)
            {
                self.node.getComponent(dragonBones.ArmatureDisplay).timeScale = 0;
            }
        }
        if (other.node.name == 'StartCollider')
        {
            if (self.node.getComponent(dragonBones.ArmatureDisplay) != null)
            {
                self.node.getComponent(dragonBones.ArmatureDisplay).playAnimation('tree_movement', 4);
                self.node.getComponent(dragonBones.ArmatureDisplay).timeScale = 1;
            }
        }
    }
}