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
            // rend.disableRender();
        }
        if(other.node.name == 'StartCollider')
        {
            var rend: cc.RenderComponent = this.node.getComponent(cc.RenderComponent);
            rend.enabled = true;
            // rend.enableRenderer();
        }
    }
}
