import { Model, Get, Is, Rule, isNumber } from "./../src";
import { describe, expect, it } from "vitest";
describe("model", () => {
  it("basic", async() => {
    class User extends Model<User> {
      @Is("fgp")
      name: string;
      @Is(isNumber, 18)
      age: number;
      @Get(({ name, age }: User) => name + age)
      brief: string;
    }
    let user = new User();

    user.name = "fgp";
    user.brief = "fgp";

    expect(user.age).toBe(18);
    expect(user.brief).toBe(`fgp18`);


  });


  it("init && valueOf", () => {
    class User extends Model<User> {
      @Is(/fg/)
      name: string;
      @Is("", 18)
      age: string;


      @Get(({ name, age }: any) => name + age)
      @Rule(`fgs18`, "名字应为fgs18")
      brief: string;
    }
    let user = new User({ name: "fgp" });
    expect(user.exec().error).toContain("名字应为fgs18");
    user.name = 'fgs'
    expect(user.exec().error).toBe(false);

    expect(user.exec().data).toStrictEqual({
      brief: `fgs18`, name: "fgs", age: 18
    });

  });
});
