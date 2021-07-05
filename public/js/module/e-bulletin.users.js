ebulletin.users = (function () {
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
setJqueryMap,configModule,setcontent,onsubmit,helper,user_add_clicked,viewclicked,user_edit_clicked, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
	var $container = stateMap.$container;
	jqueryMap = {$contact_content : $container.find('.spa-contact-content'),
	 				$adduser:	 $container.find('#ebulletin-user-add-btn'),
					$edituser:    $container.find('.ebulletin-dashboard-edit')
				
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

  }


viewclicked = function(){
	
}
user_add_clicked = function(){
	configMap.change_option_anchor('view_user','new',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
}
user_edit_clicked = function(){
	var id = $(this).attr('data-id');
	configMap.change_option_anchor('view_user',id,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
}
setcontent = function(){
        var html_data = {};
		helper();
        configMap.dashboard_model.get_users(function(data){
            html_data.user_data = data;
        stateMap.$container.html(Handlebars.templates.users( html_data));
		setJqueryMap();
		jqueryMap.$adduser.click(user_add_clicked);
		jqueryMap.$edituser.click(user_edit_clicked);
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