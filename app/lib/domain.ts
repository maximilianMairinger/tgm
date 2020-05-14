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


// clean index of ""
function updateTitle() {
  let myDomainIndex = [...domainIndex]
  let title = commonTitle
  if (myDomainIndex.length > maxSubtiles) {
    myDomainIndex = myDomainIndex.splice(myDomainIndex.length - maxSubtiles)
    title = title + commonTitleSeperator + toMuchSubtitlesTruncate + commonSubtileSeperator
  }
  else if (myDomainIndex.length !== 0) {
    title += commonTitleSeperator
  }

  let subtitle = myDomainIndex.replace((e) => {
    return e.length < 3 ? e.toUpperCase() : fc(e)
  }).join(commonSubtileSeperator)

  title += subtitle
  
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


export async function set(subdomain: string, level: number = 0, push: boolean = true, preventWarning = false) {


  subdomain = replace(subdomain, " ", "-", preventWarning)

  let length = domainIndex.length;
  if (length < level || level < 0) {
    if (preventWarning) console.warn("Unexpected index: " + level + ". Replacing it with " + length + ".")
    level = length
  }

  
  
  let subdomains = subdomain.split(dir)
  domainIndex.splice(level + subdomains.length);
  let anyChange = false
  subdomains.ea((sub, i) => {
    if (sub === "") sub = undefined
    let ind = i + level
    if (domainIndex[ind] !== sub) {
      anyChange = true
      if (sub === undefined) domainIndex.rmI(ind)
      else domainIndex[ind] = sub
    }
  })
  if (!anyChange) return;
  let endDomain = dir + domainIndex.join(dir)
  if (!endDomain.endsWith(dir)) endDomain += dir


  let title = updateTitle()
  if (push) {
    let lastMinuteChange: any[]
    for (let keyValue of ls) {
      let r = await keyValue[1]()
      if (r) lastMinuteChange = r
    }
    //@ts-ignore
    if (lastMinuteChange) set(...lastMinuteChange)
    else history.pushState(argData, title, endDomain)
  }
  else {
    replaceState(argData, title, endDomain)
  }


  
  
}


const replaceStateListener = []
function replaceState(argData: any, title: any, endDomain: any) {
  history.replaceState(argData, title, endDomain)
  replaceStateListener.Call([])
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
export function get(domainLevel: number, subscription: (domainFragment: DomainFragment) => (boolean | Promise<void> | Promise<boolean> | void), onlyInterestedInLevel?: boolean, defaultDomain?: string): DomainSubscription
export function get(domainLevel: number, subscription: undefined | null, onlyInterestedInLevel?: boolean, defaultDomain?: string): DomainFragment
export function get(domainLevel: number, subscription?: undefined, onlyInterestedInLevel?: boolean, defaultDomain?: string): DomainFragment
export function get(domainLevel: number, subscription?: (domainFragment: DomainFragment) => (boolean |  Promise<void> | Promise<boolean> | void), onlyInterestedInLevel: boolean = false, defaultDomain = ""): DomainFragment | DomainSubscription {
  let calcCurrentDomain = (() => {
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
  })
  let currentDomain = calcCurrentDomain()


  if (subscription) {
    let lastDomain: string = currentDomain
    replaceStateListener.add(() => {
      lastDomain = calcCurrentDomain()
    })
    let f = async () => {
      
      if (!onlyInterestedInLevel) {
        let myDomainIndex = domainIndex.clone()
        for (let i = 0; i < domainLevel; i++) {
          myDomainIndex.shift() 
        }
        let joined = myDomainIndex.join(dir)
        let domain = joined === "" ? defaultDomain : joined
        if (lastDomain !== domain) {
          let res = await subscription(domain)
          if (res === undefined) res = true
          if (res) lastDomain = domain
        }
        if (joined !== domain) {
          return [domain, domainLevel]
        }
        
      }
      else {

        // TODO: when setting state to a pageSection, the section index doesnt get updated (observer)
        let domain = domainIndex[domainLevel] === undefined ? defaultDomain : domainIndex[domainLevel]
        if (domain !== lastDomain) {
          let res = await subscription(domain)
          if (res === undefined) res = true
          if (res) lastDomain = domain
        }
        if (domainIndex[domainLevel] !== domain) {
          return [domain, domainLevel]
        }

        
      }
      
      
    }


    ls.set(subscription, f)



    return new DomainSubscription(calcCurrentDomain, () => {
      ls.set(subscription, f)
    }, () => {
      ls.delete(subscription)
    })

  }
  else {
    return currentDomain
  }

  
  
  

  
}



let ls = new Map()

window.onpopstate = function(e) {
  parseUrlToDomainIndex()

  ls.forEach((f) => {
    f()
  })
  
}

//@ts-ignore
window.domain = {set, get}
