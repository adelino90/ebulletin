ebulletin.about = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {
	
	
	about_model:null,
	authorize_user:null,
	change_option_anchor:null,	
    settable_map : {about_model:true,change_option_anchor:true,authorize_user:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined },
jqueryMap = {},
copyAnchorMap,setJqueryMap,configModule,onTapAcct,setChatAnchor,onClickChat,setcontent, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
	var $container = stateMap.$container;
	jqueryMap = {$contact_content : $container.find('.spa-contact-content'),
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



setcontent = function(){


		
		configMap.about_model.get_about_us( function ( menu_data ) {
			
		stateMap.$container.html(Handlebars.templates.about(menu_data));
   });
	

}



initModule = function ( $container ) {
	stateMap.$container = $container;
	stateMap.$container.off().empty();
	setcontent();
	setJqueryMap();
	
};
    return { initModule : initModule,configModule:configModule };
}());