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
var uploader_form ;
  Dropzone.autoDiscover = false;
  $("#new_post").dropzone({
    maxFilesize: 10,
    paramName: "posts[image]",
    addRemoveLinks: true,
    success: function(file, response){
      get_posts();
      $(file.previewTemplate).find('.dz-remove').attr('id', response.fileID);
      $(file.previewElement).addClass("dz-success");
    },
    removedfile: function(file){
      var id = $(file.previewTemplate).find('.dz-remove').attr('id'); 
      $.ajax({
        type: 'DELETE',
        url: '/uploads/' + id,
        success: function(data){
          // TODO
          // console.log(data.message);
        }
      });
    }
  }); 
  get_posts();
});


function getList(user){
	return "<a id=user_"+user.id+" class=\"btn btn-warning btn-xs subscribe\" data-remote=\"true\" rel=\"nofollow\" data-method=\"post\" href=\"/follows?user_id="+user.id+"\">subscribe</a>";
}

function get_posts(){
  $( "#picture_panel" ).empty();
  $.get( "posts/subscribed_posts", function( data ) {
  var post_div = ''
  data.eachSlice(3, function(posts){ 
    $.each( posts, function( index, a_post ) {
      post_div = "<div class=\"col-md-3\"><div class=\"row\"><div class=\"thumbnail\">";
      post_div += "<img style=\"width:100%\"" + " src=\"" 
      + a_post.image_url + "\" alt=\"Not Found\">"
      post_div += "<div class=\"caption\">"
      post_div += "Posted by<b><i> " + a_post.email + "</i></b> on " + a_post.created_at
      post_div += "</div></div></div></div>"
      $("#picture_panel").append(post_div);
    });
  });
});
}
