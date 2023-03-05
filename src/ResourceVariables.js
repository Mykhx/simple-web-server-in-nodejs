// TODO Max 2023-01-18 ugly workaround
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const baseDir = path.join(__dirname, "./../");
export const defaultFullRessourceLocation404 = path.join(baseDir, "WebResources/views", "404.html");
export const webResourcesFolder = "WebResources";