$(document).ready(function(){
	function hidepopup($popup){
		$("body").css( "overflow","visible" );
		$popup.hide();
	}
	function showpopup($popup){
		$("body").css( "overflow","hidden" );
		$popup.show();
	}
	$(".J-popup").click(function(){
		var $this = $(this);
		var $popup = $($this.data("popup-id"))
		
		if($popup.length){
			if($popup.is(":visible")){
				hidepopup($popup);
			}else{
				showpopup($popup)
			}
			if(!$popup.data("initclick")){
                $popup.data("initclick",true).on("click",".J-close",function(){
                    hidepopup($popup)
                });
			}

		}else{
			if($this.data("load")){
				return;
			}
			$this.data("load",true);
			$.ajax({url:$this.data("popup-page"),dataType:"text",success:function(html){
				$("body").append(html);
				$popup = $($this.data("popup-id")).show();
				$popup.data("initclick",true).on("click",".J-close",function(){
					hidepopup($popup)
				});
			},complete:function(){
				$this.data("load",false);
			}})

		}
		
	})

})
		

			
		
		

		
		
		
		
		
		
		
		