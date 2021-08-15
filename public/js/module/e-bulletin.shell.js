/*
* spa.shell.js
* Shell module for SPA
*/
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/*global $, spa */
ebulletin.shell = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var 
configMap = {

	anchor_schema_map : {
	chat : { opened : true, closed : true , hidden:true },
	bclick:{click:true},
	option:{home:true,contact:true,about:true,pdf_post:true,main_post:true,user_menu:true,dashboard:true,sign_out:true,manage_posts:true,admin_manage_main_posts:true,edit_view_post:true,view_post:true,manage_users:true,view_user:true},
	 _option : {id : true},
	 filter:{search:true},
	 _filter :{search_str:true}
	},resize_interval : 200,
	main_html : String() + Handlebars.templates.content({})
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined},
jqueryMap = {},
initModule,copyAnchorMap,setJqueryMap, changeAnchorPart, onHashchange, setOptionAnchor, sethelpers,setcontent ,user_authorize,setLoader,admin_authorize,showpopups;
//----------------- END MODULE SCOPE VARIABLES ---------------
//-------------------- BEGIN UTILITY METHODS -----------------
//--------------------- END UTILITY METHODS ------------------
//--------------------- BEGIN DOM METHODS --------------------

// Returns copy of stored anchor map; minimizes overhead
copyAnchorMap = function () {
	return $.extend( true, {}, stateMap.anchor_map );
};


// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
	var $container = stateMap.$container;
	jqueryMap = { $container : $container,
	//$main : $container.find('.spa-shell-main'),
	 $content   : $container.find('.ebulletin-content'),	
	$nav : $container.find('.ebulletin-navigtion'),
	$side_content:$container.find('.ebulletin-content-side-content'),
	$body : $container.find('.ebulletin-content-side-content').parent()
	};
};
// End DOM method /setJqueryMap/
// Begin DOM method /toggleChat/
// Purpose : Extends or retracts chat slider
// Arguments :
// * do_extend - if true, extends slider; if false retracts
// * callback - optional function to execute at end of animation
// Settings :
// * chat_extend_time, chat_retract_time
// * chat_extend_height, chat_retract_height
// Returns : boolean
// * true - slider animation activated
// * false - slider animation not activated
//

//--------------------- END DOM METHODS ----------------------
// Begin DOM method /changeAnchorPart/
// Purpose : Changes part of the URI anchor component
// Arguments:
// * arg_map - The map describing what part of the URI anchor
// we want changed.
// Returns : boolean
// * true - the Anchor portion of the URI was update
// * false - the Anchor portion of the URI could not be updated
// Action :
// The current anchor rep stored in stateMap.anchor_map.
// See uriAnchor for a discussion of encoding.
// This method
// * Creates a copy of this map using copyAnchorMap().
// * Modifies the key-values using arg_map.
// * Manages the distinction between independent
// and dependent values in the encoding.
// * Attempts to change the URI using uriAnchor.
// * Returns true on success, and false on failure.
//


changeAnchorPart = function ( arg_map ) {
	var
	anchor_map_revise = copyAnchorMap(),
	bool_return = true,
	key_name, key_name_dep;
	// Begin merge changes into anchor map
	KEYVAL:
	for ( key_name in arg_map ) {
		if ( arg_map.hasOwnProperty( key_name ) ) {
			// skip dependent keys during iteration
			if ( key_name.indexOf( '_' ) === 0 ) { continue KEYVAL; }
			// update independent key value
			anchor_map_revise[key_name] = arg_map[key_name];
			// update matching dependent key
			key_name_dep = '_' + key_name;
			if ( arg_map[key_name_dep] ) {
				anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
			}
			else {
				delete anchor_map_revise[key_name_dep];
				delete anchor_map_revise['_s' + key_name_dep];
			}
		}
	}
// End merge changes into anchor map
// Begin attempt to update URI; revert if not successful
	try {
		$.uriAnchor.setAnchor( anchor_map_revise );
	}
	catch ( error ) {
		// replace URI with existing state
		$.uriAnchor.setAnchor( stateMap.anchor_map,null,true );
		bool_return = false;
	}
	// End attempt to update URI...
	return bool_return;
};

setLoader = (function(){
	var open,close;

	open = function(){
		jqueryMap.$content.html('<div class="col-md-12 text-center"><img src="/images/loader_gif.gif"></div>');
	}
	return {open:open}
}());

