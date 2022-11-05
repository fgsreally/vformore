import * as ElPlus from "element-plus";
import { h } from "vue";

export function generateChildVNode(props: any) {
  return props._children?.map((item: any) =>
    h((ElPlus as any)[item._component], item)
  );
}
