import { Model, Get, Is } from "./../src";
import { describe, expect, it } from "vitest";
describe("model", () => {
  it("basic", () => {
    class User extends Model {
      @Is("fgp")
      name: string;
      @Is("", 18)
      age: string;
      @Get(({ name, age }: any) => name + age)
      brief: string;
    }
    let user = new User();
    user.name = "fgp";
    expect(user.age).toBe(18);
    expect(user.brief).toBe(`fgp18`);
  });
  it("init && valueOf", () => {
    class User extends Model<User> {
      @Is("fgp")
      name: string;
      @Is("", 18)
      age: string;
    }
    let user = new User({ name: "fgp" });

    expect(user.valueOf()).toEqual({ name: "fgp", age: 18 });
  });
});
