//课程维护
		/* 搜索条件 */
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
		//日期选择
		$.openCalendar({
			element: '.dateTime .text'
		});
		//仿表单select下拉列表
		common.dropList(".dropList .selected", ".dropList .options");
		
		
		/* 仿表单checkbox复选框 */
		common.checkbox(".checkboxWrap", "selected");	
		//全选 大图显示
		$(".selectAllCourse .checkboxWrap").click(function(){
			if( $(this).hasClass("selected") ){
				$(this).parent().siblings(".courseList").find(".checkboxWrap").addClass("selected");			
			}else{
				$(this).parent().siblings(".courseList").find(".checkboxWrap").removeClass("selected");			
			}			 
		});
		//全选 列表显示
		$(".courseList.listView th .checkboxWrap").click(function(){
			var parents =$(this).parents(".listView");
			if( $(this).hasClass("selected") ){
				parents.find(".checkboxWrap").addClass("selected");			
			}else{
				parents.find(".checkboxWrap").removeClass("selected");			
			}			 
		});
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
		
//课程管理 tab选项卡
		common.tabMenu(".tabMenu .navMenu li", "current", ".courseListWrap");

//底部浮动栏宽度设置
		function setRightBarWidth(elemClass){
			var windowW = $(window).width(),
				leftBarW = $(".leftBar").width();
			$(elemClass).width(500);
		}
		setRightBarWidth(".bottomFloatBar");
		//如果有底部浮动栏，则footer增加底部间距
		if( $(".bottomFloatBar").length>0 ){
			var barH = $(".bottomFloatBar").outerHeight();
			$(".footer").css("margin-bottom", barH+"px");
		}
		
//新增课程 基本资料
		//仿表单radio单选按纽
		common.radio(".radio", "selected");	
		//显示标签列表
		common.dropMenuTop(".btn.addTag", "open", ".addTags");
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
		
