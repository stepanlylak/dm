// JavaScript Document
	var url, isplay,
		init = true,
		loader = 0,
		state = window.history.pushState !== undefined,
		handlerArtist = function(data) {
			arr = data.split("<!|!>");
			if(arr[0] !== undefined && arr[0] !== null && arr[0] !== '') window.document.title = arr[0];
			$("h1").html(arr[1]);
			$("div.results").html(arr[2]);
			additems($("div.results"));
			$("#string").removeClass("load");
			$('body,html').animate({scrollTop: 0}, 300);
			$("div.search").removeClass("fixedBarStart");
			$("div.top").css("margin-bottom", "0");
			if (isplay) {$("div.results > div > a[href='"+url+"']").parent().addClass("plays");}
			loader = 0;
			//upcounter(window.location.href, arr[0], document.referrer);
			newad();
		},
		handlerNextPage = function(data, oplink) {
			arr = data.split("<!|!>");
			$("a.nextpage").replaceWith(arr[0]);
			additems($("div.results"));
			if (isplay) {$("div.results > div > a[href='"+url+"']").parent().addClass("plays");}
			loader = 0;
			//upcounter(oplink, window.document.title, window.location.href);
			newad();
		},
		handlerPrevPage = function(data, oplink) {
			arr = data.split("<!|!>");
			$("a.prevpage").replaceWith(arr[2]);
			additems($("div.results"));
			if (isplay) {$("div.results > div > a[href='"+url+"']").parent().addClass("plays");}
			loader = 0;
			//upcounter(oplink, window.document.title, window.location.href);
			newad();
		},
		handlerLyrics = function (data, diving, oplink) {
			arr = data.split("<!|!>");
			diving.find("span.lyrics").html(arr[1]);
			diving.find("a.lyrics").unbind("click").click(function(){
				diving.find("span.lyrics").toggleClass("inv");
				return false;
			});
			//upcounter(oplink, arr[0], window.location.href);
			newad();
		};

		function newad () {
			temp = $("div.cbr1").html();
			$("div.cbr1").html(" ");
			$("div.cbr1").html(temp);
			temp = $("div.right").html();
			$("div.right").html(" ");
			$("div.right").html(temp);
		}



			$.address.state('').init(function() {
				$('span.title > a').address();
				$('a#codeint').address();
				$('a.logo').address();
				$('.genre a').address().bind('click', function() { if (jQuery(document).width() < 769) { $(".genre-padd").slideToggle(); } } );
			})
			.change(function(event) {

				var freeValue = $.address.state().replace(/^\/$/, '') + event.value;
				var value = '/ajax' + freeValue;

				$('.genre a').each(function() {
					if ($(this).attr('href') == freeValue) {
						$(this).addClass('selected');
					} else {
						$(this).removeClass('selected');
					}
				});

				if (state && init) {

					init = false;

				} else {
					$("#searchform").css("display", "block");
					hiding = 0;
					$('#string').addClass('load');
					$.ajax({
						url: value,
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							handlerArtist(XMLHttpRequest.responseText);
						},
						success: function(data, textStatus, XMLHttpRequest) {
							handlerArtist(data);
						}
					});
				}

			});

			function additems(obj) {
				obj.find("div.chkd").each(function(index) {

					$(this).find("a.link").click(function(){
						title = $(this).parent().find("span.title").text();
						
					});
                    
                    $(this).find("a.share").click(function(){
                        parentObj = $(this).parent();
                        shareTitle = parentObj.find("span.title").text();
                        sgareDomain = $("a.share").attr('data-domain');
                        shareTitleEncode = '%E2%99%AB%20'+encodeURIComponent(shareTitle);
                        shareLink = encodeURIComponent('http://'+ sgareDomain + '/?mp3=' + encodeURI(shareTitle));
                        appendCode =
                        '<span class="shareblock"><b title="закрыть">&times;</b><h1>Поделиться ссылкой на песню<br /><strong>'+shareTitle+'</strong></h1><span>'+
                        '<a class="vk" href="http://vk.com/share.php?url='+shareLink+'&title='+shareTitleEncode+'&description=&image=" target="_blank">ВКонтакте</a>'+
                        '<a class="fb" href="http://www.facebook.com/sharer.php?src=sp&u='+shareLink+'&t='+shareTitleEncode+'&description=&picture=" target="_blank">Facebook</a>'+
                        '<a class="tw" href="https://twitter.com/intent/tweet?text='+shareTitleEncode+'+'+shareLink+'+%23onlinesong+%23freemp3&source=webclient" target="_blank">Twitter</a>'+
                        '<a class="ok" href="http://www.odnoklassniki.ru/dk?st.cmd=addShare&st._surl='+shareLink+'" target="_blank">Одноклассники</a>'+
                        '<a class="mm" href="http://connect.mail.ru/share?url='+shareLink+'&title='+shareTitleEncode+'&description=&imageurl=" target="_blank">Мой Мир</a>'+
                        '<a class="gp" href="https://plus.google.com/share?url='+shareLink+'" target="_blank">Google Plus</a>'+
                        '</span><p>Все сервисы открываются в новом окне ;)</p></span>';
                        $("body").append(appendCode);
                        $("body").find("span.shareblock b").click(function(){ $(this).parent().remove(); });
                    });
                    
                    $("a.lyrics").on("click");

					$(this).find('.start').click(function(event){
						//$(this).parent();
						var excludes = $($(this).parent().find('span.title > a, a.link, span.lyrics, a.lyrics, a.share'), $(this));                   
						if (!$(event.target).is(excludes)){
							if ($(this).hasClass("plays")) {
								$("#pleer").jPlayer("pause");
								$(this).removeClass("plays").addClass("pausing");
							} else if ($(this).hasClass("pausing")) {
								$("#pleer").jPlayer("play");
								$(this).removeClass("pausing").addClass("plays");
							}else{
								url = $(this).parent().find("a.link").attr("href");
								title = $(this).parent().find("span.title").text();
								$("span.currentTrack").html(title);
								$("#pleer").jPlayer("setMedia", {mp3: urlInsertGetParam(url.replace("/file/", "/"), 'listen', 'true')}).jPlayer("play");

								$("div.results > div").removeClass("plays pausing");
								$(this).addClass("plays");

							}
						}
					}).hover(
						function () {
				
							

						
						}
					)

					//$("a.lyrics").attr("title", "Текст песни");
					//$("a.link").attr("title", "Скачать");

					$(this).find("span.title > a").click(function(){

							$("input#string").val($(this).text());
							$('a#codeint').attr('href', $(this).attr('href'));

					});



					$(this).find("a.lyrics").click(function(){
						diving = $(this).parent();
						diving.append($("<span/>", {"class": "lyrics",
										"html": $("<img/>", {"src": "/images/loading.gif"})
										}));
						linkvalue = $(this).attr("lid");
						value = '/ajax/?lid=' + linkvalue;
						$.ajax({
							url: value,
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								alert('Ошибка');
							},
							success: function(data, textStatus, XMLHttpRequest) {
								handlerLyrics(data, diving, 'http://'+document.domain);
							}
						});
						return false;
					});

				});

				obj.find("a.nextpage").unbind('click');
				obj.find("a.nextpage").click(function(event){
					$(this).addClass("load");
					linkvalue = $(this).attr("href");
					value = '/ajax' + linkvalue;
					$.ajax({
						url: value,
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							handlerNextPage(XMLHttpRequest.responseText, 'http://'+document.domain+linkvalue);
						},
						beforeSend: function(){
            				$('#preloader').html('<img src="/images/preloader.gif" />');
        				},
						success: function(data, textStatus, XMLHttpRequest) {
							$('#preloader').html('');
							handlerNextPage(data, 'http://'+document.domain+linkvalue);
						}
					});
					return false;
				});//.hover(function(){$(this).click()});
				
								
			
				/*
				var screenHeight = $(window).height();
				$(window).scroll(function(){
      				var scroll = $(this).scrollTop();
      				var divHeight = $("#trackAjax").height();
     				var totalHeight = screenHeight + scroll; 
      				var left = divHeight - totalHeight;
      				var page = 0;
      				if (left < 10)
      					loadTracks(done, page);
    				});
				*/
				
				
				obj.find("a.prevpage").click(function(event){

					$(this).addClass("load");
					linkvalue = $(this).attr("href");
					value = '/ajax' + linkvalue + '&action=prev';
					$.ajax({
						url: value,
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							handlerPrevPage(XMLHttpRequest.responseText, 'http://'+document.domain+linkvalue);
						},
						success: function(data, textStatus, XMLHttpRequest) {
							handlerPrevPage(data, 'http://'+document.domain+linkvalue);
						}
					});
					return false;
				});//.hover(function(){$(this).click()});

			}

	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
