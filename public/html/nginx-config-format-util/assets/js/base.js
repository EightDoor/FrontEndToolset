const API_URL = location.origin,
    STATIC_URL = "",
    debug = !1;
var QRCode;
! function(e) {
    function t(t, i, r) {
        return r = _(i, r), this.on("click.pjax", t, function(t) {
            var i = r;
            i.container || ((i = e.extend({}, r)).container = e(this).attr("data-pjax")), n(t, i)
        })
    }

    function n(t, n, i) {
        i = _(n, i);
        var o = t.currentTarget,
            a = e(o);
        if ("A" !== o.tagName.toUpperCase()) throw "$.fn.pjax or $.pjax.click requires an anchor element";
        if (!(t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || location.protocol !== o.protocol || location.hostname !== o.hostname || o.href.indexOf("#") > -1 && v(o) == v(location) || t.isDefaultPrevented())) {
            var s = {
                    url: o.href,
                    container: a.attr("data-pjax"),
                    target: o
                },
                l = e.extend({}, s, i),
                c = e.Event("pjax:click");
            a.trigger(c, [l]), c.isDefaultPrevented() || (r(l), t.preventDefault(), a.trigger("pjax:clicked", [l]))
        }
    }

    function i(t, n, i) {
        i = _(n, i);
        var o = t.currentTarget,
            a = e(o);
        if ("FORM" !== o.tagName.toUpperCase()) throw "$.pjax.submit requires a form element";
        var s = {
            type: (a.attr("method") || "GET").toUpperCase(),
            url: a.attr("action"),
            container: a.attr("data-pjax"),
            target: o
        };
        if ("GET" !== s.type && void 0 !== window.FormData) s.data = new FormData(o), s.processData = !1, s.contentType = !1;
        else {
            if (a.find(":file").length) return;
            s.data = a.serializeArray()
        }
        r(e.extend({}, s, i)), t.preventDefault()
    }

    function r(t) {
        t = e.extend(!0, {}, e.ajaxSettings, r.defaults, t), e.isFunction(t.url) && (t.url = t.url());
        var n = g(t.url).hash,
            i = e.type(t.container);
        if ("string" !== i) throw "expected string value for 'container' option; got " + i;
        var o, s = t.context = e(t.container);
        if (!s.length) throw "the container selector '" + t.container + "' did not match anything";

        function l(n, i, r) {
            r || (r = {}), r.relatedTarget = t.target;
            var o = e.Event(n, r);
            return s.trigger(o, i), !o.isDefaultPrevented()
        }
        t.data || (t.data = {}), e.isArray(t.data) ? t.data.push({
            name: "_pjax",
            value: t.container
        }) : t.data._pjax = t.container, t.beforeSend = function(e, i) {
            if ("GET" !== i.type && (i.timeout = 0), e.setRequestHeader("X-PJAX", "true"), e.setRequestHeader("X-PJAX-Container", t.container), !l("pjax:beforeSend", [e, i])) return !1;
            i.timeout > 0 && (o = setTimeout(function() {
                l("pjax:timeout", [e, t]) && e.abort("timeout")
            }, i.timeout), i.timeout = 0);
            var r = g(i.url);
            n && (r.hash = n), t.requestUrl = m(r)
        }, t.complete = function(e, n) {
            o && clearTimeout(o), l("pjax:complete", [e, n, t]), l("pjax:end", [e, t])
        }, t.error = function(e, n, i) {
            var r = E("", e, t),
                o = l("pjax:error", [e, n, i, t]);
            "GET" == t.type && "abort" !== n && o && a(r.url)
        }, t.success = function(i, o, c) {
            var u = r.state,
                d = "function" == typeof e.pjax.defaults.version ? e.pjax.defaults.version() : e.pjax.defaults.version,
                p = c.getResponseHeader("X-PJAX-Version"),
                h = E(i, c, t),
                m = g(h.url);
            if (n && (m.hash = n, h.url = m.href), d && p && d !== p) a(h.url);
            else if (h.contents) {
                if (r.state = {
                        id: t.id || f(),
                        url: h.url,
                        title: h.title,
                        container: t.container,
                        fragment: t.fragment,
                        timeout: t.timeout
                    }, (t.push || t.replace) && window.history.replaceState(r.state, h.title, h.url), e.contains(s, document.activeElement)) try {
                    document.activeElement.blur()
                } catch (e) {}
                h.title && (document.title = h.title), l("pjax:beforeReplace", [h.contents, t], {
                    state: r.state,
                    previousState: u
                }), s.html(h.contents);
                var v = s.find("input[autofocus], textarea[autofocus]").last()[0];
                v && document.activeElement !== v && v.focus(),
                    function(t) {
                        if (t) {
                            var n = e("script[src]");
                            t.each(function() {
                                var t = this.src;
                                if (!n.filter(function() {
                                        return this.src === t
                                    }).length) {
                                    var i = document.createElement("script"),
                                        r = e(this).attr("type");
                                    r && (i.type = r), i.src = e(this).attr("src"), document.head.appendChild(i)
                                }
                            })
                        }
                    }(h.scripts);
                var _ = t.scrollTo;
                if (n) {
                    var y = decodeURIComponent(n.slice(1)),
                        b = document.getElementById(y) || document.getElementsByName(y)[0];
                    b && (_ = e(b).offset().top)
                }
                "number" == typeof _ && e(window).scrollTop(_), l("pjax:success", [i, o, c, t])
            } else a(h.url)
        }, r.state || (r.state = {
            id: f(),
            url: window.location.href,
            title: document.title,
            container: t.container,
            fragment: t.fragment,
            timeout: t.timeout
        }, window.history.replaceState(r.state, document.title)), p(r.xhr), r.options = t;
        var c, u, d = r.xhr = e.ajax(t);
        return d.readyState > 0 && (t.push && !t.replace && (c = r.state.id, u = [t.container, h(s)], w[c] = u, S.push(c), A(T, 0), A(S, r.defaults.maxCacheLength), window.history.pushState(null, "", t.requestUrl)), l("pjax:start", [d, t]), l("pjax:send", [d, t])), r.xhr
    }

    function o(t, n) {
        var i = {
            url: window.location.href,
            push: !1,
            replace: !0,
            scrollTo: !1
        };
        return r(e.extend(i, _(t, n)))
    }

    function a(e) {
        window.history.replaceState(null, "", r.state.url), window.location.replace(e)
    }
    var s = !0,
        l = window.location.href,
        c = window.history.state;

    function u(t) {
        s || p(r.xhr);
        var n, i = r.state,
            o = t.state;
        if (o && o.container) {
            if (s && l == o.url) return;
            if (i) {
                if (i.id === o.id) return;
                n = i.id < o.id ? "forward" : "back"
            }
            var c = w[o.id] || [],
                u = c[0] || o.container,
                d = e(u),
                f = c[1];
            if (d.length) {
                i && function(e, t, n) {
                    var i, o;
                    w[t] = n, "forward" === e ? (i = S, o = T) : (i = T, o = S), i.push(t), (t = o.pop()) && delete w[t], A(i, r.defaults.maxCacheLength)
                }(n, i.id, [u, h(d)]);
                var m = e.Event("pjax:popstate", {
                    state: o,
                    direction: n
                });
                d.trigger(m);
                var g = {
                    id: o.id,
                    url: o.url,
                    container: u,
                    push: !1,
                    fragment: o.fragment,
                    timeout: o.timeout,
                    scrollTo: !1
                };
                if (f) {
                    d.trigger("pjax:start", [null, g]), r.state = o, o.title && (document.title = o.title);
                    var v = e.Event("pjax:beforeReplace", {
                        state: o,
                        previousState: i
                    });
                    d.trigger(v, [f, g]), d.html(f), d.trigger("pjax:end", [null, g])
                } else r(g);
                d[0].offsetHeight
            } else a(location.href)
        }
        s = !1
    }

    function d(t) {
        var n = e.isFunction(t.url) ? t.url() : t.url,
            i = t.type ? t.type.toUpperCase() : "GET",
            r = e("<form>", {
                method: "GET" === i ? "GET" : "POST",
                action: n,
                style: "display:none"
            });
        "GET" !== i && "POST" !== i && r.append(e("<input>", {
            type: "hidden",
            name: "_method",
            value: i.toLowerCase()
        }));
        var o = t.data;
        if ("string" == typeof o) e.each(o.split("&"), function(t, n) {
            var i = n.split("=");
            r.append(e("<input>", {
                type: "hidden",
                name: i[0],
                value: i[1]
            }))
        });
        else if (e.isArray(o)) e.each(o, function(t, n) {
            r.append(e("<input>", {
                type: "hidden",
                name: n.name,
                value: n.value
            }))
        });
        else if ("object" == typeof o) {
            var a;
            for (a in o) r.append(e("<input>", {
                type: "hidden",
                name: a,
                value: o[a]
            }))
        }
        e(document.body).append(r), r.submit()
    }

    function p(t) {
        t && t.readyState < 4 && (t.onreadystatechange = e.noop, t.abort())
    }

    function f() {
        return (new Date).getTime()
    }

    function h(t) {
        var n = t.clone();
        return n.find("script").each(function() {
            this.src || e._data(this, "globalEval", !1)
        }), n.contents()
    }

    function m(e) {
        return e.search = e.search.replace(/([?&])(_pjax|_)=[^&]*/g, "").replace(/^&/, ""), e.href.replace(/\?($|#)/, "$1")
    }

    function g(e) {
        var t = document.createElement("a");
        return t.href = e, t
    }

    function v(e) {
        return e.href.replace(/#.*/, "")
    }

    function _(t, n) {
        return t && n ? ((n = e.extend({}, n)).container = t, n) : e.isPlainObject(t) ? t : {
            container: t
        }
    }

    function y(e, t) {
        return e.filter(t).add(e.find(t))
    }

    function b(t) {
        return e.parseHTML(t, document, !0)
    }

    function E(t, n, i) {
        var r, o, a = {},
            s = /<html/i.test(t),
            l = n.getResponseHeader("X-PJAX-URL");
        if (a.url = l ? m(g(l)) : i.requestUrl, s) {
            o = e(b(t.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
            var c = t.match(/<head[^>]*>([\s\S.]*)<\/head>/i);
            r = null != c ? e(b(c[0])) : o
        } else r = o = e(b(t));
        if (0 === o.length) return a;
        if (a.title = y(r, "title").last().text(), i.fragment) {
            var u = o;
            "body" !== i.fragment && (u = y(u, i.fragment).first()), u.length && (a.contents = "body" === i.fragment ? u : u.contents(), a.title || (a.title = u.attr("title") || u.data("title")))
        } else s || (a.contents = o);
        return a.contents && (a.contents = a.contents.not(function() {
            return e(this).is("title")
        }), a.contents.find("title").remove(), a.scripts = y(a.contents, "script[src]").remove(), a.contents = a.contents.not(a.scripts)), a.title && (a.title = e.trim(a.title)), a
    }
    c && c.container && (r.state = c), "state" in window.history && (s = !1);
    var w = {},
        T = [],
        S = [];

    function A(e, t) {
        for (; e.length > t;) delete w[e.shift()]
    }

    function C() {
        return e("meta").filter(function() {
            var t = e(this).attr("http-equiv");
            return t && "X-PJAX-VERSION" === t.toUpperCase()
        }).attr("content")
    }

    function k() {
        e.fn.pjax = t, e.pjax = r, e.pjax.enable = e.noop, e.pjax.disable = x, e.pjax.click = n, e.pjax.submit = i, e.pjax.reload = o, e.pjax.defaults = {
            timeout: 650,
            push: !0,
            replace: !1,
            type: "GET",
            dataType: "html",
            scrollTo: 0,
            maxCacheLength: 20,
            version: C
        }, e(window).on("popstate.pjax", u)
    }

    function x() {
        e.fn.pjax = function() {
            return this
        }, e.pjax = d, e.pjax.enable = k, e.pjax.disable = e.noop, e.pjax.click = e.noop, e.pjax.submit = e.noop, e.pjax.reload = function() {
            window.location.reload()
        }, e(window).off("popstate.pjax", u)
    }
    e.event.props && e.inArray("state", e.event.props) < 0 ? e.event.props.push("state") : "state" in e.Event.prototype || e.event.addProp("state"), e.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/), e.support.pjax ? k() : x()
}(jQuery),
function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.NProgress = t()
}(this, function() {
    var e, t, n = {
            version: "0.2.0"
        },
        i = n.settings = {
            minimum: .08,
            easing: "ease",
            positionUsing: "",
            speed: 200,
            trickle: !0,
            trickleRate: .02,
            trickleSpeed: 800,
            showSpinner: !0,
            barSelector: '[role="bar"]',
            spinnerSelector: '[role="spinner"]',
            parent: "body",
            template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        };

    function r(e, t, n) {
        return e < t ? t : e > n ? n : e
    }

    function o(e) {
        return 100 * (-1 + e)
    }
    n.configure = function(e) {
        var t, n;
        for (t in e) void 0 !== (n = e[t]) && e.hasOwnProperty(t) && (i[t] = n);
        return this
    }, n.status = null, n.set = function(e) {
        var t = n.isStarted();
        e = r(e, i.minimum, 1), n.status = 1 === e ? null : e;
        var l = n.render(!t),
            c = l.querySelector(i.barSelector),
            u = i.speed,
            d = i.easing;
        return l.offsetWidth, a(function(t) {
            "" === i.positionUsing && (i.positionUsing = n.getPositioningCSS()), s(c, function(e, t, n) {
                var r;
                r = "translate3d" === i.positionUsing ? {
                    transform: "translate3d(" + o(e) + "%,0,0)"
                } : "translate" === i.positionUsing ? {
                    transform: "translate(" + o(e) + "%,0)"
                } : {
                    "margin-left": o(e) + "%"
                };
                return r.transition = "all " + t + "ms " + n, r
            }(e, u, d)), 1 === e ? (s(l, {
                transition: "none",
                opacity: 1
            }), l.offsetWidth, setTimeout(function() {
                s(l, {
                    transition: "all " + u + "ms linear",
                    opacity: 0
                }), setTimeout(function() {
                    n.remove(), t()
                }, u)
            }, u)) : setTimeout(t, u)
        }), this
    }, n.isStarted = function() {
        return "number" == typeof n.status
    }, n.start = function() {
        n.status || n.set(0);
        var e = function() {
            setTimeout(function() {
                n.status && (n.trickle(), e())
            }, i.trickleSpeed)
        };
        return i.trickle && e(), this
    }, n.done = function(e) {
        return e || n.status ? n.inc(.3 + .5 * Math.random()).set(1) : this
    }, n.inc = function(e) {
        var t = n.status;
        return t ? ("number" != typeof e && (e = (1 - t) * r(Math.random() * t, .1, .95)), t = r(t + e, 0, .994), n.set(t)) : n.start()
    }, n.trickle = function() {
        return n.inc(Math.random() * i.trickleRate)
    }, e = 0, t = 0, n.promise = function(i) {
        return i && "resolved" !== i.state() ? (0 === t && n.start(), e++, t++, i.always(function() {
            0 == --t ? (e = 0, n.done()) : n.set((e - t) / e)
        }), this) : this
    }, n.render = function(e) {
        if (n.isRendered()) return document.getElementById("nprogress");
        c(document.documentElement, "nprogress-busy");
        var t = document.createElement("div");
        t.id = "nprogress", t.innerHTML = i.template;
        var r, a = t.querySelector(i.barSelector),
            l = e ? "-100" : o(n.status || 0),
            u = document.querySelector(i.parent);
        return s(a, {
            transition: "all 0 linear",
            transform: "translate3d(" + l + "%,0,0)"
        }), i.showSpinner || (r = t.querySelector(i.spinnerSelector)) && p(r), u != document.body && c(u, "nprogress-custom-parent"), u.appendChild(t), t
    }, n.remove = function() {
        u(document.documentElement, "nprogress-busy"), u(document.querySelector(i.parent), "nprogress-custom-parent");
        var e = document.getElementById("nprogress");
        e && p(e)
    }, n.isRendered = function() {
        return !!document.getElementById("nprogress")
    }, n.getPositioningCSS = function() {
        var e = document.body.style,
            t = "WebkitTransform" in e ? "Webkit" : "MozTransform" in e ? "Moz" : "msTransform" in e ? "ms" : "OTransform" in e ? "O" : "";
        return t + "Perspective" in e ? "translate3d" : t + "Transform" in e ? "translate" : "margin"
    };
    var a = function() {
            var e = [];

            function t() {
                var n = e.shift();
                n && n(t)
            }
            return function(n) {
                e.push(n), 1 == e.length && t()
            }
        }(),
        s = function() {
            var e = ["Webkit", "O", "Moz", "ms"],
                t = {};

            function n(n) {
                return n = n.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(e, t) {
                    return t.toUpperCase()
                }), t[n] || (t[n] = function(t) {
                    var n = document.body.style;
                    if (t in n) return t;
                    for (var i, r = e.length, o = t.charAt(0).toUpperCase() + t.slice(1); r--;)
                        if ((i = e[r] + o) in n) return i;
                    return t
                }(n))
            }

            function i(e, t, i) {
                t = n(t), e.style[t] = i
            }
            return function(e, t) {
                var n, r, o = arguments;
                if (2 == o.length)
                    for (n in t) void 0 !== (r = t[n]) && t.hasOwnProperty(n) && i(e, n, r);
                else i(e, o[1], o[2])
            }
        }();

    function l(e, t) {
        return ("string" == typeof e ? e : d(e)).indexOf(" " + t + " ") >= 0
    }

    function c(e, t) {
        var n = d(e),
            i = n + t;
        l(n, t) || (e.className = i.substring(1))
    }

    function u(e, t) {
        var n, i = d(e);
        l(e, t) && (n = i.replace(" " + t + " ", " "), e.className = n.substring(1, n.length - 1))
    }

    function d(e) {
        return (" " + (e.className || "") + " ").replace(/\s+/gi, " ")
    }

    function p(e) {
        e && e.parentNode && e.parentNode.removeChild(e)
    }
    return n
}),
function() {
    function e(e) {
        this.mode = n.MODE_8BIT_BYTE, this.data = e, this.parsedData = [];
        for (var t = 0, i = this.data.length; t < i; t++) {
            var r = [],
                o = this.data.charCodeAt(t);
            o > 65536 ? (r[0] = 240 | (1835008 & o) >>> 18, r[1] = 128 | (258048 & o) >>> 12, r[2] = 128 | (4032 & o) >>> 6, r[3] = 128 | 63 & o) : o > 2048 ? (r[0] = 224 | (61440 & o) >>> 12, r[1] = 128 | (4032 & o) >>> 6, r[2] = 128 | 63 & o) : o > 128 ? (r[0] = 192 | (1984 & o) >>> 6, r[1] = 128 | 63 & o) : r[0] = o, this.parsedData.push(r)
        }
        this.parsedData = Array.prototype.concat.apply([], this.parsedData), this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239))
    }

    function t(e, t) {
        this.typeNumber = e, this.errorCorrectLevel = t, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
    }
    e.prototype = {
        getLength: function(e) {
            return this.parsedData.length
        },
        write: function(e) {
            for (var t = 0, n = this.parsedData.length; t < n; t++) e.put(this.parsedData[t], 8)
        }
    }, t.prototype = {
        addData: function(t) {
            var n = new e(t);
            this.dataList.push(n), this.dataCache = null
        },
        isDark: function(e, t) {
            if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t) throw new Error(e + "," + t);
            return this.modules[e][t]
        },
        getModuleCount: function() {
            return this.moduleCount
        },
        make: function() {
            this.makeImpl(!1, this.getBestMaskPattern())
        },
        makeImpl: function(e, n) {
            this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
            for (var i = 0; i < this.moduleCount; i++) {
                this.modules[i] = new Array(this.moduleCount);
                for (var r = 0; r < this.moduleCount; r++) this.modules[i][r] = null
            }
            this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(e, n), this.typeNumber >= 7 && this.setupTypeNumber(e), null == this.dataCache && (this.dataCache = t.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, n)
        },
        setupPositionProbePattern: function(e, t) {
            for (var n = -1; n <= 7; n++)
                if (!(e + n <= -1 || this.moduleCount <= e + n))
                    for (var i = -1; i <= 7; i++) t + i <= -1 || this.moduleCount <= t + i || (this.modules[e + n][t + i] = 0 <= n && n <= 6 && (0 == i || 6 == i) || 0 <= i && i <= 6 && (0 == n || 6 == n) || 2 <= n && n <= 4 && 2 <= i && i <= 4)
        },
        getBestMaskPattern: function() {
            for (var e = 0, t = 0, n = 0; n < 8; n++) {
                this.makeImpl(!0, n);
                var i = p.getLostPoint(this);
                (0 == n || e > i) && (e = i, t = n)
            }
            return t
        },
        createMovieClip: function(e, t, n) {
            var i = e.createEmptyMovieClip(t, n);
            this.make();
            for (var r = 0; r < this.modules.length; r++)
                for (var o = 1 * r, a = 0; a < this.modules[r].length; a++) {
                    var s = 1 * a;
                    this.modules[r][a] && (i.beginFill(0, 100), i.moveTo(s, o), i.lineTo(s + 1, o), i.lineTo(s + 1, o + 1), i.lineTo(s, o + 1), i.endFill())
                }
            return i
        },
        setupTimingPattern: function() {
            for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[e][6] && (this.modules[e][6] = e % 2 == 0);
            for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0)
        },
        setupPositionAdjustPattern: function() {
            for (var e = p.getPatternPosition(this.typeNumber), t = 0; t < e.length; t++)
                for (var n = 0; n < e.length; n++) {
                    var i = e[t],
                        r = e[n];
                    if (null == this.modules[i][r])
                        for (var o = -2; o <= 2; o++)
                            for (var a = -2; a <= 2; a++) this.modules[i + o][r + a] = -2 == o || 2 == o || -2 == a || 2 == a || 0 == o && 0 == a
                }
        },
        setupTypeNumber: function(e) {
            for (var t = p.getBCHTypeNumber(this.typeNumber), n = 0; n < 18; n++) {
                var i = !e && 1 == (t >> n & 1);
                this.modules[Math.floor(n / 3)][n % 3 + this.moduleCount - 8 - 3] = i
            }
            for (n = 0; n < 18; n++) {
                i = !e && 1 == (t >> n & 1);
                this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = i
            }
        },
        setupTypeInfo: function(e, t) {
            for (var n = this.errorCorrectLevel << 3 | t, i = p.getBCHTypeInfo(n), r = 0; r < 15; r++) {
                var o = !e && 1 == (i >> r & 1);
                r < 6 ? this.modules[r][8] = o : r < 8 ? this.modules[r + 1][8] = o : this.modules[this.moduleCount - 15 + r][8] = o
            }
            for (r = 0; r < 15; r++) {
                o = !e && 1 == (i >> r & 1);
                r < 8 ? this.modules[8][this.moduleCount - r - 1] = o : r < 9 ? this.modules[8][15 - r - 1 + 1] = o : this.modules[8][15 - r - 1] = o
            }
            this.modules[this.moduleCount - 8][8] = !e
        },
        mapData: function(e, t) {
            for (var n = -1, i = this.moduleCount - 1, r = 7, o = 0, a = this.moduleCount - 1; a > 0; a -= 2)
                for (6 == a && a--;;) {
                    for (var s = 0; s < 2; s++)
                        if (null == this.modules[i][a - s]) {
                            var l = !1;
                            o < e.length && (l = 1 == (e[o] >>> r & 1)), p.getMask(t, i, a - s) && (l = !l), this.modules[i][a - s] = l, -1 == --r && (o++, r = 7)
                        }
                    if ((i += n) < 0 || this.moduleCount <= i) {
                        i -= n, n = -n;
                        break
                    }
                }
        }
    }, t.PAD0 = 236, t.PAD1 = 17, t.createData = function(e, n, i) {
        for (var r = g.getRSBlocks(e, n), o = new v, a = 0; a < i.length; a++) {
            var s = i[a];
            o.put(s.mode, 4), o.put(s.getLength(), p.getLengthInBits(s.mode, e)), s.write(o)
        }
        var l = 0;
        for (a = 0; a < r.length; a++) l += r[a].dataCount;
        if (o.getLengthInBits() > 8 * l) throw new Error("code length overflow. (" + o.getLengthInBits() + ">" + 8 * l + ")");
        for (o.getLengthInBits() + 4 <= 8 * l && o.put(0, 4); o.getLengthInBits() % 8 != 0;) o.putBit(!1);
        for (; !(o.getLengthInBits() >= 8 * l || (o.put(t.PAD0, 8), o.getLengthInBits() >= 8 * l));) o.put(t.PAD1, 8);
        return t.createBytes(o, r)
    }, t.createBytes = function(e, t) {
        for (var n = 0, i = 0, r = 0, o = new Array(t.length), a = new Array(t.length), s = 0; s < t.length; s++) {
            var l = t[s].dataCount,
                c = t[s].totalCount - l;
            i = Math.max(i, l), r = Math.max(r, c), o[s] = new Array(l);
            for (var u = 0; u < o[s].length; u++) o[s][u] = 255 & e.buffer[u + n];
            n += l;
            var d = p.getErrorCorrectPolynomial(c),
                f = new m(o[s], d.getLength() - 1).mod(d);
            a[s] = new Array(d.getLength() - 1);
            for (u = 0; u < a[s].length; u++) {
                var h = u + f.getLength() - a[s].length;
                a[s][u] = h >= 0 ? f.get(h) : 0
            }
        }
        var g = 0;
        for (u = 0; u < t.length; u++) g += t[u].totalCount;
        var v = new Array(g),
            _ = 0;
        for (u = 0; u < i; u++)
            for (s = 0; s < t.length; s++) u < o[s].length && (v[_++] = o[s][u]);
        for (u = 0; u < r; u++)
            for (s = 0; s < t.length; s++) u < a[s].length && (v[_++] = a[s][u]);
        return v
    };
    for (var n = {
            MODE_NUMBER: 1,
            MODE_ALPHA_NUM: 2,
            MODE_8BIT_BYTE: 4,
            MODE_KANJI: 8
        }, i = {
            L: 1,
            M: 0,
            Q: 3,
            H: 2
        }, r = 0, o = 1, a = 2, s = 3, l = 4, c = 5, u = 6, d = 7, p = {
            PATTERN_POSITION_TABLE: [
                [],
                [6, 18],
                [6, 22],
                [6, 26],
                [6, 30],
                [6, 34],
                [6, 22, 38],
                [6, 24, 42],
                [6, 26, 46],
                [6, 28, 50],
                [6, 30, 54],
                [6, 32, 58],
                [6, 34, 62],
                [6, 26, 46, 66],
                [6, 26, 48, 70],
                [6, 26, 50, 74],
                [6, 30, 54, 78],
                [6, 30, 56, 82],
                [6, 30, 58, 86],
                [6, 34, 62, 90],
                [6, 28, 50, 72, 94],
                [6, 26, 50, 74, 98],
                [6, 30, 54, 78, 102],
                [6, 28, 54, 80, 106],
                [6, 32, 58, 84, 110],
                [6, 30, 58, 86, 114],
                [6, 34, 62, 90, 118],
                [6, 26, 50, 74, 98, 122],
                [6, 30, 54, 78, 102, 126],
                [6, 26, 52, 78, 104, 130],
                [6, 30, 56, 82, 108, 134],
                [6, 34, 60, 86, 112, 138],
                [6, 30, 58, 86, 114, 142],
                [6, 34, 62, 90, 118, 146],
                [6, 30, 54, 78, 102, 126, 150],
                [6, 24, 50, 76, 102, 128, 154],
                [6, 28, 54, 80, 106, 132, 158],
                [6, 32, 58, 84, 110, 136, 162],
                [6, 26, 54, 82, 110, 138, 166],
                [6, 30, 58, 86, 114, 142, 170]
            ],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function(e) {
                for (var t = e << 10; p.getBCHDigit(t) - p.getBCHDigit(p.G15) >= 0;) t ^= p.G15 << p.getBCHDigit(t) - p.getBCHDigit(p.G15);
                return (e << 10 | t) ^ p.G15_MASK
            },
            getBCHTypeNumber: function(e) {
                for (var t = e << 12; p.getBCHDigit(t) - p.getBCHDigit(p.G18) >= 0;) t ^= p.G18 << p.getBCHDigit(t) - p.getBCHDigit(p.G18);
                return e << 12 | t
            },
            getBCHDigit: function(e) {
                for (var t = 0; 0 != e;) t++, e >>>= 1;
                return t
            },
            getPatternPosition: function(e) {
                return p.PATTERN_POSITION_TABLE[e - 1]
            },
            getMask: function(e, t, n) {
                switch (e) {
                    case r:
                        return (t + n) % 2 == 0;
                    case o:
                        return t % 2 == 0;
                    case a:
                        return n % 3 == 0;
                    case s:
                        return (t + n) % 3 == 0;
                    case l:
                        return (Math.floor(t / 2) + Math.floor(n / 3)) % 2 == 0;
                    case c:
                        return t * n % 2 + t * n % 3 == 0;
                    case u:
                        return (t * n % 2 + t * n % 3) % 2 == 0;
                    case d:
                        return (t * n % 3 + (t + n) % 2) % 2 == 0;
                    default:
                        throw new Error("bad maskPattern:" + e)
                }
            },
            getErrorCorrectPolynomial: function(e) {
                for (var t = new m([1], 0), n = 0; n < e; n++) t = t.multiply(new m([1, f.gexp(n)], 0));
                return t
            },
            getLengthInBits: function(e, t) {
                if (1 <= t && t < 10) switch (e) {
                    case n.MODE_NUMBER:
                        return 10;
                    case n.MODE_ALPHA_NUM:
                        return 9;
                    case n.MODE_8BIT_BYTE:
                    case n.MODE_KANJI:
                        return 8;
                    default:
                        throw new Error("mode:" + e)
                } else if (t < 27) switch (e) {
                    case n.MODE_NUMBER:
                        return 12;
                    case n.MODE_ALPHA_NUM:
                        return 11;
                    case n.MODE_8BIT_BYTE:
                        return 16;
                    case n.MODE_KANJI:
                        return 10;
                    default:
                        throw new Error("mode:" + e)
                } else {
                    if (!(t < 41)) throw new Error("type:" + t);
                    switch (e) {
                        case n.MODE_NUMBER:
                            return 14;
                        case n.MODE_ALPHA_NUM:
                            return 13;
                        case n.MODE_8BIT_BYTE:
                            return 16;
                        case n.MODE_KANJI:
                            return 12;
                        default:
                            throw new Error("mode:" + e)
                    }
                }
            },
            getLostPoint: function(e) {
                for (var t = e.getModuleCount(), n = 0, i = 0; i < t; i++)
                    for (var r = 0; r < t; r++) {
                        for (var o = 0, a = e.isDark(i, r), s = -1; s <= 1; s++)
                            if (!(i + s < 0 || t <= i + s))
                                for (var l = -1; l <= 1; l++) r + l < 0 || t <= r + l || 0 == s && 0 == l || a == e.isDark(i + s, r + l) && o++;
                        o > 5 && (n += 3 + o - 5)
                    }
                for (i = 0; i < t - 1; i++)
                    for (r = 0; r < t - 1; r++) {
                        var c = 0;
                        e.isDark(i, r) && c++, e.isDark(i + 1, r) && c++, e.isDark(i, r + 1) && c++, e.isDark(i + 1, r + 1) && c++, 0 != c && 4 != c || (n += 3)
                    }
                for (i = 0; i < t; i++)
                    for (r = 0; r < t - 6; r++) e.isDark(i, r) && !e.isDark(i, r + 1) && e.isDark(i, r + 2) && e.isDark(i, r + 3) && e.isDark(i, r + 4) && !e.isDark(i, r + 5) && e.isDark(i, r + 6) && (n += 40);
                for (r = 0; r < t; r++)
                    for (i = 0; i < t - 6; i++) e.isDark(i, r) && !e.isDark(i + 1, r) && e.isDark(i + 2, r) && e.isDark(i + 3, r) && e.isDark(i + 4, r) && !e.isDark(i + 5, r) && e.isDark(i + 6, r) && (n += 40);
                var u = 0;
                for (r = 0; r < t; r++)
                    for (i = 0; i < t; i++) e.isDark(i, r) && u++;
                return n += 10 * (Math.abs(100 * u / t / t - 50) / 5)
            }
        }, f = {
            glog: function(e) {
                if (e < 1) throw new Error("glog(" + e + ")");
                return f.LOG_TABLE[e]
            },
            gexp: function(e) {
                for (; e < 0;) e += 255;
                for (; e >= 256;) e -= 255;
                return f.EXP_TABLE[e]
            },
            EXP_TABLE: new Array(256),
            LOG_TABLE: new Array(256)
        }, h = 0; h < 8; h++) f.EXP_TABLE[h] = 1 << h;
    for (h = 8; h < 256; h++) f.EXP_TABLE[h] = f.EXP_TABLE[h - 4] ^ f.EXP_TABLE[h - 5] ^ f.EXP_TABLE[h - 6] ^ f.EXP_TABLE[h - 8];
    for (h = 0; h < 255; h++) f.LOG_TABLE[f.EXP_TABLE[h]] = h;

    function m(e, t) {
        if (null == e.length) throw new Error(e.length + "/" + t);
        for (var n = 0; n < e.length && 0 == e[n];) n++;
        this.num = new Array(e.length - n + t);
        for (var i = 0; i < e.length - n; i++) this.num[i] = e[i + n]
    }

    function g(e, t) {
        this.totalCount = e, this.dataCount = t
    }

    function v() {
        this.buffer = [], this.length = 0
    }
    m.prototype = {
        get: function(e) {
            return this.num[e]
        },
        getLength: function() {
            return this.num.length
        },
        multiply: function(e) {
            for (var t = new Array(this.getLength() + e.getLength() - 1), n = 0; n < this.getLength(); n++)
                for (var i = 0; i < e.getLength(); i++) t[n + i] ^= f.gexp(f.glog(this.get(n)) + f.glog(e.get(i)));
            return new m(t, 0)
        },
        mod: function(e) {
            if (this.getLength() - e.getLength() < 0) return this;
            for (var t = f.glog(this.get(0)) - f.glog(e.get(0)), n = new Array(this.getLength()), i = 0; i < this.getLength(); i++) n[i] = this.get(i);
            for (i = 0; i < e.getLength(); i++) n[i] ^= f.gexp(f.glog(e.get(i)) + t);
            return new m(n, 0).mod(e)
        }
    }, g.RS_BLOCK_TABLE = [
        [1, 26, 19],
        [1, 26, 16],
        [1, 26, 13],
        [1, 26, 9],
        [1, 44, 34],
        [1, 44, 28],
        [1, 44, 22],
        [1, 44, 16],
        [1, 70, 55],
        [1, 70, 44],
        [2, 35, 17],
        [2, 35, 13],
        [1, 100, 80],
        [2, 50, 32],
        [2, 50, 24],
        [4, 25, 9],
        [1, 134, 108],
        [2, 67, 43],
        [2, 33, 15, 2, 34, 16],
        [2, 33, 11, 2, 34, 12],
        [2, 86, 68],
        [4, 43, 27],
        [4, 43, 19],
        [4, 43, 15],
        [2, 98, 78],
        [4, 49, 31],
        [2, 32, 14, 4, 33, 15],
        [4, 39, 13, 1, 40, 14],
        [2, 121, 97],
        [2, 60, 38, 2, 61, 39],
        [4, 40, 18, 2, 41, 19],
        [4, 40, 14, 2, 41, 15],
        [2, 146, 116],
        [3, 58, 36, 2, 59, 37],
        [4, 36, 16, 4, 37, 17],
        [4, 36, 12, 4, 37, 13],
        [2, 86, 68, 2, 87, 69],
        [4, 69, 43, 1, 70, 44],
        [6, 43, 19, 2, 44, 20],
        [6, 43, 15, 2, 44, 16],
        [4, 101, 81],
        [1, 80, 50, 4, 81, 51],
        [4, 50, 22, 4, 51, 23],
        [3, 36, 12, 8, 37, 13],
        [2, 116, 92, 2, 117, 93],
        [6, 58, 36, 2, 59, 37],
        [4, 46, 20, 6, 47, 21],
        [7, 42, 14, 4, 43, 15],
        [4, 133, 107],
        [8, 59, 37, 1, 60, 38],
        [8, 44, 20, 4, 45, 21],
        [12, 33, 11, 4, 34, 12],
        [3, 145, 115, 1, 146, 116],
        [4, 64, 40, 5, 65, 41],
        [11, 36, 16, 5, 37, 17],
        [11, 36, 12, 5, 37, 13],
        [5, 109, 87, 1, 110, 88],
        [5, 65, 41, 5, 66, 42],
        [5, 54, 24, 7, 55, 25],
        [11, 36, 12],
        [5, 122, 98, 1, 123, 99],
        [7, 73, 45, 3, 74, 46],
        [15, 43, 19, 2, 44, 20],
        [3, 45, 15, 13, 46, 16],
        [1, 135, 107, 5, 136, 108],
        [10, 74, 46, 1, 75, 47],
        [1, 50, 22, 15, 51, 23],
        [2, 42, 14, 17, 43, 15],
        [5, 150, 120, 1, 151, 121],
        [9, 69, 43, 4, 70, 44],
        [17, 50, 22, 1, 51, 23],
        [2, 42, 14, 19, 43, 15],
        [3, 141, 113, 4, 142, 114],
        [3, 70, 44, 11, 71, 45],
        [17, 47, 21, 4, 48, 22],
        [9, 39, 13, 16, 40, 14],
        [3, 135, 107, 5, 136, 108],
        [3, 67, 41, 13, 68, 42],
        [15, 54, 24, 5, 55, 25],
        [15, 43, 15, 10, 44, 16],
        [4, 144, 116, 4, 145, 117],
        [17, 68, 42],
        [17, 50, 22, 6, 51, 23],
        [19, 46, 16, 6, 47, 17],
        [2, 139, 111, 7, 140, 112],
        [17, 74, 46],
        [7, 54, 24, 16, 55, 25],
        [34, 37, 13],
        [4, 151, 121, 5, 152, 122],
        [4, 75, 47, 14, 76, 48],
        [11, 54, 24, 14, 55, 25],
        [16, 45, 15, 14, 46, 16],
        [6, 147, 117, 4, 148, 118],
        [6, 73, 45, 14, 74, 46],
        [11, 54, 24, 16, 55, 25],
        [30, 46, 16, 2, 47, 17],
        [8, 132, 106, 4, 133, 107],
        [8, 75, 47, 13, 76, 48],
        [7, 54, 24, 22, 55, 25],
        [22, 45, 15, 13, 46, 16],
        [10, 142, 114, 2, 143, 115],
        [19, 74, 46, 4, 75, 47],
        [28, 50, 22, 6, 51, 23],
        [33, 46, 16, 4, 47, 17],
        [8, 152, 122, 4, 153, 123],
        [22, 73, 45, 3, 74, 46],
        [8, 53, 23, 26, 54, 24],
        [12, 45, 15, 28, 46, 16],
        [3, 147, 117, 10, 148, 118],
        [3, 73, 45, 23, 74, 46],
        [4, 54, 24, 31, 55, 25],
        [11, 45, 15, 31, 46, 16],
        [7, 146, 116, 7, 147, 117],
        [21, 73, 45, 7, 74, 46],
        [1, 53, 23, 37, 54, 24],
        [19, 45, 15, 26, 46, 16],
        [5, 145, 115, 10, 146, 116],
        [19, 75, 47, 10, 76, 48],
        [15, 54, 24, 25, 55, 25],
        [23, 45, 15, 25, 46, 16],
        [13, 145, 115, 3, 146, 116],
        [2, 74, 46, 29, 75, 47],
        [42, 54, 24, 1, 55, 25],
        [23, 45, 15, 28, 46, 16],
        [17, 145, 115],
        [10, 74, 46, 23, 75, 47],
        [10, 54, 24, 35, 55, 25],
        [19, 45, 15, 35, 46, 16],
        [17, 145, 115, 1, 146, 116],
        [14, 74, 46, 21, 75, 47],
        [29, 54, 24, 19, 55, 25],
        [11, 45, 15, 46, 46, 16],
        [13, 145, 115, 6, 146, 116],
        [14, 74, 46, 23, 75, 47],
        [44, 54, 24, 7, 55, 25],
        [59, 46, 16, 1, 47, 17],
        [12, 151, 121, 7, 152, 122],
        [12, 75, 47, 26, 76, 48],
        [39, 54, 24, 14, 55, 25],
        [22, 45, 15, 41, 46, 16],
        [6, 151, 121, 14, 152, 122],
        [6, 75, 47, 34, 76, 48],
        [46, 54, 24, 10, 55, 25],
        [2, 45, 15, 64, 46, 16],
        [17, 152, 122, 4, 153, 123],
        [29, 74, 46, 14, 75, 47],
        [49, 54, 24, 10, 55, 25],
        [24, 45, 15, 46, 46, 16],
        [4, 152, 122, 18, 153, 123],
        [13, 74, 46, 32, 75, 47],
        [48, 54, 24, 14, 55, 25],
        [42, 45, 15, 32, 46, 16],
        [20, 147, 117, 4, 148, 118],
        [40, 75, 47, 7, 76, 48],
        [43, 54, 24, 22, 55, 25],
        [10, 45, 15, 67, 46, 16],
        [19, 148, 118, 6, 149, 119],
        [18, 75, 47, 31, 76, 48],
        [34, 54, 24, 34, 55, 25],
        [20, 45, 15, 61, 46, 16]
    ], g.getRSBlocks = function(e, t) {
        var n = g.getRsBlockTable(e, t);
        if (null == n) throw new Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t);
        for (var i = n.length / 3, r = [], o = 0; o < i; o++)
            for (var a = n[3 * o + 0], s = n[3 * o + 1], l = n[3 * o + 2], c = 0; c < a; c++) r.push(new g(s, l));
        return r
    }, g.getRsBlockTable = function(e, t) {
        switch (t) {
            case i.L:
                return g.RS_BLOCK_TABLE[4 * (e - 1) + 0];
            case i.M:
                return g.RS_BLOCK_TABLE[4 * (e - 1) + 1];
            case i.Q:
                return g.RS_BLOCK_TABLE[4 * (e - 1) + 2];
            case i.H:
                return g.RS_BLOCK_TABLE[4 * (e - 1) + 3];
            default:
                return
        }
    }, v.prototype = {
        get: function(e) {
            var t = Math.floor(e / 8);
            return 1 == (this.buffer[t] >>> 7 - e % 8 & 1)
        },
        put: function(e, t) {
            for (var n = 0; n < t; n++) this.putBit(1 == (e >>> t - n - 1 & 1))
        },
        getLengthInBits: function() {
            return this.length
        },
        putBit: function(e) {
            var t = Math.floor(this.length / 8);
            this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++
        }
    };
    var _ = [
        [17, 14, 11, 7],
        [32, 26, 20, 14],
        [53, 42, 32, 24],
        [78, 62, 46, 34],
        [106, 84, 60, 44],
        [134, 106, 74, 58],
        [154, 122, 86, 64],
        [192, 152, 108, 84],
        [230, 180, 130, 98],
        [271, 213, 151, 119],
        [321, 251, 177, 137],
        [367, 287, 203, 155],
        [425, 331, 241, 177],
        [458, 362, 258, 194],
        [520, 412, 292, 220],
        [586, 450, 322, 250],
        [644, 504, 364, 280],
        [718, 560, 394, 310],
        [792, 624, 442, 338],
        [858, 666, 482, 382],
        [929, 711, 509, 403],
        [1003, 779, 565, 439],
        [1091, 857, 611, 461],
        [1171, 911, 661, 511],
        [1273, 997, 715, 535],
        [1367, 1059, 751, 593],
        [1465, 1125, 805, 625],
        [1528, 1190, 868, 658],
        [1628, 1264, 908, 698],
        [1732, 1370, 982, 742],
        [1840, 1452, 1030, 790],
        [1952, 1538, 1112, 842],
        [2068, 1628, 1168, 898],
        [2188, 1722, 1228, 958],
        [2303, 1809, 1283, 983],
        [2431, 1911, 1351, 1051],
        [2563, 1989, 1423, 1093],
        [2699, 2099, 1499, 1139],
        [2809, 2213, 1579, 1219],
        [2953, 2331, 1663, 1273]
    ];

    function y() {
        var e = !1,
            t = navigator.userAgent;
        if (/android/i.test(t)) {
            e = !0;
            var n = t.toString().match(/android ([0-9]\.[0-9])/i);
            n && n[1] && (e = parseFloat(n[1]))
        }
        return e
    }
    var b = function() {
            var e = function(e, t) {
                this._el = e, this._htOption = t
            };
            return e.prototype.draw = function(e) {
                var t = this._htOption,
                    n = this._el,
                    i = e.getModuleCount();
                Math.floor(t.width / i), Math.floor(t.height / i);

                function r(e, t) {
                    var n = document.createElementNS("http://www.w3.org/2000/svg", e);
                    for (var i in t) t.hasOwnProperty(i) && n.setAttribute(i, t[i]);
                    return n
                }
                this.clear();
                var o = r("svg", {
                    viewBox: "0 0 " + String(i) + " " + String(i),
                    width: "100%",
                    height: "100%",
                    fill: t.colorLight
                });
                o.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg"), n.appendChild(o), o.appendChild(r("rect", {
                    fill: t.colorLight,
                    width: "100%",
                    height: "100%"
                }));
                for (var a = [], s = 0; s < i; s++)
                    for (var l = 0; l < i; l++) {
                        for (var c = 0; l + c < i && e.isDark(s, l + c);) c++;
                        c > 0 && (a.push("M" + l + " " + s + "v1h" + c + "v-1z"), l += c)
                    }
                var u = r("path", {
                    d: a.join(""),
                    fill: t.colorDark
                });
                o.appendChild(u)
            }, e.prototype.clear = function() {
                if (this._el.hasChildNodes())
                    for (var e = this._el.childNodes, t = 0; t < e.length; t++) "SVG" == e[t].nodeName && this._el.removeChild(e[t])
            }, e
        }(),
        E = "svg" === document.documentElement.tagName.toLowerCase() ? b : "undefined" == typeof CanvasRenderingContext2D ? function() {
            var e = function(e, t) {
                this._el = e, this._htOption = t
            };
            return e.prototype.draw = function(e) {
                for (var t = this._htOption, n = this._el, i = e.getModuleCount(), r = Math.floor(t.width / i), o = Math.floor(t.height / i), a = ['<table style="border:0;border-collapse:collapse;">'], s = 0; s < i; s++) {
                    a.push("<tr>");
                    for (var l = 0; l < i; l++) a.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + r + "px;height:" + o + "px;background-color:" + (e.isDark(s, l) ? t.colorDark : t.colorLight) + ';"></td>');
                    a.push("</tr>")
                }
                a.push("</table>"), n.innerHTML = a.join("");
                var c = n.childNodes[0],
                    u = (t.width - c.offsetWidth) / 2,
                    d = (t.height - c.offsetHeight) / 2;
                u > 0 && d > 0 && (c.style.margin = d + "px " + u + "px")
            }, e.prototype.clear = function() {
                this._el.innerHTML = ""
            }, e
        }() : function() {
            function e() {
                this._elImage.src = this._elCanvas.toDataURL("image/png"), this._elImage.style.display = "block", this._elCanvas.style.display = "none"
            }
            if (this._android && this._android <= 2.1) {
                var t = 1 / window.devicePixelRatio,
                    n = CanvasRenderingContext2D.prototype.drawImage;
                CanvasRenderingContext2D.prototype.drawImage = function(e, i, r, o, a, s, l, c, u) {
                    if ("nodeName" in e && /img/i.test(e.nodeName))
                        for (var d = arguments.length - 1; d >= 1; d--) arguments[d] = arguments[d] * t;
                    else void 0 === c && (arguments[1] *= t, arguments[2] *= t, arguments[3] *= t, arguments[4] *= t);
                    n.apply(this, arguments)
                }
            }
            var i = function(e, t) {
                this._bIsPainted = !1, this._android = y(), this._htOption = t, this._elCanvas = document.createElement("canvas"), this._elCanvas.width = t.width + 2 * t.border, this._elCanvas.height = t.height + 2 * t.border, this._elCanvas.style.backgroundColor = t.colorLight, e.appendChild(this._elCanvas), this._el = e, this._oContext = this._elCanvas.getContext("2d"), this._bIsPainted = !1, this._elImage = document.createElement("img"), this._elImage.alt = "Scan me!", this._elImage.style.display = "none", this._el.appendChild(this._elImage), this._bSupportDataURI = null
            };
            return i.prototype.draw = function(e) {
                var t = this._elImage,
                    n = this._oContext,
                    i = this._htOption,
                    r = e.getModuleCount(),
                    o = i.width / r,
                    a = i.height / r,
                    s = Math.round(o),
                    l = Math.round(a);
                t.style.display = "none", this.clear();
                for (var c = 0; c < r; c++)
                    for (var u = 0; u < r; u++) {
                        var d = e.isDark(c, u),
                            p = u * o,
                            f = c * a;
                        n.strokeStyle = d ? i.colorDark : i.colorLight, n.lineWidth = 1, n.fillStyle = d ? i.colorDark : i.colorLight, n.fillRect(p + i.border, f + i.border, o, a), n.strokeRect(Math.floor(p + i.border) + .5, Math.floor(f + i.border) + .5, s, l), n.strokeRect(Math.ceil(p + i.border) - .5, Math.ceil(f + i.border) - .5, s, l)
                    }
                this._bIsPainted = !0
            }, i.prototype.addIcon = async function(e) {
                const t = await new Promise((t, n) => {
                        const i = new Image;
                        i.crossOrigin = "anonymous", i.src = e, i.onload = (() => {
                            t(i)
                        })
                    }),
                    n = .3625 * this._htOption.width + this._htOption.border,
                    i = .3625 * this._htOption.height + this._htOption.border,
                    r = .275 * this._htOption.width,
                    o = .275 * this._htOption.height;
                ! function(e, t, n, i, r, o, a, s) {
                    e.lineWidth = a, e.strokeStyle = s, e.beginPath(), e.arc(t + o, n + o, o, Math.PI, 3 * Math.PI / 2), e.lineTo(i - o + t, n), e.arc(i - o + t, o + n, o, 3 * Math.PI / 2, 2 * Math.PI), e.lineTo(i + t, r + n - o), e.arc(i - o + t, r - o + n, o, 0, 1 * Math.PI / 2), e.lineTo(o + t, r + n), e.arc(o + t, r - o + n, o, 1 * Math.PI / 2, Math.PI), e.closePath(), e.stroke()
                }(this._oContext, n, i, r, o, this._htOption.iconRadius, this._htOption.iconBorderWidth, this._htOption.iconBorderColor), this._oContext.clip(), this._oContext.drawImage(t, n, i, r, o), this._oContext.restore()
            }, i.prototype.makeImage = function() {
                this._bIsPainted && function(e, t) {
                    var n = this;
                    if (n._fFail = t, n._fSuccess = e, null === n._bSupportDataURI) {
                        var i = document.createElement("img"),
                            r = function() {
                                n._bSupportDataURI = !1, n._fFail && n._fFail.call(n)
                            };
                        return i.onabort = r, i.onerror = r, i.onload = function() {
                            n._bSupportDataURI = !0, n._fSuccess && n._fSuccess.call(n)
                        }, void(i.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
                    }!0 === n._bSupportDataURI && n._fSuccess ? n._fSuccess.call(n) : !1 === n._bSupportDataURI && n._fFail && n._fFail.call(n)
                }.call(this, e)
            }, i.prototype.isPainted = function() {
                return this._bIsPainted
            }, i.prototype.clear = function() {
                this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height), this._htOption.hasBg && (this._oContext.fillStyle = this._htOption.colorLight, this._oContext.fillRect(0, 0, this._elCanvas.width, this._elCanvas.height)), this._bIsPainted = !1
            }, i.prototype.round = function(e) {
                return e ? Math.floor(1e3 * e) / 1e3 : e
            }, i
        }();

    function w(e, t) {
        for (var n = 1, r = function(e) {
                var t = encodeURI(e).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
                return t.length + (t.length != e ? 3 : 0)
            }(e), o = 0, a = _.length; o <= a; o++) {
            var s = 0;
            switch (t) {
                case i.L:
                    s = _[o][0];
                    break;
                case i.M:
                    s = _[o][1];
                    break;
                case i.Q:
                    s = _[o][2];
                    break;
                case i.H:
                    s = _[o][3]
            }
            if (r <= s) break;
            n++
        }
        if (n > _.length) throw new Error("Too long data");
        return n
    }(QRCode = function(e, t) {
        if (void 0 === e) return console.error("QRCode: `el` is undefined."), !1;
        if (this._htOption = {
                showTitle: !1,
                width: 256,
                height: 256,
                typeNumber: 4,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: i.H,
                border: 20,
                hasBg: !0,
                iconSrc: null,
                iconBorderWidth: 0,
                iconBorderColor: "#ffffff"
            }, "string" == typeof t && (t = {
                text: t
            }), t)
            for (var n in t) this._htOption[n] = t[n];
        "string" == typeof e && (e = document.getElementById(e));
        var r = this._htOption.useSVG ? b : E;
        this._android = y(), this._el = e, this._oQRCode = null, this._oDrawing = new r(this._el, this._htOption), this._htOption.text && this.makeCode(this._htOption.text)
    }).prototype.makeCode = async function(e) {
        this._oQRCode = new t(w(e, this._htOption.correctLevel), this._htOption.correctLevel), this._oQRCode.addData(e), this._oQRCode.make(), !0 === this._htOption.showTitle && e && (this._el.title = e), this._oDrawing.draw(this._oQRCode), null != this._htOption.iconSrc && "function" == typeof this._oDrawing.addIcon && await this._oDrawing.addIcon(this._htOption.iconSrc), this.makeImage()
    }, QRCode.prototype.makeImage = function() {
        "function" == typeof this._oDrawing.makeImage && (!this._android || this._android >= 3) && this._oDrawing.makeImage()
    }, QRCode.prototype.clear = function() {
        this._oDrawing.clear()
    }, QRCode.CorrectLevel = i
}(),
function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.tingle = t()
}(this, function() {
    var e = !1;

    function t(e) {
        this.opts = function() {
            for (var e = 1; e < arguments.length; e++)
                for (var t in arguments[e]) arguments[e].hasOwnProperty(t) && (arguments[0][t] = arguments[e][t]);
            return arguments[0]
        }({}, {
            onClose: null,
            onOpen: null,
            beforeOpen: null,
            beforeClose: null,
            stickyFooter: !1,
            footer: !1,
            cssClass: [],
            closeLabel: "Close",
            closeMethods: ["overlay", "button", "escape"]
        }, e), this.init()
    }

    function n() {
        this.modalBoxFooter && (this.modalBoxFooter.style.width = this.modalBox.clientWidth + "px", this.modalBoxFooter.style.left = this.modalBox.offsetLeft + "px")
    }
    return t.prototype.init = function() {
        if (!this.modal) return function() {
                this.modal = document.createElement("div"), this.modal.classList.add("tingle-modal"), 0 !== this.opts.closeMethods.length && -1 !== this.opts.closeMethods.indexOf("overlay") || this.modal.classList.add("tingle-modal--noOverlayClose"), this.modal.style.display = "none", this.opts.cssClass.forEach(function(e) {
                    "string" == typeof e && this.modal.classList.add(e)
                }, this), -1 !== this.opts.closeMethods.indexOf("button") && (this.modalCloseBtn = document.createElement("button"), this.modalCloseBtn.type = "button", this.modalCloseBtn.classList.add("tingle-modal__close"), this.modalCloseBtnIcon = document.createElement("span"), this.modalCloseBtnIcon.classList.add("tingle-modal__closeIcon"), this.modalCloseBtnIcon.innerHTML = "×", this.modalCloseBtnLabel = document.createElement("span"), this.modalCloseBtnLabel.classList.add("tingle-modal__closeLabel"), this.modalCloseBtnLabel.innerHTML = this.opts.closeLabel, this.modalCloseBtn.appendChild(this.modalCloseBtnIcon), this.modalCloseBtn.appendChild(this.modalCloseBtnLabel)), this.modalBox = document.createElement("div"), this.modalBox.classList.add("tingle-modal-box"), this.modalBoxContent = document.createElement("div"), this.modalBoxContent.classList.add("tingle-modal-box__content"), this.modalBox.appendChild(this.modalBoxContent), -1 !== this.opts.closeMethods.indexOf("button") && this.modal.appendChild(this.modalCloseBtn), this.modal.appendChild(this.modalBox)
            }.call(this),
            function() {
                this._events = {
                    clickCloseBtn: this.close.bind(this),
                    clickOverlay: function(e) {
                        var t = this.modal.offsetWidth - this.modal.clientWidth,
                            n = e.clientX >= this.modal.offsetWidth - 15,
                            i = this.modal.scrollHeight !== this.modal.offsetHeight;
                        "MacIntel" === navigator.platform && 0 == t && n && i || -1 !== this.opts.closeMethods.indexOf("overlay") && ! function(e, t) {
                            for (;
                                (e = e.parentElement) && !e.classList.contains("tingle-modal"););
                            return e
                        }(e.target) && e.clientX < this.modal.clientWidth && this.close()
                    }.bind(this),
                    resize: this.checkOverflow.bind(this),
                    keyboardNav: function(e) {
                        -1 !== this.opts.closeMethods.indexOf("escape") && 27 === e.which && this.isOpen() && this.close()
                    }.bind(this)
                }, -1 !== this.opts.closeMethods.indexOf("button") && this.modalCloseBtn.addEventListener("click", this._events.clickCloseBtn), this.modal.addEventListener("mousedown", this._events.clickOverlay), window.addEventListener("resize", this._events.resize), document.addEventListener("keydown", this._events.keyboardNav)
            }.call(this), document.body.appendChild(this.modal, document.body.firstChild), this.opts.footer && this.addFooter(), this
    }, t.prototype._busy = function(t) {
        e = t
    }, t.prototype._isBusy = function() {
        return e
    }, t.prototype.destroy = function() {
        null !== this.modal && (this.isOpen() && this.close(!0), function() {
            -1 !== this.opts.closeMethods.indexOf("button") && this.modalCloseBtn.removeEventListener("click", this._events.clickCloseBtn), this.modal.removeEventListener("mousedown", this._events.clickOverlay), window.removeEventListener("resize", this._events.resize), document.removeEventListener("keydown", this._events.keyboardNav)
        }.call(this), this.modal.parentNode.removeChild(this.modal), this.modal = null)
    }, t.prototype.isOpen = function() {
        return !!this.modal.classList.contains("tingle-modal--visible")
    }, t.prototype.open = function() {
        if (!this._isBusy()) {
            this._busy(!0);
            var e = this;
            return "function" == typeof e.opts.beforeOpen && e.opts.beforeOpen(), this.modal.style.removeProperty ? this.modal.style.removeProperty("display") : this.modal.style.removeAttribute("display"), this._scrollPosition = window.pageYOffset, document.body.classList.add("tingle-enabled"), document.body.style.top = -this._scrollPosition + "px", this.setStickyFooter(this.opts.stickyFooter), this.modal.classList.add("tingle-modal--visible"), "function" == typeof e.opts.onOpen && e.opts.onOpen.call(e), e._busy(!1), this.checkOverflow(), this
        }
    }, t.prototype.close = function(e) {
        if (!this._isBusy()) {
            if (this._busy(!0), "function" == typeof this.opts.beforeClose && !this.opts.beforeClose.call(this)) return void this._busy(!1);
            document.body.classList.remove("tingle-enabled"), document.body.style.top = null, window.scrollTo({
                top: this._scrollPosition,
                behavior: "instant"
            }), this.modal.classList.remove("tingle-modal--visible");
            var t = this;
            t.modal.style.display = "none", "function" == typeof t.opts.onClose && t.opts.onClose.call(this), t._busy(!1)
        }
    }, t.prototype.setContent = function(e) {
        return "string" == typeof e ? this.modalBoxContent.innerHTML = e : (this.modalBoxContent.innerHTML = "", this.modalBoxContent.appendChild(e)), this.isOpen() && this.checkOverflow(), this
    }, t.prototype.getContent = function() {
        return this.modalBoxContent
    }, t.prototype.addFooter = function() {
        return function() {
            this.modalBoxFooter = document.createElement("div"), this.modalBoxFooter.classList.add("tingle-modal-box__footer"), this.modalBox.appendChild(this.modalBoxFooter)
        }.call(this), this
    }, t.prototype.setFooterContent = function(e) {
        return this.modalBoxFooter.innerHTML = e, this
    }, t.prototype.getFooterContent = function() {
        return this.modalBoxFooter
    }, t.prototype.setStickyFooter = function(e) {
        return this.isOverflow() || (e = !1), e ? this.modalBox.contains(this.modalBoxFooter) && (this.modalBox.removeChild(this.modalBoxFooter), this.modal.appendChild(this.modalBoxFooter), this.modalBoxFooter.classList.add("tingle-modal-box__footer--sticky"), n.call(this), this.modalBoxContent.style["padding-bottom"] = this.modalBoxFooter.clientHeight + 20 + "px") : this.modalBoxFooter && (this.modalBox.contains(this.modalBoxFooter) || (this.modal.removeChild(this.modalBoxFooter), this.modalBox.appendChild(this.modalBoxFooter), this.modalBoxFooter.style.width = "auto", this.modalBoxFooter.style.left = "", this.modalBoxContent.style["padding-bottom"] = "", this.modalBoxFooter.classList.remove("tingle-modal-box__footer--sticky"))), this
    }, t.prototype.addFooterBtn = function(e, t, n) {
        var i = document.createElement("button");
        return i.innerHTML = e, i.addEventListener("click", n), "string" == typeof t && t.length && t.split(" ").forEach(function(e) {
            i.classList.add(e)
        }), this.modalBoxFooter.appendChild(i), i
    }, t.prototype.resize = function() {
        console.warn("Resize is deprecated and will be removed in version 1.0")
    }, t.prototype.isOverflow = function() {
        return window.innerHeight <= this.modalBox.clientHeight
    }, t.prototype.checkOverflow = function() {
        this.modal.classList.contains("tingle-modal--visible") && (this.isOverflow() ? this.modal.classList.add("tingle-modal--overflow") : this.modal.classList.remove("tingle-modal--overflow"), !this.isOverflow() && this.opts.stickyFooter ? this.setStickyFooter(!1) : this.isOverflow() && this.opts.stickyFooter && (n.call(this), this.setStickyFooter(!0)))
    }, {
        modal: t
    }
}), window.doast = {
    duration: 3e3,
    starTop: -60,
    success: function(e, t) {
        t = void 0 === t ? this.duration : t;
        var n = this._generateMessage("success", e);
        return this._end(n, t)
    },
    warning: function(e, t) {
        t = void 0 === t ? this.duration : t;
        var n = this._generateMessage("warning", e);
        return this._end(n, t)
    },
    error: function(e, t) {
        t = void 0 === t ? this.duration : t;
        var n = this._generateMessage("error", e);
        return this._end(n, t)
    },
    info: function(e, t) {
        t = void 0 === t ? this.duration : t;
        var n = this._generateMessage("info", e);
        return this._end(n, t)
    },
    loading: function(e, t) {
        t = void 0 === t ? this.duration : t;
        var n = this._generateMessage("loading", e);
        return this._end(n, t)
    },
    clear: function() {
        return $(".dt-message > .dt-message-wrap").remove(), this
    },
    _generateMessage: function(e, t) {
        this._init();
        var n = {},
            i = this._randomString();
        n.obj = '[dt="' + i + '"]', n.html = this._generateMessageHtml(e, t, i);
        var r = this;
        return n.remove = function() {
            r._remove(n.obj)
        }, n.text = function(e) {
            $(".dt-message").find(n.obj).find(".text").html(e)
        }, n
    },
    _generateMessageHtml: function(e, t, n) {
        var i = `<div class="dt-message-wrap" dt="${n}" style="margin-top: ${-this.starTop}px;">`;
        return i += '<div class="dt-message-body">', i += this._generateMessageIcon(e), i += `<span>${t}</span>`, i += "</div>", i += "</div>"
    },
    _generateMessageIcon: function(e) {
        let t = '<i class="iconfont icon-info text-info"></i>';
        switch (e) {
            case "success":
                t = '<i class="iconfont icon-finish text-success"></i>';
                break;
            case "warning":
                t = '<i class="iconfont icon-warning text-warning"></i>';
                break;
            case "error":
                t = '<i class="iconfont icon-delete text-error"></i>';
                break;
            case "loading":
                t = '<i class="loading"></i>'
        }
        return t
    },
    _remove: function(e) {
        $(".dt-message").find(e).animate({
            marginTop: "0px",
            opacity: 0
        }, 300, function() {
            $(".dt-message").find(e).remove()
        })
    },
    _randomString: function(e) {
        e = e || 32;
        var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
            n = t.length,
            i = "",
            r = (new Date).getTime().toString();
        e / 2 > r.length ? e -= r.length : e /= 2;
        for (var o = 0; o < e; o++) i += t.charAt(Math.floor(Math.random() * n)), r[o] && (i += r[r.length - o - 1]);
        return i
    },
    _init: function() {
        if (0 === $(".dt-message").length) {
            $("body").append('<div class="dt-message"></div>')
        }
    },
    _end: function(e, t) {
        var n = this;
        return $(".dt-message").append(e.html), $(".dt-message").find(e.obj).animate({
            marginTop: "16px",
            opacity: 1
        }, 100, function() {
            t > 0 && setTimeout(function() {
                n._remove(e.obj)
            }, t)
        }), e
    }
};
var modal = class {
    constructor(e = "", t = {}) {
        if (!window.jQuery) throw "jQuery is required.";
        if ("undefined" == typeof tingle) throw "tingle modal lib is required.";
        this.userData = null;
        var n = null;
        t.onOpen && (n = t.onOpen, delete t.onOpen);
        var i = [];
        if (t.footerButtons && (i = t.footerButtons, delete t.footerButtons), this.options = {
                footer: !1,
                stickyFooter: !1,
                closeMethods: ["button", "escape"],
                closeLabel: "Close",
                onOpen: function() {
                    if (this.opts.closeMethods && -1 !== this.opts.closeMethods.indexOf("button")) {
                        var e = document.querySelector(".tingle-modal--visible > .tingle-modal__close");
                        e && document.querySelector(".tingle-modal--visible .tingle-modal-box").appendChild(e)
                    }
                    $(".tingle-modal-box").attr("role", "dialog"), n && "function" == typeof n && n()
                },
                cssClass: ["modal-container"]
            }, $.extend(this.options, t), this.modal = new tingle.modal(this.options), this.modal.setContent(e), i)
            for (let e of i) {
                let t = e.callback;
                "function" == typeof t && (t = t.bind(this.modal)), this.modal.addFooterBtn(e.label, e.cssClass, t)
            }
    }
    open(e) {
        return void 0 !== e ? this.modal.setContent(e).open() : this.modal.open(), this
    }
    close() {
        return this.modal.close(), this
    }
    setFooterContent(e) {
        return this.modal.setFooterContent(e), this
    }
    clearFooterContent() {
        return this.setFooterContent(""), this
    }
    addFooterButton(e, t, n) {
        return this.modal.addFooterBtn(e, t, n), this
    }
    setUserData(e) {
        return this.userData = e, this
    }
    getUserData() {
        return this.userData
    }
    destroy() {
        return this.modal.destroy(), this.modal = null, this
    }
};
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t()
}(this, function() {
    "use strict";

    function e(e) {
        return e && "[object Function]" === {}.toString.call(e)
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var n = e.ownerDocument.defaultView.getComputedStyle(e, null);
        return t ? n[t] : n
    }

    function n(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host
    }

    function i(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case "HTML":
            case "BODY":
                return e.ownerDocument.body;
            case "#document":
                return e.body
        }
        var r = t(e),
            o = r.overflow,
            a = r.overflowX,
            s = r.overflowY;
        return /(auto|scroll|overlay)/.test(o + s + a) ? e : i(n(e))
    }

    function r(e) {
        return 11 === e ? q : 10 === e ? V : q || V
    }

    function o(e) {
        if (!e) return document.documentElement;
        for (var n = r(10) ? document.body : null, i = e.offsetParent || null; i === n && e.nextElementSibling;) i = (e = e.nextElementSibling).offsetParent;
        var a = i && i.nodeName;
        return a && "BODY" !== a && "HTML" !== a ? -1 !== ["TH", "TD", "TABLE"].indexOf(i.nodeName) && "static" === t(i, "position") ? o(i) : i : e ? e.ownerDocument.documentElement : document.documentElement
    }

    function a(e) {
        return null === e.parentNode ? e : a(e.parentNode)
    }

    function s(e, t) {
        if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
        var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = n ? e : t,
            r = n ? t : e,
            l = document.createRange();
        l.setStart(i, 0), l.setEnd(r, 0);
        var c = l.commonAncestorContainer;
        if (e !== c && t !== c || i.contains(r)) return function(e) {
            var t = e.nodeName;
            return "BODY" !== t && ("HTML" === t || o(e.firstElementChild) === e)
        }(c) ? c : o(c);
        var u = a(e);
        return u.host ? s(u.host, t) : s(e, a(t).host)
    }

    function l(e) {
        var t = "top" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
            n = e.nodeName;
        if ("BODY" === n || "HTML" === n) {
            var i = e.ownerDocument.documentElement;
            return (e.ownerDocument.scrollingElement || i)[t]
        }
        return e[t]
    }

    function c(e, t) {
        var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            i = l(t, "top"),
            r = l(t, "left"),
            o = n ? -1 : 1;
        return e.top += i * o, e.bottom += i * o, e.left += r * o, e.right += r * o, e
    }

    function u(e, t) {
        var n = "x" === t ? "Left" : "Top",
            i = "Left" == n ? "Right" : "Bottom";
        return parseFloat(e["border" + n + "Width"], 10) + parseFloat(e["border" + i + "Width"], 10)
    }

    function d(e, t, n, i) {
        return H(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], r(10) ? parseInt(n["offset" + e]) + parseInt(i["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
    }

    function p(e) {
        var t = e.body,
            n = e.documentElement,
            i = r(10) && getComputedStyle(n);
        return {
            height: d("Height", t, n, i),
            width: d("Width", t, n, i)
        }
    }

    function f(e) {
        return Q({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function h(e) {
        var n = {};
        try {
            if (r(10)) {
                n = e.getBoundingClientRect();
                var i = l(e, "top"),
                    o = l(e, "left");
                n.top += i, n.left += o, n.bottom += i, n.right += o
            } else n = e.getBoundingClientRect()
        } catch (e) {}
        var a = {
                left: n.left,
                top: n.top,
                width: n.right - n.left,
                height: n.bottom - n.top
            },
            s = "HTML" === e.nodeName ? p(e.ownerDocument) : {},
            c = s.width || e.clientWidth || a.right - a.left,
            d = s.height || e.clientHeight || a.bottom - a.top,
            h = e.offsetWidth - c,
            m = e.offsetHeight - d;
        if (h || m) {
            var g = t(e);
            h -= u(g, "x"), m -= u(g, "y"), a.width -= h, a.height -= m
        }
        return f(a)
    }

    function m(e, n) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            a = r(10),
            s = "HTML" === n.nodeName,
            l = h(e),
            u = h(n),
            d = i(e),
            p = t(n),
            m = parseFloat(p.borderTopWidth, 10),
            g = parseFloat(p.borderLeftWidth, 10);
        o && s && (u.top = H(u.top, 0), u.left = H(u.left, 0));
        var v = f({
            top: l.top - u.top - m,
            left: l.left - u.left - g,
            width: l.width,
            height: l.height
        });
        if (v.marginTop = 0, v.marginLeft = 0, !a && s) {
            var _ = parseFloat(p.marginTop, 10),
                y = parseFloat(p.marginLeft, 10);
            v.top -= m - _, v.bottom -= m - _, v.left -= g - y, v.right -= g - y, v.marginTop = _, v.marginLeft = y
        }
        return (a && !o ? n.contains(d) : n === d && "BODY" !== d.nodeName) && (v = c(v, n)), v
    }

    function g(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            n = e.ownerDocument.documentElement,
            i = m(e, n),
            r = H(n.clientWidth, window.innerWidth || 0),
            o = H(n.clientHeight, window.innerHeight || 0),
            a = t ? 0 : l(n),
            s = t ? 0 : l(n, "left");
        return f({
            top: a - i.top + i.marginTop,
            left: s - i.left + i.marginLeft,
            width: r,
            height: o
        })
    }

    function v(e) {
        var i = e.nodeName;
        return "BODY" !== i && "HTML" !== i && ("fixed" === t(e, "position") || v(n(e)))
    }

    function _(e) {
        if (!e || !e.parentElement || r()) return document.documentElement;
        for (var n = e.parentElement; n && "none" === t(n, "transform");) n = n.parentElement;
        return n || document.documentElement
    }

    function y(e, t, r, o) {
        var a = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
            l = {
                top: 0,
                left: 0
            },
            c = a ? _(e) : s(e, t);
        if ("viewport" === o) l = g(c, a);
        else {
            var u;
            "scrollParent" === o ? "BODY" === (u = i(n(t))).nodeName && (u = e.ownerDocument.documentElement) : u = "window" === o ? e.ownerDocument.documentElement : o;
            var d = m(u, c, a);
            if ("HTML" !== u.nodeName || v(c)) l = d;
            else {
                var f = p(e.ownerDocument),
                    h = f.height,
                    y = f.width;
                l.top += d.top - d.marginTop, l.bottom = h + d.top, l.left += d.left - d.marginLeft, l.right = y + d.left
            }
        }
        var b = "number" == typeof(r = r || 0);
        return l.left += b ? r : r.left || 0, l.top += b ? r : r.top || 0, l.right -= b ? r : r.right || 0, l.bottom -= b ? r : r.bottom || 0, l
    }

    function b(e, t, n, i, r) {
        var o = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf("auto")) return e;
        var a = y(n, i, o, r),
            s = {
                top: {
                    width: a.width,
                    height: t.top - a.top
                },
                right: {
                    width: a.right - t.right,
                    height: a.height
                },
                bottom: {
                    width: a.width,
                    height: a.bottom - t.bottom
                },
                left: {
                    width: t.left - a.left,
                    height: a.height
                }
            },
            l = Object.keys(s).map(function(e) {
                return Q({
                    key: e
                }, s[e], {
                    area: function(e) {
                        return e.width * e.height
                    }(s[e])
                })
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            c = l.filter(function(e) {
                var t = e.width,
                    i = e.height;
                return t >= n.clientWidth && i >= n.clientHeight
            }),
            u = 0 < c.length ? c[0].key : l[0].key,
            d = e.split("-")[1];
        return u + (d ? "-" + d : "")
    }

    function E(e, t, n) {
        var i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return m(n, i ? _(t) : s(t, n), i)
    }

    function w(e) {
        var t = e.ownerDocument.defaultView.getComputedStyle(e),
            n = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0),
            i = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
        return {
            width: e.offsetWidth + i,
            height: e.offsetHeight + n
        }
    }

    function T(e) {
        var t = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function S(e, t, n) {
        n = n.split("-")[0];
        var i = w(e),
            r = {
                width: i.width,
                height: i.height
            },
            o = -1 !== ["right", "left"].indexOf(n),
            a = o ? "top" : "left",
            s = o ? "left" : "top",
            l = o ? "height" : "width",
            c = o ? "width" : "height";
        return r[a] = t[a] + t[l] / 2 - i[l] / 2, r[s] = n === s ? t[s] - i[c] : t[T(s)], r
    }

    function A(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function C(t, n, i) {
        return (void 0 === i ? t : t.slice(0, function(e, t, n) {
            if (Array.prototype.findIndex) return e.findIndex(function(e) {
                return e[t] === n
            });
            var i = A(e, function(e) {
                return e[t] === n
            });
            return e.indexOf(i)
        }(t, "name", i))).forEach(function(t) {
            t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var i = t.function || t.fn;
            t.enabled && e(i) && (n.offsets.popper = f(n.offsets.popper), n.offsets.reference = f(n.offsets.reference), n = i(n, t))
        }), n
    }

    function k(e, t) {
        return e.some(function(e) {
            var n = e.name;
            return e.enabled && n === t
        })
    }

    function x(e) {
        for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), i = 0; i < t.length; i++) {
            var r = t[i],
                o = r ? "" + r + n : e;
            if (void 0 !== document.body.style[o]) return o
        }
        return null
    }

    function L(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }

    function O(e, t, n, r) {
        n.updateBound = r, L(e).addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var o = i(e);
        return function e(t, n, r, o) {
            var a = "BODY" === t.nodeName,
                s = a ? t.ownerDocument.defaultView : t;
            s.addEventListener(n, r, {
                passive: !0
            }), a || e(i(s.parentNode), n, r, o), o.push(s)
        }(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n
    }

    function I() {
        var e, t;
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (e = this.reference, t = this.state, L(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener("scroll", t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t))
    }

    function R(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function N(e, t) {
        Object.keys(t).forEach(function(n) {
            var i = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && R(t[n]) && (i = "px"), e.style[n] = t[n] + i
        })
    }

    function D(e, t, n) {
        var i = A(e, function(e) {
                return e.name === t
            }),
            r = !!i && e.some(function(e) {
                return e.name === n && e.enabled && e.order < i.order
            });
        if (!r) {
            var o = "`" + t + "`";
            console.warn("`" + n + "` modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
        }
        return r
    }

    function P(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            n = ee.indexOf(e),
            i = ee.slice(n + 1).concat(ee.slice(0, n));
        return t ? i.reverse() : i
    }

    function B(e, t, n, i) {
        var r = [0, 0],
            o = -1 !== ["right", "left"].indexOf(i),
            a = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            s = a.indexOf(A(a, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        a[s] && -1 === a[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            c = -1 === s ? [a] : [a.slice(0, s).concat([a[s].split(l)[0]]), [a[s].split(l)[1]].concat(a.slice(s + 1))];
        return (c = c.map(function(e, i) {
            var r = (1 === i ? !o : o) ? "height" : "width",
                a = !1;
            return e.reduce(function(e, t) {
                return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, a = !0, e) : a ? (e[e.length - 1] += t, a = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return function(e, t, n, i) {
                    var r = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        o = +r[1],
                        a = r[2];
                    if (!o) return e;
                    if (0 === a.indexOf("%")) {
                        var s;
                        switch (a) {
                            case "%p":
                                s = n;
                                break;
                            case "%":
                            case "%r":
                            default:
                                s = i
                        }
                        return f(s)[t] / 100 * o
                    }
                    return "vh" === a || "vw" === a ? ("vh" === a ? H(document.documentElement.clientHeight, window.innerHeight || 0) : H(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o : o
                }(e, r, t, n)
            })
        })).forEach(function(e, t) {
            e.forEach(function(n, i) {
                R(n) && (r[t] += n * ("-" === e[i - 1] ? -1 : 1))
            })
        }), r
    }
    for (var M = Math.min, F = Math.floor, U = Math.round, H = Math.max, j = "undefined" != typeof window && "undefined" != typeof document, $ = ["Edge", "Trident", "Firefox"], z = 0, G = 0; G < $.length; G += 1)
        if (j && 0 <= navigator.userAgent.indexOf($[G])) {
            z = 1;
            break
        }
    var W = j && window.Promise ? function(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1, e()
                }))
            }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, z))
            }
        },
        q = j && !(!window.MSInputMethodContext || !document.documentMode),
        V = j && /MSIE 10/.test(navigator.userAgent),
        Y = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
        X = function() {
            function e(e, t) {
                for (var n, i = 0; i < t.length; i++)(n = t[i]).enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        K = function(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        },
        Q = Object.assign || function(e) {
            for (var t, n = 1; n < arguments.length; n++)
                for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        },
        Z = j && /Firefox/i.test(navigator.userAgent),
        J = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        ee = J.slice(3),
        te = "flip",
        ne = "clockwise",
        ie = "counterclockwise",
        re = function() {
            function t(n, i) {
                var r = this,
                    o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                Y(this, t), this.scheduleUpdate = function() {
                    return requestAnimationFrame(r.update)
                }, this.update = W(this.update.bind(this)), this.options = Q({}, t.Defaults, o), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = n && n.jquery ? n[0] : n, this.popper = i && i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(Q({}, t.Defaults.modifiers, o.modifiers)).forEach(function(e) {
                    r.options.modifiers[e] = Q({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return Q({
                        name: e
                    }, r.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(t) {
                    t.enabled && e(t.onLoad) && t.onLoad(r.reference, r.popper, r.options, t, r.state)
                }), this.update();
                var a = this.options.eventsEnabled;
                a && this.enableEventListeners(), this.state.eventsEnabled = a
            }
            return X(t, [{
                key: "update",
                value: function() {
                    return function() {
                        if (!this.state.isDestroyed) {
                            var e = {
                                instance: this,
                                styles: {},
                                arrowStyles: {},
                                attributes: {},
                                flipped: !1,
                                offsets: {}
                            };
                            e.offsets.reference = E(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = b(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = S(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = C(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
                        }
                    }.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return function() {
                        return this.state.isDestroyed = !0, k(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[x("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                    }.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return function() {
                        this.state.eventsEnabled || (this.state = O(this.reference, this.options, this.state, this.scheduleUpdate))
                    }.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return I.call(this)
                }
            }]), t
        }();
    return re.Utils = ("undefined" == typeof window ? global : window).PopperUtils, re.placements = J, re.Defaults = {
        placement: "bottom",
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t = e.placement,
                        n = t.split("-")[0],
                        i = t.split("-")[1];
                    if (i) {
                        var r = e.offsets,
                            o = r.reference,
                            a = r.popper,
                            s = -1 !== ["bottom", "top"].indexOf(n),
                            l = s ? "left" : "top",
                            c = s ? "width" : "height",
                            u = {
                                start: K({}, l, o[l]),
                                end: K({}, l, o[l] + o[c] - a[c])
                            };
                        e.offsets.popper = Q({}, a, u[i])
                    }
                    return e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: function(e, t) {
                    var n, i = t.offset,
                        r = e.placement,
                        o = e.offsets,
                        a = o.popper,
                        s = o.reference,
                        l = r.split("-")[0];
                    return n = R(+i) ? [+i, 0] : B(i, a, s, l), "left" === l ? (a.top += n[0], a.left -= n[1]) : "right" === l ? (a.top += n[0], a.left += n[1]) : "top" === l ? (a.left += n[0], a.top -= n[1]) : "bottom" === l && (a.left += n[0], a.top += n[1]), e.popper = a, e
                },
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, t) {
                    var n = t.boundariesElement || o(e.instance.popper);
                    e.instance.reference === n && (n = o(n));
                    var i = x("transform"),
                        r = e.instance.popper.style,
                        a = r.top,
                        s = r.left,
                        l = r[i];
                    r.top = "", r.left = "", r[i] = "";
                    var c = y(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
                    r.top = a, r.left = s, r[i] = l, t.boundaries = c;
                    var u = t.priority,
                        d = e.offsets.popper,
                        p = {
                            primary: function(e) {
                                var n = d[e];
                                return d[e] < c[e] && !t.escapeWithReference && (n = H(d[e], c[e])), K({}, e, n)
                            },
                            secondary: function(e) {
                                var n = "right" === e ? "left" : "top",
                                    i = d[n];
                                return d[e] > c[e] && !t.escapeWithReference && (i = M(d[n], c[e] - ("right" === e ? d.width : d.height))), K({}, n, i)
                            }
                        };
                    return u.forEach(function(e) {
                        var t = -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                        d = Q({}, d, p[t](e))
                    }), e.offsets.popper = d, e
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = e.offsets,
                        n = t.popper,
                        i = t.reference,
                        r = e.placement.split("-")[0],
                        o = F,
                        a = -1 !== ["top", "bottom"].indexOf(r),
                        s = a ? "right" : "bottom",
                        l = a ? "left" : "top",
                        c = a ? "width" : "height";
                    return n[s] < o(i[l]) && (e.offsets.popper[l] = o(i[l]) - n[c]), n[l] > o(i[s]) && (e.offsets.popper[l] = o(i[s])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, n) {
                    var i;
                    if (!D(e.instance.modifiers, "arrow", "keepTogether")) return e;
                    var r = n.element;
                    if ("string" == typeof r) {
                        if (!(r = e.instance.popper.querySelector(r))) return e
                    } else if (!e.instance.popper.contains(r)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                    var o = e.placement.split("-")[0],
                        a = e.offsets,
                        s = a.popper,
                        l = a.reference,
                        c = -1 !== ["left", "right"].indexOf(o),
                        u = c ? "height" : "width",
                        d = c ? "Top" : "Left",
                        p = d.toLowerCase(),
                        h = c ? "left" : "top",
                        m = c ? "bottom" : "right",
                        g = w(r)[u];
                    l[m] - g < s[p] && (e.offsets.popper[p] -= s[p] - (l[m] - g)), l[p] + g > s[m] && (e.offsets.popper[p] += l[p] + g - s[m]), e.offsets.popper = f(e.offsets.popper);
                    var v = l[p] + l[u] / 2 - g / 2,
                        _ = t(e.instance.popper),
                        y = parseFloat(_["margin" + d], 10),
                        b = parseFloat(_["border" + d + "Width"], 10),
                        E = v - e.offsets.popper[p] - y - b;
                    return E = H(M(s[u] - g, E), 0), e.arrowElement = r, e.offsets.arrow = (K(i = {}, p, U(E)), K(i, h, ""), i), e
                },
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(e, t) {
                    if (k(e.instance.modifiers, "inner")) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var n = y(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        i = e.placement.split("-")[0],
                        r = T(i),
                        o = e.placement.split("-")[1] || "",
                        a = [];
                    switch (t.behavior) {
                        case te:
                            a = [i, r];
                            break;
                        case ne:
                            a = P(i);
                            break;
                        case ie:
                            a = P(i, !0);
                            break;
                        default:
                            a = t.behavior
                    }
                    return a.forEach(function(s, l) {
                        if (i !== s || a.length === l + 1) return e;
                        i = e.placement.split("-")[0], r = T(i);
                        var c = e.offsets.popper,
                            u = e.offsets.reference,
                            d = F,
                            p = "left" === i && d(c.right) > d(u.left) || "right" === i && d(c.left) < d(u.right) || "top" === i && d(c.bottom) > d(u.top) || "bottom" === i && d(c.top) < d(u.bottom),
                            f = d(c.left) < d(n.left),
                            h = d(c.right) > d(n.right),
                            m = d(c.top) < d(n.top),
                            g = d(c.bottom) > d(n.bottom),
                            v = "left" === i && f || "right" === i && h || "top" === i && m || "bottom" === i && g,
                            _ = -1 !== ["top", "bottom"].indexOf(i),
                            y = !!t.flipVariations && (_ && "start" === o && f || _ && "end" === o && h || !_ && "start" === o && m || !_ && "end" === o && g);
                        (p || v || y) && (e.flipped = !0, (p || v) && (i = a[l + 1]), y && (o = function(e) {
                            return "end" === e ? "start" : "start" === e ? "end" : e
                        }(o)), e.placement = i + (o ? "-" + o : ""), e.offsets.popper = Q({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)), e = C(e.instance.modifiers, e, "flip"))
                    }), e
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement,
                        n = t.split("-")[0],
                        i = e.offsets,
                        r = i.popper,
                        o = i.reference,
                        a = -1 !== ["left", "right"].indexOf(n),
                        s = -1 === ["top", "left"].indexOf(n);
                    return r[a ? "left" : "top"] = o[n] - (s ? r[a ? "width" : "height"] : 0), e.placement = T(t), e.offsets.popper = f(r), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!D(e.instance.modifiers, "hide", "preventOverflow")) return e;
                    var t = e.offsets.reference,
                        n = A(e.instance.modifiers, function(e) {
                            return "preventOverflow" === e.name
                        }).boundaries;
                    if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var n = t.x,
                        i = t.y,
                        r = e.offsets.popper,
                        a = A(e.instance.modifiers, function(e) {
                            return "applyStyle" === e.name
                        }).gpuAcceleration;
                    void 0 !== a && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var s, l, c = void 0 === a ? t.gpuAcceleration : a,
                        u = o(e.instance.popper),
                        d = h(u),
                        p = {
                            position: r.position
                        },
                        f = function(e, t) {
                            var n = e.offsets,
                                i = n.popper,
                                r = n.reference,
                                o = -1 !== ["left", "right"].indexOf(e.placement),
                                a = -1 !== e.placement.indexOf("-"),
                                s = r.width % 2 == i.width % 2,
                                l = 1 == r.width % 2 && 1 == i.width % 2,
                                c = function(e) {
                                    return e
                                },
                                u = t ? o || a || s ? U : F : c,
                                d = t ? U : c;
                            return {
                                left: u(l && !a && t ? i.left - 1 : i.left),
                                top: d(i.top),
                                bottom: d(i.bottom),
                                right: u(i.right)
                            }
                        }(e, 2 > window.devicePixelRatio || !Z),
                        m = "bottom" === n ? "top" : "bottom",
                        g = "right" === i ? "left" : "right",
                        v = x("transform");
                    if (l = "bottom" == m ? "HTML" === u.nodeName ? -u.clientHeight + f.bottom : -d.height + f.bottom : f.top, s = "right" == g ? "HTML" === u.nodeName ? -u.clientWidth + f.right : -d.width + f.right : f.left, c && v) p[v] = "translate3d(" + s + "px, " + l + "px, 0)", p[m] = 0, p[g] = 0, p.willChange = "transform";
                    else {
                        var _ = "bottom" == m ? -1 : 1,
                            y = "right" == g ? -1 : 1;
                        p[m] = l * _, p[g] = s * y, p.willChange = m + ", " + g
                    }
                    var b = {
                        "x-placement": e.placement
                    };
                    return e.attributes = Q({}, b, e.attributes), e.styles = Q({}, p, e.styles), e.arrowStyles = Q({}, e.offsets.arrow, e.arrowStyles), e
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    return N(e.instance.popper, e.styles),
                        function(e, t) {
                            Object.keys(t).forEach(function(n) {
                                !1 === t[n] ? e.removeAttribute(n) : e.setAttribute(n, t[n])
                            })
                        }(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && N(e.arrowElement, e.arrowStyles), e
                },
                onLoad: function(e, t, n, i, r) {
                    var o = E(r, t, e, n.positionFixed),
                        a = b(n.placement, o, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                    return t.setAttribute("x-placement", a), N(t, {
                        position: n.positionFixed ? "fixed" : "absolute"
                    }), n
                },
                gpuAcceleration: void 0
            }
        }
    }, re
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("popper.js")) : "function" == typeof define && define.amd ? define(["popper.js"], t) : e.Tooltip = t(e.Popper)
}(this, function(e) {
    "use strict";
    e = e && e.hasOwnProperty("default") ? e.default : e;
    var t = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
        n = function() {
            function e(e, t) {
                for (var n, i = 0; i < t.length; i++)(n = t[i]).enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        i = Object.assign || function(e) {
            for (var t, n = 1; n < arguments.length; n++)
                for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        },
        r = {
            container: !1,
            delay: 0,
            html: !1,
            placement: "top",
            title: "",
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            offset: 0,
            arrowSelector: ".tooltip-arrow, .tooltip__arrow",
            innerSelector: ".tooltip-inner, .tooltip__inner"
        },
        o = function() {
            function o(e, n) {
                t(this, o), a.call(this), n = i({}, r, n), e.jquery && (e = e[0]), this.reference = e, this.options = n;
                var s = "string" == typeof n.trigger ? n.trigger.split(" ").filter(function(e) {
                    return -1 !== ["click", "hover", "focus"].indexOf(e)
                }) : [];
                this._isOpen = !1, this._popperOptions = {}, this._setEventListeners(e, s, n)
            }
            return n(o, [{
                key: "_create",
                value: function(e, t, n, i) {
                    var r = window.document.createElement("div");
                    r.innerHTML = t.trim();
                    var o = r.childNodes[0];
                    o.id = "tooltip_" + Math.random().toString(36).substr(2, 10), o.setAttribute("aria-hidden", "false");
                    var a = r.querySelector(this.options.innerSelector);
                    return this._addTitleContent(e, n, i, a), o
                }
            }, {
                key: "_addTitleContent",
                value: function(e, t, n, i) {
                    if (1 === t.nodeType || 11 === t.nodeType) n && i.appendChild(t);
                    else if (function(e) {
                            return e && "[object Function]" === {}.toString.call(e)
                        }(t)) {
                        var r = t.call(e);
                        n ? i.innerHTML = r : i.textContent = r
                    } else n ? i.innerHTML = t : i.textContent = t
                }
            }, {
                key: "_show",
                value: function(t, n) {
                    if (this._isOpen && !this._isOpening) return this;
                    if (this._isOpen = !0, this._tooltipNode) return this._tooltipNode.style.visibility = "visible", this._tooltipNode.setAttribute("aria-hidden", "false"), this.popperInstance.update(), this;
                    var r = t.getAttribute("title") || n.title;
                    if (!r) return this;
                    var o = this._create(t, n.template, r, n.html);
                    t.setAttribute("aria-describedby", o.id);
                    var a = this._findContainer(n.container, t);
                    return this._append(o, a), this._popperOptions = i({}, n.popperOptions, {
                        placement: n.placement
                    }), this._popperOptions.modifiers = i({}, this._popperOptions.modifiers, {
                        arrow: {
                            element: this.options.arrowSelector
                        },
                        offset: {
                            offset: n.offset
                        }
                    }), n.boundariesElement && (this._popperOptions.modifiers.preventOverflow = {
                        boundariesElement: n.boundariesElement
                    }), this.popperInstance = new e(t, o, this._popperOptions), this._tooltipNode = o, this
                }
            }, {
                key: "_hide",
                value: function() {
                    return this._isOpen ? (this._isOpen = !1, this._tooltipNode.style.visibility = "hidden", this._tooltipNode.setAttribute("aria-hidden", "true"), this) : this
                }
            }, {
                key: "_dispose",
                value: function() {
                    var e = this;
                    return this._events.forEach(function(t) {
                        var n = t.func,
                            i = t.event;
                        e.reference.removeEventListener(i, n)
                    }), this._events = [], this._tooltipNode && (this._hide(), this.popperInstance.destroy(), !this.popperInstance.options.removeOnDestroy && (this._tooltipNode.parentNode.removeChild(this._tooltipNode), this._tooltipNode = null)), this
                }
            }, {
                key: "_findContainer",
                value: function(e, t) {
                    return "string" == typeof e ? e = window.document.querySelector(e) : !1 === e && (e = t.parentNode), e
                }
            }, {
                key: "_append",
                value: function(e, t) {
                    t.appendChild(e)
                }
            }, {
                key: "_setEventListeners",
                value: function(e, t, n) {
                    var i = this,
                        r = [],
                        o = [];
                    t.forEach(function(e) {
                        "hover" === e ? (r.push("mouseenter"), o.push("mouseleave")) : "focus" === e ? (r.push("focus"), o.push("blur")) : "click" === e && (r.push("click"), o.push("click"))
                    }), r.forEach(function(t) {
                        var r = function(t) {
                            !0 === i._isOpening || (t.usedByTooltip = !0, i._scheduleShow(e, n.delay, n, t))
                        };
                        i._events.push({
                            event: t,
                            func: r
                        }), e.addEventListener(t, r)
                    }), o.forEach(function(t) {
                        var r = function(t) {
                            !0 === t.usedByTooltip || i._scheduleHide(e, n.delay, n, t)
                        };
                        i._events.push({
                            event: t,
                            func: r
                        }), e.addEventListener(t, r), "click" === t && n.closeOnClickOutside && document.addEventListener("mousedown", function(t) {
                            if (i._isOpening) {
                                var n = i.popperInstance.popper;
                                e.contains(t.target) || n.contains(t.target) || r(t)
                            }
                        }, !0)
                    })
                }
            }, {
                key: "_scheduleShow",
                value: function(e, t, n) {
                    var i = this;
                    this._isOpening = !0;
                    var r = t && t.show || t || 0;
                    this._showTimeout = window.setTimeout(function() {
                        return i._show(e, n)
                    }, r)
                }
            }, {
                key: "_scheduleHide",
                value: function(e, t, n, i) {
                    var r = this;
                    this._isOpening = !1;
                    var o = t && t.hide || t || 0;
                    window.setTimeout(function() {
                        if (window.clearTimeout(r._showTimeout), !1 !== r._isOpen && document.body.contains(r._tooltipNode)) {
                            if ("mouseleave" === i.type)
                                if (r._setTooltipNodeEvent(i, e, t, n)) return;
                            r._hide(e, n)
                        }
                    }, o)
                }
            }, {
                key: "_updateTitleContent",
                value: function(e) {
                    if (void 0 !== this._tooltipNode) {
                        var t = this._tooltipNode.parentNode.querySelector(this.options.innerSelector);
                        this._clearTitleContent(t, this.options.html, this.reference.getAttribute("title") || this.options.title), this._addTitleContent(this.reference, e, this.options.html, t), this.options.title = e, this.popperInstance.update()
                    } else void 0 !== this.options.title && (this.options.title = e)
                }
            }, {
                key: "_clearTitleContent",
                value: function(e, t, n) {
                    1 === n.nodeType || 11 === n.nodeType ? t && e.removeChild(n) : t ? e.innerHTML = "" : e.textContent = ""
                }
            }]), o
        }(),
        a = function() {
            var e = this;
            this.show = function() {
                return e._show(e.reference, e.options)
            }, this.hide = function() {
                return e._hide()
            }, this.dispose = function() {
                return e._dispose()
            }, this.toggle = function() {
                return e._isOpen ? e.hide() : e.show()
            }, this.updateTitleContent = function(t) {
                return e._updateTitleContent(t)
            }, this._events = [], this._setTooltipNodeEvent = function(t, n, i, r) {
                var o = t.relatedreference || t.toElement || t.relatedTarget;
                return !!e._tooltipNode.contains(o) && (e._tooltipNode.addEventListener(t.type, function i(o) {
                    var a = o.relatedreference || o.toElement || o.relatedTarget;
                    e._tooltipNode.removeEventListener(t.type, i), n.contains(a) || e._scheduleHide(n, r.delay, r, o)
                }), !0)
            }
        };
    return o
}),
function() {
    var e, t;
    e = this.jQuery || window.jQuery, t = e(window), e.fn.stick_in_parent = function(n) {
        var i, r, o, a, s, l, c, u, d, p, f;
        for (null == n && (n = {}), f = n.sticky_class, s = n.inner_scrolling, p = n.recalc_every, d = n.parent, u = n.offset_top, c = n.spacer, r = n.bottoming, null == u && (u = 0), null == d && (d = void 0), null == s && (s = !0), null == f && (f = "is_stuck"), i = e(document), null == r && (r = !0), o = function(n, o, a, l, h, m, g, v) {
                var _, y, b, E, w, T, S, A, C, k, x, L;
                if (!n.data("sticky_kit")) {
                    if (n.data("sticky_kit", !0), w = i.height(), S = n.parent(), null != d && (S = S.closest(d)), !S.length) throw "failed to find stick parent";
                    if (_ = b = !1, (x = null != c ? c && n.closest(c) : e("<div />")) && x.css("position", n.css("position")), (A = function() {
                            var e, t, r;
                            if (!v && (w = i.height(), e = parseInt(S.css("border-top-width"), 10), t = parseInt(S.css("padding-top"), 10), o = parseInt(S.css("padding-bottom"), 10), a = S.offset().top + e + t, l = S.height(), b && (_ = b = !1, null == c && (n.insertAfter(x), x.detach()), n.css({
                                    position: "",
                                    top: "",
                                    width: "",
                                    bottom: ""
                                }).removeClass(f), r = !0), h = n.offset().top - (parseInt(n.css("margin-top"), 10) || 0) - u, m = n.outerHeight(!0), g = n.css("float"), x && x.css({
                                    width: n.outerWidth(!0),
                                    height: m,
                                    display: n.css("display"),
                                    "vertical-align": n.css("vertical-align"),
                                    float: g
                                }), r)) return L()
                        })(), m !== l) return E = void 0, T = u, k = p, L = function() {
                        var e, d, y, C;
                        if (!v && (y = !1, null != k && (0 >= --k && (k = p, A(), y = !0)), y || i.height() === w || A(), y = t.scrollTop(), null != E && (d = y - E), E = y, b ? (r && (C = y + m + T > l + a, _ && !C && (_ = !1, n.css({
                                position: "fixed",
                                bottom: "",
                                top: T
                            }).trigger("sticky_kit:unbottom"))), y < h && (b = !1, T = u, null == c && ("left" !== g && "right" !== g || n.insertAfter(x), x.detach()), e = {
                                position: "",
                                width: "",
                                top: ""
                            }, n.css(e).removeClass(f).trigger("sticky_kit:unstick")), s && (e = t.height(), m + u > e && !_ && (T -= d, T = Math.max(e - m, T), T = Math.min(u, T), b && n.css({
                                top: T + "px"
                            })))) : y > h && (b = !0, (e = {
                                position: "fixed",
                                top: T
                            }).width = "border-box" === n.css("box-sizing") ? n.outerWidth() + "px" : n.width() + "px", n.css(e).addClass(f), null == c && (n.after(x), "left" !== g && "right" !== g || x.append(n)), n.trigger("sticky_kit:stick")), b && r && (null == C && (C = y + m + T > l + a), !_ && C))) return _ = !0, "static" === S.css("position") && S.css({
                            position: "relative"
                        }), n.css({
                            position: "absolute",
                            bottom: o,
                            top: "auto"
                        }).trigger("sticky_kit:bottom")
                    }, C = function() {
                        return A(), L()
                    }, y = function() {
                        if (v = !0, t.off("touchmove", L), t.off("scroll", L), t.off("resize", C), e(document.body).off("sticky_kit:recalc", C), n.off("sticky_kit:detach", y), n.removeData("sticky_kit"), n.css({
                                position: "",
                                bottom: "",
                                top: "",
                                width: ""
                            }), S.position("position", ""), b) return null == c && ("left" !== g && "right" !== g || n.insertAfter(x), x.remove()), n.removeClass(f)
                    }, t.on("touchmove", L), t.on("scroll", L), t.on("resize", C), e(document.body).on("sticky_kit:recalc", C), n.on("sticky_kit:detach", y), setTimeout(L, 0)
                }
            }, a = 0, l = this.length; a < l; a++) n = this[a], o(e(n));
        return this
    }
}.call(this);
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function(e) {
        var t = /\blang(?:uage)?-([\w-]+)\b/i,
            n = 0,
            i = {
                manual: e.Prism && e.Prism.manual,
                disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function(e) {
                        return e instanceof r ? new r(e.type, i.util.encode(e.content), e.alias) : Array.isArray(e) ? e.map(i.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function(e) {
                        return Object.prototype.toString.call(e).slice(8, -1)
                    },
                    objId: function(e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++n
                        }), e.__id
                    },
                    clone: function e(t, n) {
                        var r, o, a = i.util.type(t);
                        switch (n = n || {}, a) {
                            case "Object":
                                if (o = i.util.objId(t), n[o]) return n[o];
                                for (var s in r = {}, n[o] = r, t) t.hasOwnProperty(s) && (r[s] = e(t[s], n));
                                return r;
                            case "Array":
                                return o = i.util.objId(t), n[o] ? n[o] : (r = [], n[o] = r, t.forEach(function(t, i) {
                                    r[i] = e(t, n)
                                }), r);
                            default:
                                return t
                        }
                    },
                    getLanguage: function(e) {
                        for (; e && !t.test(e.className);) e = e.parentElement;
                        return e ? (e.className.match(t) || [, "none"])[1].toLowerCase() : "none"
                    },
                    currentScript: function() {
                        if ("undefined" == typeof document) return null;
                        if ("currentScript" in document) return document.currentScript;
                        try {
                            throw new Error
                        } catch (i) {
                            var e = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(i.stack) || [])[1];
                            if (e) {
                                var t = document.getElementsByTagName("script");
                                for (var n in t)
                                    if (t[n].src == e) return t[n]
                            }
                            return null
                        }
                    }
                },
                languages: {
                    extend: function(e, t) {
                        var n = i.util.clone(i.languages[e]);
                        for (var r in t) n[r] = t[r];
                        return n
                    },
                    insertBefore: function(e, t, n, r) {
                        var o = (r = r || i.languages)[e],
                            a = {};
                        for (var s in o)
                            if (o.hasOwnProperty(s)) {
                                if (s == t)
                                    for (var l in n) n.hasOwnProperty(l) && (a[l] = n[l]);
                                n.hasOwnProperty(s) || (a[s] = o[s])
                            }
                        var c = r[e];
                        return r[e] = a, i.languages.DFS(i.languages, function(t, n) {
                            n === c && t != e && (this[t] = a)
                        }), a
                    },
                    DFS: function e(t, n, r, o) {
                        o = o || {};
                        var a = i.util.objId;
                        for (var s in t)
                            if (t.hasOwnProperty(s)) {
                                n.call(t, s, t[s], r || s);
                                var l = t[s],
                                    c = i.util.type(l);
                                "Object" !== c || o[a(l)] ? "Array" !== c || o[a(l)] || (o[a(l)] = !0, e(l, n, s, o)) : (o[a(l)] = !0, e(l, n, null, o))
                            }
                    }
                },
                plugins: {},
                highlightAll: function(e, t) {
                    i.highlightAllUnder(document, e, t)
                },
                highlightAllUnder: function(e, t, n) {
                    var r = {
                        callback: n,
                        container: e,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    i.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), i.hooks.run("before-all-elements-highlight", r);
                    for (var o, a = 0; o = r.elements[a++];) i.highlightElement(o, !0 === t, r.callback)
                },
                highlightElement: function(n, r, o) {
                    var a = i.util.getLanguage(n),
                        s = i.languages[a];
                    n.className = n.className.replace(t, "").replace(/\s+/g, " ") + " language-" + a;
                    var l = n.parentNode;
                    l && "pre" === l.nodeName.toLowerCase() && (l.className = l.className.replace(t, "").replace(/\s+/g, " ") + " language-" + a);
                    var c = {
                        element: n,
                        language: a,
                        grammar: s,
                        code: n.textContent
                    };

                    function u(e) {
                        c.highlightedCode = e, i.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, i.hooks.run("after-highlight", c), i.hooks.run("complete", c), o && o.call(c.element)
                    }
                    if (i.hooks.run("before-sanity-check", c), !c.code) return i.hooks.run("complete", c), void(o && o.call(c.element));
                    if (i.hooks.run("before-highlight", c), c.grammar)
                        if (r && e.Worker) {
                            var d = new Worker(i.filename);
                            d.onmessage = function(e) {
                                u(e.data)
                            }, d.postMessage(JSON.stringify({
                                language: c.language,
                                code: c.code,
                                immediateClose: !0
                            }))
                        } else u(i.highlight(c.code, c.grammar, c.language));
                    else u(i.util.encode(c.code))
                },
                highlight: function(e, t, n) {
                    var o = {
                        code: e,
                        grammar: t,
                        language: n
                    };
                    return i.hooks.run("before-tokenize", o), o.tokens = i.tokenize(o.code, o.grammar), i.hooks.run("after-tokenize", o), r.stringify(i.util.encode(o.tokens), o.language)
                },
                matchGrammar: function(e, t, n, o, a, s, l) {
                    for (var c in n)
                        if (n.hasOwnProperty(c) && n[c]) {
                            var u = n[c];
                            u = Array.isArray(u) ? u : [u];
                            for (var d = 0; d < u.length; ++d) {
                                if (l && l == c + "," + d) return;
                                var p = u[d],
                                    f = p.inside,
                                    h = !!p.lookbehind,
                                    m = !!p.greedy,
                                    g = 0,
                                    v = p.alias;
                                if (m && !p.pattern.global) {
                                    var _ = p.pattern.toString().match(/[imsuy]*$/)[0];
                                    p.pattern = RegExp(p.pattern.source, _ + "g")
                                }
                                p = p.pattern || p;
                                for (var y = o, b = a; y < t.length; b += t[y].length, ++y) {
                                    var E = t[y];
                                    if (t.length > e.length) return;
                                    if (!(E instanceof r)) {
                                        if (m && y != t.length - 1) {
                                            if (p.lastIndex = b, !(k = p.exec(e))) break;
                                            for (var w = k.index + (h && k[1] ? k[1].length : 0), T = k.index + k[0].length, S = y, A = b, C = t.length; S < C && (A < T || !t[S].type && !t[S - 1].greedy); ++S)(A += t[S].length) <= w && (++y, b = A);
                                            if (t[y] instanceof r) continue;
                                            x = S - y, E = e.slice(b, A), k.index -= b
                                        } else {
                                            p.lastIndex = 0;
                                            var k = p.exec(E),
                                                x = 1
                                        }
                                        if (k) {
                                            h && (g = k[1] ? k[1].length : 0), T = (w = k.index + g) + (k = k[0].slice(g)).length;
                                            var L = E.slice(0, w),
                                                O = E.slice(T),
                                                I = [y, x];
                                            L && (++y, b += L.length, I.push(L));
                                            var R = new r(c, f ? i.tokenize(k, f) : k, v, k, m);
                                            if (I.push(R), O && I.push(O), Array.prototype.splice.apply(t, I), 1 != x && i.matchGrammar(e, t, n, y, b, !0, c + "," + d), s) break
                                        } else if (s) break
                                    }
                                }
                            }
                        }
                },
                tokenize: function(e, t) {
                    var n = [e],
                        r = t.rest;
                    if (r) {
                        for (var o in r) t[o] = r[o];
                        delete t.rest
                    }
                    return i.matchGrammar(e, n, t, 0, 0, !1), n
                },
                hooks: {
                    all: {},
                    add: function(e, t) {
                        var n = i.hooks.all;
                        n[e] = n[e] || [], n[e].push(t)
                    },
                    run: function(e, t) {
                        var n = i.hooks.all[e];
                        if (n && n.length)
                            for (var r, o = 0; r = n[o++];) r(t)
                    }
                },
                Token: r
            };

        function r(e, t, n, i, r) {
            this.type = e, this.content = t, this.alias = n, this.length = 0 | (i || "").length, this.greedy = !!r
        }
        if (e.Prism = i, r.stringify = function(e, t) {
                if ("string" == typeof e) return e;
                if (Array.isArray(e)) return e.map(function(e) {
                    return r.stringify(e, t)
                }).join("");
                var n = {
                    type: e.type,
                    content: r.stringify(e.content, t),
                    tag: "span",
                    classes: ["token", e.type],
                    attributes: {},
                    language: t
                };
                if (e.alias) {
                    var o = Array.isArray(e.alias) ? e.alias : [e.alias];
                    Array.prototype.push.apply(n.classes, o)
                }
                i.hooks.run("wrap", n);
                var a = Object.keys(n.attributes).map(function(e) {
                    return e + '="' + (n.attributes[e] || "").replace(/"/g, "&quot;") + '"'
                }).join(" ");
                return "<" + n.tag + ' class="' + n.classes.join(" ") + '"' + (a ? " " + a : "") + ">" + n.content + "</" + n.tag + ">"
            }, !e.document) return e.addEventListener && (i.disableWorkerMessageHandler || e.addEventListener("message", function(t) {
            var n = JSON.parse(t.data),
                r = n.language,
                o = n.code,
                a = n.immediateClose;
            e.postMessage(i.highlight(o, i.languages[r], r)), a && e.close()
        }, !1)), i;
        var o = i.util.currentScript();
        if (o && (i.filename = o.src, o.hasAttribute("data-manual") && (i.manual = !0)), !i.manual) {
            function a() {
                i.manual || i.highlightAll()
            }
            var s = document.readyState;
            "loading" === s || "interactive" === s && o && o.defer ? document.addEventListener("DOMContentLoaded", a) : window.requestAnimationFrame ? window.requestAnimationFrame(a) : window.setTimeout(a, 16)
        }
        return i
    }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism), Prism.languages.markup = {
        comment: /<!--[\s\S]*?-->/,
        prolog: /<\?[\s\S]+?\?>/,
        doctype: {
            pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,
            greedy: !0
        },
        cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
        tag: {
            pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
            greedy: !0,
            inside: {
                tag: {
                    pattern: /^<\/?[^\s>\/]+/i,
                    inside: {
                        punctuation: /^<\/?/,
                        namespace: /^[^\s>\/:]+:/
                    }
                },
                "attr-value": {
                    pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
                    inside: {
                        punctuation: [/^=/, {
                            pattern: /^(\s*)["']|["']$/,
                            lookbehind: !0
                        }]
                    }
                },
                punctuation: /\/?>/,
                "attr-name": {
                    pattern: /[^\s>\/]+/,
                    inside: {
                        namespace: /^[^\s>\/:]+:/
                    }
                }
            }
        },
        entity: /&#?[\da-z]{1,8};/i
    }, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function(e) {
        "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
    }), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        value: function(e, t) {
            var n = {};
            n["language-" + t] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: Prism.languages[t]
            }, n.cdata = /^<!\[CDATA\[|\]\]>$/i;
            var i = {
                "included-cdata": {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    inside: n
                }
            };
            i["language-" + t] = {
                pattern: /[\s\S]+/,
                inside: Prism.languages[t]
            };
            var r = {};
            r[e] = {
                pattern: RegExp("(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)".replace(/__/g, e), "i"),
                lookbehind: !0,
                greedy: !0,
                inside: i
            }, Prism.languages.insertBefore("markup", "cdata", r)
        }
    }), Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup,
    function(e) {
        var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
        e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
                pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
                inside: {
                    rule: /@[\w-]+/
                }
            },
            url: {
                pattern: RegExp("url\\((?:" + t.source + "|[^\n\r()]*)\\)", "i"),
                inside: {
                    function: /^url/i,
                    punctuation: /^\(|\)$/
                }
            },
            selector: RegExp("[^{}\\s](?:[^{};\"']|" + t.source + ")*?(?=\\s*\\{)"),
            string: {
                pattern: t,
                greedy: !0
            },
            property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
            important: /!important\b/i,
            function: /[-a-z0-9]+(?=\()/i,
            punctuation: /[(){};:,]/
        }, e.languages.css.atrule.inside.rest = e.languages.css;
        var n = e.languages.markup;
        n && (n.tag.addInlined("style", "css"), e.languages.insertBefore("inside", "attr-value", {
            "style-attr": {
                pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                inside: {
                    "attr-name": {
                        pattern: /^\s*style/i,
                        inside: n.tag.inside
                    },
                    punctuation: /^\s*=\s*['"]|['"]\s*$/,
                    "attr-value": {
                        pattern: /.+/i,
                        inside: e.languages.css
                    }
                },
                alias: "language-css"
            }
        }, n.tag))
    }(Prism), Prism.languages.clike = {
        comment: [{
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: !0
        }, {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: !0,
            greedy: !0
        }],
        string: {
            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0
        },
        "class-name": {
            pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: {
                punctuation: /[.\\]/
            }
        },
        keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
        boolean: /\b(?:true|false)\b/,
        function: /\w+(?=\()/,
        number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        punctuation: /[{}[\];(),.:]/
    }, Prism.languages.javascript = Prism.languages.extend("clike", {
        "class-name": [Prism.languages.clike["class-name"], {
            pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
            lookbehind: !0
        }],
        keyword: [{
            pattern: /((?:^|})\s*)(?:catch|finally)\b/,
            lookbehind: !0
        }, {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0
        }],
        number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
        function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        operator: /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/
    }), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*[\s\S]*?\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
            lookbehind: !0,
            greedy: !0
        },
        "function-variable": {
            pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
            alias: "function"
        },
        parameter: [{
            pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
            inside: Prism.languages.javascript
        }, {
            pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), Prism.languages.insertBefore("javascript", "string", {
        "template-string": {
            pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
            greedy: !0,
            inside: {
                "template-punctuation": {
                    pattern: /^`|`$/,
                    alias: "string"
                },
                interpolation: {
                    pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                    lookbehind: !0,
                    inside: {
                        "interpolation-punctuation": {
                            pattern: /^\${|}$/,
                            alias: "punctuation"
                        },
                        rest: Prism.languages.javascript
                    }
                },
                string: /[\s\S]+/
            }
        }
    }), Prism.languages.markup && Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.js = Prism.languages.javascript, Prism.languages.apacheconf = {
        comment: /#.*/,
        "directive-inline": {
            pattern: /(^\s*)\b(?:AcceptFilter|AcceptPathInfo|AccessFileName|Action|Add(?:Alt|AltByEncoding|AltByType|Charset|DefaultCharset|Description|Encoding|Handler|Icon|IconByEncoding|IconByType|InputFilter|Language|ModuleInfo|OutputFilter|OutputFilterByType|Type)|Alias|AliasMatch|Allow(?:CONNECT|EncodedSlashes|Methods|Override|OverrideList)?|Anonymous(?:_LogEmail|_MustGiveEmail|_NoUserID|_VerifyEmail)?|AsyncRequestWorkerFactor|Auth(?:BasicAuthoritative|BasicFake|BasicProvider|BasicUseDigestAlgorithm|DBDUserPWQuery|DBDUserRealmQuery|DBMGroupFile|DBMType|DBMUserFile|Digest(?:Algorithm|Domain|NonceLifetime|Provider|Qop|ShmemSize)|Form(?:Authoritative|Body|DisableNoStore|FakeBasicAuth|Location|LoginRequiredLocation|LoginSuccessLocation|LogoutLocation|Method|Mimetype|Password|Provider|SitePassphrase|Size|Username)|GroupFile|LDAP(?:AuthorizePrefix|BindAuthoritative|BindDN|BindPassword|CharsetConfig|CompareAsUser|CompareDNOnServer|DereferenceAliases|GroupAttribute|GroupAttributeIsDN|InitialBindAsUser|InitialBindPattern|MaxSubGroupDepth|RemoteUserAttribute|RemoteUserIsDN|SearchAsUser|SubGroupAttribute|SubGroupClass|Url)|Merging|Name|Type|UserFile|nCache(?:Context|Enable|ProvideFor|SOCache|Timeout)|nzFcgiCheckAuthnProvider|nzFcgiDefineProvider|zDBDLoginToReferer|zDBDQuery|zDBDRedirectQuery|zDBMType|zSendForbiddenOnFailure)|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferSize|BufferedLogs|CGIDScriptTimeout|CGIMapExtension|Cache(?:DefaultExpire|DetailHeader|DirLength|DirLevels|Disable|Enable|File|Header|IgnoreCacheControl|IgnoreHeaders|IgnoreNoLastMod|IgnoreQueryString|IgnoreURLSessionIdentifiers|KeyBaseURL|LastModifiedFactor|Lock|LockMaxAge|LockPath|MaxExpire|MaxFileSize|MinExpire|MinFileSize|NegotiatedDocs|QuickHandler|ReadSize|ReadTime|Root|Socache(?:MaxSize|MaxTime|MinTime|ReadSize|ReadTime)?|StaleOnError|StoreExpired|StoreNoStore|StorePrivate)|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DTracePrivileges|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|Deflate(?:BufferSize|CompressionLevel|FilterNote|InflateLimitRequestBody|InflateRatio(?:Burst|Limit)|MemLevel|WindowSize)|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtFilterDefine|ExtFilterOptions|ExtendedStatus|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|Heartbeat(?:Address|Listen|MaxServers|Storage)|HostnameLookups|ISAPI(?:AppendLogToErrors|AppendLogToQuery|CacheFile|FakeAsync|LogNotSupported|ReadAheadBuffer)|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|Index(?:HeadInsert|Ignore|IgnoreReset|Options|OrderDefault|StyleSheet)|InputSed|KeepAlive|KeepAliveTimeout|KeptBodySize|LDAP(?:CacheEntries|CacheTTL|ConnectionPoolTTL|ConnectionTimeout|LibraryDebug|OpCacheEntries|OpCacheTTL|ReferralHopLimit|Referrals|Retries|RetryDelay|SharedCacheFile|SharedCacheSize|Timeout|TrustedClientCert|TrustedGlobalCert|TrustedMode|VerifyServerCert)|LanguagePriority|Limit(?:InternalRecursion|Request(?:Body|FieldSize|Fields|Line)|XMLRequestBody)|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|Lua(?:Hook(?:AccessChecker|AuthChecker|CheckUserID|Fixups|InsertFilter|Log|MapToStorage|TranslateName|TypeChecker)|Inherit|InputFilter|MapHandler|OutputFilter|PackageCPath|PackagePath|QuickHandler|Root|Scope)|MMapFile|Max(?:ConnectionsPerChild|KeepAliveRequests|MemFree|RangeOverlaps|RangeReversals|Ranges|RequestWorkers|SpareServers|SpareThreads|Threads)|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|ModMimeUsePathInfo|ModemStandard|MultiviewsMatch|Mutex|NWSSLTrustedCerts|NWSSLUpgradeable|NameVirtualHost|NoProxy|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|Proxy(?:AddHeaders|BadHeader|Block|Domain|ErrorOverride|ExpressDBMFile|ExpressDBMType|ExpressEnable|FtpDirCharset|FtpEscapeWildcards|FtpListOnWildcard|HTML(?:BufSize|CharsetOut|DocType|Enable|Events|Extended|Fixups|Interp|Links|Meta|StripComments|URLMap)|IOBufferSize|MaxForwards|Pass(?:Inherit|InterpolateEnv|Match|Reverse|ReverseCookieDomain|ReverseCookiePath)?|PreserveHost|ReceiveBufferSize|Remote|RemoteMatch|Requests|SCGIInternalRedirect|SCGISendfile|Set|SourceAddress|Status|Timeout|Via)|RLimitCPU|RLimitMEM|RLimitNPROC|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIP(?:Header|InternalProxy|InternalProxyList|ProxiesHeader|TrustedProxy|TrustedProxyList)|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|Rewrite(?:Base|Cond|Engine|Map|Options|Rule)|SSIETag|SSIEndTag|SSIErrorMsg|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSL(?:CACertificateFile|CACertificatePath|CADNRequestFile|CADNRequestPath|CARevocationCheck|CARevocationFile|CARevocationPath|CertificateChainFile|CertificateFile|CertificateKeyFile|CipherSuite|Compression|CryptoDevice|Engine|FIPS|HonorCipherOrder|InsecureRenegotiation|OCSP(?:DefaultResponder|Enable|OverrideResponder|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|UseRequestNonce)|OpenSSLConfCmd|Options|PassPhraseDialog|Protocol|Proxy(?:CACertificateFile|CACertificatePath|CARevocation(?:Check|File|Path)|CheckPeer(?:CN|Expire|Name)|CipherSuite|Engine|MachineCertificate(?:ChainFile|File|Path)|Protocol|Verify|VerifyDepth)|RandomSeed|RenegBufferSize|Require|RequireSSL|SRPUnknownUserSeed|SRPVerifierFile|Session(?:Cache|CacheTimeout|TicketKeyFile|Tickets)|Stapling(?:Cache|ErrorCacheTimeout|FakeTryLater|ForceURL|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|ReturnResponderErrors|StandardCacheTimeout)|StrictSNIVHostCheck|UseStapling|UserName|VerifyClient|VerifyDepth)|Satisfy|ScoreBoardFile|Script(?:Alias|AliasMatch|InterpreterSource|Log|LogBuffer|LogLength|Sock)?|SecureListen|SeeRequestTail|SendBufferSize|Server(?:Admin|Alias|Limit|Name|Path|Root|Signature|Tokens)|Session(?:Cookie(?:Name|Name2|Remove)|Crypto(?:Cipher|Driver|Passphrase|PassphraseFile)|DBD(?:CookieName|CookieName2|CookieRemove|DeleteLabel|InsertLabel|PerUser|SelectLabel|UpdateLabel)|Env|Exclude|Header|Include|MaxAge)?|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadStackSize|ThreadsPerChild|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|Virtual(?:DocumentRoot|ScriptAlias)(?:IP)?|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/im,
            lookbehind: !0,
            alias: "property"
        },
        "directive-block": {
            pattern: /<\/?\b(?:Auth[nz]ProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|Require(?:All|Any|None)|VirtualHost)\b *.*>/i,
            inside: {
                "directive-block": {
                    pattern: /^<\/?\w+/,
                    inside: {
                        punctuation: /^<\/?/
                    },
                    alias: "tag"
                },
                "directive-block-parameter": {
                    pattern: /.*[^>]/,
                    inside: {
                        punctuation: /:/,
                        string: {
                            pattern: /("|').*\1/,
                            inside: {
                                variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/
                            }
                        }
                    },
                    alias: "attr-value"
                },
                punctuation: />/
            },
            alias: "tag"
        },
        "directive-flags": {
            pattern: /\[(?:\w,?)+\]/,
            alias: "keyword"
        },
        string: {
            pattern: /("|').*\1/,
            inside: {
                variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/
            }
        },
        variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/,
        regex: /\^?.*\$|\^.*\$?/
    }, Prism.languages.c = Prism.languages.extend("clike", {
        "class-name": {
            pattern: /(\b(?:enum|struct)\s+)\w+/,
            lookbehind: !0
        },
        keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
        operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
        number: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
    }), Prism.languages.insertBefore("c", "string", {
        macro: {
            pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
            lookbehind: !0,
            alias: "property",
            inside: {
                string: {
                    pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
                    lookbehind: !0
                },
                directive: {
                    pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
                    lookbehind: !0,
                    alias: "keyword"
                }
            }
        },
        constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
    }), delete Prism.languages.c.boolean, Prism.languages.csharp = Prism.languages.extend("clike", {
        keyword: /\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,
        string: [{
            pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/,
            greedy: !0
        }, {
            pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/,
            greedy: !0
        }],
        "class-name": [{
            pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/,
            inside: {
                punctuation: /\./
            }
        }, {
            pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
            lookbehind: !0,
            inside: {
                punctuation: /\./
            }
        }, {
            pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
            lookbehind: !0,
            inside: {
                punctuation: /\./
            }
        }, {
            pattern: /((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
            lookbehind: !0,
            inside: {
                punctuation: /\./
            }
        }],
        number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i,
        operator: />>=?|<<=?|[-=]>|([-+&|?])\1|~|[-+*/%&|^!=<>]=?/,
        punctuation: /\?\.?|::|[{}[\];(),.:]/
    }), Prism.languages.insertBefore("csharp", "class-name", {
        "generic-method": {
            pattern: /\w+\s*<[^>\r\n]+?>\s*(?=\()/,
            inside: {
                function: /^\w+/,
                "class-name": {
                    pattern: /\b[A-Z]\w*(?:\.\w+)*\b/,
                    inside: {
                        punctuation: /\./
                    }
                },
                keyword: Prism.languages.csharp.keyword,
                punctuation: /[<>(),.:]/
            }
        },
        preprocessor: {
            pattern: /(^\s*)#.*/m,
            lookbehind: !0,
            alias: "property",
            inside: {
                directive: {
                    pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                    lookbehind: !0,
                    alias: "keyword"
                }
            }
        }
    }), Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp,
    function(e) {
        var t = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
            n = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
        e.languages.java = e.languages.extend("clike", {
            "class-name": [n, /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],
            keyword: t,
            function: [e.languages.clike.function, {
                pattern: /(\:\:)[a-z_]\w*/,
                lookbehind: !0
            }],
            number: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
            operator: {
                pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
                lookbehind: !0
            }
        }), e.languages.insertBefore("java", "string", {
            "triple-quoted-string": {
                pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
                greedy: !0,
                alias: "string"
            }
        }), e.languages.insertBefore("java", "class-name", {
            annotation: {
                alias: "punctuation",
                pattern: /(^|[^.])@\w+/,
                lookbehind: !0
            },
            namespace: {
                pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(?:\.[a-z]\w*)+/,
                lookbehind: !0,
                inside: {
                    punctuation: /\./
                }
            },
            generics: {
                pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
                inside: {
                    "class-name": n,
                    keyword: t,
                    punctuation: /[<>(),.:]/,
                    operator: /[?&|]/
                }
            }
        })
    }(Prism), Prism.languages.less = Prism.languages.extend("css", {
        comment: [/\/\*[\s\S]*?\*\//, {
            pattern: /(^|[^\\])\/\/.*/,
            lookbehind: !0
        }],
        atrule: {
            pattern: /@[\w-]+?(?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};])*?(?=\s*\{)/,
            inside: {
                punctuation: /[:()]/
            }
        },
        selector: {
            pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@])*?(?=\s*\{)/,
            inside: {
                variable: /@+[\w-]+/
            }
        },
        property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
        operator: /[+\-*\/]/
    }), Prism.languages.insertBefore("less", "property", {
        variable: [{
            pattern: /@[\w-]+\s*:/,
            inside: {
                punctuation: /:/
            }
        }, /@@?[\w-]+/],
        "mixin-usage": {
            pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
            lookbehind: !0,
            alias: "function"
        }
    }),
    function(e) {
        function t(e, t) {
            return e = e.replace(/<inner>/g, "(?:\\\\.|[^\\\\\\n\r]|(?:\r?\n|\r)(?!\r?\n|\r))"), t && (e = e + "|" + e.replace(/_/g, "\\*")), RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + e + ")")
        }
        var n = "(?:\\\\.|``.+?``|`[^`\r\\n]+`|[^\\\\|\r\\n`])+",
            i = "\\|?__(?:\\|__)+\\|?(?:(?:\r?\n|\r)|$)".replace(/__/g, n),
            r = "\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\r?\n|\r)";
        e.languages.markdown = e.languages.extend("markup", {}), e.languages.insertBefore("markdown", "prolog", {
            blockquote: {
                pattern: /^>(?:[\t ]*>)*/m,
                alias: "punctuation"
            },
            table: {
                pattern: RegExp("^" + i + r + "(?:" + i + ")*", "m"),
                inside: {
                    "table-data-rows": {
                        pattern: RegExp("^(" + i + r + ")(?:" + i + ")*$"),
                        lookbehind: !0,
                        inside: {
                            "table-data": {
                                pattern: RegExp(n),
                                inside: e.languages.markdown
                            },
                            punctuation: /\|/
                        }
                    },
                    "table-line": {
                        pattern: RegExp("^(" + i + ")" + r + "$"),
                        lookbehind: !0,
                        inside: {
                            punctuation: /\||:?-{3,}:?/
                        }
                    },
                    "table-header-row": {
                        pattern: RegExp("^" + i + "$"),
                        inside: {
                            "table-header": {
                                pattern: RegExp(n),
                                alias: "important",
                                inside: e.languages.markdown
                            },
                            punctuation: /\|/
                        }
                    }
                }
            },
            code: [{
                pattern: /(^[ \t]*(?:\r?\n|\r))(?: {4}|\t).+(?:(?:\r?\n|\r)(?: {4}|\t).+)*/m,
                lookbehind: !0,
                alias: "keyword"
            }, {
                pattern: /``.+?``|`[^`\r\n]+`/,
                alias: "keyword"
            }, {
                pattern: /^```[\s\S]*?^```$/m,
                greedy: !0,
                inside: {
                    "code-block": {
                        pattern: /^(```.*(?:\r?\n|\r))[\s\S]+?(?=(?:\r?\n|\r)^```$)/m,
                        lookbehind: !0
                    },
                    "code-language": {
                        pattern: /^(```).+/,
                        lookbehind: !0
                    },
                    punctuation: /```/
                }
            }],
            title: [{
                pattern: /\S.*(?:\r?\n|\r)(?:==+|--+)(?=[ \t]*$)/m,
                alias: "important",
                inside: {
                    punctuation: /==+$|--+$/
                }
            }, {
                pattern: /(^\s*)#+.+/m,
                lookbehind: !0,
                alias: "important",
                inside: {
                    punctuation: /^#+|#+$/
                }
            }],
            hr: {
                pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
                lookbehind: !0,
                alias: "punctuation"
            },
            list: {
                pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
                lookbehind: !0,
                alias: "punctuation"
            },
            "url-reference": {
                pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
                inside: {
                    variable: {
                        pattern: /^(!?\[)[^\]]+/,
                        lookbehind: !0
                    },
                    string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                    punctuation: /^[\[\]!:]|[<>]/
                },
                alias: "url"
            },
            bold: {
                pattern: t("__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__", !0),
                lookbehind: !0,
                greedy: !0,
                inside: {
                    content: {
                        pattern: /(^..)[\s\S]+(?=..$)/,
                        lookbehind: !0,
                        inside: {}
                    },
                    punctuation: /\*\*|__/
                }
            },
            italic: {
                pattern: t("_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_", !0),
                lookbehind: !0,
                greedy: !0,
                inside: {
                    content: {
                        pattern: /(^.)[\s\S]+(?=.$)/,
                        lookbehind: !0,
                        inside: {}
                    },
                    punctuation: /[*_]/
                }
            },
            strike: {
                pattern: t("(~~?)(?:(?!~)<inner>)+?\\2", !1),
                lookbehind: !0,
                greedy: !0,
                inside: {
                    content: {
                        pattern: /(^~~?)[\s\S]+(?=\1$)/,
                        lookbehind: !0,
                        inside: {}
                    },
                    punctuation: /~~?/
                }
            },
            url: {
                pattern: t('!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)| ?\\[(?:(?!\\])<inner>)+\\])', !1),
                lookbehind: !0,
                greedy: !0,
                inside: {
                    variable: {
                        pattern: /(\[)[^\]]+(?=\]$)/,
                        lookbehind: !0
                    },
                    content: {
                        pattern: /(^!?\[)[^\]]+(?=\])/,
                        lookbehind: !0,
                        inside: {}
                    },
                    string: {
                        pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
                    }
                }
            }
        }), ["url", "bold", "italic", "strike"].forEach(function(t) {
            ["url", "bold", "italic", "strike"].forEach(function(n) {
                t !== n && (e.languages.markdown[t].inside.content.inside[n] = e.languages.markdown[n])
            })
        }), e.hooks.add("after-tokenize", function(e) {
            "markdown" !== e.language && "md" !== e.language || function e(t) {
                if (t && "string" != typeof t)
                    for (var n = 0, i = t.length; n < i; n++) {
                        var r = t[n];
                        if ("code" === r.type) {
                            var o = r.content[1],
                                a = r.content[3];
                            if (o && a && "code-language" === o.type && "code-block" === a.type && "string" == typeof o.content) {
                                var s = o.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp"),
                                    l = "language-" + (s = (/[a-z][\w-]*/i.exec(s) || [""])[0].toLowerCase());
                                a.alias ? "string" == typeof a.alias ? a.alias = [a.alias, l] : a.alias.push(l) : a.alias = [l]
                            }
                        } else e(r.content)
                    }
            }(e.tokens)
        }), e.hooks.add("wrap", function(t) {
            if ("code-block" === t.type) {
                for (var n = "", i = 0, r = t.classes.length; i < r; i++) {
                    var o = t.classes[i],
                        a = /language-(.+)/.exec(o);
                    if (a) {
                        n = a[1];
                        break
                    }
                }
                var s = e.languages[n];
                if (s) {
                    var l = t.content.replace(/&lt;/g, "<").replace(/&amp;/g, "&");
                    t.content = e.highlight(l, s, n)
                } else if (n && "none" !== n && e.plugins.autoloader) {
                    var c = "md-" + (new Date).valueOf() + "-" + Math.floor(1e16 * Math.random());
                    t.attributes.id = c, e.plugins.autoloader.loadLanguages(n, function() {
                        var t = document.getElementById(c);
                        t && (t.innerHTML = e.highlight(t.textContent, e.languages[n], n))
                    })
                }
            }
        }), e.languages.md = e.languages.markdown
    }(Prism),
    function(e) {
        function t(e, t) {
            return "___" + e.toUpperCase() + t + "___"
        }
        Object.defineProperties(e.languages["markup-templating"] = {}, {
            buildPlaceholders: {
                value: function(n, i, r, o) {
                    if (n.language === i) {
                        var a = n.tokenStack = [];
                        n.code = n.code.replace(r, function(e) {
                            if ("function" == typeof o && !o(e)) return e;
                            for (var r, s = a.length; - 1 !== n.code.indexOf(r = t(i, s));) ++s;
                            return a[s] = e, r
                        }), n.grammar = e.languages.markup
                    }
                }
            },
            tokenizePlaceholders: {
                value: function(n, i) {
                    if (n.language === i && n.tokenStack) {
                        n.grammar = e.languages[i];
                        var r = 0,
                            o = Object.keys(n.tokenStack);
                        ! function a(s) {
                            for (var l = 0; l < s.length && !(r >= o.length); l++) {
                                var c = s[l];
                                if ("string" == typeof c || c.content && "string" == typeof c.content) {
                                    var u = o[r],
                                        d = n.tokenStack[u],
                                        p = "string" == typeof c ? c : c.content,
                                        f = t(i, u),
                                        h = p.indexOf(f);
                                    if (-1 < h) {
                                        ++r;
                                        var m = p.substring(0, h),
                                            g = new e.Token(i, e.tokenize(d, n.grammar), "language-" + i, d),
                                            v = p.substring(h + f.length),
                                            _ = [];
                                        m && _.push.apply(_, a([m])), _.push(g), v && _.push.apply(_, a([v])), "string" == typeof c ? s.splice.apply(s, [l, 1].concat(_)) : c.content = _
                                    }
                                } else c.content && a(c.content)
                            }
                            return s
                        }(n.tokens)
                    }
                }
            }
        })
    }(Prism), Prism.languages.nginx = Prism.languages.extend("clike", {
        comment: {
            pattern: /(^|[^"{\\])#.*/,
            lookbehind: !0
        },
        keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i
    }), Prism.languages.insertBefore("nginx", "keyword", {
        variable: /\$[a-z_]+/i
    }),
    function(e) {
        e.languages.php = e.languages.extend("clike", {
            keyword: /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
            boolean: {
                pattern: /\b(?:false|true)\b/i,
                alias: "constant"
            },
            constant: [/\b[A-Z_][A-Z0-9_]*\b/, /\b(?:null)\b/i],
            comment: {
                pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
                lookbehind: !0
            }
        }), e.languages.insertBefore("php", "string", {
            "shell-comment": {
                pattern: /(^|[^\\])#.*/,
                lookbehind: !0,
                alias: "comment"
            }
        }), e.languages.insertBefore("php", "comment", {
            delimiter: {
                pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
                alias: "important"
            }
        }), e.languages.insertBefore("php", "keyword", {
            variable: /\$+(?:\w+\b|(?={))/i,
            package: {
                pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
                lookbehind: !0,
                inside: {
                    punctuation: /\\/
                }
            }
        }), e.languages.insertBefore("php", "operator", {
            property: {
                pattern: /(->)[\w]+/,
                lookbehind: !0
            }
        });
        var t = {
            pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
            lookbehind: !0,
            inside: e.languages.php
        };
        e.languages.insertBefore("php", "string", {
            "nowdoc-string": {
                pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
                greedy: !0,
                alias: "string",
                inside: {
                    delimiter: {
                        pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                        alias: "symbol",
                        inside: {
                            punctuation: /^<<<'?|[';]$/
                        }
                    }
                }
            },
            "heredoc-string": {
                pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
                greedy: !0,
                alias: "string",
                inside: {
                    delimiter: {
                        pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                        alias: "symbol",
                        inside: {
                            punctuation: /^<<<"?|[";]$/
                        }
                    },
                    interpolation: t
                }
            },
            "single-quoted-string": {
                pattern: /'(?:\\[\s\S]|[^\\'])*'/,
                greedy: !0,
                alias: "string"
            },
            "double-quoted-string": {
                pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                greedy: !0,
                alias: "string",
                inside: {
                    interpolation: t
                }
            }
        }), delete e.languages.php.string, e.hooks.add("before-tokenize", function(t) {
            /<\?/.test(t.code) && e.languages["markup-templating"].buildPlaceholders(t, "php", /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#)(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/gi)
        }), e.hooks.add("after-tokenize", function(t) {
            e.languages["markup-templating"].tokenizePlaceholders(t, "php")
        })
    }(Prism), Prism.languages.sql = {
        comment: {
            pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
            lookbehind: !0
        },
        variable: [{
            pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
            greedy: !0
        }, /@[\w.$]+/],
        string: {
            pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
            greedy: !0,
            lookbehind: !0
        },
        function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
        keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
        boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
        number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
        operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
        punctuation: /[;[\]()`,.]/
    },
    function(e) {
        var t = e.languages.plsql = e.languages.extend("sql", {
                comment: [/\/\*[\s\S]*?\*\//, /--.*/]
            }),
            n = t.keyword;
        Array.isArray(n) || (n = t.keyword = [n]), n.unshift(/\b(?:ACCESS|AGENT|AGGREGATE|ARRAY|ARROW|AT|ATTRIBUTE|AUDIT|AUTHID|BFILE_BASE|BLOB_BASE|BLOCK|BODY|BOTH|BOUND|BYTE|CALLING|CHAR_BASE|CHARSET(?:FORM|ID)|CLOB_BASE|COLAUTH|COLLECT|CLUSTERS?|COMPILED|COMPRESS|CONSTANT|CONSTRUCTOR|CONTEXT|CRASH|CUSTOMDATUM|DANGLING|DATE_BASE|DEFINE|DETERMINISTIC|DURATION|ELEMENT|EMPTY|EXCEPTIONS?|EXCLUSIVE|EXTERNAL|FINAL|FORALL|FORM|FOUND|GENERAL|HEAP|HIDDEN|IDENTIFIED|IMMEDIATE|INCLUDING|INCREMENT|INDICATOR|INDEXES|INDICES|INFINITE|INITIAL|ISOPEN|INSTANTIABLE|INTERFACE|INVALIDATE|JAVA|LARGE|LEADING|LENGTH|LIBRARY|LIKE[24C]|LIMITED|LONG|LOOP|MAP|MAXEXTENTS|MAXLEN|MEMBER|MINUS|MLSLABEL|MULTISET|NAME|NAN|NATIVE|NEW|NOAUDIT|NOCOMPRESS|NOCOPY|NOTFOUND|NOWAIT|NUMBER(?:_BASE)?|OBJECT|OCI(?:COLL|DATE|DATETIME|DURATION|INTERVAL|LOBLOCATOR|NUMBER|RAW|REF|REFCURSOR|ROWID|STRING|TYPE)|OFFLINE|ONLINE|ONLY|OPAQUE|OPERATOR|ORACLE|ORADATA|ORGANIZATION|ORL(?:ANY|VARY)|OTHERS|OVERLAPS|OVERRIDING|PACKAGE|PARALLEL_ENABLE|PARAMETERS?|PASCAL|PCTFREE|PIPE(?:LINED)?|PRAGMA|PRIOR|PRIVATE|RAISE|RANGE|RAW|RECORD|REF|REFERENCE|REM|REMAINDER|RESULT|RESOURCE|RETURNING|REVERSE|ROW(?:ID|NUM|TYPE)|SAMPLE|SB[124]|SEGMENT|SELF|SEPARATE|SEQUENCE|SHORT|SIZE(?:_T)?|SPARSE|SQL(?:CODE|DATA|NAME|STATE)|STANDARD|STATIC|STDDEV|STORED|STRING|STRUCT|STYLE|SUBMULTISET|SUBPARTITION|SUBSTITUTABLE|SUBTYPE|SUCCESSFUL|SYNONYM|SYSDATE|TABAUTH|TDO|THE|TIMEZONE_(?:ABBR|HOUR|MINUTE|REGION)|TRAILING|TRANSAC(?:TIONAL)?|TRUSTED|UB[124]|UID|UNDER|UNTRUSTED|VALIDATE|VALIST|VARCHAR2|VARIABLE|VARIANCE|VARRAY|VIEWS|VOID|WHENEVER|WRAPPED|ZONE)\b/i);
        var i = t.operator;
        Array.isArray(i) || (i = t.operator = [i]), i.unshift(/:=/)
    }(Prism),
    function(e) {
        e.languages.sass = e.languages.extend("css", {
            comment: {
                pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
                lookbehind: !0
            }
        }), e.languages.insertBefore("sass", "atrule", {
            "atrule-line": {
                pattern: /^(?:[ \t]*)[@+=].+/m,
                inside: {
                    atrule: /(?:@[\w-]+|[+=])/m
                }
            }
        }), delete e.languages.sass.atrule;
        var t = /\$[-\w]+|#\{\$[-\w]+\}/,
            n = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
                pattern: /(\s+)-(?=\s)/,
                lookbehind: !0
            }];
        e.languages.insertBefore("sass", "property", {
            "variable-line": {
                pattern: /^[ \t]*\$.+/m,
                inside: {
                    punctuation: /:/,
                    variable: t,
                    operator: n
                }
            },
            "property-line": {
                pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
                inside: {
                    property: [/[^:\s]+(?=\s*:)/, {
                        pattern: /(:)[^:\s]+/,
                        lookbehind: !0
                    }],
                    punctuation: /:/,
                    variable: t,
                    operator: n,
                    important: e.languages.sass.important
                }
            }
        }), delete e.languages.sass.property, delete e.languages.sass.important, e.languages.insertBefore("sass", "punctuation", {
            selector: {
                pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
                lookbehind: !0
            }
        })
    }(Prism), Prism.languages.scss = Prism.languages.extend("css", {
        comment: {
            pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
            lookbehind: !0
        },
        atrule: {
            pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
            inside: {
                rule: /@[\w-]+/
            }
        },
        url: /(?:[-a-z]+-)?url(?=\()/i,
        selector: {
            pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
            inside: {
                parent: {
                    pattern: /&/,
                    alias: "important"
                },
                placeholder: /%[-\w]+/,
                variable: /\$[-\w]+|#\{\$[-\w]+\}/
            }
        },
        property: {
            pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/,
            inside: {
                variable: /\$[-\w]+|#\{\$[-\w]+\}/
            }
        }
    }), Prism.languages.insertBefore("scss", "atrule", {
        keyword: [/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
            pattern: /( +)(?:from|through)(?= )/,
            lookbehind: !0
        }]
    }), Prism.languages.insertBefore("scss", "important", {
        variable: /\$[-\w]+|#\{\$[-\w]+\}/
    }), Prism.languages.insertBefore("scss", "function", {
        placeholder: {
            pattern: /%[-\w]+/,
            alias: "selector"
        },
        statement: {
            pattern: /\B!(?:default|optional)\b/i,
            alias: "keyword"
        },
        boolean: /\b(?:true|false)\b/,
        null: {
            pattern: /\bnull\b/,
            alias: "keyword"
        },
        operator: {
            pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
            lookbehind: !0
        }
    }), Prism.languages.scss.atrule.inside.rest = Prism.languages.scss, Prism.languages.yaml = {
        scalar: {
            pattern: /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\2[^\r\n]+)*)/,
            lookbehind: !0,
            alias: "string"
        },
        comment: /#.*/,
        key: {
            pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
            lookbehind: !0,
            alias: "atrule"
        },
        directive: {
            pattern: /(^[ \t]*)%.+/m,
            lookbehind: !0,
            alias: "important"
        },
        datetime: {
            pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|]|}))/m,
            lookbehind: !0,
            alias: "number"
        },
        boolean: {
            pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:true|false)[ \t]*(?=$|,|]|})/im,
            lookbehind: !0,
            alias: "important"
        },
        null: {
            pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)[ \t]*(?=$|,|]|})/im,
            lookbehind: !0,
            alias: "important"
        },
        string: {
            pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|]|}|\s*#))/m,
            lookbehind: !0,
            greedy: !0
        },
        number: {
            pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
            lookbehind: !0
        },
        tag: /![^\s]+/,
        important: /[&*][\w]+/,
        punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
    }, Prism.languages.yml = Prism.languages.yaml,
    function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ClipboardJS = t() : e.ClipboardJS = t()
    }(this, function() {
        return function(e) {
            var t = {};

            function n(i) {
                if (t[i]) return t[i].exports;
                var r = t[i] = {
                    i: i,
                    l: !1,
                    exports: {}
                };
                return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
            }
            return n.m = e, n.c = t, n.d = function(e, t, i) {
                n.o(e, t) || Object.defineProperty(e, t, {
                    enumerable: !0,
                    get: i
                })
            }, n.r = function(e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(e, "__esModule", {
                    value: !0
                })
            }, n.t = function(e, t) {
                if (1 & t && (e = n(e)), 8 & t) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var i = Object.create(null);
                if (n.r(i), Object.defineProperty(i, "default", {
                        enumerable: !0,
                        value: e
                    }), 2 & t && "string" != typeof e)
                    for (var r in e) n.d(i, r, function(t) {
                        return e[t]
                    }.bind(null, r));
                return i
            }, n.n = function(e) {
                var t = e && e.__esModule ? function() {
                    return e.default
                } : function() {
                    return e
                };
                return n.d(t, "a", t), t
            }, n.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }, n.p = "", n(n.s = 0)
        }([function(e, t, n) {
            "use strict";
            var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, n, i) {
                        return n && e(t.prototype, n), i && e(t, i), t
                    }
                }(),
                o = l(n(1)),
                a = l(n(3)),
                s = l(n(4));

            function l(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            var c = function(e) {
                function t(e, n) {
                    ! function(e, n) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this);
                    var i = function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    return i.resolveOptions(n), i.listenClick(e), i
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, a.default), r(t, [{
                    key: "resolveOptions",
                    value: function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                        this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === i(e.container) ? e.container : document.body
                    }
                }, {
                    key: "listenClick",
                    value: function(e) {
                        var t = this;
                        this.listener = (0, s.default)(e, "click", function(e) {
                            return t.onClick(e)
                        })
                    }
                }, {
                    key: "onClick",
                    value: function(e) {
                        var t = e.delegateTarget || e.currentTarget;
                        this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new o.default({
                            action: this.action(t),
                            target: this.target(t),
                            text: this.text(t),
                            container: this.container,
                            trigger: t,
                            emitter: this
                        })
                    }
                }, {
                    key: "defaultAction",
                    value: function(e) {
                        return u("action", e)
                    }
                }, {
                    key: "defaultTarget",
                    value: function(e) {
                        var t = u("target", e);
                        if (t) return document.querySelector(t)
                    }
                }, {
                    key: "defaultText",
                    value: function(e) {
                        return u("text", e)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                    }
                }], [{
                    key: "isSupported",
                    value: function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                            t = "string" == typeof e ? [e] : e,
                            n = !!document.queryCommandSupported;
                        return t.forEach(function(e) {
                            n = n && !!document.queryCommandSupported(e)
                        }), n
                    }
                }]), t
            }();

            function u(e, t) {
                var n = "data-clipboard-" + e;
                if (t.hasAttribute(n)) return t.getAttribute(n)
            }
            e.exports = c
        }, function(e, t, n) {
            "use strict";
            var i, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                o = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, n, i) {
                        return n && e(t.prototype, n), i && e(t, i), t
                    }
                }(),
                a = (i = n(2)) && i.__esModule ? i : {
                    default: i
                },
                s = function() {
                    function e(t) {
                        ! function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), this.resolveOptions(t), this.initSelection()
                    }
                    return o(e, [{
                        key: "resolveOptions",
                        value: function() {
                            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                            this.action = e.action, this.container = e.container, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = ""
                        }
                    }, {
                        key: "initSelection",
                        value: function() {
                            this.text ? this.selectFake() : this.target && this.selectTarget()
                        }
                    }, {
                        key: "selectFake",
                        value: function() {
                            var e = this,
                                t = "rtl" == document.documentElement.getAttribute("dir");
                            this.removeFake(), this.fakeHandlerCallback = function() {
                                return e.removeFake()
                            }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[t ? "right" : "left"] = "-9999px";
                            var n = window.pageYOffset || document.documentElement.scrollTop;
                            this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, a.default)(this.fakeElem), this.copyText()
                        }
                    }, {
                        key: "removeFake",
                        value: function() {
                            this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
                        }
                    }, {
                        key: "selectTarget",
                        value: function() {
                            this.selectedText = (0, a.default)(this.target), this.copyText()
                        }
                    }, {
                        key: "copyText",
                        value: function() {
                            var e = void 0;
                            try {
                                e = document.execCommand(this.action)
                            } catch (t) {
                                e = !1
                            }
                            this.handleResult(e)
                        }
                    }, {
                        key: "handleResult",
                        value: function(e) {
                            this.emitter.emit(e ? "success" : "error", {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            })
                        }
                    }, {
                        key: "clearSelection",
                        value: function() {
                            this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges()
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            this.removeFake()
                        }
                    }, {
                        key: "action",
                        set: function() {
                            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "copy";
                            if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                        },
                        get: function() {
                            return this._action
                        }
                    }, {
                        key: "target",
                        set: function(e) {
                            if (void 0 !== e) {
                                if (!e || "object" !== (void 0 === e ? "undefined" : r(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                this._target = e
                            }
                        },
                        get: function() {
                            return this._target
                        }
                    }]), e
                }();
            e.exports = s
        }, function(e, t) {
            e.exports = function(e) {
                var t;
                if ("SELECT" === e.nodeName) e.focus(), t = e.value;
                else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) {
                    var n = e.hasAttribute("readonly");
                    n || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), n || e.removeAttribute("readonly"), t = e.value
                } else {
                    e.hasAttribute("contenteditable") && e.focus();
                    var i = window.getSelection(),
                        r = document.createRange();
                    r.selectNodeContents(e), i.removeAllRanges(), i.addRange(r), t = i.toString()
                }
                return t
            }
        }, function(e, t) {
            function n() {}
            n.prototype = {
                on: function(e, t, n) {
                    var i = this.e || (this.e = {});
                    return (i[e] || (i[e] = [])).push({
                        fn: t,
                        ctx: n
                    }), this
                },
                once: function(e, t, n) {
                    var i = this;

                    function r() {
                        i.off(e, r), t.apply(n, arguments)
                    }
                    return r._ = t, this.on(e, r, n)
                },
                emit: function(e) {
                    for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), i = 0, r = n.length; i < r; i++) n[i].fn.apply(n[i].ctx, t);
                    return this
                },
                off: function(e, t) {
                    var n = this.e || (this.e = {}),
                        i = n[e],
                        r = [];
                    if (i && t)
                        for (var o = 0, a = i.length; o < a; o++) i[o].fn !== t && i[o].fn._ !== t && r.push(i[o]);
                    return r.length ? n[e] = r : delete n[e], this
                }
            }, e.exports = n
        }, function(e, t, n) {
            var i = n(5),
                r = n(6);
            e.exports = function(e, t, n) {
                if (!e && !t && !n) throw new Error("Missing required arguments");
                if (!i.string(t)) throw new TypeError("Second argument must be a String");
                if (!i.fn(n)) throw new TypeError("Third argument must be a Function");
                if (i.node(e)) return p = t, f = n, (d = e).addEventListener(p, f), {
                    destroy: function() {
                        d.removeEventListener(p, f)
                    }
                };
                if (i.nodeList(e)) return l = e, c = t, u = n, Array.prototype.forEach.call(l, function(e) {
                    e.addEventListener(c, u)
                }), {
                    destroy: function() {
                        Array.prototype.forEach.call(l, function(e) {
                            e.removeEventListener(c, u)
                        })
                    }
                };
                if (i.string(e)) return o = e, a = t, s = n, r(document.body, o, a, s);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                var o, a, s, l, c, u, d, p, f
            }
        }, function(e, t) {
            t.node = function(e) {
                return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
            }, t.nodeList = function(e) {
                var n = Object.prototype.toString.call(e);
                return void 0 !== e && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length" in e && (0 === e.length || t.node(e[0]))
            }, t.string = function(e) {
                return "string" == typeof e || e instanceof String
            }, t.fn = function(e) {
                return "[object Function]" === Object.prototype.toString.call(e)
            }
        }, function(e, t, n) {
            var i = n(7);

            function r(e, t, n, r, o) {
                var a = function(e, t, n, r) {
                    return function(n) {
                        n.delegateTarget = i(n.target, t), n.delegateTarget && r.call(e, n)
                    }
                }.apply(this, arguments);
                return e.addEventListener(n, a, o), {
                    destroy: function() {
                        e.removeEventListener(n, a, o)
                    }
                }
            }
            e.exports = function(e, t, n, i, o) {
                return "function" == typeof e.addEventListener ? r.apply(null, arguments) : "function" == typeof n ? r.bind(null, document).apply(null, arguments) : ("string" == typeof e && (e = document.querySelectorAll(e)), Array.prototype.map.call(e, function(e) {
                    return r(e, t, n, i, o)
                }))
            }
        }, function(e, t) {
            if ("undefined" != typeof Element && !Element.prototype.matches) {
                var n = Element.prototype;
                n.matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector
            }
            e.exports = function(e, t) {
                for (; e && 9 !== e.nodeType;) {
                    if ("function" == typeof e.matches && e.matches(t)) return e;
                    e = e.parentNode
                }
            }
        }])
    });
