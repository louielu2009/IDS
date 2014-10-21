
$(function(){
	            $(".Manage_TStatus").live("change",function(){Manage_ChangeStatus(this);});	            
	          });

function Manage_ChangeStatus(obj){      	  														   	                   
	  														  var data ={};
	  														  data['dowhat'] = 'changeTStatus';
	  														  if($(obj).find("option:selected").attr("value")==1)
	  														  data['Status'] = 1;
	  														  else
	  														  data['Status'] = 0;	
	  														  data['TID'] = $(obj).attr("TID");	  														  											    	  														  
	                                $.ajax({
	                                	       url:'/fundids/ajax/Manage_ajax.tsl',
	                                	       type:'post',
	                                	       data:data,
	                                	       success:function(data){
	                                	       	                      if(!data)
	                                	       	                      {
	                                	       	                      	$(obj).find("option").each(function(){
	                                	       	                      		  																	if($(obj).attr("selected"))
	                                	       	                      		  																	$(obj).removeAttr("selected");
	                                	       	                      		  																	else
	                                	       	                      		  																	$(obj).attr("selected","true");
	                                	       	                      		                                  });
	                                	       	                      }	                                	       	                        	                                	       	                        
	                                	       	                     }
	                                	     });
	                               }		                               	                                                                             