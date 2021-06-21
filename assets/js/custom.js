"use strict";

function slider() {
    var u = $(".main-slider"),
        i = $(".nav-slider"),
        f = new TimelineLite;
    return {
        isDemoSlide: function() { return u.hasClass("demo-3") },
        initSlider: function() {
            var e = u.find(".slide-item"),
                a = u.find(".dsn-slider-content > .container"),
                o = this,
                s = [];
            e.each(function(e) {
                var t = $(this);
                t.attr("data-dsn-id", e);
                var n = $(this).find(".slide-content");
                n.attr("data-dsn-id", e), 0 === e && n.addClass("dsn-active dsn-active-cat"), a.append(n);
                var i = n.find(".title a");
                o.isDemoSlide() || s.push(o.nextSlide(i.text(), n.find(".metas").html(), $(this).find(".image-bg").clone())), dsnGrid.convertTextLine(i, i), t = n = i = null
            }), o.isDemoSlide() || (s.push(s.shift()), $(".box-next > .swiper-wrapper").append(s)), s = o = a = e = null
        },
        swiperObject: function(e) {
            var t = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            return new Swiper(".main-slider .slide-inner", {
                speed: 1500,
                grabCursor: !0,
                allowTouchMove: !0,
                direction: t ? "vertical" : "horizontal",
                slidesPerView: e ? "auto" : 1,
                centeredSlides: e,
                slideToClickedSlide: e,
                loop: u.hasClass("has-loop"),
                pagination: { el: ".main-slider .dsn-controls .dsn-numbers span:not(.full-number)", type: "custom", clickable: !0, renderCustom: function(e, t, n) { return $(".main-slider .dsn-controls .dsn-numbers span.full-number").html(dsnGrid.numberText(n)), TweenLite.to(".main-slider .dsn-controls .dsn-progress .dsn-progress-indicator", 1, { height: t / n * 100 + "%" }), dsnGrid.numberText(t) } },
                spaceBetween: 50,
                on: {
                    init: function() { this.autoplay.stop(), u.find('[data-dsn="video"] video').each(function() { this.pause() }) },
                    imagesReady: function() {
                        var e = $(this.slides[this.activeIndex]).find('[data-dsn="video"] video');
                        e.length && e.get(0).play(), e = null
                    }
                }
            })
        },
        progress: function(e) {
            var s = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            e.on("progress", function() {
                for (var e = this, t = 0; t < e.slides.length; t++) {
                    var n = e.slides[t].progress,
                        i = .5 * (s ? e.height : e.width),
                        a = n * i,
                        o = s ? "Y" : "X";
                    e.slides[t].querySelector(".image-bg").style.transform = "translate" + o + "(" + a + "px) skew" + o + "(" + a / 50 + "deg)", a = o = i = n = null
                }
                e = null
            })
        },
        touchStart: function(e) { e.on("touchStart", function() { $(this.slides).css("transition", "") }) },
        setTransition: function(e) { e.on("setTransition", function(e) { $(this.slides).find(".image-bg").css("transition", e - 100 + "ms  ") }) },
        slideChange: function(d) {
            var c = this;
            d.on("slideChange", function() {
                var e = u.find(".dsn-slider-content .dsn-active"),
                    t = e.data("dsn-id"),
                    n = $(d.slides[d.activeIndex]),
                    i = n.data("dsn-id");
                if (t !== i) {
                    u.find('[data-dsn="video"] video').each(function() { this.pause() });
                    var a = $(this.slides[this.activeIndex]).find('[data-dsn="video"] video');
                    a.length && a.get(0).play();
                    var o = e.find(".dsn-chars-wrapper");
                    e.removeClass("dsn-active-cat");
                    var s = u.find('.dsn-slider-content [data-dsn-id="' + i + '"]'),
                        r = s.find(".dsn-chars-wrapper"),
                        l = i < t;
                    f.progress(1), (f = new TimelineLite).staggerFromTo(o, .3, c.showText().title, c.hideText(l).title, .05, 0, function() { u.find(".dsn-slider-content .slide-content").removeClass("dsn-active").removeClass("dsn-active-cat"), s.addClass("dsn-active"), s.addClass("dsn-active-cat") }), f.staggerFromTo(dsnGrid.randomObjectArray(r, .8), .8, c.hideText(!l).title, c.showText().title, .05, "-=.1"), e = t = n = i = a = o = r = l = null
                }
            })
        },
        showText: function() { return { title: { autoAlpha: 1, y: "0%", scale: 1, rotation: 0, ease: Back.easeOut.config(4), yoyo: !0 }, subtitle: { autoAlpha: 1, y: "0%", ease: Elastic.easeOut } } },
        hideText: function(e) { return { title: { autoAlpha: 0, y: e ? "20%" : "-20%", rotation: 8, ease: Back.easeIn.config(4), yoyo: !0 }, subtitle: { autoAlpha: 0, y: e ? "50%" : "-50%", ease: Elastic.easeOut } } },
        nextSlide: function(e, t, n) { return ' <div class="swiper-slide">\n                    <div class="d-flex a-item-center h-100">\n                        <div class="content-box-next">\n                            <span>Next</span>\n                            <h3 class="title-next">' + e + '</h3>\n                            <div class="metas">\n' + t + '                            </div>\n                        </div>\n                        <div class="img-box-next p-relative h-100 overflow-hidden">\n' + n.addClass("p-absolute").removeClass("hidden").get(0).outerHTML + '                            <div class="arrow v-middle">\n                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"\n                                     x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve" class="">\n                            <g>\n                                <g>\n                                    <g>\n                                        <path\n                                                d="M508.875,248.458l-160-160c-4.167-4.167-10.917-4.167-15.083,0c-4.167,4.167-4.167,10.917,0,15.083l141.792,141.792    H10.667C4.771,245.333,0,250.104,0,256s4.771,10.667,10.667,10.667h464.917L333.792,408.458c-4.167,4.167-4.167,10.917,0,15.083    c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125l160-160C513.042,259.375,513.042,252.625,508.875,248.458z    "\n                                                data-original="#000000" class="active-path" data-old_color="#000000"\n                                                fill="#FFFFFF"/>\n                                    </g>\n                                </g>\n                            </g>\n                        </svg>\n                            </div>\n                        </div>\n                    </div>\n                </div>' },
        run: function() {
            if (!(u.length <= 0)) {
                var e = u.hasClass("has-horizontal");
                this.initSlider();
                var t = this.swiperObject(this.isDemoSlide(), !e);
                if (this.isDemoSlide() || (this.progress(t, !e), this.touchStart(t), this.setTransition(t)), this.slideChange(t), this.isDemoSlide() && !u.hasClass("has-loop") && t.slideTo(1), i.length <= 0 || this.isDemoSlide()) t = null;
                else {
                    var n = new Swiper(".nav-slider", { speed: 1500, centeredSlides: !0, touchRatio: .2, slideToClickedSlide: !0, direction: e ? "horizontal" : "vertical", resistanceRatio: .65, spaceBetween: 10, loop: u.hasClass("has-loop") });
                    (t.controller.control = n).controller.control = t, this.progress(n, !e), this.setTransition(n), i.on("click", function() { f.isActive() || (n.slides.length === n.activeIndex + 1 ? t.slideTo(0) : t.slideNext()) }), i = null
                }
            }
        }
    }
}

