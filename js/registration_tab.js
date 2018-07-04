$(function(){
// WEST REGION
var url, amt, btn;
	// CENTER PANEL
	$('#ctr').panel({
		region:'center',
		border:false,
		header:'#rg_tab_nvbtns'
	});
		// BUTTONS
			// VOID
			$("#btn_void").linkbutton({
				iconCls:'icon-cancel',
				plain:true,
				disabled:true,
				onClick:function(){
					var obj = {
						string:"Voiding Transaction?<br><p>Please Confirm!</p>",
						icon:"icon-cancel"
					};
					dlg_confirmation(obj.string, obj.icon);
					$('#dlg_transaction').dialog('open');
				}
			});
			// DONE
			$('#btn_done').linkbutton({
				iconCls:'icon-ok',
				plain:true,
				disabled:true,
				onClick:function(){
					var obj = {
						string:"Finalizing Transaction?<br><p>Please Confirm!</p>",
						icon:"icon-ok"
					};
					dlg_confirmation(obj.string, obj.icon);
					$('#dlg_transaction').dialog('open');
				}
			});
		// FORM
			// FIELDS
				// STUDENT ID SEARCH
			$('#txtbx_stid').combobox({
				prompt:'Enter Student ID',
				required:true,
				buttonText:'Start',
				buttonAlign:'left',
				buttonIcon:'icon-ok',
				label:'Student ID',
				url:'php/cc_get_students.php',
				valueField:'student_id',
				textField:'info',
				onClickButton:function(){
					var stid = $('#txtbx_stid').combobox('getValue');
					if (stid) {
						$.post('php/get_student.php', {id:stid}, function(data){
							if (data == false) {
								$.messager.alert('Alert','Record not found!','warning');		
							}else{
								$('#btn_void, #btn_done, #btn_register, #btn_attendance').linkbutton({disabled:false});
								$('#nbrbx_bal').numberbox({disabled:false});
								$('#txtbx_stid').combobox({disabled:true});

								$('#ff_regtab').form('load',data);	
								$('#dg_history').datagrid({url:'php/get_student_history.php?id='+stid});
							}	
						},'json');
					}else{
						$.messager.alert('Error','Please Enter Student ID to begin transaction!','error');
					}
				}
			});

				// TRANSACTION ID	
			$('#nbrbx_transid').numberbox({
				label:'Trans No.',
				editable:false
			});
				// LASTNAME
			$('#txtbx_ln').textbox({
				label:'Last Name',
				editable:false
			});
				// FIRSTNAME
			$('#txtbx_fn').textbox({
				label:'First Name',
				editable:false
			});

				// BALANCE FIELD
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
		// END OF FORM	
	// SOUTH PANEL
	$('#sth').panel({
		collapsible:false,
		region:'south',
		border:false,
		fit:true,
	});

		// DATAGRID STUDENT 
		$('#dg_reg').datagrid({
			columns:[[
				{field:'event_id',title:'Event ID',width:80,hidden:true},
				{field:'event_name',title:'Event Name',width:80},
				{field:'start_dt',title:'Start Date',width:80},
				{field:'fee',title:'Fee',width:80}
			]],
			fitColumns:true,
			fit:true,
			url:'php/get_events_reg.php',
			singleSelect:true,
			pagination:true,
			border:false,
			toolbar:[{
				iconCls:'icon-ok',
				text:'Register',
				id:'btn_register',
				disabled:true,
				handler:function(){
					var dg_reg = $('#dg_reg').datagrid('getSelected');
					dlg_confirmation("Confirm Registration!<br><br><span style='font-style:italic'>"+dg_reg.event_name+"<br>Start Date: "+dg_reg.start_dt+"</span>","icon-edit");
					$('#dlg_transaction').dialog('open');
				}	
			},"-",{
				iconCls:'icon-man',
				text:'Attendance',
				id:'btn_attendance',
				disabled:true
			}]
		});

// CENTER REGION
	// DATAGRID HISTORY
	$('#dg_history').datagrid({
		title:'History',
		fit:true,
		border:false,
		pagination:true,
		columns:[[
			{field:'trans_id',title:'ID',width:60,fixed:true},
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

// DIALOG BOX
	// CONFIRMATION DIALOG BOX	
	$("#dlg_confirmation").dialog({
		closed:true,
		width:600,
		modal:true,
		border:'thin',
		closable:false,
		buttons:[{
			iconCls:'icon-ok',
			text:'Ok',
			plain:true,
			handler:function(){
				$("#fm_cmf").form('submit',{
					url:'php/save_transaction.php',
					onSubmit:function(param){
						param.ttype = "type";
						param.remarks = "remarks";
					}
				});
			}
		},{
			iconCls:'icon-cancel',
			text:'Cancel',
			plain:true,
			handler:function(){
				$("#dlg_confirmation").dialog("close");
			}
		}]
	});
		// COMBOBOX TRANSACTION TYPE
		$("#cc_ttype").combobox({
			label:'Transaction Type',
			labelWidth:120
			// required:true
		});

		// TEXTBOX REMARKS
		$("#tb_remarks").textbox({
			label:'Remarks',
			labelWidth:120,
			multiline:true,
			height:80
		});
	// PAYMENT DIALOG BOX
	$("#dlg_pmt").dialog({
		title:'Payment',
		width:400,
		modal:true,
		closable:false,
		border:'thin',
		closed:true,
		buttons:[{
			iconCls:'icon-ok',
			text:'Ok',
			plain:true,
			handler:function(){
				amt = $("#tb_pmt").numberbox("getValue");
				if (amt == "") {
					$.messager.alert('','Please Enter Payment Amount!','info');
				}else{
					$("#dlg_pmt_cmf").dialog({
						content:"Please Confirm Payment Amount: <span>&#8369</span>"+amt
					}).dialog("center").dialog("open");
					console.log(amt);

				}
			}
		},{
			iconCls:'icon-cancel',
			text:'Cancel',
			plain:true,
			handler:function(){
				$("#dlg_pmt").dialog('close');
			}
		}]
	});
		// TEXTBOX
		$("#tb_pmt").textbox({
			prompt:'Enter Payment Amount Here',
			required:true,
		});

		// PAYMENT CONFIRMATION DLG
		$("#dlg_pmt_cmf").dialog({
			title:'Payment Confirmation',
			width:400,
			modal:true,
			border:'thin',
			closed:true,
			buttons:[{
				iconCls:'icon-ok',
				text:'Ok',
				handler:function(){
					$.post("php/save_payment.php",{amt:amt});
				}
			},{
				iconCls:'icon-cancel',
				text:'Cancel',
				handler:function(){
					$("#dlg_pmt_cmf").dialog("close");
				}
			}]
		});

	$("a").linkbutton({
		disabled:false,
		onClick:function(){
			btn = $(this).text().trim();
			switch(btn){
				case "Done":
					$("#dlg_confirmation").dialog({
						title:"Finalize"
					}).dialog("center").dialog("open").panel({
						iconCls:'icon-ok'
					});
					break;
				case "Void":
					$("#dlg_confirmation").dialog({
						title:"Void"
					}).dialog("center").dialog("open").panel({
						iconCls:'icon-cancel'
					});
					break;
				case "Make Payment":
					$("#dlg_pmt").dialog("center").dialog("open");
					$("#tb_pmt").textbox('clear');
			}
		}
	});
});