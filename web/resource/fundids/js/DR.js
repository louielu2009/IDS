
function initAuditorDialog(o,existAudit){
  destroyDialog(o);
  var sHtml = '<div class="temp_dialog"><form class="form-box">'
	          + '<label class="form-label">审核人</label>'
	          +getUserSelect(existAudit)
	          + '<label class="form-label">产  品</label><input type="hidden" class="txt-products">'
            + '<input type="hidden" class="add-element-id" value="'+$(o).parents('.layout-row:first').attr('id')+'">'
            + genProductsChecks()
	          + '</form>'
            + '<div class="btns-container">'
            + '<button class="btn btn-primary">确定</button>'
            + '<button class="btn" onclick="destroyDialog(this)">取消</button>'
            + '</div></div>';             
	var d = $(sHtml).dialog({modal: true});
  return d;
  
}

function initEditorDialog(o,existAudit){
  destroyDialog(o);
 	var sHtml = '<div class="temp_dialog"><form class="form-box">'
	          + '<label  class="form-label">维护人</label>'
	          +getUserSelect(existAudit)
	          + '<label class="form-label">产  品</label><input type="hidden" class="txt-products">'
            + '<input type="hidden" class="add-element-id" value="'+$(o).parents('.layout-row:first').attr('id')+'">'
            + genProductsChecks()
	          + '</form>'
            + '<div class="btns-container">'
            + '<button class="btn btn-primary">确定</button>'
            + '<button class="btn" onclick="destroyDialog(this)">取消</button>'
            + '</div></div>';
	var d = $(sHtml).dialog({modal: true});	  
  return d;
}

function AddAudit(o){
	var existAudit='';
	$(o).parents(".btns-container:eq(0)").prev(".Data_Element_Content").find(".td-auditor").each(function(){
			existAudit+= (existAudit=='')?$(this).attr("uid"):';'+$(this).attr("uid");
	})
	var d = initAuditorDialog(o,existAudit).dialog({title:'添加审核人',width:'500px'});
  $('.btn-primary').click(function(){appendAuditor(this);});  
}

function AddDm(o){
 var existAudit='';
	$(o).parents(".btns-container:eq(0)").prev(".Data_Element_Content").find(".td-editor").each(function(){
			existAudit+= (existAudit=='')?$(this).attr("uid"):';'+$(this).attr("uid");
	})
  var d = initEditorDialog(o,existAudit).dialog({title:'添加维护人',width:'500px'});
  $('.btn-primary').click(function(){appendEditor(this);});
}

function destroyDialog(o){
  $(o).parents('.temp_dialog').dialog('destroy');
}

function appendAuditor(o){  
  var eid = $('.add-element-id').val(),
  	  auditorPeopleID = $('.txt-right-people').val(),
      auditorPeopleName = $('.txt-right-people').find("option:selected").text(),
      products = $('.txt-products').val(),
      trAuditorLast = $('#'+eid+' .tr-auditor:last'),
      trAuditorClone = trAuditorLast.clone();
  if(products=='')return alert("请选择产品!");
  postDR({dowhat:'add-auditor',eid:eid,userid:auditorPeopleID,fundids:products},
         function(data){
           if(data == '1'){
           	  trAuditorClone.find('.td-auditor').attr("uid",auditorPeopleID);
  			  trAuditorClone.find('.td-auditor').text(auditorPeopleName);
  			  trAuditorClone.find('.td-products').text($('.txt-products').attr("idtext"));
  			  trAuditorLast.after(trAuditorClone);
           }
           else{
             alert('增加失败！'+data);
           }           
           destroyDialog(o);
         }
  );
  destroyDialog(o);
}

function appendEditor(o){  
  var eid = $('.add-element-id').val(),
      editorPeopleID = $('.txt-right-people').val(),
      editorPeopleName = $('.txt-right-people').find("option:selected").text(),
      products = $('.txt-products').val(),
      trEditorLast = $('#'+eid+' .tr-editor:last'),
      trEditorClone = trEditorLast.clone();
   if(products=='')return alert("请选择产品!");  
  postDR({dowhat:'add-editor',eid:eid,userid:editorPeopleID,fundids:products},
         function(data){
           if(data == '1'){
           	trEditorClone.find('.td-editor').attr("uid",editorPeopleID);
             trEditorClone.find('.td-editor').text(editorPeopleName);
             trEditorClone.find('.td-products').text($('.txt-products').attr("idtext"));
             trEditorLast.after(trEditorClone);
           }
           else{
             alert('增加失败！');
           }           
           destroyDialog(o);
         }
  );
}

function removeRights(o){
  var id = $(o).parents('.layout-row:first').attr('id'),
      tr = $(o).parents('tr:first');
      isEditor = tr.find('.td-editor').length,
      userid = tr.find(isEditor ? '.td-editor':'.td-auditor').attr("uid")
      userName= tr.find(isEditor ? '.td-editor':'.td-auditor').text();
  if(confirm('确认删除'+userName+'对该元素的管理？')){
    postDR({dowhat:'remove-'+ (isEditor?'editor':'auditor'),eid:id,userid:userid},
           function(data){
             if(data == '1')tr.fadeOut(function(){$(this).remove();});
             else alert('删除失败！');
           });
  }
}

