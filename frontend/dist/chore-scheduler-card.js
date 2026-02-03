function e(e,t,i,s){var o,r=arguments.length,a=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,s);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(a=(r<3?o(a):r>3?o(t,i,a):o(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(i,e,s)},n=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:d,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,u=globalThis,g=u.trustedTypes,y=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,_=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!d(e,t),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const r=s?.call(this);o?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const r=o.fromAttribute(t,e.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(void 0!==e){const r=this.constructor;if(!1===s&&(o=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??b)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==o||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,f?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=e=>e,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+E,D=`<${T}>`,M=document,P=()=>M.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,z="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,R=/>/g,H=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,L=/"/g,F=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,K=M.createTreeWalker(M,129);function J(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Z=(e,t)=>{const i=e.length-1,s=[];let o,r=2===t?"<svg>":3===t?"<math>":"",a=U;for(let t=0;t<i;t++){const i=e[t];let n,d,c=-1,l=0;for(;l<i.length&&(a.lastIndex=l,d=a.exec(i),null!==d);)l=a.lastIndex,a===U?"!--"===d[1]?a=j:void 0!==d[1]?a=R:void 0!==d[2]?(F.test(d[2])&&(o=RegExp("</"+d[2],"g")),a=H):void 0!==d[3]&&(a=H):a===H?">"===d[0]?(a=o??U,c=-1):void 0===d[1]?c=-2:(c=a.lastIndex-d[2].length,n=d[1],a=void 0===d[3]?H:'"'===d[3]?L:I):a===L||a===I?a=H:a===j||a===R?a=U:(a=H,o=void 0);const h=a===H&&e[t+1].startsWith("/>")?" ":"";r+=a===U?i+D:c>=0?(s.push(n),i.slice(0,c)+C+i.slice(c)+E+h):i+E+(-2===c?t:h)}return[J(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class G{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const a=e.length-1,n=this.parts,[d,c]=Z(e,t);if(this.el=G.createElement(d,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=K.nextNode())&&n.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(C)){const t=c[r++],i=s.getAttribute(e).split(E),a=/([.?@])?(.*)/.exec(t);n.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?te:"?"===a[1]?ie:"@"===a[1]?se:ee}),s.removeAttribute(e)}else e.startsWith(E)&&(n.push({type:6,index:o}),s.removeAttribute(e));if(F.test(s.tagName)){const e=s.textContent.split(E),t=e.length-1;if(t>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],P()),K.nextNode(),n.push({type:2,index:++o});s.append(e[t],P())}}}else if(8===s.nodeType)if(s.data===T)n.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(E,e+1));)n.push({type:7,index:o}),e+=E.length-1}o++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,s){if(t===B)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=O(t)?void 0:t._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=Q(e,o._$AS(e,t.values),o,s)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??M).importNode(t,!0);K.currentNode=s;let o=K.nextNode(),r=0,a=0,n=i[0];for(;void 0!==n;){if(r===n.index){let t;2===n.type?t=new Y(o,o.nextSibling,this,e):1===n.type?t=new n.ctor(o,n.name,n.strings,this,e):6===n.type&&(t=new oe(o,this,e)),this._$AV.push(t),n=i[++a]}r!==n?.index&&(o=K.nextNode(),r++)}return K.currentNode=M,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),O(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=G.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new X(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new G(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new Y(this.O(P()),this.O(P()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,s){const o=this.strings;let r=!1;if(void 0===o)e=Q(this,e,t,0),r=!O(e)||e!==this._$AH&&e!==B,r&&(this._$AH=e);else{const s=e;let a,n;for(e=o[0],a=0;a<o.length-1;a++)n=Q(this,s[i+a],t,a),n===B&&(n=this._$AH[a]),r||=!O(n)||n!==this._$AH[a],n===W?e=W:e!==W&&(e+=(n??"")+o[a+1]),this._$AH[a]=n}r&&!s&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class se extends ee{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??W)===B)return;const i=this._$AH,s=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const re=w.litHtmlPolyfillSupport;re?.(G,Y),(w.litHtmlVersions??=[]).push("3.3.2");const ae=globalThis;class ne extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new Y(t.insertBefore(P(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ne._$litElement$=!0,ne.finalized=!0,ae.litElementHydrateSupport?.({LitElement:ne});const de=ae.litElementPolyfillSupport;de?.({LitElement:ne}),(ae.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},le={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},he=(e=le,t,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,o,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];t.call(this,i),this.requestUpdate(s,o,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pe(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function me(e){return pe({...e,state:!0,attribute:!1})}const ue=a`
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
    font-size: 1.5rem;
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
    font-size: 0.8rem;
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
    font-size: 0.7rem;
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
    font-size: 0.65rem;
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
    font-size: 0.7rem;
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
    font-size: 0.7rem;
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
    font-size: 0.9rem;
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
    50% { transform: scale(1.4); }
    100% { transform: scale(1); }
  }

  .todo-checkbox.completing {
    animation: checkmark-pop 0.3s ease-out;
    color: var(--success-color, #4caf50);
  }

  @keyframes fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  /* ── All Done Celebration ────────────────────────────── */

  .all-done {
    text-align: center;
    padding: 32px 16px;
    animation: fade-in 0.3s ease-out;
  }

  .all-done ha-icon {
    --mdc-icon-size: 48px;
    color: var(--success-color, #4caf50);
    margin-bottom: 12px;
  }

  .all-done p {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
  }

  /* ── Empty State ─────────────────────────────────────── */

  .empty-state {
    text-align: center;
    padding: 32px 16px;
    color: var(--secondary-text-color);
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
    .todo-checkbox.completing {
      animation: none;
    }
    .all-done {
      animation: none;
    }
  }
`;a`
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
    font-size: 0.875rem;
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
`,a`
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
`;const ge={en:{"card.title":"Chore scheduler","card.empty_title":"No chores configured yet.","card.empty_subtitle":"Click the + button to add your first chore.","editor.add_title":"Add chore","editor.edit_title":"Edit chore","editor.name":"Name","editor.description":"Description (optional)","editor.enabled":"Enabled","editor.save":"Save","editor.add":"Add","editor.cancel":"Cancel","editor.delete":"Delete","editor.delete_confirm":"Are you sure you want to delete this chore?","schedule.title":"Schedule","schedule.frequency":"Frequency","schedule.once":"Once","schedule.daily":"Daily","schedule.weekly":"Weekly","schedule.monthly":"Monthly","schedule.days":"Days","schedule.day_of_month":"Day of month","schedule.time":"Time","weekday.monday":"Mon","weekday.tuesday":"Tue","weekday.wednesday":"Wed","weekday.thursday":"Thu","weekday.friday":"Fri","weekday.saturday":"Sat","weekday.sunday":"Sun","assignment.title":"Assignment","assignment.mode":"Mode","assignment.unassigned":"Unassigned","assignment.fixed":"Fixed","assignment.rotating":"Rotating","assignment.assignees":"Assignees","assignment.add_assignee":"Add assignee","assignment.rotating_current":"Rotating (current: {name})","assignment.assigned_to":"Assigned to: {names}","target.title":"Target","target.todo_list":"Todo list","target.default":"Default","notifications.title":"Notifications","notifications.send":"Send notifications","notifications.targets":"Notify targets","notifications.add_target":"Add target","display.daily_at":"Daily at {time}","display.monthly_at":"Monthly on day {day} at {time}","display.at_time":"At {time}","action.edit_chores":"Edit chores","action.show_chores":"Show chores","action.add":"Add","mode.display":"View","mode.manage":"Manage","display.overdue":"Overdue","display.today":"Today","display.upcoming":"Upcoming","display.done":"Done","display.all_done":"All chores done!","display.no_pending":"No pending chores","display.empty_todos":"No chores scheduled yet.","display.streak":"{count} day streak"},sv:{"card.title":"Sysslor","card.empty_title":"Inga sysslor konfigurerade ännu.","card.empty_subtitle":"Klicka på + för att lägga till din första syssla.","editor.add_title":"Lägg till syssla","editor.edit_title":"Redigera syssla","editor.name":"Namn","editor.description":"Beskrivning (valfritt)","editor.enabled":"Aktiverad","editor.save":"Spara","editor.add":"Lägg till","editor.cancel":"Avbryt","editor.delete":"Ta bort","editor.delete_confirm":"Är du säker på att du vill ta bort denna syssla?","schedule.title":"Schema","schedule.frequency":"Frekvens","schedule.once":"En gång","schedule.daily":"Dagligen","schedule.weekly":"Veckovis","schedule.monthly":"Månadsvis","schedule.days":"Dagar","schedule.day_of_month":"Dag i månaden","schedule.time":"Tid","weekday.monday":"Mån","weekday.tuesday":"Tis","weekday.wednesday":"Ons","weekday.thursday":"Tor","weekday.friday":"Fre","weekday.saturday":"Lör","weekday.sunday":"Sön","assignment.title":"Tilldelning","assignment.mode":"Läge","assignment.unassigned":"Ej tilldelad","assignment.fixed":"Fast","assignment.rotating":"Roterande","assignment.assignees":"Tilldelade","assignment.add_assignee":"Lägg till person","assignment.rotating_current":"Roterande (nuvarande: {name})","assignment.assigned_to":"Tilldelad: {names}","target.title":"Mål","target.todo_list":"Att-göra-lista","target.default":"Standard","notifications.title":"Notifieringar","notifications.send":"Skicka notifieringar","notifications.targets":"Notifieringsmål","notifications.add_target":"Lägg till mål","display.daily_at":"Dagligen kl {time}","display.monthly_at":"Månadsvis dag {day} kl {time}","display.at_time":"Kl {time}","action.edit_chores":"Ändra sysslor","action.show_chores":"Visa sysslor","action.add":"Lägg till","mode.display":"Visa","mode.manage":"Hantera","display.overdue":"Försenade","display.today":"Idag","display.upcoming":"Kommande","display.done":"Klart","display.all_done":"Alla sysslor klara!","display.no_pending":"Inga väntande sysslor","display.empty_todos":"Inga sysslor schemalagda ännu.","display.streak":"{count} dagars svit"}};function ye(e,t,i){let s=(ge[t?.language||"en"]||ge.en)[e]||ge.en[e]||e;return i&&Object.entries(i).forEach(([e,t])=>{s=s.replace(`{${e}}`,String(t))}),s}function fe(e,t){return ye(`weekday.${e}`,t)}const _e=[{keywords:["vacuum","dammsug","dammsu"],icon:"mdi:vacuum"},{keywords:["mop","mopp","skur"],icon:"mdi:creation"},{keywords:["dust","damm","torka av"],icon:"mdi:spray"},{keywords:["clean","städ","rengör","putsa"],icon:"mdi:spray-bottle"},{keywords:["wipe","torka"],icon:"mdi:spray"},{keywords:["scrub","skrubba"],icon:"mdi:brush"},{keywords:["sweep","sopa","broom","kvast"],icon:"mdi:broom"},{keywords:["dish","disk","tallrik"],icon:"mdi:dishwasher"},{keywords:["cook","laga mat","matlagning"],icon:"mdi:pot-steam"},{keywords:["grocer","handla","shop","inköp","inkop","affär"],icon:"mdi:cart"},{keywords:["trash","garbage","sopor","soptunna","avfall","kasta"],icon:"mdi:trash-can"},{keywords:["recycl","återvinn","atervinn","sorter"],icon:"mdi:recycle"},{keywords:["compost","kompost"],icon:"mdi:leaf"},{keywords:["laundry","tvätt","tvatt"],icon:"mdi:washing-machine"},{keywords:["wash","tvätta","tvatta"],icon:"mdi:washing-machine"},{keywords:["iron","stryk","stryka"],icon:"mdi:tshirt-crew"},{keywords:["fold","vik","vika"],icon:"mdi:tshirt-crew"},{keywords:["lawn","gräsmatta","grasmatta","mow","klipp gräs","gräsklipp"],icon:"mdi:mower-bag"},{keywords:["garden","trädgård","tradgard","odla"],icon:"mdi:flower"},{keywords:["plant","växt","vaxt","blomm"],icon:"mdi:flower"},{keywords:["water","vattna"],icon:"mdi:watering-can"},{keywords:["snow","snö","sno","skotta"],icon:"mdi:snowflake"},{keywords:["rake","kratta","löv","lov"],icon:"mdi:leaf"},{keywords:["dog","hund"],icon:"mdi:dog"},{keywords:["cat","katt"],icon:"mdi:cat"},{keywords:["pet","husdjur","djur"],icon:"mdi:paw"},{keywords:["feed","mata","foder"],icon:"mdi:food-drumstick"},{keywords:["walk","promen","rast"],icon:"mdi:walk"},{keywords:["litter","kattlåd","kattlad","kattsan"],icon:"mdi:cat"},{keywords:["bed","säng","sang","bädd"],icon:"mdi:bed"},{keywords:["bathroom","badrum","toalett","toilet","wc"],icon:"mdi:toilet"},{keywords:["shower","dusch"],icon:"mdi:shower"},{keywords:["window","fönster","fonster"],icon:"mdi:window-open"},{keywords:["floor","golv"],icon:"mdi:floor-plan"},{keywords:["mail","post","brev"],icon:"mdi:mailbox"},{keywords:["bill","räkning","rakning","faktur"],icon:"mdi:receipt-text"},{keywords:["pay","betal"],icon:"mdi:credit-card"},{keywords:["medic","medicin","läkemedel"],icon:"mdi:pill"},{keywords:["vitamin"],icon:"mdi:pill"},{keywords:["exercis","workout","träna","trana","motion"],icon:"mdi:dumbbell"}];function ve(e){return e.toLowerCase().replace(/å/g,"a").replace(/ä/g,"a").replace(/ö/g,"o")}function be(e,t){const i=e.indexOf(t);return-1!==i&&(0===i||/[\s\-_,;:(\/]/.test(e[i-1]))}function xe(e){const t=ve(e),i=e.toLowerCase();for(const e of _e)for(const s of e.keywords){const o=ve(s);if(be(t,o))return e.icon;if(s!==o&&be(i,s))return e.icon}return"mdi:checkbox-marked-circle-outline"}const $e=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;const we=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];let ke=class extends ne{constructor(){super(...arguments),this.chore=null,this._name="",this._description="",this._scheduleType="weekly",this._scheduleDays=["sunday"],this._scheduleTime="10:00",this._scheduleDayOfMonth=1,this._scheduleDate="",this._selectedAssignee=null,this._notificationsEnabled=!1,this._notifyTargets=[],this._persistentNotification=!1}firstUpdated(e){super.firstUpdated(e),this._initializeFromChore()}updated(e){super.updated(e),e.has("chore")&&this._initializeFromChore()}_initializeFromChore(){if(this.chore){this._name=this.chore.name,this._description=this.chore.description||"",this._scheduleType=this.chore.schedule.type,this._scheduleDays=this.chore.schedule.days||["sunday"],this._scheduleTime=this.chore.schedule.time||"10:00",this._scheduleDayOfMonth=this.chore.schedule.day_of_month||1,this._scheduleDate=this.chore.schedule.date||this._getTodayDate();const e=this.chore.assignment;"unassigned"!==e.mode&&e.assignees?.length?this._selectedAssignee=e.assignees[0]:this._selectedAssignee=null,this._notificationsEnabled=this.chore.notifications.enabled,this._notifyTargets=[...this.chore.notifications.notify_targets||[]],this._persistentNotification=this._notifyTargets.includes("persistent_notification"),this._notifyTargets=this._notifyTargets.filter(e=>"persistent_notification"!==e)}else this._resetForm()}_resetForm(){this._name="",this._description="",this._scheduleType="weekly",this._scheduleDays=["sunday"],this._scheduleTime="10:00",this._scheduleDayOfMonth=1,this._scheduleDate=this._getTodayDate(),this._selectedAssignee=null,this._notificationsEnabled=!1,this._notifyTargets=[],this._persistentNotification=!1}_getTodayDate(){return(new Date).toISOString().split("T")[0]}render(){const e=!this.chore,t=this._getPersonEntities(),i=this._getMobileDevices();return q`
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

              ${this._notificationsEnabled?q`
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

                  ${i.length>0?q`
                    <div class="notify-targets">
                      <label class="form-label" style="margin-bottom: 6px;">Mobile devices</label>
                      ${i.map(e=>q`
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
            ${e?W:q`
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
    `}_setScheduleType(e){this._scheduleType=e}_renderScheduleExtra(){return"once"===this._scheduleType?q`
        <div class="schedule-extra">
          <label class="form-label">On date</label>
          <ha-textfield
            type="date"
            .value=${this._scheduleDate}
            @input=${e=>this._scheduleDate=e.target.value}
          ></ha-textfield>
        </div>
      `:"weekly"===this._scheduleType?q`
        <div class="schedule-extra">
          <label class="form-label">On days</label>
          <div class="day-grid">
            ${we.map(e=>q`
              <div
                class="day-chip ${this._scheduleDays.includes(e)?"selected":""}"
                @click=${()=>this._toggleDay(e)}
              >
                ${fe(e,this.hass)}
              </div>
            `)}
          </div>
        </div>
      `:"monthly"===this._scheduleType?q`
        <div class="schedule-extra">
          <ha-select
            .value=${String(this._scheduleDayOfMonth)}
            @selected=${this._handleDayOfMonthChange}
            @closed=${e=>e.stopPropagation()}
            label="On day"
            fixedMenuPosition
          >
            ${Array.from({length:31},(e,t)=>t+1).map(e=>q`
              <ha-list-item .value=${String(e)}>${this._formatOrdinal(e)}</ha-list-item>
            `)}
          </ha-select>
        </div>
      `:W}_formatOrdinal(e){const t=["th","st","nd","rd"],i=e%100;return e+(t[(i-20)%10]||t[i]||t[0])}_handleDayOfMonthChange(e){e.detail?.value&&(this._scheduleDayOfMonth=parseInt(e.detail.value)||1)}_renderPersonOption(e){const t=e.entity_id,i=(e.attributes.friendly_name||t.split(".")[1].replace(/_/g," ")).split(" ")[0],s=e.attributes.entity_picture,o=this._selectedAssignee===t;return q`
      <div
        class="person-option ${o?"selected":""}"
        @click=${()=>this._selectedAssignee=t}
      >
        <div class="person-avatar">
          ${s?q`<img src="${s}" alt="${i}" />`:q`<ha-icon icon="mdi:account"></ha-icon>`}
        </div>
        <span class="person-name">${i}</span>
      </div>
    `}_getPersonEntities(){return Object.values(this.hass.states).filter(e=>e.entity_id.startsWith("person."))}_getMobileDevices(){const e=this.hass.services.notify;return e?Object.keys(e).filter(e=>e.startsWith("mobile_app_")).map(e=>({service:`notify.${e}`,name:e.replace("mobile_app_","").replace(/_/g," ")})):[]}_toggleDay(e){this._scheduleDays.includes(e)?this._scheduleDays.length>1&&(this._scheduleDays=[...this._scheduleDays.filter(t=>t!==e)]):this._scheduleDays=[...this._scheduleDays,e]}_toggleNotifyTarget(e){this._notifyTargets.includes(e)?this._notifyTargets=[...this._notifyTargets.filter(t=>t!==e)]:this._notifyTargets=[...this._notifyTargets,e]}_handleOverlayClick(){this._handleCancel()}_handleCancel(){this.dispatchEvent(new CustomEvent("editor-close",{bubbles:!0,composed:!0}))}_handleSave(){const e={type:this._scheduleType,time:this._scheduleTime,interval:1};"once"===this._scheduleType?e.date=this._scheduleDate:"weekly"===this._scheduleType?e.days=this._scheduleDays:"monthly"===this._scheduleType&&(e.day_of_month=this._scheduleDayOfMonth);const t={mode:this._selectedAssignee?"fixed":"unassigned",assignees:this._selectedAssignee?[this._selectedAssignee]:[],current_index:0},i=[...this._notifyTargets];this._persistentNotification&&i.push("persistent_notification");const s={enabled:this._notificationsEnabled,remind_before:60,notify_targets:i},o={name:this._name.trim(),description:this._description.trim(),enabled:!0,schedule:e,assignment:t,notifications:s};this.chore&&(o.id=this.chore.id),this.dispatchEvent(new CustomEvent("chore-save",{detail:{chore:o,isNew:!this.chore},bubbles:!0,composed:!0}))}_handleDelete(){this.chore&&confirm(ye("editor.delete_confirm",this.hass))&&this.dispatchEvent(new CustomEvent("chore-delete",{detail:{choreId:this.chore.id},bubbles:!0,composed:!0}))}};ke.styles=a`
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
    }

    .dialog-header {
      padding: 16px 20px 12px;
      border-bottom: 1px solid var(--divider-color);
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 1.125rem;
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
      font-size: 0.7rem;
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
      font-size: 0.65rem;
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
      font-size: 0.75rem;
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
      font-size: 0.7rem;
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
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .optional-desc {
      font-size: 0.7rem;
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
      font-size: 0.8rem;
      color: var(--primary-text-color);
    }

    .notify-option-desc {
      font-size: 0.7rem;
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
      font-size: 0.875rem;
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
  `,e([pe({attribute:!1})],ke.prototype,"hass",void 0),e([pe({attribute:!1})],ke.prototype,"chore",void 0),e([me()],ke.prototype,"_name",void 0),e([me()],ke.prototype,"_description",void 0),e([me()],ke.prototype,"_scheduleType",void 0),e([me()],ke.prototype,"_scheduleDays",void 0),e([me()],ke.prototype,"_scheduleTime",void 0),e([me()],ke.prototype,"_scheduleDayOfMonth",void 0),e([me()],ke.prototype,"_scheduleDate",void 0),e([me()],ke.prototype,"_selectedAssignee",void 0),e([me()],ke.prototype,"_notificationsEnabled",void 0),e([me()],ke.prototype,"_notifyTargets",void 0),e([me()],ke.prototype,"_persistentNotification",void 0),ke=e([ce("chore-editor")],ke);let Ae=class extends ne{setConfig(e){this._config=e}render(){return this.hass&&this._config?q`
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
    `:q``}_titleChanged(e){const t=e.target;this._updateConfig({title:t.value})}_defaultModeChanged(e){const t=e.detail.value;t&&this._updateConfig({default_mode:t})}_showDisabledChanged(e){const t=e.target;this._updateConfig({show_disabled:t.checked})}_showCompletedChanged(e){const t=e.target;this._updateConfig({show_completed:t.checked})}_enableAnimationsChanged(e){const t=e.target;this._updateConfig({enable_animations:t.checked})}_updateConfig(e){this._config={...this._config,...e},this._fireConfigChanged()}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}};Ae.styles=a`
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
      font-size: 0.875rem;
      color: var(--primary-text-color);
    }
  `,e([pe({attribute:!1})],Ae.prototype,"hass",void 0),e([me()],Ae.prototype,"_config",void 0),Ae=e([ce("chore-scheduler-card-editor")],Ae);const Se="chore_scheduler";let Ce=class extends ne{constructor(){super(...arguments),this._chores=[],this._todoItems=[],this._loading=!0,this._editingChore=null,this._showEditor=!1,this._mode="display"}setConfig(e){this._config={...e,title:e.title??"Chore Scheduler",show_disabled:e.show_disabled??!0,show_next_due:e.show_next_due??!0,default_mode:e.default_mode??"display",show_completed:e.show_completed??!1,enable_animations:e.enable_animations??!0},this._mode=this._config.default_mode||"display"}getCardSize(){return Math.max(3,("display"===this._mode?this._todoItems.length:this._chores.length)+1)}firstUpdated(e){super.firstUpdated(e),this._loadData()}updated(e){if(super.updated(e),e.has("hass")&&this.hass){e.get("hass")||this._loadData()}}async _loadData(){if(this.hass){this._loading=!0;try{const[e,t]=await Promise.all([this.hass.connection.sendMessagePromise({type:"chore_scheduler/list"}),this.hass.connection.sendMessagePromise({type:"chore_scheduler/todos"})]);this._chores=e?.chores??[],this._todoItems=t?.items??[]}catch(e){console.warn("[ChoreScheduler] Failed to load data:",e),this._chores=[],this._todoItems=[]}finally{this._loading=!1}}}render(){return this._config?q`
      <ha-card>
        <div class="card-header">
          <h1>${this._config.title}</h1>
          <div class="header-actions">
            ${"manage"===this._mode?q`
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

        ${this._loading?q`
              <div class="loading">
                <ha-circular-progress indeterminate></ha-circular-progress>
              </div>
            `:"display"===this._mode?this._renderDisplayMode():this._renderManageMode()}
      </ha-card>

      ${this._showEditor?q`
            <chore-editor
              .hass=${this.hass}
              .chore=${this._editingChore}
              @chore-save=${this._handleChoreSave}
              @chore-delete=${this._handleChoreDelete}
              @editor-close=${this._closeEditor}
            ></chore-editor>
          `:W}
    `:W}_renderDisplayMode(){const e=this._todoItems.filter(e=>"needs_action"===e.status),t=this._todoItems.filter(e=>"completed"===e.status);if(0===e.length&&0===t.length)return q`
        <div class="empty-state">
          <ha-icon icon="mdi:check-circle-outline"></ha-icon>
          <p>${ye("display.empty_todos",this.hass)}</p>
        </div>
      `;const i=(new Date).toISOString().split("T")[0],s=e.filter(e=>e.due&&e.due<i),o=e.filter(e=>!e.due||e.due===i),r=e.filter(e=>e.due&&e.due>i);return 0===e.length&&t.length>0?q`
        <div class="all-done">
          <ha-icon icon="mdi:check-circle"></ha-icon>
          <p>${ye("display.all_done",this.hass)}</p>
        </div>
        ${this._config?.show_completed?this._renderSection(ye("display.done",this.hass),t,"completed"):W}
      `:q`
      ${s.length?this._renderSection(ye("display.overdue",this.hass),s,"overdue"):W}
      ${o.length?this._renderSection(ye("display.today",this.hass),o,"today"):W}
      ${r.length?this._renderSection(ye("display.upcoming",this.hass),r,"upcoming"):W}
      ${this._config?.show_completed&&t.length?this._renderSection(ye("display.done",this.hass),t,"completed"):W}
    `}_renderSection(e,t,i){return q`
      <div class="todo-section ${i}">
        <div class="section-header">${e}</div>
        <div class="todo-list">
          ${t.map(e=>this._renderTodoItem(e,i))}
        </div>
      </div>
    `}_renderTodoItem(e,t){const i=this._chores.find(t=>t.id===e.chore_id),s=xe(i?i.name:e.summary),o="completed"===e.status,r=this._extractAssignee(e.summary),a=e.completion_stats;return q`
      <div
        class="todo-item ${o?"completed":""} ${t}"
        id="todo-${e.uid}"
      >
        <ha-icon
          class="todo-checkbox"
          icon=${o?"mdi:checkbox-marked-circle":"mdi:checkbox-blank-circle-outline"}
          @click=${()=>!o&&this._handleComplete(e)}
        ></ha-icon>
        <ha-icon class="todo-icon" icon=${s}></ha-icon>
        <div class="todo-info">
          <span class="todo-summary">${e.summary}</span>
        </div>
        ${a&&a.streak>1?q`<span class="streak-badge" title=${ye("display.streak",this.hass,{count:a.streak})}>
              <ha-icon icon="mdi:fire"></ha-icon>${a.streak}
            </span>`:W}
        ${r?this._renderAvatar(r):W}
      </div>
    `}_extractAssignee(e){const t=e.match(/\(([^)]+)\)$/);return t?t[1]:null}_renderAvatar(e){const t=`person.${e.toLowerCase().replace(/\s+/g,"_")}`,i=this.hass?.states[t],s=i?.attributes?.entity_picture,o=e.charAt(0).toUpperCase();return q`
      <div class="assignee-avatar" title=${e}>
        ${s?q`<img src=${s} alt=${e} />`:q`<span>${o}</span>`}
      </div>
    `}async _handleComplete(e){if(this._todoItems=this._todoItems.map(t=>t.uid===e.uid?{...t,status:"completed",completed_at:(new Date).toISOString()}:t),!1!==this._config?.enable_animations){const i=this.shadowRoot?.querySelector(`#todo-${e.uid} .todo-checkbox`);i&&(t=i,$e()||(t.classList.add("completing"),t.addEventListener("animationend",()=>t.classList.remove("completing"),{once:!0}))),$e()||"vibrate"in navigator&&navigator.vibrate([50,30,80])}var t;try{await this.hass.connection.sendMessagePromise({type:"chore_scheduler/complete_todo",uid:e.uid})}catch(e){return console.error("[ChoreScheduler] Failed to complete todo:",e),void await this._loadData()}setTimeout(()=>this._loadData(),500)}_renderManageMode(){const e=this._config?.show_disabled?this._chores:this._chores.filter(e=>e.enabled);return 0===e.length?q`
        <div class="empty-state">
          <ha-icon icon="mdi:broom"></ha-icon>
          <p>${ye("card.empty_title",this.hass)}</p>
          <p>${ye("card.empty_subtitle",this.hass)}</p>
        </div>
      `:q`
      <div class="chore-list">
        ${e.map(e=>this._renderChoreItem(e))}
      </div>
    `}_renderChoreItem(e){const t=this._formatSchedule(e.schedule),i=xe(e.name),s=this._getAssigneeNames(e),o=this._getChoreStats(e.id);return q`
      <div
        class="chore-item ${e.enabled?"":"disabled"}"
        @click=${()=>this._editChore(e)}
      >
        <ha-icon class="chore-icon" icon=${i}></ha-icon>
        <div class="chore-info">
          <div class="chore-name">${e.name}</div>
          <div class="chore-meta">
            <span class="schedule-pill ${e.schedule.type}">${t}</span>
            ${s.length?s.map(e=>q`${this._renderAvatar(e)}`):W}
            ${o&&o.streak>1?q`<span class="streak-badge">
                  <ha-icon icon="mdi:fire"></ha-icon>${o.streak}
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
