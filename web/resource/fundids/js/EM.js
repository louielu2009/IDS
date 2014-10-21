$(function(){
	           $(window).unload(function(){
	           	 $.ajax({
                  	      url:'/fundids/ajax/Model_ajax.tsl',
   	              	      type:'post',									 	   	              	    
   	              	      data:{
   	              	       	      dowhat:'clearNewElement'								 	   	              	       	      
   	              	       	    },
   	              	      success:function(data){			 	   	              	      	
   	              	      	                   }
                  	  });
	           });
	           
	            //**********网页click事件监听*********//
	            $('body').click(function(e){
										 var config_box = $('.Element_Config');
										 if(config_box.length)
										 {
										  if(e.pageX < config_box.offset().left || e.pageX > config_box.offset().left + config_box.width() || e.pageY < config_box.offset().top || e.pageY > config_box.offset().top + config_box.height())
										  Element_removeElementConfig();
                     }
							});
							//********元素编辑框配置修改激活事件*********//
	            $("input,select",".Element_Config").live("change",function(){
											  $(".Element_Config").attr("change","true");
						   });
							
	           
	           $('<div title="配置" class="EM_EditConf"><img src="/resource/fundIDS/loading/loading14-45.gif" /></div>').appendTo(document.body).dialog({autoOpen:false,width:450});
	            //*********责权维护********//
	            $("input[class^='Element_Editor_Users']").SelectorItem({'dataUrl':'/fundids/ajax/Model_ajax.tsl','dowhat':'queryUsers'}); 
	            $("input[class^='Element_Editor_Products']").SelectorItem({'dataUrl':'/fundids/ajax/Model_ajax.tsl','dowhat':'queryProducts'});
	            /*
	            $("input[class^='Element_Editor_Users']").live("click",function(){	            	                        
	            	                        var className = $(this).attr("class");	            	                       
	            	                        $(this).SelectorItem({'inputC':'.'+className,'dataUrl':'/fundids/ajax/Model_ajax.tsl','dowhat':'queryUsers'}); 
	            	                       });
	            $("input[class^='Element_Editor_Products']").live("click",function(){
	            	                        var className = $(this).attr("class");
	            	                        $(this).SelectorItem({'inputC':'.'+className,'dataUrl':'/fundids/ajax/Model_ajax.tsl','dowhat':'queryProducts'});
	            	                       });
					*/
	           //*******过滤没有名称的布局元素*********// 	                       
	           $(".EM_table_name").each(function(){					 					 
					         var txt = $(this).text(); 
					         if(txt ==""||txt==null){
					         $(this).parent("tr").remove();
					     }
		        });     	                         	                       
	           //*********元素编辑触发事件***********//
	           $(".EM_table_tr").live("click",function(){	                  
									$(this).after("<tr><td colspan='6'><div class='Element_Config'></div></td></tr>");  
									$(".Element_Config").attr("change","false");
									var EID = $(this).attr("eid");
									EM_EditElement(EID);
									// $(this).children(".EM_table_name").text($("input[property='Element_Name']",".Element_Config").val());      
	           });
	           //*********添加元素事件********//
	           $(".EM_Button_AddElement").live("click",function(){
	                 EM_AddElement();
	           });
	          //******搜索******//  
	          $(".btn_search").live("click",function(){               
	            	    EM_Search();
					  });	
					              
					  //******类型过滤*******//
					 /* $("input[name='EM_type']:checked").live("click",function(){          	
	              EM_Filter();      
	          });*/
	          /******产品、报告期过滤和类型过滤********/
	          $("#with_products,#with_Rpt,input[name='EM_type']:checked").live("click",function(){ 
	              EM_Filter2();      
	          });
						//******标签过滤*******//
	           $(".left_nav .tags input").live("click",function(){ 
	           	var tag='';
	           	if($(".tags input:checked").length>0){
	           		$(".tags input:checked").each(function(index,iObj){
	           			if(index==0)
	           					tag=$(iObj).next("label").find("span").text();
	           			else tag+=';'+$(iObj).next("label").find("span").text();
	           		})
	           	}
	           EM_LabelFilter(tag);      
	          });
	          
	           //***Enter键搜索***//
					  $(document).keyup(function (e) {
              if (e.keyCode == 13) {
                EM_Search();
              }
           });
           //***Esc关闭页面******//
					 $(document).keyup(function(e){
					     var code = e.keyCode ? e.keyCode : e.which;
					     if(code == 27 || code == 96){
		            Element_removeElementConfig();
					    }
					 });	          
	         //**********模板元素样式编辑栏关闭事件*********//
	         $(".Element_Style_Close").live("click",function(){
	              $(".Element_Style").remove();
	          }); 	               		
});

