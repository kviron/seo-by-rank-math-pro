!function(e){var t={};function n(i){if(t[i])return t[i].exports;var l=t[i]={i:i,l:!1,exports:{}};return e[i].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(i,l,function(t){return e[t]}.bind(null,l));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=368)}({12:function(e,t){e.exports=jQuery},368:function(e,t,n){"use strict";n.r(t);var i=n(12);!function(e,t,n){var i,l,r,a,o,s=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i,c=/^(https?|ftp):\/\/[A-Z0-9.-]+\.[A-Z]{2,63}[^ "]*$/i,p={},u={},d="ontouchend"in document;function h(){return i?i.$('a[data-wplink-edit="true"]'):null}window.wpLink={timeToTriggerRiver:150,minRiverAJAXDuration:200,riverBottomThreshold:5,keySensitivity:100,lastSearch:"",textarea:"",modalOpen:!1,init:function(){p.wrap=e("#wp-link-wrap"),p.dialog=e("#wp-link"),p.backdrop=e("#wp-link-backdrop"),p.submit=e("#wp-link-submit"),p.close=e("#wp-link-close");var n=e('<div class="link-nofollow"><label><span> </span> <input type="checkbox" id="wp-link-nofollow"> <code>'+t.relCheckbox+'</code></label></div><div class="link-sponsored"><label><span> </span> <input type="checkbox" id="wp-link-sponsored"> <code>'+t.sponsoredCheckbox+"</code></label></div><h4>"+t.schemaMarkupLabel+'</h4><div class="link-is-about"><label><span> </span> <input type="checkbox" id="wp-link-about"> <code>'+t.aboutCheckbox+'</code></label></div><div class="link-is-mentions"><label><span> </span> <input type="checkbox" id="wp-link-mentions"> <code>'+t.mentionsCheckbox+"</code></label></div>"),i=e('<div class="wp-link-title-field"> <label><span>'+t.linkTitle+'</span> <input id="wp-link-title" type="text"></label></div>');n.insertAfter("#wp-link .link-target"),i.insertAfter("#wp-link .wp-link-text-field"),e("#wp-link .query-results").css("top","290px"),p.text=e("#wp-link-text"),p.url=e("#wp-link-url"),p.nonce=e("#_ajax_linking_nonce"),p.openInNewTab=e("#wp-link-target"),p.search=e("#wp-link-search"),p.nofollow=e("#wp-link-nofollow"),p.sponsored=e("#wp-link-sponsored"),p.about=e("#wp-link-about"),p.mentions=e("#wp-link-mentions"),p.title=e("#wp-link-title"),u.search=new o(e("#search-results")),u.recent=new o(e("#most-recent-results")),u.elements=p.dialog.find(".query-results"),p.queryNotice=e("#query-notice-message"),p.queryNoticeTextDefault=p.queryNotice.find(".query-notice-default"),p.queryNoticeTextHint=p.queryNotice.find(".query-notice-hint"),p.dialog.on("keydown",(function(e){return wpLink.keydown(e)})),p.dialog.on("keyup",(function(e){return wpLink.keyup(e)})),p.submit.on("click",(function(e){e.preventDefault(),wpLink.update()})),p.close.add(p.backdrop).add("#wp-link-cancel button").on("click",(function(e){e.preventDefault(),wpLink.close()})),u.elements.on("river-select",wpLink.updateFields),p.search.on("focus.wplink",(function(){p.queryNoticeTextDefault.hide(),p.queryNoticeTextHint.removeClass("screen-reader-text").show()})).on("blur.wplink",(function(){p.queryNoticeTextDefault.show(),p.queryNoticeTextHint.addClass("screen-reader-text").hide()})),p.search.on("keyup input",(function(){window.clearTimeout(l),l=window.setTimeout((function(){wpLink.searchInternalLinks()}),500)})),p.url.on("paste",(function(){setTimeout(wpLink.correctURL,0)})),p.url.on("blur",wpLink.correctURL)},correctURL:function(){var t=e.trim(p.url.val());t&&r!==t&&!/^(?:[a-z]+:|#|\?|\.|\/)/.test(t)&&(p.url.val("http://"+t),r=t)},open:function(t,n,l){var r,a=e(document.body);a.addClass("modal-open"),wpLink.modalOpen=!0,wpLink.range=null,t&&(window.wpActiveEditor=t),window.wpActiveEditor&&(this.textarea=e("#"+window.wpActiveEditor).get(0),void 0!==window.tinymce&&(a.append(p.backdrop,p.wrap),r=window.tinymce.get(window.wpActiveEditor),i=r&&!r.isHidden()?r:null),!wpLink.isMCE()&&document.selection&&(this.textarea.focus(),this.range=document.selection.createRange()),p.wrap.show(),p.backdrop.show(),wpLink.refresh(n,l),e(document).trigger("wplink-open",p.wrap))},isMCE:function(){return i&&!i.isHidden()},refresh:function(e,t){u.search.refresh(),u.recent.refresh(),wpLink.isMCE()?wpLink.mceRefresh(e,t):(p.wrap.hasClass("has-text-field")||p.wrap.addClass("has-text-field"),document.selection?document.selection.createRange().text||t||"":void 0!==this.textarea.selectionStart&&this.textarea.selectionStart!==this.textarea.selectionEnd&&(t=this.textarea.value.substring(this.textarea.selectionStart,this.textarea.selectionEnd)||t||""),p.text.val(t),wpLink.setDefaultValues()),d?p.url.focus().blur():window.setTimeout((function(){p.url[0].select(),p.url.focus()})),u.recent.ul.children().length||u.recent.ajax(),r=p.url.val().replace(/^http:\/\//,"")},hasSelectedText:function(e){var t,n,l,r=i.selection.getContent();if(/</.test(r)&&(!/^<a [^>]+>[^<]+<\/a>$/.test(r.trim())||-1===r.indexOf("href=")))return!1;if(e.length){if(!(n=e[0].childNodes)||!n.length)return!1;for(l=n.length-1;0<=l;l--)if(3!==(t=n[l]).nodeType&&!window.tinymce.dom.BookmarkManager.isBookmarkNode(t))return!1}return!0},mceRefresh:function(n,l){var r,a,o=h(),u=this.hasSelectedText(o);o.length?(r=o.text(),a=o.attr("href"),e.trim(r)||(r=l||""),n&&(c.test(n)||s.test(n))&&(a=n),"_wp_link_placeholder"!==a?(p.url.val(a),p.openInNewTab.prop("checked","_blank"===i.dom.getAttrib(o,"target")),p.nofollow.prop("checked",i.dom.getAttrib(o,"rel").includes("nofollow")),p.sponsored.prop("checked",i.dom.getAttrib(o,"rel").includes("sponsored")),p.about.prop("checked",i.dom.getAttrib(o,"data-schema-attribute").includes("about")),p.mentions.prop("checked",i.dom.getAttrib(o,"data-schema-attribute").includes("mentions")),p.title.val(i.dom.getAttrib(o,"title")),p.submit.val(t.update)):this.setDefaultValues(r),n&&n!==a?p.search.val(n):p.search.val(""),window.setTimeout((function(){wpLink.searchInternalLinks()}))):(r=i.selection.getContent({format:"text"})||l||"",this.setDefaultValues(r)),u?(p.text.val(r),p.wrap.addClass("has-text-field")):(p.text.val(""),p.wrap.removeClass("has-text-field"))},close:function(t){e(document.body).removeClass("modal-open"),wpLink.modalOpen=!1,"noReset"!==t&&(wpLink.isMCE()?(i.plugins.wplink&&i.plugins.wplink.close(),i.focus()):(wpLink.textarea.focus(),wpLink.range&&(wpLink.range.moveToBookmark(wpLink.range.getBookmark()),wpLink.range.select()))),p.backdrop.hide(),p.wrap.hide(),p.title.val(""),r=!1,e(document).trigger("wplink-close",p.wrap)},getAttrs:function(){wpLink.correctURL();var t=p.nofollow.prop("checked")?"nofollow":"";p.sponsored.prop("checked")&&(t=t?t+" sponsored":"sponsored");var n=p.about.prop("checked")?"about":"";p.mentions.prop("checked")&&(n=n?n+" mentions":"mentions");var i={href:e.trim(p.url.val()),target:p.openInNewTab.prop("checked")?"_blank":null,rel:t,"data-schema-attribute":n||null};return e.trim(p.title.val())&&(i.title=e.trim(p.title.val())),i},buildHtml:function(e){var t='<a href="'+e.href+'"';return e.target&&(t+=' target="'+e.target+'"'),e.rel&&(t+=' rel="'+e.rel+'"'),e.title&&(t+=' title="'+e.title+'"'),t+">"},update:function(){wpLink.isMCE()?wpLink.mceUpdate():wpLink.htmlUpdate()},htmlUpdate:function(){var i=wpLink.textarea;if(i){var l,r,a,o,s,c=wpLink.getAttrs(),u=document.createElement("a");if(u.href=c.href,"javascript:"!==u.protocol&&"data:"!==u.protocol||(c.href=""),c.href){l=wpLink.buildHtml(c);var d=p.text.val();document.selection&&wpLink.range?(i.focus(),wpLink.range.text=l+(d||wpLink.range.text)+"</a>",wpLink.range.moveToBookmark(wpLink.range.getBookmark()),wpLink.range.select(),wpLink.range=null):void 0!==i.selectionStart&&(r=i.selectionStart,a=i.selectionEnd,o=r+(l=l+(s=d||i.value.substring(r,a))+"</a>").length,r!==a||s||(o-=4),i.value=i.value.substring(0,r)+l+i.value.substring(a,i.value.length),i.selectionStart=i.selectionEnd=o),wpLink.close(),i.focus(),e(i).trigger("change"),n.a11y.speak(t.linkInserted)}}},mceUpdate:function(){var l,r,a,o,s=wpLink.getAttrs(),c=document.createElement("a");if(c.href=s.href,"javascript:"!==c.protocol&&"data:"!==c.protocol||(s.href=""),!s.href)return i.execCommand("unlink"),void wpLink.close();l=i.$(h()),i.undoManager.transact((function(){l.length||(i.execCommand("mceInsertLink",!1,{href:"_wp_link_placeholder","data-wp-temp-link":1}),l=i.$('a[data-wp-temp-link="1"]').removeAttr("data-wp-temp-link"),a=e.trim(l.text())),l.length?(p.wrap.hasClass("has-text-field")&&((r=p.text.val())?l.text(r):a||l.text(s.href)),s["data-wplink-edit"]=null,s["data-mce-href"]=null,s.hasOwnProperty("rel")&&!s.rel&&(s.rel=null),l.attr(s)):i.execCommand("unlink")})),wpLink.close("noReset"),i.focus(),l.length&&((o=l.parent("#_mce_caret")).length&&o.before(l.removeAttr("data-mce-bogus")),i.selection.select(l[0]),i.selection.collapse(),i.plugins.wplink&&i.plugins.wplink.checkLink(l[0])),i.nodeChanged(),p.title.val(""),n.a11y.speak(t.linkInserted)},updateFields:function(e,t){p.url.val(t.children(".item-permalink").val()),p.wrap.hasClass("has-text-field")&&!p.text.val()&&p.text.val(t.children(".item-title").text())},getUrlFromSelection:function(t){return t||(this.isMCE()?t=i.selection.getContent({format:"text"}):document.selection&&wpLink.range?t=wpLink.range.text:void 0!==this.textarea.selectionStart&&(t=this.textarea.value.substring(this.textarea.selectionStart,this.textarea.selectionEnd))),(t=e.trim(t))&&s.test(t)?"mailto:"+t:t&&c.test(t)?t.replace(/&amp;|&#0?38;/gi,"&"):""},setDefaultValues:function(e){p.url.val(this.getUrlFromSelection(e)),p.search.val(""),wpLink.searchInternalLinks(),p.submit.val(t.save)},searchInternalLinks:function(){var e,t=p.search.val()||"";if(2<t.length){if(u.recent.hide(),u.search.show(),wpLink.lastSearch===t)return;wpLink.lastSearch=t,e=p.search.parent().find(".spinner").addClass("is-active"),u.search.change(t),u.search.ajax((function(){e.removeClass("is-active")}))}else u.search.hide(),u.recent.show()},next:function(){u.search.next(),u.recent.next()},prev:function(){u.search.prev(),u.recent.prev()},keydown:function(e){var t;if(27===e.keyCode?(wpLink.close(),e.stopImmediatePropagation()):9===e.keyCode&&("wp-link-submit"!==(t=e.target.id)||e.shiftKey?"wp-link-close"===t&&e.shiftKey&&(p.submit.focus(),e.preventDefault()):(p.close.focus(),e.preventDefault())),!(e.shiftKey||38!==e.keyCode&&40!==e.keyCode||document.activeElement&&("link-title-field"===document.activeElement.id||"url-field"===document.activeElement.id))){var n=38===e.keyCode?"prev":"next";clearInterval(wpLink.keyInterval),wpLink[n](),wpLink.keyInterval=setInterval(wpLink[n],wpLink.keySensitivity),e.preventDefault()}},keyup:function(e){38!==e.keyCode&&40!==e.keyCode||(clearInterval(wpLink.keyInterval),e.preventDefault())},delayedCallback:function(e,t){var n,i,l,r;return t?(setTimeout((function(){if(i)return e.apply(r,l);n=!0}),t),function(){if(n)return e.apply(this,arguments);l=arguments,r=this,i=!0}):e}},o=function(t,n){var i=this;this.element=t,this.ul=t.children("ul"),this.contentHeight=t.children("#link-selector-height"),this.waiting=t.find(".river-waiting"),this.change(n),this.refresh(),e("#wp-link .query-results, #wp-link #link-selector").on("scroll",(function(){i.maybeLoad()})),t.on("click","li",(function(t){i.select(e(this),t)}))},e.extend(o.prototype,{refresh:function(){this.deselect(),this.visible=this.element.is(":visible")},show:function(){this.visible||(this.deselect(),this.element.show(),this.visible=!0)},hide:function(){this.element.hide(),this.visible=!1},select:function(e,t){if(!e.hasClass("unselectable")&&e!==this.selected){this.deselect(),this.selected=e.addClass("selected");var n=e.outerHeight(),i=this.element.height(),l=e.position().top,r=this.element.scrollTop();0>l?this.element.scrollTop(r+l):l+n>i&&this.element.scrollTop(r+l-i+n),this.element.trigger("river-select",[e,t,this])}},deselect:function(){this.selected&&this.selected.removeClass("selected"),this.selected=!1},prev:function(){var e;this.visible&&(this.selected&&(e=this.selected.prev("li")).length&&this.select(e))},next:function(){if(this.visible){var t=this.selected?this.selected.next("li"):e("li:not(.unselectable):first",this.element);t.length&&this.select(t)}},ajax:function(e){var t=this,n=1===this.query.page?0:wpLink.minRiverAJAXDuration,i=wpLink.delayedCallback((function(n,i){t.process(n,i),e&&e(n,i)}),n);this.query.ajax(i)},change:function(e){this.query&&this._search===e||(this._search=e,this.query=new a(e),this.element.scrollTop(0))},process:function(n,i){var l="",r=!0,a="",o=1===i.page;n?e.each(n,(function(){a=r?"alternate":"",a+=this.title?"":" no-title",l+=a?'<li class="'+a+'">':"<li>",l+='<input type="hidden" class="item-permalink" value="'+this.permalink+'" />',l+='<span class="item-title">',l+=this.title?this.title:t.noTitle,l+='</span><span class="item-info">'+this.info+"</span></li>",r=!r})):o&&(l+='<li class="unselectable no-matches-found"><span class="item-title"><em>'+t.noMatchesFound+"</em></span></li>"),this.ul[o?"html":"append"](l)},maybeLoad:function(){var e=this,t=this.element,n=t.scrollTop()+t.height();!this.query.ready()||n<this.contentHeight.height()-wpLink.riverBottomThreshold||setTimeout((function(){var n=t.scrollTop(),i=n+t.height();!e.query.ready()||i<e.contentHeight.height()-wpLink.riverBottomThreshold||(e.waiting.addClass("is-active"),t.scrollTop(n+e.waiting.outerHeight()),e.ajax((function(){e.waiting.removeClass("is-active")})))}),wpLink.timeToTriggerRiver)}}),a=function(e){this.page=1,this.allLoaded=!1,this.querying=!1,this.search=e},e.extend(a.prototype,{ready:function(){return!(this.querying||this.allLoaded)},ajax:function(t){var n=this,i={action:"wp-link-ajax",page:this.page,_ajax_linking_nonce:p.nonce.val()};this.search&&(i.search=this.search),this.querying=!0,e.post(window.ajaxurl,i,(function(e){n.page++,n.querying=!1,n.allLoaded=!e,t(e,i)}),"json")}}),e(document).ready(wpLink.init)}(n.n(i).a,window.wpLinkL10n,window.wp)}});