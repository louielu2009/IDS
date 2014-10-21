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
	//step2 下一步
	$(".report_step2_next").live("click",function(){
	  if($(".Model_TemplateList .Model_TemplateList_List .actived").length<=0)return alert("请选择报告模板！");
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
	  		$(".report_param").append('<div style="color:blue"><img src="/resource/fundids/loading/loading5.gif" style="float: left;">正在初始化报告数据,请稍候.</div>');
	  		$.ajax({
	  			url:"/fundids/ajax/report_ajax.tsl",
	  			type:"post",
	  			data:{dowhat:'rSubmit',fundid:g_fund,fundName:g_fundName,tid:g_tid,tName:g_tName,reportName:reportName,financialDate:$(".report_param .inputdate:eq(0)").val(),pubDate:$(".report_param .inputdate:eq(1)").val(),UserID:g_userID},
	  			success:function(r){
	  				if(r=='1') return window.location.href="/fundids/index.tsl?type=report&uid=admin";
	  				return alert("新建报告失败,请重试或与技术人员联系！");
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
 var checkObj = $('<div class="report_dialog" title="数据"><div class="report_element_content"></div></div>');
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
 	         if(!data)return alert('操作失败！');
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
	var editObj = $('<div class="report_dialog" title="新建报告 1.选择产品"><div class="Model_TemplateList_Content"><img src="/resource/fundIDS/loading/loading14-45.gif" /></div><div class="Model_TemplateList_Buttons"><button class="formEventButton">下一步</button><button class="modelCancel">取消</button></div></div>').appendTo(document.body);
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
                     //step1 下一步
                     $(".formEventButton").unbind("click");
                     $(".formEventButton").click(function(){
                     	if($(".report_dialog .Model_TemplateList_List .actived").length<=0)return alert("请选择产品！");
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
	if(!(tid||false))return alert("无效报告！请重新选择");
	g_tid= tid;
	var tName= $(".Model_TemplateList_div .Model_TemplateList_List .actived").text();
	g_tName= tName;
	var editObj = $('<div class="report_dialog_step3" title="新建报告 1.'+g_fundName+'->2.'+tName+'->3.报告初始化参数"><div class="Model_TemplateList_Content"><img src="/resource/fundIDS/loading/loading14-45.gif" /></div><div class="Model_TemplateList_Buttons"><button class="report_step3_next">完成</button><button class="report_step3_pre">上一步</button><button class="modelCancel">取消</button></div></div>').appendTo(document.body);
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
												"closeText": '关闭',
												"prevText": '&#x3C;上月',
												"nextText": '下月&#x3E;',
												"currentText": '今天',
												"monthNames": ['二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
												"monthNamesShort": ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
												"dayNames": ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
												"dayNamesShort": ['周日','周一','周二','周三','周四','周五','周六'],
												"dayNamesMin": ['日','一','二','三','四','五','六'],
												"showMonthAfterYear": true,
												beforeShow: function() {setTimeout(function(){$('.ui-datepicker').css('z-index', 99999);}, 0);},
												onSelect: function(dateText, inst) {
													if($(this).attr("pflag")=="rpt")
													{
															var rptArr= ['一月','二月','第一季','四月','五月','中报','七月','八月','第三季','十月','十一月','年报'];
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
//***移动鼠标显示button***//
$(document).ready(function(){
	$(".reportTable_tr").live({
		"mouseenter":function(){
			var fstr= '<span class="span_button"><button class="rep_button" onclick="return mgr_report(this,1)">预览</button><button class="rep_button" onclick="return mgr_report(this,2)">数据</button><button class="rep_button">下载</button></span>';
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