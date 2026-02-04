function e(e,t,i,o){var s,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)(s=e[n])&&(r=(a<3?s(r):a>3?s(t,i,r):s(t,i))||r);return a>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let a=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new a(i,e,o)},n=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:d,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,u=globalThis,g=u.trustedTypes,y=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,_=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!d(e,t),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&c(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:s}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const a=o?.call(this);s?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,o)=>{if(i)e.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of o){const o=document.createElement("style"),s=t.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,e.appendChild(o)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=o;const a=s.fromAttribute(t,e.type);this[o]=a??this._$Ej?.get(o)??a,this._$Em=null}}requestUpdate(e,t,i,o=!1,s){if(void 0!==e){const a=this.constructor;if(!1===o&&(s=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??b)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:s},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==s||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,f?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=e=>e,A=$.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+E,D=`<${T}>`,M=document,P=()=>M.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,z="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,R=/>/g,I=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,L=/"/g,q=/^(?:script|style|textarea|title)$/i,F=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,Y=M.createTreeWalker(M,129);function K(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,o=[];let s,a=2===t?"<svg>":3===t?"<math>":"",r=U;for(let t=0;t<i;t++){const i=e[t];let n,d,c=-1,l=0;for(;l<i.length&&(r.lastIndex=l,d=r.exec(i),null!==d);)l=r.lastIndex,r===U?"!--"===d[1]?r=j:void 0!==d[1]?r=R:void 0!==d[2]?(q.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=I):void 0!==d[3]&&(r=I):r===I?">"===d[0]?(r=s??U,c=-1):void 0===d[1]?c=-2:(c=r.lastIndex-d[2].length,n=d[1],r=void 0===d[3]?I:'"'===d[3]?L:H):r===L||r===H?r=I:r===j||r===R?r=U:(r=I,s=void 0);const h=r===I&&e[t+1].startsWith("/>")?" ":"";a+=r===U?i+D:c>=0?(o.push(n),i.slice(0,c)+C+i.slice(c)+E+h):i+E+(-2===c?t:h)}return[K(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class Z{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,a=0;const r=e.length-1,n=this.parts,[d,c]=J(e,t);if(this.el=Z.createElement(d,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=Y.nextNode())&&n.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(C)){const t=c[a++],i=o.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);n.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?te:"?"===r[1]?ie:"@"===r[1]?oe:ee}),o.removeAttribute(e)}else e.startsWith(E)&&(n.push({type:6,index:s}),o.removeAttribute(e));if(q.test(o.tagName)){const e=o.textContent.split(E),t=e.length-1;if(t>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],P()),Y.nextNode(),n.push({type:2,index:++s});o.append(e[t],P())}}}else if(8===o.nodeType)if(o.data===T)n.push({type:2,index:s});else{let e=-1;for(;-1!==(e=o.data.indexOf(E,e+1));)n.push({type:7,index:s}),e+=E.length-1}s++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function G(e,t,i=e,o){if(t===B)return t;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const a=O(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(e),s._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(t=G(e,s._$AS(e,t.values),s,o)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??M).importNode(t,!0);Y.currentNode=o;let s=Y.nextNode(),a=0,r=0,n=i[0];for(;void 0!==n;){if(a===n.index){let t;2===n.type?t=new X(s,s.nextSibling,this,e):1===n.type?t=new n.ctor(s,n.name,n.strings,this,e):6===n.type&&(t=new se(s,this,e)),this._$AV.push(t),n=i[++r]}a!==n?.index&&(s=Y.nextNode(),a++)}return Y.currentNode=M,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),O(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new Q(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new Z(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const s of e)o===t.length?t.push(i=new X(this.O(P()),this.O(P()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,o){const s=this.strings;let a=!1;if(void 0===s)e=G(this,e,t,0),a=!O(e)||e!==this._$AH&&e!==B,a&&(this._$AH=e);else{const o=e;let r,n;for(e=s[0],r=0;r<s.length-1;r++)n=G(this,o[i+r],t,r),n===B&&(n=this._$AH[r]),a||=!O(n)||n!==this._$AH[r],n===W?e=W:e!==W&&(e+=(n??"")+s[r+1]),this._$AH[r]=n}a&&!o&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class oe extends ee{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??W)===B)return;const i=this._$AH,o=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==W&&(i===W||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const ae=$.litHtmlPolyfillSupport;ae?.(Z,X),($.litHtmlVersions??=[]).push("3.3.2");const re=globalThis;class ne extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let s=o._$litPart$;if(void 0===s){const e=i?.renderBefore??null;o._$litPart$=s=new X(t.insertBefore(P(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ne._$litElement$=!0,ne.finalized=!0,re.litElementHydrateSupport?.({LitElement:ne});const de=re.litElementPolyfillSupport;de?.({LitElement:ne}),(re.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},le={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},he=(e=le,t,i)=>{const{kind:o,metadata:s}=i;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,s,e,!0,i)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];t.call(this,i),this.requestUpdate(o,s,e,!0,i)}}throw Error("Unsupported decorator location: "+o)};function pe(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function me(e){return pe({...e,state:!0,attribute:!1})}const ue=r`
  :host {
    --mdc-theme-primary: var(--primary-color);
  }

  ha-card {
    padding: 16px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
  }

  .card-header h1 {
    margin: 0;
    font-size: 1.625rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header-btn {
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
  }

  .header-btn:hover {
    background: var(--secondary-background-color);
    border-color: var(--primary-color);
  }

  .header-btn:active {
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.12);
  }

  .header-btn ha-icon {
    --mdc-icon-size: 16px;
    display: flex;
  }

  .chore-actions ha-icon-button ha-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── Manage Mode: Chore List ─────────────────────────── */

  .chore-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    animation: fade-in 0.2s ease-out;
  }

  .chore-item {
    display: flex;
    align-items: center;
    padding: 12px;
    background: var(--card-background-color, var(--ha-card-background));
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .chore-item:hover {
    background: var(--secondary-background-color);
  }

  .chore-item.disabled {
    opacity: 0.5;
  }

  .chore-icon {
    margin-right: 12px;
    color: var(--primary-color);
    --mdc-icon-size: 24px;
  }

  .chore-info {
    flex: 1;
    min-width: 0;
  }

  .chore-name {
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chore-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    flex-wrap: wrap;
  }

  .chore-actions {
    display: flex;
    gap: 4px;
  }

  /* ── Schedule Pills ──────────────────────────────────── */

  .schedule-pill {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.825rem;
    font-weight: 500;
    white-space: nowrap;
  }

  .schedule-pill.daily {
    background: rgba(76, 175, 80, 0.15);
    color: var(--label-badge-green, #4caf50);
  }

  .schedule-pill.weekly {
    background: rgba(33, 150, 243, 0.15);
    color: var(--label-badge-blue, #2196f3);
  }

  .schedule-pill.monthly {
    background: rgba(156, 39, 176, 0.15);
    color: var(--label-badge-purple, #9c27b0);
  }

  .schedule-pill.once {
    background: rgba(255, 152, 0, 0.15);
    color: var(--label-badge-yellow, #ff9800);
  }

  /* ── Assignee Avatars ────────────────────────────────── */

  .assignee-avatar {
    width: 24px;
    height: 24px;
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
  }

  .assignee-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* ── Streak Badge ────────────────────────────────────── */

  .streak-badge {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 0.825rem;
    font-weight: 600;
    color: var(--warning-color, #ff9800);
    white-space: nowrap;
  }

  .streak-badge ha-icon {
    --mdc-icon-size: 14px;
  }

  /* ── Display Mode: Todo List ─────────────────────────── */

  .todo-section {
    margin-bottom: 12px;
  }

  .todo-section:last-child {
    margin-bottom: 0;
  }

  .section-header {
    font-size: 0.825rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--secondary-text-color);
    padding: 4px 0 8px 0;
  }

  .todo-section.overdue .section-header {
    color: var(--error-color, #f44336);
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .todo-item {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    border-radius: 8px;
    gap: 8px;
    transition: background-color 0.15s, opacity 0.3s;
  }

  .todo-item:hover {
    background: var(--secondary-background-color);
  }

  .todo-item.overdue {
    border-left: 3px solid var(--error-color, #f44336);
  }

  .todo-item.completed {
    opacity: 0.5;
  }

  .todo-checkbox {
    --mdc-icon-size: 22px;
    cursor: pointer;
    color: var(--secondary-text-color);
    transition: color 0.15s, transform 0.15s;
    flex-shrink: 0;
  }

  .todo-checkbox:hover {
    color: var(--primary-color);
  }

  .todo-item.completed .todo-checkbox {
    color: var(--success-color, #4caf50);
    cursor: default;
  }

  .todo-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }

  .todo-info {
    flex: 1;
    min-width: 0;
  }

  .todo-summary {
    font-size: 1.025rem;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  .todo-item.completed .todo-summary {
    text-decoration: line-through;
    color: var(--secondary-text-color);
  }

  /* ── Animations ──────────────────────────────────────── */

  @keyframes checkmark-pop {
    0% { transform: scale(1); }
    40% { transform: scale(1.4); }
    100% { transform: scale(1); }
  }

  .todo-checkbox.completing {
    animation: checkmark-pop 0.3s ease-out;
    color: var(--success-color, #4caf50);
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Item completing: pop the check, then fade out the row */
  @keyframes item-fade-out {
    0% { opacity: 1; max-height: 60px; padding-top: 10px; padding-bottom: 10px; margin-bottom: 0; }
    50% { opacity: 0; max-height: 60px; padding-top: 10px; padding-bottom: 10px; margin-bottom: 0; }
    100% { opacity: 0; max-height: 0; padding-top: 0; padding-bottom: 0; margin-bottom: -4px; }
  }

  .todo-item.completing-item {
    animation: item-fade-out 0.45s ease-out forwards;
    overflow: hidden;
    pointer-events: none;
  }

  .todo-item.completing-item .todo-checkbox {
    color: var(--success-color, #4caf50);
  }

  .todo-item.completing-item .todo-summary {
    text-decoration: line-through;
    color: var(--secondary-text-color);
  }

  /* Sections and content areas entering - only on the list container,
     not individual items, to avoid re-animating on every state update */
  .todo-list {
    animation: fade-in 0.2s ease-out both;
  }

  /* ── All Done Celebration ────────────────────────────── */

  @keyframes celebrate-in {
    from { opacity: 0; transform: scale(0.9) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  .all-done {
    text-align: center;
    padding: 32px 16px;
    animation: celebrate-in 0.4s ease-out;
  }

  .all-done ha-icon {
    --mdc-icon-size: 48px;
    color: var(--success-color, #4caf50);
    margin-bottom: 12px;
  }

  .all-done p {
    font-size: 1.225rem;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
  }

  /* ── Empty State ─────────────────────────────────────── */

  .empty-state {
    text-align: center;
    padding: 32px 16px;
    color: var(--secondary-text-color);
    animation: fade-in 0.3s ease-out;
  }

  .empty-state ha-icon {
    --mdc-icon-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  .loading {
    display: flex;
    justify-content: center;
    padding: 32px;
  }

  /* ── Reduced Motion ──────────────────────────────────── */

  @media (prefers-reduced-motion: reduce) {
    .todo-checkbox.completing,
    .all-done,
    .todo-item.completing-item,
    .todo-list,
    .empty-state,
    .chore-list {
      animation: none;
    }
  }
`;r`
  :host {
    display: block;
  }

  .editor-content {
    padding: 16px;
  }

  .form-row {
    margin-bottom: 16px;
  }

  .form-row label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .form-row ha-textfield,
  .form-row ha-textarea,
  .form-row ha-select {
    width: 100%;
  }

  .section-header {
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 24px 0 12px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--divider-color);
  }

  .weekday-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .weekday-chip {
    padding: 6px 12px;
    border-radius: 16px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
  }

  .weekday-chip.selected {
    background: var(--primary-color);
    color: var(--text-primary-color, white);
    border-color: var(--primary-color);
  }

  .time-input {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .assignee-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .assignee-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .assignee-item ha-select {
    flex: 1;
  }

  .button-row {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--divider-color);
  }

  .delete-button {
    --mdc-theme-primary: var(--error-color);
    margin-right: auto;
  }

  ha-switch {
    margin-right: 8px;
  }

  .switch-row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .switch-row label {
    flex: 1;
  }
`,r`
  ha-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
  }

  @media (max-width: 450px) {
    ha-dialog {
      --mdc-dialog-min-width: 100%;
      --mdc-dialog-max-width: 100%;
    }
  }
`;const ge={en:{"card.title":"Chore scheduler","card.empty_title":"No chores configured yet.","card.empty_subtitle":"Click the + button to add your first chore.","editor.add_title":"Add chore","editor.edit_title":"Edit chore","editor.name":"Name","editor.description":"Description (optional)","editor.enabled":"Enabled","editor.save":"Save","editor.add":"Add","editor.cancel":"Cancel","editor.delete":"Delete","editor.delete_confirm":"Are you sure you want to delete this chore?","schedule.title":"Schedule","schedule.frequency":"Frequency","schedule.once":"Once","schedule.daily":"Daily","schedule.weekly":"Weekly","schedule.monthly":"Monthly","schedule.days":"Days","schedule.day_of_month":"Day of month","schedule.time":"Time","weekday.monday":"Mon","weekday.tuesday":"Tue","weekday.wednesday":"Wed","weekday.thursday":"Thu","weekday.friday":"Fri","weekday.saturday":"Sat","weekday.sunday":"Sun","assignment.title":"Assignment","assignment.mode":"Mode","assignment.unassigned":"Unassigned","assignment.fixed":"Fixed","assignment.rotating":"Rotating","assignment.assignees":"Assignees","assignment.add_assignee":"Add assignee","assignment.rotating_current":"Rotating (current: {name})","assignment.assigned_to":"Assigned to: {names}","target.title":"Target","target.todo_list":"Todo list","target.default":"Default","notifications.title":"Notifications","notifications.send":"Send notifications","notifications.targets":"Notify targets","notifications.add_target":"Add target","display.daily_at":"Daily at {time}","display.monthly_at":"Monthly on day {day} at {time}","display.at_time":"At {time}","action.edit_chores":"Edit chores","action.show_chores":"Show chores","action.add":"Add","mode.display":"View","mode.manage":"Manage","display.overdue":"Overdue","display.today":"Today","display.upcoming":"Upcoming","display.done":"Done","display.all_done":"All chores done!","display.no_pending":"No pending chores","display.empty_todos":"No chores scheduled yet.","display.streak":"{count} day streak"},sv:{"card.title":"Sysslor","card.empty_title":"Inga sysslor konfigurerade ännu.","card.empty_subtitle":"Klicka på + för att lägga till din första syssla.","editor.add_title":"Lägg till syssla","editor.edit_title":"Redigera syssla","editor.name":"Namn","editor.description":"Beskrivning (valfritt)","editor.enabled":"Aktiverad","editor.save":"Spara","editor.add":"Lägg till","editor.cancel":"Avbryt","editor.delete":"Ta bort","editor.delete_confirm":"Är du säker på att du vill ta bort denna syssla?","schedule.title":"Schema","schedule.frequency":"Frekvens","schedule.once":"En gång","schedule.daily":"Dagligen","schedule.weekly":"Veckovis","schedule.monthly":"Månadsvis","schedule.days":"Dagar","schedule.day_of_month":"Dag i månaden","schedule.time":"Tid","weekday.monday":"Mån","weekday.tuesday":"Tis","weekday.wednesday":"Ons","weekday.thursday":"Tor","weekday.friday":"Fre","weekday.saturday":"Lör","weekday.sunday":"Sön","assignment.title":"Tilldelning","assignment.mode":"Läge","assignment.unassigned":"Ej tilldelad","assignment.fixed":"Fast","assignment.rotating":"Roterande","assignment.assignees":"Tilldelade","assignment.add_assignee":"Lägg till person","assignment.rotating_current":"Roterande (nuvarande: {name})","assignment.assigned_to":"Tilldelad: {names}","target.title":"Mål","target.todo_list":"Att-göra-lista","target.default":"Standard","notifications.title":"Notifieringar","notifications.send":"Skicka notifieringar","notifications.targets":"Notifieringsmål","notifications.add_target":"Lägg till mål","display.daily_at":"Dagligen kl {time}","display.monthly_at":"Månadsvis dag {day} kl {time}","display.at_time":"Kl {time}","action.edit_chores":"Ändra sysslor","action.show_chores":"Visa sysslor","action.add":"Lägg till","mode.display":"Visa","mode.manage":"Hantera","display.overdue":"Försenade","display.today":"Idag","display.upcoming":"Kommande","display.done":"Klart","display.all_done":"Alla sysslor klara!","display.no_pending":"Inga väntande sysslor","display.empty_todos":"Inga sysslor schemalagda ännu.","display.streak":"{count} dagars svit"}};function ye(e,t,i){let o=(ge[t?.language||"en"]||ge.en)[e]||ge.en[e]||e;return i&&Object.entries(i).forEach(([e,t])=>{o=o.replace(`{${e}}`,String(t))}),o}function fe(e,t){return ye(`weekday.${e}`,t)}const _e=[{keywords:["vacuum","dammsug","dammsu"],icon:"mdi:vacuum"},{keywords:["mop","mopp","skur"],icon:"mdi:creation"},{keywords:["dust","damm","torka av"],icon:"mdi:spray"},{keywords:["clean","städ","rengör","putsa"],icon:"mdi:spray-bottle"},{keywords:["wipe","torka"],icon:"mdi:spray"},{keywords:["scrub","skrubba"],icon:"mdi:brush"},{keywords:["sweep","sopa","broom","kvast"],icon:"mdi:broom"},{keywords:["dish","disk","tallrik"],icon:"mdi:dishwasher"},{keywords:["cook","laga mat","matlagning"],icon:"mdi:pot-steam"},{keywords:["grocer","handla","shop","inköp","inkop","affär"],icon:"mdi:cart"},{keywords:["trash","garbage","sopor","soptunna","avfall","kasta"],icon:"mdi:trash-can"},{keywords:["recycl","återvinn","atervinn","sorter"],icon:"mdi:recycle"},{keywords:["compost","kompost"],icon:"mdi:leaf"},{keywords:["laundry","tvätt","tvatt"],icon:"mdi:washing-machine"},{keywords:["wash","tvätta","tvatta"],icon:"mdi:washing-machine"},{keywords:["iron","stryk","stryka"],icon:"mdi:tshirt-crew"},{keywords:["fold","vik","vika"],icon:"mdi:tshirt-crew"},{keywords:["lawn","gräsmatta","grasmatta","mow","klipp gräs","gräsklipp"],icon:"mdi:mower-bag"},{keywords:["garden","trädgård","tradgard","odla"],icon:"mdi:flower"},{keywords:["plant","växt","vaxt","blomm"],icon:"mdi:flower"},{keywords:["water","vattna"],icon:"mdi:watering-can"},{keywords:["snow","snö","sno","skotta"],icon:"mdi:snowflake"},{keywords:["rake","kratta","löv","lov"],icon:"mdi:leaf"},{keywords:["dog","hund"],icon:"mdi:dog"},{keywords:["cat","katt"],icon:"mdi:cat"},{keywords:["pet","husdjur","djur"],icon:"mdi:paw"},{keywords:["feed","mata","foder"],icon:"mdi:food-drumstick"},{keywords:["walk","promen","rast"],icon:"mdi:walk"},{keywords:["litter","kattlåd","kattlad","kattsan"],icon:"mdi:cat"},{keywords:["bed","säng","sang","bädd"],icon:"mdi:bed"},{keywords:["bathroom","badrum","toalett","toilet","wc"],icon:"mdi:toilet"},{keywords:["shower","dusch"],icon:"mdi:shower"},{keywords:["window","fönster","fonster"],icon:"mdi:window-open"},{keywords:["floor","golv"],icon:"mdi:floor-plan"},{keywords:["mail","post","brev"],icon:"mdi:mailbox"},{keywords:["bill","räkning","rakning","faktur"],icon:"mdi:receipt-text"},{keywords:["pay","betal"],icon:"mdi:credit-card"},{keywords:["medic","medicin","läkemedel"],icon:"mdi:pill"},{keywords:["vitamin"],icon:"mdi:pill"},{keywords:["exercis","workout","träna","trana","motion"],icon:"mdi:dumbbell"}];function ve(e){return e.toLowerCase().replace(/å/g,"a").replace(/ä/g,"a").replace(/ö/g,"o")}function be(e,t){const i=e.indexOf(t);return-1!==i&&(0===i||/[\s\-_,;:(\/]/.test(e[i-1]))}function xe(e){const t=ve(e),i=e.toLowerCase();for(const e of _e)for(const o of e.keywords){const s=ve(o);if(be(t,s))return e.icon;if(o!==s&&be(i,o))return e.icon}return"mdi:checkbox-marked-circle-outline"}const we=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;const $e=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];let ke=class extends ne{constructor(){super(...arguments),this.chore=null,this._name="",this._description="",this._scheduleType="weekly",this._scheduleDays=["sunday"],this._scheduleTime="10:00",this._scheduleDayOfMonth=1,this._scheduleDate="",this._selectedAssignee=null,this._notificationsEnabled=!1,this._notifyTargets=[],this._persistentNotification=!1,this._closing=!1}firstUpdated(e){super.firstUpdated(e),this._initializeFromChore()}updated(e){super.updated(e),e.has("chore")&&this._initializeFromChore()}_initializeFromChore(){if(this.chore){this._name=this.chore.name,this._description=this.chore.description||"",this._scheduleType=this.chore.schedule.type,this._scheduleDays=this.chore.schedule.days||["sunday"],this._scheduleTime=this.chore.schedule.time||"10:00",this._scheduleDayOfMonth=this.chore.schedule.day_of_month||1,this._scheduleDate=this.chore.schedule.date||this._getTodayDate();const e=this.chore.assignment;"unassigned"!==e.mode&&e.assignees?.length?this._selectedAssignee=e.assignees[0]:this._selectedAssignee=null,this._notificationsEnabled=this.chore.notifications.enabled,this._notifyTargets=[...this.chore.notifications.notify_targets||[]],this._persistentNotification=this._notifyTargets.includes("persistent_notification"),this._notifyTargets=this._notifyTargets.filter(e=>"persistent_notification"!==e)}else this._resetForm()}_resetForm(){this._name="",this._description="",this._scheduleType="weekly",this._scheduleDays=["sunday"],this._scheduleTime="10:00",this._scheduleDayOfMonth=1,this._scheduleDate=this._getTodayDate(),this._selectedAssignee=null,this._notificationsEnabled=!1,this._notifyTargets=[],this._persistentNotification=!1}_getTodayDate(){return(new Date).toISOString().split("T")[0]}render(){const e=!this.chore,t=this._getPersonEntities(),i=this._getMobileDevices();return F`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div class="dialog" @click=${e=>e.stopPropagation()}>
          <div class="dialog-header">
            <h2>${ye(e?"editor.add_title":"editor.edit_title",this.hass)}</h2>
          </div>

          <div class="dialog-content">
            <!-- Name -->
            <div class="form-group">
              <label class="form-label required">${ye("editor.name",this.hass)}</label>
              <ha-textfield
                .value=${this._name}
                @input=${e=>this._name=e.target.value}
                placeholder="e.g. Vacuum the floors"
              ></ha-textfield>
            </div>

            <!-- Who -->
            <div class="form-group">
              <label class="form-label">${ye("assignment.title",this.hass)}</label>
              <div class="person-grid">
                <div
                  class="person-option ${null===this._selectedAssignee?"selected":""}"
                  @click=${()=>this._selectedAssignee=null}
                >
                  <div class="person-avatar">
                    <ha-icon icon="mdi:account-group"></ha-icon>
                  </div>
                  <span class="person-name">Anyone</span>
                </div>
                ${t.map(e=>this._renderPersonOption(e))}
              </div>
            </div>

            <!-- When -->
            <div class="form-group">
              <label class="form-label">${ye("schedule.title",this.hass)}</label>

              <!-- Schedule type chips -->
              <div class="schedule-type-grid">
                <div
                  class="schedule-type-chip ${"once"===this._scheduleType?"selected":""}"
                  @click=${()=>this._setScheduleType("once")}
                >
                  <ha-icon icon="mdi:numeric-1-circle"></ha-icon>
                  <span>${ye("schedule.once",this.hass)}</span>
                </div>
                <div
                  class="schedule-type-chip ${"daily"===this._scheduleType?"selected":""}"
                  @click=${()=>this._setScheduleType("daily")}
                >
                  <ha-icon icon="mdi:calendar-today"></ha-icon>
                  <span>${ye("schedule.daily",this.hass)}</span>
                </div>
                <div
                  class="schedule-type-chip ${"weekly"===this._scheduleType?"selected":""}"
                  @click=${()=>this._setScheduleType("weekly")}
                >
                  <ha-icon icon="mdi:calendar-week"></ha-icon>
                  <span>${ye("schedule.weekly",this.hass)}</span>
                </div>
                <div
                  class="schedule-type-chip ${"monthly"===this._scheduleType?"selected":""}"
                  @click=${()=>this._setScheduleType("monthly")}
                >
                  <ha-icon icon="mdi:calendar-month"></ha-icon>
                  <span>${ye("schedule.monthly",this.hass)}</span>
                </div>
              </div>

              <!-- Time input -->
              <div class="time-section">
                <label class="form-label">${ye("schedule.time",this.hass)}</label>
                <ha-textfield
                  type="time"
                  .value=${this._scheduleTime}
                  @input=${e=>this._scheduleTime=e.target.value}
                ></ha-textfield>
              </div>

              <!-- Schedule type specific options -->
              ${this._renderScheduleExtra()}
            </div>

            <div class="divider"></div>

            <!-- Description -->
            <div class="form-group">
              <label class="form-label">${ye("editor.description",this.hass)}</label>
              <ha-textfield
                .value=${this._description}
                @input=${e=>this._description=e.target.value}
                placeholder="Notes or instructions..."
              ></ha-textfield>
            </div>

            <!-- Notifications -->
            <div class="optional-section">
              <div class="optional-header" @click=${()=>this._notificationsEnabled=!this._notificationsEnabled}>
                <div>
                  <div class="optional-title">${ye("notifications.title",this.hass)}</div>
                  <div class="optional-desc">Get reminded when due</div>
                </div>
                <ha-switch
                  .checked=${this._notificationsEnabled}
                  @click=${e=>e.stopPropagation()}
                ></ha-switch>
              </div>

              ${this._notificationsEnabled?F`
                <div class="notify-options">
                  <div
                    class="notify-option ${this._persistentNotification?"selected":""}"
                    @click=${()=>this._persistentNotification=!this._persistentNotification}
                  >
                    <ha-icon icon="mdi:bell-badge"></ha-icon>
                    <div class="notify-option-info">
                      <div class="notify-option-title">Persistent notification</div>
                      <div class="notify-option-desc">Shows in HA sidebar until dismissed</div>
                    </div>
                    <ha-checkbox
                      .checked=${this._persistentNotification}
                      @click=${e=>e.stopPropagation()}
                    ></ha-checkbox>
                  </div>

                  ${i.length>0?F`
                    <div class="notify-targets">
                      <label class="form-label" style="margin-bottom: 6px;">Mobile devices</label>
                      ${i.map(e=>F`
                        <div
                          class="notify-option ${this._notifyTargets.includes(e.service)?"selected":""}"
                          @click=${()=>this._toggleNotifyTarget(e.service)}
                        >
                          <ha-icon icon="mdi:cellphone"></ha-icon>
                          <div class="notify-option-info">
                            <div class="notify-option-title">${e.name}</div>
                          </div>
                          <ha-checkbox
                            .checked=${this._notifyTargets.includes(e.service)}
                            @click=${e=>e.stopPropagation()}
                          ></ha-checkbox>
                        </div>
                      `)}
                    </div>
                  `:W}
                </div>
              `:W}
            </div>
          </div>

          <div class="dialog-actions">
            ${e?W:F`
              <button class="btn btn-danger delete-btn" @click=${this._handleDelete}>
                ${ye("editor.delete",this.hass)}
              </button>
            `}
            <button class="btn btn-text" @click=${this._handleCancel}>
              ${ye("editor.cancel",this.hass)}
            </button>
            <button
              class="btn btn-primary"
              @click=${this._handleSave}
              ?disabled=${!this._name.trim()}
            >
              ${ye(e?"editor.add":"editor.save",this.hass)}
            </button>
          </div>
        </div>
      </div>
    `}_setScheduleType(e){this._scheduleType=e}_renderScheduleExtra(){return"once"===this._scheduleType?F`
        <div class="schedule-extra">
          <label class="form-label">On date</label>
          <ha-textfield
            type="date"
            .value=${this._scheduleDate}
            @input=${e=>this._scheduleDate=e.target.value}
          ></ha-textfield>
        </div>
      `:"weekly"===this._scheduleType?F`
        <div class="schedule-extra">
          <label class="form-label">On days</label>
          <div class="day-grid">
            ${$e.map(e=>F`
              <div
                class="day-chip ${this._scheduleDays.includes(e)?"selected":""}"
                @click=${()=>this._toggleDay(e)}
              >
                ${fe(e,this.hass)}
              </div>
            `)}
          </div>
        </div>
      `:"monthly"===this._scheduleType?F`
        <div class="schedule-extra">
          <ha-select
            .value=${String(this._scheduleDayOfMonth)}
            @selected=${this._handleDayOfMonthChange}
            @closed=${e=>e.stopPropagation()}
            label="On day"
            fixedMenuPosition
          >
            ${Array.from({length:31},(e,t)=>t+1).map(e=>F`
              <ha-list-item .value=${String(e)}>${this._formatOrdinal(e)}</ha-list-item>
            `)}
          </ha-select>
        </div>
      `:W}_formatOrdinal(e){const t=["th","st","nd","rd"],i=e%100;return e+(t[(i-20)%10]||t[i]||t[0])}_handleDayOfMonthChange(e){e.detail?.value&&(this._scheduleDayOfMonth=parseInt(e.detail.value)||1)}_renderPersonOption(e){const t=e.entity_id,i=(e.attributes.friendly_name||t.split(".")[1].replace(/_/g," ")).split(" ")[0],o=e.attributes.entity_picture,s=this._selectedAssignee===t;return F`
      <div
        class="person-option ${s?"selected":""}"
        @click=${()=>this._selectedAssignee=t}
      >
        <div class="person-avatar">
          ${o?F`<img src="${o}" alt="${i}" />`:F`<ha-icon icon="mdi:account"></ha-icon>`}
        </div>
        <span class="person-name">${i}</span>
      </div>
    `}_getPersonEntities(){return Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("person."))}_getMobileDevices(){const e=this.hass.services.notify;return e?Object.keys(e).filter(e=>e.startsWith("mobile_app_")).map(e=>({service:`notify.${e}`,name:e.replace("mobile_app_","").replace(/_/g," ")})):[]}_toggleDay(e){this._scheduleDays.includes(e)?this._scheduleDays.length>1&&(this._scheduleDays=[...this._scheduleDays.filter(t=>t!==e)]):this._scheduleDays=[...this._scheduleDays,e]}_toggleNotifyTarget(e){this._notifyTargets.includes(e)?this._notifyTargets=[...this._notifyTargets.filter(t=>t!==e)]:this._notifyTargets=[...this._notifyTargets,e]}_handleOverlayClick(){this._animateClose()}_handleCancel(){this._animateClose()}_animateClose(){if(this._closing)return;this._closing=!0;const e=this.shadowRoot?.querySelector(".overlay"),t=()=>{this.dispatchEvent(new CustomEvent("editor-close",{bubbles:!0,composed:!0}))};e&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches?(e.classList.add("closing"),e.addEventListener("animationend",i=>{i.target===e&&t()},{once:!0}),setTimeout(t,300)):t()}_handleSave(){const e={type:this._scheduleType,time:this._scheduleTime,interval:1};"once"===this._scheduleType?e.date=this._scheduleDate:"weekly"===this._scheduleType?e.days=this._scheduleDays:"monthly"===this._scheduleType&&(e.day_of_month=this._scheduleDayOfMonth);const t={mode:this._selectedAssignee?"fixed":"unassigned",assignees:this._selectedAssignee?[this._selectedAssignee]:[],current_index:0},i=[...this._notifyTargets];this._persistentNotification&&i.push("persistent_notification");const o={enabled:this._notificationsEnabled,remind_before:60,notify_targets:i},s={name:this._name.trim(),description:this._description.trim(),enabled:!0,schedule:e,assignment:t,notifications:o};this.chore&&(s.id=this.chore.id),this.dispatchEvent(new CustomEvent("chore-save",{detail:{chore:s,isNew:!this.chore},bubbles:!0,composed:!0}))}_handleDelete(){this.chore&&confirm(ye("editor.delete_confirm",this.hass))&&this.dispatchEvent(new CustomEvent("chore-delete",{detail:{choreId:this.chore.id},bubbles:!0,composed:!0}))}};ke.styles=r`
    @keyframes overlay-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes overlay-fade-out {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes dialog-enter {
      from { opacity: 0; transform: translateY(24px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes dialog-exit {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to { opacity: 0; transform: translateY(24px) scale(0.96); }
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      padding: 12px;
      box-sizing: border-box;
      animation: overlay-fade-in 0.2s ease-out;
    }

    .overlay.closing {
      animation: overlay-fade-out 0.2s ease-in forwards;
    }

    .dialog {
      background: var(--card-background-color, white);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 400px;
      max-height: calc(100vh - 24px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: dialog-enter 0.25s ease-out;
    }

    .overlay.closing .dialog {
      animation: dialog-exit 0.2s ease-in forwards;
    }

    @media (prefers-reduced-motion: reduce) {
      .overlay,
      .overlay.closing,
      .dialog,
      .overlay.closing .dialog {
        animation: none;
      }
    }

    .dialog-header {
      padding: 16px 20px 12px;
      border-bottom: 1px solid var(--divider-color);
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .dialog-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group:last-child {
      margin-bottom: 0;
    }

    .form-label {
      display: block;
      font-size: 0.825rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }

    .form-label.required::after {
      content: " *";
      color: var(--error-color, #db4437);
    }

    ha-textfield, ha-textarea, ha-select {
      display: block;
      width: 100%;
    }


    /* Person selector - 5 per row grid */
    .person-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 6px;
    }

    .person-option {
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
    }

    .person-option:hover {
      border-color: var(--primary-color);
    }

    .person-option.selected {
      border-color: var(--primary-color);
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
    }

    .person-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--secondary-background-color);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
    }

    .person-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .person-avatar ha-icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }

    .person-name {
      font-size: 0.775rem;
      color: var(--primary-text-color);
      text-align: center;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .person-option.selected .person-name {
      font-weight: 500;
      color: var(--primary-color);
    }

    /* Schedule type chips - 4 columns */
    .schedule-type-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 12px;
    }

    .schedule-type-chip {
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
    }

    .schedule-type-chip:hover {
      border-color: var(--primary-color);
    }

    .schedule-type-chip.selected {
      border-color: var(--primary-color);
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
    }

    .schedule-type-chip ha-icon {
      --mdc-icon-size: 24px;
      color: var(--secondary-text-color);
    }

    .schedule-type-chip.selected ha-icon {
      color: var(--primary-color);
    }

    .schedule-type-chip span {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .schedule-type-chip.selected span {
      color: var(--primary-color);
    }

    /* Time input section */
    .time-section {
      margin-top: 12px;
    }

    .time-section ha-textfield {
      width: 110px;
    }

    /* Day selector */
    .day-grid {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .day-chip {
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
    }

    .day-chip:hover {
      border-color: var(--primary-color);
    }

    .day-chip.selected {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: white;
    }

    /* Schedule extra options */
    .schedule-extra {
      margin-top: 12px;
    }

    /* Divider */
    .divider {
      height: 1px;
      background: var(--divider-color);
      margin: 20px 0;
    }

    /* Optional section */
    .optional-section {
      background: var(--secondary-background-color);
      border-radius: 10px;
      padding: 12px;
      margin-bottom: 12px;
    }

    .optional-section:last-child {
      margin-bottom: 0;
    }

    .optional-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }

    .optional-title {
      font-size: 0.925rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .optional-desc {
      font-size: 0.825rem;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .notify-options {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .notify-option {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      background: var(--card-background-color);
      border-radius: 8px;
      cursor: pointer;
    }

    .notify-option ha-icon {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
    }

    .notify-option.selected ha-icon {
      color: var(--primary-color);
    }

    .notify-option-info {
      flex: 1;
    }

    .notify-option-title {
      font-size: 0.925rem;
      color: var(--primary-text-color);
    }

    .notify-option-desc {
      font-size: 0.825rem;
      color: var(--secondary-text-color);
    }

    .notify-targets {
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* Actions */
    .dialog-actions {
      display: flex;
      gap: 8px;
      padding: 12px 20px 16px;
      border-top: 1px solid var(--divider-color);
      justify-content: flex-end;
    }

    .delete-btn {
      margin-right: auto;
    }

    /* Custom button styling */
    .btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: all 0.15s ease;
    }

    .btn-text {
      background: transparent;
      color: var(--primary-text-color);
    }

    .btn-text:hover {
      background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.08);
    }

    .btn-danger {
      background: transparent;
      color: var(--error-color, #db4437);
    }

    .btn-danger:hover {
      background: rgba(219, 68, 55, 0.1);
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
    }

    .btn-primary:hover {
      filter: brightness(1.1);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,e([pe({attribute:!1})],ke.prototype,"hass",void 0),e([pe({attribute:!1})],ke.prototype,"chore",void 0),e([me()],ke.prototype,"_name",void 0),e([me()],ke.prototype,"_description",void 0),e([me()],ke.prototype,"_scheduleType",void 0),e([me()],ke.prototype,"_scheduleDays",void 0),e([me()],ke.prototype,"_scheduleTime",void 0),e([me()],ke.prototype,"_scheduleDayOfMonth",void 0),e([me()],ke.prototype,"_scheduleDate",void 0),e([me()],ke.prototype,"_selectedAssignee",void 0),e([me()],ke.prototype,"_notificationsEnabled",void 0),e([me()],ke.prototype,"_notifyTargets",void 0),e([me()],ke.prototype,"_persistentNotification",void 0),ke=e([ce("chore-editor")],ke);let Ae=class extends ne{setConfig(e){this._config=e}render(){return this.hass&&this._config?F`
      <div class="form-group">
        <ha-textfield
          label="Title"
          .value=${this._config.title||"Chore Scheduler"}
          @input=${this._titleChanged}
        ></ha-textfield>
      </div>

      <div class="form-group">
        <ha-select
          label="Default mode"
          .value=${this._config.default_mode||"display"}
          @selected=${this._defaultModeChanged}
          @closed=${e=>e.stopPropagation()}
        >
          <ha-list-item value="display">Display (view todos)</ha-list-item>
          <ha-list-item value="manage">Manage (edit chores)</ha-list-item>
        </ha-select>
      </div>

      <div class="switches">
        <div class="switch-row">
          <span class="switch-label">Show disabled chores</span>
          <ha-switch
            .checked=${!1!==this._config.show_disabled}
            @change=${this._showDisabledChanged}
          ></ha-switch>
        </div>

        <div class="switch-row">
          <span class="switch-label">Show completed todos</span>
          <ha-switch
            .checked=${!0===this._config.show_completed}
            @change=${this._showCompletedChanged}
          ></ha-switch>
        </div>

        <div class="switch-row">
          <span class="switch-label">Enable animations</span>
          <ha-switch
            .checked=${!1!==this._config.enable_animations}
            @change=${this._enableAnimationsChanged}
          ></ha-switch>
        </div>
      </div>
    `:F``}_titleChanged(e){const t=e.target;this._updateConfig({title:t.value})}_defaultModeChanged(e){const t=e.detail.value;t&&this._updateConfig({default_mode:t})}_showDisabledChanged(e){const t=e.target;this._updateConfig({show_disabled:t.checked})}_showCompletedChanged(e){const t=e.target;this._updateConfig({show_completed:t.checked})}_enableAnimationsChanged(e){const t=e.target;this._updateConfig({enable_animations:t.checked})}_updateConfig(e){this._config={...this._config,...e},this._fireConfigChanged()}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}};Ae.styles=r`
    .form-group {
      margin-bottom: 16px;
    }

    ha-textfield,
    ha-select {
      display: block;
      width: 100%;
    }

    .switches {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .switch-label {
      font-size: 1rem;
      color: var(--primary-text-color);
    }
  `,e([pe({attribute:!1})],Ae.prototype,"hass",void 0),e([me()],Ae.prototype,"_config",void 0),Ae=e([ce("chore-scheduler-card-editor")],Ae);const Se="chore_scheduler";let Ce=class extends ne{constructor(){super(...arguments),this._chores=[],this._todoItems=[],this._loading=!0,this._editingChore=null,this._showEditor=!1,this._mode="display"}setConfig(e){this._config={...e,title:e.title??"Chore Scheduler",show_disabled:e.show_disabled??!0,show_next_due:e.show_next_due??!0,default_mode:e.default_mode??"display",show_completed:e.show_completed??!1,enable_animations:e.enable_animations??!0},this._mode=this._config.default_mode||"display"}getCardSize(){return Math.max(3,("display"===this._mode?this._todoItems.length:this._chores.length)+1)}firstUpdated(e){super.firstUpdated(e),this._loadData()}updated(e){if(super.updated(e),e.has("hass")&&this.hass){e.get("hass")||this._loadData()}}async _loadData(){if(this.hass){this._loading=!0;try{const[e,t]=await Promise.all([this.hass.connection.sendMessagePromise({type:"chore_scheduler/list"}),this.hass.connection.sendMessagePromise({type:"chore_scheduler/todos"})]);this._chores=e?.chores??[],this._todoItems=t?.items??[]}catch(e){console.warn("[ChoreScheduler] Failed to load data:",e),this._chores=[],this._todoItems=[]}finally{this._loading=!1}}}render(){return this._config?F`
      <ha-card>
        <div class="card-header">
          <h1>${this._config.title}</h1>
          <div class="header-actions">
            ${"manage"===this._mode?F`
                  <button class="header-btn" @click=${this._addChore}>
                    <ha-icon icon="mdi:plus"></ha-icon>
                    ${ye("action.add",this.hass)}
                  </button>
                `:W}
            <button class="header-btn" @click=${this._toggleMode}>
              <ha-icon icon=${"display"===this._mode?"mdi:pencil":"mdi:eye"}></ha-icon>
              ${"display"===this._mode?ye("action.edit_chores",this.hass):ye("action.show_chores",this.hass)}
            </button>
          </div>
        </div>

        ${this._loading?F`
              <div class="loading">
                <ha-circular-progress indeterminate></ha-circular-progress>
              </div>
            `:"display"===this._mode?this._renderDisplayMode():this._renderManageMode()}
      </ha-card>

      ${this._showEditor?F`
            <chore-editor
              .hass=${this.hass}
              .chore=${this._editingChore}
              @chore-save=${this._handleChoreSave}
              @chore-delete=${this._handleChoreDelete}
              @editor-close=${this._closeEditor}
            ></chore-editor>
          `:W}
    `:W}_renderDisplayMode(){const e=this._todoItems.filter(e=>"needs_action"===e.status),t=this._todoItems.filter(e=>"completed"===e.status).sort((e,t)=>(t.completed_at??"").localeCompare(e.completed_at??"")).slice(0,3);if(0===e.length&&0===t.length)return F`
        <div class="empty-state">
          <ha-icon icon="mdi:check-circle-outline"></ha-icon>
          <p>${ye("display.empty_todos",this.hass)}</p>
        </div>
      `;const i=(new Date).toISOString().split("T")[0],o=e.filter(e=>e.due&&e.due<i),s=e.filter(e=>!e.due||e.due===i),a=e.filter(e=>e.due&&e.due>i);return 0===e.length&&t.length>0?F`
        <div class="all-done">
          <ha-icon icon="mdi:check-circle"></ha-icon>
          <p>${ye("display.all_done",this.hass)}</p>
        </div>
        ${this._config?.show_completed?this._renderSection(ye("display.done",this.hass),t,"completed"):W}
      `:F`
      ${o.length?this._renderSection(ye("display.overdue",this.hass),o,"overdue"):W}
      ${s.length?this._renderSection(ye("display.today",this.hass),s,"today"):W}
      ${a.length?this._renderSection(ye("display.upcoming",this.hass),a,"upcoming"):W}
      ${this._config?.show_completed&&t.length?this._renderSection(ye("display.done",this.hass),t,"completed"):W}
    `}_renderSection(e,t,i){return F`
      <div class="todo-section ${i}">
        <div class="section-header">${e}</div>
        <div class="todo-list">
          ${t.map(e=>this._renderTodoItem(e,i))}
        </div>
      </div>
    `}_renderTodoItem(e,t){const i=this._chores.find(t=>t.id===e.chore_id),o=xe(i?i.name:e.summary),s="completed"===e.status,a=this._extractAssignee(e.summary),r=e.completion_stats;return F`
      <div
        class="todo-item ${s?"completed":""} ${t}"
        id="todo-${e.uid}"
      >
        <ha-icon
          class="todo-checkbox"
          icon=${s?"mdi:checkbox-marked-circle":"mdi:checkbox-blank-circle-outline"}
          @click=${()=>!s&&this._handleComplete(e)}
        ></ha-icon>
        <ha-icon class="todo-icon" icon=${o}></ha-icon>
        <div class="todo-info">
          <span class="todo-summary">${e.summary}</span>
        </div>
        ${r&&r.streak>1?F`<span class="streak-badge" title=${ye("display.streak",this.hass,{count:r.streak})}>
              <ha-icon icon="mdi:fire"></ha-icon>${r.streak}
            </span>`:W}
        ${a?this._renderAvatar(a):W}
      </div>
    `}_extractAssignee(e){const t=e.match(/\(([^)]+)\)$/);return t?t[1]:null}_renderAvatar(e){const t=`person.${e.toLowerCase().replace(/\s+/g,"_")}`,i=this.hass?.states[t],o=i?.attributes?.entity_picture,s=e.charAt(0).toUpperCase();return F`
      <div class="assignee-avatar" title=${e}>
        ${o?F`<img src=${o} alt=${e} />`:F`<span>${s}</span>`}
      </div>
    `}async _handleComplete(e){const t=!1!==this._config?.enable_animations,i=this.shadowRoot?.querySelector(`#todo-${e.uid}`),o=i?.querySelector(".todo-checkbox");var s;t&&o&&(s=o,we()||(s.classList.add("completing"),s.addEventListener("animationend",()=>s.classList.remove("completing"),{once:!0})),we()||"vibrate"in navigator&&navigator.vibrate([50,30,80]));const a=this.hass.connection.sendMessagePromise({type:"chore_scheduler/complete_todo",uid:e.uid}).catch(e=>(console.error("[ChoreScheduler] Failed to complete todo:",e),"error"));t&&i&&await new Promise(e=>{setTimeout(()=>{i.classList.add("completing-item"),i.addEventListener("animationend",()=>e(),{once:!0}),setTimeout(e,500)},280)});"error"!==await a?(this._todoItems=this._todoItems.map(t=>t.uid===e.uid?{...t,status:"completed",completed_at:(new Date).toISOString()}:t),setTimeout(()=>this._loadData(),300)):await this._loadData()}_renderManageMode(){const e=this._config?.show_disabled?this._chores:this._chores.filter(e=>e.enabled);return 0===e.length?F`
        <div class="empty-state">
          <ha-icon icon="mdi:broom"></ha-icon>
          <p>${ye("card.empty_title",this.hass)}</p>
          <p>${ye("card.empty_subtitle",this.hass)}</p>
        </div>
      `:F`
      <div class="chore-list">
        ${e.map(e=>this._renderChoreItem(e))}
      </div>
    `}_renderChoreItem(e){const t=this._formatSchedule(e.schedule),i=xe(e.name),o=this._getAssigneeNames(e),s=this._getChoreStats(e.id);return F`
      <div
        class="chore-item ${e.enabled?"":"disabled"}"
        @click=${()=>this._editChore(e)}
      >
        <ha-icon class="chore-icon" icon=${i}></ha-icon>
        <div class="chore-info">
          <div class="chore-name">${e.name}</div>
          <div class="chore-meta">
            <span class="schedule-pill ${e.schedule.type}">${t}</span>
            ${o.length?o.map(e=>F`${this._renderAvatar(e)}`):W}
            ${s&&s.streak>1?F`<span class="streak-badge">
                  <ha-icon icon="mdi:fire"></ha-icon>${s.streak}
                </span>`:W}
          </div>
        </div>
        <div class="chore-actions">
          <ha-icon-button @click=${t=>this._triggerChore(t,e)}>
            <ha-icon icon="mdi:play"></ha-icon>
          </ha-icon-button>
        </div>
      </div>
    `}_getAssigneeNames(e){return"unassigned"!==e.assignment.mode&&e.assignment.assignees?.length?e.assignment.assignees.filter(e=>null!=e).map(e=>e.split(".").pop()?.replace(/_/g," ")||e):[]}_getChoreStats(e){const t=this._todoItems.find(t=>t.chore_id===e);return t?.completion_stats}_formatSchedule(e){const t=e.time||"10:00";switch(e.type){case"once":{const i=e.date;if(i){return`${new Date(i+"T00:00:00").toLocaleDateString(this.hass?.language||"en",{month:"short",day:"numeric"})} ${t}`}return ye("display.at_time",this.hass,{time:t})}case"daily":return ye("display.daily_at",this.hass,{time:t});case"weekly":{const i=(e.days||["sunday"]).map(e=>fe(e,this.hass)).join(", ");return`${i} ${t}`}case"monthly":return ye("display.monthly_at",this.hass,{day:e.day_of_month||1,time:t});default:return ye("display.at_time",this.hass,{time:t})}}_toggleMode(){this._mode="display"===this._mode?"manage":"display"}_addChore(){this._editingChore=null,this._showEditor=!0}_editChore(e){this._editingChore=e,this._showEditor=!0}_closeEditor(){this._showEditor=!1,this._editingChore=null}async _triggerChore(e,t){e.stopPropagation();try{await this.hass.callService(Se,"trigger_chore",{chore_id:t.id}),setTimeout(()=>this._loadData(),500)}catch(e){console.error("Error triggering chore:",e)}}async _handleChoreSave(e){const{chore:t,isNew:i}=e.detail;try{i?await this.hass.callService(Se,"add_chore",t):await this.hass.callService(Se,"update_chore",{chore_id:t.id,...t}),this._closeEditor(),await this._loadData()}catch(e){console.error("[ChoreScheduler] Error saving chore:",e),alert(`Failed to save chore: ${e instanceof Error?e.message:String(e)}`)}}async _handleChoreDelete(e){const{choreId:t}=e.detail;try{await this.hass.callService(Se,"delete_chore",{chore_id:t}),this._closeEditor(),setTimeout(()=>this._loadData(),500)}catch(e){console.error("Error deleting chore:",e)}}static getConfigElement(){return document.createElement("chore-scheduler-card-editor")}static getStubConfig(){return{title:"Chore Scheduler",show_disabled:!0,show_next_due:!0,default_mode:"display",show_completed:!1,enable_animations:!0}}};Ce.styles=ue,e([pe({attribute:!1})],Ce.prototype,"hass",void 0),e([me()],Ce.prototype,"_config",void 0),e([me()],Ce.prototype,"_chores",void 0),e([me()],Ce.prototype,"_todoItems",void 0),e([me()],Ce.prototype,"_loading",void 0),e([me()],Ce.prototype,"_editingChore",void 0),e([me()],Ce.prototype,"_showEditor",void 0),e([me()],Ce.prototype,"_mode",void 0),Ce=e([ce("chore-scheduler-card")],Ce),window.customCards=window.customCards||[],window.customCards.push({type:"chore-scheduler-card",name:"Chore Scheduler Card",description:"A card for managing household chore schedules",preview:!0});export{Ce as ChoreSchedulerCard};
