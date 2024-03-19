import fs from "fs"
import path from "path"


const dir = Bun.argv[2]


assert(!!dir, "Please provide a directory")

fs.readdirSync(dir).forEach((file) => {
  fs.renameSync(path.join(dir, file), path.join(dir, file.replace(/@.*\./g, ".")))
})

console.log("done")


function assert(condition, message = "Assertion failed") {
  if (!condition) {
    throw new Error(message);
  }
}
