import express from "express"

import SSE from "express-sse"
import chokidar from "chokidar"
import yargs from "yargs"
//@ts-ignore
const args = yargs.argv
import pth from "path"

import bodyParser from "body-parser"
import fs from "fs"
import xtring from "xtring"
xtring()


declare global {
  interface String {
    splice(offset: number, text: string, removeCount?: number): string
  }
}




function formatPath (path: string) {
  let localPath = path.substr(7)
  localPath = localPath.split("\\").join("/")
  if (pth.extname(localPath) === "") localPath += "/"
  return localPath
}

const swInjection = fs.readFileSync(pth.join(__dirname, "./../res/live-reload-inject.js")).toString()



export default function init(indexUrl: string = "/", publicPath: string = "./public", streamUrl: string = "/updateStream") {
  //@ts-ignore
  let sse = new SSE()

  const swInjUrl = `<!-- Code Injected By the live server -->
<script>
(() => {
let url = "${streamUrl}";
${swInjection}
})()
</script>`
  

  let app = express()



  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());





  chokidar.watch(publicPath, { ignoreInitial: true }).on("all", (event, path) => {
    path = formatPath(path)

    console.log("Change at: \"" + path + "\"; Restaring app.")

    sse.send("reloadPlease", "event", 2);
  })


  let port = args.port
  
  if (port === undefined) {
    port = 5500
  }

  app.listen(port)

  if (!args.port) {
    console.log("Serving on port 5500")
  }


  // inject

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
          let injectAt = file.lastIndexOf("</body>") - 1
          res.send(file.splice(injectAt, swInjUrl))
        }
        else res.old_sendFile(pth.join(pth.resolve(""), path))
      }
      cb(req, res)
    })
  }

  
  app.use(express.static(pth.join(pth.resolve(""), publicPath)))
  
  app.get(streamUrl, sse.init)

  app.get(indexUrl, (req, res) => {
    res.sendFile("./public/index.html")
  })


  

  
  return app

}

