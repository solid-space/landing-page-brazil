import {
    S as G,
    b as M,
    a as X,
    H as A,
    T as z,
    m as L,
    c as Y,
    p as N,
    q as R,
    d as w,
    k as v,
    $ as D,
    Z as f,
    f as U,
    Q as j,
    a3 as y,
    I as F,
    J as H,
    K as J,
    _ as p,
    j as S,
    g as O,
    r as x,
    R as P,
    a5 as $,
    U as ee,
    C as te,
    D as ne,
    E as le,
    F as ae,
    w as se,
    x as ie,
    A as oe,
} from "./index.03b5aaf0.js";
import { g as fe, a as ue, C as de } from "./context.53874329.js";
const ce = (t) => ({}),
    T = (t) => ({});
function re(t) {
    let e;
    const s = t[15].default,
        n = A(s, t, t[20], null);
    return {
        c() {
            n && n.c();
        },
        l(a) {
            n && n.l(a);
        },
        m(a, d) {
            n && n.m(a, d), (e = !0);
        },
        p(a, d) {
            n && n.p && (!e || d & 1048576) && F(n, s, a, a[20], e ? J(s, a[20], d, null) : H(a[20]), null);
        },
        i(a) {
            e || (S(n, a), (e = !0));
        },
        o(a) {
            O(n, a), (e = !1);
        },
        d(a) {
            n && n.d(a);
        },
    };
}
function me(t) {
    let e, s;
    return (
        (e = new de({ props: { loading: t[4], $$slots: { default: [re] }, $$scope: { ctx: t } } })),
        {
            c() {
                te(e.$$.fragment);
            },
            l(n) {
                ne(e.$$.fragment, n);
            },
            m(n, a) {
                le(e, n, a), (s = !0);
            },
            p(n, a) {
                const d = {};
                a & 16 && (d.loading = n[4]), a & 1048576 && (d.$$scope = { dirty: a, ctx: n }), e.$set(d);
            },
            i(n) {
                s || (S(e.$$.fragment, n), (s = !0));
            },
            o(n) {
                O(e.$$.fragment, n), (s = !1);
            },
            d(n) {
                ae(e, n);
            },
        }
    );
}
function q(t) {
    let e, s;
    return {
        c() {
            (e = L("span")), (s = se("‍"));
        },
        l(n) {
            e = N(n, "SPAN", {});
            var a = R(e);
            (s = ie(a, "‍")), a.forEach(v);
        },
        m(n, a) {
            U(n, e, a), j(e, s);
        },
        d(n) {
            n && v(e);
        },
    };
}
function _e(t) {
    let e, s, n, a, d, g;
    const h = t[15].content,
        m = A(h, t, t[20], T),
        c = m || me(t);
    let o = t[7] && q(),
        r = [{ "data-test": t[9] }, { class: (n = "button variant-" + t[1] + " size-" + t[2] + " align-" + t[6] + " " + t[10]) }, t[14]],
        _ = {};
    for (let l = 0; l < r.length; l += 1) _ = z(_, r[l]);
    return {
        c() {
            (e = L("button")), c && c.c(), (s = Y()), o && o.c(), this.h();
        },
        l(l) {
            e = N(l, "BUTTON", { "data-test": !0, class: !0 });
            var u = R(e);
            c && c.l(u), (s = w(u)), o && o.l(u), u.forEach(v), this.h();
        },
        h() {
            D(e, _),
                f(e, "rounded", t[11]),
                f(e, "active", t[3]),
                f(e, "loading", t[4]),
                f(e, "disabled", t[14].disabled),
                f(e, "no-shadow", t[8]),
                f(e, "icon-only", t[7]),
                f(e, "full-width", t[5]),
                f(e, "min-width", !t[12] && t[14].type === "submit"),
                f(e, "dropdown", t[1] === "dropdown"),
                f(e, "svelte-1epmied", !0);
        },
        m(l, u) {
            U(l, e, u), c && c.m(e, null), j(e, s), o && o.m(e, null), e.autofocus && e.focus(), t[19](e), (a = !0), d || ((g = [y(e, "click", t[16]), y(e, "pointerover", t[17]), y(e, "pointerleave", t[18])]), (d = !0));
        },
        p(l, [u]) {
            m ? m.p && (!a || u & 1048576) && F(m, h, l, l[20], a ? J(h, l[20], u, ce) : H(l[20]), T) : c && c.p && (!a || u & 1048592) && c.p(l, a ? u : -1),
                l[7] ? o || ((o = q()), o.c(), o.m(e, null)) : o && (o.d(1), (o = null)),
                D(e, (_ = p(r, [(!a || u & 512) && { "data-test": l[9] }, (!a || (u & 1094 && n !== (n = "button variant-" + l[1] + " size-" + l[2] + " align-" + l[6] + " " + l[10]))) && { class: n }, u & 16384 && l[14]]))),
                f(e, "rounded", l[11]),
                f(e, "active", l[3]),
                f(e, "loading", l[4]),
                f(e, "disabled", l[14].disabled),
                f(e, "no-shadow", l[8]),
                f(e, "icon-only", l[7]),
                f(e, "full-width", l[5]),
                f(e, "min-width", !l[12] && l[14].type === "submit"),
                f(e, "dropdown", l[1] === "dropdown"),
                f(e, "svelte-1epmied", !0);
        },
        i(l) {
            a || (S(c, l), (a = !0));
        },
        o(l) {
            O(c, l), (a = !1);
        },
        d(l) {
            l && v(e), c && c.d(l), o && o.d(), t[19](null), (d = !1), x(g);
        },
    };
}
function ge(t, e, s) {
    let n, a;
    const d = ["variant", "size", "active", "loading", "fullWidth", "align", "node", "iconOnly", "noShadow", "testId", "class"];
    let g = P(e, d),
        { $$slots: h = {}, $$scope: m } = e;
    const c = fe(),
        o = $();
    let { variant: r = ue({ parent: c }) } = e,
        { size: _ = "md" } = e,
        { active: l = !1 } = e,
        { loading: u = !1 } = e,
        { fullWidth: k = !1 } = e,
        { align: I = k ? "center" : "left" } = e,
        { node: b = void 0 } = e,
        { iconOnly: W = !1 } = e,
        { noShadow: C = !1 } = e,
        { testId: E = void 0 } = e,
        { class: B = "" } = e;
    const K = (i) => o("click", i),
        Q = () => o("mouseover"),
        V = () => o("mouseleave");
    function Z(i) {
        oe[i ? "unshift" : "push"](() => {
            (b = i), s(0, b);
        });
    }
    return (
        (t.$$set = (i) => {
            (e = z(z({}, e), ee(i))),
                s(14, (g = P(e, d))),
                "variant" in i && s(1, (r = i.variant)),
                "size" in i && s(2, (_ = i.size)),
                "active" in i && s(3, (l = i.active)),
                "loading" in i && s(4, (u = i.loading)),
                "fullWidth" in i && s(5, (k = i.fullWidth)),
                "align" in i && s(6, (I = i.align)),
                "node" in i && s(0, (b = i.node)),
                "iconOnly" in i && s(7, (W = i.iconOnly)),
                "noShadow" in i && s(8, (C = i.noShadow)),
                "testId" in i && s(9, (E = i.testId)),
                "class" in i && s(10, (B = i.class)),
                "$$scope" in i && s(20, (m = i.$$scope));
        }),
        (t.$$.update = () => {
            t.$$.dirty & 2 && s(12, (n = r === "subtle-link" || r === "link")), t.$$.dirty & 2 && s(11, (a = r === "tab" || r === "tabmenu" || r === "minimal"));
        }),
        [b, r, _, l, u, k, I, W, C, E, B, a, n, o, g, h, K, Q, V, Z, m]
    );
}
class ve extends G {
    constructor(e) {
        super(), M(this, e, ge, _e, X, { variant: 1, size: 2, active: 3, loading: 4, fullWidth: 5, align: 6, node: 0, iconOnly: 7, noShadow: 8, testId: 9, class: 10 });
    }
}
export { ve as B };
