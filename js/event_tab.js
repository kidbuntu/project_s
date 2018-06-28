$(function(){
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

	// MENUBUTTON
		$('#mb_new').menubutton({
			iconCls:'icon-add',
			menu:'#mm_new'
		});

// BUTTONS

	// NEW EVENT
	$("#btn_event").click(function(){
		$("#dlg_new_event").dialog('open').dialog('center');
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
				labelWidth:120
			});

			$("#txtbx_eventdesc").textbox({
				label:'Event Description',
				labelWidth:120,
				multiline:true
			});

		// COMBOBOX
			$("#cc_category").combobox({
				label:'Category',
				labelWidth:120,
				valueField:'category_id',
				textField:'category_name',
				url:'php/cc_event_category.php',
			});

		// DATEBOX
			$("#dtbx_startdt").datetimebox({
				label:'Start Date',
				labelWidth:120,
				showSeconds:false
			}).datetimebox('setValue',' 00:00');

		// EVENT DLG
			$("#dlg_new_event").dialog({
				title:'New Event',
				closed:true,
				modal:true,
				width:500,
				buttons:[{
					iconCls:'icon-ok',
					text:'Ok',
					plain:true
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
				closed:false,
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