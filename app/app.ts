import featureRequirementsMet from "./featureDetection"

console.log("test1")




document.addEventListener("DOMContentLoaded", async () => {
  // TODO: Extra error msg
  if (!featureRequirementsMet) return;

  document.body.innerHTML = ""

  await (await import(/* webpackChunkName: "init" */"./init")).init()
})
