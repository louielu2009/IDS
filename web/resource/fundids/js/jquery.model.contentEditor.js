$.iModel.extend({
		 	     "loadFloatEditorBar":function(options){
		 	     	  var _obj = $(this) ;
		 	     	  var _opt= options ||{},
		 	     	  	  _op = options.op||0,
		 	     	  	  _com_info= options.info||'';

		 	     	  var op1 ={"icon":"ui-icon-pencil","title":"修改"};
		 	     	  var op2 ={"icon":"ui-icon-plus Model_Element_Add","title":"添加"};
		 	     	  var op3 = {"icon":"ui-icon-circle-close","title":"删除"};
		 	     	  var op4 ={};//{"icon":"dotweb-upadd Model_Element_AddAbove","title":"向上添加"};
		 	     	  var op5 ={"icon":"dotweb-downadd Model_Element_AddBelow","title":"向下添加"};
		 	     	  var op6 ={"icon":"ui-icon-trash","title":"清空内容"};
              $(".dotWebFloatEditorBar").hide() ;
              $(".Element_EType").hide();
              var bar_conf = [op1,op3];
              var bar_conf2= [];
              //修改
              if(1==_op) {bar_conf = [op1,op5,op3];}
              //if(2==_op) {bar_conf = [op2,op5,op3];}              
              //if(3==_op) {bar_conf = [op1,op5,op3];}
              if(2==_op) {bar_conf = [op5,op3];}
              if(3==_op) {bar_conf = [op5,op3];}
              if(4==_op) {bar_conf = [op1,op5,op3];}
              if(5==_op) {bar_conf = [op2,op6];}
              if(6==_op) {bar_conf = [op1,op6];}
              var bar_obj = $.fn.model("floatEditorBar",{"conf":bar_conf})
              if(!$(bar_obj).hasClass("actived"))
              bar_obj.model("contentEditorBarButtonEvent");

              var p = $(_obj).offset() ,
                  _left = p.left + $(_obj).width() - $(bar_obj).width()-2 ,
                  _top  = p.top+2 ;

              $(bar_obj).css({"top":_top,"left":_left}).show() ;
              return bar_obj ;
		 	     },
		 	     "contentEditorBarButtonEvent":function(){		 	     	   
		 	     	   var bar_obj = $(this) ;
		 	     	   var EID=$(".sys_homeedit_choose").attr("EID");
               
		 	     	   //按钮-编辑
		 	     	   $(this).on("click",".ui-icon-pencil",function(){		 	     	   	    
		 	     	   	     var editor_obj = $(".dotWebDataGridEditor:visible") ;
		 	     	   	     if ($(editor_obj).length){
		 	     	   	         $(editor_obj).remove();
		 	     	   	         return false;
		 	     	   	     };
                     $(this).parents(".dotWebFloatEditorBar").hide();
                     //$(".Element_Config").remove();
                     Model_InitElementDialog('UserCom',$(".sys_homeedit_choose"));
                     return false;;
		 	    }) ;               
               $(this).on("click",".ui-icon-plus",function(){
               			$(".topToolButtonList").find("a[serial='topMainButton_0']").toggleClass("activeTopBarTab");
               			$('div[action="pageComPanel"]').toggle();
               			$('div[action="pageComPanel"]').model("pageComPanel");
               }) ;
                //var funcHtml='<div class="more_Button" style="display:none;text-align:right;line-height:20px;"></div>';
		 	     	    //    $(".dotWebFloatEditorBar").append(funcHtml);
		 	     	   //按钮-清空内容
		 	     	   $(this).on("click",".ui-icon-trash",function(){	
		 	     	   				if(confirm("确定清空当前块?"))
		 	     	   				{
		 	     	   					$(".dotWebFloatEditorBar").hide();
		 	     	   					var cur = $('.sys_homeedit_choose').parents(".Model_Element");
		 	     	   					Model_ClearContent(cur);
		 	     	   					//deletecontent(this,1);
		 	     	   					return false;
		 	     	   				}		 	     	        
		 	     	   });
		 	     	   
		 	     	   //按钮-删除内容块		 	     	  
		 	     	   $(this).on("click",".ui-icon-circle-close",function(){		 	     	   	
		 	     	   	    if (confirm("确定删除当前内容块?")){
		 	     	   	    	 $(".dotWebFloatEditorBar").hide() ;
		 	     	   	    	 var cur = $('.sys_homeedit_choose').parents(".Model_Element");
		 	     	   	    	 Model_DeleteContent(cur);	
		 	     	   	    	 return false;	 	     	   	    
		 	     	     	   }		 	     	   	    
		 	     	   });		 	     	   
		 	     	   //对容器上下左右添加内容
		 	     	  $(this).on("click",".dotweb-upadd",function(){		 	     	        
		 	     	        var cur  = $('.sys_homeedit_choose').parents(".Model_Element");
		 	     	        Model_AddContent('AddAbove',cur);
		 	     	        //return alert("向上添加")
		 	     	   });
		 	     	   $(this).on("click",".dotweb-downadd",function(){		 	     	  
		 	     	        var cur = $('.sys_homeedit_choose').parents(".Model_Element");
                     		Model_AddContent('AddBelow',cur); 
		 	     	        //return alert("向下添加")
		 	     	   });
		 	     	   $(this).on("click",".dotweb-leftadd",function(){
		 	     	        var filename=$(".sys_homeedit_choose").attr("NP");	
		 	     	        var cell_row=$(".sys_homeedit_choose").attr("cell_row");
		 	     	        var cell_col=$(".sys_homeedit_choose").attr("cell_col");
		 	     	        var cell_sub=$(".sys_homeedit_choose").attr("cell_sub");
		 	     	        var info=new Array();
		 	     	        		info[0]=filename;
		 	     	        if(undefined!=cell_row){
		 	     	        		info[1]=cell_row;
		 	     	        		info[2]=cell_col;
		 	     	        		info[3]=cell_sub;
		 	     	        	}
		 	     	        InsertOneContainer(info,'left');
		 	     	        //return alert("向左添加")
		 	     	   });
		 	     	   
		 	     	   $(this).on("click",".dotweb-rightadd",function(){
		 	     	        var filename=$(".sys_homeedit_choose").attr("NP");
		 	     	       	var cell_row=$(".sys_homeedit_choose").attr("cell_row");
		 	     	        var cell_col=$(".sys_homeedit_choose").attr("cell_col");
		 	     	        var cell_sub=$(".sys_homeedit_choose").attr("cell_sub");
		 	     	        var info=new Array();
		 	     	        		info[0]=filename;
		 	     	        if(undefined!=cell_row){
		 	     	        		info[1]=cell_row;
		 	     	        		info[2]=cell_col;
		 	     	        		info[3]=cell_sub;
		 	     	        	}
		 	     	        InsertOneContainer(info,'right');
		 	     	        //return alert("向右添加")
		 	     	   });
		 	     	   
		 	     	   $(this).on("click",".dotweb-moveleft",function(){
		 	     	   	    
		 	     	        var filename=$(".sys_homeedit_choose").attr("NP");
		 	     	        var cell_row=$(".sys_homeedit_choose").attr("cell_row");
		 	     	        var cell_col=$(".sys_homeedit_choose").attr("cell_col");
		 	     	        var cell_sub=$(".sys_homeedit_choose").attr("cell_sub");
		 	     	        var info=new Array();
		 	     	        		info[0]=filename;
		 	     	        if(undefined!=cell_row){
		 	     	        		info[1]=cell_row;
		 	     	        		info[2]=cell_col;
		 	     	        		info[3]=cell_sub;
		 	     	        	}
		 	     	        ChangePosition(info,'left');
		 	     	        //return alert("向左移动")
		 	     	   });
		 	     	   $(this).on("click",".dotweb-moveright",function(){
		 	     	        var filename=$(".sys_homeedit_choose").attr("NP");
		 	     	        //alert("向右移动");
		 	     	       var cell_row=$(".sys_homeedit_choose").attr("cell_row");
		 	     	        var cell_col=$(".sys_homeedit_choose").attr("cell_col");
		 	     	        var cell_sub=$(".sys_homeedit_choose").attr("cell_sub");
		 	     	        var info=new Array();
		 	     	        		info[0]=filename;
		 	     	        if(undefined!=cell_row){
		 	     	        		info[1]=cell_row;
		 	     	        		info[2]=cell_col;
		 	     	        		info[3]=cell_sub;
		 	     	        	}
		 	     	        ChangePosition(info,'right');
		 	     	         
		 	     	   });
		 	     	   $(this).on("click",".dotweb-moveup",function(){
		 	     	        var obj = $(".sys_homeedit_choose").parents(".Model_Element");
		 	     	        Model_Editor_Move(obj,1);
		 	     	        //return alert("向上移动")
		 	     	   });
		 	     	   $(this).on("click",".dotweb-movedown",function(){
		 	     	        var obj = $(".sys_homeedit_choose").parents(".Model_Element");
		 	     	        Model_Editor_Move(obj,0);		 	     	        
		 	     	        //return alert("向下移动")
		 	     	   });
		 	     	  
		 	     	   //按钮-拆分：更改容器类型
		 	     	   $(this).on("click",".dotweb-layout",function(){
		 	     	   			//2014-1-20 To do ……
		 	     	   			var filename=$(".sys_homeedit_choose").attr("np");
		 	     	   			var cell_row=$(".sys_homeedit_choose").attr("cell_row");
		 	     	        var cell_col=$(".sys_homeedit_choose").attr("cell_col");
		 	     	        var cell_sub=$(".sys_homeedit_choose").attr("cell_sub");
		 	     	        var info=new Array();
		 	     	        		info[0]=filename;
		 	     	        if(undefined!=cell_row){
		 	     	        		info[1]=cell_row;
		 	     	        		info[2]=cell_col;
		 	     	        		info[3]=cell_sub;
		 	     	        	}
		 	     	        var obj=$(this);
		 	     	   		  ContainerSplit(info);
		 	     	   			return ;
		 	     	   			return alert("to do……文件：jquery.dotWeb.contentEditor.js第217行实现我哟!!快点^");
		 	     	   	    //var funcHtml='<div class="more_Button" style="display:none;text-align:right;line-height:20px;"></div>';
		 	     	        //$(".dotWebFloatEditorBar").append(funcHtml);
		 	     	   			var changFlag= $(".sys_homeedit_choose").length;
		 	     	   			if(changFlag<=0) return alert("请选中需修改模块!");
		 	     	   			if($(this).attr("flag")!='1')
		 	     	   			{
		 	     	   				$(".more_Button").html("");
		 	     	   				$(".more_Button").show();
		 	     	   				$(this).attr("flag","1");
		 	     	   			}else{
		 	     	   				$(".more_Button").html("");
		 	     	   				$(".more_Button").hide();
		 	     	   				$(this).attr("flag","");
		 	     	   			}
		 	     	   			var filename=$(".sys_homeedit_choose").attr("NP");
		 	     	   			//ajax判断是否为容器；生成相应容器选择按钮
		 	     	   			$.ajax({
			                    "url":"/Resource/website/dotWeb/extend/contentEditor/dotWebContentOp.tsl",
			                    "type":"post",
			                    "dataType":"text",
			                    "data":{"opType":'gettype',"filename":filename},
			                    "success":function(data){
			                    			 data= eval("("+data+")");
			                    			 var html='';
			                    			 for(var i=0;i<data.length;i++)
			                    			 {
			                    			 		html+='<a href="###" onclick="choosecontainer(\''+data[i]['layoutType']+'\',\''+filename+'\',\'\',\'Quicklyadd\',2);">'+data[i]['title']+'</a><br/>';			                    			    
			                    			 }
			                    			 html+='<a href="###" onclick="ContainerDetail(this,\''+filename+'\')">>>详细</a>';
			                    			 $(".more_Button").html(html);
			                    			 
			                        	 //choosecontainer(data,filename,'','change',2);//Resource\website\js\TWebsiteDivView.js
			                        	 return;
			                    },
			                    "error":function(){                    	  
			                    }
			               });
		 	     	        return false;
		 	     	        
		 	     	   });
		 	     	   return bar_obj ;
		 	     },
		 	     "dataGridEditorEvent":function(options){
		 	     	   var opt = options || {} ,
		               editor_obj = $(this) ,
		               conf = opt.conf || {} ;

		           return editor_obj ;
		 	     },
		 	     "updateDataGridConf":function(options){		 	           
		 	           var hadConf = options.hadConf ,
		 	               updateConf = options.updateConf ;

		 	           for (var n in updateConf){
		 	           	   hadConf[n] = updateConf[n] ;
		 	           } ;
		 	     },
		 	     "addColColor":function(){ //dataGrid配置添加色系
		 	     	     var tr_obj = $(this).parents("tr:first") ,
		 	     	         ptr_obj = $(tr_obj).prev("tr") ;
		 	     	         
		 	     	     var clone_obj = $("td:lt(2)",ptr_obj).clone() ;
		 	     	     var c = $("td",ptr_obj).length/2 ;

		 	     	     var new_item = $(clone_obj).appendTo(ptr_obj) ;
		 	     	     var _txt_obj = $(new_item).get(0) ,
		 	     	         _val_obj = $(new_item).get(1) ,
		 	     	         _input_obj = $(".colorpicker",_val_obj) ;

                 $("span",_txt_obj).text("颜色"+(c+1)) ;

                 //更新property
		 	     	     var _property = $(_input_obj).attr("property") ,
		 	     	         _pArr = _property.split(":") ;

		 	     	     _pArr[_pArr.length-1] = c ;
		 	     	     $(_input_obj).attr("property",_pArr.join(":")) ;

                 //
		 	     	     $(".evo-pointer",_val_obj).remove() ;
		 	     	     $(".colorpicker",_val_obj).colorpicker({"history":false,
					     	            	  	                       "displayIndicator":false,
					     	            	  	                       "strings":'主题色,标准色,更 多,返 回,Back to Palette,History,No history yet.'
     	            	  	                                }) ;
		 	     },
		 	     "delColColor":function(){//dataGrid配置删除色系
		 	     	     var tr_obj = $(this).parents("tr:first") ,
		 	     	         ptr_obj = $(tr_obj).prev("tr") ;

		 	     	     var c = $("td",ptr_obj).length ;
		 	     	     $("td:gt("+(c-3)+")",ptr_obj).remove() ;
		 	     },
		 	     "addDgCol":function(){
		 	           var form_wrap = $(this).parents(".tsFormWrapper:first") ,
		 	               addRowContainer_obj = $(this).parents(".formItemContainer:first") ,//新增列列表容器
		 	               colConfigList_obj = $(".dgColConfigList",form_wrap) ,//已有列列表容器
		 	               addCol = $("tr.formRow:eq(1)",addRowContainer_obj).clone(true) ,
                     _more_obj = $(".itemMore",addCol) ,
                     newRowIndex = $("tr.formRow:visible",colConfigList_obj).length + $("tr.formRow:visible",addRowContainer_obj).length - 1 ,
                     prefix_id = $(_more_obj).attr("id")+"_add" ,
                     _more_id = prefix_id+newRowIndex ;
                 
                 var had_subMoreID = [] ;
                 $(".itemMore",addRowContainer_obj).each(function(){
                     had_subMoreID.push($(this).attr("id")) ;
                 }) ;

                 //生成唯一的子表单Id
                 while($.inArray(_more_id,had_subMoreID) != -1){
                 	   newRowIndex ++ ;
                 	   _more_id = prefix_id+newRowIndex ;
                 } ;
                 
                 $(_more_obj).attr("id",_more_id) ;
                 $(addCol).removeClass("formhiddenrow").show() ;
                 $(":input",addCol).removeAttr("orginal").removeAttr("nature").val("") ;
                 //设置新增列property属性
                 $(":input",addCol).each(function(){
                 	   var _property = $(this).attr("property") ;
                 	   if (typeof _property != "undefined"){
                 	   	   var _tmp = _property.split(":") ;
                 	   	   _tmp[1] = newRowIndex ;
                 	   	   var _newProperty = _tmp.join(":") ;
                 	   } ;
                 	   $(this).attr("property",_newProperty) ;
                 }) ;

                 $("tr:last",addRowContainer_obj).after(addCol) ;

                 var subFormConf = $("#"+_more_id).data("itemConf") ;
                 var subFormConf = $(subFormConf).tsForm("resetPropertyIndex",{"newIndex":newRowIndex,"site":1}) ;
                 var subFormConf = $(subFormConf).tsForm("reSetAttr",{"nature":""}) ;//将非提交属性置空
                 $("#"+_more_id).data("itemConf",subFormConf) ;
		 	     },
		 	     "delDgCol":function(){
		 	           var colConfigList_obj = $(this).parents(".formItemContainer:first") ;

		 	           var selected_row = $(".formRow .addRowCheck:checked",colConfigList_obj) ;
		 	           if ($(selected_row).length){
				 	           $(selected_row).each(function(){
				 	           	   var row_obj = $(this).parents("tr:first") ;
				 	           	   
				 	           	   //移除子表单
				 	           	   var subFormID = $(".itemMore",row_obj).attr("id") ;
				 	           	   var subForm_obj = $("div.tsSubForm[subid="+subFormID+"]") ;
				 	           	   if ($(subForm_obj).length){
				 	           	      $(subForm_obj).tsForm("removeForm") ;
				 	           	   } ;
				 	           	   //移除行内容
				 	               $(row_obj).remove() ;
				 	           }) ;
		 	          }else{
		 	          	   alert("请选择要删除的列！") ;
		 	          } ;
		 	     },
		 	     "checkDgFresh":function(){
		 	     	     var tr_obj = $(this).parents("tr:first") ,
		 	     	         refreshInterval_obj = $("input[property=FRefreshInterval]",tr_obj) ; //刷新时间设置框
		 	           if ($(this).is(":checked")){
		 	              $(refreshInterval_obj).removeAttr("disabled") ;
		 	           }else{
		 	           	  $(refreshInterval_obj).attr("disabled","disabled") ;
		 	         	 } ;
		 	     }
}) ;