function loadTracks(done, page)
{
  	
}

	$(document).ready(
		function() {
					
			//Подгрузка треков инициализация
			var done = 1;
			var screenHeight = $(window).height();
				$(window).scroll(function(){
      				var scroll = $(this).scrollTop();
      				var divHeight = $("#trackAjax").height();
     				var totalHeight = screenHeight + scroll; 
      				var left = divHeight - totalHeight;
      				var page = 0;
      				if (left < 10)
      					loadTracks(done, page);
    				});		

			var vol = readCookie("volume");
			var scrolling = $(window).scrollTop();
			var hiding = 0;

			additems($("div.results"));

			$("#pleer").jPlayer( {
				cssSelectorAncestor: ".pleer",
				cssSelector: {
					play: ".play",
					pause: ".pause",
					seekBar: ".downloadBar",
					playBar: ".playBar",
					mute: ".mute",
					unmute: ".unmute",
					volumeBar: ".volumeBar",
					volumeBarValue: ".volume",
					currentTime: ".currentTime",
					duration: ".duration",
					repeat: ".repeat",
					repeatOff: ".repeatOff"
				},
				
				preload: "none",
            
				ready: function () {

					function change(obj) {
						url = obj.find("a.link").attr("href");
						title = obj.find("span.title").text();
						$("span.currentTrack").html(title);
						$("span.duration").text(obj.find("span.dur").text());
						if (isplay==1) {
							$("#pleer").jPlayer("setMedia", {
								mp3: urlInsertGetParam(url.replace("/file/", "/"), 'listen', 'true')
							}).jPlayer("play");
							isplay = 1;
						} else {
							$("#pleer").jPlayer("setMedia", {
								mp3: urlInsertGetParam(url.replace("/file/", "/"), 'listen', 'true')
							});
						}
					}

					object = $("div.results > div").eq(0);
					change (object);

					$("div.pleer a.trackBack").click( function () {
						if ($("div.results div > a[href='"+url+"']").parent().prev("div").is("div")) {
							$("div.results div > a[href='"+url+"']").parent().attr("class", "chkd");
							$("div.results div > a[href='"+url+"']").parent().prev("div").addClass("pausing");
							change($("div.results div > a[href='"+url+"']").parent().prev("div"));
						}
					});
					$("div.pleer a.trackForward").click( function () {
						if ($("div.results div > a[href='"+url+"']").parent().next("div").is("div")) {
							$("div.results div > a[href='"+url+"']").parent().attr("class", "chkd");
							//$("div.results div > a[href='"+url+"']").parent().next("div").addClass("pausing");
							change($("div.results div > a[href='"+url+"']").parent().next("div"));
						}
					});

				},
				play: function() {
					$("div.results div > a[href='"+url+"']").parent().addClass("plays");
					isplay = 1;
				},
				pause: function() {
					$("div.results > div.plays").removeClass("plays").addClass("pausing");
					isplay = 0;
				},
				ended: function() { // The $.jPlayer.event.ended event
					isplay = 0;
					$("div.results").find("div.plays, div.pausing").next().find('.start').click();
				},
				volumechange: function() { // $("#jpId").jPlayer("volume", 0.75);
					createCookie("volume", $(this).jPlayer("option", "volume"), 365);
					//alert($("div.search").outerHeight());
				},
				swfPath: "/plugins",
				supplied: "mp3",
				wmode: "window",
				volume: (vol>0?vol:0.5)
			});

			// var YaShareInstance = new Ya.share({
			// 									element: 'socseti',
			// 									theme: 'counter',
			// 									elementStyle: {
			// 										'type': 'none',
			// 										quickServices: ['vkontakte','odnoklassniki','facebook','moimir','twitter','gplus','yaru']
			// 									},
			// 									link: 'http://musicalka.net/',
			// 									title: 'Новинки Музыки 2015 / musicalka.net'
			// 								   });

		}
	);

