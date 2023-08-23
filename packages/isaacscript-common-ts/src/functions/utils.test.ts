import { eRange, iRange } from "./utils.js";

describe("eRange - 1 arg 0", () => {
  test("0", () => {
    const result = [...eRange(0)];
    expect(result).toStrictEqual([]);
  });
});

describe("eRange - 1 arg positive", () => {
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

describe("eRange - 1 arg negative", () => {
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

describe("eRange - 2 args same", () => {
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

describe("eRange - 2 args increasing", () => {
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

describe("eRange - 2 args decreasing", () => {
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

describe("iRange - 1 arg 0", () => {
  test("0", () => {
    const result = [...iRange(0)];
    expect(result).toStrictEqual([0]);
  });
});

describe("iRange - 1 arg positive", () => {
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

describe("iRange - 1 arg negative", () => {
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

describe("iRange - 2 args same", () => {
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

describe("iRange - 2 args increasing", () => {
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

describe("iRange - 2 args decreasing", () => {
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