function data_overlay() {
    $("[data-overlay-color]").each(function(e) {
        var t = $(this),
            n = dsnGrid.removeAttr(t, "data-overlay-color");
        t.addClass("dsn-overlay-" + e), $("body").append("<style>.dsn-overlay-" + e + "[data-overlay]:before{background: " + n + ";}</style>")
    })
}

function background() { $(".cover-bg, section , [data-image-src]").each(function() { var e = $(this).attr("data-image-src"); "undefined" !== (void 0 === e ? "undefined" : _typeof(e)) && !1 !== e && $(this).css("background-image", "url(" + e + ")") }) }

function initMap() {
    toggleButton();
    var o = $(".map-custom");
    if (o.length) {
        if (!$("#map_api").length) {
            var e = "AIzaSyA5bpEs3xlB8vhxNFErwoo3MXR64uavf6Y",
                t = document.createElement("script");
            t.type = "text/javascript", t.id = "map_api", t.src = "https://maps.googleapis.com/maps/api/js?key=" + e, document.body.appendChild(t), e = t = null
        }
        setTimeout(function() {
            try {
                var e = o.data("dsn-lat"),
                    t = o.data("dsn-len"),
                    n = o.data("dsn-zoom"),
                    i = new google.maps.LatLng(e, t),
                    a = new google.maps.Map(o.get(0), { center: { lat: e, lng: t }, mapTypeControl: !1, scrollwheel: !1, draggable: !0, streetViewControl: !1, navigationControl: !1, zoom: n, styles: [{ featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }, { lightness: 17 }] }, { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 20 }] }, { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }, { lightness: 17 }] }, { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: .2 }] }, { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 18 }] }, { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 16 }] }, { featureType: "poi", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 21 }] }, { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dedede" }, { lightness: 21 }] }, { elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }] }, { elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }] }, { elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { featureType: "transit", elementType: "geometry", stylers: [{ color: "#f2f2f2" }, { lightness: 19 }] }, { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#fefefe" }, { lightness: 20 }] }, { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }] }] });
                google.maps.event.addDomListener(window, "resize", function() {
                    var e = a.getCenter();
                    google.maps.event.trigger(a, "resize"), a.setCenter(e), e = null
                }), new google.maps.Marker({ position: i, animation: google.maps.Animation.BOUNCE, icon: "assets/img/map-marker.png", title: "ASL", map: a }), e = t = n = i = null
            } catch (e) { console.log(e) }
        }, 100)
    } else o = null
}

function toggleButton() {
    $(".image-head-contact").each(function() {
        var e = new TimelineLite({ paused: !0 });
        e.to($(this).find(".box-overlay"), .5, { autoAlpha: 0 }), e.staggerTo($(this).find(".contact-info-item"), .8, { y: 20, autoAlpha: 0, ease: Back.easeInOut.config(4) }, .3, 0), e.to($(this).find(".box-text"), .5, { autoAlpha: 0 }, "-=0.5"), e.reverse(), $(this).find('input[type="checkbox"]').off("change"), $(this).find('input[type="checkbox"]').on("change", function() { e.reversed(!e.reversed()) })
    })
}

function services_tab(e) {
    e && $(".services-about .link-click").off("click"), $(".services-about").each(function() {
        var e = $(this);
        e.on("click", ".link-click", function() { $(this).addClass("active").siblings().removeClass("active"), e.find("#" + $(this).attr("id") + "-content").fadeIn(1e3).siblings().hide() })
    })
}

