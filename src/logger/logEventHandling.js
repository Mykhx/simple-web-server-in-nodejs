/* basicEventLogEmitter.emit("log", "LogEntry"); */
import {logEvent} from "./logEvent.js";
import EventEmitter from "events";

class EventLogEmitter extends EventEmitter {
    constructor() {
        super();
        this.on("log", (message2Log) => {
            logEvent(message2Log).then();
        });
    }
}

export class EventLogger {
    #eventLogEmitter

    constructor() {
        this.#eventLogEmitter = new EventLogEmitter();
    }

    log(logLevel, message) {
        switch (logLevel) {
            case "log":
                this.#eventLogEmitter.emit("log", `${message}`);
                break;
            default:
                this.#eventLogEmitter.emit("logError", `Error ${message.name}: ${message.message}`);
        }
    }
}