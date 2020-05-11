import decodeUri from "fast-decode-uri-component"
import * as global from "./../global"


const commonTitle = "TGM";
const commonTitleSeperator = " - "
const argData = "internal";

const titleElement = document.querySelector("title")

let dir = "/";
export let domainIndex: string[] = [];

//First capital
function fc(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getCurrentSubDomainPath() {
  return decodeUri(document.location.pathname) as string
}

function parseUrlToDomainIndex() {
  let currentDomain = getCurrentSubDomainPath()
  domainIndex = getCurrentSubDomainPath().split(dir)
  domainIndex.remove("");
  
  history.replaceState(argData, updateTitle(), !currentDomain.endsWith("/") ? currentDomain + dir : currentDomain)
}
parseUrlToDomainIndex()

function updateTitle() {
  let subtitle = domainIndex.Replace((e) => {
    return fc(e)
  }).join(" ")
  let title = commonTitle
  if (subtitle.length !== 0) title += commonTitleSeperator + subtitle
  titleElement.innerHTML = title
  return title
}

function replace(subdomain: string, badKey: string, goodKey: string, preventWarning: boolean): string {
  if (subdomain.includes(badKey)) {
    let oldSubdomain = subdomain;
    subdomain = subdomain.replace(badKey, goodKey)
    if (preventWarning) console.warn("Found at least one \"" + badKey + "\" in given subdomain: \"" + oldSubdomain + "\". Replacing it with \"" + goodKey + "\"; Resulting in \"" + subdomain + "\".")
  }
  return subdomain
}


export function set(level: number, subdomain: string, push: boolean = false, preventWarning = false) {


  subdomain = replace(subdomain, "/", "-", preventWarning)
  subdomain = replace(subdomain, " ", "_", preventWarning)

  let length = domainIndex.length;
  if (length < level || level < 0) {
    if (preventWarning) console.warn("Unexpected index: " + level + ". Replacing it with " + length + ".")
    level = length
  }
  domainIndex.splice(level+1);
  if (domainIndex[level] === subdomain) return;
  domainIndex[level] = subdomain;
  let domain = dir + domainIndex.join(dir) + dir
  

  
  
  // if (domain !== getCurrentSubDomainPath() + dir) {
    let title = updateTitle()
    history[push ? "pushState" : "replaceState"](argData, title, domain)
  // }
  

  
}


type DomainFragment = string
export function get(domainLevel: number, defaultDomain: string, subscription?: (domainFragment: DomainFragment) => void): DomainFragment {
  if (subscription) {
    ls.add(() => {
      let domain = domainIndex[domainLevel]
      subscription((domain !== undefined) ? domain : defaultDomain)
    })
  }
  let domain = domainIndex[domainLevel]
  return (domain !== undefined) ? domain : defaultDomain
  

  
}


let ls = []

window.onpopstate = function(e) {
  parseUrlToDomainIndex()

  ls.ea((f) => {
    f()
  })
  
};