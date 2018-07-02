$(function(){

// CONTAINER
	$("#container").layout({
		fit:true
	});
		// PANEL
		$("#panel").panel({
			title:'Project S Login'
		});

			// TEXTBOX USERNAME
			$("#txtbx_usr").textbox({
				label:'Username',
				labelWidth:100
			});

			// PASSWORDBOX
			$("#txtbx_pwd").passwordbox({
				label:'Password',
				labelWidth:100
			});

				// BUTTON LOGIN
				$("#btn_login").linkbutton({
					size:'large',
					width:100,
					onClick:function(){
						$("#ff_login").form('submit',{
							url:'php/get_login.php',
							success:function(data){
								if (JSON.parse(data) == true) {
									window.location.replace("./index.html");
								}
							}
						});
					}
				});
	
});