ebulletin.main_post = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {
	
	
	dashboard_model:null,
	authorize_user:null,
	change_option_anchor:null,
	showpopups:null,	
	activepage:null,
    settable_map : {dashboard_model:true,change_option_anchor:true,authorize_user:true,showpopups:true,activepage:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined },
jqueryMap = {},
setHelper,setJqueryMap,configModule,viewclicked,remove_errors,clearvals,data_validation,setEvents,getdate_now,for_delete,refresh_dashboard,change_page,setcontent,onsubmit,onsubmit2,ondashboard_delete, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
	var $container = stateMap.$container;
	jqueryMap = {$contact_content : $container.find('.spa-contact-content'),
					$title: $container.find('#t_title'),
					$pop_up_container:$container.find('.pop-up-container'),
					$pagination_page:$container.find('.page-numbers'),
					$subject : $container.find('#s_subject'),
					$description : $container.find('#description'),
					$date_from : $container.find('#posting_date_from'),
					$date_to : $container.find('#posting_date_to'),
					$modal_add_post: $container.find("#ebulletin-add-post-container"),
					$f_file : $container.find('#f_file'),
					$submit : $container.find('#submit'),
					$success_div : $container.find('.success_div'),
					$post_title:$container.find('.post_title'),
					$edit_button : $container.find('.ebulletin-dashboard-edit'),
					$delete_button : $container.find('.ebulletin-dashboard-delete'),
					$modal_add_post: $container.find("#ebulletin-add-post-container"),
					$ebulletin_dashboard_table:$container.find(".ebulletin-dashboard-table"),
					$ebulletin_dashboard_table_body:$container.find(".ebulletin-dashboard-table>tbody"),
					$pagination:$container.find('.pagination-wrapper')
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

onsubmit2 = function(){
	var fileInput = document.querySelector('#f_file');


	var value={title:jqueryMap.$title.val(),
			  // f_file:	fileInput.files[0],
			   subject:jqueryMap.$subject.val(),
			   description:jqueryMap.$description.val(),
			   date_from:jqueryMap.$date_from.val(),
			   date_to:jqueryMap.$date_to.val()
			  }	
	var form = new FormData(value);		  
	configMap.dashboard_model.submitdata(value,function(response){
		//jqueryMap.$success_div.html('<div class="alert alert-success">'+response+'</div>');
		
	});
}

setHelper=function(){
	Handlebars.registerHelper('pagination', function(currentPage, totalPage, size, options) {
		var startPage, endPage, context;
	  
		if (arguments.length === 3) {
		  options = size;
		  size = 5;
		}
	  
		startPage = currentPage - Math.floor(size / 2);
		endPage = currentPage + Math.floor(size / 2);
	  
		if (startPage <= 0) {
		  endPage -= (startPage - 1);
		  startPage = 1;
		}
	  
		if (endPage > totalPage) {
		  endPage = totalPage;
		  if (endPage - size + 1 > 0) {
			startPage = endPage - size + 1;
		  } else {
			startPage = 1;
		  }
		}
	  
		context = {
		  startFromFirstPage: false,
		  pages: [],
		  endAtLastPage: false,
		};
		if (startPage === 1) {
		  context.startFromFirstPage = true;
		}
		for (var i = startPage; i <= endPage; i++) {
		  context.pages.push({
			page: i,
			isCurrent: i === currentPage,
		  });
		}
		if (endPage === totalPage) {
		  context.endAtLastPage = true;
		}
	  
		return options.fn(context);
	  });
}
getdate_now=function(){
	var d = new Date();
	const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
	];
	var month = d.getMonth();
	var day = d.getDate();

	var output =  monthNames[month] +  ' ' + (day<10 ? '0' : '') + day + ', ' + d.getFullYear() ;
		
	return output;
}

viewclicked = function(){
	var post_id = $(this).attr('data-id');
	configMap.change_option_anchor('edit_view_post',post_id,configMap.activepage);
	
}

refresh_dashboard=function(pageto){
	jqueryMap.$ebulletin_dashboard_table_body.off().empty();
	jqueryMap.$pagination.remove();
	setJqueryMap();
	var page_current = !pageto?1:pageto;
	var pagination_data={}
	pagination_data.page_number=page_current;
	setHelper();
	
		configMap.dashboard_model.get_dashboard(pagination_data,function(dashboard_response){
			jqueryMap.$ebulletin_dashboard_table_body.html(Handlebars.templates.dashboard_data({dashboard_data:dashboard_response.dashboard_data}));
			configMap.showpopups.init(stateMap.$container);
			stateMap.$container.append(Handlebars.templates.pagination({currentPage:parseInt(page_current),pageCount:dashboard_response.pagecount,size:5}))
			setJqueryMap();
			clearvals();
			setEvents();
			configMap.activepage=page_current;
			
		});

}
data_validation=function(data_obj,callback){
	var for_validation=data_obj
	var flag=true,validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
	
	remove_errors();
	if(for_validation.description ==""){
		jqueryMap.$description.addClass("input_invalid")
		jqueryMap.$description.next(".invalid-feedback").text("Please Enter Description")
		flag=false;
		}
	
	if(for_validation.title ==""){
		jqueryMap.$title.addClass("input_invalid")
		jqueryMap.$title.next(".invalid-feedback").text("Please Enter Title")	
		flag=false;
	}
	
	if(for_validation.f_file== "undefined"){
		jqueryMap.$f_file.addClass("input_invalid")
		jqueryMap.$f_file.next(".invalid-feedback").text("Please Enter Image")	
		flag=false;
	}
	if($.inArray(for_validation.f_file.type, validImageTypes) < 0){
		jqueryMap.$f_file.addClass("input_invalid")
		jqueryMap.$f_file.next(".invalid-feedback").text("Invalid File Type: Please Upload the Image File Only")
		flag = false
	}

	if(for_validation.subject ==""){
		jqueryMap.$subject.addClass("input_invalid")
		jqueryMap.$subject.next(".invalid-feedback").text("Please Enter Post Subject")	
		flag=false;
	}
	if(for_validation.date_from ==""){
		jqueryMap.$date_from.addClass("input_invalid")
		jqueryMap.$date_from.next(".invalid-feedback").text("Please Enter Posting Date From")	
		flag=false;
	}
	if(for_validation.date_to ==""){
		jqueryMap.$date_to.addClass("input_invalid")
		jqueryMap.$date_to.next(".invalid-feedback").text("Please Enter  Posting Date To")	
		flag=false;
	}
	if(new Date(for_validation.date_from) > new Date(for_validation.date_to)){
		jqueryMap.$date_to.addClass("input_invalid")
		jqueryMap.$date_to.next(".invalid-feedback").text("Date To Must be ahead of Date From")
		jqueryMap.$date_from.addClass("input_invalid")
		jqueryMap.$date_from.next(".invalid-feedback").text("Date To Must be ahead of Date From")
		flag = false
	}
	

	/*
	date_from: "2021/07/31"
	date_to: "2021/07/31"
	description: "safdgsdfg"
	f_file: File {name: "202844433_918549228690560_7306321311765221642_n.png", lastModified: 1625061893475, lastModifiedDate: Wed Jun 30 2021 22:04:53 GMT+0800 (China Standard Time), webkitRelativePath: "", size: 200409, …}
	subject: "12361346"
	title: "12351235"
	*/
	callback(flag)
}

onsubmit = function(){
  var data_for_validation={};
	var form = new FormData();
	form.append('title', jqueryMap.$title.val());
	form.append('f_file', jqueryMap.$f_file[0].files[0]);
	form.append('subject', jqueryMap.$subject.val());
	form.append('description', jqueryMap.$description.val());
	form.append('date_from', jqueryMap.$date_from.val());
	form.append('date_to', jqueryMap.$date_to.val());	
	for(var pair of form.entries()) {
		data_for_validation[pair[0]]=pair[1];
	 }
	 data_validation(data_for_validation,function(data){

		if(data){
		 
			configMap.dashboard_model.submitdata(form,function(returnobject){
				jqueryMap.$success_div.html('<div class="alert alert-success">'+returnobject.insert_status+'</div>');
				setTimeout(function(){

					jqueryMap.$modal_add_post.modal("hide");
						refresh_dashboard();
						
				}, 1500);	

			});

		}
	});

}

remove_errors=function(){
	jqueryMap.$title.removeClass("input_invalid")
	jqueryMap.$f_file.removeClass("input_invalid")
	jqueryMap.$subject.removeClass("input_invalid")
	jqueryMap.$description.removeClass("input_invalid")
	jqueryMap.$date_from.removeClass("input_invalid")
	jqueryMap.$date_to.removeClass("input_invalid")
	$('.invalid-feedback').text("");
}

clearvals = function(){
	
	jqueryMap.$title.val("");
	jqueryMap.$f_file.val("");
	jqueryMap.$subject.val("");
	jqueryMap.$description.val("");
	jqueryMap.$date_from.val("");
	jqueryMap.$date_to.val("");
	jqueryMap.$success_div.off().empty();

}

for_delete = function(e){
	
		var value={},tr = $(this);
		var title= $(this).parent().parent().find(".post_title").html()
		var post_id = e.target.attributes[1].value;
		var message = "Are you sure you want to delete \""+title+"\"?";
		
		value.post_id = post_id;
		var for_confirmation=configMap.showpopups.message_popup(message,'delete');
		
		for_confirmation.$pop_up_container.find(".confirm").click(function(){
			ondashboard_delete(value.post_id,tr)
			for_confirmation.$pop_up_container.fadeOut("slow")
		});	

}

ondashboard_delete = function(value,tr){
	
	var delete_value={post_id:value}
	configMap.dashboard_model.delete_post(delete_value,function(response){
		tr.parent().parent().remove();
		refresh_dashboard(configMap.activepage)
	});

}
change_page=function(e){

	if(parseInt($(this).attr("data-id"))){
		var setpageto = $(this).attr("data-id")
		configMap.change_option_anchor('main_post',setpageto,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
	}
	else if($(this).attr("data-id")=="next"){
		configMap.activepage=parseInt(configMap.activepage)+1;
		configMap.change_option_anchor('main_post',configMap.activepage,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
	}
	else if($(this).attr("data-id")=="prev"){
		configMap.activepage=parseInt(configMap.activepage)-1;
		configMap.change_option_anchor('main_post',configMap.activepage,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
	}

}
setEvents = function(){
	$.fn.datepicker.defaults.format = "yyyy/mm/dd";
	jqueryMap.$date_from.datepicker({});
	jqueryMap.$date_to.datepicker({});
	jqueryMap.$submit.click(onsubmit);
	jqueryMap.$delete_button.click(for_delete);
	jqueryMap.$edit_button.click(viewclicked);
	jqueryMap.$pagination_page.click(change_page);
}

setcontent = function(pagenumber,limit){

var page_current = (pagenumber=="ebulletin")?1:pagenumber;
var pagination_data={}
pagination_data.page_number=page_current;

setHelper();

		configMap.dashboard_model.get_dashboard(pagination_data,function(dashboard_response){
			if(pagenumber>dashboard_response.pagecount)configMap.change_option_anchor('main_post',1,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
			stateMap.$container.html(Handlebars.templates.dashboard({dashboard_data:dashboard_response.dashboard_data}));
			configMap.showpopups.init(stateMap.$container);
			stateMap.$container.append(Handlebars.templates.pagination({currentPage:parseInt(page_current),pageCount:dashboard_response.pagecount,size:5}))
			setJqueryMap();
			setEvents();
			configMap.activepage=page_current;
			$('body').css("opacity", "1.0");
			
		});
	

}



initModule = function ( $container,id1,id2 ) {
	$('body').css("opacity", "0.5");
	stateMap.$container = $container;
	stateMap.$container.off().empty();
	configMap.authorize_user(function(response){
		if(!response){	
			configMap.change_option_anchor('home','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
		}
		else{
			
				setcontent(id1);
			
		}
	})
};
    return { initModule : initModule,configModule:configModule };
}());