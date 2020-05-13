export default function init<Func extends () => Promise<any>>(resources: ImportanceMap<any, any>, globalInitFunc?: (instance: any) => void | Promise<void>) {
  const resolvements = new Map<string, Function>();
  const indexMap = new ResourcesMap();
  return function load(initalKey?: string): ResourcesMap {
    try {
      if (initalKey !== undefined) resources.getByString(initalKey).key.importance = 1000000;
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
            imp.importance += 1000000
            resources.changedImportance = true
          }
          
          return prom.then((a) => {
            let res = cb(a)
            if (res instanceof Promise) res.then(thenRes)
            else thenRes()
            return res
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

export class ResourcesMap extends Map<string, Promise<any> & {priorityThen: (cb: (a: any) => void) => void}> {
  public fullyLoaded: Promise<any>
  public anyLoaded: Promise<any>
  constructor(a?: any) {
    super(a)
  }
  private reloadStatusPromises() {
    let proms = []
    this.forEach((e) => {
      proms.add(e)
    })
    
    this.fullyLoaded = Promise.all(proms)
    this.anyLoaded = Promise.race(proms)
  }
  public get(key: string): Promise<any> & {priorityThen: (cb: (a: any) => void) => void} {
    let val = super.get(key);
    if (typeof val === "function") {
      //@ts-ignore
      return val();
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