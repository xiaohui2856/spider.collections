function Map() {
    var a = 0,
        b = new Object;
    this.put = function (c, d) {
        this.containsKey(c) || a++, b[c] = d
    }, this.get = function (a) {
        return this.containsKey(a) ? b[a] : null
    }, this.getByValue = function (a) {
        for (var c in b)
            if (b[c] == a) return c;
        return null
    }, this.remove = function (c) {
        this.containsKey(c) && delete b[c] && a--
    }, this.containsKey = function (a) {
        return a in b
    }, this.containsValue = function (a) {
        for (var c in b)
            if (b[c] == a) return !0;
        return !1
    }, this.values = function () {
        var c, a = new Array;
        for (c in b) a.push(b[c]);
        return a
    }, this.keys = function () {
        var c, a = new Array;
        for (c in b) a.push(c);
        return a
    }, this.size = function () {
        return a
    }, this.clear = function () {
        a = 0, b = new Object
    }
}
var config, utils, jaq, jdList;
"undefined" == typeof window.JD && (window.JD = {
    version: "1.0.0"
}), "undefined" == typeof config && (config = window.config = {}),
    function (a) {
        a.mainDomain = pageConfig.FN_getDomain(), a.url = {
            item: "//item.jd.com/",
            imgBase: "//img30.360buyimg.com/applylogo/"
        }
    }(config), utils = JD.utils = {
    each: function (a, b, c) {
        var d, e, f;
        if (null != a)
            if (a.length === +a.length) {
                for (d = 0, e = a.length; e > d; d++)
                    if (b.call(c, a[d], d, a) === !1) return !1
            } else
                for (f in a)
                    if (a.hasOwnProperty(f) && b.call(c, a[f], f, a) === !1) return !1
    },
    makeInstance: function (a) {
        var b = new Function;
        return b.prototype = a, a = new b, b.prototype = null, a
    },
    extend: function (a, b, c) {
        if (b)
            for (var d in b) c && a.hasOwnProperty(d) || (a[d] = b[d]);
        return a
    },
    extend2: function (a) {
        var c, d, e, b = arguments;
        for (c = 1; c < b.length; c++) {
            d = b[c];
            for (e in d) a.hasOwnProperty(e) || (a[e] = d[e])
        }
        return a
    },
    inherits: function (a, b) {
        var c = a.prototype,
            d = utils.makeInstance(b.prototype);
        return utils.extend(d, c, !0), a.prototype = d, d.constructor = a
    },
    bind: function (a, b) {
        return function () {
            return a.apply(b, arguments)
        }
    },
    defer: function (a, b, c) {
        var d;
        return function () {
            c && clearTimeout(d), d = setTimeout(a, b)
        }
    },
    indexOf: function (a, b, c) {
        var d = -1;
        return c = this.isNumber(c) ? c : 0, this.each(a, function (a, e) {
            return e >= c && a === b ? (d = e, !1) : void 0
        }), d
    },
    removeItem: function (a, b) {
        for (var c = 0, d = a.length; d > c; c++) a[c] === b && (a.splice(c, 1), c--)
    },
    trim: function (a) {
        return a.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "")
    },
    listToMap: function (a) {
        if (!a) return {};
        a = utils.isArray(a) ? a : a.split(",");
        for (var c, b = 0, d = {}; c = a[b++];) d[c.toUpperCase()] = d[c] = 1;
        return d
    },
    unhtml: function (a, b) {
        return a ? a.replace(b || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp);)?/g, function (a, b) {
            return b ? a : {
                "<": "&lt;",
                "&": "&amp;",
                '"': "&quot;",
                ">": "&gt;",
                "'": "&#39;"
            }[a]
        }) : ""
    },
    html: function (a) {
        return a ? a.replace(/&((g|l|quo)t|amp|#39);/g, function (a) {
            return {
                "&lt;": "<",
                "&amp;": "&",
                "&quot;": '"',
                "&gt;": ">",
                "&#39;": "'"
            }[a]
        }) : ""
    },
    cssStyleToDomStyle: function () {
        var a = document.createElement("div").style,
            b = {
                "float": void 0 != a.cssFloat ? "cssFloat" : void 0 != a.styleFloat ? "styleFloat" : "float"
            };
        return function (a) {
            return b[a] || (b[a] = a.toLowerCase().replace(/-./g, function (a) {
                    return a.charAt(1).toUpperCase()
                }))
        }
    }(),
    loadFile: function () {
        function b(b, c) {
            try {
                for (var e, d = 0; e = a[d++];)
                    if (e.doc === b && e.url == (c.src || c.href)) return e
            } catch (f) {
                return null
            }
        }

        var a = [];
        return function (c, d, e) {
            var g, h, i, f = b(c, d);
            if (f) return f.ready ? e && e() : f.funs.push(e), void 0;
            if (a.push({
                    doc: c,
                    url: d.src || d.href,
                    funs: [e]
                }), !c.body) {
                g = [];
                for (h in d) "tag" != h && g.push(h + '="' + d[h] + '"');
                return c.write("<" + d.tag + " " + g.join(" ") + " ></" + d.tag + ">"), void 0
            }
            if (!d.id || !c.getElementById(d.id)) {
                i = c.createElement(d.tag), delete d.tag;
                for (h in d) i.setAttribute(h, d[h]);
                i.onload = i.onreadystatechange = function () {
                    if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                        if (f = b(c, d), f.funs.length > 0) {
                            f.ready = 1;
                            for (var a; a = f.funs.pop();) a()
                        }
                        i.onload = i.onreadystatechange = null
                    }
                }, i.onerror = function () {
                    throw Error("The load " + (d.href || d.src) + " fails,check the url settings of file umeditor.config.js ")
                }, c.getElementsByTagName("head")[0].appendChild(i)
            }
        }
    }(),
    isEmptyObject: function (a) {
        if (null == a) return !0;
        if (this.isArray(a) || this.isString(a)) return 0 === a.length;
        for (var b in a)
            if (a.hasOwnProperty(b)) return !1;
        return !0
    },
    clone: function (a, b) {
        var c, d;
        b = b || {};
        for (d in a) a.hasOwnProperty(d) && (c = a[d], "object" == typeof c ? (b[d] = utils.isArray(c) ? [] : {}, utils.clone(a[d], b[d])) : b[d] = c);
        return b
    },
    transUnitToPx: function (a) {
        if (!/(pt|cm)/.test(a)) return a;
        var b;
        switch (a.replace(/([\d.]+)(\w+)/, function (c, d, e) {
            a = d, b = e
        }), b) {
            case "cm":
                a = 25 * parseFloat(a);
                break;
            case "pt":
                a = Math.round(96 * parseFloat(a) / 72)
        }
        return a + (a ? "px" : "")
    },
    timestampformat: function (a) {
        return new Date(a).format("MM-dd hh:mm")
    }
}, utils.each(["String", "Function", "Array", "Number", "RegExp", "Object"], function (a) {
    JD.utils["is" + a] = function (b) {
        return Object.prototype.toString.apply(b) == "[object " + a + "]"
    }
}),
    function () {
        var a = JD.JDList = function () {
            var a = this;
            a.pListItem = [], a.mySKUArray1 = [], a.mySKUArray2 = [], a.mySKUArray3 = [], a.mySKUArray4 = [], a.mySPUMap1 = new Map, a.mySPUMap2 = new Map, a.slaveWareMap = new Map, a.daogouMap = new Map, a.brandAllFlag = !1, a.pubAllFlag = !1, a.area = [], a.yushouTimerList = [], a.guanggaoList = [], a.baseConf = baseConf || {}, a.price_pdos_off = baseConf.price_pdos_off || !1, a.isDjd = params.isdjd || !1, a.gjz = params.gjz || "", a.isLogo = params.isLogo || !1, a.thirdCatId = params.thirdCatId, a.isSpuRepalce = 0, a.sortRfidMap = {
                798: "3100",
                870: "3101",
                878: "3102",
                880: "3103",
                823: "3104",
                965: "3105",
                1199: "3106",
                1300: "3107",
                1706: "3108",
                1301: "3109",
                1707: "3110",
                877: "3111",
                1013: "3112"
            }
        };
        a.prototype = {
            init: function () {
                this.getCookieArea(), this.initSearchReslut(), this.getItemSku(), this.initBrand(), this.initExpands(), this.initHotsale(), this.loadWLjs(), this.addlsitCK(), this.baseConf.listPV && this.countPV(), this.initGG(), pageConfig.price_pdos_off = this.price_pdos_off, this.initDaogou()
            },
            wait: function () {
                var a = this.mySKUArray1,
                    b = this.mySKUArray2,
                    c = this.mySKUArray3,
                    d = this.mySKUArray4;
                this.limitDJD(), this.payAfter(), this.baseConf.kucun && (this.get_stock(a), this.get_stock(b), this.get_stock(c), this.get_stock(d)), this.baseConf.chuxiaobq && (this.initPromotionTag(a), this.initPromotionTag(b), this.initPromotionTag(c), this.initPromotionTag(d)), this.baseConf.guanggaoc && (this.initAdWords(a), this.initAdWords(b), this.initAdWords(c), this.initAdWords(d)), this.baseConf.yushou && this.initYuShouData(), this.baseConf.googletag && this.initGoogletagmanager(), this.liveShopOnclick(), this.hideEmptyBrandLetter(), this.showGGItem(), params.spuHover && this.loadSlaveWare()
            },
            initMaodian: function () {
                window.location.hash = "#J_searchWrap"
            },
            addlsitCK: function () {
                var b, c, a = params.pageNo || "1";
                10 >= a && (b = params.listck || "", c = new Date, c.setTime(c.getTime() + 2592e6), document.cookie = "listck=" + b + ";expires=" + c.toGMTString() + ";path=/;domain=" + document.location.host)
            },
            getCookieArea: function () {
                var a = document.cookie.match(/(^| )ipLoc-djd=([^;]*)(;|$)/);
                this.area = a && a.length > 2 && "" != a[2] ? a[2].split(/\,|\-/) : params.area.split(/\,|\-/)
            },
            loadWLjs: function () {
                var a = this,
                    b = "//wl.jd.com/wl.js";
                "0" == this.gjz && (b = "//wl.jd.com/joya.js", jaq.push(["account", "JA2015_111140"]), jaq.push(["domain", "jd.hk"])), seajs.use(b, function () {
                    a.baseConf.maidian && (a.setJLSKU(), a.setLogJL())
                })
            },
            countPV: function () {
                var a = window.location.href.replace(/(^|\\?|&)go=([^&#]*)/g, ""),
                    b = {
                        md: "9",
                        l: "jdlist",
                        go: "0"
                    };
                $.ajax({
                    url: a,
                    data: b,
                    cache: !0,
                    dataType: "jsonp",
                    success: function (a) {
                    }
                })
            },
            getItemSku: function () {
                var a, b, c, d, e;
                this.pListItem = $("#plist").find(".j-sku-item"), a = [], b = [], c = [], d = [], e = new Map, this.pListItem.each(function (f) {
                    var h, g = $(this).attr("data-sku");
                    $(this).attr("data-sku_temp", g), 30 > f ? a.push(g) : f >= 30 && 60 > f ? b.push(g) : f >= 60 && 180 > f ? c.push(g) : d.push(g), h = $(this).attr("venderid"), h && "0" != h && e.put(g, "")
                }), this.mySKUArray1 = a, this.mySKUArray2 = b, this.mySKUArray3 = c, this.mySKUArray4 = d, this.initPriceLimit(a), this.initPriceLimit(b), this.initPriceLimit(c), this.initPriceLimit(d), !params.thirdCatId || "798" != params.thirdCatId && "870" != params.thirdCatId && "878" != params.thirdCatId && "880" != params.thirdCatId || (this.initZhiShu(a), this.initZhiShu(b), this.initZhiShu(c), this.initZhiShu(d)), this.initSpuItem(), params.listaos && "P" == this.abtest10() && this.initaosItem(), params.istsyx ? (params.plist && "1" === params.plist && (this.getEBOOKBySKU_BOOK(a), this.getEBOOKBySKU_BOOK(b), this.getEBOOKBySKU_BOOK(c), this.getEBOOKBySKU_BOOK(d)), this.baseConf.dianpu && e.size() > 0 && this.getDianPuInfoBySKU_BOOK(e.keys())) : this.baseConf.dianpu && e.size() > 0 && (this.getDianPuInfoBySKU(a), this.getDianPuInfoBySKU(b), this.getDianPuInfoBySKU(c), this.getDianPuInfoBySKU(d)), this.bindWLByItem()
            },
            bindWLByItem: function () {
                var b, c, d, e, f, a = this.pListItem;
                for (b = 0, c = a.length; c > b; b++) d = a.eq(b), e = d.attr("data-sku"), f = d.attr("data-i"), f || d.attr("data-i", b + 1);
                $("#plist").delegate(".j-sku-item", "click", function (a) {
                    var b = params.abTestFlag,
                        c = params.pageNo,
                        d = params.thirdCatId,
                        e = document.referrer,
                        f = $(this).attr("data-sku"),
                        g = $(this).attr("data-i"),
                        h = $(a.target),
                        i = h.parents();
                    i.is(".p-img") ? log("search", "list", e, d, "5", f, "1", g, c, 0, b) : i.is(".p-name") ? log("search", "list", e, d, "5", f, "2", g, c, 0, b) : i.is(".p-commit") ? log("search", "list", e, d, "5", f, "3", g, c, 0, b) : h.is(".addcart") ? log("search", "list", e, d, "5", f, "4", g, c, 0, b) : h.is(".J_focus") ? log("search", "list", e, d, "5", f, "5", g, c, 0, b) : h.is(".J_contrast") && log("search", "list", e, d, "5", f, "6", g, c, 0, b)
                }), $("#hotsale").delegate("dl", "click", function (a) {
                    var i, b = params.abTestFlag,
                        c = params.thirdCatId,
                        d = document.referrer,
                        f = $(a.target),
                        g = f.parents();
                    $(this).find(".p-price").attr("sku"), i = $(this).index() + 1, g.is(".p-name") ? log("search", "list", d, c, "8", "1", e, "1", i, b) : g.is(".btns") ? log("search", "list", d, c, "8", "1", e, "7", i, b) : g.is("dt") && log("search", "list", d, c, "8", "1", e, "2", i, b)
                }), $("#market").delegate("li", "click", function (a) {
                    var g, h, i, b = params.abTestFlag,
                        c = params.thirdCatId,
                        d = document.referrer,
                        e = $(a.target);
                    e.parents(), g = $(this).find("a"), h = g.attr("href"), i = "1", e.is("img") && (i = "2"), log("search", "list", d, c, "2", i, h, b)
                }), $("#b_xstj").delegate("li", "click", function (a) {
                    var b = params.abTestFlag,
                        c = params.thirdCatId,
                        d = document.referrer,
                        e = $(a.target),
                        f = e.parents();
                    f.is(".p-img") ? log("search", "list", d, c, "13", "1", "", "1", "", b) : e.is(".p-name") ? log("search", "list", d, c, "13", "1", "", "1", "", b) : f.is(".extra") && log("search", "list", d, c, "13", "1", "", "1", "", b)
                }), $("#b_zbhs").delegate("li", "click", function (a) {
                    var b = params.abTestFlag,
                        c = params.thirdCatId,
                        d = document.referrer,
                        e = $(a.target),
                        f = e.parents();
                    f.is(".p-img") ? log("search", "list", d, c, "13", "2", "", "1", "", b) : e.is(".p-name") ? log("search", "list", d, c, "13", "2", "", "1", "", b) : f.is(".extra") && log("search", "list", d, c, "13", "2", "", "1", "", b)
                })
            },
            initHotsale: function () {
                var b, c, d, e, f, g, h, i, j, k, l, m;
                if (this.isDjd) {
                    if (b = this.area[0], c = "//d.jd.com/vclist/getvclist.action", d = this.thirdCatId || "798", e = this.sortRfidMap[d], f = $("#hotsale").find("div[class='mc list-h']"), g = f.attr("rfid"), g = e ? e : g, !g) return;
                    h = '[{"size":3,"sizeNation":2,"provinecId":' + b + ',"rfid":' + g + ',"categoryId":' + d + ',"compare":1}]', i = e ? {
                        jsonStr: encodeURIComponent(h),
                        key: b + "-" + g,
                        resource: "new"
                    } : {
                        jsonStr: encodeURIComponent(h),
                        key: b + "-" + g
                    }, $.ajax({
                        url: c,
                        data: i,
                        cache: !0,
                        dataType: "jsonp",
                        success: function (a) {
                            var b, c, d, e, h, i, j, k, l;
                            if (a && (b = [], c = [], a && a[g] && a[g].length >= 3)) {
                                for (d = 0, e = a[g].length > 3 ? 3 : a[g].length, h = null, d = 0; e > d; d++) h = a[g][d], i = h.wid, j = h.imgurl ? h.imgurl : h.prouductUrl, k = "//img1" + i % 5 + ".360buyimg.com/n4/" + j, l = '<dl><dt><a href="//item.jd.com/' + i + '.html" target="_blank">' + '<img height="100" width="100" alt="' + h.title + '"' + 'src="' + k + '"></a></dt>' + '<dd><div class="p-name"><a href="//item.jd.com/' + i + '.html" target="_blank">' + h.title + '<font color="#ff6600">' + (h.wareTitle ? h.wareTitle : "") + "</font></a></div>" + '<div class="p-price" newsku="' + i + '"><strong></strong></div><div class="btns"><a href="' + "//gate.jd.com/InitCart.aspx?pid=" + i + '&pcount=1&ptype=1" target="_blank">' + "立即抢购</a></div></dd></dl>", c.push(i), b.push(l);
                                if (b.length > 0 && c.length > 0) {
                                    if (f.html(b.join("")), !c || c.length < 1) return;
                                    seajs.use(["product/list/1.0.4/js/tools"], function (a) {
                                        a.getPrice(c, this.price_pdos_off, function (a) {
                                            if (a)
                                                for (var b = 0, c = a.length; c > b; b++) a[b] && new Number(a[b].p) > 0 ? $("#hotsale .p-price[newsku='" + a[b].id.replace("J_", "") + "']").find("strong").html("￥" + a[b].p) : $("#hotsale .p-price[newsku='" + a[b].id.replace("J_", "") + "']").find("strong").html("暂无报价")
                                        })
                                    })
                                }
                            }
                        }
                    })
                }
                for (j = [], k = $("#hotsale .p-price"), l = 0, m = k.length; m > l; l++) skuId = k.eq(l).attr("sku"), skuId && j.push(skuId);
                j.length > 0 && seajs.use(["product/list/1.0.4/js/tools"], function (a) {
                    a.getPrice(j, this.price_pdos_off, function (a) {
                        var b, c, d, e;
                        if (a)
                            for (b = 0, c = a.length; c > b; b++) d = a[b].id.replace("J_", ""), e = a[b].p, e > 0 ? $("#hotsale .p-price[sku='" + d + "']").children("strong").html("￥" + e) : $("#hotsale .p-price[sku='" + d + "']").children("strong").html("暂无报价")
                    })
                })
            },
            initBrand: function () {
            },
            getDianPuInfoBySKU: function (a) {
                var b = this;
                a.length > 0 && $.ajax({
                    url: "//chat1.jd.com/api/checkChat?my=list&pidList=" + a.join(","),
                    dataType: "jsonp",
                    success: function (a) {
                        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v;
                        if (!a && !a.length) return !1;
                        for (c = new Map, d = 0; d < a.length; d++)
                            e = a[d], f = e.pid, c.put(f, e);
                        for (g = b.pListItem, d = 0, h = g.length; h > d; d++)
                            i = g.eq(d), j = i.attr("venderid"), k = i.attr("jdzy_shop_id"),
                                f = i.attr("data-sku"), j && "0" != k && (l = c.get(f),
                            l && (m = "", f >= 1e9 && 2e9 >= f || f >= 10000000001 && 99999999999 >= f || "0" == k ||
                            (m = '<em class="u-jd">京东自营</em>'), n = $(".p-shop", i), o = n.attr("data-shop_name"),
                            o || (o = l.seller || ""), k && "0" != k || (k = l.shopId), p = "", "0" != k ?
                                (q = o, q.length > 9 ? q = q.substr(0, 9) + "..." : q += "  ",
                                    p = '<a href="//mall.jd.com/index-' + k + '.html" target="_blank" title="' + o + '">' + q + "</a>") :
                                p = "", r = "", s = "im-01", t = "联系第三方卖家进行咨询", u = l.code,
                                "2" == u ? (s = "im-offline", t = "未开通IM") : "3" == u && (s = "im-offline",
                                    t = "第三方卖家客服不在线，可留言"), "" != m && (s = "im-02", t = "联系供应商进行咨询", "3" == u && (s = "im-offline",
                                t = "供应商客服不在线，可留言")), "0" != u && (r = '<em class="' + s + '" title="' + t + '" data-shopid="' + k + '" venderid="' + j + '"></em>'),
                                v = "<span >" + p + m + r + "</span>", n.empty(), n.append(v)))
                    }
                })
            },
            getDianPuInfoBySKU_BOOK: function (a) {
                var b = this;
                a.length > 0 && $.ajax({
                    url: "//chat1.jd.com/api/checkChat?my=book&pidList=" + a.join(","),
                    dataType: "jsonp",
                    success: function (a) {
                        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r;
                        if (!a && !a.length) return !1;
                        for (c = new Map, d = 0; d < a.length; d++) e = a[d], f = e.pid, c.put(f, e);
                        for (g = b.pListItem, d = 0, h = g.length; h > d; d++)
                            i = g.eq(d), j = i.attr("venderid"), k = i.attr("jdzy_shop_id"),
                                f = i.attr("data-sku"), j && (l = c.get(f), l &&
                            (m = l.shopId, m &&
                            (n = l.seller, o = "//mall.jd.com/index-" + m + ".html", p = n, params.plist && "2" ===
                            params.plist && (n = n.substr(0, 9)), q = "", (f >= 10000001 && 30000001 >= f ||
                            f >= 110000000001 && 150000000001 >= f) && "0" != k && (q = '<em class="u-jd">京东自营</em>'),
                                r = $(".p-shopnum", i), r.empty(), r.prepend('<a class="curr-shop" href="' + o +
                                '" target="_blank" title="' + p + '">' + n + "</a>" + q))))
                    }
                })
            },
            getEBOOKBySKU_BOOK: function (a) {
                var b = this;
                a.length > 0 && $.ajax({
                    url: "//gw-e.jd.com/forBookCode/forBookCode_getBathEbookIdForJs.action?my=ebook&bookCode=" + a.join(","),
                    dataType: "jsonp",
                    success: function (a) {
                        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q;
                        if (!a && !a.length) return !1;
                        if ("0" == a.code) return !1;
                        for (c = new Map, d = a.info, e = [], f = 0; f < d.length; f++) g = d[f], h = g.bookCode, i = g.yn || 0, 1 == i && (c.put(h, g), e.push(g.ebookId));
                        for (j = b.pListItem, k = 0, l = j.length; l > k; k++) m = j.eq(k), h = m.attr("data-sku"), n = c.get(h), n && (o = n.ebookId, m.attr("data-sku-e", o), p = $(".p-operate", m), q = '<a class="p-o-btn ebookbuy" target="_blank" href="//item.jd.com/' + o + '.html"><i></i>电子书<em class="J_price_ebook"></em></a>', p.append(q));
                        b.initPriceLimit_ebook(e)
                    }
                })
            },
            initPriceLimit_ebook: function (a) {
                var b = this;
                !a || a.length < 1 || seajs.use(["product/list/1.0.4/js/tools"], function (c) {
                    c.getPrice(a, this.price_pdos_off, function (a) {
                        var c, d, e, f, g, h, i, j, k, m, n;
                        if (a) {
                            for (c = new Map, f = 0; f < a.length; f++) {
                                if (!a[f].id) return !1;
                                d = a[f].id.replace("J_", ""), c.put(d, a[f])
                            }
                            for (e = b.pListItem, f = 0, g = e.length; g > f; f++) h = e.eq(f), i = h.attr("data-sku-e"), j = c.get(i), j && (k = j.p, j.m, m = "", m = k > 0 ? "¥" + k : 0 == k ? "免费" : "暂无报价", n = $(".J_price_ebook", h), n.html(m))
                        }
                    })
                })
            },
            getDianPuInfo: function (a) {
                var b = this;
                a.length > 0 && $.ajax({
                    url: "//chat1.jd.com/api/checkChat?venderList=" + a.join(","),
                    dataType: "jsonp",
                    success: function (a) {
                        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q;
                        if (!a && !a.length) return !1;
                        for (c = new Map, d = 0; d < a.length; d++) e = a[d], f = e.venderId, c.put(f, e);
                        for (g = b.pListItem, d = 0, h = g.length; h > d; d++)
                            i = g.eq(d), f = i.attr("venderid"), f && (j = c.get(f), j
                            && (k = "online", l = "联系客服", "2" == j.code ? (k = "offline", l = "未开通IM") :
                            "3" == j.code && (k = "offline", l = "客服留言"), m = "", n = i.attr("jdzy_shop_id"),
                                o = i.attr("data-sku"), 10 != o.length && "0" != n && (m = '<em class="u-jd">京东自营</em>'),
                                p = '<span><a href="//mall.jd.com/index-' + j.shopId + '.html" target="_blank" title="' + j.seller +
                                    '">' + j.seller + "</a>" + m + '<i class="' + k + '" title="' + l + '" data-shopid="' + j.shopId + '"' +
                                    ' venderid="' + j.venderId + '"></i></span>', q = $(".p-shop", i), q.append(p)))
                    }
                })
            },
            liveShopOnclick: function () {
                $("#plist").delegate("div.p-shop span em[data-shopid]", "click", function () {
                    var c, d, b = $(this).attr("data-shopid");
                    if (b) {
                        if (c = $(this).parent().parent().parent().attr("data-sku") || $(this).parent().parent().parent().parent().attr("data-sku") || "0", "0" == c) return;
                        d = {
                            pid: c,
                            stock: encodeURIComponent($("#store-selector").find(".text").text() + "(" + $(this).parent().parent().siblings(".p-stock").html() + ")") || "",
                            score: 5,
                            commentNum: $(this).parent().parent().siblings(".p-commit").find("a").html() || "",
                            advertiseWord: encodeURIComponent($(this).parent().parent().siblings(".p-name").find("i.promo-words").html()) || "",
                            verderId: $(this).attr("venderid"),
                            entry: "jd_list",
                            area: encodeURIComponent($("#store-selector .text").text()) || ""
                        }, open("//chat.jd.com/index.action?" + $.param(d), c, "status=no,toolbar=no,menubar=no,location=no,titlebar=no,resizable=yes,width=1018px,height=590")
                    }
                })
            },
            initPriceLimit: function (a) {
                var b = this;
                !a || a.length < 1 || seajs.use(["product/list/1.0.4/js/tools"], function (c) {
                    c.getPrice(a, this.price_pdos_off, function (a) {
                        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q;
                        if (a) {
                            for (c = new Map, f = 0; f < a.length; f++) {
                                if (!a[f].id) return !1;
                                d = a[f].id.replace("J_", ""), c.put(d, a[f])
                            }
                            for (e = b.pListItem, f = 0, g = e.length; g > f; f++) h = e.eq(f), i = h.attr("data-sku"), j = c.get(i), j && (k = j.p, l = j.m, m = "", m = k > 0 ? "<em>¥</em><i>" + k + "</i>" : "<i>暂无报价</i>", n = $(".J_price", h), n.html(m), params.istsyx && "6929" != params.secondCatId && "4855" != params.secondCatId && (o = Math.ceil(100 * parseFloat(k / l).toFixed(15)), p = parseFloat(o / 10), .1 > p && (p = .1), q = $(".p-market", h), q.html("<del>￥" + l + '</del><em class="p-discount">' + p + "折</em>")))
                        }
                    })
                })
            },
            initPrice: function (a) {
                var c, d, e, b = this;
                !a || a.length < 1 || (c = "//p.3.cn/prices/mgets?", d = this.area.join("_"), e = {
                    my: "list_price",
                    type: "1",
                    area: d,
                    skuIds: "J_" + a.join(",J_")
                }, $.ajax({
                    url: c,
                    data: e,
                    cache: !0,
                    dataType: "jsonp",
                    success: function (a) {
                        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q;
                        if (a) {
                            for (c = new Map, f = 0; f < a.length; f++) {
                                if (!a[f].id) return !1;
                                d = a[f].id.replace("J_", ""), c.put(d, a[f])
                            }
                            for (e = b.pListItem, f = 0, g = e.length; g > f; f++) h = e.eq(f), i = h.attr("data-sku"), j = c.get(i), j && (k = j.p, l = j.m, m = "", m = k > 0 ? "<em>¥</em><i>" + k + "</i>" : "<i>暂无报价</i>", n = $(".J_price", h), n.html(m), params.istsyx && "6929" != params.secondCatId && "4855" != params.secondCatId && (o = Math.ceil(100 * parseFloat(k / l).toFixed(15)), p = parseFloat(o / 10), .1 > p && (p = .1), q = $(".p-market", h), q.html("<del>￥" + l + '</del><em class="p-discount">' + p + "折</em>")))
                        }
                    }
                }))
            },
            initZhiShu: function (a) {
                var c, e, b = this;
                !a || a.length < 1 || (c = "//c.3.cn/product/tag?", this.area.join("_"), e = {
                    my: "list_zhishu",
                    skuIds: a.join(",")
                }, $.ajax({
                    url: c,
                    data: e,
                    cache: !0,
                    dataType: "jsonp",
                    success: function (a) {
                        var c, d, e, f, g, h, i, j, k, l, m;
                        if (a) {
                            c = new Map;
                            for (d in a) utils.isEmptyObject(a[d]) || c.put(d, a[d]);
                            for (e = b.pListItem, f = 0, g = e.length; g > f; f++) h = e.eq(f), i = h.attr("data-sku"), j = c.get(i), j && (k = "", l = j.name, l && (k = '<span class="buy-score" title="京东与第三方合作对商品性能、安全性、外观等进行综合评估得出选购指数">选购指数<em>' + l + "</em></span>", m = $(".p-commit", h), m.prepend(k)))
                        }
                    }
                }))
            },
            initZhiShu_slave: function (a) {
                var c, e, b = this;
                !a || a.length < 1 || (c = "//c.3.cn/product/tag?", this.area.join("_"), e = {
                    my: "list_zhishu",
                    skuIds: a.join(",")
                }, $.ajax({
                    url: c,
                    data: e,
                    cache: !0,
                    dataType: "jsonp",
                    success: function (a) {
                        var c, d, e;
                        if (a)
                            for (c in a) utils.isEmptyObject(a[c]) || (d = a[c], e = b.slaveWareMap.get(c), e && (e.zhishu = d["name"]))
                    }
                }))
            },
            payAfter: function () {
                var a, b, c, d, e, f, g, h, i, j;
                if (!("undefined" == typeof pay_after || pay_after.length < 1 || "0" == this.gjz)) {
                    a = new Map;
                    for (b in pay_after) a.put(pay_after[b], b);
                    for (c = this.pListItem, d = 0, e = c.length; e > d; d++) f = c.eq(d), g = f.attr("data-sku"), h = a.get(g), h && (i = '<i class="goods-icons-s1" title="该商品支持货到付款">货到付款</i>', j = $(".J-pro-icons", f), j.append(i))
                }
            },
            limitDJD: function () {
                var a, b, c, d, e, f, g, h, i;
                if (!("undefined" == typeof limit_ids || limit_ids.length < 1 || "0" == this.gjz)) {
                    a = new Map;
                    for (b in limit_ids) a.put(limit_ids[b], b);
                    for (c = this.pListItem, d = 0, e = c.length; e > d; d++) f = c.eq(d), g = f.attr("data-sku"), h = a.get(g), h && (f.attr("selfservice", "3"), i = $(".p-stock", f), i.attr("limit", "1"))
                }
            },
            initPromotionTag: function (a) {
                var c, d, e, b = this;
                !a || a.length < 1 || (c = "//pf.3.cn/flags/mgets?", d = this.area.join("_"), e = {
                    my: "list_pro_tag",
                    area: d,
                    skuids: "J_" + a.join(",J_")
                }, $.ajax({
                    url: c,
                    data: e,
                    cache: !0,
                    dataType: "jsonp",
                    success: function (a) {
                        var c, d, e, f, g, h, i, j, k, l, m, n;
                        if (a) {
                            for (c = new Map, f = 0; f < a.length; f++) d = a[f].pid, d && c.put(d, a[f].pf);
                            for (e = b.pListItem, f = 0, g = e.length; g > f; f++)
                                if (h = e.eq(f), i = h.attr("data-sku"), j = c.get(i)) {
                                    for (k = [], l = 0; l < j.length; l++) switch (j[l]) {
                                        case 22:
                                            k.push('<i class="icons" title="使用京豆可享受优惠">优惠购</i>');
                                            break;
                                        case 11:
                                            k.push('<i class="icons" title="指定级别会员可享受优惠">特价</i>');
                                            break;
                                        case 1:
                                            k.push('<i class="goods-icons" title="本商品正在降价销售中">直降</i>');
                                            break;
                                        case 5:
                                            k.push('<i class="icons" title="购买本商品送赠品">赠品</i>');
                                            break;
                                        case 3:
                                            k.push('<i class="icons" title="购买本商品返优惠券">返券</i>');
                                            break;
                                        case 4:
                                            k.push('<i class="icons" title="购买本商品送京豆">送京豆</i>')
                                    }
                                    k.length > 0 && (m = $(".J-pro-icons", h), n = k.join(""), m.append(n))
                                }
                        }
                    }
                }))
            },
            strip_tags: function (a, b) {
                b = (((b || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
                var c = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
                    d = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
                return a.replace(d, "").replace(c, function (a, c) {
                    return b.indexOf("<" + c.toLowerCase() + ">") > -1 ? a : ""
                })
            },
            initAdWords: function (a) {
                var c, d, b = this;
                !a || a.length < 1 || (c = "//ad.3.cn/ads/mgets?", d = {
                    my: "list_adWords",
                    skuids: "AD_" + a.join(",AD_")
                }, $.ajax({
                    url: c,
                    data: d,
                    cache: !0,
                    dataType: "jsonp",
                    success: function (a) {
                        var c, d, e, f, g, h, i, j, k, l, m, n;
                        if (a) {
                            for (c = new Map, g = 0; g < a.length; g++) d = a[g].id.replace("AD_", ""), d && (e = b.strip_tags(a[g].ad), c.put(d, e));
                            for (f = b.pListItem, g = 0, h = f.length; h > g; g++) i = f.eq(g), j = i.attr("data-sku"), k = c.get(j), k && (l = $(".p-img img", i), l.attr("title", k), m = $(".p-name a", i), m.eq(0).attr("title", k), n = $(".promo-words", i), n.html(k))
                        }
                    }
                }))
            },
            initYuShouData: function () {
                var c, d, e, a = this,
                    b = [];
                if ($("#plist .j-sku-item[selfservice=2]").each(function () {
                        b.push($(this).attr("data-sku"))
                    }), b.length > 0)
                    for (c = 0; c < b.length; c++) d = b[c], e = "//yushou.jd.com/yushoulistinfo.action?sku=" + d, d && "" != d && $.ajax({
                        url: e,
                        data: "",
                        cache: !0,
                        dataType: "jsonp",
                        success: function (b) {
                            b && a.yushouCallback(b)
                        }
                    })
            },
            yushouCallback: function (a) {
                var b, c, d, e, f, g, h, j, k;
                if (2 == a.type && (b = a.ret, c = b.w, d = $("#plist .j-sku-item[data-sku=" + c + "]"), this.yushouTimerList.push({
                        w: c,
                        d: b.d,
                        s: b.s
                    }), 0 == b.s ? d.find(".p-name").prepend('<div class="p-presell-time"><i></i><span>预售中</span><em>' + this.convertSecond2Date(a.ret.d) + "后开始</em></div>") : d.find(".p-name").prepend('<div class="p-presell-time"><i></i><span>预售中</span><em>剩余' + this.convertSecond2Date(a.ret.d) + "</em></div>"), b.cp && d.find(".p-price").find("strong").html("￥" + b.cp), d.find(".p-stock").removeClass("p-stock").html(""), 2 == b.t)) {
                    for (e = '<div class="p-presell-stage clearfix">', f = 0; f < b.sa.length; f++) g = b.sa[f], h = "timeout", j = "", f == b.cs - 1 && (h = " curr", d.find(".p-price strong").after('<em class="hoverd">(已有' + b.cc + "人预订)</em>")), e += '<span class="item  ' + h + '"><a href="javascript:void(0)"><em>满' + g.c + "人</em>" + j + "<strong>￥" + g.m + '</strong></a><i class="bottom"><em></em></i></span>';
                    e += "</div>", $(e).insertAfter(d.find(".p-price")), k = $("a.addcart", d), k.attr({
                        href: "//item.jd.com/" + c + ".html",
                        "class": "p-o-btn addcart"
                    }).html("<i></i>参与抢购")
                }
            },
            formatStr: function (a, b) {
                var a = "000000000" + a;
                return a.substring(a.length, a.length - b)
            },
            convertSecond2Date: function (a) {
                var b = 60,
                    c = 60 * b,
                    d = 24 * c,
                    e = Math.floor(a / d),
                    f = Math.floor((a - e * d) / c),
                    g = this.formatStr(Math.floor((a - e * d - f * c) / b), 2),
                    h = this.formatStr(Math.floor(a - e * d - f * c - g * b), 2);
                return 0 == e ? f + ":" + g + ":" + h : e + "天 " + f + ":" + g + ":" + h
            },
            showYushouTime: function () {
                var b, c, d, a = this.yushouTimerList;
                for (b = 0; b < a.length; b++) {
                    if (c = a[b], c.d--, c.t < 0) return;
                    d = $("#plist .j-sku-item[data-sku=" + c.w + "]"), d.find(".p-presell-time").length < 1 && d.find(".p-name").prepend('<div class="p-presell-time"></div>'), 0 == c.s ? d.find(".p-presell-time").html("<i></i><span>预售中</span><em>" + this.convertSecond2Date(c.d) + "后开始</em>") : d.find(".p-presell-time").html("<i></i><span>预售中</span><em>剩余" + this.convertSecond2Date(c.d) + "</em>")
                }
            },
            getBrandsAll: function () {
                var b, c, a = this;
                !a.brandAllFlag && params.brandsLen > 18 && (b = baseURL || "", c = window.location.pathname + "?" + b + "&md=1", $.ajax({
                    url: c,
                    data: {
                        my: "list_brand"
                    },
                    cache: !0,
                    dataType: "json",
                    success: function (b) {
                        b && a.buildBrands(b)
                    }
                }))
            },
            getPubsAll: function () {
                var b, c, a = this;
                !a.pubAllFlag && params.pubsLen > 18 && (b = baseURL || "", c = window.location.pathname + "?" + b + "&md=2", $.ajax({
                    url: c,
                    data: {
                        my: "list_pub"
                    },
                    cache: !0,
                    dataType: "json",
                    success: function (b) {
                        b && a.buildPubs(b)
                    }
                }))
            },
            hideEmptyBrandLetter: function () {
                $(".s-brand .J_brandLetter li[data-initial]:not(:first)").each(function () {
                    var a = $(this).attr("data-initial");
                    0 == $(".s-brand  ul.J_valueList li[data-initial=" + a + "]").length ? $(this).hide() : $(this).attr("style", "display: ")
                })
            },
            buildPubs: function (a) {
                var d, e, f, g, h, i, b = a.pubs,
                    c = [];
                for (d = 0; d < b.length; d++) d >= 18 && (e = b[d], f = e.id, g = e.name, h = e.pinyin || "", i = this.getExpandsUrl("publishers", f) + "&JL=3_出版社_" + g, c.push('<li id="pub-'), c.push(f), c.push('" data-initial="'), c.push(h.toLowerCase()), c.push('">'), c.push('<a href="'), c.push(i), c.push('" title="'), c.push(g), c.push('" rel="nofollow">'), c.push("<i></i>"), c.push(g), c.push("</a>"), c.push("</li>"));
                $("#pubsArea").append(c.join("")), this.pubAllFlag = !0, pageConfig.setBrandWordsTab(), this.hideEmptyBrandLetter()
            },
            buildBrands: function (a) {
                var d, e, f, g, h, i, j, b = a.brands,
                    c = [];
                for (d = 0; d < b.length; d++) d >= 18 && (e = b[d], f = e.id, g = e.name, h = e.pinyin || "", i = e.logo || "", j = this.getExpandsUrl("brand", f) + "&JL=3_品牌_" + g, c.push('<li id="brand-'), c.push(f), c.push('" data-initial="'), c.push(h.toLowerCase()), c.push('">'), c.push('<a href="'), c.push(j), c.push('" title="'), c.push(g), c.push('" rel="nofollow">'), c.push("<i></i>"), this.isLogo && "" != i && (c.push('<img src="'), c.push(i), c.push('" width="102" height="36" data-lazy-img="done" class="loading-style2">')), c.push(g), c.push("</a>"), c.push("</li>"));
                $("#brandsArea").append(c.join("")), this.brandAllFlag = !0, pageConfig.setBrandWordsTab(), this.hideEmptyBrandLetter()
            },
            getAttrValue: function (a, b) {
                var c = new RegExp("(^|\\?|&)" + a + "=([^&#]*)(\\s|&|$)", "i"),
                    d = "";
                return c.test(b) && (d = c.exec(b), d = d[2]), d
            },
            getExpandsUrl: function (a, b) {
                var f, c = baseURL || "",
                    d = this.getAttrValue("ev", c),
                    e = [];
                return d && (e = d.split(/\%40|\@/)), "ext" == a ? e.push(b.extid + "_" + b.extValueId) : "brand" == a ? e.push("exbrand_" + b) : e.push("expublishers_" + b), f = window.location.pathname + "?" + c.replace(/(^|\\?|&)ev=([^&#]*)/g, ""), f + "&ev=" + e.join("@")
            },
            abtest10: function () {
                var c, d, a = "A",
                    b = readCookie("__jda");
                if (b && (c = b.split("."), c.length >= 2)) switch (d = c[1] % 2) {
                    case 0:
                        a = "P";
                        break;
                    case 1:
                        a = "L"
                }
                return params.abTestFlag = a, a
            },
            initGG: function () {
                var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
                if ("undefined" != typeof baseURL && params.show_ad && params.ad_set && 1 == params.pageNo) {
                    a = baseURL || "", b = this.getAttrValue("ev", a), c = [], d = [], e = !1, f = !1, b ? c = b.split(/\%40|\@/) : e = !0;
                    for (g in c) h = c[g].split(/\%5F|\_/), "exbrand" == h[0] ? (e = !0, d.push("exbrandid_" + decodeURIComponent(h[1]))) : "exprice" == h[0] ? (i = h[1].replace("M", ""), j = i.split("L"), k = "", k = j.length > 1 ? j[0] + "-" + j[1] : j[0] + "gt", d.push("exprice_" + k), e = !0) : (d.push(h[0] + "_" + h[1]), e = !0);
                    f && (e = !1), l = $(".selector-set a"), l.length > 0 && l.each(function () {
                        var a = $(this).find("b").text(),
                            b = $.trim($(this).find("em").text());
                        a.indexOf("颜色") > -1 && (d.push("excolor_" + b), e = !0), (a.indexOf("尺码") > -1 || a.indexOf("尺寸") > -1) && (d.push("exsize_" + b), e = !0)
                    }), m = this.getAttrValue("sort", a), ("sort_totalsales15_desc" == m || "sort_dredisprice_desc" == m || "sort_dredisprice_asc" == m || "sort_commentcount_desc" == m || "sort_winsdate_desc" == m) && (e = !1), "" == m && (e = !1), params.multipleSort_view && (e = !0), params.multipleSort_view || "sort_totalsales15_desc" != m && "" != m || "P" != this.abtest10() || (e = !0), n = this.getAttrValue("delivery", a), "1" == n && (e = !1), o = this.getAttrValue("delivery_daofu", a), "3" == o && (e = !1), p = this.getAttrValue("stock", a), "1" == p && (e = !1), q = this.getAttrValue("icon", a), "" != q && (e = !1), r = this.getAttrValue("icon3", a), "" != r && (e = !1), s = this.getAttrValue("e", a), "" != s && (e = !1), e && this.getGGData(d.join("@"))
                } else this.initGGMissSkuSetPage()
            },
            getGGData: function (a) {
                var b = this,
                    c = "//x.jd.com/ShowInterface",
                    d = {
                        ad_type: 7,
                        new_list: 1,
                        spread_type: 1,
                        ad_ids: "1755:6",
                        urlcid3: params.thirdCatId,
                        ev: a,
                        location_info: b.area.join("_"),
                        pin: readCookie("pin") || "",
                        __jda: readCookie("__jda") || "",
                        my: "gg666"
                    };
                $.ajax({
                    url: c,
                    data: d,
                    cache: !0,
                    dataType: "jsonp",
                    success: function (a) {
                        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C;
                        if (a && (c = 0, d = params.paragraph_tpl_type || 0, e = new Map, f = a[1755] || [], b.guanggaoList = f, f && f.length > 0)) {
                            for (g in f) h = f[g], i = 4 + 8 * g, h.index = i, e.put(h.sku_id, h);
                            for (j = $("#plist").find(".gl-item"), k = j.length, l = 60 > k ? 59 - f.length : k - f.length - 1, m = 0, g = 0; k > g; g++) n = j.eq(g), o = n.find(".j-sku-item").eq(0), p = o.attr("data-sku"), q = e.get(p), q && (e.remove(p), m += 1);
                            for (g = k - 1; g > l + m; g--) n = j.eq(g), n.remove(), c++;
                            r = e.values();
                            for (g in r) h = r[g], i = 4 + 8 * g, h.index = i;
                            for (s = [], g = 0; g < r.length; g++) {
                                if (t = r[g] || {}, i = r[g].index, i > k && (i = k), n = j.eq(i - 1), u = t.color, p = t.sku_id, v = t.ad_title, w = t.click_url, x = t.comment_num, s.push(p), y = t.SlaveWare || [], z = [], y.length > 0)
                                    for (A = 0; A < y.length; A++) f = y[A], B = [], B.push('<li class="ps-item">'), B.push('<a title="' + f.Content.color + ' " href="javascript:;">'), B.push('<img data-sku="' + f.wareid + '" data-url="' + f.Content.click_url + '" data-lazy-img="done" width="25" height="25" src="//img13.360buyimg.com/n9/' + f.Content.imageurl + '">'), B.push("</a>"), B.push("</li>"), z.push(B.join(""));
                                C = [], C.push('<li class="gl-item"><div class="gl-i-wrap j-sku-item" data-sku="'), C.push(p), C.push('" venderid="'), C.push(t.vender_id), C.push('" jdzy_shop_id="'), C.push(t.shop_id), C.push('">'), C.push('<div class="p-img">'), 1 == d ? (C.push('<a target="_blank" href="'), C.push(w), C.push('"><img width="220" height="282" data-img="1" data-lazy-img="done" src="//img11.360buyimg.com/n8/'), C.push(t.image_url), C.push('" title="'), C.push(v), C.push('"></a>')) : (C.push('<a target="_blank" href="'), C.push(w), C.push('"><img width="220" height="220" data-img="1" data-lazy-img="done" src="//img11.360buyimg.com/n7/'), C.push(t.image_url), C.push('" title="'), C.push(v), C.push('"></a>')), C.push("</div>"), (1 == d || 2 == d) && (C.push('<div class="p-scroll"><span class="ps-prev">&lt; </span><span class="ps-next">&gt;</span><div class="ps-wrap"><ul class="ps-main"><li class="ps-item"><a title="'), C.push(u), C.push('" href="javascript:;"><img data-sku="'), C.push(p), C.push('" data-url="'), C.push(w), C.push('" width="25" height="25" class="" data-lazy-img="done" src="//img13.360buyimg.com/n9/'), C.push(t.image_url), C.push('"></a></li>'), C.push(z.join("")), C.push("</ul></div></div>")), C.push('<div class="p-price"><strong class="J_price"><em></em><i></i></strong><div class="p-icons J-pro-icons"></div></div>'), C.push('<div class="p-name"><a target="_blank" title="'), C.push(v), C.push('" href="'), C.push(w), C.push('"><em>'), C.push(v), C.push('</em><i class="promo-words"></i></a></div>'), C.push('<div class="p-commit"><strong>已有<a target="_blank" href="//item.jd.com/'), C.push(p), C.push('.html#comment">'), C.push(x), C.push("</a>人评价</strong></div>"), (0 == d || 3 == d) && (C.push('<div class="p-operate"><a class="p-o-btn contrast J_contrast" data-sku="'), C.push(p), C.push('" href="javascript:;"><i></i>对比</a> <a class="p-o-btn focus J_focus" data-sku="'), C.push(p), C.push('" href="javascript:;"> <i></i>关注 </a><a class="p-o-btn addcart" target="_blank" href="//gate.jd.com/InitCart.aspx?pid='), C.push(p), C.push('&amp;pcount=1&amp;ptype=1"><i></i>加入购物车</a></div>')), 1 == d || 2 == d ? (C.push('<div class="p-focus"><a class="J_focus" data-sku="'), C.push(p), C.push('" href="javascript:;"><i></i>关注</a></div>'), C.push('<div class="p-shop " data-score="4" data-reputation="0" data-shopid="" data-shop_name="" data-done="1"></div>')) : C.push('<div class="p-shop hide" data-score="4" data-reputation="0" data-shopid="" data-shop_name="" data-done="1"></div>'), C.push('<div class="p-stock" data-isdeliveryable="5" style="display: none;" data-stock_v="1" data-stock_h="33"></div>'), C.push('<span class="p-promo-flag">推广</span>'), C.push("</div></li>"), n.after(C.join(""))
                            }
                            b.pListItem = $("#plist").find(".j-sku-item"),
                                b.initPriceLimit(s), b.get_stock(s), b.initAdWords(s),
                            !b.baseConf.dianpu || 1 != d && 2 != d ||
                            b.getDianPuInfoBySKU(s), b.initGGMissSkuSetPage(c)
                        }
                    }
                })
            }, initGGMissSkuSetPage: function (a) {
                var c, d, b = a || params.ms || 0;
                0 >= b || (c = $("#J_bottomPage .p-num a"), c.length > 0 && c.each(function () {
                    var a = $(this).attr("href");
                    $(this).attr("href", a + "&ms=" + b)
                }), d = $("#J_topPage a "), d.each(function () {
                    var a = $(this).attr("href");
                    $(this).attr("href", a + "&ms=" + b)
                }))
            }, showGGItem: function () {
                var a, b, c;
                if (this.guanggaoList.length > 0)for (a in this.guanggaoList)b = this.guanggaoList[a], c = b.exposal_url || "", c && $.ajax({
                    url: c,
                    data: {my: "ggshow"},
                    cache: !0,
                    dataType: "jsonp",
                    success: function (a) {
                    }
                })
            }, appendExpands: function (a) {
                var b, c, d, e, f, g, h, i, j, k, l;
                if (a && !(a.length < 1)) {
                    for (b = [], c = 0; c < a.length; c++) {
                        for (d = a[c], e = d.id, f = d.name, g = d.attr_infos, b.push('<div class ="J_selectorLine s-line J_selectorFold hide">'), b.push('<div class ="sl-wrap">'), b.push('<div class ="sl-key">'), b.push("<span>"), b.push(f), b.push("</span>"), b.push("</div>"), b.push('<div class ="sl-value">'), b.push('<div class ="sl-v-list">'), b.push('<ul class ="J_valueList">'), h = 0; h < g.length; h++)i = g[h], j = i.id, k = i.name, l = this.getExpandsUrl("ext", {
                                extid: e,
                                extValueId: j
                            }) + "&JL=3_" + f + "_" + k, b.push("<li>"), b.push('<a href="'), b.push(l), b.push('"  rel="nofollow">'), b.push("<i></i>"), b.push(k), b.push("</a>"), b.push("</li>");
                        b.push("</ul>"), b.push("</div>"), b.push('<div class ="sl-btns">'), b.push('<a class ="btn btn-primary J_btnsConfirm disabled" href ="javascript:;" >确定</a>'), b.push('<a class ="btn btn-default J_btnsCancel" href ="javascript:;" > 取消</a>'), b.push("</div>"), b.push("</div>"), b.push('<div class ="sl-ext">'), b.push(' <a class ="sl-e-more J_extMore" href ="javascript:;"  style="visibility: hidden;">更多<i></i></a>'), b.push(' <a class ="sl-e-multiple J_extMultiple" href ="javascript:;" > 多选<i></i></a>'), b.push("</div>"), b.push("</div>"), b.push("</div>")
                    }
                    $("#J_selectorMore").before(b.join(""))
                }
            }, initExpands: function () {
                var a, b, c, f, g, h, i, j, k, l;
                if (!("undefined" == typeof other_exts || other_exts.length < 1)) {
                    for (a = 0; a < other_exts.length; a++)if (b = [], c = other_exts[a], c.id, c.name, f = c.value_id, g = c.value_name, f) {
                        for (h = f.split(";"), i = g.split(";"), j = 0; j < h.length; j++)k = h[j], l = i[j], b.push({
                            id: k,
                            name: l
                        });
                        c.attr_infos = b, c.value_id = "", c.value_name = ""
                    }
                    this.appendExpands(other_exts)
                }
            }, initSpuItem: function () {
                var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p;
                if (!("undefined" == typeof slaveWareList || this.mySKUArray1.length < 1)) {
                    a = this.mySKUArray1.concat(this.mySKUArray2);
                    for (b in a)if (c = a[b], d = slaveWareList[c], "undefined" != typeof d && d.length > 0)for (b in d) {
                        e = d[b];
                        for (f in e)g = "", h = "", i = "", j = "", k = "", l = [], m = "", n = "", e.hasOwnProperty(f) && (g = f, h = e[f].color, i = e[f].ids || "", j = e[f].imageUrl, k = g % 5, m = e[f].comments || "", n = e[f].name || "", o = "", "" != i && (o = g + "|"), p = Number(b) + 1, l.push('<li class="ps-item" data-i="' + p + '" ids="' + o + i + '" ids_temp="' + o + i + '" > <a title="' + h + '" href="javascript:;" ><img data-sku=' + g + ' data-lazy-img="//img1' + k + ".360buyimg.com/n9/" + j + '" width="25" height="25" class="loading-style2"></a></li>'), this.slaveWareMap.put(g, {
                            name: n,
                            comments: m
                        }));
                        $("ul.gl-warp div[data-sku=" + c + "]").offsetParent().find(".ps-main").append(l.join(""))
                    }
                }
            }, initaosItem: function () {
                var a, b, c, d, e, f, g, h, i, j, k, l, m, n;
                if ("undefined" != typeof aosList)for (a = this.pListItem, b = 0, c = a.length; c > b; b++)if (d = a.eq(b), e = d.attr("data-sku"), f = aosList[e], "undefined" != typeof f && f.length > 0) {
                    g = [], g.push('<span class="p-attribute">');
                    for (h in f)i = f[h], j = i.n, k = i.v, l = baseURL || "", m = window.location.pathname + "?cat=" + this.getAttrValue("cat", l) + "&ev=" + k + "&JL=5_7_0", g.push('<a title="'), g.push(j), g.push('" href="'), g.push(m), g.push('" target="_blank" class="attr"><b>'), g.push(j), g.push("</b></a>");
                    g.push("</span>"), n = $(".p-name", d), n.addClass("p-name-type3"), n.append(g.join(""))
                }
            }, loadSlaveWare: function () {
                var a = [], b = [], c = [], d = [], e = [], f = this.slaveWareMap.keys();
                f.length <= 60 ? a = f.slice(0, 60) : f.length > 60 && f.length <= 120 ? (a = f.slice(0, 60), b = f.slice(60, 120)) : f.length > 120 && f.length <= 180 ? (a = f.slice(0, 60), b = f.slice(60, 120), c = f.slice(120, 180)) : f.length > 180 && f.length <= 280 ? (a = f.slice(0, 60), b = f.slice(60, 120), c = f.slice(120, 180), d = f.slice(180, 279)) : f.length > 280 && f.length < 380 && (a = f.slice(0, 60), b = f.slice(60, 120), c = f.slice(120, 180), d = f.slice(180, 279), e = f.slice(280, 379)), this.getSlavePriceLimit(a), this.getSlavePriceLimit(b), this.getSlavePriceLimit(c), this.getSlavePriceLimit(d), this.getSlavePriceLimit(e), this.get_stock_slave(a), this.get_stock_slave(b), this.get_stock_slave(c), this.get_stock_slave(d), this.get_stock_slave(e), this.initAdWords_slave(a), this.initAdWords_slave(b), this.initAdWords_slave(c), this.initAdWords_slave(d), this.initAdWords_slave(e), !params.thirdCatId || "798" != params.thirdCatId && "870" != params.thirdCatId && "878" != params.thirdCatId && "880" != params.thirdCatId || (this.initZhiShu_slave(a), this.initZhiShu_slave(b), this.initZhiShu_slave(c), this.initZhiShu_slave(d), this.initZhiShu_slave(e)), this.bindSpuHover()
            }, bindSpuHover: function () {
                var a = this;
                $("#plist").delegate(".p-scroll .ps-item img", "mouseover", function () {
                    var l, m, n, o, p, q, r, s, t, u, v, w, b = $(this).parents(".j-sku-item"), c = b.find(".J_price i"), d = b.find(".p-stock"), e = b.find(".p-name em"), f = b.find(".p-commit a"), g = b.attr("data-sku"), h = b.attr("data-hoverNum"), i = b.find(".p-name a"), j = b.find(".p-commit .buy-score em"), k = b.find(".ps-item");
                    if (k.length > 1 && (h || (b.attr("data-hoverNum", !0), a.slaveWareMap.put(g, {
                            price: c.html(),
                            name: e.html(),
                            stock: d.attr("data-stock_h"),
                            comments: f.html(),
                            ad: i.attr("title"),
                            zhishu: j.html()
                        })), l = $(this).data("sku"), m = a.slaveWareMap.get(l))) {
                        switch (m.price && c.html(m.price), m.name && e.html(m.name), m.comments && f.html(m.comments), n = m.stock, o = "", selectedProvinceId && iplocation[selectedProvinceId] && (o = iplocation[selectedProvinceId]["name"]), Number(n)) {
                            case 0:
                            case 1:
                                d.attr("style", "display: "), d && d.html(o + "暂不支持配送"), d.attr({
                                    "data-stock_v": "1",
                                    "data-stock_h": "1"
                                });
                                break;
                            case 18:
                            case 33:
                                d.attr("style", "display: none"), d.attr({"data-stock_v": "1", "data-stock_h": "33"});
                                break;
                            case 34:
                                d.attr("style", "display: "), d && d.html(o + "无货"), d.attr({
                                    "data-stock_v": "4",
                                    "data-stock_h": "34"
                                });
                                break;
                            case 36:
                                p = "", d.attr("style", "display: "), d && d.html(o + "预订" + p), d.attr({
                                    "data-stock_v": "3",
                                    "data-stock_h": "36"
                                });
                                break;
                            case 39:
                                d.attr({"data-stock_v": "2", "data-stock_h": "39"});
                                break;
                            case 40:
                                q = !1, p = "", d.attr({
                                    "data-stock_v": "5",
                                    "data-stock_h": "40"
                                }), q && (d.attr("style", "display: "), d && d.html('<span class="st40">' + o + "有货 <b>" + p + "</b></span>"))
                        }
                        r = m.ad, r && (s = b.find(".p-img img"), s.attr("title", r), i.attr("title", r), t = b.find(".promo-words"), t.html(r)), u = m.zhishu, u && (v = '<span class="buy-score" title="京东与第三方合作对商品性能、安全性、外观等进行综合评估得出选购指数">选购指数<em>' + u + "</em></span>", w = b.find(".p-commit"), b.find(".p-commit .buy-score").remove(), w.prepend(v))
                    }
                })
            }, getSlavePriceLimit: function (a) {
                var b = this;
                !a || a.length < 1 || seajs.use(["product/list/1.0.4/js/tools"], function (c) {
                    c.getPrice(a, this.price_pdos_off, function (a) {
                        var c, d, e;
                        if (a)for (i = 0; i < a.length; i++) {
                            if (!a[i].id)return !1;
                            c = a[i].id.replace("J_", ""), d = a[i].p, e = b.slaveWareMap.get(c), e && (e.price = d > 0 ? d : "暂无报价")
                        }
                    })
                })
            }, getSlavePrice: function (a) {
                var c, d, e, b = this;
                !a || a.length < 1 || (c = "//p.3.cn/prices/mgets?", d = this.area.join("_"), e = {
                    my: "list_price_slave",
                    type: "1",
                    area: d,
                    skuIds: "J_" + a.join(",J_")
                }, $.ajax({
                    url: c, data: e, cache: !0, dataType: "jsonp", success: function (a) {
                        var c, d, e;
                        if (a)for (i = 0; i < a.length; i++) {
                            if (!a[i].id)return !1;
                            c = a[i].id.replace("J_", ""), d = a[i].p, e = b.slaveWareMap.get(c), e && (e.price = d > 0 ? d : "暂无报价")
                        }
                    }
                }))
            }, get_stock_slave: function (a) {
                var c, d, e, b = this;
                a.length < 1 || (c = this.area, c.length < 4 && c.push(0), d = "//ss.3.cn/ss/areaStockState/mget?", e = {
                    app: "list_pc",
                    ch: "1",
                    area: c.join(","),
                    skuNum: a.join(";")
                }, $.ajax({
                    url: d, data: e, cache: !0, dataType: "jsonp", success: function (a) {
                        var c, d, e;
                        if (a)for (c in a)d = a[c], e = b.slaveWareMap.get(c), e && (e.stock = d["a"])
                    }
                }))
            }, initAdWords_slave: function (a) {
                var c, d, b = this;
                !a || a.length < 1 || (c = "//ad.3.cn/ads/mgets?", d = {
                    my: "list_adWords",
                    skuids: "AD_" + a.join(",AD_")
                }, $.ajax({
                    url: c, data: d, cache: !0, dataType: "jsonp", success: function (a) {
                        var c, d, e;
                        if (a)for (i = 0; i < a.length; i++)c = a[i].id.replace("AD_", ""), c && (d = b.strip_tags(a[i].ad), e = b.slaveWareMap.get(c), e && (e.ad = d))
                    }
                }))
            }, initSearchReslut: function () {
                var a = "在当前分类中搜索", b = function (b) {
                    var c = $.trim(b.val());
                    "" != c && c != a && (window.location.href = window.location.href.replace(/(^|\\?|&)ev=([^&#]*)/g, "").replace(/(^|\\?|&)go=([^&#]*)/g, "") + "&sir_key=" + encodeURIComponent(c))
                };
                $("#resultSearchBtn2").click(function () {
                    b($(this).prev())
                }).prev().focus(function () {
                    $.trim($(this).val()) == a && $(this).val("")
                }).blur(function () {
                    "" == $.trim($(this).val()) && $(this).val(a)
                }).keydown(function (a) {
                    13 == a.keyCode && b($(this))
                }), $("#colseResultSearchBtn2").click(function () {
                    window.location = window.location.href.replace(/(^|\\?|&)sir_key=([^&#]*)/g, "")
                })
            }, initDaogou: function () {
                var a = this;
                $("#tip-main ul li").click(function () {
                    var c = $(this).attr("data-id"), d = $(this).find("em").html();
                    $(this).attr("class") ? ($(this).attr("class", ""), a.daogouMap.remove(c)) : ($(this).addClass("selected"), a.daogouMap.put(c, d)), a.daogouMap.size() > 0 ? $("#btn-match").addClass("btn-match-active") : $("#btn-match").removeClass("btn-match-active")
                }), $("#btn-match").click(function () {
                    var c, d, e;
                    a.daogouMap.size() > 0 && (c = a.daogouMap.keys().join(","), d = a.daogouMap.values().join("|"), e = baseURL || "", window.location = window.location.pathname + "?cat=" + a.getAttrValue("cat", e) + "&gui=" + c + "&JL=3_新手指导_" + d)
                }), seajs.use(["jdf/1.0.0/ui/tips/1.0.0/tips"], function () {
                    $(".guide-option li,.guide-recommend .explain").tips({
                        tipsClass: "ui-tips-guide",
                        type: "hover",
                        align: ["top", "left"],
                        hasClose: !1
                    })
                })
            }, get_stock: function (a) {
                var c, d, e, b = this;
                a.length < 1 || (c = this.area, c.length < 4 && c.push(0), d = "//ss.3.cn/ss/areaStockState/mget?", e = {
                    app: "list_pc",
                    ch: "1",
                    area: c.join(","),
                    skuNum: a.join(";")
                }, $.ajax({
                    url: d, data: e, cache: !0, dataType: "jsonp", success: function (a) {
                        a && b.get_stock_cb(a)
                    }
                }))
            }, get_stock_cb: function (a) {
                var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, b = this;
                if (b.mySPUMap1 = new Map, a && "object" == typeof a) {
                    for (d = "", selectedProvinceId && iplocation[selectedProvinceId] && (d = iplocation[selectedProvinceId]["name"]), e = this.pListItem, f = 0, g = e.length; g > f; f++)if (h = e.eq(f), i = h.attr("data-sku"), j = h.attr("is_parallel_stock") || "0", k = a[i], l = "p-o-btn notification J_notification", k)if (m = $(".p-stock", h), n = k["l"] || 0, o = k["j"] || "", p = h.attr("selfservice"), "0" == this.gjz && "33" != k["a"] && ($(".p-addcart", h).attr("style", "display: none"), $(".p-commit-n", h).attr("style", "display: none")), q = m.attr("limit") || "0", "1" == q)r = "暂不支持配送", m.attr("style", "display: "), m && m.html('<span class="st40">' + d + r + "</span>"), m.attr({
                        "data-stock_v": "1",
                        "data-stock_h": "1"
                    }); else switch (Number(k["a"])) {
                        case 0:
                        case 18:
                        case 33:
                            m.attr("style", "display: none"), m.attr({"data-stock_v": "1", "data-stock_h": "33"});
                            break;
                        case 34:
                            s = $("a.addcart", h), m.attr("style", "display: "), "12360" == params.thirdCatId ? s.attr({
                                href: "javascript:;",
                                "class": l,
                                "data-type": 2,
                                "data-sku": i,
                                id: "store" + i
                            }).removeAttr("target").html("<i></i>无法配送") : s.attr({
                                href: "javascript:;",
                                "class": l,
                                "data-type": 2,
                                "data-sku": i,
                                id: "store" + i
                            }).removeAttr("target").html("<i></i>到货通知"), m && m.html(d + "无货"), m.attr({
                                "data-stock_v": "4",
                                "data-stock_h": "34"
                            }), b.mySPUMap1.put(i, h);
                            break;
                        case 36:
                            r = "", m.attr("style", "display: "), o && "" != o && "2" != p ? r = "  预计" + o + "日后有货" : params.istsyx && "2" == n && (r = " 下单后7-9周发货"), m && m.html(d + "预订" + r), m.attr({
                                "data-stock_v": "3",
                                "data-stock_h": "36"
                            });
                            break;
                        case 39:
                            m.attr({"data-stock_v": "2", "data-stock_h": "39"});
                            break;
                        case 40:
                            t = !1, r = "", "1" != j && params.istsyx && "2" == n && (r = "下单后5-10天发货", t = !0), m.attr({
                                "data-stock_v": "5",
                                "data-stock_h": "40"
                            }), t && (m.attr("style", "display: "), m && m.html('<span class="st40">' + d + "有货 <b>" + r + "</b></span>"))
                    }
                    u = b.getAttrValue("spu", location.href) || "0", v = params.spureplace || !1, "0" == u && v && b.spuRepacle()
                }
            }, spuRepacle: function () {
                var d, e, g, h, i, j, k, l, m, n, o, p, q, r, a = [], b = this.mySPUMap1.values(), c = b.length;
                if (c > 0 && this.isSpuRepalce <= 5) {
                    for (this.isSpuRepalce++, d = 0; c > d; d++)for (e = b[d], e.attr("data-sku"), g = $("li.ps-item", e), h = 0; h < g.length; h++)i = $(g[h]).attr("ids"), "undefined" != typeof i && "" != i && (j = i.split("|"), k = j[0], $(g[h]).attr("ids", j.slice(1, j.length).join("|")), l = $(".p-img a", e), m = "//item.jd.com/" + k + ".html", l.attr("href", m), e.attr("data-sku", k), n = $("a img", g[h]), $(n).attr("data-sku", k), h > 0 && ($(g[0]).before($(g[h])), o = $(n).attr("data-lazy-img"), "done" == o && (o = $(n).attr("src")), p = $(".p-img a img", e), q = p.attr("data-lazy-img"), "done" == q ? p.attr("src", o.replace("/n9", "/n8")) : p.attr("data-lazy-img", o.replace("/n9", "/n8"))), r = $(".p-stock", e), r.attr("style", "display: none"), a.push(k));
                    this.pListItem = $("#plist").find(".j-sku-item"), this.get_stock(a)
                }
            }, setLogJL: function () {
                var b, c, a = decodeURI(this.getAttrValue("JL", location.href));
                "null" != a && "" != a && (b = params.abTestFlag, c = a.split("_"), 6 == c[0] ? log("search", "list", document.referrer, params.thirdCatId, c[0], params.pageNo, b) : 7 == c[0] ? log("search", "list", document.referrer, params.thirdCatId, c[0], encodeURIComponent(c[1]), b) : 4 == c[0] ? log("search", "list", document.referrer, params.thirdCatId, c[0], encodeURIComponent(c[1]), b) : log("search", "list", document.referrer, params.thirdCatId, c[0], encodeURIComponent(c[1]), encodeURIComponent(c[2]), b))
            }, setJLSKU: function () {
                var b, a = this.mySKUArray1;
                a.length > 0 && log("search", "list", document.referrer, params.thirdCatId, 5, a.join("-")), b = this.mySKUArray2, b.length > 0 && log("search", "list", document.referrer, params.thirdCatId, 5, b.join("-"))
            }, dopv_stock: function () {
                var d, e, f, g, h, i, a = this, b = [], c = a.pListItem;
                for (d = 0, e = c.length; e > d; d++)f = c.eq(d), g = f.attr("data-sku"), h = $(".J_price i", f), h = h.text().replace("¥", ""), "暂无报价" == h && (h = -1), i = $(".p-stock", f), f = [], f.push(Number(g)), f.push(Number(h)), f.push(Number(i.attr("data-stock_v"))), f.push(Number(i.attr("data-stock_h"))), f.push(Number(i.attr("data-isdeliveryable"))), b.push(f);
                b.length > 0 && (logJSON("pv_stock", "list", {
                    area: this.area.join("_"),
                    sku: b.slice(0, 30)
                }), b.length > 30 && logJSON("pv_stock", "list", {area: this.area.join("_"), sku: b.slice(30, 60)}))
            }, onPriceChange: function (a) {
                1 == a.stock && (this.stockFlag = !0), 0 == a.stock && (this.priceFlag = !0), 2 == a.stock && (this.wljsloadFlag = !0), this.priceFlag && this.stockFlag && this.wljsloadFlag && this.dopv_stock()
            }, initGoogletagmanager: function () {
                var e, a = params.exp_brand;
                params.firstCatId, params.secondCatId, params.thirdCatId, e = null, a && "0" != a && (e = a), dataLayer = [{google_tag_params: window.google_tag_params}], function (a, b, c, d, e) {
                    a[d] = a[d] || [], a[d].push({"gtm.start": (new Date).getTime(), event: "gtm.js"});
                    var f = b.getElementsByTagName(c)[0], g = b.createElement(c), h = "dataLayer" != d ? "&l=" + d : "";
                    g.async = !0, g.src = "//www.googletagmanager.com/gtm.js?id=" + e + h, f.parentNode.insertBefore(g, f)
                }(window, document, "script", "dataLayer", "GTM-T947SH")
            }
        }
    }(), jaq = jaq || [], jdList = new JD.JDList, jdList.init(), setTimeout("jdList.wait()", 2e3), setInterval("jdList.showYushouTime()", 1e3);
function onclickArea(a) {
    var b, c, d, e;
    selectedProvinceId || (selectedProvinceId = "1"), selectedCityId || (selectedCityId = "72"), a || (a = "4137"), b = selectedProvinceId + "-" + selectedCityId + "-" + a, JDFN_Domain.length < 6 && (window.ActiveXObject || "ActiveXObject" in window) ? (c = "//jd.hk/sign/listitem", d = {
        areaId: selectedProvinceId,
        ipLocDjd: b
    }, $.ajax({
        url: c, data: d, cache: !0, dataType: "jsonp", success: function () {
            var c = "//" + window.location.hostname + "/list.html" + window.location.search.replace(/(^|\\?|&)jth=([^&#]*)/g, "").replace(/(^|\\?|&)area=([^&#]*)/g, "");
            (baseConf.areaparam || baseConf.areaparam_djd && params.isdjd) && (c = c + "&area=" + selectedProvinceId + "," + selectedCityId + "," + a), window.location.href = c
        }
    })) : (e = new Date, e.setTime(e.getTime() + 2592e6), document.cookie = "ipLoc-djd=" + b + ";expires=" + e.toGMTString() + ";path=/;domain=" + JDFN_Domain, document.cookie = "areaId=" + selectedProvinceId + ";expires=" + e.toGMTString() + ";path=/;domain=" + JDFN_Domain, c = "//" + window.location.hostname + "/list.html" + window.location.search.replace(/(^|\\?|&)jth=([^&#]*)/g, "").replace(/(^|\\?|&)area=([^&#]*)/g, ""), (baseConf.areaparam || baseConf.areaparam_djd && params.isdjd) && (c = c + "&area=" + selectedProvinceId + "," + selectedCityId + "," + a), window.location.href = c)
}
function getAreaStoreUrl(a) {
    var e, b = new RegExp("(^|&)area=([^&]+)(&|$)", "g"), c = window.location.search.substr(1).match(b), d = "&area=" + selectedProvinceId + "," + selectedCityId + "," + a;
    return c && c.length > 0 ? (c = c[0], "&" == c.substr(c.length - 1, 1) && (c = c.substr(0, c.length - 1)), e = window.location.href.replace(c, d), e = e.replace(/(^|\\?|&)jth=([^&#]*)/g, "")) : "//" + window.location.hostname + ":" + window.location.port + "/list.html" + window.location.search.replace(/(^|\\?|&)jth=([^&#]*)/g, "") + d
}
function selectStoreTab(a) {
    0 == a ? ($("#store-selector div.mt li").eq(0).find("em").text("请选择"), $("#store-selector div.mt li").eq(1).addClass("hide").find("em").text("请选择"), $("#store-selector div.mt li").eq(2).addClass("hide").find("em").text("请选择"), $("#store-selector [data-widget=tab-item]").eq(0).addClass("curr"), $('#store-selector [data-area="0"]').removeClass("hide"), $('#store-selector [data-area="1"]').addClass("hide"), $('#store-selector [data-area="2"]').addClass("hide")) : 1 == a && ($("#store-selector [data-widget=tab-item]").eq(1).addClass("curr").find("em").text("请选择"), $('#store-selector [data-area="1"]').removeClass("hide"), $("#store-selector div.mt li").eq(2).addClass("hide").find("em").text("请选择"), $('#store-selector [data-area="2"]').addClass("hide"))
}
function getAreaList_callback(a) {
    var b, c, d, e, f, g, h;
    for ($('#store-selector div[data-area="1"]').addClass("hide"), $('#store-selector div[data-area="2"]').removeClass("hide"), $('#store-selector div[data-area="2"] p.ac').addClass("hide"), b = $('#store-selector div.mc[data-area="2"] ul').empty(), c = "", d = "", e = "", f = 0; f < a.length; f++)g = a[f], h = g["name"], h.length <= 5 ? c += "<li><a data-value='" + g["id"] + "' href='#none' onclick=onclickArea(" + g["id"] + ")>" + g["name"] + "</a></li>" : h.length <= 11 ? d += "<li class='long-area'><a data-value='" + g["id"] + "' href='#none' onclick=onclickArea(" + g["id"] + ")>" + g["name"] + "</a></li>" : e += "<li class='longer-area'><a data-value='" + g["id"] + "' href='#none' onclick=onclickArea(" + g["id"] + ")>" + g["name"] + "</a></li>";
    b.append(c + d + e)
}
function selectProvince(a, b) {
    var c, e, f, g, h, i, j;
    for (selectedProvinceId = a, $("#store-selector [data-widget=tab-item]").eq(0).removeClass("curr"), $("#store-selector [data-widget=tab-item]").eq(0).find("em").text(b), $("#store-selector [data-widget=tab-item]").eq(1).removeClass("hide").addClass("curr"), $('#store-selector [data-area="0"]').addClass("hide"), $('#store-selector [data-area="1"]').removeClass("hide"), $('#store-selector [data-area="1"] p.ac').addClass("hide"), c = $('#store-selector div.mc[data-area="1"] ul').empty(), $('#store-selector div.mc[data-area="2"] ul').empty(), $('#store-selector [data-area="2"] p.ac').removeClass("hide"), e = provinceCityJson[a], f = "", g = "", h = "", i = 0; i < e.length; i++)b = e[i]["name"], j = e[i]["id"], b.length <= 5 ? f += "<li><a data-value=" + j + ' href="#none" onclick=selectCity(' + j + ",'" + b + "')>" + b + "</a></li>" : b.length <= 11 ? g += '<li class="long-area"><a data-value=' + j + ' href="#none"  onclick=selectCity(' + j + ",'" + b + "')>" + b + "</a></li>" : h += '<li class="longer-area"><a data-value=' + j + '  href="#none"  onclick=selectCity(' + j + ",'" + b + "')>" + b + "</a></li>";
    c.append(f + g + h)
}
function selectCity(a, b) {
    selectedCityId = a, $("#store-selector [data-widget=tab-item]").eq(1).removeClass("curr"), $("#store-selector [data-widget=tab-item]").eq(1).find("em").text(b), $("#store-selector [data-widget=tab-item]").eq(2).removeClass("hide").addClass("curr"), $.ajax({
        url: "//d.jd.com/area/get?fid=" + a + "&callback=getAreaList_callback",
        dataType: "jsonp"
    })
}
function getAreaName_callback(a) {
    var b, c;
    for (b = 0; b < a.length; b++)if (c = a[b], c["id"] == selectedAreaId) {
        selectedAreaName = c["name"];
        break
    }
    selectedAreaName || (selectedAreaId = a[0]["id"], selectedAreaName = a[0]["name"]), $("#store-selector [data-widget=tab-item]").eq(2).find("em").text(selectedAreaName), selectedProvinceName && selectedCityName && selectedAreaName && $("#store-selector div.text").html(selectedProvinceName + selectedCityName + selectedAreaName + "<b></b>")
}
var selectedProvinceId, selectedCityId, selectedAreaId, selectedProvinceName, selectedCityName, selectedAreaName, area, area_cookie, citysInProvince, i, firstTabPanel, id, name, filtUrl, page_jump, iplocation = {
    1: {
        name: "北京",
        root: 0,
        djd: 1,
        c: 72
    },
    2: {name: "上海", root: 1, djd: 1, c: 78},
    3: {name: "天津", root: 0, djd: 1, c: 51035},
    4: {name: "重庆", root: 3, djd: 1, c: 113},
    5: {name: "河北", root: 0, djd: 1, c: 142},
    6: {name: "山西", root: 0, djd: 1, c: 303},
    7: {name: "河南", root: 0, djd: 1, c: 412},
    8: {name: "辽宁", root: 0, djd: 1, c: 560},
    9: {name: "吉林", root: 0, djd: 1, c: 639},
    10: {name: "黑龙江", root: 0, djd: 1, c: 698},
    11: {name: "内蒙古", root: 0, djd: 0, c: 799},
    12: {name: "江苏", root: 1, djd: 1, c: 904},
    13: {name: "山东", root: 0, djd: 1, c: 1e3},
    14: {name: "安徽", root: 1, djd: 1, c: 1116},
    15: {name: "浙江", root: 1, djd: 1, c: 1158},
    16: {name: "福建", root: 2, djd: 1, c: 1303},
    17: {name: "湖北", root: 0, djd: 1, c: 1381},
    18: {name: "湖南", root: 2, djd: 1, c: 1482},
    19: {name: "广东", root: 2, djd: 1, c: 1601},
    20: {name: "广西", root: 2, djd: 1, c: 1715},
    21: {name: "江西", root: 2, djd: 1, c: 1827},
    22: {name: "四川", root: 3, djd: 1, c: 1930},
    23: {name: "海南", root: 2, djd: 1, c: 2121},
    24: {name: "贵州", root: 3, djd: 1, c: 2144},
    25: {name: "云南", root: 3, djd: 1, c: 2235},
    26: {name: "西藏", root: 3, djd: 0, c: 2951},
    27: {name: "陕西", root: 3, djd: 1, c: 2376},
    28: {name: "甘肃", root: 3, djd: 1, c: 2487},
    29: {name: "青海", root: 3, djd: 0, c: 2580},
    30: {name: "宁夏", root: 3, djd: 1, c: 2628},
    31: {name: "新疆", root: 3, djd: 0, c: 2652},
    32: {name: "台湾", root: 2, djd: 0, c: 2768},
    42: {name: "香港", root: 2, djd: 0, c: 2754},
    43: {name: "澳门", root: 2, djd: 0, c: 2770},
    84: {name: "钓鱼岛", root: 2, djd: 0, c: 84}
}, provinceCityJson = {
    1: [{id: 72, name: "朝阳区"}, {id: 2800, name: "海淀区"}, {id: 2801, name: "西城区"}, {
        id: 2802,
        name: "东城区"
    }, {id: 2803, name: "崇文区"}, {id: 2804, name: "宣武区"}, {id: 2805, name: "丰台区"}, {id: 2806, name: "石景山区"}, {
        id: 2807,
        name: "门头沟"
    }, {id: 2808, name: "房山区"}, {id: 2809, name: "通州区"}, {id: 2810, name: "大兴区"}, {id: 2812, name: "顺义区"}, {
        id: 2814,
        name: "怀柔区"
    }, {id: 2816, name: "密云区"}, {id: 2901, name: "昌平区"}, {id: 2953, name: "平谷区"}, {id: 3065, name: "延庆县"}],
    2: [{id: 2813, name: "徐汇区"}, {id: 2815, name: "长宁区"}, {id: 2817, name: "静安区"}, {id: 2820, name: "闸北区"}, {
        id: 2822,
        name: "虹口区"
    }, {id: 2823, name: "杨浦区"}, {id: 2824, name: "宝山区"}, {id: 2825, name: "闵行区"}, {id: 2826, name: "嘉定区"}, {
        id: 2830,
        name: "浦东新区"
    }, {id: 2833, name: "青浦区"}, {id: 2834, name: "松江区"}, {id: 2835, name: "金山区"}, {id: 2836, name: "南汇区"}, {
        id: 2837,
        name: "奉贤区"
    }, {id: 2841, name: "普陀区"}, {id: 2919, name: "崇明县"}, {id: 78, name: "黄浦区"}],
    3: [{id: 51035, name: "东丽区"}, {id: 51036, name: "和平区"}, {id: 51037, name: "河北区"}, {
        id: 51038,
        name: "河东区"
    }, {id: 51039, name: "河西区"}, {id: 51040, name: "红桥区"}, {id: 51041, name: "蓟县"}, {
        id: 51042,
        name: "静海县"
    }, {id: 51043, name: "南开区"}, {id: 51044, name: "塘沽区"}, {id: 51045, name: "西青区"}, {
        id: 51046,
        name: "武清区"
    }, {id: 51047, name: "津南区"}, {id: 51048, name: "汉沽区"}, {id: 51049, name: "大港区"}, {
        id: 51050,
        name: "北辰区"
    }, {id: 51051, name: "宝坻区"}, {id: 51052, name: "宁河县"}],
    4: [{id: 113, name: "万州区"}, {id: 114, name: "涪陵区"}, {id: 115, name: "梁平县"}, {id: 119, name: "南川区"}, {
        id: 123,
        name: "潼南县"
    }, {id: 126, name: "大足区"}, {id: 128, name: "黔江区"}, {id: 129, name: "武隆县"}, {id: 130, name: "丰都县"}, {
        id: 131,
        name: "奉节县"
    }, {id: 132, name: "开县"}, {id: 133, name: "云阳县"}, {id: 134, name: "忠县"}, {id: 135, name: "巫溪县"}, {
        id: 136,
        name: "巫山县"
    }, {id: 137, name: "石柱县"}, {id: 138, name: "彭水县"}, {id: 139, name: "垫江县"}, {id: 140, name: "酉阳县"}, {
        id: 141,
        name: "秀山县"
    }, {id: 48131, name: "璧山县"}, {id: 48132, name: "荣昌县"}, {id: 48133, name: "铜梁县"}, {
        id: 48201,
        name: "合川区"
    }, {id: 48202, name: "巴南区"}, {id: 48203, name: "北碚区"}, {id: 48204, name: "江津区"}, {
        id: 48205,
        name: "渝北区"
    }, {id: 48206, name: "长寿区"}, {id: 48207, name: "永川区"}, {id: 50950, name: "江北区"}, {
        id: 50951,
        name: "南岸区"
    }, {id: 50952, name: "九龙坡区"}, {id: 50953, name: "沙坪坝区"}, {id: 50954, name: "大渡口区"}, {
        id: 50995,
        name: "綦江区"
    }, {id: 51026, name: "渝中区"}, {id: 51027, name: "高新区"}, {id: 51028, name: "北部新区"}, {
        id: 4164,
        name: "城口县"
    }, {id: 3076, name: "高新区"}],
    5: [{id: 142, name: "石家庄市"}, {id: 148, name: "邯郸市"}, {id: 164, name: "邢台市"}, {id: 199, name: "保定市"}, {
        id: 224,
        name: "张家口市"
    }, {id: 239, name: "承德市"}, {id: 248, name: "秦皇岛市"}, {id: 258, name: "唐山市"}, {id: 264, name: "沧州市"}, {
        id: 274,
        name: "廊坊市"
    }, {id: 275, name: "衡水市"}],
    6: [{id: 303, name: "太原市"}, {id: 309, name: "大同市"}, {id: 318, name: "阳泉市"}, {id: 325, name: "晋城市"}, {
        id: 330,
        name: "朔州市"
    }, {id: 336, name: "晋中市"}, {id: 350, name: "忻州市"}, {id: 368, name: "吕梁市"}, {id: 379, name: "临汾市"}, {
        id: 398,
        name: "运城市"
    }, {id: 3074, name: "长治市"}],
    7: [{id: 412, name: "郑州市"}, {id: 420, name: "开封市"}, {id: 427, name: "洛阳市"}, {id: 438, name: "平顶山市"}, {
        id: 446,
        name: "焦作市"
    }, {id: 454, name: "鹤壁市"}, {id: 458, name: "新乡市"}, {id: 468, name: "安阳市"}, {id: 475, name: "濮阳市"}, {
        id: 482,
        name: "许昌市"
    }, {id: 489, name: "漯河市"}, {id: 495, name: "三门峡市"}, {id: 502, name: "南阳市"}, {id: 517, name: "商丘市"}, {
        id: 527,
        name: "周口市"
    }, {id: 538, name: "驻马店市"}, {id: 549, name: "信阳市"}, {id: 2780, name: "济源市"}],
    8: [{id: 560, name: "沈阳市"}, {id: 573, name: "大连市"}, {id: 579, name: "鞍山市"}, {id: 584, name: "抚顺市"}, {
        id: 589,
        name: "本溪市"
    }, {id: 593, name: "丹东市"}, {id: 598, name: "锦州市"}, {id: 604, name: "葫芦岛市"}, {id: 609, name: "营口市"}, {
        id: 613,
        name: "盘锦市"
    }, {id: 617, name: "阜新市"}, {id: 621, name: "辽阳市"}, {id: 632, name: "朝阳市"}, {id: 6858, name: "铁岭市"}],
    9: [{id: 639, name: "长春市"}, {id: 644, name: "吉林市"}, {id: 651, name: "四平市"}, {id: 2992, name: "辽源市"}, {
        id: 657,
        name: "通化市"
    }, {id: 664, name: "白山市"}, {id: 674, name: "松原市"}, {id: 681, name: "白城市"}, {id: 687, name: "延边州"}],
    10: [{id: 727, name: "鹤岗市"}, {id: 731, name: "双鸭山市"}, {id: 737, name: "鸡西市"}, {id: 742, name: "大庆市"}, {
        id: 753,
        name: "伊春市"
    }, {id: 757, name: "牡丹江市"}, {id: 765, name: "佳木斯市"}, {id: 773, name: "七台河市"}, {id: 776, name: "黑河市"}, {
        id: 782,
        name: "绥化市"
    }, {id: 793, name: "大兴安岭地区"}, {id: 698, name: "哈尔滨市"}, {id: 712, name: "齐齐哈尔市"}],
    11: [{id: 799, name: "呼和浩特市"}, {id: 805, name: "包头市"}, {id: 810, name: "乌海市"}, {id: 812, name: "赤峰市"}, {
        id: 823,
        name: "乌兰察布市"
    }, {id: 835, name: "锡林郭勒盟"}, {id: 848, name: "呼伦贝尔市"}, {id: 870, name: "鄂尔多斯市"}, {id: 880, name: "巴彦淖尔市"}, {
        id: 891,
        name: "阿拉善盟"
    }, {id: 895, name: "兴安盟"}, {id: 902, name: "通辽市"}],
    12: [{id: 904, name: "南京市"}, {id: 911, name: "徐州市"}, {id: 919, name: "连云港市"}, {id: 925, name: "淮安市"}, {
        id: 933,
        name: "宿迁市"
    }, {id: 939, name: "盐城市"}, {id: 951, name: "扬州市"}, {id: 959, name: "泰州市"}, {id: 965, name: "南通市"}, {
        id: 972,
        name: "镇江市"
    }, {id: 978, name: "常州市"}, {id: 984, name: "无锡市"}, {id: 988, name: "苏州市"}],
    13: [{id: 2900, name: "济宁市"}, {id: 1e3, name: "济南市"}, {id: 1007, name: "青岛市"}, {id: 1016, name: "淄博市"}, {
        id: 1022,
        name: "枣庄市"
    }, {id: 1025, name: "东营市"}, {id: 1032, name: "潍坊市"}, {id: 1042, name: "烟台市"}, {id: 1053, name: "威海市"}, {
        id: 1058,
        name: "莱芜市"
    }, {id: 1060, name: "德州市"}, {id: 1072, name: "临沂市"}, {id: 1081, name: "聊城市"}, {id: 1090, name: "滨州市"}, {
        id: 1099,
        name: "菏泽市"
    }, {id: 1108, name: "日照市"}, {id: 1112, name: "泰安市"}],
    14: [{id: 1151, name: "黄山市"}, {id: 1159, name: "滁州市"}, {id: 1167, name: "阜阳市"}, {id: 1174, name: "亳州市"}, {
        id: 1180,
        name: "宿州市"
    }, {id: 1201, name: "池州市"}, {id: 1206, name: "六安市"}, {id: 2971, name: "宣城市"}, {id: 1114, name: "铜陵市"}, {
        id: 1116,
        name: "合肥市"
    }, {id: 1121, name: "淮南市"}, {id: 1124, name: "淮北市"}, {id: 1127, name: "芜湖市"}, {id: 1132, name: "蚌埠市"}, {
        id: 1137,
        name: "马鞍山市"
    }, {id: 1140, name: "安庆市"}],
    15: [{id: 1158, name: "宁波市"}, {id: 1273, name: "衢州市"}, {id: 1280, name: "丽水市"}, {id: 1290, name: "台州市"}, {
        id: 1298,
        name: "舟山市"
    }, {id: 1213, name: "杭州市"}, {id: 1233, name: "温州市"}, {id: 1243, name: "嘉兴市"}, {id: 1250, name: "湖州市"}, {
        id: 1255,
        name: "绍兴市"
    }, {id: 1262, name: "金华市"}],
    16: [{id: 1303, name: "福州市"}, {id: 1315, name: "厦门市"}, {id: 1317, name: "三明市"}, {id: 1329, name: "莆田市"}, {
        id: 1332,
        name: "泉州市"
    }, {id: 1341, name: "漳州市"}, {id: 1352, name: "南平市"}, {id: 1362, name: "龙岩市"}, {id: 1370, name: "宁德市"}],
    17: [{id: 1432, name: "孝感市"}, {id: 1441, name: "黄冈市"}, {id: 1458, name: "咸宁市"}, {id: 1466, name: "恩施州"}, {
        id: 1475,
        name: "鄂州市"
    }, {id: 1477, name: "荆门市"}, {id: 1479, name: "随州市"}, {id: 3154, name: "神农架林区"}, {id: 1381, name: "武汉市"}, {
        id: 1387,
        name: "黄石市"
    }, {id: 1396, name: "襄阳市"}, {id: 1405, name: "十堰市"}, {id: 1413, name: "荆州市"}, {id: 1421, name: "宜昌市"}, {
        id: 2922,
        name: "潜江市"
    }, {id: 2980, name: "天门市"}, {id: 2983, name: "仙桃市"}],
    18: [{id: 4250, name: "耒阳市"}, {id: 1482, name: "长沙市"}, {id: 1488, name: "株洲市"}, {id: 1495, name: "湘潭市"}, {
        id: 1499,
        name: "韶山市"
    }, {id: 1501, name: "衡阳市"}, {id: 1511, name: "邵阳市"}, {id: 1522, name: "岳阳市"}, {id: 1530, name: "常德市"}, {
        id: 1540,
        name: "张家界市"
    }, {id: 1544, name: "郴州市"}, {id: 1555, name: "益阳市"}, {id: 1560, name: "永州市"}, {id: 1574, name: "怀化市"}, {
        id: 1586,
        name: "娄底市"
    }, {id: 1592, name: "湘西州"}],
    19: [{id: 1601, name: "广州市"}, {id: 1607, name: "深圳市"}, {id: 1609, name: "珠海市"}, {id: 1611, name: "汕头市"}, {
        id: 1617,
        name: "韶关市"
    }, {id: 1627, name: "河源市"}, {id: 1634, name: "梅州市"}, {id: 1709, name: "揭阳市"}, {id: 1643, name: "惠州市"}, {
        id: 1650,
        name: "汕尾市"
    }, {id: 1655, name: "东莞市"}, {id: 1657, name: "中山市"}, {id: 1659, name: "江门市"}, {id: 1666, name: "佛山市"}, {
        id: 1672,
        name: "阳江市"
    }, {id: 1677, name: "湛江市"}, {id: 1684, name: "茂名市"}, {id: 1690, name: "肇庆市"}, {id: 1698, name: "云浮市"}, {
        id: 1704,
        name: "清远市"
    }, {id: 1705, name: "潮州市"}],
    20: [{id: 3168, name: "崇左市"}, {id: 1715, name: "南宁市"}, {id: 1720, name: "柳州市"}, {id: 1726, name: "桂林市"}, {
        id: 1740,
        name: "梧州市"
    }, {id: 1746, name: "北海市"}, {id: 1749, name: "防城港市"}, {id: 1753, name: "钦州市"}, {id: 1757, name: "贵港市"}, {
        id: 1761,
        name: "玉林市"
    }, {id: 1792, name: "贺州市"}, {id: 1806, name: "百色市"}, {id: 1818, name: "河池市"}, {id: 3044, name: "来宾市"}],
    21: [{id: 1827, name: "南昌市"}, {id: 1832, name: "景德镇市"}, {id: 1836, name: "萍乡市"}, {id: 1842, name: "新余市"}, {
        id: 1845,
        name: "九江市"
    }, {id: 1857, name: "鹰潭市"}, {id: 1861, name: "上饶市"}, {id: 1874, name: "宜春市"}, {id: 1885, name: "抚州市"}, {
        id: 1898,
        name: "吉安市"
    }, {id: 1911, name: "赣州市"}],
    22: [{id: 2103, name: "凉山州"}, {id: 1930, name: "成都市"}, {id: 1946, name: "自贡市"}, {id: 1950, name: "攀枝花市"}, {
        id: 1954,
        name: "泸州市"
    }, {id: 1960, name: "绵阳市"}, {id: 1962, name: "德阳市"}, {id: 1977, name: "广元市"}, {id: 1983, name: "遂宁市"}, {
        id: 1988,
        name: "内江市"
    }, {id: 1993, name: "乐山市"}, {id: 2005, name: "宜宾市"}, {id: 2016, name: "广安市"}, {id: 2022, name: "南充市"}, {
        id: 2033,
        name: "达州市"
    }, {id: 2042, name: "巴中市"}, {id: 2047, name: "雅安市"}, {id: 2058, name: "眉山市"}, {id: 2065, name: "资阳市"}, {
        id: 2070,
        name: "阿坝州"
    }, {id: 2084, name: "甘孜州"}],
    23: [{id: 3690, name: "三亚市"}, {id: 3698, name: "文昌市"}, {id: 3699, name: "五指山市"}, {id: 3701, name: "临高县"}, {
        id: 3702,
        name: "澄迈县"
    }, {id: 3703, name: "定安县"}, {id: 3704, name: "屯昌县"}, {id: 3705, name: "昌江县"}, {id: 3706, name: "白沙县"}, {
        id: 3707,
        name: "琼中县"
    }, {id: 3708, name: "陵水县"}, {id: 3709, name: "保亭县"}, {id: 3710, name: "乐东县"}, {id: 3711, name: "三沙市"}, {
        id: 2121,
        name: "海口市"
    }, {id: 3115, name: "琼海市"}, {id: 3137, name: "万宁市"}, {id: 3173, name: "东方市"}, {id: 3034, name: "儋州市"}],
    24: [{id: 2144, name: "贵阳市"}, {id: 2150, name: "六盘水市"}, {id: 2155, name: "遵义市"}, {id: 2169, name: "铜仁市"}, {
        id: 2180,
        name: "毕节市"
    }, {id: 2189, name: "安顺市"}, {id: 2196, name: "黔西南州"}, {id: 2205, name: "黔东南州"}, {id: 2222, name: "黔南州"}],
    25: [{id: 4108, name: "迪庆州"}, {id: 2235, name: "昆明市"}, {id: 2247, name: "曲靖市"}, {id: 2258, name: "玉溪市"}, {
        id: 2270,
        name: "昭通市"
    }, {id: 2281, name: "普洱市"}, {id: 2291, name: "临沧市"}, {id: 2298, name: "保山市"}, {id: 2304, name: "丽江市"}, {
        id: 2309,
        name: "文山州"
    }, {id: 2318, name: "红河州"}, {id: 2332, name: "西双版纳州"}, {id: 2336, name: "楚雄州"}, {id: 2347, name: "大理州"}, {
        id: 2360,
        name: "德宏州"
    }, {id: 2366, name: "怒江州"}],
    26: [{id: 3970, name: "阿里地区"}, {id: 3971, name: "林芝地区"}, {id: 2951, name: "拉萨市"}, {
        id: 3107,
        name: "那曲地区"
    }, {id: 3129, name: "山南地区"}, {id: 3138, name: "昌都地区"}, {id: 3144, name: "日喀则地区"}],
    27: [{id: 2428, name: "延安市"}, {id: 2442, name: "汉中市"}, {id: 2454, name: "榆林市"}, {id: 2468, name: "商洛市"}, {
        id: 2476,
        name: "安康市"
    }, {id: 2376, name: "西安市"}, {id: 2386, name: "铜川市"}, {id: 2390, name: "宝鸡市"}, {id: 2402, name: "咸阳市"}, {
        id: 2416,
        name: "渭南市"
    }],
    28: [{id: 2525, name: "庆阳市"}, {id: 2534, name: "陇南市"}, {id: 2544, name: "武威市"}, {id: 2549, name: "张掖市"}, {
        id: 2556,
        name: "酒泉市"
    }, {id: 2564, name: "甘南州"}, {id: 2573, name: "临夏州"}, {id: 3080, name: "定西市"}, {id: 2487, name: "兰州市"}, {
        id: 2492,
        name: "金昌市"
    }, {id: 2495, name: "白银市"}, {id: 2501, name: "天水市"}, {id: 2509, name: "嘉峪关市"}, {id: 2518, name: "平凉市"}],
    29: [{id: 2580, name: "西宁市"}, {id: 2585, name: "海东地区"}, {id: 2592, name: "海北州"}, {id: 2597, name: "黄南州"}, {
        id: 2603,
        name: "海南州"
    }, {id: 2605, name: "果洛州"}, {id: 2612, name: "玉树州"}, {id: 2620, name: "海西州"}],
    30: [{id: 2628, name: "银川市"}, {id: 2632, name: "石嘴山市"}, {id: 2637, name: "吴忠市"}, {id: 2644, name: "固原市"}, {
        id: 3071,
        name: "中卫市"
    }],
    31: [{id: 4110, name: "五家渠市"}, {id: 4163, name: "博尔塔拉蒙古自治州阿拉山口口岸"}, {id: 15945, name: "阿拉尔市"}, {
        id: 15946,
        name: "图木舒克市"
    }, {id: 2652, name: "乌鲁木齐市"}, {id: 2654, name: "克拉玛依市"}, {id: 2656, name: "石河子市"}, {
        id: 2658,
        name: "吐鲁番地区"
    }, {id: 2662, name: "哈密地区"}, {id: 2666, name: "和田地区"}, {id: 2675, name: "阿克苏地区"}, {
        id: 2686,
        name: "喀什地区"
    }, {id: 2699, name: "克孜勒苏州"}, {id: 2704, name: "巴音郭楞州"}, {id: 2714, name: "昌吉州"}, {
        id: 2723,
        name: "博尔塔拉州"
    }, {id: 2727, name: "伊犁州"}, {id: 2736, name: "塔城地区"}, {id: 2744, name: "阿勒泰地区"}],
    32: [{id: 2768, name: "台湾市"}],
    42: [{id: 2754, name: "香港特别行政区"}],
    43: [{id: 2770, name: "澳门市"}],
    84: [{id: 1310, name: "钓鱼岛"}]
}, JDFN_Domain = pageConfig.FN_getDomain();
for (function () {
    var b, a = $("#store-selector");
    a.hover(function () {
        var a = $(this);
        b = setTimeout(function () {
            a.addClass("hover")
        }, 500)
    }, function () {
        var a = $(this);
        a.removeClass("hover"), clearTimeout(b)
    })
}(), $("body").click(function (a) {
    for (var d, b = a.srcElement || a.target, c = [$("#store-selector").get(0)]; b;) {
        for (d = 0; d < c.length; d++)if (b == c[d])return;
        if (b === document.body)return $("#store-selector").removeClass("hover"), void 0;
        b = b.parentNode
    }
}), area = [], area_cookie = document.cookie.match(/(^| )ipLoc-djd=([^;]*)(;|$)/), area = area_cookie && area_cookie.length > 2 && "" != area_cookie[2] ? area_cookie[2].split(/\,|\-/) : params.area.split(/\,|\-/), selectedProvinceId = area[0], selectedCityId = area[1], selectedAreaId = area[2], selectedProvinceName = iplocation[selectedProvinceId]["name"], selectedProvinceName || (selectedProvinceName = iplocation[1]["name"], selectedProvinceId = 1), citysInProvince = provinceCityJson[selectedProvinceId], i = 0; i < citysInProvince.length; i++)if (selectedCityId == citysInProvince[i]["id"]) {
    selectedCityName = citysInProvince[i]["name"];
    break
}
selectedCityName || (selectedCityName = citysInProvince[0]["name"], selectedCityId = citysInProvince[0]["id"]), selectProvince(selectedProvinceId, selectedProvinceName), selectCity(selectedCityId, selectedCityName), $.ajax({
    url: "//d.jd.com/area/get?fid=" + selectedCityId + "&callback=getAreaName_callback",
    dataType: "jsonp"
}), firstTabPanel = $('#store-selector div.mc[data-area="0"] ul');
for (id in iplocation)name = iplocation[id]["name"], name.length <= 4 ? firstTabPanel.append("<li><a data-value='" + id + "' href='#none' onclick='selectProvince(" + id + ',"' + name + "\")'>" + name + "</a></li>") : firstTabPanel.append("<li class='long-area'><a data-value='" + id + "' onclick='selectProvince(" + id + ',"' + name + "\")' href='#none'>" + name + "</a></li>");
filtUrl = function (a, b) {
    var c, d;
    return a || b ? (b ? (c = a, d = b) : (c = window.location.pathname + window.location.search, d = a), c.replace(new RegExp("(^|\\?|&)" + d + "=([^&]*)", "gi"), "")) : ""
}, page_jump = function () {
    var b = $("#page_jump_num").val();
    b && (isNaN(b) && (b = 1), window.location = filtUrl(window.location.href, "page") + "&page=" + b)
};
function get_baby_info() {
    function h(b) {
        var d, e, c, f, h, i;
        b = new Date(1 * b), c = {tip: ""}, d = g > b ? b : g, e = g > b ? g : b, f = e.getYear() - d.getYear(), h = e.getMonth() - d.getMonth(), i = e.getDate() - d.getDate(), 0 > i && (i += 30, h -= 1), 0 > h && (h += 12, f -= 1), f || h || i ? g > b ? (c["status"] = "past", f ? c.tip = f + "岁" + (h ? h + "个月" : "") : (h && (c.tip = h + "个月"), i && (c.tip += i + "天"))) : (c["status"] = "future", f ? c.tip = f + "年" + (h ? h + "个月" : "") : (h && (c.tip = h + "个月"), i && (c.tip += i + "天"))) : c = {
            tip: "即将出生",
            status: "now"
        }, "now" == c["status"] ? a.find(".birthday").html('您的宝宝<em class="keytxt">即将出生</em>啦！') : "past" == c.status ? a.find(".birthday").html('您的宝宝已经<em class="keytxt">' + c.tip + "</em>啦！") : "future" == c.status && a.find(".birthday").html('您的宝宝即将在<em class="keytxt">' + c.tip + "</em>后出生！"), a.find(".birthday-edit").click(function () {
            a.removeClass("z-bb-infor-known")
        })
    }

    function i(a, b) {
        var c, d;
        return a || b ? (b ? (c = a, d = b) : (c = window.location.pathname + window.location.search, d = a), c.replace(new RegExp("(^|\\?|&)" + d + "=([^&]*)", "gi"), "")) : ""
    }

    function j(b, c) {
        var f = b + "-" + d + "-" + e + "-" + c;
        $.ajax({
            url: "//uprofile.jd.com/u/baby/setinfo?babyinfo=" + f,
            async: !0,
            dataType: "jsonp",
            success: function (d) {
                return d && 2 == d.flag ? (h(b), a.addClass("z-bb-infor-known"), a.find(".related-goods").hasClass("selected") && (window.location.href = window.location.pathname + "?" + i(SEARCH.base_url, "bb_info", b + "-" + c)), void 0) : (alert("Joy,没记住您的选择..."), void 0)
            }
        })
    }

    var b, k, a = $("#babyQueryAttr"), c = 0, d = "", e = "", f = a.find(".date-pick"), g = new Date;
    a.length && (f.attr("data-init") || (f.Jcal({
        chosendate: g.getMonth() + 1 + "/" + g.getDate() + "/" + g.getFullYear(),
        startdate: g.getMonth() + 1 + "/" + g.getDate() + "/" + (g.getFullYear() - 14),
        enddate: g.getMonth() + 1 + "/" + g.getDate() + "/" + (g.getFullYear() + 1),
        outputFormat: "{y}-{m}-{d}",
        zIndex: 10,
        x: 0,
        y: 0
    }), f.attr("data-init", "1")), $.ajax({
        url: "//uprofile.jd.com/u/baby/getinfo?callback=?",
        async: !0,
        dataType: "jsonp",
        success: function (f) {
            var g;
            return f = f.babyinfo.split("-"), f && f[0] ? (b = f[0], d = f[1], e = f[2], c = f[3] || 0, a.addClass("z-bb-infor-known"), g = new Date(1 * b), a.find(".item1 .date-pick").val(g.getFullYear() + "-" + (g.getMonth() + 1) + "-" + g.getDate()), "1" == c && a.find(".boy").addClass("checked"), "2" == c && a.find(".girl").addClass("checked"), h(f[0]), void 0) : (a.removeClass("z-bb-infor-known"), void 0)
        }
    }), $("#for_my_bb").click(function () {
        var a = window.location.href;
        $(this).hasClass("selected") ? (a = i(window.location.href, "baby"), a = i(a, "JL")) : (a = i(a, "JL"), a += "&baby=" + b + "," + c, a += "&JL=7_1_0"), window.location.href = a
    }), k = function (a) {
        seajs.use(["jdf/1.0.0/unit/login/1.0.0/login.js"], function (b) {
            b({
                clstag1: "login|keycount|5|3", clstag2: "login|keycount|5|4", modal: !0, complete: function () {
                    "function" == typeof a && a()
                }
            })
        })
    }, a.find("a.sex").click(function () {
        $(this).addClass("checked").siblings().removeClass("checked")
    }), a.find(".btn.btn-default").click(function () {
        var d = $.trim(a.find("input").val());
        return d ? a.find(".boy").hasClass("checked") || a.find(".girl").hasClass("checked") ? /^(\d{4})-(\d{1,2})-(\d{1,2})$/.test(d) ? (b = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3).getTime(), a.find(".boy").hasClass("checked") && (c = 1), a.find(".girl").hasClass("checked") && (c = 2), k(function () {
            j(b, c)
        }), $(".Jcalendar").remove(), void 0) : (alert('Joy看不懂您写的日期，请按照"年-月-日"格式书写'), void 0) : (alert("Joy需要您选择宝宝性别哦，请设置下宝宝性别吧"), void 0) : (alert("请选择宝宝出生日期"), void 0)
    }))
}
var currYear, cal;
$("#babyQueryAttr").length > 0 && (currYear = (new Date).getFullYear(), cal = $("input.date-pick").Jcal({
    chosendate: (new Date).getMonth() + 1 + "/" + (new Date).getDate() + "/" + (new Date).getFullYear(),
    startdate: "1/1/" + (currYear - 14),
    enddate: "12/31/" + (currYear + 1),
    outputFormat: "{y}-{m}-{d}",
    x: 0,
    y: 0
}), get_baby_info());