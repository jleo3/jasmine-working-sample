/* Copyright (c) 2010-2012 Marcus Westin */
(function(){function o(){try{return r in t&&t[r]}catch(e){return!1}}var e={},t=window,n=t.document,r="localStorage",i="__storejs__",s;e.disabled=!1,e.set=function(e,t){},e.get=function(e){},e.remove=function(e){},e.clear=function(){},e.transact=function(t,n,r){var i=e.get(t);r==null&&(r=n,n=null),typeof i=="undefined"&&(i=n||{}),r(i),e.set(t,i)},e.getAll=function(){},e.serialize=function(e){return JSON.stringify(e)},e.deserialize=function(e){if(typeof e!="string")return undefined;try{return JSON.parse(e)}catch(t){return e||undefined}};if(o())s=t[r],e.set=function(t,n){return n===undefined?e.remove(t):(s.setItem(t,e.serialize(n)),n)},e.get=function(t){return e.deserialize(s.getItem(t))},e.remove=function(e){s.removeItem(e)},e.clear=function(){s.clear()},e.getAll=function(){var t={};for(var n=0;n<s.length;++n){var r=s.key(n);t[r]=e.get(r)}return t};else if(n.documentElement.addBehavior){var u,a;try{a=new ActiveXObject("htmlfile"),a.open(),a.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>'),a.close(),u=a.w.frames[0].document,s=u.createElement("div")}catch(f){s=n.createElement("div"),u=n.body}function l(t){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(s),u.appendChild(s),s.addBehavior("#default#userData"),s.load(r);var i=t.apply(e,n);return u.removeChild(s),i}}var c=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");function h(e){return e.replace(c,"___")}e.set=l(function(t,n,i){return n=h(n),i===undefined?e.remove(n):(t.setAttribute(n,e.serialize(i)),t.save(r),i)}),e.get=l(function(t,n){return n=h(n),e.deserialize(t.getAttribute(n))}),e.remove=l(function(e,t){t=h(t),e.removeAttribute(t),e.save(r)}),e.clear=l(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(r);for(var n=0,i;i=t[n];n++)e.removeAttribute(i.name);e.save(r)}),e.getAll=l(function(t){var n=t.XMLDocument.documentElement.attributes,r={};for(var i=0,s;s=n[i];++i){var o=h(s.name);r[s.name]=e.deserialize(t.getAttribute(o))}return r})}try{e.set(i,i),e.get(i)!=i&&(e.disabled=!0),e.remove(i)}catch(f){e.disabled=!0}e.enabled=!e.disabled,typeof module!="undefined"&&typeof module!="function"?module.exports=e:typeof define=="function"&&define.amd?define(e):this.store=e})()