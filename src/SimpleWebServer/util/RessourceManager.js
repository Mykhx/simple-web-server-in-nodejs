import path from "path";
import fs, {promises as fsPromises} from "fs";
import {inferContentType} from "./ContentTypeParser.js";
import {baseDir, defaultFullRessourceLocation404, webResourcesFolder} from "../../ResourceVariables.js";

function getRelativeResourceLocation(resourcePath) {
    return (resourcePath.trim().length === 0 || resourcePath === "/") ?
        path.join(webResourcesFolder)
        : path.join(webResourcesFolder, resourcePath);
}

function locateRessource(resourcePath) {
    const relativeResourceLocation = getRelativeResourceLocation(resourcePath);
    const absoluteResourceLocation = path.join(baseDir, relativeResourceLocation);

    if (fs.existsSync(absoluteResourceLocation))
        return absoluteResourceLocation;
    else
        return defaultFullRessourceLocation404;
}

export async function retrieveRessource(resourcePath) {
    let ressource = {
        contentType: "",
        data: "",
        statusCode: 200,
        location: ""
    }
    ressource.contentType = inferContentType(resourcePath);
    ressource.location = locateRessource(resourcePath, ressource.contentType);
    ressource.statusCode = (ressource.location.includes("404")) ? 404 : 200;
    if (ressource.location.length !== 0) {
        try {
            ressource.data = await fsPromises.readFile(ressource.location, ressource.contentType.includes("text") ? "utf8" : "");
        } catch (error) {
            ressource.statusCode = 500;
            ressource.error = error;
        }
    }
    return ressource;
}