user_authorize = function(fn){
	ebulletin.model.account.get_session(function(data){

               if(data.valid=="false")
					fn(false);
			   else
					fn(true,data.usertype);		
	 });			
}
admin_authorize = function(fn){
	ebulletin.model.account.admin_session(function(data){
               if(data.valid=="false")
					fn(false);
			   else
					fn(true);		
	 });			
}
// End Event handler /onResize/

// Begin Event handler /onHashchange/
// Purpose : Handles the hashchange event
// Arguments:
// * event - jQuery event object.
// Settings : none
// Returns : false
// Action :
// * Parses the URI anchor component
// * Compares proposed application state with current
// * Adjust the application only where proposed state
// differs from existing
//
onHashchange = function ( event ) {
	var
	_s_chat_previous, _s_chat_proposed, s_chat_proposed,
	anchor_map_proposed,_s_b_previous, _s_b_proposed,
	is_ok = true,s_option_proposed,
	anchor_map_previous = copyAnchorMap();
	// attempt to parse anchor
	try { anchor_map_proposed = $.uriAnchor.makeAnchorMap();}
	catch ( error ) {
		$.uriAnchor.setAnchor( anchor_map_previous, null, true );
		return false;
	}
	_s_b_previous = anchor_map_previous._s_option;
	_s_b_proposed = anchor_map_proposed._s_option;
	if (! anchor_map_previous || _s_b_previous !== _s_b_proposed )
	{
			s_option_proposed = anchor_map_proposed.option;
		switch(s_option_proposed){
			case "manage_posts":
				//ebulletin.post_request.initModule( jqueryMap.$content,anchor_map_proposed._option.id,anchor_map_proposed._option.id2 );
				ebulletin.user_menu.initModule( jqueryMap.$content,jqueryMap.$side_content);
			break;
			case "admin_manage_main_posts":
				ebulletin.post_request.initModule( jqueryMap.$content,anchor_map_proposed._option.id,anchor_map_proposed._option.id2 );
				//ebulletin.user_menu.initModule( jqueryMap.$content,jqueryMap.$side_content);
			break;
			case "dashboard":
				//ebulletin.dashboard.initModule( jqueryMap.$content,anchor_map_proposed._option.id);
				ebulletin.user_menu.initModule( jqueryMap.$content,jqueryMap.$side_content);
			break;
			case "pdf_post":
				ebulletin.pdf_post.initModule( jqueryMap.$content,anchor_map_proposed._option.id);
			break;
			case "main_post":
				ebulletin.main_post.initModule( jqueryMap.$content,anchor_map_proposed._option.id);
			break;
			case "home":
					setLoader.open();
					ebulletin.home.initModule( jqueryMap.$content ,jqueryMap.$side_content);
			break;
			case "contact":
				setLoader.open();
				ebulletin.contact.initModule( jqueryMap.$content );
			break;
			case "about":
				setLoader.open();
				ebulletin.about.initModule( jqueryMap.$content );
			break;
			case "view_post":
				ebulletin.view_post.initModule(jqueryMap.$content,anchor_map_proposed._option.id,anchor_map_proposed._option.id2);
			break;
			case "edit_view_post":
				ebulletin.edit_view_post.initModule(jqueryMap.$content,anchor_map_proposed._option.id,anchor_map_proposed._option.id2);
			break;
			case "manage_users":
				ebulletin.users.initModule( jqueryMap.$content );
			break;
			case "view_user":
				ebulletin.view_user.initModule(anchor_map_proposed._option.id, jqueryMap.$content );
			break;
			case "sign_out":
				ebulletin.model.account.logout(function(response){
					if(response){
						ebulletin.nav.initModule(jqueryMap.$nav);
						setOptionAnchor("home",( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
					}
				});
			break;
		    default :
				delete anchor_map_proposed.option;
				delete anchor_map_proposed.chat;
				$.uriAnchor.setAnchor( anchor_map_proposed, null, true );
		}
	}
	
	
	stateMap.anchor_map = anchor_map_proposed;
	// convenience vars
	_s_chat_previous = anchor_map_previous._s_chat;
	_s_chat_proposed = anchor_map_proposed._s_chat;
	// Begin adjust chat component if changed
	//console.log(anchor_map_previous);
	if ( ! anchor_map_previous
	|| _s_chat_previous !== _s_chat_proposed
	) 
	 {
		s_chat_proposed = anchor_map_proposed.chat;
		
		switch ( s_chat_proposed ) {
			case 'opened' :
				is_ok = spa.chat.setSliderPosition( 'opened' );
			break;
			case 'closed' :
				is_ok = spa.chat.setSliderPosition( 'closed' );
			break;
			case 'hidden' :
				is_ok = spa.chat.setSliderPosition( 'hidden' );
			break;
			default :
				spa.chat.setSliderPosition( 'closed' );
				delete anchor_map_proposed.chat;
				$.uriAnchor.setAnchor( anchor_map_proposed, null, true );
		}
	  }
// End adjust chat component if changed
// Begin revert anchor if slider change denied
	if ( ! is_ok ){
		if ( anchor_map_previous ){
			$.uriAnchor.setAnchor( anchor_map_previous, null, true );
			stateMap.anchor_map = anchor_map_previous;
		} 
		else {
			delete anchor_map_proposed.chat;
			$.uriAnchor.setAnchor( anchor_map_proposed, null, true );
		}
	}
// End revert anchor if slider change denied
	return false;
};
// End Event handler /onHashchange/

//-------------------- END EVENT HANDLERS --------------------

//---------------------- BEGIN CALLBACKS ---------------------
// Begin callback method /setChatAnchor/
// Example : setChatAnchor( 'closed' );
// Purpose : Change the chat component of the anchor
// Arguments:
// * position_type - may be 'closed' or 'opened'
// Action :
// Changes the URI anchor parameter 'chat' to the requested
// value if possible.
// Returns :
// * true - requested anchor part was updated
// * false - requested anchor part was not updated
// Throws : none
//

setOptionAnchor = function ( option, id, id2 ) {
  return changeAnchorPart({ option : option, _option : { id : id, id2 : id2 } });
};

sethelpers = function(){
    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if(v1 === v2) {
        return options.fn(this);
        }
    return options.inverse(this);
    });
 

}

