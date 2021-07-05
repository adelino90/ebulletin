ebulletin.home = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {
	
	
    e_bulletin_model:null,
	changeAnchorPart:null,	
    settable_map : { e_bulletin_model:true,changeAnchorPart:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined },
jqueryMap = {},
copyAnchorMap,setJqueryMap,configModule,onTapAcct,setChatAnchor,onClickChat,setcontent, sethelpers, onResize, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
	var $container = stateMap.$container;
	jqueryMap = {
        $contact_content : $container.find('.spa-contact-content')
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
sethelpers = function(){
    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if(v1 === v2) {
        return options.fn(this);
        }
    return options.inverse(this);
    });
 

}

setcontent = function(){
    sethelpers();
    var data_obj= {};
configMap.e_bulletin_model.get_bulletin(function(response){
    data_obj.bulletin_data = response
    stateMap.$container.html(Handlebars.templates.home(data_obj));
});




}



initModule = function ( $container ) {
	// load HTML and map jQuery collections
	stateMap.$container = $container;
	stateMap.$container.off().empty();
	setcontent();
	setJqueryMap();
	
	// initialize chat slider and bind click handler
	
	};
    return { initModule : initModule,configModule:configModule };
}());