import { eq, isFunction, isObject, isString, isNumber } from "lodash-es";

export function init(obj: any, key = "_d") {
  if (!obj[key]) obj[key] = [];
}

export  function validate(
  p: RegExp | string | Function | Object | Number,
  v: any
) {
  if (isString(p) || isNumber(p)) {
    if (v === p) return true;
  }
  if (isFunction(p)) {
    return  (p as Function)(v);
  }
  if (p instanceof RegExp) {
    return p.test(v);
  }
  if (isObject(p)) {
    return eq(p, v);
  }
  return false;
}

export {
  isArray,
  isObject,
  isDate,
  isBoolean,
  isEmpty,
  isUndefined,
  isNull,
  isNumber,
  isString,
} from "lodash-es";
