// Created by lua.js:
// https://github.com/mherkender/lua.js?tab=readme-ov-file

// cspell: disable

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
      "t"
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
              ["u%04x"].concat(lua_mcall(_c, "byte", []))
            )[0];
          })
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
                lua_call(G.str["tostring"], lua_call(G.str["type"], [_k_9]))[0]
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
            lua_concat(lua_call(G.str["tostring"], [_i_13])[0], " - ")
          );
          lua_tablegetcall(
            G.str["table"],
            "insert",
            [_res_6].concat(
              lua_call(_encode_1, [_v_13, _stack, _newTraversalDescription_14])
            )
          );
        }
        tmp = null;
        lua_tableset(_stack, _val, null);
        return [
          lua_concat(
            "[",
            lua_concat(
              lua_tablegetcall(G.str["table"], "concat", [_res_6, ","])[0],
              "]"
            )
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
            lua_concat(lua_call(G.str["tostring"], [_k_16])[0], " - ")
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
                        lua_call(G.str["type"], [_k_16])
                      )[0]
                    )
                  )
                )
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
                ])[0]
              )
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
              "}"
            )
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
            '"'
          )
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
            lua_concat(lua_call(G.str["tostring"], [_val])[0], "'")
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
      G.str["tostring"]
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
          lua_call(G.str["select"], ["#"].concat(varargs))[0]
        );
      for (; var_26 <= stop_26; var_26++) {
        var _i_26 = var_26;
        lua_tableset(
          _res_25,
          lua_call(G.str["select"], [_i_26].concat(varargs))[0],
          true
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
      null
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
            _negate
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
        ])
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
            128
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
        ])
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
              lua_subtract(_n2_41, 0xdc00)
            ),
            0x10000
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
            lua_mcall(_str, "sub", [_k_44, lua_subtract(_j_44, 1)])[0]
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
                }
              ),
              function () {
                return lua_call(_decode_error_1, [
                  _str,
                  lua_subtract(_j_44, 1),
                  "invalid unicode escape in string",
                ])[0];
              }
            );
            _res_44 = lua_concat(
              _res_44,
              lua_call(_parse_unicode_escape_1, [_hex_48])[0]
            );
            _j_44 = lua_add(_j_44, lua_len(_hex_48));
          } else {
            if (lua_not(lua_tableget(_escape_chars_1, _c_47))) {
              lua_call(_decode_error_1, [
                _str,
                lua_subtract(_j_44, 1),
                lua_concat(
                  "invalid escape char '",
                  lua_concat(_c_47, "' in string")
                ),
              ]);
            }
            _res_44 = lua_concat(
              _res_44,
              lua_tableget(_escape_char_map_inv_1, _c_47)
            );
          }
          _k_44 = lua_add(_j_44, 1);
        } else if (lua_eq(_x_45, 34)) {
          _res_44 = lua_concat(
            _res_44,
            lua_mcall(_str, "sub", [_k_44, lua_subtract(_j_44, 1)])[0]
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
      _parse_object_1
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
            lua_call(G.str["type"], [_str])[0]
          ),
        ]);
      }
      tmp = lua_call(
        _parse_1,
        [_str].concat(lua_call(_next_char_1, [_str, 1, _space_chars_1, true]))
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
