import { init, validate } from "../utils";
import { Model, decoratorInfo, ModelType } from "../model";
export class NutUiModel<T extends Omit<ModelType, "rules">> extends Model<T> {
  getRules(defaultOptions?: any) {
    let ret: {
      [key: string]: {
        validator: Function;
        [key: string]: any;
      }[];
    } = {};
    (this as any)._d.forEach((d: decoratorInfo) => {
      if (d.type === "rule") {
        init(ret, d.key);
        ret[d.key].push({
          validator: async (_: any, value: any) => {
            if (!(await validate(d.value[0], value))) {
              return false;
            } else {
              return true;
            }
          },
          message: d.value[1],
          ...(defaultOptions || {}),
          ...(d.meta || {}),
        });
      }
    });
    return ret;
  }
}
