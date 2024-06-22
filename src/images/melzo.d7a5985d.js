/* eslint-disable no-sequences */
parcelRequire = function (e, r, n, t) {
  var i = "function" == typeof parcelRequire && parcelRequire,
    o = "function" == typeof require && require;

  function u(n, t) {
    if (!r[n]) {
      if (!e[n]) {
        var f = "function" == typeof parcelRequire && parcelRequire;
        if (!t && f) return f(n, !0);
        if (i) return i(n, !0);
        if (o && "string" == typeof n) return o(n);
        var c = new Error("Cannot find module '" + n + "'");
        throw c.code = "MODULE_NOT_FOUND", c
      }
      p.resolve = function (r) {
        return e[n][1][r] || r
      }, p.cache = {};
      var l = r[n] = new u.Module(n);
      e[n][0].call(l.exports, p, l, l.exports, this)
    }
    return r[n].exports;

    function p(e) {
      return u(p.resolve(e))
    }
  }
  u.isParcelRequire = !0, u.Module = function (e) {
    this.id = e, this.bundle = u, this.exports = {}
  }, u.modules = e, u.cache = r, u.parent = i, u.register = function (r, n) {
    e[r] = [function (e, r) {
      r.exports = n
    }, {}]
  };
  for (var f = 0; f < n.length; f++) u(n[f]);
  if (n.length) {
    var c = u(n[n.length - 1]);
    "object" == typeof exports && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function () {
      return c
    }) : t && (this[t] = c)
  }
  return u
}({
  "1ZsE": [function (require, module, exports) {

  }, {
    "./../fonts/business-mlz.eot": [
      ["business-mlz.8a26a20a.eot", "y+k4"], "y+k4"
    ],
    "./../fonts/business-mlz.woff": [
      ["business-mlz.7da307de.woff", "cXvQ"], "cXvQ"
    ],
    "./../fonts/business-mlz.ttf": [
      ["business-mlz.4d368938.ttf", "rxlw"], "rxlw"
    ],
    "./../fonts/business-mlz.svg": [
      ["business-mlz.bf08a45b.svg", "j8h1"], "j8h1"
    ],
    "./../images/banner.png": [
      ["banner.c7e46521.png", "sy4O"], "sy4O"
    ],
    "./../images/left-quote.png": [
      ["left-quote.2b89e009.png", "2Dw5"], "2Dw5"
    ],
    "./../images/right-quote.png": [
      ["right-quote.3db0d82e.png", "GAxm"], "GAxm"
    ]
  }],
  "MV7J": [function (require, module, exports) {
    ! function () {
      function e(e) {
        e.preventDefault();
        var t, n = e.target,
          o = function (e) {
            var t = e.elements,
              n = Object.keys(t).filter(function (e) {
                return "honeypot" !== t[e].name
              }).map(function (e) {
                return void 0 !== t[e].name ? t[e].name : t[e].length > 0 ? t[e].item(0).name : void 0
              }).filter(function (e, t, n) {
                return n.indexOf(e) == t && e
              }),
              o = {};
            return n.forEach(function (e) {
              var n = t[e];
              if (o[e] = n.value, n.length) {
                for (var r = [], a = 0; a < n.length; a++) {
                  var l = n.item(a);
                  (l.checked || l.selected) && r.push(l.value)
                }
                o[e] = r.join(", ")
              }
            }), o.formDataNameOrder = JSON.stringify(n), o.formGoogleSheetName = e.dataset.sheet || "responses", o.formGoogleSendEmail = e.dataset.email || "", console.log(o), o
          }(n);
        if (o.email && (t = o.email, !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(t))) {
          var r = n.querySelector(".email-invalid");
          if (r) return r.style.display = "block", !1
        } else {
          ! function (e) {
            for (var t = e.querySelectorAll("button"), n = 0; n < t.length; n++) t[n].disabled = !0
          }(n);
          var a = n.action,
            l = new XMLHttpRequest;
          l.open("POST", a), l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), l.onreadystatechange = function () {
            console.log(l.status, l.statusText), console.log(l.responseText);
            var e = n.querySelector(".form-elements");
            e && (e.style.display = "none");
            var t = n.nextElementSibling;
            t && (t.style.display = "block")
          };
          var i = Object.keys(o).map(function (e) {
            return encodeURIComponent(e) + "=" + encodeURIComponent(o[e])
          }).join("&");
          l.send(i)
        }
      }
      document.addEventListener("DOMContentLoaded", function () {
        console.log("Contact form submission handler loaded successfully.");
        for (var t = document.querySelectorAll("form.gform"), n = 0; n < t.length; n++) t[n].addEventListener("submit", e, !1)
      }, !1)
    }();
  }, {}],
  "HlZQ": [function (require, module, exports) {
    var global = arguments[3];
    var define;
    var e, t = arguments[3];
    ! function (e, t) {
      "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
      } : t(e)
    }("undefined" != typeof window ? window : this, function (t, n) {
      var r = [],
        i = t.document,
        o = r.slice,
        s = r.concat,
        a = r.push,
        u = r.indexOf,
        l = {},
        c = l.toString,
        f = l.hasOwnProperty,
        p = {},
        d = function (e, t) {
          return new d.fn.init(e, t)
        },
        h = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        g = /^-ms-/,
        v = /-([\da-z])/gi,
        m = function (e, t) {
          return t.toUpperCase()
        };

      function y(e) {
        var t = !!e && "length" in e && e.length,
          n = d.type(e);
        return "function" !== n && !d.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
      }
      d.fn = d.prototype = {
        jquery: "2.2.4",
        constructor: d,
        selector: "",
        length: 0,
        toArray: function () {
          return o.call(this)
        },
        get: function (e) {
          return null != e ? e < 0 ? this[e + this.length] : this[e] : o.call(this)
        },
        pushStack: function (e) {
          var t = d.merge(this.constructor(), e);
          return t.prevObject = this, t.context = this.context, t
        },
        each: function (e) {
          return d.each(this, e)
        },
        map: function (e) {
          return this.pushStack(d.map(this, function (t, n) {
            return e.call(t, n, t)
          }))
        },
        slice: function () {
          return this.pushStack(o.apply(this, arguments))
        },
        first: function () {
          return this.eq(0)
        },
        last: function () {
          return this.eq(-1)
        },
        eq: function (e) {
          var t = this.length,
            n = +e + (e < 0 ? t : 0);
          return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function () {
          return this.prevObject || this.constructor()
        },
        push: a,
        sort: r.sort,
        splice: r.splice
      }, d.extend = d.fn.extend = function () {
        var e, t, n, r, i, o, s = arguments[0] || {},
          a = 1,
          u = arguments.length,
          l = !1;
        for ("boolean" == typeof s && (l = s, s = arguments[a] || {}, a++), "object" == typeof s || d.isFunction(s) || (s = {}), a === u && (s = this, a--); a < u; a++)
          if (null != (e = arguments[a]))
            for (t in e) n = s[t], s !== (r = e[t]) && (l && r && (d.isPlainObject(r) || (i = d.isArray(r))) ? (i ? (i = !1, o = n && d.isArray(n) ? n : []) : o = n && d.isPlainObject(n) ? n : {}, s[t] = d.extend(l, o, r)) : void 0 !== r && (s[t] = r));
        return s
      }, d.extend({
        expando: "jQuery" + ("2.2.4" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (e) {
          throw new Error(e)
        },
        noop: function () {},
        isFunction: function (e) {
          return "function" === d.type(e)
        },
        isArray: Array.isArray,
        isWindow: function (e) {
          return null != e && e === e.window
        },
        isNumeric: function (e) {
          var t = e && e.toString();
          return !d.isArray(e) && t - parseFloat(t) + 1 >= 0
        },
        isPlainObject: function (e) {
          var t;
          if ("object" !== d.type(e) || e.nodeType || d.isWindow(e)) return !1;
          if (e.constructor && !f.call(e, "constructor") && !f.call(e.constructor.prototype || {}, "isPrototypeOf")) return !1;
          for (t in e);
          return void 0 === t || f.call(e, t)
        },
        isEmptyObject: function (e) {
          var t;
          for (t in e) return !1;
          return !0
        },
        type: function (e) {
          return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[c.call(e)] || "object" : typeof e
        },
        globalEval: function (e) {
          var t, n = eval;
          (e = d.trim(e)) && (1 === e.indexOf("use strict") ? ((t = i.createElement("script")).text = e, i.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        },
        camelCase: function (e) {
          return e.replace(g, "ms-").replace(v, m)
        },
        nodeName: function (e, t) {
          return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function (e, t) {
          var n, r = 0;
          if (y(e))
            for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
          else
            for (r in e)
              if (!1 === t.call(e[r], r, e[r])) break;
          return e
        },
        trim: function (e) {
          return null == e ? "" : (e + "").replace(h, "")
        },
        makeArray: function (e, t) {
          var n = t || [];
          return null != e && (y(Object(e)) ? d.merge(n, "string" == typeof e ? [e] : e) : a.call(n, e)), n
        },
        inArray: function (e, t, n) {
          return null == t ? -1 : u.call(t, e, n)
        },
        merge: function (e, t) {
          for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
          return e.length = i, e
        },
        grep: function (e, t, n) {
          for (var r = [], i = 0, o = e.length, s = !n; i < o; i++) !t(e[i], i) !== s && r.push(e[i]);
          return r
        },
        map: function (e, t, n) {
          var r, i, o = 0,
            a = [];
          if (y(e))
            for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i);
          else
            for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
          return s.apply([], a)
        },
        guid: 1,
        proxy: function (e, t) {
          var n, r, i;
          if ("string" == typeof t && (n = e[t], t = e, e = n), d.isFunction(e)) return r = o.call(arguments, 2), (i = function () {
            return e.apply(t || this, r.concat(o.call(arguments)))
          }).guid = e.guid = e.guid || d.guid++, i
        },
        now: Date.now,
        support: p
      }), "function" == typeof Symbol && (d.fn[Symbol.iterator] = r[Symbol.iterator]), d.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
        l["[object " + t + "]"] = t.toLowerCase()
      });
      var x = function (e) {
        var t, n, r, i, o, s, a, u, l, c, f, p, d, h, g, v, m, y, x, b = "sizzle" + 1 * new Date,
          w = e.document,
          T = 0,
          C = 0,
          k = oe(),
          E = oe(),
          N = oe(),
          S = function (e, t) {
            return e === t && (f = !0), 0
          },
          j = 1 << 31,
          D = {}.hasOwnProperty,
          A = [],
          q = A.pop,
          L = A.push,
          H = A.push,
          O = A.slice,
          F = function (e, t) {
            for (var n = 0, r = e.length; n < r; n++)
              if (e[n] === t) return n;
            return -1
          },
          P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
          R = "[\\x20\\t\\r\\n\\f]",
          M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
          I = "\\[" + R + "*(" + M + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + R + "*\\]",
          W = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|.*)\\)|)",
          $ = new RegExp(R + "+", "g"),
          B = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
          _ = new RegExp("^" + R + "*," + R + "*"),
          X = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
          z = new RegExp("=" + R + "*([^\\]'\"]*?)" + R + "*\\]", "g"),
          U = new RegExp(W),
          V = new RegExp("^" + M + "$"),
          Y = {
            ID: new RegExp("^#(" + M + ")"),
            CLASS: new RegExp("^\\.(" + M + ")"),
            TAG: new RegExp("^(" + M + "|[*])"),
            ATTR: new RegExp("^" + I),
            PSEUDO: new RegExp("^" + W),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + P + ")$", "i"),
            needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i")
          },
          G = /^(?:input|select|textarea|button)$/i,
          Q = /^h\d$/i,
          J = /^[^{]+\{\s*\[native \w/,
          K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
          Z = /[+~]/,
          ee = /'|\\/g,
          te = new RegExp("\\\\([\\da-f]{1,6}" + R + "?|(" + R + ")|.)", "ig"),
          ne = function (e, t, n) {
            var r = "0x" + t - 65536;
            return r != r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
          },
          re = function () {
            p()
          };
        try {
          H.apply(A = O.call(w.childNodes), w.childNodes), A[w.childNodes.length].nodeType
        } catch (we) {
          H = {
            apply: A.length ? function (e, t) {
              L.apply(e, O.call(t))
            } : function (e, t) {
              for (var n = e.length, r = 0; e[n++] = t[r++];);
              e.length = n - 1
            }
          }
        }

        function ie(e, t, r, i) {
          var o, a, l, c, f, h, m, y, T = t && t.ownerDocument,
            C = t ? t.nodeType : 9;
          if (r = r || [], "string" != typeof e || !e || 1 !== C && 9 !== C && 11 !== C) return r;
          if (!i && ((t ? t.ownerDocument || t : w) !== d && p(t), t = t || d, g)) {
            if (11 !== C && (h = K.exec(e)))
              if (o = h[1]) {
                if (9 === C) {
                  if (!(l = t.getElementById(o))) return r;
                  if (l.id === o) return r.push(l), r
                } else if (T && (l = T.getElementById(o)) && x(t, l) && l.id === o) return r.push(l), r
              } else {
                if (h[2]) return H.apply(r, t.getElementsByTagName(e)), r;
                if ((o = h[3]) && n.getElementsByClassName && t.getElementsByClassName) return H.apply(r, t.getElementsByClassName(o)), r
              } if (n.qsa && !N[e + " "] && (!v || !v.test(e))) {
              if (1 !== C) T = t, y = e;
              else if ("object" !== t.nodeName.toLowerCase()) {
                for ((c = t.getAttribute("id")) ? c = c.replace(ee, "\\$&") : t.setAttribute("id", c = b), a = (m = s(e)).length, f = V.test(c) ? "#" + c : "[id='" + c + "']"; a--;) m[a] = f + " " + ge(m[a]);
                y = m.join(","), T = Z.test(e) && de(t.parentNode) || t
              }
              if (y) try {
                return H.apply(r, T.querySelectorAll(y)), r
              } catch (k) {} finally {
                c === b && t.removeAttribute("id")
              }
            }
          }
          return u(e.replace(B, "$1"), t, r, i)
        }

        function oe() {
          var e = [];
          return function t(n, i) {
            return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
          }
        }

        function se(e) {
          return e[b] = !0, e
        }

        function ae(e) {
          var t = d.createElement("div");
          try {
            return !!e(t)
          } catch (we) {
            return !1
          } finally {
            t.parentNode && t.parentNode.removeChild(t), t = null
          }
        }

        function ue(e, t) {
          for (var n = e.split("|"), i = n.length; i--;) r.attrHandle[n[i]] = t
        }

        function le(e, t) {
          var n = t && e,
            r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || j) - (~e.sourceIndex || j);
          if (r) return r;
          if (n)
            for (; n = n.nextSibling;)
              if (n === t) return -1;
          return e ? 1 : -1
        }

        function ce(e) {
          return function (t) {
            return "input" === t.nodeName.toLowerCase() && t.type === e
          }
        }

        function fe(e) {
          return function (t) {
            var n = t.nodeName.toLowerCase();
            return ("input" === n || "button" === n) && t.type === e
          }
        }

        function pe(e) {
          return se(function (t) {
            return t = +t, se(function (n, r) {
              for (var i, o = e([], n.length, t), s = o.length; s--;) n[i = o[s]] && (n[i] = !(r[i] = n[i]))
            })
          })
        }

        function de(e) {
          return e && void 0 !== e.getElementsByTagName && e
        }
        for (t in n = ie.support = {}, o = ie.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
          }, p = ie.setDocument = function (e) {
            var t, i, s = e ? e.ownerDocument || e : w;
            return s !== d && 9 === s.nodeType && s.documentElement ? (h = (d = s).documentElement, g = !o(d), (i = d.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", re, !1) : i.attachEvent && i.attachEvent("onunload", re)), n.attributes = ae(function (e) {
              return e.className = "i", !e.getAttribute("className")
            }), n.getElementsByTagName = ae(function (e) {
              return e.appendChild(d.createComment("")), !e.getElementsByTagName("*").length
            }), n.getElementsByClassName = J.test(d.getElementsByClassName), n.getById = ae(function (e) {
              return h.appendChild(e).id = b, !d.getElementsByName || !d.getElementsByName(b).length
            }), n.getById ? (r.find.ID = function (e, t) {
              if (void 0 !== t.getElementById && g) {
                var n = t.getElementById(e);
                return n ? [n] : []
              }
            }, r.filter.ID = function (e) {
              var t = e.replace(te, ne);
              return function (e) {
                return e.getAttribute("id") === t
              }
            }) : (delete r.find.ID, r.filter.ID = function (e) {
              var t = e.replace(te, ne);
              return function (e) {
                var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                return n && n.value === t
              }
            }), r.find.TAG = n.getElementsByTagName ? function (e, t) {
              return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
            } : function (e, t) {
              var n, r = [],
                i = 0,
                o = t.getElementsByTagName(e);
              if ("*" === e) {
                for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                return r
              }
              return o
            }, r.find.CLASS = n.getElementsByClassName && function (e, t) {
              if (void 0 !== t.getElementsByClassName && g) return t.getElementsByClassName(e)
            }, m = [], v = [], (n.qsa = J.test(d.querySelectorAll)) && (ae(function (e) {
              h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + R + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + R + "*(?:value|" + P + ")"), e.querySelectorAll("[id~=" + b + "-]").length || v.push("~="), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || v.push(".#.+[+~]")
            }), ae(function (e) {
              var t = d.createElement("input");
              t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + R + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
            })), (n.matchesSelector = J.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ae(function (e) {
              n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), m.push("!=", W)
            }), v = v.length && new RegExp(v.join("|")), m = m.length && new RegExp(m.join("|")), t = J.test(h.compareDocumentPosition), x = t || J.test(h.contains) ? function (e, t) {
              var n = 9 === e.nodeType ? e.documentElement : e,
                r = t && t.parentNode;
              return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function (e, t) {
              if (t)
                for (; t = t.parentNode;)
                  if (t === e) return !0;
              return !1
            }, S = t ? function (e, t) {
              if (e === t) return f = !0, 0;
              var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
              return r || (1 & (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === d || e.ownerDocument === w && x(w, e) ? -1 : t === d || t.ownerDocument === w && x(w, t) ? 1 : c ? F(c, e) - F(c, t) : 0 : 4 & r ? -1 : 1)
            } : function (e, t) {
              if (e === t) return f = !0, 0;
              var n, r = 0,
                i = e.parentNode,
                o = t.parentNode,
                s = [e],
                a = [t];
              if (!i || !o) return e === d ? -1 : t === d ? 1 : i ? -1 : o ? 1 : c ? F(c, e) - F(c, t) : 0;
              if (i === o) return le(e, t);
              for (n = e; n = n.parentNode;) s.unshift(n);
              for (n = t; n = n.parentNode;) a.unshift(n);
              for (; s[r] === a[r];) r++;
              return r ? le(s[r], a[r]) : s[r] === w ? -1 : a[r] === w ? 1 : 0
            }, d) : d
          }, ie.matches = function (e, t) {
            return ie(e, null, null, t)
          }, ie.matchesSelector = function (e, t) {
            if ((e.ownerDocument || e) !== d && p(e), t = t.replace(z, "='$1']"), n.matchesSelector && g && !N[t + " "] && (!m || !m.test(t)) && (!v || !v.test(t))) try {
              var r = y.call(e, t);
              if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (we) {}
            return ie(t, d, null, [e]).length > 0
          }, ie.contains = function (e, t) {
            return (e.ownerDocument || e) !== d && p(e), x(e, t)
          }, ie.attr = function (e, t) {
            (e.ownerDocument || e) !== d && p(e);
            var i = r.attrHandle[t.toLowerCase()],
              o = i && D.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;
            return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
          }, ie.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
          }, ie.uniqueSort = function (e) {
            var t, r = [],
              i = 0,
              o = 0;
            if (f = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(S), f) {
              for (; t = e[o++];) t === e[o] && (i = r.push(o));
              for (; i--;) e.splice(r[i], 1)
            }
            return c = null, e
          }, i = ie.getText = function (e) {
            var t, n = "",
              r = 0,
              o = e.nodeType;
            if (o) {
              if (1 === o || 9 === o || 11 === o) {
                if ("string" == typeof e.textContent) return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
              } else if (3 === o || 4 === o) return e.nodeValue
            } else
              for (; t = e[r++];) n += i(t);
            return n
          }, (r = ie.selectors = {
            cacheLength: 50,
            createPseudo: se,
            match: Y,
            attrHandle: {},
            find: {},
            relative: {
              ">": {
                dir: "parentNode",
                first: !0
              },
              " ": {
                dir: "parentNode"
              },
              "+": {
                dir: "previousSibling",
                first: !0
              },
              "~": {
                dir: "previousSibling"
              }
            },
            preFilter: {
              ATTR: function (e) {
                return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
              },
              CHILD: function (e) {
                return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ie.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ie.error(e[0]), e
              },
              PSEUDO: function (e) {
                var t, n = !e[6] && e[2];
                return Y.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && U.test(n) && (t = s(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
              }
            },
            filter: {
              TAG: function (e) {
                var t = e.replace(te, ne).toLowerCase();
                return "*" === e ? function () {
                  return !0
                } : function (e) {
                  return e.nodeName && e.nodeName.toLowerCase() === t
                }
              },
              CLASS: function (e) {
                var t = k[e + " "];
                return t || (t = new RegExp("(^|" + R + ")" + e + "(" + R + "|$)")) && k(e, function (e) {
                  return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                })
              },
              ATTR: function (e, t, n) {
                return function (r) {
                  var i = ie.attr(r, e);
                  return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace($, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"))
                }
              },
              CHILD: function (e, t, n, r, i) {
                var o = "nth" !== e.slice(0, 3),
                  s = "last" !== e.slice(-4),
                  a = "of-type" === t;
                return 1 === r && 0 === i ? function (e) {
                  return !!e.parentNode
                } : function (t, n, u) {
                  var l, c, f, p, d, h, g = o !== s ? "nextSibling" : "previousSibling",
                    v = t.parentNode,
                    m = a && t.nodeName.toLowerCase(),
                    y = !u && !a,
                    x = !1;
                  if (v) {
                    if (o) {
                      for (; g;) {
                        for (p = t; p = p[g];)
                          if (a ? p.nodeName.toLowerCase() === m : 1 === p.nodeType) return !1;
                        h = g = "only" === e && !h && "nextSibling"
                      }
                      return !0
                    }
                    if (h = [s ? v.firstChild : v.lastChild], s && y) {
                      for (x = (d = (l = (c = (f = (p = v)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]) && l[2], p = d && v.childNodes[d]; p = ++d && p && p[g] || (x = d = 0) || h.pop();)
                        if (1 === p.nodeType && ++x && p === t) {
                          c[e] = [T, d, x];
                          break
                        }
                    } else if (y && (x = d = (l = (c = (f = (p = t)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]), !1 === x)
                      for (;
                        (p = ++d && p && p[g] || (x = d = 0) || h.pop()) && ((a ? p.nodeName.toLowerCase() !== m : 1 !== p.nodeType) || !++x || (y && ((c = (f = p[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] = [T, x]), p !== t)););
                    return (x -= i) === r || x % r == 0 && x / r >= 0
                  }
                }
              },
              PSEUDO: function (e, t) {
                var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || ie.error("unsupported pseudo: " + e);
                return i[b] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? se(function (e, n) {
                  for (var r, o = i(e, t), s = o.length; s--;) e[r = F(e, o[s])] = !(n[r] = o[s])
                }) : function (e) {
                  return i(e, 0, n)
                }) : i
              }
            },
            pseudos: {
              not: se(function (e) {
                var t = [],
                  n = [],
                  r = a(e.replace(B, "$1"));
                return r[b] ? se(function (e, t, n, i) {
                  for (var o, s = r(e, null, i, []), a = e.length; a--;)(o = s[a]) && (e[a] = !(t[a] = o))
                }) : function (e, i, o) {
                  return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                }
              }),
              has: se(function (e) {
                return function (t) {
                  return ie(e, t).length > 0
                }
              }),
              contains: se(function (e) {
                return e = e.replace(te, ne),
                  function (t) {
                    return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                  }
              }),
              lang: se(function (e) {
                return V.test(e || "") || ie.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(),
                  function (t) {
                    var n;
                    do {
                      if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                    } while ((t = t.parentNode) && 1 === t.nodeType);
                    return !1
                  }
              }),
              target: function (t) {
                var n = e.location && e.location.hash;
                return n && n.slice(1) === t.id
              },
              root: function (e) {
                return e === h
              },
              focus: function (e) {
                return e === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
              },
              enabled: function (e) {
                return !1 === e.disabled
              },
              disabled: function (e) {
                return !0 === e.disabled
              },
              checked: function (e) {
                var t = e.nodeName.toLowerCase();
                return "input" === t && !!e.checked || "option" === t && !!e.selected
              },
              selected: function (e) {
                return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
              },
              empty: function (e) {
                for (e = e.firstChild; e; e = e.nextSibling)
                  if (e.nodeType < 6) return !1;
                return !0
              },
              parent: function (e) {
                return !r.pseudos.empty(e)
              },
              header: function (e) {
                return Q.test(e.nodeName)
              },
              input: function (e) {
                return G.test(e.nodeName)
              },
              button: function (e) {
                var t = e.nodeName.toLowerCase();
                return "input" === t && "button" === e.type || "button" === t
              },
              text: function (e) {
                var t;
                return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
              },
              first: pe(function () {
                return [0]
              }),
              last: pe(function (e, t) {
                return [t - 1]
              }),
              eq: pe(function (e, t, n) {
                return [n < 0 ? n + t : n]
              }),
              even: pe(function (e, t) {
                for (var n = 0; n < t; n += 2) e.push(n);
                return e
              }),
              odd: pe(function (e, t) {
                for (var n = 1; n < t; n += 2) e.push(n);
                return e
              }),
              lt: pe(function (e, t, n) {
                for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                return e
              }),
              gt: pe(function (e, t, n) {
                for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                return e
              })
            }
          }).pseudos.nth = r.pseudos.eq, {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
          }) r.pseudos[t] = ce(t);
        for (t in {
            submit: !0,
            reset: !0
          }) r.pseudos[t] = fe(t);

        function he() {}

        function ge(e) {
          for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
          return r
        }

        function ve(e, t, n) {
          var r = t.dir,
            i = n && "parentNode" === r,
            o = C++;
          return t.first ? function (t, n, o) {
            for (; t = t[r];)
              if (1 === t.nodeType || i) return e(t, n, o)
          } : function (t, n, s) {
            var a, u, l, c = [T, o];
            if (s) {
              for (; t = t[r];)
                if ((1 === t.nodeType || i) && e(t, n, s)) return !0
            } else
              for (; t = t[r];)
                if (1 === t.nodeType || i) {
                  if ((a = (u = (l = t[b] || (t[b] = {}))[t.uniqueID] || (l[t.uniqueID] = {}))[r]) && a[0] === T && a[1] === o) return c[2] = a[2];
                  if (u[r] = c, c[2] = e(t, n, s)) return !0
                }
          }
        }

        function me(e) {
          return e.length > 1 ? function (t, n, r) {
            for (var i = e.length; i--;)
              if (!e[i](t, n, r)) return !1;
            return !0
          } : e[0]
        }

        function ye(e, t, n, r, i) {
          for (var o, s = [], a = 0, u = e.length, l = null != t; a < u; a++)(o = e[a]) && (n && !n(o, r, i) || (s.push(o), l && t.push(a)));
          return s
        }

        function xe(e, t, n, r, i, o) {
          return r && !r[b] && (r = xe(r)), i && !i[b] && (i = xe(i, o)), se(function (o, s, a, u) {
            var l, c, f, p = [],
              d = [],
              h = s.length,
              g = o || function (e, t, n) {
                for (var r = 0, i = t.length; r < i; r++) ie(e, t[r], n);
                return n
              }(t || "*", a.nodeType ? [a] : a, []),
              v = !e || !o && t ? g : ye(g, p, e, a, u),
              m = n ? i || (o ? e : h || r) ? [] : s : v;
            if (n && n(v, m, a, u), r)
              for (l = ye(m, d), r(l, [], a, u), c = l.length; c--;)(f = l[c]) && (m[d[c]] = !(v[d[c]] = f));
            if (o) {
              if (i || e) {
                if (i) {
                  for (l = [], c = m.length; c--;)(f = m[c]) && l.push(v[c] = f);
                  i(null, m = [], l, u)
                }
                for (c = m.length; c--;)(f = m[c]) && (l = i ? F(o, f) : p[c]) > -1 && (o[l] = !(s[l] = f))
              }
            } else m = ye(m === s ? m.splice(h, m.length) : m), i ? i(null, s, m, u) : H.apply(s, m)
          })
        }

        function be(e) {
          for (var t, n, i, o = e.length, s = r.relative[e[0].type], a = s || r.relative[" "], u = s ? 1 : 0, c = ve(function (e) {
              return e === t
            }, a, !0), f = ve(function (e) {
              return F(t, e) > -1
            }, a, !0), p = [function (e, n, r) {
              var i = !s && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r));
              return t = null, i
            }]; u < o; u++)
            if (n = r.relative[e[u].type]) p = [ve(me(p), n)];
            else {
              if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
                for (i = ++u; i < o && !r.relative[e[i].type]; i++);
                return xe(u > 1 && me(p), u > 1 && ge(e.slice(0, u - 1).concat({
                  value: " " === e[u - 2].type ? "*" : ""
                })).replace(B, "$1"), n, u < i && be(e.slice(u, i)), i < o && be(e = e.slice(i)), i < o && ge(e))
              }
              p.push(n)
            } return me(p)
        }
        return he.prototype = r.filters = r.pseudos, r.setFilters = new he, s = ie.tokenize = function (e, t) {
          var n, i, o, s, a, u, l, c = E[e + " "];
          if (c) return t ? 0 : c.slice(0);
          for (a = e, u = [], l = r.preFilter; a;) {
            for (s in n && !(i = _.exec(a)) || (i && (a = a.slice(i[0].length) || a), u.push(o = [])), n = !1, (i = X.exec(a)) && (n = i.shift(), o.push({
                value: n,
                type: i[0].replace(B, " ")
              }), a = a.slice(n.length)), r.filter) !(i = Y[s].exec(a)) || l[s] && !(i = l[s](i)) || (n = i.shift(), o.push({
              value: n,
              type: s,
              matches: i
            }), a = a.slice(n.length));
            if (!n) break
          }
          return t ? a.length : a ? ie.error(e) : E(e, u).slice(0)
        }, a = ie.compile = function (e, t) {
          var n, i = [],
            o = [],
            a = N[e + " "];
          if (!a) {
            for (t || (t = s(e)), n = t.length; n--;)(a = be(t[n]))[b] ? i.push(a) : o.push(a);
            (a = N(e, function (e, t) {
              var n = t.length > 0,
                i = e.length > 0,
                o = function (o, s, a, u, c) {
                  var f, h, v, m = 0,
                    y = "0",
                    x = o && [],
                    b = [],
                    w = l,
                    C = o || i && r.find.TAG("*", c),
                    k = T += null == w ? 1 : Math.random() || .1,
                    E = C.length;
                  for (c && (l = s === d || s || c); y !== E && null != (f = C[y]); y++) {
                    if (i && f) {
                      for (h = 0, s || f.ownerDocument === d || (p(f), a = !g); v = e[h++];)
                        if (v(f, s || d, a)) {
                          u.push(f);
                          break
                        } c && (T = k)
                    }
                    n && ((f = !v && f) && m--, o && x.push(f))
                  }
                  if (m += y, n && y !== m) {
                    for (h = 0; v = t[h++];) v(x, b, s, a);
                    if (o) {
                      if (m > 0)
                        for (; y--;) x[y] || b[y] || (b[y] = q.call(u));
                      b = ye(b)
                    }
                    H.apply(u, b), c && !o && b.length > 0 && m + t.length > 1 && ie.uniqueSort(u)
                  }
                  return c && (T = k, l = w), x
                };
              return n ? se(o) : o
            }(o, i))).selector = e
          }
          return a
        }, u = ie.select = function (e, t, i, o) {
          var u, l, c, f, p, d = "function" == typeof e && e,
            h = !o && s(e = d.selector || e);
          if (i = i || [], 1 === h.length) {
            if ((l = h[0] = h[0].slice(0)).length > 2 && "ID" === (c = l[0]).type && n.getById && 9 === t.nodeType && g && r.relative[l[1].type]) {
              if (!(t = (r.find.ID(c.matches[0].replace(te, ne), t) || [])[0])) return i;
              d && (t = t.parentNode), e = e.slice(l.shift().value.length)
            }
            for (u = Y.needsContext.test(e) ? 0 : l.length; u-- && (c = l[u], !r.relative[f = c.type]);)
              if ((p = r.find[f]) && (o = p(c.matches[0].replace(te, ne), Z.test(l[0].type) && de(t.parentNode) || t))) {
                if (l.splice(u, 1), !(e = o.length && ge(l))) return H.apply(i, o), i;
                break
              }
          }
          return (d || a(e, h))(o, t, !g, i, !t || Z.test(e) && de(t.parentNode) || t), i
        }, n.sortStable = b.split("").sort(S).join("") === b, n.detectDuplicates = !!f, p(), n.sortDetached = ae(function (e) {
          return 1 & e.compareDocumentPosition(d.createElement("div"))
        }), ae(function (e) {
          return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || ue("type|href|height|width", function (e, t, n) {
          if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), n.attributes && ae(function (e) {
          return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || ue("value", function (e, t, n) {
          if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), ae(function (e) {
          return null == e.getAttribute("disabled")
        }) || ue(P, function (e, t, n) {
          var r;
          if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), ie
      }(t);
      d.find = x, d.expr = x.selectors, d.expr[":"] = d.expr.pseudos, d.uniqueSort = d.unique = x.uniqueSort, d.text = x.getText, d.isXMLDoc = x.isXML, d.contains = x.contains;
      var b = function (e, t, n) {
          for (var r = [], i = void 0 !== n;
            (e = e[t]) && 9 !== e.nodeType;)
            if (1 === e.nodeType) {
              if (i && d(e).is(n)) break;
              r.push(e)
            } return r
        },
        w = function (e, t) {
          for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
          return n
        },
        T = d.expr.match.needsContext,
        C = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        k = /^.[^:#\[\.,]*$/;

      function E(e, t, n) {
        if (d.isFunction(t)) return d.grep(e, function (e, r) {
          return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return d.grep(e, function (e) {
          return e === t !== n
        });
        if ("string" == typeof t) {
          if (k.test(t)) return d.filter(t, e, n);
          t = d.filter(t, e)
        }
        return d.grep(e, function (e) {
          return u.call(t, e) > -1 !== n
        })
      }
      d.filter = function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? d.find.matchesSelector(r, e) ? [r] : [] : d.find.matches(e, d.grep(t, function (e) {
          return 1 === e.nodeType
        }))
      }, d.fn.extend({
        find: function (e) {
          var t, n = this.length,
            r = [],
            i = this;
          if ("string" != typeof e) return this.pushStack(d(e).filter(function () {
            for (t = 0; t < n; t++)
              if (d.contains(i[t], this)) return !0
          }));
          for (t = 0; t < n; t++) d.find(e, i[t], r);
          return (r = this.pushStack(n > 1 ? d.unique(r) : r)).selector = this.selector ? this.selector + " " + e : e, r
        },
        filter: function (e) {
          return this.pushStack(E(this, e || [], !1))
        },
        not: function (e) {
          return this.pushStack(E(this, e || [], !0))
        },
        is: function (e) {
          return !!E(this, "string" == typeof e && T.test(e) ? d(e) : e || [], !1).length
        }
      });
      var N, S = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
      (d.fn.init = function (e, t, n) {
        var r, o;
        if (!e) return this;
        if (n = n || N, "string" == typeof e) {
          if (!(r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : S.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
          if (r[1]) {
            if (t = t instanceof d ? t[0] : t, d.merge(this, d.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : i, !0)), C.test(r[1]) && d.isPlainObject(t))
              for (r in t) d.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
            return this
          }
          return (o = i.getElementById(r[2])) && o.parentNode && (this.length = 1, this[0] = o), this.context = i, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : d.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(d) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), d.makeArray(e, this))
      }).prototype = d.fn, N = d(i);
      var j = /^(?:parents|prev(?:Until|All))/,
        D = {
          children: !0,
          contents: !0,
          next: !0,
          prev: !0
        };

      function A(e, t) {
        for (;
          (e = e[t]) && 1 !== e.nodeType;);
        return e
      }
      d.fn.extend({
        has: function (e) {
          var t = d(e, this),
            n = t.length;
          return this.filter(function () {
            for (var e = 0; e < n; e++)
              if (d.contains(this, t[e])) return !0
          })
        },
        closest: function (e, t) {
          for (var n, r = 0, i = this.length, o = [], s = T.test(e) || "string" != typeof e ? d(e, t || this.context) : 0; r < i; r++)
            for (n = this[r]; n && n !== t; n = n.parentNode)
              if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && d.find.matchesSelector(n, e))) {
                o.push(n);
                break
              } return this.pushStack(o.length > 1 ? d.uniqueSort(o) : o)
        },
        index: function (e) {
          return e ? "string" == typeof e ? u.call(d(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (e, t) {
          return this.pushStack(d.uniqueSort(d.merge(this.get(), d(e, t))))
        },
        addBack: function (e) {
          return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
      }), d.each({
        parent: function (e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null
        },
        parents: function (e) {
          return b(e, "parentNode")
        },
        parentsUntil: function (e, t, n) {
          return b(e, "parentNode", n)
        },
        next: function (e) {
          return A(e, "nextSibling")
        },
        prev: function (e) {
          return A(e, "previousSibling")
        },
        nextAll: function (e) {
          return b(e, "nextSibling")
        },
        prevAll: function (e) {
          return b(e, "previousSibling")
        },
        nextUntil: function (e, t, n) {
          return b(e, "nextSibling", n)
        },
        prevUntil: function (e, t, n) {
          return b(e, "previousSibling", n)
        },
        siblings: function (e) {
          return w((e.parentNode || {}).firstChild, e)
        },
        children: function (e) {
          return w(e.firstChild)
        },
        contents: function (e) {
          return e.contentDocument || d.merge([], e.childNodes)
        }
      }, function (e, t) {
        d.fn[e] = function (n, r) {
          var i = d.map(this, t, n);
          return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = d.filter(r, i)), this.length > 1 && (D[e] || d.uniqueSort(i), j.test(e) && i.reverse()), this.pushStack(i)
        }
      });
      var q, L = /\S+/g;

      function H() {
        i.removeEventListener("DOMContentLoaded", H), t.removeEventListener("load", H), d.ready()
      }
      d.Callbacks = function (e) {
        e = "string" == typeof e ? function (e) {
          var t = {};
          return d.each(e.match(L) || [], function (e, n) {
            t[n] = !0
          }), t
        }(e) : d.extend({}, e);
        var t, n, r, i, o = [],
          s = [],
          a = -1,
          u = function () {
            for (i = e.once, r = t = !0; s.length; a = -1)
              for (n = s.shift(); ++a < o.length;) !1 === o[a].apply(n[0], n[1]) && e.stopOnFalse && (a = o.length, n = !1);
            e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
          },
          l = {
            add: function () {
              return o && (n && !t && (a = o.length - 1, s.push(n)), function t(n) {
                d.each(n, function (n, r) {
                  d.isFunction(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== d.type(r) && t(r)
                })
              }(arguments), n && !t && u()), this
            },
            remove: function () {
              return d.each(arguments, function (e, t) {
                for (var n;
                  (n = d.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= a && a--
              }), this
            },
            has: function (e) {
              return e ? d.inArray(e, o) > -1 : o.length > 0
            },
            empty: function () {
              return o && (o = []), this
            },
            disable: function () {
              return i = s = [], o = n = "", this
            },
            disabled: function () {
              return !o
            },
            lock: function () {
              return i = s = [], n || (o = n = ""), this
            },
            locked: function () {
              return !!i
            },
            fireWith: function (e, n) {
              return i || (n = [e, (n = n || []).slice ? n.slice() : n], s.push(n), t || u()), this
            },
            fire: function () {
              return l.fireWith(this, arguments), this
            },
            fired: function () {
              return !!r
            }
          };
        return l
      }, d.extend({
        Deferred: function (e) {
          var t = [
              ["resolve", "done", d.Callbacks("once memory"), "resolved"],
              ["reject", "fail", d.Callbacks("once memory"), "rejected"],
              ["notify", "progress", d.Callbacks("memory")]
            ],
            n = "pending",
            r = {
              state: function () {
                return n
              },
              always: function () {
                return i.done(arguments).fail(arguments), this
              },
              then: function () {
                var e = arguments;
                return d.Deferred(function (n) {
                  d.each(t, function (t, o) {
                    var s = d.isFunction(e[t]) && e[t];
                    i[o[1]](function () {
                      var e = s && s.apply(this, arguments);
                      e && d.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
                    })
                  }), e = null
                }).promise()
              },
              promise: function (e) {
                return null != e ? d.extend(e, r) : r
              }
            },
            i = {};
          return r.pipe = r.then, d.each(t, function (e, o) {
            var s = o[2],
              a = o[3];
            r[o[1]] = s.add, a && s.add(function () {
              n = a
            }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
              return i[o[0] + "With"](this === i ? r : this, arguments), this
            }, i[o[0] + "With"] = s.fireWith
          }), r.promise(i), e && e.call(i, i), i
        },
        when: function (e) {
          var t, n, r, i = 0,
            s = o.call(arguments),
            a = s.length,
            u = 1 !== a || e && d.isFunction(e.promise) ? a : 0,
            l = 1 === u ? e : d.Deferred(),
            c = function (e, n, r) {
              return function (i) {
                n[e] = this, r[e] = arguments.length > 1 ? o.call(arguments) : i, r === t ? l.notifyWith(n, r) : --u || l.resolveWith(n, r)
              }
            };
          if (a > 1)
            for (t = new Array(a), n = new Array(a), r = new Array(a); i < a; i++) s[i] && d.isFunction(s[i].promise) ? s[i].promise().progress(c(i, n, t)).done(c(i, r, s)).fail(l.reject) : --u;
          return u || l.resolveWith(r, s), l.promise()
        }
      }), d.fn.ready = function (e) {
        return d.ready.promise().done(e), this
      }, d.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function (e) {
          e ? d.readyWait++ : d.ready(!0)
        },
        ready: function (e) {
          (!0 === e ? --d.readyWait : d.isReady) || (d.isReady = !0, !0 !== e && --d.readyWait > 0 || (q.resolveWith(i, [d]), d.fn.triggerHandler && (d(i).triggerHandler("ready"), d(i).off("ready"))))
        }
      }), d.ready.promise = function (e) {
        return q || (q = d.Deferred(), "complete" === i.readyState || "loading" !== i.readyState && !i.documentElement.doScroll ? t.setTimeout(d.ready) : (i.addEventListener("DOMContentLoaded", H), t.addEventListener("load", H))), q.promise(e)
      }, d.ready.promise();
      var O = function (e, t, n, r, i, o, s) {
          var a = 0,
            u = e.length,
            l = null == n;
          if ("object" === d.type(n))
            for (a in i = !0, n) O(e, t, a, n[a], !0, o, s);
          else if (void 0 !== r && (i = !0, d.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
              return l.call(d(e), n)
            })), t))
            for (; a < u; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
          return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        F = function (e) {
          return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };

      function P() {
        this.expando = d.expando + P.uid++
      }
      P.uid = 1, P.prototype = {
        register: function (e, t) {
          var n = t || {};
          return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
            value: n,
            writable: !0,
            configurable: !0
          }), e[this.expando]
        },
        cache: function (e) {
          if (!F(e)) return {};
          var t = e[this.expando];
          return t || (t = {}, F(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
            value: t,
            configurable: !0
          }))), t
        },
        set: function (e, t, n) {
          var r, i = this.cache(e);
          if ("string" == typeof t) i[t] = n;
          else
            for (r in t) i[r] = t[r];
          return i
        },
        get: function (e, t) {
          return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
        },
        access: function (e, t, n) {
          var r;
          return void 0 === t || t && "string" == typeof t && void 0 === n ? void 0 !== (r = this.get(e, t)) ? r : this.get(e, d.camelCase(t)) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function (e, t) {
          var n, r, i, o = e[this.expando];
          if (void 0 !== o) {
            if (void 0 === t) this.register(e);
            else {
              d.isArray(t) ? r = t.concat(t.map(d.camelCase)) : (i = d.camelCase(t), r = t in o ? [t, i] : (r = i) in o ? [r] : r.match(L) || []), n = r.length;
              for (; n--;) delete o[r[n]]
            }(void 0 === t || d.isEmptyObject(o)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
          }
        },
        hasData: function (e) {
          var t = e[this.expando];
          return void 0 !== t && !d.isEmptyObject(t)
        }
      };
      var R = new P,
        M = new P,
        I = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        W = /[A-Z]/g;

      function $(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
          if (r = "data-" + t.replace(W, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
            try {
              n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : I.test(n) ? d.parseJSON(n) : n)
            } catch (i) {}
            M.set(e, t, n)
          } else n = void 0;
        return n
      }
      d.extend({
        hasData: function (e) {
          return M.hasData(e) || R.hasData(e)
        },
        data: function (e, t, n) {
          return M.access(e, t, n)
        },
        removeData: function (e, t) {
          M.remove(e, t)
        },
        _data: function (e, t, n) {
          return R.access(e, t, n)
        },
        _removeData: function (e, t) {
          R.remove(e, t)
        }
      }), d.fn.extend({
        data: function (e, t) {
          var n, r, i, o = this[0],
            s = o && o.attributes;
          if (void 0 === e) {
            if (this.length && (i = M.get(o), 1 === o.nodeType && !R.get(o, "hasDataAttrs"))) {
              for (n = s.length; n--;) s[n] && 0 === (r = s[n].name).indexOf("data-") && (r = d.camelCase(r.slice(5)), $(o, r, i[r]));
              R.set(o, "hasDataAttrs", !0)
            }
            return i
          }
          return "object" == typeof e ? this.each(function () {
            M.set(this, e)
          }) : O(this, function (t) {
            var n, r;
            if (o && void 0 === t) return void 0 !== (n = M.get(o, e) || M.get(o, e.replace(W, "-$&").toLowerCase())) ? n : (r = d.camelCase(e), void 0 !== (n = M.get(o, r)) ? n : void 0 !== (n = $(o, r, void 0)) ? n : void 0);
            r = d.camelCase(e), this.each(function () {
              var n = M.get(this, r);
              M.set(this, r, t), e.indexOf("-") > -1 && void 0 !== n && M.set(this, e, t)
            })
          }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function (e) {
          return this.each(function () {
            M.remove(this, e)
          })
        }
      }), d.extend({
        queue: function (e, t, n) {
          var r;
          if (e) return t = (t || "fx") + "queue", r = R.get(e, t), n && (!r || d.isArray(n) ? r = R.access(e, t, d.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function (e, t) {
          t = t || "fx";
          var n = d.queue(e, t),
            r = n.length,
            i = n.shift(),
            o = d._queueHooks(e, t);
          "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () {
            d.dequeue(e, t)
          }, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function (e, t) {
          var n = t + "queueHooks";
          return R.get(e, n) || R.access(e, n, {
            empty: d.Callbacks("once memory").add(function () {
              R.remove(e, [t + "queue", n])
            })
          })
        }
      }), d.fn.extend({
        queue: function (e, t) {
          var n = 2;
          return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? d.queue(this[0], e) : void 0 === t ? this : this.each(function () {
            var n = d.queue(this, e, t);
            d._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && d.dequeue(this, e)
          })
        },
        dequeue: function (e) {
          return this.each(function () {
            d.dequeue(this, e)
          })
        },
        clearQueue: function (e) {
          return this.queue(e || "fx", [])
        },
        promise: function (e, t) {
          var n, r = 1,
            i = d.Deferred(),
            o = this,
            s = this.length,
            a = function () {
              --r || i.resolveWith(o, [o])
            };
          for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(n = R.get(o[s], e + "queueHooks")) && n.empty && (r++, n.empty.add(a));
          return a(), i.promise(t)
        }
      });
      var B = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        _ = new RegExp("^(?:([+-])=|)(" + B + ")([a-z%]*)$", "i"),
        X = ["Top", "Right", "Bottom", "Left"],
        z = function (e, t) {
          return e = t || e, "none" === d.css(e, "display") || !d.contains(e.ownerDocument, e)
        };

      function U(e, t, n, r) {
        var i, o = 1,
          s = 20,
          a = r ? function () {
            return r.cur()
          } : function () {
            return d.css(e, t, "")
          },
          u = a(),
          l = n && n[3] || (d.cssNumber[t] ? "" : "px"),
          c = (d.cssNumber[t] || "px" !== l && +u) && _.exec(d.css(e, t));
        if (c && c[3] !== l) {
          l = l || c[3], n = n || [], c = +u || 1;
          do {
            c /= o = o || ".5", d.style(e, t, c + l)
          } while (o !== (o = a() / u) && 1 !== o && --s)
        }
        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
      }
      var V = /^(?:checkbox|radio)$/i,
        Y = /<([\w:-]+)/,
        G = /^$|\/(?:java|ecma)script/i,
        Q = {
          option: [1, "<select multiple='multiple'>", "</select>"],
          thead: [1, "<table>", "</table>"],
          col: [2, "<table><colgroup>", "</colgroup></table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default: [0, "", ""]
        };

      function J(e, t) {
        var n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && d.nodeName(e, t) ? d.merge([e], n) : n
      }

      function K(e, t) {
        for (var n = 0, r = e.length; n < r; n++) R.set(e[n], "globalEval", !t || R.get(t[n], "globalEval"))
      }
      Q.optgroup = Q.option, Q.tbody = Q.tfoot = Q.colgroup = Q.caption = Q.thead, Q.th = Q.td;
      var Z, ee, te = /<|&#?\w+;/;

      function ne(e, t, n, r, i) {
        for (var o, s, a, u, l, c, f = t.createDocumentFragment(), p = [], h = 0, g = e.length; h < g; h++)
          if ((o = e[h]) || 0 === o)
            if ("object" === d.type(o)) d.merge(p, o.nodeType ? [o] : o);
            else if (te.test(o)) {
          for (s = s || f.appendChild(t.createElement("div")), a = (Y.exec(o) || ["", ""])[1].toLowerCase(), u = Q[a] || Q._default, s.innerHTML = u[1] + d.htmlPrefilter(o) + u[2], c = u[0]; c--;) s = s.lastChild;
          d.merge(p, s.childNodes), (s = f.firstChild).textContent = ""
        } else p.push(t.createTextNode(o));
        for (f.textContent = "", h = 0; o = p[h++];)
          if (r && d.inArray(o, r) > -1) i && i.push(o);
          else if (l = d.contains(o.ownerDocument, o), s = J(f.appendChild(o), "script"), l && K(s), n)
          for (c = 0; o = s[c++];) G.test(o.type || "") && n.push(o);
        return f
      }
      Z = i.createDocumentFragment().appendChild(i.createElement("div")), (ee = i.createElement("input")).setAttribute("type", "radio"), ee.setAttribute("checked", "checked"), ee.setAttribute("name", "t"), Z.appendChild(ee), p.checkClone = Z.cloneNode(!0).cloneNode(!0).lastChild.checked, Z.innerHTML = "<textarea>x</textarea>", p.noCloneChecked = !!Z.cloneNode(!0).lastChild.defaultValue;
      var re = /^key/,
        ie = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        oe = /^([^.]*)(?:\.(.+)|)/;

      function se() {
        return !0
      }

      function ae() {
        return !1
      }

      function ue() {
        try {
          return i.activeElement
        } catch (e) {}
      }

      function le(e, t, n, r, i, o) {
        var s, a;
        if ("object" == typeof t) {
          for (a in "string" != typeof n && (r = r || n, n = void 0), t) le(e, a, n, r, t[a], o);
          return e
        }
        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = ae;
        else if (!i) return e;
        return 1 === o && (s = i, (i = function (e) {
          return d().off(e), s.apply(this, arguments)
        }).guid = s.guid || (s.guid = d.guid++)), e.each(function () {
          d.event.add(this, t, i, r, n)
        })
      }
      d.event = {
        global: {},
        add: function (e, t, n, r, i) {
          var o, s, a, u, l, c, f, p, h, g, v, m = R.get(e);
          if (m)
            for (n.handler && (n = (o = n).handler, i = o.selector), n.guid || (n.guid = d.guid++), (u = m.events) || (u = m.events = {}), (s = m.handle) || (s = m.handle = function (t) {
                return void 0 !== d && d.event.triggered !== t.type ? d.event.dispatch.apply(e, arguments) : void 0
              }), l = (t = (t || "").match(L) || [""]).length; l--;) h = v = (a = oe.exec(t[l]) || [])[1], g = (a[2] || "").split(".").sort(), h && (f = d.event.special[h] || {}, h = (i ? f.delegateType : f.bindType) || h, f = d.event.special[h] || {}, c = d.extend({
              type: h,
              origType: v,
              data: r,
              handler: n,
              guid: n.guid,
              selector: i,
              needsContext: i && d.expr.match.needsContext.test(i),
              namespace: g.join(".")
            }, o), (p = u[h]) || ((p = u[h] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, g, s) || e.addEventListener && e.addEventListener(h, s)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), d.event.global[h] = !0)
        },
        remove: function (e, t, n, r, i) {
          var o, s, a, u, l, c, f, p, h, g, v, m = R.hasData(e) && R.get(e);
          if (m && (u = m.events)) {
            for (l = (t = (t || "").match(L) || [""]).length; l--;)
              if (h = v = (a = oe.exec(t[l]) || [])[1], g = (a[2] || "").split(".").sort(), h) {
                for (f = d.event.special[h] || {}, p = u[h = (r ? f.delegateType : f.bindType) || h] || [], a = a[2] && new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = p.length; o--;) c = p[o], !i && v !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                s && !p.length && (f.teardown && !1 !== f.teardown.call(e, g, m.handle) || d.removeEvent(e, h, m.handle), delete u[h])
              } else
                for (h in u) d.event.remove(e, h + t[l], n, r, !0);
            d.isEmptyObject(u) && R.remove(e, "handle events")
          }
        },
        dispatch: function (e) {
          e = d.event.fix(e);
          var t, n, r, i, s, a, u = o.call(arguments),
            l = (R.get(this, "events") || {})[e.type] || [],
            c = d.event.special[e.type] || {};
          if (u[0] = e, e.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, e)) {
            for (a = d.event.handlers.call(this, e, l), t = 0;
              (i = a[t++]) && !e.isPropagationStopped();)
              for (e.currentTarget = i.elem, n = 0;
                (s = i.handlers[n++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(s.namespace) || (e.handleObj = s, e.data = s.data, void 0 !== (r = ((d.event.special[s.origType] || {}).handle || s.handler).apply(i.elem, u)) && !1 === (e.result = r) && (e.preventDefault(), e.stopPropagation()));
            return c.postDispatch && c.postDispatch.call(this, e), e.result
          }
        },
        handlers: function (e, t) {
          var n, r, i, o, s = [],
            a = t.delegateCount,
            u = e.target;
          if (a && u.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
            for (; u !== this; u = u.parentNode || this)
              if (1 === u.nodeType && (!0 !== u.disabled || "click" !== e.type)) {
                for (r = [], n = 0; n < a; n++) void 0 === r[i = (o = t[n]).selector + " "] && (r[i] = o.needsContext ? d(i, this).index(u) > -1 : d.find(i, this, null, [u]).length), r[i] && r.push(o);
                r.length && s.push({
                  elem: u,
                  handlers: r
                })
              } return a < t.length && s.push({
            elem: this,
            handlers: t.slice(a)
          }), s
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
          props: "char charCode key keyCode".split(" "),
          filter: function (e, t) {
            return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
          }
        },
        mouseHooks: {
          props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
          filter: function (e, t) {
            var n, r, o, s = t.button;
            return null == e.pageX && null != t.clientX && (r = (n = e.target.ownerDocument || i).documentElement, o = n.body, e.pageX = t.clientX + (r && r.scrollLeft || o && o.scrollLeft || 0) - (r && r.clientLeft || o && o.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || o && o.scrollTop || 0) - (r && r.clientTop || o && o.clientTop || 0)), e.which || void 0 === s || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
          }
        },
        fix: function (e) {
          if (e[d.expando]) return e;
          var t, n, r, o = e.type,
            s = e,
            a = this.fixHooks[o];
          for (a || (this.fixHooks[o] = a = ie.test(o) ? this.mouseHooks : re.test(o) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new d.Event(s), t = r.length; t--;) e[n = r[t]] = s[n];
          return e.target || (e.target = i), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, s) : e
        },
        special: {
          load: {
            noBubble: !0
          },
          focus: {
            trigger: function () {
              if (this !== ue() && this.focus) return this.focus(), !1
            },
            delegateType: "focusin"
          },
          blur: {
            trigger: function () {
              if (this === ue() && this.blur) return this.blur(), !1
            },
            delegateType: "focusout"
          },
          click: {
            trigger: function () {
              if ("checkbox" === this.type && this.click && d.nodeName(this, "input")) return this.click(), !1
            },
            _default: function (e) {
              return d.nodeName(e.target, "a")
            }
          },
          beforeunload: {
            postDispatch: function (e) {
              void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
            }
          }
        }
      }, d.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
      }, d.Event = function (e, t) {
        if (!(this instanceof d.Event)) return new d.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? se : ae) : this.type = e, t && d.extend(this, t), this.timeStamp = e && e.timeStamp || d.now(), this[d.expando] = !0
      }, d.Event.prototype = {
        constructor: d.Event,
        isDefaultPrevented: ae,
        isPropagationStopped: ae,
        isImmediatePropagationStopped: ae,
        isSimulated: !1,
        preventDefault: function () {
          var e = this.originalEvent;
          this.isDefaultPrevented = se, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function () {
          var e = this.originalEvent;
          this.isPropagationStopped = se, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function () {
          var e = this.originalEvent;
          this.isImmediatePropagationStopped = se, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
      }, d.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
      }, function (e, t) {
        d.event.special[e] = {
          delegateType: t,
          bindType: t,
          handle: function (e) {
            var n, r = e.relatedTarget,
              i = e.handleObj;
            return r && (r === this || d.contains(this, r)) || (e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t), n
          }
        }
      }), d.fn.extend({
        on: function (e, t, n, r) {
          return le(this, e, t, n, r)
        },
        one: function (e, t, n, r) {
          return le(this, e, t, n, r, 1)
        },
        off: function (e, t, n) {
          var r, i;
          if (e && e.preventDefault && e.handleObj) return r = e.handleObj, d(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
          if ("object" == typeof e) {
            for (i in e) this.off(i, t, e[i]);
            return this
          }
          return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = ae), this.each(function () {
            d.event.remove(this, e, n, t)
          })
        }
      });
      var ce = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        fe = /<script|<style|<link/i,
        pe = /checked\s*(?:[^=]|=\s*.checked.)/i,
        de = /^true\/(.*)/,
        he = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

      function ge(e, t) {
        return d.nodeName(e, "table") && d.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
      }

      function ve(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
      }

      function me(e) {
        var t = de.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
      }

      function ye(e, t) {
        var n, r, i, o, s, a, u, l;
        if (1 === t.nodeType) {
          if (R.hasData(e) && (o = R.access(e), s = R.set(t, o), l = o.events))
            for (i in delete s.handle, s.events = {}, l)
              for (n = 0, r = l[i].length; n < r; n++) d.event.add(t, i, l[i][n]);
          M.hasData(e) && (a = M.access(e), u = d.extend({}, a), M.set(t, u))
        }
      }

      function xe(e, t, n, r) {
        t = s.apply([], t);
        var i, o, a, u, l, c, f = 0,
          h = e.length,
          g = h - 1,
          v = t[0],
          m = d.isFunction(v);
        if (m || h > 1 && "string" == typeof v && !p.checkClone && pe.test(v)) return e.each(function (i) {
          var o = e.eq(i);
          m && (t[0] = v.call(this, i, o.html())), xe(o, t, n, r)
        });
        if (h && (o = (i = ne(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === i.childNodes.length && (i = o), o || r)) {
          for (u = (a = d.map(J(i, "script"), ve)).length; f < h; f++) l = i, f !== g && (l = d.clone(l, !0, !0), u && d.merge(a, J(l, "script"))), n.call(e[f], l, f);
          if (u)
            for (c = a[a.length - 1].ownerDocument, d.map(a, me), f = 0; f < u; f++) l = a[f], G.test(l.type || "") && !R.access(l, "globalEval") && d.contains(c, l) && (l.src ? d._evalUrl && d._evalUrl(l.src) : d.globalEval(l.textContent.replace(he, "")))
        }
        return e
      }

      function be(e, t, n) {
        for (var r, i = t ? d.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || d.cleanData(J(r)), r.parentNode && (n && d.contains(r.ownerDocument, r) && K(J(r, "script")), r.parentNode.removeChild(r));
        return e
      }
      d.extend({
        htmlPrefilter: function (e) {
          return e.replace(ce, "<$1></$2>")
        },
        clone: function (e, t, n) {
          var r, i, o, s, a, u, l, c = e.cloneNode(!0),
            f = d.contains(e.ownerDocument, e);
          if (!(p.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || d.isXMLDoc(e)))
            for (s = J(c), r = 0, i = (o = J(e)).length; r < i; r++) a = o[r], u = s[r], l = void 0, "input" === (l = u.nodeName.toLowerCase()) && V.test(a.type) ? u.checked = a.checked : "input" !== l && "textarea" !== l || (u.defaultValue = a.defaultValue);
          if (t)
            if (n)
              for (o = o || J(e), s = s || J(c), r = 0, i = o.length; r < i; r++) ye(o[r], s[r]);
            else ye(e, c);
          return (s = J(c, "script")).length > 0 && K(s, !f && J(e, "script")), c
        },
        cleanData: function (e) {
          for (var t, n, r, i = d.event.special, o = 0; void 0 !== (n = e[o]); o++)
            if (F(n)) {
              if (t = n[R.expando]) {
                if (t.events)
                  for (r in t.events) i[r] ? d.event.remove(n, r) : d.removeEvent(n, r, t.handle);
                n[R.expando] = void 0
              }
              n[M.expando] && (n[M.expando] = void 0)
            }
        }
      }), d.fn.extend({
        domManip: xe,
        detach: function (e) {
          return be(this, e, !0)
        },
        remove: function (e) {
          return be(this, e)
        },
        text: function (e) {
          return O(this, function (e) {
            return void 0 === e ? d.text(this) : this.empty().each(function () {
              1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
            })
          }, null, e, arguments.length)
        },
        append: function () {
          return xe(this, arguments, function (e) {
            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || ge(this, e).appendChild(e)
          })
        },
        prepend: function () {
          return xe(this, arguments, function (e) {
            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
              var t = ge(this, e);
              t.insertBefore(e, t.firstChild)
            }
          })
        },
        before: function () {
          return xe(this, arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this)
          })
        },
        after: function () {
          return xe(this, arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
          })
        },
        empty: function () {
          for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (d.cleanData(J(e, !1)), e.textContent = "");
          return this
        },
        clone: function (e, t) {
          return e = null != e && e, t = null == t ? e : t, this.map(function () {
            return d.clone(this, e, t)
          })
        },
        html: function (e) {
          return O(this, function (e) {
            var t = this[0] || {},
              n = 0,
              r = this.length;
            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
            if ("string" == typeof e && !fe.test(e) && !Q[(Y.exec(e) || ["", ""])[1].toLowerCase()]) {
              e = d.htmlPrefilter(e);
              try {
                for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (d.cleanData(J(t, !1)), t.innerHTML = e);
                t = 0
              } catch (i) {}
            }
            t && this.empty().append(e)
          }, null, e, arguments.length)
        },
        replaceWith: function () {
          var e = [];
          return xe(this, arguments, function (t) {
            var n = this.parentNode;
            d.inArray(this, e) < 0 && (d.cleanData(J(this)), n && n.replaceChild(t, this))
          }, e)
        }
      }), d.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
      }, function (e, t) {
        d.fn[e] = function (e) {
          for (var n, r = [], i = d(e), o = i.length - 1, s = 0; s <= o; s++) n = s === o ? this : this.clone(!0), d(i[s])[t](n), a.apply(r, n.get());
          return this.pushStack(r)
        }
      });
      var we, Te = {
        HTML: "block",
        BODY: "block"
      };

      function Ce(e, t) {
        var n = d(t.createElement(e)).appendTo(t.body),
          r = d.css(n[0], "display");
        return n.detach(), r
      }

      function ke(e) {
        var t = i,
          n = Te[e];
        return n || ("none" !== (n = Ce(e, t)) && n || ((t = (we = (we || d("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentDocument).write(), t.close(), n = Ce(e, t), we.detach()), Te[e] = n), n
      }
      var Ee = /^margin/,
        Ne = new RegExp("^(" + B + ")(?!px)[a-z%]+$", "i"),
        Se = function (e) {
          var n = e.ownerDocument.defaultView;
          return n && n.opener || (n = t), n.getComputedStyle(e)
        },
        je = function (e, t, n, r) {
          var i, o, s = {};
          for (o in t) s[o] = e.style[o], e.style[o] = t[o];
          for (o in i = n.apply(e, r || []), t) e.style[o] = s[o];
          return i
        },
        De = i.documentElement;

      function Ae(e, t, n) {
        var r, i, o, s, a = e.style;
        return "" !== (s = (n = n || Se(e)) ? n.getPropertyValue(t) || n[t] : void 0) && void 0 !== s || d.contains(e.ownerDocument, e) || (s = d.style(e, t)), n && !p.pixelMarginRight() && Ne.test(s) && Ee.test(t) && (r = a.width, i = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = r, a.minWidth = i, a.maxWidth = o), void 0 !== s ? s + "" : s
      }

      function qe(e, t) {
        return {
          get: function () {
            if (!e()) return (this.get = t).apply(this, arguments);
            delete this.get
          }
        }
      }! function () {
        var e, n, r, o, s = i.createElement("div"),
          a = i.createElement("div");

        function u() {
          a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", De.appendChild(s);
          var i = t.getComputedStyle(a);
          e = "1%" !== i.top, o = "2px" === i.marginLeft, n = "4px" === i.width, a.style.marginRight = "50%", r = "4px" === i.marginRight, De.removeChild(s)
        }
        a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", p.clearCloneStyle = "content-box" === a.style.backgroundClip, s.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", s.appendChild(a), d.extend(p, {
          pixelPosition: function () {
            return u(), e
          },
          boxSizingReliable: function () {
            return null == n && u(), n
          },
          pixelMarginRight: function () {
            return null == n && u(), r
          },
          reliableMarginLeft: function () {
            return null == n && u(), o
          },
          reliableMarginRight: function () {
            var e, n = a.appendChild(i.createElement("div"));
            return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", a.style.width = "1px", De.appendChild(s), e = !parseFloat(t.getComputedStyle(n).marginRight), De.removeChild(s), a.removeChild(n), e
          }
        }))
      }();
      var Le = /^(none|table(?!-c[ea]).+)/,
        He = {
          position: "absolute",
          visibility: "hidden",
          display: "block"
        },
        Oe = {
          letterSpacing: "0",
          fontWeight: "400"
        },
        Fe = ["Webkit", "O", "Moz", "ms"],
        Pe = i.createElement("div").style;

      function Re(e) {
        if (e in Pe) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = Fe.length; n--;)
          if ((e = Fe[n] + t) in Pe) return e
      }

      function Me(e, t, n) {
        var r = _.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
      }

      function Ie(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; o < 4; o += 2) "margin" === n && (s += d.css(e, n + X[o], !0, i)), r ? ("content" === n && (s -= d.css(e, "padding" + X[o], !0, i)), "margin" !== n && (s -= d.css(e, "border" + X[o] + "Width", !0, i))) : (s += d.css(e, "padding" + X[o], !0, i), "padding" !== n && (s += d.css(e, "border" + X[o] + "Width", !0, i)));
        return s
      }

      function We(e, t, n) {
        var r = !0,
          i = "width" === t ? e.offsetWidth : e.offsetHeight,
          o = Se(e),
          s = "border-box" === d.css(e, "boxSizing", !1, o);
        if (i <= 0 || null == i) {
          if (((i = Ae(e, t, o)) < 0 || null == i) && (i = e.style[t]), Ne.test(i)) return i;
          r = s && (p.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + Ie(e, t, n || (s ? "border" : "content"), r, o) + "px"
      }

      function $e(e, t) {
        for (var n, r, i, o = [], s = 0, a = e.length; s < a; s++)(r = e[s]).style && (o[s] = R.get(r, "olddisplay"), n = r.style.display, t ? (o[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && z(r) && (o[s] = R.access(r, "olddisplay", ke(r.nodeName)))) : (i = z(r), "none" === n && i || R.set(r, "olddisplay", i ? n : d.css(r, "display"))));
        for (s = 0; s < a; s++)(r = e[s]).style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[s] || "" : "none"));
        return e
      }

      function Be(e, t, n, r, i) {
        return new Be.prototype.init(e, t, n, r, i)
      }
      d.extend({
        cssHooks: {
          opacity: {
            get: function (e, t) {
              if (t) {
                var n = Ae(e, "opacity");
                return "" === n ? "1" : n
              }
            }
          }
        },
        cssNumber: {
          animationIterationCount: !0,
          columnCount: !0,
          fillOpacity: !0,
          flexGrow: !0,
          flexShrink: !0,
          fontWeight: !0,
          lineHeight: !0,
          opacity: !0,
          order: !0,
          orphans: !0,
          widows: !0,
          zIndex: !0,
          zoom: !0
        },
        cssProps: {
          float: "cssFloat"
        },
        style: function (e, t, n, r) {
          if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
            var i, o, s, a = d.camelCase(t),
              u = e.style;
            if (t = d.cssProps[a] || (d.cssProps[a] = Re(a) || a), s = d.cssHooks[t] || d.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (i = s.get(e, !1, r)) ? i : u[t];
            "string" === (o = typeof n) && (i = _.exec(n)) && i[1] && (n = U(e, t, i), o = "number"), null != n && n == n && ("number" === o && (n += i && i[3] || (d.cssNumber[a] ? "" : "px")), p.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && void 0 === (n = s.set(e, n, r)) || (u[t] = n))
          }
        },
        css: function (e, t, n, r) {
          var i, o, s, a = d.camelCase(t);
          return t = d.cssProps[a] || (d.cssProps[a] = Re(a) || a), (s = d.cssHooks[t] || d.cssHooks[a]) && "get" in s && (i = s.get(e, !0, n)), void 0 === i && (i = Ae(e, t, r)), "normal" === i && t in Oe && (i = Oe[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
        }
      }), d.each(["height", "width"], function (e, t) {
        d.cssHooks[t] = {
          get: function (e, n, r) {
            if (n) return Le.test(d.css(e, "display")) && 0 === e.offsetWidth ? je(e, He, function () {
              return We(e, t, r)
            }) : We(e, t, r)
          },
          set: function (e, n, r) {
            var i, o = r && Se(e),
              s = r && Ie(e, t, r, "border-box" === d.css(e, "boxSizing", !1, o), o);
            return s && (i = _.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = d.css(e, t)), Me(0, n, s)
          }
        }
      }), d.cssHooks.marginLeft = qe(p.reliableMarginLeft, function (e, t) {
        if (t) return (parseFloat(Ae(e, "marginLeft")) || e.getBoundingClientRect().left - je(e, {
          marginLeft: 0
        }, function () {
          return e.getBoundingClientRect().left
        })) + "px"
      }), d.cssHooks.marginRight = qe(p.reliableMarginRight, function (e, t) {
        if (t) return je(e, {
          display: "inline-block"
        }, Ae, [e, "marginRight"])
      }), d.each({
        margin: "",
        padding: "",
        border: "Width"
      }, function (e, t) {
        d.cssHooks[e + t] = {
          expand: function (n) {
            for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + X[r] + t] = o[r] || o[r - 2] || o[0];
            return i
          }
        }, Ee.test(e) || (d.cssHooks[e + t].set = Me)
      }), d.fn.extend({
        css: function (e, t) {
          return O(this, function (e, t, n) {
            var r, i, o = {},
              s = 0;
            if (d.isArray(t)) {
              for (r = Se(e), i = t.length; s < i; s++) o[t[s]] = d.css(e, t[s], !1, r);
              return o
            }
            return void 0 !== n ? d.style(e, t, n) : d.css(e, t)
          }, e, t, arguments.length > 1)
        },
        show: function () {
          return $e(this, !0)
        },
        hide: function () {
          return $e(this)
        },
        toggle: function (e) {
          return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
            z(this) ? d(this).show() : d(this).hide()
          })
        }
      }), d.Tween = Be, Be.prototype = {
        constructor: Be,
        init: function (e, t, n, r, i, o) {
          this.elem = e, this.prop = n, this.easing = i || d.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (d.cssNumber[n] ? "" : "px")
        },
        cur: function () {
          var e = Be.propHooks[this.prop];
          return e && e.get ? e.get(this) : Be.propHooks._default.get(this)
        },
        run: function (e) {
          var t, n = Be.propHooks[this.prop];
          return this.options.duration ? this.pos = t = d.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Be.propHooks._default.set(this), this
        }
      }, Be.prototype.init.prototype = Be.prototype, Be.propHooks = {
        _default: {
          get: function (e) {
            var t;
            return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = d.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
          },
          set: function (e) {
            d.fx.step[e.prop] ? d.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[d.cssProps[e.prop]] && !d.cssHooks[e.prop] ? e.elem[e.prop] = e.now : d.style(e.elem, e.prop, e.now + e.unit)
          }
        }
      }, Be.propHooks.scrollTop = Be.propHooks.scrollLeft = {
        set: function (e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
      }, d.easing = {
        linear: function (e) {
          return e
        },
        swing: function (e) {
          return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
      }, d.fx = Be.prototype.init, d.fx.step = {};
      var _e, Xe, ze = /^(?:toggle|show|hide)$/,
        Ue = /queueHooks$/;

      function Ve() {
        return t.setTimeout(function () {
          _e = void 0
        }), _e = d.now()
      }

      function Ye(e, t) {
        var n, r = 0,
          i = {
            height: e
          };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = X[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
      }

      function Ge(e, t, n) {
        for (var r, i = (Qe.tweeners[t] || []).concat(Qe.tweeners["*"]), o = 0, s = i.length; o < s; o++)
          if (r = i[o].call(n, t, e)) return r
      }

      function Qe(e, t, n) {
        var r, i, o = 0,
          s = Qe.prefilters.length,
          a = d.Deferred().always(function () {
            delete u.elem
          }),
          u = function () {
            if (i) return !1;
            for (var t = _e || Ve(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, s = l.tweens.length; o < s; o++) l.tweens[o].run(r);
            return a.notifyWith(e, [l, r, n]), r < 1 && s ? n : (a.resolveWith(e, [l]), !1)
          },
          l = a.promise({
            elem: e,
            props: d.extend({}, t),
            opts: d.extend(!0, {
              specialEasing: {},
              easing: d.easing._default
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: _e || Ve(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
              var r = d.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
              return l.tweens.push(r), r
            },
            stop: function (t) {
              var n = 0,
                r = t ? l.tweens.length : 0;
              if (i) return this;
              for (i = !0; n < r; n++) l.tweens[n].run(1);
              return t ? (a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l, t])) : a.rejectWith(e, [l, t]), this
            }
          }),
          c = l.props;
        for (! function (e, t) {
            var n, r, i, o, s;
            for (n in e)
              if (i = t[r = d.camelCase(n)], o = e[n], d.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (s = d.cssHooks[r]) && "expand" in s)
                for (n in o = s.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);
              else t[r] = i
          }(c, l.opts.specialEasing); o < s; o++)
          if (r = Qe.prefilters[o].call(l, e, c, l.opts)) return d.isFunction(r.stop) && (d._queueHooks(l.elem, l.opts.queue).stop = d.proxy(r.stop, r)), r;
        return d.map(c, Ge, l), d.isFunction(l.opts.start) && l.opts.start.call(e, l), d.fx.timer(d.extend(u, {
          elem: e,
          anim: l,
          queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
      }
      d.Animation = d.extend(Qe, {
          tweeners: {
            "*": [function (e, t) {
              var n = this.createTween(e, t);
              return U(n.elem, e, _.exec(t), n), n
            }]
          },
          tweener: function (e, t) {
            d.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(L);
            for (var n, r = 0, i = e.length; r < i; r++) n = e[r], Qe.tweeners[n] = Qe.tweeners[n] || [], Qe.tweeners[n].unshift(t)
          },
          prefilters: [function (e, t, n) {
            var r, i, o, s, a, u, l, c = this,
              f = {},
              p = e.style,
              h = e.nodeType && z(e),
              g = R.get(e, "fxshow");
            for (r in n.queue || (null == (a = d._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, u = a.empty.fire, a.empty.fire = function () {
                a.unqueued || u()
              }), a.unqueued++, c.always(function () {
                c.always(function () {
                  a.unqueued--, d.queue(e, "fx").length || a.empty.fire()
                })
              })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === ("none" === (l = d.css(e, "display")) ? R.get(e, "olddisplay") || ke(e.nodeName) : l) && "none" === d.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", c.always(function () {
                p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
              })), t)
              if (i = t[r], ze.exec(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
                  if ("show" !== i || !g || void 0 === g[r]) continue;
                  h = !0
                }
                f[r] = g && g[r] || d.style(e, r)
              } else l = void 0;
            if (d.isEmptyObject(f)) "inline" === ("none" === l ? ke(e.nodeName) : l) && (p.display = l);
            else
              for (r in g ? "hidden" in g && (h = g.hidden) : g = R.access(e, "fxshow", {}), o && (g.hidden = !h), h ? d(e).show() : c.done(function () {
                  d(e).hide()
                }), c.done(function () {
                  var t;
                  for (t in R.remove(e, "fxshow"), f) d.style(e, t, f[t])
                }), f) s = Ge(h ? g[r] : 0, r, c), r in g || (g[r] = s.start, h && (s.end = s.start, s.start = "width" === r || "height" === r ? 1 : 0))
          }],
          prefilter: function (e, t) {
            t ? Qe.prefilters.unshift(e) : Qe.prefilters.push(e)
          }
        }), d.speed = function (e, t, n) {
          var r = e && "object" == typeof e ? d.extend({}, e) : {
            complete: n || !n && t || d.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !d.isFunction(t) && t
          };
          return r.duration = d.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in d.fx.speeds ? d.fx.speeds[r.duration] : d.fx.speeds._default, null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            d.isFunction(r.old) && r.old.call(this), r.queue && d.dequeue(this, r.queue)
          }, r
        }, d.fn.extend({
          fadeTo: function (e, t, n, r) {
            return this.filter(z).css("opacity", 0).show().end().animate({
              opacity: t
            }, e, n, r)
          },
          animate: function (e, t, n, r) {
            var i = d.isEmptyObject(e),
              o = d.speed(t, n, r),
              s = function () {
                var t = Qe(this, d.extend({}, e), o);
                (i || R.get(this, "finish")) && t.stop(!0)
              };
            return s.finish = s, i || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
          },
          stop: function (e, t, n) {
            var r = function (e) {
              var t = e.stop;
              delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function () {
              var t = !0,
                i = null != e && e + "queueHooks",
                o = d.timers,
                s = R.get(this);
              if (i) s[i] && s[i].stop && r(s[i]);
              else
                for (i in s) s[i] && s[i].stop && Ue.test(i) && r(s[i]);
              for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
              !t && n || d.dequeue(this, e)
            })
          },
          finish: function (e) {
            return !1 !== e && (e = e || "fx"), this.each(function () {
              var t, n = R.get(this),
                r = n[e + "queue"],
                i = n[e + "queueHooks"],
                o = d.timers,
                s = r ? r.length : 0;
              for (n.finish = !0, d.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
              for (t = 0; t < s; t++) r[t] && r[t].finish && r[t].finish.call(this);
              delete n.finish
            })
          }
        }), d.each(["toggle", "show", "hide"], function (e, t) {
          var n = d.fn[t];
          d.fn[t] = function (e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(Ye(t, !0), e, r, i)
          }
        }), d.each({
          slideDown: Ye("show"),
          slideUp: Ye("hide"),
          slideToggle: Ye("toggle"),
          fadeIn: {
            opacity: "show"
          },
          fadeOut: {
            opacity: "hide"
          },
          fadeToggle: {
            opacity: "toggle"
          }
        }, function (e, t) {
          d.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
          }
        }), d.timers = [], d.fx.tick = function () {
          var e, t = 0,
            n = d.timers;
          for (_e = d.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
          n.length || d.fx.stop(), _e = void 0
        }, d.fx.timer = function (e) {
          d.timers.push(e), e() ? d.fx.start() : d.timers.pop()
        }, d.fx.interval = 13, d.fx.start = function () {
          Xe || (Xe = t.setInterval(d.fx.tick, d.fx.interval))
        }, d.fx.stop = function () {
          t.clearInterval(Xe), Xe = null
        }, d.fx.speeds = {
          slow: 600,
          fast: 200,
          _default: 400
        }, d.fn.delay = function (e, n) {
          return e = d.fx && d.fx.speeds[e] || e, n = n || "fx", this.queue(n, function (n, r) {
            var i = t.setTimeout(n, e);
            r.stop = function () {
              t.clearTimeout(i)
            }
          })
        },
        function () {
          var e = i.createElement("input"),
            t = i.createElement("select"),
            n = t.appendChild(i.createElement("option"));
          e.type = "checkbox", p.checkOn = "" !== e.value, p.optSelected = n.selected, t.disabled = !0, p.optDisabled = !n.disabled, (e = i.createElement("input")).value = "t", e.type = "radio", p.radioValue = "t" === e.value
        }();
      var Je, Ke = d.expr.attrHandle;
      d.fn.extend({
        attr: function (e, t) {
          return O(this, d.attr, e, t, arguments.length > 1)
        },
        removeAttr: function (e) {
          return this.each(function () {
            d.removeAttr(this, e)
          })
        }
      }), d.extend({
        attr: function (e, t, n) {
          var r, i, o = e.nodeType;
          if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? d.prop(e, t, n) : (1 === o && d.isXMLDoc(e) || (t = t.toLowerCase(), i = d.attrHooks[t] || (d.expr.match.bool.test(t) ? Je : void 0)), void 0 !== n ? null === n ? void d.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = d.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
          type: {
            set: function (e, t) {
              if (!p.radioValue && "radio" === t && d.nodeName(e, "input")) {
                var n = e.value;
                return e.setAttribute("type", t), n && (e.value = n), t
              }
            }
          }
        },
        removeAttr: function (e, t) {
          var n, r, i = 0,
            o = t && t.match(L);
          if (o && 1 === e.nodeType)
            for (; n = o[i++];) r = d.propFix[n] || n, d.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
        }
      }), Je = {
        set: function (e, t, n) {
          return !1 === t ? d.removeAttr(e, n) : e.setAttribute(n, n), n
        }
      }, d.each(d.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = Ke[t] || d.find.attr;
        Ke[t] = function (e, t, r) {
          var i, o;
          return r || (o = Ke[t], Ke[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, Ke[t] = o), i
        }
      });
      var Ze = /^(?:input|select|textarea|button)$/i,
        et = /^(?:a|area)$/i;
      d.fn.extend({
        prop: function (e, t) {
          return O(this, d.prop, e, t, arguments.length > 1)
        },
        removeProp: function (e) {
          return this.each(function () {
            delete this[d.propFix[e] || e]
          })
        }
      }), d.extend({
        prop: function (e, t, n) {
          var r, i, o = e.nodeType;
          if (3 !== o && 8 !== o && 2 !== o) return 1 === o && d.isXMLDoc(e) || (t = d.propFix[t] || t, i = d.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
          tabIndex: {
            get: function (e) {
              var t = d.find.attr(e, "tabindex");
              return t ? parseInt(t, 10) : Ze.test(e.nodeName) || et.test(e.nodeName) && e.href ? 0 : -1
            }
          }
        },
        propFix: {
          for: "htmlFor",
          class: "className"
        }
      }), p.optSelected || (d.propHooks.selected = {
        get: function (e) {
          var t = e.parentNode;
          return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function (e) {
          var t = e.parentNode;
          t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
      }), d.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        d.propFix[this.toLowerCase()] = this
      });
      var tt = /[\t\r\n\f]/g;

      function nt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
      }
      d.fn.extend({
        addClass: function (e) {
          var t, n, r, i, o, s, a, u = 0;
          if (d.isFunction(e)) return this.each(function (t) {
            d(this).addClass(e.call(this, t, nt(this)))
          });
          if ("string" == typeof e && e)
            for (t = e.match(L) || []; n = this[u++];)
              if (i = nt(n), r = 1 === n.nodeType && (" " + i + " ").replace(tt, " ")) {
                for (s = 0; o = t[s++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                i !== (a = d.trim(r)) && n.setAttribute("class", a)
              } return this
        },
        removeClass: function (e) {
          var t, n, r, i, o, s, a, u = 0;
          if (d.isFunction(e)) return this.each(function (t) {
            d(this).removeClass(e.call(this, t, nt(this)))
          });
          if (!arguments.length) return this.attr("class", "");
          if ("string" == typeof e && e)
            for (t = e.match(L) || []; n = this[u++];)
              if (i = nt(n), r = 1 === n.nodeType && (" " + i + " ").replace(tt, " ")) {
                for (s = 0; o = t[s++];)
                  for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
                i !== (a = d.trim(r)) && n.setAttribute("class", a)
              } return this
        },
        toggleClass: function (e, t) {
          var n = typeof e;
          return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : d.isFunction(e) ? this.each(function (n) {
            d(this).toggleClass(e.call(this, n, nt(this), t), t)
          }) : this.each(function () {
            var t, r, i, o;
            if ("string" === n)
              for (r = 0, i = d(this), o = e.match(L) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
            else void 0 !== e && "boolean" !== n || ((t = nt(this)) && R.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : R.get(this, "__className__") || ""))
          })
        },
        hasClass: function (e) {
          var t, n, r = 0;
          for (t = " " + e + " "; n = this[r++];)
            if (1 === n.nodeType && (" " + nt(n) + " ").replace(tt, " ").indexOf(t) > -1) return !0;
          return !1
        }
      });
      var rt = /\r/g,
        it = /[\x20\t\r\n\f]+/g;
      d.fn.extend({
        val: function (e) {
          var t, n, r, i = this[0];
          return arguments.length ? (r = d.isFunction(e), this.each(function (n) {
            var i;
            1 === this.nodeType && (null == (i = r ? e.call(this, n, d(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : d.isArray(i) && (i = d.map(i, function (e) {
              return null == e ? "" : e + ""
            })), (t = d.valHooks[this.type] || d.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
          })) : i ? (t = d.valHooks[i.type] || d.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(rt, "") : null == n ? "" : n : void 0
        }
      }), d.extend({
        valHooks: {
          option: {
            get: function (e) {
              var t = d.find.attr(e, "value");
              return null != t ? t : d.trim(d.text(e)).replace(it, " ")
            }
          },
          select: {
            get: function (e) {
              for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || i < 0, s = o ? null : [], a = o ? i + 1 : r.length, u = i < 0 ? a : o ? i : 0; u < a; u++)
                if (((n = r[u]).selected || u === i) && (p.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !d.nodeName(n.parentNode, "optgroup"))) {
                  if (t = d(n).val(), o) return t;
                  s.push(t)
                } return s
            },
            set: function (e, t) {
              for (var n, r, i = e.options, o = d.makeArray(t), s = i.length; s--;)((r = i[s]).selected = d.inArray(d.valHooks.option.get(r), o) > -1) && (n = !0);
              return n || (e.selectedIndex = -1), o
            }
          }
        }
      }), d.each(["radio", "checkbox"], function () {
        d.valHooks[this] = {
          set: function (e, t) {
            if (d.isArray(t)) return e.checked = d.inArray(d(e).val(), t) > -1
          }
        }, p.checkOn || (d.valHooks[this].get = function (e) {
          return null === e.getAttribute("value") ? "on" : e.value
        })
      });
      var ot = /^(?:focusinfocus|focusoutblur)$/;
      d.extend(d.event, {
        trigger: function (e, n, r, o) {
          var s, a, u, l, c, p, h, g = [r || i],
            v = f.call(e, "type") ? e.type : e,
            m = f.call(e, "namespace") ? e.namespace.split(".") : [];
          if (a = u = r = r || i, 3 !== r.nodeType && 8 !== r.nodeType && !ot.test(v + d.event.triggered) && (v.indexOf(".") > -1 && (m = v.split("."), v = m.shift(), m.sort()), c = v.indexOf(":") < 0 && "on" + v, (e = e[d.expando] ? e : new d.Event(v, "object" == typeof e && e)).isTrigger = o ? 2 : 3, e.namespace = m.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), n = null == n ? [e] : d.makeArray(n, [e]), h = d.event.special[v] || {}, o || !h.trigger || !1 !== h.trigger.apply(r, n))) {
            if (!o && !h.noBubble && !d.isWindow(r)) {
              for (l = h.delegateType || v, ot.test(l + v) || (a = a.parentNode); a; a = a.parentNode) g.push(a), u = a;
              u === (r.ownerDocument || i) && g.push(u.defaultView || u.parentWindow || t)
            }
            for (s = 0;
              (a = g[s++]) && !e.isPropagationStopped();) e.type = s > 1 ? l : h.bindType || v, (p = (R.get(a, "events") || {})[e.type] && R.get(a, "handle")) && p.apply(a, n), (p = c && a[c]) && p.apply && F(a) && (e.result = p.apply(a, n), !1 === e.result && e.preventDefault());
            return e.type = v, o || e.isDefaultPrevented() || h._default && !1 !== h._default.apply(g.pop(), n) || !F(r) || c && d.isFunction(r[v]) && !d.isWindow(r) && ((u = r[c]) && (r[c] = null), d.event.triggered = v, r[v](), d.event.triggered = void 0, u && (r[c] = u)), e.result
          }
        },
        simulate: function (e, t, n) {
          var r = d.extend(new d.Event, n, {
            type: e,
            isSimulated: !0
          });
          d.event.trigger(r, null, t)
        }
      }), d.fn.extend({
        trigger: function (e, t) {
          return this.each(function () {
            d.event.trigger(e, t, this)
          })
        },
        triggerHandler: function (e, t) {
          var n = this[0];
          if (n) return d.event.trigger(e, t, n, !0)
        }
      }), d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        d.fn[t] = function (e, n) {
          return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
      }), d.fn.extend({
        hover: function (e, t) {
          return this.mouseenter(e).mouseleave(t || e)
        }
      }), p.focusin = "onfocusin" in t, p.focusin || d.each({
        focus: "focusin",
        blur: "focusout"
      }, function (e, t) {
        var n = function (e) {
          d.event.simulate(t, e.target, d.event.fix(e))
        };
        d.event.special[t] = {
          setup: function () {
            var r = this.ownerDocument || this,
              i = R.access(r, t);
            i || r.addEventListener(e, n, !0), R.access(r, t, (i || 0) + 1)
          },
          teardown: function () {
            var r = this.ownerDocument || this,
              i = R.access(r, t) - 1;
            i ? R.access(r, t, i) : (r.removeEventListener(e, n, !0), R.remove(r, t))
          }
        }
      });
      var st = t.location,
        at = d.now(),
        ut = /\?/;
      d.parseJSON = function (e) {
        return JSON.parse(e + "")
      }, d.parseXML = function (e) {
        var n;
        if (!e || "string" != typeof e) return null;
        try {
          n = (new t.DOMParser).parseFromString(e, "text/xml")
        } catch (r) {
          n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || d.error("Invalid XML: " + e), n
      };
      var lt = /#.*$/,
        ct = /([?&])_=[^&]*/,
        ft = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        pt = /^(?:GET|HEAD)$/,
        dt = /^\/\//,
        ht = {},
        gt = {},
        vt = "*/".concat("*"),
        mt = i.createElement("a");

      function yt(e) {
        return function (t, n) {
          "string" != typeof t && (n = t, t = "*");
          var r, i = 0,
            o = t.toLowerCase().match(L) || [];
          if (d.isFunction(n))
            for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
      }

      function xt(e, t, n, r) {
        var i = {},
          o = e === gt;

        function s(a) {
          var u;
          return i[a] = !0, d.each(e[a] || [], function (e, a) {
            var l = a(t, n, r);
            return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), s(l), !1)
          }), u
        }
        return s(t.dataTypes[0]) || !i["*"] && s("*")
      }

      function bt(e, t) {
        var n, r, i = d.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && d.extend(!0, e, r), e
      }
      mt.href = st.href, d.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: st.href,
          type: "GET",
          isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(st.protocol),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": vt,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
          },
          contents: {
            xml: /\bxml\b/,
            html: /\bhtml/,
            json: /\bjson\b/
          },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON"
          },
          converters: {
            "* text": String,
            "text html": !0,
            "text json": d.parseJSON,
            "text xml": d.parseXML
          },
          flatOptions: {
            url: !0,
            context: !0
          }
        },
        ajaxSetup: function (e, t) {
          return t ? bt(bt(e, d.ajaxSettings), t) : bt(d.ajaxSettings, e)
        },
        ajaxPrefilter: yt(ht),
        ajaxTransport: yt(gt),
        ajax: function (e, n) {
          "object" == typeof e && (n = e, e = void 0), n = n || {};
          var r, o, s, a, u, l, c, f, p = d.ajaxSetup({}, n),
            h = p.context || p,
            g = p.context && (h.nodeType || h.jquery) ? d(h) : d.event,
            v = d.Deferred(),
            m = d.Callbacks("once memory"),
            y = p.statusCode || {},
            x = {},
            b = {},
            w = 0,
            T = "canceled",
            C = {
              readyState: 0,
              getResponseHeader: function (e) {
                var t;
                if (2 === w) {
                  if (!a)
                    for (a = {}; t = ft.exec(s);) a[t[1].toLowerCase()] = t[2];
                  t = a[e.toLowerCase()]
                }
                return null == t ? null : t
              },
              getAllResponseHeaders: function () {
                return 2 === w ? s : null
              },
              setRequestHeader: function (e, t) {
                var n = e.toLowerCase();
                return w || (e = b[n] = b[n] || e, x[e] = t), this
              },
              overrideMimeType: function (e) {
                return w || (p.mimeType = e), this
              },
              statusCode: function (e) {
                var t;
                if (e)
                  if (w < 2)
                    for (t in e) y[t] = [y[t], e[t]];
                  else C.always(e[C.status]);
                return this
              },
              abort: function (e) {
                var t = e || T;
                return r && r.abort(t), k(0, t), this
              }
            };
          if (v.promise(C).complete = m.add, C.success = C.done, C.error = C.fail, p.url = ((e || p.url || st.href) + "").replace(lt, "").replace(dt, st.protocol + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = d.trim(p.dataType || "*").toLowerCase().match(L) || [""], null == p.crossDomain) {
            l = i.createElement("a");
            try {
              l.href = p.url, l.href = l.href, p.crossDomain = mt.protocol + "//" + mt.host != l.protocol + "//" + l.host
            } catch (E) {
              p.crossDomain = !0
            }
          }
          if (p.data && p.processData && "string" != typeof p.data && (p.data = d.param(p.data, p.traditional)), xt(ht, p, n, C), 2 === w) return C;
          for (f in (c = d.event && p.global) && 0 == d.active++ && d.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !pt.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (ut.test(o) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (p.url = ct.test(o) ? o.replace(ct, "$1_=" + at++) : o + (ut.test(o) ? "&" : "?") + "_=" + at++)), p.ifModified && (d.lastModified[o] && C.setRequestHeader("If-Modified-Since", d.lastModified[o]), d.etag[o] && C.setRequestHeader("If-None-Match", d.etag[o])), (p.data && p.hasContent && !1 !== p.contentType || n.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + vt + "; q=0.01" : "") : p.accepts["*"]), p.headers) C.setRequestHeader(f, p.headers[f]);
          if (p.beforeSend && (!1 === p.beforeSend.call(h, C, p) || 2 === w)) return C.abort();
          for (f in T = "abort", {
              success: 1,
              error: 1,
              complete: 1
            }) C[f](p[f]);
          if (r = xt(gt, p, n, C)) {
            if (C.readyState = 1, c && g.trigger("ajaxSend", [C, p]), 2 === w) return C;
            p.async && p.timeout > 0 && (u = t.setTimeout(function () {
              C.abort("timeout")
            }, p.timeout));
            try {
              w = 1, r.send(x, k)
            } catch (E) {
              if (!(w < 2)) throw E;
              k(-1, E)
            }
          } else k(-1, "No Transport");

          function k(e, n, i, a) {
            var l, f, x, b, T, k = n;
            2 !== w && (w = 2, u && t.clearTimeout(u), r = void 0, s = a || "", C.readyState = e > 0 ? 4 : 0, l = e >= 200 && e < 300 || 304 === e, i && (b = function (e, t, n) {
              for (var r, i, o, s, a = e.contents, u = e.dataTypes;
                "*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
              if (r)
                for (i in a)
                  if (a[i] && a[i].test(r)) {
                    u.unshift(i);
                    break
                  } if (u[0] in n) o = u[0];
              else {
                for (i in n) {
                  if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                  }
                  s || (s = i)
                }
                o = o || s
              }
              if (o) return o !== u[0] && u.unshift(o), n[o]
            }(p, C, i)), b = function (e, t, n, r) {
              var i, o, s, a, u, l = {},
                c = e.dataTypes.slice();
              if (c[1])
                for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
              for (o = c.shift(); o;)
                if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                  if ("*" === o) o = u;
                  else if ("*" !== u && u !== o) {
                if (!(s = l[u + " " + o] || l["* " + o]))
                  for (i in l)
                    if ((a = i.split(" "))[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                      !0 === s ? s = l[i] : !0 !== l[i] && (o = a[0], c.unshift(a[1]));
                      break
                    } if (!0 !== s)
                  if (s && e.throws) t = s(t);
                  else try {
                    t = s(t)
                  } catch (E) {
                    return {
                      state: "parsererror",
                      error: s ? E : "No conversion from " + u + " to " + o
                    }
                  }
              }
              return {
                state: "success",
                data: t
              }
            }(p, b, C, l), l ? (p.ifModified && ((T = C.getResponseHeader("Last-Modified")) && (d.lastModified[o] = T), (T = C.getResponseHeader("etag")) && (d.etag[o] = T)), 204 === e || "HEAD" === p.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = b.state, f = b.data, l = !(x = b.error))) : (x = k, !e && k || (k = "error", e < 0 && (e = 0))), C.status = e, C.statusText = (n || k) + "", l ? v.resolveWith(h, [f, k, C]) : v.rejectWith(h, [C, k, x]), C.statusCode(y), y = void 0, c && g.trigger(l ? "ajaxSuccess" : "ajaxError", [C, p, l ? f : x]), m.fireWith(h, [C, k]), c && (g.trigger("ajaxComplete", [C, p]), --d.active || d.event.trigger("ajaxStop")))
          }
          return C
        },
        getJSON: function (e, t, n) {
          return d.get(e, t, n, "json")
        },
        getScript: function (e, t) {
          return d.get(e, void 0, t, "script")
        }
      }), d.each(["get", "post"], function (e, t) {
        d[t] = function (e, n, r, i) {
          return d.isFunction(n) && (i = i || r, r = n, n = void 0), d.ajax(d.extend({
            url: e,
            type: t,
            dataType: i,
            data: n,
            success: r
          }, d.isPlainObject(e) && e))
        }
      }), d._evalUrl = function (e) {
        return d.ajax({
          url: e,
          type: "GET",
          dataType: "script",
          async: !1,
          global: !1,
          throws: !0
        })
      }, d.fn.extend({
        wrapAll: function (e) {
          var t;
          return d.isFunction(e) ? this.each(function (t) {
            d(this).wrapAll(e.call(this, t))
          }) : (this[0] && (t = d(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
            for (var e = this; e.firstElementChild;) e = e.firstElementChild;
            return e
          }).append(this)), this)
        },
        wrapInner: function (e) {
          return d.isFunction(e) ? this.each(function (t) {
            d(this).wrapInner(e.call(this, t))
          }) : this.each(function () {
            var t = d(this),
              n = t.contents();
            n.length ? n.wrapAll(e) : t.append(e)
          })
        },
        wrap: function (e) {
          var t = d.isFunction(e);
          return this.each(function (n) {
            d(this).wrapAll(t ? e.call(this, n) : e)
          })
        },
        unwrap: function () {
          return this.parent().each(function () {
            d.nodeName(this, "body") || d(this).replaceWith(this.childNodes)
          }).end()
        }
      }), d.expr.filters.hidden = function (e) {
        return !d.expr.filters.visible(e)
      }, d.expr.filters.visible = function (e) {
        return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
      };
      var wt = /%20/g,
        Tt = /\[\]$/,
        Ct = /\r?\n/g,
        kt = /^(?:submit|button|image|reset|file)$/i,
        Et = /^(?:input|select|textarea|keygen)/i;

      function Nt(e, t, n, r) {
        var i;
        if (d.isArray(t)) d.each(t, function (t, i) {
          n || Tt.test(e) ? r(e, i) : Nt(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== d.type(t)) r(e, t);
        else
          for (i in t) Nt(e + "[" + i + "]", t[i], n, r)
      }
      d.param = function (e, t) {
        var n, r = [],
          i = function (e, t) {
            t = d.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
          };
        if (void 0 === t && (t = d.ajaxSettings && d.ajaxSettings.traditional), d.isArray(e) || e.jquery && !d.isPlainObject(e)) d.each(e, function () {
          i(this.name, this.value)
        });
        else
          for (n in e) Nt(n, e[n], t, i);
        return r.join("&").replace(wt, "+")
      }, d.fn.extend({
        serialize: function () {
          return d.param(this.serializeArray())
        },
        serializeArray: function () {
          return this.map(function () {
            var e = d.prop(this, "elements");
            return e ? d.makeArray(e) : this
          }).filter(function () {
            var e = this.type;
            return this.name && !d(this).is(":disabled") && Et.test(this.nodeName) && !kt.test(e) && (this.checked || !V.test(e))
          }).map(function (e, t) {
            var n = d(this).val();
            return null == n ? null : d.isArray(n) ? d.map(n, function (e) {
              return {
                name: t.name,
                value: e.replace(Ct, "\r\n")
              }
            }) : {
              name: t.name,
              value: n.replace(Ct, "\r\n")
            }
          }).get()
        }
      }), d.ajaxSettings.xhr = function () {
        try {
          return new t.XMLHttpRequest
        } catch (e) {}
      };
      var St = {
          0: 200,
          1223: 204
        },
        jt = d.ajaxSettings.xhr();
      p.cors = !!jt && "withCredentials" in jt, p.ajax = jt = !!jt, d.ajaxTransport(function (e) {
        var n, r;
        if (p.cors || jt && !e.crossDomain) return {
          send: function (i, o) {
            var s, a = e.xhr();
            if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
              for (s in e.xhrFields) a[s] = e.xhrFields[s];
            for (s in e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), i) a.setRequestHeader(s, i[s]);
            n = function (e) {
              return function () {
                n && (n = r = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? o(0, "error") : o(a.status, a.statusText) : o(St[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                  binary: a.response
                } : {
                  text: a.responseText
                }, a.getAllResponseHeaders()))
              }
            }, a.onload = n(), r = a.onerror = n("error"), void 0 !== a.onabort ? a.onabort = r : a.onreadystatechange = function () {
              4 === a.readyState && t.setTimeout(function () {
                n && r()
              })
            }, n = n("abort");
            try {
              a.send(e.hasContent && e.data || null)
            } catch (u) {
              if (n) throw u
            }
          },
          abort: function () {
            n && n()
          }
        }
      }), d.ajaxSetup({
        accepts: {
          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
          script: /\b(?:java|ecma)script\b/
        },
        converters: {
          "text script": function (e) {
            return d.globalEval(e), e
          }
        }
      }), d.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
      }), d.ajaxTransport("script", function (e) {
        var t, n;
        if (e.crossDomain) return {
          send: function (r, o) {
            t = d("<script>").prop({
              charset: e.scriptCharset,
              src: e.url
            }).on("load error", n = function (e) {
              t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
            }), i.head.appendChild(t[0])
          },
          abort: function () {
            n && n()
          }
        }
      });
      var Dt = [],
        At = /(=)\?(?=&|$)|\?\?/;
      d.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
          var e = Dt.pop() || d.expando + "_" + at++;
          return this[e] = !0, e
        }
      }), d.ajaxPrefilter("json jsonp", function (e, n, r) {
        var i, o, s, a = !1 !== e.jsonp && (At.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && At.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = d.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(At, "$1" + i) : !1 !== e.jsonp && (e.url += (ut.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function () {
          return s || d.error(i + " was not called"), s[0]
        }, e.dataTypes[0] = "json", o = t[i], t[i] = function () {
          s = arguments
        }, r.always(function () {
          void 0 === o ? d(t).removeProp(i) : t[i] = o, e[i] && (e.jsonpCallback = n.jsonpCallback, Dt.push(i)), s && d.isFunction(o) && o(s[0]), s = o = void 0
        }), "script"
      }), d.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || i;
        var r = C.exec(e),
          o = !n && [];
        return r ? [t.createElement(r[1])] : (r = ne([e], t, o), o && o.length && d(o).remove(), d.merge([], r.childNodes))
      };
      var qt = d.fn.load;

      function Lt(e) {
        return d.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
      }
      d.fn.load = function (e, t, n) {
        if ("string" != typeof e && qt) return qt.apply(this, arguments);
        var r, i, o, s = this,
          a = e.indexOf(" ");
        return a > -1 && (r = d.trim(e.slice(a)), e = e.slice(0, a)), d.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), s.length > 0 && d.ajax({
          url: e,
          type: i || "GET",
          dataType: "html",
          data: t
        }).done(function (e) {
          o = arguments, s.html(r ? d("<div>").append(d.parseHTML(e)).find(r) : e)
        }).always(n && function (e, t) {
          s.each(function () {
            n.apply(this, o || [e.responseText, t, e])
          })
        }), this
      }, d.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        d.fn[t] = function (e) {
          return this.on(t, e)
        }
      }), d.expr.filters.animated = function (e) {
        return d.grep(d.timers, function (t) {
          return e === t.elem
        }).length
      }, d.offset = {
        setOffset: function (e, t, n) {
          var r, i, o, s, a, u, l = d.css(e, "position"),
            c = d(e),
            f = {};
          "static" === l && (e.style.position = "relative"), a = c.offset(), o = d.css(e, "top"), u = d.css(e, "left"), ("absolute" === l || "fixed" === l) && (o + u).indexOf("auto") > -1 ? (s = (r = c.position()).top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), d.isFunction(t) && (t = t.call(e, n, d.extend({}, a))), null != t.top && (f.top = t.top - a.top + s), null != t.left && (f.left = t.left - a.left + i), "using" in t ? t.using.call(e, f) : c.css(f)
        }
      }, d.fn.extend({
        offset: function (e) {
          if (arguments.length) return void 0 === e ? this : this.each(function (t) {
            d.offset.setOffset(this, e, t)
          });
          var t, n, r = this[0],
            i = {
              top: 0,
              left: 0
            },
            o = r && r.ownerDocument;
          return o ? (t = o.documentElement, d.contains(t, r) ? (i = r.getBoundingClientRect(), n = Lt(o), {
            top: i.top + n.pageYOffset - t.clientTop,
            left: i.left + n.pageXOffset - t.clientLeft
          }) : i) : void 0
        },
        position: function () {
          if (this[0]) {
            var e, t, n = this[0],
              r = {
                top: 0,
                left: 0
              };
            return "fixed" === d.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), d.nodeName(e[0], "html") || (r = e.offset()), r.top += d.css(e[0], "borderTopWidth", !0), r.left += d.css(e[0], "borderLeftWidth", !0)), {
              top: t.top - r.top - d.css(n, "marginTop", !0),
              left: t.left - r.left - d.css(n, "marginLeft", !0)
            }
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (var e = this.offsetParent; e && "static" === d.css(e, "position");) e = e.offsetParent;
            return e || De
          })
        }
      }), d.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
      }, function (e, t) {
        var n = "pageYOffset" === t;
        d.fn[e] = function (r) {
          return O(this, function (e, r, i) {
            var o = Lt(e);
            if (void 0 === i) return o ? o[t] : e[r];
            o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i
          }, e, r, arguments.length)
        }
      }), d.each(["top", "left"], function (e, t) {
        d.cssHooks[t] = qe(p.pixelPosition, function (e, n) {
          if (n) return n = Ae(e, t), Ne.test(n) ? d(e).position()[t] + "px" : n
        })
      }), d.each({
        Height: "height",
        Width: "width"
      }, function (e, t) {
        d.each({
          padding: "inner" + e,
          content: t,
          "": "outer" + e
        }, function (n, r) {
          d.fn[r] = function (r, i) {
            var o = arguments.length && (n || "boolean" != typeof r),
              s = n || (!0 === r || !0 === i ? "margin" : "border");
            return O(this, function (t, n, r) {
              var i;
              return d.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? d.css(t, n, s) : d.style(t, n, r, s)
            }, t, o ? r : void 0, o, null)
          }
        })
      }), d.fn.extend({
        bind: function (e, t, n) {
          return this.on(e, null, t, n)
        },
        unbind: function (e, t) {
          return this.off(e, null, t)
        },
        delegate: function (e, t, n, r) {
          return this.on(t, e, n, r)
        },
        undelegate: function (e, t, n) {
          return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        size: function () {
          return this.length
        }
      }), d.fn.andSelf = d.fn.addBack, "function" == typeof e && e.amd && e("jquery", [], function () {
        return d
      });
      var Ht = t.jQuery,
        Ot = t.$;
      return d.noConflict = function (e) {
        return t.$ === d && (t.$ = Ot), e && t.jQuery === d && (t.jQuery = Ht), d
      }, n || (t.jQuery = t.$ = d), d
    });
  }, {}],
  "wljL": [function (require, module, exports) {
    var define;
    var i;
    ! function (e) {
      "use strict";
      "function" == typeof i && i.amd ? i(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function (i) {
      "use strict";
      var e = window.Slick || {};
      (e = function () {
        var e = 0;
        return function (t, o) {
          var s, n = this;
          n.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: i(t),
            appendDots: i(t),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function (e, t) {
              return i('<button type="button" />').text(t + 1)
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
          }, n.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
          }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
      }()).prototype.activateADA = function () {
        this.$slideTrack.find(".slick-active").attr({
          "aria-hidden": "false"
        }).find("a, input, button, select").attr({
          tabindex: "0"
        })
      }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) {
          i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
      }, e.prototype.animateHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
          var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
          i.$list.animate({
            height: e
          }, i.options.speed)
        }
      }, e.prototype.animateSlide = function (e, t) {
        var o = {},
          s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
          left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
          top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
          animStart: s.currentLeft
        }).animate({
          animStart: e
        }, {
          duration: s.options.speed,
          easing: s.options.easing,
          step: function (i) {
            i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
          },
          complete: function () {
            t && t.call()
          }
        })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () {
          s.disableTransition(), t.call()
        }, s.options.speed))
      }, e.prototype.getNavTarget = function () {
        var e = this.options.asNavFor;
        return e && null !== e && (e = i(e).not(this.$slider)), e
      }, e.prototype.asNavFor = function (e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function () {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0)
        })
      }, e.prototype.applyTransition = function (i) {
        var e = this,
          t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
      }, e.prototype.autoPlay = function () {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
      }, e.prototype.autoPlayClear = function () {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
      }, e.prototype.autoPlayIterator = function () {
        var i = this,
          e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
      }, e.prototype.buildArrows = function () {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
          "aria-disabled": "true",
          tabindex: "-1"
        }))
      }, e.prototype.buildDots = function () {
        var e, t, o = this;
        if (!0 === o.options.dots && o.slideCount > o.options.slidesToShow) {
          for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
          o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
      }, e.prototype.buildOut = function () {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) {
          i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
      }, e.prototype.buildRows = function () {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 0) {
          for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
            var d = document.createElement("div");
            for (e = 0; e < l.options.rows; e++) {
              var a = document.createElement("div");
              for (t = 0; t < l.options.slidesPerRow; t++) {
                var c = i * r + (e * l.options.slidesPerRow + t);
                n.get(c) && a.appendChild(n.get(c))
              }
              d.appendChild(a)
            }
            o.appendChild(d)
          }
          l.$slider.empty().append(o), l.$slider.children().children().children().css({
            width: 100 / l.options.slidesPerRow + "%",
            display: "inline-block"
          })
        }
      }, e.prototype.checkResponsive = function (e, t) {
        var o, s, n, r = this,
          l = !1,
          d = r.$slider.width(),
          a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
          for (o in s = null, r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
          null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
      }, e.prototype.changeSlide = function (e, t) {
        var o, s, n = this,
          r = i(e.currentTarget);
        switch (r.is("a") && e.preventDefault(), r.is("li") || (r = r.closest("li")), o = n.slideCount % n.options.slidesToScroll != 0 ? 0 : (n.slideCount - n.currentSlide) % n.options.slidesToScroll, e.data.message) {
          case "previous":
            s = 0 === o ? n.options.slidesToScroll : n.options.slidesToShow - o, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide - s, !1, t);
            break;
          case "next":
            s = 0 === o ? n.options.slidesToScroll : o, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide + s, !1, t);
            break;
          case "index":
            var l = 0 === e.data.index ? 0 : e.data.index || r.index() * n.options.slidesToScroll;
            n.slideHandler(n.checkNavigable(l), !1, t), r.children().trigger("focus");
            break;
          default:
            return
        }
      }, e.prototype.checkNavigable = function (i) {
        var e, t;
        if (t = 0, i > (e = this.getNavigableIndexes())[e.length - 1]) i = e[e.length - 1];
        else
          for (var o in e) {
            if (i < e[o]) {
              i = t;
              break
            }
            t = e[o]
          }
        return i
      }, e.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
      }, e.prototype.cleanUpSlideEvents = function () {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
      }, e.prototype.cleanUpRows = function () {
        var i, e = this;
        e.options.rows > 0 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
      }, e.prototype.clickHandler = function (i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
      }, e.prototype.destroy = function (e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
          i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
      }, e.prototype.disableTransition = function (i) {
        var e = this,
          t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
      }, e.prototype.fadeSlide = function (i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
          zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
          opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
          opacity: 1,
          zIndex: t.options.zIndex
        }), e && setTimeout(function () {
          t.disableTransition(i), e.call()
        }, t.options.speed))
      }, e.prototype.fadeSlideOut = function (i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
          opacity: 0,
          zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
          opacity: 0,
          zIndex: e.options.zIndex - 2
        }))
      }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
      }, e.prototype.focusHandler = function () {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) {
          t.stopImmediatePropagation();
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
          }, 0)
        })
      }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
        return this.currentSlide
      }, e.prototype.getDotCount = function () {
        var i = this,
          e = 0,
          t = 0,
          o = 0;
        if (!0 === i.options.infinite)
          if (i.slideCount <= i.options.slidesToShow) ++o;
          else
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
          for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
      }, e.prototype.getLeft = function (i) {
        var e, t, o, s, n = this,
          r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
      }, e.prototype.getOption = e.prototype.slickGetOption = function (i) {
        return this.options[i]
      }, e.prototype.getNavigableIndexes = function () {
        var i, e = this,
          t = 0,
          o = 0,
          s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
      }, e.prototype.getSlick = function () {
        return this
      }, e.prototype.getSlideCount = function () {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
          if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1
        }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
      }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
        this.changeSlide({
          data: {
            message: "index",
            index: parseInt(i)
          }
        }, e)
      }, e.prototype.init = function (e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
      }, e.prototype.initADA = function () {
        var e = this,
          t = Math.ceil(e.slideCount / e.options.slidesToShow),
          o = e.getNavigableIndexes().filter(function (i) {
            return i >= 0 && i < e.slideCount
          });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
          "aria-hidden": "true",
          tabindex: "-1"
        }).find("a, input, button, select").attr({
          tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
          var s = o.indexOf(t);
          if (i(this).attr({
              role: "tabpanel",
              id: "slick-slide" + e.instanceUid + t,
              tabindex: -1
            }), -1 !== s) {
            var n = "slick-slide-control" + e.instanceUid + s;
            i("#" + n).length && i(this).attr({
              "aria-describedby": n
            })
          }
        }), e.$dots.attr("role", "tablist").find("li").each(function (s) {
          var n = o[s];
          i(this).attr({
            role: "presentation"
          }), i(this).find("button").first().attr({
            role: "tab",
            id: "slick-slide-control" + e.instanceUid + s,
            "aria-controls": "slick-slide" + e.instanceUid + n,
            "aria-label": s + 1 + " of " + t,
            "aria-selected": null,
            tabindex: "-1"
          })
        }).eq(e.currentSlide).find("button").attr({
          "aria-selected": "true",
          tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.options.focusOnChange ? e.$slides.eq(s).attr({
          tabindex: "0"
        }) : e.$slides.eq(s).removeAttr("tabindex");
        e.activateADA()
      }, e.prototype.initArrowEvents = function () {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
          message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
          message: "next"
        }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
      }, e.prototype.initDotEvents = function () {
        var e = this;
        !0 === e.options.dots && e.slideCount > e.options.slidesToShow && (i("li", e.$dots).on("click.slick", {
          message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && e.slideCount > e.options.slidesToShow && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
      }, e.prototype.initSlideEvents = function () {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
      }, e.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
          action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
          action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
          action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
          action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
      }, e.prototype.initUI = function () {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
      }, e.prototype.keyHandler = function (i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
          data: {
            message: !0 === e.options.rtl ? "next" : "previous"
          }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
          data: {
            message: !0 === e.options.rtl ? "previous" : "next"
          }
        }))
      }, e.prototype.lazyLoad = function () {
        var e, t, o, s = this;

        function n(e) {
          i("img[data-lazy]", e).each(function () {
            var e = i(this),
              t = i(this).attr("data-lazy"),
              o = i(this).attr("data-srcset"),
              n = i(this).attr("data-sizes") || s.$slider.attr("data-sizes"),
              r = document.createElement("img");
            r.onload = function () {
              e.animate({
                opacity: 0
              }, 100, function () {
                o && (e.attr("srcset", o), n && e.attr("sizes", n)), e.attr("src", t).animate({
                  opacity: 1
                }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                }), s.$slider.trigger("lazyLoaded", [s, e, t])
              })
            }, r.onerror = function () {
              e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, e, t])
            }, r.src = t
          })
        }
        if (!0 === s.options.centerMode ? !0 === s.options.infinite ? o = (t = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (t = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), o = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (t = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, o = Math.ceil(t + s.options.slidesToShow), !0 === s.options.fade && (t > 0 && t--, o <= s.slideCount && o++)), e = s.$slider.find(".slick-slide").slice(t, o), "anticipated" === s.options.lazyLoad)
          for (var r = t - 1, l = o, d = s.$slider.find(".slick-slide"), a = 0; a < s.options.slidesToScroll; a++) r < 0 && (r = s.slideCount - 1), e = (e = e.add(d.eq(r))).add(d.eq(l)), r--, l++;
        n(e), s.slideCount <= s.options.slidesToShow ? n(s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? n(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && n(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow))
      }, e.prototype.loadSlider = function () {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
          opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
      }, e.prototype.next = e.prototype.slickNext = function () {
        this.changeSlide({
          data: {
            message: "next"
          }
        })
      }, e.prototype.orientationChange = function () {
        this.checkResponsive(), this.setPosition()
      }, e.prototype.pause = e.prototype.slickPause = function () {
        this.autoPlayClear(), this.paused = !0
      }, e.prototype.play = e.prototype.slickPlay = function () {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
      }, e.prototype.postSlide = function (e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
      }, e.prototype.prev = e.prototype.slickPrev = function () {
        this.changeSlide({
          data: {
            message: "previous"
          }
        })
      }, e.prototype.preventDefault = function (i) {
        i.preventDefault()
      }, e.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
          d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () {
          s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
        }, r.onerror = function () {
          e < 3 ? setTimeout(function () {
            l.progressiveLazyLoad(e + 1)
          }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
      }, e.prototype.refresh = function (e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
          currentSlide: t
        }), s.init(), e || s.changeSlide({
          data: {
            message: "index",
            index: t
          }
        }, !1)
      }, e.prototype.registerBreakpoints = function () {
        var e, t, o, s = this,
          n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
          for (e in s.respondTo = s.options.respondTo || "window", n)
            if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
              for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
              s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
            } s.breakpoints.sort(function (i, e) {
            return s.options.mobileFirst ? i - e : e - i
          })
        }
      }, e.prototype.reinit = function () {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
      }, e.prototype.resize = function () {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
          e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
      }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
      }, e.prototype.setCSS = function (i) {
        var e, t, o = this,
          s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
      }, e.prototype.setDimensions = function () {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
          padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
          padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
      }, e.prototype.setFade = function () {
        var e, t = this;
        t.$slides.each(function (o, s) {
          e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
            position: "relative",
            right: e,
            top: 0,
            zIndex: t.options.zIndex - 2,
            opacity: 0
          }) : i(s).css({
            position: "relative",
            left: e,
            top: 0,
            zIndex: t.options.zIndex - 2,
            opacity: 0
          })
        }), t.$slides.eq(t.currentSlide).css({
          zIndex: t.options.zIndex - 1,
          opacity: 1
        })
      }, e.prototype.setHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
          var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
          i.$list.css("height", e)
        }
      }, e.prototype.setOption = e.prototype.slickSetOption = function () {
        var e, t, o, s, n, r = this,
          l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function (i, e) {
          r.options[i] = e
        });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
              r.options.responsive.push(s[t])
            } l && (r.unload(), r.reinit())
      }, e.prototype.setPosition = function () {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
      }, e.prototype.setProps = function () {
        var i = this,
          e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
      }, e.prototype.setSlideClasses = function (i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
          var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
          e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
      }, e.prototype.setupInfinite = function () {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
          for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
          for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
          s.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
            i(this).attr("id", "")
          })
        }
      }, e.prototype.interrupt = function (i) {
        i || this.autoPlay(), this.interrupted = i
      }, e.prototype.selectHandler = function (e) {
        var t = this,
          o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
          s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
      }, e.prototype.slideHandler = function (i, e, t) {
        var o, s, n, r, l, d, a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
          if (!1 === e && a.asNavFor(i), o = i, l = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function () {
            a.postSlide(o)
          }) : a.postSlide(o));
          else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function () {
          a.postSlide(o)
        }) : a.postSlide(o));
        else {
          if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (d = (d = a.getNavTarget()).slick("getSlick")).slideCount <= d.options.slidesToShow && d.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function () {
            a.postSlide(s)
          })) : a.postSlide(s), void a.animateHeight();
          !0 !== t && a.slideCount > a.options.slidesToShow ? a.animateSlide(l, function () {
            a.postSlide(s)
          }) : a.postSlide(s)
        }
      }, e.prototype.startLoad = function () {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
      }, e.prototype.swipeDirection = function () {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
      }, e.prototype.swipeEnd = function (i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
          switch (t = o.swipeDirection()) {
            case "left":
            case "down":
              e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
              break;
            case "right":
            case "up":
              e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
          }
          "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
      }, e.prototype.swipeHandler = function (i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i)
        }
      }, e.prototype.swipeMove = function (i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
      }, e.prototype.swipeStart = function (i) {
        var e, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
      }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
      }, e.prototype.unload = function () {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
      }, e.prototype.unslick = function (i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
      }, e.prototype.updateArrows = function () {
        var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
      }, e.prototype.updateDots = function () {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
      }, e.prototype.visibility = function () {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
      }, i.fn.slick = function () {
        var i, t, o = this,
          s = arguments[0],
          n = Array.prototype.slice.call(arguments, 1),
          r = o.length;
        for (i = 0; i < r; i++)
          if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        return o
      }
    });
  }, {
    "jquery": "HlZQ"
  }],
  "sC8V": [function (require, module, exports) {

  }, {}],
  "g5I+": [function (require, module, exports) {

    var t, e, n = module.exports = {};

    function r() {
      throw new Error("setTimeout has not been defined")
    }

    function o() {
      throw new Error("clearTimeout has not been defined")
    }

    function i(e) {
      if (t === setTimeout) return setTimeout(e, 0);
      if ((t === r || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
      try {
        return t(e, 0)
      } catch (n) {
        try {
          return t.call(null, e, 0)
        } catch (n) {
          return t.call(this, e, 0)
        }
      }
    }

    function u(t) {
      if (e === clearTimeout) return clearTimeout(t);
      if ((e === o || !e) && clearTimeout) return e = clearTimeout, clearTimeout(t);
      try {
        return e(t)
      } catch (n) {
        try {
          return e.call(null, t)
        } catch (n) {
          return e.call(this, t)
        }
      }
    }! function () {
      try {
        t = "function" == typeof setTimeout ? setTimeout : r
      } catch (n) {
        t = r
      }
      try {
        e = "function" == typeof clearTimeout ? clearTimeout : o
      } catch (n) {
        e = o
      }
    }();
    var c, s = [],
      l = !1,
      a = -1;

    function f() {
      l && c && (l = !1, c.length ? s = c.concat(s) : a = -1, s.length && h())
    }

    function h() {
      if (!l) {
        var t = i(f);
        l = !0;
        for (var e = s.length; e;) {
          for (c = s, s = []; ++a < e;) c && c[a].run();
          a = -1, e = s.length
        }
        c = null, l = !1, u(t)
      }
    }

    function m(t, e) {
      this.fun = t, this.array = e
    }

    function p() {}
    n.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      s.push(new m(t, e)), 1 !== s.length || l || i(h)
    }, m.prototype.run = function () {
      this.fun.apply(null, this.array)
    }, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = p, n.addListener = p, n.once = p, n.off = p, n.removeListener = p, n.removeAllListeners = p, n.emit = p, n.prependListener = p, n.prependOnceListener = p, n.listeners = function (t) {
      return []
    }, n.binding = function (t) {
      throw new Error("process.binding is not supported")
    }, n.cwd = function () {
      return "/"
    }, n.chdir = function (t) {
      throw new Error("process.chdir is not supported")
    }, n.umask = function () {
      return 0
    };
  }, {}],
  "Rhi8": [function (require, module, exports) {
    var process = require("process");
    var __dirname = "/Users/siddhant/Work/melzo/melzo-static-pages/node_modules/webp-converter";
    var e = require("process"),
      i = "/Users/siddhant/Work/melzo/melzo-static-pages/node_modules/webp-converter",
      b = function () {
        return "darwin" === e.platform ? i + "/lib/libwebp_osx/bin/cwebp" : "linux" === e.platform ? i + "/lib/libwebp_linux/bin/cwebp" : "win32" === e.platform ? "x64" === e.arch ? i + "/lib/libwebp_win64/bin/cwebp.exe" : i + "/lib/libwebp_win32/bin/cwebp.exe" : void console.log("Unsupported platform:", e.platform, e.arch)
      };
    module.exports = b;
  }, {
    "process": "g5I+"
  }],
  "l3JF": [function (require, module, exports) {
    var process = require("process");
    var __dirname = "/Users/siddhant/Work/melzo/melzo-static-pages/node_modules/webp-converter";
    var e = require("process"),
      i = "/Users/siddhant/Work/melzo/melzo-static-pages/node_modules/webp-converter",
      b = function () {
        return "darwin" === e.platform ? i + "/lib/libwebp_osx/bin/dwebp" : "linux" === e.platform ? i + "/lib/libwebp_linux/bin/dwebp" : "win32" === e.platform ? "x64" === e.arch ? i + "/lib/libwebp_win64/bin/dwebp.exe" : i + "/lib/libwebp_win32/bin/dwebp.exe" : void console.log("Unsupported platform:", e.platform, e.arch)
      };
    module.exports = b;
  }, {
    "process": "g5I+"
  }],
  "cGxK": [function (require, module, exports) {
    var process = require("process");
    var __dirname = "/Users/siddhant/Work/melzo/melzo-static-pages/node_modules/webp-converter";
    var e = require("process"),
      i = "/Users/siddhant/Work/melzo/melzo-static-pages/node_modules/webp-converter",
      b = function () {
        return "darwin" === e.platform ? i + "/lib/libwebp_osx/bin/gif2webp" : "linux" === e.platform ? i + "/lib/libwebp_linux/bin/gif2webp" : "win32" === e.platform ? "x64" === e.arch ? i + "/lib/libwebp_win64/bin/gif2webp.exe" : i + "/lib/libwebp_win32/bin/gif2webp.exe" : void console.log("Unsupported platform:", e.platform, e.arch)
      };
    module.exports = b;
  }, {
    "process": "g5I+"
  }],
  "Ixv+": [function (require, module, exports) {
    var process = require("process");
    var i = require("process"),
      b = function () {
        return "darwin" === i.platform ? "lib/libwebp_osx/bin/webpmux" : "linux" === i.platform ? "lib/libwebp_linux/bin/webpmux" : "win32" === i.platform ? "x64" === i.arch ? "lib/libwebp_win64/bin/webpmux.exe" : "lib/libwebp_win32/bin/webpmux.exe" : void console.log("Unsupported platform:", i.platform, i.arch)
      };
    module.exports = b;
  }, {
    "process": "g5I+"
  }],
  "SReT": [function (require, module, exports) {
    var e = require("child_process").execFile,
      o = require("./cwebp.js"),
      t = require("./dwebp.js"),
      r = require("./gwebp.js"),
      n = require("./webpmux.js");
    module.exports.cwebp = function (t, i, r, n) {
      var s = r + " " + t + " -o " + i;
      console.log(s), e(o(), s.split(/\s+/), function (e, o, t) {
        e ? n("101", e) : n("100", "")
      })
    }, module.exports.dwebp = function (o, i, r, n) {
      var s = o + " " + r + " " + i;
      console.log(s), e(t(), s.split(/\s+/), function (e, o, t) {
        e ? n("101", e) : n("100", "")
      })
    }, module.exports.gwebp = function (o, t, i, n) {
      var s = i + " " + o + " -o " + t;
      e(r(), s.split(/\s+/), function (e, o, t) {
        e ? n("101", e) : n("100", "")
      })
    }, module.exports.webpmux_add = function (o, t, i, r, s) {
      var u = "-set " + r + " " + i + " " + o + " -o " + t;
      e(n(), u.split(/\s+/), function (e, o, t) {
        e ? s("101", e) : s("100", "")
      })
    }, module.exports.webpmux_extract = function (o, t, i, r) {
      var s = "-get " + i + " " + o + " -o " + t;
      e(n(), s.split(/\s+/), function (e, o, t) {
        e ? r("101", e) : r("100", "")
      })
    }, module.exports.webpmux_strip = function (o, t, i, r) {
      var s = "-strip " + i + " " + o + " -o " + t;
      e(n(), s.split(/\s+/), function (e, o, t) {
        e ? r("101", e) : r("100", "")
      })
    }, module.exports.webpmux_animate = function (o, t, r, s, u) {
      var p = "-frame " + o[0],
        l = o.length;
      for (i = 1; i < l; i++) p = p + " -frame " + o[i], console.log(p);
      var c = p + " -loop " + r + " -bgcolor " + s + " -o " + t;
      e(n(), c.split(/\s+/), function (e, o, t) {
        e ? u("101", e) : u("100", "")
      })
    }, module.exports.webpmux_getframe = function (o, t, i, r) {
      var s = "-get frame " + i + " " + o + " -o " + t;
      e(n(), s.split(/\s+/), function (e, o, t) {
        e ? r("101", e) : r("100", "")
      })
    };
  }, {
    "child_process": "sC8V",
    "./cwebp.js": "Rhi8",
    "./dwebp.js": "l3JF",
    "./gwebp.js": "cGxK",
    "./webpmux.js": "Ixv+"
  }],
  "GJkW": [function (require, module, exports) {
    "use strict";
    var e = t(require("jquery"));

    function t(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    e.default.fn.grtyoutube = function (t) {
      return this.each(function () {
        var u = (0, e.default)(this).attr("youtubeid"),
          o = e.default.extend({
            videoID: u,
            autoPlay: !0,
            theme: "dark"
          }, t);
        !0 === o.autoPlay ? o.autoPlay = 1 : !1 === o.autoPlay && (o.autoPlay = 0), "dark" === o.theme ? o.theme = "grtyoutube-dark-theme" : "light" === o.theme && (o.theme = "grtyoutube-light-theme"), u && (0, e.default)(this).on("click", function () {
          (0, e.default)("body").append('<div class="grtyoutube-popup ' + o.theme + '"><div class="grtyoutube-popup-content"><span class="grtyoutube-popup-close"></span><iframe class="grtyoutube-iframe" src="https://www.youtube.com/embed/' + o.videoID + "?rel=0&wmode=transparent&autoplay=" + o.autoPlay + '&iv_load_policy=3" allowfullscreen frameborder="0"></iframe></div></div>')
        }), (0, e.default)(this).on("click", function (t) {
          t.preventDefault(), (0, e.default)(".grtyoutube-popup-close, .grtyoutube-popup").click(function () {
            (0, e.default)(".grtyoutube-popup").remove()
          })
        }), (0, e.default)(document).keyup(function (t) {
          27 == t.keyCode && (0, e.default)(".grtyoutube-popup").remove()
        })
      })
    };
  }, {
    "jquery": "HlZQ"
  }],
  "TZHW": [function (require, module, exports) {

  }, {
    "./icon-close-white.png": [
      ["icon-close-white.c3d5f977.png", "0wM9"], "0wM9"
    ],
    "./icon-close-black.png": [
      ["icon-close-black.cb81ab58.png", "lZXj"], "lZXj"
    ]
  }],
  "xqVe": [function (require, module, exports) {
    "use strict";
    require("../scss/mlz-business.scss"), require("../scripts/form-submission-handler");
    var e = t(require("jquery"));

    function t(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    require("slick-carousel"), require("webp-converter"), require("./grt-youtube-popup"), require("./grt-youtube-popup.css");
    var i = {
      init: function (e, t) {
        this.slickCall(), this.menuOpen(), this.headerFirstsection()
      },
      footertoggle: function (t, i) {
        function s(t, i) {
          t < 576 && (0, e.default)(".js--footer-toggle").click(function () {
            (0, e.default)(this).siblings(".footer--details").slideToggle()
          })
        }
        s(t), (0, e.default)(window).resize(function () {
          s(t)
        })
      },
      leaveViewport: function () {
        function t() {
          var t = (0, e.default)(".hero-banner"),
            i = t.offset();
          t.outerHeight(), (0, e.default)(window).scrollTop();
          i.top
        }
        window.addEventListener("resize", t, !1), window.addEventListener("scroll", t, !1, {
          passive: !0
        })
      },
      enterViewport: function () {
        function t() {
          var t = (0, e.default)('[data-first-section="true"]'),
            i = t.offset();
          (0, e.default)(window).scrollTop() > i.top && console.log(t)
        }
        window.addEventListener("resize", t, !1), window.addEventListener("scroll", t, !1, {
          passive: !0
        })
      },
      headerFirstsection: function () {
        function t() {
          var t = (0, e.default)('[data-first-layout="true"]').offset();
          (0, e.default)(window).scrollTop() > t.top - 75 ? (0, e.default)("header").addClass("is--sticked") : (0, e.default)("header").removeClass("is--sticked")
        }(0, e.default)(window).on("scroll", {
          passive: !0
        }, function () {
          t()
        }), (0, e.default)(window).resize(function () {
          t()
        })
      },
      menuOpen: function () {
        (0, e.default)(".navigation--head").click(function () {
          (0, e.default)("header").toggleClass("is--open"), (0, e.default)(".navigation--items").fadeToggle("fast")
        })
      },
      verifyEmail: function () {
        var e = document.getElementById("js--banner-form"),
          t = document.getElementById("js--banner-email"),
          i = document.getElementById("js--banner-submit"),
          s = document.getElementById("js--subscription-msg");
        t.addEventListener("blur", function (e) {
          console.log("blur"), 0 == this.value.length && (s.innerHTML = "validtext@webdomain.extention", s.classList.remove("is--not-valid"))
        }), t.addEventListener("keyup", function (e) {
          isValidEmail = t.checkValidity(), isValidEmail ? (i.removeAttribute("tabindex"), i.className = i.className.replace(/\is--disabled\b/g, ""), s.innerHTML = "Valid format", s.classList.remove("is--not-valid"), console.log("verified")) : (i.setAttribute("tabindex", -1), i.classList.add("is--disabled"), s.classList.add("is--not-valid"), s.innerHTML = "Not a Valid format yet", console.log("not-verified"))
        }), i.addEventListener("click", function (t) {
          e.submit()
        })
      },
      slickCall: function () {
        (0, e.default)(".js--testimonial-carousel").slick({
          dots: !1,
          slidesToShow: 3,
          slidesToScroll: 1,
          focusOnSelect: !0,
          centerMode: !0,
          centerPadding: 0,
          responsive: [{
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: !0,
              centerPadding: "50px",
              arrows: !1,
              dots: !0
            }
          }, {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              centerMode: !1
            }
          }]
        }), (0, e.default)(".js--clients-slider").slick({
          infinite: !1,
          speed: 200,
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows: !0,
          draggable: !1,
          responsive: [{
            breakpoint: 575,
            settings: {
              skipSlideIndexes: [4],
              slidesToShow: 2,
              centerMode: !0,
              centerPadding: "40px",
              slidesToScroll: 1,
              infinite: !0,
              swipe: !0
            }
          }]
        }), (0, e.default)(window).width() < 768 && (0, e.default)(".js--clients-slider").slick("slickFilter", ":not(.js--more-clients)"), (0, e.default)(".js--more-clients").on("click", function () {
          (0, e.default)(".js--clients-slider").slick("slickRemove", 4), (0, e.default)(".slick-next, .slick-prev").css({
            opacity: 1,
            visibility: "visible"
          })
        })
      }
    };

    function s() {
      for (var e = document.querySelectorAll("[data-src]"), t = 0; t < e.length; t++) e[t].getAttribute("data-src") && (e[t].setAttribute("src", e[t].getAttribute("data-src")), console.log("replaced"))
    }
    document.addEventListener("DOMContentLoaded", function (e) {}), (0, e.default)(document).ready(function () {
      var t, s;
      t = (0, e.default)(window).width(), s = (0, e.default)(window).height(), i.init(t, s)
    }), (0, e.default)(window).load(function () {
      console.log("loaded"), s(), (0, e.default)("body").removeClass("is--not-scrolable"), (0, e.default)(".youtube-link").grtyoutube()
    }), "serviceWorker" in navigator && window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js")
    }), (0, e.default)(window).on("scroll", {
      passive: !0
    }, function () {
      (0, e.default)(window).scrollTop()
    });
  }, {
    "../scss/mlz-business.scss": "1ZsE",
    "../scripts/form-submission-handler": "MV7J",
    "jquery": "HlZQ",
    "slick-carousel": "wljL",
    "webp-converter": "SReT",
    "./grt-youtube-popup": "GJkW",
    "./grt-youtube-popup.css": "TZHW",
    "./../sw.js": [
      ["sw.js", "NqYy"], "sw.map", "NqYy"
    ]
  }]
}, {}, ["xqVe"], null)
//# sourceMappingURL=/melzo.e28a56d6.map
