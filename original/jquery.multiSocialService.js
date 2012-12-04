/**
 * Multi Social Service Plugin
 * 
 * This Plugin is connect your site to social service.
 *
 * [Support Social Service]
 *  + Hatena Bookmark
 *  + Twitter
 *  + Facebook
 *  + Evernote
 *  + mixi check
 *  + mixi like
 *  + gree like
 *  + Google +1
 *  + tumblr(comming soon...)
 * 
 * @author   Ryosuke Sawada as manji6 <http://manjiro.net>
 * @requires jQuery
 * @license  MIT licence
 *
 **/

/**
 * secure encodeURIComponent
 * 
 * @param {String} url
 **/
function encodeURIComponentRFC3986(str) {
	return encodeURIComponent(str).
		replace(/[!*'()]/g, function(p){
			return "%" + p.charCodeAt(0).toString(16);
		});
}

/**
 * multiSocialService setting object
 *
 */
jQuery.multiSocialService = {
	url:encodeURIComponentRFC3986(location.href),
	useService:['twitter','facebookLike','hatenaBookmark','evernoteClip','mixiLike','greeLike'],
	enableTracking: false,
	hatenaBookmark: {
		type:"horizontal"
	},
	twitter: {
		tweet:{
			type:'horizontal',
			lang:'',
			text:'',
			via:''
		},
		follow:{
			user:'',
			'data-button':'',
			'data-text-color':'',
			'data-link-color':'',
			'show_count': 'true',
			'lang': 'ja'
		},
		tweetLite:{
			'text': '',
			'via': ''
		}
	},
	facebook: {
		like: {
			type:'button_count',
			show_faces:'false',
			color:'light',
			width:100,
			height:23,
			lang:'',
			send: 'false',
			ogp: {
				title: document.title,
				image: '',
				description: '',
				app_id: '',
				type: "blog",
				site_name: ''
			}
		},
		likeLite: {
		},
		comments: {
			num_posts: "3",
			width: "500",
			app_id: ''
		}
	},
	evernote: {
		clip: {
			targetId: 'container',
			name:'',
			tag: '',
			url: '',
			noteTitle: $("title").text()
		}
	},
	mixi: {
		check: {
			'data-key':'',
			'data-url':'',
			'data-button':'button-1'
		},
		like: {
			href:'',
			service_key:'',
			width:"450",
			height:"80",
			show_faces:"false"
		}
	},
	gree: {
		like: {
			href:'',
			service_key:'',
			type:0,
			height:20
		}
	},
	google:{
		plus1: {
			lang: "ja",
			callback:'',
			count:true,
			size:''
		}
	}
}

jQuery.fn.setMultiSocialService = function(option){

	var sInsertHtml = "<div class='multiSocialService-container'><ul class='multiSocialService-list' style='list-style-type:none'>";
	for(var i=0,len=jQuery.multiSocialService.useService.length; i<len; i++){
		switch(jQuery.multiSocialService.useService[i]){
			case "hatenaBookmark":
				sInsertHtml += '<li class="multiSocialService-hatenaBookmark">'+jQuery("<li />").setHatenaBookmark(jQuery.multiSocialService.hatenaBookmark).html()+'</li>';
				break;
			case "twitter":
				sInsertHtml += '<li class="multiSocialService-twitter">'+jQuery("<li />").setTwitter(jQuery.multiSocialService.twitter.tweet).html()+'</li>';
				break;
			case "facebookLike":
				sInsertHtml += '<li class="multiSocialService-facebookLike">'+jQuery("<li />").setFacebookLike(jQuery.multiSocialService.facebook.like).html()+'</li>';
				break;
			case "evernoteClip":
				sInsertHtml += '<li class="multiSocialService-evernoteClip">'+jQuery("<li />").setEvernoteClip(jQuery.multiSocialService.evernote.clip).html()+'</li>';
				break;
			case "mixiCheck":
				sInsertHtml += '<li class="multiSocialService-mixiCheck">'+jQuery("<li />").setMixiCheck(jQuery.multiSocialService.mixi.check).html()+'</li>';
				break;
			case "mixiLike":
				sInsertHtml += '<li class="multiSocialService-mixiLike">'+jQuery("<li />").setMixiLike(jQuery.multiSocialService.mixi.like).html()+'</li>';
				break;
			case "greeLike":
				sInsertHtml += '<li class="multiSocialService-greeLike">'+jQuery("<li />").setGreeLike(jQuery.multiSocialService.gree.like).html()+'</li>';
				break;
			case "googlePlus1":
				sInsertHtml += '<li class="multiSocialService-googlePlus1">'+jQuery("<li />").setGooglePlus1(jQuery.multiSocialService.google.plus1).html()+'</li>';
				break;
		}
	}
	sInsertHtml += '</ul></div>';

	$(this).html($(sInsertHtml).find("li").css("display","inline").end().html());
	return this;
}


