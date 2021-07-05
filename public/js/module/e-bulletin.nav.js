ebulletin.nav = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String()
        +' <nav class="navbar navbar-inverse">'
	    +'  <div class="container-fluid">'
        +' 		<div class="navbar-header">'
        +' 			 <a class="navbar-brand" href="#">E-bulletin</a>'
        +' 	    </div>'
        + '  	<ul class="ebulletin-nav-list nav navbar-nav">'
        + '  	</ul>'
	    + ' <ul class="ebulletin-nav-right-list nav navbar-nav navbar-right">'
		+ '  </ul>'
        + '	 </div>'
        +' </nav>'
		
		+'<div class="modal fade" id="ebulletin_login" role="dialog">'
			+'<div class="modal-dialog">'
				+' <div class="modal-content">'
					+'<div class="ebulletin_login_modal_header modal-header">'
						+' <button type="button" class="close" data-dismiss="modal">&times;</button>'
						+' <h4 class="modal-title">Login To E-bulletin System</h4>'
					+'</div>'
					+'<div class="ebulletin-login-modal-body modal-body">'
          +'  <div class="col-md-12 error_div">'
          +'  </div>'
					+'  <div class="form-group">'
							+'<label for="username">Username:</label>'
							+'<input type="text" class="form-control" id="username">'
						+'</div>'
						+'<div class="form-group">'
							+'<label for="pwd">Password:</label>'
							+'	<input type="password" class="form-control" id="password">'
						+' </div>'
						+'<div class="checkbox">'
							+'<label><input type="checkbox"> Remember me</label>'
							+'  </div>	'
						+'</div>'
						+'<div class="modal-footer">'
							+'<button type="submit" id="login_submit" class="btn btn-primary">Login</button>'
							+' <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
						+'</div>'
				+' </div>  '
			+'</div>'
		+'</div>',

	 settable_map : {
		account_model:true,
        menu_model        : true,
        set_option_anchor : true,
        user_model        :true,
        $container:true
      },
	  account_model		: null,
      menu_model        : null,
      set_option_anchor : null,
      user_model        : null,
      $container :null
    },
    stateMap  = {
      $append_target : null
    },
    jqueryMap = {},
    setJqueryMap, configModule, initModule, set_navigation, onTapMenu,onlogout,signIn,helper;
	

	
	
	
   setJqueryMap = function () {
    var
      $append_target = stateMap.$append_target,
      $nav           = $append_target.find( '.navbar' ),
	   $ebulletin_login = $append_target.find('#ebulletin_login');
    jqueryMap = {
    $nav      : $nav,
    $options  : $nav.find( '.ebulletin-nav-list' ),
	  $right_options  : $nav.find( '.ebulletin-nav-right-list' ),
	  $right_options_li  : $nav.find( '.ebulletin-nav-right-list-li' ),
	  $account_button : $nav.find('.ebulletin-navigatioin-dropdown'),
	  $login_button : $ebulletin_login.find('#login_submit'),
	  $username : $ebulletin_login.find('#username'),
	  $password: $ebulletin_login.find('#password'),
     $error : $ebulletin_login.find('.error_div'),
    $login_modal :$ebulletin_login,
      $window   : $(window)
    };
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

    Handlebars.registerHelper('list', function(items, options) {
      var out = '';
      for(var i=0, l=items.length; i<l; i++) {
        out = out +'<li class="ebulletin-dropdown-li" data-id="'+items[i].option+'"><a>'+items[i].nCaption+'</a></li>';
      }
      
      return out;
    });
  }

	signIn = function(){
    var values={};
    values.username = jqueryMap.$username.val();
    values.password = jqueryMap.$password.val();
   	configMap.account_model.login(values,function(response){
        if(response.valid){
         		configMap.menu_model.get_nav(function ( menu_data ) { 
                var dropdown = {dropdown:menu_data.navigation[2].dropdown_options,name:menu_data.name};
                 jqueryMap.$right_options.html(Handlebars.templates.dropdown_options(dropdown));
                setJqueryMap();
                jqueryMap.$right_options_li.children().click(onTapMenu);
        	  });
          	jqueryMap.$login_modal.modal('toggle');
        }
        else{
          jqueryMap.$error.html('<div class="alert alert-danger">\
                                  <strong>Invalid User</strong>\
                                </div>');
        }
     });
     setJqueryMap();
  }


  
  set_navigation = function(){
	  	
    configMap.menu_model.get_nav(function ( menu_data ) { 
          for(var i=0;i<menu_data.navigation.length;i++){
                if(menu_data.navigation[i].dropdown){             
                  var dropdown = {dropdown:menu_data.navigation[i].dropdown_options,name:menu_data.name};
                      jqueryMap.$right_options.html(Handlebars.templates.dropdown_options(dropdown));
                }
                else{	
                        jqueryMap.$options.append('<li class="ebulletin-nav-menu" data-id="'+menu_data.navigation[i].option+'"><a>'+menu_data.navigation[i].nCaption+'</a></li>');
              }
              setJqueryMap();
              jqueryMap.$right_options_li.children().click(onTapMenu);
              jqueryMap.$options.children().click(onTapMenu);
            }
            configMap.account_model.get_session(function(data){
                if(data.valid=="false"){
                  jqueryMap.$right_options.off().empty();
                  jqueryMap.$right_options.html('<button type="button" class="btn btn-info btn-md" data-toggle="modal" data-target="#ebulletin_login"> &nbsp;Login&nbsp;</button>')
                  setJqueryMap();
                  jqueryMap.$password.keypress(function(e) {e.which == 13 && signIn()});
                  jqueryMap.$login_button.click(signIn);
                }
            });
    });
	  
  }

	
  onTapMenu = function (event) {
      var option;
    try {  
		option = $(this).attr('data-id')
				 $(this).siblings().removeClass('active');
         jqueryMap.$options.children().removeClass('active');
         jqueryMap.$right_options_li.children().removeClass('active');
				 $(this).parent().parent().removeClass('open');
		 $(this).addClass('active');
	
				configMap.set_option_anchor(option,'ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ));
	
			
		
		
    }
    catch ( error ) {
      return false;
    }
 
    return false; 
  };
	
   initModule = function ( $append_target ) {
    var $list_box;
    helper();//set handlebars helper
    // load nav html and jquery cache
    stateMap.$append_target = $append_target;
    $append_target.html( configMap.main_html );
    setJqueryMap();
  	set_navigation();

  

    // bind user input events

  };
  // End public method /initModule/

  // return public methods
  return {
    configModule : configModule,
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
