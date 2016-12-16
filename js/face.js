//显示标签列表
common.dropMenuTop(".btn.addTag", "open", ".addTags");

//添加标签
$(".addTags .tagsList .btnMin").click(function(){
	var pid = $(this).attr("data-pid");
	var selectedTagsBox = $(this).parents(".targsWrap").find(".tagsListInner");
	if( selectedTagsBox.find(".btnMin[data-pid='" + pid + "']").length==0 ){
		$(this).parents(".targsWrap").find(".tagsListInner").append( $(this).clone() );
	}else{
		alert("已添加，请重新选择！");	
	}
	delSelectedTag(); //删除已选中的标签
});
//删除已选中的标签
function delSelectedTag(){
	$(".targsWrap .selectedtags .tagsListInner .btnMin").click(function(){
		$(this).remove();
	});
}
delSelectedTag(); 
//删除已选中的标签

// 显示上传图片弹窗

$("#startUloadPic").find(".alignC").click(function(){
	$("#previewPagePopup").show();
	$("body").css("overflow","hidden");
	$("#uploadPic").show();
});

// 小三角按钮

$("#uploadPic").find(".hideLeft").on( "click",function(){
	$(this).toggleClass("showLeft");
	$(this).parent().toggleClass("big");
	$("#uploadPic").find(".uploadExplain").toggle();
} );

// 关闭按钮

$("#uploadPic").find(".closePopup").on( "click",function(){
	$("body").css( "overflow","visible" );
	$("#uploadPic").hide();
	$("#previewPagePopup").hide();
} );

