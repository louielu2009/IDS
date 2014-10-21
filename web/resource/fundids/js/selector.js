;(function($){
	$.extend($.fn,{
		SelectorItem : function(options){		//options = {'inputC','','dataUrl':''}
			var opt = options || {},
				 _selector = this.selector,
				 input_obj = $(this),//options.inputC,
				 dataUrl = options.dataUrl || '/website/security/Selectorajax.tsl',
				 autoDisplay = options.autoDisplay;
			var button_obj = $(this).next('button'),
				 button_flag = 1;
			if (!button_obj.length) {
				button_obj = $(this);
				button_flag = 0;
			}
			$.ajax({
				type : 'post',
				url : dataUrl,
				dataType : 'json',
				success : function(data){
					$(button_obj).data('_data',data);
					$(button_obj).attr('disabled',false);					
					$(input_obj).removeClass("inputloading").attr('readonly',true);//.css('cursor','auto !important');					
					if (autoDisplay)
						$(button_obj).trigger('click');				  
				},
				beforeSend : function(){
					$(button_obj).attr('disabled',true);
					$(input_obj).addClass("inputloading");
				}
			})
			
			$(button_obj).bind('click',function(e){
				e.preventDefault();
				$(window).SelectorLay();
				if (button_flag) {
					input_obj = $(this).prev(input_obj);	
				}
				else {
					input_obj =  $(this);
				}
				//$('div.selectordiv:not('+_selector+')').hide();
				var active_obj = $(this).data('active_obj'),		//是否存在活动对象
					_selected_data = $.trim($(input_obj).val());

				var _top = $(input_obj).offset().top + $(input_obj).height() + 8 ,
				    _left = $(input_obj).offset().left;
				if (($(window).width()-_left) < $('div.selectordiv').width())
					_left = $(window).width() - $('div.selectordiv').width() - 4;
				
				if (active_obj){
					if ($(active_obj).is(":visible")){
						$(active_obj).hide() ;               	  	    	  	  	
					}else{
						//$(active_obj).show().css({"top":_top,"left":_left}) ;
						$(active_obj).show().position({my:"center",at:"center",of:window})
					} ;
					return ;
				} ;
				
				var _data = $(button_obj).data('_data'),
					 html = '';
				if (!$.isArray(_data[0].value)){
					var mSel = false,colSpan = 3,selectLevel = 1;
				} else {
					var mSel = true,colSpan = 4,selectLevel = 2;
				}
				$(button_obj).data('mSel',mSel);
				
				html += '<tr><td><select multiple="multiple" class="sel-select1" style="width:200px;height:330px;"></select></td>';
				if (mSel) {
					html += '<td><select multiple="multiple" class="sel-select2"></select></td>';
				}

				html += '<td class="opButton"><button class="addSelected">添加选中&gt;</button><br><button class="addAll">添加全部&gt;&gt;</button><br><button class="removeSelected">移除选中&lt;</button><br><button class="removeAll">移除全部&lt;&lt;</button><br></td>';
				html += '<td><select multiple="multiple" class="sel-selected"></select></td></tr>';
				html += '<tr><td colspan="'+colSpan+'" style="text-align:center;"><button class="selectorSubmit">确定</button><button class="selectorClose">关闭</button></td></tr>' ;
				
				if (selectLevel == 1){
					html = '<table><tr class="filter"><td><input class="selectFilter"></td><td></td><td></td></tr>'+html+'</table>' ;
				}else if (selectLevel == 2){
				   html = '<table><tr class="filter"><td></td><td><input class="selectFilter"></td><td></td><td></td></tr>' + html + '</table>' ;
				};
				
				var _s_html = '<div class="selectordiv ui-widget-content '+_selector+'"></div>';
				//var active_obj = $(_s_html).appendTo('body').css({'top':_top,'left':_left,'display':'block'}).draggable().html(html);
				var active_obj = $(_s_html).appendTo('body').css({'display':'block'}).draggable().html(html).position({my:"center",at:"center",of:window});
				$(this).data('active_obj',active_obj);
				
				$(active_obj).SelectorEvent({'inputC':input_obj,'selectLevel':selectLevel,'mSel':mSel});
				$('select.sel-select1',active_obj).SelectorDataInit({'data':_data,'mSel':mSel,'inputC':input_obj});
			});
		},
		SelectorDataInit : function(options){
			var opt = options || {},
				 _data = options.data,
				 input_obj = options.inputC,
				 _selected_data = $(input_obj).data('sel-data'),
				 _sel_obj = $(this);
			
			var html = '',_sel_html = '';
			for(var i=0;i<_data.length;i++){
				var _label = _data[i].label,
					 _value = _data[i].value,
					 _PY = _data[i].PY;
				
				if ($.inArray(_value,_selected_data)==-1) {		//去除已选中数据
					if (!options.mSel) {
						html += '<option value="'+_value+'" PY="'+_PY+'">'+_label+'</option>';
					}
					else {
						html += '<option>'+_label+'</option>';
					}
				}
			}
			$(_sel_obj).html(html);
			
			//三级数据
			if (options.mSel) {
        	  $("option",_sel_obj).each(function(indx){
        	      var _sub_data = _data[indx].value ;
        	      $(this).data("source",_sub_data) ;
        	  }) ;
			}
			_fildata = $('option',_sel_obj).map(function(){	return [[$(this).val(),$(this).text(),$(this).attr('PY')]];	}).get();
			$('input.selectFilter').data('source',_fildata);
			return false;
		},
		SelectorLoadData : function(options){
			var opt = options || {},
				 _data = options.data,
				 _selected_data = options.selecteddata ;
				 _this = $(this);
			var html = '';
			for (var i=0;i<_selected_data.length;i++){
				
			}
		},
		SelectorEvent : function(options){
			var opt = options || {},
				_selected_data = options.selecteddata,
				 input_obj = options.inputC,
				 selLev = options.selectLevel,
				 _sel_obj = $(this),
				 _select_obj,_selected_obj;
				 
			if (selLev == 2){
				_select_obj = $('select.sel-select2',_sel_obj);	
				_selectS_obj = $('select.sel-select1',_sel_obj);
			}
			else {
				_select_obj = $('select.sel-select1',_sel_obj);	
			}
			_selected_obj = $('select.sel-selected',_sel_obj) ;
			
			if (selLev==1){
			}
			else if (selLev==2){
				$(_selectS_obj).change(function(){
					$('input.selectFilter').val('');
					_data = $(":selected",this).data("source") ;
					_select_obj.SelectorDataInit({'data':_data,'mSel':false,'inputC':input_obj});
				})
			}
			$(_select_obj).bind('dblclick',function(){
				$(".addSelected").trigger('click');
			})
			$(_selected_obj).bind('dblclick',function(){
				$(".removeSelected").trigger('click');
			})
			//添加选中
			$(".addSelected",_sel_obj).bind('click',function(){
	   	   var hadOption = $("option",_selected_obj).map(function(){
	   	       return $(this).val() ;
	   	   }).get() ;

      	   $(":selected",_select_obj).clone().each(function(){
      	   	  if ($.inArray($(this).val(),hadOption) == -1){
      	   	  	  $(this).appendTo(_selected_obj) ;
      	   	  } ;
      	   })
				$(':selected',_select_obj).remove();
			}) ;
			
			//添加所有
			$(".addAll",_sel_obj).bind('click',function(){
	   	   var hadOption = $("option",_selected_obj,_sel_obj).map(function(){
	   	       return $(this).val() ;
	   	   }).get() ;

      	   $("option",_select_obj,_sel_obj).clone().each(function(){
      	   	  if ($.inArray($(this).val(),hadOption) == -1){
      	   	  	  $(this).appendTo(_selected_obj) ;
      	   	  } ;
      	   })
				$("option",_select_obj).remove();
			}) ;
			
			//移除选中
			$(".removeSelected",_sel_obj).bind('click',function(){
				var hadOption = $("option",_select_obj,_sel_obj).map(function(){
	   	       return $(this).val() ;
	   	   }).get() ;

      	   $(":selected",_selected_obj,_sel_obj).clone().each(function(){
      	   	  if ($.inArray($(this).val(),hadOption) == -1){
      	   	  	  $(this).appendTo(_select_obj) ;
      	   	  } ;
      	   })
				$(':selected',_selected_obj).remove();
			}) ;
			
			//移除所有
			$(".removeAll",_sel_obj).bind('click',function(){
	   	   var hadOption = $("option",_select_obj).map(function(){
	   	       return $(this).val() ;
	   	   }).get() ;

      	   $("option",_selected_obj).clone().each(function(){
      	   	  if ($.inArray($(this).val(),hadOption) == -1){
      	   	  	  $(this).appendTo(_select_obj) ;
      	   	  } ;
      	   })
				$("option",_selected_obj).remove();
			}) ;
			// autocomplete
			$("input.selectFilter").bind('keyup',function(){
				var list = $('input.selectFilter').data('source');

				var _in = $.trim($(this).val());
				$(_select_obj).empty();
				for (var i=0;i<list.length;i++){
					var oneRow = list[i];
					for (var j=0;j<oneRow.length;j++){
		            if(j>=oneRow.length-1&&(oneRow[j].indexOf(" "))>0){	//在PY字段中有多音字节
		               var temp= oneRow[j].split(" ");
		               for(var k=0;k<temp.length;k++)
		               {
								if(temp[k].substr(0,_in.length).toLowerCase() == _in.toLowerCase()){
									$(_select_obj).append("<option value='"+oneRow[0]+"' PY='"+oneRow[2]+"'>"+oneRow[1]+"</option>");
									break;
								}
		               }
		            }
						else {
							if (oneRow[j].substr(0,_in.length).toLowerCase() == _in.toLowerCase()) {
								$(_select_obj).append("<option value='"+oneRow[0]+"' PY='"+oneRow[2]+"'>"+oneRow[1]+"</option>");
								break;
							}
						}
					}
				}
			});
			//键盘响应
			$(document).bind('keyup',function(e){
				if (e.keyCode == 13){	//回车
					$(".addAll",_sel_obj).trigger('click');
				}
				else if (e.keyCode == 27) {	//ESC
					$('div.selectordiv').hide();
					$('.selectorlay').remove();
				}
			})
			//确定
			$('.selectorSubmit',_sel_obj).bind('click',function(){
				var list = $('option',_selected_obj).map(function(){
						return $(this).val();
					}).get();
				$(input_obj).val(list.join(';'));
				$(_sel_obj).hide();
				
				_list_html = _selected_obj.html();
				$(input_obj).data({'sel-data':list,'sel-html':_list_html});
				
				$('.selectorlay').remove();
			})
			
			//关闭
			$('.selectorClose',_sel_obj).bind('click',function(){
				$(_sel_obj).hide();
				$('.selectorlay').remove();
			})
		},
		SelectorLay : function(options){
			var layhtml = '<div class="selectorlay"></div>';
			$(layhtml).appendTo('body');
		}
	});
})(jQuery);
