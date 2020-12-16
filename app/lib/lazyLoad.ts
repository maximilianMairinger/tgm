const loadStates = ["minimalContentFullPaint", "fullContentFullPaint", "completePaint"]

export default function init<Func extends () => Promise<any>>(resources: ImportanceMap<any, any>, globalInitFunc?: (instance: any) => void | Promise<void>) {
  const resolvements = new Map<Import<any, any>, (load: () => Promise<{default: {new(): any}}>, state: (typeof loadStates)[number]) => void>();
  const resourcesMap = new ResourcesMap();

  resources.forEach((e: () => Promise<object>, imp) => {

    if (imp.val !== undefined) {
      let prom = new Promise((res) => {
        resolvements.set(imp, async (load: () => Promise<{default: {new(): any}}>, state) => {
          let instance = imp.initer((await load()).default);
          if (globalInitFunc !== undefined) await globalInitFunc(instance);
          res(instance)
          if (instance[state]) await instance[state]()
          instance[state] = undefined
          resolvements.set(imp, async (load: () => Promise<{default: {new(): any}}>, state) => {
            if (instance[state]) await instance[state]()
            instance[state] = undefined
          })
          

          await Promise.all(thenResults)
        })
      })

      let thenResults = []
      //@ts-ignore
      prom.priorityThen = function(cb) {
        let thenRes: any
        thenResults.add(new Promise((r) => {
          thenRes = r
        }))
        
          
        resources.superWhiteList(imp)
        
        
        return prom.then((a) => {
          if (cb) {
            let res = cb(a)
            if (res instanceof Promise) return res.then((e) => {
              let end = e === undefined ? a : e
              thenRes(end)
              return end
            })
            else {
              res === undefined ? a : res
              thenRes(res)
              return res
            }
          }
          else {
            thenRes(a)
            return a
          }
        })
      }
      //@ts-ignore
      resourcesMap.add(imp.val, prom);
    }
  });

  //@ts-ignore
  resourcesMap.reloadStatusPromises();


  (resources as any).resolve(<Mod>(load: () => Promise<{default: {new(): Mod}}>, imp: Import<string, Mod>, state) => {
    return resolvements.get(imp)(load, state)
  })
  


  return {
    resourcesMap,
    importanceMap: resources
  }
}

import slugify from "slugify"
import { dirString } from "./domain";
export const slugifyUrl = (url: string) => url.split(dirString).replace((s) => slugify(s)).join(dirString)


export type PriorityPromise<T = any> = Promise<T> & {priorityThen: (cb?: (a: any) => void) => any}

export class BidirectionalMap<K, V> extends Map<K, V> {
  public reverse: Map<V, K> = new Map

  set(k: K, v: V) {
    this.reverse.set(v, k)
    return super.set(k, v)
  }
  delete(k: K) {
    this.reverse.delete(this.get(k))
    return super.delete(k)
  }
}

class MultiKeyMap<K, V> {
  private index: {key: K, val: V}[]
  constructor(...index: {key: K, val: V}[]) {
    this.index = index
  }
  add(key: K, val: V) {
    this.index.add({key, val})
  }
  get(key: K, nth: number = 1) {
    for (let e of this.index) {
      if (e.key === key) {
        nth--
        if (nth === 0) return e.val
      }
    }
  }
  forEach(cb: (val: V, key: K) => void) {
    for (let e of this) {
      cb(e.val, e.key)
    }
  }
  *[Symbol.iterator](): Iterator<{key: K, val: V}, {key: K, val: V}, any> {
    for (let e of this.index) {
      yield e
    }
    return this.index.last
  }
  entries() {
    return this[Symbol.iterator]()
  }
}

export class ResourcesMap extends MultiKeyMap<string, PriorityPromise> {
  public fullyLoaded: Promise<any>
  public anyLoaded: Promise<any>
  public loadedIndex: BidirectionalMap<string, any>
  constructor(...index: {key: string, val: PriorityPromise}[]) {
    let toBeAdded = []
    for (let e of index) {
      toBeAdded.add({key: slugifyUrl(e.key), val: e.val})
    }
    super(...toBeAdded)
    this.loadedIndex = new BidirectionalMap
  }

  public getLoadedKeyOfResource(resource: any) {
    return this.loadedIndex.reverse.get(resource)
  }
  public getLoaded(resource: any) {
    return this.loadedIndex.get(resource)
  }

  private reloadStatusPromises() {
    let proms = []
    this.forEach((e) => {
      proms.add(e)
    })
    
    this.fullyLoaded = Promise.all(proms)
    this.anyLoaded = Promise.race(proms)
  }
  public add(key: string, val: PriorityPromise) {
    return super.add(slugifyUrl(key), val)
  }
}



export class ImportanceMap<Func extends () => Promise<{default: {new(): Mod}}>, Mod> extends Map<Import<string, Mod>, Func> {
  private importanceList: Import<string, Mod>[] = [];

  constructor(...index: {key: Import<string, Mod>, val: Func}[]) {
    super()
    for (let e of index) {
      this.importanceList.add(e.key)
      super.set(e.key, e.val)
    }
  }

  private resolver: (e: Func, key: Import<string, Mod>, state: (typeof loadStates)[number]) => any
  protected resolve(resolver: (e: Func, key: Import<string, Mod>, state: (typeof loadStates)[number]) => any) {
    this.resolver = resolver
    if (!this.whiteListedImports.empty) {
      this.startResolvement()
    }
  }

  private async startResolvement() {
    if (!this.resolver) return
    const whiteList = this.whiteListedImports
    whiteList.sort((a, b) => b.importance - a.importance)
    for (let state in loadStates) {
      for (let i = 0; i < whiteList.length; i++) {
        if (whiteList !== this.whiteListedImports) return
        while (this.superWhiteListDone) await this.superWhiteListDone
        await this.resolver(this.get(this.whiteList[i]), this.whiteList[i], state);
      }
    }
    
  }

  public getByString(key: string): {key: Import<string, Mod>, val: Func} {
    let kk: any, vv: any;
    this.forEach((v,k) => {
      if (k.val === key) {
        vv = v;
        kk = k;
      }
    });
    if (!kk || !vv) throw new Error("No such value found")
    return {key: kk, val: vv};
  }
  public set(key: Import<string, Mod>, val: Func): this {
    this.importanceList.add(key);
    super.set(key, val);
    return this;
  }

  public whiteList(...imp: Import<string, Mod>[]) {
    this.whiteListedImports = imp
    this.startResolvement()
  }
  public whiteListAll() {
    this.whiteList(...this.importanceList)
  }

  public superWhiteList(imp: Import<string, Mod>) {
    if (this.whiteListedImports.includes(imp)) this.whiteListedImports.rmV(imp)
    let mySuperWhiteListDone = this.superWhiteListDone = new Promise(async (res) => {
      const v = this.get(imp)
      for (let state in loadStates) {
        await this.resolver(v, imp, state)
        if (mySuperWhiteListDone !== this.superWhiteListDone) return res()
      }
      this.superWhiteListDone = undefined
      res()
      
    })
  }

  public whiteListedImports = []
  private superWhiteListDone: Promise<void>
}

export class Import<T, Mod> {
  constructor(public val: T, public importance: number, public initer: (mod: {new(): Mod}) => Mod) {

  }
}