// 上传按钮

	var uploadSrc = "";

	function previewImage(file)
    {
      var div = document.getElementById('previewImg');
      if (file.files && file.files[0])
      {
          div.innerHTML ='<img id=imghead>';
          var img = document.getElementById('imghead');
          var reader = new FileReader();
          reader.onload = function(evt){
          	uploadSrc = img.src = evt.target.result;
    		$("#previewImg").find("src").attr( "src",uploadSrc );
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
        uploadSrc = file.value;
      }
    }


// 返回按钮

    $("#uploadPic").find(".return").on( "click",function(){
    	$("body").css( "overflow","visible" );
    	$("#uploadPic").hide();
    	$("#previewPagePopup").hide();
    } );


 // 保存按钮

    $("#uploadPic").find(".save").on( "click",function(){
    	if( uploadSrc == "" ){
    		return;
    	}
    	$("body").css( "overflow","visible" );
    	$(".coursePic").children("img").attr("src", uploadSrc);
    	$("#startUloadPic").addClass("signhover")
    	$("#startUloadPic").find("p").hide();
    	$(".coursePic").find(".coursePicInner").css({'opacity':'0.4'});
    	$("#uploadPic").hide();
    	$("#previewPagePopup").hide();
    } );

		// 鼠标悬浮显示上传图片
		  $(".coursePic").hover(function(){
			  	if($("#startUloadPic").hasClass("signhover")){
		       	 	$("#startUloadPic").find("p").show();
		       	 }	
	        },function(){
	      	 	if($("#startUloadPic").hasClass("signhover")){
	       	 		$("#startUloadPic").find("p").hide();
	       		 }
	        });

// 面授新增编辑课程表页面S

	$("#courseSheet").find("td").find(".edit").click(function(){
		$(this).parents("tr").addClass( "editStatu" );
	});

	// 展示列表

	$("#courseSheet").find("td").find("span").click(function(){
		if( !$(this).parents("tr").hasClass("editStatu") ){
			return;
		}else{
			$(this).siblings("ul").slideDown();
		}

		return false;
	});

	//  选择内容

	$("#courseSheet").find("td").find("li").click(function(){
		$(this).parent().siblings().text( $(this).text() );
	});

	$(document).on("click",function(){
		$("#courseSheet").find("td").find("ul").slideUp();
	});

	// 删除按钮

	$("#courseSheet").find("td").find(".del").click(function(){
		$(this).parents("tr").remove();
	});

	//展开收起
		$(".searchForm .btnList .packUp").click(function(){
			var controlList = $(this).parents(".searchForm").find(".controlList"),
				controlListH = controlList[0].scrollHeight;
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

		});


	common.checkbox(".checkboxWrap", "selected");

	//全选 大图显示

	// $(".courseListWrap").find(".checkboxWrap").click(function(){
	// 	var liDom = $(this).parent().siblings().find("li");
	// 	if( $(this).hasClass("selected") ){
	// 		liDom.find(".checkboxWrap").addClass("selected");
	// 	}else{
	// 		liDom.find(".checkboxWrap").removeClass("selected");
	// 	}
	// });


	// //全选 列表显示
	// $(".courseList.listView th .checkboxWrap").click(function(){
	// 	var parents =$(this).parents(".listView");
	// 	if( $(this).hasClass("selected") ){
	// 		parents.find(".checkboxWrap").addClass("selected");			
	// 	}else{
	// 		parents.find(".checkboxWrap").removeClass("selected");			
	// 	}			 
	// });

//取消全选 大图显示
		$(".courseList li .liBox .checkboxWrap").click(function(){
			if( !$(this).hasClass("selected") ){
				$(this).parents(".courseList").siblings(".selectAllCourse").find(".checkboxWrap").removeClass("selected");
			}
		});
		//取消全选 列表显示
		$(".courseList.listView td .checkboxWrap").click(function(){
			if( !$(this).hasClass("selected") ){
				$(this).parents(".courseList").find("th").find(".checkboxWrap").removeClass("selected");
			}
		});
	// 内容切换

	$(".tabMenu").find(".navMenu").find("li").click(function(){
		$(this).siblings().removeClass("current");
		$(this).addClass("current");
		for(var i = 0;i<$(".listViewType").length;i++){
			$(".listViewType").eq(i).find(".courseListWrap").removeClass("current");
			$(".listViewType").eq(i).find(".courseListWrap").eq($(this).index()).addClass("current");
		}
	});

	// 课程选择

	$("#courseSelect").find(".listViewType").find(".checkboxWrap").click(function(){
		var selected = $("#courseSelect").find(".listViewType").find(".selected");
		if( selected.length > 1 ){
			$(this).removeClass("selected");
		}
	});




	// 选择按钮

	$("#courseSheet").find(".resources").find(".btn").click(function(){
		$("#courseSelect").show();
		$("#previewPagePopup").show();
		$("body").css("overflow","hidden");
	});

	// 保存

	$("#courseSelect").find(".save").click(function(){
		var selected = $("#courseSelect").find(".listViewType").find(".selected");
		var courseName = "";
		if( selected.siblings("p").hasClass("title") ){
			courseName = selected.siblings("p").text()
		}else if( selected.parent().hasClass("radio") ){
			courseName = selected.parent().next().find("p").text();
		}
		$("#courseSheet").find(".editStatu").find(".resources").find("input").val( courseName );
		$("body").css("overflow","visible");
		$("#courseSelect").hide();
		$("#previewPagePopup").hide();
	});	

	// 确认图标

	$("#courseSheet").find(".sure").click(function(){
		var editDom = $("#courseSheet").find(".editStatu");
		editDom.find(".activityName").find("span").text( editDom.find(".activityName").find("input").val() );
		editDom.find(".name").find("span").text( editDom.find(".name").find("input").val() );
		editDom.find(".resources").find(".text").text( editDom.find(".resources").find("input").val() );
		editDom.removeClass("editStatu");
	});


	//  切换内容显示形式

	$(".tabMenu").find(".navType").find(".tabBtn").click(function(){
		$(this).siblings().removeClass("current");
		$(this).addClass("current");
		$(".listViewType").removeClass("show");
		$(".listViewType").eq($(this).index()-1).addClass("show");
		$("#courseSelect").find(".selected").removeClass("selected");
	});

	// 关闭弹窗

	$("#courseSelect").find(".closePopup").click(function(){
		$("body").css("overflow","visible");
		$("#courseSelect").hide();
		$("#previewPagePopup").hide();
	});

	$("#courseSelect").click( function(){
		$("#courseSelect").find(".options").slideUp();
	} );

	// 展开列表

	$("#courseSelect").find(".selected").click( function(){
		$(this).siblings().slideToggle();
		return false;
	} );

	// 选择内容

	$("#courseSelect").find(".options").find("p").click(function(){
		$(this).parent().siblings().find("span").text( $(this).text() );
	});

	// 显示更改域弹窗

	$(".bottomFloatBar").find(".changField").click(function(){
		$("#changField").show();
		$("#previewPagePopup").show();
		$("body").css("overflow","hidden");
	});

	// 关闭更改域弹框

	$("#changField").find(".closePopup").click(function(){
		closeDialog( $("#changField") );
	});

	// 取消按钮

	$("#changField").find(".return").click( function(){
		closeDialog( $("#changField") );
	} );

	// 保存按钮

	$("#changField").find(".save").click( function(){
		
	} );

	// 本地导入

	$(".import").click(function(){
		$("body").css("overflow","hidden");
		$("#previewPagePopup").show();
		$("#importDialog").show();
	});

	// 关闭按钮

	$("#importDialog").find(".closePopup").click(function(){
		closeDialog( $("#importDialog") );
	});

	// 返回按钮

	$("#importDialog").find(".return").click(function(){
		closeDialog( $("#importDialog") );
	});

	// 确定按钮

	$("#importDialog").find(".save").click(function(){
		closeDialog( $("#importDialog") );
	});

	// 上传文件

	function upLoadFile( obj ){
		var arr = obj.value.split("\\");
    	var fileName = arr[arr.length-1];
    	var num = 0;

    	$("#importDialog").find(".upLoadBox").find("p").text( fileName );

    	$("#importDialog").find(".fileArea").hide();
    	$("#importDialog").find(".upLoadBox").show();

    	var timer = setInterval( function(){
			num++;
			if( num == 100 ){
				clearInterval(timer);
				$("#importDialog").find(".upLoadBox").find(".bgBox").addClass("success");
				$("#importDialog").find(".upLoadBox").find(".bg").siblings().text("上传完成");
			}
			$("#importDialog").find(".upLoadBox").find(".progressBar").find("div").css( "width", num + "%" );
			$("#importDialog").find(".upLoadBox").find(".closeBox").find("span").text( num+"%" );
		},50 );
	}

	// 

	// 关闭弹窗方法

	function closeDialog( obj ){
		$("body").css("overflow","visible");
		obj.hide();
		$("#previewPagePopup").hide();
	}

	// 大图全选

	$(".courseListWrap").find(".selectAll").find(".checkboxWrap").click(function(){
		if( $(this).hasClass("selected") ){
			$(this).parent().next().find(".checkboxWrap").addClass("selected");
		}else{
			$(this).parent().next().find(".checkboxWrap").removeClass("selected");
		}
	});

	// 列表全选

	$(".courseListWrap").find("th").find(".checkboxWrap").click(function(){
		if( $(this).hasClass("selected") ){
			$(this).parents("tr").siblings().find(".checkboxWrap").addClass("selected");
		}else{
			$(this).parents("tr").siblings().find(".checkboxWrap").removeClass("selected");
		}
	});

	// 搜索栏展开列表

	$(".searchForm").find(".selected").click(function(){
		$(this).siblings().slideToggle();
	});

	// 所搜栏条件选择"
	
	$(".searchForm").find(".options").find("p").click(function(){
		$(this).parent().siblings().find("span").text( $(this).text() );
		$(this).parent().slideUp();
	});


	// 树形结构 S

	(function(){
		var liDom = $(".tree").find("li");
		if( liDom.find("ul").hasClass("subMenu") ){
			var bgDom = $(".tree").find( ".bg" );
			for( var i = 0;i < bgDom.length; i++ ){
				var last = bgDom.eq(i).parent().parent().children().length-1;
				// 改变样式
				if( bgDom.eq(i).parent().parent().hasClass("subMenu") && ( bgDom.eq(i).parent().index() == last ) ){
					bgDom.eq(i).css( { "backgroundPosition":"-62px -54px"  } );
					bgDom.eq(i).parent().css( "backgroundImage","none" );
				}
			}
		}

		// 没有子菜单的隐藏三角图标

		for( var i = 0; i<liDom.length;i++ ){
			if( !( liDom.eq(i).find("ul").hasClass("subMenu")) ){
				liDom.eq(i).find(".triangle").css( "display","none" );
			}
		}

		// 点击三角图标收缩展开子菜单

		$(".tree").find(".triangle").on( "click",function(){

			$(this).toggleClass( "active" );
			if( $(this).hasClass("active") ){
				$(this).parent().siblings("ul").slideDown();
			}else{
				$(this).parent().siblings("ul").slideUp();
			}
		} );

		// 单选操作

		$(".tree").find(".radio").on( "click",function(){
			$(".tree").find(".radio").removeClass("active");
			$(this).toggleClass( "active" );

			// 有子菜单的情况下
			if( $(this).parent().siblings().find("span").hasClass("radio") ){
				$(this).removeClass("active");
				if( $(this).hasClass("active") ){
					$(this).parent().siblings().find(".radio").addClass("active");
				}else{
					$(this).parent().siblings().find(".radio").removeClass("active");
				}
			}
		} );

	})();

	// 树形结构 E


	//日期选择
	$.openCalendar({
		element: '.dateTime .text'
	});

// 面授新增编辑课程表页面E