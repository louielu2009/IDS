var g_fund='';
var g_fundName='';
//模板配置页面专用脚本
$(function(){	            
	            //**********网页click事件监听*********//
	            $('body').click(function(e){
																					 var config_box = $('.Element_Config');
																					 if(config_box.length)
																					 {
																					  if(e.pageX < config_box.offset().left || e.pageX > config_box.offset().left + config_box.width() || e.pageY < config_box.offset().top || e.pageY > config_box.offset().top + config_box.height())
																					  Element_removeElementConfig();
							                             }
							});
	            //***********模板编辑************//		           
	            $(window).unload(function(){
	            	                           Model_ClearNewElement(); 
	            	                         });
	            	                       
	            //********元素编辑框配置修改激活事件*********//
	            $("input,select",".Element_Config").live("change",function(){
																							 $(".Element_Config").attr("change","true");
																					   });
	            //********模板名称修改事件*********//
	            $(".Model_ModelName").live("click",function(){	            	                              
	            	                               if(!$(this).hasClass("actived"))
	            	                               {
	            	                               	 var val = $(this).text();
	            	                               	 $(this).replaceWith('<input type="text" class="Model_ModelName_Edit" originValue="'+$(this).text()+'" value="'+$(this).text()+'" />');	            	                                
	            	                               }	            	                               
	            	                            });
	            $(".Model_ModelName_Edit").live("blur",function(){
	            	                               var val = $(this).val(),OriginVal=$(this).attr("originValue"),$this=$(this);	 
	            	                               if(val==OriginVal)	            	                                          	                                           	                               
	            	                               {
	            	                                $(this).replaceWith('<span class="Model_ModelName">'+val+'</span>');
	            	                                return;
	            	                               }
	            	                               $.ajax({
																	     	 	   	         url:'/fundids/ajax/Model_ajax.tsl',
																				             	 type:'post',			     	 	    	
																	     	 	             data:{
																	     	 	     	             dowhat:'changeModelName',
																	     	 	     	             TName:val,
																	     	 	     	             TID:$(".Model_Save").attr("tid")
																	     	 	     	             },
																	     	 	             success:function(data){																	     	 	                            
																	     	 	                            if(!data){alert('操作失败！');
																	     	 	                             $this.replaceWith('<span class="Model_ModelName">'+OriginVal+'</span>');
																	     	 	                            }
																	     	 	                            else
																	     	 	                             $this.replaceWith('<span class="Model_ModelName">'+val+'</span>');	
																	     	 	                            
																	     	 	    }});
	            	                            });	           
	            //********元素选择对话框******//
	            $(".Model_btn_add_Element").live("click",function(){
	            	                            var temp=$(this).attr("eid");													                            
														                if($(this).text()=="√"){											    	
																				  	  $(this).css({"background-color":"#fff","border-color":"#D8D8D8","color":"#000"}).text("添加");
																				  	  $(".Model_add_li[eid='"+temp+"']").remove();	
																				  	}
																				  	else if($(this).text()=="添加"){
																				  		 $(this).css({"background-color":"#ED7D31","border-color":"#ED7D31","color":"#fff"}).text("√");																				  		 										  		 
																				  	   var obj = $("<li class='Model_add_li' eid='"+temp+"'><span><div class='Model_add_li_value'>"+$(this).val()+"</div><div class='Model_add_check_title'><input type='checkbox'/>带标题<button class='add_li_del' eid='"+temp+"'>删除</button></div></span></li>").appendTo(".Model_add_ul");
																				  	   obj.find(".add_li_del").on("click",function(){
																				  	  	     var eid = $(this).attr("eid");
																				  	  	     $(".Model_btn_add_Element[eid='"+eid+"']").css({"background-color":"#fff","border-color":"#D8D8D8","color":"#000"}).text("添加");
																				  	  	     $(this).parents(".Model_add_li").remove();
																				  	  	}); 
																				  	}
	            	                         });
	                           
	             //******搜索******//  
	              $(".Model_btn_AE_Search").live("click",function(){               
	            	          Element_AESearch();//点击search时，执行AESearch函数；
									      });	
								$(document).keyup(function (e) {
                   if (e.keyCode == 13) {
                      Element_AESearch();
                   }
                });								          	                         
	            //点击完成或取消按钮，关闭对话框，移除li
			       $(".Model_btn_cancel,.ui-dialog-titlebar-close").live("click",function(){
			     	     $(".Model_AddElement_div,.Model_AddElement_next").dialog("close" ); 
			     	     $(".Model_add_li").remove(); 
			     	 });	
			     	 $(".Model_btn_finish").live("click",function(){
			     	 	   var data={},pos=$(this).data('pos');			     	 	   
			     	 	   data['dowhat'] = 'genElements';
			     	 	   data['EIDs'] = [];
			     	 	   data['Titles'] = [];
			     	 	   var len = $(".sys_homeedit_choose").parent(".Model_Element").prevAll().length+2;
			     	 	   $(".Model_add_li").each(function(n){
			     	 	   	  var SetT = $(this).find(".Model_add_check_title input:checked").length;
			     	 	   	  SetT = SetT?1:0
			     	 	   	  data['EIDs'][data['EIDs'].length] = $(this).attr("eid");
			     	 	   	  data['Titles'][data['Titles'].length] = SetT;			     	 	   				     	 	      
			     	 	      if(SetT)
			     	 	      {
			     	 	       var className = $(".Model_LeftBox_TitleList li:last").attr("class")?$(".Model_LeftBox_TitleList li:last").attr("class"):'Model_Relocate Model_Title_Level1';
			     	 	       var Title = $(this).find(".Model_add_li_value").text();
			     	 	       var liStr = '<li><a href="javascript:void(0);" class="'+className+'" eid="'+$(this).attr("eid")+'" sid="'+(n+len)+'">'+Title+'</a></li>';			     	 	       
			     	 	       $(".Model_LeftBox_TitleList").append(liStr);			     	 	      
			     	 	      }
			     	 	   });
			     	 	   data['EIDs'] = $.toJSON(data['EIDs']);
			     	 	   data['Titles'] = $.toJSON(data['Titles']);
			     	 	   data['SID'] = $(".sys_homeedit_choose").parent(".Model_Element").attr("SID");
			     	 	   data['TID'] = $(".Model_Save").attr("tid");
			     	 	   $.ajax({
			     	 	   	  url:'/fundids/ajax/Model_ajax.tsl',
						 	   	  type:'post',			     	 	    	
			     	 	      data:data,
			     	 	      success:function(data){
			     	 	        if(!data)return alert('操作失败！');
			     	 	        switch(pos)
			     	 	        {
			     	 	         case 'AddBelow':$(".sys_homeedit_choose").parent(".Model_Element").after(data);
			     	 	         break;
			     	 	         case 'AddAbove':$(".sys_homeedit_choose").parent(".Model_Element").before(data);
			     	 	         break;
			     	 	        }
			     	 	      }
			     	 	   });
			     	 	   $(".Model_AddElement_div,.Model_AddElement_next").dialog("close" ); 
			     	     $(".Model_add_li").remove(); 
			     	});
			     	 //下一步 按钮      
				      $(".Model_btn_next").live("click",function(){
				      	//获取已添加元素的个数li
				      	var sum=$(".Model_add_ul li").length;
				      	if(sum==0){
				      	      alert("没有选择元素，请添加元素！"); 	
				      	}else{				     	       	
				     	       	$( ".Model_AddElement_next" ).dialog("open" ); 
				     	       	$( ".Model_AddElement_div" ).dialog("close" ); 
				     	  }
				      });
				     
				      $(".Model_btn_back").live("click",function(){
			     	       	$( ".Model_AddElement_next" ).dialog("close" ); 
			     	        $( ".Model_AddElement_div" ).dialog("open" ); 
			        });	               	            
	            //********模板新建对话框事件********//
	            $(".Model_Template_Cancel").live("click",function(){	            	                            
	            	                            $(".Model_NewTemplateDialog").dialog("close");	            	
	            	                        });
	            //********文档标题定位*******//
	            $(".Model_Relocate").live("click",function(){
	            	                         var SID = $(this).attr("SID");
	            	                         var $obj = $("li.Model_Element[SID='"+SID+"']");
	            	                         if(!$obj.length)
	            	                         return;	            	                         
	            	                         $(".sys_homeedit_choose").toggleClass("sys_homeedit_choose");
	            	                         $obj.addClass("sys_homeedit_choose");
	            	                         var _top = $obj.offset().top;
	            	                         $(window).scrollTop($obj.offset().top);
	            	                       });
	             	                                   	            
	            $(".Model_AddElement").live("click",function(){
	            	                             if($(".dotWebDataGridEditor:visible").length)
	            	                             {
	            	                             	$(".dotWebDataGridEditor:visible").remove();
	            	                             }
	            	                             var n = $('.Element_EType').css("display");
	            	                             if(n=="none")
	            	                             {
	            	                              var offset = $(this).offset();
	            	                              $('.Element_EType').css({"left":offset.left,"top":offset.top+$(this).height()});
	            	                              $('.Element_EType').css({"display":"block"});	            	                             
	            	                             }
	            	                             else
	            	                              $('.Element_EType').css({"display":"none"});
	            	                          });	            
	            //**********左边搜索功能**********//
	            $(".Model_LeftBox_SearchButton").live("click",function(){
	            	                                           var str = $(".Model_LeftBox_SearchContent").attr("value");
	            	                                           if(!str)return;
	            	                                           $(".Model_Element").each(function(){
	            	                                           	                         var Name = $(".Model_Element_Name").text();
	            	                                           	                         if(Name.indexOf(str)!=-1)
	            	                                           	                         $(".Model_Element").addClass("Model_Element_Find");	            	                                           	                         
	            	                                           	                      });         	            	
	            	                                       });
	            //**********模板元素标题绑定事件***********//
	            $(".Model_Element_TitleLevel").live("change",function(){
	            	                                   Model_SaveElementTitle($(this).find("option:selected"),'TitleLevel');
	            	                                   return false;
	            	                                  })
	            	                            .live("click",function(){
	            	                            	      return false;
	            	                            	    });	            	                    
	            //**********模板元素标题名称绑定事件********//
	            $(".Model_Element_Title").live("click",function(e){	            	                                    	                        
	            	                        if($(this).hasClass('actived'))
	            	                        return false;	            	
	            	                        var htm = '<input class="Model_Element_Title actived" originValue="'+$(this).text()+'" value="'+$(this).text()+'" />';
	            	                        $(this).replaceWith(htm);
	            	                        return false;
	            	                       })
	            	                       .live("blur",function(){
	            	                        if($(this).attr("value")==$(this).attr("originValue"))return;	            	                        
	            	                        Model_SaveElementTitle($(this),'Title');
	            	                       });
	            //**********模板元素添加绑定事件***********//
	            $(".Element_Type").live("click",function(){
	            	                        $(".Element_EType").css({"display":"none"});
	            	                        var obj = $(this);	            	                        
	            	                        if(obj.hasClass('Element_Layout'))
	            	                        {
	            	                        Model_AddLayoutElement($(this).attr("comid"),$(".Model_Element").length+1);
	            	                        }
	            	                        else
	            	                        Model_InitElementDialog('NewCom',obj);
	            	                    });	         	            
	            //**********模板元素编辑配置框***********//
	            $(".Element_Config").live({	            
	            	 mouseenter : function(event){
	            	                               $(this).parents(".chooseCOM:eq(0)").die("click");
	            	                                if($(this).hasClass("Actived"))return false;;
	            	                                $(this).addClass("Actived");  
	            	                                $(".dotWebFloatEditorBar").hide();                
	            	                             },
	            	  mouseleave : function(){	            	                                
	            	                                $(this).removeClass("Actived");	            	                                
	            	                             }
	            	});
	            	
	            		
	            //**********模板元素样式编辑栏关闭事件*********//
	            $(".Element_Style_Close").live("click",function(){
	            	                        $(".Element_Style").remove();
	            	                    });	                      	            
	            //*********责权维护********//
	            $("input[class='Element_Auditors']").live("click",function(){
	            	                        if($(this).hasClass('actived'))
	            	                        return;
	            	                        var className = $(this).attr("class");
	            	                        $(this).SelectorItem({'inputC':'.'+className,'dataUrl':'/fundids/ajax/Model_ajax.tsl?dowhat=queryUsers','dowhat':'queryUsers','autoDisplay':true}); 
	            	                        $(this).addClass('actived');
	            	                        $(this).die("click");
	            	                                    	            	
	            });	            
	            $("input[class^='Element_Editor_Users']").live("click",function(){	            	                    
	            	                        if($(this).hasClass('actived'))
	            	                        return;		            	
	            	                        var className = $(this).attr("class");	            	                      
	            	                        $(this).SelectorItem({'inputC':'.'+className,'dataUrl':'/fundids/ajax/Model_ajax.tsl?dowhat=queryUsers','dowhat':'queryUsers','autoDisplay':true}); 
	            	                        $(this).addClass('actived');
	            	                        $(this).die("click");
	            	                       });
	            $("input[class^='Element_Editor_Products']").live("click",function(){
	            	                        if($(this).hasClass('actived'))
	            	                        return;
	            	                        var className = $(this).attr("class");
	            	                        $(this).SelectorItem({'inputC':'.'+className,'dataUrl':'/fundids/ajax/Model_ajax.tsl?dowhat=queryProducts','dowhat':'queryProducts','autoDisplay':true});
	            	                        $(this).addClass('actived');
	            	                        $(this).die("click");
	            	                       });	           
	            //*******模板选择标签响应事件******//
	            $(".Model_TemplateList_Label").live("click",function(){
	            	                            $(this).toggleClass('actived');
	            	                         });
	            $(".Element_Styles_Button_Sure").live("click",function(){
	            	                        $(".Element_Styles").css({"display":"none"});
	            	                    });
	            //**************END************//
	            //***********模板标签响应事件***********//
	            $(".tag",".Element_Config").live("click",function(){Element_AddLabel(this)});
	            $(".Model_Template").live("click",function(){Model_Template(this);});
	            $(".Container_ETypeList").live("change",function(){if($(this).find("option:selected").attr("value")=="Txt")
	            	                                                 {
	            	                                                   $(".Container_ETitleList").css({display:"none"}); 	
	            	                                                 }
	            	                                                 else
	            	                                                   $(".Container_ETitleList").css({display:"block"});
	            	                                                });	            	           	                         	                                       	                                
	         });	    
