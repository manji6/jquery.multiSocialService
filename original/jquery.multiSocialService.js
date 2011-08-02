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
 * multiSocialService setting object
 *
*/
jQuery.multiSocialService = {
	url:location.href,
	useService:['twitter','facebookLike','hatenaBookmark','evernoteClip','mixiLike','greeLike'],
	hatenaBookmark: {
		type:"horizontal"
	},
	twitter: {
		type:'horizontal',
		lang:'',
		text:'',
		via:''
	},
	facebook: {
		like: {
			type:'button_count',
			show_faces:'false',
			color:'light',
			width:100,
			height:23,
			lang:'',
			ogp: {
				title: document.title,
				image: "",
				description: "",
				app_id: "",
				type: "blog",
				site_name: ""
			}
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
			href:"",
			service_key:"",
			width:"450",
			height:"80",
			show_faces:"false"
		}
	},
	gree: {
		like: {
			href:"",
			service_key:"",
			type:0,
			height:20
		}
	},
	google:{
		plus1: {
			lang: "ja",
			callback:"",
			count:true,
			size:""
		}
	},
	tumblr: {
		url:"",
		setType:"link",
		type:"vertical",
		title:document.title,
		description:$("meta:[name^='description']").attr("content")
	}
}

jQuery.fn.setMultiSocialService = function(option){

	var sInsertHtml = "<div class='multiSocialService-container'><ul class='multiSocialService-list' style='list-style-type:none'>";
	for(i in jQuery.multiSocialService.useService){
		switch(jQuery.multiSocialService.useService[i]){
			case "hatenaBookmark":
				sInsertHtml += '<li class="multiSocialService-hatenaBookmark">'+jQuery("<li />").setHatenaBookmark(jQuery.multiSocialService.hatenaBookmark).html()+'</li>';
			break;
			case "twitter":
				sInsertHtml += '<li class="multiSocialService-twitter">'+jQuery("<li />").setTwitter(jQuery.multiSocialService.twitter).html()+'</li>';
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
/*
//TODO comming soon.
case "tumblr":
sInsertHtml += '<li class="multiSocialService-tumblr">'+jQuery("<li />").setTumblr(jQuery.multiSocialService.tumblr).html()+'</li>';
break;
*/
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

/**
 * set Twitter tweet button
 * 
 * @param {Object} option setting object
*/
jQuery.fn.setTwitter = function(option){

	option = jQuery.multiSocialService.initialize(jQuery.extend(true,{},jQuery.multiSocialService.twitter,option));


	var htmlTweetButton = '<a href="http://twitter.com/share" data-url="'+jQuery.multiSocialService.url+'" class="twitter-share-button" data-count="'+option.type+'" data-via="'+option.via+'" data-text="'+option.text+'" data-lang="'+option.lang+'">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>';

	$(this).html(htmlTweetButton);
	return this;

}


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

	//set tag "meta" for OGP
	if(option.ogp.app_id){
		$("head").append("<meta property='fb:app_id' content='"+option.ogp.app_id+"' />");
	}

	//attachment-post-thumbnail

	var htmlFacebookLikeButton = "<iframe src='http://www.facebook.com/plugins/like.php?"+option.lang+"app_id="+option.ogp.app_id+"&href="+encodeURIComponent(jQuery.multiSocialService.url)+"&amp;layout="+option.type+"&amp;show_faces="+option.show_faces+"&amp;width=450&amp;action=like&amp;font&amp;colorscheme="+option.color+"&amp;height=21' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:"+option.width+"px; height:"+option.height+"px;' allowTransparency='true'></iframe>";

	$(this).html(htmlFacebookLikeButton);

	return this;
}


/**
 * set EvernoteClip
 * 
 * @param {Object} option setting object
*/
jQuery.fn.setEvernoteClip = function(option){

	option = jQuery.extend(true,{},jQuery.multiSocialService.evernote.clip,option);

	var htmlEvernoteClip = '<script type="text/javascript" src="http://static.evernote.com/noteit.js"></script><a href="#" onclick="Evernote.doClip({contentId:\''+option.targetId+'\',providerName:\''+option.name+'\',url:\''+option.url+'\',suggestTags:\''+option.tag+'\',title:\''+option.noteTitle+'\'}); return false;"><img src="http://static.evernote.com/article-clipper-jp.png" alt="Clip to Evernote" /></a>';

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
	<script type="text/javascript" src="http://static.mixi.jp/js/share.js"></script>\
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
	if(option.service_key === ""){
		alert("plase set service_key.");
		return false;
	}

	var htmlMixiLike = '<iframe src="http://plugins.mixi.jp/favorite.pl?'+$.param(option)+'" \
	scrolling="no" frameborder="0"\ allowTransparency="true" style="border:0; overflow:hidden; width:'+option.width+'px; height:'+option.height+'px;"></iframe>\
	';

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

	var htmlGooglePlus1 = [];
	htmlGooglePlus1.push('<script type="text/javascript" src="https://apis.google.com/js/plusone.js">{lang: "'+option.lang+'"}</script>');
	htmlGooglePlus1.push('<g:plusone size="'+option.size+'" count="'+option.count+'" href="'+jQuery.multiSocialService.url+'" callback="'+option.callback+'"></g:plusone>');
	$(this).html(htmlGooglePlus1.join(''));

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


	//set tag "meta" for OGP
	$("head").append("<meta property='og:title' content='"+option.title+"' />");
	$("head").append("<meta property='og:url' content='"+jQuery.multiSocialService.url+"' />");
	if(option.image){
		$("head").append("<meta property='og:image' content='"+option.image+"' />");
	}
	if(option.description){
		$("head").append("<meta property='og:description' content='"+option.description+"' />");
	}
	if(option.type){
		$("head").append("<meta property='og:type' content='"+option.type+"' />");
	}
	if(option.site_name){
		$("head").append("<meta property='og:site_name' content='"+option.site_name+"' />");
	}
}

/**
 * set tumblr button
 * 
 * TODO comming soon...
 *
 * @param {Object} option parameter setting object
 **/
jQuery.fn.setTumblr = function(option){

	option = jQuery.multiSocialService.initialize(jQuery.extend(true,{},jQuery.multiSocialService.tumblr,option));
	option.href = jQuery.multiSocialService.url;

	//set type
	var oParam = {};

	switch(option.setType){

		case 'link':
			//option.url ? oParam.url = $.multiSocialService.initialize(option.url):null;
			option.url ? oParam.url = option.url:null;
		option.name ? oParam.name = option.title:null;
		option.description ? oParam.description = option.description:null;
	break;
	}

	var aHtmlTumblr = [];

	aHtmlTumblr.push('<script type="text/javascript" src="http://platform.tumblr.com/v1/share.js"></script>');
	aHtmlTumblr.push('<a href="http://www.tumblr.com/share/link?'+jQuery.param(oParam)+'" title="Share on Tumblr" style="display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url(\'http://platform.tumblr.com/v1/share_1.png\') top left no-repeat transparent;">');
	aHtmlTumblr.push('Share on Tumblr');
	aHtmlTumblr.push('</a>');

	$(this).html(aHtmlTumblr.join(''));

	return this;
}

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

