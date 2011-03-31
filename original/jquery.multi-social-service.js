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
 * 
 * @author manji6 http://manjiro.net
 * @require jQuery
 * @licence MIT licence
 *
 **/

 /**
  * multiSocialService setting object
  *
  */
jQuery.multiSocialService = {
	url:location.href,
	useService:['twitter','facebookLike','hatenaBookmark','evernoteClip','mixiLike','greeLike'],
	hatenaBookmark: {},
	twitter: {},
	facebook: {
		like: {}
	},
	evernote: {
		clip: {}
	},
	mixi: {
		check: {},
		like: {}
	},
	gree: {
		like: {}
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
		}
	}
	sInsertHtml += '</ul></div>';

	$(this).html($(sInsertHtml).find("li").css("display","inline").end().html());
	return this;
}

/**
 * set HatenaBookmark
 * 
 * @param {Object} option setting object
 */
jQuery.fn.setHatenaBookmark = function(option){

	option = jQuery.extend(true,{type:"vertical"},option);

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

	option = jQuery.extend(true,{type:'horizontal',lang:'',text:'',via:''},option);
	

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

	option = jQuery.extend(true,{type:'button_count',show_faces:'false',color:'light',width:100,height:23,lang:''},option);

	if(option.lang === 'en'){
		option.lang = 'locale=en_US&';
	}

	var htmlFacebookLikeButton = "<iframe src='http://www.facebook.com/plugins/like.php?"+option.lang+"href="+encodeURIComponent(jQuery.multiSocialService.url)+"&amp;layout="+option.type+"&amp;show_faces="+option.show_faces+"&amp;width=450&amp;action=like&amp;font&amp;colorscheme="+option.color+"&amp;height=21' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:"+option.width+"px; height:"+option.height+"px;' allowTransparency='true'></iframe>";

	$(this).html(htmlFacebookLikeButton);

	return this;
}


/**
 * set EvernoteClip
 * 
 * @param {Object} option setting object
 */
jQuery.fn.setEvernoteClip = function(option){

	option = jQuery.extend(true,{targetId: 'container',name:'',tag: '',url: '',noteTitle: $("title").text()},option);

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
	
	option = jQuery.extend(true,{'data-key':'','data-url':'','data-button':'button-1'},option);

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
	
	option = jQuery.extend(true,{href:jQuery.multiSocialService.url,service_key:"",width:"450",height:"80",show_faces:"false"},option);

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
	
	option = jQuery.extend(true,{href:jQuery.multiSocialService.url,service_key:"",type:0,height:20},option);

	var htmlGreeLike = '<iframe src="http://share.gree.jp/share?url='+option.href+'&type='+option.type+'&height='+option.height+'" \
		scrolling="no" frameborder="0" marginwidth="0" marginheight="0" style="border:none; overflow:hidden; \
		width:100px; height:'+option.height+'px;" allowTransparency="true">\
	</iframe>';

	$(this).html(htmlGreeLike);

	return this;
}
