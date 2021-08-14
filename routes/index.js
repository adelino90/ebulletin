var config=require('../config.json');
const sql = require('mssql');
var path = require('path');
var model = require('../model/model.index');
var sess;
module.exports.controller = function(app) {
app.get('/', function(req, res, next) {
 res.render('index',{title:"E-Buletin Website"});

});

app.get('/logout', function(req, res, next) {
 	req.session.destroy(function(err) {
	 	res.send("Session Destroyed");
	})
});

app.get('/getnav',function(req, res, next) {
	var session = req.session;
	model.get_navigation(session,function(data){
		res.send(data);
	});
});

app.get('/get_bulletin',function(req, res, next) {
	model.get_bulletin(function(data){
		res.send(data);
	});
});

app.post('/get_post',function(req, res) {
	var odata ={id:req.body.id, user_id:req.session.user_ID};
	model.view_post(odata,function(data){
		res.send(data);
	});
});

app.post('/view_user',function(req, res) {
	var id = req.body.id
	model.view_user(id,function(data){
		res.send(data);
	});
});

app.post('/update_user',function(req, res) {
	var data = {}
	data.user_id = req.body.user_id
	data.fname = req.body.fname
	data.lname = req.body.lname
	data.username = req.body.username
	data.password = req.body.password
	data.user_type = req.body.user_type
	model.update_user(data,function(response){
		res.send(response);
	});
});
app.post('/insert_user',function(req, res) {
	var data = {}
	data.fname = req.body.fname
	data.lname = req.body.lname
	data.username = req.body.username
	data.password = req.body.password
	data.user_type = req.body.user_type
	model.insert_user(data,function(response){
		res.send(response);
	});
});
app.get('/get_users',function(req, res) {
	model.get_all_users(function(data){
		res.send(data);
	});
});

app.get('/contacts',function(req, res) {
	var contact = "09327440704";
	var name = "Adelino R. Justo";
	
	var data = {name : name , contact:contact};
	
	res.send(data);
	
	
});
app.get('/about_us',function(req, res) {
	var description = "Dear Ms. PEDROCHE\n"+
	"I would like to signify my interest to fill-up the vacant position of Administrative Assistant\n"+
	"III at the DepEd SDO Bulacan-Elementary with Item No. (ADAS3-150160-2017) or any\n"+
	"position commensurate to my qualifications.\n"+
	"I am a graduate of Central Luzon State University, Science City of Munoz, Nueva Ecija\n"+
	"with the degree of Bachelor of Science in Information Technology. For the past year, I am\n"+
	"currently holding the position of Administrative Officer III at the General Services Division\n"+
	"at TESDA Central Office which enabled me to possess and develop the knowledge and\n"+
	"experience that will allow me to significantly contribute to the objectives of the General\n"+
	"Services Division. The trainings I attended related to the procurement law parallels the\n"+
	"requirements of TESDA for the abovementioned position. Also, I have been a Web\n"+
	"Developer in SOLUTIANAAS, a Business Process Outsourcing Company, for the period\n"+
	"of December 2016 to June 2017. I am a very capable and hardworking employee. With\n"+
	"my BS degree in Information Technology, I always look for an efficient way to finish all\n"+
	"the tasks that were given to me faster and error-free.\n"+
	"Given the chance to work in another area of competence in your office, I can prove my\n"+
	"self-worth for the position and be of big contribution in the attainment of its goal.\n"+
	"Thank you for taking the time to consider this application and I look forward to hearing\n"+
	"from you."+
	"Respectfully yours\n\n"+"Adelino R. Justo Jr.";
	
	var data = {description:description};
	
	res.send(data);
	
	
});
app.get('/getsession',  function(req,res){
	if(req.session.user_ID)
	 res.send({valid:"true"});
	else 
	 res.send({valid:"false"});

});
app.get('/getadminsession',function(req,res){
	if(req.session.req.session.usertype==1)
	 res.send({valid:"true"});
	else 
	 res.send({valid:"false"});

});
app.post('/login',function(req,res){
	var data = req.body;
	model.login(data,function(result){

				if(result.recordset.length>0){
					  req.session.user_ID = result.recordset[0].id;
					  req.session.name = result.recordset[0].first_name;
					  req.session.usertype = result.recordset[0].user_type_id;
					  res.send({valid:true,name:req.session.name})
				}
				else
				 res.send({valid:false})
		});
	
});

app.post('/upload',function(req,res){

	if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  var sampleFile = req.files.f_file;
  var name = req.files.f_file.name;
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv('./public/upload/'+name+'', function(err) {


    if (err)
      return res.status(500).send(err);
	 
	 var odata = {};
	 odata.user_ID = req.session.user_ID;
	 odata.title = req.body.title;
	 odata.subject = req.body.subject;
	 odata.name = name;
	 odata.description = req.body.description;
	 odata.date_from = req.body.date_from;
	 odata.date_to = req.body.date_to;
	 model.save_post(odata,function(rdata){
		 if(rdata.recorded){
			rdata.insert_status="Success";
			res.send(rdata);
		}
	 })
   

  });
	
});



app.post('/insert_pdf_post',function(req,res){

	if (!req.files)
    	return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  var sampleFile = req.files.filename;
  var name = req.files.filename.name;
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv('./public/pdf/'+name+'', function(err) {


    if (err)
      	return res.status(500).send(err);
	 
	 var odata = {};
	 odata.user_id = req.session.user_ID;
	 odata.pdf_title = req.body.pdf_title;
	 odata.pdf_filename = name;
	 odata.description = req.body.description;
	 odata.date_from = req.body.date_from;
	 odata.date_to = req.body.date_to;
	 model.save_pdf_post(odata,function(rdata){
		 if(rdata.recorded){
			rdata.insert_status="Success";
			res.send(rdata);
		}
	 })
   

  });
	
});





app.post('/update_upload',function(req,res){

 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 

  var sampleFile = req.body.f_file!== "" ? req.files.f_file:null;
  var filename = req.body.f_file!== "" ? req.files.f_file.name:null;
  var odata = {};
  odata.post_id = req.body.post_id;
  odata.title = req.body.title;
  odata.subject = req.body.subject;
  odata.filename = filename;
  odata.description = req.body.description;
  odata.date_from = req.body.date_from;
  odata.date_to = req.body.date_to;
  // Use the mv() method to place the file somewhere on your server 
			model.update_post(odata,function(rdata){
				if(filename!==null){
					sampleFile.mv('./public/upload/'+filename+'', function(err) {
	
						if(rdata.recorded){
						rdata.insert_status="Success";
							res.send(rdata);
						}
	
						if (err)
						return res.status(500).send(err);
	
					});
				}
				else{
					if(rdata.recorded){
						rdata.insert_status="Success";
						res.send(rdata);
					}
				}
				
			})
			


});








app.post('/approve_request',function(req,res){
	var id = req.body.id;
	model.approve_request(id,function(result){
			if(result="OK")
				res.send("OK");
	})

})


app.post('/delete_post', function(req,res){

	post_id = req.body.post_id;
	model.post_delete(post_id,function(ret){
		res.send(ret);
	});

});


app.post('/get_dashboard',function(req,res){
	var return_object={}

	 session_id =  req.session.user_ID;
	 page_number=req.body.page_number;
	 model.get_dashboard(session_id,page_number,function(ret,pagecount){
		return_object.dashboard_data=ret;
		return_object.pagecount=pagecount
		res.send(return_object);
	 });
});


app.post('/get_pdf_post',function(req,res){
	var return_object={}

	 session_id =  req.session.user_ID;
	 page_number=req.body.page_number;
	 model.get_pdf_post(session_id,page_number,function(ret,pagecount){
		return_object.dashboard_data=ret;
		return_object.pagecount=pagecount
		res.send(return_object);
	 });
});

app.get('/get_page_count',function(req,res){

	session_id =  req.session.user_ID;

   model.get_page_count(session_id,function(ret){
	   res.send(ret);
   });
});

app.get('/file', function(req,res){
	 res.render('upload',{});
});

app.post('/manage_posts', function(req,res){
	var return_object={}
	var user_id = req.session.user_ID;
	page_number=req.body.page_number;
	 model.get_admin_dashboard(user_id,page_number,function(ret,pagecount){
		return_object.dashboard_data=ret;
		return_object.pagecount=pagecount
		 res.send(return_object);
	 })
});

}