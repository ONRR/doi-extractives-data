webpackJsonp([0x67ef26645b2a,60335399758886],{104:function(e,t){e.exports={data:{dataYaml:{data_retrieval:{name:"Data Retrieval",email:"onrrdatarequests@onrr.gov"},information_data_management:{name:"Information and Data Management",street:"1849 C Street NW MS 5134",city:"Washington, D.C.",zip:20240,email:"nrrd@onrr.gov"}},site:{siteMetadata:{title:"Natural Resources Revenue Data",description:"This site provides open data about natural resource management on federal lands and waters in the United States, including oil, gas, coal, and other extractive industries.",version:"v3.1.9"}}},layoutContext:{}}},208:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=n(2),i=a(o),l=n(215),u=a(l),c=n(104),s=a(c);t.default=function(e){return i.default.createElement(u.default,r({},e,s.default))},e.exports=t.default},301:function(e,t,n){function a(e){return null===e||void 0===e}function r(e){return!(!e||"object"!=typeof e||"number"!=typeof e.length)&&("function"==typeof e.copy&&"function"==typeof e.slice&&!(e.length>0&&"number"!=typeof e[0]))}function o(e,t,n){var o,s;if(a(e)||a(t))return!1;if(e.prototype!==t.prototype)return!1;if(u(e))return!!u(t)&&(e=i.call(e),t=i.call(t),c(e,t,n));if(r(e)){if(!r(t))return!1;if(e.length!==t.length)return!1;for(o=0;o<e.length;o++)if(e[o]!==t[o])return!1;return!0}try{var f=l(e),d=l(t)}catch(e){return!1}if(f.length!=d.length)return!1;for(f.sort(),d.sort(),o=f.length-1;o>=0;o--)if(f[o]!=d[o])return!1;for(o=f.length-1;o>=0;o--)if(s=f[o],!c(e[s],t[s],n))return!1;return typeof e==typeof t}var i=Array.prototype.slice,l=n(303),u=n(302),c=e.exports=function(e,t,n){return n||(n={}),e===t||(e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():!e||!t||"object"!=typeof e&&"object"!=typeof t?n.strict?e===t:e==t:o(e,t,n))}},302:function(e,t){function n(e){return"[object Arguments]"==Object.prototype.toString.call(e)}function a(e){return e&&"object"==typeof e&&"number"==typeof e.length&&Object.prototype.hasOwnProperty.call(e,"callee")&&!Object.prototype.propertyIsEnumerable.call(e,"callee")||!1}var r="[object Arguments]"==function(){return Object.prototype.toString.call(arguments)}();t=e.exports=r?n:a,t.supported=n,t.unsupported=a},303:function(e,t){function n(e){var t=[];for(var n in e)t.push(n);return t}t=e.exports="function"==typeof Object.keys?Object.keys:n,t.shim=n},310:function(e,t,n){var a;!function(){"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),o={canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:r&&!!window.screen};a=function(){return o}.call(t,n,t,e),!(void 0!==a&&(e.exports=a))}()},421:function(e,t,n){function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.Helmet=void 0;var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(2),f=a(s),d=n(7),p=a(d),T=n(449),m=a(T),E=n(301),h=a(E),A=n(422),_=n(184),y=function(e){var t,n;return n=t=function(t){function n(){return o(this,n),i(this,t.apply(this,arguments))}return l(n,t),n.prototype.shouldComponentUpdate=function(e){return!(0,h.default)(this.props,e)},n.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case _.TAG_NAMES.SCRIPT:case _.TAG_NAMES.NOSCRIPT:return{innerHTML:t};case _.TAG_NAMES.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},n.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,a=e.arrayTypeChildren,r=e.newChildProps,o=e.nestedChildren;return u({},a,(t={},t[n.type]=[].concat(a[n.type]||[],[u({},r,this.mapNestedChildrenToProps(n,o))]),t))},n.prototype.mapObjectTypeChildren=function(e){var t,n,a=e.child,r=e.newProps,o=e.newChildProps,i=e.nestedChildren;switch(a.type){case _.TAG_NAMES.TITLE:return u({},r,(t={},t[a.type]=i,t.titleAttributes=u({},o),t));case _.TAG_NAMES.BODY:return u({},r,{bodyAttributes:u({},o)});case _.TAG_NAMES.HTML:return u({},r,{htmlAttributes:u({},o)})}return u({},r,(n={},n[a.type]=u({},o),n))},n.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=u({},t);return Object.keys(e).forEach(function(t){var a;n=u({},n,(a={},a[t]=e[t],a))}),n},n.prototype.warnOnInvalidChildren=function(e,t){return!0},n.prototype.mapChildrenToProps=function(e,t){var n=this,a={};return f.default.Children.forEach(e,function(e){if(e&&e.props){var o=e.props,i=o.children,l=r(o,["children"]),u=(0,A.convertReactPropstoHtmlAttributes)(l);switch(n.warnOnInvalidChildren(e,i),e.type){case _.TAG_NAMES.LINK:case _.TAG_NAMES.META:case _.TAG_NAMES.NOSCRIPT:case _.TAG_NAMES.SCRIPT:case _.TAG_NAMES.STYLE:a=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:a,newChildProps:u,nestedChildren:i});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:u,nestedChildren:i})}}}),t=this.mapArrayTypeChildrenToProps(a,t)},n.prototype.render=function(){var t=this.props,n=t.children,a=r(t,["children"]),o=u({},a);return n&&(o=this.mapChildrenToProps(n,o)),f.default.createElement(e,o)},c(n,null,[{key:"canUseDOM",set:function(t){e.canUseDOM=t}}]),n}(f.default.Component),t.propTypes={base:p.default.object,bodyAttributes:p.default.object,children:p.default.oneOfType([p.default.arrayOf(p.default.node),p.default.node]),defaultTitle:p.default.string,defer:p.default.bool,encodeSpecialCharacters:p.default.bool,htmlAttributes:p.default.object,link:p.default.arrayOf(p.default.object),meta:p.default.arrayOf(p.default.object),noscript:p.default.arrayOf(p.default.object),onChangeClientState:p.default.func,script:p.default.arrayOf(p.default.object),style:p.default.arrayOf(p.default.object),title:p.default.string,titleAttributes:p.default.object,titleTemplate:p.default.string},t.defaultProps={defer:!0,encodeSpecialCharacters:!0},t.peek=e.peek,t.rewind=function(){var t=e.rewind();return t||(t=(0,A.mapStateOnServer)({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},n},b=function(){return null},v=(0,m.default)(A.reducePropsToState,A.handleClientStateChange,A.mapStateOnServer)(b),S=y(v);S.renderStatic=S.rewind,t.Helmet=S,t.default=S},184:function(e,t){t.__esModule=!0;var n=(t.ATTRIBUTE_NAMES={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"},t.TAG_NAMES={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"}),a=(t.VALID_TAG_NAMES=Object.keys(n).map(function(e){return n[e]}),t.TAG_PROPERTIES={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src"},t.REACT_TAG_MAP={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"});t.HELMET_PROPS={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},t.HTML_TAG_MAP=Object.keys(a).reduce(function(e,t){return e[a[t]]=t,e},{}),t.SELF_CLOSING_TAGS=[n.NOSCRIPT,n.SCRIPT,n.STYLE],t.HELMET_ATTRIBUTE="data-react-helmet"},422:function(e,t,n){(function(e){function a(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.warn=t.requestAnimationFrame=t.reducePropsToState=t.mapStateOnServer=t.handleClientStateChange=t.convertReactPropstoHtmlAttributes=void 0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i=n(2),l=a(i),u=n(5),c=a(u),s=n(184),f=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},d=function(e){var t=h(e,s.TAG_NAMES.TITLE),n=h(e,s.HELMET_PROPS.TITLE_TEMPLATE);if(n&&t)return n.replace(/%s/g,function(){return t});var a=h(e,s.HELMET_PROPS.DEFAULT_TITLE);return t||a||void 0},p=function(e){return h(e,s.HELMET_PROPS.ON_CHANGE_CLIENT_STATE)||function(){}},T=function(e,t){return t.filter(function(t){return"undefined"!=typeof t[e]}).map(function(t){return t[e]}).reduce(function(e,t){return o({},e,t)},{})},m=function(e,t){return t.filter(function(e){return"undefined"!=typeof e[s.TAG_NAMES.BASE]}).map(function(e){return e[s.TAG_NAMES.BASE]}).reverse().reduce(function(t,n){if(!t.length)for(var a=Object.keys(n),r=0;r<a.length;r++){var o=a[r],i=o.toLowerCase();if(e.indexOf(i)!==-1&&n[i])return t.concat(n)}return t},[])},E=function(e,t,n){var a={};return n.filter(function(t){return!!Array.isArray(t[e])||("undefined"!=typeof t[e]&&S("Helmet: "+e+' should be of type "Array". Instead found type "'+r(t[e])+'"'),!1)}).map(function(t){return t[e]}).reverse().reduce(function(e,n){var r={};n.filter(function(e){for(var n=void 0,o=Object.keys(e),i=0;i<o.length;i++){var l=o[i],u=l.toLowerCase();t.indexOf(u)===-1||n===s.TAG_PROPERTIES.REL&&"canonical"===e[n].toLowerCase()||u===s.TAG_PROPERTIES.REL&&"stylesheet"===e[u].toLowerCase()||(n=u),t.indexOf(l)===-1||l!==s.TAG_PROPERTIES.INNER_HTML&&l!==s.TAG_PROPERTIES.CSS_TEXT&&l!==s.TAG_PROPERTIES.ITEM_PROP||(n=l)}if(!n||!e[n])return!1;var c=e[n].toLowerCase();return a[n]||(a[n]={}),r[n]||(r[n]={}),!a[n][c]&&(r[n][c]=!0,!0)}).reverse().forEach(function(t){return e.push(t)});for(var o=Object.keys(r),i=0;i<o.length;i++){var l=o[i],u=(0,c.default)({},a[l],r[l]);a[l]=u}return e},[]).reverse()},h=function(e,t){for(var n=e.length-1;n>=0;n--){var a=e[n];if(a.hasOwnProperty(t))return a[t]}return null},A=function(e){return{baseTag:m([s.TAG_PROPERTIES.HREF],e),bodyAttributes:T(s.ATTRIBUTE_NAMES.BODY,e),defer:h(e,s.HELMET_PROPS.DEFER),encode:h(e,s.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:T(s.ATTRIBUTE_NAMES.HTML,e),linkTags:E(s.TAG_NAMES.LINK,[s.TAG_PROPERTIES.REL,s.TAG_PROPERTIES.HREF],e),metaTags:E(s.TAG_NAMES.META,[s.TAG_PROPERTIES.NAME,s.TAG_PROPERTIES.CHARSET,s.TAG_PROPERTIES.HTTPEQUIV,s.TAG_PROPERTIES.PROPERTY,s.TAG_PROPERTIES.ITEM_PROP],e),noscriptTags:E(s.TAG_NAMES.NOSCRIPT,[s.TAG_PROPERTIES.INNER_HTML],e),onChangeClientState:p(e),scriptTags:E(s.TAG_NAMES.SCRIPT,[s.TAG_PROPERTIES.SRC,s.TAG_PROPERTIES.INNER_HTML],e),styleTags:E(s.TAG_NAMES.STYLE,[s.TAG_PROPERTIES.CSS_TEXT],e),title:d(e),titleAttributes:T(s.ATTRIBUTE_NAMES.TITLE,e)}},_=function(){var e=Date.now();return function(t){var n=Date.now();n-e>16?(e=n,t(n)):setTimeout(function(){_(t)},0)}}(),y=function(e){return clearTimeout(e)},b="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||_:e.requestAnimationFrame||_,v="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||y:e.cancelAnimationFrame||y,S=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},g=null,N=function(e){g&&v(g),e.defer?g=b(function(){R(e,function(){g=null})}):(R(e),g=null)},R=function(e,t){var n=e.baseTag,a=e.bodyAttributes,r=e.htmlAttributes,o=e.linkTags,i=e.metaTags,l=e.noscriptTags,u=e.onChangeClientState,c=e.scriptTags,f=e.styleTags,d=e.title,p=e.titleAttributes;P(s.TAG_NAMES.BODY,a),P(s.TAG_NAMES.HTML,r),O(d,p);var T={baseTag:w(s.TAG_NAMES.BASE,n),linkTags:w(s.TAG_NAMES.LINK,o),metaTags:w(s.TAG_NAMES.META,i),noscriptTags:w(s.TAG_NAMES.NOSCRIPT,l),scriptTags:w(s.TAG_NAMES.SCRIPT,c),styleTags:w(s.TAG_NAMES.STYLE,f)},m={},E={};Object.keys(T).forEach(function(e){var t=T[e],n=t.newTags,a=t.oldTags;n.length&&(m[e]=n),a.length&&(E[e]=T[e].oldTags)}),t&&t(),u(e,m,E)},M=function(e){return Array.isArray(e)?e.join(""):e},O=function(e,t){"undefined"!=typeof e&&document.title!==e&&(document.title=M(e)),P(s.TAG_NAMES.TITLE,t)},P=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var a=n.getAttribute(s.HELMET_ATTRIBUTE),r=a?a.split(","):[],o=[].concat(r),i=Object.keys(t),l=0;l<i.length;l++){var u=i[l],c=t[u]||"";n.getAttribute(u)!==c&&n.setAttribute(u,c),r.indexOf(u)===-1&&r.push(u);var f=o.indexOf(u);f!==-1&&o.splice(f,1)}for(var d=o.length-1;d>=0;d--)n.removeAttribute(o[d]);r.length===o.length?n.removeAttribute(s.HELMET_ATTRIBUTE):n.getAttribute(s.HELMET_ATTRIBUTE)!==i.join(",")&&n.setAttribute(s.HELMET_ATTRIBUTE,i.join(","))}},w=function(e,t){var n=document.head||document.querySelector(s.TAG_NAMES.HEAD),a=n.querySelectorAll(e+"["+s.HELMET_ATTRIBUTE+"]"),r=Array.prototype.slice.call(a),o=[],i=void 0;return t&&t.length&&t.forEach(function(t){var n=document.createElement(e);for(var a in t)if(t.hasOwnProperty(a))if(a===s.TAG_PROPERTIES.INNER_HTML)n.innerHTML=t.innerHTML;else if(a===s.TAG_PROPERTIES.CSS_TEXT)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var l="undefined"==typeof t[a]?"":t[a];n.setAttribute(a,l)}n.setAttribute(s.HELMET_ATTRIBUTE,"true"),r.some(function(e,t){return i=t,n.isEqualNode(e)})?r.splice(i,1):o.push(n)}),r.forEach(function(e){return e.parentNode.removeChild(e)}),o.forEach(function(e){return n.appendChild(e)}),{oldTags:r,newTags:o}},I=function(e){return Object.keys(e).reduce(function(t,n){var a="undefined"!=typeof e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+a:a},"")},C=function(e,t,n,a){var r=I(n),o=M(t);return r?"<"+e+" "+s.HELMET_ATTRIBUTE+'="true" '+r+">"+f(o,a)+"</"+e+">":"<"+e+" "+s.HELMET_ATTRIBUTE+'="true">'+f(o,a)+"</"+e+">"},L=function(e,t,n){return t.reduce(function(t,a){var r=Object.keys(a).filter(function(e){return!(e===s.TAG_PROPERTIES.INNER_HTML||e===s.TAG_PROPERTIES.CSS_TEXT)}).reduce(function(e,t){var r="undefined"==typeof a[t]?t:t+'="'+f(a[t],n)+'"';return e?e+" "+r:r},""),o=a.innerHTML||a.cssText||"",i=s.SELF_CLOSING_TAGS.indexOf(e)===-1;return t+"<"+e+" "+s.HELMET_ATTRIBUTE+'="true" '+r+(i?"/>":">"+o+"</"+e+">")},"")},G=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[s.REACT_TAG_MAP[n]||n]=e[n],t},t)},H=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[s.HTML_TAG_MAP[n]||n]=e[n],t},t)},j=function(e,t,n){var a,r=(a={key:t},a[s.HELMET_ATTRIBUTE]=!0,a),o=G(n,r);return[l.default.createElement(s.TAG_NAMES.TITLE,o,t)]},k=function(e,t){return t.map(function(t,n){var a,r=(a={key:n},a[s.HELMET_ATTRIBUTE]=!0,a);return Object.keys(t).forEach(function(e){var n=s.REACT_TAG_MAP[e]||e;if(n===s.TAG_PROPERTIES.INNER_HTML||n===s.TAG_PROPERTIES.CSS_TEXT){var a=t.innerHTML||t.cssText;r.dangerouslySetInnerHTML={__html:a}}else r[n]=t[e]}),l.default.createElement(e,r)})},x=function(e,t,n){switch(e){case s.TAG_NAMES.TITLE:return{toComponent:function(){return j(e,t.title,t.titleAttributes,n)},toString:function(){return C(e,t.title,t.titleAttributes,n)}};case s.ATTRIBUTE_NAMES.BODY:case s.ATTRIBUTE_NAMES.HTML:return{toComponent:function(){return G(t)},toString:function(){return I(t)}};default:return{toComponent:function(){return k(e,t)},toString:function(){return L(e,t,n)}}}},U=function(e){var t=e.baseTag,n=e.bodyAttributes,a=e.encode,r=e.htmlAttributes,o=e.linkTags,i=e.metaTags,l=e.noscriptTags,u=e.scriptTags,c=e.styleTags,f=e.title,d=void 0===f?"":f,p=e.titleAttributes;return{base:x(s.TAG_NAMES.BASE,t,a),bodyAttributes:x(s.ATTRIBUTE_NAMES.BODY,n,a),htmlAttributes:x(s.ATTRIBUTE_NAMES.HTML,r,a),link:x(s.TAG_NAMES.LINK,o,a),meta:x(s.TAG_NAMES.META,i,a),noscript:x(s.TAG_NAMES.NOSCRIPT,l,a),script:x(s.TAG_NAMES.SCRIPT,u,a),style:x(s.TAG_NAMES.STYLE,c,a),title:x(s.TAG_NAMES.TITLE,{title:d,titleAttributes:p},a)}};t.convertReactPropstoHtmlAttributes=H,t.handleClientStateChange=N,t.mapStateOnServer=U,t.reducePropsToState=A,t.requestAnimationFrame=b,t.warn=S}).call(t,function(){return this}())},449:function(e,t,n){"use strict";function a(e){return e&&"object"==typeof e&&"default"in e?e.default:e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t,n){function a(e){return e.displayName||e.name||"Component"}if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if("undefined"!=typeof n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(l){function d(){T=e(p.map(function(e){return e.props})),m.canUseDOM?t(T):n&&(T=n(T))}if("function"!=typeof l)throw new Error("Expected WrappedComponent to be a React component.");var p=[],T=void 0,m=function(e){function t(){return r(this,t),o(this,e.apply(this,arguments))}return i(t,e),t.peek=function(){return T},t.rewind=function(){if(t.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=T;return T=void 0,p=[],e},t.prototype.shouldComponentUpdate=function(e){return!f(e,this.props)},t.prototype.componentWillMount=function(){p.push(this),d()},t.prototype.componentDidUpdate=function(){d()},t.prototype.componentWillUnmount=function(){var e=p.indexOf(this);p.splice(e,1),d()},t.prototype.render=function(){return c.createElement(l,this.props)},t}(u.Component);return m.displayName="SideEffect("+a(l)+")",m.canUseDOM=s.canUseDOM,m}}var u=n(2),c=a(u),s=a(n(310)),f=a(n(469));e.exports=l},469:function(e,t){e.exports=function(e,t,n,a){var r=n?n.call(a,e,t):void 0;if(void 0!==r)return!!r;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var o=Object.keys(e),i=Object.keys(t);if(o.length!==i.length)return!1;for(var l=Object.prototype.hasOwnProperty.bind(t),u=0;u<o.length;u++){var c=o[u];if(!l(c))return!1;var s=e[c],f=t[c];if(r=n?n.call(a,s,f,c):void 0,r===!1||void 0===r&&s!==f)return!1}return!0}},212:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var r=n(2),o=a(r),i=n(46),l=(a(i),n(475)),u=a(l),c=function(){return o.default.createElement("section",{className:"banner slab-beta-light"},o.default.createElement("span",{className:"banner-centered"},o.default.createElement("img",{className:"banner-image",src:u.default,alt:"U.S. flag signifying that this is a United States Federal Government website"})," An official website of the U.S. government"))};t.default=c,e.exports=t.default},213:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var r=n(2),o=a(r),i=n(46),l=(a(i),n(473)),u=a(l),c=n(470),s=a(c),f=function(e){var t=e.contactInfo,n=e.siteMetadata;return o.default.createElement("footer",{className:"footer"},o.default.createElement("div",{className:"container-page-wrapper"},o.default.createElement("div",{className:"footer-col_left"},o.default.createElement("a",{href:"https://doi.gov"},o.default.createElement("img",{className:"footer-image",src:u.default,alt:"Department of the Interior logo"}))),o.default.createElement("div",{className:"footer-col_right"},o.default.createElement("div",{className:"footer-bottom-left"},o.default.createElement("p",{className:"footer-para_callout footer-para_callout-bigger"},"Built in the open"),o.default.createElement("p",{className:"footer-para"},"This site (",o.default.createElement("a",{href:"https://github.com/18F/doi-extractives-data/releases/"+n.version,className:"link-active-beta"},n.version),") is powered by ",o.default.createElement("a",{className:"link-active-beta",href:n.url+"/downloads"},"open data")," and ",o.default.createElement("a",{className:"link-active-beta",href:"https://github.com/ONRR/doi-extractives-data/"},"source code"),". We welcome contributions and comments on ",o.default.createElement("a",{className:"link-active-beta",href:"https://github.com/ONRR/doi-extractives-data/issues/new"},"GitHub"),"."),o.default.createElement("p",{className:"footer-para-small footer-para_last"},o.default.createElement("a",{href:"https://www.doi.gov/",className:"link-beta"},"Department of the Interior")," | ",o.default.createElement("a",{href:"https://www.doi.gov/privacy",className:"link-beta"},"Privacy Policy")," | ",o.default.createElement("a",{href:"https://www.doi.gov/foia",className:"link-beta"},"FOIA")," | ",o.default.createElement("a",{href:"https://www.usa.gov/",className:"link-beta"},"USA.gov"))),o.default.createElement("div",{className:"footer-bottom-right"},o.default.createElement("p",{className:"footer-para_callout"},o.default.createElement("a",{className:"link-beta",href:"{{ site.baseurl }}/downloads/"},"Download data ",o.default.createElement(s.default,null)))),o.default.createElement("div",{className:"footer-bottom footer-bottom-right"},o.default.createElement("p",{className:"footer-para footer-para-small"},"Office of Natural Resources Revenue, ",t.information_data_management.name,o.default.createElement("br",null),t.information_data_management.street,o.default.createElement("br",null),t.information_data_management.city," ",t.information_data_management.zip,o.default.createElement("br",null),o.default.createElement("a",{className:"link-active-beta",href:"mailto:"+t.information_data_management.email},t.information_data_management.email))))))};t.default=f,e.exports=t.default},214:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var r=n(2),o=a(r),i=n(46),l=a(i),u=n(474),c=a(u),s=function(e){var t=(e.siteMetadata,e.location),n={className:" header-nav_item "},a={className:" header-nav_item "},r={className:" header-nav_item "};return"/"===t.pathname?a.className+=" active ":"/about/"===t.pathname&&(r.className+=" active "),o.default.createElement("header",{className:"header container-page-wrapper"},o.default.createElement("div",{className:"header-left"},o.default.createElement(l.default,{className:"header-image_link",to:"/"},o.default.createElement("h1",{className:"sr-only"},"US Department of the Interior Natural Resources Revenue Data"),o.default.createElement("img",{className:"header-image",src:c.default,alt:"Logo"}))),o.default.createElement("nav",{className:"header-nav header-right"},o.default.createElement("ul",{className:"header-nav_top"},o.default.createElement("li",{className:"header-nav_item_top"},o.default.createElement("a",{href:"javascript:void(0)",className:"header-nav_item_link_top js-glossary-toggle",alt:"this is the glossary drawer"},"Glossary")),o.default.createElement("span",{className:"header-nav_item_link_spacer"}," | "),o.default.createElement("li",{className:"header-nav_item_top"},o.default.createElement("a",{className:"header-nav_item_link_top {% if page.permalink contains '/downloads/' %}active{% endif %}",href:"{{ site.baseurl }}/downloads/"},"Download data")),o.default.createElement("li",{className:"header-nav_item_top"},o.default.createElement("form",{action:"{{ site.baseurl }}/search-results/"},o.default.createElement("label",{className:"sr-only",htmlFor:"q"},"Search"),o.default.createElement("input",{type:"search",className:"search-box header-nav_search",placeholder:"Search",id:"search-input",name:"q",role:"search"}),o.default.createElement("button",{type:"submit",className:"header-nav_search_icon icon-search",title:"search"},o.default.createElement("label",{className:"sr-only"},"Search"))))),o.default.createElement("ul",{className:"header-nav_bottom"},o.default.createElement("li",a,o.default.createElement(l.default,{className:"header-nav_item_link",to:"/"},"Home")),o.default.createElement("li",r,o.default.createElement(l.default,{className:"header-nav_item_link",to:"/about/"},"About")),o.default.createElement("li",n,o.default.createElement(l.default,{className:"header-nav_item_link",to:"/how-it-works/"},"How it works")),o.default.createElement("li",n,o.default.createElement(l.default,{className:"header-nav_item_link",to:"/explore/"},"Explore data")),o.default.createElement("li",n,o.default.createElement(l.default,{className:"header-nav_item_link",to:"/case-studies/"},"Case studies")))))};t.default=s,e.exports=t.default},473:function(e,t,n){e.exports=n.p+"static/DOI-2x.caae2015.png"},474:function(e,t,n){e.exports=n.p+"static/NRRD-logo.f741ab8d.svg"},470:function(e,t,n){function a(e){return r.createElement("svg",e,r.createElement("path",{d:"M19.44,33.28a1,1,0,0,1-1.07-1.07V17.56a1.07,1.07,0,1,1,2.14,0V32.21a1.07,1.07,0,0,1-1.07,1.07h0m0,0a1,1,0,0,1-.75-.32l-4-4.06a1.06,1.06,0,0,1,1.5-1.5l3.21,3.32,3.21-3.32a1.06,1.06,0,0,1,1.5,1.5l-4,4.06a.83.83,0,0,1-.75.32h0m9.41-9h-4a1.07,1.07,0,1,1,0-2.14h4a4.88,4.88,0,0,0,5-4.6,4.34,4.34,0,0,0-1.5-3.21,5.07,5.07,0,0,0-4.06-1.28,1,1,0,0,1-1.18-.75A5,5,0,0,0,21.37,8.9a1.15,1.15,0,0,1-.86-.21A6.94,6.94,0,0,0,13.66,7.4,7,7,0,0,0,9.07,13c0,.32-.21.53-.53.75a4.43,4.43,0,0,0-2.25,5,4.6,4.6,0,0,0,4.6,3.42H14a1.07,1.07,0,0,1,0,2.14h-3.1a6.9,6.9,0,0,1-6.63-4.92A6.52,6.52,0,0,1,7,12.21a9.7,9.7,0,0,1,5.88-7,9.09,9.09,0,0,1,8.56,1.28,7.14,7.14,0,0,1,7.38,4.28,7,7,0,0,1,4.92,1.92A6.61,6.61,0,0,1,36,17.56a7,7,0,0,1-7.17,6.74h0",transform:"translate(-3.52 -4.21)"}))}var r=n(2);a.displayName="IconDownloadBase",a.defaultProps={width:"18px",className:"icon icon-bottom",viewBox:"0 0 33 29.57"},e.exports=a,a.default=a},475:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAAG1BMVEUdM7EeNLIeM7HgQCDaPh/bPh/bPx/////bPyBEby41AAAAUElEQVQI123MNw4CABDEwD3jC/9/MQ1BQrgeOSkIqYe2o2FZtthXgQLgbHVMZdlsfUQFQnHtjP1+8BUhBDKOqtmfot6ojqPzR7TjdU+f6vkED+IDPhTBcMAAAAAASUVORK5CYII="},215:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.query=void 0;var r=n(2),o=a(r),i=n(421),l=a(i),u=(n(187),n(212)),c=a(u),s=n(214),f=a(s),d=n(213),p=a(d);n(354),t.default=function(e){var t=e.data,n=e.children;return o.default.createElement("div",null,o.default.createElement(l.default,{title:"Home | Natural Resources Revenue Data",meta:[{name:"og:description",content:"This site provides open data about natural resource management on federal lands and waters in the United States, including oil, gas, coal, and other extractive industries."},{name:"twitter:description",content:"This site provides open data about natural resource management on federal lands and waters in the United States, including oil, gas, coal, and other extractive industries."}]}),o.default.createElement(c.default,null),o.default.createElement(f.default,{siteMetadata:t.site.siteMetadata}),n(),o.default.createElement(p.default,{contactInfo:t.dataYaml,siteMetadata:t.site.siteMetadata}))};t.query="** extracted graphql fragment **"},354:function(e,t){}});
//# sourceMappingURL=component---src-layouts-index-js-74a4537309f9658c0e32.js.map