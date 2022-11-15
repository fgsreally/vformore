import { init, validate } from "../utils";
import { Model, decoratorInfo, ModelType } from "../model";
export class ElPlusModel<T extends Omit<ModelType, "rules">> extends Model<T> {
  getRules(defaultOptions?: any) {
    let ret: { [key: string]: { validator: Function; [key: string]: any }[] } =
      {};
    (this as any)._d.forEach((d: decoratorInfo) => {
      if (d.type === "rule") {
        init(ret, d.key);
        ret[d.key].push({
          validator: async(_: any, value: any, callback: any) => {
            if (!await validate(d.value[0], value)) {
              callback(new Error(d.value[1]));
            } else {
              callback();
            }
          },
          ...(defaultOptions || {}),

          ...(d.meta || {}),
        });
      }
    });
    return ret;
  }
}
