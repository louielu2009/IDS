$(function() {	
	 /****文件上传事件****/
	 $(".DM_Upload").live("click",function(){	       
	       var iframe = $(".DM_Upload_Frame").contents().find("body");
	       iframe.find(".uploadFile").click();	      	       
	 });
	 /****上传文件触发事件****/
	 $(".Upload_FileName").live("change",function(){	       
	       $(".edit_dialog").attr("change","true");
	 });
	 /****文件下载事件****/
	 $(".DM_Download").live("click",function(){
	       if(!$(".status_flag").length)return alert('操作失败！');
	       var tip1 = $(".status_flag").attr('reportdate'),
	           tip2 = $(".status_flag").attr('product'),
	           EID = $(".status_flag").attr('eid'),
	           iframe = $(".DM_Download_Frame");
	       iframe.attr("src","/fundids/file/DM_DownloadFile.tsl?eid="+String(EID)+"&tip1="+String(tip1)+"&tip2="+String(tip2));	       
	 });
	 /*******数据重载事件**********/
	 $(".DM_Reload").live("click",function(){
	 	  var ObjData = $(".edit_dialog").data('Info');
	 	  var eid=ObjData.eid,
	 			  rpt=ObjData.reportdate,
	 			  fundid=ObjData.product;
	 	  reloadData(eid,fundid,rpt);
	 });
	 /**确定重载**/
	 $(".btn_reload").live("click",function(){
	 		Reload();
	 });
	 /**取消重载**/
	 $(".btn_cancelreload").live("click",function(){
	 		$(".reload_dialog").remove();
	 });
	 /************数据版本事件**************/
	 $(".DM_DataVersion_value").live("click",function(){
	 		
	 });
	 
	 
	 /*************编辑***************/
	 $(".Data_Edit").live("click",function(){	
 	       $(this).addClass("status_flag");//添加状态位    
         var eid=$(this).attr("eid"),
         		 product=$(this).attr("product"),
         		 role=$(this).attr("role"),
 	       		 statu=$(this).attr("status"),
 	           reportdate=$(this).attr("reportdate");     
 	       var Ename=$(this).parents("tr").find("td:eq(1)").text();                 
         data_edit(eid,product,role,statu,reportdate,Ename);
    });
   /**判断内容是否修改**/
    $(".DM_dialogText,select,input",".edit_dialog").live("change",function(){
      	 $(".edit_dialog").attr("change","true");
  	});  	
   /***保存***/
	 $(".btn_save").live("click",function(){
	 	 if($(".grid-wrapper",".edit_dialog").length)
	 	 {
	 	   //if($(".grid-edited-td",".edit_dialog").length)
	 	   $(".edit_dialog").attr("change","true");
	   }
	 	 if($(".edit_dialog").attr("change")=="true"){
	 	   var statu="2";
	 	   Data_Save(statu);
	 	 }else{
			 	 	if(window.confirm('数据没改动，是否保存？')){
			     var statu="2";
			 	   Data_Save(statu);
			   }else{
			   	
			   }     
	 	 }
   });
	/****保存提交****/
	$(".btn_submit").live("click",function(){
		   if(window.confirm('是否提交本次修改并发起审核？')){
           var statu="3";
		       Data_Save(statu);
       }else{
       	   alert("操作取消！");
       }
	}); 
	
/*******复制粘贴表格的保存（未完成）*********/	
$(".DM_dialogC").live("click",function(){
   $(".DM_dialogC").find("tr").each(function(){
   
   var txt=$(this).children("td").text()+'/n';  
  });
  
}); 
	
/******取消*************/
	 $(".btn_cancel").live("click",function(){	
	 	 if($(".edit_dialog").attr("change")=="true"){
		 	   if(window.confirm('是否放弃本次修改？')){
	          DialogClose();
	       }else{
	       	
	       }
     } 
     else{
     	  DialogClose();
     }          				 
   }); 
    $(".btn_sure").live("click",function(){	 	
     	  DialogClose();
    }); 
   /***查看***/
    $(".Data_Check").live("click",function(){	
    	var eid=$(this).attr("eid"),
	         		 product=$(this).attr("product"),
	         		 role=$(this).attr("role"),
	 	       		 statu=$(this).attr("status"),
	 	           reportdate=$(this).attr("reportdate");  
     var Ename=$(this).parents("tr").find("td:eq(1)").text();      
	          Data_Check(eid,product,role,statu,reportdate,Ename);
    });
    /***审核****/
    $(".Data_Audit").live("click",function(){
      $(this).addClass("status_flag");//增加状态位
      var eid=$(this).attr("eid"),
          product=$(this).attr("product"),
          role=$(this).attr("role"),
          statu=$(this).attr("status"),
          reportdate=$(this).attr("reportdate");
      var Ename=$(this).parents("tr").find("td:eq(1)").text();                         
      DataAudit(eid,product,role,statu,reportdate,Ename);
    });
    /***通过审核***/
     $(".btn_pass").live("click",function(){	 
       	var statu="4";
     	  AuditPass(statu);
     });
      /***驳回***/
     $(".btn_back").live("click",function(){	 	
     		var statu="5";
     	  AuditPass(statu);
     });
  /******产品、报告期过滤和数据状态********/
  $("input[name='DM_radio']:checked,.with_NotPro,.with_NotRpt,.AllProductText,.Template_Item").live("click",function(){               
     var fundid = $(".AllProductText option:selected").val();              
     var statu=$("input[name='DM_radio']:checked").val();
     if($(".with_NotPro").attr("checked")){
     	     $(".with_NotPro").attr("pro","1");
       }else{
         $(".with_NotPro").removeAttr("pro");	
     }
     if($(".with_NotRpt").attr("checked")){
     	      $(".with_NotRpt").attr("rpt","1");
       }else{
         $(".with_NotRpt").removeAttr("rpt");	
     }
     var pro=$(".with_NotPro").attr("pro");
     var rpt=$(".with_NotRpt").attr("rpt");
     var tid='';
     if($(this).hasClass("Template_Item")) 
     tid = $(this).attr("tid");
     DM_CheckFilter(pro,rpt,fundid,statu,tid);      
  });    
 
 
/******搜索过滤******/ 
	$(".DM_LeftBox_SearchButton").live("click",function(){
			DM_SearchItem();
	});
//***Enter键搜索***//
 $(document).keyup(function (e) {
      if (e.keyCode == 13) {
        DM_SearchItem();
      }
   });
	   
});
/*******************************************************
 *					         *function方法*                    *
 *******************************************************/
 
