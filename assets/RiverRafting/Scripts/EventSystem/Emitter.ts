import { EventEmitter } from "events";

class Emitter extends EventEmitter {
    constructor() {
        super();
    }
}

var TEST = new Emitter().setMaxListeners(20);

export { TEST };