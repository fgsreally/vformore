import { set } from "lodash-es";
import { reactive, computed, effectScope, isRef, Ref ,UnwrapNestedRefs,isReactive} from "vue";
export function createInstance<Scheme extends Object,Data extends Object >(schema: Scheme, initData?: Ref<Data>|UnwrapNestedRefs<Data>) {
  let config = reactive(schema);
  let data = initData || reactive<Data>({} as Data);

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
      const defaultValue=(schema[i] as any)._default
      if(defaultValue){
        if (isRef(data)) {
          (data as Ref<any>).value[i] = defaultValue
          
        } 
        if(isReactive(data)){
          (data as any)[i] =defaultValue
        }
      

      }
    
      traverseProperty(schema[i], i);
    }
  });
  return { data, config, scope };
}
