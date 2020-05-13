import decodeUri from "fast-decode-uri-component"
import * as global from "./../global"


const commonTitle = "TGM";
const commonTitleSeperator = " - "
const commonSubtileSeperator = " > "
const maxSubtiles = 2
const toMuchSubtitlesTruncate = "..."
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
  let myDomainIndex = [...domainIndex]
  let title = commonTitle + commonTitleSeperator
  if (myDomainIndex.length > maxSubtiles) {
    myDomainIndex = myDomainIndex.splice(myDomainIndex.length - maxSubtiles)
    title = title + toMuchSubtitlesTruncate + commonSubtileSeperator
  }
  else title
  let subtitle = myDomainIndex.replace((e) => {
    return e.length < 3 ? e.toUpperCase() : fc(e)
  }).join(commonSubtileSeperator)
  
  if (subtitle.length !== 0) title += subtitle
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


export function set(subdomain: string, level: number = 0, push: boolean = true, preventWarning = false) {


  subdomain = replace(subdomain, " ", "-", preventWarning)

  let length = domainIndex.length;
  if (length < level || level < 0) {
    if (preventWarning) console.warn("Unexpected index: " + level + ". Replacing it with " + length + ".")
    level = length
  }

  domainIndex.splice(level+1);
  
  let subdomains = subdomain.split(dir)
  let anyChange = false
  subdomains.ea((sub, i) => {
    let ind = i + level
    if (domainIndex[ind] !== sub) {
      anyChange = true
      domainIndex[ind] = sub
    }
  })
  if (!anyChange) return;
  let endDomain = dir + domainIndex.join(dir)
  if (!endDomain.endsWith(dir)) endDomain += dir

  let title = updateTitle()
  console.log(endDomain)
  if (push) {
    history.pushState(argData, title, endDomain)
    ls.forEach((val) => {
      val()
    })
  }
  else {
    history.replaceState(argData, title, endDomain)
  }
  
}


type DomainFragment = string
export function get(domainLevel: number, subscription?: (domainFragment: DomainFragment) => void, onlyInterestedInLevel: boolean = false): DomainFragment {
  if (subscription) {
    ls.set(subscription, () => {
      
      
      if (!onlyInterestedInLevel) {
        let myDomainIndex = domainIndex.clone()
        for (let i = 0; i < domainLevel; i++) {
          myDomainIndex.shift() 
        }
        subscription(myDomainIndex.join(dir))
      }
      else {
        subscription(domainIndex[domainLevel] === undefined ? "" : domainIndex[domainLevel])
      }
      
      
    })
  }

  if (!onlyInterestedInLevel) {
    let myDomainIndex = domainIndex.clone()
    for (let i = 0; i < domainLevel; i++) {
      myDomainIndex.shift() 
    }
    
    return myDomainIndex.join(dir)
  }
  else {
    return domainIndex[domainLevel] === undefined ? "" : domainIndex[domainLevel]
  }
  
  

  
}

export function got(subscription: (domainFragment: DomainFragment) => void) {
  ls.delete(subscription)
}


let ls = new Map()

window.onpopstate = function(e) {
  parseUrlToDomainIndex()

  ls.forEach((val) => {
    val()
  })
  
}

//@ts-ignore
window.domain = {set, get}
