$(document).ready(function(){
		//点击弹窗的遮罩层关闭弹窗
		$("#mask").on( "click",function(){
			$(this).siblings("div").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});

		/*课程大纲*/
		//课程大纲弹窗
		$(".add_courses_introduction").on("click",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").css( "display","block" );
			$("#edit_courses_introduction").css( "display","block" );
		}); 
		$("#edit_courses_introduction").find(".closePopup").on( "click",function(){
			$("#edit_courses_introduction").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
		//课程大纲弹窗左边下拉
		$(".eci_dropdown_title").on("click",function(){
		    $(this).siblings(".eci_dropdown_list").slideToggle("slow");
		    $(this).find(".dropDown_icon").toggleClass("rotate90")
		  });
		//课程大纲左边编辑
		$(".add_eci_liinput .gou_icon").on("click",function(){
			var  inputval = 	$(this).siblings("input").val();
			$(this).parents(".add_eci_liinput").siblings(".ecipp").append('：'+inputval);
			$(this).parents(".add_eci_table_li").append('<i class="aimat_icon"></i><i class="aid_icon"></i>');
			$(this).parents(".add_eci_liinput").remove();
		});
		$(".add_eci_table_li .remove_icon").on("click",function(){
			$(this).parent(".add_eci_table_li").remove();
		});
		$(".public .gou_icon").on("click",function(){
			var inval = 	$(this).siblings("input").val();
			var xueshival = 	$("#xueshival").val();
			var xuefenval = $("#xuefenval").val();
			$(this).parents("li").append('<div class="eci_dropdown"><p class="eci_dropdown_title"><i class="dropDown_icon"></i><i class="file_icon"></i>'+inval+'<span>'+xueshival+'  '+xuefenval+'</span></p></div>')
			$(this).parents(".add_eci_table_li").remove();
		});
		//课程大纲弹窗右边nav切换
		$(".eci_right_title span").on("click",function(){
		    $(this).addClass("eci_select_focus").siblings().removeClass("eci_select_focus");
		  });
		 //课程大纲弹窗右边radio
	    $(document).on("click",".msc_table .radio",function(){
			$(this).addClass("selected").parent("td").parent("tr").siblings("tr").find(".radio").removeClass("selected");
			$(this).children("input").attr("checked","checked").parent("p").parent("td").parent("tr").siblings("tr").find(".radio").children("input").removeAttr("checked");
		})
	    
		//课程大纲预览页面编辑按钮弹窗
		$(".class_list .edit_icon_btn").on("click",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").css( "display","block" );
			$("#edit_courses_introduction").css( "display","block" );
		}); 
		
		
		
		
		
		/*维护*/
		 //维护列表显示发布课程弹窗
		$("#startClasstip").on("click",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").css( "display","block" );
			$("#startClass").css( "display","block" );
		}); 
		$("#startClass").find(".closePopup").on( "click",function(){
			$("#startClass").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
		// 维护大图列表显示更改域弹窗
		$("#test_changeDomain").on("click",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").css( "display","block" );
			$("#changeDomainCont").css( "display","block" );
		}); 
		
		$("#changeDomainCont").find(".closePopup").on( "click",function(){
			$("#changeDomainCont").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
		
		
		
		
		/*班级管理  */
		//班级管理导航条切换
		$(".kbaz_nav ul li").on("click",function(){
			$(this).addClass("kn_select").siblings().removeClass("kn_select");
			var index = $(this).index();
			$(".kbsz").children(".kbaz_nav_div").eq(index).show().siblings(".kbaz_nav_div").hide();
			
		}); 
		//班级管理开班设置报名审核radio切换
		$(document).on("click",".bmsh .radio",function(){
			$(this).addClass("selected").siblings().removeClass("selected");
			$(this).children("input").attr("checked","checked").parent("span").siblings().children("input").removeAttr("checked");
		})
		
		//公告icon悬浮提示显示		
		$(".ggxq_table .icon").hover(function(){
			$(this).children(".tips").show();
		},function(){
			$(this).children(".tips").hide();
		})
		//公告删除
		$(".ggxq_table .removeIcon").on("click",function(){
				$(this).parents("tr").remove();
		});
		// 新增公告弹窗
		$(".ags_gonggao_btn").on("click",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").css( "display","block" );
			$(".gonggaopop").css( "display","block" );
		}); 
		
		$(".gonggaopop").find(".closePopup").on( "click",function(){
			$(".gonggaopop").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
		//学员选择后悬浮
		$(".xygl_view_bigImg .liBox .checkboxWrap").on("click",function(){
			if($(this).hasClass("selected")){
				$(this).parents(".liBox").css("box-shadow","2px 2px 7px #ddd")
			}else{
				$(this).parents(".liBox").css("box-shadow","0 0 0 #ddd")
			}
		})
		//学员全选后悬浮
		$(".xygl_view_bigImg .selectAll .checkboxWrap").on("click",function(){
			if($(".selectAll .checkboxWrap").hasClass("selected")){
				$(".xygl_view_bigImg").find(".liBox").css("box-shadow","2px 2px 7px #ddd")
			}else{
				$(".xygl_view_bigImg").find(".liBox").css("box-shadow","0 0 0 #ddd")
			}
		})
		//学员管理与小组管理切换
		$(".student_nav .xygl").on("click",function(){
			$(this).addClass("selected").siblings().removeClass("selected");
			$(".group_management_table,.student_management").hide();
			$(".xyguanli").show();
		})
		$(".student_nav .xzgl").on("click",function(){
			$(this).addClass("selected").siblings().removeClass("selected");
				$(".xyguanli").hide();
				$(".student_management").hide();
				$(".group_management_table").show();
		})
		//小组管理删除行
		$(".group_management_table .remove_icon").on("click",function(){
				$(this).parents("tr").remove();
		});
		//学员管理大图列表展示切换
		$(".xyguanli .navType .bigImg").on("click",function(){
			$(this).addClass("current").siblings().removeClass("current");
				$(".xygl_view_bigImg").show();
				$(".xygl_view_list").hide();
		})
		$(".xyguanli .navType .listImg").on("click",function(){
			$(this).addClass("current").siblings().removeClass("current");
				$(".xygl_view_list").show();
				$(".xygl_view_bigImg").hide();
		})
		//学员列表展示进度查看详情
		$(".xygl_view_list .xugl_ckxq").on("click",function(){
				$(".xyguanli").hide();
				$(".student_management").show();
		})
		//学员学习详情下拉
		$(".xxxq_dropdown_click").on("click",function(){
		    $(this).siblings(".xxxq_dropdown_response").slideToggle();
		    $(this).find(".dropDown_icon").toggleClass("rotate90")
		});
		//班级管理显示页面图标悬浮显示提示语
		$(".bjgl_table .btnList .icon").hover(function(){
			$(this).siblings(".tips").show();
		},function(){
			$(this).siblings(".tips").hide();
		})
		 //查看作业详情
	    $(document).on("click",".hw_ckxq",function(){
	   		 $(".hw_zyxq").show();
	   		 $(".homework").hide();
 		});
		
		
		/*权限*/
		//	权限设置添加规则集弹窗
		$(".createGroup .li3 span").on("click",function(){
				$("body").css( "overflow","hidden" );
				$("#createGroupPop").hide();
				$("#previewPagePopup").show();
				$("#agd_student_show").show();
		})
		$("#agd_student_show").find(".closePopup").on( "click",function(){
			$("#agd_student_show").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
		//新增角色
		$(".ags_addstuent_btn").on("click",function(){
				var html = "";
				html += '<li><div class="add_admin_people_td"><div class="role clearfix">'
				html += '<span class="role_span">角色</span>'			
				html += '<div class="dropList">'
				html += '<p class="selected"><span>讲师2</span><i></i></p>'
				html += '<div class="options" style="display: none;">'
				html += '<p>讲师1</p><p>讲师2</p>'
				html += '</div></div></div>'
				html += '<div class="admin_input clearfix">'
				html += '<span class="admin_input_span">管理员</span>'
				html += '<input type="text" name="" id="" value="">'
				html += '</div>'
				html += '<div class="add_role_icon clearfix"><i class="ari_add"></i><i class="ari_delete"></i></div>'
				html += '</div></li>'
				if($(".add_admin_people_td").length>=1){
					alert("请不要重复点击")
				}else{
					$(".admin_people ul").append(html);
				}
		})
		//新增角色确定
		$(document).on("click",".ari_add",function(){
			var thisname = $(this).parents(".add_role_icon").siblings().find(".dropList span").html();
			var guanliy = $(this).parents(".add_role_icon").siblings(".admin_input").find("input").val();
				var html = "";
				html += '<li><div class="admin_people_td">'
				html += '<div class="ad_headimg"><img src="images/areaAdd01.jpg"></div>'			
				html += '<div class="ad_msg">'
				html += '<p class="position">'+thisname+'<i></i></p>'
				html += '<p class="name">'+guanliy+'</p>'
				html += '<p class="edit_icon">'
				html += '<i class="edit_icon01"></i><i class="edit_icon02"></i><i class="edit_icon03"></i>'
				html += '</p>'
				html += '<i class="hover_delete_icon"></i>'
				html += '</div></div></li>'
				$(".admin_people ul").append(html);
				$(".add_admin_people_td").remove()
		})
		//悬浮删除角色设置
		$(document).on("click",".admin_people .hover_delete_icon",function(){
				$(this).parents("li").remove();
		});			
		
		//下拉选择
	    $(document).on("click",".add_admin_people_td .options p",function(){
	   		var thishtml = $(this).html();
	   		 $(this).parent(".options").siblings(".selected").find("span").html(thishtml);
 	    });
		
		//圆
		 $('.circle').each(function(index, el) {
	        var num = $(this).find('span').text() * 3.6;
	        if (num<=180) {
	            $(this).find('.right').css('transform', "rotate(" + num + "deg)");
	        } else {
	            $(this).find('.right').css('transform', "rotate(180deg)");
	            $(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
	        };
	    });
	    
	    //大图列表切换
	    $(document).on("click",".bigImg",function(){
	   		 $(".moocweihubigimgshow").removeClass("hidden");
	   		 $(".moocweihulistshow").addClass("hidden");
 	    });
 		$(document).on("click",".listImg",function(){
	   		 $(".moocweihulistshow").removeClass("hidden");
	   		 $(".moocweihubigimgshow").addClass("hidden")
 		});
	   
		
})
		
			
		
		

		
		
		
		
		
		
		
		