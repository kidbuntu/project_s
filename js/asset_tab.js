$(function(){

	// SUBTABS
	$('#asset_subtab').tabs({
		fit:true
	});

	// EQUIPMENTS
	$('#dg_equipment').datagrid({
		title:'Equipment List',
		pagination:true,
		fit:true,
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
			{field:'equipment_id',title:'ID',width:80},
			{field:'description',title:'Description',width:80},
			{field:'created_dt',title:'Date Added',width:80},
			{field:'created_by',title:'Added By',width:80},
			{field:'lastupdated_by',title:'Last Updated By',width:80},
			{field:'lastupdate_dt',title:'Last Updated Date',width:80},
			{field:'status',title:'Status',width:80}
		]],
		fitColumns:true
	});

	// CASHFLOW
	$('#dg_cashflow').datagrid({
		title:'Cashflow Record',
		pagination:true,
		fit:true,
		toolbar:[{
			iconCls:'icon-add',
			text:'Create'
		},"-",{
			iconCls:'icon-edit',
			text:'Edit'
		},"-",{
			iconCls:'icon-remove',
			text:'Remove'
		}]
	});

	// ACCOUNTS
	$('#dg_accounts').datagrid({
		title:'Accounts List',
		fit:true,
		pagination:true,
		columns:[[
			{field:'student_id',title:'Student ID',width:80}, 
			{field:'lname',title:'Last Name',width:80},
			{field:'fname',title:'First Name',width:80},
			{field:'acct_bal',title:'Balance',width:80}
		]],
		fitColumns:true
	});
});