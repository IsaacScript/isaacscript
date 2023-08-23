import { eRange, iRange, parseFloatSafe, parseIntSafe } from "./utils.js";

describe("eRange", () => {
  describe("1 arg 0", () => {
    test("0", () => {
      const result = [...eRange(0)];
      expect(result).toStrictEqual([]);
    });
  });

  describe("1 arg positive", () => {
    test("1", () => {
      const result = [...eRange(1)];
      expect(result).toStrictEqual([0]);
    });

    test("2", () => {
      const result = [...eRange(2)];
      expect(result).toStrictEqual([0, 1]);
    });

    test("3", () => {
      const result = [...eRange(3)];
      expect(result).toStrictEqual([0, 1, 2]);
    });
  });

  describe("1 arg negative", () => {
    test("-1", () => {
      const result = [...eRange(-1)];
      expect(result).toStrictEqual([0]);
    });

    test("-2", () => {
      const result = [...eRange(-2)];
      expect(result).toStrictEqual([0, -1]);
    });

    test("-3", () => {
      const result = [...eRange(-3)];
      expect(result).toStrictEqual([0, -1, -2]);
    });
  });

  describe("2 args same", () => {
    test("0, 0", () => {
      const result = [...eRange(0, 0)];
      expect(result).toStrictEqual([]);
    });

    test("1, 1", () => {
      const result = [...eRange(1, 1)];
      expect(result).toStrictEqual([]);
    });

    test("2, 2", () => {
      const result = [...eRange(2, 2)];
      expect(result).toStrictEqual([]);
    });

    test("3, 3", () => {
      const result = [...eRange(3, 3)];
      expect(result).toStrictEqual([]);
    });

    test("-1, -1", () => {
      const result = [...eRange(-1, -1)];
      expect(result).toStrictEqual([]);
    });

    test("-2, -2", () => {
      const result = [...eRange(-2, -2)];
      expect(result).toStrictEqual([]);
    });

    test("-3, -3", () => {
      const result = [...eRange(-3, -3)];
      expect(result).toStrictEqual([]);
    });
  });

  describe("2 args increasing", () => {
    test("0, 1", () => {
      const result = [...eRange(0, 1)];
      expect(result).toStrictEqual([0]);
    });

    test("0, 2", () => {
      const result = [...eRange(0, 2)];
      expect(result).toStrictEqual([0, 1]);
    });

    test("0, 3", () => {
      const result = [...eRange(0, 3)];
      expect(result).toStrictEqual([0, 1, 2]);
    });

    test("1, 2", () => {
      const result = [...eRange(1, 2)];
      expect(result).toStrictEqual([1]);
    });

    test("1, 3", () => {
      const result = [...eRange(1, 3)];
      expect(result).toStrictEqual([1, 2]);
    });

    test("1, 4", () => {
      const result = [...eRange(1, 4)];
      expect(result).toStrictEqual([1, 2, 3]);
    });

    test("2, 3", () => {
      const result = [...eRange(2, 3)];
      expect(result).toStrictEqual([2]);
    });

    test("2, 4", () => {
      const result = [...eRange(2, 4)];
      expect(result).toStrictEqual([2, 3]);
    });

    test("2, 5", () => {
      const result = [...eRange(2, 5)];
      expect(result).toStrictEqual([2, 3, 4]);
    });

    test("-3, -1", () => {
      const result = [...eRange(-3, -1)];
      expect(result).toStrictEqual([-3, -2]);
    });

    test("-3, 3", () => {
      const result = [...eRange(-3, 3)];
      expect(result).toStrictEqual([-3, -2, -1, 0, 1, 2]);
    });
  });

  describe("2 args decreasing", () => {
    test("1, 0", () => {
      const result = [...eRange(1, 0)];
      expect(result).toStrictEqual([1]);
    });

    test("2, 0", () => {
      const result = [...eRange(2, 0)];
      expect(result).toStrictEqual([2, 1]);
    });

    test("3, 0", () => {
      const result = [...eRange(3, 0)];
      expect(result).toStrictEqual([3, 2, 1]);
    });

    test("2, 1", () => {
      const result = [...eRange(2, 1)];
      expect(result).toStrictEqual([2]);
    });

    test("3, 1", () => {
      const result = [...eRange(3, 1)];
      expect(result).toStrictEqual([3, 2]);
    });

    test("4, 1", () => {
      const result = [...eRange(4, 1)];
      expect(result).toStrictEqual([4, 3, 2]);
    });

    test("3, 2", () => {
      const result = [...eRange(3, 2)];
      expect(result).toStrictEqual([3]);
    });

    test("4, 2", () => {
      const result = [...eRange(4, 2)];
      expect(result).toStrictEqual([4, 3]);
    });

    test("5, 2", () => {
      const result = [...eRange(5, 2)];
      expect(result).toStrictEqual([5, 4, 3]);
    });

    test("-1, -3", () => {
      const result = [...eRange(-1, -3)];
      expect(result).toStrictEqual([-1, -2]);
    });

    test("3, -3", () => {
      const result = [...eRange(3, -3)];
      expect(result).toStrictEqual([3, 2, 1, 0, -1, -2]);
    });
  });
});

