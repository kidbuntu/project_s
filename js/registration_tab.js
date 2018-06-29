$(function(){
// DATAGRID
	// EVENT LIST 
	$('#dg_reg').datagrid({
		fit:true,
		border:false,
		toolbar:[{
			iconCls:'icon-ok',
			text:'Register',
			id:'btn_register',
			handler:function(){
				var dg_reg = $('#dg_reg').datagrid('getSelected');
				dlg_confirmation("Confirm Registration!<br><br><span style='font-style:italic'>"+dg_reg.event_name+"<br>Start Date: "+dg_reg.start_dt+"</span>","icon-edit");
				$('#dlg_transaction').dialog('open');
			}	
		}],
		columns:[[
			{field:'event_id',title:'Event ID',width:80,hidden:true},
			{field:'event_name',title:'Event Name',width:80},
			{field:'start_dt',title:'Start Date',width:80},
			{field:'fee',title:'Fee',width:80}
		]],
		fitColumns:true,
		url:'php/get_events_reg.php',
		singleSelect:true
	});

// WEST REGION

	// NAV BUTTONS PANEL
	$('#nth').panel({
		region:'north',
		header:'#rg_tab_nvbtns',
		border:false,
		collapsible:false
	});
		
	// STUDENT INFO PANEL
	$('#ctr').panel({
		region:'center',
		title:'Student Information',
		border:false,
		header:'#rg_tab_nvbtns'
	});
		// FORM FIELDS
		$('#nbrbx_transid').numberbox({
			label:'Trans No.',
			editable:false
		});
		$('#txtbx_stid').textbox({
			prompt:'Enter Student ID',
			required:true,
			buttonText:'Start',
			buttonIcon:'icon-ok',
			label:'Student ID',
			onClickButton:function(){
				var stid = $('#txtbx_stid').textbox('getValue');
				if (stid) {
					$.post('php/get_student.php', {id:stid}, function(data){
						// console.log(data);
						if (data == false) {
							$.messager.alert('Alert','Record not found!','warning');		
						}else{
							$('#btn_void, #btn_done, #btn_register').linkbutton({disabled:false});
							$('#nbrbx_bal').numberbox({disabled:false});
							$('#txtbx_stid').textbox({disabled:true});

							$('#ff_regtab').form('load',data);	
							$('#dg_history').datagrid({url:'php/get_student_history.php?id='+stid});
						}	
					},'json');
				}else{
					$.messager.alert('Error','Please Enter Student ID to begin transaction!','error');
				}
			}
		});
		$('#txtbx_ln').textbox({
			label:'Last Name',
			editable:false
		});
		$('#txtbx_fn').textbox({
			label:'First Name',
			editable:false
		});
		$('#nbrbx_bal').numberbox({
			label:'Balance',
			editable:false,
			disabled:true,
			buttonText:'Make Payment',
			buttonIcon:'icon-ok',
			onClickButton:function(){
				$('#dlg_pmt').dialog('open').dialog('center');
				$('#fm_pmt').form('clear');
			}
		});

	// EVENT PANEL
	$('#sth').panel({
		collapsible:false,
		region:'south',
		border:false,
		fit:true,
	});
		

// CENTER REGION
	$('#dg_history').datagrid({
		title:'History',
		fit:true,
		border:false,
		pagination:true,
		columns:[[
			{field:'trans_id',title:'Transaction ID',width:120,fixed:true},
			{field:'details',title:'Remarks',width:80,halign:'right'},
			{field:'userid',title:'User',width:120,fixed:true},
			{field:'created_dt',title:'Date',width:170,fixed:true},
			{field:'status',title:'Status',width:120,fixed:true}
		]],
		fitColumns:true,
		view: detailview,
		detailFormatter:function(index,row){
			return '<div style="padding:2px;position:relative;"><table class="ddv"></table></div>';
		},
		onExpandRow:function(index,row){
			var ddv = $(this).datagrid('getRowDetail',index).find('table.ddv');
			ddv.datagrid({
                url:'php/get_history.php?transid='+row.trans_id,
                fitColumns:true,
                singleSelect:true,
                rownumbers:true,
                loadMsg:'',
                height:'auto',
                columns:[[
                    {field:'sequence_id',title:'Sequence ID',width:200},
                    {field:'description',title:'Item Type',width:200},
                    {field:'details',title:'Details',width:100,align:'right'},
                    {field:'status',title:'Status',width:100,align:'right'}
                ]],
                fitColumns:true,
                onResize:function(){
                    $('#dg_history').datagrid('fixDetailRowHeight',index);
                },
                onLoadSuccess:function(){
                    setTimeout(function(){
                        $('#dg_history').datagrid('fixDetailRowHeight',index);
                    },0);
                }
            });
            $('#dg_history').datagrid('fixDetailRowHeight',index);
		}
	});

// BUTTONS
	$('#btn_void, #btn_done, #btn_register, #btn_attendance').linkbutton({disabled:true});
	$('#btn_done').linkbutton({
		onClick:function(){
			var obj = {
				string:"Finalizing Transaction?<br><p>Please Confirm!</p>",
				icon:"icon-ok"
			};
			dlg_confirmation(obj.string, obj.icon);
			$('#dlg_transaction').dialog('open');
		}
	});
	$('#btn_void').linkbutton({
		onClick:function(){
			var obj = {
				string:"Voiding Transaction?<br><p>Please Confirm!</p>",
				icon:"icon-cancel"
			};
			dlg_confirmation(obj.string, obj.icon);
			$('#dlg_transaction').dialog('open');	
		}
	});

// DIALOG

	// DLG CONFIRMATION
	function dlg_confirmation(string, icon){
		$('#dlg_transaction').dialog({
			title:"Confirmation",
			content:"<div class='gen-padding'><p>"+string+"</p></div>",
			width:400,
			modal:true,
			border:'thin',
			closed:true,
			buttons:[{
				iconCls:'icon-ok',
				text:'Ok',
				size:'large',
				plain:true,
				handler:function(){
					reset();
				}
			},{
				iconCls:'icon-cancel',
				text:'Cancel',
				size:'large',
				plain:true,
				handler:function(){
					$('#dlg_transaction').dialog('close');
				}
			}]
		}).panel({
			iconCls:icon
		});	
	}

	// DLG PAYMENT
	$('#dlg_pmt').dialog({
		width:400,
		border:'thin',
		title:'Payment',
		shadow:true,
		modal:true,
		closed:true,
		buttons:[{
			iconCls:'icon-ok',
			text:'Ok',
			plain:true,
			handler:function(){
				$('#fm_pmt').form('submit',{
					onSubmit:function(){
						return $(this).form('validate');
					},
					success:function(){
						$('#dlg_pmt').dialog('close');
						pmt_cnf($('#fld_pmt_amt').numberbox('getValue'));
						$('#dlg_pmt_cnf').dialog('open');		
					}
				});
				// $('#dlg_pmt').dialog('close');
				// pmt_cnf($('#fld_pmt_amt').numberbox('getValue'));
				// $('#dlg_pmt_cnf').dialog('open');


			}
		},{
			iconCls:'icon-cancel',
			text:'Cancel',
			plain:true,
			handler:function(){
				$('#dlg_pmt').dialog('close');
			}
		}]
	});

	// DLG PAYMENT CONFIRMATION
		function pmt_cnf(amount){
			$('#dlg_pmt_cnf').dialog({
				title:'Payment Confirmation',
				content:"<div class='gen-padding'><p>Please Confirm Payment Amount!<br><span>&#8369</span>"+amount+"</p></div>",
				closed:true,
				width:500,
				modal:true,
				border:'thin',
				buttons:[{
					iconCls:'icon-ok',
					text:'Ok',
					plain:true,
					handler:function(){
						$('#dlg_pmt_cnf').dialog('close');
					}
				},{
					iconCls:'icon-cancel',
					text:'Cancel',
					plain:true,
					handler:function(){
						$('#dlg_pmt_cnf').dialog('close');
					}
				}]
			});
		}
	

	function reset(){
				var data = [];
				$('#dg_history').datagrid('loadData',data);
				$('#dlg_transaction').dialog('close');
				$('#ff_regtab').form('clear');				
				$('#txtbx_stid').textbox({disabled:false});	
				$('#nbrbx_bal').numberbox({disabled:true});
				$('#btn_void, #btn_done, #btn_register').linkbutton({disabled:true});
			}
	


});