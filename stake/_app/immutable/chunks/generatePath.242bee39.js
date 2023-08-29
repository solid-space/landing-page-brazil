function D(e){for(var n=[],r=0;r<e.length;){var u=e[r];if(u==="*"||u==="+"||u==="?"){n.push({type:"MODIFIER",index:r,value:e[r++]});continue}if(u==="\\"){n.push({type:"ESCAPED_CHAR",index:r++,value:e[r++]});continue}if(u==="{"){n.push({type:"OPEN",index:r,value:e[r++]});continue}if(u==="}"){n.push({type:"CLOSE",index:r,value:e[r++]});continue}if(u===":"){for(var d="",i=r+1;i<e.length;){var f=e.charCodeAt(i);if(f>=48&&f<=57||f>=65&&f<=90||f>=97&&f<=122||f===95){d+=e[i++];continue}break}if(!d)throw new TypeError("Missing parameter name at ".concat(r));n.push({type:"NAME",index:r,value:d}),r=i;continue}if(u==="("){var p=1,a="",i=r+1;if(e[i]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(i));for(;i<e.length;){if(e[i]==="\\"){a+=e[i++]+e[i++];continue}if(e[i]===")"){if(p--,p===0){i++;break}}else if(e[i]==="("&&(p++,e[i+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(i));a+=e[i++]}if(p)throw new TypeError("Unbalanced pattern at ".concat(r));if(!a)throw new TypeError("Missing pattern at ".concat(r));n.push({type:"PATTERN",index:r,value:a}),r=i;continue}n.push({type:"CHAR",index:r,value:e[r++]})}return n.push({type:"END",index:r,value:""}),n}function M(e,n){n===void 0&&(n={});for(var r=D(e),u=n.prefixes,d=u===void 0?"./":u,i="[^".concat(H(n.delimiter||"/#?"),"]+?"),f=[],p=0,a=0,v="",c=function(h){if(a<r.length&&r[a].type===h)return r[a++].value},t=function(h){var w=c(h);if(w!==void 0)return w;var A=r[a],b=A.type,N=A.index;throw new TypeError("Unexpected ".concat(b," at ").concat(N,", expected ").concat(h))},E=function(){for(var h="",w;w=c("CHAR")||c("ESCAPED_CHAR");)h+=w;return h};a<r.length;){var y=c("CHAR"),x=c("NAME"),l=c("PATTERN");if(x||l){var o=y||"";d.indexOf(o)===-1&&(v+=o,o=""),v&&(f.push(v),v=""),f.push({name:x||p++,prefix:o,suffix:"",pattern:l||i,modifier:c("MODIFIER")||""});continue}var g=y||c("ESCAPED_CHAR");if(g){v+=g;continue}v&&(f.push(v),v="");var R=c("OPEN");if(R){var o=E(),T=c("NAME")||"",m=c("PATTERN")||"",P=E();t("CLOSE"),f.push({name:T||(m?p++:""),pattern:T&&!m?i:m,prefix:o,suffix:P,modifier:c("MODIFIER")||""});continue}t("END")}return f}function O(e,n){return S(M(e,n),n)}function S(e,n){n===void 0&&(n={});var r=I(n),u=n.encode,d=u===void 0?function(a){return a}:u,i=n.validate,f=i===void 0?!0:i,p=e.map(function(a){if(typeof a=="object")return new RegExp("^(?:".concat(a.pattern,")$"),r)});return function(a){for(var v="",c=0;c<e.length;c++){var t=e[c];if(typeof t=="string"){v+=t;continue}var E=a?a[t.name]:void 0,y=t.modifier==="?"||t.modifier==="*",x=t.modifier==="*"||t.modifier==="+";if(Array.isArray(E)){if(!x)throw new TypeError('Expected "'.concat(t.name,'" to not repeat, but got an array'));if(E.length===0){if(y)continue;throw new TypeError('Expected "'.concat(t.name,'" to not be empty'))}for(var l=0;l<E.length;l++){var o=d(E[l],t);if(f&&!p[c].test(o))throw new TypeError('Expected all "'.concat(t.name,'" to match "').concat(t.pattern,'", but got "').concat(o,'"'));v+=t.prefix+o+t.suffix}continue}if(typeof E=="string"||typeof E=="number"){var o=d(String(E),t);if(f&&!p[c].test(o))throw new TypeError('Expected "'.concat(t.name,'" to match "').concat(t.pattern,'", but got "').concat(o,'"'));v+=t.prefix+o+t.suffix;continue}if(!y){var g=x?"an array":"a string";throw new TypeError('Expected "'.concat(t.name,'" to be ').concat(g))}}return v}}function H(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function I(e){return e&&e.sensitive?"":"i"}const s={},F=1e4;let C=0;function _(e){if(s[e])return s[e];const n=O(e);return C<F&&(s[e]=n,C+=1),n}function L(e="/",n={}){return e==="/"?e:_(e)(n,{pretty:!0})}export{L as g};
