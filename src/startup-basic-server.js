import {EventLogger} from "./logger/logEventHandling.js";
import WebServer from "./SimpleWebServer/WebServer.js";

const eventLogger = new EventLogger();
const webServer = new WebServer(8080, "views/SimpleEnergyConverter.html", eventLogger);

webServer.initializeServerResponseScheme();
webServer.listen();
