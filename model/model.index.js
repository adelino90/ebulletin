
var config=require('../config.json');
const sql = require('mssql');
process.setMaxListeners(0);
const gpool = new sql.ConnectionPool(config)
 
gpool.connect(err => {
    // ... 
})
login = function(data,callback){

            sql.close();
		    user=data.username;
		    pass=data.password;
		    sql.connect(config).then(pool => {
			    
			return pool.request()
			.input('input_parameter', sql.NVarChar, user)
			.input('input_parameter2', sql.NVarChar, pass)
			.query('select * from ebulletin_account_tbl where username = @input_parameter AND password=@input_parameter2')
			}).then(result => {
				callback(result)
			});
}
get_navigation = function(session,callback){

    	var menu = {navigation:[
			{bEnabled:true,bGranted:true,bVisible:true,nCaption:"HOME",nId:1,option:"home"},
			{bEnabled:true,bGranted:true,bVisible:true,nCaption:"CONTACT US",nId:2,option:"contact"},
			{bEnabled:true,bGranted:true,bVisible:true,dropdown:true,dropdown_options:[{id:1,option:(session.usertype == 2 ? "dashboard" : "manage_posts"),nCaption:(session.usertype == 2 ? "My Dashboard" : "Manage Posts")},
			{id:2,option:"sign_out",nCaption:"Sign Out"}],nCaption:"Welcome",nId:3,option:"none"}
			,{bEnabled:true,bGranted:true,bVisible:true,nCaption:"ABOUT",nId:4,option:"about"}
			],
			name:session.name};
			if(session.usertype == 1)
			menu.navigation[2].dropdown_options.splice(1,0,{id:3,option:"manage_users",nCaption:"Manage Users"})
            callback(menu);
}

get_bulletin = function(callback){
	 var ret;
	 sql.close();
	const request = new sql.Request(gpool)
		request.execute('get_bulletin', (err, result) => {
	
		callback(result.recordset);
    // ... 
	})
}
save_post = function(data,callback){

	sql.close();
				const request = new sql.Request(gpool)
				.input('user_id', sql.Int, data.user_ID)
				.input('title', sql.NVarChar, data.title)
				.input('subject', sql.NVarChar, data.subject)
				.input('filename', sql.NVarChar, data.name)
				.input('description', sql.NVarChar, data.description)
				.input('pdate_from', sql.NVarChar, data.date_from)
				.input('pdate_to',  sql.NVarChar,data.date_to)
				.input('status',  sql.NVarChar, false)
				request.execute('insert_post', (err, result) => {
					result.recorded=true;

				callback(result);
			// ... 
			}).on('error', err => {
				console.log(err)
				callback(err)
		 })
		// var result={recorded:true};
		 //callback(result);
		 
}


update_post = function(data,callback){
	sql.close();
		const request = new sql.Request(gpool)
		.input('post_id', sql.Int, data.post_id)
		.input('title', sql.NVarChar, data.title)
		.input('subject', sql.NVarChar, data.subject)
		.input('filename', sql.NVarChar, data.filename)
		.input('description', sql.NVarChar, data.description)
		.input('pdate_from', sql.NVarChar, data.date_from)
		.input('pdate_to',  sql.NVarChar,data.date_to)
		request.execute('update_user_post', (err, result) => {
			result.recorded=true;
		callback(result);
	// ... 
	})
}

post_delete = function(id,callback){
      sql.close();
	  sql.connect(config).then(pool => {
	  return pool.request()
	  .input('post_id', sql.Int, id)
	  .execute('delete_post')
	  }).then(result => {
	     callback(result.recordset)
	  }).catch(err => {
			callback(err) 
	  })	
	  sql.on('error', err => {
		    callback(err)
	 })
}

get_dashboard = function(session_id,callback){
		 sql.close();
	  const request = new sql.Request(gpool)
	  	request.input('user_id', sql.Int, session_id)
		request.execute('get_dashboard', (err, result) => {
		
		callback(result.recordset);
    // ... 
	})

}

