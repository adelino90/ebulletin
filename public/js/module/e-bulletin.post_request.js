ebulletin.post_request = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {
	
	
	dashboard_model:null,
	admin_user:null,
	change_option_anchor:null,	
    settable_map : {dashboard_model:true,change_option_anchor:true,admin_user:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined },
jqueryMap = {},
copyAnchorMap,setJqueryMap,configModule,onTapAcct,setChatAnchor,onClickChat,setcontent,onsubmit,helper,viewclicked, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
	var $container = stateMap.$container;
	jqueryMap = {$contact_content : $container.find('.spa-contact-content'),
					$title: $container.find('#t_title'),
					$subject : $container.find('#s_subject'),
					$description : $container.find('#description'),
					$date_from : $container.find('#posting_date_from'),
					$date_to : $container.find('#posting_date_to'),
					$submit : $container.find('#submit'),
					$success_div : $container.find('.success_div'),
					$edit_button : $container.find('.ebulletin-dashboard-edit'),
					$delete_button : $container.find('.ebulletin-dashboard-delete'),
					$view_button : $container.find('.ebulletin-post_request-view')
				}
};

 configModule = function ( input_map ) {
    ebulletin.util.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
  };
helper = function(){

    Handlebars.registerHelper('viewed', function(value, options) {
		var html = '';
	console.log(options)
		if(value =='False')
			html = '<i class="fa fa-envelope ebulletin-post_request-view" data-id="2" title ="view">';
		else
			html ='<i class="fa fa-envelope-open ebulletin-post_request-view" data-id="2" title ="view">';	
		return html;	
    });
  }


viewclicked = function(){
	var post_id = $(this).parent().attr('data-id');
	configMap.change_option_anchor('view_post',post_id);
}
setcontent = function(){
		helper();
		configMap.dashboard_model.get_admin_post(function(response){
			var data = {dashboard_data:response};
			stateMap.$container.html(Handlebars.templates.post_request(data));
			setJqueryMap();
			jqueryMap.$view_button.click(viewclicked);
		})

}



initModule = function ( $container ) {
	stateMap.$container = $container;
	stateMap.$container.off().empty();

	configMap.admin_user(function(response){
		if(!response){	
			configMap.change_option_anchor('home','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
		}
		else
			setcontent();
		
	})
};
    return { initModule : initModule,configModule:configModule };
}());