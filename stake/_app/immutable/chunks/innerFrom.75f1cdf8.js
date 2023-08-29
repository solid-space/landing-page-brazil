import{e as I,a as v,b as y,_ as d,f as Q,g as q,h as x,i as W,j as X}from"./tslib.es6.b90ee611.js";function c(e){return typeof e=="function"}function G(e){var t=function(n){Error.call(n),n.stack=new Error().stack},r=e(t);return r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r}var O=G(function(e){return function(r){e(this),this.message=r?r.length+` errors occurred during unsubscription:
`+r.map(function(n,i){return i+1+") "+n.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=r}});function E(e,t){if(e){var r=e.indexOf(t);0<=r&&e.splice(r,1)}}var m=function(){function e(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var t,r,n,i,o;if(!this.closed){this.closed=!0;var s=this._parentage;if(s)if(this._parentage=null,Array.isArray(s))try{for(var u=I(s),a=u.next();!a.done;a=u.next()){var f=a.value;f.remove(this)}}catch(l){t={error:l}}finally{try{a&&!a.done&&(r=u.return)&&r.call(u)}finally{if(t)throw t.error}}else s.remove(this);var p=this.initialTeardown;if(c(p))try{p()}catch(l){o=l instanceof O?l.errors:[l]}var F=this._finalizers;if(F){this._finalizers=null;try{for(var S=I(F),b=S.next();!b.done;b=S.next()){var K=b.value;try{L(K)}catch(l){o=o??[],l instanceof O?o=v(v([],y(o)),y(l.errors)):o.push(l)}}}catch(l){n={error:l}}finally{try{b&&!b.done&&(i=S.return)&&i.call(S)}finally{if(n)throw n.error}}}if(o)throw new O(o)}},e.prototype.add=function(t){var r;if(t&&t!==this)if(this.closed)L(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(r=this._finalizers)!==null&&r!==void 0?r:[]).push(t)}},e.prototype._hasParent=function(t){var r=this._parentage;return r===t||Array.isArray(r)&&r.includes(t)},e.prototype._addParent=function(t){var r=this._parentage;this._parentage=Array.isArray(r)?(r.push(t),r):r?[r,t]:t},e.prototype._removeParent=function(t){var r=this._parentage;r===t?this._parentage=null:Array.isArray(r)&&E(r,t)},e.prototype.remove=function(t){var r=this._finalizers;r&&E(r,t),t instanceof e&&t._removeParent(this)},e.EMPTY=function(){var t=new e;return t.closed=!0,t}(),e}(),H=m.EMPTY;function V(e){return e instanceof m||e&&"closed"in e&&c(e.remove)&&c(e.add)&&c(e.unsubscribe)}function L(e){c(e)?e():e.unsubscribe()}var U={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},T={setTimeout:function(e,t){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];var i=T.delegate;return i!=null&&i.setTimeout?i.setTimeout.apply(i,v([e,t],y(r))):setTimeout.apply(void 0,v([e,t],y(r)))},clearTimeout:function(e){var t=T.delegate;return((t==null?void 0:t.clearTimeout)||clearTimeout)(e)},delegate:void 0};function B(e){T.setTimeout(function(){throw e})}function R(){}var w=null;function _(e){if(U.useDeprecatedSynchronousErrorHandling){var t=!w;if(t&&(w={errorThrown:!1,error:null}),e(),t){var r=w,n=r.errorThrown,i=r.error;if(w=null,n)throw i}}else e()}var j=function(e){d(t,e);function t(r){var n=e.call(this)||this;return n.isStopped=!1,r?(n.destination=r,V(r)&&r.add(n)):n.destination=rr,n}return t.create=function(r,n,i){return new k(r,n,i)},t.prototype.next=function(r){this.isStopped||this._next(r)},t.prototype.error=function(r){this.isStopped||(this.isStopped=!0,this._error(r))},t.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(r){this.destination.next(r)},t.prototype._error=function(r){try{this.destination.error(r)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t}(m),Z=Function.prototype.bind;function P(e,t){return Z.call(e,t)}var $=function(){function e(t){this.partialObserver=t}return e.prototype.next=function(t){var r=this.partialObserver;if(r.next)try{r.next(t)}catch(n){g(n)}},e.prototype.error=function(t){var r=this.partialObserver;if(r.error)try{r.error(t)}catch(n){g(n)}else g(t)},e.prototype.complete=function(){var t=this.partialObserver;if(t.complete)try{t.complete()}catch(r){g(r)}},e}(),k=function(e){d(t,e);function t(r,n,i){var o=e.call(this)||this,s;if(c(r)||!r)s={next:r??void 0,error:n??void 0,complete:i??void 0};else{var u;o&&U.useDeprecatedNextContext?(u=Object.create(r),u.unsubscribe=function(){return o.unsubscribe()},s={next:r.next&&P(r.next,u),error:r.error&&P(r.error,u),complete:r.complete&&P(r.complete,u)}):s=r}return o.destination=new $(s),o}return t}(j);function g(e){B(e)}function N(e){throw e}var rr={closed:!0,next:R,error:N,complete:R},C=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function er(e){return e}function tr(e){return e.length===0?er:e.length===1?e[0]:function(r){return e.reduce(function(n,i){return i(n)},r)}}var h=function(){function e(t){t&&(this._subscribe=t)}return e.prototype.lift=function(t){var r=new e;return r.source=this,r.operator=t,r},e.prototype.subscribe=function(t,r,n){var i=this,o=ir(t)?t:new k(t,r,n);return _(function(){var s=i,u=s.operator,a=s.source;o.add(u?u.call(o,a):a?i._subscribe(o):i._trySubscribe(o))}),o},e.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(r){t.error(r)}},e.prototype.forEach=function(t,r){var n=this;return r=Y(r),new r(function(i,o){var s=new k({next:function(u){try{t(u)}catch(a){o(a),s.unsubscribe()}},error:o,complete:i});n.subscribe(s)})},e.prototype._subscribe=function(t){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(t)},e.prototype[C]=function(){return this},e.prototype.pipe=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return tr(t)(this)},e.prototype.toPromise=function(t){var r=this;return t=Y(t),new t(function(n,i){var o;r.subscribe(function(s){return o=s},function(s){return i(s)},function(){return n(o)})})},e.create=function(t){return new e(t)},e}();function Y(e){var t;return(t=e??U.Promise)!==null&&t!==void 0?t:Promise}function nr(e){return e&&c(e.next)&&c(e.error)&&c(e.complete)}function ir(e){return e&&e instanceof j||nr(e)&&V(e)}function or(e){return c(e==null?void 0:e.lift)}function kr(e){return function(t){if(or(t))return t.lift(function(r){try{return e(r,this)}catch(n){this.error(n)}});throw new TypeError("Unable to lift unknown Observable type")}}function Ur(e,t,r,n,i){return new sr(e,t,r,n,i)}var sr=function(e){d(t,e);function t(r,n,i,o,s,u){var a=e.call(this,r)||this;return a.onFinalize=s,a.shouldUnsubscribe=u,a._next=n?function(f){try{n(f)}catch(p){r.error(p)}}:e.prototype._next,a._error=o?function(f){try{o(f)}catch(p){r.error(p)}finally{this.unsubscribe()}}:e.prototype._error,a._complete=i?function(){try{i()}catch(f){r.error(f)}finally{this.unsubscribe()}}:e.prototype._complete,a}return t.prototype.unsubscribe=function(){var r;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;e.prototype.unsubscribe.call(this),!n&&((r=this.onFinalize)===null||r===void 0||r.call(this))}},t}(j),ur=G(function(e){return function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),ar=function(e){d(t,e);function t(){var r=e.call(this)||this;return r.closed=!1,r.currentObservers=null,r.observers=[],r.isStopped=!1,r.hasError=!1,r.thrownError=null,r}return t.prototype.lift=function(r){var n=new D(this,this);return n.operator=r,n},t.prototype._throwIfClosed=function(){if(this.closed)throw new ur},t.prototype.next=function(r){var n=this;_(function(){var i,o;if(n._throwIfClosed(),!n.isStopped){n.currentObservers||(n.currentObservers=Array.from(n.observers));try{for(var s=I(n.currentObservers),u=s.next();!u.done;u=s.next()){var a=u.value;a.next(r)}}catch(f){i={error:f}}finally{try{u&&!u.done&&(o=s.return)&&o.call(s)}finally{if(i)throw i.error}}}})},t.prototype.error=function(r){var n=this;_(function(){if(n._throwIfClosed(),!n.isStopped){n.hasError=n.isStopped=!0,n.thrownError=r;for(var i=n.observers;i.length;)i.shift().error(r)}})},t.prototype.complete=function(){var r=this;_(function(){if(r._throwIfClosed(),!r.isStopped){r.isStopped=!0;for(var n=r.observers;n.length;)n.shift().complete()}})},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){var r;return((r=this.observers)===null||r===void 0?void 0:r.length)>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(r){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,r)},t.prototype._subscribe=function(r){return this._throwIfClosed(),this._checkFinalizedStatuses(r),this._innerSubscribe(r)},t.prototype._innerSubscribe=function(r){var n=this,i=this,o=i.hasError,s=i.isStopped,u=i.observers;return o||s?H:(this.currentObservers=null,u.push(r),new m(function(){n.currentObservers=null,E(u,r)}))},t.prototype._checkFinalizedStatuses=function(r){var n=this,i=n.hasError,o=n.thrownError,s=n.isStopped;i?r.error(o):s&&r.complete()},t.prototype.asObservable=function(){var r=new h;return r.source=this,r},t.create=function(r,n){return new D(r,n)},t}(h),D=function(e){d(t,e);function t(r,n){var i=e.call(this)||this;return i.destination=r,i.source=n,i}return t.prototype.next=function(r){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.next)===null||i===void 0||i.call(n,r)},t.prototype.error=function(r){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.error)===null||i===void 0||i.call(n,r)},t.prototype.complete=function(){var r,n;(n=(r=this.destination)===null||r===void 0?void 0:r.complete)===null||n===void 0||n.call(r)},t.prototype._subscribe=function(r){var n,i;return(i=(n=this.source)===null||n===void 0?void 0:n.subscribe(r))!==null&&i!==void 0?i:H},t}(ar),z={now:function(){return(z.delegate||Date).now()},delegate:void 0},cr=function(e){d(t,e);function t(r,n){return e.call(this)||this}return t.prototype.schedule=function(r,n){return this},t}(m),A={setInterval:function(e,t){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];var i=A.delegate;return i!=null&&i.setInterval?i.setInterval.apply(i,v([e,t],y(r))):setInterval.apply(void 0,v([e,t],y(r)))},clearInterval:function(e){var t=A.delegate;return((t==null?void 0:t.clearInterval)||clearInterval)(e)},delegate:void 0},lr=function(e){d(t,e);function t(r,n){var i=e.call(this,r,n)||this;return i.scheduler=r,i.work=n,i.pending=!1,i}return t.prototype.schedule=function(r,n){var i;if(n===void 0&&(n=0),this.closed)return this;this.state=r;var o=this.id,s=this.scheduler;return o!=null&&(this.id=this.recycleAsyncId(s,o,n)),this.pending=!0,this.delay=n,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(s,this.id,n),this},t.prototype.requestAsyncId=function(r,n,i){return i===void 0&&(i=0),A.setInterval(r.flush.bind(r,this),i)},t.prototype.recycleAsyncId=function(r,n,i){if(i===void 0&&(i=0),i!=null&&this.delay===i&&this.pending===!1)return n;n!=null&&A.clearInterval(n)},t.prototype.execute=function(r,n){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var i=this._execute(r,n);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},t.prototype._execute=function(r,n){var i=!1,o;try{this.work(r)}catch(s){i=!0,o=s||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),o},t.prototype.unsubscribe=function(){if(!this.closed){var r=this,n=r.id,i=r.scheduler,o=i.actions;this.work=this.state=this.scheduler=null,this.pending=!1,E(o,this),n!=null&&(this.id=this.recycleAsyncId(i,n,null)),this.delay=null,e.prototype.unsubscribe.call(this)}},t}(cr),M=function(){function e(t,r){r===void 0&&(r=e.now),this.schedulerActionCtor=t,this.now=r}return e.prototype.schedule=function(t,r,n){return r===void 0&&(r=0),new this.schedulerActionCtor(this,t).schedule(n,r)},e.now=z.now,e}(),fr=function(e){d(t,e);function t(r,n){n===void 0&&(n=M.now);var i=e.call(this,r,n)||this;return i.actions=[],i._active=!1,i}return t.prototype.flush=function(r){var n=this.actions;if(this._active){n.push(r);return}var i;this._active=!0;do if(i=r.execute(r.state,r.delay))break;while(r=n.shift());if(this._active=!1,i){for(;r=n.shift();)r.unsubscribe();throw i}},t}(M),hr=new fr(lr),jr=hr,dr=function(e){return e&&typeof e.length=="number"&&typeof e!="function"};function pr(e){return c(e==null?void 0:e.then)}function vr(e){return c(e[C])}function yr(e){return Symbol.asyncIterator&&c(e==null?void 0:e[Symbol.asyncIterator])}function br(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function mr(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Sr=mr();function wr(e){return c(e==null?void 0:e[Sr])}function gr(e){return Q(this,arguments,function(){var r,n,i,o;return q(this,function(s){switch(s.label){case 0:r=e.getReader(),s.label=1;case 1:s.trys.push([1,,9,10]),s.label=2;case 2:return[4,x(r.read())];case 3:return n=s.sent(),i=n.value,o=n.done,o?[4,x(void 0)]:[3,5];case 4:return[2,s.sent()];case 5:return[4,x(i)];case 6:return[4,s.sent()];case 7:return s.sent(),[3,2];case 8:return[3,10];case 9:return r.releaseLock(),[7];case 10:return[2]}})})}function _r(e){return c(e==null?void 0:e.getReader)}function Cr(e){if(e instanceof h)return e;if(e!=null){if(vr(e))return Ir(e);if(dr(e))return Er(e);if(pr(e))return Ar(e);if(yr(e))return J(e);if(wr(e))return xr(e);if(_r(e))return Or(e)}throw br(e)}function Ir(e){return new h(function(t){var r=e[C]();if(c(r.subscribe))return r.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Er(e){return new h(function(t){for(var r=0;r<e.length&&!t.closed;r++)t.next(e[r]);t.complete()})}function Ar(e){return new h(function(t){e.then(function(r){t.closed||(t.next(r),t.complete())},function(r){return t.error(r)}).then(null,B)})}function xr(e){return new h(function(t){var r,n;try{for(var i=I(e),o=i.next();!o.done;o=i.next()){var s=o.value;if(t.next(s),t.closed)return}}catch(u){r={error:u}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}t.complete()})}function J(e){return new h(function(t){Pr(e,t).catch(function(r){return t.error(r)})})}function Or(e){return J(gr(e))}function Pr(e,t){var r,n,i,o;return W(this,void 0,void 0,function(){var s,u;return q(this,function(a){switch(a.label){case 0:a.trys.push([0,5,6,11]),r=X(e),a.label=1;case 1:return[4,r.next()];case 2:if(n=a.sent(),!!n.done)return[3,4];if(s=n.value,t.next(s),t.closed)return[2];a.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return u=a.sent(),i={error:u},[3,11];case 6:return a.trys.push([6,,9,10]),n&&!n.done&&(o=r.return)?[4,o.call(r)]:[3,8];case 7:a.sent(),a.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}})})}export{h as O,ar as S,c as a,Sr as b,Ur as c,z as d,vr as e,dr as f,pr as g,yr as h,Cr as i,wr as j,_r as k,br as l,er as m,k as n,kr as o,hr as p,R as q,gr as r,jr as s};