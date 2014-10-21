var g_tid='';
var g_tName= '';
$(function(){
	$(".TData_Element_Check").live("click",function(){		
		report_checkData($(this));
	});
	$(".report_create").click(function(){
		report_create();
	});	
	$(".reportTable_tr").live("click",function(){		
		var $self = $(this);	
		if($self.hasClass('rpt_tr_selected')){		  
		  $('.Report_Config').slideUp(function(){$(this).remove();});
		  $self.removeClass('rpt_tr_selected');		 
		  return true;
		}
		$('.rpt_tr_selected').removeClass('rpt_tr_selected');
		$self.addClass('rpt_tr_selected');
		
		$.post('ajax/report_ajax.tsl',
				{rid:$self.find('td:last').attr('rid'),Ctype:'RData',uid:'admin'},
				function(data){
					$('.Report_Config').slideUp(function(){$(this).remove();});
					$self.after('<tr><td style="padding:0" colspan="5"><div class="Report_Config" style="display:none;">'+data+'</div></td></tr>');					
					var rptConfig = $('.Report_Config');
					rptConfig.find('table:first').width($self.width()-10);
					rptConfig.slideDown();
		});
	}); 
	$(".report_step2_pre").live("click",function(){
		$(".Model_TemplateList").dialog("close").remove();
		$(".report_dialog").dialog("open");
	})
	//step2 ��һ��
	$(".report_step2_next").live("click",function(){
	  if($(".Model_TemplateList .Model_TemplateList_List .actived").length<=0)return alert("��ѡ�񱨸�ģ�壡");
		$(".Model_TemplateList").dialog("close");
		report_step3();
	})
	$(".report_step3_next").live("click",function(){
	  		//g_fund,g_fundName,tid,tName  //zhangwei@tinysoft.com.cn
	  		var reportName= $(".report_param input:eq(0)").val();
	  		if($(".report_param input:eq(0)").val()=="") return $(".report_param input:eq(0)").css({"background":"rgb(255, 221, 231)"});
	  		$(".Model_TemplateList_Buttons button").attr("disabled","disabled");
	  		$(".report_step3_pre").remove();
	  		$(".modelCancel").remove();
	  		$(".Model_TemplateList_Buttons button").css({"background-color":"#ccc"});
	  		$(".report_param").append('<div style="color:blue"><img src="/resource/fundids/loading/loading5.gif" style="float: left;">���ڳ�ʼ����������,���Ժ�.</div>');
	  		$.ajax({
	  			url:"/fundids/ajax/report_ajax.tsl",
	  			type:"post",
	  			data:{dowhat:'rSubmit',fundid:g_fund,fundName:g_fundName,tid:g_tid,tName:g_tName,reportName:reportName,financialDate:$(".report_param .inputdate:eq(0)").val(),pubDate:$(".report_param .inputdate:eq(1)").val(),UserID:g_userID},
	  			success:function(r){
	  				if(r=='1') return window.location.href="/fundids/index.tsl?type=report&uid=admin";
	  				return alert("�½�����ʧ��,�����Ի��뼼����Ա��ϵ��");
	  			}
	  		})
  	})
	  $(".report_step3_pre").live("click",function(){
	  		$(".report_dialog_step3").dialog('close').remove();
	  		Model_InitTemplatesDialog("report");
	  })
	 
});

function report_checkData(obj)
{
 $(".report_dialog").remove();
 var checkObj = $('<div class="report_dialog" title="����"><div class="report_element_content"></div></div>');
 checkObj.dialog({width:600,overlay:{opacity: 0.5, background: "black" ,overflow:'auto'}});
 $.ajax({
 	       url:'/fundids/ajax/report_ajax.tsl',
 	       type:'post',
 	       data:{
 	       	     dowhat:'checkData',
 	       	     EID:obj.attr('eid'),
 	       	     RID:$(".rpt_tr_selected .rep_btn").attr("rid")
 	       	    },
 	       success:function(data){
 	         if(!data)return alert('����ʧ�ܣ�');
 	         checkObj.find(".report_element_content").html(data);
 	         checkObj.dialog('open');
 	       },
 	       error:function(){
 	       	return alert('ajax error!');
 	       }
 	     });
}

