$(function(){
var url;
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
			{field:'dob',title:'Date of Birth',width:80},
			{field:'created_dt',title:'Updated Date',width:80},
			{field:'created_by',title:'Created By',width:80},
			{field:'email',title:'Email',width:80},
			{field:'phone',title:'Contact No.',width:80},
		]],
		fitColumns:true,
		toolbar:[{
			iconCls:'icon-ok',
			text:'Create',
			handler:function(){
				$('#dlg_students').dialog('open').dialog('center').dialog('setTitle','New Student');
				$("#stdid").textbox("enable");
				$('#fm_std').form('clear');
				url = "php/save_student.php"
			}
		},"-",{
			iconCls:'icon-edit',
			text:'Edit',
			handler:function(){
				var row = $('#dg_students').datagrid('getSelected');
	            if (row){
	                $('#dlg_students').dialog('open').dialog('center').dialog('setTitle','Edit Student');
	                $('#fm_std').form('load',row);
	                $("#stdid").textbox("disable");
	                url = "php/update_student.php?student_id="+row.student_id;
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
	                        $.post('php/destroy_student.php',{student_id:row.student_id},function(result){
	                            if (result.success){
	                                $('#dg_students').datagrid('reload');    // reload the user data
	                            } else {
	                                $.messager.show({    // show error message
	                                    title: 'Error',
	                                    msg: result.errorMsg
	                                });
	                            }
	                        },'json');
	                    }
	                });
	            }
			}
		}],
		url:'php/get_studentlist.php'
	});

	// DIALOG BOX
	$('#dlg_students').dialog({
		width:400,
		closed:true,
		modal:true,
		border:'thin',
		buttons:[{
			iconCls:'icon-ok',
			text:'Ok',
			plain:true,
			handler:function(){
				$("#fm_std").form("submit",{
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
							$("#dlg_students").dialog("close");
							$("#dg_students").datagrid("reload");
						}
					}
				});
			}
		},{
			iconCls:'icon-cancel',
			text:'Cancel',
			plain:true,
			handler:function(){
				$('#dlg_students').dialog('close');
			}	
		}]
	});

		// FORM
			// TEXTBOX
			$('#fn_std, #ln_std, #phone, #email, #stdid').textbox({
				required:true
			});

			// DATEBOX
			$("#dob").datebox({
				required:true
			});
});