/**
 *
 * common initialize process
 * (ex.xss countermeasure)
 **/
jQuery.multiSocialService.initialize = function(option){

	//xss countermeasure(url sanitize)
	if(typeof option === 'string'){
		option = encodeURIComponentRFC3986(decodeURIComponent(option));
	}else{
		option.url = encodeURIComponentRFC3986(decodeURIComponent(option.url));
	}
	return option;
}

/**
 * set HatenaBookmark
 * 
 * @param {Object} option setting object
 */
jQuery.fn.setHatenaBookmark = function(option){

	option = jQuery.multiSocialService.initialize(jQuery.extend(true,{},jQuery.multiSocialService.hatenaBookmark,option));

	var htmlHatenaBookmark = '\
							 <a href="http://b.hatena.ne.jp/entry/'+jQuery.multiSocialService.url+'" \
							 class="hatena-bookmark-button" data-hatena-bookmark-layout="'+option.type+'" \
							 title="このエントリーをはてなブックマークに追加">\
							 <img src="http://b.st-hatena.com/images/entry-button/button-only.gif" \
							 alt="このエントリーをはてなブックマークに追加" width="20" height="20" \
							 style="border: none;" />\
							 </a>\
							 <script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>';

	$(this).html(htmlHatenaBookmark);
	return this;
}


// =====================================================================
// Twitter 
// =====================================================================
/**
 * set Twitter tweet button
 * 
 * @param {Object} option setting object
 */
jQuery.fn.setTwitter = function(option){

	option = jQuery.extend(true,{},jQuery.multiSocialService.twitter.tweet,option);

	// set url
	if(!($.type(option.url) === 'string' && option.url.length > 0)){
		option.url = jQuery.multiSocialService.url;
	}else{
		option.url = encodeURIComponentRFC3986(option.url);
	}

	var htmlTweetButton = '\
						<a href="http://twitter.com/share" data-url="'+option.url+'" \
						class="twitter-share-button" data-count="'+option.type+'" data-via="'+option.via+'" \
						data-text="'+option.text+'" data-lang="'+option.lang+'">Tweet</a><script type="text/javascript"\
						src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>';

	$(this).html(htmlTweetButton);

	jQuery.multiSocialService.tracking('twitter',option.url);
	return this;

}

/**
 * set Twitter follow button
 * 
 * @param {Object} option setting object
 */
jQuery.fn.setTwitterFollow = function(option){

	option = jQuery.multiSocialService.initialize(jQuery.extend(true,{},jQuery.multiSocialService.twitter.follow,option));


	var htmlFollowButton = '\
		<a href="https://twitter.com/'+option.user+'" class="twitter-follow-button" \
		data-show-count="'+option.show_count+'" data-button="'+option['data-button']+'"\
		data-text-color="'+option['data-text-color']+'" data-link-color="'+option['data-link-color']+'" \
		data-lang="'+option.lang+'">follow</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>';

	$(this).html(htmlFollowButton);
	return this;

}

/**
 * set Twitter "Tweet" dialog event
 * (this is deprecated method.)
 * 
 * @param {object}  option setting object
 */
jQuery.fn.setTwitterTweetLite = function(option){

	option = jQuery.extend(true,{},jQuery.multiSocialService.twitter.tweetLite,option);

	// set url
	if(!($.type(option.url) === 'string' && option.url.length > 0)){
		option.url = jQuery.multiSocialService.url;
	}else{
		option.url = encodeURIComponentRFC3986(option.url);
	}


	$(this).click(function(){
		window.open("https://twitter.com/intent/tweet?"+(option.text !== '' ? 'text='+encodeURIComponentRFC3986(option.text) : '')+"&url="+option.url+(option.via !== '' ? '&via='+option.via : ''), "", "toolbar=0, status=0, width=650, height=360");

		if(jQuery.multiSocialService.enableTracking === true){
			_gaq.push(['_trackSocial', 'twitter', 'tweet']);
		}

	});

}

/**
 *
 * get Twitter "Tweet Count"
 *
 * @param {object} option setting object(url,callback)
 */
