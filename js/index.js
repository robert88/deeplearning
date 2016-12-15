//首页主体内容 导航区宽度
		$(window).bind("load resize", function(){
				var moduleWidth = $(".indexModule").width(),
					iconWidth = $(".indexModule dd").width();
				$(".indexModule dt").width(moduleWidth-iconWidth-28); //28为左侧间距
				
		});
		

			
		
		

		
		
		
		
		
		
		
		