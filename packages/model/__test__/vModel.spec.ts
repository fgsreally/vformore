import { VModel, Get, Is, Rule, Any } from "./../src";
import { describe, expect, it } from "vitest";
describe("model", () => {
    it("basic", () => {
        class User extends VModel<User> {
            @Is("fgp")
            name: string;
            @Is("", 18)
            age: string;
            @Get(({ name, age }: any) => name + age)
            brief: string;
        }
        let user = new User();


        user.name = "fgp";
        user.brief = "fgp";

        expect(user.data).toEqual({ name: "fgp", age: 18, brief: "fgp18" });

    });


    it("rule", () => {
        class User extends VModel<User> {
            @Is(/fg/)
            name: string;

            @Any
            age: number = 17;

            @Get(({ name, age }: any) => name + age)
            @Rule(`fgs18`, "名字应为fgs18")
            brief: string;
        }
        let user = new User({ name: "fgs" });
        expect(user.error).toContain("名字应为fgs18");
        user.age = 18
        expect(user.error.length).toBe(0)
    });
});