let util = {
        test: {
            isNumber: function(e) {
                return "number" == typeof e || "string" == typeof e && ("" !== (e = e.replace(/^\s*/, "").replace(/\s*$/, "")) && !isNaN(e))
            },
            isEmail: function(e) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
            },
            isUrl: function(e) {
                return /\b(https?):\/\/[\-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_|]/i.test(e)
            },
            isWsUrl: function(e) {
                return /^wss?:\/\/.+$/i.test(e)
            },
            isChinese: function(e) {
                return /^[\u4e00-\u9fa5]+$/.test(e)
            },
            isChinesePhoneNumber: function(e) {
                return /1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}/.test(e)
            },
            isQQNumber: function(e) {
                return /^[1-9][0-9]{4,11}$/.test(e)
            },
            isChineseIdCardNumber: function(e) {
                if (18 !== e.length) return {
                    status: !1,
                    error: "请输入 18 位身份证号码"
                };
                if (!/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|20[12][0-9])(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(e)) return {
                    status: !1,
                    error: "身份证号码格式错误"
                };
                if (!{
                        11: "北京",
                        12: "天津",
                        13: "河北",
                        14: "山西",
                        15: "内蒙古",
                        21: "辽宁",
                        22: "吉林",
                        23: "黑龙江",
                        31: "上海",
                        32: "江苏",
                        33: "浙江",
                        34: "安徽",
                        35: "福建",
                        36: "江西",
                        37: "山东",
                        41: "河南",
                        42: "湖北",
                        43: "湖南",
                        44: "广东",
                        45: "广西",
                        46: "海南",
                        50: "重庆",
                        51: "四川",
                        52: "贵州",
                        53: "云南",
                        54: "西藏",
                        61: "陕西",
                        62: "甘肃",
                        63: "青海",
                        64: "宁夏",
                        65: "新疆"
                    }[e.substr(0, 2)]) return {
                    status: !1,
                    error: "身份证号码编码错误"
                };
                var t = e.toUpperCase().split("");
                let n = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
                    i = 0,
                    r = 0,
                    o = 0;
                for (let e = 0; e < 17; e++) i += (r = t[e]) * (o = n[e]);
                return [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2][i % 11] != t[17] ? {
                    status: !1,
                    error: "身份证号码校验错误"
                } : {
                    status: !0,
                    error: ""
                }
            },
            isIPv4: function(e) {
                return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(e)
            },
            isHexColor: function(e) {
                return /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e)
            },
            isValidDomain: function(e) {
                return /^([a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.){1,2}([a-zA-Z]{1,7}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,3})$/i.test(e)
            }
        },
        array: {
            unique: function(e) {
                return [...new Set(e)]
            },
            shuffle: function(e) {
                for (var t = -1, n = e.length, i = n - 1; ++t < n;) {
                    var r = t + Math.floor(Math.random() * (i - t + 1));
                    value = e[r], e[r] = e[t], e[t] = value
                }
                return e
            }
        },
        string: {
            format: function(e) {
                if (arguments.length) {
                    var t, n = typeof arguments[1],
                        i = "string" === n || "number" === n ? Array.prototype.slice.call(arguments, 1) : arguments[1];
                    for (t in e = e.replace("%7B", "{").replace("%7D", "}"), i) e = e.replace(new RegExp("\\{" + t + "\\}", "gi"), i[t])
                }
                return e
            },
            slugify: function(e) {
                return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/"/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            },
            randomId: function() {
                return Math.random().toString(36).substring(2)
            },
            toTitleCase: function(e) {
                return e.toLowerCase().replace(/( |^)[a-z]/g, function(e) {
                    return e.toUpperCase()
                })
            }
        },
        date: {
            format: function(e, t) {
                var n, i = {
                    "M+": e.getMonth() + 1,
                    "d+": e.getDate(),
                    "h+": e.getHours(),
                    "m+": e.getMinutes(),
                    "s+": e.getSeconds(),
                    "q+": Math.floor((e.getMonth() + 3) / 3),
                    S: e.getMilliseconds()
                };
                for (var r in /(y+)/.test(t) && (n = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), i) new RegExp("(" + r + ")").test(n) && (n = n.replace(RegExp.$1, 1 === RegExp.$1.length ? i[r] : ("00" + i[r]).substr(("" + i[r]).length)));
                return n
            }
        },
        number: {
            byteFormat: function(e) {
                var t = -1;
                do {
                    e /= 1024, t++
                } while (e > 1024);
                return Math.max(e, .1).toFixed(2) + " " + ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][t]
            }
        },
        captcha: {
            refresh: function() {
                var e = $(".captcha"),
                    t = e.attr("src");
                t = t.substring(0, t.indexOf("t=") + 2);
                var n = Math.random().toString().substring(2);
                e.attr("src", t + n)
            }
        },
        image: {
            src: function(e, t = !0) {
                if (!e) return "";
                var n = e.src;
                if (void 0 === n) return "";
                var i = /^data:image\/(.+?);base64,(.+)/;
                return t && i.test(n) && (n = n.replace(i, "$2")), n
            },
            ext: function(e, t = !1) {
                if (!e) return "";
                var n = e.src;
                if (void 0 === n) return "";
                var i = "",
                    r = /^data:image\/(.+?);base64,(.+)/.exec(n);
                return i = null !== r ? r[1] : n.substr(n.lastIndexOf(".") + 1), t ? "." + i : i
            },
            fetch: function(e) {
                return new Promise((t, n) => {
                    const i = new Image;
                    i.onload = t, i.error = n, i.src = e
                })
            }
        },
        download: {
            file: function(e = {}) {
                var t = e.type || null;
                if (!t) throw "`type` is required.";
                var n = $("<form>", {
                        action: uri.apiUrl("download/" + t),
                        method: "post"
                    }),
                    i = e.params || {};
                $.each(i, function(e, t) {
                    $("<input>").attr({
                        type: "hidden",
                        name: e,
                        value: t
                    }).appendTo(n)
                }), n.appendTo("body").submit().remove()
            },
            img: function(e, t) {
                var n = (t = t || {}).filename ? t.filename : "下载",
                    i = t.ext ? t.ext : util.image.ext(e);
                i && (i = "." + i);
                var r = document.createElement("a");
                r.href = e.src, r.download = n + i, r.dispatchEvent(new MouseEvent("click", {
                    bubbles: !0,
                    cancelable: !0,
                    view: window
                }))
            },
            image: function(e, t) {
                var n = (t = t || {}).filename ? t.filename : "下载",
                    i = t.ext ? t.ext : "png",
                    r = "image/png";
                "jpg" === i ? r = "image/jpeg" : "gif" === i && (r = "image/gif");
                var o = e.toDataURL(r, 1).replace(r, "image/octet-stream"),
                    a = document.createElement("a");
                a.href = o, a.download = n + "." + i, a.dispatchEvent(new MouseEvent("click", {
                    bubbles: !0,
                    cancelable: !0,
                    view: window
                }))
            },
            svg: function(e, t) {
                var n = (t = t || {}).filename ? t.filename : "下载",
                    i = new Blob([e], {
                        type: "image/svg+xml;charset=utf-8"
                    }),
                    r = URL.createObjectURL(i),
                    o = document.createElement("a");
                o.href = r, o.download = n + ".svg", o.dispatchEvent(new MouseEvent("click", {
                    bubbles: !0,
                    cancelable: !0,
                    view: window
                }))
            },
            text: function(e, t) {
                var n = void 0 !== (t = t || {}).filename ? t.filename : +new Date,
                    i = void 0 !== t.ext ? t.ext : "txt",
                    r = void 0 !== t.type ? t.type : "text/plain",
                    o = new Blob([e], {
                        type: r + ";charset=utf-8"
                    }),
                    a = URL.createObjectURL(o),
                    s = document.createElement("a");
                s.href = a, s.download = n + "." + i, s.dispatchEvent(new MouseEvent("click", {
                    bubbles: !0,
                    cancelable: !0,
                    view: window
                }))
            }
        },
        debounce: function(e, t, n) {
            let i, r, o = function() {
                let o = this,
                    a = arguments;
                if (i && clearTimeout(i), n) {
                    let n = !i;
                    i = setTimeout(() => {
                        i = null
                    }, t), n && (r = e.apply(o, a))
                } else i = setTimeout(() => {
                    e.apply(o, a)
                }, t);
                return r
            };
            return o.cancel = function() {
                clearTimeout(i), i = null
            }, o
        },
        throttle: function(e, t, n = {}) {
            let i, r, o, a = 0,
                s = function() {
                    a = !1 === n.leading ? 0 : (new Date).getTime(), i = null, e.apply(r, o), i || (r = o = null)
                },
                l = function() {
                    let l = (new Date).getTime();
                    a || !1 !== n.leading || (a = l);
                    let c = t - (l - a);
                    r = this, o = arguments, c <= 0 || c > t ? (i && (clearTimeout(i), i = null), a = l, e.apply(r, o), i || (r = o = null)) : i || !1 === n.trailing || (i = setTimeout(s, c))
                };
            return l.cancel = function() {
                clearTimeout(i), a = 0, i = null
            }, l
        }
    },
    uri = {
        rootUrl: function() {
            let e = window.location,
                t = e.origin;
            return t || (t = e.protocol + "//" + e.host), t = t.replace(/\/*$/, "/")
        },
        siteUrl: function(e) {
            let t = this.rootUrl();
            return void 0 === e ? t : util.test.isUrl(e) ? e : t + e
        },
        apiUrl: function(e) {
            return void 0 !== e && e ? "" === (e = e.replace(/^\/*/, "").replace(/\/*$/, "")) ? API_URL : API_URL + "/" + e : API_URL
        },
        prep: function(e) {
            return /^https?:\/\//i.test(e) ? e : "http://" + e
        }
    },
    http = {
        ajax: function(e, t, n) {
            let i = (t = t || {}).type ? t.type : "get",
                r = t.data ? t.data : null,
                o = t.beforeSend && "function" == typeof t.beforeSend ? t.beforeSend : null,
                a = !!t.crossDomain && t.crossDomain,
                s = {
                    url: e = a ? e : uri.siteUrl(e),
                    type: i,
                    data: r,
                    beforeSend: o
                };
            a && $.extend(s, {
                type: "get",
                crossDomain: !0,
                dataType: "jsonp",
                jsonpCallback: "callback",
                success: n
            });
            let l = $.ajax(s);
            if (!a && null !== n) {
                let e = null,
                    t = null,
                    i = null;
                "function" == typeof n ? i = n : "object" == typeof n && (n.always && -1 != $.inArray(typeof n.always, ["function", "object"]) && (e = n.always), n.failed && -1 != $.inArray(typeof n.failed, ["function", "object"]) && (t = n.failed), n.done && -1 != $.inArray(typeof n.done, ["function", "object"]) && (i = n.done)), e && (l = l.always(e)), t && (l = l.failed(t)), i && (l = l.done(i))
            }
            return l
        },
        tool: function(e, t, n) {
            let i = uri.apiUrl("api/" + e);
            return t = $.extend({
                type: "post"
            }, t), this.ajax(i, t, n)
        },
        u: function(e, t, n) {
            t = void 0 === t ? {} : t;
            let i = `customer/${e}`;
            return t = $.extend({
                type: "post"
            }, t), this.ajax(i, t, n)
        },
        redirect: function(e, t) {
            switch (null === t && (t = "r"), t) {
                case "r":
                    window.location.replace(e);
                    break;
                case "c":
                    window.location.href = e;
                    break;
                default:
                    window.location.replace(e)
            }
        }
    },
    dom = {
        enable: function(e, t) {
            return null === e ? this : (e = (e = "string" == typeof e ? $(e) : e).prop("disabled", !1), t && (e.is("button") ? e.html(t) : e.is("input") && e.val(t)), this)
        },
        disable: function(e, t) {
            return null === e ? this : (e = (e = "string" == typeof e ? $(e) : e).prop("disabled", !0), t && (e.is("button") ? e.html(t) : e.is("input") && e.val(t)), this)
        },
        scrollTo: function(e = "body", t = 10, n = "slow") {
            e = "string" == typeof e ? $(e) : e, $("html,body").stop(!0, !1).animate({
                scrollTop: e.offset().top - t
            }, n)
        }
    },
    loader = {
        scripts: function(e, t) {
            var n = document.getElementsByTagName("head")[0],
                i = 0;

            function r(r, o, s) {
                var l = "PLaySTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/;
                ("load" === o.type || l.test((o.currentTarget || o.srcElement).readyState)) && (n.removeChild(r), ++i == e.length ? t && t() : a(e[i]))
            }
            var o = "undefined" != typeof opera && "[object Opera]" === opera.toString();

            function a(e) {
                var t = document.createElement("script");
                t.async = !0, t.charset = "utf-8", t.src = e, n.appendChild(t), !t.attachEvent || t.attachEvent.toString && t.attachEvent.toString().indexOf("[native code") < 0 || o ? t.addEventListener("load", function(e) {
                    r(t, e)
                }, !1) : t.attachEvent("onreadystatechange", function(e) {
                    r(t, e)
                })
            }
            a(e[i])
        },
        style: function(e) {
            let t = document.createElement("link");
            t.href = e, t.rel = "stylesheet", t.type = "text/css", t.className = "async-page-style", document.getElementsByTagName("head")[0].appendChild(t)
        }
    },
    media = {
        audio: {
            init: function(e) {
                return e = e || ".audio-player", 0 === $(e).length ? null : $(e)
            },
            play: function(e) {
                if ("undefined" == typeof $player && ($player = this.init()), !$player) return;
                let t = $player[0];
                t.src = e, t.load(), t.play()
            }
        }
    },
    storage = {
        get: function(e) {
            return localStorage.getItem(e)
        },
        save: function(e, t) {
            localStorage.setItem(e, t)
        },
        remove: function(e) {
            localStorage.removeItem(e)
        },
        clear: function() {
            localStorage.clear()
        }
    };

const OK = 200;
const ERROR = 400;
const UNAUTHORIZED = 401;
$(document).ready(function() {
    const ALLOW_REGISTER = false;
    const $entrance = $('#entrance');
    $(this).initPlugin();
    if ($.support.pjax) {
        let pjaxContainer = '#pjax-container';
        $(document).pjax('a:not(.nop, [target="_blank"])', pjaxContainer, {
            timeout: 3000
        }).on('pjax:send', function() {
            NProgress.start();
        }).on('pjax:complete', function() {
            NProgress.done();
        }).on('pjax:end', function(e) {
            $(this).initPlugin();
        }).on('pjax:beforeReplace', function() {
            $(this).destroyPlugin();
        });
        $(document).on('submit', 'form[data-pjax]', function(e) {
            let $q = $('#input-search-text'),
                q = $.trim($q.val());
            if (q === '') {
                $q.val('').focus();
                return false;
            }
            $.pjax.submit(e, pjaxContainer)
        });
    }

    function updateFavoriteLabel(signed) {
        let $wrap = $('.favorite-action');
        if ($wrap.length > 0) {
            if (!signed) {
                $wrap.html($('#add-template').html());
                return;
            }
            http.u("favorite", {
                data: {
                    slug: $('#slug').val()
                }
            }).then((json) => {
                if (json.code == OK) {
                    $wrap.html($('#added-template').html()).initTooltip();
                } else {
                    $wrap.html($('#add-template').html());
                }
            });
        }
    }

    function addViewedHistory() {
        let $slug = $('#slug');
        if ($slug.length === 0) {
            return;
        }
        let slug = $slug.val();
        http.u('history.add', {
            data: {
                slug: slug
            }
        });
    }

    var clipboard = new ClipboardJS('.btn-copy');
    clipboard.on('success', function(e) {
        if (e.text === "") {
            return;
        }
        let text = e.trigger.innerHTML;
        e.trigger.innerHTML = '已复制';
        setTimeout(function() {
            e.trigger.innerHTML = text;
        }, 3000);
    });
    //回到顶部
    if (!$('.back-top').length) {
        $('body').append('<div class="back-top bx hidden-xs bx-top"><i class="iconfont icon-arrow-circle-up"></i></div>');
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $(".back-top").fadeIn(500);
            } else {
                $(".back-top").fadeOut(500);
            }
        });
        $(document).on('click', '.back-top', function() {
            $('body,html').animate({
                scrollTop: 0
            }, 100);
            return false;
        });
    }
    $(document).on('click', '.btn-copy', function(e) {
        e.preventDefault();
    });
    $(document).on('click', '.btn-clear-content', function(e) {
        e.preventDefault();
        let target = $(this).data('target');
        if (!target) {
            return;
        }
        let $target = $(target);
        if ($target.is('input') || $target.is('textarea')) {
            $target.val('');
        }
    });
    $(document).on('touchend click', 'a[data-pron]', function(e) {
        e.preventDefault();
        if (typeof(url) === 'undefined') {
            return;
        }
        let source = url + $(this).data('pron');
        media.audio.play(source);
    });
    $(document).on('click', '.captcha-refresh', function(e) {
        e.preventDefault();
        util.captcha.refresh();
    });
    $(document).on("click", "[data-dropdown]", function(e) {
        e.preventDefault();
        e.stopPropagation();
        let $this = $(this);
        $('.dropdown-panel').not(function() {
            return $(this).parent().find('[data-dropdown]').is($this);
        }).slideUp(100, function() {
            $(this).find('[role="menu"]').attr({
                'aria-expanded': false,
                'aria-hidden': true
            });
        });
        let $dropdownPanel = $this.next($this.data('dropdown'));
        if ($dropdownPanel.length === 0) {
            $dropdownPanel = $($this.data('dropdown'));
        }
        if ($dropdownPanel.length === 0) {
            return;
        }
        $dropdownPanel.slideDown(200, function() {
            $(this).find('[role="menu"]').attr({
                'aria-expanded': true,
                'aria-hidden': false
            })
        });
    });
    $(document).on("click", "body", function(e) {
        $('.dropdown-panel').slideUp(100, function() {
            let $this = $(this);
            if ($this.hasClass('created')) {
                $this.remove();
            } else {
                $this.find('[role="menu"]').attr({
                    'aria-expanded': false,
                    'aria-hidden': true
                });
            }
        });
    });
    $(document).on('click', '.dropdown-panel', function(e) {
        if ($(this).data('no-hidden') === 1) {
            e.stopPropagation();
        }
    });
    $(document).on("click", "[data-toggle=collapse]", function(e) {
        e.preventDefault();
        var $this = $(this);
        var collapse = $this.attr('href') ? $this.attr('href') : $this.data('target');
        if (!collapse) {
            return;
        }
        var speed = $this.data('speed') ? $this.data('speed') : '';
        $(collapse).slideToggle(speed);
        if ($this.hasClass('dropright') || $this.hasClass('dropdown')) {
            if ($this.hasClass('dropright')) {
                $this.removeClass('dropright').addClass('dropdown');
            } else {
                $this.removeClass('dropdown').addClass('dropright');
            }
        }
    });
    $(document).on("keydown", "[contenteditable]", function(e) {
        var $this = $(this);
        var maxlength = $this.attr('maxlength');
        if (maxlength !== undefined) {
            maxlength = parseInt(maxlength);
            if ($this.text().length === maxlength && e.keyCode != 8) {
                e.preventDefault();
            }
        }
    });
    $(document).on('click', '.link-add-to-favorite', function(e) {
        let $this = $(this);
        doast.clear();
        http.u('favorite.add', {
            data: {
                slug: $('#slug').val()
            },
            beforeSend: () => {
                $this.addClass('hidden');
                $this.parent().append($('#adding-template').html());
            }
        }).then((json) => {
            $this.parent().find('.loading-text').remove();
            if (json.code == UNAUTHORIZED) {
                $this.removeClass('hidden');
                doast.info("加入收藏前，请先登录！");
                return;
            }
            if (json.code == OK) {
                $this.parent().html($('#added-template').html()).initTooltip();
                doast.success(json.message);
            } else {
                $this.removeClass('hidden');
                doast.error(json.message);
            }
        });
    });
    $(document).on('click', '.js-download', function(e) {
        e.preventDefault();
        var $this = $(this);
        var type = $this.data('type');
        var name = $this.data('name');
        var filename = $this.data('filename');
        var options = {
            type: type,
            params: {
                name: name,
                filename: filename
            }
        };
        util.download.file(options);
    });
    $(document).on('click', '.js-print', function(e) {
        e.preventDefault();
        var $this = $(this);
        var printable = $this.data('printable') ? $this.data('printable') : '.printable';
        var options = {
            noPrintSelector: '[data-no-print]',
            append: '<div class="print-date">打印时间：' + new Date().toLocaleString() + '</div>'
        };
        $(printable).print(options);
    });
    $(document).on('click', '.js-save-as-image', function(e) {
        e.preventDefault();
        let $this = $(this);
        let filenameHandler = function(filename) {
            let timestamp = (new Date()).getTime();
            filename = filename.replace(/(.*?)(\{timestamp\})(.*?)/g, "$1" + timestamp + "$3");
            return filename;
        }
        let save = function() {
            let text = $this.html();
            $this.html('正在生成图片...');
            let scale = $this.data('scale') ? $this.data('scale') : 2;
            scale = parseInt(scale);
            scale = Math.min(scale, 2);
            scale = Math.max(scale, 1);
            let $imageContainer = $this.data('screenshot') ? $($this.data('screenshot')) : $('.screenshotable');
            let width = $imageContainer.outerWidth(),
                height = $imageContainer.outerHeight();
            let canvas = document.createElement("canvas");
            canvas.width = width * scale;
            canvas.height = height * scale;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            let context = canvas.getContext("2d");
            context.scale(scale, scale);
            let rect = $imageContainer.get(0).getBoundingClientRect();
            context.translate(-rect.left, -rect.top);
            let offset = $imageContainer.offset();
            let ext = $this.data('ext') || 'png';
            let bgColor = ext === 'png' ? 'transparent' : '#ffffff';
            html2canvas($imageContainer.get(0), {
                canvas: canvas,
                scale: scale,
                background: bgColor,
                x: offset.left,
                y: offset.top,
                useCORS: true
            }).then(function(canvas) {
                let filename = $this.data('filename') || '下载';
                filename = filenameHandler(filename);
                util.download.image(canvas, {
                    filename: filename,
                    ext: ext
                });
                $this.html(text);
            });
        }
        let beforeSave = $this.data('beforeSave');
        if (beforeSave && window.clickHandler[beforeSave] && typeof window.clickHandler[beforeSave] === 'function') {
            window.clickHandler[beforeSave]($this, function() {
                save();
            });
        } else {
            save();
        }
    });
});
$.fn.destroyPlugin = function() {
    window.loaded = null;
    window.resize = null;
    window.onresize = null;
    if ($.fn.datepicker) {
        $('.datepicker').datepicker('destroy');
    }
    if ($.fn.spectrum) {
        $('.color-picker').spectrum("destroy");
    }
    if ($.fn.rangeslider) {}
    if (typeof doast !== 'undefined') {
        doast.clear();
    }
    if (window.unloaded && typeof window.unloaded === 'function') {
        window.unloaded();
    }
}
$.fn.initPlugin = function() {
    if (styles !== undefined) {
        styles = styles.map(function(style) {
            return STATIC_URL + style;
        });
        $('.async-page-style').remove();
        (function(styles) {
            if (typeof styles === 'string') {
                loader.style(styles);
            } else {
                for (let i in styles) {
                    loader.style(styles[i]);
                }
            }
        })(styles);
    }
    if (typeof scripts !== undefined && scripts.length > 0) {
        scripts = scripts.map(function(script) {
            return STATIC_URL + script;
        });
        (function(scripts) {
            loader.scripts(scripts, function() {
                $(this).executePlugin();
            });
        })(scripts);
    } else {
        $(this).executePlugin();
    }
}
$.fn.executePlugin = function() {
    var $this = $(this);
    $this.imageLazyload().initArticleHeader().initTooltip().initSticky().initUploader().initRangeSlider().
    initDatePicker().initDoubleRainbowPicker().initColorPickers().initSelect2().initCodeMirror().codeHighlight().
    searchResultHighlight().initEventHandler().footerHeight();

    if (window.loaded && typeof window.loaded === 'function') {
        window.loaded();
    }
    if (window.resize && typeof window.resize === 'function') {
        window.onresize = function() {
            window.resize();
        }
    }
    $(window).resize(function() {
        $this.footerHeight();
    });
}
$.fn.imageLazyload = function() {
    const loadImage = image => {
        let src = image.getAttribute('data-src');
        let srcset = src.replace(/(\.[0-9a-z]+)$/i, '$1');
        src = STATIC_URL + src;
        srcset = STATIC_URL + srcset;
        util.image.fetch(src).then(() => {
            image.src = src;
        }).then(() => {
            util.image.fetch(srcset).then(() => {
                image.setAttribute('srcset', srcset + ' 2x');
            });
        });
    };
    const lazyload = image => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.disconnect();
                }
            });
        });
        io.observe(image);
    };
    let images = document.querySelectorAll('[data-src]');
    if ('IntersectionObserver' in window) {
        images.forEach(lazyload);
    } else {
        images.forEach(image => {
            loadImage(image);
        });
    }
    return this;
};
$.fn.initEventHandler = function() {
    $(document).off("click", "[data-click-handler], [data-click-emitter]").on("click", "[data-click-handler], [data-click-emitter]", function(e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.data('spp') !== undefined) {
            e.stopPropagation();
        }
        if (!window.clickHandler) {
            return;
        }
        var handler = $this.data('click-handler');
        if (!handler) {
            if (typeof window.clickHandler === 'function') {
                window.clickHandler($(e.target));
            }
        } else {
            if (window.clickHandler[handler] && typeof window.clickHandler[handler] === 'function') {
                window.clickHandler[handler]($(e.target));
            }
        }
    });
    $(document).on("change", '[data-change-handler]', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (!window.changeHandler) {
            return;
        }
        var $this = $(e.target);
        var handler = $(this).data('change-handler');
        if (!handler) {
            if (typeof window.changeHandler === 'function') {
                window.changeHandler($this);
            }
        } else {
            if (window.changeHandler[handler] && typeof window.changeHandler[handler] === 'function') {
                window.changeHandler[handler]($this);
            }
        }
    });
    $(document).on("keyup", "[data-keyup-trigger]", function(e) {
        if (e.which != 13) {
            return;
        }
        var $this = $(this);
        var trigger = $this.data('keyup-trigger');
        if (!trigger) {
            return;
        }
        $this.blur();
        $(trigger).trigger('click');
    });
    return this;
};
$.fn.initSticky = function() {
    if ($.fn.stick_in_parent && $('.sticker').length > 0) {
        var $this, offsetTop = 16;
        $('.sticker').each(function() {
            $this = $(this);
            if ($this.data('offset-top') !== undefined) {
                offsetTop = $this.data('offset-top');
            }
            $this.stick_in_parent({
                offset_top: offsetTop
            }).on("sticky_kit:stick", function(e) {}).on("sticky_kit:unstick", function(e) {});
        });
    }
    return this;
};
$.fn.initUploader = function() {
    if ($.fn.dmUploader && $('.imageupload').length > 0) {
        $('.imageupload').each(function() {
            let options = {};
            if (typeof _options !== 'undefined') {
                let key = $(this).data('key');
                key = key ? key : 'default';
                if (_options[key]) {
                    $.extend(options, _options[key]);
                }
            }
            let uploaderIns = (new uploader('.imageupload')).init(options);
            $(this).data('uploader', uploaderIns);
        });
    }
    return this;
};
$.fn.initRangeSlider = function() {
    $range = $('input[type="range"]');
    if ($range.length === 0) {
        return this;
    }
    $('.rangeslider').remove();
    if ($.fn.rangeslider) {
        $range.rangeslider('destroy').each(function() {
            var $this = $(this);
            var key = $this.data('key') ? $this.data('key') : 'default';
            var $target = $this.data('target') ? $($this.data('target')) : null;
            var options = {
                polyfill: false,
                rangeClass: 'rangeslider',
                disabledClass: 'rangeslider-disabled',
                horizontalClass: 'rangeslider-horizontal',
                verticalClass: 'rangeslider-vertical',
                fillClass: 'rangeslider-fill',
                handleClass: 'rangeslider-handle',
                onInit: function() {
                    if ($target !== null) {
                        $target.html($this.val());
                    }
                },
                onSlide: function(position, value) {
                    if ($target !== null) {
                        $target.html(value);
                    }
                },
                onSlideEnd: function(position, value) {
                    $this.attr('aria-valuenow', value);
                }
            };
            if (typeof(_rangeSliderOptions) === 'object' && _rangeSliderOptions[key] !== undefined) {
                $.extend(options, _rangeSliderOptions[key]);
            }
            $this.rangeslider(options);
        });
    }
    return this;
};
$.fn.initDatePicker = function() {
    if ($.fn.datepicker && $('.datepicker').length > 0) {
        let options = {
            language: 'zh-CN',
            autoHide: true,
            format: 'yyyy-mm-dd'
        };
        $('.datepicker').each(function() {
            $(this).datepicker(options);
        });
    }
    return this;
};
$.fn.initDoubleRainbowPicker = function() {
    if (typeof(DoubleRainbow) === 'function' && $('.double-rainbow-picker').length > 0) {
        $('.double-rainbow-picker').each(function() {
            new DoubleRainbow(this).init();
        });
    }
    return this;
};
$.fn.initColorPicker = function() {
    let $this = $(this);
    let key = $this.data('key') ? $this.data('key') : 'default';
    let palette = [
        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(153, 153, 153)", "rgb(183, 183, 183)", "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(239, 239, 239)", "rgb(243, 243, 243)", "rgb(255, 255, 255)"],
        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)", "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)", "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)", "rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)", "rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)", "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
    ];
    let options = {
        color: 'black',
        preferredFormat: 'hex',
        showInput: true,
        showPalette: true,
        showAlpha: true,
        showInput: true,
        showButtons: true,
        showSelectionPalette: true,
        hideAfterPaletteSelect: true,
        palette: palette
    };
    if (typeof(_colorPickerOptions) === 'object' && _colorPickerOptions[key] !== undefined) {
        if (key !== 'default') {
            if (_colorPickerOptions['default'] !== undefined) {
                _colorPickerOptions[key] = $.extend({}, _colorPickerOptions['default'], _colorPickerOptions[key]);
            }
        }
        $.extend(options, _colorPickerOptions[key]);
    }
    $this.spectrum(options);
};
$.fn.initColorPickers = function() {
    $('.sp-replacer').remove();
    $('.sp-container').remove();
    if ($.fn.spectrum && $('.color-picker').length > 0) {
        $('.color-picker').each(function() {
            if (!$(this).hasClass('hidden')) {
                $(this).initColorPicker();
            }
        });
    }
    return this;
};
$.fn.initSelect2 = function() {
    if ($.fn.select2 && $('.select2').length > 0) {
        $('.select2').each(function() {
            let $this = $(this);
            var key = $this.data('key') ? $this.data('key') : 'default';
            var options = {
                minimumInputLength: 0
            };
            if (typeof(_select2Options) === 'object' && _select2Options[key] !== undefined) {
                $.extend(options, _select2Options[key]);
            }
            $this.select2(options);
        });
    }
    return this;
};
$.fn.initCodeMirror = function() {
    if (typeof(CodeMirror) !== "undefined") {
        $('.CodeMirror').remove();
        $('.codemirror-control').each(function() {
            var $this = $(this);
            var bindto = $this.data('bindto');
            var copyBindto = $this.data('copyBindto');
            copyBindto = copyBindto === undefined ? '.btn-copy-code' : copyBindto;
            var clearBindto = $this.data('clearBindto');
            clearBindto = clearBindto === undefined ? '.btn-clear-code' : clearBindto;
            var config = {
                theme: "default",
                lineNumbers: true,
                cursorHeight: .85,
                matchBrackets: true,
                autoCloseBrackets: true,
                indentUnit: 4,
                htmlMode: true,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "customergutter"]
            };
            if ($this.data('mode')) {
                $.extend(config, {
                    mode: $this.data('mode')
                });
            }
            if ($this.data('line-numbers') != null) {
                $.extend(config, {
                    lineNumbers: $this.data('line-numbers') == '0' ? false : true
                });
            }
            if ($this.data('gutters') == '0') {
                $.extend(config, {
                    gutters: []
                });
            }
            if ($this.data('disable-enter-key')) {
                $.extend(config, {
                    extraKeys: {
                        'Enter': function() {
                            return false;
                        }
                    }
                });
            }
            if ($this.data('line-wrapping')) {
                $.extend(config, {
                    lineWrapping: true
                });
            }
            if ($this.is('[readonly]')) {
                $.extend(config, {
                    readOnly: 'nocursor'
                });
            }
            var myeditor = CodeMirror.fromTextArea(this, config);
            $this.data('cm-editor', myeditor);
            var changeHandler = $this.data('change-handler');
            myeditor.on('change', function(cm, change) {
                var value = cm.getValue();
                $(copyBindto).prop('disabled', value === '');
                if (changeHandler !== undefined) {
                    $this.val(value).trigger('change');
                }
            });
            if (bindto && $(bindto).length > 0) {
                $(bindto).data('cm-editor', myeditor);
            }
            $(document).off('click', clearBindto).on('click', clearBindto, function() {
                myeditor.setValue("");
                myeditor.clearHistory();
            });
            if (typeof(ClipboardJS) !== 'undefined') {
                new ClipboardJS(copyBindto, {
                    text: function(trigger) {
                        return myeditor.getValue();
                    }
                }).on('success', function(e) {
                    if (e.text === "") {
                        return;
                    }
                    myeditor.execCommand('selectAll');
                    let text = e.trigger.innerHTML;
                    e.trigger.innerHTML = '已复制';
                    setTimeout(function() {
                        e.trigger.innerHTML = text;
                    }, 3000);
                });
            }
        });
    }
    return this;
};
$.fn.initTooltip = function() {
    if (typeof(Tooltip) !== 'undefined' && $('[data-toggle="tooltip"]').length > 0) {
        $('[data-toggle="tooltip"]').each(function() {
            var $this = $(this);
            var options = {
                placement: $this.data('placement') ? $this.data('placement') : 'bottom',
                title: $this.data('title'),
                html: true
            }
            new Tooltip($this, options);
        });
    }
    return this;
};
$.fn.initArticleHeader = function() {
    if ($('.headable').length > 0) {
        var slugs = [];
        $('.headable').find('h1,h2,h3,h4').each(function(index) {
            var $this = $(this);
            var idText = $this.attr('id');
            if (!idText) {
                idText = util.string.slugify($this.text());
                if (idText === '') {
                    idText = 'heading-' + (index + 1);
                }
                if ($.inArray(idText, slugs) !== -1) {
                    idText = idText + '-' + (index + 1);
                }
                slugs.push(idText);
                $this.attr({
                    id: idText
                });
            }
            $this.prepend('<a href="#' + idText + '" class="anchor"><span></span></a>');
        });
    }
    return this;
};
$.fn.codeHighlight = function() {
    Prism.highlightAll();
    return this;
};
$.fn.searchResultHighlight = function() {
    if ($.fn.highlight) {
        let query = $('.query-text').val();
        $('.highlightable').highlight(query);
    }
    return this;
};
$.fn.footerHeight = function() {
    if (document.body.clientHeight < window.innerHeight) {
        $('.page-footer').css({
            'position': 'absolute',
            'bottom': 0,
            'width': '100%'
        });
    } else {
        $('.page-footer').removeAttr('style');
    }
    return this;
};
