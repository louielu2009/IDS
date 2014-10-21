(function($){
	   $.iModel = {} ;
		 $.extend($.iModel,{
		                   getAccessor:function(obj,expr){
		                          if (typeof expr === 'function') return expr(obj) ;
		                          return obj[expr] ;
		                   },
		                   extend:function(methods){
		                   	      $.extend($.fn.model,methods) ;
		                   }
		 });

		 $.fn.model = function(pin){
		 	     if (typeof pin === 'string'){
		 	     	   var fn = $.iModel.getAccessor($.fn.model,pin) ;
		 	     	   var args = $.makeArray(arguments).slice(1) ;
		 	     	   return fn.apply(this,args) ;
		 	     }
		 };

		 $.iModel.extend({
		 	     "itemEditToolBar":function(options){
		 	     },
		 	     "floatEditorBar":function(options,options2){		 	     	         
		 	     	         var opt = options || {} ,
		 	     	             bar_conf = opt.conf || {} ;
		 	     	         var opt2 = options2 ||{};
		 	     	         
					 	     	   var bar_obj = $(".dotWebFloatEditorBar");
					 	     	   if(bar_obj.length)
					 	     	   {
					 	     	    bar_obj.addClass('actived');
					 	     	    return bar_obj;
					 	     	   }
					 	     	   //工具栏
					 	     	   var html = '<div class="ui-widget ui-widget-content ui-corner-all dotWebFloatEditorBar">' ;					 	     	   
					 	     	   html+='<div style="white-space:nowrap;">';
					 	     	   for (var i=0;i<bar_conf.length;i++){
					 	     	   	   var _title = bar_conf[i].title || "" ,_icon = bar_conf[i].icon || "" ;
					 	     	   	   html += '<span class="ui-corner-all ui-widget-header dotWebToolBarButton"><span title="'+_title+'" class="ui-icon '+_icon+'"></span></span>' ;
					 	     	   } ;
					 	     	   html += '</div>' ;
					 	     	   var bar_obj = $(html).appendTo("body") ;
					 	     	   //鼠标高亮按钮
		 	     	         $(bar_obj).on({"mouseover":function(){
		 	     	       　　　　　            $(this).addClass("ui-state-hover") ;
		 	     	   	                       },
		 	     	                        "mouseout":function(){
		 	     	               	             $(this).removeClass("ui-state-hover") ;
		 	     	                           }
		 	     	         },".dotWebToolBarButton") ;

					 	     	   return bar_obj ;
		 	     },
		 	     "leftFloatToolBar":function(options){
		 	     }
		 }) ;
})(jQuery);