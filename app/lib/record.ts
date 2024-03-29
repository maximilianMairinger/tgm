export abstract class Record<T, R> {
  protected recordLs: T[]

  abstract record(): () => R

  protected _record(f: (record: T[]) => R) {
    const old = this.recordLs
    const record = this.recordLs = [] as T[]
    return function doneRecording() {
      this.recordLs = old
      return f(record)
    }
  }
  add(...e: T[]) {
    this.recordLs.add(...e)
  }
}

type Primitive = string | number | boolean | symbol
export class PrimitiveRecord<E extends Primitive = string> extends Record<E, E[]> {
  record() {
    return this._record(record => record)
  }
}


type F = () => void
export class InstanceRecord extends Record<F, () => Promise<any>> {
  constructor(noRecordFoundCallback: () => void) {
    super()
    const addProxy = this.add = (...e: F[]) => {
      noRecordFoundCallback()
      return Promise.all(e.call())
    }
    const recProxy = this.record = () => {
      delete this.record
      delete this.add
      const done = this.record()
      return function doneRecording() {
        this.record = recProxy
        this.add = addProxy
        return done()
      }
    }
  }

  record() {
    return this._record((record) => function batchLoad() {
      let ret = Promise.all(record.call())
      record.clear()
      return ret
    })
  }
}

