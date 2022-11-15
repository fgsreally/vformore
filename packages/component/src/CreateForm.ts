import { Component, defineComponent, h, onMounted, PropType, ref } from "vue";

export function createForm(compSet: any, form: Component, formItem: Component) {
  function generateChildVNode(props: any) {
    return props._children?.map((item: any) =>
      h((compSet as any)[item._component], item)
    );
  }

  const FormItem = defineComponent({
    name: "custom-form-item",
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
          formItem as any,
          {
            ...props.formItem,
          },
          {
            default: () => {
              return h(
                compSet[props.config[props.property]._component],
                {
                  ...props.config[props.property],
                  ref: formInstance,
                  modelValue: props.data[props.property],
                  "onUpdate:modelValue": (v: any) => {
                    props.data[props.property] = v;
                  },
                },
                {
                  default: () =>
                    generateChildVNode(props.config[props.property]),
                }
              );
            },
          }
        );
      };
    },
  });

  return defineComponent({
    name: "custom-form",
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
        return h(form as any, Object.assign({ ref: dom }, ctx.attrs), {
          default: () =>
            Object.keys(props.config).map((item) => {
              return h(FormItem, {
                formItem: props.config[item]._formItem,
                config: props.config,
                property: item,
                data: props.data,
              });
            }),
        });
      };
    },
  });
}