//***********元素编辑框失去焦点触发事件************//
function Element_removeElementConfig(){    
    if(!$('.Element_Config').hasClass("Actived")&&!$(".Element_Style:visible").length&&!$(".selectordiv:visible").length)
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
   
$().ready(function(){
	$(".chooseCOM").live({
			"click":function(event){
				if($(this).attr("sflag")=="1")  return false;
				$(this).attr("sflag","1");
				if($(".Element_Config").length>0)
                {
                   	$(".Element_Config").remove();
                }
				Model_InitElementDialog('UserCom',$(".sys_homeedit_choose"));
				$(".dotWebFloatEditorBar").hide();
				return false;
			},
			"mouseenter": function(){
				$(this).die("click");
					var EID=$(this).attr("EID");					
					$('.sys_homeedit_choose').removeClass("sys_homeedit_choose");
					$(this).addClass("sys_homeedit_choose");
					if(!EID)
					{
						 $(".sys_homeedit_choose").model("loadFloatEditorBar",{"op":2,"info":{}});
						 return;
					}else{
						$(".sys_homeedit_choose").model("loadFloatEditorBar",{"op":3,"info":'verticalarrange'});	
					}
			},
			"mouseleave": function(){
				$(this).removeAttr("sflag");
				//$(this).removeClass("sys_homeedit_choose");
				//$(".dotWebFloatEditorBar").hide();
			}
	})
});	 
//**********调换次序*********//
function Model_ChangeSeq(obj){
	    $(".Model_Element").removeClass('Model_Element_Choose');
			obj.addClass("Model_Element_Choose");
			var data = {},len=0,Eobj,ctype;
			data['dowhat'] = 'changeSeq';
			data['Pos'] = $(".Model_Element_Choose").prevAll(".Model_Element").length+1;					      
			data['Pre'] = $(".Model_Element_Choose").attr("SID");
			data['TID'] = $(".Model_Save").attr("TID");
			data['EID'] = obj.children(".chooseCOM").attr("eid");
			var pos = parseInt(data['Pos']),pre = parseInt(data['Pre']);
			$(".Model_Element_Choose").attr('SID',pos);		  		 
			var LiObj = $(".Model_LeftBox_TitleList li[EID='"+data['EID']+"'][SID='"+pre+"']");
			if(pos>pre)
			{
			 for(var i=pre;i<pos;i++)
			 {
			  Eobj = $(".Model_Element").eq(i);
			  var sid = Eobj.attr("SID");
			  ctype = Eobj.children(".chooseCOM").attr("ctype");
			  if(ctype=='Title')
			  len++;
			  sid = parseInt(sid);
			  Eobj.attr("SID",--sid);			  
			 }			 
			}
			else
			{
			 for(var j=pos;j<pre;j++)
			 {
			 	Eobj = $(".Model_Element").eq(j);
			 	var sid = Eobj.attr("SID");
			 	sid = parseInt(sid);
			 	ctype = Eobj.children(".chooseCOM").attr("ctype");
			 	if(ctype=='Title')
			 	len++;
			 	Eobj.attr("SID",++sid);
			 }			 
			}			
			$.ajax({
				      url:'/fundids/ajax/Model_ajax.tsl',
	            type:'post',
	            cache:false,
	            data:data,
	            success:function(data){
	              if(!data)
	              {
	              	alert("操作失败！");
	              	window.location.reload();	              	
	              }
	              $(".Model_LeftBox_Titles").html(data);            
	            }
				    });
}
//**********元素标题设置*******//
function Model_SaveElementTitle(obj,flag)
{
 var EID = obj.parents('.chooseCOM').attr("eid"),SID = obj.parents('.Model_Element').attr('sid');
 var data = {}; 
 data['EID'] = EID;
 data['SID'] = SID;
 data['TID'] = $(".Model_Save").attr("tid");
 if(flag=='Title')
 {
 	data['dowhat'] = 'changeTitle';
  data['Title'] = obj.attr("value");
 }
 else if(flag=='TitleLevel')
 {
 	data['dowhat'] = 'changeTitleLevel';
 	data['Level'] = obj.attr("value");
 }
 $.ajax({
 	       url:'/fundids/ajax/Model_ajax.tsl',
 	       type:'post',
 	       data:data,
 	       success:function(data){
 	       	 if(!data)
 	       	 { 	       	 	 	       	 	
 	       	  var htm = '<span class="Model_Element_Title">'+obj.attr("originValue")+'</span>';
 	       	  alert('操作失败！'); 	       	 
 	         }
 	         else
 	         {
 	          var htm = '<span class="Model_Element_Title">'+obj.attr("value")+'</span>';
 	         }
 	         if(flag=='Title')
 	         obj.replaceWith(htm);
 	       }
 	     });
}

//**********搜索*************//
function Element_AESearch(){
		
		 var SearchKey = $(".Model_AE_Search").val();
     var regExp = new RegExp(SearchKey, "gi");//创建正则表达式，g表示全局的，i大小写不敏感
		 $(".Model_AE_content_table_td1").each(function(){					 					 
					 var txt = $(this).text();   
				   if(!regExp.test(txt))
				   $(this).parent("tr").addClass("hidden")
				   else
				   $(this).parent("tr").removeClass("hidden");				  
		 });
 } 
					               
//***********TForm表单元素触发事件********//
function Element_AddEditor(obj){
	 var Num = $('input[property^="DMUsers"]').length;
	 var html = '<tr class="formRow"><td class="form_input_txt"><span>维护人</span></td><td class="form_input"><input type="text" class="Element_Editor_Users'+Num+'" orginal property="DMUsers:Element_Editor_Users'+Num+'" /></td><td class="form_input_txt"><span>负责产品</span></td><td class="form_input"><input type="text" class="Element_Editor_Products'+Num+'" orginal property="DMProducts:Element_Editor_Products'+Num+'" /></td><td class="form_button"><input type="button" onclick="Element_DeleteRights(this)" value="删除" /></td></tr>';
	 $(obj).parents(".formRow").before(html);	
}
function Element_DeleteRights(obj){
   $(obj).parents("tr.formRow").remove();
}

//**********标签按钮触发事件**********//
function Element_AddLabel(obj){
	if($(obj).hasClass("tag_added"))
	{
	 $(obj).removeClass("tag_added");	
	}
	else
	{
	 $(obj).addClass("tag_added");      
  }
  var val = '';   
  $(".tag_added").each(function(){
	 	   val += (val?';':'')+$(this).attr("value");	 	  
	 });
	$(".Element_Labels").attr("value",val);
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
//**********保存配置后返回html***********//
function Element_outHtml(data){	                        
	                        if(!data)return alert('操作失败！');
	                        if($(".Element_Config").length)
	                        {
	                         $(".Element_Config").remove();
	                        }
	                        var r = data.split('●ω●');	                        
	                        if(r[0]!=1)
	                        {
	                         var len = $(".Model_EditBox .Model_Element").length;
	                         var EObj = $(r[2]).appendTo(".Model_EditBox");	                         
	                         $(EObj).children(".chooseCOM").attr("sid",len+1);	                        
	                         if(r[1].indexOf('Title')!=-1)
	                         {
	                         	var arr = r[1].split('●△●');	                         	
	                         	var LiStr= '<li><a href="javascript:void(0);" class="Model_Relocate Model_Title_Level'+arr[1]+'" level ='+arr[1]+'  sid="'+(len+1)+'">'+arr[2]+'</a></li>';
	                          var liObj = $(LiStr).appendTo('.Model_LeftBox_TitleList');
	                         }                      
                          }
                          else
                          {
                           $(".sys_homeedit_choose").parent('.Model_Element').replaceWith(r[2]);
                          }
}
//*********创建模板后返回Html***********//
function Template_outHtml(data){	                      
	                       if(!data)return alert('操作失败！');
	                       $(".Model_NewTemplateDialog").dialog('close').remove();
	                       $(".sys_content").html(data);
}
//**********清除未保存新元素************//
function Model_ClearNewElement(){
	                        $.ajax({
	                        	      url:'/fundids/ajax/Model_ajax.tsl',
			 	   	              	      type:'post',									 	   	              	    
			 	   	              	      data:{
			 	   	              	       	      dowhat:'clearNewElement',								 	   	              	       	      
			 	   	              	       	    },
			 	   	              	      success:function(data){			 	   	              	      	
			 	   	              	      	                   }
	                        	    });
}

//********添加布局元素************//
function Model_AddLayoutElement(ctype,SID){
							                            if(!ctype) return;
							                            $.ajax({
							                            	      url:'/fundids/ajax/Model_ajax.tsl',
										 	   	              	        type:'post',									 	   	              	      
										 	   	              	        data:{
										 	   	              	        	    dowhat:'addLayoutElement',
										 	   	              	        	    CType :ctype,
										 	   	              	        	    SID:SID,
										 	   	              	        	    TID:$(".Model_Save").attr("tid")
										 	   	              	        	  },	     
										 	   	              	        success:function(data){				 	   	              	        	     
										 	   	              	        	     if(!data)return alert('操作失败！');
										 	   	              	        	     $(data).appendTo(".Model_EditBox");
										 	   	              	        	  }                       	
							                            	    });
                                          }                       
//********初始化编辑模板**********//
function Model_InitElementDialog(Etype,obj){
	                                    if($(".Element_Config").length)
	                                    $(".Element_Config").remove();	                                    
	                                    var html = '<div style="outline=0;" class="Element_Config"></div>';									 	   	              
									 	   	              var data = {},TID=$(".Model_Save").attr("tid");
					                            data['TID'] = TID;									 	   	              
									 	   	              if(Etype!="UserCom")
									 	   	              {						
									 	   	               data['dowhat'] = 'addNewElement';
									 	   	               var editor_obj = $(html).appendTo(".Model_EditBox");
									 	   	               $(editor_obj).html('<div style="text-align:center;margin-top:30px;"><img src="/resource/fundIDS/loading/loading14-45.gif"></div>');
									 	   	               $(editor_obj).data("NewCom",1);
									 	   	               data['EType'] = $(obj).attr("comID");
									 	   	               data['SID'] = $(".Model_Element:last").length&&$(".Model_Element:last").attr("SID")? parseInt($(".Model_Element:last").attr("SID"))+1:1;									 	   	              
									 	   	              }
									 	   	              else
									 	   	              {										 	   	              
										 	   	               data['EID'] = obj.attr('eid');										 	   	               
										 	   	               data['dowhat'] = 'editElement';
										 	   	               data['CType'] = obj.attr('ctype');
										 	   	               data['SID'] = obj.parents('.Model_Element').attr('SID');										 	   	              
					 	   	         	               obj.parents('.Model_Element').after(html);
					 	   	         	               var editor_obj = $(".Element_Config");
					 	   	         	               $(editor_obj).html('<div style="text-align:center;margin-top:30px;"><img src="/resource/fundIDS/loading/loading14-45.gif"></div>');
										 	   	               $(editor_obj).data("EID",data['EID']);
									 	   	              }
									 	   	              $.ajax({
									 	   	              	       url:'/fundids/ajax/Model_ajax.tsl',
									 	   	              	       type:'post',									 	   	              	      
									 	   	              	       data:data,
									 	   	              	       success:function(data){									 	   	              	             
											 	   	              	             if(!data)
											 	   	              	             {
												 	   	              	             $(editor_obj).remove();
												 	   	              	             return alert('操作失败！');
											 	   	              	             }									 	   	              	             
						 	   	        	       	                     var arr = data.split('●ω●');
						 	   	        	       	                     if(arr[1])
						 	   	        	       	                     {
							 	   	        	       	                     $(editor_obj).attr('tabindex',0).attr('hidefocus',true);				 	   	        	       	                   
							 	   	        	       	                     $(editor_obj).html(arr[1]);					 	   	        	       	                    			 	   	        	       	                     
						 	   	        	       	                     }						 	   	        	       	                    
									 	   	              	       },
									 	   	              	       complete:function(){
									 	   	              	       	        $(".tags").buttonset();						 	   	              	              	     	
									 	   	              	      },
									 	   	              	       error:function(){
																	                              	return false;
																	                             }
									 	   	              	    });	      
																				    return false;   	                      	                                      	
																		 }
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
//***********添加元素***********//
function Model_AddContent(pos,obj){                             
	Model_addElements(pos);                              
}
/************元素选择对话框***********/
function Model_addElements(pos){  
  if(!$(".Model_AddElement_div").length)
  {
   var html1 = '<div class="Model_AddElement_div"  title="添加元素"><div class="Model_AddElement_data_div"></div><input type="button" class="Model_btn_next" value="下一步" /><input type="button" class="Model_btn_cancel"value="取消" /></div>';      
   $(html1).appendTo(document.body).dialog({
			          autoOpen: false,
			          height: 500,
			          width:600,
			          draggable: true,
			          //closeOnEscape: false,
			          modal: true
			  });
  }    
  if(!$(".Model_AddElement_next").length)
  {
    var html2 = '<div class="Model_AddElement_next"  title="添加元素"><div class="Model_AddElement_data_next"><ul class="Model_add_ul"></ul></div><input type="button" class="Model_btn_finish" value="完成" /><input type="button" class="Model_btn_cancel" value="取消" /><input type="button" class="Model_btn_back"   value="上一步" /></div>';
    $(html2).appendTo(document.body).dialog({
			          autoOpen: false,
			          height: 500,
			          width:600,
			           //closeOnEscape: false,
			          draggable: true,
			          modal: true
			     			}).find(".Model_btn_finish").data("pos",pos);  
    $(".Model_add_ul").sortable();
  }
  $.ajax({
  	      url:'/fundids/ajax/Model_ajax.tsl',
 	        type:'post',
 	        data:{
 	        	     dowhat:'loadElements'
 	        	  },
  	      success:function(data){
  	      	    if(!data)return alert('操作失败！');
  	      	    $(".Model_AddElement_data_div").html(data);
  	      	    $(".Model_AddElement_div").dialog("open" );           
  	      	}
  	   });
}

function Model_DeleteContent(obj){                                   
                                   var Ctype = $(".sys_homeedit_choose").attr("ctype");
                                    var serialID = obj.attr('sid');
                                   if(serialID)                                                                      
                                   {                                     
                                     var serialID = obj.attr('SID');
                                     var TID = $(".Model_Save").attr("tid");                                                                      
                                     $(".Model_LeftBox_TitleList .Model_Relocate[sid='"+serialID+"']").parents("li").remove();                                    
                                     $.ajax({
                                     	       url:'/fundids/ajax/Model_ajax.tsl',
 	                                           type:'post',
 	                                           data:{
 	                                           	     dowhat:'deleteContent',
 	                                           	     CType:Ctype, 	                                           	     
 	                                           	     TID:TID,
 	                                           	     SID:serialID
 	                                           	    },
 	                                           success:function(data){ 	                                             
 	                                             if(data)
 	                                             { 	                                               
 	                                               obj.nextAll(".Model_Element").each(function(){
 	                                            	 var sid = $(this).attr("sid"); 	                                             	
 	                                             	 if(!sid)return;
 	                                             	 sid = parseInt(sid);
 	                                             	 $(this).attr("sid",--sid);
 	                                              });
 	                                              obj.remove();
 	                                             } 	                                             
 	                                           }
                                     	     });
                                   }                                   
                                 }

function Model_ClearContent(obj){	                                
	                                var html = '<div class="Model_Element"><div class="sys_containerstyle chooseCOM"  ctype=""><div style="text-align:left;" class="sys_c_title_3"><span class="sys_edit_des edite_des" >[未定义]</span></div></div></div>';	                                
	                                var EID = obj.find(".chooseCOM").attr('EID');	                                
	                                if(EID!='undefined'&&EID)
	                                {
	                                 var serialID = $(".sys_homeedit_choose").attr('SID');
	                                 obj.nextAll(".Model_Element").each(function(){
                                     	                              var sid = $(this).find(".chooseCOM").attr('SID');
                                     	                              sid = parseInt(sid)-1;
                                     	                              $(this).find(".chooseCOM").attr('SID',sid);
                                     	                            });          
	                                }	                                
	                                obj.replaceWith(html);
	                              }                                 
	                          
function Model_Editor_Move(obj,op){
	                                 var EID = $(".sys_homeedit_choose").attr("EID");	                                 
	                                 var serialID = parseInt($(".sys_homeedit_choose").attr("SID"));	                                 
	                                 if(op==1&&serialID)
	                                 {  	                                
  	                                var prevObj = obj.prev(".Model_Element");
  	                                if(!prevObj.length)return;
  	                                var preEID = obj.prev(".Model_Element").find(".chooseCOM").attr('EID');  	                                
  	                                if(EID!='undefined'&&EID&&preEID!='undefined'&&preEID)
  	                                {  	                                   	                                   	                                 
  	                                   obj.prev(".Model_Element").find(".chooseCOM").attr("SID",serialID);  	                                   
  	                                   obj.find(".chooseCOM").attr("SID",serialID-1);
  	                                   obj.after(obj.prev(".Model_Element"));  	                                 
  	                                } 
  	                                else
  	                                {
  	                                 obj.after(obj.prev(".Model_Element")); 	                                
  	                                }
  	                               }
  	                               else if(op==0&&serialID)
  	                               { 
  	                                if(!obj.next(".Model_Element").length)return;
  	                                var nextEID = parseInt(obj.next(".Model_Element").find(".chooseCOM").attr('EID'));                       
  	                                if(EID!='undefined'&&EID&&nextEID!='undefined'&&nextEID)
  	                                {  	                                   	                                 
  	                                   obj.find(".chooseCOM").attr("SID",serialID+1);
  	                                   obj.next(".Model_Element").find(".chooseCOM").attr("SID",serialID);
  	                                   obj.before(obj.next(".Model_Element"));	  	                                 
  	                                } 
  	                                 else
	  	                               {
	  	                                 obj.before(obj.next(".Model_Element"));	
	  	                               } 	                                                                	                       
	                                 }
	                                }
//******图设置调用js函数*****//
//chartY_mgr(obj,flag) 用于增加Y轴系统时“更多”的处理
$(function(){
						$('body').on("change",'select[chartproperty="axisSelect"]',function(){
								      var sub_obj = $(this).parents(".tsFormContentContainer");
								      var axisStr='左轴';
								      switch($(this).val()){
								      	case '0':
								      		axisStr='左轴';
								      		break;
								      	case '1':
								      		axisStr='右轴';
								      		break;
								      	case '2':
								      		axisStr='第三轴';
								      		break;
								      	case '3':
								      		axisStr='第四轴';
								      		break;
								      }
								      $(':input[chartproperty="chartAxis"]',sub_obj).each(function(idx,obj){
								      	var a= $(this).attr("property");
								      	var t= a.substring(8,10);
								      	a= a.replace(t,axisStr);
								      	$(this).attr("property",a);
								      })
						});
});
function chartY_mgr(obj,flag)
{
	var trL= $(obj).parents("tbody:first").find("tr").length;
	if(0==flag){//删除		
		if(trL<=2) return alert("必须有Y轴存在！");
		$(obj).parents("tr:first").remove();		
	}
	if(1==flag){//增加
			var _tr = $(obj).parents("tbody:first").find("tr:last") ;
			var oneRowObj= $(_tr).clone() ,
			    _more_obj = $(_tr).find(".itemMore") ,
			    _newSub_id = $(_more_obj).attr("id") +"_"+$(obj).parent("table").find("tr").length ,
			    _new_more_obj = $(".itemMore",oneRowObj) ;      
      $(_new_more_obj).attr("id",_newSub_id) ;
			
		 $(oneRowObj).find(":input[type!=button]").each(function(index,obj){
					var a= $(this).attr("property");
					var proArr= a.split(':');
					var newPro='';
					for(var j=0;j<proArr.length;j++){
						if(j==(proArr.length-2)) proArr[j]= parseInt(proArr[j])+1;//trL-1;
						newPro+=(newPro==''?"":":")+proArr[j];
					}
					$(this).attr("property",newPro);						
				});
			var subForm_conf = $(_more_obj).data("itemConf");
      var subContent= subForm_conf['content'];
      for(var i=0;i<subContent.length;i++){
      		var subCon2= subContent[i];
      		for(var j=0;j<subCon2.length;j++){
      			if(!(subCon2[j]['attr']['property']||false)) continue;
      			var a= 	subCon2[j]['attr']['property'];
      			var proArr= a.split(':');
      			if(proArr[1]=="Y轴")continue;
						var newPro='';
						for(var k=0;k<proArr.length;k++){
							if(k==proArr.length-2) proArr[k]= parseInt(proArr[k])+1;//trL-1;
							newPro+=(newPro==''?"":":")+proArr[k];
						}
						subContent[i][j]['attr']['property']= newPro;
      		}
      }           
      subForm_conf['content'] = subContent;
      
      var new_subForm_conf = subForm_conf ;
      $(_new_more_obj).data({"ifShow":false,"itemConf":new_subForm_conf}) ;
      
      $(oneRowObj).find(":input").not('input[type="button"]').val("");      
			$(obj).parents("tbody:first").append(oneRowObj) ;
			$(_new_more_obj).tsForm("showSubForm",{"data":new_subForm_conf}) ;
			$(_new_more_obj).removeData("ifShow").removeClass("ui-state-highlight") ;
	}
	//表单设置删除
	if(3==flag){
		var _td = $(obj).parents("tbody:first").find("tr:last").prev().find('td:first').find('input');
		//var inputTxt=;
		//alert(inputTxt);
				if (_td.val()=='删 除'){
					$(obj).parents("tr:first").remove();
				}else{
					return alert('必须保留一个');
				}
		}
	//表单设置增加
	if(2==flag){var _tr = $(obj).parents("tbody:first").find("tr:last") ;
			var oneRowObj= $(_tr).clone() ;
			$(oneRowObj).find(":input[type!=button]").each(function(index,obj){						
							var a= $(this).attr("property");
							var proArr= a.split(':');
							var newPro='';
							
							for(var j=0;j<proArr.length;j++){
								if(j==(proArr.length-2)) proArr[j]= parseInt(proArr[j])+1;//trL-1;
								newPro+=(newPro==''?"":":")+proArr[j];
							}
							$(this).attr("property",newPro);						
				});
			if($(_tr).find(".itemMore").length){
				 _more_obj = $(_tr).find(".itemMore") ,
			   _newSub_id = $(_more_obj).attr("id") +"_"+$(obj).parent("table").find("tr").length ,
			   _new_more_obj = $(".itemMore",oneRowObj) ;      
     		 $(_new_more_obj).attr("id",_newSub_id) ;
				 var subForm_conf = $(_more_obj).data("itemConf");				 				 
				 var subContent= subForm_conf['content'] ;//subForm_conf['content']['Content']
      for(var i=0;i<subContent.length;i++){
      		var subCon2= subContent[i];
      		for(var j=0;j<subCon2.length;j++){
      			if(!(subCon2[j]['attr']||false)) continue;
      			if(!(subCon2[j]['attr']['property']||false)) continue;
      			var a= 	subCon2[j]['attr']['property'];
      			var proArr= a.split(':');
						var newPro='';
						for(var k=0;k<proArr.length;k++){
							if(k==proArr.length-2) proArr[k]= parseInt(proArr[k])+1;//trL-1;
							newPro+=(newPro==''?"":":")+proArr[k];
						}
						subContent[i][j]['attr']['property']= newPro;
      		}
      };      
      subForm_conf['content']= subContent;
      var new_subForm_conf = subForm_conf ;
      $(_new_more_obj).data({"ifShow":false,"itemConf":new_subForm_conf});      
			$(_new_more_obj).tsForm("showSubForm",{"data":new_subForm_conf});
			$(_new_more_obj).removeData("ifShow").removeClass("ui-state-highlight");						
			}
			$(oneRowObj).find(":input")
									.not('input[type="button"]')
									.not('input[type="hidden"]')
									.val(""); 
			$(obj).parents("tbody:first").append(oneRowObj) ;
		}
}

//---------------begin---------模板管理：button zhangwei@tinysoft.com.cn
$().ready(function(){
	$(".modelMgrTable tr").live({
		"mouseenter":function(){
			var fstr= '<span class="button_span"><button onclick="return model_mgr(this,1);">打开</button><button onclick="return model_mgr(this,2);">数据</button><button onclick="return model_mgr(this,3);">报告</button><button onclick="return model_mgr(this,4);">';
			var flag= parseInt($(this).attr("status"));
			if(flag==1) 	fstr+='<span style="color:rgb(204, 17, 17);">禁用</span></button></span>';
			else 				fstr+='启用</button></span>';
			$(".button_span").remove();
			$(this).find("td").last().append(fstr);
		},
		"mouseleaver":function(){
			$(".button_span").remove();
		}
	})	
})
function model_mgr(obj,flag)
{
	var tid= $(obj).parents("tr:eq(0)").attr("tid");
	var statusFlag= parseInt($(obj).parents("tr:eq(0)").attr("status"));
	if(flag==4){
			if(statusFlag==1&&!confirm("确定禁用当前模板？")) return false;
			$.ajax({
					url:'/fundids/ajax/Model_ajax.tsl',
					type:'post',			     	 	    	
					data:{
					      dowhat:"modelStatus",
					      flag:statusFlag,
					      tid:tid
					    },
					success:function(data){
					      if(data=='0')return alert("更改失败,请与管理员联系！");
					      if(statusFlag==1){
					      		$(obj).parents("tr:eq(0)").attr("status",0);
					      		alert("禁用成功");
					      		$(obj).text("启用");
					      		return false;
					      	}
					      if(statusFlag==0){
					      		$(obj).parents("tr:eq(0)").attr("status",1);
					      		alert("启用成功");
					      		$(obj).text("禁用");
					      		return false;
					      }
					}
			}); 
	}
	if(flag==1)	return window.open("/fundids/index.tsl?type=model&tid="+tid);
	if(flag==2)	{
		return alert("doing……");
		return window.open("/fundids/index.tsl?type=TData&tid="+tid);
	}
	if(flag==3)	{
		return alert("doing……");
		return window.open("/fundids/index.tsl?type=model&tid="+tid);
	}		
	return false;
}
//---------------end---------模板管理：button zhangwei@tinysoft.com.cn