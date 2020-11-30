let superImportant = 1000000

export default function init<Func extends () => Promise<any>>(resources: ImportanceMap<any, any>, globalInitFunc?: (instance: any) => void | Promise<void>) {
  const resolvements = new Map<Import<any, any>, Function>();
  const resourcesMap = new ResourcesMap();

  resources.forEach((e: () => Promise<object>, imp) => {

    if (imp.val !== undefined) {
      let prom = new Promise((res) => {
        resolvements.set(imp, async (a: any) => {
          let load = a.loadedCallback ? a.loadedCallback() : undefined
          res(a)

          await Promise.all([...thenResults, load])
        })
      })

      let thenResults = []
      //@ts-ignore
      prom.priorityThen = function(cb) {
        let thenRes: any
        thenResults.add(new Promise((r) => {
          thenRes = r
        }))
        if (!resources.loadedImports.includes(imp)) {
          imp.importance += superImportant
          superImportant += 1000000
          resources.changedImportance = true
        }
        
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


  


  return {
    resourcesMap,
    load(initalKey?: string): ResourcesMap {
      try {
        if (initalKey !== undefined) resources.getByString(initalKey).key.importance = superImportant;
      }
      catch (e) {
        console.warn("Unexpected initalKey");
      }

      (async () => {
        await resources.forEachOrdered(async <Mod>(e: () => Promise<{default: {new(): Mod}}>, imp: Import<string, Mod>) => {
          if (imp.val !== undefined) {
            let instance = imp.initer((await e()).default);
            if (globalInitFunc !== undefined) await globalInitFunc(instance);
            await resolvements.get(imp)(instance)
            
          }
          // just load it (and preseve in webpack cache)
          else (await e());
        });
      })();

      
      

      
      return resourcesMap;
    }
  }
}

import slugify from "slugify"
import { dirString } from "./domain";
export const slugifyUrl = (url: string) => url.split(dirString).replace((s) => slugify(s)).join(dirString)


export type PriorityPromise = Promise<any> & {priorityThen: (cb?: (a: any) => void) => any}

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
      (proms as any).add(e)
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
  public changedImportance = false
  public loadedImports = []
  public async forEachOrdered(loop: (e?: Func, key?: Import<string, Mod>, i?: number) => any) {
    this.importanceList.sort((a, b) => b.importance - a.importance)
    for (let i = 0; i < this.importanceList.length; i++) {
      if (this.changedImportance) {
        this.importanceList.sort((a, b) => b.importance - a.importance)
        this.changedImportance = false
        i = -1
        continue
      }
      if (!this.loadedImports.includes(this.importanceList[i])) {
        this.loadedImports.add(this.importanceList[i])
        await loop(this.get(this.importanceList[i]), this.importanceList[i], i);
      }
    }
  }
}

export class Import<T, Mod> {
  constructor(public val: T, public importance: number, public initer: (mod: {new(): Mod}) => Mod) {

  }
}