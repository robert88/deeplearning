//预览
	// 卡片列表鼠标移入事件
	$(".cardManage").find(".navList").find("li").hover( function(){

		$(this).siblings().removeClass( "active" );
		$(this).addClass( "active" );

	});

	$(".cardManage").find(".navList").find("li").on( "click",function(){
		var _this = $(this);
		cardTab( _this );
	} );

	// 卡片列表鼠标移入方法
	function cardTab( obj ){
		var len = obj.parent().find("li").length;
		var index = obj.index();
		for(var i = 0;i<len;i++){
			obj.parents(".header").siblings().find(".contentWrap").removeClass("active");
		}
		obj.parents(".header").siblings().find(".contentWrap").eq(index).addClass("active");
	}


	// banner图设置 S
		// banner图对象数组
		var bannerLi = $("#previewPagePopup .setting").find(".floatList").find("li");
		// 选中banner图所在列表
		var selectedUl = $("#previewPagePopup .setting").find( ".selectedList" );
		// 选中li的宽度
		var liWidth;


		// 为banner图加上唯一属性
		var bannerLength = bannerLi.length;
		for(var i = 0;i<bannerLength;i++){
			bannerLi.eq(i).attr( "index",i );
		}

		// banner图选择
		bannerLi.click(function(){
			var _this = $( this );
			selectBanner( _this );
		});

		// banner图选择方法

		function selectBanner( obj ){
			var largestLength = selectedUl.find("li").length;
			if( largestLength ==4 ){
				return;
			}
			if( !($(obj).find("span").hasClass("active")) ){
				liWidth = 245;
				var addLi = "<li index="+$(obj).attr("index")+">"
						+		"<img src='"+$(obj).find("img").attr("src") +"' />"
						+		"<span></span>"
						+	"</li>";
				selectedUl.append( addLi );
				selectedUl.css( "display","block" );
				if( selectedUl.children('li').length > 4 ){
					selectedUl.css( "width", (selectedUl.children('li').length+1) * liWidth + 20 +"px" );
				};
				$("#selectedList").find("span").on( "click",function(){
					var _obj = $(this);
					deleteBanner( _obj );
				} );

			}else{
				for( var i = 0;i<selectedUl.children('li').length;i++ ){
					if( selectedUl.find("li").eq(i).attr("index") == $(obj).attr("index") ){
						selectedUl.find("li").eq(i).remove();
					}
				}
				if( selectedUl.children('li').length == 0 ){
					selectedUl.css( "display","none" );
				};
				if( selectedUl.children('li').length <= 4 ){
					selectedUl.css( "width", 4 * liWidth + 80 +"px" );
				};
			}
			$(obj).find("span").toggleClass("active");
		}



		// 从选中banner图中删除

		function deleteBanner(obj){
			obj.parent().remove();
			var bannerList = $("#previewPagePopup .setting").find(".floatList").find("li");
			if( selectedUl.children('li').length == 0 ){
					selectedUl.css( "display","none" );
				};
			for( var i = 0;i<bannerList.length;i++ ){
				if( bannerList.eq( i ).attr("index") == $(obj).parent().attr("index") ){
					bannerList.eq( i ).find("span").removeClass("active");
				}
			}
		}

		// 保存按钮

		var srcArr = [];
		var liIndex;
		var bannerTimer;
		$("#previewPagePopup").find(".setting").find(".save").on( "click",function(){
			$("body").css( "overflow","visible" );
			
			srcArr = [];
			for(var i = 0;i<selectedUl.children('li').length;i++){
				srcArr.push( selectedUl.children('li').eq(i).find("img").attr( "src" ) );
			}

			// 选中banner图

			if( srcArr.length > 0 ){
				// $(".bannerImg").find("img").attr( "src",srcArr[0] );
				// $(".bannerImg").find("img").css( "display","block" );
				// $(".bannerImg").removeClass("init");
				$(".bannerImg").find(".addDagangBtn").css( "display","none" );
				$(".bannerImg").find("ul").empty();
				$(".bannerImg").find("ul").animate( {"marginLeft":0});
				// $("#courseCatalog").siblings(".radioWrap").css( "display","block" );
				clearInterval( bannerTimer );
				liIndex = 0;
				var str = '';
				for( var j = 0; j<srcArr.length; j++ ){
					str += '<li><img src="'+ srcArr[j] +'" /></li>';
				}

				$(".bannerImg").find("ul").append( str );
				var liWidth = $(".bannerImg").outerWidth();
				$(".bannerImg").find("ul").find("li").width( liWidth );
				var liHeight = $(".bannerImg").find("ul").find("li").height();
				$(".bannerImg").find("ul").width( liWidth*4 );
				$(".bannerImg").height( liHeight );

				bannerTimer = setInterval( function(){
					liIndex++;
					if( liIndex == srcArr.length ){
						liIndex = 0;
					}
					$(".bannerImg").find("ul").animate( {"marginLeft": liWidth * liIndex * -1 });
				},2000 );

			}

			$("#previewPagePopup").find(".setting").hide();
			$("#previewPagePopup").hide();
		} );

		// 单选按钮
		$("#courseCatalog").siblings(".radioWrap").find("span").on( "click",function(){
			$(".bannerImg").find("img").attr( "src",srcArr[ $(this).index() ] );
			$(this).siblings().removeClass( "selected" );
			$(this).addClass( "selected" );
		} );


		// 图片上传按钮

		var uploadSrc = "";
		var fileName = "";

		function previewImage(file)
        {
        	var arr = file.value.split("\\");
        	fileName = arr[ arr.length-1 ];
          var div = document.getElementById('preview');
          if (file.files && file.files[0])
          {
              div.innerHTML ='<img id=imghead>';
              var img = document.getElementById('imghead');
              var reader = new FileReader();
              reader.onload = function(evt){
              	uploadSrc = img.src = evt.target.result;
              }
              reader.readAsDataURL(file.files[0]);
          }
          else //兼容IE
          {
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = "<div id=divhead style='width:100%;height:100%;margin-top:0px;"+sFilter+src+"\"'></div>";
            uploadSrc = file.value;
          }
        }

        // 新增banner 图弹框保存按钮

        $("#addBanner").find(".save").on( "click",function(){
        	if( uploadSrc == "" ){
        		return;
        	}
        	var len = $("#previewPagePopup").find(".setting").find(".courseList").find("li").length;
        	var str = '<li index="'+ len +'">'
				+	'<div class="liBox">'
				+		'<img src="'+ uploadSrc +'">'
				+		'<p>'+fileName+'</p>'
				+	'</div>'
				+	'<span></span>'
				+ '</li>';
			$("#previewPagePopup").find(".setting").find(".courseList").append( str );

        	// 注册点击事件

        	$("#previewPagePopup").find(".setting").find(".courseList").find("li").eq(len).on( "click",function(){
        		var _this = $( this );
        		selectBanner( _this );
        	} );
        	$("#selectedList").find("span").on( "click",function(){
        		var _this = $( this );
        		deleteBanner( _this );
        	} );

        	var moveLeft = $( window ).width();
			$("#addBanner").animate( {"left":moveLeft,"marginLeft":moveLeft} ,500);

        	$("#previewPagePopup").find(".setting").animate( {"left":"50%"} ,500);


        } );


        	// banner 编辑按钮
		$("#courseCatalog").find("span").on("click",function(){
			$("body").css( "overflow","hidden" );
			showBanner();
		});

			// banner 添加内容图标

		$("#courseCatalog").siblings(".bannerImg").find(".addDagangBtn").on("click",function(){
			showBanner();
			$("body").css( "overflow","hidden" );
		});


		function showBanner(){
			$("#previewPagePopup").show();
			$("#previewPagePopup").children().hide();
			$("#mask").show();
			$("#previewPagePopup").find(".setting").css("left","50%");
			$("#addBanner").css({"left":"50%","marginLeft":"-540px"});
			$("#previewPagePopup").find(".setting").show();
			$("#addBanner").hide();
		}


	// banner图设置 E

	// 点击小三角 S
	$("#addBanner").find(".hideLeft").on("click",function(){
		if( !($(this).hasClass("showLeft")) ){
			$("#addBanner").find(".standard").hide();
			$("#addBanner").find(".content").css("paddingLeft","0px");
			$("#addBanner").find(".upload").css("width","100%");
		}else{
			$("#addBanner").find(".standard").show();
			$("#addBanner").find(".upload").css("width","508px");
			$("#addBanner").find(".content").css("paddingLeft","20px");
		}
		$(this).toggleClass( "showLeft" );
		$("#addBanner").find(".small").toggleClass( "changeBig" );
	});	

	// 点击小三角 E

	// 关闭弹出层
	$("#previewPagePopup").find(".header").find(".closePopup").on("click",function(){
		$("#previewPagePopup").hide();
		$("body").css( "overflow","visible" );
		$("#previewPagePopup").children().css( {"left":"50%","marginLeft":"-540px"} );
		$("#mask").css( {"left":"0px","marginLeft":"0px"} );
	});





	// 课程目录弹出框返回
	$("#previewPagePopup").find(".setting").find(".return").on( "click",function(){
		$("#previewPagePopup").find(".setting").hide();
		$("body").css( "overflow","visible" );
		$("#previewPagePopup").hide();
	} );

	// 展开新增banner弹出框
	$("#previewPagePopup").find(".setting").find(".addCourse").on("click",function(){
		$("#previewPagePopup").find(".setting").animate( {"left":"-1080px"} ,500);
		$("#addBanner").animate({"left":"50%","marginLeft":"-540px"});
		
		setTimeout( function(){
			$("#addBanner").show();
		},500 );
	});

	// 新增banner弹出框返回按钮
	$("#addBanner").find(".return").on("click",function(){
		var moveLeft = $( window ).width();
		$("#addBanner").animate( {"left":moveLeft,"marginLeft":moveLeft} ,500);
		$("#previewPagePopup").find(".setting").animate( {"left":"50%"} ,500);
	});

	// 新增banner弹出框返回图标

	$("#addBanner").find(".add").on("click",function(){
		var moveLeft = $( window ).width();
		$("#addBanner").animate( {"left":moveLeft,"marginLeft":moveLeft} ,500);
		$("#previewPagePopup").find(".setting").animate( {"left":"50%"} ,500);
	});

	// 展开公告弹框 S
		$("#noticeEdit").find("span").on("click",function(){
			showNotice();
			$("body").css( "overflow","hidden" );
		});

		$("#noticeEdit").siblings(".notice").find(".addDagangBtn").on("click",function(){
			showNotice();
			$("body").css( "overflow","hidden" );
		});

		function showNotice(){
			$("#previewPagePopup").show();
			$("#previewPagePopup").children().hide();
			$("#mask").show();
			$("#notice").show();
			$("#addNotice").hide();
		}


		// 返回按钮
		$("#notice").find(".return").on( "click",function(){
			$("#previewPagePopup").hide();
			$("body").css( "overflow","visible" );
			$("#notice").hide();
		} );

		// 置顶按钮
		$("#notice").find(".top").on( "click",function(){
			$(this).toggleClass( "first" );
		} );

		// 编辑按钮
		$("#notice").find(".edits").on( "click",function(){
			var _this = $( this );
			edidt( _this );
		} );

		// 编辑方法

		function edidt( obj ){
			var _index = obj.parent().parent().index();
			var value = obj.parents("tr").find("td").first().text();
			$("#addNotice").find(".noticeName").find("input").val( value );
			$("#addNotice").attr( "target", _index );
			$("#addNotice").animate( {"left":"50%","marginLeft":"-540px"},500 );
			$("#notice").animate( {"left":"-540px"},500 );
			
			if( obj.hasClass("addCourse") ){
				$("#addNotice").removeAttr( "target" );
				$("#addNotice").find(".noticeName").find("input").val( "" );
			}
			setTimeout( function(){
				$("#addNotice").show();
			},500 );

		}

		// 删除按钮
		$("#notice").find(".delete").on( "click",function(){
			var _this = $(this);
			deleteNotice( _this );
		} );

		// 删除方法

		function deleteNotice( obj ){
			obj.parent().parent().remove();
		}

		// 保存按钮
		$("#notice").find(".save").on( "click",function(){
			$("body").css( "overflow","visible" );
			var arr = [];
			var topTr = $("#tableWrap").find("tbody").find("tr");
			for(var i = 0;i<topTr.length;i++){
				if( topTr.eq(i).find(".top").hasClass("first") ){
					var str = topTr.eq(i).find("td").first().text();
					arr.push( str );
				}
			}
			if( arr.length>0 ){
				var noticeLi = $(".notice").find("li");
				for(var i = 0;i<arr.length;i++){
					noticeLi.eq(i).find("a").text(arr[i] );
				}
				$(".notice").find(".addDagangBtn").css( "display","none" );
			}
			$(".notice").removeClass( "init" );
			$("#notice").hide();
			$("#previewPagePopup").hide();

		} );


		// 新增公告按钮
		$("#notice").find(".addCourse").on( "click",function(){
			$("#addNotice").animate( {"left":"50%","marginLeft":"-540px"},500 );
			$("#notice").animate( {"left":"-540px"},500 );
			$("#addNotice").find(".noticeName").find("input").val( "" );
			$("#addNotice").removeAttr( "target" );
			setTimeout( function(){
				$("#addNotice").show();
			},500 );
		} );

		// 新增公告返回
		$("#addNotice").find(".add").on( "click",function(){
			var moveLeft = $(window).width();
			$("#addNotice").animate( {"left":moveLeft,"marginLeft":"540px"} );
			$("#notice").animate( {"left":"50%"} );
		} );

		// 新增公告返回
		$("#addNotice").find(".cancel").on( "click",function(){
			var moveLeft = $(window).width();
			$("#addNotice").animate( {"left":moveLeft,"marginLeft":"540px"} );
			$("#notice").animate( {"left":"50%"} );
		} );

		// 新增公告保存
		$("#addNotice").find(".save").on( "click",function(){
			var moveLeft = $(window).width();
			if( $("#addNotice").attr("target") ){
				var _index = $("#addNotice").attr("target");
				var title = $("#addNotice").find(".noticeName").find("input").val();
				$("#tableWrap").find("tbody").find("tr").eq( _index ).find("td").first().text( title );
				
			}else{
				if( $("#addNotice").find(".noticeName").find("input").val() == "" ){
					alert( "请输入内容" );
					return;
				}else{
					var str = '<tr>'
						+	'<td>'+ $("#addNotice").find(".noticeName").find("input").val() +'</td>'
						+	'<td>dongzhiwu6789</td>'
						+	'<td>2016-09-21</td>'
						+	'<td class="opration">'
						+		'<a href="javascript:void(0);" class="fl top">置顶</a>'
						+		'<a href="javascript:void(0);" class="fl edits"></a>'
						+		'<a href="javascript:void(0);" class="fl delete"></a>'
						+	'</td>'
						+ '</tr>';
					$("#tableWrap").find("tbody").append( str );

					// 编辑按钮
					$("#notice").find(".edits").on( "click",function(){
						var _this = $( this );
						edidt( _this );
					} );

					// 删除按钮
					$("#notice").find(".delete").on( "click",function(){
						var _this = $(this);
						deleteNotice( _this );
					} );

					// 置顶按钮
					$("#tableWrap").find("tr").last().find(".top").on( "click",function(){
						$(this).toggleClass( "first" );
					} );
				}
			}

			$("#addNotice").animate( {"left":moveLeft,"marginLeft":"0px"},500 );
			$("#notice").animate( {"left":"50%"},500 );
		} );


	// 展开公告弹框 E

	// 展开快速入口弹窗 S
	$("#entryEdit").find("span").on( "click",function(){
		$("body").css( "overflow","hidden" );
		showEntry();
	} );

	$("#entryEdit").siblings(".quickEntry").find(".addDagangBtn").on( "click",function(){
		showEntry();
		$("body").css( "overflow","hidden" );
	} );

	function showEntry(){
		$("#previewPagePopup").show();
		$("#previewPagePopup").children().hide();
		$("#mask").show();
		$("#queickEntry").show();
	}

		// 编辑按钮
	$("#queickEntry").find(".editor").on( "click",function(){
		var liIndex = $(this).parents("li").index();
		var iconSrc = $(this).siblings().find("img").attr( "src" );
		$("#addqueickEntry").attr( "target",liIndex );
		$("#addqueickEntry").find("img").attr( "src",iconSrc );
		$("#addqueickEntry").find(".name").val( $(this).siblings().find("p").eq(0).text() );
		$("#addqueickEntry").find(".inputContent").val( $(this).siblings().find("p").eq(1).text() );
		$("#queickEntry").animate( {"left":"-50%"},500 );
		$("#addqueickEntry").animate( {"left":"50%","marginLeft":"-540px"},500 );
		setTimeout( function(){
			$("#addqueickEntry").show();
		},500 );
	} );

		// 删除按钮
	$("#queickEntry").find(".delete").on( "click",function(){
		var _this = $(this);
		del( _this );
	} );


		// 取消按钮
	$("#queickEntry").find(".bottom").find(".cancel").on( "click",function(){
		$("#queickEntry").hide();
		$("body").css( "overflow","visible" );
		$("#previewPagePopup").hide();
	} );

		// 保存按钮

	$("#queickEntry").find(".bottom").find(".save").on( "click",function(){
		$("body").css( "overflow","visible" );
		var editLi = $("#queickEntry").find("li");
		var showLi = $(".quickEntry").find( "li" );
		if( editLi.length > 0 ){
			for( var i = 0;i<4;i++ ){
				showLi.eq(i).find("img").attr( "src",editLi.eq(i).find("img").attr("src"));
				showLi.eq(i).find("p").eq(0).text( editLi.eq(i).find("p").eq(0).text() );
				showLi.eq(i).find("p").eq(1).text( editLi.eq(i).find("p").eq(1).text() );
			}
			$(".quickEntry").removeClass( "init" );
			$(".quickEntry").find(".addDagangBtn").hide();
		}
		$("#queickEntry").hide();
		$("#previewPagePopup").hide();
	} );


	// 展开快速入口弹窗 E

	// 编辑快速入口弹窗 S

		// 返回图标
	$("#addqueickEntry").find(".add").on( "click",function(){
		$("#addqueickEntry").animate({"left":"100%","marginLeft":"0px"});
		$("#queickEntry").animate( {"left":"50%"} );
	} );

		// 返回按钮
	$("#addqueickEntry").find(".return").on( "click",function(){
		$("#addqueickEntry").animate({"left":"100%","marginLeft":"0px"});
		$("#queickEntry").animate( {"left":"50%"} );
	} );

		// 上传按钮

		var uploadIconSrc = "";

		function previewIcon(file)
        {
          var MAXWIDTH  = 260; 
          var MAXHEIGHT = 180;
          var div = document.getElementById('previewIcon');
          if (file.files && file.files[0])
          {
              div.innerHTML ='<img id=imghead>';
              var img = document.getElementById('imghead');
              var reader = new FileReader();
              reader.onload = function(evt){
              	uploadIconSrc = img.src = evt.target.result;
              }
              reader.readAsDataURL(file.files[0]);
          }
          else //兼容IE
          {
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=imghead>';
            var img = document.getElementById('imghead');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            div.innerHTML = "<div id=divhead style='width:100%;height:100%;margin-top:0px;"+sFilter+src+"\"'></div>";
            uploadIconSrc = file.value;
          }
        }


		// 保存按钮

	$("#addqueickEntry").find(".save").on( "click",function(){

		var title = $("#addqueickEntry").find(".name").val();
		var content = $("#addqueickEntry").find(".inputContent").val();
		var targetLi = $("#queickEntry").find("li").eq( $("#addqueickEntry").attr( "target" ) );

		targetLi.find("p").eq(0).text( title );
		targetLi.find("p").eq(1).text( content );
		targetLi.find("img").attr( "src", uploadIconSrc);

		$("#addqueickEntry").animate({"left":"100%","marginLeft":"0px"});
		$("#queickEntry").animate( {"left":"50%"} );
	} );

	// 编辑快速入口弹窗 E

	// 编辑卡片窗口 S
		// 窗口弹出 S
	$("#cardEditBtn").on( "click",function(){
		$("body").css( "overflow","hidden" );
		showCardEdit();
	} );

	$("#cardWrap").find(".addDagangBtn").on( "click",function(){
		showCardEdit();
		$("body").css( "overflow","hidden" );
	} );

	function showCardEdit(){
		$("#previewPagePopup").show();
		$("#previewPagePopup").children().hide();
		$("#mask").show();
		$("#cardEdit").show();
	}
		// 窗口弹出 E

		// 群组鼠标滑入效果
	$("#cardEdit").find(".header").hover(function(){
		$(this).addClass( "hov" );
	},function(){
		$(this).removeClass( "hov" );
	} );

		// 群组鼠标点击效果
	$("#cardEdit").find(".content").find(".header").on( "click",function(){
		var _this = $(this);
		tabCardList( _this );		
	} );

	// 显示隐藏左侧内容

	function tabCardList( obj ){
		var leftCard = obj.siblings().find("li");
		var rightCard = $("#cardEdit").find(".right").find("li");
		obj.toggleClass( "active" );
		if( obj.hasClass("active") ){
			obj.siblings().slideDown();
			for( var i = 0;i<rightCard.length;i++ ){
				rightCard.eq(i).removeClass( "active" );
				for( var j = 0;j<leftCard.length;j++ ){
					if( leftCard.eq(j).find(".text").text() == rightCard.eq(i).find("p").text()  ){
						rightCard.eq(i).addClass( "active" );
					}
				}
			}
		}else{
			obj.siblings().slideUp();
			for( var i = 0;i<rightCard.length;i++ ){
				rightCard.eq(i).removeClass( "active" );
			}
		}
	}

		// 卡片栏目选择
	$("#cardEdit").find(".floatList").find("li").on( "click",function(){
		var groupDom = $("#cardEdit").find(".group");
		var len = groupDom.length;
		if( !($(this).hasClass("active")) ){
			var str = '<li><span class="text">'+ $(this).find("p").text() +'</span><span class="bg"></span></li>';
			for(var i = 0;i<len;i++){
				if( groupDom.eq(i).find(".header").hasClass("active") ){
					var liDom = groupDom.eq(i).find("ul").find("li");
					for(var j = 0; j<liDom.length;j++){
						if( liDom.eq(j).find(".text").text() == $(this).find("p").text() ){
							liDom.eq(j).remove();
							return;
						}
					}
					groupDom.eq(i).find(".list").prepend( str );
					groupDom.eq(i).find(".list").find("li").first().find(".bg").on( "click",function(){
						var _this = $( this );
						delCard( _this );
					} );
				}
			}
		}else{
			for(var i = 0;i<len;i++){
				if( groupDom.eq(i).find(".header").hasClass("active") ){
					var liDom = groupDom.eq(i).find("ul").find("li");
					for(var j = 0; j<liDom.length;j++){
						if( liDom.eq(j).text() == $(this).find("p").text() ){
							liDom.eq(j).remove();
						}
					}
				}
			}
		}
		$(this).toggleClass("active");
	} );

		// 返回按钮
	$("#cardEdit").find(".cancel").on("click",function(){
		$("#cardEdit").hide();
		$("body").css( "overflow","visible" );
		$("#previewPagePopup").hide();
	});

		// 保存按钮
	$("#cardEdit").find(".save").on( "click",function(){
		$("body").css( "overflow","visible" );
		$("#cardEdit").find(".right").find("li").removeClass("active");
		var groupDom = $("#cardEdit").find(".group");
		if( groupDom.length == 0 ){
			return;
		}else{
			var cardWrap = $("#cardWrap");
			cardWrap.find(".cardManage").remove();
			for(var i = 0;i<groupDom.length;i++){
				var str = '<div class="cardManage init">'
					+	'<div class="header">'
					+		'<span class="name">'+ groupDom.eq(i).find(".name").find(".text").text() +'</span>'
					+		'<ul class="floatList navList"></ul>'
					+	'</div>'
					+	'<div class="content"></div>'
					+ '</div>';

				cardWrap.append( str );
				var groupLi = groupDom.eq(i).find(".list").find("li");

				for(var j = 0;j<groupLi.length;j++){
					var liDom = '<li><a href="javascript:void(0);">'+ groupLi.eq(j).text() +'</a></li>';
					cardWrap.find(".cardManage").eq(i).find(".header").find("ul").append( liDom );
					cardWrap.find(".cardManage").eq(i).find(".header").find("li").first().addClass( "active" );
					cardWrap.find(".cardManage").eq(i).find(".header").find("li").hover(function(){
						$(this).siblings().removeClass("active");
						$(this).addClass( "active" );
					});

					cardWrap.find(".cardManage").eq(i).find(".header").find("li").on( "click",function(){
						var _this = $(this);
						cardTab( _this );						
					} );

					var cardContent = '<div class="contentWrap">'
							+	'<ul class="floatList col4 courseList">'
							+		'<li>'
							+			'<div class="liBox">'
							+				'<img src="images/card0.jpg">'
							+				'<p class="title"> 交互与视觉设计入门'+j+'</p>'
							+			'</div>'
							+		'</li>'
							+		'<li>'
							+			'<div class="liBox">'
							+				'<img src="images/card01.jpg">'
							+				'<p class="title"> 交互与视觉设计入门</p>'
							+			'</div>'
							+		'</li>'
							+		'<li>'
							+			'<div class="liBox">'
							+				'<img src="images/card02.jpg">'
							+				'<p class="title"> 交互与视觉设计入门</p>'
							+			'</div>'
							+		'</li>'
							+		'<li>'
							+			'<div class="liBox">'
							+				'<img src="images/card03.jpg">'
							+				'<p class="title"> 交互与视觉设计入门</p>'
							+			'</div>'
							+		'</li>'
							+	'</ul>'
							+ '</div>';
					cardWrap.find(".cardManage").eq(i).find(".content").append( cardContent );
					cardWrap.find(".cardManage").eq(i).find(".contentWrap").eq(0).addClass("active");						
				}
			}
			$("#cardWrap").find(".addDagangBtn").hide();
			$("#cardWrap").find(".cardManage").show();
		}

		$("#cardEdit").find(".header").removeClass("active");
		$("#cardEdit").hide();
		$("#previewPagePopup").hide();
	} );

	// 切换卡片显示内容

	function tabCardContent( obj ){

	}

		// 发布按钮
	$("#cardEdit").find(".release").on( "click",function(){
		$("#cardEdit").find(".group").removeClass( "addElement" );
		$("#cardEdit").find(".group").find(".header").removeClass( "active" );
		$(this).css( "display","none" );
		$(this).siblings(".save").css( "display","block" );
	} );

		// 编辑按钮

	$("#cardEdit").find(".edits").on( "click",function(event){
		var _this = $( this );
		cardEdit( _this );
		event.stopPropagation();
	} );

	function cardEdit( obj ){
		obj.parents( ".group" ).find(".header").addClass( "editStatu" );
	}

		// 确定按钮

	$("#cardEdit").find(".sure").on( "click",function(event){
		var _this = $( this );
		sureMsg( _this );
		event.stopPropagation();
	} );

	function sureMsg( obj ){
		var inputMsg = obj.parent().siblings( ".name" ).find("input").val();
		if( inputMsg == "" ){
			return;
		}else if( inputMsg == "卡片名称:" ){
			return;
		}else{
			obj.parent().siblings( ".name" ).find(".cardName").find(".inputText").text( inputMsg );
			obj.parents( ".header" ).removeClass( "editStatu" );
		}
	}

		// 输入框

	$("#cardEdit").find(".name").find("input").on( "click",function(event){
		event.stopPropagation();
	} );

	$("#cardEdit").find(".name").find("input").on( "focus",function(){
		var _this = $(this);
		inputValue( _this );
	} );

	function inputValue( obj ){
		obj.val( "" );
		obj.removeClass( "init" );
	}

		// 群组选择下拉框

	$("#cardEdit").find(".team").on( "click",function(event){
		var _this = $( this );
		if( _this.parents(".header").hasClass("editStatu") ){
			dropDowm(_this);
		}else{
			var thisHead = _this.parents( ".header" );
			tabCardList( thisHead );
		}
		event.stopPropagation();
	} );

	function dropDowm(obj){
		obj.find("ul").css( "display","block" );
	}

		// 选择群组

	$("#cardEdit").find(".team").find("li").on( "click",function(event){
		var _this = $(this);
		selectGroup( _this );
		event.stopPropagation();
	} );

	function selectGroup( obj ){
		obj.parent().siblings(".text").text( obj.text() );
		obj.parent().css( "display","none" );
	}

		// 群组删除按钮
	$("#cardEdit").find(".del").on( "click",function(){
		$(this).parents(".group").remove();
	} );

		// 卡片删除按钮
	$("#cardEdit").find(".list").find(".bg").on( "click",function(){
		var _this = $( this );
		delCard( _this );
	} );

	function delCard(obj){
		var rightCard = $("#cardEdit").find(".right").find("li");
		for(var i = 0;i<rightCard.length;i++){
			if( rightCard.eq(i).find("p").text() == obj.siblings().text() ){
				rightCard.eq(i).removeClass( "active" );
			}		
		}
		obj.parent().remove();
	}

		// 添加按钮
	$("#cardEdit").find(".add").on( "click",function(){

		// 是否已在添加状态

		if( $("#cardEdit").find(".header").hasClass("editStatu") ){
			return;
		}		

		// 显示发布按钮
		$("#cardEdit").find(".save").hide();
		$("#cardEdit").find(".release").show();

		$("#cardEdit").find(".right").find("li").removeClass("active");


		var str = '<div class="group">'
				+		'<div class="header editStatu clearfix hov">'
				+			'<div class="wrap">'
				+				'<span class="bg fl"></span>'
				+				'<div class="name fl">'
				+					'<div class="cardName fl">'
				+						'<span class="text">卡片名称:</span>'
				+						'<span class="inputText"></span>'
				+					'</div>'
				+					'<input type="text" value="卡片名称:" class="init" />'
				+				'</div>'
				+				'<div class="team fl">'
				+					'<span class="teamName">群组:</span>'
				+					'<span class="text">bg消费者大群</span>'
				+					'<span class="downIcon"></span>'
				+					'<ul>'
				+						'<li>bg消费者大群</li>'
				+						'<li>bg1</li>'
				+						'<li>bg2</li>'
				+						'<li>bg3</li>'
				+					'</ul>'
				+				'</div>'
				+				'<div class="btns fr clearfix">'
				+					'<a href="javascript:void(0);" class="sure fl"></a>'
				+					'<a href="javascript:void(0);" class="edits fl"></a>'
				+					'<a href="javascript:void(0);" class="del fl"></a>'
				+				'</div>'
				+			'</div>'
				+		'</div>'
				+		'<ul class="list" style="display: none;"></ul>'
				+  '</div>';
		$("#cardEdit").find(".left").append( str );

		var thisHead = $("#cardEdit").find(".content").find(".header").eq( $("#cardEdit").find(".content").find(".header").length-1 );

			// 群组鼠标点击效果
		thisHead.on( "click",function(){
			var _this = $(this);
			tabCardList( _this );
		} );

			// 群组鼠标滑入效果
		$("#cardEdit").find(".header").hover(function(){
			$(this).addClass( "hov" );
		},function(){
			$(this).removeClass( "hov" );
		} );

			// 编辑按钮点击事件注册

		thisHead.find(".edits").on( "click",function(event){
			var _this = $( this );
			cardEdit( _this );
			event.stopPropagation();
		} );

			// 输入框事件注册

		thisHead.find(".name").find("input").on( "click",function(event){
			event.stopPropagation();
		} );

		thisHead.find(".name").find("input").on( "focus",function(event){
			var _this = $(this);
			inputValue( _this );
		} );

			// 确定按钮事件注册

		thisHead.find(".sure").on( "click",function(event){
			var _this = $( this );
			sureMsg( _this );
			event.stopPropagation();
		} );

			// 群组下拉事件注册

		thisHead.find(".team").on( "click",function(event){
			var _this = $( this );
			if( _this.parents(".header").hasClass("editStatu") ){
				dropDowm(_this);
			}else{
				var thisHead = _this.parents( ".header" );
				tabCardList( thisHead );
			}
			event.stopPropagation();
		} );

			// 群组列表事件注册

		thisHead.find(".team").find("li").on( "click",function(event){
			var _this = $(this);
			selectGroup( _this );
			event.stopPropagation();
		} );

			// 删除按钮事件注册

		thisHead.find(".del").on( "click",function(){
			$(this).parents(".group").remove();
		} );




	} );

	// 编辑卡片窗口 E

	// 切换移动端 S

		// 获取距离顶部的距离 281
		// var contentWrapTop;

	$(".previewTab").find("span").on( "click",function(){
		$(this).siblings().removeClass( "active" );
		$(this).addClass( "active" );
		$(".tabContent").removeClass( "current" );
		$(".tabContent").eq( $(this).index() ).addClass( "current" );

		// 设置 contentWrap 高度 S
		if( $(".mobileContent").hasClass("current") ){

			// 隐藏右侧悬浮框

			$("#suspensionSurvey").hide();

			// contentWrapTop = $(".mobileContent").find(".contentWrap").offset().top;

			// // contentWrap 的高度计算

			// var contentWrapHeight = (windowHeight - contentWrapTop - 58 - 58 - 28)+"px";
			// $( ".mobileContent" ).find( ".contentWrap" ).css( {"height": contentWrapHeight} );

		// 设置 contentWrap 高度 E

		}else{
			// 显示右侧悬浮框

			$("#suspensionSurvey").show();
		}
	} );

	// 切换移动端 E

	// 悬浮框 S

		// 展开悬浮框
	$("#suspensionSurvey").on( "click",function(){
		$("#suspensionContent").animate( {"right":"0px"} );
	} );


		// 关闭悬浮框
	$("#suspensionContent").find(".close").on( "click",function(){
		$("#suspensionContent").animate( {"right":"-188px"} );
	} );

	// 悬浮框 E

	// 移动端高度 S

		// 获取窗口高度 671
		var windowHeight = $(window).height();

		// banner 弹框显示

		$(".mobileContent").find(".banner").find("span").on( "click",function(){
			$("#previewPagePopup").show();
			$("#previewPagePopup").children().hide();
			$("#mask").show();
			$("#mobileBanner").show();
		} );


		// banner图设置 S
			// banner图对象数组
			var mbannerLi = $("#mobileBanner").find(".floatList").find("li");
			// 选中banner图所在列表
			var mselectedUl = $("#mobileBanner").find( ".selectedList" );
			// 选中li的宽度
			var mliWidth;

			var msrcArr = [];

			// 为banner图加上唯一属性
			var mbannerLength = mbannerLi.length;
			for(var i = 0;i< mbannerLength;i++){
				mbannerLi.eq(i).attr( "index",i );
			}

			// banner图选择
			mbannerLi.click(function(){
				if( !($(this).find("span").hasClass("active")) ){
					mliWidth = 245;
					msrcArr.push( $(this).find("img").attr("src") );
					var addLi = "<li index="+$(this).attr("index")+">"
							+		"<img src='"+$(this).find("img").attr("src") +"' />"
							+		"<span></span>"
							+	"</li>";
					mselectedUl.append( addLi );
					mselectedUl.css( "display","block" );
					if( mselectedUl.children('li').length > 4 ){
						mselectedUl.css( "width", (mselectedUl.children('li').length+1) * mliWidth + 20 +"px" );
					};
					$("#mobileBanner").find(".selectedList").find("li").find("span").on( "click",function(){
						var _this = this;
						deletemBanner( _this );
						for(var i = 0;i<msrcArr.length;i++ ){
							if( msrcArr[i] == $(this).siblings().attr("src") ){
								msrcArr.splice(i,1);
							}
						}
					} );

				}else{
					for( var i = 0;i<mselectedUl.children('li').length;i++ ){
						if( mselectedUl.find("li").eq(i).attr("index") == $(this).attr("index") ){
							mselectedUl.find("li").eq(i).remove();
							msrcArr.splice(i,1);
						}
					}
					if( mselectedUl.children('li').length == 0 ){
						mselectedUl.css( "display","none" );
					};
					if( mselectedUl.children('li').length <= 4 ){
						mselectedUl.css( "width", 4 * mliWidth + 80 +"px" );
					};
				}
				$(this).find("span").toggleClass("active");
			});
			// 从选中banner图中删除

			function deletemBanner(obj){
				$(obj).parent().remove();
				if( mselectedUl.children('li').length == 0 ){
						mselectedUl.css( "display","none" );
					};
				for( var i = 0;i<bannerLength;i++ ){
					if( mbannerLi.eq( i ).attr("index") == $(obj).parent().attr("index") ){
						mbannerLi.eq( i ).find("span").removeClass("active");
					}
				}
			}

			// 返回按钮

			$("#mobileBanner").find(".return").on( "click",function(){
				$("#mobileBanner").hide();
				$("#previewPagePopup").hide();
			} );

			// 保存按钮

			$("#mobileBanner").find(".save").on( "click",function(){
				var selectedLi = $("#mobileBanner").find(".selectedBanner").find("li");
				$(".mobileContent").find(".banner").find("img").attr( "src", msrcArr[0] );
				if( msrcArr.length > 0 ){
					$(".mobileContent").find(".contentWrap").addClass( "edited" );
				}
				$("#mobileBanner").hide();
				$("#previewPagePopup").hide();
			} );

			// 新增 banner S

				// 显示新增banner 弹框

				$("#mobileBanner").find(".addCourse").on( "click",function(){
					$("#mobileBanner").hide();
					$("#maddBanner").show();
				} );


				// 返回按钮

				$("#maddBanner").find(".return").on( "click",function(){
					$("#mobileBanner").show();
					$("#maddBanner").hide();
				} );

				// 返回图标
				$("#maddBanner").find(".add").on( "click",function(){
					$("#mobileBanner").show();
					$("#maddBanner").hide();
				} );

				// 点击小三角 S
			$("#maddBanner").find(".hideLeft").on("click",function(){
				if( !($(this).hasClass("showLeft")) ){
					$("#maddBanner").find(".standard").hide();
					$("#maddBanner").find(".content").css("paddingLeft","0px");
					$("#maddBanner").find(".upload").css("width","100%");
				}else{
					$("#maddBanner").find(".standard").show();
					$("#maddBanner").find(".upload").css("width","508px");
					$("#maddBanner").find(".content").css("paddingLeft","20px");
				}
				$(this).toggleClass( "showLeft" );
				$("#maddBanner").find(".small").toggleClass( "changeBig" );
			});	

				// 点击小三角 E
			// 新增 banner E
			
		// banner图设置 E



		// 快捷入口编辑

			// 显示快捷入口弹窗 S

		$(".mobileContent").find(".quickEntry").find(".edit").on( "click",function(){
			$("#previewPagePopup").show();
			$("#previewPagePopup").children().hide();
			$("#mask").show();
			$("#mqueickEntry").show();
		} );

			// 显示快捷入口弹窗 E

			// 返回按钮 S

		$("#mqueickEntry").find(".cancel").on( "click",function(){
			$("#mqueickEntry").hide();
			$("#previewPagePopup").hide();
		} );

			// 返回按钮 E


			// 编辑按钮
		$("#mqueickEntry").find(".editor").on( "click",function(){
			var _this = $(this);
			medit( _this );
		} );

			// 编辑方法

		function medit( obj ){
			var _index = obj.parents("li").index();
			var title = obj.parents("li").find(".desc").children().first().text();
			var content = obj.parents("li").find(".gray").text();
			$("#mqueickEntry").hide();
			$("#maddqueickEntry").attr( "target",_index );
			$("#maddqueickEntry").show();
			$("#maddqueickEntry").find(".name").val( title );
			$("#maddqueickEntry").find(".inputContent").val( content );
		}

			// 删除按钮
		$("#mqueickEntry").find(".delete").on( "click",function(){
			var _this = $(this);
			mdel( _this );
		} );

			// 删除方法

		function mdel( obj ){
			obj.parents("li").remove();
		}


			// 取消按钮
		$("#mqueickEntry").find(".bottom").find(".cancel").on( "click",function(){
			$("#mqueickEntry").hide();
			$("#previewPagePopup").hide();
		} );

			// 保存按钮

		$("#mqueickEntry").find(".bottom").find(".save").on( "click",function(){
			var selectedLi = $("#mqueickEntry").find("li");
			var showLi = $(".mobileContent").find("li");
			// alert( showLi.length );
			// return;
			for(var i = 0;i<4;i++){
				showLi.eq(i).find(".img").find("img").attr( "src",selectedLi.eq(i).find(".descript").find("img").attr("src") );
				showLi.eq(i).find("p").text( selectedLi.eq(i).find("p").eq(1).text() );
			}
			$(".mobileContent").find(".contentWrap").addClass( "edited" );
			$("#mqueickEntry").hide();
			$("#previewPagePopup").hide();
		} );

			// 新增入口按钮 S

		$("#mqueickEntry").find(".addCourse").on( "click",function(){
			$("#maddqueickEntry").removeAttr( "target" );
			$("#mqueickEntry").hide();
			$("#maddqueickEntry").show();
			$("#maddqueickEntry").find(".name").val("");
			$("#maddqueickEntry").find(".inputContent").val("");
		} );

			// 返回图标

		$("#maddqueickEntry").find(".add").on( "click",function(){
			$("#maddqueickEntry").hide();
			$("#mqueickEntry").show();
		} );




			// 新增入口按钮 E

			// 增加快捷入口 S

				// 返回按钮
			$("#maddqueickEntry").find(".return").on( "click",function(){
				$("#maddqueickEntry").hide();
				$("#mqueickEntry").show();
			} );

				// 保存按钮

			$("#maddqueickEntry").find(".save").on( "click",function(){

				var title = $("#maddqueickEntry").find(".name").val();
				var content = $("#maddqueickEntry").find(".inputContent").val();

				if( $("#maddqueickEntry").attr( "target" ) ){
					var liDom = $("#mqueickEntry").find("li");
					liDom.eq( $("#maddqueickEntry").attr( "target" ) ).find(".desc").find("p").eq(0).text( title );
					liDom.eq( $("#maddqueickEntry").attr( "target" ) ).find(".desc").find("p").eq(1).text( content );
				}else{
					if( $("#maddqueickEntry").find(".name").val() == '' ){
						return;
					}else{
						var str = '<li>'
								+	'<div class="liBox">'
								+		'<div class="clearfix descript">'
								+			'<div class="img fl"><span><img src="images/queitEntry02.jpg"></span></div>'
								+			'<div class="desc fr">'
								+				'<p>'+ title +'</p>'
								+				'<p class="f12 gray">'+ content +'</p>'
								+			'</div>'
								+		'</div>'
								+		'<div class="btnWrap">'
								+			'<a href="javascript:void(0);" class="delete fr"></a>'
								+			'<a href="javascript:void(0);" class="editor fr"></a>'
								+		'</div>'
								+	'</div>'
								+ '</li>'
						
						$("#mqueickEntry").find("ul").append( str );
						$("#mqueickEntry").find(".editor").on( "click",function(){
							var _this = $(this);
							medit( _this );
						} );
						$("#mqueickEntry").find(".delete").on( "click",function(){
							var _this = $(this);
							mdel( _this );
						} );
					}
					

				}

				$("#maddqueickEntry").hide();
				$("#mqueickEntry").show();
			} );

			// 增加快捷入口 E

			

			


	// 移动端高度 E

	