describe("iRange", () => {
  describe("1 arg 0", () => {
    test("0", () => {
      const result = [...iRange(0)];
      expect(result).toStrictEqual([0]);
    });
  });

  describe("1 arg positive", () => {
    test("1", () => {
      const result = [...iRange(1)];
      expect(result).toStrictEqual([0, 1]);
    });

    test("2", () => {
      const result = [...iRange(2)];
      expect(result).toStrictEqual([0, 1, 2]);
    });

    test("3", () => {
      const result = [...iRange(3)];
      expect(result).toStrictEqual([0, 1, 2, 3]);
    });
  });

  describe("1 arg negative", () => {
    test("-1", () => {
      const result = [...iRange(-1)];
      expect(result).toStrictEqual([0, -1]);
    });

    test("-2", () => {
      const result = [...iRange(-2)];
      expect(result).toStrictEqual([0, -1, -2]);
    });

    test("-3", () => {
      const result = [...iRange(-3)];
      expect(result).toStrictEqual([0, -1, -2, -3]);
    });
  });

  describe("2 args same", () => {
    test("0, 0", () => {
      const result = [...iRange(0, 0)];
      expect(result).toStrictEqual([0]);
    });

    test("1, 1", () => {
      const result = [...iRange(1, 1)];
      expect(result).toStrictEqual([1]);
    });

    test("2, 2", () => {
      const result = [...iRange(2, 2)];
      expect(result).toStrictEqual([2]);
    });

    test("3, 3", () => {
      const result = [...iRange(3, 3)];
      expect(result).toStrictEqual([3]);
    });

    test("-1, -1", () => {
      const result = [...iRange(-1, -1)];
      expect(result).toStrictEqual([-1]);
    });

    test("-2, -2", () => {
      const result = [...iRange(-2, -2)];
      expect(result).toStrictEqual([-2]);
    });

    test("-3, -3", () => {
      const result = [...iRange(-3, -3)];
      expect(result).toStrictEqual([-3]);
    });
  });

  describe("2 args increasing", () => {
    test("0, 1", () => {
      const result = [...iRange(0, 1)];
      expect(result).toStrictEqual([0, 1]);
    });

    test("0, 2", () => {
      const result = [...iRange(0, 2)];
      expect(result).toStrictEqual([0, 1, 2]);
    });

    test("0, 3", () => {
      const result = [...iRange(0, 3)];
      expect(result).toStrictEqual([0, 1, 2, 3]);
    });

    test("1, 2", () => {
      const result = [...iRange(1, 2)];
      expect(result).toStrictEqual([1, 2]);
    });

    test("1, 3", () => {
      const result = [...iRange(1, 3)];
      expect(result).toStrictEqual([1, 2, 3]);
    });

    test("1, 4", () => {
      const result = [...iRange(1, 4)];
      expect(result).toStrictEqual([1, 2, 3, 4]);
    });

    test("2, 3", () => {
      const result = [...iRange(2, 3)];
      expect(result).toStrictEqual([2, 3]);
    });

    test("2, 4", () => {
      const result = [...iRange(2, 4)];
      expect(result).toStrictEqual([2, 3, 4]);
    });

    test("2, 5", () => {
      const result = [...iRange(2, 5)];
      expect(result).toStrictEqual([2, 3, 4, 5]);
    });

    test("-3, -1", () => {
      const result = [...iRange(-3, -1)];
      expect(result).toStrictEqual([-3, -2, -1]);
    });

    test("-3, 3", () => {
      const result = [...iRange(-3, 3)];
      expect(result).toStrictEqual([-3, -2, -1, 0, 1, 2, 3]);
    });
  });

  describe("2 args decreasing", () => {
    test("1, 0", () => {
      const result = [...iRange(1, 0)];
      expect(result).toStrictEqual([1, 0]);
    });

    test("2, 0", () => {
      const result = [...iRange(2, 0)];
      expect(result).toStrictEqual([2, 1, 0]);
    });

    test("3, 0", () => {
      const result = [...iRange(3, 0)];
      expect(result).toStrictEqual([3, 2, 1, 0]);
    });

    test("2, 1", () => {
      const result = [...iRange(2, 1)];
      expect(result).toStrictEqual([2, 1]);
    });

    test("3, 1", () => {
      const result = [...iRange(3, 1)];
      expect(result).toStrictEqual([3, 2, 1]);
    });

    test("4, 1", () => {
      const result = [...iRange(4, 1)];
      expect(result).toStrictEqual([4, 3, 2, 1]);
    });

    test("3, 2", () => {
      const result = [...iRange(3, 2)];
      expect(result).toStrictEqual([3, 2]);
    });

    test("4, 2", () => {
      const result = [...iRange(4, 2)];
      expect(result).toStrictEqual([4, 3, 2]);
    });

    test("5, 2", () => {
      const result = [...iRange(5, 2)];
      expect(result).toStrictEqual([5, 4, 3, 2]);
    });

    test("-1, -3", () => {
      const result = [...iRange(-1, -3)];
      expect(result).toStrictEqual([-1, -2, -3]);
    });

    test("3, -3", () => {
      const result = [...iRange(3, -3)];
      expect(result).toStrictEqual([3, 2, 1, 0, -1, -2, -3]);
    });
  });
});

