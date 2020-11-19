# Public facing TGM Website

# CD links

dev: https://dev.tgmrebrand.xyz/  (dev branch)
uat: https://dev.tgmrebrand.xyz/  (master branch, should be stable)

The public facing website for the TGM.

## Contribute

The frontend / client is referred as app. The backend as server.

### Development env

#### Develop app

The source of the app can be found in `/app` and the serviceWorker's in `/serviceWorker`.

```
 $ npm run devApp
```

Builds the app on save & spins up a live (notifies client to reload on change) repl server, whose source can be found in `/replServer/src`.

#### Develop server

Source found in `/server/src`.

```
 $ npm run devServer
```

Builds the server & replApp on save. The source of the replApp can be found under `/replApp`. No live reloading available, since its the prod server.

#### Develop server & app

```
 $ npm run dev
```

Watches production server & app and builds them on save. No live reloading avalible, since its the prod server.