//***********TForm********//
function Element_AddEditor(obj){
	 var Num = $('input[property^="DMUsers"]').length;
	 var html = '<tr class="formRow"><td class="form_input_txt"><span>维护人</span></td><td class="form_input"><input type="text" class="Element_Editor_Users'+Num+'" orginal property="DMUsers:Element_Editor_Users'+Num+'" /></td><td class="form_input_txt"><span>负责产品</span></td><td class="form_input"><input type="text" class="Element_Editor_Products'+Num+'" orginal property="DMProducts:Element_Editor_Products'+Num+'" /></td><td class="form_button"><input type="button" onclick="Element_DeleteRights(this)" value="删除" /></td></tr>';
	 $(obj).parents(".formRow").before(html);	
}
function Element_DeleteRights(obj){
   $(obj).parents("tr.formRow").remove();
}

//************END**********//

//***********初始化元素样式设置模板*************//
function Element_SetStyle(){
     if($(".Element_Style:visible").length)
     {
      $(".Element_Style:visible").remove();
      return;
     }
     var data = {};
     data['dowhat'] = 'outElementStyle';	     	    
     data['EType'] = $(".Element_ElementType option:selected").attr("value");
     data['NewE'] = $(".Element_Config").data("NewCom");
     data['EID'] = $(".Element_EID").attr("value");
     var html = '<div class="Element_Style" title="样式"></div>' ;		   
	   var editor_obj = $(html).appendTo("body").draggable({"cursor":"move",
	                                  "handle":".Element_Style_Bar",
	                                  "containment":".sys_body",
	                                  "zIndex":100,
	                                  "start":function(){ 	   	         	                                                      
	                                  }
	                                 });		   
	   var _top = $(".Element_SetStyle").offset().top+$(".Element_SetStyle").height(),_left= $(".Element_SetStyle").offset().left;
	   $(editor_obj).css({"top":_top,"left":_left,"position":"absolute"}) ;
     $(editor_obj).html('<div style="text-align:center;margin-top:30px;"><img src="/resource/fundIDS/loading/loading14-45.gif"></div>') ;                            
     $.ajax({
     	       url:'/fundids/ajax/Model_ajax.tsl',
     	       type:'post',
     	       data:data,
     	       success:function(data){	     	       	      
     	       	      if(!data)
     	       	      {
     	       	      	$(editor_obj).remove();
     	       	      	return alert('元素样式加载失败！');
                    }
                    $(editor_obj).html('<div><a href="javascript:void(0);" class="Element_Style_Close" title="关闭">×</a></div><div class="Element_Style_Bar">样式</div>');
     	              $(editor_obj).append(data);
     	          }  	 	     	 
     	     });            			
}
//**********END**********//
//***********添加元素************//
function EM_AddElement(){	
  $(".EM_CheckBox").after("<div class='Element_Config'></div>");
  
   var AddObj = $(".Element_Config"); 
   AddObj.html('<img src="/resource/fundIDS/loading/loading14-45.gif" />').attr('tabindex',0).attr('hidefocus',true);			 	
   $.ajax({
   	        url:'/fundids/ajax/Model_ajax.tsl',
   	        type:'post',
   	        data:{
   	        	    dowhat:'addNewElement'
   	        	   },
   	        success:function(data){
   	        	if(!data)return alert('操作失败！');
   	        	var arr= data.split('●ω●');
   	        	AddObj.html(arr[1]);   	         
   	         },
   	        complete:function(){   	        
   	        	$(".tags",".Element_Config").buttonset();   	        
   	        }
   	     });
}
//****编辑元素*****//
function EM_EditElement(EID){	       
	if(!EID)
		return alert('请选择元素！'); 

	var EditObj = $(".Element_Config");	       
	EditObj.html('<img style="margin:auto" src="/resource/fundIDS/loading/loading14-45.gif" />').attr({'tabindex':0,'hidefocus':true});	       
	
	$.ajax({
		url:'/fundids/ajax/Model_ajax.tsl',
		type:'post',
		data:{
			dowhat:'editElement',
			EID:EID
		},
		success:function(data){
			if(!data)return alert('操作失败！');							    	      
			var arr = data.split('●ω●');
			EditObj.html(arr[1]);			 	     	
		},
		complete:function(){
			$(".tags").buttonset();			
		}
	});	       	   
}