function report_create()
{
	var editObj = $('<div class="report_dialog" title="�½����� 1.ѡ���Ʒ"><div class="Model_TemplateList_Content"><img src="/resource/fundIDS/loading/loading14-45.gif" /></div><div class="Model_TemplateList_Buttons"><button class="formEventButton">��һ��</button><button class="modelCancel">ȡ��</button></div></div>').appendTo(document.body);
	editObj.dialog({ closeOnEscape: false,dialogClass:"my-dialog",modal:true,width:680,overlay:{opacity: 0.5, background: "black" ,overflow:'auto'}});
	$.ajax({
       	       url:'/fundids/ajax/report_ajax.tsl',
      	       type:'post',									 	   	              	    
      	       data:{
      	       	      dowhat:'step1',								 	   	              	       	      
      	       	    },
      	       success:function(data){
        	        $(".report_dialog").dialog('open');
        	        $('.report_dialog .Model_TemplateList_Content').html(data);
      	        },
      	        error:function(){
      	        	return alert('ajax error!');
      	        },
      	        complete:function(){
      	        	$(".fundList").click(function(){
                        $(".actived",".report_dialog .Model_TemplateList_List").removeClass('actived');
                        $(this).addClass('actived');
                     });
                     //step1 ��һ��
                     $(".formEventButton").unbind("click");
                     $(".formEventButton").click(function(){
                     	if($(".report_dialog .Model_TemplateList_List .actived").length<=0)return alert("��ѡ���Ʒ��");
                     	g_fund= $(".report_dialog .Model_TemplateList_List .actived span:eq(0)").text();
                     	$(".report_dialog").dialog("close");
                     	Model_InitTemplatesDialog("report");
                     });
      	        }  
              });					
}

function report_step3()
{	
	var tid= $(".Model_TemplateList_div .Model_TemplateList_List .actived").attr("tid");
	if(!(tid||false))return alert("��Ч���棡������ѡ��");
	g_tid= tid;
	var tName= $(".Model_TemplateList_div .Model_TemplateList_List .actived").text();
	g_tName= tName;
	var editObj = $('<div class="report_dialog_step3" title="�½����� 1.'+g_fundName+'->2.'+tName+'->3.�����ʼ������"><div class="Model_TemplateList_Content"><img src="/resource/fundIDS/loading/loading14-45.gif" /></div><div class="Model_TemplateList_Buttons"><button class="report_step3_next">���</button><button class="report_step3_pre">��һ��</button><button class="modelCancel">ȡ��</button></div></div>').appendTo(document.body);
	editObj.dialog({ closeOnEscape: false,dialogClass:"my-dialog",modal:true,width:650,overlay:{opacity: 0.5, background: "black" ,overflow:'auto'}});
	$.ajax({
       	       url:'/fundids/ajax/report_ajax.tsl',
      	       type:'post',									 	   	              	    
      	       data:{dowhat:'step3'},
      	       success:function(data){
        	        $(".report_dialog_step3").dialog('open');
        	        $('.report_dialog_step3 .Model_TemplateList_Content').html(data);
        	        $(".report_param input:eq(0)").val(g_fundName+g_tName);
      	        },
      	        error:function(){
      	        	return false;
      	        },
      	        complete:function(){
                   	$(".inputdate").datepicker({
												"dateFormat": "yy-mm-dd",
												"changeYear": true,
												"changeMonth": true,
												"closeText": '�ر�',
												"prevText": '&#x3C;����',
												"nextText": '����&#x3E;',
												"currentText": '����',
												"monthNames": ['����','����','����','����','����','����','����','����','ʮ��','ʮһ��','ʮ����'],
												"monthNamesShort": ['һ��','����','����','����','����','����','����','����','����','ʮ��','ʮһ��','ʮ����'],
												"dayNames": ['������','����һ','���ڶ�','������','������','������','������'],
												"dayNamesShort": ['����','��һ','�ܶ�','����','����','����','����'],
												"dayNamesMin": ['��','һ','��','��','��','��','��'],
												"showMonthAfterYear": true,
												beforeShow: function() {setTimeout(function(){$('.ui-datepicker').css('z-index', 99999);}, 0);},
												onSelect: function(dateText, inst) {
													if($(this).attr("pflag")=="rpt")
													{
															var rptArr= ['һ��','����','��һ��','����','����','�б�','����','����','������','ʮ��','ʮһ��','�걨'];
															var dArr=dateText.split("-");
															var dYear= dArr[0];
															var dMonth= rptArr[parseInt(dArr[1])-1];
															$(".report_param input:eq(0)").val(g_fundName+dYear+dMonth);											
													}
												}	
											});	
				 
				  
      	        }  
              });	
}
//***�ƶ������ʾbutton***//
$(document).ready(function(){
	$(".reportTable_tr").live({
		"mouseenter":function(){
			var fstr= '<span class="span_button"><button class="rep_button" onclick="return mgr_report(this,1)">Ԥ��</button><button class="rep_button" onclick="return mgr_report(this,2)">����</button><button class="rep_button">����</button></span>';
			$(".span_button").remove();
			$(this).find("td").last().append(fstr);
		},
		"mouseleaver":function(){
			$(".span_button").remove();
		}
	});
});

function mgr_report(obj,flag)
{
	var rid= $(obj).parents("td:eq(0)").attr("rid");
	if(flag==1)
		window.open("/fundids/livereport.tsl?rid="+rid);
  if(flag==2)
    window.open("/fundids/index.tsl?type=TData&tid="+rid);
}