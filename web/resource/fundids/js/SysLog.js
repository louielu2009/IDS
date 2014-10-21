$(function(){
	           $(".SysLog_searchDate").live("click",function(){SysLog_searchDate();});
						 $(".SysLog_searchButton").live("click",function(){SysLog_searchLog();});
});

function SysLog_searchLog(){
	                          var data={};
	                          data['dowhat'] = 'searchLog';
	                          data['Date'] = $('.SysLog_searchDate').attr("value");
	                          data['User'] = $('.SysLog_searchUser').attr("value");
	                          $.ajax({
	                          	       url:'/fundids/ajax/SysLog_ajax.tsl',
	                          	       type:'post',
	                          	       data:data,
	                          	       success:function(data){
	                          	                              if(!data)return alert('û����ؼ�¼��');
	                          	                              $(".SysLog_SysLogList").html(data);	
	                          	      }
	                          	     });
	                 }

function SysLog_searchDate(){
	                            $(".SysLog_searchDate").datepicker({
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

