$(function() {	
	 /****�ļ��ϴ��¼�****/
	 $(".DM_Upload").live("click",function(){	       
	       var iframe = $(".DM_Upload_Frame").contents().find("body");
	       iframe.find(".uploadFile").click();	      	       
	 });
	 /****�ϴ��ļ������¼�****/
	 $(".Upload_FileName").live("change",function(){	       
	       $(".edit_dialog").attr("change","true");
	 });
	 /****�ļ������¼�****/
	 $(".DM_Download").live("click",function(){
	       if(!$(".status_flag").length)return alert('����ʧ�ܣ�');
	       var tip1 = $(".status_flag").attr('reportdate'),
	           tip2 = $(".status_flag").attr('product'),
	           EID = $(".status_flag").attr('eid'),
	           iframe = $(".DM_Download_Frame");
	       iframe.attr("src","/fundids/file/DM_DownloadFile.tsl?eid="+String(EID)+"&tip1="+String(tip1)+"&tip2="+String(tip2));	       
	 });
	 /*******���������¼�**********/
	 $(".DM_Reload").live("click",function(){
	 	  var ObjData = $(".edit_dialog").data('Info');
	 	  var eid=ObjData.eid,
	 			  rpt=ObjData.reportdate,
	 			  fundid=ObjData.product;
	 	  reloadData(eid,fundid,rpt);
	 });
	 /**ȷ������**/
	 $(".btn_reload").live("click",function(){
	 		Reload();
	 });
	 /**ȡ������**/
	 $(".btn_cancelreload").live("click",function(){
	 		$(".reload_dialog").remove();
	 });
	 /************���ݰ汾�¼�**************/
	 $(".DM_DataVersion_value").live("click",function(){
	 		
	 });
	 
	 
	 /*************�༭***************/
	 $(".Data_Edit").live("click",function(){	
 	       $(this).addClass("status_flag");//���״̬λ    
         var eid=$(this).attr("eid"),
         		 product=$(this).attr("product"),
         		 role=$(this).attr("role"),
 	       		 statu=$(this).attr("status"),
 	           reportdate=$(this).attr("reportdate");     
 	       var Ename=$(this).parents("tr").find("td:eq(1)").text();                 
         data_edit(eid,product,role,statu,reportdate,Ename);
    });
   /**�ж������Ƿ��޸�**/
    $(".DM_dialogText,select,input",".edit_dialog").live("change",function(){
      	 $(".edit_dialog").attr("change","true");
  	});  	
   /***����***/
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
			 	 	if(window.confirm('����û�Ķ����Ƿ񱣴棿')){
			     var statu="2";
			 	   Data_Save(statu);
			   }else{
			   	
			   }     
	 	 }
   });
	/****�����ύ****/
	$(".btn_submit").live("click",function(){
		   if(window.confirm('�Ƿ��ύ�����޸Ĳ�������ˣ�')){
           var statu="3";
		       Data_Save(statu);
       }else{
       	   alert("����ȡ����");
       }
	}); 
	
/*******����ճ�����ı��棨δ��ɣ�*********/	
$(".DM_dialogC").live("click",function(){
   $(".DM_dialogC").find("tr").each(function(){
   
   var txt=$(this).children("td").text()+'/n';  
  });
  
}); 
	