function contactValidator() {
    var a = $("#contact-form");
    a < 1 || (a.validator(), a.on("submit", function(e) {
        if (!e.isDefaultPrevented()) {
            return $.ajax({
                type: "POST",
                url: "contact.php",
                data: $(this).serialize(),
                success: function(e) {
                    var t = "alert-" + e.type,
                        n = e.message,
                        i = '<div class="alert ' + t + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + n + "</div>";
                    t && n && (a.find(".messages").html(i), a[0].reset()), setTimeout(function() { a.find(".messages").html("") }, 3e3)
                },
                error: function(e) { console.log(e) }
            }), !1
        }
    }))
}
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e };
! function(f) {
    function n(e) {
        f("[data-dsn-bg]").each(function() {
                var e = dsnGrid.getData(this, "bg"),
                    t = dsnGrid.getData(this, "color");
                e && f(this).css("background-color", e), e && (f(this).css("color", t), f(this).addClass("section-dsn-color")), e = null
            }), C.start(), S.allInt(), slider().run(), f(".gallery-portfolio").each(function() {
                var e = f(this);
                e.justifiedGallery({ rowHeight: 300, margins: 15 });
                var t = e.parents(".work-masonry").find(".filterings-t");
                t.length && (t.find("button").off("click"), t.find("button").on("click", function() {
                    f(this).addClass("active").siblings().removeClass("active");
                    var i = f(this).data("filter");
                    e.justifiedGallery({ filter: function(e, t, n) { return f(e).is(i) ? TweenLite.to(e, .6, { scale: 1, ease: Back.easeOut.config(1.2), delay: .1 * t }) : TweenLite.to(e, .1, { scale: 0, ease: Back.easeIn.config(1.2) }), f(e).is(i) } }), i = null
                })), t = null
            }), d(),
            function() {
                var e = { delegate: "a:not(.effect-ajax)", type: "image", closeOnContentClick: !1, closeBtnInside: !1, mainClass: "mfp-with-zoom", gallery: { enabled: !0 }, zoom: { enabled: !0, duration: 400, easing: "cubic-bezier(0.36, 0, 0.66, -0.56)", opener: function(e) { return e.find("img") } }, callbacks: { open: function() { f("html").css({ margin: 0 }) }, close: function() {} } };
                f(".gallery-portfolio").each(function() { f(this).magnificPopup(e) }), f(".has-popup .pop-up").length && (e.delegate = "a.pop-up");
                f(".has-popup").magnificPopup(e)
            }(), f("a.vid").YouTubePopUp(), l().ajaxLoad(), data_overlay(), background(), initMap(), r(e),
            function() {
                var s = f(".button-loadmore");
                if (!s.length) return;
                s.off("click"), s.on("click", function() {
                    var e = f(this).attr("data-page"),
                        t = f(this).attr("data-layout"),
                        n = s.find(".dsn-load-progress-ajax"),
                        i = s.find(".progress-text.progress-load-more"),
                        a = s.find(".progress-text.progress-no-more"),
                        o = i.text();
                    f(this).attr("data-page", parseInt(e, 10) + 1), f.ajax({
                        url: "ajax/" + t + "-" + e + ".html",
                        beforeSend: function() { s.addClass("dsn-loading") },
                        success: function(e) { e = f(e).filter(".work-item-box"), TweenLite.fromTo(e, 1, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.7) }), s.prev().append(e), s.removeClass("dsn-loading"), n.css("width", 0), s.find(".progress-text.progress-load-more").text(o), a.hide(), setTimeout(function() { S.parallaxImg(), r(!0), l().ajaxLoad(), d(), c(!0) }, 100) },
                        error: function(e) { s.removeClass("dsn-loading"), n.css("width", 0), i.text(o), a.hide(), s.off("click"), i.hide(), a.show() },
                        xhrFields: {
                            onprogress: function(e) {
                                if (e.lengthComputable) {
                                    var t = e.loaded / e.total * 100;
                                    n.css("width", t + "%"), i.text(t + "%")
                                }
                            }
                        }
                    }).done(function() { e = t = n = i = a = o = null })
                })
            }(), G.run(), c(e),
            function(e) {
                var t = f(".accordion__question");
                if (!t.length) return t = null;
                e && t.off("click");
                t.on("click", function() {
                    var e = f(this).next();
                    f(".accordion__answer").not(e).slideUp(400), f(".accordion__question").not(this).removeClass("expanded"), f(this).toggleClass("expanded"), e.slideToggle(400), e = null
                })
            }(e), services_tab(e), contactValidator(), f(".embed-3d-dimensions").on("click", function(e) { f(this).toggleClass("active-3d-dimensions") }), f('[data-dsn-cutter="html"]').each(function() { dsnGrid.getData(this, "cutter"), dsnGrid.cutterHtml(this) }), f("[data-dsn-position]").each(function() { "IMG" === this.nodeName ? f(this).css("object-position", dsnGrid.getData(this, "position", "center")) : f(this).css("background-position", dsnGrid.getData(this, "position", "center")) }), setTimeout(function() {
                f('a[href="#"]').on("click", function(e) { e.preventDefault() }), f('[href*="#"]:not([href="#"])').on("click", function(e) {
                    e.preventDefault();
                    var t = f(f(this).attr("href"));
                    if (!t.length) return t = null, !1;
                    dsnGrid.scrollTop(t.get(0).offsetTop, 1, -100), t = null
                }), window.location.hash.length && (p.scrollTop(0), dsnGrid.scrollTop(window.location.hash, 1, -100)), S.dsnScrollTop(), e ? k && (k.t1.kill(), k.t2.kill(), f(".site-header").css({ paddingTop: "", paddingBottom: "", backgroundColor: "", top: "" }), k = t()) : k = t()
            }, 500)
    }

    function r(t) {
        var e = f(".filterings"),
            n = f(".filters-content"),
            i = void 0;
        t && e.off("click"), e.on("click", function() {
            (i = new TimelineLite).set(n, { y: "0%" }), i.to(n, 1, { autoAlpha: 1 }), i.staggerFromTo(n.find("button"), .4, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: Back.easeOut.config(1.7) }, .1), dsnGrid.scrollTop(".work-inner", 1)
        }), t && n.find("> .close-wind").off("click"), n.find("> .close-wind").on("click", function() { i.reverse(), i.call(function() { i = null }) }), t && n.find("button").off("click"), n.find("button").on("click", function() { f(this).siblings().removeClass("active"), TweenMax.to(this, .5, { css: { className: "+=active" }, ease: Back.easeOut.config(1.7) }), f(".projects-list").isotope({ filter: f(this).attr("data-filter") }) }), f(".projects-list , .our-work").find("video").each(function() {
            this.pause();
            var e = f(this);
            t && e.off("mouseenter").off("mouseleave"), e.parents(".work-item").on("mouseenter", function() { f(this).find("video").get(0).play() }).on("mouseleave", function() { f(this).find("video").get(0).pause() }), e = null
        })
    }

    function l() {
        var t = "main.main-root",
            r = '[data-dsn-ajax="img"]',
            l = void 0,
            d = void 0,
            c = new TimelineLite;
        return {
            mainRoot: f(t),
            ajaxClick: f("a.effect-ajax "),
            effectAjax: function(e) {
                if (e) g.addClass("dsn-ajax-effect");
                else {
                    if (!1 !== e) return g.hasClass("dsn-ajax-effect");
                    g.removeClass("dsn-ajax-effect")
                }
            },
            setTitle: function(e) {
                var t = e.match(/<title[^>]*>(.+)<\/title>/);
                t && f("head title").html(t[1]), t = null
            },
            setBodyClass: function(e) {
                var t = e.match(/<body[^>]*class="(.+)">/);
                t && g.attr("class", t[1]), t = null
            },
            ajaxNormal: function() {
                var e = f('<div class="dsn-ajax-loader dsn-ajax-normal"></div>');
                g.append(e), c.to(e, .5, { scaleY: 1, ease: Circ.easeIn }, 0), e = null
            },
            ajaxSlider: function(e) {
                var t = e.parents(".slide-content"),
                    n = t.data("dsn-id"),
                    i = f('.main-slider .slide-item[data-dsn-id="' + n + '"] .cover-bg').first(),
                    a = t.find(".title");
                i.removeClass("hidden"), this.dsnCreateElement(i, f(".bg-container"), a, a.find("a"))
            },
            ajaxNextProject: function(e) {
                var t = e.parents(".next-project"),
                    n = t.find(".img-next-box"),
                    i = t.find(".title");
                t.addClass("dsn-active"), this.dsnCreateElement(n, t, i, i.find("a")), t = n = i = null
            },
            ajaxWork: function(e) {
                var t = e.parents(".work-item"),
                    n = t.find(".img-next-box"),
                    i = t.find("h4").addClass("dsn-cutter");
                i.addClass("fw-600"), n.addClass("before-z-index"), t.addClass("dsn-active"), this.dsnCreateElement(n, t, i, i.find("a")), c.to(l.find("img"), 1, { height: "100%", top: "0%", y: "0" }), t = n = i = null
            },
            addElement: function(e, t, n) {
                if (!(void 0 === t || t.length <= 0)) {
                    (void 0 === n || n.length <= 0) && (n = t);
                    var i = t.clone(),
                        a = n[0].getBoundingClientRect();
                    return void 0 === a && (a = { left: 0, top: 0 }), i.css({ position: "absolute", display: "block", transform: "", transition: "", objectFit: "cover" }), i.css(dsnGrid.getBoundingClientRect(n[0])), e.append(i), i
                }
            },
            dsnCreateElement: function(e, t, n, i) {
                var a = f('<div class="dsn-ajax-loader"></div>');
                a.css("background-color", g.css("background-color")), l = this.addElement(a, e, t), (d = this.addElement(a, n, i)).hasClass("dsn-cutter") && dsnGrid.convertTextLine(d), d && (d.css("width", "max-content"), d.css("z-index", 2)), l && l.css("z-index", 1), g.append(a), c.to(a, 1, { autoAlpha: 1, ease: Power4.easeInOut })
            },
            completeElement: function(e) {
                var t = f(r),
                    n = f('[data-dsn-ajax="title"]');
                if (t.length || n.length) {
                    var i = (t = t.first()).offset();
                    if (void 0 === i && (i = { top: 0, left: 0 }), l.length && c.to(l, .8, { top: i.top, left: i.left, width: t.width(), height: t.height(), objectFit: "cover", borderRadius: 0 }), d.length && (void 0 === (i = (n = n.first()).offset()) && (i = { top: 0, left: 0 }), c.to(d, .8, { top: i.top, left: i.left }, "-=0.8"), c.to(d, .8, { css: { className: "+=" + n.attr("class") } }, "-=0.8"), n.parents(".v-middle-horizontal").length ? d.css("width", "max-content") : d.css("width", n.width()), n.find(".dsn-chars-wrapper").length)) {
                        var a = n.find(".dsn-chars-wrapper").css("transform").split(/[()]/)[1];
                        a && (a = a.split(",")[5]), a && c.staggerTo(dsnGrid.randomObjectArray(d.find(".dsn-chars-wrapper"), .5), .6, { force3D: !0, y: a, ease: Back.easeOut.config(1.7) }, .04, "-=0.8")
                    }
                    var o = { value: "0%" };
                    c.to(o, .5, { value: "100%", onUpdate: function() { e.css("clip-path", "inset(0% 0% " + o.value + " 0%)") }, onComplete: function() { o = null }, ease: Circ.easeIn })
                } else {
                    var s = { value: "0%" };
                    c.to(s, 1, { value: "100%", onUpdate: function() { e.css("clip-path", "inset(0% 0% " + s.value + " 0%)") }, onComplete: function() { s = null }, ease: Circ.easeIn })
                }
            },
            animateAjaxStart: function(e, t) { c = new TimelineMax, "slider" === e ? this.ajaxSlider(t) : "next" === e ? this.ajaxNextProject(t) : "work" === e ? this.ajaxWork(t) : this.ajaxNormal(), C.locked(), c.call(function() { dsnGrid.scrollTop(0, .01) }) },
            animateAjaxEnd: function(e) {
                this.setTitle(e), this.setBodyClass(e), this.mainRoot.html(f(e).filter(t).html()), n(!0), setTimeout(function() {
                    var e = f(".dsn-ajax-loader");
                    e.hasClass("dsn-ajax-normal") ? c.to(e, 1, { scaleY: 0 }) : this.completeElement(e), c.call(function() { e.remove(), this.effectAjax(!1), c = r = t = null }.bind(this))
                }.bind(this), 100)
            },
            backAnimate: function(t) {
                if (t) {
                    var n = this;
                    f.ajax({ url: t, dataType: "html", beforeSend: n.animateAjaxStart.bind(n), success: function(e) { c.call(n.animateAjaxEnd.bind(n, e), null, null, "+=0.2") }, error: function(e) { window.location = t } })
                }
            },
            ajaxLoad: function() {
                if (g.hasClass("dsn-ajax")) {
                    var a = this;
                    this.ajaxClick.off("click"), this.ajaxClick.on("click", function(e) {
                        e.preventDefault();
                        var t = f(this),
                            n = t.attr("href"),
                            i = t.data("dsn-ajax");
                        0 <= n.indexOf("#") || void 0 === n ? t = n = i = null : a.effectAjax() || (a.effectAjax(!0), f.ajax({ url: n, dataType: "html", beforeSend: a.animateAjaxStart.bind(a, i, t), success: function(e) { try { history.pushState(null, "", n), c.call(a.animateAjaxEnd.bind(a, e), null, null, "+=0.2") } catch (e) { window.location = n } }, error: function(e) { window.location = n } }))
                    })
                }
            }
        }
    }

    function t() {
        f(".site-header").removeClass("header-stickytop");
        var n = 0,
            i = f(".wrapper").offset(),
            e = f(".header-single-post .containers").offset(),
            t = f(".post-full-content").offset(),
            a = 0;
        void 0 !== e ? i = e : i.top <= 70 && (i = t);
        var o = new TimelineMax({ paused: !0 }),
            s = new TimelineMax({ paused: !0 });
        return o.to(".header-top .header-container, .site-header ", .5, { backgroundColor: "#000", paddingTop: 15, paddingBottom: 15 }), o.reverse(), s.to(".header-top .header-container,  .site-header , .dsn-multi-lang", .5, { top: -70 }), s.reverse(), C.getListener(function(e) {
            n = "scroll" === e.type ? p.scrollTop() : e.offset.y;
            var t = 70;
            void 0 !== i && (t = i.top - 100), t < n ? (o.play(), a < n ? s.play() : s.reverse()) : o.reverse(), a = n
        }), { t1: o, t2: s }
    }

    function d() { f(".zoom-gallery").magnificPopup({ delegate: "a:not(.effect-ajax)", type: "image", closeOnContentClick: !1, closeBtnInside: !1, mainClass: "mfp-with-zoom mfp-img-mobile", image: { verticalFit: !0, titleSrc: function(e) { return e.el.attr("title") + ' &middot; <a class="image-source-link" href="' + e.el.attr("data-source") + '" target="_blank">image source</a>' } }, gallery: { enabled: !0 }, zoom: { enabled: !0, duration: 300, opener: function(e) { return e.find("img") } } }) }

    function c(e) {
        function t() { dsnGrid.elementHover(n, "a:not(> img):not(.vid) , .dsn-button-sidebar,  button , .mfp-container", "cursor-scale-full"), dsnGrid.elementHover(n, ".c-hidden", "no-scale"), dsnGrid.elementHover(n, ".has-popup a , .work-item-box a:not(.effect-ajax)", "cursor-scale-half cursor-open"), dsnGrid.elementHover(n, '[data-cursor="close"]', "cursor-scale-full cursor-close"), dsnGrid.elementHover(n, "a.link-pop ", "cursor-scale-full cursor-view"), dsnGrid.elementHover(n, ".proj-slider-image > .slick-list ,.our-work .slick-slider > .slick-list, .slider-project-swiper .swiper-wrapper ", "cursor-scale-half cursor-drag cursor-next cursor-prev"), dsnGrid.elementHover(n, ".main-slider:not(.has-horizontal) .slide-item", "cursor-scale-half cursor-up-down cursor-drag cursor-next cursor-prev"), dsnGrid.elementHover(n, ".main-slider.has-horizontal .slide-item", "cursor-scale-half cursor-drag cursor-next cursor-prev"), dsnGrid.elementHover(n, '[data-cursor="next"]', "cursor-scale-half cursor-next"), dsnGrid.elementHover(n, '[data-cursor="prev"]', "cursor-scale-half cursor-prev"), dsnGrid.elementHover(n, ".our-work .work-item a ", "no-drag"), dsnGrid.moveIcon(".img-box-parallax", ".title-popup") }
        var n = f(".cursor");
        return dsnGrid.isMobile() || !g.hasClass("dsn-cursor-effect") ? (n.length && (n.css("display", "none"), g.removeClass("dsn-cursor-effect")), void(n = null)) : (!0 === e ? n.attr("class", "cursor") : dsnGrid.mouseMove(n), void t())
    }
    var e, i, a, o, s, u, h, p = f(window),
        g = f("body");
    e = f(".preloader"), i = e.find(".percent"), a = e.find(".title .text-fill"), o = { value: 0 }, s = e.find(".preloader-bar"), u = s.find(".preloader-progress"), h = dsnGrid.pageLoad(0, 100, 1e3, function(e) { i.text(e), o.value = e, a.css("clip-path", "inset(" + (100 - e) + "% 0% 0% 0%)"), u.css("width", e + "%") }), p.on("load", function() { clearInterval(h), (new TimelineLite).to(o, 1, { value: 100, onUpdate: function() { i.text(o.value.toFixed(0)), a.css("clip-path", "inset(" + (100 - o.value) + "% 0% 0% 0%)"), u.css("width", o.value + "%") } }).set(u, { backgroundColor: "#090909" }).to(s, .5, { height: "100%" }).to(o, .4, { value: 0, onUpdate: function() { a.css("clip-path", "inset(" + (100 - o.value) + "% 0% 0% 0%)") } }, "-=0.4").to(o, .8, { value: 100, onUpdate: function() { e.css("clip-path", "inset(" + o.value + "% 0% 0% 0%)") }, ease: Power2.easeInOut }, "+=0.1").call(function() { e.remove(), h = e = i = a = o = s = u = null }) });
    var v, m, w, x, y, b, T, k, C = (v = window.Scrollbar, m = "locked-scroll", w = document.querySelector("#dsn-scrollbar"), {
            isScroller: function(e) { e && (w = document.querySelector("#dsn-scrollbar")); var t = !g.hasClass("dsn-effect-scroll") || dsnGrid.isMobile() || null === w; return t && e && g.addClass("dsn-mobile"), !t },
            locked: function() {
                if (g.addClass(m), this.isScroller()) {
                    var e = this.getScrollbar();
                    void 0 !== e && e.destroy(), e = null
                }
            },
            getScrollbar: function(e) { return void 0 === e ? v.get(w) : v.get(document.querySelector(e)) },
            getListener: function(e) {
                var t = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
                if (void 0 !== e) {
                    var n = this;
                    n.isScroller() ? n.getScrollbar().addListener(e) : t && p.on("scroll", e), n = null
                }
            },
            scrollNavigate: function() {
                var e = f(".wrapper").offset();
                e = e ? e.top : 0, f(".scroll-top , .scroll-to-top").on("click", function() { dsnGrid.scrollTop(0, 2) }), f(".scroll-d").on("click", function() { dsnGrid.scrollTop(e, 2, -1 * f(".scrollmagic-pin-spacer").height() - 200 || -200) })
            },
            start: function() { g.removeClass(m), dsnGrid.scrollTop(0, 1), this.isScroller(!0) && v.init(w, { damping: .05 }) }
        }),
        S = (x = new ScrollMagic.Controller, y = [], {
            clearControl: function() {
                x.destroy(!0), x = new ScrollMagic.Controller;
                var e = !0,
                    t = !1,
                    n = void 0;
                try {
                    for (var i, a = y[Symbol.iterator](); !(e = (i = a.next()).done); e = !0) {
                        var o = i.value;
                        o.destroy(!0), o = null
                    }
                } catch (e) { t = !0, n = e } finally { try {!e && a.return && a.return() } finally { if (t) throw n } }
                y = []
            },
            headerPages: function() {
                var e = '[data-dsn-header="parallax"]';
                if (f(e).length <= 0) return !1;
                var t = f("#dsn-hero-parallax-img"),
                    n = f("#dsn-hero-parallax-title"),
                    i = f(e).find('a[target="_blank"] , .scroll-d'),
                    a = new TimelineLite;
                0 < t.length && a.to(t, 1, { y: "30%", scale: 1 }, 0), 0 < n.length && a.to(n, .8, { force3D: !0, y: "100%", autoAlpha: 0, scale: t.hasClass("header-scale-hero") ? .9 : t.hasClass("header-no-scale-hero") ? 1 : 1.08 }, 0), 0 < i.length && a.to(i, .8, { force3D: !0, y: 60, autoAlpha: 0 }, 0);
                var o = dsnGrid.tweenMaxParallax(C, x).addParrlax({ id: e, triggerHook: 0, tween: a }),
                    s = t.find("video");
                s.length ? (o.on("enter", function() { s.length && s.get(0).play() }), o.on("leave", function() { s.length && s.get(0).pause() }), f(e).find(".icon-sound").on("click", function(e) { e.stopPropagation(), f(this).hasClass("sound-no-mute") ? (s.get(0).muted = !0, TweenMax.to(f(this).find("svg"), .8, { x: 4 }), TweenMax.staggerTo(f(this).find(".wave-line"), .8, { autoAlpha: 0 }, .2)) : (s.get(0).muted = !1, TweenMax.to(f(this).find("svg"), .8, { x: 0 }), TweenMax.staggerTo(f(this).find(".wave-line"), .8, { autoAlpha: 1 }, .2)), f(this).toggleClass("sound-no-mute") })) : s = null, o && y.push(o), e = a = o = null
            },
            parallaxImgHover: function() {
                var e = f('[data-dsn="parallax"]');
                e.length <= 0 || dsnGrid.isMobile() ? e = null : e.each(function() {
                    var e = f(this),
                        t = (dsnGrid.removeAttr(e, "data-dsn"), dsnGrid.getData(e, "speed", .5)),
                        n = dsnGrid.getData(e, "move", 20);
                    dsnGrid.parallaxMoveElement(e, n, t, e.find(".dsn-parallax-rev").get(0), e.hasClass("image-zoom")), e = t = n = null
                })
            },
            headerProject: function() {
                var e = '[data-dsn-header="project"]';
                if (f(e).length <= 0 || f(e).hasClass("dsn-end-animate")) return e = null, !1;
                var t = f("#dsn-hero-parallax-img"),
                    n = f("#dsn-hero-title"),
                    i = f("#dsn-hero-description"),
                    a = f("#dsn-hero-desc-items"),
                    o = a.find(".descrption-item"),
                    s = f(e).find(".scroll-d img"),
                    r = new TimelineLite;
                0 < t.length && !dsnGrid.isMobile() && r.to(t, 2, { width: "40%", left: "60%" }), n.length && (dsnGrid.convertTextLine(n.find(".title")), i.length && TweenLite.set(n.find(".dsn-chars-wrapper , .metas"), { y: "+=" + i.height() }), a.length && TweenLite.set(n.find(".dsn-chars-wrapper , .metas"), { y: "+=" + (a.height() - 30) }), r.to(n.find(".metas"), 1, { force3D: !0, y: "0", ease: Back.easeOut.config(1.7) }, 0), r.staggerTo(dsnGrid.randomObjectArray(n.find(".dsn-chars-wrapper"), .8), 1.5, { force3D: !0, y: "0", ease: Back.easeOut.config(1.7) }, .1, 0)), i.length && r.fromTo(i, .8, { y: "15%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1 }), a.length && r.fromTo(a, .3, { y: "15%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1 }), o.length && r.staggerFromTo(o, 1, { y: "15%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1 }, .2);
                var l = dsnGrid.tweenMaxParallax(C, x).addParrlax({ id: e, triggerHook: 0, duration: 2100, tween: r, _fixed: !0 });
                s.length && l.on("progress", function(e) { TweenLite.to(f('[data-dsn-header="project"]').find(".scroll-d img"), .3, { rotation: 500 * e.progress }) }), l && y.push(l), e = s = s = r = l = t = o = a = i = n = null
            },
            nextProject: function() {
                var e = f('[data-dsn-footer="project"]');
                if (!e.length) return !1;
                var t = f("#dsn-footer-title"),
                    n = e.find(".img-box-shadow"),
                    i = new TimelineLite;
                if (n.length) {
                    var a = { value: "20%" };
                    i.to(a, 2, { value: "75%", onUpdate: function() { n.css("background-image", "linear-gradient(to left, #000 " + a.value + ", rgba(0, 0, 0, 0.26) 100%)") } }, 0)
                }
                t.length && (dsnGrid.convertTextLine(t), TweenLite.set(t.find(".dsn-chars-wrapper"), { y: 50, autoAlpha: 0 }), i.staggerTo(dsnGrid.randomObjectArray(t.find(".dsn-chars-wrapper"), .8), 1, { force3D: !0, y: "0", autoAlpha: 1, ease: Back.easeOut.config(1.7) }, .1, 0));
                var o = dsnGrid.tweenMaxParallax(C, x).addParrlax({ id: e, triggerHook: .7, duration: e.height() + 33, tween: i });
                o && y.push(o), i = o = t = null
            },
            animateFade: function() {
                var e = f('[data-dsn-animate="section"]');
                dsnGrid.getData(e, "animate"), e.each(function() {
                    var e = new ScrollMagic.Controller,
                        t = new TimelineLite({ paused: !0 }),
                        n = f(this),
                        i = n.find(".dsn-up"),
                        a = n.find(".dsn-text");
                    n.addClass("transform-3d overflow-hidden"), n.hasClass("dsn-animate") && t.fromTo(this, 1, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }), a.length && a.each(function() { dsnGrid.convertTextLine(this, this), f(this).addClass("overflow-hidden"), t.staggerFromTo(f(this).find(".dsn-word-wrapper"), .6, { willChange: "transform", transformOrigin: "0 100%", x: 8, y: 13, rotation: 20, opacity: 0 }, { x: 0, y: 0, rotation: 0, opacity: 1, ease: Back.easeOut.config(2) }, .1) }), i.length && t.staggerFromTo(i, .8, { y: 20, opacity: 0 }, { y: 0, opacity: 1, delay: n.hasClass("dsn-animate") ? .5 : 0, ease: Back.easeOut.config(1.7) }, .2, 0), t._totalDuration = 1, dsnGrid.tweenMaxParallax(C, e).addParrlax({ id: this, reverse: !1, triggerHook: .5, duration: 0, tween: t }), e = t = n = i = a = null
                }), e = null
            },
            animateSkills: function() {
                var e = f(".skills-personal");
                e.each(function() {
                    var e = new ScrollMagic.Controller,
                        n = new TimelineLite({ paused: !0 }),
                        t = f(this).find(".skills-item .fill");
                    t.length && (t.each(function(e) {
                        var t = f(this);
                        n.to(t, 1, { width: t.data("width"), ease: Power0.easeNone, onUpdate: function() { t.find(".number").text((t.width() / t.parent().width() * 100).toFixed(0) + "%") }, onComplete: function() { t = null } }, .2 * e)
                    }), n._totalDuration = 1), dsnGrid.tweenMaxParallax(C, e).addParrlax({ id: this, reverse: !1, triggerHook: .5, duration: 0, tween: n }), e = n = null
                }), e = null
            },
            animateNumbers: function() {
                var e = f(".have-dsn-animate-number");
                e.each(function() {
                    var e = f(this).find(".has-animate-number");
                    if (e.length) {
                        var i = new TimelineLite({ paused: !0 });
                        e.each(function(e) {
                            var t = f(this),
                                n = { value: 0 };
                            i.to(n, 4, { value: t.text(), ease: Back.easeOut.config(1.2), onUpdate: function() { t.text(dsnGrid.numberText(n.value.toFixed(0))) }, onComplete: function() { t = n = null } }, .2 * e)
                        }), i._totalDuration = 1, dsnGrid.tweenMaxParallax(C, new ScrollMagic.Controller).addParrlax({ id: this, reverse: !1, triggerHook: .5, duration: 0, tween: i }), i = null
                    } else e = null
                }), e = null
            },
            sectionWork: function() {
                var e = f('.work-container[data-dsn-animate="work"]'),
                    t = e.find(".d-block"),
                    n = t.find(".work-item");
                if (t.length) {
                    var i = p.width() / 2.5;
                    dsnGrid.isMobile() && p.width() < 768 && 576 <= p.width() ? i = p.width() / 1.5 : dsnGrid.isMobile() && p.width() < 576 && (i = p.width() / 1.15), n.each(function() { f(this).css({ width: i, float: "left", minHeight: 1 }) }), t.css("width", i * n.length), i = null;
                    var a = dsnGrid.tweenMaxParallax(C, x).addParrlax({ id: e, triggerHook: 0, _fixed: !0, duration: 350 * n.length, refreshParallax: !0, tween: TweenLite.to(t, .5, { force3D: !0, x: -1 * (n.last().offset().left - 1.5 * n.last().width()), ease: Linear.easeNone }) });
                    a && y.push(a), a = null
                }
                e = t = n = null
            },
            parallaxImg: function() {
                var c = Linear.easeNone,
                    u = .01;
                f('[data-dsn-grid="move-up"]').each(function(e) {
                    var t = f(this);
                    t.attr("data-dsn-grid", "moveUp");
                    var n = t.find("img:not(.hidden) , video"),
                        i = dsnGrid.getData(this, "triggerhook", 1),
                        a = dsnGrid.getData(this, "duration", "200%"),
                        o = dsnGrid.getData(this, "top");
                    if (0 < n.length) {
                        o && n.css("top", o);
                        var s = void 0,
                            r = dsnGrid.getData(n, "y", n.hasClass("has-opposite-direction") ? "-20%" : "30%"),
                            l = { y: r, skewX: 0, ease: c, scale: 1 };
                        n.hasClass("has-top-bottom") || (l.scale = dsnGrid.getData(n, "scale", 1.1)), s = TweenMax.to(n, u, l), n.css("perspective", 1e3 < t.width() ? 1e3 : t.width());
                        var d = dsnGrid.tweenMaxParallax(C, x).addParrlax({ id: this, triggerHook: i, duration: a, tween: s });
                        d && y.push(d), d = s = r = a = i = n = t = l = null
                    }
                }), c = u = null
            },
            dsnScrollTop: function() {
                var e = f(".wrapper");
                if (e.length && f(".scroll-to-top").length) {
                    TweenLite.to(".scroll-to-top", 1, { right: -100, autoAlpha: 0 }), TweenLite.to(".stories-sticky-footer", 1, { autoAlpha: 0 });
                    var t = dsnGrid.tweenMaxParallax(C, x).addParrlax({ id: e, triggerHook: .5, duration: e.height() - .5 * p.height() + (f(".next-project").outerHeight() || 0), tween: TweenLite.to(".scroll-to-top > img", .3, { rotation: e.height() / 2 }) });
                    t.on("progress", function(e) { f(".scroll-to-top .box-numper span").text((100 * e.progress).toFixed(0) + "%") }), t.on("enter", function(e) { TweenLite.to(".scroll-to-top", 1, { right: 20, autoAlpha: 1 }), TweenLite.to(".stories-sticky-footer", 1, { autoAlpha: 1 }) }), t.on("leave", function(e) { TweenLite.to(".scroll-to-top", 1, { right: -100, autoAlpha: 0 }), TweenLite.to(".stories-sticky-footer", 1, { autoAlpha: 0 }) }), t && y.push(t), t = e = null
                } else e = null
            },
            moveSection: function() {
                var e = f('[data-dsn-grid="move-section"]'),
                    s = Linear.easeNone,
                    r = .01;
                e.each(function() {
                    var e = f(this);
                    if (e.removeAttr("data-dsn-grid"), e.addClass("dsn-move-section"), !("tablet" === e.data("dsn-responsive") && p.width() < 992)) {
                        var t = dsnGrid.getData(e, "move", -100),
                            n = dsnGrid.getData(e, "triggerhook", 1),
                            i = dsnGrid.getData(e, "opacity", e.css("opacity")),
                            a = dsnGrid.getData(e, "duration", "150%"),
                            o = dsnGrid.tweenMaxParallax(C, x).addParrlax({ id: this, triggerHook: n, duration: a, tween: TweenMax.to(e, r, { y: t, autoAlpha: i, ease: s }) });
                        y.push(o), e = t = n = i = a = null
                    }
                }), e = s = r = null
            },
            changeColor: function() {
                f('[data-dsn="color"]').each(function() {
                    var e = dsnGrid.getData(this, "duration", f(this).outerHeight() + 50),
                        t = new ScrollMagic.Scene({ triggerElement: this, triggerHook: .05, duration: e }).addTo(x);
                    t.on("enter", function() { g.toggleClass("v-light") }), t.on("leave", function() { g.toggleClass("v-light") }), t && y.push(t)
                })
            },
            allInt: function() {
                this.clearControl(), this.headerProject(), this.nextProject(), this.changeColor(), this.headerPages(), !0 === y && this.animateFade(), this.animateSkills(), this.animateNumbers(), this.sectionWork(), this.parallaxImg(), this.parallaxImgHover(), this.moveSection(), C.scrollNavigate(), C.getListener(function() {
                    var e = !0,
                        t = !1,
                        n = void 0;
                    try { for (var i, a = y[Symbol.iterator](); !(e = (i = a.next()).done); e = !0) i.value.refresh() } catch (e) { t = !0, n = e } finally { try {!e && a.return && a.return() } finally { if (t) throw n } }
                })
            }
        }),
        G = (b = [], T = [], {
            destory: function() {
                var e = !0,
                    t = !1,
                    n = void 0;
                try {
                    for (var i, a = T[Symbol.iterator](); !(e = (i = a.next()).done); e = !0) {
                        var o = i.value;
                        o.slick("unslick"), o = null
                    }
                } catch (e) { t = !0, n = e } finally { try {!e && a.return && a.return() } finally { if (t) throw n } }
                var s = !0,
                    r = !1,
                    l = void 0;
                try {
                    for (var d, c = b[Symbol.iterator](); !(s = (d = c.next()).done); s = !0) {
                        var u = d.value;
                        u.destroy(), u = null
                    }
                } catch (e) { r = !0, l = e } finally { try {!s && c.return && c.return() } finally { if (r) throw l } }
                b = [], T = []
            },
            bySwiper: function(e, t) {
                dsnGrid.convertToJQuery(e).each(function() {
                    var e = new Swiper(f(this).find(".swiper-container"), { slidesPerView: "auto", spaceBetween: 80, allowTouchMove: !0, grabCursor: !0, resistanceRatio: .65, watchSlidesProgress: !0, slidesPerViewFit: !1, roundLengths: "false", speed: 1e3, navigation: { nextEl: f(this).find('[data-cursor="next"]'), prevEl: f(this).find('[data-cursor="prev"]') }, pagination: { el: ".swiper-pagination", clickable: !0 } });
                    b.push(e), e = null
                })
            },
            bySlick: function(e, t) {
                dsnGrid.convertToJQuery(e).each(function() {
                    t = f.extend(!0, { speed: 700, prevArrow: '<div data-cursor="prev"></div>', nextArrow: '<div data-cursor="next"></div>', responsive: [{ breakpoint: 992, settings: { dots: !f(this).hasClass("dsn-not-dot") } }] }, t || {}), f(this).hasClass("dsn-is-not-fade") && (t.fade = !1);
                    var e = f(this).slick(t);
                    T.push(e), e = t = null
                })
            },
            run: function() { this.destory(), this.bySwiper(".slider-project-swiper"), this.bySlick(".proj-slider-image"), this.bySlick('[data-dsn-col="3"]:not(.dsn-not-dot) .slick-slider', { infinite: !0, slidesToShow: 3, responsive: [{ breakpoint: 768, settings: { slidesToShow: 2 } }, { breakpoint: 500, settings: { slidesToShow: 1 } }] }), this.bySlick('[data-dsn-col="3"].dsn-not-dot .slick-slider', { infinite: !0, autoplay: !0, autoplaySpeed: 2e3, slidesToShow: 3, responsive: [{ breakpoint: 768, settings: { slidesToShow: 2, dots: !1 } }, { breakpoint: 500, settings: { slidesToShow: 1, dots: !1 } }] }), this.bySlick(".testimonials-main-content", { slidesToShow: 1, asNavFor: ".testimonials-nav", loop: !0, autoplay: !1, centerMode: !0, infinite: !0, speed: 700, adaptiveHeight: !0, fade: !0, cssEase: "cubic-bezier(.9, .03, .41, .49)", nextArrow: '<i class="fas fa-angle-right"></i>', prevArrow: '<i class="fas fa-angle-left"></i>' }), this.bySlick(".testimonials-nav", { slidesToShow: 3, asNavFor: ".testimonials-main-content", vertical: !0, focusOnSelect: !0, loop: !0, autoplay: !1, arrows: !1, centerMode: !0, responsive: [{ breakpoint: 768, settings: { vertical: !1, centerMode: !1, dots: !1 } }, { breakpoint: 576, settings: { slidesToShow: 2, vertical: !1, centerMode: !1 } }, { breakpoint: 400, settings: { slidesToShow: 2, vertical: !0, centerMode: !1 } }] }), this.bySlick(".testimonials-slider", { ariableWidth: !0, slidesToShow: 3, slidesToScroll: 1, infinite: !1 }), this.bySlick('[data-dsn-col="1"] .slick-slider', { infinite: !0, slidesToShow: 1 }), this.bySlick('[data-dsn-col="2"] .slick-slider', { infinite: !0, slidesToShow: 2, arrows: !1, responsive: [{ breakpoint: 800, settings: { slidesToShow: 1, slidesToScroll: 1 } }] }), this.bySlick('[data-dsn-col="5"] .slick-slider', { autoplay: !0, infinite: !0, slidesToShow: 5, arrows: !1, responsive: [{ breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 3 } }, { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } }] }) }
        });
    p.on("load", function() {
        var s;
        (s = f(".site-header"), {
            lineActive: function() {
                var e = s.find("ul.extend-container > li.dsn-active");
                e.length && this.setLine(e.offset().left), e = null
            },
            lineMove: function() {
                var n = this;
                s.find("ul.extend-container > li").off("mouseenter"), s.find("ul.extend-container > li").on("mouseenter", function() {
                    if (!g.hasClass("hamburger-menu")) {
                        var e = f(this),
                            t = e.find(" > ul");
                        t.length ? n.setLine(t.offset().left, 65, t.width(), e.offset().left) : n.setLine(f(this).offset().left), t = e = null
                    }
                }), s.find("ul.extend-container").off("mouseleave"), s.find("ul.extend-container").on("mouseleave", function() { n.lineActive() })
            },
            setLine: function(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 65,
                    n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 25,
                    i = arguments[3];
                TweenMax.to(".nav-border-bottom", .3, { left: e, top: t, width: n, onComplete: function() { f(".nav-border-bottom").css({ left: i || e, width: 25 }) } })
            },
            cutterText: function() {
                var e = s.find(".menu-icon .text-menu");
                if (!(e.length <= 0)) {
                    var t = e.find(".text-button"),
                        n = e.find(".text-open"),
                        i = e.find(".text-close");
                    dsnGrid.convertTextLine(t, t), dsnGrid.convertTextLine(n, n), dsnGrid.convertTextLine(i, i), e = t = n = i = null
                }
            },
            hamburgerOpen: function() {
                var e = s.find(".menu-icon"),
                    t = s.find(".main-navigation"),
                    n = new TimelineMax({ paused: !0, onReverseComplete: function() { setTimeout(function() { e.find(".icon-top , .icon-bottom").css("transform", "").css("display", "") }, 50) } }),
                    i = new TimelineMax,
                    a = Power3.easeOut;
                n.set(e.find(".icon-center"), { display: "none" }), n.to(e.find(".icon-top"), .5, { width: 23, rotation: 45, top: 6, ease: a }), n.to(e.find(".icon-bottom"), .5, { width: 23, rotation: -45, top: -5, ease: a }, 0), n.to(e, .01, { css: { className: "+=nav-active" } }, 0), n.to(g, .01, { css: { className: "+=over-hidden" } }, 0), n.to(t, .5, { y: "0%", autoAlpha: 1, ease: a }, 0), n.fromTo(t, .5, { y: "-100%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: Expo.easeInOut }, 0), n.staggerTo(t.find("ul.extend-container > li > a .dsn-title-menu"), .5, { autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.7) }, .1), n.to(t.find("ul.extend-container > li > a .dsn-meta-menu"), .5, { autoAlpha: 1, ease: a }), n.to(t.find(".container-content"), 1, { autoAlpha: 1 }, "-=1"), n.reverse(), t.find("ul.extend-container > li.dsn-drop-down").on("click", function(e) { e.stopPropagation(), 0 < i._totalDuration || ((i = new TimelineMax({ onReverseComplete: function() { i = new TimelineMax } })).set(f(this).find("ul"), { display: "flex" }), i.staggerTo(t.find("ul.extend-container > li > a .dsn-title-menu"), .5, { y: -30, autoAlpha: 0, ease: Back.easeIn.config(1.7) }, .1), i.to(t.find("ul.extend-container > li > a .dsn-meta-menu"), .5, { autoAlpha: 0 }, .5), i.staggerFromTo(f(this).find("ul li"), .5, { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: Back.easeOut.config(1.7) }, .1)) }), e.off("click"), e.on("click", function() { i.reverse(-1), n.reversed(!n.reversed()), i = new TimelineMax });
                var o = f(".dsn-back-menu");
                o.off("click"), o.on("click", function() { i.reverse() }), o = null
            },
            init: function() { s.length && (this.cutterText(), 991 < p.width() && g.hasClass("classic-menu") && (s.find("ul.extend-container > li").off("mouseenter"), s.find("ul.extend-container").off("mouseleave"), this.lineMove(), setTimeout(this.lineActive.bind(this), 500)), this.hamburgerOpen()) }
        }).init(), dsnGrid.removeWhiteSpace(".site-header ul.extend-container li > a"), p.on("popstate", function(e) { if (window.location.hash.length) return p.scrollTop(0), void dsnGrid.scrollTop(window.location.hash, 1, -100); - 1 < document.location.href.indexOf("#") || setTimeout(function() { l().backAnimate(document.location) }, 100) }), n(), f(".day-night").on("click", function() { g.toggleClass("v-light") })
    })
}(jQuery);