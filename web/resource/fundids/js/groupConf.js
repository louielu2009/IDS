
$(function(){
	            $(".Group_Add").live("click",function(){Group_InitDialog();$(".Group_EditDialog").dialog("option","title","���").dialog("open");});
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
	                              		                              hide:true, //����ر�������,�����������,�رյ������ٵ�ͻ����. 
																																	autoOpen:false, 
																																	height:400, 
																																	width:350, 
																																	modal:true, //�ɲ㣨������Ӱ��ҳ���С�� 
																																	title:'�༭', 
																																	overlay: {opacity: 0.5, background: "black" ,overflow:'auto'}, 
																																	buttons:{ 
																																	'ȷ��':function(){ 									
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
											                              		                            	       	                       return alert('����ʧ�ܣ�');
											                              		                            	       	                       else
											                              		                            	       	                       return alert('����ɹ���');											                              		                            	       	                       
											                              		                            	       	                     }
											                              		                            	    });
											                              		                           },
											                              		          'ȡ��':function(){
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
                            	       	                       if(!data)return alert('û�������Ϣ��');                            	       	                       
                            	       	                       var r = JSON.parse(data);                            	       	                       
                            	       	                       $(".Group_EditDialog_GName").attr("value",r["GName"]);
                            	       	                       $(".Group_EditDialog_ModelList").html(r["ModelList"]);
                            	       	                       $(".Group_EditDialog_Group").attr("value",$(obj).attr("value"));
                            	       	                       $(".Group_EditDialog").dialog("option","title", "�༭").dialog("open");
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
															       												 	 return alert("����ʧ�ܣ�");
															       												  }
															       	                     }
															     });
	                       }
	                       	                         	                                 