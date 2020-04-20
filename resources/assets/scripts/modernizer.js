!(function (A, n, e) {
	function o(A, n) { return typeof A === n; } function a() { let A; let n; let e; let a; let t; let i; let l; for (const f in r) if (r.hasOwnProperty(f)) { if (A = [], n = r[f], n.name && (A.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (e = 0; e < n.options.aliases.length; e++)A.push(n.options.aliases[e].toLowerCase()); for (a = o(n.fn, 'function') ? n.fn() : n.fn, t = 0; t < A.length; t++)i = A[t], l = i.split('.'), l.length === 1 ? Modernizr[l[0]] = a : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = a), s.push((a ? '' : 'no-') + l.join('-')); } } function t(A) { let n = u.className; const e = Modernizr._config.classPrefix || ''; if (c && (n = n.baseVal), Modernizr._config.enableJSClass) { const o = new RegExp(`(^|\\s)${e}no-js(\\s|$)`); n = n.replace(o, `$1${e}js$2`); }Modernizr._config.enableClasses && (n += ` ${e}${A.join(` ${e}`)}`, c ? u.className.baseVal = n : u.className = n); } function i(A, n) { if (typeof A === 'object') for (const e in A)f(A, e) && i(e, A[e]); else { A = A.toLowerCase(); const o = A.split('.'); let a = Modernizr[o[0]]; if (o.length == 2 && (a = a[o[1]]), typeof a !== 'undefined') return Modernizr; n = typeof n === 'function' ? n() : n, o.length == 1 ? Modernizr[o[0]] = n : (!Modernizr[o[0]] || Modernizr[o[0]] instanceof Boolean || (Modernizr[o[0]] = new Boolean(Modernizr[o[0]])), Modernizr[o[0]][o[1]] = n), t([(n && n != 0 ? '' : 'no-') + o.join('-')]), Modernizr._trigger(A, n); } return Modernizr; } var s = []; var r = []; const l = {
		_version: '3.6.0',
		_config: {
			classPrefix: '', enableClasses: !0, enableJSClass: !0, usePrefixes: !0,
		},
		_q: [],
		on(A, n) { const e = this; setTimeout(() => { n(e[A]); }, 0); },
		addTest(A, n, e) { r.push({ name: A, fn: n, options: e }); },
		addAsyncTest(A) { r.push({ name: null, fn: A }); },
	}; var Modernizr = function () {}; Modernizr.prototype = l, Modernizr = new Modernizr(); let f; var u = n.documentElement; var c = u.nodeName.toLowerCase() === 'svg'; !(function () { const A = {}.hasOwnProperty; f = o(A, 'undefined') || o(A.call, 'undefined') ? function (A, n) { return n in A && o(A.constructor.prototype[n], 'undefined'); } : function (n, e) { return A.call(n, e); }; }()), l._l = {}, l.on = function (A, n) { this._l[A] || (this._l[A] = []), this._l[A].push(n), Modernizr.hasOwnProperty(A) && setTimeout(() => { Modernizr._trigger(A, Modernizr[A]); }, 0); }, l._trigger = function (A, n) { if (this._l[A]) { const e = this._l[A]; setTimeout(() => { let A; let o; for (A = 0; A < e.length; A++)(o = e[A])(n); }, 0), delete this._l[A]; } }, Modernizr._q.push(() => { l.addTest = i; }), Modernizr.addAsyncTest(() => { function A(A, n, e) { function o(n) { const o = n && n.type === 'load' ? a.width == 1 : !1; const t = A === 'webp'; i(A, t && o ? new Boolean(o) : o), e && e(n); } var a = new Image(); a.onerror = o, a.onload = o, a.src = n; } const n = [{ uri: 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=', name: 'webp' }, { uri: 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==', name: 'webp.alpha' }, { uri: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA', name: 'webp.animation' }, { uri: 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=', name: 'webp.lossless' }]; const e = n.shift(); A(e.name, e.uri, (e) => { if (e && e.type === 'load') for (let o = 0; o < n.length; o++)A(n[o].name, n[o].uri); }); }), Modernizr.addAsyncTest(() => { const A = new Image(); A.onload = A.onerror = function () { i('jpeg2000', A.width == 1); }, A.src = 'data:image/jp2;base64,/0//UQAyAAAAAAABAAAAAgAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAEBwEBBwEBBwEBBwEB/1IADAAAAAEAAAQEAAH/XAAEQED/ZAAlAAFDcmVhdGVkIGJ5IE9wZW5KUEVHIHZlcnNpb24gMi4wLjD/kAAKAAAAAABYAAH/UwAJAQAABAQAAf9dAAUBQED/UwAJAgAABAQAAf9dAAUCQED/UwAJAwAABAQAAf9dAAUDQED/k8+kEAGvz6QQAa/PpBABr994EAk//9k='; }), a(), t(s), delete l.addTest, delete l.addAsyncTest; for (let d = 0; d < Modernizr._q.length; d++)Modernizr._q[d](); A.Modernizr = Modernizr;
}(window, document));