jQuery.getTwitterTweetCount = function(option){

	// @param {String} s_url          取得先URL
	// if url is not set, use "location.href"(current location)
	var s_url = (jQuery.type(option.url) === 'string' ? option.url : decodeURIComponent(jQuery.multiSocialService.url));
	
	// get Tweet count(load json)
	jQuery.ajax({
		url: 'http://cdn.api.twitter.com/1/urls/count.json',
		data: {
			'url': s_url
		},
		dataType: 'jsonp',
		cache: false,
		success: function(data){
			option.callback.call(this,data);
		}
	});
};




// =====================================================================
// Facebook
// =====================================================================
/**
 * set Facebook like button
 * 
 * @param {Object} option setting object
 */
jQuery.fn.setFacebookLike = function(option){

	//extended option.
	option = jQuery.extend(true,{},jQuery.multiSocialService.facebook.like,option);

	if(option.lang === 'en'){
		option.lang = 'locale=en_US&';
	}

	if($("meta").filter(function(){return $(this).attr("property") === "fb:app_id";}).attr("content") !== undefined){
		option.ogp.app_id = $("meta").filter(function(){return $(this).attr("property") === "fb:app_id";}).attr("content");
	}

	//set tag "meta" for OGP
	if(option.ogp.app_id){
		$("head").append("<meta property='fb:app_id' content='"+option.ogp.app_id+"' />");

		var sHtmlBodyTop = '';
		sHtmlBodyTop +='<div id="fb-root"></div>';
		sHtmlBodyTop +='<script>(function(d, s, id) {';
			sHtmlBodyTop +='  var js, fjs = d.getElementsByTagName(s)[0];';
			sHtmlBodyTop +='  if (d.getElementById(id)) {return;}';
			sHtmlBodyTop +='  js = d.createElement(s); js.id = id;';
			sHtmlBodyTop +='  js.src = "//connect.facebook.net/ja_JP/all.js#xfbml=1&appId='+option.ogp.app_id+'";';
			sHtmlBodyTop +='  fjs.parentNode.insertBefore(js, fjs);';
			sHtmlBodyTop +='}(document, "script", "facebook-jssdk"));</script>';


		$('body').append(sHtmlBodyTop);
		$('html').attr("xmlns:fb","http://ogp.me/ns/fb#");

		var sHtmlFacebookLikeButton = '';
		sHtmlFacebookLikeButton +='<fb:like href="'+encodeURIComponent(jQuery.multiSocialService.url)+'"';
		sHtmlFacebookLikeButton +='send="'+option.send+'"';
		sHtmlFacebookLikeButton +='layout="'+option.type+'"';
		sHtmlFacebookLikeButton +='width="'+option.width+'"';
		sHtmlFacebookLikeButton +='show_faces="'+option.show_faces+'"';
		sHtmlFacebookLikeButton +='></fb:like>';

		$(this).html(sHtmlFacebookLikeButton);

	}else{
		var htmlFacebookLikeButton = "<iframe src='http://www.facebook.com/plugins/like.php?"+option.lang+"\
			app_id="+option.ogp.app_id+"\
			&href="+encodeURIComponent(jQuery.multiSocialService.url)+"\
			&amp;layout="+option.type+"\
			&amp;show_faces="+option.show_faces+"\
			&amp;width=450&amp;action=like&amp;font\
			&amp;colorscheme="+option.color+"\
			&amp;height=21' scrolling='no' frameborder='0' style='border:none; overflow:hidden; \
			width:"+option.width+"px; height:"+option.height+"px;' allowTransparency='true'></iframe>";
		$(this).html(htmlFacebookLikeButton);
	}

	jQuery.multiSocialService.tracking('facebook',option.url);
	
	return this;
}


/**
 * set Facebook comments
 * 
 * @param {Object} option setting object
 */
