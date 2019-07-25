import RendererManagement from "./Environment/RendererManagement";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Props extends cc.Component
{
    @property
    isStartPrefab: boolean = false;

    start()
    {
        if (this.node.children[0].getComponent(cc.BoxCollider) != null)
        {
            return;
        }

        for (let i = 0; i < this.node.childrenCount; i++)
        {
            // this.node.children[i].addComponent(RendererManagement);
            //this.node.children[i].addComponent(cc.BoxCollider);
        }
    }
}