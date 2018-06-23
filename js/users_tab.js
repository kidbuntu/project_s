$(function(){
// var data_user = [
// 	{"user_id":"kidbuntu","fname":"Harry","lname":"Inoferio II","user_type":"Administrator","created_by":"Admin","created_dt":"05/17/2018","lastupdated_by":"","lastupdated_dt":"","status":"Active"},
// 	{"user_id":"Sample","fname":"Sample","lname":"Sample","user_type":"Administrator","created_by":"Admin","created_dt":"05/17/2018","lastupdated_by":"","lastupdated_dt":"","status":"Active"}
// 	];
	// DATAGRID
	$('#dg_users').datagrid({
		title:'User List',
		singleSelect:true,
		fit:true,
		pagination:true,
		toolbar:[{
			iconCls:'icon-add',
			text:'Create'
		},"-",{
			iconCls:'icon-edit',
			text:'Edit'
		},"-",{
			iconCls:'icon-remove',
			text:'Remove'
		}],
		columns:[[
			{field:'userid',title:'User ID',width:80},
			{field:'firstname',title:'First Name',width:80},
			{field:'lastname',title:'Last Name',width:80},
			{field:'type',title:'Type',width:80},
			{field:'created_by',title:'Created By',width:80},
			{field:'created_dt',title:'Created Date',width:80},
			{field:'lastupdated_by',title:'Last Updated By',width:80},
			{field:'lastupdated_dt',title:'Last Updated Date',width:80},
			{field:'status',title:'Status',width:80},
		]],
		fitColumns:true,
		// data:data_user
		url:'php/get_users.php'
	});
});