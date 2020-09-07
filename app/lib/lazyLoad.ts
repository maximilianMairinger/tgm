const superImportant = 1000000

export default function init<Func extends () => Promise<any>>(resources: ImportanceMap<any, any>, globalInitFunc?: (instance: any) => void | Promise<void>) {
  const resolvements = new Map<string, Function>();
  const indexMap = new ResourcesMap();
  return function load(initalKey?: string): ResourcesMap {
    try {
      if (initalKey !== undefined) resources.getByString(initalKey).key.importance = superImportant;
    }
    catch (e) {
      console.warn("Unexpected initalKey");
    }

    resources.forEach((e: () => Promise<object>, imp) => {

      if (imp.val !== undefined) if (indexMap.get(imp.val) === undefined) {
        let prom = new Promise((res) => {
          resolvements.set(imp.val, async (a: any) => {
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
            resources.changedImportance = true
          }
          
          return prom.then((a) => {
            if (cb) {
              let res = cb(a)
              if (res instanceof Promise) res.then(thenRes)
              else thenRes()
              return res
            }
          })
        }
        //@ts-ignore
        indexMap.set(imp.val, prom);
      }
    });

    
    //@ts-ignore
    indexMap.reloadStatusPromises();

    (async () => {
      await resources.forEachOrdered(async <Mod>(e: () => Promise<{default: {new(): Mod}}>, imp: Import<string, Mod>) => {
        if (imp.val !== undefined) {
          let instance = imp.initer((await e()).default);
          if (globalInitFunc !== undefined) await globalInitFunc(instance);
          await resolvements.get(imp.val)(instance)
          
        }
        // just load it (and preseve in webpack cache)
        else (await e());
      });
    })();
    return indexMap;
  }
}

import slugify from "slugify"
import { dirString } from "./domain";
export function slugifyUrl(url: string) {
  return url.split(dirString).replace((s) => slugify(s)).join(dirString)
}

type PriorityPromise = Promise<any> & {priorityThen: (cb?: (a: any) => void) => void}

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

export class ResourcesMap extends Map<string, PriorityPromise> {
  public fullyLoaded: Promise<any>
  public anyLoaded: Promise<any>
  public loadedIndex: BidirectionalMap<string, any> = new BidirectionalMap

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
  public readonly slugifiedIndex = {}
  public set(key: string, val: PriorityPromise) {
    this.slugifiedIndex[slugifyUrl(key)] = key
    val.then((v) => {
      if (val === this.get(key)) this.loadedIndex.set(key, v)
    })
    return super.set(key, val)
  }
  public delete(key: string) {
    this.slugifiedIndex[slugifyUrl(key)] = key
    this.loadedIndex.delete(key)
    return super.delete(key)
  }
  public getSlugifyed(wantedKey: string): PriorityPromise {
    for (let slug in this.slugifiedIndex) {
      if (wantedKey === slug) return this.get(this.slugifiedIndex[slug])
    }
  }
  public deslugify(key: string) {
    return this.slugifiedIndex[key] !== undefined ? this.slugifiedIndex[key] : key
  }
  public get(key: string): PriorityPromise {
    let val = super.get(key);
    if (val instanceof Function) {
      let v = val()
      this.set(key, v)
      return v
    }
    else return val;
  }
}



export class ImportanceMap<Func extends () => Promise<{default: {new(): Mod}}>, Mod> extends Map<Import<string, Mod>, Func> {
  private importanceList: Import<string, Mod>[] = [];
  constructor(...map: Map<Import<string, Mod>, Func>[]);
  constructor(...a: {key: Import<string, Mod>, val: Func}[]);
  constructor(...a: {key: Import<string, Mod>, val: Func}[] | Map<Import<string, Mod>, Func>[]) {
    super();
    if (a[0] instanceof Map) {
      //@ts-ignore
      a.ea((m) => {
        m.forEach((v, k) => {
          this.set(k, v);
        })
      })
    }
    else {
      //@ts-ignore
      a.forEach((e) => {
        this.set(e.key, e.val);
      });
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