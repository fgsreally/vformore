import { describe, it, expect } from "vitest";
import { createInstance } from "../src";

describe("core model", () => {
  it("basic ", () => {
    let schema = {
      age: {
        default: 40,
      },
      category: {
        value: "{age>30?'old':'young'}",
      },
    };
    let { config, data } = createInstance(schema);
    expect(data.age).toBe(40);
    expect(config.category.value).toBe("old");
  });
  it("nest", () => {
    let schema = {
      age: {
        default: 40,
      },
      category: {
        value: "{age>30?'old':'young'}",
        guess: {
          isStudent: "{age<25}",
          bodyState: {
            arm: "{age<45}",
            leg: "{age<35}",
          },
        },
      },
    };
    let { config } = createInstance(schema);
    expect(config.category.value).toBe("old");
    expect(config.category.guess.isStudent).toBe(false);
    expect(config.category.guess.bodyState.arm).toBe(true);
  });
  it("dynamic", () => {
    let schema = {
      age: {
        default: 40,
      },
      category: {
        value: "{age>30?'old':'young'}",
      },
    };
    let { config, data } = createInstance(schema);

    expect(config.category.value).toBe("old");
    data.age = 10;
    expect(config.category.value).toBe("young");
  });
  it("dispose", () => {
    let schema = {
      age: {
        default: 40,
      },
      category: {
        value: "{age>30?'old':'young'}",
      },
    };
    let { config, data, scope } = createInstance(schema);

    scope.stop();
    data.age = 10;
    expect(config.category.value).toBe("old");
  });
});
