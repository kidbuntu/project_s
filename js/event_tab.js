$(function(){
var url;
// DATAGRID

	// EVENTS
	$('#dg_event').datagrid({
		fit:true,
		title:'Events',
		pagination:true,
		toolbar:'#tb_event',
		columns:[[
			{field:'event_id',title:'Id',width:60,fixed:true},
			{field:'event_name',title:'Name',width:100},
			{field:'event_category_id',title:'Category',width:80},
			{field:'event_description',title:'Description',width:300,fixed:true},
			{field:'fee',title:'Fee',width:60,fixed:true},
			{field:'created_by',title:'Created By',width:40},
			{field:'created_dt',title:'Created Date',width:80},
			{field:'start_dt',title:'Start Date',width:80},
			{field:'last_updated_by',title:'Modified By',width:80},
			{field:'last_updated_dt',title:'Updated Date',width:80},
			{field:'status',title:'Status',width:100,fixed:true}
		]],
		fitColumns:true,
		singleSelect:true,
		url:'php/get_events.php'
	});

	// CATEGORY
	$("#dg_category").datagrid({
		fit:true,
		border:false,
		columns:[[
			{field:'category_name',title:'Category',width:80},
			{field:'category_description',title:'Description',width:80}
		]],
		fitColumns:true,
		singleSelect:true,
		url:'php/get_category.php',
		toolbar:[{
			iconCls:"icon-add",
			text:"Add",
			handler:function(){
				url = 'php/save_category.php';
				$("#dlg_new_category").dialog("center").dialog("open");
				$("#fm_category").form("clear");
			}
		},"-",{
			iconCls:"icon-edit",
			text:"Edit"
		},"-",{
			iconCls:'icon-remove',
			text:"Remove"
		}]
	})

	// tb_event toolbar buttons
		// CREATE EVENT 
			$('#btn_event').linkbutton({
				iconCls:'icon-add',
				plain:true,
				onClick:function(){
					url = 'php/save_event.php';
						$("#dlg_new_event").dialog('open').dialog('center');
						$("#fm_event").form('clear');
				}
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
		// 'OPTIONS'
			$("#mb_options").menubutton({
				iconCls:'icon-more',
				menu:'#mm_options'
			});

		// MENU BUTTON 
			// NEW CATEGORY
			$("#btn_category").click(function(){
				$("#window_category").window('center').window('open');
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

		// NUMBERBOX
			$("#nbrbx_fee").numberbox({
				label:'Fee',
				labelWidth:120
			});

		// COMBOBOX
			$("#cc_category").combobox({
				label:'Category',
				labelWidth:120,
				required:true,
				valueField:'category_name',
				textField:'category_name',
				url:'php/cc_get_event_category.php',
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
				labelWidth:140,
				required:true
			});

			$("#txtbx_categorydesc").textbox({
				label:'Category Description',
				labelWidth:140,
				multiline:true,
				height:60,
				required:true
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
					handler:function(){
						$("#fm_category").form('submit',{
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
			                        $('#dlg_new_category').dialog('close');        // close the dialog
			                        $('#dg_category').datagrid('reload');
			                        $("#cc_category").combobox("reload");
			                    }	
							}
						});
					}
				},{
					iconCls:'icon-cancel',
					text:'Cancel',
					plain:true,
					handler:function(){
						$("#dlg_new_category").dialog('close');
					}
				}]
			});

	// PANEL CATEGORY
		$("#window_category").window({
			title:'Category List',
			closed:true,
			height:400,
			width:600,
			modal:true,
			minimizable:false,
			collapsible:false,
			footer:'#ft_category'
		});
			// PANEL FOOTER BUTTON
			$("#btn_ft_close").linkbutton({
				iconCls:'icon-cancel',
				plain:true,
				onClick:function(){
					$("#window_category").window('close');
				}
			});
		
});