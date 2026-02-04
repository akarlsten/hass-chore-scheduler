/*! For license information please see chore-scheduler-card.js.LICENSE.txt */
(()=>{"use strict";var e={402(e,t,n){n.r(t),n.d(t,{Children:()=>y,Component:()=>r.uA,Fragment:()=>r.FK,PureComponent:()=>f,StrictMode:()=>ae,Suspense:()=>S,SuspenseList:()=>I,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:()=>Y,cloneElement:()=>te,createContext:()=>r.q6,createElement:()=>r.n,createFactory:()=>X,createPortal:()=>N,createRef:()=>r._3,default:()=>ce,findDOMNode:()=>re,flushSync:()=>ie,forwardRef:()=>g,hydrate:()=>z,isElement:()=>se,isFragment:()=>Q,isMemo:()=>ee,isValidElement:()=>Z,lazy:()=>E,memo:()=>h,render:()=>j,startTransition:()=>l,unmountComponentAtNode:()=>ne,unstable_batchedUpdates:()=>oe,useCallback:()=>o.hb,useContext:()=>o.NT,useDebugValue:()=>o.MN,useDeferredValue:()=>d,useEffect:()=>o.vJ,useErrorBoundary:()=>o.Md,useId:()=>o.Bi,useImperativeHandle:()=>o.Yn,useInsertionEffect:()=>p,useLayoutEffect:()=>o.Nf,useMemo:()=>o.Kr,useReducer:()=>o.WO,useRef:()=>o.li,useState:()=>o.J0,useSyncExternalStore:()=>s,useTransition:()=>u,version:()=>q});var r=n(172),o=n(994);function i(e,t){for(var n in t)e[n]=t[n];return e}function a(e,t){for(var n in e)if("__source"!==n&&!(n in t))return!0;for(var r in t)if("__source"!==r&&e[r]!==t[r])return!0;return!1}function s(e,t){var n=t(),r=(0,o.J0)({t:{__:n,u:t}}),i=r[0].t,a=r[1];return(0,o.Nf)(function(){i.__=n,i.u=t,c(i)&&a({t:i})},[e,n,t]),(0,o.vJ)(function(){return c(i)&&a({t:i}),e(function(){c(i)&&a({t:i})})},[e]),n}function c(e){var t,n,r=e.u,o=e.__;try{var i=r();return!((t=o)===(n=i)&&(0!==t||1/t==1/n)||t!=t&&n!=n)}catch(e){return!0}}function l(e){e()}function d(e){return e}function u(){return[!1,l]}var p=o.Nf;function f(e,t){this.props=e,this.context=t}function h(e,t){function n(e){var n=this.props.ref,r=n==e.ref;return!r&&n&&(n.call?n(null):n.current=null),t?!t(this.props,e)||!r:a(this.props,e)}function o(t){return this.shouldComponentUpdate=n,(0,r.n)(e,t)}return o.displayName="Memo("+(e.displayName||e.name)+")",o.prototype.isReactComponent=!0,o.__f=!0,o.type=e,o}(f.prototype=new r.uA).isPureReactComponent=!0,f.prototype.shouldComponentUpdate=function(e,t){return a(this.props,e)||a(this.state,t)};var _=r.fF.__b;r.fF.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),_&&_(e)};var m="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function g(e){function t(t){var n=i({},t);return delete n.ref,e(n,t.ref||null)}return t.$$typeof=m,t.render=e,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(e.displayName||e.name)+")",t}var v=function(e,t){return null==e?null:(0,r.v2)((0,r.v2)(e).map(t))},y={map:v,forEach:v,count:function(e){return e?(0,r.v2)(e).length:0},only:function(e){var t=(0,r.v2)(e);if(1!==t.length)throw"Children.only";return t[0]},toArray:r.v2},b=r.fF.__e;r.fF.__e=function(e,t,n,r){if(e.then)for(var o,i=t;i=i.__;)if((o=i.__c)&&o.__c)return null==t.__e&&(t.__e=n.__e,t.__k=n.__k),o.__c(e,t);b(e,t,n,r)};var w=r.fF.unmount;function x(e,t,n){return e&&(e.__c&&e.__c.__H&&(e.__c.__H.__.forEach(function(e){"function"==typeof e.__c&&e.__c()}),e.__c.__H=null),null!=(e=i({},e)).__c&&(e.__c.__P===n&&(e.__c.__P=t),e.__c.__e=!0,e.__c=null),e.__k=e.__k&&e.__k.map(function(e){return x(e,t,n)})),e}function k(e,t,n){return e&&n&&(e.__v=null,e.__k=e.__k&&e.__k.map(function(e){return k(e,t,n)}),e.__c&&e.__c.__P===t&&(e.__e&&n.appendChild(e.__e),e.__c.__e=!0,e.__c.__P=n)),e}function S(){this.__u=0,this.o=null,this.__b=null}function C(e){if(!e.__)return null;var t=e.__.__c;return t&&t.__a&&t.__a(e)}function E(e){var t,n,o,i=null;function a(a){if(t||(t=e()).then(function(e){e&&(i=e.default||e),o=!0},function(e){n=e,o=!0}),n)throw n;if(!o)throw t;return i?(0,r.n)(i,a):null}return a.displayName="Lazy",a.__f=!0,a}function I(){this.i=null,this.l=null}r.fF.unmount=function(e){var t=e.__c;t&&(t.__z=!0),t&&t.__R&&t.__R(),t&&32&e.__u&&(e.type=null),w&&w(e)},(S.prototype=new r.uA).__c=function(e,t){var n=t.__c,r=this;null==r.o&&(r.o=[]),r.o.push(n);var o=C(r.__v),i=!1,a=function(){i||r.__z||(i=!0,n.__R=null,o?o(c):c())};n.__R=a;var s=n.__P;n.__P=null;var c=function(){if(! --r.__u){if(r.state.__a){var e=r.state.__a;r.__v.__k[0]=k(e,e.__c.__P,e.__c.__O)}var t;for(r.setState({__a:r.__b=null});t=r.o.pop();)t.__P=s,t.forceUpdate()}};r.__u++||32&t.__u||r.setState({__a:r.__b=r.__v.__k[0]}),e.then(a,a)},S.prototype.componentWillUnmount=function(){this.o=[]},S.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=x(this.__b,n,o.__O=o.__P)}this.__b=null}var i=t.__a&&(0,r.n)(r.FK,null,e.fallback);return i&&(i.__u&=-33),[(0,r.n)(r.FK,null,t.__a?null:e.children),i]};var P=function(e,t,n){if(++n[1]===n[0]&&e.l.delete(t),e.props.revealOrder&&("t"!==e.props.revealOrder[0]||!e.l.size))for(n=e.i;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.i=n=n[2]}};function A(e){return this.getChildContext=function(){return e.context},e.children}function $(e){var t=this,n=e.h;if(t.componentWillUnmount=function(){(0,r.XX)(null,t.v),t.v=null,t.h=null},t.h&&t.h!==n&&t.componentWillUnmount(),!t.v){for(var o=t.__v;null!==o&&!o.__m&&null!==o.__;)o=o.__;t.h=n,t.v={nodeType:1,parentNode:n,childNodes:[],__k:{__m:o.__m},contains:function(){return!0},namespaceURI:n.namespaceURI,insertBefore:function(e,n){this.childNodes.push(e),t.h.insertBefore(e,n)},removeChild:function(e){this.childNodes.splice(this.childNodes.indexOf(e)>>>1,1),t.h.removeChild(e)}}}(0,r.XX)((0,r.n)(A,{context:t.context},e.__v),t.v)}function N(e,t){var n=(0,r.n)($,{__v:e,h:t});return n.containerInfo=t,n}(I.prototype=new r.uA).__a=function(e){var t=this,n=C(t.__v),r=t.l.get(e);return r[0]++,function(o){var i=function(){t.props.revealOrder?(r.push(o),P(t,e,r)):o()};n?n(i):i()}},I.prototype.render=function(e){this.i=null,this.l=new Map;var t=(0,r.v2)(e.children);e.revealOrder&&"b"===e.revealOrder[0]&&t.reverse();for(var n=t.length;n--;)this.l.set(t[n],this.i=[1,0,this.i]);return e.children},I.prototype.componentDidUpdate=I.prototype.componentDidMount=function(){var e=this;this.l.forEach(function(t,n){P(e,n,t)})};var D="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,O=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,T=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,R=/[A-Z0-9]/g,F="undefined"!=typeof document,M=function(e){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/:/fil|che|ra/).test(e)};function j(e,t,n){return null==t.__k&&(t.textContent=""),(0,r.XX)(e,t),"function"==typeof n&&n(),e?e.__c:null}function z(e,t,n){return(0,r.Qv)(e,t),"function"==typeof n&&n(),e?e.__c:null}r.uA.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(e){Object.defineProperty(r.uA.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})});var L=r.fF.event;function H(){}function W(){return this.cancelBubble}function U(){return this.defaultPrevented}r.fF.event=function(e){return L&&(e=L(e)),e.persist=H,e.isPropagationStopped=W,e.isDefaultPrevented=U,e.nativeEvent=e};var B,J={enumerable:!1,configurable:!0,get:function(){return this.class}},V=r.fF.vnode;r.fF.vnode=function(e){"string"==typeof e.type&&function(e){var t=e.props,n=e.type,o={},i=-1===n.indexOf("-");for(var a in t){var s=t[a];if(!("value"===a&&"defaultValue"in t&&null==s||F&&"children"===a&&"noscript"===n||"class"===a||"className"===a)){var c=a.toLowerCase();"defaultValue"===a&&"value"in t&&null==t.value?a="value":"download"===a&&!0===s?s="":"translate"===c&&"no"===s?s=!1:"o"===c[0]&&"n"===c[1]?"ondoubleclick"===c?a="ondblclick":"onchange"!==c||"input"!==n&&"textarea"!==n||M(t.type)?"onfocus"===c?a="onfocusin":"onblur"===c?a="onfocusout":T.test(a)&&(a=c):c=a="oninput":i&&O.test(a)?a=a.replace(R,"-$&").toLowerCase():null===s&&(s=void 0),"oninput"===c&&o[a=c]&&(a="oninputCapture"),o[a]=s}}"select"==n&&o.multiple&&Array.isArray(o.value)&&(o.value=(0,r.v2)(t.children).forEach(function(e){e.props.selected=-1!=o.value.indexOf(e.props.value)})),"select"==n&&null!=o.defaultValue&&(o.value=(0,r.v2)(t.children).forEach(function(e){e.props.selected=o.multiple?-1!=o.defaultValue.indexOf(e.props.value):o.defaultValue==e.props.value})),t.class&&!t.className?(o.class=t.class,Object.defineProperty(o,"className",J)):(t.className&&!t.class||t.class&&t.className)&&(o.class=o.className=t.className),e.props=o}(e),e.$$typeof=D,V&&V(e)};var K=r.fF.__r;r.fF.__r=function(e){K&&K(e),B=e.__c};var G=r.fF.diffed;r.fF.diffed=function(e){G&&G(e);var t=e.props,n=e.__e;null!=n&&"textarea"===e.type&&"value"in t&&t.value!==n.value&&(n.value=null==t.value?"":t.value),B=null};var Y={ReactCurrentDispatcher:{current:{readContext:function(e){return B.__n[e.__c].props.value},useCallback:o.hb,useContext:o.NT,useDebugValue:o.MN,useDeferredValue:d,useEffect:o.vJ,useId:o.Bi,useImperativeHandle:o.Yn,useInsertionEffect:p,useLayoutEffect:o.Nf,useMemo:o.Kr,useReducer:o.WO,useRef:o.li,useState:o.J0,useSyncExternalStore:s,useTransition:u}}},q="18.3.1";function X(e){return r.n.bind(null,e)}function Z(e){return!!e&&e.$$typeof===D}function Q(e){return Z(e)&&e.type===r.FK}function ee(e){return!!e&&!!e.displayName&&("string"==typeof e.displayName||e.displayName instanceof String)&&e.displayName.startsWith("Memo(")}function te(e){return Z(e)?r.Ob.apply(null,arguments):e}function ne(e){return!!e.__k&&((0,r.XX)(null,e),!0)}function re(e){return e&&(e.base||1===e.nodeType&&e)||null}var oe=function(e,t){return e(t)},ie=function(e,t){return e(t)},ae=r.FK,se=Z,ce={useState:o.J0,useId:o.Bi,useReducer:o.WO,useEffect:o.vJ,useLayoutEffect:o.Nf,useInsertionEffect:p,useTransition:u,useDeferredValue:d,useSyncExternalStore:s,startTransition:l,useRef:o.li,useImperativeHandle:o.Yn,useMemo:o.Kr,useCallback:o.hb,useContext:o.NT,useDebugValue:o.MN,version:"18.3.1",Children:y,render:j,hydrate:z,unmountComponentAtNode:ne,createPortal:N,createElement:r.n,createContext:r.q6,createFactory:X,cloneElement:te,createRef:r._3,Fragment:r.FK,isValidElement:Z,isElement:se,isFragment:Q,isMemo:ee,findDOMNode:re,Component:r.uA,PureComponent:f,memo:h,forwardRef:g,flushSync:ie,unstable_batchedUpdates:oe,StrictMode:ae,Suspense:S,SuspenseList:I,lazy:E,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:Y}},172(e,t,n){n.d(t,{FK:()=>S,Ob:()=>G,Qv:()=>K,XX:()=>V,_3:()=>k,fF:()=>o,n:()=>w,q6:()=>Y,uA:()=>C,v2:()=>O});var r,o,i,a,s,c,l,d,u,p,f,h,_={},m=[],g=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,v=Array.isArray;function y(e,t){for(var n in t)e[n]=t[n];return e}function b(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function w(e,t,n){var o,i,a,s={};for(a in t)"key"==a?o=t[a]:"ref"==a?i=t[a]:s[a]=t[a];if(arguments.length>2&&(s.children=arguments.length>3?r.call(arguments,2):n),"function"==typeof e&&null!=e.defaultProps)for(a in e.defaultProps)void 0===s[a]&&(s[a]=e.defaultProps[a]);return x(e,s,o,i,null)}function x(e,t,n,r,a){var s={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:null==a?++i:a,__i:-1,__u:0};return null==a&&null!=o.vnode&&o.vnode(s),s}function k(){return{current:null}}function S(e){return e.children}function C(e,t){this.props=e,this.context=t}function E(e,t){if(null==t)return e.__?E(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?E(e):null}function I(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return I(e)}}function P(e){(!e.__d&&(e.__d=!0)&&a.push(e)&&!A.__r++||s!=o.debounceRendering)&&((s=o.debounceRendering)||c)(A)}function A(){for(var e,t,n,r,i,s,c,d=1;a.length;)a.length>d&&a.sort(l),e=a.shift(),d=a.length,e.__d&&(n=void 0,r=void 0,i=(r=(t=e).__v).__e,s=[],c=[],t.__P&&((n=y({},r)).__v=r.__v+1,o.vnode&&o.vnode(n),j(t.__P,n,r,t.__n,t.__P.namespaceURI,32&r.__u?[i]:null,s,null==i?E(r):i,!!(32&r.__u),c),n.__v=r.__v,n.__.__k[n.__i]=n,L(s,n,c),r.__e=r.__=null,n.__e!=i&&I(n)));A.__r=0}function $(e,t,n,r,o,i,a,s,c,l,d){var u,p,f,h,g,v,y,b=r&&r.__k||m,w=t.length;for(c=N(n,t,b,c,w),u=0;u<w;u++)null!=(f=n.__k[u])&&(p=-1==f.__i?_:b[f.__i]||_,f.__i=u,v=j(e,f,p,o,i,a,s,c,l,d),h=f.__e,f.ref&&p.ref!=f.ref&&(p.ref&&U(p.ref,null,f),d.push(f.ref,f.__c||h,f)),null==g&&null!=h&&(g=h),(y=!!(4&f.__u))||p.__k===f.__k?c=D(f,c,e,y):"function"==typeof f.type&&void 0!==v?c=v:h&&(c=h.nextSibling),f.__u&=-7);return n.__e=g,c}function N(e,t,n,r,o){var i,a,s,c,l,d=n.length,u=d,p=0;for(e.__k=new Array(o),i=0;i<o;i++)null!=(a=t[i])&&"boolean"!=typeof a&&"function"!=typeof a?("string"==typeof a||"number"==typeof a||"bigint"==typeof a||a.constructor==String?a=e.__k[i]=x(null,a,null,null,null):v(a)?a=e.__k[i]=x(S,{children:a},null,null,null):void 0===a.constructor&&a.__b>0?a=e.__k[i]=x(a.type,a.props,a.key,a.ref?a.ref:null,a.__v):e.__k[i]=a,c=i+p,a.__=e,a.__b=e.__b+1,s=null,-1!=(l=a.__i=T(a,n,c,u))&&(u--,(s=n[l])&&(s.__u|=2)),null==s||null==s.__v?(-1==l&&(o>d?p--:o<d&&p++),"function"!=typeof a.type&&(a.__u|=4)):l!=c&&(l==c-1?p--:l==c+1?p++:(l>c?p--:p++,a.__u|=4))):e.__k[i]=null;if(u)for(i=0;i<d;i++)null!=(s=n[i])&&!(2&s.__u)&&(s.__e==r&&(r=E(s)),B(s,s));return r}function D(e,t,n,r){var o,i;if("function"==typeof e.type){for(o=e.__k,i=0;o&&i<o.length;i++)o[i]&&(o[i].__=e,t=D(o[i],t,n,r));return t}e.__e!=t&&(r&&(t&&e.type&&!t.parentNode&&(t=E(e)),n.insertBefore(e.__e,t||null)),t=e.__e);do{t=t&&t.nextSibling}while(null!=t&&8==t.nodeType);return t}function O(e,t){return t=t||[],null==e||"boolean"==typeof e||(v(e)?e.some(function(e){O(e,t)}):t.push(e)),t}function T(e,t,n,r){var o,i,a,s=e.key,c=e.type,l=t[n],d=null!=l&&!(2&l.__u);if(null===l&&null==s||d&&s==l.key&&c==l.type)return n;if(r>(d?1:0))for(o=n-1,i=n+1;o>=0||i<t.length;)if(null!=(l=t[a=o>=0?o--:i++])&&!(2&l.__u)&&s==l.key&&c==l.type)return a;return-1}function R(e,t,n){"-"==t[0]?e.setProperty(t,null==n?"":n):e[t]=null==n?"":"number"!=typeof n||g.test(t)?n:n+"px"}function F(e,t,n,r,o){var i,a;e:if("style"==t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof r&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||R(e.style,t,"");if(n)for(t in n)r&&n[t]==r[t]||R(e.style,t,n[t])}else if("o"==t[0]&&"n"==t[1])i=t!=(t=t.replace(d,"$1")),a=t.toLowerCase(),t=a in e||"onFocusOut"==t||"onFocusIn"==t?a.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?r?n.u=r.u:(n.u=u,e.addEventListener(t,i?f:p,i)):e.removeEventListener(t,i?f:p,i);else{if("http://www.w3.org/2000/svg"==o)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=t&&"height"!=t&&"href"!=t&&"list"!=t&&"form"!=t&&"tabIndex"!=t&&"download"!=t&&"rowSpan"!=t&&"colSpan"!=t&&"role"!=t&&"popover"!=t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null==n||!1===n&&"-"!=t[4]?e.removeAttribute(t):e.setAttribute(t,"popover"==t&&1==n?"":n))}}function M(e){return function(t){if(this.l){var n=this.l[t.type+e];if(null==t.t)t.t=u++;else if(t.t<n.u)return;return n(o.event?o.event(t):t)}}}function j(e,t,n,r,i,a,s,c,l,d){var u,p,f,h,_,m,g,w,x,k,E,I,P,A,N,D,O,T=t.type;if(void 0!==t.constructor)return null;128&n.__u&&(l=!!(32&n.__u),a=[c=t.__e=n.__e]),(u=o.__b)&&u(t);e:if("function"==typeof T)try{if(w=t.props,x="prototype"in T&&T.prototype.render,k=(u=T.contextType)&&r[u.__c],E=u?k?k.props.value:u.__:r,n.__c?g=(p=t.__c=n.__c).__=p.__E:(x?t.__c=p=new T(w,E):(t.__c=p=new C(w,E),p.constructor=T,p.render=J),k&&k.sub(p),p.state||(p.state={}),p.__n=r,f=p.__d=!0,p.__h=[],p._sb=[]),x&&null==p.__s&&(p.__s=p.state),x&&null!=T.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=y({},p.__s)),y(p.__s,T.getDerivedStateFromProps(w,p.__s))),h=p.props,_=p.state,p.__v=t,f)x&&null==T.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),x&&null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(x&&null==T.getDerivedStateFromProps&&w!==h&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(w,E),t.__v==n.__v||!p.__e&&null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(w,p.__s,E)){for(t.__v!=n.__v&&(p.props=w,p.state=p.__s,p.__d=!1),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(e){e&&(e.__=t)}),I=0;I<p._sb.length;I++)p.__h.push(p._sb[I]);p._sb=[],p.__h.length&&s.push(p);break e}null!=p.componentWillUpdate&&p.componentWillUpdate(w,p.__s,E),x&&null!=p.componentDidUpdate&&p.__h.push(function(){p.componentDidUpdate(h,_,m)})}if(p.context=E,p.props=w,p.__P=e,p.__e=!1,P=o.__r,A=0,x){for(p.state=p.__s,p.__d=!1,P&&P(t),u=p.render(p.props,p.state,p.context),N=0;N<p._sb.length;N++)p.__h.push(p._sb[N]);p._sb=[]}else do{p.__d=!1,P&&P(t),u=p.render(p.props,p.state,p.context),p.state=p.__s}while(p.__d&&++A<25);p.state=p.__s,null!=p.getChildContext&&(r=y(y({},r),p.getChildContext())),x&&!f&&null!=p.getSnapshotBeforeUpdate&&(m=p.getSnapshotBeforeUpdate(h,_)),D=u,null!=u&&u.type===S&&null==u.key&&(D=H(u.props.children)),c=$(e,v(D)?D:[D],t,n,r,i,a,s,c,l,d),p.base=t.__e,t.__u&=-161,p.__h.length&&s.push(p),g&&(p.__E=p.__=null)}catch(e){if(t.__v=null,l||null!=a)if(e.then){for(t.__u|=l?160:128;c&&8==c.nodeType&&c.nextSibling;)c=c.nextSibling;a[a.indexOf(c)]=null,t.__e=c}else{for(O=a.length;O--;)b(a[O]);z(t)}else t.__e=n.__e,t.__k=n.__k,e.then||z(t);o.__e(e,t,n)}else null==a&&t.__v==n.__v?(t.__k=n.__k,t.__e=n.__e):c=t.__e=W(n.__e,t,n,r,i,a,s,l,d);return(u=o.diffed)&&u(t),128&t.__u?void 0:c}function z(e){e&&e.__c&&(e.__c.__e=!0),e&&e.__k&&e.__k.forEach(z)}function L(e,t,n){for(var r=0;r<n.length;r++)U(n[r],n[++r],n[++r]);o.__c&&o.__c(t,e),e.some(function(t){try{e=t.__h,t.__h=[],e.some(function(e){e.call(t)})}catch(e){o.__e(e,t.__v)}})}function H(e){return"object"!=typeof e||null==e||e.__b&&e.__b>0?e:v(e)?e.map(H):y({},e)}function W(e,t,n,i,a,s,c,l,d){var u,p,f,h,m,g,y,w=n.props||_,x=t.props,k=t.type;if("svg"==k?a="http://www.w3.org/2000/svg":"math"==k?a="http://www.w3.org/1998/Math/MathML":a||(a="http://www.w3.org/1999/xhtml"),null!=s)for(u=0;u<s.length;u++)if((m=s[u])&&"setAttribute"in m==!!k&&(k?m.localName==k:3==m.nodeType)){e=m,s[u]=null;break}if(null==e){if(null==k)return document.createTextNode(x);e=document.createElementNS(a,k,x.is&&x),l&&(o.__m&&o.__m(t,s),l=!1),s=null}if(null==k)w===x||l&&e.data==x||(e.data=x);else{if(s=s&&r.call(e.childNodes),!l&&null!=s)for(w={},u=0;u<e.attributes.length;u++)w[(m=e.attributes[u]).name]=m.value;for(u in w)if(m=w[u],"children"==u);else if("dangerouslySetInnerHTML"==u)f=m;else if(!(u in x)){if("value"==u&&"defaultValue"in x||"checked"==u&&"defaultChecked"in x)continue;F(e,u,null,m,a)}for(u in x)m=x[u],"children"==u?h=m:"dangerouslySetInnerHTML"==u?p=m:"value"==u?g=m:"checked"==u?y=m:l&&"function"!=typeof m||w[u]===m||F(e,u,m,w[u],a);if(p)l||f&&(p.__html==f.__html||p.__html==e.innerHTML)||(e.innerHTML=p.__html),t.__k=[];else if(f&&(e.innerHTML=""),$("template"==t.type?e.content:e,v(h)?h:[h],t,n,i,"foreignObject"==k?"http://www.w3.org/1999/xhtml":a,s,c,s?s[0]:n.__k&&E(n,0),l,d),null!=s)for(u=s.length;u--;)b(s[u]);l||(u="value","progress"==k&&null==g?e.removeAttribute("value"):null!=g&&(g!==e[u]||"progress"==k&&!g||"option"==k&&g!=w[u])&&F(e,u,g,w[u],a),u="checked",null!=y&&y!=e[u]&&F(e,u,y,w[u],a))}return e}function U(e,t,n){try{if("function"==typeof e){var r="function"==typeof e.__u;r&&e.__u(),r&&null==t||(e.__u=e(t))}else e.current=t}catch(e){o.__e(e,n)}}function B(e,t,n){var r,i;if(o.unmount&&o.unmount(e),(r=e.ref)&&(r.current&&r.current!=e.__e||U(r,null,t)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){o.__e(e,t)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&B(r[i],t,n||"function"!=typeof e.type);n||b(e.__e),e.__c=e.__=e.__e=void 0}function J(e,t,n){return this.constructor(e,n)}function V(e,t,n){var i,a,s,c;t==document&&(t=document.documentElement),o.__&&o.__(e,t),a=(i="function"==typeof n)?null:n&&n.__k||t.__k,s=[],c=[],j(t,e=(!i&&n||t).__k=w(S,null,[e]),a||_,_,t.namespaceURI,!i&&n?[n]:a?null:t.firstChild?r.call(t.childNodes):null,s,!i&&n?n:a?a.__e:t.firstChild,i,c),L(s,e,c)}function K(e,t){V(e,t,K)}function G(e,t,n){var o,i,a,s,c=y({},e.props);for(a in e.type&&e.type.defaultProps&&(s=e.type.defaultProps),t)"key"==a?o=t[a]:"ref"==a?i=t[a]:c[a]=void 0===t[a]&&null!=s?s[a]:t[a];return arguments.length>2&&(c.children=arguments.length>3?r.call(arguments,2):n),x(e.type,c,o||e.key,i||e.ref,null)}function Y(e){function t(e){var n,r;return this.getChildContext||(n=new Set,(r={})[t.__c]=this,this.getChildContext=function(){return r},this.componentWillUnmount=function(){n=null},this.shouldComponentUpdate=function(e){this.props.value!=e.value&&n.forEach(function(e){e.__e=!0,P(e)})},this.sub=function(e){n.add(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){n&&n.delete(e),t&&t.call(e)}}),e.children}return t.__c="__cC"+h++,t.__=e,t.Provider=t.__l=(t.Consumer=function(e,t){return e.children(t)}).contextType=t,t}r=m.slice,o={__e:function(e,t,n,r){for(var o,i,a;t=t.__;)if((o=t.__c)&&!o.__)try{if((i=o.constructor)&&null!=i.getDerivedStateFromError&&(o.setState(i.getDerivedStateFromError(e)),a=o.__d),null!=o.componentDidCatch&&(o.componentDidCatch(e,r||{}),a=o.__d),a)return o.__E=o}catch(t){e=t}throw e}},i=0,C.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!=this.state?this.__s:this.__s=y({},this.state),"function"==typeof e&&(e=e(y({},n),this.props)),e&&y(n,e),null!=e&&this.__v&&(t&&this._sb.push(t),P(this))},C.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),P(this))},C.prototype.render=S,a=[],c="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,l=function(e,t){return e.__v.__b-t.__v.__b},A.__r=0,d=/(PointerCapture)$|Capture$/i,u=0,p=M(!1),f=M(!0),h=0},994(e,t,n){n.d(t,{Bi:()=>A,J0:()=>v,Kr:()=>S,MN:()=>I,Md:()=>P,NT:()=>E,Nf:()=>w,WO:()=>y,Yn:()=>k,hb:()=>C,li:()=>x,vJ:()=>b});var r,o,i,a,s=n(172),c=0,l=[],d=s.fF,u=d.__b,p=d.__r,f=d.diffed,h=d.__c,_=d.unmount,m=d.__;function g(e,t){d.__h&&d.__h(o,e,c||t),c=0;var n=o.__H||(o.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function v(e){return c=1,y(F,e)}function y(e,t,n){var i=g(r++,2);if(i.t=e,!i.__c&&(i.__=[n?n(t):F(void 0,t),function(e){var t=i.__N?i.__N[0]:i.__[0],n=i.t(t,e);t!==n&&(i.__N=[n,i.__[1]],i.__c.setState({}))}],i.__c=o,!o.__f)){var a=function(e,t,n){if(!i.__c.__H)return!0;var r=i.__c.__H.__.filter(function(e){return!!e.__c});if(r.every(function(e){return!e.__N}))return!s||s.call(this,e,t,n);var o=i.__c.props!==e;return r.forEach(function(e){if(e.__N){var t=e.__[0];e.__=e.__N,e.__N=void 0,t!==e.__[0]&&(o=!0)}}),s&&s.call(this,e,t,n)||o};o.__f=!0;var s=o.shouldComponentUpdate,c=o.componentWillUpdate;o.componentWillUpdate=function(e,t,n){if(this.__e){var r=s;s=void 0,a(e,t,n),s=r}c&&c.call(this,e,t,n)},o.shouldComponentUpdate=a}return i.__N||i.__}function b(e,t){var n=g(r++,3);!d.__s&&R(n.__H,t)&&(n.__=e,n.u=t,o.__H.__h.push(n))}function w(e,t){var n=g(r++,4);!d.__s&&R(n.__H,t)&&(n.__=e,n.u=t,o.__h.push(n))}function x(e){return c=5,S(function(){return{current:e}},[])}function k(e,t,n){c=6,w(function(){if("function"==typeof e){var n=e(t());return function(){e(null),n&&"function"==typeof n&&n()}}if(e)return e.current=t(),function(){return e.current=null}},null==n?n:n.concat(e))}function S(e,t){var n=g(r++,7);return R(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function C(e,t){return c=8,S(function(){return e},t)}function E(e){var t=o.context[e.__c],n=g(r++,9);return n.c=e,t?(null==n.__&&(n.__=!0,t.sub(o)),t.props.value):e.__}function I(e,t){d.useDebugValue&&d.useDebugValue(t?t(e):e)}function P(e){var t=g(r++,10),n=v();return t.__=e,o.componentDidCatch||(o.componentDidCatch=function(e,r){t.__&&t.__(e,r),n[1](e)}),[n[0],function(){n[1](void 0)}]}function A(){var e=g(r++,11);if(!e.__){for(var t=o.__v;null!==t&&!t.__m&&null!==t.__;)t=t.__;var n=t.__m||(t.__m=[0,0]);e.__="P"+n[0]+"-"+n[1]++}return e.__}function $(){for(var e;e=l.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(O),e.__H.__h.forEach(T),e.__H.__h=[]}catch(t){e.__H.__h=[],d.__e(t,e.__v)}}d.__b=function(e){o=null,u&&u(e)},d.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),m&&m(e,t)},d.__r=function(e){p&&p(e),r=0;var t=(o=e.__c).__H;t&&(i===o?(t.__h=[],o.__h=[],t.__.forEach(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})):(t.__h.forEach(O),t.__h.forEach(T),t.__h=[],r=0)),i=o},d.diffed=function(e){f&&f(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(1!==l.push(t)&&a===d.requestAnimationFrame||((a=d.requestAnimationFrame)||D)($)),t.__H.__.forEach(function(e){e.u&&(e.__H=e.u),e.u=void 0})),i=o=null},d.__c=function(e,t){t.some(function(e){try{e.__h.forEach(O),e.__h=e.__h.filter(function(e){return!e.__||T(e)})}catch(n){t.some(function(e){e.__h&&(e.__h=[])}),t=[],d.__e(n,e.__v)}}),h&&h(e,t)},d.unmount=function(e){_&&_(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach(function(e){try{O(e)}catch(e){t=e}}),n.__H=void 0,t&&d.__e(t,n.__v))};var N="function"==typeof requestAnimationFrame;function D(e){var t,n=function(){clearTimeout(r),N&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);N&&(t=requestAnimationFrame(n))}function O(e){var t=o,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),o=t}function T(e){var t=o;e.__c=e.__(),o=t}function R(e,t){return!e||e.length!==t.length||t.some(function(t,n){return t!==e[n]})}function F(e,t){return"function"==typeof t?t(e):t}},493(e,t,n){var r=n(402),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},i=r.useState,a=r.useEffect,s=r.useLayoutEffect,c=r.useDebugValue;function l(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!o(e,n)}catch(e){return!0}}var d="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),r=i({inst:{value:n,getSnapshot:t}}),o=r[0].inst,d=r[1];return s(function(){o.value=n,o.getSnapshot=t,l(o)&&d({inst:o})},[e,n,t]),a(function(){return l(o)&&d({inst:o}),e(function(){l(o)&&d({inst:o})})},[e]),c(n),n};t.useSyncExternalStore=void 0!==r.useSyncExternalStore?r.useSyncExternalStore:d},162(e,t,n){var r=n(402),o=n(888),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},a=o.useSyncExternalStore,s=r.useRef,c=r.useEffect,l=r.useMemo,d=r.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,o){var u=s(null);if(null===u.current){var p={hasValue:!1,value:null};u.current=p}else p=u.current;u=l(function(){function e(e){if(!c){if(c=!0,a=e,e=r(e),void 0!==o&&p.hasValue){var t=p.value;if(o(t,e))return s=t}return s=e}if(t=s,i(a,e))return t;var n=r(e);return void 0!==o&&o(t,n)?(a=e,t):(a=e,s=n)}var a,s,c=!1,l=void 0===n?null:n;return[function(){return e(t())},null===l?void 0:function(){return e(l())}]},[t,n,r,o]);var f=a(e,u[0],u[1]);return c(function(){p.hasValue=!0,p.value=f},[f]),d(f),f}},888(e,t,n){e.exports=n(493)},242(e,t,n){e.exports=n(162)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nc=void 0;var r=n(172),o=0;function i(e,t,n,i,a,s){t||(t={});var c,l,d=t;if("ref"in d)for(l in d={},t)"ref"==l?c=t[l]:d[l]=t[l];var u={type:e,props:d,key:n,ref:c,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--o,__i:-1,__u:0,__source:a,__self:s};if("function"==typeof e&&(c=e.defaultProps))for(l in c)void 0===d[l]&&(d[l]=c[l]);return r.fF.vnode&&r.fF.vnode(u),u}Array.isArray;var a=function(){return a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a.apply(this,arguments)};function s(e,t,n){if(n||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))}Object.create,Object.create,"function"==typeof SuppressedError&&SuppressedError;var c=n(402),l="-ms-",d="-moz-",u="-webkit-",p="comm",f="rule",h="decl",_="@keyframes",m=Math.abs,g=String.fromCharCode,v=Object.assign;function y(e){return e.trim()}function b(e,t){return(e=t.exec(e))?e[0]:e}function w(e,t,n){return e.replace(t,n)}function x(e,t,n){return e.indexOf(t,n)}function k(e,t){return 0|e.charCodeAt(t)}function S(e,t,n){return e.slice(t,n)}function C(e){return e.length}function E(e){return e.length}function I(e,t){return t.push(e),e}function P(e,t){return e.filter(function(e){return!b(e,t)})}var A=1,$=1,N=0,D=0,O=0,T="";function R(e,t,n,r,o,i,a,s){return{value:e,root:t,parent:n,type:r,props:o,children:i,line:A,column:$,length:a,return:"",siblings:s}}function F(e,t){return v(R("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function M(e){for(;e.root;)e=F(e.root,{children:[e]});I(e,e.siblings)}function j(){return O=D>0?k(T,--D):0,$--,10===O&&($=1,A--),O}function z(){return O=D<N?k(T,D++):0,$++,10===O&&($=1,A++),O}function L(){return k(T,D)}function H(){return D}function W(e,t){return S(T,e,t)}function U(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function B(e){return y(W(D-1,K(91===e?e+2:40===e?e+1:e)))}function J(e){for(;(O=L())&&O<33;)z();return U(e)>2||U(O)>3?"":" "}function V(e,t){for(;--t&&z()&&!(O<48||O>102||O>57&&O<65||O>70&&O<97););return W(e,H()+(t<6&&32==L()&&32==z()))}function K(e){for(;z();)switch(O){case e:return D;case 34:case 39:34!==e&&39!==e&&K(O);break;case 40:41===e&&K(e);break;case 92:z()}return D}function G(e,t){for(;z()&&e+O!==57&&(e+O!==84||47!==L()););return"/*"+W(t,D-1)+"*"+g(47===e?e:z())}function Y(e){for(;!U(L());)z();return W(e,D)}function q(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function X(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case"@namespace":case h:return e.return=e.return||e.value;case p:return"";case _:return e.return=e.value+"{"+q(e.children,r)+"}";case f:if(!C(e.value=e.props.join(",")))return""}return C(n=q(e.children,r))?e.return=e.value+"{"+n+"}":""}function Z(e,t,n){switch(function(e,t){return 45^k(e,0)?(((t<<2^k(e,0))<<2^k(e,1))<<2^k(e,2))<<2^k(e,3):0}(e,t)){case 5103:return u+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return u+e+e;case 4855:return u+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return d+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return u+e+d+e+l+e+e;case 5936:switch(k(e,t+11)){case 114:return u+e+l+w(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return u+e+l+w(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return u+e+l+w(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return u+e+l+e+e;case 6165:return u+e+l+"flex-"+e+e;case 5187:return u+e+w(e,/(\w+).+(:[^]+)/,u+"box-$1$2"+l+"flex-$1$2")+e;case 5443:return u+e+l+"flex-item-"+w(e,/flex-|-self/g,"")+(b(e,/flex-|baseline/)?"":l+"grid-row-"+w(e,/flex-|-self/g,""))+e;case 4675:return u+e+l+"flex-line-pack"+w(e,/align-content|flex-|-self/g,"")+e;case 5548:return u+e+l+w(e,"shrink","negative")+e;case 5292:return u+e+l+w(e,"basis","preferred-size")+e;case 6060:return u+"box-"+w(e,"-grow","")+u+e+l+w(e,"grow","positive")+e;case 4554:return u+w(e,/([^-])(transform)/g,"$1"+u+"$2")+e;case 6187:return w(w(w(e,/(zoom-|grab)/,u+"$1"),/(image-set)/,u+"$1"),e,"")+e;case 5495:case 3959:return w(e,/(image-set\([^]*)/,u+"$1$`$1");case 4968:return w(w(e,/(.+:)(flex-)?(.*)/,u+"box-pack:$3"+l+"flex-pack:$3"),/space-between/,"justify")+u+e+e;case 4200:if(!b(e,/flex-|baseline/))return l+"grid-column-align"+S(e,t)+e;break;case 2592:case 3360:return l+w(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,b(e.props,/grid-\w+-end/)})?~x(e+(n=n[t].value),"span",0)?e:l+w(e,"-start","")+e+l+"grid-row-span:"+(~x(n,"span",0)?b(n,/\d+/):+b(n,/\d+/)-+b(e,/\d+/))+";":l+w(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(e){return b(e.props,/grid-\w+-start/)})?e:l+w(w(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return w(e,/(.+)-inline(.+)/,u+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(C(e)-1-t>6)switch(k(e,t+1)){case 109:if(45!==k(e,t+4))break;case 102:return w(e,/(.+:)(.+)-([^]+)/,"$1"+u+"$2-$3$1"+d+(108==k(e,t+3)?"$3":"$2-$3"))+e;case 115:return~x(e,"stretch",0)?Z(w(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return w(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,o,i,a,s){return l+n+":"+r+s+(o?l+n+"-span:"+(i?a:+a-+r)+s:"")+e});case 4949:if(121===k(e,t+6))return w(e,":",":"+u)+e;break;case 6444:switch(k(e,45===k(e,14)?18:11)){case 120:return w(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+u+(45===k(e,14)?"inline-":"")+"box$3$1"+u+"$2$3$1"+l+"$2box$3")+e;case 100:return w(e,":",":"+l)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return w(e,"scroll-","scroll-snap-")+e}return e}function Q(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case h:return void(e.return=Z(e.value,e.length,n));case _:return q([F(e,{value:w(e.value,"@","@"+u)})],r);case f:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,function(t){switch(b(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":M(F(e,{props:[w(t,/:(read-\w+)/,":-moz-$1")]})),M(F(e,{props:[t]})),v(e,{props:P(n,r)});break;case"::placeholder":M(F(e,{props:[w(t,/:(plac\w+)/,":"+u+"input-$1")]})),M(F(e,{props:[w(t,/:(plac\w+)/,":-moz-$1")]})),M(F(e,{props:[w(t,/:(plac\w+)/,l+"input-$1")]})),M(F(e,{props:[t]})),v(e,{props:P(n,r)})}return""})}}function ee(e){return function(e){return T="",e}(te("",null,null,null,[""],e=function(e){return A=$=1,N=C(T=e),D=0,[]}(e),0,[0],e))}function te(e,t,n,r,o,i,a,s,c){for(var l=0,d=0,u=a,p=0,f=0,h=0,_=1,v=1,y=1,b=0,E="",P=o,A=i,$=r,N=E;v;)switch(h=b,b=z()){case 40:if(108!=h&&58==k(N,u-1)){-1!=x(N+=w(B(b),"&","&\f"),"&\f",m(l?s[l-1]:0))&&(y=-1);break}case 34:case 39:case 91:N+=B(b);break;case 9:case 10:case 13:case 32:N+=J(h);break;case 92:N+=V(H()-1,7);continue;case 47:switch(L()){case 42:case 47:I(re(G(z(),H()),t,n,c),c),5!=U(h||1)&&5!=U(L()||1)||!C(N)||" "===S(N,-1,void 0)||(N+=" ");break;default:N+="/"}break;case 123*_:s[l++]=C(N)*y;case 125*_:case 59:case 0:switch(b){case 0:case 125:v=0;case 59+d:-1==y&&(N=w(N,/\f/g,"")),f>0&&(C(N)-u||0===_&&47===h)&&I(f>32?oe(N+";",r,n,u-1,c):oe(w(N," ","")+";",r,n,u-2,c),c);break;case 59:N+=";";default:if(I($=ne(N,t,n,l,d,o,s,E,P=[],A=[],u,i),i),123===b)if(0===d)te(N,t,$,$,P,i,u,s,A);else{switch(p){case 99:if(110===k(N,3))break;case 108:if(97===k(N,2))break;default:d=0;case 100:case 109:case 115:}d?te(e,$,$,r&&I(ne(e,$,$,0,0,o,s,E,o,P=[],u,A),A),o,A,u,s,r?P:A):te(N,$,$,$,[""],A,0,s,A)}}l=d=f=0,_=y=1,E=N="",u=a;break;case 58:u=1+C(N),f=h;default:if(_<1)if(123==b)--_;else if(125==b&&0==_++&&125==j())continue;switch(N+=g(b),b*_){case 38:y=d>0?1:(N+="\f",-1);break;case 44:s[l++]=(C(N)-1)*y,y=1;break;case 64:45===L()&&(N+=B(z())),p=L(),d=u=C(E=N+=Y(H())),b++;break;case 45:45===h&&2==C(N)&&(_=0)}}return i}function ne(e,t,n,r,o,i,a,s,c,l,d,u){for(var p=o-1,h=0===o?i:[""],_=E(h),g=0,v=0,b=0;g<r;++g)for(var x=0,k=S(e,p+1,p=m(v=a[g])),C=e;x<_;++x)(C=y(v>0?h[x]+" "+k:w(k,/&\f/g,h[x])))&&(c[b++]=C);return R(e,t,n,0===o?f:s,c,l,d,u)}function re(e,t,n,r){return R(e,t,n,p,g(O),S(e,2,-2),0,r)}function oe(e,t,n,r,o){return R(e,t,n,h,S(e,0,r),S(e,r+1,-1),r,o)}var ie={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},ae="undefined"!=typeof process&&void 0!==process.env&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",se="active",ce="data-styled-version",le="6.3.8",de="/*!sc*/\n",ue="undefined"!=typeof window&&"undefined"!=typeof document,pe=void 0===c.default.createContext,fe=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY&&"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY),he=(new Set,Object.freeze([])),_e=Object.freeze({});var me=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),ge=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ve=/(^-|-$)/g;function ye(e){return e.replace(ge,"-").replace(ve,"")}var be=/(a)(d)/gi,we=function(e){return String.fromCharCode(e+(e>25?39:97))};function xe(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=we(t%52)+n;return(we(t%52)+n).replace(be,"$1-$2")}var ke,Se=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Ce=function(e){return Se(5381,e)};function Ee(e){return xe(Ce(e)>>>0)}function Ie(e){return"string"==typeof e&&!0}var Pe="function"==typeof Symbol&&Symbol.for,Ae=Pe?Symbol.for("react.memo"):60115,$e=Pe?Symbol.for("react.forward_ref"):60112,Ne={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},De={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Oe={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Te=((ke={})[$e]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},ke[Ae]=Oe,ke);function Re(e){return("type"in(t=e)&&t.type.$$typeof)===Ae?Oe:"$$typeof"in e?Te[e.$$typeof]:Ne;var t}var Fe=Object.defineProperty,Me=Object.getOwnPropertyNames,je=Object.getOwnPropertySymbols,ze=Object.getOwnPropertyDescriptor,Le=Object.getPrototypeOf,He=Object.prototype;function We(e,t,n){if("string"!=typeof t){if(He){var r=Le(t);r&&r!==He&&We(e,r,n)}var o=Me(t);je&&(o=o.concat(je(t)));for(var i=Re(e),a=Re(t),s=0;s<o.length;++s){var c=o[s];if(!(c in De||n&&n[c]||a&&c in a||i&&c in i)){var l=ze(t,c);try{Fe(e,c,l)}catch(e){}}}}return e}function Ue(e){return"function"==typeof e}function Be(e){return"object"==typeof e&&"styledComponentId"in e}function Je(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function Ve(e,t){if(0===e.length)return"";for(var n=e[0],r=1;r<e.length;r++)n+=t?t+e[r]:e[r];return n}function Ke(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Ge(e,t,n){if(void 0===n&&(n=!1),!n&&!Ke(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Ge(e[r],t[r]);else if(Ke(t))for(var r in t)e[r]=Ge(e[r],t[r]);return e}function Ye(e,t){Object.defineProperty(e,"toString",{value:t})}function qe(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Xe=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)if((o<<=1)<0)throw qe(16,"".concat(e));this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var i=r;i<o;i++)this.groupSizes[i]=0}for(var a=this.indexOfGroup(e+1),s=(i=0,t.length);i<s;i++)this.tag.insertRule(a,t[i])&&(this.groupSizes[e]++,a++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,i=r;i<o;i++)t+="".concat(this.tag.getRule(i)).concat(de);return t},e}(),Ze=new Map,Qe=new Map,et=1,tt=function(e){if(Ze.has(e))return Ze.get(e);for(;Qe.has(et);)et++;var t=et++;return Ze.set(e,t),Qe.set(t,e),t},nt=function(e,t){et=t+1,Ze.set(e,t),Qe.set(t,e)},rt="style[".concat(ae,"][").concat(ce,'="').concat(le,'"]'),ot=new RegExp("^".concat(ae,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),it=function(e,t,n){for(var r,o=n.split(","),i=0,a=o.length;i<a;i++)(r=o[i])&&e.registerName(t,r)},at=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(de),o=[],i=0,a=r.length;i<a;i++){var s=r[i].trim();if(s){var c=s.match(ot);if(c){var l=0|parseInt(c[1],10),d=c[2];0!==l&&(nt(d,l),it(e,d,c[3]),e.getTag().insertRules(l,o)),o.length=0}else o.push(s)}}},st=function(e){for(var t=document.querySelectorAll(rt),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(ae)!==se&&(at(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function ct(){return n.nc}var lt=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){var t=Array.from(e.querySelectorAll("style[".concat(ae,"]")));return t[t.length-1]}(n),i=void 0!==o?o.nextSibling:null;r.setAttribute(ae,se),r.setAttribute(ce,le);var a=ct();return a&&r.setAttribute("nonce",a),n.insertBefore(r,i),r},dt=function(){function e(e){this.element=lt(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}throw qe(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),ut=function(){function e(e){this.element=lt(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),pt=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),ft=ue,ht={isServer:!ue,useCSSOMInjection:!fe},_t=function(){function e(e,t,n){void 0===e&&(e=_e),void 0===t&&(t={});var r=this;this.options=a(a({},ht),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&ue&&ft&&(ft=!1,st(this)),Ye(this,function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=function(n){var o=function(e){return Qe.get(e)}(n);if(void 0===o)return"continue";var i=e.names.get(o),a=t.getGroup(n);if(void 0===i||!i.size||0===a.length)return"continue";var s="".concat(ae,".g").concat(n,'[id="').concat(o,'"]'),c="";void 0!==i&&i.forEach(function(e){e.length>0&&(c+="".concat(e,","))}),r+="".concat(a).concat(s,'{content:"').concat(c,'"}').concat(de)},i=0;i<n;i++)o(i);return r}(r)})}return e.registerId=function(e){return tt(e)},e.prototype.rehydrate=function(){!this.server&&ue&&st(this)},e.prototype.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(a(a({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new pt(n):t?new dt(n):new ut(n)}(this.options),new Xe(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(tt(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(tt(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(tt(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),mt=/&/g,gt=47;function vt(e){if(-1===e.indexOf("}"))return!1;for(var t=e.length,n=0,r=0,o=!1,i=0;i<t;i++){var a=e.charCodeAt(i);if(0!==r||o||a!==gt||42!==e.charCodeAt(i+1))if(o)42===a&&e.charCodeAt(i+1)===gt&&(o=!1,i++);else if(34!==a&&39!==a||0!==i&&92===e.charCodeAt(i-1)){if(0===r)if(123===a)n++;else if(125===a&&--n<0)return!0}else 0===r?r=a:r===a&&(r=0);else o=!0,i++}return 0!==n||0!==r}function yt(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=yt(e.children,t)),e})}function bt(e){var t,n,r,o=void 0===e?_e:e,i=o.options,a=void 0===i?_e:i,s=o.plugins,c=void 0===s?he:s,l=function(e,r,o){return o.startsWith(n)&&o.endsWith(n)&&o.replaceAll(n,"").length>0?".".concat(t):e},d=c.slice();d.push(function(e){e.type===f&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(mt,n).replace(r,l))}),a.prefix&&d.push(Q),d.push(X);var u=function(e,o,i,s){void 0===o&&(o=""),void 0===i&&(i=""),void 0===s&&(s="&"),t=s,n=o,r=new RegExp("\\".concat(n,"\\b"),"g");var c=function(e){if(!vt(e))return e;for(var t=e.length,n="",r=0,o=0,i=0,a=!1,s=0;s<t;s++){var c=e.charCodeAt(s);if(0!==i||a||c!==gt||42!==e.charCodeAt(s+1))if(a)42===c&&e.charCodeAt(s+1)===gt&&(a=!1,s++);else if(34!==c&&39!==c||0!==s&&92===e.charCodeAt(s-1)){if(0===i)if(123===c)o++;else if(125===c){if(--o<0){for(var l=s+1;l<t;){var d=e.charCodeAt(l);if(59===d||10===d)break;l++}l<t&&59===e.charCodeAt(l)&&l++,o=0,s=l-1,r=l;continue}0===o&&(n+=e.substring(r,s+1),r=s+1)}else 59===c&&0===o&&(n+=e.substring(r,s+1),r=s+1)}else 0===i?i=c:i===c&&(i=0);else a=!0,s++}if(r<t){var u=e.substring(r);vt(u)||(n+=u)}return n}(function(e){if(-1===e.indexOf("//"))return e;for(var t=e.length,n=[],r=0,o=0,i=0,a=0;o<t;){var s=e.charCodeAt(o);if(34!==s&&39!==s||0!==o&&92===e.charCodeAt(o-1))if(0===i)if(40===s&&o>=3&&108==(32|e.charCodeAt(o-1))&&114==(32|e.charCodeAt(o-2))&&117==(32|e.charCodeAt(o-3)))a=1,o++;else if(a>0)41===s?a--:40===s&&a++,o++;else if(s===gt&&o+1<t&&e.charCodeAt(o+1)===gt){for(o>r&&n.push(e.substring(r,o));o<t&&10!==e.charCodeAt(o);)o++;r=o}else o++;else o++;else 0===i?i=s:i===s&&(i=0),o++}return 0===r?e:(r<t&&n.push(e.substring(r)),n.join(""))}(e)),l=ee(i||o?"".concat(i," ").concat(o," { ").concat(c," }"):c);a.namespace&&(l=yt(l,a.namespace));var u,p,f,h=[];return q(l,(u=d.concat((f=function(e){return h.push(e)},function(e){e.root||(e=e.return)&&f(e)})),p=E(u),function(e,t,n,r){for(var o="",i=0;i<p;i++)o+=u[i](e,t,n,r)||"";return o})),h};return u.hash=c.length?c.reduce(function(e,t){return t.name||qe(15),Se(e,t.name)},5381).toString():"",u}var wt=new _t,xt=bt(),kt={shouldForwardProp:void 0,styleSheet:wt,stylis:xt},St=pe?{Provider:function(e){return e.children},Consumer:function(e){return(0,e.children)(kt)}}:c.default.createContext(kt),Ct=(St.Consumer,pe?{Provider:function(e){return e.children},Consumer:function(e){return(0,e.children)(void 0)}}:c.default.createContext(void 0));function Et(){return pe?kt:c.default.useContext(St)}function It(e){if(pe||!c.default.useMemo)return e.children;var t=Et().styleSheet,n=c.default.useMemo(function(){var n=t;return e.sheet?n=e.sheet:e.target&&(n=n.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(n=n.reconstructWithOptions({useCSSOMInjection:!1})),n},[e.disableCSSOMInjection,e.sheet,e.target,t]),r=c.default.useMemo(function(){return bt({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:e.stylisPlugins})},[e.enableVendorPrefixes,e.namespace,e.stylisPlugins]),o=c.default.useMemo(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:n,stylis:r}},[e.shouldForwardProp,n,r]);return c.default.createElement(St.Provider,{value:o},c.default.createElement(Ct.Provider,{value:r},e.children))}var Pt=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=xt);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,Ye(this,function(){throw qe(12,String(n.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=xt),this.name+e.hash},e}();function At(e,t){return null==t||"boolean"==typeof t||""===t?"":"number"!=typeof t||0===t||e in ie||e.startsWith("--")?String(t).trim():"".concat(t,"px")}var $t=function(e){return e>="A"&&e<="Z"};function Nt(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;$t(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var Dt=function(e){return null==e||!1===e||""===e},Ot=function(e){var t=[];for(var n in e){var r=e[n];e.hasOwnProperty(n)&&!Dt(r)&&(Array.isArray(r)&&r.isCss||Ue(r)?t.push("".concat(Nt(n),":"),r,";"):Ke(r)?t.push.apply(t,s(s(["".concat(n," {")],Ot(r),!1),["}"],!1)):t.push("".concat(Nt(n),": ").concat(At(n,r),";")))}return t};function Tt(e,t,n,r){return Dt(e)?[]:Be(e)?[".".concat(e.styledComponentId)]:Ue(e)?!Ue(o=e)||o.prototype&&o.prototype.isReactComponent||!t?[e]:Tt(e(t),t,n,r):e instanceof Pt?n?(e.inject(n,r),[e.getName(r)]):[e]:Ke(e)?Ot(e):Array.isArray(e)?Array.prototype.concat.apply(he,e.map(function(e){return Tt(e,t,n,r)})):[e.toString()];var o}function Rt(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Ue(n)&&!Be(n))return!1}return!0}var Ft=Ce(le),Mt=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&Rt(e),this.componentId=t,this.baseHash=Se(Ft,t),this.baseStyle=n,_t.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n).className:"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=Je(r,this.staticRulesId);else{var o=Ve(Tt(this.rules,e,t,n)),i=xe(Se(this.baseHash,o)>>>0);if(!t.hasNameForId(this.componentId,i)){var a=n(o,".".concat(i),void 0,this.componentId);t.insertRules(this.componentId,i,a)}r=Je(r,i),this.staticRulesId=i}else{for(var s=Se(this.baseHash,n.hash),c="",l=0;l<this.rules.length;l++){var d=this.rules[l];if("string"==typeof d)c+=d;else if(d){var u=Ve(Tt(d,e,t,n));s=Se(s,u+l),c+=u}}if(c){var p=xe(s>>>0);if(!t.hasNameForId(this.componentId,p)){var f=n(c,".".concat(p),void 0,this.componentId);t.insertRules(this.componentId,p,f)}r=Je(r,p)}}return{className:r,css:"undefined"==typeof window?t.getTag().getGroup(tt(this.componentId)):""}},e}(),jt=pe?{Provider:function(e){return e.children},Consumer:function(e){return(0,e.children)(void 0)}}:c.default.createContext(void 0);jt.Consumer;var zt={};function Lt(e,t,n){var r=Be(e),o=e,i=!Ie(e),s=t.attrs,l=void 0===s?he:s,d=t.componentId,u=void 0===d?function(e,t){var n="string"!=typeof e?"sc":ye(e);zt[n]=(zt[n]||0)+1;var r="".concat(n,"-").concat(Ee(le+n+zt[n]));return t?"".concat(t,"-").concat(r):r}(t.displayName,t.parentComponentId):d,p=t.displayName,f=void 0===p?function(e){return Ie(e)?"styled.".concat(e):"Styled(".concat(function(e){return e.displayName||e.name||"Component"}(e),")")}(e):p,h=t.displayName&&t.componentId?"".concat(ye(t.displayName),"-").concat(t.componentId):t.componentId||u,_=r&&o.attrs?o.attrs.concat(l).filter(Boolean):l,m=t.shouldForwardProp;if(r&&o.shouldForwardProp){var g=o.shouldForwardProp;if(t.shouldForwardProp){var v=t.shouldForwardProp;m=function(e,t){return g(e,t)&&v(e,t)}}else m=g}var y=new Mt(n,h,r?o.componentStyle:void 0);function b(e,t){return function(e,t,n){var r=e.attrs,o=e.componentStyle,i=e.defaultProps,s=e.foldedComponentIds,l=e.styledComponentId,d=e.target,u=pe?void 0:c.default.useContext(jt),p=Et(),f=e.shouldForwardProp||p.shouldForwardProp,h=function(e,t,n){return void 0===n&&(n=_e),e.theme!==n.theme&&e.theme||t||n.theme}(t,u,i)||_e,_=function(e,t,n){for(var r,o=a(a({},t),{className:void 0,theme:n}),i=0;i<e.length;i+=1){var s=Ue(r=e[i])?r(o):r;for(var c in s)"className"===c?o.className=Je(o.className,s[c]):"style"===c?o.style=a(a({},o.style),s[c]):o[c]=s[c]}return"className"in t&&"string"==typeof t.className&&(o.className=Je(o.className,t.className)),o}(r,t,h),m=_.as||d,g={};for(var v in _)void 0===_[v]||"$"===v[0]||"as"===v||"theme"===v&&_.theme===h||("forwardedAs"===v?g.as=_.forwardedAs:f&&!f(v,m)||(g[v]=_[v]));var y=function(e,t){var n=Et();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(o,_),b=y.className,w=y.css,x=Je(s,l);b&&(x+=" "+b),_.className&&(x+=" "+_.className),g[Ie(m)&&!me.has(m)?"class":"className"]=x,n&&(g.ref=n);var k=(0,c.createElement)(m,g);return pe&&w?c.default.createElement(c.default.Fragment,null,c.default.createElement("style",{precedence:"styled-components",href:"sc-".concat(l,"-").concat(b),children:w}),k):k}(w,e,t)}b.displayName=f;var w=c.default.forwardRef(b);return w.attrs=_,w.componentStyle=y,w.displayName=f,w.shouldForwardProp=m,w.foldedComponentIds=r?Je(o.foldedComponentIds,o.styledComponentId):"",w.styledComponentId=h,w.target=r?o.target:e,Object.defineProperty(w,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=r?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,o=t;r<o.length;r++)Ge(e,o[r],!0);return e}({},o.defaultProps,e):e}}),Ye(w,function(){return".".concat(w.styledComponentId)}),i&&We(w,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),w}function Ht(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}new Set;var Wt=function(e){return Object.assign(e,{isCss:!0})};function Ut(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(Ue(e)||Ke(e))return Wt(Tt(Ht(he,s([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?Tt(r):Wt(Tt(Ht(r,t)))}function Bt(e,t,n){if(void 0===n&&(n=_e),!t)throw qe(1,t);var r=function(r){for(var o=[],i=1;i<arguments.length;i++)o[i-1]=arguments[i];return e(t,n,Ut.apply(void 0,s([r],o,!1)))};return r.attrs=function(r){return Bt(e,t,a(a({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return Bt(e,t,a(a({},n),r))},r}var Jt=function(e){return Bt(Lt,e)},Vt=Jt;function Kt(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=Ve(Ut.apply(void 0,s([e],t,!1))),o=Ee(r);return new Pt(o,r)}me.forEach(function(e){Vt[e]=Jt(e)}),function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=Rt(e),_t.registerId(this.componentId+1)}e.prototype.createStyles=function(e,t,n,r){var o=r(Ve(Tt(this.rules,t,n,r)),""),i=this.componentId+e;n.insertRules(i,i,o)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&_t.registerId(this.componentId+e);var o=this.componentId+e;this.isStatic?n.hasNameForId(o,o)||this.createStyles(e,t,n,r):(this.removeStyles(e,n),this.createStyles(e,t,n,r))}}(),function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=ct(),r=Ve([n&&'nonce="'.concat(n,'"'),"".concat(ae,'="true"'),"".concat(ce,'="').concat(le,'"')].filter(Boolean)," ");return"<style ".concat(r,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw qe(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw qe(2);var n=e.instance.toString();if(!n)return[];var r=((t={})[ae]="",t[ce]=le,t.dangerouslySetInnerHTML={__html:n},t),o=ct();return o&&(r.nonce=o),[c.default.createElement("style",a({},r,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new _t({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw qe(2);return c.default.createElement(It,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw qe(3)}}(),"__sc-".concat(ae,"__");var Gt=n(994);const Yt=e=>{let t;const n=new Set,r=(e,r)=>{const o="function"==typeof e?e(t):e;if(!Object.is(o,t)){const e=t;t=(null!=r?r:"object"!=typeof o||null===o)?o:Object.assign({},t,o),n.forEach(n=>n(t,e))}},o=()=>t,i={setState:r,getState:o,getInitialState:()=>a,subscribe:e=>(n.add(e),()=>n.delete(e)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}},a=t=e(r,o,i);return i};var qt=n(242);const{useDebugValue:Xt}=c.default,{useSyncExternalStoreWithSelector:Zt}=qt;let Qt=!1;const en=e=>e,tn=e=>{"function"!=typeof e&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const t="function"==typeof e?(e=>e?Yt(e):Yt)(e):e,n=(e,n)=>function(e,t=en,n){n&&!Qt&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),Qt=!0);const r=Zt(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,n);return Xt(r),r}(t,e,n);return Object.assign(n,t),n},nn="chore_scheduler";let rn=null;const[on,an]=function(e){const t=(0,r.q6)(e());return[({children:n})=>{const[r]=(0,Gt.J0)(e);return i(t.Provider,{value:r,children:n})},()=>(0,Gt.NT)(t)]}(()=>{return(e=(e,t)=>({hass:void 0,config:void 0,chores:[],todoItems:[],loading:!0,mode:"display",completingItems:{},setHass:t=>e({hass:t}),setConfig:t=>e({config:t,mode:t.default_mode||"display"}),setMode:t=>e({mode:t}),loadData:async()=>{const{hass:n,completingItems:r}=t();if(n){e({loading:!0});try{const[t,o]=await Promise.all([n.connection.sendMessagePromise({type:`${nn}/list`}),n.connection.sendMessagePromise({type:`${nn}/todos`})]),i=(o?.items??[]).map(e=>r[e.uid]?{...e,status:"completed"}:e);e({chores:t?.chores??[],todoItems:i})}catch(t){console.warn("[ChoreScheduler] Failed to load data:",t),e({chores:[],todoItems:[]})}finally{e({loading:!1})}}},completeItem:async n=>{const{hass:r,todoItems:o,completingItems:i,loadData:a}=t();r&&(i[n]||(e({completingItems:{...i,[n]:!0},todoItems:o.map(e=>e.uid===n?{...e,status:"completed",completed_at:(new Date).toISOString()}:e)}),r.connection.sendMessagePromise({type:`${nn}/complete_todo`,uid:n}).then(()=>{setTimeout(()=>{const{completingItems:r,loadData:o}=t(),{[n]:i,...a}=r;e({completingItems:a}),rn&&clearTimeout(rn),rn=setTimeout(()=>{rn=null,o()},500)},800)}).catch(r=>{console.error("[ChoreScheduler] Failed to complete todo:",r);const{completingItems:o,loadData:i}=t(),{[n]:a,...s}=o;e({completingItems:s}),i()})))},triggerChore:async e=>{const{hass:n,loadData:r}=t();if(n)try{await n.callService(nn,"trigger_chore",{chore_id:e}),setTimeout(()=>r(),500)}catch(e){console.error("[ChoreScheduler] Error triggering chore:",e)}},saveChore:async(e,n)=>{const{hass:r,loadData:o}=t();r&&(n?await r.callService(nn,"add_chore",e):await r.callService(nn,"update_chore",{chore_id:e.id,...e}),await o())},deleteChore:async e=>{const{hass:n,loadData:r}=t();n&&(await n.callService(nn,"delete_chore",{chore_id:e}),setTimeout(()=>r(),500))}}))?tn(e):tn;var e}),sn=()=>an()(({hass:e})=>e),cn=()=>an()(e=>e.config),ln={en:{"card.title":"Chore scheduler","card.empty_title":"No chores configured yet.","card.empty_subtitle":"Click the + button to add your first chore.","editor.add_title":"Add chore","editor.edit_title":"Edit chore","editor.name":"Name","editor.description":"Description (optional)","editor.enabled":"Enabled","editor.save":"Save","editor.add":"Add","editor.cancel":"Cancel","editor.delete":"Delete","editor.delete_confirm":"Are you sure you want to delete this chore?","editor.trigger":"Run now","schedule.title":"Schedule","schedule.frequency":"Frequency","schedule.once":"Once","schedule.daily":"Daily","schedule.weekly":"Weekly","schedule.monthly":"Monthly","schedule.days":"Days","schedule.day_of_month":"Day of month","schedule.time":"Time","weekday.monday":"Mon","weekday.tuesday":"Tue","weekday.wednesday":"Wed","weekday.thursday":"Thu","weekday.friday":"Fri","weekday.saturday":"Sat","weekday.sunday":"Sun","assignment.title":"Assignment","assignment.mode":"Mode","assignment.unassigned":"Unassigned","assignment.fixed":"Fixed","assignment.rotating":"Rotating","assignment.assignees":"Assignees","assignment.add_assignee":"Add assignee","assignment.rotating_current":"Rotating (current: {name})","assignment.assigned_to":"Assigned to: {names}","target.title":"Target","target.todo_list":"Todo list","target.default":"Default","notifications.title":"Notifications","notifications.send":"Send notifications","notifications.targets":"Notify targets","notifications.add_target":"Add target","display.daily_at":"Daily at {time}","display.monthly_at":"Monthly on day {day} at {time}","display.at_time":"At {time}","action.edit_chores":"Edit chores","action.show_chores":"Show chores","action.add":"Add","mode.display":"View","mode.manage":"Manage","display.overdue":"Overdue","display.today":"Today","display.upcoming":"Upcoming","display.done":"Done","display.all_done":"All chores done!","display.no_pending":"No pending chores","display.empty_todos":"No chores scheduled yet.","display.streak":"{count} day streak"},sv:{"card.title":"Sysslor","card.empty_title":"Inga sysslor konfigurerade ännu.","card.empty_subtitle":"Klicka på + för att lägga till din första syssla.","editor.add_title":"Lägg till syssla","editor.edit_title":"Redigera syssla","editor.name":"Namn","editor.description":"Beskrivning (valfritt)","editor.enabled":"Aktiverad","editor.save":"Spara","editor.add":"Lägg till","editor.cancel":"Avbryt","editor.delete":"Ta bort","editor.delete_confirm":"Är du säker på att du vill ta bort denna syssla?","editor.trigger":"Kör nu","schedule.title":"Schema","schedule.frequency":"Frekvens","schedule.once":"En gång","schedule.daily":"Dagligen","schedule.weekly":"Veckovis","schedule.monthly":"Månadsvis","schedule.days":"Dagar","schedule.day_of_month":"Dag i månaden","schedule.time":"Tid","weekday.monday":"Mån","weekday.tuesday":"Tis","weekday.wednesday":"Ons","weekday.thursday":"Tor","weekday.friday":"Fre","weekday.saturday":"Lör","weekday.sunday":"Sön","assignment.title":"Tilldelning","assignment.mode":"Läge","assignment.unassigned":"Ej tilldelad","assignment.fixed":"Fast","assignment.rotating":"Roterande","assignment.assignees":"Tilldelade","assignment.add_assignee":"Lägg till person","assignment.rotating_current":"Roterande (nuvarande: {name})","assignment.assigned_to":"Tilldelad: {names}","target.title":"Mål","target.todo_list":"Att-göra-lista","target.default":"Standard","notifications.title":"Notifieringar","notifications.send":"Skicka notifieringar","notifications.targets":"Notifieringsmål","notifications.add_target":"Lägg till mål","display.daily_at":"Dagligen kl {time}","display.monthly_at":"Månadsvis dag {day} kl {time}","display.at_time":"Kl {time}","action.edit_chores":"Ändra sysslor","action.show_chores":"Visa sysslor","action.add":"Lägg till","mode.display":"Visa","mode.manage":"Hantera","display.overdue":"Försenade","display.today":"Idag","display.upcoming":"Kommande","display.done":"Klart","display.all_done":"Alla sysslor klara!","display.no_pending":"Inga väntande sysslor","display.empty_todos":"Inga sysslor schemalagda ännu.","display.streak":"{count} dagars svit"}};function dn(e,t,n){let r=(ln[t?.language||"en"]||ln.en)[e]||ln.en[e]||e;return n&&Object.entries(n).forEach(([e,t])=>{r=r.replace(`{${e}}`,String(t))}),r}function un(e,t){return dn(`weekday.${e}`,t)}const pn=()=>{const e=sn();return(0,Gt.hb)((t,n)=>dn(t,e,n),[e?.language])},fn=()=>{const e=an();return{loadData:e(e=>e.loadData),completeItem:e(e=>e.completeItem),triggerChore:e(e=>e.triggerChore),saveChore:e(e=>e.saveChore),deleteChore:e(e=>e.deleteChore),setMode:e(e=>e.setMode)}},hn=({title:e,mode:t,onToggleMode:n,onAddChore:r})=>{const o=pn();return i(_n,{children:[i(mn,{children:e}),i(gn,{children:["manage"===t&&i(vn,{onClick:r,children:[i("ha-icon",{icon:"mdi:plus"}),o("action.add")]}),i(vn,{onClick:n,children:[i("ha-icon",{icon:"display"===t?"mdi:pencil":"mdi:eye"}),o("display"===t?"action.edit_chores":"action.show_chores")]})]})]})},_n=Vt.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`,mn=Vt.h1`
  margin: 0;
  font-size: 1.625rem;
  font-weight: 500;
  color: var(--primary-text-color);
`,gn=Vt.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,vn=Vt.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid var(--divider-color);
  border-radius: 18px;
  background: transparent;
  color: var(--primary-text-color);
  font-size: 0.925rem;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  white-space: nowrap;

  &:hover {
    background: var(--secondary-background-color);
    border-color: var(--primary-color);
  }

  &:active {
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.12);
  }

  ha-icon {
    --mdc-icon-size: 16px;
    display: flex;
  }
`,yn=[{keywords:["vacuum","dammsug","dammsu"],icon:"mdi:vacuum"},{keywords:["mop","mopp","skur"],icon:"mdi:creation"},{keywords:["dust","damm","torka av"],icon:"mdi:spray"},{keywords:["clean","städ","rengör","putsa"],icon:"mdi:spray-bottle"},{keywords:["wipe","torka"],icon:"mdi:spray"},{keywords:["scrub","skrubba"],icon:"mdi:brush"},{keywords:["sweep","sopa","broom","kvast"],icon:"mdi:broom"},{keywords:["dish","disk","tallrik"],icon:"mdi:dishwasher"},{keywords:["cook","laga mat","matlagning"],icon:"mdi:pot-steam"},{keywords:["grocer","handla","shop","inköp","inkop","affär"],icon:"mdi:cart"},{keywords:["trash","garbage","sopor","soptunna","avfall","kasta"],icon:"mdi:trash-can"},{keywords:["recycl","återvinn","atervinn","sorter"],icon:"mdi:recycle"},{keywords:["compost","kompost"],icon:"mdi:leaf"},{keywords:["laundry","tvätt","tvatt"],icon:"mdi:washing-machine"},{keywords:["wash","tvätta","tvatta"],icon:"mdi:washing-machine"},{keywords:["iron","stryk","stryka"],icon:"mdi:tshirt-crew"},{keywords:["fold","vik","vika"],icon:"mdi:tshirt-crew"},{keywords:["lawn","gräsmatta","grasmatta","mow","klipp gräs","gräsklipp"],icon:"mdi:mower-bag"},{keywords:["garden","trädgård","tradgard","odla"],icon:"mdi:flower"},{keywords:["plant","växt","vaxt","blomm"],icon:"mdi:flower"},{keywords:["water","vattna"],icon:"mdi:watering-can"},{keywords:["snow","snö","sno","skotta"],icon:"mdi:snowflake"},{keywords:["rake","kratta","löv","lov"],icon:"mdi:leaf"},{keywords:["dog","hund"],icon:"mdi:dog"},{keywords:["cat","katt"],icon:"mdi:cat"},{keywords:["pet","husdjur","djur"],icon:"mdi:paw"},{keywords:["feed","mata","foder"],icon:"mdi:food-drumstick"},{keywords:["walk","promen","rast"],icon:"mdi:walk"},{keywords:["litter","kattlåd","kattlad","kattsan"],icon:"mdi:cat"},{keywords:["bed","säng","sang","bädd"],icon:"mdi:bed"},{keywords:["bathroom","badrum","toalett","toilet","wc"],icon:"mdi:toilet"},{keywords:["shower","dusch"],icon:"mdi:shower"},{keywords:["window","fönster","fonster"],icon:"mdi:window-open"},{keywords:["floor","golv"],icon:"mdi:floor-plan"},{keywords:["mail","post","brev"],icon:"mdi:mailbox"},{keywords:["bill","räkning","rakning","faktur"],icon:"mdi:receipt-text"},{keywords:["pay","betal"],icon:"mdi:credit-card"},{keywords:["medic","medicin","läkemedel"],icon:"mdi:pill"},{keywords:["vitamin"],icon:"mdi:pill"},{keywords:["exercis","workout","träna","trana","motion"],icon:"mdi:dumbbell"}];function bn(e){return e.toLowerCase().replace(/å/g,"a").replace(/ä/g,"a").replace(/ö/g,"o")}function wn(e,t){const n=e.indexOf(t);return-1!==n&&(0===n||/[\s\-_,;:(\/]/.test(e[n-1]))}function xn(e){const t=bn(e),n=e.toLowerCase();for(const e of yn)for(const r of e.keywords){const o=bn(r);if(wn(t,o))return e.icon;if(r!==o&&wn(n,r))return e.icon}return"mdi:checkbox-marked-circle-outline"}const kn=({name:e})=>{const t=sn(),n=`person.${e.toLowerCase().replace(/\s+/g,"_")}`,r=t?.states[n],o=r?.attributes?.entity_picture,a=e.charAt(0).toUpperCase();return i(Sn,{title:e,children:o?i("img",{src:o,alt:e,style:{width:"100%",height:"100%",objectFit:"cover",display:"block"}}):i(Cn,{children:a})})},Sn=Vt.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--secondary-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.775rem;
  font-weight: 600;
  color: var(--primary-text-color);
`,Cn=Vt.span``,En=({streak:e})=>{const t=pn();return e<=1?null:i(In,{title:t("display.streak",{count:e}),children:[i("ha-icon",{icon:"mdi:fire"}),e]})},In=Vt.span`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--warning-color, #ff9800);
  white-space: nowrap;

  ha-icon {
    --mdc-icon-size: 14px;
  }
`,Pn=({item:e,chore:t,sectionClass:n})=>{const r=cn(),{completeItem:o}=fn(),a=an(e=>e.completingItems),s=(0,Gt.li)(null),c=xn(t?t.name:e.summary),l="completed"===e.status,d=!!a[e.uid],u=function(e){const t=e.match(/\(([^)]+)\)$/);return t?t[1]:null}(e.summary),p=e.completion_stats,f=!1!==r?.enable_animations;return i(Nn,{ref:s,$isCompleted:l,$isOverdue:"overdue"===n,$completing:d,children:[i(Dn,{$isCompleted:l,$completing:d,onClick:()=>{l||d||(f&&(window.matchMedia("(prefers-reduced-motion: reduce)").matches||"vibrate"in navigator&&navigator.vibrate([50,30,80])),o(e.uid))},children:i("ha-icon",{icon:l||d?"mdi:checkbox-marked-circle":"mdi:checkbox-blank-circle-outline"})}),i(On,{children:i("ha-icon",{icon:c})}),i(Tn,{children:i(Rn,{$isCompleted:l||d,children:e.summary})}),p&&i(En,{streak:p.streak}),u&&i(kn,{name:u})]})},An=Kt`
  0% { transform: scale(1); }
  40% { transform: scale(1.4); }
  100% { transform: scale(1); }
`,$n=Kt`
  0% { opacity: 1; max-height: 60px; padding-top: 10px; padding-bottom: 10px; margin-bottom: 0; }
  50% { opacity: 0; max-height: 60px; padding-top: 10px; padding-bottom: 10px; margin-bottom: 0; }
  100% { opacity: 0; max-height: 0; padding-top: 0; padding-bottom: 0; margin-bottom: -4px; }
`,Nn=Vt.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  gap: 8px;
  transition: background-color 0.15s, opacity 0.3s;

  &:hover {
    background: var(--secondary-background-color);
  }

  ${e=>e.$isOverdue&&Ut`
    border-left: 3px solid var(--error-color, #f44336);
  `}

  ${e=>e.$isCompleted&&Ut`
    opacity: 0.5;
  `}

  ${e=>e.$completing&&Ut`
    animation: ${$n} 0.45s ease-out 0.28s forwards;
    overflow: hidden;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      opacity: 0.5;
    }
  `}
`,Dn=Vt.div`
  cursor: pointer;
  flex-shrink: 0;

  ha-icon {
    --mdc-icon-size: 22px;
    color: var(--secondary-text-color);
    transition: color 0.15s, transform 0.15s;
  }

  &:hover ha-icon {
    color: var(--primary-color);
  }

  ${e=>e.$isCompleted&&Ut`
    cursor: default;
    ha-icon {
      color: var(--success-color, #4caf50);
    }
  `}

  ${e=>e.$completing&&Ut`
    ha-icon {
      animation: ${An} 0.3s ease-out;
      color: var(--success-color, #4caf50);

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    }
  `}
`,On=Vt.div`
  flex-shrink: 0;
  ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
  }
`,Tn=Vt.div`
  flex: 1;
  min-width: 0;
`,Rn=Vt.span`
  font-size: 1.025rem;
  color: var(--primary-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;

  ${e=>e.$isCompleted&&Ut`
    text-decoration: line-through;
    color: var(--secondary-text-color);
  `}
`,Fn=({title:e,items:t,chores:n,sectionClass:r})=>i(Mn,{children:[i(jn,{$isOverdue:"overdue"===r,children:e}),i(zn,{children:t.map(e=>i(Pn,{item:e,chore:n.find(t=>t.id===e.chore_id),sectionClass:r},e.uid))})]}),Mn=Vt.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,jn=Vt.div`
  font-size: 0.825rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--secondary-text-color);
  padding: 4px 0 8px 0;

  ${e=>e.$isOverdue&&Ut`
    color: var(--error-color, #f44336);
  `}
`,zn=Vt.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Ln=()=>{const e=pn();return i(Hn,{children:[i(Wn,{children:i("ha-icon",{icon:"mdi:check-circle-outline"})}),i(Un,{children:e("display.empty_todos")})]})},Hn=Vt.div`
  text-align: center;
  padding: 32px 16px;
  color: var(--secondary-text-color);
`,Wn=Vt.div`
  ha-icon {
    --mdc-icon-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
`,Un=Vt.p`
  margin: 0;
`,Bn=()=>{const e=pn();return i(Gn,{children:[i(Yn,{children:i("ha-icon",{icon:"mdi:check-circle"})}),i(qn,{children:e("display.all_done")})]})},Jn=Kt`
  0%   { opacity: 0; transform: scale(0.5); }
  60%  { opacity: 1; transform: scale(1.05); }
  100% { transform: scale(1); }
`,Vn=Kt`
  0%   { filter: drop-shadow(0 0 0 transparent); }
  30%  { filter: drop-shadow(0 0 12px var(--success-color, #4caf50)); }
  100% { filter: drop-shadow(0 0 0 transparent); }
`,Kn=Kt`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`,Gn=Vt.div`
  text-align: center;
  padding: 32px 16px;
`,Yn=Vt.div`
  ha-icon {
    --mdc-icon-size: 48px;
    color: var(--success-color, #4caf50);
    margin-bottom: 12px;
    display: block;
    animation:
      ${Jn} 0.4s cubic-bezier(0.22, 1, 0.36, 1),
      ${Vn} 0.6s ease-out 0.15s;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`,qn=Vt.p`
  font-size: 1.225rem;
  font-weight: 500;
  color: var(--primary-text-color);
  margin: 0;
  animation: ${Kn} 0.35s ease-out 0.25s both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Xn=({todoItems:e,chores:t,config:n})=>{const o=pn(),a=e.filter(e=>"needs_action"===e.status),s=e.filter(e=>"completed"===e.status).sort((e,t)=>(t.completed_at??"").localeCompare(e.completed_at??"")).slice(0,3);if(0===a.length&&0===s.length)return i(Ln,{});const c=(new Date).toISOString().split("T")[0],l=a.filter(e=>e.due&&e.due<c),d=a.filter(e=>!e.due||e.due===c),u=a.filter(e=>e.due&&e.due>c);return 0===a.length&&s.length>0?i(r.FK,{children:[i(Bn,{}),n.show_completed&&i(Fn,{title:o("display.done"),items:s,chores:t,sectionClass:"completed"})]}):i(r.FK,{children:[l.length>0&&i(Fn,{title:o("display.overdue"),items:l,chores:t,sectionClass:"overdue"}),d.length>0&&i(Fn,{title:o("display.today"),items:d,chores:t,sectionClass:"today"}),u.length>0&&i(Fn,{title:o("display.upcoming"),items:u,chores:t,sectionClass:"upcoming"}),n.show_completed&&s.length>0&&i(Fn,{title:o("display.done"),items:s,chores:t,sectionClass:"completed"})]})},Zn=({type:e,text:t})=>i(Qn,{$type:e,children:t}),Qn=Vt.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.825rem;
  font-weight: 500;
  white-space: nowrap;

  ${({$type:e})=>{switch(e){case"daily":return"\n          background: rgba(76, 175, 80, 0.15);\n          color: var(--label-badge-green, #4caf50);\n        ";case"weekly":return"\n          background: rgba(33, 150, 243, 0.15);\n          color: var(--label-badge-blue, #2196f3);\n        ";case"monthly":return"\n          background: rgba(156, 39, 176, 0.15);\n          color: var(--label-badge-purple, #9c27b0);\n        ";case"once":return"\n          background: rgba(255, 152, 0, 0.15);\n          color: var(--label-badge-yellow, #ff9800);\n        ";default:return"\n          background: rgba(158, 158, 158, 0.15);\n          color: var(--secondary-text-color);\n        "}}}
`,er=({chore:e,todoItems:t,onEdit:n})=>{const r=sn(),o=xn(e.name),a=function(e,t){const n=e.time||"10:00";switch(e.type){case"once":{const r=e.date;return r?`${new Date(r+"T00:00:00").toLocaleDateString(t?.language||"en",{month:"short",day:"numeric"})} ${n}`:dn("display.at_time",t,{time:n})}case"daily":return dn("display.daily_at",t,{time:n});case"weekly":{const r=(e.days||["sunday"]).map(e=>un(e,t)).join(", ");return`${r} ${n}`}case"monthly":return dn("display.monthly_at",t,{day:e.day_of_month||1,time:n});default:return dn("display.at_time",t,{time:n})}}(e.schedule,r),s=function(e){return"unassigned"!==e.assignment.mode&&e.assignment.assignees?.length?e.assignment.assignees.filter(e=>null!=e).map(e=>e.split(".").pop()?.replace(/_/g," ")||e):[]}(e),c=function(e,t){const n=t.find(t=>t.chore_id===e);return n?.completion_stats}(e.id,t);return i(tr,{$disabled:!e.enabled,onClick:()=>n(e),children:[i(nr,{children:i("ha-icon",{icon:o})}),i(rr,{children:[i(or,{children:e.name}),i(ir,{children:[i(Zn,{type:e.schedule.type,text:a}),s.map(e=>i(kn,{name:e},e)),c&&i(En,{streak:c.streak})]})]}),i(nr,{style:{marginRight:0,marginLeft:8},children:i("ha-icon",{icon:"mdi:chevron-right"})})]})},tr=Vt.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: var(--card-background-color, var(--ha-card-background));
  border: 1px solid var(--divider-color);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: var(--secondary-background-color);
  }

  ${e=>e.$disabled&&"opacity: 0.5;"}
`,nr=Vt.div`
  margin-right: 12px;
  ha-icon {
    color: var(--primary-color);
    --mdc-icon-size: 24px;
  }
`,rr=Vt.div`
  flex: 1;
  min-width: 0;
`,or=Vt.div`
  font-weight: 500;
  color: var(--primary-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,ir=Vt.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  flex-wrap: wrap;
`,ar=({chores:e,todoItems:t,config:n,onEditChore:r})=>{const o=pn(),a=n.show_disabled?e:e.filter(e=>e.enabled);return 0===a.length?i(cr,{children:[i("ha-icon",{icon:"mdi:broom"}),i("p",{children:o("card.empty_title")}),i("p",{children:o("card.empty_subtitle")})]}):i(sr,{children:a.map(e=>i(er,{chore:e,todoItems:t,onEdit:r},e.id))})},sr=Vt.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,cr=Vt.div`
  text-align: center;
  padding: 32px 16px;
  color: var(--secondary-text-color);

  ha-icon {
    --mdc-icon-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
`,lr=({person:e,isSelected:t,onSelect:n})=>{const r=(e.attributes.friendly_name||e.entity_id.split(".")[1].replace(/_/g," ")).split(" ")[0],o=e.attributes.entity_picture;return i(pr,{$selected:t,onClick:n,children:[i(fr,{children:o?i("img",{src:o,alt:r,style:{width:"100%",height:"100%",objectFit:"cover",display:"block"}}):i("ha-icon",{icon:"mdi:account"})}),i(hr,{$selected:t,children:r})]})},dr=({selectedAssignee:e,onSelect:t})=>{const n=sn(),r=Object.values(n?.states||{}).filter(e=>e.entity_id.startsWith("person."));return i(ur,{children:[i(pr,{$selected:null===e,onClick:()=>t(null),children:[i(fr,{children:i("ha-icon",{icon:"mdi:account-group"})}),i(hr,{children:"Anyone"})]}),r.map(n=>i(lr,{person:n,isSelected:e===n.entity_id,onSelect:()=>t(n.entity_id)},n.entity_id))]})},ur=Vt.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
`,pr=Vt.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 6px 2px;
  border-radius: 10px;
  border: 2px solid var(--divider-color);
  background: var(--card-background-color);
  cursor: pointer;
  transition: all 0.15s ease;
  box-sizing: border-box;
  min-width: 0;

  &:hover {
    border-color: var(--primary-color);
  }

  ${e=>e.$selected&&Ut`
    border-color: var(--primary-color);
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
  `}
`,fr=Vt.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--secondary-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  ha-icon {
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color);
  }
`,hr=Vt.span`
  font-size: 0.775rem;
  color: var(--primary-text-color);
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${e=>e.$selected&&Ut`
    font-weight: 500;
    color: var(--primary-color);
  `}
`,_r=[{type:"once",icon:"mdi:numeric-1-circle",labelKey:"schedule.once"},{type:"daily",icon:"mdi:calendar-today",labelKey:"schedule.daily"},{type:"weekly",icon:"mdi:calendar-week",labelKey:"schedule.weekly"},{type:"monthly",icon:"mdi:calendar-month",labelKey:"schedule.monthly"}],mr=({scheduleType:e,onSelect:t})=>{const n=pn();return i(gr,{children:_r.map(({type:r,icon:o,labelKey:a})=>i(vr,{$selected:e===r,onClick:()=>t(r),children:[i("ha-icon",{icon:o}),i("span",{children:n(a)})]},r))})},gr=Vt.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 12px;
`,vr=Vt.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px 8px;
  border-radius: 12px;
  border: 2px solid var(--divider-color);
  background: var(--card-background-color);
  cursor: pointer;
  transition: all 0.15s ease;
  box-sizing: border-box;

  &:hover {
    border-color: var(--primary-color);
  }

  ha-icon {
    --mdc-icon-size: 24px;
    color: var(--secondary-text-color);
  }

  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  ${e=>e.$selected&&Ut`
    border-color: var(--primary-color);
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);

    ha-icon {
      color: var(--primary-color);
    }

    span {
      color: var(--primary-color);
    }
  `}
`,yr=({value:e,label:t,fixedMenuPosition:n,onSelected:r,children:o})=>{const a=(0,Gt.li)(null);(0,Gt.vJ)(()=>{a.current&&(a.current.value=e)},[e]);const s=(0,Gt.hb)(e=>{const t=e.detail;t?.value&&r(t.value)},[r]),c=(0,Gt.hb)(e=>{e.stopPropagation()},[]);return(0,Gt.vJ)(()=>{const e=a.current;if(e)return e.addEventListener("selected",s),e.addEventListener("closed",c),()=>{e.removeEventListener("selected",s),e.removeEventListener("closed",c)}},[s,c]),i("ha-select",{ref:a,label:t,fixedMenuPosition:n,children:o})},br=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],wr=({selectedDays:e,onChange:t})=>{const n=sn();return i(xr,{children:br.map(r=>i(kr,{$selected:e.includes(r),onClick:()=>(n=>{e.includes(n)?e.length>1&&t(e.filter(e=>e!==n)):t([...e,n])})(r),children:un(r,n)},r))})},xr=Vt.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 12px;
`,kr=Vt.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid var(--divider-color);
  background: var(--card-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.825rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  color: var(--primary-text-color);

  &:hover {
    border-color: var(--primary-color);
  }

  ${e=>e.$selected&&Ut`
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
  `}
`;function Sr(e){const t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}const Cr=({scheduleType:e,scheduleDays:t,onDaysChange:n,scheduleDayOfMonth:r,onDayOfMonthChange:o,scheduleDate:a,onDateChange:s})=>"once"===e?i(Er,{children:[i(Ir,{children:"On date"}),i("ha-textfield",{type:"date",value:a,onInput:e=>s(e.target.value)})]}):"weekly"===e?i(Er,{children:[i(Ir,{children:"On days"}),i(wr,{selectedDays:t,onChange:n})]}):"monthly"===e?i(Er,{children:i(yr,{value:String(r),label:"On day",fixedMenuPosition:!0,onSelected:e=>o(parseInt(e)||1),children:Array.from({length:31},(e,t)=>t+1).map(e=>i("ha-list-item",{value:String(e),children:Sr(e)},e))})}):null,Er=Vt.div`
  margin-top: 12px;
`,Ir=Vt.label`
  display: block;
  font-size: 0.825rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--secondary-text-color);
  margin-bottom: 8px;
`,Pr=({checked:e,onChange:t})=>{const n=(0,Gt.li)(null);(0,Gt.vJ)(()=>{n.current&&(n.current.checked=e)},[e]);const r=(0,Gt.hb)(e=>{e.stopPropagation(),t(e.target.checked)},[t]);return(0,Gt.vJ)(()=>{const e=n.current;if(e)return e.addEventListener("change",r),()=>e.removeEventListener("change",r)},[r]),i("ha-switch",{ref:n})},Ar=({checked:e,onClick:t})=>{const n=(0,Gt.li)(null);return(0,Gt.vJ)(()=>{n.current&&(n.current.checked=e)},[e]),i("ha-checkbox",{ref:n,onClick:t})},$r=({enabled:e,onEnabledChange:t,notifyTargets:n,onNotifyTargetsChange:r,persistentNotification:o,onPersistentChange:a})=>{const s=sn(),c=pn(),l=function(e){const t=e.notify;return t?Object.keys(t).filter(e=>e.startsWith("mobile_app_")).map(e=>({service:`notify.${e}`,name:e.replace("mobile_app_","").replace(/_/g," ")})):[]}(s?.services||{});return i(Nr,{children:[i(Dr,{onClick:()=>t(!e),children:[i("div",{children:[i(Or,{children:c("notifications.title")}),i(Tr,{children:"Get reminded when due"})]}),i(Pr,{checked:e,onChange:e=>{t(e)}})]}),e&&i(Rr,{children:[i(Fr,{$selected:o,onClick:()=>a(!o),children:[i("ha-icon",{icon:"mdi:bell-badge"}),i(Mr,{children:[i(jr,{children:"Persistent notification"}),i(zr,{children:"Shows in HA sidebar until dismissed"})]}),i(Ar,{checked:o,onClick:e=>e.stopPropagation()})]}),l.length>0&&i(Lr,{children:[i(Hr,{children:"Mobile devices"}),l.map(e=>i(Fr,{$selected:n.includes(e.service),onClick:()=>{return t=e.service,void(n.includes(t)?r(n.filter(e=>e!==t)):r([...n,t]));var t},children:[i("ha-icon",{icon:"mdi:cellphone"}),i(Mr,{children:i(jr,{children:e.name})}),i(Ar,{checked:n.includes(e.service),onClick:e=>e.stopPropagation()})]},e.service))]})]})]})},Nr=Vt.div`
  background: var(--secondary-background-color);
  border-radius: 10px;
  padding: 12px;
`,Dr=Vt.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`,Or=Vt.div`
  font-size: 0.925rem;
  font-weight: 500;
  color: var(--primary-text-color);
`,Tr=Vt.div`
  font-size: 0.825rem;
  color: var(--secondary-text-color);
  margin-top: 2px;
`,Rr=Vt.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Fr=Vt.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--card-background-color);
  border-radius: 8px;
  cursor: pointer;

  ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
  }

  ${e=>e.$selected&&Ut`
    ha-icon {
      color: var(--primary-color);
    }
  `}
`,Mr=Vt.div`
  flex: 1;
`,jr=Vt.div`
  font-size: 0.925rem;
  color: var(--primary-text-color);
`,zr=Vt.div`
  font-size: 0.825rem;
  color: var(--secondary-text-color);
`,Lr=Vt.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Hr=Vt.label`
  display: block;
  font-size: 0.825rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--secondary-text-color);
  margin-bottom: 6px;
`,Wr=({chore:e,onSave:t,onDelete:n,onTrigger:r,onClose:o})=>{sn();const a=pn(),s=(0,Gt.li)(null),[c,l]=(0,Gt.J0)(!1),d=!e,[u,p]=(0,Gt.J0)(e?.name||""),[f,h]=(0,Gt.J0)(e?.description||""),[_,m]=(0,Gt.J0)(e?.schedule.type||"weekly"),[g,v]=(0,Gt.J0)(e?.schedule.days||["sunday"]),[y,b]=(0,Gt.J0)(e?.schedule.time||"10:00"),[w,x]=(0,Gt.J0)(e?.schedule.day_of_month||1),[k,S]=(0,Gt.J0)(e?.schedule.date||(new Date).toISOString().split("T")[0]),C="unassigned"!==e?.assignment.mode&&e?.assignment.assignees?.length?e.assignment.assignees[0]:null,[E,I]=(0,Gt.J0)(C),P=(e?.notifications.notify_targets||[]).filter(e=>"persistent_notification"!==e),A=(e?.notifications.notify_targets||[]).includes("persistent_notification"),[$,N]=(0,Gt.J0)(e?.notifications.enabled||!1),[D,O]=(0,Gt.J0)(P),[T,R]=(0,Gt.J0)(A),F=(0,Gt.hb)(()=>{if(c)return;l(!0);const e=s.current,t=()=>o();e&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches?(e.addEventListener("animationend",n=>{n.target===e&&t()},{once:!0}),setTimeout(t,300)):t()},[c,o]);return i(Kr,{ref:s,$closing:c,onClick:F,children:i(Gr,{$closing:c,onClick:e=>e.stopPropagation(),children:[i(Yr,{children:i("h2",{children:a(d?"editor.add_title":"editor.edit_title")})}),i(qr,{children:[i(Xr,{children:[i(Zr,{class:"required",children:a("editor.name")}),i("ha-textfield",{value:u,onInput:e=>p(e.target.value),placeholder:"e.g. Vacuum the floors"})]}),i(Xr,{children:[i(Zr,{children:a("assignment.title")}),i(dr,{selectedAssignee:E,onSelect:I})]}),i(Xr,{children:[i(Zr,{children:a("schedule.title")}),i(mr,{scheduleType:_,onSelect:m}),i(Qr,{children:[i(Zr,{children:a("schedule.time")}),i("ha-textfield",{type:"time",value:y,onInput:e=>b(e.target.value)})]}),i(Cr,{scheduleType:_,scheduleDays:g,onDaysChange:v,scheduleDayOfMonth:w,onDayOfMonthChange:x,scheduleDate:k,onDateChange:S})]}),i(eo,{}),i(Xr,{children:[i(Zr,{children:a("editor.description")}),i("ha-textfield",{value:f,onInput:e=>h(e.target.value),placeholder:"Notes or instructions..."})]}),i($r,{enabled:$,onEnabledChange:N,notifyTargets:D,onNotifyTargetsChange:O,persistentNotification:T,onPersistentChange:R})]}),i(to,{children:[!d&&i(ro,{onClick:()=>{e&&confirm(a("editor.delete_confirm"))&&n(e.id)},children:a("editor.delete")}),!d&&i(ao,{onClick:()=>{e&&(r(e.id),F())},children:[i("ha-icon",{icon:"mdi:play"}),a("editor.trigger")]}),i(so,{}),i(oo,{onClick:F,children:a("editor.cancel")}),i(io,{onClick:()=>{const n={type:_,time:y,interval:1};"once"===_?n.date=k:"weekly"===_?n.days=g:"monthly"===_&&(n.day_of_month=w);const r={mode:E?"fixed":"unassigned",assignees:E?[E]:[],current_index:0},o=[...D];T&&o.push("persistent_notification");const i={enabled:$,remind_before:60,notify_targets:o},a={name:u.trim(),description:f.trim(),enabled:!0,schedule:n,assignment:r,notifications:i};e&&(a.id=e.id),t(a,d)},disabled:!u.trim(),children:a(d?"editor.add":"editor.save")})]})]})})},Ur=Kt`
  from { opacity: 0; }
  to { opacity: 1; }
`,Br=Kt`
  from { opacity: 1; }
  to { opacity: 0; }
`,Jr=Kt`
  from { opacity: 0; transform: translateY(24px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`,Vr=Kt`
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(24px) scale(0.96); }
`,Kr=Vt.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 12px;
  box-sizing: border-box;
  animation: ${Ur} 0.2s ease-out;

  ${e=>e.$closing&&Ut`
    animation: ${Br} 0.2s ease-in forwards;
  `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Gr=Vt.div`
  background: var(--card-background-color, white);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  max-height: calc(100vh - 24px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${Jr} 0.25s ease-out;

  ${e=>e.$closing&&Ut`
    animation: ${Vr} 0.2s ease-in forwards;
  `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Yr=Vt.div`
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--divider-color);

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }
`,qr=Vt.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
`,Xr=Vt.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  ha-textfield, ha-textarea, ha-select {
    display: block;
    width: 100%;
  }
`,Zr=Vt.label`
  display: block;
  font-size: 0.825rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--secondary-text-color);
  margin-bottom: 8px;

  &.required::after {
    content: " *";
    color: var(--error-color, #db4437);
  }
`,Qr=Vt.div`
  margin-top: 12px;

  ha-textfield {
    width: 110px;
  }
`,eo=Vt.div`
  height: 1px;
  background: var(--divider-color);
  margin: 20px 0;
`,to=Vt.div`
  display: flex;
  gap: 8px;
  padding: 12px 20px 16px;
  border-top: 1px solid var(--divider-color);
  justify-content: flex-end;
`,no=Vt.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
`,ro=Vt(no)`
  margin-right: auto;
  background: transparent;
  color: var(--error-color, #db4437);

  &:hover {
    background: rgba(219, 68, 55, 0.1);
  }
`,oo=Vt(no)`
  background: transparent;
  color: var(--primary-text-color);

  &:hover {
    background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.08);
  }
`,io=Vt(no)`
  background: var(--primary-color);
  color: white;

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ao=Vt(no)`
  background: transparent;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ha-icon {
    --mdc-icon-size: 16px;
  }

  &:hover {
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
  }
`,so=Vt.div`
  flex: 1;
`,co=()=>{const e=an(),t=cn(),n=an()(e=>e.chores),r=an()(e=>e.todoItems),o=e(e=>e.loading),a=e(e=>e.mode),{setMode:s,saveChore:c,deleteChore:l,triggerChore:d,loadData:u}=fn(),[p,f]=(0,Gt.J0)(!1),[h,_]=(0,Gt.J0)(null);if(!t)return null;const m=()=>{f(!1),_(null)};return i(lo,{children:[i(hn,{title:t.title||"Chore Scheduler",mode:a,onToggleMode:()=>{s("display"===a?"manage":"display")},onAddChore:()=>{_(null),f(!0)}}),o?i(uo,{children:i("ha-circular-progress",{indeterminate:!0})}):"display"===a?i(Xn,{todoItems:r,chores:n,config:t}):i(ar,{chores:n,todoItems:r,config:t,onEditChore:e=>{_(e),f(!0)}}),p&&i(Wr,{chore:h,onSave:async(e,t)=>{try{await c(e,t),m()}catch(e){console.error("[ChoreScheduler] Error saving chore:",e),alert(`Failed to save chore: ${e instanceof Error?e.message:String(e)}`)}},onDelete:async e=>{try{await l(e),m()}catch(e){console.error("[ChoreScheduler] Error deleting chore:",e)}},onTrigger:d,onClose:m})]})},lo=Vt.div`
  padding: 16px;
`,uo=Vt.div`
  display: flex;
  justify-content: center;
  padding: 32px;
`,po=({hass:e,config:t})=>{const n=an(),r=n(e=>e.setHass),o=n(e=>e.setConfig),a=n(e=>e.loadData),s=n(e=>!!e.hass);return(0,Gt.vJ)(()=>{r(e)},[e]),(0,Gt.vJ)(()=>{o(t)},[t]),(0,Gt.vJ)(()=>{s&&a()},[s]),i(co,{})},fo=({hass:e,config:t})=>i(on,{children:i(po,{hass:e,config:t})}),ho=({hass:e,config:t,onConfigChanged:n})=>{const r=e=>{n({...t,...e})};return i(_o,{children:[i(mo,{children:i("ha-textfield",{label:"Title",value:t.title||"Chore Scheduler",onInput:e=>r({title:e.target.value})})}),i(mo,{children:i(yr,{value:t.default_mode||"display",label:"Default mode",onSelected:e=>r({default_mode:e}),children:[i("ha-list-item",{value:"display",children:"Display (view todos)"}),i("ha-list-item",{value:"manage",children:"Manage (edit chores)"})]})}),i(go,{children:[i(vo,{children:[i(yo,{children:"Show disabled chores"}),i(Pr,{checked:!1!==t.show_disabled,onChange:e=>r({show_disabled:e})})]}),i(vo,{children:[i(yo,{children:"Show completed todos"}),i(Pr,{checked:!0===t.show_completed,onChange:e=>r({show_completed:e})})]}),i(vo,{children:[i(yo,{children:"Enable animations"}),i(Pr,{checked:!1!==t.enable_animations,onChange:e=>r({enable_animations:e})})]})]})]})},_o=Vt.div``,mo=Vt.div`
  margin-bottom: 16px;

  ha-textfield,
  ha-select {
    display: block;
    width: 100%;
  }
`,go=Vt.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,vo=Vt.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,yo=Vt.span`
  font-size: 1rem;
  color: var(--primary-text-color);
`;class bo extends HTMLElement{set hass(e){this._hass=e,this._render()}setConfig(e){this._config={...e,title:e.title??"Chore Scheduler",show_disabled:e.show_disabled??!0,show_next_due:e.show_next_due??!0,default_mode:e.default_mode??"display",show_completed:e.show_completed??!1,enable_animations:e.enable_animations??!0},this._render()}connectedCallback(){this._teardown(),this._render()}disconnectedCallback(){this._teardown()}getCardSize(){return 3}static getConfigElement(){return document.createElement("chore-scheduler-card-editor")}static getStubConfig(){return{title:"Chore Scheduler",show_disabled:!0,show_next_due:!0,default_mode:"display",show_completed:!1,enable_animations:!0}}_teardown(){this._card&&(0,r.XX)(null,this._card),this._card=void 0,this.innerHTML=""}_ensureCard(){return this._card||(this._card=document.createElement("ha-card"),this.appendChild(this._card)),this._card}_render(){if(!this._config||!this._hass)return;const e=this._ensureCard();(0,r.XX)(i(It,{target:this,children:i(fo,{hass:this._hass,config:this._config})}),e)}}customElements.define("chore-scheduler-card",bo);class wo extends HTMLElement{constructor(){super(...arguments),this._handleConfigChanged=e=>{this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this._render()}}set hass(e){this._hass=e,this._render()}setConfig(e){this._config=e,this._render()}_ensureContainer(){return this._container||(this._container=document.createElement("div"),this.appendChild(this._container)),this._container}_render(){if(!this._config||!this._hass)return;const e=this._ensureContainer();(0,r.XX)(i(It,{target:this,children:i(ho,{hass:this._hass,config:this._config,onConfigChanged:this._handleConfigChanged})}),e)}}customElements.define("chore-scheduler-card-editor",wo),window.customCards=window.customCards||[],window.customCards.push({type:"chore-scheduler-card",name:"Chore Scheduler Card",description:"A card for managing household chore schedules",preview:!0})})();