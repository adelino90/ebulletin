ebulletin.post_request = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {
	
	
	dashboard_model:null,
	admin_user:null,
	change_option_anchor:null,	
	activepage:null,
    settable_map : {dashboard_model:true,change_option_anchor:true,admin_user:true,activepage:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined },
jqueryMap = {},
copyAnchorMap,setJqueryMap,configModule,setcontent,change_page,helper,viewclicked,initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
	var $container = stateMap.$container;
	jqueryMap = {$contact_content : $container.find('.spa-contact-content'),
					$title: $container.find('#t_title'),
					$subject : $container.find('#s_subject'),
					$description : $container.find('#description'),
					$date_from : $container.find('#posting_date_from'),
					$date_to : $container.find('#posting_date_to'),
					$submit : $container.find('#submit'),
					$success_div : $container.find('.success_div'),
					$edit_button : $container.find('.ebulletin-dashboard-edit'),
					$delete_button : $container.find('.ebulletin-dashboard-delete'),
					$view_button : $container.find('.ebulletin-post_request-view'),
					$pagination:$container.find('.pagination-wrapper'),
					$pagination_page:$container.find('.page-numbers')
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

    Handlebars.registerHelper('viewed', function(value, options) {
		var html = '';
		if(value =='False')
			html = '<i class="fa fa-envelope ebulletin-post_request-view" data-id="2" title ="view">';
		else
			html ='<i class="fa fa-envelope-open ebulletin-post_request-view" data-id="2" title ="view">';	
		return html;	
    });
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


viewclicked = function(){
	var post_id = $(this).parent().attr('data-id');
	configMap.change_option_anchor('view_post',post_id,configMap.activepage);
}

change_page =function(e){

	if(parseInt($(this).attr("data-id"))){
		var setpageto = $(this).attr("data-id")
		configMap.change_option_anchor('admin_manage_main_posts',setpageto,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
	}
	else if($(this).attr("data-id")=="next"){
		configMap.activepage=parseInt(configMap.activepage)+1;
		configMap.change_option_anchor('admin_manage_main_posts',configMap.activepage,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
	}
	else if($(this).attr("data-id")=="prev"){
		configMap.activepage=parseInt(configMap.activepage)-1;
		configMap.change_option_anchor('admin_manage_main_posts',configMap.activepage,( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))
	}
}
setcontent = function(pagenumber){
	var page_current = (pagenumber=="ebulletin")?1:pagenumber;
	var pagination_data={}
	pagination_data.page_number=page_current;
		helper();

		configMap.dashboard_model.get_admin_post(pagination_data,function(response){
			var data = {dashboard_data:response.dashboard_data};
			stateMap.$container.html(Handlebars.templates.post_request(data));
			stateMap.$container.append(Handlebars.templates.pagination({currentPage:parseInt(page_current),pageCount:response.pagecount,size:10}))
			setJqueryMap();
			configMap.activepage=page_current;
			jqueryMap.$pagination_page.click(change_page);
			jqueryMap.$view_button.click(viewclicked);
			
		})
		
}



initModule = function ( $container,id1,id2 ) {
	
	stateMap.$container = $container;
	stateMap.$container.off().empty();
	configMap.admin_user(function(response){
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