describe("parseFloatSafe", () => {
  describe("non valid types", () => {
    test("undefined", () => {
      const result = parseFloatSafe(undefined as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("null", () => {
      // eslint-disable-next-line unicorn/no-null
      const result = parseFloatSafe(null as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("bigint", () => {
      const result = parseFloatSafe(BigInt(1) as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("false", () => {
      const result = parseFloatSafe(false as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("true", () => {
      const result = parseFloatSafe(true as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("function", () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = parseFloatSafe((() => {}) as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("number", () => {
      const result = parseFloatSafe(1 as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("object", () => {
      const result = parseFloatSafe({} as string);
      expect(result).toStrictEqual(undefined);
    });

    test("symbol", () => {
      const result = parseFloatSafe(Symbol("1") as unknown as string);
      expect(result).toStrictEqual(undefined);
    });
  });

  describe("spaces", () => {
    test("space", () => {
      const result = parseFloatSafe(" ");
      expect(result).toStrictEqual(undefined);
    });

    test("space + 1", () => {
      const result = parseFloatSafe(" 1");
      expect(result).toStrictEqual(1);
    });

    test("1 + space", () => {
      const result = parseFloatSafe("1 ");
      expect(result).toStrictEqual(1);
    });

    test("space + 1 + space", () => {
      const result = parseFloatSafe(" 1 ");
      expect(result).toStrictEqual(1);
    });

    test("space + -1", () => {
      const result = parseFloatSafe(" -1");
      expect(result).toStrictEqual(-1);
    });

    test("-1 + space", () => {
      const result = parseFloatSafe("-1 ");
      expect(result).toStrictEqual(-1);
    });

    test("space + -1 + space", () => {
      const result = parseFloatSafe(" -1 ");
      expect(result).toStrictEqual(-1);
    });

    test("space + 1.0", () => {
      const result = parseFloatSafe(" 1.0");
      expect(result).toStrictEqual(1);
    });

    test("1.0 + space", () => {
      const result = parseFloatSafe("1.0 ");
      expect(result).toStrictEqual(1);
    });

    test("space + 1.0 + space", () => {
      const result = parseFloatSafe(" 1.0 ");
      expect(result).toStrictEqual(1);
    });

    test("space + -1.0", () => {
      const result = parseFloatSafe(" -1.0");
      expect(result).toStrictEqual(-1);
    });

    test("-1.0 + space", () => {
      const result = parseFloatSafe("-1.0 ");
      expect(result).toStrictEqual(-1);
    });

    test("space + -1.0 + space", () => {
      const result = parseFloatSafe(" -1.0 ");
      expect(result).toStrictEqual(-1);
    });
  });

  describe("tabs", () => {
    test("tab", () => {
      const result = parseFloatSafe("	");
      expect(result).toStrictEqual(undefined);
    });

    test("tab + 1", () => {
      const result = parseFloatSafe("	1");
      expect(result).toStrictEqual(1);
    });

    test("1 + tab", () => {
      const result = parseFloatSafe("1	");
      expect(result).toStrictEqual(1);
    });

    test("tab + 1 + tab", () => {
      const result = parseFloatSafe("	1	");
      expect(result).toStrictEqual(1);
    });

    test("tab + -1", () => {
      const result = parseFloatSafe("	-1");
      expect(result).toStrictEqual(-1);
    });

    test("-1 + tab", () => {
      const result = parseFloatSafe("-1	");
      expect(result).toStrictEqual(-1);
    });

    test("tab + -1 + tab", () => {
      const result = parseFloatSafe("	-1	");
      expect(result).toStrictEqual(-1);
    });

    test("tab + 1.0", () => {
      const result = parseFloatSafe("	1.0");
      expect(result).toStrictEqual(1);
    });

    test("1.0 + tab", () => {
      const result = parseFloatSafe("1.0	");
      expect(result).toStrictEqual(1);
    });

    test("tab + 1.0 + tab", () => {
      const result = parseFloatSafe("	1.0	");
      expect(result).toStrictEqual(1);
    });

    test("tab + -1.0", () => {
      const result = parseFloatSafe("	-1.0");
      expect(result).toStrictEqual(-1);
    });

    test("-1.0 + tab", () => {
      const result = parseFloatSafe("-1.0	");
      expect(result).toStrictEqual(-1);
    });

    test("tab + -1.0 + tab", () => {
      const result = parseFloatSafe("	-1.0	");
      expect(result).toStrictEqual(-1);
    });
  });

  describe("invalid input", () => {
    test("empty string", () => {
      const result = parseFloatSafe("");
      expect(result).toStrictEqual(undefined);
    });

    test(".", () => {
      const result = parseFloatSafe(".");
      expect(result).toStrictEqual(undefined);
    });

    test("1.", () => {
      const result = parseFloatSafe("1.");
      expect(result).toStrictEqual(undefined);
    });

    test("-", () => {
      const result = parseFloatSafe("-");
      expect(result).toStrictEqual(undefined);
    });

    test("1-", () => {
      const result = parseFloatSafe("1-");
      expect(result).toStrictEqual(undefined);
    });

    test("- 1", () => {
      const result = parseFloatSafe("- 1");
      expect(result).toStrictEqual(undefined);
    });

    test("--", () => {
      const result = parseFloatSafe("--");
      expect(result).toStrictEqual(undefined);
    });

    test("--1", () => {
      const result = parseFloatSafe("--1");
      expect(result).toStrictEqual(undefined);
    });

    test("1--", () => {
      const result = parseFloatSafe("--1");
      expect(result).toStrictEqual(undefined);
    });

    test("-- 1", () => {
      const result = parseFloatSafe("-- 1");
      expect(result).toStrictEqual(undefined);
    });
  });

  describe("normal integers", () => {
    test("1", () => {
      const result = parseFloatSafe("1");
      expect(result).toStrictEqual(1);
    });

    test("-1", () => {
      const result = parseFloatSafe("-1");
      expect(result).toStrictEqual(-1);
    });

    test("10", () => {
      const result = parseFloatSafe("10");
      expect(result).toStrictEqual(10);
    });

    test("-10", () => {
      const result = parseFloatSafe("-10");
      expect(result).toStrictEqual(-10);
    });

    test("01", () => {
      const result = parseFloatSafe("01");
      expect(result).toStrictEqual(1);
    });

    test("-01", () => {
      const result = parseFloatSafe("-01");
      expect(result).toStrictEqual(-1);
    });
  });

  describe("normal floats", () => {
    test(".1", () => {
      const result = parseFloatSafe(".1");
      expect(result).toStrictEqual(0.1);
    });

    test("1.0", () => {
      const result = parseFloatSafe("1.0");
      expect(result).toStrictEqual(1);
    });

    test("1.1", () => {
      const result = parseFloatSafe("1.1");
      expect(result).toStrictEqual(1.1);
    });

    test("0.1", () => {
      const result = parseFloatSafe("0.1");
      expect(result).toStrictEqual(0.1);
    });

    test("10.0", () => {
      const result = parseFloatSafe("10.0");
      expect(result).toStrictEqual(10);
    });

    test("10.1", () => {
      const result = parseFloatSafe("10.1");
      expect(result).toStrictEqual(10.1);
    });

    test("-10.0", () => {
      const result = parseFloatSafe("-10.0");
      expect(result).toStrictEqual(-10);
    });

    test("-10.1", () => {
      const result = parseFloatSafe("-10.1");
      expect(result).toStrictEqual(-10.1);
    });

    test("01.0", () => {
      const result = parseFloatSafe("01.0");
      expect(result).toStrictEqual(1);
    });

    test("-01.0", () => {
      const result = parseFloatSafe("-01.0");
      expect(result).toStrictEqual(-1);
    });
  });
});

describe("parseIntSafe", () => {
  describe("non valid types", () => {
    test("undefined", () => {
      const result = parseIntSafe(undefined as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("null", () => {
      // eslint-disable-next-line unicorn/no-null
      const result = parseIntSafe(null as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("bigint", () => {
      const result = parseIntSafe(BigInt(1) as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("false", () => {
      const result = parseIntSafe(false as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("true", () => {
      const result = parseIntSafe(true as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("function", () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const result = parseIntSafe((() => {}) as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("number", () => {
      const result = parseIntSafe(1 as unknown as string);
      expect(result).toStrictEqual(undefined);
    });

    test("object", () => {
      const result = parseIntSafe({} as string);
      expect(result).toStrictEqual(undefined);
    });

    test("symbol", () => {
      const result = parseIntSafe(Symbol("1") as unknown as string);
      expect(result).toStrictEqual(undefined);
    });
  });

  describe("spaces", () => {
    test("space", () => {
      const result = parseIntSafe(" ");
      expect(result).toStrictEqual(undefined);
    });

    test("space + 1", () => {
      const result = parseIntSafe(" 1");
      expect(result).toStrictEqual(1);
    });

    test("1 + space", () => {
      const result = parseIntSafe("1 ");
      expect(result).toStrictEqual(1);
    });

    test("space + 1 + space", () => {
      const result = parseIntSafe(" 1 ");
      expect(result).toStrictEqual(1);
    });

    test("space + -1", () => {
      const result = parseIntSafe(" -1");
      expect(result).toStrictEqual(-1);
    });

    test("-1 + space", () => {
      const result = parseIntSafe("-1 ");
      expect(result).toStrictEqual(-1);
    });

    test("space + -1 + space", () => {
      const result = parseIntSafe(" -1 ");
      expect(result).toStrictEqual(-1);
    });
  });

  describe("tabs", () => {
    test("tab", () => {
      const result = parseIntSafe("	");
      expect(result).toStrictEqual(undefined);
    });

    test("tab + 1", () => {
      const result = parseIntSafe("	1");
      expect(result).toStrictEqual(1);
    });

    test("1 + tab", () => {
      const result = parseIntSafe("1	");
      expect(result).toStrictEqual(1);
    });

    test("tab + 1 + tab", () => {
      const result = parseIntSafe("	1	");
      expect(result).toStrictEqual(1);
    });

    test("tab + -1", () => {
      const result = parseIntSafe("	-1");
      expect(result).toStrictEqual(-1);
    });

    test("-1 + tab", () => {
      const result = parseIntSafe("-1	");
      expect(result).toStrictEqual(-1);
    });

    test("tab + -1 + tab", () => {
      const result = parseIntSafe("	-1	");
      expect(result).toStrictEqual(-1);
    });
  });

  describe("invalid input", () => {
    test("empty string", () => {
      const result = parseIntSafe("");
      expect(result).toStrictEqual(undefined);
    });

    test(".", () => {
      const result = parseIntSafe(".");
      expect(result).toStrictEqual(undefined);
    });

    test(".1", () => {
      const result = parseIntSafe(".1");
      expect(result).toStrictEqual(undefined);
    });

    test("1.", () => {
      const result = parseIntSafe("1.");
      expect(result).toStrictEqual(undefined);
    });

    test("1.0", () => {
      const result = parseIntSafe("1.0");
      expect(result).toStrictEqual(undefined);
    });

    test("0.1", () => {
      const result = parseIntSafe("0.1");
      expect(result).toStrictEqual(undefined);
    });

    test("-", () => {
      const result = parseIntSafe("-");
      expect(result).toStrictEqual(undefined);
    });

    test("1-", () => {
      const result = parseIntSafe("1-");
      expect(result).toStrictEqual(undefined);
    });

    test("- 1", () => {
      const result = parseIntSafe("- 1");
      expect(result).toStrictEqual(undefined);
    });

    test("--", () => {
      const result = parseIntSafe("--");
      expect(result).toStrictEqual(undefined);
    });

    test("--1", () => {
      const result = parseIntSafe("--1");
      expect(result).toStrictEqual(undefined);
    });

    test("1--", () => {
      const result = parseIntSafe("--1");
      expect(result).toStrictEqual(undefined);
    });

    test("-- 1", () => {
      const result = parseIntSafe("-- 1");
      expect(result).toStrictEqual(undefined);
    });
  });

  describe("normal", () => {
    test("1", () => {
      const result = parseIntSafe("1");
      expect(result).toStrictEqual(1);
    });

    test("-1", () => {
      const result = parseIntSafe("-1");
      expect(result).toStrictEqual(-1);
    });

    test("10", () => {
      const result = parseIntSafe("10");
      expect(result).toStrictEqual(10);
    });

    test("-10", () => {
      const result = parseIntSafe("-10");
      expect(result).toStrictEqual(-10);
    });

    test("01", () => {
      const result = parseIntSafe("01");
      expect(result).toStrictEqual(1);
    });

    test("-01", () => {
      const result = parseIntSafe("-01");
      expect(result).toStrictEqual(-1);
    });
  });
});