setcontent = function($container){
	var data_obj= {};
	$container.html( configMap.main_html );
	setJqueryMap();
	ebulletin.model.bulletin_board.get_bulletin(function(response){
    	data_obj.bulletin_data = response
    	jqueryMap.$content.html(Handlebars.templates.index(data_obj));
		jqueryMap.$side_content.html(Handlebars.templates.side_content());
		showpopups.init(jqueryMap.$body)
		jqueryMap.$filename=$container.find('.ebulletin_side_content_filename')
        jqueryMap.$filename.click(function(){
            showpopups.pdfpopup()
        })
    

    });
}
// End callback method /setChatAnchor/
//----------------------- END CALLBACKS ----------------------

// Begin Event handler /onClickChat/


showpopups=(function () {
	'use strict';
	var init,imagepopup,message_popup,pdfpopup;
	
	imagepopup=function($clicked_item,img_title){
		const clickedimage=$clicked_item;
		const title=img_title;
		var $image_popup_components={}
		$image_popup_components={
			$image_modal_popup:$('body').find('.image-modal-popup'),
			$image_modal_show:$('body').find('#image_modal_show'),
			$description:$('body').find('.description'),
			$image_modal_popup:$('body').find('#close, .image-modal-popup')
		}
	
		$('body').css('overflow','auto')
		$image_popup_components.$image_modal_popup.css('display','block');
		jqueryMap.$side_content.css('display','none');
		$image_popup_components.$image_modal_show.attr('src',clickedimage.attr('src'));
		$image_popup_components.$description.find('h1').html(title);
		$image_popup_components.$image_modal_popup.click(function(){
		   $('body').css('overflow','auto')
		   $image_popup_components.$image_modal_popup.css('display','none');
		   jqueryMap.$side_content.css('display','block');
	   
		})
	}
	pdfpopup=function(){
		$('body').css('overflow','auto')
		$('.pdf-modal-popup').css('display','block');
		$("#pdfframe").attr("src", "../pdf/AJustoResume.pdf");

		$('#close, .image-modal-popup').click(function(){
			$('body').css('overflow','auto')
			 $('.pdf-modal-popup').css('display','none');
			
		
		 })
	}
	init=function($container){
		$container.append(Handlebars.templates.image_popup())
		$container.append(Handlebars.templates.popup());
		$container.append(Handlebars.templates.pdf_popup());
	}
	message_popup=function(message,type,proceedto,activepage){
		var $message_popup_components={}
		$message_popup_components={
			$message:$('body').find(".modal__text"),
			$cancel:$('body').find(".cancel, .close"),
			$confirm:$('body').find(".confirm"),
			$pop_up_container:$('body').find(".pop-up-container")

		}
		$message_popup_components.$message.html(message);
		switch(type){
			case 'message':
				$message_popup_components.$confirm.off();
				$message_popup_components.$confirm.html("Ok")
				$message_popup_components.$cancel.css("display", "none");
				$message_popup_components.$confirm.click(function(){
				$message_popup_components.$pop_up_container.fadeOut("slow")
				if(proceedto)
					setOptionAnchor(proceedto,activepage,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
				})
			break;
		}
		$message_popup_components.$pop_up_container.fadeIn("slow");
		$message_popup_components.$cancel.click(function(){
			$message_popup_components.$pop_up_container.fadeOut("slow")

		})
		
	}

	return {
		imagepopup:imagepopup,
		init:init,
		message_popup:message_popup,
		pdfpopup:pdfpopup
	  };
}());








// End Event handler /onClickChat/
//------------------- BEGIN PUBLIC METHODS -------------------
// Example : spa.shell.initModule( $('#app_div_id') );
// Purpose :
// Directs the Shell to offer its capability to the user
// Arguments :
// * $container (example: $('#app_div_id')).
// A jQuery collection that should represent
// a single DOM container
// Action :
// Populates $container with the shell of the UI
// and then configures and initializes feature modules.
// The Shell is also responsible for browser-wide issues
// such as URI anchor and cookie management.
// Returns : none
// Throws : none
//
// Begin Public method /initModule/
initModule = function ( $container ) {
	// load HTML and map jQuery collections
	 var wait_popup;
	

	stateMap.$container = $container;
	sethelpers();
	setcontent(stateMap.$container);
    

	setJqueryMap();
	// initialize chat slider and bind click handler

    $.ajaxSetup({
      cache: false // Defeat browser cache by adding a timestamp to the URL.
    });

	
	
	// configure uriAnchor to use our schema
	$.uriAnchor.configModule({
	schema_map : configMap.anchor_schema_map
	});

	ebulletin.nav.configModule({
	  set_option_anchor : setOptionAnchor,
	  $container :jqueryMap.$content,
	  menu_model : ebulletin.model.navigation,
	  account_model : ebulletin.model.account
    });
	ebulletin.contact.configModule({
		changeAnchorPart:changeAnchorPart,
		contact_model: ebulletin.model.contact
	})
	ebulletin.main_post.configModule({
		change_option_anchor:setOptionAnchor,
		authorize_user  : user_authorize,
		dashboard_model  : ebulletin.model.dashboard,
		showpopups:showpopups
	})
	ebulletin.post_request.configModule({
		change_option_anchor:setOptionAnchor,
		admin_user  : admin_authorize,
		dashboard_model  : ebulletin.model.dashboard
	})
	ebulletin.view_post.configModule({
		change_option_anchor:setOptionAnchor,
		admin_user  : admin_authorize,
		dashboard_model  : ebulletin.model.dashboard,
		showpopups:showpopups
	})
	ebulletin.users.configModule({
		change_option_anchor:setOptionAnchor,
		admin_user  : admin_authorize,
		dashboard_model  : ebulletin.model.dashboard
	})

	ebulletin.about.configModule({
		change_option_anchor:setOptionAnchor,
		about_model:ebulletin.model.about
	})
	ebulletin.user_menu.configModule({
		change_option_anchor:setOptionAnchor,
		authorize_user  : user_authorize,
		dashboard_model  : ebulletin.model.dashboard,
		showpopups:showpopups
	})
	ebulletin.pdf_post.configModule({
		change_option_anchor:setOptionAnchor,
		authorize_user  : user_authorize,
		dashboard_model  : ebulletin.model.dashboard,
		showpopups:showpopups
	})

	ebulletin.view_user.configModule({
		change_option_anchor:setOptionAnchor,
		admin_user  : admin_authorize,
		user_model  : ebulletin.model.account
	})
	ebulletin.edit_view_post.configModule({
		change_option_anchor:setOptionAnchor,
		admin_user  : user_authorize,
		dashboard_model  : ebulletin.model.dashboard,
		showpopups:showpopups
	})
	ebulletin.home.configModule({
		e_bulletin_model:ebulletin.model.bulletin_board,
		changeAnchorPart:changeAnchorPart,
		showpopups:showpopups
	})

	 ebulletin.nav.initModule(jqueryMap.$nav);
	 user_authorize(function(data){
		if(!data){
		//setOptionAnchor('home','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
		}
	 })
	 	//setOptionAnchor('home','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
	// configure and initialize feature modules
	// Handle URI anchor change events.
	// This is done /after/ all feature modules are configured
	// and initialized, otherwise they will not be ready to handle
	// the trigger event, which is used to ensure the anchor
	// is considered on-load
	//
	
	$(window)
		.bind( 'hashchange', onHashchange )
		.trigger( 'hashchange' );
		
;
	};
// End PUBLIC method /initModule/
return { initModule : initModule };
//------------------- END PUBLIC METHODS ---------------------
}());