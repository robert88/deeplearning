$(document).ready(function(){
	//单选框
	$(document).on("click",".radio",function(){
		$(this).addClass("selected").siblings(".radio").removeClass("selected");
		$(this).children("input").attr("checked","checked").parent().siblings(".radio").children("input").removeAttr("checked");
		
		//考试编辑试卷固定随机组卷切换
//		if($("#fixedtest_radio").attr("checked")){
//			$(".fixedtest").removeClass("hidden");
//			$(".randomtest").addClass("hidden");
//		}
//		if($("#randomtest_radio").attr("checked")){
//			$(".randomtest").removeClass("hidden");
//			$(".fixedtest").addClass("hidden");
//		}
	})
	//复选框
	$(document).on("click",".checkbox",function(){
		if($(this).hasClass("selected")){
			$(this).removeClass("selected").children("input").removeAttr("checked");
		}else{
			$(this).addClass("selected").children("input").attr("checked","checked");
		}
	});
	
	//单选多选判断切换
	$(document).on("click",".multiple_choice_span",function(){
		$(".multiple_choice").removeClass("hidden");
		$(".multiple_choice").siblings("ul").addClass("hidden");
	});
	$(document).on("click",".single_choice_span",function(){
		$(".single_choice").removeClass("hidden");
		$(".single_choice").siblings("ul").addClass("hidden");
	});
	$(document).on("click",".tfng_choice_span",function(){
		$(".tfng_choice").removeClass("hidden");
		$(".tfng_choice").siblings("ul").addClass("hidden");
	});
	
	//单选多选判断添加li
	 $(document).on("click",".multiple_choice_addli",function(){
 	 	 $(this).before('<li><span class="checkbox "><i></i><input type="checkbox" name="" id="" value="" /></span><input type="text" name="" id="" value="" /><s class="remove_choice"></s></li>') 
 	 });
 	  $(document).on("click",".single_choice_addli",function(){
   		 $(this).before('<li><span class="my_radio"><i></i><input type="radio" name="1" id="" value="" /></span><input type="text" name="" id="" value="" /><s class="remove_choice"></s></li>')
 	 });
 	  $(document).on("click",".tfng_choice_addli",function(){
   		  	 $(this).before('<li><span class="my_radio"><i></i><input type="radio" name="1" id="" value="" /></span><input type="text" name="" id="" value="" /><s class="remove_choice"></s></li>')
 	 });
 	 //单选多选判断删除li
 	 $(document).on("click",".remove_choice",function(){
   		 $(this).parents("li").remove();
 	 });
	//单选题单选按钮
	$(document).on("click",".my_radio",function(){
			$(this).addClass("selected").children("input").attr("checked","checked");
			$(this).parent().siblings().children(".my_radio").removeClass("selected").children("input").removeAttr("checked")

	})	
	
	//新建群组弹窗左侧导航切换
	$(document).on("click",".st_leftside ul li",function(){
		$(this).addClass("select_focus").siblings().removeClass("select_focus");
		//$(this).children("i").addClass("remove_icon_selected").parent().siblings().children("i").removeClass("remove_icon_selected");
		//$(this).children("s").addClass("edit_icon_selected").parent().siblings().children("s").removeClass("edit_icon_selected");
		var index = $(this).index();
		$(".agd_right_showhide").children(".agd_right_showdiv").eq(index).removeClass("hidden").siblings(".agd_right_showdiv").addClass("hidden")
	});
	//编辑按钮
	$(document).on("click",".edit_icon_selected",function(){
		$(this).parents(".neirongk").hide();
		$(this).parents(".neirongk").siblings(".editli").show();
	})
	//编辑后确定
	$(document).on("click",".editli .queren_gou",function(){
		var editlival = $(this).siblings("input").val();
		$(this).parents(".editli").hide();
		$(this).parents(".editli").siblings(".neirongk").show();
		$(this).parents(".editli").siblings(".neirongk").children("p").html(editlival);
	})
	//编辑试卷弹窗关闭
	$(document).on("click",".closePopup",function(){
		$(this).parents(".select_test").addClass("hidden");
	})

	//固定组卷删除题目按钮
	$(document).on("click",".fixedtest .remove_icon",function(){
   		 $(this).parents("tr").remove();
 	 });
	//随机组卷删除题目按钮
	$(document).on("click",".randomtestli .remove_icon",function(){
   		 $(this).parents("p").siblings("p").remove();
   		  $(this).parents("p").remove();
 	 });
 	 
//	 	 $(document).on("click",".dropList",function(){
//				$(this).children(".options").slideToggle();										 
//		});
//		$(document).on("click",".options p",function(){
//				var thishtml =$(this).html();
//				$(this).parent(".options").siblings(".selected").children("span").html(thishtml);
//				$(this).parent(".options").hide();	
//		});
//		
		
		// 更改域弹窗
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
		
		
		
		$("#select_test").find(".closePopup").on( "click",function(){
			$("#select_test").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
		//考试 添加题目弹窗
		$(".st_add_test_btn,.st_list .st_table_td05 i").on("click",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").css( "display","block" );
			$("#select_test").css( "display","none" );
			$("#edit_test").css( "display","block" );
		}); 
		//考试 添加题目
		$(".select_test_ture").on("click",function(){
				var	nums = $(".st_list table tr:last").find(".st_table_td03").html();
				var numsstr=nums.substring(0,nums.length-1);
				var numsstradd = parseInt(numsstr)+1;
				var leixing = $(".st_titleline span").find("input[name=select][checked]").val();
				var teaxarea = $(".edit_box_area textarea").val();
				//var multiple_choice = $(".multiple_choice").
				
				var content = "";
					content += '<tr>';
					content += '<td class="st_table_td01"><span class="checkbox"><i></i><input type="checkbox" name="" id="" value=""></span></td>';
					content += '<td class="st_table_td02">【'+leixing+'】</td>';
					content += '<td class="st_table_td03">'+numsstradd+'.</td>';
					content += '<td class="st_table_td04">';
					content += '<h6 class="st_test_title">'+teaxarea+' </h6>';
					content += '	<p class="radio"><i></i><input type="radio" name="1" id="" value=""><span>aston aston assad ashton sofa </span></p>';
					content += '<p class="radio selected"><i></i><input type="radio" name="1" id="" value="" checked="checked"><span>aston aston assad ashton sofa </span></p>';
					content += '<p class="radio"><i></i><input type="radio" name="1" id="" value=""><span>aston aston assad ashton sofa </span></p>';
					content += '<p class="radio"><i></i><input type="radio" name="1" id="" value=""><span>aston aston assad ashton sofa </span></p>';
					content += '</td>';
					content += '<td class="st_table_td05"><i></i></td>';
					content += '</tr>';
				$(".st_list tbody").append(content);							
				
		}); 
		//考试 添加题目返回按钮
		$(".st_back_btn,.backselecttest").on("click",function(){
			$("#previewPagePopup").css( "display","block" );
			$("#select_test").css( "display","block" );
			$("#edit_test").css( "display","none" );
		}); 
		$("#edit_test").find(".closePopup").on( "click",function(){
			$("#edit_test").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
		
		//随机组卷radio
		$(".randomtest_radio").on("click",function(){
			$(".select_testbtn").addClass("suiji").removeClass("guding");
			$(".suiji_test").removeClass("hidden");
			$(".guding_test").addClass("hidden");	
				
		}); 
		$(".fixedtest_radio").on("click",function(){
			$(".select_testbtn").removeClass("suiji").addClass("guding");
			$(".guding_test").removeClass("hidden");
			$(".suiji_test").addClass("hidden");
		}); 
		//固定组卷确定按钮	
		$(".xztestture").on("click",function(){
			$(".fixedtest").removeClass("hidden");
			$(".guding").addClass("hidden");
			$("#previewPagePopup").hide();
			$("#select_test").hide();
			$("body").css( "overflow","visible" );
		
		}); 
		//随机组卷确定按钮
		$(".suijiture").on("click",function(){
			$(".randomtest").removeClass("hidden");
			$(".suiji").addClass("hidden");
			$("#previewPagePopup").hide();
			$("body").css( "overflow","visible" );
		});
		//考试 选择试卷弹窗
		$(document).on("click",".guding",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").show();
			$("#select_test").show();
			$("#random_test").hide();
		});
		
		//考试 添加随机试卷弹窗
		$(document).on("click",".suiji",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").show();
			$("#select_test").hide();
			$("#random_test").show();
		}); 
		$("#random_test").find(".closePopup").on( "click",function(){
			$("#random_test").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
		
		//点击弹窗遮罩层关闭
		$("#mask").on( "click",function(){
			$(this).siblings("div").hide();
			$("body").css( "overflow","visible");
			$("#previewPagePopup").hide();
		});
		
		
		
		// 权限维护 新增群组弹窗
		$(".add_group_btn").on("click",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").css( "display","block" );
			$("#permission_add_group").css( "display","block" );
		}); 
		$("#permission_add_group").find(".closePopup").on( "click",function(){
			$("#permission_add_group").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
		//权限维护按钮悬浮提示语
		$(".permission_table .btnList .iconBtn").hover(function(){
			$(this).children(".tips").css("display","block");
		},function(){
			$(this).children(".tips").css("display","none");
		})
		//权限维护删除按钮
		$(".permission_table .remove_icon").on("click",function(){
			$(this).parents("tr").remove();
		}); 
		//权限维护 更改域弹窗
		$(".permission_changedomain").on("click",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").css( "display","block" );
			$("#permission_changeDomainCont").css( "display","block" );
		}); 
		$("#permission_changeDomainCont").find(".closePopup").on( "click",function(){
			$("#permission_changeDomainCont").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
		//权限管理 新增群组 添加规则集弹窗
		$(".add_group_msg_rule").on("click",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").css( "display","block" );
			$("#agd_student_show").css( "display","block" );
		}); 
		
		$("#agd_student_show").find(".closePopup").on( "click",function(){
			$("#agd_student_show").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
		
		
		//任务新增关联学员弹窗
		$(".add_student_btn .icon").on("click",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").css( "display","block" );
			$("#select_group").css( "display","block" );
		}); 
		//任务新增关联学员弹窗
		$(".add_student").on("click",function(){
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").css( "display","block" );
			$("#select_group").css( "display","block" );
		}); 
		$("#select_group").find(".closePopup").on( "click",function(){
			$("#select_group").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
		//任务新增关联学员 选择学员群组切换
		$(".task_select_student").on("click",function(){
			$(".association_student").removeClass("hidden");
			$(".groupList").addClass("hidden");
		}); 
		$(".task_select_group").on("click",function(){
			$(".groupList").removeClass("hidden");
			$(".association_student").addClass("hidden");
		});
		//任务新增关联资源大图列表切换   考试关联课程大图列表切换  共用
	 	$(document).on("click",".bigImg",function(){
	   		 $(".bigimg_show").removeClass("hidden");
	   		 $(".listImg_show").addClass("hidden");
 	    });
 		$(document).on("click",".listImg",function(){
	   		 $(".listImg_show").removeClass("hidden");
	   		 $(".bigimg_show").addClass("hidden")
 		});
 		// 考试维护大图列表切换
 		$(document).on("click",".test_list_show .bigImg",function(){
 			 $(this).addClass("current").parent().siblings().find(".listImg").removeClass("current");
	   		 $(".bigimg_show").addClass("current");
	   		 $(".listImg_show").removeClass("current");
 	    });
 		$(document).on("click",".test_list_show .listImg",function(){
 			 $(this).addClass("current").parent().siblings().find(".bigImg").removeClass("current");
	   		 $(".listImg_show").addClass("current");
	   		 $(".bigimg_show").removeClass("current")
 		});
 	 
 		 //任务完成删除按钮
		$(".gl_resource .remove_icon,.gl_student .remove_icon").on("click",function(){
			$(this).parents("tr").remove();
		}); 
		//任务完成要求必修选修下拉
		$(".gl_require").on("click",function(){
			$(this).children(".gl_dropList").slideToggle("slow");
		}); 
		//任务完成选择必修选修
		$(".gl_dropList li").on("click",function(){
			var thishtml = $(this).html();
			$(this).parents(".gl_dropList").siblings("span").html(thishtml);
			
		}); 
 	 
 	  //任务 关联资源弹窗 考试 关联课程弹窗 公用
		$(document).on( "click",".cc_course",function(){
			$("#cc_listshow").show();
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").show();
			$(".ture_btn").addClass("yiguanlian_btn").removeClass("ziyuanguanl");
		} );
		 
		$(document).on( "click",".cc_paper",function(){
			$("#cc_listshow").show();
			$("body").css( "overflow","hidden" );
			$("#previewPagePopup").show();
			$(".ture_btn").removeClass("yiguanlian_btn").addClass("ziyuanguanl")
		} );
		
		
		$("#cc_listshow").find(".closePopup").on( "click",function(){
			$("#cc_listshow").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
 	 
 	 	//关联课程按钮
 		 $(document).on( "click",".yiguanlian_btn",function(){
 		 	$(".cc_course").remove();
			$("#glbigimgshow").show();
			$("#cc_listshow").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
 	 	 $(document).on( "click",".ziyuanguanl",function(){
 	 	 	$(".cc_paper").remove();
			$("#gllistshow").show();
			$("#cc_listshow").hide();
			$("body").css( "overflow","visible" );
			$("#previewPagePopup").hide();
		});
 	 
 	 //添加题库 挑选题目左边导航
	 	 $(document).on( "click","#select_test .add_test",function(){
	 	 	if($(".addstli").length>=1){
	 	 		
	 	 	}else{
	 	 	 $("#select_test .st_leftside ul").append('<p class="addstli"><input type="text"><i class="queren_gou"></i></p>')	
	 	 	}
		 });
		  $(document).on( "click","#select_test .queren_gou",function(){
	 	 	var neironf = $(".addstli input").val();
	 	 	if( neironf=="" || neironf == undefined){
	 	 		$(this).parents(".addstli").remove();
	 	 	}else{
	 	 	 $("#select_test .st_leftside ul").append('<li><div class="neirongk"><p>'+neironf+'</p><s class="edit_icon_selected"></s><i class="remove_icon_selected"></i></div><div class="editli hidden"><input type="text"><i class="queren_gou"></i></div></li>');
	 	 	 $(this).parents(".addstli").remove();
	 	 	}
		 });
		 
		  $(document).on( "click","#select_test .remove_icon_selected",function(){
 	 	 		$(this).parents("li").remove();
		  });
		   //添加题库 编辑试卷左边导航
	 	 $(document).on( "click","#edit_test .add_test",function(){
	 	 	if($(".addstli").length>=1){
	 	 		
	 	 	}else{
	 	 	 $("#edit_test .st_leftside ul").append('<p class="addstli"><input type="text"><i class="queren_gou"></i></p>')	
	 	 	}
		 });
		  $(document).on( "click","#edit_test .queren_gou",function(){
	 	 	var neironf = $(".addstli input").val();
	 	 	if( neironf=="" || neironf == undefined){
	 	 		$(this).parents(".addstli").remove();
	 	 	}else{
	 	 	 $("#edit_test .st_leftside ul").append('<li><div class="neirongk"><p>'+neironf+'</p><s class="edit_icon_selected"></s><i class="remove_icon_selected"></i></div><div class="editli hidden"><input type="text"><i class="queren_gou"></i></div></li>');
	 	 	 $(this).parents(".addstli").remove();
	 	 	}
		 });
		 
		  $(document).on( "click","#edit_test .remove_icon_selected",function(){
 	 	 		$(this).parents("li").remove();
		  });
		   //添加条件子集 权限添加规则集弹窗
	 	 $(document).on( "click","#agd_student_show .add_test",function(){
	 	 	if($(".addstli").length>=1){
	 	 		
	 	 	}else{
	 	 	 $("#agd_student_show .st_leftside ul").append('<p class="addstli"><input type="text"><i class="queren_gou"></i></p>')	
	 	 	}
		 });
		  $(document).on( "click","#agd_student_show .queren_gou",function(){
	 	 	var neironf = $("#agd_student_show .addstli input").val();
	 	 	if( neironf=="" || neironf == undefined){
	 	 		$(this).parents(".addstli").remove();
	 	 	}else{
	 	 	 $("#agd_student_show .st_leftside ul").append('<li><div class="neirongk"><p>'+neironf+'</p><s class="edit_icon_selected"></s><i class="remove_icon_selected"></i></div><div class="editli hidden"><input type="text"><i class="queren_gou"></i></div></li>');
	 	 	 $(this).parents(".addstli").remove();
	 	 	}
		 });
		 
		  $(document).on( "click","#agd_student_show .remove_icon_selected",function(){
 	 	 		$(this).parents("li").remove();
		  });
		  //添加条件子集 权限维护
	 	 $(document).on( "click","#permission_add_group .add_test",function(){
	 	 	if($(".addstli").length>=1){
	 	 		
	 	 	}else{
	 	 	 $("#permission_add_group .st_leftside ul").append('<p class="addstli"><input type="text"><i class="queren_gou"></i></p>')	
	 	 	}
		 });
		  $(document).on( "click","#permission_add_group .queren_gou",function(){
	 	 	var neironf = $("#permission_add_group .addstli input").val();
	 	 	if( neironf=="" || neironf == undefined){
	 	 		$(this).parents(".addstli").remove();
	 	 	}else{
	 	 	 $("#permission_add_group .st_leftside ul").append('<li><div class="neirongk"><p>'+neironf+'</p><s class="edit_icon_selected"></s><i class="remove_icon_selected"></i></div><div class="editli hidden"><input type="text"><i class="queren_gou"></i></div></li>');
	 	 	 $(this).parents(".addstli").remove();
	 	 	}
		 });
		 
		  $(document).on( "click","#permission_add_group .remove_icon_selected",function(){
 	 	 		$(this).parents("li").remove();
		  });
		  
		  //权限管理学员列表删除按钮
		  $(document).on( "click",".ags_list_table td .remove_icon",function(){
 	 	 		$(this).parents("tr").remove();
		  });
		  
		  $(document).on( "click",".listView td .checkboxWrap",function(){
 	 	 		if($(this).hasClass("selected")){
 	 	 			$(this).parents("tr").css("background","#f0f8fb");
 	 	 		}
		  });
 	 
})
		

			
		
		

		
		
		
		
		
		
		
		