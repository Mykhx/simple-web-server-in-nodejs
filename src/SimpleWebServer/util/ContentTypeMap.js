const populateContentTypeMap = () => {
    let contentTypeMap = new Map();
    contentTypeMap.set(".http", "text/html");
    contentTypeMap.set("", "text/html"); // default request via "/"
    contentTypeMap.set(".css", "text/css");
    contentTypeMap.set(".js", "text/javascript");
    //contentTypeMap.set(".json", "application/json");
    contentTypeMap.set(".ico", "image/x-icon");
    contentTypeMap.set(".svg", "image/svg+xml")
    contentTypeMap.set(".jpg", "image/jpeg")
    contentTypeMap.set(".png", "image/png")
    return contentTypeMap;
}
export const contentTypeFromExt = populateContentTypeMap();