var t = {};

t['%D0%B0']='%E0';t['%D0%B1']='%E1';t['%D0%B2']='%E2';t['%D0%B3']='%E3';t['%D0%B4']='%E4';
t['%D0%B5']='%E5';t['%D1%91']='%B8';t['%D0%B6']='%E6';t['%D0%B7']='%E7';t['%D0%B8']='%E8';
t['%D0%B9']='%E9';t['%D0%BA']='%EA';t['%D0%BB']='%EB';t['%D0%BC']='%EC';t['%D0%BD']='%ED';
t['%D0%BE']='%EE';t['%D0%BF']='%EF';t['%D1%80']='%F0';t['%D1%81']='%F1';t['%D1%82']='%F2';
t['%D1%83']='%F3';t['%D1%84']='%F4';t['%D1%85']='%F5';t['%D1%86']='%F6';t['%D1%87']='%F7';
t['%D1%88']='%F8';t['%D1%89']='%F9';t['%D1%8C']='%FC';t['%D1%8B']='%FB';t['%D1%8A']='%FA';
t['%D1%8D']='%FD';t['%D1%8E']='%FE';t['%D1%8F']='%FF';t['%D0%90']='%C0';t['%D0%91']='%C1';
t['%D0%92']='%C2';t['%D0%93']='%C3';t['%D0%94']='%C4';t['%D0%95']='%C5';t['%D0%81']='%A8';
t['%D0%96']='%C6';t['%D0%97']='%C7';t['%D0%98']='%C8';t['%D0%99']='%C9';t['%D0%9A']='%CA';
t['%D0%9B']='%CB';t['%D0%9C']='%CC';t['%D0%9D']='%CD';t['%D0%9E']='%CE';t['%D0%9F']='%CF';
t['%D0%A0']='%D0';t['%D0%A1']='%D1';t['%D0%A2']='%D2';t['%D0%A3']='%D3';t['%D0%A4']='%D4';
t['%D0%A5']='%D5';t['%D0%A6']='%D6';t['%D0%A7']='%D7';t['%D0%A8']='%D8';t['%D0%A9']='%D9';
t['%D0%AC']='%DC';t['%D0%AB']='%DB';t['%D0%AA']='%DA';t['%D0%AD']='%DD';t['%D0%AE']='%DE';
t['%D0%AF']='%DF';

