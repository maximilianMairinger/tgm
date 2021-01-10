import GhostContentAPI from "@tryghost/content-api";

//todo: change after deployment to root url
export const api = new GhostContentAPI({
    url: 'https://dev.tgmrebrand.xyz',
    key: '062f128c326e0312972d41f705',
    version: 'v3'
});