//**********搜索*************//
function EM_Search(){    
		 var SearchKey = $(".txt_search").val();
     var regExp = new RegExp(SearchKey, "gi");//创建正则表达式，g表示全局的，i大小写不敏感
     $(".searchTag").parent("tr").removeAttr("sflag"); 
		 $(".searchTag").each(function(){		
					 var txt = $(this).text(); 
					 if($(this).parent("tr").attr("sflag")=="1"){	  	
					  	return true; 
					 }
				   if(!regExp.test(txt)){  	  
				   		$(this).parent("tr").hide();//false隐藏
				   } else{
				   	  $(this).parent("tr").attr("sflag","1");//加标记位
				      $(this).parent("tr").show();//true显示		     
					 }  
		 });
 } 
//****类型过滤****//
/*function  EM_Filter(){
	 var item = $("input[name='EM_type']:checked").val(); 
	 $(".EM_table_tr").each(function(){	
	  	var typevalue = $(this).attr("Typevalue"); 
	  	if(item !== typevalue ){
	  	  $(this).attr("checkflag","hide");
		  } else{
				    $(this).attr("checkflag","show");
		  }  
	  	if(item == "All" ){
	  		$(this).attr("checkflag","show");
	  	}
	  	checkshow();   
	  });	
}*/
//*****产品、报告期过滤和类型过滤*****//
function  EM_Filter2(){
	var pro=$("#with_products").attr("checked"); //产品相关
	var rpt=$("#with_Rpt").attr("checked"); //报告期相关
	var item = $("input[name='EM_type']:checked").val();
	$(".EM_table_tr").removeAttr("checkflag");//移除状态位
	//报告期相关
	if(rpt !=="checked"){
		$(".EM_table_tr").each(function(){
			 var temp=$(this).attr("Provalue");
			 var typevalue = $(this).attr("Typevalue"); 
			 if(temp=="0"){
				 $(this).attr("checkflag","hide");
			 } 
			 if(item !== typevalue ){
	  	   $(this).attr("checkflag","hide");
		   }
		   if(item == "All" ){
	  		 $(this).attr("checkflag","show");
	  	 }
		   checkshow();    	
		});
	}else{
  	$(".EM_table_tr").each(function(){	
	  	 var txt = $(this).attr("Rptvalue"); 
	     if(txt =="0"){
	  	   $(this).attr("checkflag","hide");
		   } 
		   var typevalue = $(this).attr("Typevalue"); 
			 if(item !== typevalue ){
	  	   $(this).attr("checkflag","hide");
		   }
		   if(item == "All" ){
	  		 $(this).attr("checkflag","show");
	  	 }
		  checkshow();  
	  });	
  }
  //产品
  if(pro !=="checked"){
  	$(".EM_table_tr").each(function(){	
	  	 var txt = $(this).attr("Rptvalue"); 
	     if( txt =="0"){
	  	   $(this).attr("checkflag","hide");
		   } 
		   var typevalue = $(this).attr("Typevalue"); 
			 if(item !== typevalue ){
	  	   $(this).attr("checkflag","hide");
		   }
		   if(item == "All" ){
	  		 $(this).attr("checkflag","show");
	  		 if( txt =="0"){
	  	   $(this).attr("checkflag","hide");
		    } 
	  	 }
		  checkshow();    	
	  });
  }else{
  	$(".EM_table_tr").each(function(){	
	  	 var txt = $(this).attr("Provalue"); 
	     if(txt =="0"){
	  	   $(this).attr("checkflag","hide");
		   } 
		   var typevalue = $(this).attr("Typevalue"); 
			 if(item !== typevalue ){
	  	   $(this).attr("checkflag","hide");
		   }
		   if(item == "All" ){
	  		 $(this).attr("checkflag","show");
	  		 var txt = $(this).attr("Provalue"); 
	     if(txt =="0"){
	  	   $(this).attr("checkflag","hide");
		   } 
	  	 } 
	  	 checkshow(); 
	  }); 
	  	
  }
  if(pro !=="checked"&&rpt!=="checked"){
  	$(".EM_table_tr").attr("checkflag","show");
  	  $(".EM_table_tr").each(function(){	
	  	  var txt = $(this).attr("Provalue"); 
	      if(txt =="1"){
		  	  $(this).attr("checkflag","hide");
		    } 
	      var temp = $(this).attr("Rptvalue"); 
	      if(temp =="1"){
		  	  $(this).attr("checkflag","hide");
		    } 
		    var typevalue = $(this).attr("Typevalue"); 
			  if(item !== typevalue ){
	  	    $(this).attr("checkflag","hide");
		    }
		    if(item == "All" ){
	  		  $(this).attr("checkflag","show");
	  	  }
  		});
  	 checkshow(); 
  }
  if(pro =="checked"&&rpt=="checked"){
  	 $(".EM_table_tr").each(function(){	
	  	 var txt = $(this).attr("Provalue"); 
	     if(txt =="0"){
		  	 $(this).attr("checkflag","hide");
		   } 	
	  	 var temp = $(this).attr("Rptvalue"); 
	     if(temp =="0"){
		  	 $(this).attr("checkflag","hide");
		   }
		   var typevalue = $(this).attr("Typevalue"); 
			 if(item !== typevalue ){
	  	   $(this).attr("checkflag","hide");
		   }
		   if(item == "All" ){
	  	  	$(this).attr("checkflag","show");
	  	 } 
  	 });	
  	 checkshow(); 
  }	
}
//过滤的显示与隐藏
function checkshow(){
	$(".EM_table_tr").each(function(){
	var temp=$(this).attr("checkflag");
	//alert(temp);
	if(temp == "hide"){
	   $(this).hide();
	}else{
		$(this).show();
	}
});
}