//新增课程 权限设置
		//全选 群组数据列表
		$(".quanxian table th .checkboxWrap").click(function(){
			var parents =$(this).parents(".innerTable");
			if( $(this).hasClass("selected") ){
				parents.find(".checkboxWrap").addClass("selected").parent().parent().addClass("selected");			
			}else{
				parents.find(".checkboxWrap").removeClass("selected").parent().parent().removeClass("selected");			
			}			 
		});
		//已添加的群组 复选框不可点
		$(".groupList .libGroup td .checkboxWrap").click(function(e){
			if( $(this).parent().parent().hasClass("gray") ){
				$(this).removeClass("selected");
			}
		});
		//点击表格行选中
		$(".groupList .libGroup tbody tr").click(function(){
			if( $(this).hasClass("gray") ){return;}
			if( $(this).hasClass("selected") ){
				$(this).removeClass("selected").find(".checkboxWrap").removeClass("selected");
				$(this).parents(".innerTable").find("th .checkboxWrap").removeClass("selected");
			}else{
				$(this).addClass("selected").find(".checkboxWrap").addClass("selected");
			}
		});
		
		//群组添加到右侧
		$(".groupList .addToRight").click(function(){
			var selectedArr = [];
			var trDom = $(this).parents("table").find(".libGroup").find("tbody").find("tr");
			var selectTrDom = $(this).parents("table").find(".selectedGroup").find("tbody").find("tr");
			trDom.each(function(){
				if( $(this).hasClass("selected") ){
					var t = $(this).clone();
					t.children().first().remove();
					t.append('<td><span class="delGrayIcon"></span></td>');
					t.removeClass("selected");
					selectedArr.push(t);
					$(this).removeClass("selected").addClass("gray").find(".checkboxWrap").removeClass("selected");
				}								
			});
			if(selectedArr.length==0){
				alert("请从左侧选择要添加的群组！");	
				return;
			}
			
			var b=0;
			for(var i=0;i<selectedArr.length;i++){
				a=0;
				selectTrDom.each(function(){
					if( $(this).attr("data-id")===selectedArr[i].attr("data-id") ){
						a = 1;	
					}										
				});
				if( a==0 ){
					// var tobody = $(".groupList .selectedGroup tbody");
					var tobody = $(this).parents("table").find(".selectedGroup").find("tbody");
					tobody.prepend(selectedArr[i]);
					if(tobody.children()==0){
						tobody.append(selectedArr[i]);	
					}else{
						selectedArr[i].insertBefore( tobody.children()[0] );
					}
					$(this).parents("table").find(".selectedEmptyGroup").find("tr").last().remove();
					// $(".groupList .selectedEmptyGroup tr:last").remove();
					b ++;
				}
			}
			if(b==0){
				alert("已添加！");	
			}else{
				delAddedGroup(); //删除已添加的群组	
			}
		});
		
		//删除已添加的群组
		function delAddedGroup(){
			$(".groupList .delGrayIcon").unbind("click").bind("click", function(e){
				e.stopPropagation();
				var parent = $(this).parent().parent();
				var groupList = $(this).parents( ".groupList" );
				parent.remove();
				var id = parent.attr("data-id");
				// var libGroup = $(".groupList .libGroup tr[data-id='" + id + "']");
				var libGroup = groupList.find(".libGroup tr[data-id='" + id + "']");
				libGroup.removeClass("gray");
				// var emptyGroup = $(".groupList .selectedEmptyGroup");
				var emptyGroup = groupList.find(".selectedEmptyGroup");
				if( emptyGroup.find("tr").length==0 ){
 					groupList.find(".selectedEmptyGroup").append('<tr>'+
										'<td>&nbsp;</td>'+
										'<td></td>'+
										'<td></td>'+
									'</tr>');
				}else{
					groupList.find(".selectedEmptyGroup").append( groupList.find(".selectedEmptyGroup").find("tr").last().clone() );
				}
			});	
		}
		delAddedGroup();

		//新建群组
		

		// 复选框
		$(".manageSet").find(".radioWrap").find(".check").on( "click",function(){
			$(this).toggleClass( "selected" );
		} );

		// 重置按钮

		$(".search").find(".reset").on( "click",function(){
			$("form").find(".selected").find("span").text("");
		} );

		// 关闭弹窗


		// 更改域弹窗 S

			// 显示弹窗

		$(".chang").on( "click",function(){
			$("#changField").show();
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").show();
		} );
		
			// 关闭域弹窗
		$("#changField").find(".closePopup").on( "click",function(){
			$("#changField").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		} );

			// 返回按钮
		$("#changField").find(".return").on( "click",function(){
			$("#changField").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		} );

			// 保存按钮

		$("#changField").find(".save").on( "click",function(){
			$("#changField").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		} );

		// 更改域弹窗 E

		// 图片上传弹框 S

			// 弹框显示

			$("#startUloadPic").find(".alignC").on( "click",function(){
				$("body").css( "overflow","hidden" );
				$("#uploadPic").show();
				$("#previewPagePopup").show();
			} );

			$("#finishedUploadPic").find("span").on( "click",function(){
				$("#uploadPic").show();
				$("#previewPagePopup").show();
			} );


			// 关闭按钮
			$("#uploadPic").find(".closePopup").on( "click",function(){
				$("body").css( "overflow","visible" );
				$("#uploadPic").hide();
				$("#previewPagePopup").hide();
			} );

			// 小三角按钮

			$("#uploadPic").find(".hideLeft").on( "click",function(){
				$(this).toggleClass("showLeft");
				$(this).parent().toggleClass("big");
				$("#uploadPic").find(".uploadExplain").toggle();
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

	        // 图片裁切

	        $("#preview").find(".top").mousedown( function(e){
	        	var X = $("#preview").find(".top").offset().left;
	        	var Y = $("#preview").find(".top").offset().top;
	        	console.log( X );
	        	var downX = e.clientX;
	        	var downY = e.clientY;
	        	var disX = parseInt(downX - X);
	        	var disY = parseInt(downY - Y);
	        	$(document).mousemove( function(e){
	        		var nowLeft = e.clientX - X;
	        		// console.log( nowLeft );
		        	var nowTop = e.clientY - disY;
		        	$("#preview").find(".top").css( {"left":nowLeft} );
	        		// move( e,X,Y,disX,disY );
	        	} );
	        } );

	        $("#preview").find(".top").mouseup( function(){
	        	$(document).mouseup( function(){
	        		$(document).unbind();
	        	} );
	        } );


	        function move( e,X,Y,disX,disY ){
	        	
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
	       
		
	    // 图片上传弹框 E

	    // 部门选择弹出框 S

	    $(".manageSet").find(".selectBox").on( "click",function(){
	    	$("#previewPagePopup").show();
	    	$("#department").show();
	    	$("body").css( "overflow","hidden" );
	    } );

	    // 关闭弹窗 S

	    $("#department").find(".closePopup").on( "click",function(){
	    	hidePopup();
	    } );

	    // 取消按钮

	    $("#department").find(".return").on( "click",function(){
	    	hidePopup();
	    } );

	    // 确定按钮

	    $("#department").find(".save").on( "click",function(){
	    	var len = $("#department").find("li").length;
	    	var condition = $("#department").find("li");
	    	var str = "";
	    	for( var i = 0;i<len;i++ ){
	    		if( condition.eq(i).find(".selected").find("span").text() == "全部" ){
	    			str = str;
	    		}else{
	    			str = str + condition.eq(i).find(".selected").find("span").text() +"+";
	    		}

	    	}
	    	str = str.substring(0,str.length - 1);
	    	$(".manageSet").find(".clearfix").find("input").val( str );
	    	hidePopup();
	    } );


	    function hidePopup(){
	    	$("#previewPagePopup").hide();
	    	$("#department").hide();
	    	$("body").css( "overflow","visible" );
	    }

	    // 部门选择弹出框 E


	    // 样式切换

        $(".indexStyle").find("span").on( "click",function(){
        	if( $(this).find("input").val() == "自定义" ){
        		$(".baseInfo").find(".tags").find("span").removeClass("gray");
        		$(".baseInfo").find(".tags").find("input[type='file']").removeClass("dn");
        	}else{
        		$(".baseInfo").find(".tags").find("span").addClass("gray");
        		$(".baseInfo").find(".tags").find("input[type='file']").addClass("dn");
        	}
        } );

        // 上传样式包

        function uploadFile(file){
        	var arr = file.value.split("\\");
        	var fileName = arr[arr.length-1];
        	$(".baseInfo").find(".tags").find(".text").val( fileName );
        }

        // 关键词限制

        $("#otherInfo").find(".keyWords").find("input").on( "blur",function(){
        	var inputValue = $(this).val();
        	var keyWordsArr = inputValue.split( "," );
        	if( keyWordsArr.length > 5 ){
    			alert( "关键词数量超出范围" );
    		}
        	for(var i = 0; i<keyWordsArr.length;i++){
        		if( keyWordsArr[i].length>10 ){
        			alert( "关键词长度超出范围" );
        		}
        	}
        } );

//  课程大纲弹框 S

	// 添加按钮

	$(".dagangContent").find(".addDagangBtn").on( "click",function(){
		$("#editDagangPop").removeClass("dn");
		$("#popup").removeClass("dn");
		$("body").css( "overflow","hidden" );
	} );

	// 编辑按钮

	

	// 弹窗关闭
	$("#editDagangPop").find(".close").on( "click",function(){
		$("#editDagangPop").addClass("dn");
		$("body").css( "overflow","visible" );
		$("#popup").addClass("dn");
		// $("body").css( "overflow","initial" );
	} );

	// 展示收缩课程列表

	$("#editDagangPop").find( ".leftCont" ).find( ".overall" ).find(".folder").on( "click",function(){
		if( canClick() ){
			return false;
		};

		var _this = $(this);
		addFloder( _this );
	} ); 

	function addFloder(obj){

		if( obj.parent().hasClass("showCourse") ){
			obj.parent().get(0).className = "overall";
		}else{
			obj.parent().get(0).className = "overall showCourse";
			obj.parent().siblings().removeClass( "showCourse" );
			obj.parent().siblings().find("ul").slideUp();
		}
		obj.siblings().slideToggle();
	}

	// 判断能否点击

	function canClick(){
		if( $("#editDagangPop").find(".leftCont").find(".overall").hasClass("appendElement") || $("#dagangPopContent").find(".overall").hasClass("addCourses")){
			return true;
		}
	}

	// 鼠标移入文件夹

	$("#dagangPopContent").find(".overall").hover( function(){
		var _this = $(this);
		showSelected( _this );
	},function(){
		var _this = $(this);
		hideSelected( _this );
	} );

	function showSelected(obj){
		var courseList = $("#tableWrap").find("tr");
		if( obj.children().first().hasClass("folder") ){
			var selectList = obj.find( "li" );
			for(var i = 0;i<selectList.length;i++){
				for(var j = 0;j<courseList.length;j++){
					if( courseList.eq(j).find(".name").text() == selectList.eq(i).find(".nameText").text() ){
						courseList.eq(j).addClass( "active" );
					} 
				}
			}
		}else{
			var selectName = obj.find(".name").find("I").eq(1).text();
			for(var j = 0;j<courseList.length;j++){
				if( courseList.eq(j).find(".name").text() == selectName ){
					courseList.eq(j).addClass( "active" );
				} 
			}
		}
	}

	function hideSelected(obj){
		$("#tableWrap").find("tr").removeClass( "active" );
	}

	// 鼠标移入课件

	$("#dagangPopContent").find(".courseWareList").find("li").hover( function(event){
		var _this = $(this);
		showCourse( _this );
		event.stopPropagation();
	},function( event ){

	} );

	function showCourse( obj ){
		var selectName = obj.find(".nameText").text();
		var courseList = $("#tableWrap").find("tr");
		courseList.removeClass( "active" );
		for(var i = 0;i<courseList.length;i++ ){
			if( courseList.eq(i).find(".name").text() == selectName ){
				courseList.eq(i).addClass( "active" );
			} 
		}
	}

	// 右侧禁用

	function disableRight( num ){
		if( num == 0 ){
			$("#dagangPopContent").find(".rightCont").addClass( "init" );
		}else{
			$("#dagangPopContent").find(".rightCont").removeClass( "init" );
		}
	}

	// 左侧内容的长度
	var len = $("#dagangPopContent").find(".overall").length;
	disableRight( len );



	// 添加课件栏目

	$("#dagangPopContent").find(".courseName").find(".addCourseWareBtn").on( "click",function(){
		var chapter =  $("#dagangPopContent").find(".overall").last().attr( "data-pid" );
		var bigChapter;
		var smallChapter;
		
		//  左侧没有内容
		if( $("#dagangPopContent").find(".overall").length == 0 ){
			bigChapter = smallChapter = 1;
		}else{
			bigChapter = parseInt( chapter.split(".")[0] );
			smallChapter = parseInt( chapter.split(".")[1] );
			smallChapter += 1;
			if( smallChapter > 9){
				smallChapter = 0;
				bigChapter += 1;
			}
		}

		
		if( $("#dagangPopContent").find( "li" ).hasClass( "appendElement" ) ){
			return;
		}

		$("#dagangPopContent").find(".rightCont").removeClass( "init" );
		var str = '<li data-pid="'+ bigChapter +"."+ smallChapter +'" class="overall appendElement">'
				+		'<div class="courseWareName">'
				+			'<i class="arrow dn"></i>'
				+			'<i class="courseType"></i>'
				+			'<div class="contentWrap">'
				+				'<span class="name">'
				+					'<i>'+ bigChapter +"."+ smallChapter +'</i>'
				+					'<i class="nameText"></i>'
				+				'</span>'
				+				'<div class="inputWrap">'
				+					'<input type="text" value="" />'
				+					'<span class="sureBtn butn" title="确认"></span>'
				+				'</div>'
				+			'</div>'
				+			'<span class="delBtn" title="删除"></span>'
				+			'<span class="editBtn butn" title="编辑"></span>'
				+		'</div>'
				+	'</li>';
		$("#dagangPopContent").find(".courseWareListWrap").append(str);
		$("#dagangPopContent").find(".courseWareName").find(".sureBtn").on( "click",function(){
			var _this = $(this);
			sureCourse( _this );
		} );

		// 注册鼠标滑入事件

		$("#dagangPopContent").find(".overall").last().hover( function(){
			var _this = $(this);
			showSelected( _this );
		},function(){
			var _this = $(this);
			hideSelected( _this );
		} );

		// 注册删除事件

		$("#dagangPopContent").find( ".appendElement" ).find( ".delBtn" ).on( "click",function(){
			var _this = $(this);
			delCourse( _this );
		} );

		// 注册编辑事件

		$("#dagangPopContent").find(".leftCont").find(".overall").last().find(".editBtn").on( "click",function(){
			if( canClick() ){
				return false;
			};
			var _this = $(this);
			editFile( _this );
			event.stopPropagation();
		} );

		// 注册确认按钮

		$("#dagangPopContent").find(".leftCont").find(".overall").last().find(".sureBtn").on( "click",function(){
			var _this = $(this);
			editSure( _this );
			event.stopPropagation();
		} );

	} )

	function sureCourse( obj ){
		var fileName = obj.siblings().val();
		obj.parent().siblings(".name").find("i").eq(1).text( fileName );
		obj.parents("li").removeClass("appendElement");
	}

// 挑选课件S

	// 课件切换

	$("#createCourse").find(".createType").find("li").on( "click",function(){
		$(this).siblings().removeClass("current");
		$(this).addClass("current");
		$("#createCourse").find(".tabContent").css( "display","none" );
		$("#createCourse").find(".tabContent").eq( $(this).index() ).css( "display","block" );
	} );

	// 挑选

	$("#createCourse").find("table").find("tr").on( "click",function(){
		var _this = $(this);
		selectCourse( _this );
	} );

	function selectCourse( obj ){
		var nowText = obj.find(".name").text();
		var nowClassName = obj.find(".courseType").get(0).className;
		var chapter;
		if( $("#dagangPopContent").find(".overall").hasClass("appendElement") ){
			chapter = $("#dagangPopContent").find(".appendElement").attr( "data-pid" );
		}else if( $("#dagangPopContent").find(".overall").hasClass("editCourse") ){
			chapter = $("#dagangPopContent").find(".editCourse").attr( "data-pid" );
		}

		obj.toggleClass("active");
		obj.siblings().removeClass( "active" );
		if( $("#dagangPopContent").find(".appendElement").find("i").hasClass("courseType") ){
			$("#dagangPopContent").find(".appendElement").find("input").val( nowText );
			$("#dagangPopContent").find(".appendElement").find("I").eq(1).get(0).className = nowClassName;
			$("#dagangPopContent").find(".overall").last().find(".editBtn").on("click",function(){
				$(this).parents("li").addClass("editCourse");
			});
		}else{
			// 非文件夹编辑课件
			if( !($("#dagangPopContent").find(".editCourse").parents("li").hasClass("overall")) ){
				$("#dagangPopContent").find(".editCourse").find(".name").find("I").eq(0).text( chapter );
				$("#dagangPopContent").find(".editCourse").find("input").val( nowText );
			}
			else{
				$("#dagangPopContent").find(".editCourse").find("input").val( nowText );
			}

			// 文件夹中有课件时
			if( $("#dagangPopContent").find("li").hasClass("editCourse") ){
				$("#dagangPopContent").find(".editCourse").find("I").eq(0).get(0).className = nowClassName;
			}else if( $("#dagangPopContent").find(".overall").find(".courseWareName").hasClass("editStatu") ){
				console.log( "qq" );
				$("#dagangPopContent").find(".editStatu").find("input").val( nowText );
				$("#dagangPopContent").find(".editStatu").find(".courseType").get(0).className = nowClassName;
			}
			// 注册删除按钮
			$("#dagangPopContent").find(".addCourses").find(".delBtn").on( "click",function(){
				var _this = $(this);
				delCourse( _this );
			} );

			// 注册确认按钮

			$("#dagangPopContent").find(".addCourses").find(".sureBtn").on( "click",function(event){
				var _this = $(this);
				editSure( _this );
				event.stopPropagation();
			} );

		}
	}

// 挑选课件E

// 新增课件	S

	// 课件类型选择

	$("#createCourse").find(".createCourseWare").find(".options").find("p").on( "click",function(){
		$(this).siblings().removeClass("current");
		$(this).addClass("current");
		if( $(this).text() == "图文" ){
			$("#createCourse").find(".green").css( "display","none" );
		}else{
			$("#createCourse").find(".green").css( "display","inline-block" );
		}
		$("#createCourse").find(".uploadForm").addClass("dn");
		$("#createCourse").find(".uploadForm").eq( $(this).index() ).removeClass( "dn" );
		$("#createCourse").find(".uploadForm").find( ".willUploadVideo" ).addClass( "dn" );
		$("#createCourse").find(".uploadForm").find(".addVideoForm").removeClass("dn");
	} );

// 新增课件	E





	// 添加文件夹

	$("#dagangPopContent").find(".addFolderBtn").on( "click",function(){

		if( $("#dagangPopContent").find( "li" ).hasClass( "appendElement" ) ){
			return;
		}

		// 移出右侧禁用

		$("#dagangPopContent").find(".rightCont").removeClass( "init" );


		var chapter =  $("#dagangPopContent").find(".overall").last().attr( "data-pid" );
		var bigChapter;
		var smallChapter;
		
		//  左侧没有内容
		if( $("#dagangPopContent").find(".overall").length == 0 ){
			bigChapter = smallChapter = 1;
		}else{
			bigChapter = parseInt( chapter.split(".")[0] );
			smallChapter = parseInt( chapter.split(".")[1] );
			smallChapter += 1;
			if( smallChapter > 9){
				smallChapter = 0;
				bigChapter += 1;
			}
		}

		var courseWrap = $("#dagangPopContent").find(".courseWareListWrap");
		var str = '<li data-pid="'+ bigChapter+"."+ smallChapter +'" class="overall appendElement">'
				+		'<div class="folder">'
				+			'<i class="arrow"></i>'
				+			'<i class="filderIcon"></i>'
				+			'<div class="contentWrap">'
				+				'<span class="name">'
				+					'<i>'+ bigChapter+"."+ smallChapter +'</i>'
				+					'<i class="nameText"></i>'
				+				'</span>'
				+				'<div class="inputWrap">'
				+					'<input type="text" value />'
				+					'<span class="sureBtn butn" title="确认"></span>'
				+				'</div>'
				+			'</div>'
				+			'<span class="delBtn butn" title="删除"></span>'
				+			'<span class="addCourseWareBtn butn" title="添加课件"></span>'
				+			'<span class="editBtn butn" title="编辑"></span>'
				+		'</div>'
				+		'<ul class="courseWareList"></ul>'
				+	'</li>';
		courseWrap.append( str );

		// 注册鼠标滑入按钮

		$("#dagangPopContent").find(".overall").last().hover( function(){
			var _this = $(this);
			showSelected( _this );
		},function(){
			var _this = $(this);
			hideSelected( _this );
		} );

		// 确定图标

		$("#dagangPopContent").find(".appendElement").find(".sureBtn").on( "click",function(event){
			var _this = $(this);
			editSure( _this );
			event.stopPropagation();
		} );

		// 添加上的li

		var addLi = $("#dagangPopContent").find(".overall").last();

		// 展开文件夹

		addLi.find(".folder").on( "click",function(){
			var _this = $(this);
			addFloder( _this );
		} )

		// 编辑按钮

		addLi.find(".editBtn").on( "click",function(event){
			var _this = $(this);
			editFile( _this );
			event.stopPropagation();
		} );

		// 添加按钮

		addLi.find(".addCourseWareBtn").on( "click",function(event){
			var _this = $(this);
			folderAddCourse(_this);
			event.stopPropagation();
		} );	

		// 删除按钮

		addLi.find(".delBtn").on( "click",function(){
			$(this).parents("li").remove();
		} );

		// 输入框 

		addLi.find("input").on( "click",function(event){
			event.stopPropagation();
		} );

		
	} );

		// 返回按钮

		$("#editDagangPop").find(".return").on( "click",function(){
			$("#popup").addClass( "dn" );
			$("body").css( "overflow","visible" );
		} );

		// 课件编辑

		$("#dagangPopContent").find(".courseWareName").find(".editBtn").on( "click",function(event){
			if( canClick() ){
				return false;
			};
			var _this = $(this);
			editFile( _this );
			event.stopPropagation();
		} );

		// 主菜单编辑

		$("#dagangPopContent").find(".overall > div").find(".editBtn").on( "click",function(event){
			if( canClick() ){
				return false;
			};
			var _this = $(this);
			editFile( _this );
			event.stopPropagation();
		} )

		// 主菜单编辑
		function editFile( obj ){
			var oldName = obj.siblings(".contentWrap").find('I').eq(1).text();
			obj.parents("li").siblings().children().removeClass("editStatu");
			obj.siblings(".contentWrap").find("input").val( oldName );
			obj.parent().addClass( "editStatu" );
		}


	// 输入框点击事件事件

	$("#dagangPopContent").find(".appendElement").find("input").on( "click",function(event){
		event.stopPropagation();
	} );

	$("#dagangPopContent").find(".folder").find("input").on( "click",function(event){
		event.stopPropagation();
	} );

	// 编辑状态下确定图标

	$("#dagangPopContent").find(".folder").find(".sureBtn").on( "click",function(event){
		var _this = $(this);
		editSure( _this );
		event.stopPropagation();
	} );

	$("#dagangPopContent").find(".courseWareName").find(".sureBtn").on( "click",function(event){
		var _this = $(this);
		editSure( _this );
		event.stopPropagation();
	} );


	// 添加文件夹后确定图标

	$("#dagangPopContent").find(".appendElement").find(".sureBtn").on( "click",function(event){
		var _this = $(this);
		editSure( _this );
		event.stopPropagation();
	} );

	function editSure( obj ){
		var inputValue = obj.siblings().val();
		obj.parent().siblings().find(".nameText").text( inputValue );		
		obj.parents("li").removeClass( "appendElement" );
		obj.parents(".editStatu").removeClass( "editStatu" );
		obj.parents("li").removeClass( "editCourse" );
		obj.parents("li").removeClass( "addCourses" );
		obj.parents("li").addClass( "showCourse" );
	}

	// 文件夹添加课程

	$("#dagangPopContent").find(".folder").find(".addCourseWareBtn").on( "click",function(event){
		if( canClick() ){
			return false;
		};
		var _this = $(this);
		folderAddCourse(_this);
		event.stopPropagation();
	} );

	function folderAddCourse( obj ){
		var rightCont = $("#dagangPopContent").find(".rightCont");
		obj.parents("li").siblings().removeClass();
		obj.parents("li").siblings().addClass("overall");
		obj.parents("li").siblings().find("ul").slideUp();
		obj.parents(".overall").removeClass( "showCourse" );
		rightCont.removeClass( "init" );
		obj.parents("li").addClass( "addCourses" );
		var str = '<li>'
				+		'<div class="courseWareName editStatu">'
				+			'<i class="courseType"></i>'
				+			'<div class="contentWrap">'
				+				'<span class="name">'
				+					'<i></i>'
				+					'<i class="nameText">1.3FLMP2015角色认知</i>'
				+				'</span>'
				+				'<div class="inputWrap">'
				+					'<input type="text">'
				+					'<span class="sureBtn butn" title="确认"></span>'
				+				'</div>'
				+			'</div>'
				+			'<span class="delBtn" title="删除"></span>'
				+			'<span class="editBtn butn" title="编辑"></span>'
				+		'</div>'
				+	'</li>';
		obj.parent().siblings().slideDown();
		obj.parent().siblings().append( str );


		// 注册鼠标移入事件

			$(this).parents(".editCourse").hover( function(){
				var _this = $(this);
				showCourse( _this );
				event.stopPropagation();
			},function(){

			} );

		// 注册确定按钮
		obj.parent().siblings().find("li").last().find(".sureBtn").on( "click",function(){
			var _this = $(this);
			editSure( _this );
		} );

		// 注册编辑按钮

		obj.parent().siblings().find("li").last().find(".editBtn").on( "click",function(){
			$(this).parent().parent().addClass("editCourse");
			$("#dagangPopContent").find(".rightCont").removeClass( "init" );
		} );

		// 注册删除按钮

		obj.parent().siblings().find("li").last().find(".delBtn").on( "click",function(){
			var _this = $(this);
			delCourse( _this );
		} );
	}

	// 确定按钮

	$("#editDagangPop").find(".sure").on( "click",function(){
		// 左侧主菜单内容

		var leftContent = $("#dagangPopContent").find(".overall");
		$("#previewContent").find(".courseWareListWrap").empty();
		for(var i = 0;i < leftContent.length; i++){
			var chapter = leftContent.eq(i).attr( "data-pid" );
			var fileType = leftContent.eq(i).children().first().attr( 'class' );
			var iconType = leftContent.eq(i).find(".arrow").siblings("I").attr( "class" );
			var chapterName = leftContent.eq(i).children().first().find(".nameText").text();
			var folderDom = '<li data-pid="'+ chapter +'" class="overall">'
						+		'<div class="'+ fileType +'">'
						+			'<i class="arrow"></i>'
						+			'<i class="'+ iconType +'"></i>'
						+			'<span class="xuhao">'+ chapter +'</span>'
						+			'<span class="filderName">'+ chapterName +'</span>'
						+		'</div>'
						+		'<ul class="courseWareList"></ul>'
						+	'</li>';

			$("#previewContent").find(".courseWareListWrap").append( folderDom );

			// 注册展开功能

			$("#previewContent").find(".overall").eq(i).find(".folder").on( "click",function(){
				if( canClick() ){
					return false;
				};

				var _this = $(this);
				addFloder( _this );
			} );

			// 子菜单
			var subMenu = leftContent.eq(i).find("li");
			for( var j = 0;j< subMenu.length;j++){
				var content = '<li>'
							+		'<div class="courseWareName">'
							+			'<i class="'+ subMenu.eq(j).find(".courseType").attr("class") +'"></i>'
							+			'<span class="name">'+ subMenu.eq(j).find('.nameText').text() +'</span>'
							+		'</div>'
							+	'</li>';
				$("#previewContent").find(".overall").eq(i).find("ul").append( content );
			}
		}

		$("#previewContent").removeClass("dn");
		$("#previewContent").siblings().css("display","none");
		$("#popup").addClass( "dn" );
		$("body").css( "overflow","visible" );
	} )

	// 删除按钮

	$("#dagangPopContent").find(".delBtn").on( "click",function(){
		var _this = $(this);
		delCourse( _this );
	} )

	function delCourse( obj ){
		if( obj.parent().hasClass("courseWareName") ){
			obj.parent().parent().remove();
		}else{
			obj.parents("li").remove();
		}
		$("#tableWrap").find("tr").removeClass( "active" );
		// 左侧内容的长度
		var len = $("#dagangPopContent").find(".overall").length;
		disableRight( len );
	}

	// 关闭弹框

	$("#editDagangPop").find(".close").on("click",function(){
		$("#editDagangPop").addClass("dn");
		$("#popup").addClass("dn");
	});

	// 编辑按钮

	$("#editDagang").on( "click",function(){
		$('#popup').removeClass("dn");
		$("body").css( "overflow","hidden" );
		$('#editDagangPop').removeClass("dn");
	} );

	// 上传按钮
	var uploadFileSrc = "";
	var type = "";

	function previewFile(file)
    {
    	var arr = file.value.split("\\");
    	var mustSuffixes = $("#createCourse").find(".options").find(".current");
    	var fileName = arr[arr.length-1];
    	var fileSuffixes = fileName.split( "\." )[ fileName.split( "\." ).length-1 ];
    	if( mustSuffixes.hasClass("video") ){
    		uploadVideo( fileSuffixes,fileName );
    	}else if( mustSuffixes.hasClass("pic") ){
    		uploadPicture( file,fileSuffixes,fileName );
    	}else if( mustSuffixes.hasClass("webPage") ){
    		uploadWebPage( fileSuffixes,fileName );
    	}
    }

    // 上传视频 S

    function uploadVideo( fileSuffixes,fileName ){
    	var num = 0;
    	if( !(fileSuffixes == "avi" || fileSuffixes == "mp4") ){
    			alert("文件类型不对");
    			return;
    	}
    	$("#createCourse").find(".filterForm").find(".green").css( "display","none" );
    	$("#createCourse").find(".filterForm").find("input").addClass("dn");
    	$("#createCourse").find(".filterForm").find(".gray").css( "display","block" );
		$("#uploadVideo").find(".addVideoForm").addClass("dn");
		$("#uploadVideo").find(".willUploadVideo").find("p").text( fileName );
		var timer = setInterval( function(){
			num++;
			if( num == 100 ){
				clearInterval(timer);
				$("#uploadVideo").find(".willUploadVideo").find(".text").find('span').eq(1).text( "转码中" );
				transCoding( fileName );
			}
			$("#uploadVideo").find(".willUploadVideo").find(".uploaded").css( "width", num + "%" );
			$("#uploadVideo").find(".willUploadVideo").find(".num ").find("span").eq(0).text( num+"%" );
		},50 );
		$("#uploadVideo").find(".willUploadVideo").removeClass("dn");
		
    }

    // 上传视频 E

    // 上传图片 S

    function uploadPicture( obj,fileSuffixes,fileName ){
    	var srcArr = [];
    	var num = 0;
    	var ulDom = $("#uploadImage").find("ul");
    	var uplistLength = ulDom.find( ".upLoadList" ).length;
    	if( !(fileSuffixes == "png" || fileSuffixes == "jpg") ){
    			alert("文件类型不对");
    			return;
    	}
    	$("#createCourse").find(".filterForm").find(".green").css( "display","none" );
    	$("#createCourse").find(".filterForm").find("input").addClass("dn");
    	$("#createCourse").find(".filterForm").find(".gray").css( "display","block" );
		$("#uploadVideo").find(".addVideoForm").addClass("dn");
	    if (obj.files && obj.files[0])
	    {
	   		for(var i=0 ;i<obj.files.length;i++){
        		ulDom.append('<li class="clearfix upLoadList">'
	   			+		'<div class="text fl">'
	   			+			'<span class="bg"></span>'
	   			+			'<span class="statu">上传中</span>'
	   			+		'</div>'
	   			+		'<div class="name  fl">'+ obj.files[i].name +'</div>'
	   			+		'<div class="bar fl">'
	   			+			'<div class="uploaded" ></div>'
	   			+		'</div>'
	   			+		'<div class="num fl"></div>'
	   			+		'<i class="delBtn" title="删除"></i>'
	   			+	'</li>'
	   			+	'<li class="clearfix successList dn">'
	   			+		'<div class="imgWrap"><img src=""  /></div>'
	   			+		'<textarea></textarea>'
	   			+		'<i class="delBtn" title="删除"></i>'
	   			+	'</li>');

        		// 

	       		var reader = new FileReader();
		        reader.onload = function(evt){
		        	var str = evt.target.result;
					srcArr.push( str );
		        }
		        reader.readAsDataURL(obj.files[i]);
        	}

        	// 上传进度
        	for( var j=0 ;j<obj.files.length;j++ ){
        		progressBar( j+uplistLength,srcArr,j );
        	}

	    }
	    else //兼容IE
	    {
	        var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
	        obj.select();
	        var src = document.selection.createRange().text;
	        ulDom.append( '<li class="clearfix dn">'
						+		'<div class="imgWrap">'
						+			'<img src="images/addCourse.jpg">'
						+		'</div>'
						+		'<textarea></textarea>'
						+		'<i class="delBtn" title="删除"></i>'
						+	'</li>' );
	        ulDom.find(".imgWrap").html("<div class=uploadiImg style='width:100%;height:100%;margin-top:0px;"+sFilter+src+"\"'></div>");
	        
	        var timer = setInterval( function(){
				num++;
				if( num == 100 ){
					clearInterval(timer);
					ulDom.find("li").removeClass( "dn" );
					$("#createCourse").find(".filterForm").find(".green").css( "display","block" );
			    	$("#createCourse").find(".filterForm").find("input").removeClass("dn");
			    	$("#createCourse").find(".filterForm").find(".gray").css( "display","none" );
				}
				ulDom.find(".uploaded").css( "width",num+"%" );
				ulDom.find(".num").text( num+"%" );
			},50 );

	        uploadSrc = obj.value;
	    }
    	$("#uploadImage").find(".addVideoForm").addClass("dn");
    	$("#uploadImage").find(".willUploadVideo").removeClass("dn");
    }

    // 上传图片 E

    // 上传图片进度

    function progressBar( len,srcArr,srcArrIndex ){
    	var num = 0;
    	var ulDom = $("#uploadImage").find("ul");
    	var timer = setInterval( function(){
			num++;
			if( num == 100 ){
				clearInterval(timer);
				var type = "imgText";
				// addCourse( type,fileName );
				ulDom.find(".successList").eq( len ).find("img").attr( "src",srcArr[srcArrIndex] );
				ulDom.find(".successList").eq( len ).removeClass( "dn" );
				$("#createCourse").find(".filterForm").find(".green").css( "display","block" );
		    	$("#createCourse").find(".filterForm").find("input").removeClass("dn");
		    	$("#createCourse").find(".filterForm").find(".gray").css( "display","none" );
				ulDom.find(".upLoadList").eq( len ).remove();
			}
			ulDom.find(".upLoadList").eq( len ).find(".uploaded").css( "width",num+"%" );
			ulDom.find(".upLoadList").eq( len ).find(".num").text( num+"%" );
		},50 );

    }

    // 网页上传 S

    function uploadWebPage( fileSuffixes,fileName ){
    	var num = 0;
    	if( !(fileSuffixes == "zip" || fileSuffixes == "rar") ){
    			alert("文件类型不对");
    			return;
    	}
    	$("#createCourse").find(".filterForm").find(".green").css( "display","none" );
    	$("#createCourse").find(".filterForm").find("input").addClass("dn");
    	$("#createCourse").find(".filterForm").find(".gray").css( "display","block" );
		$("#uploadVideo").find(".addVideoForm").addClass("dn");


    }

    // 网页上传 E

    // 转码函数 S

    function transCoding( name ){
    	var i = 0;
    	var timer = setInterval( function(){
				i++;
				if( i == 100 ){
					clearInterval(timer);
					$("#uploadVideo").find(".willUploadVideo").addClass("dn");
					$("#uploadVideo").find(".success").removeClass("dn");
					$("#uploadVideo").find(".success").find("p").text( name );
					$("#createCourse").find(".filterForm").find(".green").css( "display","block" );
			    	$("#createCourse").find(".filterForm").find("input").removeClass("dn");
			    	$("#createCourse").find(".filterForm").find(".gray").css( "display","none" );
			    	// 添加课件 
			    	type = "video";
    				addCourse( type,name );
    				$("#tableWrap").find("tr").eq(1).on( "click",function(){
						var _this = $(this);
						selectCourse( _this );
					} );
				}
				$("#uploadVideo").find(".willUploadVideo").find(".uploaded").css( "width", i + "%" );
				$("#uploadVideo").find(".willUploadVideo").find(".num ").find("span").eq(0).text( i+"%" );
			},50 );
    }

    // 转码函数 E

    function addCourse( type,fileName ){
    	$("#editDagangPop").find(".leftCont").find(".appendElement").find(".courseType").addClass( type );
    	$("#editDagangPop").find(".leftCont").find(".appendElement").find("input").val( fileName );
		$("#tableWrap").find("tr").removeClass( "active" );
    	var trDom = '<tr class = "active">'
				+		'<td class="radioTd">'
				+			'<span class="radio" data-type="video" data-title="FLMP2015角色认知学习资料视频，FLMP2015角色认知学习资料视频">'
				+				'<i></i>'
				+			'</span>'
				+		'</td>'
				+		'<td>'
				+			'<p class="courseWareName">'
				+				'<i class="courseType '+ type +'"></i>'
				+				'<span class="name">' + fileName + '</span>'
				+			'</p>'
				+		'</td>'
				+		'<td>linjiayi lwx327814</td>'
				+		'<td>2016-08-23</td>'
				+	'</tr>';
		$("#tableWrap").find("tr").first().after( trDom );

		// 注册点击事件
		$("#tableWrap").find("tr").eq( 1 ).on( "click",function(){
			var _this = $(this);
			selectCourse( _this );
		} );

    }

    // 预览课程
 
    $("#previewContent").find( ".folder" ).on( "click",function(){
    	var _this = $(this);
		addFloder( _this );
    } );


//  课程大纲弹框 E


// 权限设置 S

	// 资源列表收缩 S

	$(".relation").find(".packUp").on( "click",function(){
		var bodyH;
		var leftBarH = $(".leftBar").height();
		$(this).toggleClass( "hide" );
		if( $(this).hasClass("hide") ){
			$(this).parents(".relation").find( ".resource" ).slideUp();
		}else{
			$(this).parents(".relation").find( ".resource" ).slideDown();
		}
		setTimeout(function(){
			bodyH = $("body").height();
			if( leftBarH < bodyH ){
				$(".leftBar").height( bodyH+70 );
			}
		},500);	

	} );

	// 资源列表收缩 E

	// 资源类型选择

	$("#relation").find(".options").find("p").on( "click",function(){
		$("#relation").find(".groupList").removeClass("active");
		$("#relation").find(".groupList").eq( $(this).index() ).addClass( "active" );
	} );

	// 新建群组弹框返回图标

	$("#addStudentPop").find(".closeMyPop").siblings("span").on("click",function(){
		$("#createGroupPop").show();
		$("#addStudentPop").hide();
	});

	// 添加规则集按钮

	$("#createGroupPop").find(".form").find(".green").on( "click",function(){
		$("#addStudentPop").css( "display","block" );
	} );

	// 确定按钮

	$("#createGroupPop").find(".confirm").on( "click",function(){
		$("body").css( "overflow","visible" );
		$("#createGroupPop").hide();
	} );

	// 添加条件子集按钮

	$("#addChild").on("click",function(){
		var str = '<li>'
				+		'<span>入职时间</span>'
				+		'<span class="del"></span>'
				+		'<i class="arrow"></i>'
				+	'</li>';
		$("#addStudentPop").find(".leftTab").find("ul").append( str );
	});

	// 切换左侧菜单栏

	$("#addStudentPop").find(".leftTab").find("li").on( "click",function(){
		$(this).siblings().removeClass("current");
		$(this).addClass( "current" );
		$("#addStudentPop").find(".rightContent").removeClass("current");
		$("#addStudentPop").find(".rightContent").eq( $(this).index() ).addClass("current");
	} );

	// 用户类型选择

	$("#addStudentPop").find(".userType").find("li").on( "click",function(){
		$(this).toggleClass("active");
	} );

	// 新建群组返回按钮

	$("#addStudentPop").find(".back").on( "click",function(){
		$("#addStudentPop").hide();
		$("#createGroupPop").show();
	} );

	// 关闭按钮

	$("#addStudentPop").find(".closeMyPop").on( "click",function(){
		$("#createGroupPop").hide();
		$("#addStudentPop").hide();
	} );

	// 确定按钮

	$("#addStudentPop").find(".confirm").on( "click",function(){
		$("#addStudentPop").hide();
	} );

// 权限设置 E

// 新增课件 S

	//字体大小设置

	$("#uploadImgText").find(".fontSize").on("click",function(){
		$(this).find("ul").slideToggle();
	});

	$("#uploadImgText").find(".fontSize").find("li").on("click",function(){
		
	});



// 新增课件 E


// 更改域S

	$("#changeDomain").on("click",function(){
		$("body").css( "overflow","hidden" );
		$("#previewPagePopup").css( "display","block" );
		$("#changField").css( "display","block" );
		
	});

// 更改域E

// 日历S

// $(".dateTime").find(".dateSelect").click( function(){
// 	var target = $(this);
// 	var windowW = $(window).width(),
// 					windowH = $(window).height(),
// 					documentW = $(document).width(),
// 					documentH = $(document).height();
// 				var elemHeight = target.outerHeight(),
// 					elemWidth = target.outerWidth(),
// 					elemLeft = target.offset().left,
// 					elemTop = target.offset().top;
// 				var windowTop = target[0].getBoundingClientRect().top,
// 					windowBottom = windowH-windowTop-elemHeight,
// 					windowLeft = target[0].getBoundingClientRect().left,
// 					windowRight = windowW-windowLeft;
// 				var calendarH = $("#showCalendar").height(),
// 					calendarW = $("#showCalendar").width();	
// 				var elemTop2, elemLeft2;
// 				//设置top定位
// 					if(windowTop>=calendarH+5){ //窗口上边够
// 						elemTop2 = elemTop-calendarH-5;
// 					}else if(windowBottom>=calendarH){ //窗口下边够
// 						elemTop2 = elemTop+elemHeight+5;
// 					}else if(elemTop>=calendarH+5){ //窗口上下都不够，但文档上边够
// 						elemTop2 = elemTop-calendarH-5;
// 					}else if(documentH-elemTop-elemHeight>calendarH+5){ //窗口上下都不够，但文档下边够
// 						elemTop2 = elemTop+elemHeight+5;
// 					}else{
// 						elemTop2 = elemTop+elemHeight+5;
// 					}
// 					$("#showCalendar").css({top:elemTop2});				
// 				//设置left定位
// 					if(windowRight>=calendarW){ //窗口右边够（主要以右边显示为主）
// 						elemLeft2 = elemLeft;
// 					}else if(windowW>=calendarW){ //窗口右边不够，但窗口整体够（设为靠右显示）
// 						elemLeft2 = elemLeft - (calendarW-windowRight)-5;
// 					}else if(documentW-elemLeft>=calendarH){ //窗口右边不够，但文档右边够
// 						elemLeft2 = elemLeft;	
// 					}else{ //窗口右边、文档右边都不够，文档左边够
// 						elemLeft2 = elemLeft - calendarW;
// 					}
// 					$("#showCalendar").css({left:elemLeft2});			
// } );





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