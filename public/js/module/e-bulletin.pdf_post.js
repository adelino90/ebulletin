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
setHelper,setJqueryMap,configModule,setcontent, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
var $container = stateMap.$container;
jqueryMap = {
    $main_post:$container.find("#main_post")
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





setcontent = function(pagenumber,limit){
    var page_current = (pagenumber=="ebulletin")?1:pagenumber;
    var pagination_data={}
    pagination_data.page_number=page_current;
    setHelper();

    configMap.dashboard_model.get_pdf_post(pagination_data,function(dashboard_response){
        console.log(dashboard_response)
        stateMap.$container.html(Handlebars.templates.pdf_post_dashboard({dashboard_data:dashboard_response.dashboard_data}));
        setJqueryMap();
       

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