function editRights(o){
  var role = '',
      row = $(o).parents('tr:first');
  if(row.hasClass('tr-editor')){
    initEditorDialog(o,'').dialog({'title':'修改维护人',width:'500px'});
    role = 'editor';
  }
  else{
    initAuditorDialog(o,'').dialog({'title':'修改审核人',width:'500px'});
    role = 'auditor';
  }
  var name = $('.td-'+role,row).attr("uid"),//text(),
      products = $('.td-products',row).text();
  //console.log('name:'+name+' products:'+products);
  $('.txt-right-people').val(name).attr('disabled',true);
  $('.txt-products').val(products);
}
//用户select获取
function getUserSelect(existUser)
{
	var selectStr;
	var id= $(".main_content").attr("roleid");
	$.ajax({
		type : 'post',
		async : false,
		dataType : 'text',
		url : '/website/security/AutoAjax.tsl?type=user&id='+id+'&euser='+existUser,
		success : function(data) {
			selectStr= data;
		}
	}) ;
	return selectStr;
}
//用户及产品Autocomplete，obj代表输入对象，type为类型，id为角色id
function AddAutoComplete(obj,type,id){
	if('undefined' == typeof(id))id='';
	var tardata;
	tardata = getSelectData(type,id);
	/*$.ajax({
		type : 'post',
		async : false,
		dataType : 'json',
		url : '/website/security/AutoAjax.tsl?type='+type+'&id='+id,
		success : function(data) {	
			tardata = data;
		}
	}) ;
   */
  var split = function ( val ) {
	  return val.split( /;\s*/ );
  }
  var extractLast = function( term ) {
	  return split( term ).pop();
  }
  
	$(obj)
      .autocomplete({
			//source: '/website/security/AutoAjax.tsl?type='+type+'&id='+id,
			source: function( request, response ) {
				// delegate back to autocomplete, but extract the last term
				response( $.ui.autocomplete.filter(
					tardata, extractLast( request.term ) ) );
			},
			minLength: 0,
			focus : function() { return false; },
			select: function( event, ui ) {
				var terms = split( this.value );
				terms.pop();	// remove the current input
				terms.push( ui.item.value );	// add the selected item
				terms.push( "" );// add placeholder to get the comma-and-space at the end
				this.value = terms.join( ";" );
				return false;
			},
			search:function(event,ui){
				$(this).css({"background":"#FFE"});
			},
			open:function(event,ui){setTimeout(function () {$('.ui-autocomplete').css('z-index', 9999);}, 0);},
			close:function(event,ui){$(this).css({"background":""});}	
		})
}

function getSelectData(type,id){
	var tardata;
	$.ajax({
		type : 'post',
		async : false,
		dataType : 'json',
		url : '/website/security/AutoAjax.tsl?type='+type+'&id='+id,
		success : function(data) {	
			tardata = data;
		}
	})
	return tardata;
}

$(function() {
	$(".btn_AddAudit").live("click",function(){	
		   AddAudit(this);
	});
	$(".btn_AddDm").live("click",function(){	
		   AddDm(this);
	});

	$(".underlineTable tr").live("mouseenter",function(){	
    $('td:last',this).html('<button class="btn" onclick="editRights(this)">编辑</button><button class="btn btn-danger" onclick="removeRights(this)">删除</button>');
	}).live("mouseleave",function(){
    $('.btn',this).remove();
  });
});


function postDR(params,handler){
 $.post('/fundids/ajax/dr_ajax.tsl',params,handler);  
}


function genProductsChecks(){
  var d = getSelectData('allproduct'),
      sHtml = '<div class="container-products">'
            + '<label><input type="checkbox" value="all" onclick="checkAllProducts(this)" />所有</label>';
  for(var i = 0;i<d.length;i++){
    sHtml += '<label><input type="checkbox" value="'+d[i].value+'" class="chk-product" onclick="setTxtProducts(this)" />'+d[i].label+'</label>';
  }
  sHtml += '</div>';
  return sHtml;
}

function checkAllProducts(o){
  var $o = $(o);
  if(o.checked){
    $(o).parents('.container-products').find(':checkbox').attr('checked',true);
  }
  else{
    $(o).parents('.container-products').find(':checkbox').attr('checked',false);
  }
  setTxtProducts(o);
}

function setTxtProducts(o){
  var $o = $(o);
  var selectedProducts ="";
  var selectedText="";
  $(o).parents('.container-products')
      .find(':checked.chk-product')
      .each(function(index,sObj){
        	selectedProducts += (selectedProducts=="")?$(sObj).attr("value"):";"+$(sObj).attr("value");
        	var txt= $(sObj).parent("label").text();
			var s= txt.split('  ');
			if(s.length>0)
        		selectedText+= (selectedText=="")?s[1]:";"+s[1];
      });
   if(selectedProducts!=""&&$(o).parents('.container-products').find('input:checkbox').not("input:checked").length==0)selectedProducts= 'all';
  $('.txt-products').val(selectedProducts);
  $('.txt-products').attr("idtext",selectedText);
}