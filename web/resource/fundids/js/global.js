

$(function(){
   // �������ı����߶�
	resetSysContentHeight();
	// ����resize�������ı����߶�
	$(window).resize(resetSysContentHeight);
  
	displayPageContent();
	
	global_setInputdate();
   //*******�½�����**********//
   $(".report_create").click(function(){
		report_create();
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
	 //*********END********//	 
	});	  
	 //*********ģ�崴��**********//  
  $(".Model_CreateTemplate").live("click",function(){
        	                             if($(".Model_NewTemplateDialog").length)  $(".Model_NewTemplateDialog").dialog('destroy').remove();
        	                              var html = '<div class="Model_NewTemplateDialog" title="ģ�崴��"></div>';
                                        var editor_obj = $(html).appendTo("body");
                                        editor_obj.dialog({dialogClass:"my-dialog",modal:true,width:450}).dialog("open");
			 	   	                            $(editor_obj).html('<div style="text-align:center;margin-top:30px;"><img src="/resource/fundIDS/loading/loading14-45.gif"></div>');
      	                               $.ajax({
      	                             	        url:'/fundids/ajax/Model_ajax.tsl',
					 	   	              	              type:'post',
					 	   	              	              cache:false,
					 	   	              	              data:{
					 	   	              	             	      dowhat:'createNewTemplate'									 	   	              	             	      
					 	   	              	              	    },
					 	   	              	              success:function(data){
					 	   	              	                       $(editor_obj).html(data);
					 	   	              	              },
					 	   	              	              complete:function(){
					 	   	              	              		$(".tags").buttonset();
					 	   	              	              		$(".Model_NewTemplateDialog .tag").click(function(){
					 	   	              	              				var secTag= $("label[for='"+$(this).attr("id")+"']").find("span").text();
					 	   	              	              				var tTagObj= $(".Model_NewTemplateDialog input:eq(1)");
					 	   	              	              				 if($(tTagObj).val()!=""){
					 	   	              	              				 	if($(tTagObj).val().indexOf(secTag)<0)
					 	   	              	              				 		$(tTagObj).val($(tTagObj).val()+';'+secTag);
					 	   	              	              				 }else $(tTagObj).val(secTag);
					 	   	              	              			})
					 	   	              	              	}
      	                             	     });
            	                         });	
	 //***********END*********//   
   //*********��ģ��********//
   $(".Model_OpenTemplate").live("click",function(){
    	                        Model_InitTemplatesDialog("model");
    	                    });
   //***********END***********//
   //********ģ��Ի����¼�******//
   $(".Model_TemplateList_Sure").live("click",function(){
	            	                             Model_OpenTemplate();	            	
	            	                         });
   $(".Model_TemplateList_Cancel").live("click",function(){	            	                            
  	                            $(".Model_TemplateList").dialog('close').remove();
  	                            $(".report_dialog").dialog('close').remove();
  	                         });
   //**********END************//
   //********ģ��Ի����¼�******//	            
   $(".modelCancel").live("click",function(){	            	                            
  	                            $(".Model_NewTemplateDialog").dialog('close').remove();
  	                            $(".report_dialog").dialog('close').remove();
  	                            $(".report_dialog_step3").dialog('close').remove();
  	                         });
   //**********END**********//	
   //*******ģ��ѡ����Ӧ�¼�******//
   $(".Model_TemplateList .Model_TemplateList_div .Model_TemplateList_Template").live("click",function(){
  	                            $(".actived",".Model_TemplateList_List").removeClass('actived');
  	                            $(this).addClass('actived');
  	                         });
   //***********END**********//
    //********ģ�帴�ƶԻ���******//
   $(".Model_CopyTemplate").live("click",function(){
  	                               if($(".Model_NewTemplateDialog").length)  $(".Model_NewTemplateDialog").dialog('destroy').remove();
  	                               var TID =  $(".Model_Save").attr("tid");
  	                               if(!(TID||false))return alert("���ȴ�ģ��!");
  	                               var html = '<div class="Model_NewTemplateDialog" title="ģ�帴��"></div>';
                              	   var editor_obj = $(html).appendTo("body");
                                   editor_obj.dialog({dialogClass:"my-dialog",modal:true,width:450}).dialog("open");
                                   $(editor_obj).html('<div style="text-align:center;margin-top:30px;"><img src="/resource/fundIDS/loading/loading14-45.gif"></div>');
                                   $.ajax({
                           	        url:'/fundids/ajax/Model_ajax.tsl',
 	   	              	              type:'post',
 	   	              	              cache:false,
 	   	              	              data:{
 	   	              	             	      dowhat:'createNewTemplate',
 	   	              	             	      tid:TID,
 	   	              	             	      op:'copy'
 	   	              	              	    },
 	   	              	              success:function(data){
 	   	              	                       $(editor_obj).html(data);
 	   	              	              },
 	   	              	              complete:function(){
 	   	              	              		$(".tags").buttonset();
 	   	              	              		$(".Model_NewTemplateDialog .tag").click(function(){
 	   	              	              				var secTag= $("label[for='"+$(this).attr("id")+"']").find("span").text();
 	   	              	              				var tTagObj= $(".Model_NewTemplateDialog input:eq(1)");
 	   	              	              				 if($(tTagObj).val()!=""){
 	   	              	              				 	if($(tTagObj).val().indexOf(secTag)<0)
 	   	              	              				 		$(tTagObj).val($(tTagObj).val()+';'+secTag);
 	   	              	              				 }else $(tTagObj).val(secTag);
 	   	              	              			})
 	   	              	              	}
                           	     });
    	                          });
   //********************END***************//   	            	                          
});

