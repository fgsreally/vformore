import { defineComponent, h, onMounted, PropType, ref } from "vue";
import * as ElPlus from "element-plus";
import { generateChildVNode } from "./utils";
/**
 * The proxy component wrapper for the Starport.
 */
export const ElPlusForm = defineComponent({
  name: "ElPlusForm",
  props: {
    config: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, ctx) {
    let dom = ref();
    onMounted(() => {
      ctx.expose({ ...dom.value });
    });
    return () => {
      return h(
        ElPlus.ElForm as any,
        {
          ref: dom,
          ...ctx.attrs,
        },
        {
          default: () =>
            Object.keys(props.config).map((item) => {
              return h(ElPlusFormItem, {
                formItem: props.config[item]._formItem,
                config: props.config,
                property: item,
                data: props.data,
              });
            }),
        }
      );
    };
  },
});

export const ElPlusFormItem = defineComponent({
  name: "ElPlusFormItem",
  props: {
    formItem: { type: Object },
    config: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    property: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const formInstance = ref();
    return () => {
      return h(
        ElPlus.ElFormItem as any,
        {
          ...props.formItem,
        },
        {
          default: () => {
            return h(
              (ElPlus as any)[props.config[props.property]._component],
              {
                ...props.config[props.property],
                ref: formInstance,
                modelValue: props.data[props.property],
                "onUpdate:modelValue": (v: any) => {
                  props.data[props.property] = v;
                },
              },
              {
                default: () => generateChildVNode(props.config[props.property]),
              }
            );
          },
        }
      );
    };
  },
});
