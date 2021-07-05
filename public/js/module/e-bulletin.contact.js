ebulletin.contact = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {
	
	
	contact_model:null,
	set_chat_anchor:null,
	changeAnchorPart:null,	
    settable_map : {contact_model:true,set_chat_anchor:true,changeAnchorPart:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined },
jqueryMap = {},
copyAnchorMap,setJqueryMap,configModule,onTapAcct,setChatAnchor,onClickChat,setcontent, onResize, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
	var $container = stateMap.$container;
	jqueryMap = {$contact_content : $container.find('.spa-contact-content')}
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
 // var theTemplateScript = $("#contact").html();
/*
  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // We will call this template on an array of objects
  var context = spa.model.contact.get_contacts();
  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);*/

  // Add the compiled html to the page
 //jqueryMap.$contact_content.append(theCompiledHtml);
  configMap.contact_model.get_contacts( function ( menu_data ) {

      stateMap.$container.html(Handlebars.templates.contact( menu_data ) );
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