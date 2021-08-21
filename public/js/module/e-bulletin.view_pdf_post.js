ebulletin.view_pdf_post = (function () {
    'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {


dashboard_model:null,
admin_user:null,
change_option_anchor:null,	
previous_page_id:null,
showpopups:null,
settable_map : {dashboard_model:true,change_option_anchor:true,admin_user:true,previous_page_id:true,showpopups:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined },
jqueryMap = {},
copyAnchorMap,setJqueryMap,configModule,onTapAcct,setChatAnchor,onClickChat,setcontent,approve_post,helper, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
var $container = stateMap.$container;
jqueryMap = {
        $title: $container.find('#t_title'),
        $date_from : $container.find('#posting_date_from'),
        $pop_up_container:$container.find('.pop-up-container'),
        $date_to : $container.find('#posting_date_to'),
        $approve : 	$container.find('#Approve'),
        $img_post_image:$container.find("#img_post_image"),
        $Reject:$container.find('#Reject')
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
var data = {id:$(this).attr('data-id'),approved_type:'pdf'};
configMap.dashboard_model.approve_request(data,function(response){
    if(response=="OK")
    configMap.showpopups.message_popup('Approved!','message','pdf_post_request',configMap.previous_page_id)
    

})
}
setcontent = function(id){
var data = {id:id};

helper();

configMap.dashboard_model.get_pdf_post_for_aprroval(data,function(response){
    stateMap.$container.html(Handlebars.templates.view_pdf_post(response[0]));
    //configMap.showpopups.init(stateMap.$container);
    setJqueryMap();
    $.fn.datepicker.defaults.format = "yyyy/mm/dd";
    jqueryMap.$date_from.datepicker({});
    jqueryMap.$date_to.datepicker({});
    jqueryMap.$approve.click(approve_post);
    jqueryMap.$Reject.click(function(){
        configMap.change_option_anchor('pdf_post_request',configMap.previous_page_id,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
    })/*
    jqueryMap.$img_post_image.click(
        function(e){
            const clickedimage=$(this)
            var title = jqueryMap.$title.val()
            configMap.showpopups.imagepopup(clickedimage,title)
        }
    )*/
});

setJqueryMap();

}



initModule = function ( $container,id,id2 ) {
stateMap.$container = $container;
stateMap.$container.off().empty();

configMap.admin_user(function(response){
if(!response){	
    configMap.change_option_anchor('home','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
}
else{
    configMap.previous_page_id=id2;
    setcontent(id);
}

})
};
return { initModule : initModule,configModule:configModule };
}());