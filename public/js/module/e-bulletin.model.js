ebulletin.model = (function () {
  'use strict';
  var curryFetchData,curryStoreData,navigation,about,contact,account,pdf,dashboard,bulletin_board,curryUploadData;
  
  
  
  curryFetchData = function ( url ) {
    return function ( fn, id ) {
      id = id || '';
      $.get( url + id )
        .done( fn )
        .fail( function( jqxhr, text_status, error ) {
         console.log( 'Error occured.' );
        });
    }
  };

  curryStoreData = function ( url ) {
    return function ( data_map, fn ) {
      $.post( url, data_map )
        .done( fn )
        .fail( function( jqxhr, text_status, error ) {
          console.log( 'Error occured.' );
        });
    }
  };
 
  curryUploadData = function ( url ) {
    return function ( data_map, fn ) {
      $.ajax({
        url: url, 
        type: 'POST',
        data: data_map,
        processData: false,
        contentType: false,
        success: fn,
        fail:function( jqxhr, text_status, error ) {
          console.log( 'Error occured.' );
        }
    });
    }
  };

  account = (function(){
	 var login,get_session,logout,admin_session,view_user,update_user,insert_user;
	 login = curryStoreData('/login');
   logout = curryFetchData('/logout');
	 get_session = curryFetchData('/getsession');
   admin_session = curryFetchData('/getadminsession');
   view_user = curryStoreData('/view_user');
   update_user = curryStoreData('/update_user');
   insert_user = curryStoreData('/insert_user');
	  return {
      login:login,
	    get_session:get_session,
      logout:logout,
      admin_session:admin_session,
      view_user:view_user,
      update_user:update_user,
      insert_user:insert_user
    }
	}());

bulletin_board = (function(){
  var get_bulletin;

      get_bulletin =curryFetchData ("/get_bulletin");


    return {
      get_bulletin:get_bulletin
    }
   }());

contact= (function(){
  var get_contacts;

      get_contacts =curryFetchData ("/contacts");


    return {
      get_contacts:get_contacts
    }
   }());


  about = (function(){
  var get_about_us;

      get_about_us =curryFetchData ("/about_us");


    return {
      get_about_us:get_about_us
    }
   }());

pdf =  (function(){
   var submitpdfdata,update_pdf_post,update_pdf_post2,edit_view_pdf_post,get_pdf_post,get_pdf_post_for_aprroval 

   submitpdfdata = curryUploadData("/insert_pdf_post");
   update_pdf_post = curryUploadData("/update_pdf_post");
   update_pdf_post2 = curryStoreData("/update_pdf_post");
   edit_view_pdf_post = curryStoreData("edit_view_pdf_post")
   get_pdf_post_for_aprroval =  curryStoreData("/get_pdf_post_for_aprroval"); 
   get_pdf_post = curryStoreData("/get_pdf_post");

  return {
      submitpdfdata:submitpdfdata,
      get_pdf_post_for_aprroval:get_pdf_post_for_aprroval,
      get_pdf_post:get_pdf_post,
      edit_view_pdf_post:edit_view_pdf_post,
      update_pdf_post:update_pdf_post,
      update_pdf_post2:update_pdf_post2
      }
  
     }());


dashboard = (function(){
  
  
   var submitdata,submitpdfdata,get_dashboard,get_pdf_post,get_pdf_post_for_aprroval,delete_post,get_admin_post,get_admin_pdf_post,get_post,approve_request,get_users,update_upload,update_upload2;

     submitdata = curryUploadData("/upload");
     submitpdfdata = curryUploadData("/insert_pdf_post");
     update_upload=curryUploadData("/update_upload");
     update_upload2=curryStoreData("/update_upload");
     get_dashboard = curryStoreData("/get_dashboard");
     get_pdf_post = curryStoreData("/get_pdf_post");
     delete_post = curryStoreData("/delete_post");
     get_admin_post = curryStoreData("/manage_posts");      
     get_admin_pdf_post = curryStoreData("/manage_pdf_posts");   
     get_post =  curryStoreData("/get_post");     
     get_pdf_post_for_aprroval =  curryStoreData("/get_pdf_post_for_aprroval"); 
     approve_request =  curryStoreData("/approve_request");   
     get_users =  curryFetchData("/get_users");
     
    return {
    submitdata:submitdata,
    submitpdfdata:submitpdfdata,
    get_dashboard:get_dashboard,
    delete_post:delete_post,
    get_admin_post:get_admin_post,
    get_pdf_post_for_aprroval:get_pdf_post_for_aprroval,
    get_admin_pdf_post:get_admin_pdf_post,
    get_post:get_post,
    approve_request:approve_request,
    get_users:get_users,
    update_upload:update_upload,
    update_upload2:update_upload2,
    get_pdf_post:get_pdf_post
    }

   }());


navigation = (function(){
  
   var get_nav;

     get_nav = curryFetchData("/getnav");
     

    return {
    get_nav:get_nav
    }

   }());

    return {
    navigation : navigation,
    contact    :contact,
    about      :about,
    account     :account,
    dashboard   :dashboard,
    bulletin_board :bulletin_board,
    pdf:pdf
  };
  }());
