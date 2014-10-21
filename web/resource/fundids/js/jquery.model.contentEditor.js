$.iModel.extend({
		 	     "loadFloatEditorBar":function(options){
		 	     	  var _obj = $(this) ;
		 	     	  var _opt= options ||{},
		 	     	  	  _op = options.op||0,
		 	     	  	  _com_info= options.info||'';

		 	     	  var op1 ={"icon":"ui-icon-pencil","title":"�޸�"};
		 	     	  var op2 ={"icon":"ui-icon-plus Model_Element_Add","title":"���"};
		 	     	  var op3 = {"icon":"ui-icon-circle-close","title":"ɾ��"};
		 	     	  var op4 ={};//{"icon":"dotweb-upadd Model_Element_AddAbove","title":"�������"};
		 	     	  var op5 ={"icon":"dotweb-downadd Model_Element_AddBelow","title":"�������"};
		 	     	  var op6 ={"icon":"ui-icon-trash","title":"�������"};
              $(".dotWebFloatEditorBar").hide() ;
              $(".Element_EType").hide();
              var bar_conf = [op1,op3];
              var bar_conf2= [];
              //�޸�
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
               
		 	     	   //��ť-�༭
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
		 	     	   //��ť-�������
		 	     	   $(this).on("click",".ui-icon-trash",function(){	
		 	     	   				if(confirm("ȷ����յ�ǰ��?"))
		 	     	   				{
		 	     	   					$(".dotWebFloatEditorBar").hide();
		 	     	   					var cur = $('.sys_homeedit_choose').parents(".Model_Element");
		 	     	   					Model_ClearContent(cur);
		 	     	   					//deletecontent(this,1);
		 	     	   					return false;
		 	     	   				}		 	     	        
		 	     	   });
		 	     	   
		 	     	   //��ť-ɾ�����ݿ�		 	     	  
		 	     	   $(this).on("click",".ui-icon-circle-close",function(){		 	     	   	
		 	     	   	    if (confirm("ȷ��ɾ����ǰ���ݿ�?")){
		 	     	   	    	 $(".dotWebFloatEditorBar").hide() ;
		 	     	   	    	 var cur = $('.sys_homeedit_choose').parents(".Model_Element");
		 	     	   	    	 Model_DeleteContent(cur);	
		 	     	   	    	 return false;	 	     	   	    
		 	     	     	   }		 	     	   	    
		 	     	   });		 	     	   
		 	     	   //���������������������
		 	     	  $(this).on("click",".dotweb-upadd",function(){		 	     	        
		 	     	        var cur  = $('.sys_homeedit_choose').parents(".Model_Element");
		 	     	        Model_AddContent('AddAbove',cur);
		 	     	        //return alert("�������")
		 	     	   });
		 	     	   $(this).on("click",".dotweb-downadd",function(){		 	     	  
		 	     	        var cur = $('.sys_homeedit_choose').parents(".Model_Element");
                     		Model_AddContent('AddBelow',cur); 
		 	     	        //return alert("�������")
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
		 	     	        //return alert("�������")
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
		 	     	        //return alert("�������")
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
		 	     	        //return alert("�����ƶ�")
		 	     	   });
		 	     	   $(this).on("click",".dotweb-moveright",function(){
		 	     	        var filename=$(".sys_homeedit_choose").attr("NP");
		 	     	        //alert("�����ƶ�");
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
		 	     	        //return alert("�����ƶ�")
		 	     	   });
		 	     	   $(this).on("click",".dotweb-movedown",function(){
		 	     	        var obj = $(".sys_homeedit_choose").parents(".Model_Element");
		 	     	        Model_Editor_Move(obj,0);		 	     	        
		 	     	        //return alert("�����ƶ�")
		 	     	   });
		 	     	  
		 	     	   //��ť-��֣�������������
		 	     	   $(this).on("click",".dotweb-layout",function(){
		 	     	   			//2014-1-20 To do ����
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
		 	     	   			return alert("to do�����ļ���jquery.dotWeb.contentEditor.js��217��ʵ����Ӵ!!���^");
		 	     	   	    //var funcHtml='<div class="more_Button" style="display:none;text-align:right;line-height:20px;"></div>';
		 	     	        //$(".dotWebFloatEditorBar").append(funcHtml);
		 	     	   			var changFlag= $(".sys_homeedit_choose").length;
		 	     	   			if(changFlag<=0) return alert("��ѡ�����޸�ģ��!");
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
		 	     	   			//ajax�ж��Ƿ�Ϊ������������Ӧ����ѡ��ť
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
			                    			 html+='<a href="###" onclick="ContainerDetail(this,\''+filename+'\')">>>��ϸ</a>';
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
		 	     "addColColor":function(){ //dataGrid�������ɫϵ
		 	     	     var tr_obj = $(this).parents("tr:first") ,
		 	     	         ptr_obj = $(tr_obj).prev("tr") ;
		 	     	         
		 	     	     var clone_obj = $("td:lt(2)",ptr_obj).clone() ;
		 	     	     var c = $("td",ptr_obj).length/2 ;

		 	     	     var new_item = $(clone_obj).appendTo(ptr_obj) ;
		 	     	     var _txt_obj = $(new_item).get(0) ,
		 	     	         _val_obj = $(new_item).get(1) ,
		 	     	         _input_obj = $(".colorpicker",_val_obj) ;

                 $("span",_txt_obj).text("��ɫ"+(c+1)) ;

                 //����property
		 	     	     var _property = $(_input_obj).attr("property") ,
		 	     	         _pArr = _property.split(":") ;

		 	     	     _pArr[_pArr.length-1] = c ;
		 	     	     $(_input_obj).attr("property",_pArr.join(":")) ;

                 //
		 	     	     $(".evo-pointer",_val_obj).remove() ;
		 	     	     $(".colorpicker",_val_obj).colorpicker({"history":false,
					     	            	  	                       "displayIndicator":false,
					     	            	  	                       "strings":'����ɫ,��׼ɫ,�� ��,�� ��,Back to Palette,History,No history yet.'
     	            	  	                                }) ;
		 	     },
		 	     "delColColor":function(){//dataGrid����ɾ��ɫϵ
		 	     	     var tr_obj = $(this).parents("tr:first") ,
		 	     	         ptr_obj = $(tr_obj).prev("tr") ;

		 	     	     var c = $("td",ptr_obj).length ;
		 	     	     $("td:gt("+(c-3)+")",ptr_obj).remove() ;
		 	     },
		 	     "addDgCol":function(){
		 	           var form_wrap = $(this).parents(".tsFormWrapper:first") ,
		 	               addRowContainer_obj = $(this).parents(".formItemContainer:first") ,//�������б�����
		 	               colConfigList_obj = $(".dgColConfigList",form_wrap) ,//�������б�����
		 	               addCol = $("tr.formRow:eq(1)",addRowContainer_obj).clone(true) ,
                     _more_obj = $(".itemMore",addCol) ,
                     newRowIndex = $("tr.formRow:visible",colConfigList_obj).length + $("tr.formRow:visible",addRowContainer_obj).length - 1 ,
                     prefix_id = $(_more_obj).attr("id")+"_add" ,
                     _more_id = prefix_id+newRowIndex ;
                 
                 var had_subMoreID = [] ;
                 $(".itemMore",addRowContainer_obj).each(function(){
                     had_subMoreID.push($(this).attr("id")) ;
                 }) ;

                 //����Ψһ���ӱ�Id
                 while($.inArray(_more_id,had_subMoreID) != -1){
                 	   newRowIndex ++ ;
                 	   _more_id = prefix_id+newRowIndex ;
                 } ;
                 
                 $(_more_obj).attr("id",_more_id) ;
                 $(addCol).removeClass("formhiddenrow").show() ;
                 $(":input",addCol).removeAttr("orginal").removeAttr("nature").val("") ;
                 //����������property����
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
                 var subFormConf = $(subFormConf).tsForm("reSetAttr",{"nature":""}) ;//�����ύ�����ÿ�
                 $("#"+_more_id).data("itemConf",subFormConf) ;
		 	     },
		 	     "delDgCol":function(){
		 	           var colConfigList_obj = $(this).parents(".formItemContainer:first") ;

		 	           var selected_row = $(".formRow .addRowCheck:checked",colConfigList_obj) ;
		 	           if ($(selected_row).length){
				 	           $(selected_row).each(function(){
				 	           	   var row_obj = $(this).parents("tr:first") ;
				 	           	   
				 	           	   //�Ƴ��ӱ�
				 	           	   var subFormID = $(".itemMore",row_obj).attr("id") ;
				 	           	   var subForm_obj = $("div.tsSubForm[subid="+subFormID+"]") ;
				 	           	   if ($(subForm_obj).length){
				 	           	      $(subForm_obj).tsForm("removeForm") ;
				 	           	   } ;
				 	           	   //�Ƴ�������
				 	               $(row_obj).remove() ;
				 	           }) ;
		 	          }else{
		 	          	   alert("��ѡ��Ҫɾ�����У�") ;
		 	          } ;
		 	     },
		 	     "checkDgFresh":function(){
		 	     	     var tr_obj = $(this).parents("tr:first") ,
		 	     	         refreshInterval_obj = $("input[property=FRefreshInterval]",tr_obj) ; //ˢ��ʱ�����ÿ�
		 	           if ($(this).is(":checked")){
		 	              $(refreshInterval_obj).removeAttr("disabled") ;
		 	           }else{
		 	           	  $(refreshInterval_obj).attr("disabled","disabled") ;
		 	         	 } ;
		 	     }
}) ;