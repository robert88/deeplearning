(function(){
	var common = {};
	window.common = common;
	/*
	 * 功能：事件绑定
	 * 调用方法：ui.bindEvent(DOM元素，事件名称，事件的回调函数);
	*/
	common.bindEvent = function(elem, eventName, callBack){
			if(elem==null){return;}
			if(elem.addEventListener){
				elem.addEventListener(eventName, callBack, false); //IE9及以上、非IE
			}else{
				elem.attachEvent("on" + eventName, callBack); //IE8及以下
			}
		}

	//下拉菜单
	common.dropMenuTop = function(clickElemClass, className, dropMenuClass, callback){
				$("body").click(function(){
						$(clickElemClass).removeClass("open");
						$(dropMenuClass).slideUp();
				});
				$(dropMenuClass).click(function(e){
						$(this).show();	
						e.stopPropagation();
				});		
				$(clickElemClass).click(function(e){
						if( $(this).hasClass("open") ){
							$(this).removeClass("open");

							$(this).parent().find(dropMenuClass).slideUp();
						}else{
							$(clickElemClass).removeClass("open");	 
							$(dropMenuClass).slideUp();
							$(this).addClass("open");
							$(this).parent().find(dropMenuClass).slideDown();
						}
						e.stopPropagation();
						e.preventDefault();
				});
				//回调
				if( typeof(callback)=='function' ){
					callback();
				}
		}
	
	//显示二级菜单（顶部下拉菜单中使用）
	common.showSubMenu = function(clickElemClass, subMenuClass, callback){
			$(clickElemClass).click(function(e){
					$(this).parent().find(subMenuClass).toggleClass("show");
					e.stopPropagation();
					e.preventDefault();
			});
			$("body").click(function(){
					$(subMenuClass).removeClass("show");	 
			});
			$(subMenuClass).click(function(e){
					e.stopPropagation();
			});	
			//回调
			if( typeof(callback)=='function' ){
				callback();
			}
		}
	//左侧导航显示二级菜单
	common.leftNavShowSubmenu =  function(clickElemClass, subMenuClass){
			$(clickElemClass).click(function(){
					var parentLi = $(this).parents("li");
					if( parentLi.hasClass("open") ){
						parentLi.find(subMenuClass).slideUp(function(){
							setLeftBarHeight();	//导航整体高度占满屏
						});
						parentLi.removeClass("open");
					}else{
						parentLi.addClass("open");
						parentLi.find(subMenuClass).slideDown(function(){
							setLeftBarHeight();	//导航整体高度占满屏
						});
						
						parentLi.siblings().removeClass("open");
						parentLi.siblings().find(subMenuClass).slideUp(); 
					}
			});
		}
	//tab选项卡
	common.tabMenu = function(clickElemTag, activeClass, contentElemClass){
			$(clickElemTag).click(function(){
				$(this).addClass(activeClass).siblings().removeClass(activeClass);
				var index = $(this).index();
				$(this).parents(".tabMenu").siblings(contentElemClass).eq(index).show().addClass(activeClass).siblings(contentElemClass).hide().removeClass(activeClass);
			});
		}
	//仿表单select下拉列表
	common.dropList = function(clickElemClass, listElemClass){
			//展开/收起列表
			$(document).on("click",clickElemClass,function(e){
		//	$(clickElemClass).click(function(e){	
				// $(listElemClass).slideUp();	
				$(this).siblings(listElemClass).slideToggle();
				e.stopPropagation();
				e.preventDefault();
			});
			//存储选择结果
			var list = $(clickElemClass).siblings(listElemClass),
				listChild = list.children();
				//$(document).on("click",listChild,function(e){
				listChild.click(function(e){
					var selectedElem = $(this).parent().siblings(clickElemClass);
					var text = $(this).text();
					selectedElem.children().eq(0).text(text);
					$(this).parent().slideUp();
					e.stopPropagation();
				});
			//点body收起列表
			$("body").click(function(){
					$(listElemClass).slideUp();
			});
		}
	//仿表单checkbox复选框
	common.checkbox = function(checkBoxWrap, activeClass){
			$(checkBoxWrap).click(function(){
				if( $(this).hasClass(activeClass) ){
					$(this).removeClass(activeClass);
					$(this).find("input").removeAttr("checked");
				}else{
					$(this).addClass(activeClass);
					$(this).find("input").attr("checked", "checked");
				}
			});
		}
	//仿表单radio单选按纽
	common.radio = function(radioClass, activeClass){
			$(radioClass).click(function(){
				if( $(this).hasClass(activeClass) ){
					$(this).removeClass(activeClass);
					$(this).find("input").removeAttr("checked");
				}else{
					$(this).parents(".radioWrap").find(radioClass).removeClass(activeClass).find("input").removeAttr("checked");
					$(this).addClass(activeClass);
					$(this).find("input").attr("checked", "checked");
				}
				$(this).addClass( "selected" );
				$( this ).siblings().removeClass( "selected" );
			});
		}
	// 静止滚动

	// common.stopScroll = function(obj){
	// 	console.log( obj.scrollHeight() );

	// 	if($(obj).innerHeight() + $(obj).scrollTop() >= obj.scrollHeight) {
	//         console.log('bottom');
	//         if(delta < 0) {
	//            console.log('to bottom!!');
	//            e.preventDefault();
	//            return false;
	//         }
	//     }
	//     if($(obj).scrollTop() === 0) {
	//         console.log('top');
	        
	//         if(delta > 0) {
	//            console.log('to top!!');
	//            e.preventDefault();
	//            return false;
	//         }
	//     }
	// }

	//弹出框
	common.popup = function(options){
			var opt = {
				width: 300,
				height: 200,
				padding: 15,
				customStyle: false,				//是否使用自定义的样式
				showComfirmBtn: false,			//是否显示确认按纽，默认不显示
				comfirmCallBack: function(){},	//点确认按纽后的回调函数
				showCancleBtn: false,			//是否显示取消按纽，默认不显示
				cancleCallBack: function(){},	//点取消按纽后的回调函数
				showCloseBtn: true,				//是否显示关闭按纽，默认显示
				clickBgClose: true,				//点击背景关闭
				content: "弹出框主体内容区",		//弹出框的内容
				callBack: function(){}			//打开弹出框时的回调函数
			};
			//合并配置项
			var attr;
			for( attr in options ){
				if( options.hasOwnProperty(attr) ){
					opt[attr] = options[attr];
				}
			}
			
			//定义弹出框HTML结构
			var html = '<p id="popupBg">&nbsp;</p>' +
						'<div id="popup">' +
							'<span id="closePopup">X</span>' +
							'<div id="popupContent"></div>' +
						'</div>';
			//新增一个DIV元素，用于装载弹出框的HTML，以便于追加到BODY中
			var popupDiv = document.createElement("DIV");
			popupDiv.id = "popupWrap";
			popupDiv.innerHTML = html;
			
			//如果存在则显示出来，否则向BODY追加弹出框的HTML
			var popup = document.getElementById("popup");
			if( popup ){
				popup.style.display = "block";
			}else{
				document.body.appendChild( popupDiv );	
			}
			//取得弹出框各元素
			var popupWrap	= popupDiv,
				bg			= popupDiv.children[0],
				popup		= popupDiv.children[1],
				closeBtn	= popupDiv.children[1].children[0],
				popupContent= popupDiv.children[1].children[1];
			
			//弹出框主体内容及padding设置
			popupContent.setAttribute("style", "padding:" + opt.padding + "px;clear:both;overflow:hidden;");
			popupContent.innerHTML = opt.content;
			
			//弹出框样式设置
			if( !opt.customStyle ){
				//弹出框外层定位
				var popupWrapStyle = "position:fixed;z-index:9999;left:0;top:0;width:100%;height:100%;"
				popupWrap.setAttribute("style", popupWrapStyle);
	
				//遮罩背景设置
				var bgStyle = "position:absolute;left:0;top:0;margin:0;width:100%;height:100%;background:#000;opacity:0.5;filter:alpha(opacity=50);";
				bg.setAttribute("style", bgStyle);
	
				//弹出框样式设置
				var popupStyle = "position:absolute;left:50%;top:50%;background:#fff;border-radius:5px;overflow:auto;line-height:150%;";
					popupStyle += "width:" + opt.width + "px;height:" + opt.height + "px;margin-top:" + -opt.height/2 + "px;margin-left:" + -opt.width/2 + "px;";
				popup.setAttribute("style", popupStyle);
				
				//关闭按纽样式设置
				var marginStyle = '';
				/*if( popupContent.scrollHeight>popup.offsetHeight ){
					marginStyle = 'margin-top:-' + (opt.height/2-2) + "px;";
					marginStyle += "margin-left:" + (opt.width/2-31) + "px;";
				}else{
					marginStyle = 'margin-top:-' + (opt.height/2-10) + "px;";
					marginStyle += "margin-left:" + (opt.width/2-20) + "px;";
				}*/
				marginStyle = 'margin-top:-' + (opt.height/2-14) + "px;";
				marginStyle += "margin-left:" + (opt.width/2-24) + "px;";
				var closeBtnStyle = marginStyle + "position:fixed;left:50%;top:50%;line-height:100%;cursor:pointer;font-family: cursive;";
				closeBtn.setAttribute("style", closeBtnStyle);
			}else{
				//弹出框居中定位
				var popupStyle = "width:" + opt.width + "px;height:" + opt.height + "px;margin-top:" + -opt.height/2 + "px;margin-left:" + -opt.width/2 + "px;";
				popup.setAttribute("style", popupStyle);
			}
			
			//响应式设置
			responseStyle(); //初始化也作响应式
			common.bindEvent(window, "resize", function(){
				responseStyle();
			});
			function responseStyle(){
				var oldW = opt.width,
					oldH = opt.height,
					windowW = (window.innerWidth==undefined) ? document.documentElement.offsetWidth : window.innerWidth,
					windowH = (window.innerHeight==undefined) ? document.documentElement.offsetHeight : window.innerHeight,

					popup = document.getElementById("popup"),
					closePopBtn = document.getElementById("closePopup");
				if(popup){
					//如果屏幕宽度比原来小，宽度=屏幕宽*0.8
					//如果屏幕高度比原来小，高度=屏幕高*0.8
					var popWidth = windowW<oldW ? Math.floor(windowW*0.8) : opt.width;
					var popHeight = windowH<oldH ? Math.floor(windowH*0.8) : opt.height;
					
					popup.style.width = popWidth + "px";
					popup.style.marginLeft = -popWidth/2 + "px";
					popup.style.height = popHeight + "px";
					popup.style.marginTop = -popHeight/2 + "px";
					
					//关闭按纽样式设置
					if(closePopBtn){
						/*if( popupContent.scrollHeight>popup.offsetHeight ){
							closePopBtn.style.marginTop = -(popHeight/2-2) + "px";
							closePopBtn.style.marginLeft = (popWidth/2-31) + "px";
						}else{
							closePopBtn.style.marginTop = -(popHeight/2-10) + "px";
							closePopBtn.style.marginLeft = (popWidth/2-20) + "px";
						}*/
						closePopBtn.style.marginTop = -(popHeight/2-14) + "px";
						closePopBtn.style.marginLeft = (popWidth/2-24) + "px";
					}
				}	
			}
			
			//点背景关闭
			if( opt.clickBgClose ){
				common.bindEvent(bg, "click", function(){
					closePopup();
				});
			}
				
			//不显示关闭按纽
			if( opt.showCloseBtn==false ){
				closeBtn.style.display = "none";
			}
			
			//关闭弹出框
			function closePopup(){
				document.body.removeChild(popupWrap);
				$("body").css( "overflow","visible" );
			}
			common.bindEvent(closeBtn, "click", function(){
				closePopup();
			});
			/*common.bindEvent(bg, "click", function(){
				closePopup();
			});*/

			
			//显示确认按纽
			if( opt.showComfirmBtn ){
				if( !document.getElementById("popupComfirm") ){
					popupContent.innerHTML += '<p id="popupBtnList"></p>';
					var btnList = document.getElementById("popupBtnList");
					
					var btnCss = ''; //'display:inline-block;border:1px solid #ccc;border-radius:5px;background:#eee;width:80px;text-align:center;padding:4px 0;margin:0 10px;cursor:pointer;font-size:12px;line-height:150%;';
					var comfirmBtn = '<span id="popupComfirm" style="' + btnCss + '">确定</span>';
					btnList.innerHTML += comfirmBtn;
	
					//显示取消按纽
					if( opt.showCancleBtn ){
						var cancleBtn = '<span id="popupCancle" style="' + btnCss + '">取消</span>';
						btnList.innerHTML = cancleBtn + btnList.innerHTML;
					}
					//确定事件
					var comfirmBtn = document.getElementById("popupComfirm");
					common.bindEvent(comfirmBtn, "click", function(e){
						closePopup();
						//回调函数
						if( opt.comfirmCallBack && typeof(opt.comfirmCallBack)=="function" ){
							opt.comfirmCallBack(e);
						}
					});
					//取消事件
					var cancleBtn = document.getElementById("popupCancle");
					common.bindEvent(cancleBtn, "click", function(e){
						closePopup();
						//回调函数
						if( opt.cancleCallBack && typeof(opt.cancleCallBack)=="function" ){
							opt.cancleCallBack(e); 
						}
					});
				}		

			}
			
			//回调函数
			if( typeof(opt.callBack)=="function" ){
				opt.callBack(closePopup); //把关闭事件作为参数传递给回调，便于在外边关闭弹出框
			}
	}	
})();


