import { S as r, b as l, a as p, C as m, D as b, E as u, j as _, g as f, F as g, o as $, m as h, p as y, q as w, k as d, u as o, f as S, n as v } from "./index.03b5aaf0.js";
import { I as C } from "./index.ae2c72a9.js";
function j(n) {
    let e;
    return {
        c() {
            (e = h("div")), this.h();
        },
        l(t) {
            (e = y(t, "DIV", { class: !0, id: !0, "data-ceg-seal-id": !0, "data-ceg-image-size": !0, "data-ceg-image-type": !0, alt: !0 })), w(e).forEach(d), this.h();
        },
        h() {
            o(e, "class", "seal svelte-6zij6y"), o(e, "id", n[0].id), o(e, "data-ceg-seal-id", n[0]["data-ceg-seal-id"]), o(e, "data-ceg-image-size", "128"), o(e, "data-ceg-image-type", "basic-small"), o(e, "alt", "Curacao Seal");
        },
        m(t, a) {
            S(t, e, a);
        },
        p: v,
        d(t) {
            t && d(e);
        },
    };
}
function E(n) {
    let e, t;
    return (
        (e = new C({ props: { $$slots: { default: [j] }, $$scope: { ctx: n } } })),
        {
            c() {
                m(e.$$.fragment);
            },
            l(a) {
                b(e.$$.fragment, a);
            },
            m(a, s) {
                u(e, a, s), (t = !0);
            },
            p(a, [s]) {
                const c = {};
                s & 4 && (c.$$scope = { dirty: s, ctx: a }), e.$set(c);
            },
            i(a) {
                t || (_(e.$$.fragment, a), (t = !0));
            },
            o(a) {
                f(e.$$.fragment, a), (t = !1);
            },
            d(a) {
                g(e, a);
            },
        }
    );
}
function z(n) {
    const e = { 
        id: "apg-5cc9c408-c3fa-41dd-88bb-c303115bb2db", 
        "data-ceg-seal-id": "5cc9c408-c3fa-41dd-88bb-c303115bb2db", 
        script: "https://5cc9c408-c3fa-41dd-88bb-c303115bb2db.snippet.antillephone.com/apg-seal.js" 
    };
    let t = () =>
        new Promise((a, s) => {
            // const c = document.createElement("script");
            // document.body.appendChild(c), (c.onload = a), (c.onerror = s), (c.async = !0), (c.src = e.script);
        });
    return (
        $(() => {
            async function a() {
                var c, i;
                typeof window.apg_5cc9c408_c3fa_41dd_88bb_c303115bb2db == "object"
                    ? (c = window.apg_5cc9c408_c3fa_41dd_88bb_c303115bb2db) == null || c.init()
                    : (await t(), (i = window.apg_5cc9c408_c3fa_41dd_88bb_c303115bb2db) == null || i.init());
            }
            a();
        }),
        [e]
    );
}
class x extends r {
    constructor(e) {
        super(), l(this, e, z, E, p, {});
    }
}
export { x as C };
