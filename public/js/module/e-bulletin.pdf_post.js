ebulletin.pdf_post = (function () {
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
setHelper,setJqueryMap,configModule,change_page,clearvals,pdf_submit,setcontent,refresh_pdf_dashboard, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
var $container = stateMap.$container;
jqueryMap = {
			$main_post:$container.find("#main_post"),
			$pdf_submit:$container.find("#submit"),
			$t_pdf_title:$container.find("#t_pdf_title"),
			$f_pdf_file:$container.find("#f_pdf_file"),
			$description:$container.find("#description"),
			$posting_date_from:$container.find("#posting_date_from"),
			$posting_date_to:$container.find("#posting_date_to"),
			$success_div:$container.find("#success_div"),
			$modal_add_post: $container.find("#ebulletin-add-post-container"),
			$pagination:$container.find('.pagination-wrapper'),
			$pagination_page:$container.find('.page-numbers'),
			$ebulletin_pdf_dashboard_table:$container.find(".ebulletin-pdf-dashboard-table > tbody")


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

change_page=function(e){

	if(parseInt($(this).attr("data-id"))){
		var setpageto = $(this).attr("data-id")
		configMap.change_option_anchor('pdf_post',setpageto,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
	}
	else if($(this).attr("data-id")=="next"){
		configMap.activepage=parseInt(configMap.activepage)+1;
		configMap.change_option_anchor('pdf_post',configMap.activepage,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
	}
	else if($(this).attr("data-id")=="prev"){
		configMap.activepage=parseInt(configMap.activepage)-1;
		configMap.change_option_anchor('pdf_post',configMap.activepage,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
	}

}


refresh_pdf_dashboard=function(pageto){
	jqueryMap.$ebulletin_pdf_dashboard_table.off().empty();
	jqueryMap.$pagination.remove();
	setJqueryMap();
	var page_current = !pageto?1:pageto;
	var pagination_data={}
	pagination_data.page_number=page_current;
	setHelper();
	
		configMap.dashboard_model.get_pdf_post(pagination_data,function(pdf_dashboard_response){
			jqueryMap.$ebulletin_pdf_dashboard_table.html(Handlebars.templates.pdf_dashboard_data({dashboard_data:pdf_dashboard_response.dashboard_data}));
			configMap.showpopups.init(stateMap.$container);
			stateMap.$container.append(Handlebars.templates.pagination({currentPage:parseInt(page_current),pageCount:pdf_dashboard_response.pagecount,size:5}))
			setJqueryMap();
			clearvals();
			$.fn.datepicker.defaults.format = "yyyy/mm/dd";
			jqueryMap.$pagination_page.click(change_page);
			configMap.activepage=page_current;
			
		});

}

clearvals = function(){
	jqueryMap.$t_pdf_title.val("")
	jqueryMap.$f_pdf_file.val("");
	jqueryMap.$description.val("");
	jqueryMap.$posting_date_from.val("");
	jqueryMap.$posting_date_to.val("");
}

pdf_submit = function(e){
	var data_for_validation={};
	var form = new FormData();
	form.append('pdf_title', jqueryMap.$t_pdf_title.val());
	form.append('filename', jqueryMap.$f_pdf_file[0].files[0]);
	form.append('description', jqueryMap.$description.val());
	form.append('date_from', jqueryMap.$posting_date_from.val());
	form.append('date_to', jqueryMap.$posting_date_to.val());	
	for(var pair of form.entries()) {
		data_for_validation[pair[0]]=pair[1];
	 }
		configMap.dashboard_model.submitpdfdata(form,function(returnobject){
			jqueryMap.$success_div.html('<div class="alert alert-success">'+returnobject.insert_status+'</div>');
			setTimeout(function(){

				jqueryMap.$modal_add_post.modal("hide");
					refresh_pdf_dashboard();
					
			}, 1500);
			

		});
	

}
// This is A Test

setcontent = function(pagenumber,limit){
    var page_current = (pagenumber=="ebulletin")?1:pagenumber;
    var pagination_data={}
    pagination_data.page_number=page_current;
    setHelper();

    configMap.dashboard_model.get_pdf_post(pagination_data,function(pdf_dashboard_response){
        if(pagenumber>pdf_dashboard_response.pagecount)configMap.change_option_anchor('pdf_post',1,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
        stateMap.$container.html(Handlebars.templates.pdf_post_dashboard({dashboard_data:pdf_dashboard_response.dashboard_data}));
        stateMap.$container.append(Handlebars.templates.pagination({currentPage:parseInt(page_current),pageCount:pdf_dashboard_response.pagecount,size:5}))
		setJqueryMap();
		jqueryMap.$pagination_page.click(change_page);
		$.fn.datepicker.defaults.format = "yyyy/mm/dd";
		jqueryMap.$posting_date_from.datepicker({});
		jqueryMap.$posting_date_to.datepicker({});
       	jqueryMap.$pdf_submit.click(pdf_submit)

    })
}



initModule = function ($container,id1,id2) {
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