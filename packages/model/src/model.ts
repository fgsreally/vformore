export function Get(p: Function) {
  return (obj: any, key: string) => {
    if (!obj._d) obj._d = [];
    obj._d.push({
      type: "get",
      key,
      descriptor: (instance: any) => {
        return {
          get() {
            return p(instance);
          },
        };
      },
    });
  };
}

function validtor(p: RegExp | string | Function, v: any) {
  if (typeof p === "string") {
    if (v === p) return true;
  }
  if (typeof p === "function") {
    return p(v);
  }
  if (p instanceof RegExp) {
    return p.test(v);
  }
}
export function Is(p: RegExp | string | Function, defaultValue?: any) {
  return (obj: any, key: string) => {
    if (!obj._d) obj._d = [];
    obj._d.push({
      type: "is",
      key,
      defaultValue,
      descriptor: (instance: any) => {
        return {
          set(v: any) {
            if (validtor(p, v)) {
              instance[`_${key}`] = v;
            }
          },
          get() {
            return instance[`_${key}`];
          },
        };
      },
    });
  };
}

interface descriptorInfo {
  type: "is" | "get";
  key: string;
  defaultValue?: any;
  descriptor: (instance: any) => PropertyDescriptor;
}

export class Model<DataModel = any> {
  _allProperty: string[] = [];
  constructor(data?: Partial<DataModel>) {
    (this as any)._d?.forEach((d: descriptorInfo) => {
      this._allProperty.push(d.key);
      if (d.type === "is" && d.defaultValue !== undefined)
        (this as any)[`_${d.key}`] = d.defaultValue;

      Object.defineProperty(this, d.key, d.descriptor(this));
    });
    if (data) {
      for (let i in data) {
        if (this._allProperty.includes(i)) {
          (this as any)[i] = (data as any)[i];
        }
      }
    }
  }
  valueOf(isClean: boolean = true) {
    let ret: any = {};
    for (let i of this._allProperty) {
      if (!isClean || !isEmpty((this as any)[i])) ret[i] = (this as any)[i];
    }
    return ret;
  }
}

function isEmpty(value: any) {
  return value === undefined || value === null;
}
