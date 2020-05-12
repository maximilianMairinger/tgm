export default function init<Func extends () => Promise<any>>(resources: ImportanceMap<any, any>, globalInitFunc?: (instance: any) => void | Promise<void>) {
  const resolvements = new Map<string, Function>();
  const indexMap = new ResourcesMap();
  return function load(initalKey?: string): ResourcesMap{
    try {
      if (initalKey !== undefined) resources.getByString(initalKey).key.importance = 1000000000;
    }
    catch (e) {
      console.warn("Unexpected initalKey");
    }

    resources.forEach((e: () => Promise<object>, imp) => {

      if (imp.val !== undefined) if (indexMap.get(imp.val) === undefined) {
        let prom = new Promise((res) => {
          resolvements.set(imp.val, res);
        })
        let superThen = prom.then.bind(prom)
        prom.then = function(cb) {
          if (!resources.loadedImports.includes(imp)) {
            imp.importance = Infinity
            resources.changedImportance = true
          }
          return superThen(cb)
        }
        indexMap.set(imp.val, prom);
      }
    });

    (async () => {
      await resources.forEachOrdered(async <Mod>(e: () => Promise<{default: {new(): Mod}}>, imp: Import<string, Mod>) => {
        if (imp.val !== undefined) {
          let instance = imp.initer((await e()).default);
          if (globalInitFunc !== undefined) await globalInitFunc(instance);
          resolvements.get(imp.val)(instance);
        }
        // just load it (and preseve in webpack cache)
        else (await e());
      });
    })();
    return indexMap;
  }
}

export class ResourcesMap extends Map<string, Promise<any>> {
  public get(key: string): Promise<any> {
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
    this.importanceList.sort((a, b) => a.importance - b.importance)
    for (let i = 0; i < this.importanceList.length; i++) {
      if (this.changedImportance) {
        this.importanceList.sort((a, b) => a.importance - b.importance)
        this.changedImportance = false
        i = 0
        continue
      }
      if (!this.loadedImports.includes(this.importanceList[i])) {
        await loop(this.get(this.importanceList[i]), this.importanceList[i], i);
        this.loadedImports.add(this.importanceList[i])
      }
    }
  }
}

export class Import<T, Mod> {
  constructor(public val: T, public importance: number, public initer: (mod: {new(): Mod}) => Mod) {

  }
}