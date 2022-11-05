import { ElPlusModel } from "../src/resolver/ElementPlus";
import { describe, expect, it } from "vitest";
import { Is, Rule } from "../src/model";
describe("resolver", () => {
  it("get form rule", () => {
    class User extends ElPlusModel<User> {
      @Is(/fg/)
      @Rule("fgp", "名字应为fgp")
      name: string;

      @Is("", 18)
      @Rule(18, "年龄应为18")
      age: string;
    }
    expect(new User().getRules()).toHaveProperty("name[0].trigger", "blur");
  });
});
