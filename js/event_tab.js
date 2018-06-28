$(function(){
// DATAGRID	
	$('#dg_event').datagrid({
		fit:true,
		title:'Events',
		pagination:true,
		toolbar:'#tb_event',
		columns:[[
			{field:'id',title:'Id',width:100},
			{field:'name',title:'Name',width:100},
			{field:'category',title:'Category',width:100},
			{field:'description',title:'Description',width:100},
			{field:'created_by',title:'Created By',width:100},
			{field:'created_dt',title:'Created Date',width:100},
			{field:'start_dt',title:'Start Date',width:100},
			{field:'last_updated_by',title:'Last Updated By',width:100},
			{field:'last_updated_dt',title:'Last Updated Date',width:100}
		]],
		fitColumns:true
	});

	// MENUBUTTON
		$('#mb_new').menubutton({
			iconCls:'icon-add',
			menu:'#mm_new'
		});

});