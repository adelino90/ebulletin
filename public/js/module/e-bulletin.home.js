ebulletin.home = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {
	
	
    e_bulletin_model:null,
	changeAnchorPart:null,
    showpopups:null,	
    settable_map : { e_bulletin_model:true,changeAnchorPart:true,showpopups:true}
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

setcontent = function($side_content){
    sethelpers();
    var data_obj= {};
    configMap.e_bulletin_model.get_bulletin(function(response){
        data_obj.main_post_data = response.main_post
        data_obj.pdf_post_data = response.pdf_post
        stateMap.$container.html(Handlebars.templates.home(data_obj));
        setJqueryMap();
        jqueryMap.$side_content=$side_content
        jqueryMap.$side_content.html(Handlebars.templates.side_content(data_obj));
        jqueryMap.$filename=jqueryMap.$side_content.find('.ebulletin_side_content_filename')
        jqueryMap.$filename.click(function(e){
           var filename= $(this).text()
            configMap.showpopups.pdfpopup(filename)
        })
    
    });




}



initModule = function ( $container,$side_content ) {
	// load HTML and map jQuery collections
	stateMap.$container = $container;
	stateMap.$container.off().empty();
	setcontent($side_content);
	setJqueryMap();
	
	// initialize chat slider and bind click handler
	
	};
    return { initModule : initModule,configModule:configModule };
}());