get_dashboard = function(session_id,page_number,callback){
	sql.close();
 const request1 = new sql.Request(gpool)
 const request2 = new sql.Request(gpool)

 request1.input('user_id', sql.Int, session_id)
 request1.execute('get_page_count', (err1, result1) => {


	 request2.input('user_id', sql.Int, session_id)
	 request2.input('page_number', sql.Int, page_number)
   	 request2.execute('get_dashboard', (err2, result2) => {
		var totalpage=0;
		if(result1.recordset[0].pagecount%5!=0&&result1.recordset[0].pagecount>5){
			totalpage=parseInt((result1.recordset[0].pagecount/5)+1);
		}
		if(result1.recordset[0].pagecount<=5){
			totalpage=0;
		}
		if(result1.recordset[0].pagecount%5==0)
			totalpage=result1.recordset[0].pagecount/5;
   	callback(result2.recordset,totalpage);
// ... 
	})
})

}
get_admin_dashboard = function(id,callback){
      sql.close();
	  const request = new sql.Request(gpool)
	  	request.input('user_id', sql.Int, id)
		request.execute('admin_post_view', (err, result) => {
		
		callback(result.recordset);
    // ... 
	})
}


view_post = function(data,callback){


	var id = data.id, user_id = data.user_id
	sql.close();

	  const request1 = new sql.Request(gpool)
		request1.input('user_id', sql.Int,user_id)
		request1.input('id', sql.Int,id)
		request1.query('INSERT into post_tbl_view(post_id,user_id) values (@id, @user_ID)', (err, result) => {

	})

	    sql.close();
	  const request2 = new sql.Request(gpool)
	  	request2.input('id', sql.Int, id)
		request2.execute('view_post', (err, result) => {
	
		callback(result.recordset);
    // ... 
	})

}


update_user = function(data,callback){
	sql.close();
	sql.connect(config, err => {


    new sql.Request()
		.input('user_id', sql.Int, data.user_id)
		.input('fname', sql.NVarChar, data.fname)
		.input('lname', sql.NVarChar, data.lname)
		.input('username', sql.NVarChar, data.username)
		.input('password', sql.NVarChar, data.password)
		.input('user_type', sql.Int, data.user_type)
		.execute('update_user', (err, result) => {
			callback(result.recordset)
		})
	})
	sql.on('error', err => {
		callback(err)
	})
}

insert_user = function(data,callback){
	sql.close();
	sql.connect(config, err => {


    new sql.Request()
		.input('fname', sql.NVarChar, data.fname)
		.input('lname', sql.NVarChar, data.lname)
		.input('username', sql.NVarChar, data.username)
		.input('password', sql.NVarChar, data.password)
		.input('user_type', sql.Int, data.user_type)
		.execute('insert_user', (err, result) => {
			callback(result.recordset)
		})
	})
	sql.on('error', err => {
		callback(err)
	})
}
get_all_users = function(callback){
	  sql.close();
	sql.connect(config, err => {
    new sql.Request()
		.execute('view_all_users', (err, result) => {
			callback(result.recordset)
		})
	})
	sql.on('error', err => {
		callback(err)
	})
}
approve_request = function(id,callback){
	var id = id;
	sql.close();
	sql.connect(config, err => {
    new sql.Request()
		.input('post_id', sql.Int, id)
		.execute('approve_request', (err, result) => {

			callback("OK");
		})
	})
	sql.on('error', err => {
		callback(err)
	})
}
view_user = function(id,callback){
	var id = id;
	var obj = {};
	sql.close();
	sql.connect(config, err => {


	 new sql.Request().query('Select * from user_type', (err, result) => {
		 obj.dropdown  = result.recordset;
    })

    new sql.Request()
		.input('id', sql.Int, id)
		.execute('view_user', (err, result) => {
			obj.data  = result.recordset[0];
			callback(obj)
		})


	})
	sql.on('error', err => {
		callback(err)
	})
}
exports.insert_user = insert_user;
exports.update_user = update_user;
exports.approve_request = approve_request;
exports.view_post = view_post;
exports.get_admin_dashboard = get_admin_dashboard;
exports.get_dashboard = get_dashboard;
exports.post_delete = post_delete;
exports.save_post = save_post;
exports.update_post = update_post;
exports.get_navigation = get_navigation;
exports.login = login;
exports.get_all_users = get_all_users;
exports.view_user = view_user;
exports.get_bulletin = get_bulletin;