/******ȡ��*************/
	 $(".btn_cancel").live("click",function(){	
	 	 if($(".edit_dialog").attr("change")=="true"){
		 	   if(window.confirm('�Ƿ���������޸ģ�')){
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
   /***�鿴***/
    $(".Data_Check").live("click",function(){	
    	var eid=$(this).attr("eid"),
	         		 product=$(this).attr("product"),
	         		 role=$(this).attr("role"),
	 	       		 statu=$(this).attr("status"),
	 	           reportdate=$(this).attr("reportdate");  
     var Ename=$(this).parents("tr").find("td:eq(1)").text();      
	          Data_Check(eid,product,role,statu,reportdate,Ename);
    });
    /***���****/
    $(".Data_Audit").live("click",function(){
      $(this).addClass("status_flag");//����״̬λ
      var eid=$(this).attr("eid"),
          product=$(this).attr("product"),
          role=$(this).attr("role"),
          statu=$(this).attr("status"),
          reportdate=$(this).attr("reportdate");
      var Ename=$(this).parents("tr").find("td:eq(1)").text();                         
      DataAudit(eid,product,role,statu,reportdate,Ename);
    });
    /***ͨ�����***/
     $(".btn_pass").live("click",function(){	 
       	var statu="4";
     	  AuditPass(statu);
     });
      /***����***/
     $(".btn_back").live("click",function(){	 	
     		var statu="5";
     	  AuditPass(statu);
     });
  /******��Ʒ�������ڹ��˺�����״̬********/
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
 
 
/******��������******/ 
	$(".DM_LeftBox_SearchButton").live("click",function(){
			DM_SearchItem();
	});
//***Enter������***//
 $(document).keyup(function (e) {
      if (e.keyCode == 13) {
        DM_SearchItem();
      }
   });
	   
});
/*******************************************************
 *					         *function����*                    *
 *******************************************************/
 
/**�༭**/
function data_edit(eid,product,role,statu,reportdate,Ename){
	  ObjData={};
		ObjData.eid=eid;
	  ObjData.product=product;
	  ObjData.role=role;
	  ObjData.statu=statu;
	  ObjData.reportdate=reportdate;    
   var editObj = $('<div class="edit_dialog" title="�༭ -- '+Ename+'"></div></div>').appendTo(document.body);
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
/**���**/
function  DataAudit(eid,product,role,statu,reportdate,Ename){
	  ObjData={};
		ObjData.eid=eid;
	  ObjData.product=product;
	  ObjData.role=role;
	  ObjData.statu=statu;
	  ObjData.reportdate=reportdate;   
	 var editObj = $('<div class="edit_dialog" title="��� -- '+Ename+'"></div></div>').appendTo(document.body);
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
/****�ر��Ƴ�dialog****/
function DialogClose(){
	 $("a").removeClass("status_flag");//�Ƴ�״̬λ 
	 $(".edit_dialog").remove();
}
/****������ݱ���ص��¼�*****/
function Data_SaveRet(data){
  if(typeof data=="object")
  {
    $(".status_flag").parents("tr").find("td:eq(5)").html(data['UpdateTime']);
    $(".status_flag").parents("tr").find("td:eq(6)").html(data['DataStatus']);
    $(".status_flag").replaceWith(data['op']);
    alert('�����ɹ�!'); 
    DialogClose();
  } 
}
/*****���桢�ύ����****/
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
	      	       		alert('����ʧ��!');    	   
	      	       	}
	      	       	else{
	      	       		var temp=data.split(";");
	      	       		$(".status_flag").parents("tr").find("td:eq(5)").html(temp[0]);
	      	      		$(".status_flag").parents("tr").find("td:eq(6)").html(temp[1]);
	      	        	$(".status_flag").replaceWith(temp[2]);   		
	      	          alert('�����ɹ�!'); 
	      	        }  	          	       	
	      	        DialogClose();
      	       }
      }); 
  }
}
/**�鿴����**/
function  Data_Check(eid,product,role,statu,reportdate,Ename){
	 var editObj = $('<div class="edit_dialog" title="�鿴 -- '+Ename+'"></div></div>').appendTo(document.body);
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
/***ͨ����� or ����****/
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
	      	       		alert('����ʧ��!'); 
	      	       	   
	      	       	}
	      	       	else{
	      	       		var temp=data.split(";");
	      	      		$(".status_flag").parents("tr").find("td:eq(6)").html(temp[0]);
		      	        $(".status_flag").replaceWith(temp[1]); 		
	      	          alert('�����ɹ�!'); 
	      	        }           	       	
	      	       DialogClose();
      	       }
      }); 
}

function getDataByVersion(eid,fundId,versionId){
  return 'version:'+versionId;
}
/******��������*******/
function reloadData(eid,fundid,rpt){
	var editObj = $('<div class="reload_dialog" title="��������"></div></div>').appendTo(document.body);
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
  	       	  return alert("û��Ҫ���ص����ݻ����ݴ���");      	  
  	       	}
  	       	  $(".reload_dialog").dialog('open');
    	        $(".reload_dialog").html(data);   	      
  	       }	 	
	  });
}
/**��������**/
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
                  alert("����ʧ�ܣ�");
					  }else{
					  $(".reload_dialog").remove();
					  DialogClose();
					  alert("���سɹ���");
					 }
					}
				});
}

function getDataByRpt(eid,fundId,rpt){
  return 'report:'+rpt;
}
/*********��������**************/
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
/********ѡ�����*********/
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
/***ģ�����***/
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

