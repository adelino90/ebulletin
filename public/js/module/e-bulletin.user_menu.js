ebulletin.user_menu = (function () {
    'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {



authorize_user:null,
change_option_anchor:null,
dashboard_model :null,
showpopups:null,	
activepage:null,
settable_map : {dashboard_model:true,change_option_anchor:true,authorize_user:true,showpopups:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined },
jqueryMap = {},
setHelper,setJqueryMap,configModule,setcontent, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
var $container = stateMap.$container;
jqueryMap = {
    $main_post:$container.find("#main_post"),
    $pdf_post:$container.find("#pdf_post")
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


setHelper=function(){

}





setcontent = function(usertype){
    var pagination_data={}
	pagination_data.page_number=1;
    configMap.dashboard_model.get_dashboard(pagination_data,function(dashboard_response){
        stateMap.$container.html(Handlebars.templates.user_menu_page());
        setJqueryMap();
        jqueryMap.$main_post.click(function(){
            if(usertype==2)
                configMap.change_option_anchor('main_post',"ebulletin",( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
            else if(usertype==1)
                configMap.change_option_anchor('admin_manage_main_posts',"ebulletin",( ( new Date() ).getSeconds() + 10000 ).toString( 36 )+"INIT")	
               
        })
        jqueryMap.$pdf_post.click(function(){
            if(usertype==2)
                configMap.change_option_anchor('pdf_post',"ebulletin",( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
            else if(usertype==1)
            configMap.change_option_anchor('pdf_post_request',"ebulletin",( ( new Date() ).getSeconds() + 10000 ).toString( 36 )+"INIT")
       
        })


    })
}



initModule = function ($container) {
    stateMap.$container = $container;
    stateMap.$container.off().empty();
    configMap.authorize_user(function(response,usertype){
     
        if(!response){	
            
            configMap.change_option_anchor('home','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
        }
        else{
                
                setcontent(usertype);
            
        }
    })
};
    return { initModule : initModule,configModule:configModule };
}());