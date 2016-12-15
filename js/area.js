// 专区logo上传 S
	
	var uploadSrc = "";
	var fileName = "";

	function previewImage(file)
    {
    	var arr = file.value.split("\\");
        fileName = arr[ arr.length-1 ];
      var div = document.getElementById('previewImg');
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

// 专区logo上传 E

// 单选

$(".area").find(".radioWrap").find("span").click(function(){
	$(this).siblings().removeClass("selected");
	$(this).addClass("selected");
});

// 文件选择

function uploadFile(file){
	var arr = file.value.split("\\");
	var fileName = arr[arr.length-1];
	$(file).siblings("input").val( fileName );
}

// 自定义内容

$(".area").find(".content").find(".radio").click(function(){
	if( $(this).hasClass("selected")  && ($(this).index() == 1) ){
		$(".area").find(".customContent").css("display","block");
	}else{
		$(".area").find(".customContent").css("display","none");
	}
});

// 客户端选择 S

$(".area").find(".client").find(".radio").click(function(){
	$(this).toggleClass( "selected" );
	if( $(this).hasClass("selected") ){
		if( $(this).hasClass("pc") ){
			$(".area").find(".pcClient").css("display","block");
		}else{
			$(".area").find(".mobileClient").css("display","block");
		}
	}else{
		if( $(this).hasClass("pc") ){
			$(".area").find(".pcClient").css("display","none");
		}else{
			$(".area").find(".mobileClient").css("display","none");
		}
	}
});

// 客户端选择 E



//显示标签列表
common.dropMenuTop(".btn.addTag", "open", ".addTags");

common.checkbox(".checkboxWrap", "selected");
//全选 列表显示
$(".courseList.listView th .checkboxWrap").click(function(){
	var parents =$(this).parents(".listView");
	if( $(this).hasClass("selected") ){
		parents.find(".checkboxWrap").addClass("selected");			
	}else{
		parents.find(".checkboxWrap").removeClass("selected");			
	}			 
});

//全选 大图显示

$(".courseListWrap").find(".checkboxWrap").click(function(){
	var liDom = $(this).parent().siblings().find("li");
	if( $(this).hasClass("selected") ){
		liDom.find(".checkboxWrap").addClass("selected");
	}else{
		liDom.find(".checkboxWrap").removeClass("selected");
	}
});



// 标签删除

$(".searchArea").find(".targsWrap").find("span").click(function(){
	$(this).remove();
});


//添加标签
		$(".addTags .tagsList .btnMin").click(function(){
			var pid = $(this).attr("data-pid");
			var selectedTagsBox = $(this).parents(".tagsWrap").find(".tagsListInner");
			if( selectedTagsBox.find(".btnMin[data-pid='" + pid + "']").length==0 ){
				$(this).parents(".tagsWrap").find(".tagsListInner").append( $(this).clone() );
			}else{
				alert("已添加，请重新选择！");	
			}
			delSelectedTag(); //删除已选中的标签
		});
		//删除已选中的标签
		function delSelectedTag(){
			$(".tagsWrap .selectedtags .tagsListInner .btnMin").click(function(){
				$(this).remove();
			});
		}
		delSelectedTag(); //删除已选中的标签
// 内容切换

$(".tabMenu").find(".navMenu").find("li").click(function(){
	$(this).siblings().removeClass("current");
	$(this).addClass("current");
	for(var i = 0;i<$(".listViewType").length;i++){
		$(".listViewType").eq(i).find(".courseListWrap").removeClass("current");
		$(".listViewType").eq(i).find(".courseListWrap").eq($(this).index()).addClass("current");
	}
});


//  切换内容显示形式

$(".tabMenu").find(".navType").find(".tabBtn").click(function(){
	$(this).siblings().removeClass("current");
	$(this).addClass("current");
	$(".listViewType").removeClass("show");
	$(".listViewType").eq($(this).index()-1).addClass("show");
});





//展开收起
	$(".search .searchForm .btnList .packUp").click(function(){
		var controlList = $(this).parents(".searchForm").find(".controlList"),
			controlListH = controlList[0].scrollHeight-20;
		if( $(this).hasClass("hide") ){
			$(this).removeClass("hide");
			controlList.css( "overflow","visible");
			controlList.animate({
				height: controlListH					
			});

		}else{
			$(this).addClass("hide");
			controlList.css( "overflow","hidden");
			controlList.animate({
				height: 75				
			});
		}


		var bodyH;
		var leftBarH = $(".leftBar").height();
		
		setTimeout(function(){
			bodyH = $("body").height();
			if( leftBarH < bodyH ){
				$(".leftBar").height( bodyH+70 );
			}
		},500);	
	});

// 下拉展示隐藏

	$(".searchArea").find(".selected").on("click",function(){
		$(this).siblings().slideToggle();
	});

// 下拉选中的值

	$(".searchArea").find(".options").find("p").on("click",function(){
		$(this).parent().siblings().find("span").text( $(this).text() );
		$(this).parent().slideUp();
	});


// 模块切换

	$("#moduleNav").find("li").on("click",function(){
		var tabBox = $("#moduleNav").siblings(".tabMoudle");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		tabBox.removeClass("show");
		tabBox.eq( $(this).index() ).addClass("show");
	});

// 删除模块

	$("#moduleNav").find(".bg").click( function(){
		$(this).parents("li").remove();
	} );

// 添加模块

	$("#moduleNav").find(".addBtn").click(function(){
		showDialog( $("#addMoudle") );
	});

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
			$("#previewPagePopup").find(".setting").css("left","50%");
			$("#addBanner").css({"left":"50%","marginLeft":"-540px"});
			$("#previewPagePopup").find(".setting").show();
			$("#addBanner").hide();
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
			
			var bannerLi = $(".bannerWrap").find("li");
			_this.toggleClass("active");
			
			selectBanner( _this );
		});

		// banner图选择方法

		function selectBanner( obj ){
			var selectedNum = 0;
			for(var i = 0;i<bannerLi.length;i++){
				if( bannerLi.eq(i).hasClass("active") ){
					selectedNum++;
				}
			}

			if( selectedNum > 1 ){
				$(obj).removeClass("active");
				return;
			}


			if( ($(obj).hasClass("active")) ){
				liWidth = 245;
				var addLi = "<li index="+$(obj).attr("index")+">"
						+		"<img src='"+$(obj).find("img").attr("src") +"' />"
						+		"<span></span>"
						+	"</li>";
				selectedUl.append( addLi );
				selectedUl.css( "display","block" );
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
			}
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
					bannerList.eq( i ).removeClass("active");
				}
			}
		}

		// 确定按钮

		$(".setting").find(".save").click(function(){
			var selectedSrc = $("#selectedList").find("img").attr("src");
			var str = '<li><img src="'+ selectedSrc +'"></li>';
			if( $("#selectedList").children().length != 0 ){
				$(".bannerImg").removeClass("init");
				$(".bannerImg").find("ul").empty();
				$(".bannerImg").find("ul").append( str );
			}
			closeDialog( $("#previewPagePopup").find(".setting") );
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


		// 新增banner弹出框返回图标

		$("#addBanner").find(".add").on("click",function(){
			var moveLeft = $( window ).width();
			$("#addBanner").animate( {"left":moveLeft,"marginLeft":moveLeft} ,500);
			$("#previewPagePopup").find(".setting").animate( {"left":"50%"} ,500);
		});


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


		// 关闭banner弹出层
		
		$("#previewPagePopup").find(".setting").find(".closePopup").click(function(){
			closeDialog( $("#previewPagePopup").find(".setting") );
		});

		// 新增banner弹出框返回按钮
		$("#addBanner").find(".return").on("click",function(){
			var moveLeft = $( window ).width();
			$("#addBanner").animate( {"left":moveLeft,"marginLeft":moveLeft} ,500);
			$("#previewPagePopup").find(".setting").animate( {"left":"50%"} ,500);
		});


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
        		_this.toggleClass("active");
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

		// 关闭新增banner弹出框

		$("#addBanner").find(".closePopup").click(function(){
			closeDialog( $("#addBanner") );
		});

		
		// 置顶按钮
		$("#noticeDialog").find(".top").on( "click",function(){
			$(this).toggleClass( "first" );
		} );

		// 删除按钮
		$("#noticeDialog").find(".delete").on( "click",function(){
			var _this = $(this);
			deleteNotice( _this );
		} );


		// 删除方法

		function deleteNotice( obj ){
			obj.parent().parent().remove();
		}


		// 返回按钮
		$("#noticeDialog").find(".return").on( "click",function(){
			closeDialog( $("#noticeDialog") );
		} );


		// 保存按钮
		$("#noticeDialog").find(".save").on( "click",function(){
			var arr = [];
			var topTr = $("#tableWrap").find("tbody").find("tr");
			for(var i = 0;i<topTr.length;i++){
				if( topTr.eq(i).find(".top").hasClass("first") ){
					var str = topTr.eq(i).find("td").first().text();
					arr.push( str );
				}
			}
			if( arr.length>0 ){
				var noticeLi = $("#notice").find("li");
				for(var i = 0;i<arr.length;i++){
					noticeLi.eq(i).find("span").eq(1).text(arr[i] );
				}
				$("#notice").find(".addDagangBtn").css( "display","none" );
			}
			$("#notice").find(".addDagangBtn").css("display","none");
			$("#notice").find("ul").css("display","block");

			closeDialog( $("#noticeDialog") );

		} );

		// 展开公告弹框 S
		$("#notice").find("span").on("click",function(){
			showNotice();
		});

		$("#notice").find(".addDagangBtn").on("click",function(){
			showNotice();
		});

		function showNotice(){
			$("#previewPagePopup").show();
			$("#noticeDialog").css("left","50%");
			$("#addNotice").css({"left":"50%","marginLeft":"-540px"});
			$("#noticeDialog").show();
			$("#addNotice").hide();
			$("body").css( "overflow","hidden" );
		}

		// 公告关闭

		$("#noticeDialog").find(".closePopup").click(function(){
			closeDialog( $("#noticeDialog") );
		});


		// 新增公告按钮
		$("#noticeDialog").find(".addCourse").on( "click",function(){
			$("#addNotice").animate( {"left":"50%","marginLeft":"-540px"},500 );
			$("#noticeDialog").animate( {"left":"-540px"},500 );
			$("#addNotice").find(".noticeName").find("input").val( "" );
			$("#addNotice").removeAttr( "target" );
			setTimeout( function(){
				$("#addNotice").show();
			},500 );
		} );


		// 新增公告返回图标
		$("#addNotice").find(".add").on( "click",function(){
			var moveLeft = $(window).width();
			$("#addNotice").animate( {"left":moveLeft,"marginLeft":"540px"} );
			$("#noticeDialog").animate( {"left":"50%"} );
		} );


		// 新增公告返回
		$("#addNotice").find(".cancel").on( "click",function(){
			var moveLeft = $(window).width();
			$("#addNotice").animate( {"left":moveLeft,"marginLeft":"540px"} );
			$("#noticeDialog").animate( {"left":"50%"} );
		} );


		// 编辑按钮
		$("#noticeDialog").find(".edits").on( "click",function(){
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
			$("#noticeDialog").animate( {"left":"-540px"},500 );
			
			if( obj.hasClass("addCourse") ){
				$("#addNotice").removeAttr( "target" );
				$("#addNotice").find(".noticeName").find("input").val( "" );
			}
			setTimeout( function(){
				$("#addNotice").show();
			},500 );

		}


		// 删除按钮
		$("#noticeDialog").find(".delete").on( "click",function(){
			var _this = $(this);
			deleteNotice( _this );
		} );

		// 删除方法

		function deleteNotice( obj ){
			obj.parent().parent().remove();
		}

		

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
						+		'<a href="javascript:void(0);" class="l top">置顶</a>'
						+		'<a href="javascript:void(0);" class="l edits"></a>'
						+		'<a href="javascript:void(0);" class="l delete"></a>'
						+	'</td>'
						+ '</tr>';
					$("#tableWrap").find("tbody").append( str );

					// 编辑按钮
					$("#noticeDialog").find(".edits").on( "click",function(){
						var _this = $( this );
						edidt( _this );
					} );

					// 删除按钮
					$("#noticeDialog").find(".delete").on( "click",function(){
						var _this = $(this);
						deleteNotice( _this );
					} );

					// 置顶按钮
					$("#noticeDialog").find("tr").last().find(".top").on( "click",function(){
						$(this).toggleClass( "first" );
					} );
				}
			}

			$("#addNotice").animate( {"left":moveLeft,"marginLeft":"0px"},500 );
			$("#noticeDialog").animate( {"left":"50%"},500 );
		} );

		// 新增公告关闭

		$("#addNotice").find(".closePopup").click(function(){
			closeDialog( $("#addNotice") );
		});

		// 热度讨论添加按钮

		$("#discuss").find(".addDagangBtn").click(function(){
			showDialog( $("#discussEdit") );
		});

		// 热度讨论编辑按钮

		$("#discuss").find(".edit").click(function(){
			showDialog( $("#discussEdit") );
		});

		// 推荐课程 S

		$("#courses").find(".addDagangBtn").click( function(){
			showDialog( $("#courseRecommend") );
		} );


		$("#courses").find(".edit").click( function(){
			$("body").css("overflow","hidden");
			$("#previewPagePopup").show();
			$("#courseRecommend").show();
		} );
		
		$("#courseRecommend").find("li").find("a").click( function(){
			var selectedDom = $("#courseRecommend").find(".active");
			if( selectedDom.length >= 4 ){
				$(this).parents("li").removeClass("active");
				return;
			}
			$(this).parents("li").toggleClass("active");
		} );

		// 返回按钮

		$("#courseRecommend").find(".return").click( function(){
			$("body").css("overflow","visible");
			$("#previewPagePopup").hide();
			$("#courseRecommend").hide();
		} );

		// 保存按钮

		$("#courseRecommend").find(".save").on("click",function(){
			var selectedDom = $("#courseRecommend").find(".active");
			var str = "";
			$("#courses").find("ul").empty();
			if( selectedDom.length > 0 ){
				for( var i = 0;i<selectedDom.length;i++ ){
					str += '<li>'
						+		'<div class="liBox">'
						+			'<img src="' + selectedDom.eq(i).find("img").attr("src") + '">'
						+			'<p class="title">'+ selectedDom.eq(i).find("p").find("span").text() +'</p>'
						+		'</div>'
						+	'</li>';
				}
				$("#courses").find("ul").append(str);
				$("#courses").find(".addDagangBtn").hide();
				$("#courses").find("ul").show();
			}else{
				$("#courses").find(".addDagangBtn").show();
				$("#courses").find("ul").hide();
			}

			closeDialog( $("#courseRecommend") );
		});

		// 关闭按钮

		$("#courseRecommend").find(".closePopup").click(function(){
			closeDialog( $("#courseRecommend") );
		});

		// 单选

		$("#addMoudle").find(".radio").click(function(){
			$(this).siblings().removeClass("selected");
			$(this).addClass("selected");
		});


		// 显示类型列表

		$("#addMoudle").find(".text").click(function(){
			$(this).siblings().slideToggle();
		});

		// 选择类型

		$("#addMoudle").find(".options").find("li").click( function(){
			$("#addMoudle").find(".text").find("span").text( $(this).text() );
			$("#addMoudle").find(".options").slideUp();
		} );

		// 保存按钮

		$("#addMoudle").find(".save").click(function(){
			var moudelName = $("#addMoudle").find(".moudleName").find("input").val();
			if( moudelName != "" ){
				var currentClass = '';
				var str = "";
				if( $("#addMoudle").find(".radioWrap").find(".selected").index() == 1 ){
					currentClass = "hide";
				}
				var str = '<li class="'+ currentClass +'">'
						+		'<div>'
						+			'<span>'+ moudelName +'</span>'
						+			'<span class="bg"></span>'
						+		'</div>'
						+		'<div class="line"></div>'
						+	'</li>';
				$("#moduleNav").find("ul").append( str );
				$("#moduleNav").find("li").last().find(".bg").click(function(){
					$(this).parents("li").remove();
				});
			}

			closeDialog( $("#addMoudle") );
		});

		// 关闭按钮

		$("#addMoudle").find(".closePopup").click(function(){
			closeDialog( $("#addMoudle") );
		});

		function showDialog( obj ){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").show();
			obj.show();
		}

		function closeDialog( obj ){
			$("body").css( "overflow","visible" );
			obj.hide();
			$("#previewPagePopup").hide();
		}

		// 讨论编辑弹框编辑按钮

		$("#discussEdit").find(".left").find(".top").find("a").click(function(){
			var len = $("#discussEdit").find(".left").find(".add").length;
			if( len >=1 ){
				return;
			}
			var str = '<li class="add">'
					+		'<span></span>'
					+		'<div>'
					+			'<input type="text" autofocus="autofocus">'
					+			'<a href="javascript:void(0);"></a>'
					+		'</div>'
					+	'</li>';
			$("#discussEdit").find(".left").find("ul").append(str);

			// 注册确认按钮

			$("#discussEdit").find(".left").find(".add").find("a").click(function(){
				var title = $(this).siblings().val();
				if( title == "" ){
					alert("请输入内容");
					return;
				}
				$(this).parent().siblings().text( title );
				$(this).parents("li").removeClass("add");
			});
		});

		// 讨论编辑弹框禁止按钮

		$("#discussEdit").find(".opra").click(function(){
			$(this).toggleClass("stop");
		});

		// 置顶按钮

		$("#discussEdit").find(".toTop").click( function(){
			var selected = $("#discussEdit").find(".right").find(".active");
			if ( selected.length >= 2 ) {
				$(this).parents("li").removeClass("active");
				return false;
			}
			$(this).parents("li").toggleClass( "active" );
		} );

		// 关闭按钮

		$("#discussEdit").find(".closePopup").click(function(){
			closeDialog( $("#discussEdit") );
		});

		// 确定按钮

		$("#discussEdit").find(".save").click(function(){
			var selected = $("#discussEdit").find(".right").find(".active");
			var shwoDom = $("#discuss").find(".contentList");
			if( selected.length > 0 ){
				for( var i = 0;i<selected.length; i++ ){
					shwoDom.eq(i).find("p").text( selected.eq(i).find("p").text() );
					shwoDom.eq(i).find("img").attr( "src", selected.eq(i).find("img").attr("src") );
				}
			}
			$("#discuss").find(".addBtnWrap").hide();
			$("#discuss").find(".contentList").show();
			closeDialog( $("#discussEdit") );
		});

		// 取消按钮

		$("#discussEdit").find(".return").click(function(){
			closeDialog( $("#discussEdit") );
		});

		// 公告模块弹窗

		$("#noticeMoudle").find(".edit").click(function(){
			showNoticeMoudle();
		});

		$("#noticeMoudleDialog").find(".closePopup").click(function(){
			closeDialog( $("#noticeMoudleDialog") );
		});

		function showNoticeMoudle(){
			$("#previewPagePopup").show();
			$("#noticeMoudleDialog").css("left","50%");
			$("#addNoticeMoudle").css({"left":"50%","marginLeft":"-540px"});
			$("#noticeMoudleDialog").show();
			$("#addNoticeMoudle").hide();
			$("body").css( "overflow","hidden" );
		}


		$("#noticeMoudleDialog").find(".addCourse").click(function(){
			$("#addNoticeMoudle").animate( {"left":"50%","marginLeft":"-540px"},500 );
			$("#noticeMoudleDialog").animate( {"left":"-540px"},500 );
			$("#addNoticeMoudle").find(".noticeName").find("input").val( "" );
			$("#addNoticeMoudle").removeAttr( "target" );
			setTimeout( function(){
				$("#addNoticeMoudle").show();
			},500 );
		});

		$("#noticeMoudleTable").find(".top").click(function(){
			$(this).toggleClass( "first" );
		});

		// 删除按钮
		$("#noticeMoudleTable").find(".delete").on( "click",function(){
			var _this = $(this);
			deleteNotice( _this );
		} );


		// 删除方法

		function deleteNotice( obj ){
			obj.parent().parent().remove();
		}

		// 返回按钮
		$("#noticeMoudleDialog").find(".return").on( "click",function(){
			closeDialog( $("#noticeMoudleDialog") );
		} );


		// 保存按钮
		$("#noticeMoudleDialog").find(".save").on( "click",function(){
			var arr = [];
			var topTr = $("#noticeMoudleTable").find("tbody").find("tr");
			for(var i = 0;i<topTr.length;i++){
				if( topTr.eq(i).find(".top").hasClass("first") ){
					var str = topTr.eq(i).find("td").first().text();
					arr.push( str );
				}
			}
			if( arr.length>0 ){
				var noticeLi = $("#noticeMoudle").find("li");
				for(var i = 0;i<arr.length;i++){
					noticeLi.eq(i).find("div").text(arr[i] );
				}
			}
			closeDialog( $("#noticeMoudleDialog") );

		} );

		// 返回图标

		$("#addNoticeMoudle").find(".add").click(function(){
			var moveLeft = $(window).width();
			$("#addNoticeMoudle").animate( {"left":moveLeft,"marginLeft":"540px"} );
			$("#noticeMoudleDialog").animate( {"left":"50%"} );
		});

		// 关闭按钮

		$("#addNoticeMoudle").find(".closePopup").click(function(){
			closeDialog( $("#addNoticeMoudle") );
		});

		// 返回按钮

		$("#addNoticeMoudle").find(".cancel").click(function(){
			var moveLeft = $(window).width();
			$("#addNoticeMoudle").animate( {"left":moveLeft,"marginLeft":"540px"} );
			$("#noticeMoudleDialog").animate( {"left":"50%"} );
		});

		// 保存按钮

		$("#addNoticeMoudle").find(".save").click(function(){
			var moveLeft = $(window).width();
			if( $("#addNoticeMoudle").attr("target") ){
				var _index = $("#addNoticeMoudle").attr("target");
				var title = $("#addNoticeMoudle").find(".noticeName").find("input").val();
				$("#noticeMoudleTable").find("tbody").find("tr").eq( _index ).find("td").first().text( title );
				
			}else{
				if( $("#addNoticeMoudle").find(".noticeName").find("input").val() == "" ){
					alert( "请输入内容" );
					return;
				}else{
					var str = '<tr>'
						+	'<td>'+ $("#addNoticeMoudle").find(".noticeName").find("input").val() +'</td>'
						+	'<td>dongzhiwu6789</td>'
						+	'<td>2016-09-21</td>'
						+	'<td class="opration">'
						+		'<a href="javascript:void(0);" class="l top">置顶</a>'
						+		'<a href="javascript:void(0);" class="l edits"></a>'
						+		'<a href="javascript:void(0);" class="l delete"></a>'
						+	'</td>'
						+ '</tr>';
					$("#noticeMoudleTable").find("tbody").append( str );

					// 编辑按钮
					$("#noticeMoudleDialog").find(".edits").on( "click",function(){
						var _this = $( this );
						edidtMoudleDialog( _this );
					} );

					// 删除按钮
					$("#noticeMoudleDialog").find("tr").last().find(".delete").on( "click",function(){
						var _this = $(this);
						deleteNotice( _this );
					} );

					// 置顶按钮
					$("#noticeMoudleDialog").find("tr").last().find(".top").on( "click",function(){
						$(this).toggleClass( "first" );
					} );
				}
			}

			$("#addNoticeMoudle").animate( {"left":moveLeft,"marginLeft":"0px"},500 );
			$("#noticeMoudleDialog").animate( {"left":"50%"},500 );
		});

		$("#noticeMoudleDialog").find(".edits").click(function(){
			edidtMoudleDialog( $(this) );
		});

		function edidtMoudleDialog( obj ){
			var _index = obj.parent().parent().index();
			var value = obj.parents("tr").find("td").first().text();
			$("#addNoticeMoudle").find(".noticeName").find("input").val( value );
			$("#addNoticeMoudle").attr( "target", _index );
			$("#addNoticeMoudle").animate( {"left":"50%","marginLeft":"-540px"},500 );
			$("#noticeMoudleDialog").animate( {"left":"-540px"},500 );
			
			if( obj.hasClass("addCourse") ){
				$("#addNoticeMoudle").removeAttr( "target" );
				$("#addNoticeMoudle").find(".noticeName").find("input").val( "" );
			}
			setTimeout( function(){
				$("#addNoticeMoudle").show();
			},500 );
		}

		// 展开课程列表

		$("#cardEdit").find(".contentWrap").click( function(){
			if( $(this).hasClass("addFileStatu") || $(this).hasClass("addFolderStatu") ){
				return false;
			}
			$(this).siblings(".subMenu").slideToggle();
			$(this).toggleClass("showMenu");
		} );

		// 编辑按钮

		$("#cardEdit").find(".subMenu").find(".edit").click(function(){
			var _this = $(this);
			editFile( _this );
		});

		function editFile( obj ){
			if( canClick() ){
				return false;
			}
			var oldName = obj.parent().siblings(".contentWrap").find(".text").text();
			
			obj.parent().siblings(".contentWrap").addClass("editStatu");
			obj.parent().siblings(".contentWrap").find(".text").hide();
			obj.parent().siblings(".contentWrap").find(".editBox").show();
			obj.parent().siblings(".contentWrap").find("input").val( oldName );
			obj.parent().hide();
		}

		// 添加文件按钮

		$("#cardEdit").find(".subMenu").find(".add").click( function(){
			var _this = $(this);
			addFile( _this );
		} );

		function addFile( obj ){
			if( canClick() ){
				return false;
			}
			var str = '<li>'
					+		'<div class="contentWrap editStatu clearfix">'
					+			'<span class="course l"></span>'
					+			'<span class="text l"></span>'
					+			'<div class="editBox clearfix" style = "display:block;">'
					+				'<div class="inputWrap l">'
					+					'<input type="text">'
					+					'<a href="javascript:void(0);"></a>'
					+				'</div>'
					+				'<a class="del l" href="javascript:void(0);"></a>'
					+			'</div>'
					+		'</div>'

					+		'<div class="btnWrap" style="display: none;">'
					+			'<a class="edit" href="javascript:void(0);"></a>'
					+			'<a class="del" href="javascript:void(0);"></a>'
					+		'</div>'
					+	'</li>';
			obj.parent().siblings("ul").append( str );
			obj.parent().siblings("ul").slideDown();
			obj.parent().siblings(".contentWrap").get(0).className = "contentWrap clearfix addFileStatu";
		
			// 获取添加的对象

			var addLiDom = obj.parent().siblings("ul").find("li").last();

			// 注册鼠标滑入事件


			addLiDom.children( ".contentWrap" ).hover( function(){
				if( $(this).hasClass("editStatu") ){
					$(this).siblings(".btnWrap").hide();
					return false;
				}
				$(this).siblings(".btnWrap").show();
			},function(){
				$(this).siblings(".btnWrap").hide();
			} );

			addLiDom.children( ".btnWrap" ).hover( function(){
				$(this).show();
			});

			// 注册编辑事件

			addLiDom.find(".edit").click( function(){
				var _this = $(this);
				editFile( _this );
			} );

			// 注册确认图标事件

			addLiDom.find(".inputWrap").find("a").click( function(){
				var _this = $(this);
				sureInput( _this );
				event.stopPropagation();
			} );

			// 注册删除事件

			addLiDom.find(".del").click(function(){
				var _this = $(this);
				del(_this);
			});
		}

		// 点击input阻止冒泡

		$("#cardEdit").find(".subMenu").find( "input" ).click( function(event){
			event.stopPropagation();
		} );

		// 点击确认图标

		$("#cardEdit").find(".subMenu").find( ".inputWrap" ).find("a").click( function(event){
			var _this = $(this);
			sureInput( _this );
			event.stopPropagation();
		} );

		function sureInput( obj ){
			obj.parent().parent().siblings(".text").text( obj.siblings().val() );
			obj.parent().parent().hide();
			obj.parents(".contentWrap").removeClass( "editStatu" );
			if( obj.parents(".contentWrap").parent().parent().siblings().hasClass("contentWrap") ){
				obj.parents(".contentWrap").parent().parent().siblings(".contentWrap").get(0).className = "contentWrap clearfix showMenu";
			}
			obj.parents(".contentWrap").siblings(".btnWrap").removeClass("editStatu");
			obj.parent().parent().siblings(".text").show();
		}

		// 点击增加文件夹

		$("#cardEdit").find(".subMenu").find(".addFile").click( function(){
			var _this = $(this);
			addFolder( _this );
		} );

		function addFolder(obj){
			if( canClick() ){
				return false;
			}
			var str ='<li>'
					+	'<div class="contentWrap editStatu clearfix">'
					+		'<span class="triangle l"></span>'
					+		'<span class="file l"></span>'
					+		'<span class="text l" style = "display:none">文件夹</span>'
						
					+		'<div class="editBox clearfix" style = "display:block;" >'
					+			'<div class="inputWrap l">'
					+				'<input type="text">'
					+				'<a href="javascript:void(0);"></a>'
					+			'</div>'
					+			'<a class="del l" href="javascript:void(0);"></a>'
					+		'</div>'
					+	'</div>'

					+	'<div class="btnWrap" style="display: none;">'
					+		'<a class="edit" href="javascript:void(0);"></a>'
					+		'<a class="add" href="javascript:void(0);"></a>'
					+		'<a class="addFile" href="javascript:void(0);"></a>'
					+		'<a class="del" href="javascript:void(0);"></a>'
					+	'</div>'
					+	'<ul class="subMenu" style="display: none;"></ul>'
					+ '</li>';
			obj.parent().siblings( "ul" ).append( str );
			obj.parent().siblings( "ul" ).slideDown();

			obj.parent().siblings( ".contentWrap" ).get(0).className = "contentWrap clearfix addFolderStatu";

			// 获取添加的元素

			var addLiDom =  obj.parent().siblings("ul").find("li").last();

			addLiDom.find(".inputWrap").find("a").click( function(){
				var _this = $(this);
				sureInput( _this );
				event.stopPropagation();
			} );

			// 点击事件

			addLiDom.find(".contentWrap").click( function(){
				if( $(this).hasClass("addFileStatu") || $(this).hasClass("addFolderStatu") ){
					return false;
				}
				$(this).siblings(".subMenu").slideToggle();
				$(this).toggleClass("showMenu");
			} );

			// 鼠标移入事件

			addLiDom.find(".contentWrap").hover( function(){
				if( $(this).hasClass("editStatu") ){
					$(this).siblings(".btnWrap").hide();
					return false;
				}

				$(this).siblings(".btnWrap").show();
			},function(){
				$(this).siblings(".btnWrap").hide();
			} );

			addLiDom.find(".btnWrap").hover(function(){
				$(this).show();
			});

			// 注册编辑按钮

			addLiDom.find(".edit").click( function(){
				var _this = $(this);
				editFile( _this );
			} );

			// 添加文件按钮

			addLiDom.find(".add").click( function(){
				var _this = $(this);
				addFile( _this );
			} );

			// 添加文件夹按钮

			addLiDom.find(".addFile").click( function(){
				var _this = $(this);
				addFolder( _this );
			} );

			// 删除按钮

			addLiDom.find(".del").click( function(){
				var _this = $(this);
				del(_this);
			} );

			addLiDom.find("input").click( function(){
				return false;
			} );
		}

		// 显示操作按钮

		$("#cardEdit").find(".subMenu").find("li").children(".contentWrap").hover( function(){
			if( $(this).hasClass("editStatu") ){
				$(this).siblings(".btnWrap").hide();
				return false;
			}
			$(this).siblings(".btnWrap").show();
		},function(){
			$(this).siblings(".btnWrap").hide();
		} );

		$("#cardEdit").find(".subMenu").find("li").children(".btnWrap").hover( function(){
			$(this).show();
		} );

		// 根文件夹

		$("#cardEdit").find(".showBox").hover( function(){
			$(this).find(".btnWrap").show();
		},function(){
			$(this).find(".btnWrap").hide();
		} );

		$("#cardEdit").find(".showBox").find(".edit").click( function(){
			var _this = $(this);
			rootNameEdit( _this );
		} );

		function rootNameEdit( obj ){
			var oldName = obj.parent().siblings("span").eq(1).text();
			obj.parents(".showBox").siblings(".warp").find("input").val( oldName );
			obj.parents(".showBox").hide();
			obj.parents(".showBox").siblings(".warp").show();
		}

		$("#cardEdit").find(".warp").find(".inputWrap").find("a").click( function(){
			var _this = $(this);
			rootNameSure( _this );
		} );

		function rootNameSure( obj ){
			var name = obj.siblings().val();
			obj.parents(".warp").siblings(".showBox").find("span").eq(1).text( name );
			obj.parents(".warp").hide();
			obj.parents(".warp").siblings(".showBox").show();
			obj.parents(".rootMenu").removeClass("addRoot");
		}

		// 根目录添加文件夹

		$("#cardEdit").find(".showBox").find(".addFile").click( function(){
			var _this = $(this);
			rootAddFolder( _this );
		} );

		function rootAddFolder(obj){
			var str = '<li>'
					+		'<div class="contentWrap editStatu clearfix">'
					+			'<span class="triangle l"></span>'
					+			'<span class="file l"></span>'
					+			'<span class="text l" style=""></span>'
					+			'<div class="editBox clearfix" style="display: block;">'
					+				'<div class="inputWrap l">'
					+					'<input type="text">'
					+					'<a href="javascript:void(0);"></a>'
					+				'</div>'
					+				'<a class="del l" href="javascript:void(0);"></a>'
					+			'</div>'
					+		'</div>'
					+		'<div class="btnWrap" style="display: none;">'
					+			'<a class="edit" href="javascript:void(0);"></a>'
					+			'<a class="add" href="javascript:void(0);"></a>'
					+			'<a class="addFile" href="javascript:void(0);"></a>'
					+			'<a class="del" href="javascript:void(0);"></a>'
					+		'</div>'
					+		'<ul class="subMenu" style="display: none;"></ul>'
					+	'</li>';
			obj.parents(".showBox").siblings(".subMenu").append( str );

			// 获取添加的元素

			var addDom = obj.parents(".showBox").siblings(".subMenu").find("li").last();

			// 确认按钮

			addDom.find(".inputWrap").find("a").click(function(event){
				var _this = $(this);
				sureInput( _this );
				event.stopPropagation();
			});

			// 鼠标滑入操作

			addDom.find(".contentWrap").hover(function(){
				if( $(this).hasClass("editStatu") ){
					$(this).siblings(".btnWrap").hide();
					return false;
				}
				$(this).siblings(".btnWrap").show();
			},function(){
				$(this).siblings(".btnWrap").hide();
			});

			addDom.find(".btnWrap").hover(function(){
				$(this).show();
			});

			// 编辑按钮

			addDom.find(".edit").click(function(){
				var _this = $(this);
				editFile( _this );
			});

			// 添加文件按钮

			addDom.find(".add").click(function(){
				var _this = $(this);
				addFile( _this );
			});

			// 添加文件夹按钮

			addDom.find(".addFile").click(function(){
				var _this = $(this);
				addFolder( _this );
			});

			// 删除按钮

			addDom.find(".del").click(function(){
				var _this = $(this);
				del(_this);
			});
		}

		// 删除按钮

		$("#cardEdit").find(".subMenu").find(".del").click( function(){
			var _this = $(this);
			del(_this);
		} );

		function del(obj){
			obj.parent().parent().remove();
		}

		$("#cardEdit").find(".showBox").find(".del").click(function(){
			var _this = $(this);
			rootDel(_this);
		});

		function rootDel(obj){
			obj.parents("li").remove();
		}

		function canClick(){
			if( $("#cardEdit").find(".addRoot").length >0 || $("#cardEdit").find(".editStatu").length >0 ){
				return true;
			}
		}

		// 创建根文件

		$("#cardEdit").find(".title").find(".add").click(function(){
			if( canClick() ){
				return false;
			}
			var str = '<li>'
					+		'<div class="rootMenu addRoot">'
					+			'<div class="showBox" style="display:none;">'
					+				'<span>文件夹名称:</span>'
					+				'<span class="name">概念2</span>'
					+				'<div class="btnWrap" style="display: none;">'
					+					'<a class="edit" href="javascript:void(0);"></a>'
					+					'<a class="addFile" href="javascript:void(0);"></a>'
					+					'<a class="del" href="javascript:void(0);"></a>'
					+				'</div>'
					+			'</div>'
					+			'<div class="warp" style="display:block;">'
					+				'<div class="editBox clearfix">'
					+					'<div class="inputWrap">'
					+						'<input type="text">'
					+						'<a href="javascript:void(0);"></a>'
					+					'</div>'
					+				'</div>'
					+			'</div>'
					+			'<ul class="subMenu oneMenu"></ul>'
					+		'</div>'
					+	'</li>';
			$(this).parent().siblings().append( str );

			// 获取添加的元素

			var addDom = $("#cardEdit").find(".menu").find("li").last();

			// 确认按钮

			addDom.find(".inputWrap").find("a").click( function(){
				var _this = $(this);
				rootNameSure( _this );
			} );

			// 鼠标移入事件

			addDom.find(".showBox").hover( function(){
				$(this).find(".btnWrap").show();
			},function(){
				$(this).find(".btnWrap").hide();
			} );

			// 编辑按钮

			addDom.find(".edit").click(function(){
				var _this = $(this);
				rootNameEdit( _this );
			});

			// 添加文件

			addDom.find(".add").click(function(){
				var _this = $(this);
				rootAddFile(_this);
			});

			// 添加文件夹

			addDom.find(".addFile").click( function(){
				var _this = $(this);
				rootAddFolder( _this );
			} );

			// 删除按钮

			addDom.find(".del").click(function(){
				var _this = $(this);
				rootDel(_this);
			});
		});

		// 弹出编辑课程大纲弹框

		$("#courseMoudle").find(".edit").click(function(){
			showDialog( $("#cardEdit") );
		});

		// 关闭编辑课程大纲弹框

		$("#cardEdit").find(".closePopup").click(function(){
			closeDialog( $("#cardEdit") );
		});

		// 课件类型选择

		$("#cardEdit").find(".selected").click(function(){
			$(this).siblings().slideToggle();
		});

		$("#cardEdit").find(".optionList").find("li").click(function(){
			$("#cardEdit").find(".selected").find(".text").text( $(this).text() );
			$(this).parent().slideUp();
			$("#cardEdit").find(".listWrap").find("ul").css( "display","none" );
			$("#cardEdit").find(".listWrap").find("ul").eq( $(this).index() ).css( "display","block" );
		});

		// 课件选择

		$("#cardEdit").find(".listWrap").find("li").click(function(){
			var _this = $(this);
			selectCourse( _this );
		});

		function selectCourse( obj ){
			var edidtDom = $("#cardEdit").find(".editStatu");
			var oldName = edidtDom.children(".text").text();
			if( edidtDom.children("span").eq(1).hasClass("file") ){
				return false;
			}
			obj.siblings().removeClass("active");
			obj.toggleClass( "active" );
			if( obj.hasClass("active") ){
				edidtDom.find("input").val( obj.find("p").eq(1).text() );
			}else{
				edidtDom.find("input").val( oldName );
			}
		}

		// 确定按钮

		$("#cardEdit").find(".release").click(function(){
			var rootMenu = $("#cardEdit").find(".menu").children();
			var showLeft = $("#courseMoudle").find(".left").children("ul");
			var allMenu = '<li>'
						+		'<div class="content clearfix">'
						+		'<span class="l text">全部</span>'
						+		'</div>'
						+	'</li>';
			showLeft.empty();

			showLeft.append( allMenu );
			for(var i = 0;i<rootMenu.length;i++){
				var liDom = '<li>'+ rootMenu.eq(i).html() +'</li>';
				showLeft.append( liDom );

				showLeft.children("li").last().find(".showBox").append( '<span class="triangle l"></span>' );

				showLeft.children("li").last().find(".showBox").click( function(){
					var _this = $(this);
					showOneMenu( _this );
				} );

				showLeft.children("li").last().find(".contentWrap").click(function(){
					var _this = $(this);
					showSubMenu( _this );
				});
			}

			// 添加点击事件

			showLeft.children("li").first().find(".content").click(function(){
				$("#courseMoudle").find(".right").find(".floatList").hide();
				$("#courseMoudle").find(".right").find(".floatList").eq(0).show();
			});

			showTriangle();
			closeDialog( $("#cardEdit") );
		});

		// 取消按钮

		$("#cardEdit").find(".cancel").click(function(){
			closeDialog( $("#cardEdit") );
		});

		// 展开课程列表

			// 全部列表
			$("#courseMoudle").find(".menuWrap").find(".content").click( function(){
				$("#courseMoudle").find(".right").find(".floatList").hide();
				$("#courseMoudle").find(".right").find(".floatList").eq(0).show();
			} );

			// 子列表

			$("#courseMoudle").find(".menuWrap").find(".showBox").click(function(){
				var _this = $(this);
				showOneMenu( _this );
			});

			function showOneMenu( obj ){
				var index = obj.parent().parent().index();
				var leftHeight = $("#courseMoudle").find(".left").outerHeight();
				var rightHeight = $("#courseMoudle").find(".right").outerHeight();
				$("#courseMoudle").find(".right").find(".floatList").hide();
				$("#courseMoudle").find(".right").find(".floatList").eq(index).show();
				obj.toggleClass( "showMenu" );
				if( obj.hasClass("showMenu") ){
					obj.siblings("ul").slideDown();
					setTimeout( function(){
						leftHeight = $("#courseMoudle").find(".left").outerHeight();
						if( leftHeight < rightHeight ){
							$("#courseMoudle").children(".content").height( rightHeight );
						}else{
							$("#courseMoudle").children(".content").height( leftHeight );
						}
					},300 );
				}else{
					obj.siblings("ul").slideUp();
					setTimeout( function(){
						leftHeight = $("#courseMoudle").find(".left").outerHeight();
						if( leftHeight < rightHeight ){
							$("#courseMoudle").children(".content").height( rightHeight );
						}else{
							$("#courseMoudle").children(".content").height( leftHeight );
						}
					},300 );
				}
			}


			$("#courseMoudle").find(".menuWrap").find(".contentWrap").click(function(){
				var _this = $(this);
				showSubMenu( _this );
			});

			function showSubMenu( obj ){
				var leftHeight = $("#courseMoudle").find(".left").outerHeight();
				var rightHeight = $("#courseMoudle").find(".right").outerHeight();
				obj.toggleClass("showMenu");
				if( obj.hasClass("showMenu") ){
					obj.siblings("ul").slideDown();
					setTimeout( function(){
						leftHeight = $("#courseMoudle").find(".left").outerHeight();
						if( leftHeight < rightHeight ){
							$("#courseMoudle").children(".content").height( rightHeight );
						}else{
							$("#courseMoudle").children(".content").height( leftHeight );
						}
					},300 );
				}else{
					obj.siblings("ul").slideUp();
					setTimeout( function(){
						leftHeight = $("#courseMoudle").find(".left").outerHeight();
						if( leftHeight < rightHeight ){
							$("#courseMoudle").children(".content").height( rightHeight );
						}else{
							$("#courseMoudle").children(".content").height( leftHeight );
						}
					},300 );
				}
			}

		// 课程菜单
			
		function showTriangle(){
			var liDom = $("#courseMoudle").find(".menuWrap").find("li");
			for( var i = 0;i<liDom.length; i++ ){

				if( liDom.eq(i).find("li").length == 0 ){
					liDom.eq(i).find(".triangle").css( "display","none" );
				}

			}
		}

		showTriangle();


		$("#discussMoudle").find("li").click(function(){
			$(this).addClass("active")
			$(this).siblings().removeClass( "active" );
			$("#discussMoudle").find(".listWrap").hide();
			$("#discussMoudle").find(".listWrap").eq( $(this).index() ).show();
		});

		// 编辑按钮

		$("#discussMoudle").find(".edit").click(function(){
			showDialog( $("#discussMoudleEdit") );
		});


		// 讨论模块中的弹窗

		$("#discussMoudleEdit").find(".closePopup").click(function(){
			closeDialog( $("#discussMoudleEdit") );
		});

		// 添加按钮

		$("#discussMoudleEdit").find(".left").find(".top").find("a").click(function(){
			var len = $("#discussMoudleEdit").find(".left").find(".add").length;
			if( len >=1 ){
				return;
			}
			var str = '<li class="add">'
					+		'<span></span>'
					+		'<div>'
					+			'<input type="text" autofocus="autofocus">'
					+			'<a href="javascript:void(0);"></a>'
					+		'</div>'
					+	'</li>';
			$("#discussMoudleEdit").find(".left").find("ul").append(str);

			// 注册确认按钮

			$("#discussMoudleEdit").find(".left").find(".add").find("a").click(function(){
				var title = $(this).siblings().val();
				if( title == "" ){
					alert("请输入内容");
					return;
				}
				$(this).parent().siblings().text( title );
				$(this).parents("li").removeClass("add");
			});
		});

		// 置顶按钮

		$("#discussMoudleEdit").find(".toTop").click( function(){
			var selected = $("#discussMoudleEdit").find(".right").find(".active");
			if ( selected.length >= 2 ) {
				$(this).parents("li").removeClass("active");
				return false;
			}
			$(this).parents("li").toggleClass( "active" );
		} );

		// 禁止按钮

		$("#discussMoudleEdit").find(".opra").click( function(){
			$(this).toggleClass("stop");
		} );


		// 取消按钮

		$("#discussMoudleEdit").find(".return").click(function(){
			closeDialog( $("#discussMoudleEdit") );
		});


		// 确定按钮

		$("#discussMoudleEdit").find(".save").click(function(){
			var selected = $("#discussMoudleEdit").find(".right").find(".active");
			var shwoDom = $("#discuss").find(".contentList");
			if( selected.length > 0 ){
				for( var i = 0;i<selected.length; i++ ){
					shwoDom.eq(i).find("p").text( selected.eq(i).find("p").text() );
					shwoDom.eq(i).find("img").attr( "src", selected.eq(i).find("img").attr("src") );
				}
			}
			$("#discuss").find(".addBtnWrap").hide();
			$("#discuss").find(".contentList").show();
			closeDialog( $("#discussMoudleEdit") );
		});


	// 同学编辑弹框

		// 显示弹框

		$("#classmate").find(".edit").click(function(){
			showDialog( $("#classmateEdit") );
		});

		// 全选

		$("#classmateEdit").find(".tabHeder").find(".checkboxWrap").on("click",function(){
			var trDom = $("#classmateEdit").find(".courseListWrap").find("tr");
			if( $(this).hasClass("selected") ){
				for( var i = 0; i<trDom.length; i++ ){
					trDom.eq(i).find(".checkboxWrap").addClass("selected");
				}
			}else{
				for( var i = 0; i<trDom.length; i++ ){
					trDom.eq(i).find(".checkboxWrap").removeClass("selected");
				}
			}
		});

		// 删除图标

		$("#classmateEdit").find(".editIcon").click(function(){
			$(this).parents("tr").remove();
		});

		// 关闭按钮

		$("#classmateEdit").find(".closePopup").click(function(){
			closeDialog( $("#classmateEdit") );
		});

		// 导入按钮

		$("#classmateEdit").find(".sure").click(function(){
			var trDom = $("#classmateEdit").find(".courseListWrap").find("tr");
			var str = '';
			$("#classmate").find("ul").empty(); 
			if( trDom.length == 0 ){
				$("#classmate").find("ul").hide();
			}else{
				for( var i = 0;i<trDom.length; i++ ){
					if( trDom.eq(i).find(".checkboxWrap").hasClass("selected") ){
						str += '<li>'
							+		'<div>'
							+			'<img src="images/classMate01.png">'
							+			'<p>'+ trDom.eq(i).find(".title").text() +'</p>'
							+		'</div>'
							+	'</li>';
					}
				}

				$("#classmate").find("ul").append( str );

			}
			closeDialog( $("#classmateEdit") );
		});

		// 删除按钮

		$("#classmateEdit").find(".return").click(function(){
			var trDom = $("#classmateEdit").find(".courseListWrap").find("tr");
			for( var i = 0;i<trDom.length; i++ ){
				if( trDom.eq(i).find(".checkboxWrap").hasClass("selected") ){
					trDom.eq(i).remove();
				}
			}
		});

	// 切换移动端

	$(".previewTab").find(".btn").click(function(){
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		$(".tabContent").removeClass("current");
		$(".tabContent").eq( $(this).index() ).addClass("current");
	});