/**
 * Generate Log entries with unique UUID (v4) based on
 */
import fs, {promises as fsPromises} from "fs";
import path from "path";
import {format} from "date-fns";
import {v4 as uuid} from 'uuid';

import {baseDir} from "../ResourceVariables.js";

const logPath = path.join(baseDir, "Logs/");

const genLogEntry = (message2Log) => {
    const dateTime = `${format(new Date(), "yyyy MMM dd\tHH:mm:ss:ms")}`;
    return `${dateTime}\t${uuid()}\t${message2Log}\n`;
};

export async function logEvent(message2Log) {
    const logEntry = genLogEntry(message2Log);

    const logFile = path.parse(path.join(logPath, "log_" + `${format(new Date(), "yyyy-MM-dd")}` + ".txt"));
    const logFileDir = logFile.dir;
    const normalizedLogFilePath = path.normalize(path.format(logFile));

    try {
        if (!fs.existsSync(logFileDir)) {
            await fsPromises.mkdir(logFileDir);
        }
        await fsPromises.appendFile(normalizedLogFilePath, logEntry);
        console.log(logEntry);
    } catch (err) {
        await fsPromises.appendFile(normalizedLogFilePath, "Error: " + logEntry);
        console.error(err);
    }
}