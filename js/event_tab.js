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
		// console.log("clicked");
		$("#dlg_new_event").dialog('open').dialog('center');
	});

	// NEW CATEGORY
	$("#btn_category").click(function(){
		console.log("clicked");
	});

// DIALOG BOX

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

	// EVENT DLG
		$("#dlg_new_event").dialog({
			title:'New Event',
			closed:true,
			modal:true,
			width:500,
			height:400
		});
	
		
});