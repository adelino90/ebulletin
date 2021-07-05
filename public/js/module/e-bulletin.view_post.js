ebulletin.view_post = (function () {
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
copyAnchorMap,setJqueryMap,configModule,onTapAcct,setChatAnchor,onClickChat,setcontent,approve_post,helper, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
	var $container = stateMap.$container;
	jqueryMap = {
				$date_from : $container.find('#posting_date_from'),
				$date_to : $container.find('#posting_date_to'),
				$approve : 	$container.find('#Approve')
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

approve_post = function(e){
	var data = {id:$(this).attr('data-id')};
		configMap.dashboard_model.approve_request(data,function(response){
			if(response=="OK")
				alert("APPROVED");
				configMap.change_option_anchor('manage_posts','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	

		})
}
setcontent = function(id){
		var data = {id:id};
		helper();

		configMap.dashboard_model.get_post(data,function(response){
			stateMap.$container.html(Handlebars.templates.view_post(response[0]));
			setJqueryMap();
			$.fn.datepicker.defaults.format = "yyyy/mm/dd";
			jqueryMap.$date_from.datepicker({});
			jqueryMap.$date_to.datepicker({});
			jqueryMap.$approve.click(approve_post);
		});

		setJqueryMap();

}



initModule = function ( $container,id ) {
	stateMap.$container = $container;
	stateMap.$container.off().empty();

	configMap.admin_user(function(response){
		if(!response){	
			configMap.change_option_anchor('home','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
		}
		else
			setcontent(id);
		
	})
};
    return { initModule : initModule,configModule:configModule };
}());