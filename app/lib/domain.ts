import decodeUri from "fast-decode-uri-component"
import * as global from "./../global"
import slugify from "slugify"
import getBaseUrl from "get-base-url";
import lang from "./../lib/lang/lang"


const commonTitle = "TGM";
const commonTitleSeperator = " - "
const commonSubtileSeperator = " > "
const maxCharactersInTitle = 20
const toMuchSubtitlesTruncate = "..."
const argData = "internal";

const titleElement = document.querySelector("title")

export const dirString = "/";
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
  domainIndex = getCurrentSubDomainPath().split(dirString)
  domainIndex.remove("");

  let endDomain = !currentDomain.endsWith("/") ? currentDomain + dirString : currentDomain
  
  history.replaceState(argData, updateTitle(), endDomain)
}
parseUrlToDomainIndex()


function renderSubtitle(myDomainIndex = domainIndex) {
  return myDomainIndex.Replace((k) => {
    try {
      return lang.links[k].get()
    }
    catch (e) {
      return k
    }
    
  }).join(commonSubtileSeperator)
}

function updateTitle() {
  let title = commonTitle

  let originalSubtitle: string, subtitle: string
  originalSubtitle = subtitle = renderSubtitle()

  let myDomainIndex = domainIndex.clone()
  let tooMuchToTitles = false
  while(subtitle.length > maxCharactersInTitle && myDomainIndex.length > 1) {
    myDomainIndex.rmI(0)
    subtitle = renderSubtitle(myDomainIndex)
    tooMuchToTitles = true
  }

  if (subtitle.length !== 0) title += commonTitleSeperator

  if (tooMuchToTitles) {
    title = title + toMuchSubtitlesTruncate + commonSubtileSeperator
  }


  
  titleElement.txt(title + subtitle)
  return title + originalSubtitle
}


function parseDomainToDomainIndex(domain: string, level: number) {

  let originalLength = domainIndex.length;
  if (originalLength < level || level < 0) {
    console.warn("Unexpected index: " + level + ". Replacing it with " + originalLength + ".")
    level = originalLength
  }

  let anyChange = false
  let subdomains = domain.split(dirString).replace(e => slugify(e))
  
  domainIndex.splice(level + subdomains.length)
  if (domainIndex.length !== originalLength) anyChange = true
  
  subdomains.ea((sub, i) => {
    if (sub === "") sub = undefined
    let ind = i + level
    if (domainIndex[ind] !== sub) {
      anyChange = true
      if (sub === undefined) domainIndex.rmI(ind)
      else domainIndex[ind] = sub
    }
  })
  return anyChange
}

let currentDomainSet: Promise<void>
let inDomainSet = false
export async function set(subdomain: string, level: number = 0, push: boolean = true) {
  while (inDomainSet) {
    await currentDomainSet
  }

  let domainIndexRollback = domainIndex.clone()

  let res: Function
  inDomainSet = true
  currentDomainSet = new Promise((r) => {
    res = r
  })

  let anyChange = parseDomainToDomainIndex(subdomain, level)
  if (!anyChange) {
    inDomainSet = false
    res()
    return
  }



  let endDomain = dirString + domainIndex.join(dirString)
  if (!endDomain.endsWith(dirString)) endDomain += dirString

  
  if (push) {
    let recall: any
    for (let keyValue of ls) {
      let r = await keyValue[1]()
      if (r) recall = r
    }
    
    if (recall) {
      let { domain, domainLevel } = recall
      parseDomainToDomainIndex(domain, domainLevel)
      let endDomain = domainIndex.join(dirString)

      domainIndex.set(domainIndexRollback)
      set(endDomain, 0)
    }
    else {
      history.pushState(argData, updateTitle(), endDomain)
    }
  }
  else {
    replaceState(argData, updateTitle(), endDomain)
  }


  inDomainSet = false
  res()
  
}


const replaceStateListener = []
function replaceState(argData: any, title: any, endDomain: any) {
  history.replaceState(argData, title, endDomain)
  replaceStateListener.Call([])
}


export class DomainSubscription {
  constructor(private getDomain: () => DomainFragment, public readonly activate: () => void, public readonly deactivate: () => void) {

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
  
      let joined = myDomainIndex.join(dirString)
      return joined === "" ? defaultDomain : joined
    }
    else {
      return domainIndex[domainLevel] === undefined ? defaultDomain : domainIndex[domainLevel]
    }
  })
  let currentDomain = calcCurrentDomain();
  (() => {
    let joined = domainIndex.join(dirString)
    let domain = joined === "" ? defaultDomain : joined

    if (joined !== domain) {
      set(domain, domainLevel, false)
    }
  })()


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
        let joined = myDomainIndex.join(dirString)
        let domain = joined === "" ? defaultDomain : joined
        if (lastDomain !== domain) {
          let res = await subscription(domain)
          if (res === undefined) res = true
          if (res) lastDomain = domain

        }
        if (joined !== domain) {
          return {domain, domainLevel}
        }

      }
      else {
        let domain = domainIndex[domainLevel] === undefined ? defaultDomain : domainIndex[domainLevel]
        if (domain !== lastDomain) {
          let res = await subscription(domain)
          if (res === undefined) res = true
          if (res) lastDomain = domain

        }
        if (domainIndex[domainLevel] !== domain) {
          return {domain, domainLevel}
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
window.onpopstate = async function(e) {
  while(inDomainSet) {
    await currentDomainSet
  }


  let res: Function
  inDomainSet = true
  currentDomainSet = new Promise((r) => {
    res = r
  })



  parseUrlToDomainIndex()



  for (let keyValue of ls) {
    await keyValue[1]()
    
  }
  
  
  inDomainSet = false
  res()
}

//@ts-ignore
window.domain = {set, get}





export function linkMeta(link: string) {
  while (link.startsWith(dirString)) {
    link = link.substr(dirString.length)
  }
  let domainIndexClone = domainIndex.clone()  
  domainIndexClone.splice(this.domainLevel)
  domainIndexClone.add(...link.split(dirString))
  return {
    link,
    isOnOrigin: getBaseUrl(link) === getBaseUrl(),
    href: dirString + domainIndexClone.join(dirString)
  }
}