/**编辑**/
function data_edit(eid,product,role,statu,reportdate,Ename){
	  ObjData={};
		ObjData.eid=eid;
	  ObjData.product=product;
	  ObjData.role=role;
	  ObjData.statu=statu;
	  ObjData.reportdate=reportdate;    
   var editObj = $('<div class="edit_dialog" title="编辑 -- '+Ename+'"></div></div>').appendTo(document.body);
	 editObj.dialog({
	 	       closeOnEscape: false,
	 	       dialogClass:"my-dialog",
	 	       modal:true,
	 	       width:680,
	 	       height:455,
	 	       resizable: false,
	 	       close:function(){DialogClose();},
	 	       overlay:{opacity: 0.5, background: "black" ,overflow:'auto'}
	 	       });
	 $(".edit_dialog").data('Info',ObjData);
	 $.ajax({
   	       url:'/fundids/ajax/DM_ajax.tsl',
  	       type:'post',									 	   	              	    
  	       data:{
  	       	      dowhat:'edit',	
  	       	      eid:eid,
  	       	      product:product,
  	       	      role:role,
  	       	      statu:statu,
  	       	      reportdate:reportdate,  						 	   	              	       	      
  	       	    },
  	       success:function(data){
    	        $(".edit_dialog").dialog('open');
    	        $(".edit_dialog").html(data); 	
    	        $(".edit_dialog").attr("change","false"); 	        
  	        }
   });
}
/**审核**/
function  DataAudit(eid,product,role,statu,reportdate,Ename){
	  ObjData={};
		ObjData.eid=eid;
	  ObjData.product=product;
	  ObjData.role=role;
	  ObjData.statu=statu;
	  ObjData.reportdate=reportdate;   
	 var editObj = $('<div class="edit_dialog" title="审核 -- '+Ename+'"></div></div>').appendTo(document.body);
	 editObj.dialog({
	 	              closeOnEscape: false,
	 	              dialogClass:"my-dialog",
	 	              modal:true,
	 	              width:680,
	 	              height:455,
	 	              resizable: false,
	 	              close:function(){DialogClose();},
	 	              overlay:{opacity: 0.5, background: "black" ,overflow:'auto'}
	 	              });
	 $(".edit_dialog").data('Info',ObjData);
	 $.ajax({
       	       url:'/fundids/ajax/DM_ajax.tsl',
      	       type:'post',									 	   	              	    
      	       data:{
      	       	      dowhat:'audit',	
      	       	      eid:eid,
      	       	      product:product,
      	       	      role:role,
      	       	      statu:statu,
      	       	      reportdate:reportdate, 	        						 	   	              	       	      
      	       	    },
      	       success:function(data){
        	        $(".edit_dialog").dialog('open');
        	        $(".edit_dialog").html(data); 	
        	        $(".DM_dialogText").attr("readonly",true).css({"border":"#fff"});    	        
      	        }
   });
}
/****关闭移除dialog****/
function DialogClose(){
	 $("a").removeClass("status_flag");//移除状态位 
	 $(".edit_dialog").remove();
}
/****表格数据保存回调事件*****/
function Data_SaveRet(data){
  if(typeof data=="object")
  {
    $(".status_flag").parents("tr").find("td:eq(5)").html(data['UpdateTime']);
    $(".status_flag").parents("tr").find("td:eq(6)").html(data['DataStatus']);
    $(".status_flag").replaceWith(data['op']);
    alert('操作成功!'); 
    DialogClose();
  } 
}
/*****保存、提交数据****/
function Data_Save(statu){
	var ObjData = $(".edit_dialog").data('Info');
	if($(".grid-wrapper",".edit_dialog").length)
	{		  
		  var button_obj = $("table.grid-leftbutton-table .btn-save",$(".grid-wrapper",".edit_dialog"));		  
		  $(button_obj).trigger("click",[{"Status":statu}]);	
		  return;
	}
	else if($(".DM_Upload").length)
	{
	    $(".DM_Upload_Frame").contents().find("body .status").attr("value",statu);
	    $(".DM_Upload_Frame").contents().find("body .form").submit();
	}
	else
	{
	    var txt=$(".DM_dialogText").val();	
	   // var txt=$(".DM_dialogText").html();		    
	 	  $.ajax({
       	       url:'/fundids/ajax/DM_ajax.tsl',
      	       type:'post',									 	   	              	    
      	       data:{
      	       	      dowhat:'save',	
      	       	      eid:ObjData.eid,
      	       	      product:ObjData.product,
      	       	      role:ObjData.role,
      	       	      statu:statu,
      	       	      reportdate:ObjData.reportdate,
      	       	     	txt:txt      	       	     						 	   	              	       	      
      	       	    },
      	       success:function(data){
	      	       	if(!data){
	      	       		alert('操作失败!');    	   
	      	       	}
	      	       	else{
	      	       		var temp=data.split(";");
	      	       		$(".status_flag").parents("tr").find("td:eq(5)").html(temp[0]);
	      	      		$(".status_flag").parents("tr").find("td:eq(6)").html(temp[1]);
	      	        	$(".status_flag").replaceWith(temp[2]);   		
	      	          alert('操作成功!'); 
	      	        }  	          	       	
	      	        DialogClose();
      	       }
      }); 
  }
}
/**查看数据**/
function  Data_Check(eid,product,role,statu,reportdate,Ename){
	 var editObj = $('<div class="edit_dialog" title="查看 -- '+Ename+'"></div></div>').appendTo(document.body);
	 editObj.dialog({ 
	 	             closeOnEscape: false,
	 	             dialogClass:"my-dialog",
	 	             modal:true,width:680,
	 	             height:455,
	 	             resizable: false,
	 	             close:function(){DialogClose();},
	 	             overlay:{opacity: 0.5, background: "black" ,overflow:'auto'}
	 	             });
	 $.ajax({
   	       url:'/fundids/ajax/DM_ajax.tsl',
  	       type:'post',									 	   	              	    
  	       data:{
  	       	      dowhat:'check',	
  	       	 			eid:eid,
  	       	      product:product,
  	       	      role:role,
  	       	      statu:statu,
  	       	      reportdate:reportdate,
  	       },
  	       success:function(data){
  	       	  $(".edit_dialog").dialog('open');
    	        $(".edit_dialog").html(data); 	
  	       }
   });	
}
/***通过审核 or 驳回****/
function AuditPass(statu){
	var ObjData = $(".edit_dialog").data('Info');
	var txt=$(".DM_dialogText").val();	
	 	  $.ajax({
       	       url:'/fundids/ajax/DM_ajax.tsl',
      	       type:'post',									 	   	              	    
      	       data:{
      	       	      dowhat:'auditpass',	
      	       	      eid:ObjData.eid,
      	       	      product:ObjData.product,
      	       	      role:ObjData.role,
      	       	      statu:statu,
      	       	      reportdate:ObjData.reportdate,
      	       	     	txt:txt      	       	     						 	   	              	       	      
      	            },
      	       success:function(data){
	      	       	if(!data){
	      	       		alert('操作失败!'); 
	      	       	   
	      	       	}
	      	       	else{
	      	       		var temp=data.split(";");
	      	      		$(".status_flag").parents("tr").find("td:eq(6)").html(temp[0]);
		      	        $(".status_flag").replaceWith(temp[1]); 		
	      	          alert('操作成功!'); 
	      	        }           	       	
	      	       DialogClose();
      	       }
      }); 
}

