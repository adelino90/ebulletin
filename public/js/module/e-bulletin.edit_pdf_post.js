ebulletin.edit_pdf_post = (function () {
    'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {


pdf_model:null,
admin_user:null,
change_option_anchor:null,	
showpopups:null,
previous_page_id:null,
settable_map : {pdf_model:true,change_option_anchor:true,admin_user:true,showpopups:true,previous_page_id:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined },
jqueryMap = {},
copyAnchorMap,setJqueryMap,configModule,data_validation,data_validation,cancel,setEvents,setcontent,save_pdf_update,helper, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
var $container = stateMap.$container;
jqueryMap = {
        $title: $container.find('#t_title'),
        $date_from : $container.find('#posting_date_from'),
        $pop_up_container:$('body'),
        $f_file : $container.find('#f_file'),
        $pdf_embed_file : $container.find('#pdf_embed'),
        $date_to : $container.find('#posting_date_to'),
		$description : $container.find('#description'),
        $subject : $container.find('#s_subject'),
        $save : 	$container.find('#Save'),
        $cancel : 	$container.find('#Cancel'),
        $img_post_image:$container.find("#img_post_image"),
        fileuploaded:false
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
    Handlebars.registerHelper('eq', function (value) {
        if(value==true)
         return true
        else
            return false;
        
      });

}

data_validation = function(data_obj,callback){
	var for_validation=data_obj
	var flag=true
	if(for_validation.pdf_title ==""){
		jqueryMap.$title.addClass("input_invalid")
		jqueryMap.$title.next(".invalid-feedback").text("Please Enter Title")
		flag = false
	}
	if(for_validation.f_file.type != 'application/pdf' &&  jqueryMap.fileuploaded){
        jqueryMap.$f_file.addClass("input_invalid")
		jqueryMap.$f_file.next(".invalid-feedback").text("Invalid File Type: Please Upload PDF File Only")
		flag = false
	}
	if(for_validation.description ==""){
		jqueryMap.$description.addClass("input_invalid")
		jqueryMap.$description.next(".invalid-feedback").text("Please Enter Description")
		flag = false
	}
	if(for_validation.date_from ==""){
		jqueryMap.$date_from.addClass("input_invalid")
		jqueryMap.$date_from.next(".invalid-feedback").text("Please Enter Date From")
		flag = false
	}
	if(for_validation.date_to ==""){
		jqueryMap.$date_to.addClass("input_invalid")
		jqueryMap.$date_to.next(".invalid-feedback").text("Please Enter Posting Date To")
		flag = false
	}
	if(new Date(for_validation.date_from) > new Date(for_validation.date_to)){
		jqueryMap.$date_to.addClass("input_invalid")
		jqueryMap.$date_to.next(".invalid-feedback").text("Date To Must be ahead of Date From")
		jqueryMap.$date_from.addClass("input_invalid")
		jqueryMap.$date_from.next(".invalid-feedback").text("Date To Must be ahead of Date From")
		flag = false
	}
	

	callback(flag)
}



cancel = function(){

    configMap.change_option_anchor('pdf_post',configMap.previous_page_id,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
}
setEvents = function(){

    $.fn.datepicker.defaults.format = "yyyy/mm/dd";
    jqueryMap.$date_from.datepicker({});
    jqueryMap.$date_to.datepicker({});
    jqueryMap.$save.click(save_pdf_update)
    jqueryMap.$cancel.click(cancel)
    jqueryMap.$f_file.on('change', function() {
        const [file]=jqueryMap.$f_file[0].files
        if (file) {

            var reader = new FileReader();
            reader.onload = function(){
                jqueryMap.$pdf_embed_file.attr("data", reader.result);
                
            }
            reader.readAsDataURL(file);
            jqueryMap.fileuploaded=true    
           // jqueryMap.$img_post_image.src = URL.createObjectURL(file)
          }

     });
}

save_pdf_update=function(e){
    var data_for_validation={};
    var form = new FormData();
    var data={},stringdata="";
    form.append('post_id', $(this).attr("data-id"));
	form.append('pdf_title', jqueryMap.$title.val());
	form.append('f_file', jqueryMap.$f_file[0].files[0]);
	form.append('description', jqueryMap.$description.val());
	form.append('date_from', jqueryMap.$date_from.val());
	form.append('date_to', jqueryMap.$date_to.val());
        for(var pair of form.entries()) {
            data_for_validation[pair[0]]=pair[1];
        }
    data_validation(data_for_validation,function(data){
    
        if(data){

            if(jqueryMap.fileuploaded){
                configMap.pdf_model.update_pdf_post(form,function(response){
                    configMap.showpopups.message_popup('Saved!','message','pdf_post',configMap.previous_page_id)
            
                })
            }
            else{
                stringdata =  stringdata+"{"
                for(var pair of form.entries()) {
                    if(pair[0]!="description")
                        stringdata =  stringdata+'"'+pair[0]+ '": "'+ pair[1]+'",';
                    else
                        stringdata =  stringdata+'"'+pair[0]+ '": "'+ (pair[1].replace(/(\r\n|\n|\r)/gm,""))+'",';
                }
                stringdata=stringdata.slice(0, -1)
                stringdata =  stringdata+"}"
                data=JSON.parse(stringdata)
                data.f_file=null;
    
                configMap.pdf_model.update_pdf_post2(data,function(response){
                configMap.showpopups.message_popup('Saved!','message','pdf_post',configMap.previous_page_id)
                
                
                
                })
            }
        }
    });
}

setcontent = function(id){
var data = {id:id};
helper();

//alert(id);
        configMap.pdf_model.edit_view_pdf_post(data,function(response){
        
            stateMap.$container.html(Handlebars.templates.edit_view_pdf_post(response[0]));
            //configMap.showpopups.init(stateMap.$container);
            helper();
            setJqueryMap();
            setEvents();

         
        });
    setJqueryMap();
}



initModule = function ( $container,id,id2 ) {
    
    stateMap.$container = $container;
    stateMap.$container.off().empty();
    
    //For Authorizing User to enter the page
    configMap.admin_user(function(response){
    if(!response){	
        configMap.change_option_anchor('home','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
    }
    else
        setcontent(id);
        configMap.previous_page_id=id2;
    })
    //

    };
    return { initModule : initModule,configModule:configModule };
}());