var w3_lazy_load_by_px = 80;
var blank_image_webp_url = "https://eadn-wc01-10771960.nxedge.io/media/w3-cache/blank.pngw3.webp";
var google_fonts_delay_load = 100;
var w3_upload_path = "https://eadn-wc01-10771960.nxedge.io/media";
var w3_webp_path = "/w3-webp/media";
var w3_mousemoveloadimg = false;
var w3_page_is_scrolled = false;
var w3_lazy_load_js = 1;
var w3_js_is_excluded = 0;
var w3_excluded_js = 0;
class w3_loadscripts {
    constructor(e) {
        this.triggerEvents = e, this.eventOptions = {
            passive: !0
        }, this.userEventListener = this.triggerListener.bind(this), this.lazy_trigger, this.style_load_fired, this.lazy_scripts_load_fired = 0, this.scripts_load_fired = 0, this.scripts_load_fire = 0, this.excluded_js = w3_excluded_js, this.w3_lazy_load_js = w3_lazy_load_js, this.w3_fonts = "undefined" != typeof w3_googlefont ? w3_googlefont : [], this.w3_styles = [], this.w3_scripts = {
            normal: [],
            async: [],
            defer: [],
            lazy: []
        }, this.allJQueries = []
    }
    user_events_add(e) {
        this.triggerEvents.forEach(t => window.addEventListener(t, e.userEventListener, e.eventOptions))
    }
    user_events_remove(e) {
        this.triggerEvents.forEach(t => window.removeEventListener(t, e.userEventListener, e.eventOptions))
    }
    triggerListener_on_load() {
        "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", this.load_resources.bind(this)) : this.load_resources()
    }
    triggerListener() {
        this.user_events_remove(this), this.lazy_scripts_load_fired = 1, this.add_html_class("w3_user"), "loading" === document.readyState ? (document.addEventListener("DOMContentLoaded", this.load_style_resources.bind(this)), this.scripts_load_fire || document.addEventListener("DOMContentLoaded", this.load_resources.bind(this))) : (this.load_style_resources(), this.scripts_load_fire || this.load_resources())
    }
    async load_style_resources() {
        !this.style_load_fired && (this.style_load_fired = !0, this.register_styles(), document.getElementsByTagName("html")[0].setAttribute("data-css", this.w3_styles.length), document.getElementsByTagName("html")[0].setAttribute("data-css-loaded", 0), this.preload_scripts(this.w3_styles), this.load_styles_preloaded())
    }
    async load_styles_preloaded() {
        setTimeout(function(e) {
            document.getElementsByTagName("html")[0].classList.contains("css-preloaded") ? e.load_styles(e.w3_styles) : e.load_styles_preloaded()
        }, 200, this)
    }
    async load_resources() {
        !this.scripts_load_fired && (this.scripts_load_fired = !0, this.hold_event_listeners(), this.exe_document_write(), this.register_scripts(), this.add_html_class("w3_start"), "function" == typeof w3_events_on_start_js && w3_events_on_start_js(), this.preload_scripts(this.w3_scripts.normal), this.preload_scripts(this.w3_scripts.defer), this.preload_scripts(this.w3_scripts.async), await this.load_scripts(this.w3_scripts.normal), await this.load_scripts(this.w3_scripts.defer), await this.load_scripts(this.w3_scripts.async), await this.execute_domcontentloaded(), await this.execute_window_load(), window.dispatchEvent(new Event("w3-scripts-loaded")), this.add_html_class("w3_js"), "function" == typeof w3_events_on_end_js && w3_events_on_end_js(), this.lazy_trigger = setInterval(this.w3_trigger_lazy_script, 500, this))
    }
    async w3_trigger_lazy_script(e) {
        e.lazy_scripts_load_fired && (await e.load_scripts(e.w3_scripts.lazy), e.add_html_class("jsload"), clearInterval(e.lazy_trigger))
    }
    add_html_class(e) {
        document.getElementsByTagName("html")[0].classList.add(e)
    }
    register_scripts() {
        document.querySelectorAll("script[type=lazyload_int]").forEach(e => {
            e.hasAttribute("data-src") ? e.hasAttribute("async") && !1 !== e.async ? this.w3_scripts.async.push(e) : e.hasAttribute("defer") && !1 !== e.defer || "module" === e.getAttribute("data-w3-type") ? this.w3_scripts.defer.push(e) : this.w3_scripts.normal.push(e) : this.w3_scripts.normal.push(e)
        }), document.querySelectorAll("script[type=lazyload_ext]").forEach(e => {
            this.w3_scripts.lazy.push(e)
        })
    }
    register_styles() {
        document.querySelectorAll("link[data-href]").forEach(e => {
            this.w3_styles.push(e)
        })
    }
    async execute_script(e) {
        return await this.repaint_frame(), new Promise((t, s) => {
            let a = document.createElement("script"),
                i = !1;
            [...e.attributes].forEach(e => {
                let t = e.nodeName;
                "type" !== t && "data-src" !== t && ("data-w3-type" === t && (t = "type", i = "module" === e.nodeValue), a.setAttribute(t, e.nodeValue))
            }), e.hasAttribute("data-src") ? (a.setAttribute("src", e.getAttribute("data-src")), a.addEventListener("load", t), a.addEventListener("error", t => {
                console.error(`Failed to load script: ${e.getAttribute("data-src")}`, t), s(t)
            })) : (a.text = e.text, t()), e.parentNode && e.parentNode.replaceChild(a, e)
        })
    }
    async execute_styles(e) {
        return function(e) {
            let t = document.createElement("link");
            t.href = e.getAttribute("data-href"), t.rel = "stylesheet", e.parentNode.replaceChild(t, e)
        }(e)
    }
    async load_scripts(e) {
        let t = e.shift();
        return t ? (await this.execute_script(t), this.load_scripts(e)) : Promise.resolve()
    }
    async load_styles(e) {
        let t = e.shift();
        return t ? (this.execute_styles(t), this.load_styles(e)) : "loaded"
    }
    async load_fonts(e) {
        var t = document.createDocumentFragment();
        e.forEach(e => {
            let s = document.createElement("link");
            s.href = e, s.rel = "stylesheet", t.appendChild(s)
        }), setTimeout(function() {
            document.head.appendChild(t)
        }, google_fonts_delay_load)
    }
    preload_scripts(e) {
        var t = document.createDocumentFragment(),
            s = 0,
            a = this;
        [...e].forEach(i => {
            let r = i.getAttribute("data-src"),
                n = i.getAttribute("data-href");
            if (r) {
                let d = document.createElement("link");
                d.href = r, d.rel = "preload", d.as = "script", t.appendChild(d)
            } else if (n) {
                let l = document.createElement("link");
                l.href = n, l.rel = "preload", l.as = "style", s++, e.length == s && (l.dataset.last = 1), t.appendChild(l), l.onload = function() {
                    fetch(this.href).then(e => e.blob()).then(e => {
                        a.update_css_loader()
                    }).catch(e => {
                        a.update_css_loader()
                    })
                }, l.onerror = function() {
                    a.update_css_loader()
                }
            }
        }), document.head.appendChild(t)
    }
    update_css_loader() {
        document.getElementsByTagName("html")[0].setAttribute("data-css-loaded", parseInt(document.getElementsByTagName("html")[0].getAttribute("data-css-loaded")) + 1), document.getElementsByTagName("html")[0].getAttribute("data-css") == document.getElementsByTagName("html")[0].getAttribute("data-css-loaded") && document.getElementsByTagName("html")[0].classList.add("css-preloaded")
    }
    hold_event_listeners() {
        let e = {};

        function t(t, s) {
            ! function(t) {
                function s(s) {
                    return e[t].eventsToRewrite.indexOf(s) >= 0 ? "w3-" + s : s
                }
                e[t] || (e[t] = {
                    originalFunctions: {
                        add: t.addEventListener,
                        remove: t.removeEventListener
                    },
                    eventsToRewrite: []
                }, t.addEventListener = function() {
                    arguments[0] = s(arguments[0]), e[t].originalFunctions.add.apply(t, arguments)
                }, t.removeEventListener = function() {
                    arguments[0] = s(arguments[0]), e[t].originalFunctions.remove.apply(t, arguments)
                })
            }(t), e[t].eventsToRewrite.push(s)
        }

        function s(e, t) {
            let s = e[t];
            Object.defineProperty(e, t, {
                get: () => s || function() {},
                set(a) {
                    e["w3" + t] = s = a
                }
            })
        }
        t(document, "DOMContentLoaded"), t(window, "DOMContentLoaded"), t(window, "load"), t(window, "pageshow"), t(document, "readystatechange"), s(document, "onreadystatechange"), s(window, "onload"), s(window, "onpageshow")
    }
    hold_jquery(e) {
        let t = window.jQuery;
        Object.defineProperty(window, "jQuery", {
            get: () => t,
            set(s) {
                if (s && s.fn && !e.allJQueries.includes(s)) {
                    s.fn.ready = s.fn.init.prototype.ready = function(t) {
                        if (void 0 !== t) return e.scripts_load_fired ? e.domReadyFired ? t.bind(document)(s) : document.addEventListener("w3-DOMContentLoaded", () => t.bind(document)(s)) : t.bind(document)(s), s(document)
                    };
                    let a = s.fn.on;
                    s.fn.on = s.fn.init.prototype.on = function() {
                        if ("ready" == arguments[0]) {
                            if (this[0] !== document) return a.apply(this, arguments), this;
                            arguments[1].bind(document)(s)
                        }
                        if (this[0] === window) {
                            function e(e) {
                                return e.split(" ").map(e => "load" === e || 0 === e.indexOf("load.") ? "w3-jquery-load" : e).join(" ")
                            }
                            "string" == typeof arguments[0] || arguments[0] instanceof String ? arguments[0] = e(arguments[0]) : "object" == typeof arguments[0] && Object.keys(arguments[0]).forEach(t => {
                                Object.assign(arguments[0], {
                                    [e(t)]: arguments[0][t]
                                })[t]
                            })
                        }
                        return a.apply(this, arguments), this
                    }, e.allJQueries.push(s)
                }
                t = s
            }
        })
    }
    async execute_domcontentloaded() {
        this.domReadyFired = !0, await this.repaint_frame(), document.dispatchEvent(new Event("w3-DOMContentLoaded")), await this.repaint_frame(), window.dispatchEvent(new Event("w3-DOMContentLoaded")), await this.repaint_frame(), document.dispatchEvent(new Event("w3-readystatechange")), await this.repaint_frame(), document.w3onreadystatechange && document.w3onreadystatechange()
    }
    async execute_window_load() {
        await this.repaint_frame(), setTimeout(function() {
            window.dispatchEvent(new Event("w3-load"))
        }, 100), await this.repaint_frame(), window.w3onload && window.w3onload(), await this.repaint_frame(), this.allJQueries.forEach(e => e(window).trigger("w3-jquery-load")), window.dispatchEvent(new Event("w3-pageshow")), await this.repaint_frame(), window.w3onpageshow && window.w3onpageshow()
    }
    exe_document_write() {
        let e = new Map;
        document.write = document.writeln = function(t) {
            let s = document.currentScript,
                a = document.createRange(),
                i = s.parentElement,
                r = e.get(s);
            void 0 === r && (r = s.nextSibling, e.set(s, r));
            let n = document.createDocumentFragment();
            a.setStart(n, 0), n.appendChild(a.createContextualFragment(t)), i.insertBefore(n, r)
        }
    }
    async repaint_frame() {
        return new Promise(e => requestAnimationFrame(e))
    }
    static execute() {
        let e = new w3_loadscripts(["keydown", "mousemove", "touchmove", "touchstart", "touchend", "wheel"]);
        e.load_fonts(e.w3_fonts), e.user_events_add(e), e.excluded_js || e.hold_jquery(e), e.w3_lazy_load_js || (e.scripts_load_fire = 1, e.triggerListener_on_load());
        let t = setInterval(function e(s) {
            null != document.body && (document.body.getBoundingClientRect().top < -30 && s.triggerListener(), clearInterval(t))
        }, 500, e)
    }
}
w3_loadscripts.execute();