import { TEST } from "./Emitter";
import { Renderer } from "../Enums";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EventListener extends cc.Component {
    flag = true;

    onLoad() {
        // cc.systemEvent.on(Renderer.TURN_OFF, (data) => {
        //     if (this.flag)
        //         this.onTurnOffEvent(data);
        // });
        // cc.systemEvent.on(Renderer.TURN_ON, (data) => {
        //     this.onTurnOnEvent(data);
        // });
    }

    onTurnOffEvent(yPos: { pos: number[] } | boolean) {
        // console.log(yPos);
        if (yPos) {
            // console.log('event received to turn off:');
            // console.log(this.node.position.y + ' ' + yPos.pos[0]);
            if (this.node.position.y <= yPos.pos[0] && this.node.active) {
                // console.log('turning off');
                this.node.active = false;
                this.flag = false;
            }
        }
        else {
            // console.log('event received to turn off');
            this.node.children[0].active = false;
        }
    }
    onTurnOnEvent(node) {
        // console.log('event received to turn on');
        node.children[0].active = true;
    }

    onDisable() {

    }
}
