$(function(){

	// DATAGRID
	$('#dg_students').datagrid({
		title:'Student List',
		singleSelect:true,
		fit:true,
		pagination:true,
		columns:[[
			{field:'student_id',title:'Student ID',width:80},
			{field:'firstname',title:'First Name',width:80},
			{field:'lastname',title:'Last Name',width:80},
			{field:'created_dt',title:'Created Date',width:80},
			{field:'created_by',title:'Created By',width:80},
			{field:'email',title:'Email',width:80},
			{field:'phone',title:'Contact No.',width:80},
		]],
		fitColumns:true,
		toolbar:[{
			iconCls:'icon-add',
			text:'Create',
			handler:function(){
				$('#dlg_students').dialog('open').dialog('center').dialog('setTitle','New Student');
				$('#fm_std').form('clear');
			}
		},"-",{
			iconCls:'icon-edit',
			text:'Edit',
			handler:function(){
				var row = $('#dg_students').datagrid('getSelected');
	            if (row){
	                $('#dlg_students').dialog('open').dialog('center').dialog('setTitle','Edit Student');
	                $('#fm_std').form('load',row);
	                // url = 'update_user.php?id='+row.id;
	            }
			}
		},"-",{
			iconCls:'icon-remove',
			text:'Remove',
			handler:function(){
				var row = $('#dg_students').datagrid('getSelected');
	            if (row){
	                $.messager.confirm('Confirm','Are you sure you want to destroy this user?',function(r){
	                    if (r){
	                        // $.post('destroy_user.php',{id:row.id},function(result){
	                        //     if (result.success){
	                        //         $('#dg').datagrid('reload');    // reload the user data
	                        //     } else {
	                        //         $.messager.show({    // show error message
	                        //             title: 'Error',
	                        //             msg: result.errorMsg
	                        //         });
	                        //     }
	                        // },'json');
	                    }
	                });
	            }
			}
		}],
		url:'php/get_studentlist.php'
	});

	$('#fn_std, #ln_std, #contact_no_std, #email_std').textbox({
		required:true
	});

	// DLG
	$('#dlg_students').dialog({
		width:600,
		closed:true,
		modal:true,
		border:'thin',
		buttons:[{
			iconCls:'icon-ok',
			text:'Ok',
			handler:function(){
				$('#dlg_students').dialog('close');
			}
		},{
			iconCls:'icon-cancel',
			text:'Cancel',
			handler:function(){
				$('#dlg_students').dialog('close');
			}	
		}]
	});
});