jQuery.fn.setFacebookComments = function(option){
	//extended option.
	option = jQuery.extend(true,{},jQuery.multiSocialService.facebook.comments,option);

	if($("meta").filter(function(){return $(this).attr("property") === "fb:app_id";}).attr("content") !== undefined){
		option.app_id = $("meta").filter(function(){return $(this).attr("property") === "fb:app_id";}).attr("content");
	}

	//set tag app_id
	if(!option.app_id){
		return false;
	}

	var sHtmlBodyTop = '';
	sHtmlBodyTop +='<div id="fb-root"></div>';
	sHtmlBodyTop +='<script>(function(d, s, id) {';
		sHtmlBodyTop +='  var js, fjs = d.getElementsByTagName(s)[0];';
		sHtmlBodyTop +='  if (d.getElementById(id)) {return;}';
		sHtmlBodyTop +='  js = d.createElement(s); js.id = id;';
		sHtmlBodyTop +='  js.src = "//connect.facebook.net/ja_JP/all.js#xfbml=1&appId='+option.app_id+'";';
		sHtmlBodyTop +='  fjs.parentNode.insertBefore(js, fjs);';
		sHtmlBodyTop +='}(document, "script", "facebook-jssdk"));</script>';

	$('body').append(sHtmlBodyTop);
	$('html').attr("xmlns:fb","http://ogp.me/ns/fb#");

	var sHtmlFacebookComments = '';
	sHtmlFacebookComments +='<fb:comments href="'+encodeURIComponent(jQuery.multiSocialService.url)+'"';
	sHtmlFacebookComments +='num_posts="'+option.num_posts+'"';
	sHtmlFacebookComments +='width="'+option.width+'"';
	sHtmlFacebookComments +='></fb:comments>';

	$(this).html(sHtmlFacebookComments);

	return this;
}


/**
 * set facebook "Like" dialog event
 * (this is deprecated method.)
 * 
 * @param {object}  option setting object
 */
jQuery.fn.setFacebookLikeLite = function(option){

	option = jQuery.extend(true,{},jQuery.multiSocialService.facebook.likeLite,option);

	// set url
	if(!($.type(option.url) === 'string' && option.url.length > 0)){
		option.url = jQuery.multiSocialService.url;
	}else{
		option.url = encodeURIComponentRFC3986(option.url);
	}


	$(this).click(function(){
		window.open("http://www.facebook.com/sharer.php?u="+option.url+"", "", "toolbar=0, status=0, width=900, height=500");
		
		if(jQuery.multiSocialService.enableTracking === true){
			_gaq.push(['_trackSocial', 'facebook', 'like']);
		}
	});

}

/**
 *
 * get Facebook "Like Count"
 *
 * @param {object} option setting object(url,callback)
 *
 * callback function argument > arg:{"id": url, "shares": Like(Share) count, "comments": Comments count}
 */
jQuery.getFacebookCount = function(option){

	// @param {String} s_url          取得先URL
	// if url is not set, use "location.href"(current location)
	var s_url = (jQuery.type(option.url) === 'string' ? option.url : decodeURIComponent(jQuery.multiSocialService.url));
	
	// get Tweet count(load json)
	jQuery.ajax({
		url: 'http://graph.facebook.com/'+s_url,
		dataType: 'jsonp',
		cache: false,
		success: function(data){
			option.callback.call(this,data);
		}
	});
};

/**
 * set EvernoteClip
 * 
 * @param {Object} option setting object
 */
jQuery.fn.setEvernoteClip = function(option){

	option = jQuery.extend(true,{},jQuery.multiSocialService.evernote.clip,option);

	var htmlEvernoteClip = '<script type="text/javascript" src="http://static.evernote.com/noteit.js" charset="utf-8"></script><a href="#" onclick="Evernote.doClip({contentId:\''+option.targetId+'\',providerName:\''+option.name+'\',url:\''+option.url+'\',suggestTags:\''+option.tag+'\',title:\''+option.noteTitle+'\'}); return false;"><img src="http://static.evernote.com/article-clipper-jp.png" alt="Clip to Evernote" /></a>';

	$(this).html(htmlEvernoteClip);
	return this;
}

/**
 * set mixi check button
 *
 * @param {Object} option parameter setting object
 */
jQuery.fn.setMixiCheck = function(option){

	option = jQuery.extend(true,{},jQuery.multiSocialService.mixi.check,option);

	//if use "mixi like" button, required service_key.
	if(option.data_key === ''){
		alert('plase set data_key.');
		return false;
	}


	var htmlMixiCheck = '<a href="http://mixi.jp/share.pl" class="mixi-check-button" data-key="'+option['data-key']+'" data-url="'+option['data-url']+'" data-button="'+option['data-button']+'">mixiチェック</a>\
						<script type="text/javascript" src="http://static.mixi.jp/js/share.js" charset="utf-8"></script>\
						';

	$(this).html(htmlMixiCheck);

	return this;
}


/**
 * set mixi like button
 *
 * @param {Object} option parameter setting object
 */
