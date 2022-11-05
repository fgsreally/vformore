import { init, validate } from "../utils";
import { Model, decoratorInfo, ModelType } from "../model";
export class ElPlusModel<T extends Omit<ModelType, "rules">> extends Model<T> {
  getRules() {
    let ret: { [key: string]: { validator: Function; trigger: "blur" }[] } = {};
    (this as any)._d.forEach((d: decoratorInfo) => {
      if (d.type === "rule") {
        init(ret, d.key);
        ret[d.key].push({
          validator: (_: any, value: any, callback: any) => {
            if (!validate(d.value[0], value)) callback(new Error(d.value[1]));
          },
          trigger: "blur",
        });
      }
    });
    return ret;
  }
}
