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


export class DomainSubscription {
  constructor(private getDomain: () => DomainFragment, public readonly activate: () => void,  public readonly deactivate: () => void) {

  }
  get domain(): DomainFragment {
    return this.getDomain()
  }
  public vate(to: boolean) {
    if (to) this.activate()
    else this.deactivate()
  }

}


type DomainFragment = string
export function get(domainLevel: number, subscription: (domainFragment: DomainFragment) => void, onlyInterestedInLevel?: boolean, defaultDomain?: string): DomainSubscription
export function get(domainLevel: number, subscription: undefined | null, onlyInterestedInLevel?: boolean, defaultDomain?: string): DomainFragment
export function get(domainLevel: number, subscription?: undefined, onlyInterestedInLevel?: boolean, defaultDomain?: string): DomainFragment
export function get(domainLevel: number, subscription?: (domainFragment: DomainFragment) => void, onlyInterestedInLevel: boolean = false, defaultDomain = ""): DomainFragment | DomainSubscription {
  if (subscription) {
    let lastDomain: string
    let f = () => {
      
      
      if (!onlyInterestedInLevel) {
        let myDomainIndex = domainIndex.clone()
        for (let i = 0; i < domainLevel; i++) {
          myDomainIndex.shift() 
        }
        let joined = myDomainIndex.join(dir)
        joined = joined === "" ? defaultDomain : joined
        if (lastDomain !== joined) {
          lastDomain = joined
          subscription(joined)
        }
        
      }
      else {
        let domain = domainIndex[domainLevel] === undefined ? defaultDomain : domainIndex[domainLevel]
        if (domain !== lastDomain) {
          lastDomain = domain
          subscription(domain)
        }
        
      }
      
      
    }


    ls.set(subscription, f)

    let getDomain = () => {
      if (!onlyInterestedInLevel) {
        let myDomainIndex = domainIndex.clone()
        for (let i = 0; i < domainLevel; i++) {
          myDomainIndex.shift() 
        }
    
        let joined = myDomainIndex.join(dir)
        return joined === "" ? defaultDomain : joined
      }
      else {
        return domainIndex[domainLevel] === undefined ? defaultDomain : domainIndex[domainLevel]
      }
    }


    return new DomainSubscription(getDomain, () => {
      ls.set(subscription, f)
    }, () => {
      ls.delete(subscription)
    })

  }
  else {
    if (!onlyInterestedInLevel) {
      let myDomainIndex = domainIndex.clone()
      for (let i = 0; i < domainLevel; i++) {
        myDomainIndex.shift() 
      }
  
      let joined = myDomainIndex.join(dir)
      return joined === "" ? defaultDomain : joined
    }
    else {
      return domainIndex[domainLevel] === undefined ? defaultDomain : domainIndex[domainLevel]
    }
  }

  
  
  

  
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
