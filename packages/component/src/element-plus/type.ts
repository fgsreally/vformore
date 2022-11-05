import { FormItemProps } from "element-plus";
import { ExtractPropTypes } from "vue";
// export interface ElFormProps extends FormProps {
//     data: any,
//     config: { [key in string]: {
//         _component: string,
//         [key: string]: any
//     } },
// }

export type ElFormItemProps = ExtractPropTypes<
  FormItemProps & {
    data: any;
    config: FormConfig;
  }
>;

type FormConfig = {
  [key in string]: {
    _component: string;
    _children?: FormConfig;
    [key: string]: any;
  };
};
