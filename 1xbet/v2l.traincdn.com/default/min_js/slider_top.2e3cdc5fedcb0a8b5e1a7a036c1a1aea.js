function _typeof(a) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(a) {
            return typeof a;
        };
    } else {
        _typeof = function _typeof(a) {
            return a && typeof Symbol === "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
        };
    }
    return _typeof(a);
}
if (typeof Vue !== "undefined") {
    var storeSliderTop = { vue: { banners: [] } };
    (function () {
        var a = {
            isHasAdvanced: function isHasAdvanced(a) {
                return typeof a.advanced_params !== "undefined";
            },
            isHasTarget: function isHasTarget(a) {
                var b = this.advancedParam(a, "is_target_blank");
                return typeof b !== "undefined" && b == true;
            },
            styleGeneratedColor: function styleGeneratedColor(a, b) {
                var c = this.advancedParam(a, "color_" + b);
                if (!c) {
                    return "";
                }
                return "color: " + c + ";";
            },
            advancedParam: function advancedParam(a, b) {
                if (!this.isHasAdvanced(a) || typeof a.advanced_params[b] === "undefined") {
                    return undefined;
                }
                return a.advanced_params[b];
            },
            advancedParamString: function advancedParamString(a, b) {
                var c = this.advancedParam(a, b);
                if (typeof c !== "string" && typeof c !== "number") {
                    return "";
                }
                return String(c);
            },
            advancedParamObject: function advancedParamObject(a, b) {
                var c = this.advancedParam(a, b);
                if (_typeof(c) !== "object") {
                    return {};
                }
                return c;
            },
            advancedParamFromObject: function advancedParamFromObject(a, b, c) {
                var d = this.advancedParamObject(a, b);
                return d[c];
            },
            textStaticT: function textStaticT(a, b) {
                var c = this.advancedParamFromObject(a, "text", "t" + b);
                if (typeof c !== "string" && typeof c !== "number") {
                    return "";
                }
                return c;
            },
        };
        Vue.component("banner", {
            props: ["banner", "index"],
            computed: {
                bannerStyle: function bannerStyle() {
                    return "background-image: url(" + this.banner.image_url + ");";
                },
                isHelptopay: function isHelptopay() {
                    return this.banner.type === 1;
                },
                isFirstindonezia: function isFirstindonezia() {
                    return this.banner.type === 2;
                },
                isKenyajackpot: function isKenyajackpot() {
                    return this.banner.type === 3;
                },
                isCredit: function isCredit() {
                    return this.banner.type === 4;
                },
                isSmsaccess: function isSmsaccess() {
                    return this.banner.type === 5;
                },
                isGenerated: function isGenerated() {
                    return this.banner.type === 6;
                },
                isSlot: function isSlot() {
                    return this.banner.type === 7;
                },
                isAdmin: function isAdmin() {
                    return this.banner.type === 8;
                },
                isArticle: function isArticle() {
                    return this.banner.type === 9;
                },
                target: function target() {
                    return a.isHasTarget(this.banner) ? "_blank" : "_self";
                },
                isGeneratedShowText: function isGeneratedShowText() {
                    var b = a.advancedParam(this.banner, "is_hide_text");
                    if (typeof b === "undefined") {
                        return false;
                    }
                    return !b;
                },
                styleGeneratedColor1: function styleGeneratedColor1() {
                    return a.styleGeneratedColor(this.banner, 1);
                },
                styleGeneratedColor2: function styleGeneratedColor2() {
                    return a.styleGeneratedColor(this.banner, 2);
                },
                styleGeneratedColor3: function styleGeneratedColor3() {
                    return a.styleGeneratedColor(this.banner, 3);
                },
                styleGeneratedColor4: function styleGeneratedColor4() {
                    return a.styleGeneratedColor(this.banner, 4);
                },
                generatedText1: function generatedText1() {
                    return a.advancedParamString(this.banner, "text_1");
                },
                generatedText2: function generatedText2() {
                    return a.advancedParamString(this.banner, "text_2");
                },
                generatedText3: function generatedText3() {
                    return a.advancedParamString(this.banner, "text_3");
                },
                generatedText4: function generatedText4() {
                    return a.advancedParamString(this.banner, "text_4");
                },
                buttonText: function buttonText() {
                    return a.advancedParamString(this.banner, "button_text");
                },
                additionalButtonText: function additionalButtonText() {
                    return a.advancedParamString(this.banner, "additional_button_text");
                },
                additionalHref: function additionalHref() {
                    return a.advancedParamString(this.banner, "additional_href");
                },
                headText: function headText() {
                    return a.advancedParamString(this.banner, "head_text");
                },
                bodyTitleText: function bodyTitleText() {
                    return a.advancedParamString(this.banner, "body_title_text");
                },
                bodyText: function bodyText() {
                    return a.advancedParamString(this.banner, "body_text");
                },
                kenyaJackpot: function kenyaJackpot() {
                    return a.advancedParam(this.banner, "jackpot");
                },
                isHasTextStatic: function isHasTextStatic() {
                    var b = a.advancedParamObject(this.banner, "text");
                    return !$.isEmptyObject(b);
                },
                textClassStatic: function textClassStatic() {
                    return a.advancedParamString(this.banner, "text_class");
                },
                textStaticT1: function textStaticT1() {
                    return a.textStaticT(this.banner, 1);
                },
                textStaticT2: function textStaticT2() {
                    return a.textStaticT(this.banner, 2);
                },
                textStaticT3: function textStaticT3() {
                    return a.textStaticT(this.banner, 3);
                },
                textStaticT4: function textStaticT4() {
                    return a.textStaticT(this.banner, 4);
                },
                title: function title() {
                    return a.advancedParamString(this.banner, "title");
                },
                description: function description() {
                    return a.advancedParamString(this.banner, "description");
                },
                event: function event() {
                    return a.advancedParamObject(this.banner, "event");
                },
            },
            methods: {
                onClick: function onClick(b, c) {
                    var d;
                    var e;
                    this.$analytics.topSlider.clickOnBanner((c === null || c === void 0 ? void 0 : c.href) || ((d = this.banner) === null || d === void 0 ? void 0 : d.href));
                    if (this.isCredit || this.isSlot) {
                        e = a.advancedParam(this.banner, "click_url");
                    } else {
                        var f = $(b.target);
                        if (f.length > 0) {
                            e = f[0].pathname;
                        }
                    }
                    if (typeof e !== "undefined") {
                        var g = a.advancedParam(this.banner, "analytics_data");
                    }
                    if (this.isSmsaccess) {
                        Popup.init("smsAccess");
                    }
                },
            },
            template: "#banner_tmpl",
        });
    })();
    (function () {
        var a = function typical_slider(a, b, c, d) {
            var e = function SliderTop(a, b, c, d) {
                var e = this;
                this.is_need_to_build_slider = false;
                this.update_url = typeof d !== "undefined" && typeof d.update_url !== "undefined" ? d.update_url : "";
                var f = function cacheImage(a) {
                    var b = $.Deferred();
                    $("<img/>")
                        .attr("src", a)
                        .on("load", function () {
                            $(this).remove();
                            b.resolve();
                        })
                        .on("error", function () {
                            $(this).remove();
                            b.resolve();
                        });
                    return b;
                };
                var g = function cacheImages(a) {
                    var b = [];
                    a.forEach(function (a) {
                        if (typeof a.image_url !== "undefined") {
                            b.push(f(a.image_url));
                        }
                    });
                    var c;
                    if (b.length > 0) {
                        c = $.when.apply($, b);
                    } else {
                        c = $.Deferred();
                        c.resolve();
                    }
                    return c;
                };
                var h = [];
                var i = function cacheRemainingImagesAndAddToBanners() {
                    var b = g(h);
                    b.always(function () {
                        $.Slider().destoy();
                        var b = a.vue.banners;
                        e.is_need_to_build_slider = false;
                        a.vue.banners = [];
                        setTimeout(function () {
                            e.is_need_to_build_slider = true;
                            a.vue.banners = b.concat(h);
                        }, 1);
                    });
                };
                this.loadBanners = function () {
                    return $.getJSON("/site/getbanners/index.json" + this.update_url, function (b) {
                        var c = g(b.initial);
                        c.always(function () {
                            e.is_need_to_build_slider = true;
                            a.vue.banners = b.initial;
                            h = b.remaining;
                            if (typeof h.length !== "undefined" && h.length > 0) {
                                a.if_need_load_remaining = $.Deferred();
                                a.if_need_load_remaining.always(function () {
                                    i();
                                });
                            }
                        });
                    });
                };
            };
            var f = new e(a, b, c, d);
            Vue.component(b, {
                data: function data() {
                    return a.vue;
                },
                updated: function updated() {
                    if (f.is_need_to_build_slider) {
                        if (a.index === undefined) {
                            $.Slider().build(true, d.selector);
                        } else {
                            $.Slider().buildAfterRemaining();
                            $.Slider().slideTo(a.index - 1);
                        }
                    }
                },
                created: function created() {
                    f.loadBanners();
                },
                template: "#slider_top_tmpl",
            });
        };
        a(storeSliderTop, "slider_top", "#slider_top", { update_url: "", selector: ".topAccordSlider" });
        if ([65, 95, 107, 157, 173, 189, 223, 247, 291, 293].indexOf(window.CONFIG.ref_id) !== -1) {
            $(function () {
                var a = new Vue({ el: "#slider_top" });
            });
        }
    })();
}