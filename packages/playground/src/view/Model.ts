import { Rule, Is, Any, isNumber, Model } from "@vformore/model"

export class Pension extends Model<Pension> {
    @Rule((num: string) => {
        console.log(Number(num) > 55)
        return Number(num) > 55 }, '需要大于55')
    age: string;
    @Is(isNumber, 18)
    money: string;
}