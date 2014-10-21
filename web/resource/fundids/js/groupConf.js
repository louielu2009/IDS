
$(function(){
	            $(".Group_Add").live("click",function(){Group_InitDialog();$(".Group_EditDialog").dialog("option","title","添加").dialog("open");});
	            $(".Group_Edit").live("click",function(){Group_EditDialog(this);});
	            $(".Group_Status").live("change",function(){Group_Status(this);});
	            $(".Group_SearchType").live("change",function(){Group_SearchType(this);});
	            $(".Group_SearchButton").live("click",function(){Group_Search(this);});
	            $(".Group_EditDialog_SelectALL").live("click",function(){Group_SelectList(1);});
	            $(".Group_EditDialog_UnSelectALL").live("click",function(){Group_SelectList(0);});
	          });
function Group_SelectList(flag){
																 if(flag)
																 {
																   $(".Group_EditDialog_UnSelectALL").removeAttr("checked");
																   $(".Group_EditDialog_ModelList table input[type='checkbox']").attr("checked","true");																   
																 }
	                               else
	                               {
	                                 $(".Group_EditDialog_SelectALL").removeAttr("checked");	
	                                 $(".Group_EditDialog_ModelList table input[type='checkbox']").each(function(){
	                                	 if($(this).attr("checked"))
	                                	 $(this).removeAttr("checked");
	                                	 else
	                                	 $(this).attr("checked","true"); 	
	                                 });
	                               }
	                            }
	          
function Group_Search(obj){                           
                           var data={};
                           data['dowhat'] = 'searchGroup';
                           data['Type'] = $('.Group_SearchType').find("option:selected").attr("value");	
                           data['SearchStr'] = $(".Group_SearchStr").attr("value");
                           $.ajax({
                           	       url:'/fundids/ajax/Group_ajax.tsl',
                           	       type:'post',
                           	       data:data,
                           	       success:function(data){
                           	       	                       if(data)
                           	       	                       $(".Group_GroupList").html(data);
                           	       	                       else
                           	       	                       $(".Group_GroupList").html('');
                           	       	                     }
                           	     });
	                        }
function Group_SearchType(obj){
												if($(obj).find("option:selected").attr("value")=="CDate")	
												{
													$(".Group_SearchStr").attr("readonly","true");
													$(".Group_SearchStr").datepicker({
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
																					    									beforeShow: function() {
																					                            					setTimeout(function(){$('.ui-datepicker').css('z-index', 99999);}, 0);
																					                       				 }
																					    			   	   });
												}
												else
												{
													$(".Group_SearchStr").replaceWith('<input type="text" class="Group_SearchStr" />');
												}
	                     }

function Group_InitDialog(){	                           
	                           $(".Group_EditDialog").dialog({
	                              		                              hide:true, //点击关闭是隐藏,如果不加这项,关闭弹窗后再点就会出错. 
																																	autoOpen:false, 
																																	height:400, 
																																	width:350, 
																																	modal:true, //蒙层（弹出会影响页面大小） 
																																	title:'编辑', 
																																	overlay: {opacity: 0.5, background: "black" ,overflow:'auto'}, 
																																	buttons:{ 
																																	'确定':function(){ 									
											                              		                            var data={};
											                              		                            data['dowhat']='GroupManage';											                              		                          
											                              		                            data['GName']= $(".Group_EditDialog_GName").attr("value");
											                              		                            data['GroupID'] = $(".Group_EditDialog_Group").attr("value");
											                              		                            data['ModelList'] ='';
											                              		                            $(".Group_EditDialog_ModelList table input:checked").each(function(){
											                              		                            	                                                             data['ModelList'] = (data['ModelList']?';':'')+$(this).attr("value");											                              		                            	                                                            
											                              		                            	                                                           });
											                              		                            $.ajax({
											                              		                            	       url:'/fundids/ajax/Group_ajax.tsl',
											                              		                            	       type:'post',
											                              		                            	       data:data,
											                              		                            	       success:function(data){											                              		                            	       	                      
											                              		                            	       	                       if(!data)
											                              		                            	       	                       return alert('保存失败！');
											                              		                            	       	                       else
											                              		                            	       	                       return alert('保存成功！');											                              		                            	       	                       
											                              		                            	       	                     }
											                              		                            	    });
											                              		                           },
											                              		          '取消':function(){
											                              		          	                $(this).dialog("close"); 
											                              		          	                $(".Group_EditDialog_GName").attr("value","");
	                         	       	                                                $(".Group_EditDialog_ModelList").html("");
											                              		          	                $(".Group_EditDialog_Group").removeAttr("value");
											                              		          	               }
											                              		                    }
											                              		          });
	                         }	 

function Group_EditDialog(obj){
	                          Group_InitDialog();
	                          var data ={};
	                          data['dowhat'] = 'EditGroup';
                            data['GroupID'] = $(obj).attr("value");                            
                            $.ajax({
                            	       url:'/fundids/ajax/Group_ajax.tsl',
                            	       type:'post',
                            	       data:data,
                            	       success:function(data){
                            	       	                       if(!data)return alert('没有相关信息！');                            	       	                       
                            	       	                       var r = JSON.parse(data);                            	       	                       
                            	       	                       $(".Group_EditDialog_GName").attr("value",r["GName"]);
                            	       	                       $(".Group_EditDialog_ModelList").html(r["ModelList"]);
                            	       	                       $(".Group_EditDialog_Group").attr("value",$(obj).attr("value"));
                            	       	                       $(".Group_EditDialog").dialog("option","title", "编辑").dialog("open");
                            	       	                      }
                            	     });
}

function Group_Status(obj){
	    											var data={};
	    											data["dowhat"] = "changeStatus";
														data["GroupID"] = $(obj).attr("value");
														data["Status"] = $(obj).find("option:selected").attr("value");
														$.ajax({
															       url:'/fundids/ajax/Group_ajax.tsl',
															       type:'post',														
															       data:data,
															       success:function(data){
															       												 if(!data)
															       												 {
															       												 	 $(obj).find("option").each(function(){
															       												 	 									                      if($(this).attr("selected"))
															       												 	 									                      $(this).removeAttr("selected");
															       												 	 									                      else
															       												 	 									                      $(this).attr("selected","true");    
															       												 	 	                                    });
															       												 	 return alert("操作失败！");
															       												  }
															       	                     }
															     });
	                       }
	                       	                         	                                 