const { ccclass, property } = cc._decorator;

@ccclass
export default class RendererManagement extends cc.Component
{

    onCollisionEnter(other, self)
    {
        if (other.node.name == 'EndCollider')
        {
            
            var rend: cc.RenderComponent = this.node.getComponent(cc.RenderComponent);
            rend.enabled = false;
            if (self.node.getComponent(dragonBones.ArmatureDisplay) != null)
            {
                // console.log('stop animation');
                self.node.getComponent(dragonBones.ArmatureDisplay).timeScale = 0;
            }
        }
        if (other.node.name == 'StartCollider')
        {
            var rend: cc.RenderComponent = this.node.getComponent(cc.RenderComponent);
            rend.enabled = true;
            if (self.node.getComponent(dragonBones.ArmatureDisplay) != null)
            {
                // console.log('play animation');
                self.node.getComponent(dragonBones.ArmatureDisplay).playAnimation('tree_movement', 4);
                self.node.getComponent(dragonBones.ArmatureDisplay).timeScale = 1;
            }
        }
    }
}
