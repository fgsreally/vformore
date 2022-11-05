import { Rule,  ElPlusModel } from "@vformore/model";

export class Pension extends ElPlusModel<Pension> {
  @Rule((num: number) => {
    return num > 55;
  }, "需要大于55")
  age: number;
  @Rule((num: number) => {
    return num > 5000;
  }, "似乎太低了")
  money: number;
}
