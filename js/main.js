$(function(){
// SESSION CHECKER
	$.post("php/session_checker.php",function(data){
		if (data.has_session == false) {
			window.location.replace("./login.html");
		}
		console.log(data);
		$("#user").text(data[1]);
	},"json");

	// DATE FORMAT
	$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+m+'-'+d;
	}
	$.fn.datebox.defaults.parser = function(s){
	    var t = Date.parse(s);
	    if (!isNaN(t)){
	        return new Date(t);
	    } else {
	        return new Date();
	    }
	}

		// CENTER CONTAINER
		$('.container').layout({
			fit:true,
			border:false
		});

		// TAB CONTAINER
		$('#tab_container').tabs({
			fit:true,
			tabHeight:80,
			// tabWidth:120,
			// selected:5
		});

	// LOGOUT BUTTON
	$("#btn_logout").linkbutton({
		onClick:function(){
			$.post("php/destroy_session.php");
			window.location.replace("./login.html");
		}
	});

});