//*****标签过滤******//
function  EM_LabelFilter(tag){
		 $(".EM_table_name").each(function(){
		 		   if(tag==''){$(this).parent("tr").show();}
		 		   else{
					   var txt = $(this).attr("tags");
					   if(!txt&&tag)
					   {
					    $(this).parent("tr").hide();
					    return;
					   } 
					   var txtArr= txt.split(';');
					   for(var i=0;i<txtArr.length;i++)
					   {
						   if(tag.indexOf(txtArr[i])>=0){
						   		$(this).parent("tr").show();
						   		continue;
						    }else
						      $(this).parent("tr").hide();
						}
				  }
		 });	
}

 //***********元素编辑框失去焦点触发事件************//
function Element_removeElementConfig(){    
    if(!$(".Element_Style:visible").length&&!$(".selectordiv:visible").length)
    {
    if($(".Element_Config").attr("change")=="true"){
       if(window.confirm('是否保存元素？')){
          $(".Element_Save").click();
       }else{
          $(".Element_Config").remove();	
       }
    }else{
      $(".Element_Config").remove();	
    }
       
     }
    $(".dotWebFloatEditorBar").hide();	            	                               
}

//**********标签输入框失去焦点触发***********//
function Element_Labels(obj){
    var val=$(obj).attr("value");	                          
    val = val.trim();
    $(obj).attr("value",val);
    var arr= val.split(';'),arr2=[],len;	                          
    for(var i=0;i<arr.length;i++)
    {
      len = arr2.length;	                           
      if(!$(".tag[value='"+arr[i]+"']").length)
      {
        if(!arr[i])continue;
        $(".tag[value='"+arr[i]+"']").addClass('tag_added');
        arr2[len] = arr[i];
        var tagObj = $("div.tags");
        var len = $("input.tag").length;
        tagObj.append('<input class="tag ui-helper-hidden-accessible tag_added" type="checkbox" value="'+arr[i]+'" id="tag'+len+'"><label for="tag'+len+'" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left" role="button" aria-disabled="false"><span class="ui-button-text">'+arr[i]+'</span></label>');	                           
      }  
    };
    if(!arr2.length)return;
      $.ajax({
    	      url:'/fundids/ajax/Model_ajax.tsl',
    	      type:'post',
    	      data:{
    	      	     dowhat:'addLabel',
    	      	     Labels:$.toJSON(arr2)
    	      	   },
    	      success:function(data){	                          	      	
    	      	 }                      	
    	    });	                          
}