function getDataByVersion(eid,fundId,versionId){
  return 'version:'+versionId;
}
/******数据重载*******/
function reloadData(eid,fundid,rpt){
	var editObj = $('<div class="reload_dialog" title="重载数据"></div></div>').appendTo(document.body);
	  editObj.dialog({ 
	 	             closeOnEscape: false,
	 	             dialogClass:"my-dialog",
	 	             modal:true,width:680,
	 	             height:400,
	 	             resizable: false,
	 	             close:function(){$(".reload_dialog").remove();},
	 	             overlay:{opacity: 0.5, background: "black" ,overflow:'auto'}
	 	             });
	  $.ajax({
	  	url:'/fundids/ajax/DM_ajax.tsl',
  	       type:'post',									 	   	              	    
  	       data:{
  	       	      dowhat:'reload',	
  	       	 			eid:eid,
  	       	      fundid:fundid,
  	       	      rpt:rpt,
  	       },
  	       success:function(data){
  	       	if(!data){
  	       		$(".reload_dialog").remove();
  	       	  return alert("没有要重载的数据或数据错误！");      	  
  	       	}
  	       	  $(".reload_dialog").dialog('open');
    	        $(".reload_dialog").html(data);   	      
  	       }	 	
	  });
}
/**数据重载**/
function Reload(){
	var txt=$(".DM_ReloadText").html();
	var fileName=$(".DM_ReloadText").attr("FName");
	var ObjData = $(".edit_dialog").data('Info');
  var eid=ObjData.eid,
		  rpt=ObjData.reportdate,
		  fundid=ObjData.product;            
	  $.ajax({
	  	url:'/fundids/ajax/DM_ajax.tsl',
  	       type:'post',									 	   	              	    
  	       data:{
  	       	      dowhat:'replace',	
  	       	 			eid:eid,
  	       	      fundid:fundid,
  	       	      rpt:rpt,
  	       	      fileName:fileName,
  	       },
  	       success:function(data){
	  	       	if(data== 0){		  
                  alert("重载失败！");
					  }else{
					  $(".reload_dialog").remove();
					  DialogClose();
					  alert("重载成功！");
					 }
					}
				});
}

