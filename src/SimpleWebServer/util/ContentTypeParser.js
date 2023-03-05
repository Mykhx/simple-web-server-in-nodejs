import path from "path";
import {contentTypeFromExt} from "./ContentTypeMap.js";

export function inferContentType(filePath) {
    let contentTypeExtension = contentTypeFromExt.get(path.extname(filePath).trim());
    return (contentTypeExtension !== undefined) ? contentTypeExtension : "text/html";
}