t['%D1%94']='%BA'; t['%D0%84']='%AA';
t['%D1%96']='%B3'; t['%D0%86']='%B2';
t['%D1%97']='%BF'; t['%D0%87']='%AF';
t['%D2%91']='%B4'; t['%D2%90']='%A5';
t['%D1%91']='%B8'; t['%D0%81']='%A8';

function convert_to_cp1251(str) {
	var ret='';

	var l=str.length;
	var i=0;
	while (i<l) {

		var f=0;
		for (keyVar in t) {
			if (str.substring(i,i+6)==keyVar) {ret+=t[keyVar];i+=6;f=1;}
			}

			if (!f) {ret+=str.substring(i,i+1);i++;}
		}

		ret = ret.replace(RegExp('%20', 'g'), '+');
		ret = ret.replace(RegExp('%E2%80%93', 'g'), '-');
		ret = ret.replace(RegExp('%E2%80%94', 'g'), '-');

	return ret;
}

$("<img />").attr("src", '/images/loading.gif');


function urlInsertGetParam(url, key, value) {
	if(url.search(/\?/i) != -1)
		return url+'&'+key+'='+value;
	else
		return url+'?'+key+'='+value;
}


(function (b) {
    function I(a, d, e) {
        var c = this;
        return this.on("click.pjax", a, function (a) {
            var f = b.extend({}, l(d, e));
            f.container || (f.container = b(this).attr("data-pjax") || c);
            z(a, f)
        })
    }

    function z(a, d, e) {
        e = l(d, e);
        d = a.currentTarget;
        if ("A" !== d.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";
        if (!(1 < a.which || a.metaKey || a.ctrlKey || a.shiftKey || a.altKey || location.protocol !== d.protocol || location.hostname !== d.hostname || -1 < d.href.indexOf("#") && d.href.replace(/#.*/, "") == location.href.replace(/#.*/,
                "") || a.isDefaultPrevented())) {
            var c = {url: d.href, container: b(d).attr("data-pjax"), target: d};
            e = b.extend({}, c, e);
            c = b.Event("pjax:click");
            b(d).trigger(c, [e]);
            c.isDefaultPrevented() || (f(e), a.preventDefault(), b(d).trigger("pjax:clicked", [e]))
        }
    }

    function J(a, d, e) {
        e = l(d, e);
        d = a.currentTarget;
        var c = b(d);
        if ("FORM" !== d.tagName.toUpperCase())throw"$.pjax.submit requires a form element";
        c = {
            type: (c.attr("method") || "GET").toUpperCase(),
            url: c.attr("action"),
            container: c.attr("data-pjax"),
            target: d
        };
        if ("GET" !== c.type &&
            void 0 !== window.FormData) c.data = new FormData(d), c.processData = !1, c.contentType = !1; else {
            if (b(d).find(":file").length)return;
            c.data = b(d).serializeArray()
        }
        f(b.extend({}, c, e));
        a.preventDefault()
    }

    function f(a) {
        function d(a, d, c) {
            c || (c = {});
            c.relatedTarget = e;
            a = b.Event(a, c);
            h.trigger(a, d);
            return !a.isDefaultPrevented()
        }

        a = b.extend(!0, {}, b.ajaxSettings, f.defaults, a);
        b.isFunction(a.url) && (a.url = a.url());
        var e = a.target, c = t(a.url).hash, h = a.context = A(a.container);
        a.data || (a.data = {});
        b.isArray(a.data) ? a.data.push({
                name: "_pjax",
                value: h.selector
            }) : a.data._pjax = h.selector;
        var k;
        a.beforeSend = function (b, e) {
            "GET" !== e.type && (e.timeout = 0);
            b.setRequestHeader("X-PJAX", "true");
            b.setRequestHeader("X-PJAX-Container", h.selector);
            if (!d("pjax:beforeSend", [b, e]))return !1;
            0 < e.timeout && (k = setTimeout(function () {
                d("pjax:timeout", [b, a]) && b.abort("timeout")
            }, e.timeout), e.timeout = 0);
            var f = t(e.url);
            c && (f.hash = c);
            a.requestUrl = B(f)
        };
        a.complete = function (b, c) {
            k && clearTimeout(k);
            d("pjax:complete", [b, c, a]);
            d("pjax:end", [b, a])
        };
        a.error = function (b, c, e) {
            var f =
                C("", b, a);
            b = d("pjax:error", [b, c, e, a]);
            "GET" == a.type && "abort" !== c && b && u(f.url)
        };
        a.success = function (e, m, k) {
            var n = f.state, p = "function" === typeof b.pjax.defaults.version ? b.pjax.defaults.version() : b.pjax.defaults.version, l = k.getResponseHeader("X-PJAX-Version"), g = C(e, k, a), q = t(g.url);
            c && (q.hash = c, g.url = q.href);
            if (p && l && p !== l) u(g.url); else if (g.contents) {
                f.state = {
                    id: a.id || (new Date).getTime(),
                    url: g.url,
                    title: g.title,
                    container: h.selector,
                    fragment: a.fragment,
                    timeout: a.timeout
                };
                (a.push || a.replace) && window.history.replaceState(f.state,
                    g.title, g.url);
                if (b.contains(a.container, document.activeElement))try {
                    document.activeElement.blur()
                } catch (r) {
                }
                g.title && (document.title = g.title);
                d("pjax:beforeReplace", [g.contents, a], {state: f.state, previousState: n});
                h.html(g.contents);
                (n = h.find("input[autofocus], textarea[autofocus]").last()[0]) && document.activeElement !== n && n.focus();
                K(g.scripts);
                g = a.scrollTo;
                c && (n = decodeURIComponent(c.slice(1)), n = document.getElementById(n) || document.getElementsByName(n)[0]) && (g = b(n).offset().top);
                "number" == typeof g &&
                b(window).scrollTop(g);
                d("pjax:success", [e, m, k, a])
            } else u(g.url)
        };
        f.state || (f.state = {
            id: (new Date).getTime(),
            url: window.location.href,
            title: document.title,
            container: h.selector,
            fragment: a.fragment,
            timeout: a.timeout
        }, window.history.replaceState(f.state, document.title));
        D(f.xhr);
        f.options = a;
        var m = f.xhr = b.ajax(a);
        0 < m.readyState && (a.push && !a.replace && (L(f.state.id, E(h)), window.history.pushState(null, "", a.requestUrl)), d("pjax:start", [m, a]), d("pjax:send", [m, a]));
        return f.xhr
    }

    function M(a, d) {
        return f(b.extend({
            url: window.location.href,
            push: !1, replace: !0, scrollTo: !1
        }, l(a, d)))
    }

    function u(a) {
        window.history.replaceState(null, "", f.state.url);
        window.location.replace(a)
    }

    function F(a) {
        q || D(f.xhr);
        var d = f.state, e = a.state, c;
        if (e && e.container) {
            if (q && N == e.url)return;
            if (d) {
                if (d.id === e.id)return;
                c = d.id < e.id ? "forward" : "back"
            }
            var h = p[e.id] || [];
            a = b(h[0] || e.container);
            h = h[1];
            if (a.length) {
                if (d) {
                    var k = c, m = d.id, l = E(a);
                    p[m] = l;
                    "forward" === k ? (k = r, l = v) : (k = v, l = r);
                    k.push(m);
                    (m = l.pop()) && delete p[m];
                    w(k, f.defaults.maxCacheLength)
                }
                c = b.Event("pjax:popstate",
                    {state: e, direction: c});
                a.trigger(c);
                c = {
                    id: e.id,
                    url: e.url,
                    container: a,
                    push: !1,
                    fragment: e.fragment,
                    timeout: e.timeout,
                    scrollTo: !1
                };
                h ? (a.trigger("pjax:start", [null, c]), f.state = e, e.title && (document.title = e.title), d = b.Event("pjax:beforeReplace", {
                        state: e,
                        previousState: d
                    }), a.trigger(d, [h, c]), a.html(h), a.trigger("pjax:end", [null, c])) : f(c);
                a[0].offsetHeight
            } else u(location.href)
        }
        q = !1
    }

    function O(a) {
        var d = b.isFunction(a.url) ? a.url() : a.url, e = a.type ? a.type.toUpperCase() : "GET", c = b("<form>", {
            method: "GET" === e ? "GET" :
                "POST", action: d, style: "display:none"
        });
        "GET" !== e && "POST" !== e && c.append(b("<input>", {
            type: "hidden",
            name: "_method",
            value: e.toLowerCase()
        }));
        a = a.data;
        if ("string" === typeof a) b.each(a.split("&"), function (a, d) {
            var e = d.split("=");
            c.append(b("<input>", {type: "hidden", name: e[0], value: e[1]}))
        }); else if (b.isArray(a)) b.each(a, function (a, d) {
            c.append(b("<input>", {type: "hidden", name: d.name, value: d.value}))
        }); else if ("object" === typeof a)for (var f in a)c.append(b("<input>", {
            type: "hidden",
            name: f,
            value: a[f]
        }));
        b(document.body).append(c);
        c.submit()
    }

    function D(a) {
        a && 4 > a.readyState && (a.onreadystatechange = b.noop, a.abort())
    }

    function E(a) {
        var b = a.clone();
        b.find("script").each(function () {
            this.src || jQuery._data(this, "globalEval", !1)
        });
        return [a.selector, b.contents()]
    }

    function B(a) {
        a.search = a.search.replace(/([?&])(_pjax|_)=[^&]*/g, "");
        return a.href.replace(/\?($|#)/, "$1")
    }

    function t(a) {
        var b = document.createElement("a");
        b.href = a;
        return b
    }

    function l(a, d) {
        a && d ? d.container = a : d = b.isPlainObject(a) ? a : {container: a};
        d.container && (d.container = A(d.container));
        return d
    }

    function A(a) {
        a = b(a);
        if (a.length) {
            if ("" !== a.selector && a.context === document)return a;
            if (a.attr("id"))return b("#" + a.attr("id"));
            throw"cant get selector for pjax container!";
        }
        throw"no pjax container for " + a.selector;
    }

    function x(a, b) {
        return a.filter(b).add(a.find(b))
    }

    function C(a, d, e) {
        var c = {}, f = /<html/i.test(a);
        d = d.getResponseHeader("X-PJAX-URL");
        c.url = d ? B(t(d)) : e.requestUrl;
        f ? (d = b(b.parseHTML(a.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0], document, !0)), a = b(b.parseHTML(a.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0],
                document, !0))) : d = a = b(b.parseHTML(a, document, !0));
        if (0 === a.length)return c;
        c.title = x(d, "title").last().text();
        e.fragment ? (f = "body" === e.fragment ? a : x(a, e.fragment).first(), f.length && (c.contents = "body" === e.fragment ? f : f.contents(), c.title || (c.title = f.attr("title") || f.data("title")))) : f || (c.contents = a);
        c.contents && (c.contents = c.contents.not(function () {
            return b(this).is("title")
        }), c.contents.find("title").remove(), c.scripts = x(c.contents, "script[src]").remove(), c.contents = c.contents.not(c.scripts));
        c.title &&
        (c.title = b.trim(c.title));
        return c
    }

    function K(a) {
        if (a) {
            var d = b("script[src]");
            a.each(function () {
                var a = this.src;
                if (!d.filter(function () {
                        return this.src === a
                    }).length) {
                    var c = document.createElement("script"), f = b(this).attr("type");
                    f && (c.type = f);
                    c.src = b(this).attr("src");
                    document.head.appendChild(c)
                }
            })
        }
    }

    function L(a, b) {
        p[a] = b;
        r.push(a);
        w(v, 0);
        w(r, f.defaults.maxCacheLength)
    }

    function w(a, b) {
        for (; a.length > b;)delete p[a.shift()]
    }

    function P() {
        return b("meta").filter(function () {
            var a = b(this).attr("http-equiv");
            return a && "X-PJAX-VERSION" === a.toUpperCase()
        }).attr("content")
    }

    function G() {
        b.fn.pjax = I;
        b.pjax = f;
        b.pjax.enable = b.noop;
        b.pjax.disable = H;
        b.pjax.click = z;
        b.pjax.submit = J;
        b.pjax.reload = M;
        b.pjax.defaults = {
            timeout: 650,
            push: !0,
            replace: !1,
            type: "GET",
            dataType: "html",
            scrollTo: 0,
            maxCacheLength: 20,
            version: P
        };
        b(window).on("popstate.pjax", F)
    }

    function H() {
        b.fn.pjax = function () {
            return this
        };
        b.pjax = O;
        b.pjax.enable = G;
        b.pjax.disable = b.noop;
        b.pjax.click = b.noop;
        b.pjax.submit = b.noop;
        b.pjax.reload = function () {
            window.location.reload()
        };
        b(window).off("popstate.pjax", F)
    }

    var q = !0, N = window.location.href, y = window.history.state;
    y && y.container && (f.state = y);
    "state" in window.history && (q = !1);
    var p = {}, v = [], r = [];
    0 > b.inArray("state", b.event.props) && b.event.props.push("state");
    b.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/);
    b.support.pjax ? G() : H()
})(jQuery);
