import express from "express"
import expressWs from "express-ws"
import chokidar from "chokidar"
import yargs from "yargs"
//@ts-ignore
const args = yargs.argv
import pth from "path"

import bodyParser from "body-parser"
import fs from "fs"
import xtring from "xtring"
import xrray from "xrray"
import detectPort from "detect-port"
xrray()
xtring()

// only used when no parameter for port in args is given
const defaultPortStart = 3050



function formatPath (path: string) {
  let localPath = path.substr(7)
  localPath = localPath.split("\\").join("/")
  if (pth.extname(localPath) === "") localPath += "/"
  return localPath
}

const swInjection = fs.readFileSync(pth.join(__dirname, "./../res/live-reload-inject.js")).toString()



export default function init(indexUrl: string = "/", publicPath: string = "./public", wsUrl: string = "wsReplServer") {

  if (!wsUrl.startsWith("/")) wsUrl = "/" + wsUrl
  console.log("url", wsUrl)

  



  

  let ex = express()
  expressWs(ex)
  let app = ex as typeof ex & { ws: (route: string, fn: (ws: WebSocket & {on: WebSocket["addEventListener"], off: WebSocket["removeEventListener"]}, req: any) => void) => void }

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());




  chokidar.watch(publicPath, { ignoreInitial: true }).on("all", (event, path) => {
    path = formatPath(path)

    console.log("Change at: \"" + path + "\"; Restaring app.")

    //@ts-ignore
    clients.Inner("send", ["reload please"])
  })


  
  let port = args.port
  
  if (port === undefined) {
    (detectPort(defaultPortStart) as any).then((port) => {
      app.listen(port)
      console.log("Serving on http://127.0.0.1:" + port)
    })
    
  }
  else app.listen(port)
  

  



  // inject
  const swInjUrl = `
<!-- Code Injected By the live server -->
<script>
(() => {
let url = "ws://127.0.0.1:${port}${wsUrl}";
${swInjection}
})()
</script>`




  //@ts-ignore
  app.old_get = app.get
  //@ts-ignore
  app.get = (url: string, cb: (req: any, res: any) => void) => {
    //@ts-ignore
    app.old_get(url, (req, res) => {
      res.old_sendFile = res.sendFile
      res.sendFile = (path: string) => {
        let ext = pth.extname(path)
        if (ext === ".html" || ext === ".htm") {
          let file = fs.readFileSync(path).toString()
          let injectAt = file.lastIndexOf("</body>")
          res.send(file.splice(injectAt, 0, swInjUrl))
        }
        else res.old_sendFile(pth.join(pth.resolve(""), path))
      }
      cb(req, res)
    })
  }

  let clients: WebSocket[] = []
  app.ws(wsUrl, (ws) => {
    console.log("await open")
    ws.on("message", (e) => {
      console.log("mess", e)

    })
    


    ws.on("open", () => {
      console.log("wsssss")


      setInterval(() => {
        ws.send("any")
        console.log("rel")
  
  
      }, 2000)
      clients.add(ws)
      ws.on("close", () => {
        clients.rmV(ws)
      })
    })


  })


  app.get(indexUrl, (req, res) => {
    console.log("send")
    
    res.sendFile("./public/index.html")
  })


  
  app.use(express.static(pth.join(pth.resolve(""), publicPath)))


  

  
  



  
  return app

}