//**********��ʼ��ģ��༭ҳ��**********//
function Model_OpenTemplate(){
	                            var TID = $(".actived",".Model_TemplateList_List").attr("tid");
												      if(!TID)return alert('��ѡ��ģ�壡');
												      if($(".Model_Save").length)
												      {
												       window.open('/fundids/index.tsl?type=model&tid='+TID);
												      }
												      else
												      {
													     window.location.href = '/fundids/index.tsl?type=model&tid='+TID;													     
	                            }
	                          }  
//************END***********//	                          
//**********��ʼ��ģ���б�Ի���*********//
function Model_InitTemplatesDialog(flag){
	                                    if(!$(".Model_TemplateList").length||!$(".report_dialog"))
	                                    {
		                                    if(flag=="model"){
			                                     var editObj = $('<div class="Model_TemplateList" title="ģ��"><div class="Model_TemplateList_Content"><img src="/resource/fundIDS/loading/loading14-45.gif" /></div><div class="Model_TemplateList_Buttons"><button class="Model_TemplateList_Sure">��</button><button class="Model_TemplateList_Cancel">ȡ��</button></div></div>').appendTo(document.body);
			                                     editObj.dialog({ closeOnEscape: false,dialogClass:"my-dialog",modal:true,width:680,overlay:{opacity: 0.5, background: "black" ,overflow:'auto'}});	
		                                   	}else 
		                                   	if(flag=="report")
		                                   	{
		                                   		$(".Model_TemplateList").remove();
		                                   		g_fundName= $(".report_dialog .Model_TemplateList_List .actived span:eq(1)").text();
		                                   		var editObj = $('<div class="Model_TemplateList" title="�½����� 1.'+g_fundName+' ->2.ѡ��ģ��"><div class="Model_TemplateList_Content"><img src="/resource/fundIDS/loading/loading14-45.gif" /></div><div class="Model_TemplateList_Buttons"><button class="report_step2_next">��һ��</button><button class="report_step2_pre">��һ��</button><button class="Model_TemplateList_Cancel">ȡ��</button></div></div>').appendTo(document.body);
			                                     editObj.dialog({closeOnEscape: false,dialogClass:"my-dialog",modal:true,width:680,overlay:{opacity: 0.5, background: "black" ,overflow:'auto'}});	
		                                   	}
	                                    }
	                                    $.ajax({
	                                   	       url:'/fundids/ajax/Model_ajax.tsl',
								 	   	              	       type:'post',									 	   	              	    
								 	   	              	       data:{
								 	   	              	       	      dowhat:'QTemplateList'							 	   	              	       	      
								 	   	              	       	    },
								 	   	              	       success:function(data){									 	   	              	        
									 	   	              	        if(!data)return alert('����ʧ�ܣ���ˢ��ҳ�����ԣ�');									 	   	              	                                                    
									 	   	              	        $(".Model_TemplateList").dialog('open');
									 	   	              	        $('.Model_TemplateList .Model_TemplateList_Content').html(data);								 	   	              	        
								 	   	              	        },
								 	   	              	        error:function(){
								 	   	              	        	return false;
								 	   	              	        },
								 	   	              	        complete:function(){
								 	   	              	        	$(".tags").buttonset();
								 	   	              	        }  
	                                          });																	    
																	}