function getDataByRpt(eid,fundId,rpt){
  return 'report:'+rpt;
}
/*********搜索过滤**************/
function DM_SearchItem(){
	var SearchKey = $(".DM_LeftBox_SearchContent").val();
  var regExp = new RegExp(SearchKey,"gi");
  $(".Template_Item").each(function(){		
					 var txt = $(this).text();	 					
				   //if(!regExp.test(txt))
				   if(txt.indexOf(SearchKey)==-1)
				   {
				   		$(this).parent("li").hide();
				   } else{
				      $(this).parent("li").show();
					 }  
		 });
}
/********选择过滤*********/
function DM_CheckFilter(pro,rpt,fundid,statu,tid){	
	$.ajax({
	  	url:'/fundids/ajax/DM_ajax.tsl',
  	       type:'Post',									 	   	              	    
  	       data:{
  	       	      dowhat:'checkfilter',	
  	       	      fundid:fundid,
  	       	      pro:pro,
  	       	      rpt:rpt,
  	       	      statu:statu,
  	       	      tid:tid,
  	       },
  	       success:function(data){	
  	       	$(".main_content").html(data);
  	      }
 	 });
}
/***模板过滤***/
/*function ModelFilter(tid){
	$.ajax({
	  	url:'/fundids/ajax/DM_ajax.tsl',
  	       type:'Post',									 	   	              	    
  	       data:{
  	       	      dowhat:'modelfilter',	
  	       	      tid:tid,
  	       },
  	       success:function(data){	
  	       	$(".main_content").html(data);
  	      }
 	 });
}*/

