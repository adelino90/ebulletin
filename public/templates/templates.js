(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['about'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <div class = \"col-md-12\">\r\n		<h1>About Us</h1>\r\n		\r\n                <p class=\"about\">"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n        </div>\r\n ";
},"useData":true});
templates['contact'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " <div class = \"col-md-12\">\n		<h1>contact us</h1>\n		\n \n    <label> <b>Name:</b></label> "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "<br>\n \n        <label> <b>Contact Number:</b></label>  "
    + alias4(((helper = (helper = helpers.contact || (depth0 != null ? depth0.contact : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"contact","hash":{},"data":data}) : helper)))
    + "\n\n\n        </div>\n ";
},"useData":true});
templates['content'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id = \"e-bulletin-main-content\" class=\"row\">\n		\n			<div class=\"col-md-12 ebulletin-navigtion\">\n				\n			</div>\n		\n	\n			<div class=\"col-md-9 ebulletin-content\">\n				\n			</div>\n			<div class=\"col-md-3 ebulletin-content-side-content\">\n				\n			</div>\n\n\n		<div class=\"footer\">\n			<p>@All Rights Reserved<br>E Bulletin 2021</p>\n		</div>\n	</div>";
},"useData":true});
templates['dashboard'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "												<tr>\n														<td class=\"post_title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\n														<td><span class=\""
    + alias4(((helper = (helper = helpers.stat || (depth0 != null ? depth0.stat : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stat","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.stat || (depth0 != null ? depth0.stat : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stat","hash":{},"data":data}) : helper)))
    + "</span></td>\n														<td>"
    + alias4(((helper = (helper = helpers.date_submited || (depth0 != null ? depth0.date_submited : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date_submited","hash":{},"data":data}) : helper)))
    + "</td>\n														<td><i class=\"fa fa-pencil-square-o ebulletin-dashboard-edit\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "></i>&nbsp;<i class=\"fa fa-trash ebulletin-dashboard-delete\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "></i></td>\n												</tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n				<div class=\"col-md-12 ebulletin-dashboard-content\">\n					<div class=\"row\">\n						<div class=\"col-md-12 ebulletin-dashboard-options\">\n							<div class=\"row\">\n								<div class=\"ebulletin-dashboard-options-left\">\n									<h4>Welcome To Your Main Post Dashboard</h4>\n								</div>\n								<div class=\"ebulletin-dashboard-options-right\">\n									<button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ebulletin-add-post-container\">Add Post</button>\n								</div>\n							</div>\n					\n						</div>\n					</div>\n					<div class=\"row\">\n						<div class=\"col-md-12 ebulletin-dashboard-list\">\n							<div class=\"col-md-12 \">\n								<h4>Posts</h4>\n							</div>\n							<div class = \"row\">\n								<div class=\"col-md-12\">\n								<table class=\"table ebulletin-dashboard-table\">\n									<thead>\n									  <tr>\n										<th>Title</th>\n										<th>Status</th>\n										<th>Date Submitted</th>\n										<th>Action</th>\n									  </tr>\n									</thead>\n									<tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.dashboard_data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "									</tbody>\n								  </table>\n								</div>\n							</div>\n						</div>\n					</div>\n				</div>\n\n		\n		<!-- Modal -->\n			<div id=\"ebulletin-add-post-container\" class=\"modal fade\" role=\"dialog\">\n				  <div class=\"modal-dialog\">\n\n					<!-- Modal content-->\n					<div class=\"modal-content\">\n					  <div class=\"ebulletin-dahboard-modal-header modal-header\">\n						<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n						<h4 class=\"modal-title\">Add Post</h4>\n					  </div>\n					  <div class=\"modal-body ebulletin-add-post-modal-body\">\n							<div class=\"form-group success_div text-center\">\n								\n							</div>\n							 <div class=\"form-group\">\n								  <input class=\"form-control t_title\" id=\"t_title\" placeholder=\"Title\" type=\"text\">\n							</div>\n							 <div class=\"form-group\">\n								  <input class=\"form-control s_subject\" id=\"s_subject\" placeholder=\"Subject\" type=\"text\">\n							</div>\n							 <div class=\"form-group\">\n								  <label for=\"focusedInput\">File</label>\n								  <input class=\"form-control\" id=\"f_file\" type=\"file\">\n							</div>\n							<div class=\"form-group\">\n							  <textarea class=\"form-control description\" rows=\"5\" placeholder=\"Description\" id=\"description\"></textarea>\n							</div>\n							<div class=\"form-group\">\n								<div class=\"row\">\n									<div class=\"col-md-12\">\n										<label for=\"comment\">Posting Date:</label>\n									</div>\n									<div class=\"col-md-5\">\n										<input class=\"form-control posting_date_from\" id=\"posting_date_from\" placeholder=\"From\"  type=\"text\">\n									 </div>\n									 <div class=\"col-md-5\">\n										<input class=\"form-control posting_date_to\" id=\"posting_date_to\" placeholder=\"To\"  type=\"text\">\n									 </div>\n								</div>\n							</div>\n					  </div>\n					  <div class=\"modal-footer\">\n						<input type=\"image\" id = \"submit\" src=\"../images/icon/save.png\" />\n						<input type=\"image\" id = \"cancel\" data-dismiss=\"modal\" src=\"../images/icon/cancel.png\" />\n					  </div>\n					</div>\n\n				  </div>\n			</div>";
},"useData":true});
templates['dashboard_data'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "												<tr>\r\n														<td class=\"post_title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\r\n														<td><span class=\""
    + alias4(((helper = (helper = helpers.stat || (depth0 != null ? depth0.stat : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stat","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.stat || (depth0 != null ? depth0.stat : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stat","hash":{},"data":data}) : helper)))
    + "</span></td>\r\n														<td>"
    + alias4(((helper = (helper = helpers.date_submited || (depth0 != null ? depth0.date_submited : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date_submited","hash":{},"data":data}) : helper)))
    + "</td>\r\n														<td><i class=\"fa fa-pencil-square-o ebulletin-dashboard-edit\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "></i>&nbsp;<i class=\"fa fa-trash ebulletin-dashboard-delete\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "></i></td>\r\n												</tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.dashboard_data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['dropdown_options'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.option || (depth0 != null ? depth0.option : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.nCaption || (depth0 != null ? depth0.nCaption : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nCaption","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "		<div class=\"ebulletin-navigatioin-dropdown dropdown\">\n                    <button class=\"btn btn-primary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Welcome "
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n                    <span class=\"caret\"></span></button>\n                    <ul class=\"ebulletin-nav-right-list-li dropdown-menu\">\n		  "
    + ((stack1 = (helpers.list || (depth0 && depth0.list) || alias2).call(alias1,(depth0 != null ? depth0.dropdown : depth0),{"name":"list","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n		  </ul>\n					        </div>";
},"useData":true});
templates['edit_view_post'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "													\r\n													<button type=\"button\" class=\"modal__btn\" data-id=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + "\" id = \"Cancel\">Cancel</button>	\r\n												   \r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "													<button type=\"button\" class=\"modal__btn\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" id = \"Save\">Save</button>\r\n													<button type=\"button\" class=\"modal__btn\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" id = \"Cancel\">Cancel</button>	\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " \r\n\r\n					<div class=\"row\">\r\n						<div class =\"col-md-6 col-md-offset-3 post_container\">\r\n							<div class=\"row\">\r\n										<div class =\"col-md-12\">\r\n											<div class=\"form-group\">\r\n													<label for=\"focusedInput\">Title</label>\r\n													<input class=\"form-control\" id=\"t_title\" type=\"text\" value =\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\r\n											</div>\r\n										</div>\r\n							</div>\r\n\r\n							<div class=\"row\">\r\n										<div class =\"col-md-12\">\r\n											<div class=\"form-group\">\r\n													<label for=\"focusedInput\">Subject</label>\r\n													<input class=\"form-control\" id=\"s_subject\" type=\"text\" value = \""
    + alias4(((helper = (helper = helpers.subject || (depth0 != null ? depth0.subject : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subject","hash":{},"data":data}) : helper)))
    + "\">\r\n											</div>\r\n									</div>\r\n							</div>\r\n\r\n							<div class=\"row\">\r\n										<div class =\"col-md-12\">					\r\n												<div class=\"form-group\">\r\n														<label for=\"focusedInput\">File</label>\r\n													<img id=\"img_post_image\" src=\"../upload/"
    + alias4(((helper = (helper = helpers.filename || (depth0 != null ? depth0.filename : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filename","hash":{},"data":data}) : helper)))
    + "\" class=\"img-rounded\" alt=\"Cinque Terre\">\r\n													 <button type=\"button\" class=\"modal__btn\" id=\"toggle-btn\"\r\n  														data-toggle=\"collapse\" data-target=\"#toggle-example\">Upload New File</button>\r\n													<div id=\"toggle-example\" class=\"collapse out\">\r\n													<input class=\"form-control\" id=\"f_file\" type=\"file\" value =\"../upload/"
    + alias4(((helper = (helper = helpers.filename || (depth0 != null ? depth0.filename : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filename","hash":{},"data":data}) : helper)))
    + "\">\r\n												 	</div>	\r\n												</div>\r\n									</div>\r\n							</div>\r\n\r\n							<div class=\"row\">\r\n										<div class =\"col-md-12\">	\r\n												<div class=\"form-group\">\r\n													<label for=\"comment\">Description:</label>\r\n													<textarea class=\"form-control\" rows=\"5\" id=\"description\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea>\r\n												</div>\r\n										</div>\r\n							</div>\r\n\r\n							<div class=\"row\">\r\n										<div class =\"col-md-12\">\r\n											<div class=\"form-group\">\r\n												<div class=\"row\">\r\n													<div class=\"col-md-12\">\r\n														<label for=\"comment\">Posting Date:</label>\r\n													</div>\r\n													<div class=\"col-md-5\">\r\n														<input class=\"form-control\" id=\"posting_date_from\" placeholder=\"From\" value =\""
    + alias4(((helper = (helper = helpers.posting_date_from || (depth0 != null ? depth0.posting_date_from : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posting_date_from","hash":{},"data":data}) : helper)))
    + "\"  type=\"text\">\r\n													</div>\r\n													<div class=\"col-md-5\">\r\n														<input class=\"form-control\" id=\"posting_date_to\" placeholder=\"To\"  value =\""
    + alias4(((helper = (helper = helpers.posting_date_to || (depth0 != null ? depth0.posting_date_to : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posting_date_to","hash":{},"data":data}) : helper)))
    + "\"  type=\"text\">\r\n													</div>\r\n												</div>\r\n											</div>\r\n					 					</div>\r\n							</div>\r\n							<div class=\"row\">\r\n										<div class =\"col-md-12\">\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "											\r\n										</div>\r\n							</div>\r\n					</div>\r\n                \r\n				</div>	\r\n\r\n";
},"useData":true});
templates['home'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <li data-target=\"#myCarousel\" data-slide-to=\""
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + "\"></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <div class=\"item "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(data && data.index),0,{"name":"ifCond","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                  <img src=\"../upload/"
    + alias4(((helper = (helper = helpers.Files || (depth0 != null ? depth0.Files : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Files","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.subject || (depth0 != null ? depth0.subject : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subject","hash":{},"data":data}) : helper)))
    + "\" width=\"760\" height=\"345\">\n                  <div class=\"carousel-caption\">\n                   <!--  <h3>"
    + alias4(((helper = (helper = helpers.subject || (depth0 != null ? depth0.subject : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subject","hash":{},"data":data}) : helper)))
    + "</h3>\n                    <p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>-->\n                  </div>\n                </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return " <div class = \"col-md-9\">\n	 <div id=\"myCarousel\" class=\"carousel slide\" data-ride=\"carousel\">\n    <!-- Indicators -->\n    <ol class=\"carousel-indicators\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.bulletin_data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ol>\n\n    <!-- Wrapper for slides -->\n    <div class=\"carousel-inner\" role=\"listbox\">\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.bulletin_data : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  \n    </div>\n\n    <!-- Left and right controls -->\n    <a class=\"left carousel-control\" href=\"#myCarousel\" role=\"button\" data-slide=\"prev\">\n      <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Previous</span>\n    </a>\n    <a class=\"right carousel-control\" href=\"#myCarousel\" role=\"button\" data-slide=\"next\">\n      <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Next</span>\n    </a>\n  </div>\n      \n\n        </div>\n \n  <div class = \"col-md-3\">\n		<h1>Home</h1>\n		\n \n    <label> Welcome To Home<br>\n \n      \n\n        </div>\n ";
},"useData":true});
templates['image_popup'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"image-modal-popup\">\r\n					<div class=\"wrapper\">\r\n					<span id=\"close\">&times;</span>\r\n					<img id=\"image_modal_show\" src=\"\" alt=\"Image Modal\">\r\n					<div class=\"description\">\r\n						<h1></h1>\r\n					\r\n					</div>\r\n					</div>\r\n				</div>";
},"useData":true});
templates['index'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <li data-target=\"#myCarousel\" data-slide-to=\""
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + "\"></li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <div class=\"item "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(data && data.index),0,{"name":"ifCond","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n                  <img src=\"../upload/"
    + alias4(((helper = (helper = helpers.Files || (depth0 != null ? depth0.Files : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Files","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.subject || (depth0 != null ? depth0.subject : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subject","hash":{},"data":data}) : helper)))
    + "\" width=\"760\" height=\"345\">\r\n                  <div class=\"carousel-caption\">\r\n                   <!-- <h3>"
    + alias4(((helper = (helper = helpers.subject || (depth0 != null ? depth0.subject : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subject","hash":{},"data":data}) : helper)))
    + "</h3>\r\n                    <p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>-->\r\n                  </div>\r\n                </div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return " <div class = \"col-md-9\">\r\n	 <div id=\"myCarousel\" class=\"carousel slide\" data-ride=\"carousel\">\r\n    <!-- Indicators -->\r\n    <ol class=\"carousel-indicators\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.bulletin_data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ol>\r\n\r\n    <!-- Wrapper for slides -->\r\n    <div class=\"carousel-inner\" role=\"listbox\">\r\n\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.bulletin_data : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n  \r\n    </div>\r\n\r\n    <!-- Left and right controls -->\r\n    <a class=\"left carousel-control\" href=\"#myCarousel\" role=\"button\" data-slide=\"prev\">\r\n      <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>\r\n      <span class=\"sr-only\">Previous</span>\r\n    </a>\r\n    <a class=\"right carousel-control\" href=\"#myCarousel\" role=\"button\" data-slide=\"next\">\r\n      <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>\r\n      <span class=\"sr-only\">Next</span>\r\n    </a>\r\n  </div>\r\n      \r\n\r\n        </div>";
},"useData":true});
templates['loader'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "  <div style=\"display: none;\" class=\"pop-up-container loader\">\r\n        <img src=\"../images/1488.gif\">\r\n            \r\n        </div>";
},"useData":true});
templates['pagination'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "    <div class=\"pagination\">\r\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.startFromFirstPage : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.pages : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.endAtLastPage : depth0),{"name":"unless","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "     <a class=\"prev page-numbers\" data-id=\"prev\" href=\"javascript:;\">prev</a>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isCurrent : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.isCurrent : depth0),{"name":"unless","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <span aria-current=\"page\" class=\"page-numbers current\" data-id=\""
    + alias4(((helper = (helper = helpers.page || (depth0 != null ? depth0.page : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"page","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.page || (depth0 != null ? depth0.page : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"page","hash":{},"data":data}) : helper)))
    + "</span>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <a class=\"page-numbers\"  href=\"javascript:;\" data-id=\""
    + alias4(((helper = (helper = helpers.page || (depth0 != null ? depth0.page : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"page","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.page || (depth0 != null ? depth0.page : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"page","hash":{},"data":data}) : helper)))
    + "</a>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "       <a class=\"next page-numbers\" data-id=\"next\" href=\"javascript:;\">next</a>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"pagination-wrapper\">\r\n"
    + ((stack1 = (helpers.pagination || (depth0 && depth0.pagination) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.currentPage : depth0),(depth0 != null ? depth0.pageCount : depth0),(depth0 != null ? depth0.size : depth0),{"name":"pagination","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true});
templates['pdf_dashboard_data'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "												<tr>\r\n														<td class=\"post_title\">"
    + alias4(((helper = (helper = helpers.pdf_title || (depth0 != null ? depth0.pdf_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pdf_title","hash":{},"data":data}) : helper)))
    + "</td>\r\n														<td><span class=\""
    + alias4(((helper = (helper = helpers.stat || (depth0 != null ? depth0.stat : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stat","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.pdf_filename || (depth0 != null ? depth0.pdf_filename : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pdf_filename","hash":{},"data":data}) : helper)))
    + "</span></td>\r\n														<td>"
    + alias4(((helper = (helper = helpers.datesubmitted || (depth0 != null ? depth0.datesubmitted : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datesubmitted","hash":{},"data":data}) : helper)))
    + "</td>\r\n														<td><i class=\"fa fa-pencil-square-o ebulletin-dashboard-edit\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "></i>&nbsp;<i class=\"fa fa-trash ebulletin-dashboard-delete\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "></i></td>\r\n												</tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.dashboard_data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['pdf_popup'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"pdf-modal-popup\">\r\n					<div class=\"wrapper\">\r\n					<span id=\"close\">&times;</span>\r\n					<h1>This Function is a Test and Still in Development</h1>\r\n					<iframe id =\"pdfframe\" style=\"height:900px;width:900px\" title=\"Iframe Example\"></iframe>\r\n					</div>\r\n					</div>\r\n				</div>";
},"useData":true});
templates['pdf_post_dashboard'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "												<tr>\r\n														<td class=\"post_title\">"
    + alias4(((helper = (helper = helpers.pdf_title || (depth0 != null ? depth0.pdf_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pdf_title","hash":{},"data":data}) : helper)))
    + "</td>\r\n														<td><span class=\""
    + alias4(((helper = (helper = helpers.stat || (depth0 != null ? depth0.stat : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stat","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.pdf_filename || (depth0 != null ? depth0.pdf_filename : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pdf_filename","hash":{},"data":data}) : helper)))
    + "</span></td>\r\n														<td>"
    + alias4(((helper = (helper = helpers.datesubmitted || (depth0 != null ? depth0.datesubmitted : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datesubmitted","hash":{},"data":data}) : helper)))
    + "</td>\r\n														<td><i class=\"fa fa-pencil-square-o ebulletin-dashboard-edit\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "></i>&nbsp;<i class=\"fa fa-trash ebulletin-dashboard-delete\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "></i></td>\r\n												</tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n				<div class=\"col-md-12 ebulletin-dashboard-content\">\r\n					<div class=\"row\">\r\n						<div class=\"col-md-12 ebulletin-dashboard-options\">\r\n							<div class=\"row\">\r\n								<div class=\"ebulletin-dashboard-options-left\">\r\n									<h4>Welcome To Your PDF Post Dashboard</h4>\r\n								</div>\r\n								<div class=\"ebulletin-dashboard-options-right\">\r\n									<button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ebulletin-add-post-container\">Add PDF Post</button>\r\n								</div>\r\n							</div>\r\n					\r\n						</div>\r\n					</div>\r\n					<div class=\"row\">\r\n						<div class=\"col-md-12 ebulletin-dashboard-list\">\r\n							<div class=\"col-md-12 \">\r\n								<h4>Posts</h4>\r\n							</div>\r\n							<div class = \"row\">\r\n								<div class=\"col-md-12\">\r\n								<table class=\"table ebulletin-pdf-dashboard-table\">\r\n									<thead>\r\n									  <tr>\r\n										<th>Title</th>\r\n										<th>File Name</th>\r\n										<th>Date Submitted</th>\r\n										<th>Action</th>\r\n									  </tr>\r\n									</thead>\r\n									<tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.dashboard_data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "									</tbody>\r\n								  </table>\r\n								</div>\r\n							</div>\r\n						</div>\r\n					</div>\r\n				</div>\r\n\r\n					<!-- Modal -->\r\n			<div id=\"ebulletin-add-post-container\" class=\"modal fade\" role=\"dialog\">\r\n				  <div class=\"modal-dialog\">\r\n\r\n					<!-- Modal content-->\r\n					<div class=\"modal-content\">\r\n					  <div class=\"ebulletin-dahboard-modal-header modal-header\">\r\n						<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n						<h4 class=\"modal-title\">Add PDF Post</h4>\r\n					  </div>\r\n					  <div class=\"modal-body ebulletin-add-post-modal-body\">\r\n							<div class=\"form-group success_div text-center\">\r\n								\r\n							</div>\r\n							 <div class=\"form-group\">\r\n								  <input class=\"form-control t_title\" id=\"t_pdf_title\" placeholder=\"Title\" type=\"text\">\r\n							</div>\r\n							 <div class=\"form-group\">\r\n								  <label for=\"focusedInput\">PDF File</label>\r\n								  <input class=\"form-control\" id=\"f_pdf_file\" type=\"file\">\r\n							</div>\r\n							<div class=\"form-group\">\r\n							  <textarea class=\"form-control description\" rows=\"5\" placeholder=\"Description\" id=\"description\"></textarea>\r\n							</div>\r\n							<div class=\"form-group\">\r\n								<div class=\"row\">\r\n									<div class=\"col-md-12\">\r\n										<label for=\"comment\">Posting Date:</label>\r\n									</div>\r\n									<div class=\"col-md-5\">\r\n										<input class=\"form-control posting_date_from\" id=\"posting_date_from\" placeholder=\"From\"  type=\"text\">\r\n									 </div>\r\n									 <div class=\"col-md-5\">\r\n										<input class=\"form-control posting_date_to\" id=\"posting_date_to\" placeholder=\"To\"  type=\"text\">\r\n									 </div>\r\n								</div>\r\n							</div>\r\n					  </div>\r\n					  <div class=\"modal-footer\">\r\n						<input type=\"image\" id = \"submit\" src=\"../images/icon/save.png\" />\r\n						<input type=\"image\" id = \"cancel\" data-dismiss=\"modal\" src=\"../images/icon/cancel.png\" />\r\n					  </div>\r\n					</div>\r\n\r\n				  </div>\r\n			</div>";
},"useData":true});
templates['popup'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "     \r\n     \r\n        <div style=\"display: none;\" class=\"pop-up-container\">\r\n\r\n            <div class=\"row pop-inner\">\r\n                <div class=\"col-md-12\">\r\n                    <button class=\"close\">X</button>\r\n                    <h2 id=\"ebulletin_popup_message\" class=\"modal__text\"></h2>\r\n                  <button class=\"confirm modal__btn \">Yes</button>\r\n                  <button class=\"cancel modal__btn \">no</button>\r\n                </div>\r\n            </div>\r\n            \r\n        </div>";
},"useData":true});
templates['post_request'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "													<tr>\n															<td>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\n															<td>"
    + alias4(((helper = (helper = helpers.poser || (depth0 != null ? depth0.poser : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"poser","hash":{},"data":data}) : helper)))
    + "</td>\n															<td><span class=\""
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "</span></td>\n															<td>"
    + alias4(((helper = (helper = helpers.date_submited || (depth0 != null ? depth0.date_submited : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date_submited","hash":{},"data":data}) : helper)))
    + "</td>\n															<td class=\"ebulletin-post_request_action\" data-id = \""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = (helpers.viewed || (depth0 && depth0.viewed) || alias2).call(alias1,(depth0 != null ? depth0.viewed : depth0),{"name":"viewed","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n													</tr>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n				<div class=\"col-md-12 ebulletin-post_request-content\">\n					<div class=\"row\">\n						<div class=\"col-md-12 ebulletin-post_request-options\">\n							<div class=\"row\">\n								<div class=\"ebulletin-post_request-options-left\">\n									<h4>Post Request Management</h4>\n								</div>\n								<div class=\"ebulletin-post_request-options-right\">\n									<button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#ebulletin-add-post-container\">Add Post</button>\n								</div>\n							</div>\n					\n						</div>\n					</div>\n					<div class=\"row\">\n						<div class=\"col-md-12 ebulletin-post_request-list\">\n							<div class=\"col-md-12 \">\n								<h4>Posts</h4>\n							</div>\n							<div class = \"row\">\n								<div class=\"col-md-12\">\n								<table class=\"table ebulletin-post_request-table\">\n									<thead>\n									  <tr>\n										<th>Title</th>\n                    <th>Posted by</th>\n										<th>Status</th>\n										<th>Date Submitted</th>\n										<th>Action</th>\n									  </tr>\n									</thead>\n									<tbody>\n										   <!-- Data Here -->\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.dashboard_data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "												<!-- data -->\n									</tbody>\n								  </table>\n								</div>\n							</div>\n						</div>\n					</div>\n				</div>\n\n		";
},"useData":true});
templates['side_content'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<table style=\"width:100%\">\r\n					<tr>\r\n						<th>Title</th>\r\n						<th>File</th>\r\n					</tr>\r\n					<tr class=\"ebulletin_side_content_table_row\">\r\n						<td class = \"ebulletin_side_content_content_title\">Prog 105 Grades</td>\r\n						<td class = \"ebulletin_side_content_filename\">prog_105_grades.pdf</td>\r\n					</tr>\r\n					<tr class=\"ebulletin_side_content_table_row\">\r\n						<td class = \"ebulletin_side_content_content_title\">Logic 100 Grades</td>\r\n						<td class = \"ebulletin_side_content_filename\">logic_100_grades.pdf</td>\r\n\r\n					</tr>\r\n				</table>";
},"useData":true});
templates['users'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "													<tr>\n															<td>"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</td>\n															<td>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</td>\n															<td>"
    + alias4(((helper = (helper = helpers.whole_name || (depth0 != null ? depth0.whole_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"whole_name","hash":{},"data":data}) : helper)))
    + "</td>\n															<td class=\"ebulletin-post_request_action\" data-id = \""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fa fa-pencil-square-o ebulletin-dashboard-edit\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "></i>&nbsp;<i class=\"fa fa-trash ebulletin-dashboard-delete\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "></i></td>\n													</tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n				<div class=\"col-md-12 ebulletin-post_request-content\">\n					<div class=\"row\">\n						<div class=\"col-md-12 ebulletin-post_request-options\">\n							<div class=\"row\">\n								<div class=\"ebulletin-post_request-options-left\">\n									<h4>User Management</h4>\n								</div>\n								<div class=\"ebulletin-post_request-options-right\">\n									<button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" id =\"ebulletin-user-add-btn\">Add User</button>\n								</div>\n							</div>\n					\n						</div>\n					</div>\n					<div class=\"row\">\n						<div class=\"col-md-12 ebulletin-post_request-list\">\n							<div class=\"col-md-12 \">\n								<h4>Users</h4>\n							</div>\n							<div class = \"row\">\n								<div class=\"col-md-12\">\n								<table class=\"table ebulletin-post_request-table\">\n									<thead>\n									  <tr>\n										<th>Type</th>\n                                        <th>Username</th>\n										<th>Name</th>\n										<th>Action</th>\n									  </tr>\n									</thead>\n									<tbody>\n										   <!-- Data Here -->\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.user_data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "												<!-- data -->\n									</tbody>\n								  </table>\n								</div>\n							</div>\n						</div>\n					</div>\n				</div>\n\n		";
},"useData":true});
templates['user_menu_page'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\r\n\r\n\r\n<div class=\"container\">\r\n  <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n        <div id=\"main_post\" class=\"main_post_menu\">\r\n          <h2>Main Post</h2>\r\n        </div>\r\n      </div>\r\n       <div class=\"col-md-6\">\r\n         <div id=\"pdf_post\" class=\"main_post_menu\">\r\n            <h2>PDF Post</h2>\r\n          </div>\r\n       </div>\r\n    \r\n  </div>\r\n</div>";
},"useData":true});
templates['user_post_data'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\r\n<td>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\r\n														<td><span class=\"pending\">Pending</span></td>\r\n														<td>"
    + alias4(((helper = (helper = helpers.date_submited || (depth0 != null ? depth0.date_submited : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date_submited","hash":{},"data":data}) : helper)))
    + "</td>\r\n														<td><i class=\"fa fa-pencil-square-o ebulletin-dashboard-edit\" data-id=\""
    + alias4(((helper = (helper = helpers.data_id || (depth0 != null ? depth0.data_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"data_id","hash":{},"data":data}) : helper)))
    + "\"></i>&nbsp;<i class=\"fa fa-trash ebulletin-dashboard-delete\" data-id=\""
    + alias4(((helper = (helper = helpers.data_id || (depth0 != null ? depth0.data_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"data_id","hash":{},"data":data}) : helper)))
    + "\"></i></td>\r\n												</tr>";
},"useData":true});
templates['view_post'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " \n\n					<div class=\"row\">\n						<div class =\"col-md-6 col-md-offset-3 post_container\">\n							<div class=\"row\">\n										<div class =\"col-md-12\">\n											<div class=\"form-group\">\n													<label for=\"focusedInput\">Title</label>\n													<input class=\"form-control\" id=\"t_title\" type=\"text\" value =\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\n											</div>\n										</div>\n							</div>\n\n							<div class=\"row\">\n										<div class =\"col-md-12\">\n											<div class=\"form-group\">\n													<label for=\"focusedInput\">Subject</label>\n													<input class=\"form-control\" id=\"s_subject\" type=\"text\" value = \""
    + alias4(((helper = (helper = helpers.subject || (depth0 != null ? depth0.subject : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subject","hash":{},"data":data}) : helper)))
    + "\">\n											</div>\n									</div>\n							</div>\n\n							<div class=\"row\">\n										<div class =\"col-md-12\">					\n												<div class=\"form-group\">\n														<label for=\"focusedInput\">File</label>\n													<img id=\"img_post_image\" src=\"../upload/"
    + alias4(((helper = (helper = helpers.filename || (depth0 != null ? depth0.filename : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filename","hash":{},"data":data}) : helper)))
    + "\" class=\"img-rounded\" alt=\"Cinque Terre\">\n												</div>\n									</div>\n							</div>\n\n							<div class=\"row\">\n										<div class =\"col-md-12\">	\n												<div class=\"form-group\">\n													<label for=\"comment\">Description:</label>\n													<textarea class=\"form-control\" rows=\"5\" id=\"description\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea>\n												</div>\n										</div>\n							</div>\n\n							<div class=\"row\">\n										<div class =\"col-md-12\">\n											<div class=\"form-group\">\n												<div class=\"row\">\n													<div class=\"col-md-12\">\n														<label for=\"comment\">Posting Date:</label>\n													</div>\n													<div class=\"col-md-5\">\n														<input class=\"form-control\" id=\"posting_date_from\" placeholder=\"From\" value =\""
    + alias4(((helper = (helper = helpers.posting_date_from || (depth0 != null ? depth0.posting_date_from : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posting_date_from","hash":{},"data":data}) : helper)))
    + "\"  type=\"text\">\n													</div>\n													<div class=\"col-md-5\">\n														<input class=\"form-control\" id=\"posting_date_to\" placeholder=\"To\"  value =\""
    + alias4(((helper = (helper = helpers.posting_date_to || (depth0 != null ? depth0.posting_date_to : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posting_date_to","hash":{},"data":data}) : helper)))
    + "\"  type=\"text\">\n													</div>\n												</div>\n											</div>\n					 					</div>\n							</div>\n							<div class=\"row\">\n										<div class =\"col-md-12\">\n											<button type=\"button\" class=\"modal__btn\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" id = \"Approve\">Approve</button>\n											<button type=\"button\" class=\"modal__btn\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" id = \"Reject\">Reject</button>\n										</div>\n							</div>\n					</div>\n				</div>	";
},"useData":true});
templates['view_user'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <option value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "    \n    <div class=\"col-md-3 col-md-offset-4 ebulletin-view_user-form\">\n            <div class=\"form-group text-center\">\n            <label>Username:</label>\n            <div>\n                <input type=\"text\" class=\"form-control text-center\" id=\"username\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.username : stack1), depth0))
    + "\" placeholder=\"Enter Username\" name=\"username\">\n            </div>\n            </div>\n            <div class=\"form-group text-center\">\n            <label for=\"pwd\">Password:</label>\n            <div>          \n                <input type=\"password\" class=\"form-control text-center\" id=\"password\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.password : stack1), depth0))
    + "\" placeholder=\"Enter password\" name=\"pwd\">\n            </div>\n            </div>\n            <div class=\"form-group text-center\">\n            <label >Firstname:</label>\n            <div>\n                <input type=\"text\" class=\"form-control text-center\" id=\"fname\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.first_name : stack1), depth0))
    + "\" placeholder=\"Enter First Name\" name=\"Firstname\">\n            </div>\n            </div>\n            <div class=\"form-group text-center\">\n            <label >Lastname:</label>\n            <div>\n                <input type=\"text\" class=\"form-control text-center\" id=\"lname\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.last_name : stack1), depth0))
    + "\" placeholder=\"Enter Last Name\" name=\"Lastname\">\n            </div>\n            </div>\n             <div class=\"form-group text-center\">\n            <label >Usertype:</label>\n            <div>\n               <select id =\"user_type\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.dropdown : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </select>\n            </div>\n            </div>\n            <div class=\"form-group text-center\">        \n            <div class=\"col-md-12 e-bulletin-button-grp\">\n                <button type=\"submit\" class=\"modal__btn\" id = \"user_submit\">Submit</button>\n                <button type=\"submit\" class=\"modal__btn\" id = \"user_cancel\">Cancel</button>\n            </div>\n            </div>\n    </div>";
},"useData":true});
})();
