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
	                          	                              if(!data)return alert('没有相关记录！');
	                          	                              $(".SysLog_SysLogList").html(data);	
	                          	      }
	                          	     });
	                 }

function SysLog_searchDate(){
	                            $(".SysLog_searchDate").datepicker({
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

