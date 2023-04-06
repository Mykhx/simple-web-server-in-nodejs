import http from "http";
import {getPathFrom} from "./util/WebRequestParser.js";
import {retrieveRessource} from "./util/RessourceManager.js";

export default class WebServer {
    #port;
    #server;
    #logger;
    #defaultURI;

    constructor(port, defaultURI, eventLogger) {
        if (!Number.isInteger(port) && port > 0)
            throw new Error(`Invalid Port: ${port}.`);
        if (typeof eventLogger.log !== "function")
            throw new Error("Log function required.");
        this.#port = port;
        this.#logger = eventLogger;
        this.#defaultURI = defaultURI;
    }

    log = (logLevel, msg) => {
        this.#logger.log(logLevel, msg);
    }

    initializeServerResponseScheme() {
        this.#server = http.createServer((request, response) => {
            const parsedRequestPath = getPathFrom(request, this.#defaultURI);
            this.log("log", `${request.method}\t${parsedRequestPath}`);

            retrieveRessource(parsedRequestPath)
                .then((ressource) => {
                    try {
                        this.#packageResponse(ressource, response);
                    } catch (error) {
                        this.log("logError", error);
                    }
                });
        })
    }

    #packageResponse(ressource, response) {
        this.log("log", `Response ${ressource.statusCode}\t${ressource.location}`);
        response.writeHead(ressource.statusCode, {"Content-Type": ressource.contentType});
        response.end((ressource.statusCode === 200) ? ressource.data : "");
    }

    listen() {
        if (this.#server !== null)
            this.#server.listen(this.#port, () => `Server is running on port ${this.#port}.`);
    }
}