jQuery.fn.setMixiLike = function(option){

	option = jQuery.extend(true,jQuery.multiSocialService.mixi.like,option);
	option.href = jQuery.multiSocialService.url;

	//if use "mixi like" button, required service_key.
	if(option.service_key === ''){
		alert("plase set service_key.");
		return false;
	}

	var htmlMixiLike = '<iframe src="http://plugins.mixi.jp/favorite.pl?'+$.param(option)+'" \
					   scrolling="no" frameborder="0" allowTransparency="true" style="border:0; overflow:hidden; width:'+option.width+'px; height:'+option.height+'px;"></iframe>';

	$(this).html(htmlMixiLike);

	return this;
}


/**
 * set gree like button
 *
 * @param {Object} option parameter setting object
 */
jQuery.fn.setGreeLike = function(option){

	option = jQuery.extend(true,{},jQuery.multiSocialService.gree.like,option);
	option.href = jQuery.multiSocialService.url;

	var htmlGreeLike = '<iframe src="http://share.gree.jp/share?url='+option.href+'&type='+option.type+'&height='+option.height+'" \
					   scrolling="no" frameborder="0" marginwidth="0" marginheight="0" style="border:none; overflow:hidden; \
					   width:100px; height:'+option.height+'px;" allowTransparency="true">\
					   </iframe>';

	$(this).html(htmlGreeLike);

	return this;
}

/**
 * set google +1 button
 *
 * @param {Object} option parameter setting object
 **/
jQuery.fn.setGooglePlus1 = function(option){

	option = jQuery.extend(true, {}, jQuery.multiSocialService.google.plus1,option);
	// set url
	if(!($.type(option.url) === 'string' && option.url.length > 0)){
		option.url = jQuery.multiSocialService.url;
	}else{
		option.url = encodeURIComponentRFC3986(option.url);
	}

	var htmlGooglePlus1 = [];
	var sHtmlGooglePlus1 = '';
	sHtmlGooglePlus1 +='<script type="text/javascript" src="https://apis.google.com/js/plusone.js" charset="utf-8">{lang: "'+option.lang+'"}</script>';
	sHtmlGooglePlus1 +='<g:plusone size="'+option.size+'" count="'+option.count+'" href="'+option.url+'" callback="'+option.callback+'"></g:plusone>';
	$(this).html(sHtmlGooglePlus1);

	return this;
}


/**
 * set OpenGraphProtocol
 *
 * @param {Object} option Parameter setting object
 **/
jQuery.setOGP = function(option){

	option = jQuery.extend(true,{},{
		title: document.title
	},option);

	var sHtmlOGP = '';

	//set tag "meta" for OGP
	sHtmlOGP +="<meta property='og:title' content='"+option.title+"' />";
	sHtmlOGP +="<meta property='og:url' content='"+jQuery.multiSocialService.url+"' />";
	if(option.image){
		sHtmlOGP +="<meta property='og:image' content='"+option.image+"' />";
	}
	if(option.description){
		sHtmlOGP +="<meta property='og:description' content='"+option.description+"' />";
	}
	if(option.type){
		sHtmlOGP +="<meta property='og:type' content='"+option.type+"' />";
	}
	if(option.site_name){
		sHtmlOGP +="<meta property='og:site_name' content='"+option.site_name+"' />";
	}

	$("head").append(sHtmlOGP);
}

/**
 * tracking
 *
 * @param {String} media tracking media
 * @param {String} url   target url
 */
jQuery.multiSocialService.tracking = function(media,url){

	if(jQuery.multiSocialService.enableTracking !== true && jQuery.type(_gaq) === 'undefined'){
		return true;
	}

	if(media === 'facebook'){
		fb = window.setInterval(function(){
			if (typeof FB !== 'undefined') {
				FB.Event.subscribe('edge.create', function(targetUrl) {
					_gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
				});
				FB.Event.subscribe('edge.remove', function(targetUrl) {
					_gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl]);
				});
				FB.Event.subscribe('message.send', function(targetUrl) {
					_gaq.push(['_trackSocial', 'facebook', 'send', targetUrl]);
				});
				clearInterval(fb);
			}
		},1000);

	}else if(media === 'twitter'){
		tw = window.setInterval(function(){
			if (typeof twttr !== 'undefined') {
				twttr.events.bind('tweet', function(event) {
					if (event) {
						_gaq.push(['_trackSocial', 'twitter', 'tweet']);
					}
				});
				clearInterval(tw);
			}
		},1000);
	}
}
