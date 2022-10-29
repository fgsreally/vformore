import { eq, isFunction, isObject, isString } from "lodash-es"


function init(obj: any, key = "_d") {
  if (!obj[key]) obj[key] = [];
}



function validtor(p: RegExp | string | Function | Object, v: any) {
  if (isString(p)) {
    if (v === p) return true;
  }
  if (isFunction(p)) {
    return (p as Function)(v);
  }
  if (p instanceof RegExp) {
    return p.test(v);
  }
  if (isObject(p)) {
    return eq(p, v)
  }
  return false

}
export function Rule(p: RegExp | string | Function | Object, info: string) {
  return (obj: any, key: string) => {
    init(obj)

    obj._d.unshift({
      type: "rule",
      key,
      getRule: (instance: any, v: any) => {

        if (!instance.error[key]
        ) {
          if (!validtor(p, v)) instance.error[key] = info
        }
      }

    });
  };
}

export function Get(p: Function) {
  return (obj: any, key: string) => {
    init(obj)

    obj._d.unshift({
      type: "get",
      key,
      setRule: () => {
        return true
      },
      getRule: (instance: any) => {
        return p(instance)
      }

    });
  };
}
export function Is(p: RegExp | string | Function | Object, defaultValue?: any) {
  return (obj: any, key: string) => {
    init(obj)

    obj._d.unshift({
      type: "is",
      key,
      action(instance: any) { instance[`_${key}`] = defaultValue; },
      setRule: (instance: any, v: any) => {
        if (validtor(p, v)) {
          instance[`_${key}`] = v;
        }

      },
      getRule: (instance: any) => {
        return instance[`_${key}`];
      }

    });
  };
}

interface descriptorInfo {
  type: "is" | "get" | "rule";
  key: string;
  action?: (instance: any) => void;
  setRule?: (instance: any, v: any) => void;
  getRule?: (instance: any, v: any) => any;
}

export class Model<DataModel = any> {
  private _allProperty: Set<string> = new Set();
  error: { [key: string]: string } = {}
  constructor(data?: Partial<DataModel>) {
    (this as any)._d?.forEach((d: descriptorInfo) => {
      this._allProperty.add(d.key);
      if (d.action) { d.action(this) }

    });

    for (let key of [...this._allProperty]) {
      let that = this
      Object.defineProperty(this, key, {
        set: (v) => {
          for (let i of (that as any)._d.filter((item: any) => item.key === key)
          ) {
            if (i.setRule)
              i.setRule(that, v)
          }

        },
        get: () => {
          let v: any
          for (let i of (that as any)._d.filter((item: any) => item.key === key)
          ) {
            if (i.getRule) {
              v = i.getRule(that, v) || v
            }
          }
          return v;
        }
      })
    }
    if (data) {
      for (let i in data) {
        if ([...this._allProperty].includes(i)) {
          (this as any)[i] = (data as any)[i];
        }
      }
    }
  }
  exec(isClean: boolean = true) {
    this.error = {}
    let ret: any = {};
    for (let i of [...this._allProperty]) {
      if (!isClean || !isEmpty((this as any)[i])) ret[i] = (this as any)[i];
    }
    return {
      data: ret,
      error: Object.keys(this.error).length > 0 ? this.error : false
    };
  }
}

function isEmpty(value: any) {
  return value === undefined || value === null;
}
