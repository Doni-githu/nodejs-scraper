import { HTTPRequest } from "puppeteer";

export default function (request: HTTPRequest) {
    if (request.isInterceptResolutionHandled()) return;
    const doNotDowloadUrlsTypes = ['png', 'svg', 'jpg', 'jpeg', 'woff2', 'css']
    const typeUrl = request.url().split("?")[0].split(".").reverse()[0]
    if (doNotDowloadUrlsTypes.includes(typeUrl)) {
        request.abort();
    } else {
        request.continue()
    }
}