//***********END***********//																
//**********ģ�崴��***********//
function doSubmit(obj)
{
	var TID =  $(".Model_Save").attr("tid");
	var tNameObj= $(".Model_NewTemplateDialog input:eq(0)");
	if($(tNameObj).val()=='')
	{
		$(tNameObj).css({"background-color":"rgb(252, 228, 228)"});
		return false;
	}
	var tTagObj= $(".Model_NewTemplateDialog input:eq(1)");
	var op= $(".Model_NewTemplateDialog .opTag").val();
	var ttype=$(".Model_NewTemplateDialog .TType option:selected").attr("value");
	$.ajax({
				url:'/fundids/ajax/Model_ajax.tsl',
	            type:'post',
	            cache:false,
	            data:{
	            		dowhat:"submitNewTemplate",
	            		op:op,
	            		tid:TID,
	            		tname:$(tNameObj).val(),
	            		ttag:$(tTagObj).val(),
	            		userid:g_userID,
	            		ttype:ttype
	            	},
	            success:function(data){
	            	if(data=='0')return alert("����ʧ��,��ˢ��ҳ�����Ի�����ϵ������Ա!");
	            	$(".Model_NewTemplateDialog").dialog('close').remove();	                       
	                window.location.href="/fundids/index.tsl?type=model&tid="+data;
	                //$(".sys_content").html(data);
	            }
		});
}
//***********END************//
//**********��������***********//
function report_create()
{
	var editObj = $('<div class="report_dialog" title="�½����� 1.ѡ���Ʒ"><div class="Model_TemplateList_Content"><img src="/resource/fundIDS/loading/loading14-45.gif" /></div><div class="Model_TemplateList_Buttons"><button class="formEventButton">��һ��</button><button class="modelCancel">ȡ��</button></div></div>').appendTo(document.body);
	editObj.dialog({ closeOnEscape: false,dialogClass:"my-dialog",modal:true,width:680,close:function(){$(".modelCancel").click();},overlay:{opacity: 0.5, background: "black" ,overflow:'auto'}});
	$.ajax({
       	       url:'/fundids/ajax/report_ajax.tsl',
      	       type:'post',									 	   	              	    
      	       data:{
      	       	      dowhat:'step1'						 	   	              	       	      
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
//**************END**************//

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

function resetSysContentHeight(){
	var winInnerHeight = 0;
	if(window.innerHeight) winInnerHeight = window.innerHeight;
	else winInnerHeight = document.body.clientHeight;
	$('.sys_content').height(winInnerHeight - $('.sys_header').height() - $('.sys_footer').height());	 
}

function displayPageContent(){	
	if(typeof(pageAction) == 'undefined') return;                          
	$.ajax({
		url:'/fundIDS/ajax/displayPageContentAjax.tsl',
		type:'post',
		data:pageAction,
		cache:false,
		success:function(data){			                                          
			$(".sys_content").html(data);                                                              
			ajaxLoadJS(pageAction['Ctype']);		  
		}
	});
}

function ajaxLoadJS(type){
	$(".tags").buttonset();
	switch(type){
		case 'model':$(".Model_EditBox").sortable({update:function(event,ui){Model_ChangeSeq(ui.item);}});
		    $(".Model_EditBox").sortable();		
		break;		
	}
}

function global_setInputdate()
{
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
		beforeShow: function() {setTimeout(function(){$('.ui-datepicker').css('z-index', 99999);}, 0);}		
	});	
}