//顶部
		//下拉菜单
		common.dropMenuTop(".dropDown .dropTitle", "open", ".dropMenu")
		//显示下拉菜单中的二级菜单
		common.showSubMenu(".menuList .listTitle", ".subList", function(){
			$(".dropDown .dropTitle").click(function(){
					$(".dropDown .subList").removeClass("show");	 
			});
		});
//左侧导航
		//收缩二级菜单
		common.leftNavShowSubmenu(".leftBar .navList li .listTitle", ".subList");
		//导航整体高度占满屏
		function setLeftBarHeight(){
				var topH = $(".header").height(),
					bodyH = $("body").height(),
					windowH = $(window).height(),
					leftBarUlH = $(".leftBar ul").height();
				var screenH = (bodyH>windowH) ? bodyH-topH : windowH-topH;
				var leftBarH;
				if(screenH>leftBarUlH){
					leftBarH = screenH;	
				}else{
					leftBarH = leftBarUlH;	
				}
				//如果有底部浮动栏，则增加浮动栏的高度
				if( $(".bottomFloatBar").length>0 ){
					leftBarH += ( $(".bottomFloatBar").outerHeight()*$(".bottomFloatBar").length+63 );
					// leftBarH += ;
					$(".bottomFloatBar").width( $(window).width()-$(".leftBar").width()-2 );
				}
				$(".leftBar").height(leftBarH);
				//底部版权栏宽度设置
				var leftBarW = $(".leftBar").width(),
					bodyW = $("body").width();
				$(".footer").width(bodyW-leftBarW-56);
		}
		//底部置底设置
		function setFooterFixed(){
			//如果主体内容高度 > 窗口高度-头部：不设置置底
			var windowH = $(window).height(),
				headerH = $(".header").outerHeight(),
				mainH = $(".main").outerHeight();
			if( mainH>windowH-headerH ){
				$(".footer").removeClass("fixed");
				$(".footer").css("width", "auto");
			}else{
				var bodyW = $("body").width(),
					leftBarW = $(".leftBar").width();
				$(".footer").addClass("fixed");
				$(".footer").width(bodyW-leftBarW-56);
			}
		}


		// 日历图标点击

		

		
		$(window).bind("load resize", function(){
			setLeftBarHeight();	//导航整体高度占满屏
			setFooterFixed(); //底部置底设置
		});
		
		
		
	