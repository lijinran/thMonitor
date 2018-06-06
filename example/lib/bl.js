/** retcode cloud sdk | @version 1.3.1 | @copyright Alibaba Group Holding Limited. */
! function () {
    function t(e, n, r) {
        function a(o, s) {
            if (!n[o]) {
                if (!e[o]) {
                    var c = "function" == typeof require && require;
                    if (!s && c) return c(o, !0);
                    if (i) return i(o, !0);
                    var u = new Error("Cannot find module '" + o + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var f = n[o] = {
                    exports: {}
                };
                e[o][0].call(f.exports, function (t) {
                    return a(e[o][1][t] || t)
                }, f, f.exports, t, e, n, r)
            }
            return n[o].exports
        }
        for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) a(r[o]);
        return a
    }
    return t
}()({
    1: [function (t, e, n) {
        var r = t("./util"),
            a = function (t) {
                return this.ver = "1.3.1", this._conf = r.ext({}, a.dftCon), this.$a5 = {}, this.$a1 = [], this.hash =
                    r.seq(), this.$a6(), this.setConfig(t), this
            };
        a.dftCon = {
            sample: 1,
            tag: ""
        }, a.prototype = {
            constructor: a,
            $a2: function (t) {
                return t()
            },
            $a7: function () {
                var t = this._conf.page;
                return r.$a8(t, [], t + "")
            },
            setPage: function () { },
            setConfig: function (t) {
                r.$a9(t), this._conf = r.ext({}, this._conf, t)
            },
            $aa: function () { },
            $ab: function () {
                return {}
            },
            $a6: function () {
                this.session = r.uu(), this.sBegin = Date.now()
            },
            getConfig: function (t) {
                return t ? this._conf[t] : r.ext({}, this._conf)
            },
            $ac: function (t) {
                return 1 === t || ("boolean" == typeof this.$a5[t] ? this.$a5[t] : (this.$a5[t] = r.pick(t), this.$a5[
                    t]))
            },
            $a4: function () {
                var t;
                for (clearTimeout(this.$a3), this.$a3 = null; t = this.$a1.pop();) this.$aa(t);
                return this
            },
            _lg: function (t, e, n) {
                var a = this._conf;
                return e && !a.disabled && a.pid ? n && !this.$ac(n) ? this : (e = r.ext({
                    t: t,
                    times: 1,
                    page: this.$a7(),
                    tag: a.tag || ""
                }, e, this.$ab(), {
                        pid: a.pid,
                        _v: this.ver,
                        sid: this.session,
                        sampling: n || 1,
                        z: r.seq()
                    }), function (t, e) {
                        var n;
                        "error" === e.t && (n = t.$a1[0]) && "error" === n.t && e.msg === n.msg ? n.times++ : (t.$a1.unshift(
                            e), t.$a2(function () {
                                t.$a3 = r.delay(function () {
                                    t.$a4()
                                }, "error" === e.t ? 3e3 : -1)
                            }))
                    }(this, e)) : this
            },
            custom: function (t, e) {
                if (!t || "object" != typeof t) return this;
                var n = !1,
                    a = {};
                return r.each(t, function (t, e) {
                    return !(n = e && e.length <= 20) && r.warn("[retcode] invalid key: " + e), a["x-" + e] = t, n
                }), n ? this._lg("custom", a, e || 1) : this
            }
        }, e.exports = a
    }, {
        "./util": 11
    }],
    2: [function (t, e, n) {
        var r = t("../util"),
            a = t("../reporter"),
            i = t("../common/sender"),
            o = r.win,
            s = o.document,
            c = /^(error|api|speed|sum|avg|percent|custom|msg|setPage|setConfig)$/,
            u = function (t) {
                var e = this;
                return a.call(e, t), e._initialPage = t.page && r.$a8(t.page, [], t.page + "") || null, e._health = {
                    errcount: 0,
                    apisucc: 0,
                    apifail: 0
                }, e.$ad = function (t, n) {
                    "error" === t ? e._health.errcount++ : "api" === t && e._health[n.success ? "apisucc" :
                        "apifail"]++
                }, e.$ae(), e.$af(), e.$ag(1e4), Object.defineProperty && o.addEventListener && Object.defineProperty(
                    e, "pipe", {
                        set: e.$ah
                    }), e
            };
        u.prototype = r.$ai(a.prototype), r.ext(a._root.dftCon, {
            uid: null,
            ignoreUrlPath: [{
                rule: /\/([a-z\-_]+)?\d{2,20}/g,
                target: "/$1**"
            }, /\/$/],
            ignoreApiPath: {
                rule: /(\w+)\/\d{2,}/g,
                target: "$1"
            },
            ignoreUrlCase: !0,
            imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
            disableHook: !1,
            autoSendPv: !0,
            enableSPA: !1,
            parseHash: function (t) {
                return (t ? r.$ak(t.replace(/^#\/?/, "")) : "") || "[index]"
            },
            parseResponse: function (t) {
                if (!t || "object" != typeof t) return {};
                var e = t.code,
                    n = t.msg || t.message || t.subMsg || t.errorMsg || t.ret || t.errorResponse || "";
                return "object" == typeof n && (e = e || n.code, n = n.msg || n.message || n.info || n.ret || JSON.stringify(
                    n)), {
                        msg: n,
                        code: e,
                        success: !0
                    }
            }
        }), r.ext(u.prototype, {
            constructor: u,
            _super: a,
            $a2: function (t) {
                var e = this;
                if (e.hasReady) return t();
                "complete" === s.readyState ? (e.hasReady = !0, t()) : r.on(o, "load", function () {
                    e.hasReady = !0, t()
                }, !0)
            },
            $a7: function (t) {
                var e = this._conf,
                    n = e.page,
                    a = location,
                    i = a.host + a.pathname;
                return n && !t ? r.$a8(n, [], n + "") : this._initialPage || r.$aj(e.ignoreUrlCase ? i.toLowerCase() :
                    i, e.ignoreUrlPath)
            },
            setPage: function (t, e) {
                var n = this,
                    r = n.$al;
                if (!1 !== e) {
                    if (!t || t === r) return n;
                    n.$al = t, clearTimeout(n.$am), n.$an(1), n.$a6(), n.$am = setTimeout(function () {
                        n.$ao()
                    }, 10)
                } else n.$al = t;
                return n._conf.page = t, n
            },
            setConfig: function (t, e) {
                r.$a9(t);
                var n = this._conf;
                if (this._conf = r.ext({}, n, t), !e) {
                    var a = "disableHook";
                    a in t && n[a] !== t[a] && (t[a] ? this.removeHook() : this.addHook()), (a = "enableSPA") in t &&
                        n[a] !== t[a] && this.$ap(t[a])
                }
            },
            $aa: function (t) {
                i(t, this.getConfig("imgUrl"))
            },
            $ah: function (t) {
                var e = this;
                if (!t || !t.length) return e;
                try {
                    if ("Array" === r.T(t[0])) return r.each(t, function (t) {
                        return e.$ah(t)
                    });
                    if ("Array" !== r.T(t)) return e;
                    var n = t.shift();
                    if (!c.test(n)) return e;
                    e[n].apply(e, t)
                } catch (a) {
                    return r.warn("[retcode] error in sendPipe", a), e
                }
            },
            $aq: function () {
                var t = r.ext({}, this._health);
                t.healthy = t.errcount > 0 ? 0 : 1;
                var e = Date.now() - this.sBegin;
                t.stay = e, this._lg("health", t, 1), this._health = {
                    errcount: 0,
                    apisucc: 0,
                    apifail: 0
                }
            },
            createInstance: function (t) {
                t = r.ext({
                    pid: this._conf.pid
                }, t);
                var e = this.__propt__.constructor(t);
                return t.page && e.$ao(), e
            }
        }), t("./handler")(u, o, s), t("./fmp")(u, o, s), t("./hook")(u, o), t("./hack")(u, o), u._super = a, u._root =
            a._root, a.Browser = u, e.exports = u
    }, {
        "../common/sender": 8,
        "../reporter": 10,
        "../util": 11,
        "./fmp": 3,
        "./hack": 4,
        "./handler": 5,
        "./hook": 6
    }],
    3: [function (t, e, n) {
        var r = t("../util"),
            a = 500;
        e.exports = function (t, e, n) {
            function i(t, e, n) {
                var r = 0,
                    a = t.tagName;
                if ("SCRIPT" !== a && "STYLE" !== a && "META" !== a && "HEAD" !== a) {
                    var o = t.children ? t.children.length : 0;
                    if (o > 0) for (var c = t.children, u = o - 1; u >= 0; u--) r += i(c[u], e + 1, r > 0);
                    if (r <= 0 && !n) {
                        if (!(t.getBoundingClientRect && t.getBoundingClientRect().top < s)) return 0
                    }
                    r += 1 + .5 * e
                }
                return r
            }
            function o(t) {
                for (var e = 1; e < t.length; e++) if (t[e].score < t[e - 1].score) return t.splice(e, 1), o(t);
                return t
            }
            var s = e.innerHeight || 0,
                c = [],
                u = null,
                f = 0;
            r.ext(t.prototype, {
                $ag: function (t) {
                    var a = this;
                    if (!a._conf || !a._conf.useFmp) return null;
                    if (!e.MutationObserver) return r.warn("[retcode] first meaningful paint can not be retrieved"),
                        a.$ar(), null;
                    r.on(e, "beforeunload", function () {
                        a.$as(0, !0)
                    });
                    var o = e.MutationObserver;
                    return (u = new o(function () {
                        ! function (t) {
                            var e = Date.now() - t,
                                r = n.querySelector("body");
                            if (r) {
                                var a = 0;
                                a += i(r, 1, !1), c.push({
                                    score: a,
                                    t: e
                                })
                            } else c.push({
                                score: 0,
                                t: e
                            })
                        }(a._startTime)
                    })).observe(document, {
                        childList: !0,
                        subtree: !0
                    }), f = 1, a.$a2(function () {
                        a.$as(t)
                    }), u
                },
                $as: function (t, e) {
                    var n = this;
                    if (u && f) if (e || ! function (t, e) {
                        var n = Date.now() - t;
                        return !(n > e || n - (c && c.length && c[c.length - 1].t || 0) > 2 * a)
                    }(n._startTime, t)) {
                        u.disconnect(), f = 0, c = o(c);
                        for (var i = null, s = 1; s < c.length; s++) if (c[s].t >= c[s - 1].t) {
                            var l = c[s].score - c[s - 1].score;
                            (!i || i.rate <= l) && (i = {
                                t: c[s].t,
                                rate: l
                            })
                        }
                        i && i.t > 0 ? n.$ar({
                            fmp: i.t
                        }) : n.$ar()
                    } else r.delay(function () {
                        n.$as(t)
                    }, a)
                }
            })
        }
    }, {
        "../util": 11
    }],
    4: [function (t, e, n) {
        e.exports = function (e, n) {
            var r = t("../util"),
                a = n.history || {}, i = n.document,
                o = function (t, e) {
                    var r;
                    n.CustomEvent ? r = new CustomEvent(t, {
                        detail: e
                    }) : ((r = i.createEvent("HTMLEvents")).initEvent(t, !1, !0), r.detail = e), n.dispatchEvent(r)
                }, s = function (t) {
                    var e = a[t];
                    "function" == typeof e && (a[t] = function (n, i, s) {
                        var c = location.href,
                            u = e.call(a, n, i, s);
                        if (!s || "string" != typeof s) return u;
                        if (s === c) return u;
                        try {
                            var f = c.split("#"),
                                l = s.split("#"),
                                p = r.$ak(f[0]),
                                h = r.$ak(l[0]),
                                d = f[1] && f[1].replace(/^\/?(.*)/, "$1"),
                                g = l[1] && l[1].replace(/^\/?(.*)/, "$1");
                            p !== h ? o("historystatechange", h) : d !== g && o("historystatechange", g)
                        } catch (v) {
                            r.warn("[retcode] error in " + t + ": " + v)
                        }
                        return u
                    }, a[t].toString = r.$at(t))
                };
            r.ext(e.prototype, {
                $au: function () {
                    return this.$av ? this : (s("pushState"), s("replaceState"), this.$av = !0, this)
                }
            })
        }
    }, {
        "../util": 11
    }],
    5: [function (t, e, n) {
        e.exports = function (e, n, r) {
            var a = t("../util"),
                i = t("../common/perf"),
                o = null,
                s = r.documentElement,
                c = n.innerWidth || s.clientWidth || r.body.clientWidth,
                u = n.innerHeight || s.clientHeight || r.body.clientHeight,
                f = n.navigator.connection,
                l = {
                    sr: screen.width + "x" + screen.height,
                    vp: c + "x" + u,
                    ct: f ? f.effectiveType || f.type : ""
                }, p = {}, h = function (t, e, n, i, o) {
                    if (e === undefined) {
                        var s, c;
                        if (!p[t]) {
                            s = new RegExp(t + "=([^;]+)");
                            try {
                                c = s.exec(r.cookie)
                            } catch (f) {
                                return a.warn("[retcode] can not get cookie:", f), null
                            }
                            c && (p[t] = c[1])
                        }
                        return p[t]
                    }
                    var u = t + "=" + e;
                    i && (u += "; domain=" + i), o && (u += "; path=" + o), n && (u += "; max-age=" + n);
                    try {
                        return r.cookie = u, !!r.cookie
                    } catch (f) {
                        return a.warn("[retcode] can not set cookie: ", f), !1
                    }
                }, d = function (t) {
                    var e = t._conf.uid || h("_nk_") || h("_bl_uid");
                    if (!e) {
                        e = a.uu();
                        if (!h("_bl_uid", e, 15552e3)) return null
                    }
                    return e
                };
            return a.ext(e.prototype, {
                activeErrHandler: function (t) {
                    return o && !t ? this : (o = this, this)
                },
                errorHandler: function (t) {
                    if (!t) return this;
                    var e = t.type;
                    return "error" === e ? this.error(t.error || {
                        message: t.message
                    }, t) : "unhandledrejection" === e && a.T(t.reason, "Error") && a.$aw(t.reason) && this.error(t
                        .reason), this
                },
                $ar: function (t) {
                    var e = this;
                    e.$a2(function () {
                        var n = i();
                        n && (n.page = e.$a7(!0), t && (n = a.ext(n, t)), e._lg("perf", n, e.getConfig("sample")))
                    })
                },
                $ao: function () {
                    var t = this;
                    t.$a2(function () {
                        var e = function (t) {
                            var e = d(t),
                                a = n.devicePixelRatio || 1;
                            return {
                                uid: e,
                                dt: r.title,
                                dl: location.href,
                                dr: r.referrer,
                                dpr: a.toFixed(2),
                                de: (r.characterSet || r.defaultCharset || "").toLowerCase(),
                                ul: s.lang
                            }
                        }(t);
                        e && e.uid && t._lg("pv", e)
                    })
                },
                $ab: function () {
                    return l.uid = d(this), l
                },
                $an: function (t) {
                    var e = Date.now();
                    if (e - this._lastUnload < 200) return this;
                    this._lastUnload = e, this.$aq(t), this.$ax && (this._lg("speed", this.$ax), this.$ax = null,
                        clearTimeout(this.$ay)), this.$a4()
                },
                $ap: function (t) {
                    var e = this;
                    if (!t ^ e.$az) return e;
                    t ? (e.$au(), e.$az = function (t) {
                        var n = e._conf.parseHash(location.hash);
                        n && e.setPage(n, !1 !== t)
                    }, e.$b0 = function (t) {
                        var n = e._conf.parseHash(t.detail);
                        n && e.setPage(n)
                    }, a.on(n, "hashchange", e.$az), a.on(n, "historystatechange", e.$b0), e.$az(!1)) : (a.off(n,
                        "hashchange", e.$az), a.off(n, "historystatechange", e.$b0), e.$az = null, e.$b0 = null)
                },
                $ae: function () {
                    var t = this;
                    if (t.$b1) return t;
                    var e = t._conf;
                    return a.on(n, "beforeunload", function () {
                        t.$an(0)
                    }), t.$ap(e.enableSPA), t.activeErrHandler(!1), t.$b1 = !0, t
                }
            }), a.on(n, "error", function (t) {
                o && o.errorHandler(t)
            }).on(n, "unhandledrejection", function (t) {
                o && o.errorHandler(t)
            }), e
        }
    }, {
        "../common/perf": 7,
        "../util": 11
    }],
    6: [function (t, e, n) {
        e.exports = function (e, n) {
            var r = t("../util"),
                a = null,
                i = function (t, e, n, a, i, o, s) {
                    var c = r.J(i) || null,
                        u = r.$a8(e, [c, a], null);
                    if (!u) return !1;
                    var f = u.code || o,
                        l = !("success" in u) || u.success;
                    t.api(n, l, s, f, u.msg)
                }, o = "fetch",
                s = "__oFetch_",
                c = "__oXMLHttpRequest_",
                u = "XMLHttpRequest";
            return r.ext(e.prototype, {
                removeHook: function (t, e) {
                    return a && (e || this === a) ? (n[s] && (n[o] = n[s], delete n[s]), n[c] && (n[u] = n[c],
                        delete n[c]), a = null, this) : this
                },
                addHook: function (t) {
                    return !t && a ? this : (a || (function () {
                        if ("function" == typeof n[o]) {
                            var t = n[o];
                            n[s] = t, n[o] = function (e, o) {
                                var s = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
                                    c = a;
                                if (!c || !c.api) return t.apply(n, s);
                                if (o && ("HEAD" === o.method || "no-cors" === o.mode)) return t.apply(n, s);
                                var u = Date.now(),
                                    f = c._conf,
                                    l = (e && "string" != typeof e ? e.url : e) || "",
                                    p = l;
                                return l = r.$ak(l), r.$b2(l, !0) ? (l = r.$aj(l, f.ignoreApiPath), t.apply(n, s).then(function (
                                    t) {
                                    if (!c || !c.api) return t;
                                    var e = t.clone(),
                                        n = e.headers;
                                    if (n && "function" == typeof n.get) {
                                        var r = n.get("content-type");
                                        if (r && !/(text)|(json)/.test(r)) return t
                                    }
                                    var a = Date.now() - u;
                                    return e.ok ? e.text().then(function (t) {
                                        i(c, f.parseResponse, l, p, t, e.status || 200, a)
                                    }) : c.api(l, !1, a, e.status || 404, e.statusText), t
                                })["catch"](function (t) {
                                    if (!c || !c.api) throw t;
                                    var e = Date.now() - u;
                                    throw c.api(l, !1, e, t.name || "Error", t.message), t
                                })) : t.apply(n, s)
                            }, n[o].toString = r.$at(o)
                        }
                    }(), function () {
                        if ("function" == typeof n[u]) {
                            var t = n[u];
                            n[c] = t, n[u] = function (e) {
                                var n = new t(e),
                                    o = a;
                                if (!o || !o.api || !n.addEventListener) return n;
                                var s, c, u, f = n.send,
                                    l = n.open,
                                    p = o._conf;
                                return n.open = function (t, e) {
                                    var a = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
                                    l.apply(n, a), u = e || "", c = (c = r.$ak(u)) ? r.$aj(c, p.ignoreApiPath) : ""
                                }, n.send = function () {
                                    s = Date.now();
                                    var t = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
                                    f.apply(n, t)
                                }, r.on(n, "readystatechange", function () {
                                    if (c && 4 === n.readyState) {
                                        var t = Date.now() - s;
                                        if (n.status >= 200 && n.status <= 299) {
                                            var e = n.status || 200;
                                            if ("function" == typeof n.getResponseHeader) {
                                                var r = n.getResponseHeader("Content-Type");
                                                if (r && !/(text)|(json)/.test(r)) return
                                            }
                                            n.responseType && "text" !== n.responseType ? o.api(c, !0, t, e, "") :
                                                i(o, p.parseResponse, c, u, n.responseText, e, t)
                                        } else o.api(c, !1, t, n.status || "FAILED", n.statusText)
                                    }
                                }), n
                            }, n[u].toString = r.$at(u)
                        }
                    }()), a = this, this)
                },
                $af: function () {
                    return this.$b3 ? this : (this.getConfig("disableHook") || this.addHook(), this.$b3 = !0, this)
                }
            }), e
        }
    }, {
        "../util": 11
    }],
    7: [function (t, e, n) {
        var r = t("../util"),
            a = ["", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd",
                "requestStart", "responseStart", "responseEnd", "", "domInteractive", "",
                "domContentLoadedEventEnd", "", "loadEventStart", "", "msFirstPaint", "secureConnectionStart"];
        e.exports = function () {
            var t = r.win || {}, e = t.performance;
            if (!e || "object" != typeof e) return null;
            var n = {}, i = e.timing || {}, o = 1;
            if ("function" == typeof t.PerformanceNavigationTiming) {
                var s = e.getEntriesByType("navigation")[0];
                s && (i = s, o = 2)
            }
            r.each({
                dns: [3, 2],
                tcp: [5, 4],
                ssl: [5, 17],
                ttfb: [7, 6],
                trans: [8, 7],
                dom: [10, 8],
                res: [14, 12],
                firstbyte: [7, 2],
                fpt: [8, 1],
                tti: [10, 1],
                ready: [12, 1],
                load: [14, 1]
            }, function (t, e) {
                var r = i[a[t[1]]],
                    o = i[a[t[0]]];
                if (2 === t || r > 0 && o > 0) {
                    var s = Math.round(o - r);
                    s >= 0 && s < 36e5 && (n[e] = s)
                }
            });
            var c = t.navigator.connection,
                u = e.navigation || {};
            n.ct = c ? c.effectiveType || c.type : "";
            var f = c ? c.downlinkMax || c.bandwidth || -1 : -1;
            return f = f > 999 ? 999 : f, n.bandwidth = f, n.navtype = 1 === u.type ? "Reload" : "Other", 1 === o &&
                i[a[16]] > 0 && i[a[1]] > 0 && (n.fpt = i[a[16]] - i[a[1]]), n
        }
    }, {
        "../util": 11
    }],
    8: [function (t, e, n) {
        var r = t("../util"),
            a = "object" == typeof window ? window : {}, i = a.__oFetch_ || a.fetch;
        i = "function" == typeof i ? i : undefined, e.exports = function (t, e) {
            var n = -1;
            "object" == typeof t && (n = t.z, t = r.serialize(t));
            var o = e + t;
            if (i) return i(o, {
                method: "HEAD",
                mode: "no-cors"
            })["catch"](r.noop);
            if (a.document && a.document.createElement) {
                var s = "__request_hold_" + n,
                    c = a[s] = new Image;
                c.onload = c.onerror = function () {
                    a[s] = undefined
                }, c.src = o, c = null
            }
        }
    }, {
        "../util": 11
    }],
    9: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            var n = a[o] = new i(t);
            n.$ah(e);
            var r = n._conf;
            return !1 !== r.autoSendPv && n.$ao(), r && r.useFmp || n.$ar(), a[s] = !0, n
        }
        var a = window,
            i = a.BrowserLogger = t("./biz.browser/clazz"),
            o = t("./util").key,
            s = "__hasInitBlSdk";
        i.singleton = function (t, e) {
            return a[s] ? a[o] : r(t, e)
        };
        "object" == typeof window && !!window.navigator && a[o] && (i.bl = function () {
            if (a[s]) return a[o];
            var t = {}, e = [];
            return o in a && (t = a[o].config || {}, e = a[o].pipe || []), r(t, e)
        }(a.__hasInitBlSdk)), e.exports = i
    }, {
        "./biz.browser/clazz": 2,
        "./util": 11
    }],
    10: [function (t, e, n) {
        var r = t("./util"),
            a = t("./base"),
            i = ["api", "success", "time", "code", "msg", "trace", "traceId"],
            o = function (t, e) {
                var n = t.split("::");
                return n.length > 1 ? r.ext({
                    group: n[0],
                    key: n[1]
                }, e) : r.ext({
                    group: "default_group",
                    key: n[0]
                }, e)
            }, s = function (t) {
                a.call(this, t);
                var e;
                try {
                    e = "object" == typeof performance ? performance.timing.fetchStart : Date.now()
                } catch (n) {
                    e = Date.now()
                }
                return this._startTime = e, this
            };
        s.prototype = r.$ai(a.prototype), r.ext(a.dftCon, {
            startTime: null
        }), r.ext(s.prototype, {
            constructor: s,
            _super: a,
            sum: function (t, e, n) {
                try {
                    return this._lg("sum", o(t, {
                        val: e || 1
                    }), n)
                } catch (a) {
                    r.warn("[retcode] can not get parseStatData: " + a)
                }
            },
            avg: function (t, e, n) {
                try {
                    return this._lg("avg", o(t, {
                        val: e || 0
                    }), n)
                } catch (a) {
                    r.warn("[retcode] can not get parseStatData: " + a)
                }
            },
            percent: function (t, e, n, a) {
                try {
                    return this._lg("percent", o(t, {
                        subkey: e,
                        val: n || 0
                    }), a)
                } catch (i) {
                    r.warn("[retcode] can not get parseStatData: " + i)
                }
            },
            msg: function (t, e) {
                if (t && !(t.length > 180)) return this.custom({
                    msg: t
                }, e)
            },
            error: function (t, e) {
                if (!t || "object" != typeof t || "string" != typeof t.message) return r.warn(
                    "[retcode] invalid param e: " + t), this;
                var n = t.name || "CustomError",
                    a = t.message,
                    i = t.stack || "";
                e = e || {}, i = i && i.substring(0, 1e3);
                var o = {
                    cate: n,
                    msg: a.substring(0, 1e3),
                    stack: i,
                    file: e.filename || "",
                    line: e.lineno || "",
                    col: e.colno || ""
                };
                return this.$ad && this.$ad("error", o), this._lg("error", o, 1)
            },
            api: function (t, e, n, a, o) {
                return t ? (t = "string" == typeof t ? {
                    api: t,
                    success: e,
                    time: n,
                    code: a,
                    msg: o
                } : r.sub(t, i), r.$b2(t.api) ? (t.code = t.code || "", t.msg = t.msg || "", t.success = t.success ?
                    1 : 0, t.time = +t.time, !t.api || isNaN(t.time) ? (r.warn("[retcode] invalid time or api"),
                        this) : (this.$ad && this.$ad("api", t), this._lg("api", t, t.success && this.getConfig(
                            "sample")))) : this) : (r.warn("[retcode] api is null"), this)
            },
            speed: function (t, e, n) {
                var a = this,
                    i = this.getConfig("startTime") || this._startTime;
                return /^s(\d|1[0])$/.test(t) ? (e = "number" != typeof e ? Date.now() - i : e >= i ? e - i : e, a.$ax =
                    a.$ax || {}, a.$ax[t] = e, clearTimeout(a.$ay), a.$ay = setTimeout(function () {
                        n || (a.$ax.page = a.$a7(!0)), a._lg("speed", a.$ax), a.$ax = null
                    }, 5e3), a) : (r.warn("[retcode] invalid point: " + t), a)
            }
        }), s._super = a, s._root = a, a.Reporter = s, e.exports = s
    }, {
        "./base": 1,
        "./util": 11
    }],
    11: [function (t, e, n) {
        Date.now = Date.now || function () {
            return (new Date).getTime()
        };
        var r = Date.now(),
            a = function () { }, i = {
                noop: a,
                warn: function () {
                    var t = "object" == typeof console ? console.warn : a;
                    try {
                        var e = {
                            warn: t
                        };
                        e.warn.call(e)
                    } catch (n) {
                        return a
                    }
                    return t
                }(),
                key: "__bl",
                win: "object" == typeof window && window.document ? window : undefined,
                $ai: function (t) {
                    if (Object.create) return Object.create(t);
                    var e = function () { };
                    return e.prototype = t, new e
                },
                each: function (t, e) {
                    var n = 0,
                        r = t.length;
                    if (this.T(t, "Array")) for (; n < r && !1 !== e.call(t[n], t[n], n); n++);
                    else for (n in t) if (!1 === e.call(t[n], t[n], n)) break; return t
                },
                $a8: function (t, e, n) {
                    if ("function" != typeof t) return n;
                    try {
                        return t.apply(this, e)
                    } catch (r) {
                        return n
                    }
                },
                T: function (t, e) {
                    var n = Object.prototype.toString.call(t).substring(8).replace("]", "");
                    return e ? n === e : n
                },
                $aj: function (t, e) {
                    if (!t) return "";
                    if (!e) return t;
                    var n = this,
                        r = n.T(e);
                    return "Function" === r ? n.$a8(e, [t], t) : "Array" === r ? (this.each(e, function (e) {
                        t = n.$aj(t, e)
                    }), t) : "Object" === r ? t.replace(e.rule, e.target || "") : t.replace(e, "")
                },
                J: function (t) {
                    if (!t || "string" != typeof t) return t;
                    var e = null;
                    try {
                        e = JSON.parse(t)
                    } catch (n) { }
                    return e
                },
                pick: function (t) {
                    return 1 === t || 1 === Math.ceil(Math.random() * t)
                },
                $a9: function (t) {
                    if ("sample" in t) {
                        var e = t.sample,
                            n = e;
                        e && /^\d+(\.\d+)?%$/.test(e) && (n = parseInt(100 / parseFloat(e))), 0 < n && 1 > n && (n =
                            parseInt(1 / n)), n >= 1 && n <= 100 ? t.sample = n : delete t.sample
                    }
                    return t
                },
                on: function (t, e, n, r) {
                    return t.addEventListener ? t.addEventListener(e, function a(i) {
                        r && t.removeEventListener(e, a, !1), n.call(this, i)
                    }, !1) : t.attachEvent && t.attachEvent("on" + e, function i(a) {
                        r && t.detachEvent("on" + e, i), n.call(this, a)
                    }), this
                },
                off: function (t, e, n) {
                    return n ? (t.removeEventListener ? t.removeEventListener(e, n) : t.detachEvent && t.detachEvent(
                        e, n), this) : this
                },
                delay: function (t, e) {
                    return -1 === e ? (t(), null) : setTimeout(t, e || 0)
                },
                ext: function (t) {
                    for (var e = 1, n = arguments.length; e < n; e++) {
                        var r = arguments[e];
                        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a])
                    }
                    return t
                },
                sub: function (t, e) {
                    var n = {};
                    return this.each(t, function (t, r) {
                        -1 !== e.indexOf(r) && (n[r] = t)
                    }), n
                },
                uu: function () {
                    for (var t, e, n = 20, r = new Array(n), a = Date.now().toString(36).split(""); n-- > 0;) e = (
                        t = 36 * Math.random() | 0).toString(36), r[n] = t % 3 ? e : e.toUpperCase();
                    for (var i = 0; i < 8; i++) r.splice(3 * i + 2, 0, a[i]);
                    return r.join("")
                },
                seq: function () {
                    return (r++).toString(36)
                },
                encode: function (t, e) {
                    try {
                        t = e ? encodeURIComponent(t).replace(/\(/g, "%28").replace(/\)/g, "%29") :
                            encodeURIComponent(t)
                    } catch (n) { }
                    return t
                },
                serialize: function (t) {
                    t = t || {};
                    var e = [];
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && t[n] !== undefined && e.push(n +
                        "=" + this.encode(t[n], "msg" === n));
                    return e.join("&")
                },
                $b2: function (t, e) {
                    if (!t || "string" != typeof t) return !1;
                    var n = /arms-retcode[\w-]*\.aliyuncs/.test(t);
                    return !n && e && (n = /(\.png)|(\.gif)|(alicdn\.com)/.test(t)), !n
                },
                $aw: function (t) {
                    return !(!t || !t.message) && !/failed[\w\s]+fetch/i.test(t.message)
                },
                $ak: function (t) {
                    return t && "string" == typeof t ? t.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "") : ""
                },
                $at: function (t) {
                    return function () {
                        return t + "() { [native code] }"
                    }
                }
            };
        e.exports = i
    }, {}]
}, {}, [9]);