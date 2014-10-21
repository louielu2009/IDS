var g_tid='';
var g_tName= '';
$(function(){
	$(".TData_Element_Check").live("click",function(){	
    var txt=$(this).parents("tr").find("td:eq(1)").eq(0).text();     
		report_checkData($(this),txt);
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
});

function report_checkData(obj,txt)
{
 $(".report_dialog").remove();
 var checkObj = $('<div class="report_dialog" title="'+txt+'"><div class="report_element_content"></div></div>');
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

//***移动鼠标显示button***//
$(document).ready(function(){
	$(".reportTable_tr").live({
		"mouseenter":function(){
			var fstr= '<span class="span_button"><button class="btn" onclick="return mgr_report(this,1)">预览</button><button class="btn" onclick="return mgr_report(this,2)">数据</button><button class="btn" onclick="return mgr_report(this,3)">下载</button><button class="btn" onclick="return mgr_report(this,4)">权责</button></span>';
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
	if(flag==1)	window.open("/fundids/livereport.tsl?rid="+rid);
	if(flag==2)	window.open("/fundids/index.tsl?type=TData&tid="+rid);
  	if(flag==3)
  	{
		    var RID = $(obj).parents(".rep_btn").attr("rid");
		    var FSrc = '/fundids/report/submitTask.tsl?rid='+RID;  
		    window.open(FSrc);
		    return false;
		    /*
		    if($(".DM_Download_Frame").length)
		    $(".DM_Download_Frame").attr("src",FSrc);
		    else
		    {
		     $(document.body).append('<iframe class="DM_Download_Frame" src="'+FSrc+'"></iframe>'); 
		    }
		    */
		    //return alert('Not support yet!'); 
  	}
  	if(flag==4)
  	{
  			var e = window.event || event; 
			if ( e.stopPropagation ){ 
					e.stopPropagation(); 
			}else{
					window.event.cancelBubble = true; 
			} 

  			if($(".report_right_div").length>0) $(".report_right_div").remove();
  			var RID = $(obj).parents(".rep_btn").attr("rid");
  			$.ajax({
					     url:'/fundids/ajax/report_ajax.tsl',
					     type:'post',
					     data:{
					     	     dowhat:'getright',
					     	     rid:RID
					     	    },
					     success:function(data){
					     			var html = '<div class="report_right_div"  title="权责分配">'+data+'</div>';
							     	$(html).appendTo(document.body).dialog({
									          autoOpen: false,
									          height: 600,
									          width:550,
									          draggable: true,
									          modal: true,
									          //closeOnEscape: false,
									          buttons: {
																"确定": function () {
																right_submit();
															}
														}
									  });
					     			$( ".report_right_div" ).dialog("open" ); 
					     			
					     },
					     error:function(){
					     	
					     }
	 	     });
  	}
  	return false;
}

function right_submit()
{
	var rStr='';
	$(".report_right_div  .underlineTable tbody tr").each(function(){
			rStr+=((rStr=='')?'':';')+$(this).attr("eid")+','+$(this).find("select option:selected").val();
	})
	if(rStr=='')return alert("空报告!");
	$.ajax({
					     url:'/fundids/ajax/report_ajax.tsl',
					     type:'post',
					     data:{
					     	     dowhat:'saveright',
					     	     rstr:rStr
					     	    },
					     success:function(msg){
					     			if(msg=='1') {$( ".report_right_div" ).dialog("close" ); $(".report_right_div").remove();return;}
					     			return alert("权责设置失败，请与技术人员联系！");
					     },
					     error:function(){
					     	
					     }
	 	     });
	
}