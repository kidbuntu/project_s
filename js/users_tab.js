$(function(){
var url;
	// DATAGRID
	$('#dg_users').datagrid({
		title:'User List',
		singleSelect:true,
		fit:true,
		pagination:true,
		toolbar:[{
			iconCls:'icon-add',
			text:'Create',
			handler:function(){
				$("#dlg_users").dialog("center").dialog("open").dialog("setTitle","New User");
				$("#fm_user").form("clear");
				url = "php/save_user.php";
			}
		},"-",{
			iconCls:'icon-edit',
			text:'Edit',
			handler:function(){
				var row = $("#dg_users").datagrid("getSelected");
				if (row) {
					$("#dlg_users").dialog("open").dialog("center").dialog("setTitle", "Edit User");
					$("#fm_user").form("load",row);
				}
			}
		},"-",{
			iconCls:'icon-remove',
			text:'Remove'
		}],
		columns:[[
			{field:'userid',title:'User ID',width:80},
			{field:'firstname',title:'First Name',width:80},
			{field:'lastname',title:'Last Name',width:80},
			{field:'password',title:'Last Name',width:80,hidden:true},
			{field:'type',title:'Type',width:80},
			{field:'created_by',title:'Created By',width:80},
			{field:'created_dt',title:'Created Date',width:80},
			{field:'lastupdated_by',title:'Last Updated By',width:80},
			{field:'lastupdated_dt',title:'Last Updated Date',width:80},
			{field:'status',title:'Status',width:80}
		]],
		fitColumns:true,
		// data:data_user
		url:'php/get_users.php'
	});

		// DIALOG BOX
		$("#dlg_users").dialog({
			width:400,
			border:'thin',
			modal:true,
			closable:false,
			closed:true,
			buttons:[{
				iconCls:'icon-ok',
				text:'Ok',
				plain:true,
				handler:function(){
					$("#fm_user").form("submit",{
						url:url,
						onSubmit:function(){
							return $(this).form('validate');
						},
						success:function(result){
							var result = eval('('+result+')');
							if (result.errorMsg) {
								$.messager.show({
									title:'Error',
									msg:result.errorMsg
								});
							}else{
								$("#dlg_users").dialog("close");
								$("#dg_users").datagrid("reload");
							}
						}
					});
				}
			},{
				iconCls:'icon-cancel',
				text:'Cancel',
				plain:true,
				handler:function(){
					$("#dlg_users").dialog("close");
				}
			}]
		});
			// FORM
			// TEXTBOX
				// USERID
				$("#tb_user").textbox({
					label:'User ID:',
					labelWidth:100
				});
				// FIRSTNAME
				$("#tb_firstname").textbox({
					label:'Firstname',
					labelWidth:100
				});
				// LASTNAME
				$("#tb_lastname").textbox({
					label:'Lastname',
					labelWidth:100
				});
				// PASSWORD
				$("#tb_pwd").textbox({
					label:'Password',
					labelWidth:100
				});
			// COMBOBOX
				// USER TYPE
				$("#cc_utype").combobox({
					label:'User Type',
					labelWidth:100
				});
});