$(function(){
var url;
// DATAGRID	
	$('#dg_event').datagrid({
		fit:true,
		title:'Events',
		pagination:true,
		toolbar:'#tb_event',
		columns:[[
			{field:'event_id',title:'Id',width:100},
			{field:'event_name',title:'Name',width:100},
			{field:'category_name',title:'Category',width:100},
			{field:'event_description',title:'Description',width:100},
			{field:'created_by',title:'Created By',width:100},
			{field:'created_dt',title:'Created Date',width:100},
			{field:'start_dt',title:'Start Date',width:100},
			{field:'last_updated_by',title:'Last Updated By',width:100},
			{field:'last_updated_dt',title:'Last Updated Date',width:100},
			{field:'status',title:'Status',width:100}
		]],
		fitColumns:true,
		singleSelect:true,
		url:'php/get_events.php'
	});


	// tb_event toolbar buttons
		// 'NEW' MENUBUTTON
			$('#mb_new').menubutton({
				iconCls:'icon-add',
				menu:'#mm_new'
			});
		// 'EDIT'
			$("#btn_edit_event").linkbutton({
				iconCls:'icon-edit',
				plain:true,
				onClick:function(){
					var row = $('#dg_event').datagrid('getSelected');
		            if (row){
		                $('#dlg_new_event').dialog('open').dialog('center').dialog('setTitle','Edit Event Information');
		                $('#fm_event').form('load',row);
		                url = 'php/update_event.php?event_id='+row.event_id;

		            }
				}
			});

// BUTTONS

	// NEW EVENT
	$("#btn_event").click(function(){
		url = 'php/save_event.php';
		$("#dlg_new_event").dialog('open').dialog('center');
		$("fm_event").form('clear');
	});

	// NEW CATEGORY
	$("#btn_category").click(function(){
		$("#dlg_new_category").dialog('open').dialog('center');
	});

// DIALOG BOX

	// EVENT DIALOG BOX CONTENTS

		// TEXTBOX
			$("#txtbx_eventname").textbox({
				label:'Event Name',
				labelWidth:120,
				required:true
			});

			$("#txtbx_eventdesc").textbox({
				label:'Event Description',
				labelWidth:120,
				multiline:true,
				required:true
			});

		// COMBOBOX
			$("#cc_category").combobox({
				label:'Category',
				labelWidth:120,
				required:true,
				valueField:'category_id',
				textField:'category_name',
				url:'php/cc_event_category.php',
			});

		// DATEBOX
			$("#dtbx_startdt").datetimebox({
				label:'Start Date',
				labelWidth:120,
				showSeconds:false
			});

			// EVENT DLG
				$("#dlg_new_event").dialog({
					title:'New Event',
					closed:true,
					modal:true,
					width:500,
					buttons:[{
						iconCls:'icon-ok',
						text:'Ok',
						plain:true,
						handler:function(){
							$("#fm_event").form('submit',{
								url:url,
								onSubmit:function(){
									return $(this).form('validate');
								},
								success:function(result){
									var result = eval('('+result+')');
				                    if (result.errorMsg){
				                        $.messager.show({
				                            title: 'Error',
				                            msg: result.errorMsg
				                        });
				                    } else {
				                        $('#dlg_new_event').dialog('close');        // close the dialog
				                        $('#dg_event').datagrid('reload');    // reload the user data
				                    }
									// $("#dlg_new_event").dialog('close');		
								}
							});
							
						}
					},{
						iconCls:'icon-cancel',
						text:'Cancel',
						plain:true,
						handler:function(){
							$("#dlg_new_event").dialog('close');
						}
					}]
				});

	// NEW CATEGORY DIALOG BOX CONTENTS
		// TEXTBOX
			$("#txtbx_categoryname").textbox({
				label:'Category Name',
				labelWidth:140
			});

			$("#txtbx_categorydesc").textbox({
				label:'Category Description',
				labelWidth:140,
				multiline:true,
				height:60
			});
		// NEW CATEGORY DLG
			$("#dlg_new_category").dialog({
				title:'New Category',
				closed:true,
				modal:true,
				width:500,
				buttons:[{
					iconCls:'icon-ok',
					text:'Ok',
					plain:true,
				},{
					iconCls:'icon-cancel',
					text:'Cancel',
					plain:true,
					handler:function(){
						$("#dlg_new_category").dialog('close');
					}
				}]
			});
	
		
});