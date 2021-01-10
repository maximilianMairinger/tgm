import GhostContentAPI from "@tryghost/content-api";

export const api = new GhostContentAPI({
    url: process.env.ghostHost,
    key: process.env.ghostApiKey,
    version: 'v3'
});
