//重设主内容区域宽度
function resetSysContentWidth(){
	var winInnerWidth = window.innerWidth ? window.innerWidth : document.body.clientWidth;
	$('.sys_content').width(winInnerWidth- $('.report_navigator').outerWidth());
}

//设定导航项被选中状态
function setNavItemSel(itemName){
	$('.report_nav_sel').removeClass('report_nav_sel');
	$('a[href="#'+itemName+'"').addClass('report_nav_sel');	
}

//设定左边盒子的宽度可重设性
function setLeftBoxResizeable(){
	var bodyHeight = $('body').height();
	$('.left_content').resizable({minHeight:bodyHeight,maxHeight:bodyHeight});	
}

function initNavFlod(){
	$('.title_lv1 i').click(function(){
		var i = $(this);
		var o = i.parent().next();
		if('UL' == o[0].tagName){
			o.slideToggle();
			if(i.hasClass('ui-icon-triangle-1-se')){
				i.removeClass('ui-icon-triangle-1-se');
				i.addClass('ui-icon-triangle-1-e');
			}
			else{
				i.removeClass('ui-icon-triangle-1-e');
				i.addClass('ui-icon-triangle-1-se')
			}
		}
	});
}

$('.sys_content').scroll(function(){
	//获得窗口顶部最近的标题
	var topTitles = $('h1,h2').filter(function(){return $(this).offset().top > -10 ;});
	if(topTitles.length > 0 ) {
		setNavItemSel($(topTitles[0]).find('a').attr('name'));	
	}
});

$(window).resize(function(){
	resetSysContentWidth();
});

$(function(){
	resetSysContentWidth();
	setLeftBoxResizeable();
	initNavFlod();

	$('.left_content_switch').toggle(
		function(){
			$('.left_content').width($(this).outerWidth());
			$(this).removeClass('ui-icon-carat-1-w').addClass('ui-icon-carat-1-e');
		},
		function(){
			$('.left_content').width(250);
			$(this).removeClass('ui-icon-carat-1-e').addClass('ui-icon-carat-1-w');
		});
});