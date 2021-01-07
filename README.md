# TGM Website

The public facing website for the TGM.

## CD links

dev: https://dev.tgmrebrand.xyz/  (dev branch)

uat: https://dev.tgmrebrand.xyz/  (master branch, should be stable)

## Contribute

The frontend / client is referred as app. The backend as server.

### Development env

The source of the app can be found in `/app` and the serviceWorker's in `/serviceWorker`.

Builds the app on save & spins up a live (notifies client to reload on change) repl server, whose source can be found in `/replServer/src`.

```
 $ npm run devApp
```

Build the images once (may take over 10min)

```
 $ npm run compressImages
```


Watches production server & app and builds them on save. No live reloading avalible, since its the prod server.
