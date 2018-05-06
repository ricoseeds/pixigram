// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require jquery
//= require dropzone
//= require bootstrap-sprockets
//= require_tree .
$(document).ready(function(){
  Array.prototype.eachSlice = function (size, callback){
	  for (var i = 0, l = this.length; i < l; i += size){
	    callback.call(this, this.slice(i, i + size))
	  }
	};
 $("#user_search").keyup(function() {
 		if($("#user_search").val()){
	   	$.ajax({
	      url: '/users/search',
	      dataType: 'json',
	      data: {search: $(this).val()},
	      success: function(response){
	        var len = response.length;
	        $("#searchResult").empty();
	        for( var i = 0; i<len; i++){
	          var id = response[i].id;
	          var fname = response[i].email;
	          $("#searchResult").append("<li class=\"list-group-item\" value='"+id+"'><br/>"+fname+getList(response[i])+"</li>");
	        }
	      }
	  	});
	   } else {
	   		$("#searchResult li").remove();
	   }
 });
 $(".container").on('click', function(){
 		$("#searchResult li").remove();
 });
});


function getList(user){
	return "<a id=user_"+user.id+" class=\"btn btn-warning btn-xs subscribe\" data-remote=\"true\" rel=\"nofollow\" data-method=\"post\" href=\"/follows?user_id="+user.id+"\">subscribe</a>";
}


