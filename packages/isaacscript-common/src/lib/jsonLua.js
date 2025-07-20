// Created by lua.js:
// https://github.com/mherkender/lua.js?tab=readme-ov-file

// cspell: disable

/*
 Copyright 2011 Maximilian Herkender

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var lua_print = function () {
  try {
    console.log.apply(console, arguments);
  } catch (a) {}
  return [];
};
function lua_load(a, b) {
  if (!lua_parser)
    throw Error(
      "Lua parser not available, perhaps you're not using the lua+parser.js version of the library?",
    );
  eval(
    "fn = function " +
      (b || "load") +
      "() {\nreturn (function () {\n" +
      lua_parser.parse(a) +
      "\n})()[0];\n};",
  );
}
function slice(a, b) {
  return a.slice ? a.slice(b) : Array.prototype.slice.call(a, b);
}
function not_supported() {
  throw Error("Not supported");
}
function ensure_arraymode(a) {
  if (!a.arraymode) {
    var b = [],
      c;
    for (c in a.uints) null != a.uints[c] && (b[c - 1] = a.uints[c]);
    a.uints = b;
    a.arraymode = !0;
  }
}
function ensure_notarraymode(a) {
  if (a.arraymode) {
    var b = {},
      c;
    for (c in a.uints) null != a.uints[c] && (b[c - -1] = a.uints[c]);
    a.uints = b;
    delete a.arraymode;
  }
}
function ReturnValues(a) {
  this.vars = a || [];
}
function lua_true(a) {
  return null != a && !1 !== a;
}
function lua_not(a) {
  return null == a || !1 === a;
}
function lua_and(a, b) {
  return null == a || !1 === a ? a : b();
}
function lua_or(a, b) {
  return null != a && !1 !== a ? a : b();
}
function lua_assertfloat(a) {
  var b = parseFloat(a);
  if (isNaN(b)) throw Error("Invalid number: " + a);
  return b;
}
function lua_newtable(a) {
  for (
    var b = { str: {}, uints: {}, floats: {}, bool: {}, objs: [] }, c = 1;
    c < arguments.length - 1;
    c += 2
  ) {
    var d = arguments[c + 1];
    if (null != d) {
      var e = arguments[c];
      switch (typeof e) {
        case "string":
          b.str[e] = d;
          break;
        case "number":
          if (e != e) throw Error("Table index is NaN");
          0 < e && (e | 0) == e ? (b.uints[e] = d) : (b.floats[e] = d);
          break;
        case "boolean":
          b.bool[e] = d;
          break;
        case "object":
          if (null == e) throw Error("Table index is nil");
          var f = !1;
          for (c in b.objs)
            if (b.objs[c][0] === e) {
              null == d ? b.objs.splice(c, 1) : ((f = !0), (b.objs[c][1] = d));
              break;
            }
          f || b.objs.push([e, d]);
          break;
        default:
          throw Error("Unsupported type for table: " + typeof e);
      }
    }
  }
  if (a)
    if ((ensure_arraymode(b), 0 == b.uints.length)) b.uints = a;
    else for (c = a.length; 0 < c--; ) b.uints[c] = a[c];
  return b;
}
function lua_newtable2(a) {
  var b = {},
    c;
  for (c in a) b[c] = a[c];
  return { str: b, uints: {}, floats: {}, bool: {}, objs: {} };
}
function lua_len(a) {
  if ("string" == typeof a) return a.length;
  if ("object" == typeof a && null != a) {
    if (null == a.length) {
      var b = 0;
      if (a.arraymode) for (; null != a.uints[b++]; );
      else for (; null != a.uints[++b]; );
      return (a.length = b - 1);
    }
    return a.length;
  }
  if ((b = a.metatable && a.metatable.str.__len)) return lua_rawcall(b, [a])[0];
  throw Error("Length of <" + a + "> not supported");
}
function lua_rawcall(a, b) {
  try {
    return a.apply(null, b);
  } catch (c) {
    if (c.constructor == ReturnValues) return c.vars;
    throw c;
  }
}
function lua_tablegetcall(a, b, c) {
  a = lua_tableget(a, b);
  if ("function" == typeof a) return lua_rawcall(a, c);
  if (null == a) throw Error("attempt to call field '" + b + "' (a nil value)");
  b = a.metatable && a.metatable.str.__call;
  if (null != b) return lua_rawcall(b, [a].concat(c));
  throw Error("Could not call " + a + " as function");
}
function lua_call(a, b) {
  if ("function" == typeof a) return lua_rawcall(a, b);
  if (null == a) throw Error("attempt to call function (a nil value)");
  var c = a.metatable && a.metatable.str.__call;
  if (null != c) return lua_rawcall(c, [a].concat(b));
  throw Error("Could not call " + a + " as function");
}
function lua_mcall(a, b, c) {
  var d = lua_tableget(a, b);
  if (null == d)
    throw Error("attempt to call method '" + b + "' (a nil value)");
  return lua_call(d, [a].concat(c));
}
function lua_eq(a, b) {
  if (typeof a != typeof b) return null == a && null == b ? !0 : !1;
  if (a == b) return !0;
  if (null == a || null == b) return !1;
  var c = a.metatable && a.metatable.str.__eq;
  return c && c == (b.metatable && b.metatable.str.__eq)
    ? lua_true(lua_rawcall(c, [a, b])[0])
    : !1;
}
function lua_lt(a, b) {
  if (
    ("number" == typeof a && "number" == typeof b) ||
    ("string" == typeof a && "string" == typeof b)
  )
    return a < b;
  var c = a.metatable && a.metatable.str.__lt;
  if (c && c == (b.metatable && b.metatable.str.__lt))
    return lua_true(lua_rawcall(c, [a, b])[0]);
  throw Error("Unable to compare " + a + " and " + b);
}
function lua_lte(a, b) {
  if (
    ("number" == typeof a && "number" == typeof b) ||
    ("string" == typeof a && "string" == typeof b)
  )
    return a <= b;
  var c = a.metatable && a.metatable.str.__le;
  if (c && c == (b.metatable && b.metatable.str.__le))
    return lua_true(lua_rawcall(c, [a, b])[0]);
  if (
    (c = a.metatable && a.metatable.str.__lt) &&
    c == (b.metatable && b.metatable.str.__lt)
  )
    return lua_not(lua_rawcall(c, [b, a])[0]);
  throw Error("Unable to compare " + a + " and " + b);
}
function lua_unm(a) {
  var b = parseFloat(a);
  if (isNaN(b)) {
    if ((b = a.metatable && a.metatable.str.__unm))
      return lua_rawcall(b, [a])[0];
    throw Error("Inverting <" + a + "> not supported");
  }
  return -b;
}
function lua_add(a, b) {
  var c = parseFloat(a),
    d = parseFloat(b);
  if (isNaN(c) || isNaN(d)) {
    if (
      (c =
        (a.metatable && a.metatable.str.__add) ||
        (b.metatable && b.metatable.str.__add))
    )
      return lua_rawcall(c, [a, b])[0];
    throw Error("Adding <" + a + "> and <" + b + "> not supported");
  }
  return c + d;
}
function lua_subtract(a, b) {
  var c = parseFloat(a),
    d = parseFloat(b);
  if (isNaN(c) || isNaN(d)) {
    if (
      (c =
        (a.metatable && a.metatable.str.__sub) ||
        (b.metatable && b.metatable.str.__sub))
    )
      return lua_rawcall(c, [a, b])[0];
    throw Error("Subtracting <" + a + "> and <" + b + "> not supported");
  }
  return c - d;
}
function lua_divide(a, b) {
  var c = parseFloat(a),
    d = parseFloat(b);
  if (isNaN(c) || isNaN(d)) {
    if (
      (c =
        (a.metatable && a.metatable.str.__div) ||
        (b.metatable && b.metatable.str.__div))
    )
      return lua_rawcall(c, [a, b])[0];
    throw Error("Dividing <" + a + "> and <" + b + "> not supported");
  }
  return c / d;
}
function lua_multiply(a, b) {
  var c = parseFloat(a),
    d = parseFloat(b);
  if (isNaN(c) || isNaN(d)) {
    if (
      (c =
        (a.metatable && a.metatable.str.__mul) ||
        (b.metatable && b.metatable.str.__mul))
    )
      return lua_rawcall(c, [a, b])[0];
    throw Error("Multiplying <" + a + "> and <" + b + "> not supported");
  }
  return c * d;
}
function lua_power(a, b) {
  var c = parseFloat(a),
    d = parseFloat(b);
  if (isNaN(c) || isNaN(d)) {
    if (
      (c =
        (a.metatable && a.metatable.str.__pow) ||
        (b.metatable && b.metatable.str.__pow))
    )
      return lua_rawcall(c, [a, b])[0];
    throw Error("<" + a + "> to the power of <" + b + "> not supported");
  }
  return Math.pow(c, d);
}
function lua_mod(a, b) {
  var c = parseFloat(a),
    d = parseFloat(b);
  if (isNaN(c) || isNaN(d)) {
    if (
      (c =
        (a.metatable && a.metatable.str.__mod) ||
        (b.metatable && b.metatable.str.__mod))
    )
      return lua_rawcall(c, [a, b])[0];
    throw Error("Modulo <" + a + "> and <" + b + "> not supported");
  }
  return 0 <= c
    ? 0 <= d
      ? c % d
      : (d + (c % d)) % d
    : 0 <= d
      ? (d + (c % d)) % d
      : c % d;
}
function lua_rawget(a, b) {
  switch (typeof b) {
    case "string":
      return a.str[b];
    case "number":
      if (b != b) throw Error("Table index is NaN");
      return 0 < b && (b | 0) == b
        ? a.arraymode
          ? a.uints[b - 1]
          : a.uints[b]
        : a.floats[b];
    case "boolean":
      return a.bool[b];
    case "object":
      if (null == b) return null;
      for (var c in a.objs) if (a.objs[c][0] == b) return a.objs[c][1];
      break;
    default:
      throw Error("Unsupported key for table: " + typeof b);
  }
}
function lua_rawset(a, b, c) {
  delete a.length;
  switch (typeof b) {
    case "string":
      null == c ? delete a.str[b] : (a.str[b] = c);
      break;
    case "number":
      if (b != b) throw Error("Table index is NaN");
      0 < b && (b | 0) == b
        ? (ensure_notarraymode(a),
          null == c ? delete a.uints[b] : (a.uints[b] = c))
        : null == c
          ? delete a.floats[b]
          : (a.floats[b] = c);
      break;
    case "boolean":
      null == c ? delete a.bool[b] : (a.bool[b] = c);
      break;
    case "object":
      if (null == b) throw Error("Table index is nil");
      var d = !1,
        e;
      for (e in a.objs)
        if (a.objs[e][0] == b) {
          null == c ? a.objs.splice(e, 1) : ((d = !0), (a.objs[e][1] = c));
          break;
        }
      d || a.objs.push([b, c]);
      break;
    default:
      throw Error("Unsupported key for table: " + typeof b);
  }
}
function lua_tableget(a, b) {
  if (null == a)
    throw Error("attempt to index field '" + b + "' in a nil value");
  if ("object" == typeof a) {
    var c = lua_rawget(a, b);
    if (null != c) return c;
    c = a.metatable && a.metatable.str.__index;
    if (null == c) return null;
  } else if (((c = a.metatable && a.metatable.str.__index), null == c))
    throw Error("Unable to index key " + b + " from " + a);
  return "function" == typeof c
    ? lua_rawcall(c, [a, b])[0]
    : lua_tableget(c, b);
}
function lua_tableset(a, b, c) {
  if (null == a) throw Error("attempt to set field '" + b + "' in a nil value");
  if ("object" == typeof a) {
    if (null != lua_rawget(a, b)) {
      lua_rawset(a, b, c);
      return;
    }
    var d = a.metatable && a.metatable.str.__newindex;
    if (null == d) {
      lua_rawset(a, b, c);
      return;
    }
  } else if (((d = a.metatable && a.metatable.str.__newindex), null == d))
    throw Error("Unable to set key " + b + " in table " + a);
  "function" == typeof d ? lua_rawcall(d, [a, b, c]) : lua_tableset(d, b, c);
}
function lua_concat(a, b) {
  if ("number" == typeof a && "number" == typeof b)
    throw Error("number concat not supported yet");
  if (
    ("string" == typeof a || "number" == typeof a) &&
    ("string" == typeof b || "number" == typeof b)
  )
    return a + b;
  var c =
    (a.metatable && a.metatable.str.__concat) ||
    (b.metatable && b.metatable.str.__concat);
  if (c) return lua_rawcall(c, [a, b])[0];
  throw Error("Unable to concat " + a + " and " + b);
}
function _ipairs_next(a, b) {
  var c;
  c = a.arraymode ? a.uints[b] : a.uints[b + 1];
  return null == c ? [null, null] : [b + 1, c];
}
var lua_libs = {},
  lua_core = {
    assert: function (a, b) {
      1 > arguments.length && (b = "assertion failed!");
      if (null != a && !1 !== a) return [a];
      throw Error(b);
    },
    collectgarbage: function () {},
    dofile: function () {
      not_supported();
    },
    error: function (a) {
      throw Error(a);
    },
    getfenv: function () {
      not_supported();
    },
    getmetatable: function (a) {
      return [a.metatable && (a.metatable.str.__metatable || a.metatable)];
    },
    ipairs: function (a) {
      return [_ipairs_next, a, 0];
    },
    load: function (a, b) {
      for (var c = "", d; null != (d = a()) && "" != d; ) c += d;
      try {
        return [lua_load(c, b)];
      } catch (e) {
        return [null, e.message];
      }
    },
    loadfile: function () {
      not_supported();
    },
    loadstring: function (a, b) {
      try {
        return [lua_load(a, b)];
      } catch (c) {
        return [null, c.message];
      }
    },
    next: function () {
      not_supported();
    },
    pairs: function (a) {
      var b = [],
        c;
      for (c in a.str) b.push(c);
      if (a.arraymode)
        for (var d = a.uints.length; 0 < d--; )
          null != a.uints[d] && b.push(d + 1);
      else for (c in a.uints) b.push(parseFloat(c));
      for (c in a.floats) b.push(parseFloat(c));
      for (c in a.bool) b.push("true" === c ? !0 : !1);
      for (c in a.objs) b.push(a.objs[c][0]);
      c = 0;
      return [
        function (a, d) {
          var g;
          do {
            if (c >= b.length) return [null, null];
            d = b[c++];
            g = lua_rawget(a, d);
          } while (null == g);
          return [d, g];
        },
        a,
        null,
      ];
    },
    pcall: function (a) {
      try {
        return [!0].concat(a.apply(null, slice(arguments, 1)));
      } catch (b) {
        return [!1, b.message];
      }
    },
    print: lua_print,
    rawequal: function (a, b) {
      return [a == b || (null == a && null == b)];
    },
    rawget: function (a, b) {
      if ("object" == typeof a && null != a) return [lua_rawget(a, b)];
      throw Error("Unable to index key " + b + " from " + a);
    },
    rawset: function (a, b, c) {
      if ("object" == typeof a && null != a && null != b)
        return (lua_rawset(a, b, c), [a]);
      throw Error("Unable set key " + b + " in " + a);
    },
    select: function (a) {
      if ("#" === a) return [arguments.length - 1];
      a = lua_assertfloat(a);
      if (1 <= a) return slice(arguments, lua_assertfloat(a));
      throw Error("Index out of range");
    },
    setfenv: function () {
      not_supported();
    },
    setmetatable: function (a, b) {
      if ("object" != typeof a || null == a)
        throw Error("table expected, got " + a);
      if (null == b) delete a.metatable;
      else if ("object" === typeof b) a.metatable = b;
      else throw Error("table or nil expected, got " + b);
      return [a];
    },
    tonumber: function (a, b) {
      return "number" == typeof a
        ? [a]
        : 10 === b || null == b
          ? [parseFloat(a)]
          : [parseInt(a, b)];
    },
    tostring: function (a) {
      if (null == a) return ["nil"];
      var b = a.metatable && a.metatable.str.__tostring;
      if (b) return lua_rawcall(b, [a]);
      switch (typeof a) {
        case "number":
        case "boolean":
          return [a.toString()];
        case "string":
          return [a];
        case "object":
          return ["table"];
        case "function":
          return ["function"];
        default:
          return ["nil"];
      }
    },
    type: function (a) {
      switch (typeof a) {
        case "number":
          return ["number"];
        case "string":
          return ["string"];
        case "boolean":
          return ["boolean"];
        case "function":
          return ["function"];
        case "object":
          return [null === a ? "nil" : "table"];
        case "undefined":
          return ["nil"];
        default:
          throw Error("Unepected value of type " + typeof a);
      }
    },
    unpack: function (a, b, c) {
      ensure_arraymode(a);
      if (null != a.length) c = a.length;
      else {
        for (c = 0; null != a.uints[c++]; );
        a.length = --c;
      }
      if (null == b || 1 > b) b = 1;
      null == c && (c = a.length);
      throw new ReturnValues(a.uints.slice(b - 1, c));
    },
    _VERSION: "Lua 5.1",
    xpcall: function () {
      not_supported();
    },
  },
  _lua_coroutine = (lua_libs.coroutine = {});
_lua_coroutine.resume =
  _lua_coroutine.running =
  _lua_coroutine.status =
  _lua_coroutine.wrap =
  _lua_coroutine.yield =
  _lua_coroutine.create =
    function () {
      not_supported();
    };
var _lua_debug = (lua_libs.debug = {
  getmetatable: function (a) {
    return [a.metatable];
  },
});
_lua_debug.traceback =
  _lua_debug.getfenv =
  _lua_debug.gethook =
  _lua_debug.getinfo =
  _lua_debug.getlocal =
  _lua_debug.getregistry =
  _lua_debug.getupvalue =
  _lua_debug.setfenv =
  _lua_debug.sethook =
  _lua_debug.setlocal =
  _lua_debug.setupvalue =
  _lua_debug.debug =
    function () {
      not_supported();
    };
var _lua_write_buffer = "",
  _lua_io = (lua_libs.io = {
    write: function () {
      _lua_write_buffer += Array.prototype.join.call(arguments, "");
      for (var a = _lua_write_buffer.split("\n"); 1 < a.length; )
        _lua_print(a.shift());
      _lua_write_buffer = a[0];
      return [];
    },
    flush: function () {},
    stderr: null,
    stdin: null,
    stdout: null,
  });
_lua_io.close =
  _lua_io.input =
  _lua_io.lines =
  _lua_io.output =
  _lua_io.popen =
  _lua_io.read =
  _lua_io.tmpfile =
  _lua_io.type =
  _lua_io.open =
    function () {
      not_supported();
    };
var _lua_randmax = 4294967296,
  _lua_randseed = (Math.random() * _lua_randmax) & (_lua_randmax - 1);
lua_libs.math = {
  abs: function (a) {
    return [Math.abs(a)];
  },
  acos: function (a) {
    return [Math.acos(a)];
  },
  asin: function (a) {
    return [Math.asin(a)];
  },
  atan: function (a) {
    return [Math.atan(a)];
  },
  atan2: function (a, b) {
    return [Math.atan2(a, b)];
  },
  ceil: function (a) {
    return [Math.ceil(a)];
  },
  cos: function (a) {
    return [Math.cos(a)];
  },
  cosh: function (a) {
    return [(Math.exp(a) + Math.exp(-a)) / 2];
  },
  deg: function (a) {
    return [a * (180 / Math.PI)];
  },
  exp: function (a) {
    return [Math.exp(a)];
  },
  floor: function (a) {
    return [Math.floor(a)];
  },
  fmod: function (a, b) {
    return [a % b];
  },
  frexp: function () {
    not_supported();
  },
  huge: Infinity,
  ldexp: function (a, b) {
    return [a * Math.pow(2, b)];
  },
  log: function (a) {
    return [Math.log(a)];
  },
  log10: function (a) {
    return [Math.log(a) / Math.LN10];
  },
  max: function () {
    return [Math.max.apply(null, arguments)];
  },
  min: function () {
    return [Math.min.apply(null, arguments)];
  },
  modf: function (a) {
    var b = a % 1;
    return [a - b, b];
  },
  pi: Math.PI,
  pow: function (a, b) {
    return [Math.pow(a, b)];
  },
  rad: function (a) {
    return [a * (Math.PI / 180)];
  },
  sin: function (a) {
    return [Math.sin(a)];
  },
  sinh: function (a) {
    return [(Math.exp(a) - Math.exp(-a)) / 2];
  },
  sqrt: function (a) {
    return [Math.sqrt(a)];
  },
  tan: function (a) {
    return [Math.tan(a)];
  },
  tanh: function (a) {
    var b = Math.exp(a),
      a = Math.exp(-a);
    return [(b - a) / (b + a)];
  },
  random: function (a, b) {
    _lua_randseed = ~_lua_randseed + (_lua_randseed << 15);
    _lua_randseed ^= _lua_randseed >>> 12;
    _lua_randseed += _lua_randseed << 2;
    _lua_randseed ^= _lua_randseed >>> 4;
    _lua_randseed *= 2057;
    _lua_randseed ^= _lua_randseed >>> 16;
    var c;
    c =
      0 > _lua_randseed
        ? ((_lua_randseed + _lua_randmax) / _lua_randmax) % 1
        : (_lua_randseed / _lua_randmax) % 1;
    if (2 <= arguments.length) {
      a |= 0;
      b |= 0;
      if (a >= b) throw Error("Invalid range");
      return [Math.floor(c * (b - a + 1) + a)];
    }
    return 1 == arguments.length ? [Math.floor(c * (a | 0) + 1)] : [c];
  },
  randomseed: function (a) {
    _lua_randseed = a & (_lua_randmax - 1);
  },
};
var _lua_clock_start = new Date().getTime() / 1e3;
lua_libs.os = {
  clock: function () {
    return [new Date().getTime() / 1e3 - _lua_clock_script];
  },
  date: function (a, b) {
    return ["[" + b + "]" + a];
  },
  difftime: function (a, b) {
    return [a - b];
  },
  execute: function () {
    return 0;
  },
  exit: function () {
    not_supported();
  },
  getenv: function () {
    return [null];
  },
  remove: function () {
    not_supported();
  },
  rename: function () {
    not_supported();
  },
  setlocale: function () {
    not_supported();
  },
  time: function (a) {
    if (a) not_supported();
    else return [Math.floor(new Date().getTime() / 1e3)];
  },
};
var lua_packages = lua_newtable();
function lua_createmodule(a, b, c) {
  var d = lua_tableget(lua_packages, b) || lua_tableget(a, b) || lua_newtable();
  lua_tableset(a, b, d);
  lua_tableset(lua_packages, b, d);
  lua_tableset(d, "_NAME", b);
  lua_tableset(d, "_M", d);
  lua_tableset(d, "_PACKAGE", b.split(".").slice(0, -1).join("."));
  for (a = 0; a < c.length; a++) lua_call(c[a], [d]);
  return d;
}
function lua_module(a) {
  var b = lua_tableget(lua_packages, a);
  if (null == b)
    throw Error(
      "Module " + a + " not found. Module must be loaded before use.",
    );
  return b;
}
function lua_require(a, b) {
  for (
    var c = lua_module(b), d = a, e = b.split("."), f = 0;
    f < e.length - 1;
    f++
  )
    if (!lua_tableget(d, e[f])) {
      var g = lua_newtable();
      lua_tableset(d, e[f], g);
      d = g;
    }
  lua_tableset(d, e[e.length - 1], c);
  return c;
}
lua_libs["package"] = {
  path: "",
  cpath: "",
  loaded: lua_packages,
  loaders: lua_newtable(),
  preload: lua_newtable(),
  loadlib: function () {
    not_supported();
  },
};
lua_libs.string = {
  byte: function (a, b, c) {
    null == b && (b = 0);
    null == c && (c = b);
    for (var d = []; b < c && b < a.length; ) d.push(a.charCodeAt(b));
    return d;
  },
  char: function () {
    return [String.fromCharCode.apply(null, arguments)];
  },
  dump: function () {
    not_supported();
  },
  find: function () {
    not_supported();
  },
  format: function (a) {
    return ["[" + slice(arguments, 1).join(", ") + "]" + arguments[0]];
  },
  gmatch: function () {
    not_supported();
  },
  gsub: function () {
    not_supported();
  },
  len: function (a) {
    if ("string" == typeof a) return [a.length];
    throw Error("Input not string");
  },
  lower: function (a) {
    if ("string" == typeof a) return [a.toLowerCase()];
    throw Error("Input not string");
  },
  match: function () {
    not_supported();
  },
  rep: function (a, b) {
    if ("string" == typeof a && "number" == typeof b) {
      for (var c = []; 0 < b--; ) c.push(a);
      return [c.join("")];
    }
    throw Error("Input not string and number");
  },
  reverse: function (a) {
    if ("string" == typeof a) return [a.split("").reverse().join("")];
    throw Error("Input not string");
  },
  sub: function (a, b, c) {
    b = 0 > b ? b + a.length + 1 : 0 <= b ? b : 0;
    null == c && (c = -1);
    c = 0 > c ? c + a.length + 1 : 0 <= c ? c : 0;
    1 > b && (b = 1);
    c > a.length && (c = a.length);
    return b <= c ? [a.substr(b - 1, c - b + 1)] : [""];
  },
  upper: function (a) {
    if ("string" == typeof a) return [a.toUpperCase()];
    throw Error("Input not string");
  },
};
String.prototype.metatable = lua_newtable(
  null,
  "__index",
  lua_newtable2(lua_libs.string),
);
lua_libs.table = {
  concat: function (a, b, c, d) {
    ensure_arraymode(a);
    null == b && (b = "");
    return null != c
      ? (null == d && (d = a.uints.length), [a.uints.slice(c - 1, d).join(b)])
      : [a.uints.join(b)];
  },
  insert: function (a, b, c) {
    ensure_arraymode(a);
    2 == arguments.length && ((c = b), (b = a.uints.length + 1));
    a.uints.splice(b - 1, 0, c);
    null != a.length && a.length++;
    return [];
  },
  maxn: function (a) {
    if (a.arraymode) return [a.uints.length];
    var b = 0,
      c;
    for (c in a.uints) ((a = parseFloat(c)), a > b && (b = a));
    return [b];
  },
  remove: function (a, b) {
    ensure_arraymode(a);
    b = null == b ? a.uints.length : lua_assertfloat(b);
    if (a.uints.length) {
      var c = a.uints[b - 1];
      a.uints.splice(b - 1, 1);
      null != a.length && a.length--;
      return [c];
    }
    return [];
  },
  sort: function (a, b) {
    ensure_arraymode(a);
    b
      ? a.uints.sort(function (a, d) {
          return b(a, d)[0] ? -1 : 1;
        })
      : a.uints.sort(function (a, b) {
          return lua_lt(a, b) ? -1 : 1;
        });
    return [];
  },
};
lua_libs.bit = {
  tobit: function (a) {
    return [a << 0];
  },
  tohex: function (a, b) {
    if (0 < b) {
      for (var c = a.toString(16).substr(-b); c.length < b; ) c = "0" + c;
      return [c];
    }
    if (0 > b) {
      for (c = a.toString(16).substr(b).toUpperCase(); c.length < -b; )
        c = "0" + c;
      return [c];
    }
    return [a.toString(16)];
  },
  bnot: function (a) {
    return [~a];
  },
  bor: function (a) {
    for (var a = lua_assertfloat(a), b = 1; b < arguments.length; b++)
      a |= arguments[b];
    return [a];
  },
  band: function (a) {
    for (var a = lua_assertfloat(a), b = 1; b < arguments.length; b++)
      a &= arguments[b];
    return [a];
  },
  bxor: function (a) {
    for (var a = lua_assertfloat(a), b = 1; b < arguments.length; b++)
      a ^= arguments[b];
    return [a];
  },
  lshift: function (a, b) {
    return [a << b];
  },
  rshift: function (a, b) {
    return [a >>> b];
  },
  arshift: function (a, b) {
    return [a >> b];
  },
  rol: function (a, b) {
    b &= 15;
    return [(a << b) | (a >>> -b)];
  },
  ror: function (a, b) {
    b &= 15;
    return [(a >>> b) | (a << -b)];
  },
  bswap: function (a) {
    a = ((a >> 1) & 1431655765) | ((a & 1431655765) << 1);
    a = ((a >> 2) & 858993459) | ((a & 858993459) << 2);
    a = ((a >> 4) & 252645135) | ((a & 252645135) << 4);
    a = ((a >> 8) & 16711935) | ((a & 16711935) << 8);
    return [(a >> 16) | (a << 16)];
  },
};

var lua_script = (function () {
  var tmp;
  var G = lua_newtable2(lua_core);
  for (var i in lua_libs) {
    G.str[i] = lua_newtable2(lua_libs[i]);
  }
  G.str["arg"] = lua_newtable();
  G.str["_G"] = G;
  G.str["module"] = function (name) {
    lua_createmodule(G, name, slice(arguments, 1));
  };
  G.str["require"] = function (name) {
    lua_require(G, name);
  };
  G.str["package"].str["seeall"] = function (module) {
    if (!module.metatable) {
      module.metatable = lua_newtable();
    }
    module.metatable.str["__index"] = G;
  };
  {
    var _json_1 = lua_newtable([], "_version", "0.1.2");
    var _encode_1;
    var _escape_char_map_1 = lua_newtable(
      [],
      "\\",
      "\\",
      '"',
      '"',
      "\b",
      "b",
      "\f",
      "f",
      "\n",
      "n",
      "\r",
      "r",
      "\t",
      "t",
    );
    var _escape_char_map_inv_1 = lua_newtable([], "/", "/");
    tmp = lua_call(G.str["pairs"], [_escape_char_map_1]);
    var f_2 = tmp[0],
      s_2 = tmp[1],
      var_2 = tmp[2];
    while ((tmp = lua_call(f_2, [s_2, var_2]))[0] != null) {
      var_2 = tmp[0];
      var _k_2 = var_2,
        _v_2 = tmp[1];
      tmp = null;
      lua_tableset(_escape_char_map_inv_1, _v_2, _k_2);
    }
    tmp = null;
    var _escape_char_1 = function (_c) {
      var tmp;
      return [
        lua_concat(
          "\\",
          lua_or(lua_tableget(_escape_char_map_1, _c), function () {
            return lua_tablegetcall(
              G.str["string"],
              "format",
              ["u%04x"].concat(lua_mcall(_c, "byte", [])),
            )[0];
          }),
        ),
      ];
      return [];
    };
    var _encode_nil_1 = function (_val) {
      var tmp;
      return ["null"];
      return [];
    };
    var _encode_table_1 = function (_val, _stack, _traversalDescription) {
      var tmp;
      var _res_6 = lua_newtable();
      _stack = lua_or(_stack, function () {
        return lua_newtable();
      });
      _traversalDescription = lua_or(_traversalDescription, function () {
        return "";
      });
      if (lua_true(lua_tableget(_stack, _val))) {
        lua_call(G.str["error"], ["circular reference"]);
      }
      lua_tableset(_stack, _val, true);
      if (
        !lua_eq(lua_call(G.str["rawget"], [_val, 1])[0], null) ||
        lua_eq(lua_call(G.str["next"], [_val])[0], null)
      ) {
        var _n_8 = 0;
        tmp = lua_call(G.str["pairs"], [_val]);
        var f_9 = tmp[0],
          s_9 = tmp[1],
          var_9 = tmp[2];
        tmp = null;
        while ((var_9 = lua_call(f_9, [s_9, var_9])[0]) != null) {
          var _k_9 = var_9;
          if (!lua_eq(lua_call(G.str["type"], [_k_9])[0], "number")) {
            lua_call(G.str["error"], [
              lua_concat(
                "invalid table: mixed or invalid key types for array, excepted number, got: ",
                lua_call(G.str["tostring"], lua_call(G.str["type"], [_k_9]))[0],
              ),
            ]);
          }
          _n_8 = lua_add(_n_8, 1);
        }
        if (!lua_eq(_n_8, lua_len(_val))) {
          lua_call(G.str["error"], ["invalid table: sparse array"]);
        }
        tmp = lua_call(G.str["ipairs"], [_val]);
        var f_13 = tmp[0],
          s_13 = tmp[1],
          var_13 = tmp[2];
        while ((tmp = lua_call(f_13, [s_13, var_13]))[0] != null) {
          var_13 = tmp[0];
          var _i_13 = var_13,
            _v_13 = tmp[1];
          tmp = null;
          var _newTraversalDescription_14 = lua_concat(
            _traversalDescription,
            lua_concat(lua_call(G.str["tostring"], [_i_13])[0], " - "),
          );
          lua_tablegetcall(
            G.str["table"],
            "insert",
            [_res_6].concat(
              lua_call(_encode_1, [_v_13, _stack, _newTraversalDescription_14]),
            ),
          );
        }
        tmp = null;
        lua_tableset(_stack, _val, null);
        return [
          lua_concat(
            "[",
            lua_concat(
              lua_tablegetcall(G.str["table"], "concat", [_res_6, ","])[0],
              "]",
            ),
          ),
        ];
      } else {
        tmp = lua_call(G.str["pairs"], [_val]);
        var f_16 = tmp[0],
          s_16 = tmp[1],
          var_16 = tmp[2];
        while ((tmp = lua_call(f_16, [s_16, var_16]))[0] != null) {
          var_16 = tmp[0];
          var _k_16 = var_16,
            _v_16 = tmp[1];
          tmp = null;
          var _newTraversalDescription_17 = lua_concat(
            _traversalDescription,
            lua_concat(lua_call(G.str["tostring"], [_k_16])[0], " - "),
          );
          if (!lua_eq(lua_call(G.str["type"], [_k_16])[0], "string")) {
            lua_call(G.str["error"], [
              lua_concat(
                'invalid table: mixed or invalid key types for object "',
                lua_concat(
                  _newTraversalDescription_17,
                  lua_concat(
                    '", ',
                    lua_concat(
                      "excepted string, got: ",
                      lua_call(
                        G.str["tostring"],
                        lua_call(G.str["type"], [_k_16]),
                      )[0],
                    ),
                  ),
                ),
              ),
            ]);
          }
          lua_tablegetcall(G.str["table"], "insert", [
            _res_6,
            lua_concat(
              lua_call(_encode_1, [
                _k_16,
                _stack,
                _newTraversalDescription_17,
              ])[0],
              lua_concat(
                ":",
                lua_call(_encode_1, [
                  _v_16,
                  _stack,
                  _newTraversalDescription_17,
                ])[0],
              ),
            ),
          ]);
        }
        tmp = null;
        lua_tableset(_stack, _val, null);
        return [
          lua_concat(
            "{",
            lua_concat(
              lua_tablegetcall(G.str["table"], "concat", [_res_6, ","])[0],
              "}",
            ),
          ),
        ];
      }
      return [];
    };
    var _encode_string_1 = function (_val) {
      var tmp;
      return [
        lua_concat(
          '"',
          lua_concat(
            lua_mcall(_val, "gsub", ['[%z\x01-\x19\\"]', _escape_char_1])[0],
            '"',
          ),
        ),
      ];
      return [];
    };
    var _encode_number_1 = function (_val) {
      var tmp;
      if (
        !lua_eq(_val, _val) ||
        lua_lte(_val, lua_unm(lua_tableget(G.str["math"], "huge"))) ||
        lua_lte(lua_tableget(G.str["math"], "huge"), _val)
      ) {
        lua_call(G.str["error"], [
          lua_concat(
            "unexpected number value '",
            lua_concat(lua_call(G.str["tostring"], [_val])[0], "'"),
          ),
        ]);
      }
      return lua_tablegetcall(G.str["string"], "format", ["%.14g", _val]);
      return [];
    };
    var _type_func_map_1 = lua_newtable(
      [],
      "nil",
      _encode_nil_1,
      "table",
      _encode_table_1,
      "string",
      _encode_string_1,
      "number",
      _encode_number_1,
      "boolean",
      G.str["tostring"],
    );
    _encode_1 = function (_val, _stack, _traversalDescription) {
      var tmp;
      var _t_22 = lua_call(G.str["type"], [_val])[0];
      var _f_22 = lua_tableget(_type_func_map_1, _t_22);
      if (lua_true(_f_22)) {
        return lua_call(_f_22, [_val, _stack, _traversalDescription]);
      }
      lua_call(G.str["error"], [
        lua_concat("unexpected type '", lua_concat(_t_22, "'")),
      ]);
      return [];
    };
    lua_tableset(_json_1, "encode", function (_val) {
      var tmp;
      return [lua_call(_encode_1, [_val])[0]];
      return [];
    });
    var _parse_1;
    var _create_set_1 = function () {
      var tmp;
      var varargs = slice(arguments, 0);
      var _res_25 = lua_newtable();
      var var_26 = 1,
        stop_26 = lua_assertfloat(
          lua_call(G.str["select"], ["#"].concat(varargs))[0],
        );
      for (; var_26 <= stop_26; var_26++) {
        var _i_26 = var_26;
        lua_tableset(
          _res_25,
          lua_call(G.str["select"], [_i_26].concat(varargs))[0],
          true,
        );
      }
      return [_res_25];
      return [];
    };
    var _space_chars_1 = lua_call(_create_set_1, [" ", "\t", "\r", "\n"])[0];
    var _delim_chars_1 = lua_call(_create_set_1, [
      " ",
      "\t",
      "\r",
      "\n",
      "]",
      "}",
      ",",
    ])[0];
    var _escape_chars_1 = lua_call(_create_set_1, [
      "\\",
      "/",
      '"',
      "b",
      "f",
      "n",
      "r",
      "t",
      "u",
    ])[0];
    var _literals_1 = lua_call(_create_set_1, ["true", "false", "null"])[0];
    var _literal_map_1 = lua_newtable(
      [],
      "true",
      true,
      "false",
      false,
      "null",
      null,
    );
    var _next_char_1 = function (_str, _idx, _set, _negate) {
      var tmp;
      var var_29 = lua_assertfloat(_idx),
        stop_29 = lua_assertfloat(lua_len(_str));
      for (; var_29 <= stop_29; var_29++) {
        var _i_29 = var_29;
        if (
          !lua_eq(
            lua_tableget(_set, lua_mcall(_str, "sub", [_i_29, _i_29])[0]),
            _negate,
          )
        ) {
          return [_i_29];
        }
      }
      return [lua_add(lua_len(_str), 1)];
      return [];
    };
    var _decode_error_1 = function (_str, _idx, _msg) {
      var tmp;
      var _line_count_32 = 1;
      var _col_count_32 = 1;
      var var_33 = 1,
        stop_33 = lua_assertfloat(lua_subtract(_idx, 1));
      for (; var_33 <= stop_33; var_33++) {
        var _i_33 = var_33;
        _col_count_32 = lua_add(_col_count_32, 1);
        if (lua_eq(lua_mcall(_str, "sub", [_i_33, _i_33])[0], "\n")) {
          _line_count_32 = lua_add(_line_count_32, 1);
          _col_count_32 = 1;
        }
      }
      lua_call(
        G.str["error"],
        lua_tablegetcall(G.str["string"], "format", [
          "%s at line %d col %d",
          _msg,
          _line_count_32,
          _col_count_32,
        ]),
      );
      return [];
    };
    var _codepoint_to_utf8_1 = function (_n) {
      var tmp;
      var _f_36 = lua_tableget(G.str["math"], "floor");
      if (lua_lte(_n, 0x7f)) {
        return lua_tablegetcall(G.str["string"], "char", [_n]);
      } else if (lua_lte(_n, 0x7ff)) {
        return lua_tablegetcall(G.str["string"], "char", [
          lua_add(lua_call(_f_36, [lua_divide(_n, 64)])[0], 192),
          lua_add(lua_mod(_n, 64), 128),
        ]);
      } else if (lua_lte(_n, 0xffff)) {
        return lua_tablegetcall(G.str["string"], "char", [
          lua_add(lua_call(_f_36, [lua_divide(_n, 4096)])[0], 224),
          lua_add(lua_call(_f_36, [lua_divide(lua_mod(_n, 4096), 64)])[0], 128),
          lua_add(lua_mod(_n, 64), 128),
        ]);
      } else if (lua_lte(_n, 0x10ffff)) {
        return lua_tablegetcall(G.str["string"], "char", [
          lua_add(lua_call(_f_36, [lua_divide(_n, 262144)])[0], 240),
          lua_add(
            lua_call(_f_36, [lua_divide(lua_mod(_n, 262144), 4096)])[0],
            128,
          ),
          lua_add(lua_call(_f_36, [lua_divide(lua_mod(_n, 4096), 64)])[0], 128),
          lua_add(lua_mod(_n, 64), 128),
        ]);
      }
      lua_call(
        G.str["error"],
        lua_tablegetcall(G.str["string"], "format", [
          "invalid unicode codepoint '%x'",
          _n,
        ]),
      );
      return [];
    };
    var _parse_unicode_escape_1 = function (_s) {
      var tmp;
      var _n1_41 = lua_call(G.str["tonumber"], [
        lua_mcall(_s, "sub", [1, 4])[0],
        16,
      ])[0];
      var _n2_41 = lua_call(G.str["tonumber"], [
        lua_mcall(_s, "sub", [7, 10])[0],
        16,
      ])[0];
      if (lua_true(_n2_41)) {
        return lua_call(_codepoint_to_utf8_1, [
          lua_add(
            lua_add(
              lua_multiply(lua_subtract(_n1_41, 0xd800), 0x400),
              lua_subtract(_n2_41, 0xdc00),
            ),
            0x10000,
          ),
        ]);
      } else {
        return lua_call(_codepoint_to_utf8_1, [_n1_41]);
      }
      return [];
    };
    var _parse_string_1 = function (_str, _i) {
      var tmp;
      var _res_44 = "";
      var _j_44 = lua_add(_i, 1);
      var _k_44 = _j_44;
      while (lua_lte(_j_44, lua_len(_str))) {
        var _x_45 = lua_mcall(_str, "byte", [_j_44])[0];
        if (lua_lt(_x_45, 32)) {
          lua_call(_decode_error_1, [
            _str,
            _j_44,
            "control character in string",
          ]);
        } else if (lua_eq(_x_45, 92)) {
          _res_44 = lua_concat(
            _res_44,
            lua_mcall(_str, "sub", [_k_44, lua_subtract(_j_44, 1)])[0],
          );
          _j_44 = lua_add(_j_44, 1);
          var _c_47 = lua_mcall(_str, "sub", [_j_44, _j_44])[0];
          if (lua_eq(_c_47, "u")) {
            var _hex_48 = lua_or(
              lua_or(
                lua_mcall(_str, "match", [
                  "^[dD][89aAbB]%x%x\\u%x%x%x%x",
                  lua_add(_j_44, 1),
                ])[0],
                function () {
                  return lua_mcall(_str, "match", [
                    "^%x%x%x%x",
                    lua_add(_j_44, 1),
                  ])[0];
                },
              ),
              function () {
                return lua_call(_decode_error_1, [
                  _str,
                  lua_subtract(_j_44, 1),
                  "invalid unicode escape in string",
                ])[0];
              },
            );
            _res_44 = lua_concat(
              _res_44,
              lua_call(_parse_unicode_escape_1, [_hex_48])[0],
            );
            _j_44 = lua_add(_j_44, lua_len(_hex_48));
          } else {
            if (lua_not(lua_tableget(_escape_chars_1, _c_47))) {
              lua_call(_decode_error_1, [
                _str,
                lua_subtract(_j_44, 1),
                lua_concat(
                  "invalid escape char '",
                  lua_concat(_c_47, "' in string"),
                ),
              ]);
            }
            _res_44 = lua_concat(
              _res_44,
              lua_tableget(_escape_char_map_inv_1, _c_47),
            );
          }
          _k_44 = lua_add(_j_44, 1);
        } else if (lua_eq(_x_45, 34)) {
          _res_44 = lua_concat(
            _res_44,
            lua_mcall(_str, "sub", [_k_44, lua_subtract(_j_44, 1)])[0],
          );
          return [_res_44, lua_add(_j_44, 1)];
        }
        _j_44 = lua_add(_j_44, 1);
      }
      lua_call(_decode_error_1, [
        _str,
        _i,
        "expected closing quote for string",
      ]);
      return [];
    };
    var _parse_number_1 = function (_str, _i) {
      var tmp;
      var _x_52 = lua_call(_next_char_1, [_str, _i, _delim_chars_1])[0];
      var _s_52 = lua_mcall(_str, "sub", [_i, lua_subtract(_x_52, 1)])[0];
      var _n_52 = lua_call(G.str["tonumber"], [_s_52])[0];
      if (lua_not(_n_52)) {
        lua_call(_decode_error_1, [
          _str,
          _i,
          lua_concat("invalid number '", lua_concat(_s_52, "'")),
        ]);
      }
      return [_n_52, _x_52];
      return [];
    };
    var _parse_literal_1 = function (_str, _i) {
      var tmp;
      var _x_54 = lua_call(_next_char_1, [_str, _i, _delim_chars_1])[0];
      var _word_54 = lua_mcall(_str, "sub", [_i, lua_subtract(_x_54, 1)])[0];
      if (lua_not(lua_tableget(_literals_1, _word_54))) {
        lua_call(_decode_error_1, [
          _str,
          _i,
          lua_concat("invalid literal '", lua_concat(_word_54, "'")),
        ]);
      }
      return [lua_tableget(_literal_map_1, _word_54), _x_54];
      return [];
    };
    var _parse_array_1 = function (_str, _i) {
      var tmp;
      var _res_56 = lua_newtable();
      var _n_56 = 1;
      _i = lua_add(_i, 1);
      while (lua_true(1)) {
        var _x_57;
        _i = lua_call(_next_char_1, [_str, _i, _space_chars_1, true])[0];
        if (lua_eq(lua_mcall(_str, "sub", [_i, _i])[0], "]")) {
          _i = lua_add(_i, 1);
          break;
        }
        tmp = lua_call(_parse_1, [_str, _i]);
        _x_57 = tmp[0];
        _i = tmp[1];
        tmp = null;
        lua_tableset(_res_56, _n_56, _x_57);
        _n_56 = lua_add(_n_56, 1);
        _i = lua_call(_next_char_1, [_str, _i, _space_chars_1, true])[0];
        var _chr_57 = lua_mcall(_str, "sub", [_i, _i])[0];
        _i = lua_add(_i, 1);
        if (lua_eq(_chr_57, "]")) {
          break;
        }
        if (!lua_eq(_chr_57, ",")) {
          lua_call(_decode_error_1, [_str, _i, "expected ']' or ','"]);
        }
      }
      return [_res_56, _i];
      return [];
    };
    var _parse_object_1 = function (_str, _i) {
      var tmp;
      var _res_61 = lua_newtable();
      _i = lua_add(_i, 1);
      while (lua_true(1)) {
        var _key_62, _val_62;
        _i = lua_call(_next_char_1, [_str, _i, _space_chars_1, true])[0];
        if (lua_eq(lua_mcall(_str, "sub", [_i, _i])[0], "}")) {
          _i = lua_add(_i, 1);
          break;
        }
        if (!lua_eq(lua_mcall(_str, "sub", [_i, _i])[0], '"')) {
          lua_call(_decode_error_1, [_str, _i, "expected string for key"]);
        }
        tmp = lua_call(_parse_1, [_str, _i]);
        _key_62 = tmp[0];
        _i = tmp[1];
        tmp = null;
        _i = lua_call(_next_char_1, [_str, _i, _space_chars_1, true])[0];
        if (!lua_eq(lua_mcall(_str, "sub", [_i, _i])[0], ":")) {
          lua_call(_decode_error_1, [_str, _i, "expected ':' after key"]);
        }
        _i = lua_call(_next_char_1, [
          _str,
          lua_add(_i, 1),
          _space_chars_1,
          true,
        ])[0];
        tmp = lua_call(_parse_1, [_str, _i]);
        _val_62 = tmp[0];
        _i = tmp[1];
        tmp = null;
        lua_tableset(_res_61, _key_62, _val_62);
        _i = lua_call(_next_char_1, [_str, _i, _space_chars_1, true])[0];
        var _chr_62 = lua_mcall(_str, "sub", [_i, _i])[0];
        _i = lua_add(_i, 1);
        if (lua_eq(_chr_62, "}")) {
          break;
        }
        if (!lua_eq(_chr_62, ",")) {
          lua_call(_decode_error_1, [_str, _i, "expected '}' or ','"]);
        }
      }
      return [_res_61, _i];
      return [];
    };
    var _char_func_map_1 = lua_newtable(
      [],
      '"',
      _parse_string_1,
      "0",
      _parse_number_1,
      "1",
      _parse_number_1,
      "2",
      _parse_number_1,
      "3",
      _parse_number_1,
      "4",
      _parse_number_1,
      "5",
      _parse_number_1,
      "6",
      _parse_number_1,
      "7",
      _parse_number_1,
      "8",
      _parse_number_1,
      "9",
      _parse_number_1,
      "-",
      _parse_number_1,
      "t",
      _parse_literal_1,
      "f",
      _parse_literal_1,
      "n",
      _parse_literal_1,
      "[",
      _parse_array_1,
      "{",
      _parse_object_1,
    );
    _parse_1 = function (_str, _idx) {
      var tmp;
      var _chr_68 = lua_mcall(_str, "sub", [_idx, _idx])[0];
      var _f_68 = lua_tableget(_char_func_map_1, _chr_68);
      if (lua_true(_f_68)) {
        return lua_call(_f_68, [_str, _idx]);
      }
      lua_call(_decode_error_1, [
        _str,
        _idx,
        lua_concat("unexpected character '", lua_concat(_chr_68, "'")),
      ]);
      return [];
    };
    lua_tableset(_json_1, "decode", function (_str) {
      var tmp;
      if (!lua_eq(lua_call(G.str["type"], [_str])[0], "string")) {
        lua_call(G.str["error"], [
          lua_concat(
            "expected argument of type string, got ",
            lua_call(G.str["type"], [_str])[0],
          ),
        ]);
      }
      tmp = lua_call(
        _parse_1,
        [_str].concat(lua_call(_next_char_1, [_str, 1, _space_chars_1, true])),
      );
      var _res_70 = tmp[0];
      var _idx_70 = tmp[1];
      tmp = null;
      _idx_70 = lua_call(_next_char_1, [
        _str,
        _idx_70,
        _space_chars_1,
        true,
      ])[0];
      if (lua_lte(_idx_70, lua_len(_str))) {
        lua_call(_decode_error_1, [_str, _idx_70, "trailing garbage"]);
      }
      return [_res_70];
      return [];
    });
    return [_json_1];
  }
  return [G];
})()[0];
