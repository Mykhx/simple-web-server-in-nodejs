import url from "url";

export function getPathFrom(request, defaultURI) {
    let uri = url.parse(request.url).pathname
    return uri.trim() !== "/" ? uri : defaultURI;
}