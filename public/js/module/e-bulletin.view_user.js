ebulletin.view_user = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {
	
	
	user_model:null,
	admin_user:null,
	change_option_anchor:null,	
    settable_map : {user_model:true,change_option_anchor:true,admin_user:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined ,id : undefined},
jqueryMap = {},
setJqueryMap,configModule,setcontent,onsubmit,oncancel,helper,viewclicked,set_events, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
	var $container = stateMap.$container;
	jqueryMap = {$contact_content : $container.find('.spa-contact-content'),
				 $username: $container.find('#username'),
				 $fname: $container.find('#fname'),
				 $lname: $container.find('#lname'),
				 $password: $container.find('#password'),
				 $user_type: $container.find('#user_type'),
				 $submit_button: $container.find('#user_submit'),
				 $cancel_button: $container.find('#user_cancel')	
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


oncancel = function(){
	configMap.change_option_anchor('manage_users','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
}
onsubmit = function(){
	var type = $(this).attr('data-type'),form_data = {};
	form_data.user_id = stateMap.id;
	form_data.fname = jqueryMap.$fname.val();
	form_data.lname = jqueryMap.$lname.val();
	form_data.password = jqueryMap.$password.val();
	form_data.username = jqueryMap.$username.val();
	form_data.user_type = jqueryMap.$user_type.val();
	console.log()
	if(type == 'edit'){
		configMap.user_model.update_user(form_data,function(response){
			configMap.change_option_anchor('manage_users','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
		})

	}
	else{
			configMap.user_model.insert_user(form_data,function(response){
			configMap.change_option_anchor('manage_users','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
		})
	}
}
set_events = function(){

	jqueryMap.$cancel_button.click(oncancel);
	jqueryMap.$submit_button.click(onsubmit);
}
setcontent = function(user_id){
        var form_data = {id:user_id};
		helper();
        /*
        configMap.user_model.view_user(form_data,function(data){
            html_data.user_data = data;
        stateMap.$container.html(Handlebars.templates.view_user( html_data));
        })*/
		if(user_id == 'new'){
			form_data.id=0;
			configMap.user_model.view_user(form_data,function(response){
				stateMap.$container.html(Handlebars.templates.view_user(response));
				setJqueryMap();
				jqueryMap.$submit_button.attr('data-type', 'new');
				set_events();
			})
		}
		else{
			configMap.user_model.view_user(form_data,function(response){
					stateMap.$container.html(Handlebars.templates.view_user(response));
					setJqueryMap();
					jqueryMap.$user_type.val(response.data.user_type_id);
					setJqueryMap();
					jqueryMap.$submit_button.attr('data-type', 'edit');
					set_events();
			})
		}
}



initModule = function (id, $container ) {
	stateMap.$container = $container;
	stateMap.$container.off().empty();
	stateMap.id = id;
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