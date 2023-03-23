"use strict";var t={},e={};!function(t){const e=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",n="["+e+"]["+(e+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040")+"]*",i=new RegExp("^"+n+"$");t.isExist=function(t){return void 0!==t},t.isEmptyObject=function(t){return 0===Object.keys(t).length},t.merge=function(t,e,n){if(e){const i=Object.keys(e),s=i.length;for(let r=0;r<s;r++)t[i[r]]="strict"===n?[e[i[r]]]:e[i[r]]}},t.getValue=function(e){return t.isExist(e)?e:""},t.isName=function(t){const e=i.exec(t);return!(null==e)},t.getAllMatches=function(t,e){const n=[];let i=e.exec(t);for(;i;){const s=[];s.startIndex=e.lastIndex-i[0].length;const r=i.length;for(let t=0;t<r;t++)s.push(i[t]);n.push(s),i=e.exec(t)}return n},t.nameRegexp=n}(e);const n=e,i={allowBooleanAttributes:!1,unpairedTags:[]};function s(t){return" "===t||"\t"===t||"\n"===t||"\r"===t}function r(t,e){const n=e;for(;e<t.length;e++)if("?"!=t[e]&&" "!=t[e]);else{const i=t.substr(n,e-n);if(e>5&&"xml"===i)return p("InvalidXml","XML declaration allowed only at the start of the document.",g(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function o(t,e){if(t.length>e+5&&"-"===t[e+1]&&"-"===t[e+2]){for(e+=3;e<t.length;e++)if("-"===t[e]&&"-"===t[e+1]&&">"===t[e+2]){e+=2;break}}else if(t.length>e+8&&"D"===t[e+1]&&"O"===t[e+2]&&"C"===t[e+3]&&"T"===t[e+4]&&"Y"===t[e+5]&&"P"===t[e+6]&&"E"===t[e+7]){let n=1;for(e+=8;e<t.length;e++)if("<"===t[e])n++;else if(">"===t[e]&&(n--,0===n))break}else if(t.length>e+9&&"["===t[e+1]&&"C"===t[e+2]&&"D"===t[e+3]&&"A"===t[e+4]&&"T"===t[e+5]&&"A"===t[e+6]&&"["===t[e+7])for(e+=8;e<t.length;e++)if("]"===t[e]&&"]"===t[e+1]&&">"===t[e+2]){e+=2;break}return e}t.validate=function(t,e){e=Object.assign({},i,e);const a=[];let l=!1,h=!1;"\ufeff"===t[0]&&(t=t.substr(1));for(let i=0;i<t.length;i++)if("<"===t[i]&&"?"===t[i+1]){if(i+=2,i=r(t,i),i.err)return i}else{if("<"!==t[i]){if(s(t[i]))continue;return p("InvalidChar","char '"+t[i]+"' is not expected.",g(t,i))}{let x=i;if(i++,"!"===t[i]){i=o(t,i);continue}{let m=!1;"/"===t[i]&&(m=!0,i++);let N="";for(;i<t.length&&">"!==t[i]&&" "!==t[i]&&"\t"!==t[i]&&"\n"!==t[i]&&"\r"!==t[i];i++)N+=t[i];if(N=N.trim(),"/"===N[N.length-1]&&(N=N.substring(0,N.length-1),i--),f=N,!n.isName(f)){let e;return e=0===N.trim().length?"Invalid space after '<'.":"Tag '"+N+"' is an invalid name.",p("InvalidTag",e,g(t,i))}const b=u(t,i);if(!1===b)return p("InvalidAttr","Attributes for '"+N+"' have open quote.",g(t,i));let T=b.value;if(i=b.index,"/"===T[T.length-1]){const n=i-T.length;T=T.substring(0,T.length-1);const s=d(T,e);if(!0!==s)return p(s.err.code,s.err.msg,g(t,n+s.err.line));l=!0}else if(m){if(!b.tagClosed)return p("InvalidTag","Closing tag '"+N+"' doesn't have proper closing.",g(t,i));if(T.trim().length>0)return p("InvalidTag","Closing tag '"+N+"' can't have attributes or invalid starting.",g(t,x));{const e=a.pop();if(N!==e.tagName){let n=g(t,e.tagStartPos);return p("InvalidTag","Expected closing tag '"+e.tagName+"' (opened in line "+n.line+", col "+n.col+") instead of closing tag '"+N+"'.",g(t,x))}0==a.length&&(h=!0)}}else{const n=d(T,e);if(!0!==n)return p(n.err.code,n.err.msg,g(t,i-T.length+n.err.line));if(!0===h)return p("InvalidXml","Multiple possible root nodes found.",g(t,i));-1!==e.unpairedTags.indexOf(N)||a.push({tagName:N,tagStartPos:x}),l=!0}for(i++;i<t.length;i++)if("<"===t[i]){if("!"===t[i+1]){i++,i=o(t,i);continue}if("?"!==t[i+1])break;if(i=r(t,++i),i.err)return i}else if("&"===t[i]){const e=c(t,i);if(-1==e)return p("InvalidChar","char '&' is not expected.",g(t,i));i=e}else if(!0===h&&!s(t[i]))return p("InvalidXml","Extra text at the end",g(t,i));"<"===t[i]&&i--}}}var f;return l?1==a.length?p("InvalidTag","Unclosed tag '"+a[0].tagName+"'.",g(t,a[0].tagStartPos)):!(a.length>0)||p("InvalidXml","Invalid '"+JSON.stringify(a.map((t=>t.tagName)),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):p("InvalidXml","Start tag expected.",1)};const a='"',l="'";function u(t,e){let n="",i="",s=!1;for(;e<t.length;e++){if(t[e]===a||t[e]===l)""===i?i=t[e]:i!==t[e]||(i="");else if(">"===t[e]&&""===i){s=!0;break}n+=t[e]}return""===i&&{value:n,index:e,tagClosed:s}}const h=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function d(t,e){const i=n.getAllMatches(t,h),s={};for(let t=0;t<i.length;t++){if(0===i[t][1].length)return p("InvalidAttr","Attribute '"+i[t][2]+"' has no space in starting.",x(i[t]));if(void 0!==i[t][3]&&void 0===i[t][4])return p("InvalidAttr","Attribute '"+i[t][2]+"' is without value.",x(i[t]));if(void 0===i[t][3]&&!e.allowBooleanAttributes)return p("InvalidAttr","boolean attribute '"+i[t][2]+"' is not allowed.",x(i[t]));const n=i[t][2];if(!f(n))return p("InvalidAttr","Attribute '"+n+"' is an invalid name.",x(i[t]));if(s.hasOwnProperty(n))return p("InvalidAttr","Attribute '"+n+"' is repeated.",x(i[t]));s[n]=1}return!0}function c(t,e){if(";"===t[++e])return-1;if("#"===t[e])return function(t,e){let n=/\d/;for("x"===t[e]&&(e++,n=/[\da-fA-F]/);e<t.length;e++){if(";"===t[e])return e;if(!t[e].match(n))break}return-1}(t,++e);let n=0;for(;e<t.length;e++,n++)if(!(t[e].match(/\w/)&&n<20)){if(";"===t[e])break;return-1}return e}function p(t,e,n){return{err:{code:t,msg:e,line:n.line||n,col:n.col}}}function f(t){return n.isName(t)}function g(t,e){const n=t.substring(0,e).split(/\r?\n/);return{line:n.length,col:n[n.length-1].length+1}}function x(t){return t.startIndex+t[1].length}var m={};const N={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1};m.buildOptions=function(t){return Object.assign({},N,t)},m.defaultOptions=N;var b=class{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,e){"__proto__"===t&&(t="#__proto__"),this.child.push({[t]:e})}addChild(t){"__proto__"===t.tagname&&(t.tagname="#__proto__"),t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child})}};function T(t,e){let n="";for(;e<t.length&&"'"!==t[e]&&'"'!==t[e];e++)n+=t[e];if(n=n.trim(),-1!==n.indexOf(" "))throw new Error("External entites are not supported");const i=t[e++];let s="";for(;e<t.length&&t[e]!==i;e++)s+=t[e];return[n,s,e]}function E(t,e){return"!"===t[e+1]&&"-"===t[e+2]&&"-"===t[e+3]}function A(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"N"===t[e+3]&&"T"===t[e+4]&&"I"===t[e+5]&&"T"===t[e+6]&&"Y"===t[e+7]}function v(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"L"===t[e+3]&&"E"===t[e+4]&&"M"===t[e+5]&&"E"===t[e+6]&&"N"===t[e+7]&&"T"===t[e+8]}function y(t,e){return"!"===t[e+1]&&"A"===t[e+2]&&"T"===t[e+3]&&"T"===t[e+4]&&"L"===t[e+5]&&"I"===t[e+6]&&"S"===t[e+7]&&"T"===t[e+8]}function P(t,e){return"!"===t[e+1]&&"N"===t[e+2]&&"O"===t[e+3]&&"T"===t[e+4]&&"A"===t[e+5]&&"T"===t[e+6]&&"I"===t[e+7]&&"O"===t[e+8]&&"N"===t[e+9]}var w=function(t,e){const n={};if("O"!==t[e+3]||"C"!==t[e+4]||"T"!==t[e+5]||"Y"!==t[e+6]||"P"!==t[e+7]||"E"!==t[e+8])throw new Error("Invalid Tag instead of DOCTYPE");{e+=9;let i=1,s=!1,r=!1,o="";for(;e<t.length;e++)if("<"!==t[e]||r)if(">"===t[e]){if(r?"-"===t[e-1]&&"-"===t[e-2]&&(r=!1,i--):i--,0===i)break}else"["===t[e]?s=!0:o+=t[e];else{if(s&&A(t,e))e+=7,[entityName,val,e]=T(t,e+1),-1===val.indexOf("&")&&(n[entityName]={regx:RegExp(`&${entityName};`,"g"),val:val});else if(s&&v(t,e))e+=8;else if(s&&y(t,e))e+=8;else if(s&&P(t,e))e+=9;else{if(!E)throw new Error("Invalid DOCTYPE");r=!0}i++,o=""}if(0!==i)throw new Error("Unclosed DOCTYPE")}return{entities:n,i:e}};const O=/^[-+]?0x[a-fA-F0-9]+$/,I=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);const C={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};const L=e,k=b,S=w,D=function(t,e={}){if(e=Object.assign({},C,e),!t||"string"!=typeof t)return t;let n=t.trim();if(void 0!==e.skipLike&&e.skipLike.test(n))return t;if(e.hex&&O.test(n))return Number.parseInt(n,16);{const i=I.exec(n);if(i){const s=i[1],r=i[2];let o=function(t){if(t&&-1!==t.indexOf("."))return"."===(t=t.replace(/0+$/,""))?t="0":"."===t[0]?t="0"+t:"."===t[t.length-1]&&(t=t.substr(0,t.length-1)),t;return t}(i[3]);const a=i[4]||i[6];if(!e.leadingZeros&&r.length>0&&s&&"."!==n[2])return t;if(!e.leadingZeros&&r.length>0&&!s&&"."!==n[1])return t;{const i=Number(n),l=""+i;return-1!==l.search(/[eE]/)||a?e.eNotation?i:t:-1!==n.indexOf(".")?"0"===l&&""===o||l===o||s&&l==="-"+o?i:t:r?o===l||s+o===l?i:t:n===l||n===s+l?i:t}}return t}};"<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g,L.nameRegexp);function V(t){const e=Object.keys(t);for(let n=0;n<e.length;n++){const i=e[n];this.lastEntities[i]={regex:new RegExp("&"+i+";","g"),val:t[i]}}}function _(t,e,n,i,s,r,o){if(void 0!==t&&(this.options.trimValues&&!i&&(t=t.trim()),t.length>0)){o||(t=this.replaceEntitiesValue(t));const i=this.options.tagValueProcessor(e,t,n,s,r);if(null==i)return t;if(typeof i!=typeof t||i!==t)return i;if(this.options.trimValues)return Y(t,this.options.parseTagValue,this.options.numberParseOptions);return t.trim()===t?Y(t,this.options.parseTagValue,this.options.numberParseOptions):t}}function $(t){if(this.options.removeNSPrefix){const e=t.split(":"),n="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=n+e[1])}return t}const j=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function F(t,e){if(!this.options.ignoreAttributes&&"string"==typeof t){const n=L.getAllMatches(t,j),i=n.length,s={};for(let t=0;t<i;t++){const i=this.resolveNameSpace(n[t][1]);let r=n[t][4],o=this.options.attributeNamePrefix+i;if(i.length)if(this.options.transformAttributeName&&(o=this.options.transformAttributeName(o)),"__proto__"===o&&(o="#__proto__"),void 0!==r){this.options.trimValues&&(r=r.trim()),r=this.replaceEntitiesValue(r);const t=this.options.attributeValueProcessor(i,r,e);s[o]=null==t?r:typeof t!=typeof r||t!==r?t:Y(r,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(s[o]=!0)}if(!Object.keys(s).length)return;if(this.options.attributesGroupName){const t={};return t[this.options.attributesGroupName]=s,t}return s}}const M=function(t){t=t.replace(/\r\n?/g,"\n");const e=new k("!xml");let n=e,i="",s="";for(let r=0;r<t.length;r++){if("<"===t[r])if("/"===t[r+1]){const e=H(t,">",r,"Closing Tag is not closed.");let o=t.substring(r+2,e).trim();if(this.options.removeNSPrefix){const t=o.indexOf(":");-1!==t&&(o=o.substr(t+1))}this.options.transformTagName&&(o=this.options.transformTagName(o)),n&&(i=this.saveTextToParentTag(i,n,s)),s=s.substr(0,s.lastIndexOf(".")),n=this.tagsNodeStack.pop(),i="",r=e}else if("?"===t[r+1]){let e=G(t,r,!1,"?>");if(!e)throw new Error("Pi Tag is not closed.");if(i=this.saveTextToParentTag(i,n,s),this.options.ignoreDeclaration&&"?xml"===e.tagName||this.options.ignorePiTags);else{const t=new k(e.tagName);t.add(this.options.textNodeName,""),e.tagName!==e.tagExp&&e.attrExpPresent&&(t[":@"]=this.buildAttributesMap(e.tagExp,s)),n.addChild(t)}r=e.closeIndex+1}else if("!--"===t.substr(r+1,3)){const e=H(t,"--\x3e",r+4,"Comment is not closed.");if(this.options.commentPropName){const o=t.substring(r+4,e-2);i=this.saveTextToParentTag(i,n,s),n.add(this.options.commentPropName,[{[this.options.textNodeName]:o}])}r=e}else if("!D"===t.substr(r+1,2)){const e=S(t,r);this.docTypeEntities=e.entities,r=e.i}else if("!["===t.substr(r+1,2)){const e=H(t,"]]>",r,"CDATA is not closed.")-2,o=t.substring(r+9,e);if(i=this.saveTextToParentTag(i,n,s),this.options.cdataPropName)n.add(this.options.cdataPropName,[{[this.options.textNodeName]:o}]);else{let t=this.parseTextData(o,n.tagname,s,!0,!1,!0);null==t&&(t=""),n.add(this.options.textNodeName,t)}r=e+2}else{let o=G(t,r,this.options.removeNSPrefix),a=o.tagName,l=o.tagExp,u=o.attrExpPresent,h=o.closeIndex;this.options.transformTagName&&(a=this.options.transformTagName(a)),n&&i&&"!xml"!==n.tagname&&(i=this.saveTextToParentTag(i,n,s,!1)),a!==e.tagname&&(s+=s?"."+a:a);const d=n;if(d&&-1!==this.options.unpairedTags.indexOf(d.tagname)&&(n=this.tagsNodeStack.pop()),this.isItStopNode(this.options.stopNodes,s,a)){let e="";if(l.length>0&&l.lastIndexOf("/")===l.length-1)r=o.closeIndex;else if(-1!==this.options.unpairedTags.indexOf(a))r=o.closeIndex;else{const n=this.readStopNodeData(t,a,h+1);if(!n)throw new Error(`Unexpected end of ${a}`);r=n.i,e=n.tagContent}const i=new k(a);a!==l&&u&&(i[":@"]=this.buildAttributesMap(l,s)),e&&(e=this.parseTextData(e,a,s,!0,u,!0,!0)),s=s.substr(0,s.lastIndexOf(".")),i.add(this.options.textNodeName,e),n.addChild(i)}else{if(l.length>0&&l.lastIndexOf("/")===l.length-1){"/"===a[a.length-1]?(a=a.substr(0,a.length-1),l=a):l=l.substr(0,l.length-1),this.options.transformTagName&&(a=this.options.transformTagName(a));const t=new k(a);a!==l&&u&&(t[":@"]=this.buildAttributesMap(l,s)),s=s.substr(0,s.lastIndexOf(".")),n.addChild(t)}else{const t=new k(a);this.tagsNodeStack.push(n),a!==l&&u&&(t[":@"]=this.buildAttributesMap(l,s)),n.addChild(t),n=t}i="",r=h}}else i+=t[r]}return e.child},R=function(t){if(this.options.processEntities){for(let e in this.docTypeEntities){const n=this.docTypeEntities[e];t=t.replace(n.regx,n.val)}for(let e in this.lastEntities){const n=this.lastEntities[e];t=t.replace(n.regex,n.val)}if(this.options.htmlEntities)for(let e in this.htmlEntities){const n=this.htmlEntities[e];t=t.replace(n.regex,n.val)}t=t.replace(this.ampEntity.regex,this.ampEntity.val)}return t};function B(t,e,n,i){return t&&(void 0===i&&(i=0===Object.keys(e.child).length),void 0!==(t=this.parseTextData(t,e.tagname,n,!1,!!e[":@"]&&0!==Object.keys(e[":@"]).length,i))&&""!==t&&e.add(this.options.textNodeName,t),t=""),t}function X(t,e,n){const i="*."+n;for(const n in t){const s=t[n];if(i===s||e===s)return!0}return!1}function H(t,e,n,i){const s=t.indexOf(e,n);if(-1===s)throw new Error(i);return s+e.length-1}function G(t,e,n,i=">"){const s=function(t,e,n=">"){let i,s="";for(let r=e;r<t.length;r++){let e=t[r];if(i)e===i&&(i="");else if('"'===e||"'"===e)i=e;else if(e===n[0]){if(!n[1])return{data:s,index:r};if(t[r+1]===n[1])return{data:s,index:r}}else"\t"===e&&(e=" ");s+=e}}(t,e+1,i);if(!s)return;let r=s.data;const o=s.index,a=r.search(/\s/);let l=r,u=!0;if(-1!==a&&(l=r.substr(0,a).replace(/\s\s*$/,""),r=r.substr(a+1)),n){const t=l.indexOf(":");-1!==t&&(l=l.substr(t+1),u=l!==s.data.substr(t+1))}return{tagName:l,tagExp:r,closeIndex:o,attrExpPresent:u}}function U(t,e,n){const i=n;let s=1;for(;n<t.length;n++)if("<"===t[n])if("/"===t[n+1]){const r=H(t,">",n,`${e} is not closed`);if(t.substring(n+2,r).trim()===e&&(s--,0===s))return{tagContent:t.substring(i,n),i:r};n=r}else if("?"===t[n+1]){n=H(t,"?>",n+1,"StopNode is not closed.")}else if("!--"===t.substr(n+1,3)){n=H(t,"--\x3e",n+3,"StopNode is not closed.")}else if("!["===t.substr(n+1,2)){n=H(t,"]]>",n,"StopNode is not closed.")-2}else{const i=G(t,n,">");if(i){(i&&i.tagName)===e&&"/"!==i.tagExp[i.tagExp.length-1]&&s++,n=i.closeIndex}}}function Y(t,e,n){if(e&&"string"==typeof t){const e=t.trim();return"true"===e||"false"!==e&&D(t,n)}return L.isExist(t)?t:""}var z=class{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"}},this.addExternalEntities=V,this.parseXml=M,this.parseTextData=_,this.resolveNameSpace=$,this.buildAttributesMap=F,this.isItStopNode=X,this.replaceEntitiesValue=R,this.readStopNodeData=U,this.saveTextToParentTag=B}},Z={};function q(t,e,n){let i;const s={};for(let r=0;r<t.length;r++){const o=t[r],a=K(o);let l="";if(l=void 0===n?a:n+"."+a,a===e.textNodeName)void 0===i?i=o[a]:i+=""+o[a];else{if(void 0===a)continue;if(o[a]){let t=q(o[a],e,l);const n=J(t,e);o[":@"]?W(t,o[":@"],l,e):1!==Object.keys(t).length||void 0===t[e.textNodeName]||e.alwaysCreateTextNode?0===Object.keys(t).length&&(e.alwaysCreateTextNode?t[e.textNodeName]="":t=""):t=t[e.textNodeName],void 0!==s[a]&&s.hasOwnProperty(a)?(Array.isArray(s[a])||(s[a]=[s[a]]),s[a].push(t)):e.isArray(a,l,n)?s[a]=[t]:s[a]=t}}}return"string"==typeof i?i.length>0&&(s[e.textNodeName]=i):void 0!==i&&(s[e.textNodeName]=i),s}function K(t){const e=Object.keys(t);for(let t=0;t<e.length;t++){const n=e[t];if(":@"!==n)return n}}function W(t,e,n,i){if(e){const s=Object.keys(e),r=s.length;for(let o=0;o<r;o++){const r=s[o];i.isArray(r,n+"."+r,!0,!0)?t[r]=[e[r]]:t[r]=e[r]}}}function J(t,e){const n=Object.keys(t).length;return!!(0===n||1===n&&t[e.textNodeName])}Z.prettify=function(t,e){return q(t,e)};const{buildOptions:Q}=m,tt=z,{prettify:et}=Z,nt=t;var it=class{constructor(t){this.externalEntities={},this.options=Q(t)}parse(t,e){if("string"==typeof t);else{if(!t.toString)throw new Error("XML data is accepted in String or Bytes[] form.");t=t.toString()}if(e){!0===e&&(e={});const n=nt.validate(t,e);if(!0!==n)throw Error(`${n.err.msg}:${n.err.line}:${n.err.col}`)}const n=new tt(this.options);n.addExternalEntities(this.externalEntities);const i=n.parseXml(t);return this.options.preserveOrder||void 0===i?i:et(i,this.options)}addEntity(t,e){if(-1!==e.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==t.indexOf("&")||-1!==t.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if("&"===e)throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=e}};const st="\n";function rt(t,e,n,i){let s="",r=!1;for(let o=0;o<t.length;o++){const a=t[o],l=ot(a);let u="";if(u=0===n.length?l:`${n}.${l}`,l===e.textNodeName){let t=a[l];lt(u,e)||(t=e.tagValueProcessor(l,t),t=ut(t,e)),r&&(s+=i),s+=t,r=!1;continue}if(l===e.cdataPropName){r&&(s+=i),s+=`<![CDATA[${a[l][0][e.textNodeName]}]]>`,r=!1;continue}if(l===e.commentPropName){s+=i+`\x3c!--${a[l][0][e.textNodeName]}--\x3e`,r=!0;continue}if("?"===l[0]){const t=at(a[":@"],e),n="?xml"===l?"":i;let o=a[l][0][e.textNodeName];o=0!==o.length?" "+o:"",s+=n+`<${l}${o}${t}?>`,r=!0;continue}let h=i;""!==h&&(h+=e.indentBy);const d=i+`<${l}${at(a[":@"],e)}`,c=rt(a[l],e,u,h);-1!==e.unpairedTags.indexOf(l)?e.suppressUnpairedNode?s+=d+">":s+=d+"/>":c&&0!==c.length||!e.suppressEmptyNode?c&&c.endsWith(">")?s+=d+`>${c}${i}</${l}>`:(s+=d+">",c&&""!==i&&(c.includes("/>")||c.includes("</"))?s+=i+e.indentBy+c+i:s+=c,s+=`</${l}>`):s+=d+"/>",r=!0}return s}function ot(t){const e=Object.keys(t);for(let t=0;t<e.length;t++){const n=e[t];if(":@"!==n)return n}}function at(t,e){let n="";if(t&&!e.ignoreAttributes)for(let i in t){let s=e.attributeValueProcessor(i,t[i]);s=ut(s,e),!0===s&&e.suppressBooleanAttributes?n+=` ${i.substr(e.attributeNamePrefix.length)}`:n+=` ${i.substr(e.attributeNamePrefix.length)}="${s}"`}return n}function lt(t,e){let n=(t=t.substr(0,t.length-e.textNodeName.length-1)).substr(t.lastIndexOf(".")+1);for(let i in e.stopNodes)if(e.stopNodes[i]===t||e.stopNodes[i]==="*."+n)return!0;return!1}function ut(t,e){if(t&&t.length>0&&e.processEntities)for(let n=0;n<e.entities.length;n++){const i=e.entities[n];t=t.replace(i.regex,i.val)}return t}const ht=function(t,e){let n="";return e.format&&e.indentBy.length>0&&(n=st),rt(t,e,"",n)},dt={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[]};function ct(t){this.options=Object.assign({},dt,t),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=gt),this.processTextOrObjNode=pt,this.options.format?(this.indentate=ft,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}function pt(t,e,n){const i=this.j2x(t,n+1);return void 0!==t[this.options.textNodeName]&&1===Object.keys(t).length?this.buildTextValNode(t[this.options.textNodeName],e,i.attrStr,n):this.buildObjectNode(i.val,e,i.attrStr,n)}function ft(t){return this.options.indentBy.repeat(t)}function gt(t){return!!t.startsWith(this.options.attributeNamePrefix)&&t.substr(this.attrPrefixLen)}ct.prototype.build=function(t){return this.options.preserveOrder?ht(t,this.options):(Array.isArray(t)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(t={[this.options.arrayNodeName]:t}),this.j2x(t,0).val)},ct.prototype.j2x=function(t,e){let n="",i="";for(let s in t)if(void 0===t[s]);else if(null===t[s])"?"===s[0]?i+=this.indentate(e)+"<"+s+"?"+this.tagEndChar:i+=this.indentate(e)+"<"+s+"/"+this.tagEndChar;else if(t[s]instanceof Date)i+=this.buildTextValNode(t[s],s,"",e);else if("object"!=typeof t[s]){const r=this.isAttribute(s);if(r)n+=this.buildAttrPairStr(r,""+t[s]);else if(s===this.options.textNodeName){let e=this.options.tagValueProcessor(s,""+t[s]);i+=this.replaceEntitiesValue(e)}else i+=this.buildTextValNode(t[s],s,"",e)}else if(Array.isArray(t[s])){const n=t[s].length;for(let r=0;r<n;r++){const n=t[s][r];void 0===n||(null===n?"?"===s[0]?i+=this.indentate(e)+"<"+s+"?"+this.tagEndChar:i+=this.indentate(e)+"<"+s+"/"+this.tagEndChar:i+="object"==typeof n?this.processTextOrObjNode(n,s,e):this.buildTextValNode(n,s,"",e))}}else if(this.options.attributesGroupName&&s===this.options.attributesGroupName){const e=Object.keys(t[s]),i=e.length;for(let r=0;r<i;r++)n+=this.buildAttrPairStr(e[r],""+t[s][e[r]])}else i+=this.processTextOrObjNode(t[s],s,e);return{attrStr:n,val:i}},ct.prototype.buildAttrPairStr=function(t,e){return e=this.options.attributeValueProcessor(t,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&"true"===e?" "+t:" "+t+'="'+e+'"'},ct.prototype.buildObjectNode=function(t,e,n,i){if(""===t)return"?"===e[0]?this.indentate(i)+"<"+e+n+"?"+this.tagEndChar:this.indentate(i)+"<"+e+n+this.closeTag(e)+this.tagEndChar;{let s="</"+e+this.tagEndChar,r="";return"?"===e[0]&&(r="?",s=""),n&&-1===t.indexOf("<")?this.indentate(i)+"<"+e+n+r+">"+t+s:!1!==this.options.commentPropName&&e===this.options.commentPropName&&0===r.length?this.indentate(i)+`\x3c!--${t}--\x3e`+this.newLine:this.indentate(i)+"<"+e+n+r+this.tagEndChar+t+this.indentate(i)+s}},ct.prototype.closeTag=function(t){let e="";return-1!==this.options.unpairedTags.indexOf(t)?this.options.suppressUnpairedNode||(e="/"):e=this.options.suppressEmptyNode?"/":`></${t}`,e},ct.prototype.buildTextValNode=function(t,e,n,i){if(!1!==this.options.cdataPropName&&e===this.options.cdataPropName)return this.indentate(i)+`<![CDATA[${t}]]>`+this.newLine;if(!1!==this.options.commentPropName&&e===this.options.commentPropName)return this.indentate(i)+`\x3c!--${t}--\x3e`+this.newLine;if("?"===e[0])return this.indentate(i)+"<"+e+n+"?"+this.tagEndChar;{let s=this.options.tagValueProcessor(e,t);return s=this.replaceEntitiesValue(s),""===s?this.indentate(i)+"<"+e+n+this.closeTag(e)+this.tagEndChar:this.indentate(i)+"<"+e+n+">"+s+"</"+e+this.tagEndChar}},ct.prototype.replaceEntitiesValue=function(t){if(t&&t.length>0&&this.options.processEntities)for(let e=0;e<this.options.entities.length;e++){const n=this.options.entities[e];t=t.replace(n.regex,n.val)}return t};var xt={XMLParser:it,XMLValidator:t,XMLBuilder:ct};function mt(t){return t.replace("urn:uuid:","")}const Nt="http://www.digicine.com/PROTO-ASDCP-AM-20040311#",bt="http://www.smpte-ra.org/schemas/429-9/2007/AM",Tt="http://www.digicine.com/PROTO-ASDCP-PKL-20040311#",Et="http://www.smpte-ra.org/schemas/429-8/2007/PKL",At="http://www.smpte-ra.org/schemas/429-7/2006/CPL",vt="http://www.digicine.com/PROTO-ASDCP-CPL-20040511#";exports.assetMapParser=function(t,e="formatted"){let n=new xt.XMLParser({ignoreAttributes:!1}).parse(t).AssetMap,i={};return"raw"===e?n:(n["@_xmlns"]==Nt?(i.type="INTEROP",i.id=mt(n.Id),i.annotationText=n.AnnotationText,i.issueDate=n.IssueDate,i.issuer=n.Issuer,i.creator=n.Creator,i.assetList=n.AssetList.Asset.map((t=>({id:mt(t.Id),annotationText:t.AnnotationText,path:Array.isArray(t.ChunkList)?t.ChunkList.map((t=>t.Chunk.Path)):t.ChunkList.Chunk.Path})))):n["@_xmlns"]==bt&&(i.type="SMTPE",i.id=mt(n.Id),i.annotationText=n.AnnotationText,i.issueDate=n.IssueDate,i.issuer=n.Issuer,i.creator=n.Creator,i.assetList=n.AssetList.Asset.map((t=>({id:mt(t.Id),annotationText:t.AnnotationText,path:Array.isArray(t.ChunkList)?t.ChunkList.map((t=>t.Chunk.Path)):t.ChunkList.Chunk.Path})))),i)},exports.cplParser=function(t,e="formatted"){let n=new xt.XMLParser({ignoreAttributes:!1}).parse(t),i={};if("raw"===e)return n;if(n.CompositionPlaylist){let t=n.CompositionPlaylist;i.id=mt(t.Id),i.annotationText=t.AnnotationText,i.issueDate=t.IssueDate,i.issuer=t.Issuer,i.creator=t.Creator,i.assetList=[];let e=t.ReelList.Reel;if(Array.isArray(e))e.forEach((t=>{let e=t.AssetList;for(const t in e){let n={};Array.isArray(e[t])?e[t].forEach((t=>{n={id:mt(t.Id),annotationText:t.AnnotationText,sha1Hash:t.Hash},i.assetList&&i.assetList.findIndex((t=>t.id===n.id))>=0&&i.assetList.push(n)})):(e[t].Id&&(n={id:mt(e[t].Id),annotationText:e[t].AnnotationText,sha1Hash:e[t].Hash}),i.assetList&&i.assetList.findIndex((t=>t.id===n.id))<0&&i.assetList.push(n))}}));else{let t=e.AssetList;for(const e in t){let n={};Array.isArray(t[e])?t[e].forEach((t=>{n={id:mt(t.Id),annotationText:t.AnnotationText,sha1Hash:t.Hash},i.assetList&&i.assetList.findIndex((t=>t.id===n.id))<0&&i.assetList.push(n)})):t[e].Id&&(n={id:mt(t[e].Id),annotationText:t[e].AnnotationText,sha1Hash:t[e].Hash},i.assetList&&i.assetList.findIndex((t=>t.id===n.id))<0&&i.assetList.push(n))}}}return n["@_xmlns"]==vt?i.type="INTEROP":n["@_xmlns"]==At?i.type="SMTPE":i.type="",i},exports.pklParser=function(t,e="formatted"){let n=new xt.XMLParser({ignoreAttributes:!1}).parse(t).PackingList;if("raw"===e)return n;let i={};return n["@_xmlns"]==Tt?(i.type="INTEROP",i.id=mt(n.Id),i.annotationText=n.AnnotationText,i.issueDate=n.IssueDate,i.issuer=n.Issuer,i.creator=n.Creator,i.assetList=n.AssetList.Asset.map((t=>({id:mt(t.Id),annotationText:t.AnnotationText,hash:t.Hash,size:t.Size,type:t.Type})))):n["@_xmlns"]==Et&&(i.type="SMTPE",i.id=mt(n.Id),i.annotationText=n.AnnotationText,i.issueDate=n.IssueDate,i.issuer=n.Issuer,i.creator=n.Creator,i.assetList=n.AssetList.Asset.map((t=>({id:mt(t.Id),annotationText:t.AnnotationText,hash:t.Hash,size:t.Size,type:t.Type})))),i};
