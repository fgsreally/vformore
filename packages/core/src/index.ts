import { set } from "lodash-es";
import { reactive, computed, effectScope, isRef, Ref } from "vue";
export function createInstance(schema: { [key in string]: any }, initData?: any) {
  let config = reactive(schema);
  let data = initData || reactive<any>({});

  const scope = effectScope();

  function traverseProperty(obj: any, path: string) {
    for (let k in obj) {
      let propertyPath = `${path}.${k}`;
      if (typeof obj[k] === "string" && /^{{(.*)}}$/.test(obj[k])) {
        let body = obj[k].match(/^{{(.*)}}$/)[1];
        let r = computed(() => {
          return new Function(
            `{${Object.keys(isRef(data) ? data.value : data).join(",")}}`,
            `return ${body}`
          )(isRef(data) ? data.value : data);
        });

        set(config, propertyPath, r);
        continue;
      }
      if (obj[k] && typeof obj[k] === "object") {
        traverseProperty(obj[k], propertyPath);
        continue;
      }
      set(config, propertyPath, obj[k]);
    }
  }
  scope.run(() => {
    for (let i in schema) {
      if (isRef(data)) {
        (data as Ref<any>).value[i] = schema[i]._default
      } else {
        data[i] = schema[i]._default

      }
      traverseProperty(schema[i], i);
    }
  });
  return { data, config, scope };
}
