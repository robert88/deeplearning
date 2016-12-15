/*
 * 日历控件（jquery扩展插件）
 * 调用示例：
	$.openCalendar({
		element: '', //日期输入框的class或ID，如（".className" / "#idName"）
		showHours: false, //是否显示小时、分种、秒
		minDate: '', //可以用now表示最小时间为现在；如果不为now，日期分隔符需用-（如2015-3-2）
		maxDate: '', //可以用now表示最大时间为现在；如果不为now，日期分隔符需用-（如2011-05-22）
		initMinDate: false, //是否初始化为最小时间
		callback: function(param){
			//点确定或今天后的回调函数，参数表示选择的日期值（如2015-3-2）
			alert("回调返回选择时间：" + param);
		} 
	});
*/
;(function($){
    $.extend({
		"openCalendar": function(options){
			var opt={
				element: '', //日期输入框的class或ID，如（".className" / "#idName"）
				showHours: false, //是否显示小时、分种、秒
				minDate: '', //可以用now表示最小时间为现在；如果不为now，日期分隔符需用-（如2015-3-2）
				maxDate: '', //可以用now表示最大时间为现在；如果不为now，日期分隔符需用-（如2011-05-22）
				initMinDate: false, //是否初始化为最小时间
				callback: function(param){} //点确定或今天后的回调函数，参数表示选择的日期值（如2015-3-2）
			};
			$.extend(opt,options);
			
			$(opt.element).focus(function(){
				$("#showCalendar").remove(); 
				calendar( $(this) );
			});

			$(".dateTime").find(".dateSelect").on("click",function(e){
				$("#showCalendar").remove(); 
				$(this).addClass("active");
				calendar( $(this) );
				event.stopPropagation();
			});
			
			//把显示日历的控件全部封装在一个函数内
			function calendar(e){
				var target = e,
					currentY,
					currentM;
				var today = new Date();
				var thisYear = today.getFullYear(),
					todayMonth = today.getMonth(), //获得当前月份
					thisDay = today.getDate(),
					thisHours = today.getHours(),
					thisMinutes = today.getMinutes(),
					thisSeconds = today.getSeconds();
				var week = new Array("日","一","二","三","四","五","六"); //定义星期数组
				var monthDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31); //设置月份天数，一三五七八十腊（十二）为大月31天
				//初始化时间
				var initDate = target.val();
				//最小时间
				var minYear, minMonth, minDay;
				if( opt.minDate ){
					if( opt.minDate=="now" ){
						minYear = thisYear;
						minMonth = todayMonth+1;
						minDay = thisDay;
					}else{
						var minDate = opt.minDate;
							minDate = minDate.split("-");
						minYear	= minDate[0];
						minMonth= parseInt(minDate[1]);
						minDay	= parseInt(minDate[2]);
					}
				}else{
					minYear = thisYear-10;
					minMonth = 1;
					minDay = 1;
				}
				//最大时间
				var maxYear, maxMonth, maxDay;
				if( opt.maxDate ){
					if( opt.maxDate=="now" ){
						maxYear = thisYear;
						maxMonth = todayMonth+1;
						maxDay = thisDay;
					}else{
						var maxDate = opt.maxDate;
							maxDate = maxDate.split("-");
						maxYear	= maxDate[0];
						maxMonth= parseInt(maxDate[1]);
						maxDay	= parseInt(maxDate[2]);
					}
				}else{
					maxYear = thisYear + 10;
					maxMonth = 12;
				}
				
				//设置年份范围
				var selectYearsOption = "";
				for(var y=minYear; y<=maxYear; y++){
					selectYearsOption += '<option value="' + y + '">' + y + ' 年</option>';
				}
				var selectHoursMinutes = "";
				if(opt.showHours==true){
					//设置小时选择范围
					var selectHoursOption = "";
					for(var h=0; h<=24; h++){
						if(h<10){ h="0"+h; }
						if(h==thisHours){
							selectHoursOption += '<option value="' + h + '" selected="selected">' + h + ' 时</option>';
						}else{
							selectHoursOption += '<option value="' + h + '">' + h + ' 时</option>';
						}
					}
					//设置分钟选择范围
					var selectMinutesOption = "";
					for(var m=0; m<=60; m++){
						if(m<10){ m="0"+m; }
						if(m==thisMinutes){
							selectMinutesOption += '<option value="' + m + '" selected="selected">' + m + ' 分</option>';
						}else{
							selectMinutesOption += '<option value="' + m + '">' + m + ' 分</option>';
						}						
					}
					//设置秒数选择范围
					var selectSecondsOption = "";
					for(var s=0; s<=60; s++){
						if(s<10){ s="0"+s; }
						if(s==thisSeconds){
							selectSecondsOption += '<option value="' + s + '" selected="selected">' + s + ' 秒</option>';
						}else{
							selectSecondsOption += '<option value="' + s + '">' + s + ' 秒</option>';
						}						
					}
					selectHoursMinutes = "<p class='second-p'><select class='currentHour'>" + selectHoursOption + "</select>" +
											"<select class='currentMinute'>" + selectMinutesOption + "</select>" + 
											"<select class='currentSecond'>" + selectSecondsOption + "</select></p>";
				}
				//判断页面上是否存在ID为showCalendar的DIV，如果不存在，则添加
				var dataLength=  $("body").find("#showCalendar").length;
				if(dataLength!=0){
					$("#showCalendar").show();
				}else{
					$("body").append("<div id='showCalendar'></div>");
					//定义放置日历的相关元素
					$("#showCalendar").show().html(
						"<div class='calendar monthFirst'>"+
							"<div class='current-date'><p class='first-p'>"+
								"<a href='javascript:;' id='preY' title='上一年'> << </a>"+
								"<a href='javascript:;' id='pre' title='上一月'> < </a>"+
								"<a href='javascript:;' id='nextY' title='下一年'> >> </a>"+
								"<a href='javascript:;' id='next' title='下一月'> > </a>"+
								"<select class='currentYear'>" + selectYearsOption + "</select>"+	
								"<select class='currentMonth'>"+
									"<option value='1'>1月</option>"+
									"<option value='2'>2月</option>"+
									"<option value='3'>3月</option>"+
									"<option value='4'>4月</option>"+
									"<option value='5'>5月</option>"+
									"<option value='6'>6月</option>"+
									"<option value='7'>7月</option>"+
									"<option value='8'>8月</option>"+
									"<option value='9'>9月</option>"+
									"<option value='10'>10月</option>"+
									"<option value='11'>11月</option>"+
									"<option value='12'>12月</option>"+
								"</select></p>" + 
							"</div>"+						
							"<ul></ul>"+
							selectHoursMinutes+
							//"<p class='databtnlist'><span class='cleartime'>清空</span><span class='today'>今天</span><span class='closecalendar'>关闭</span><span class='submit'>确定</span></p>"+
							"<p class='databtnlist'><span class='submit'>确定</span><span class='cleartime'>清空</span><span class='today'>今天</span><span class='closecalendar'>关闭</span></p>"+
						"</div>"
						);
				}
				//定义日历渲染函数 
				function showCalendar(monthNum,year,isChange){
					if(isChange){
						//oldDay需放在函数顶部获取，因为下边将UL清空了
						var oldDay = $("#showCalendar ul li.selected").text();
					}
					$("#showCalendar .calendar ul").html(""); // 清空日历记录
					//重写底部按纽栏HTML，防止按纽事件执行多次
					if( maxYear<thisYear || (maxYear==thisYear && maxMonth<todayMonth+1) || (maxYear==thisYear && maxMonth==todayMonth+1 && maxDay<thisDay )){
						//如果最大时间小于今天，则不显示按纽：今天
						$("#showCalendar .databtnlist").empty().html("<p class='databtnlist'><span class='submit'>确定</span><span class='cleartime'>清空</span><span class='closecalendar'>关闭</span></p>");
					}else{
						$("#showCalendar .databtnlist").empty().html("<p class='databtnlist'><span class='submit'>确定</span><span class='cleartime'>清空</span><span class='today'>今天</span><span class='closecalendar'>关闭</span></p>");
					}
					//判断年份和月份 (这一步是关键，日历表中的年月日都需要由此步获得的年月来取得相应的值,即currentYear, currentMonth, nextYear, nextMonth)
					var currentYear = year;
					var currentMonth = monthNum; //monthNum%12;
					var nextYear = currentYear+1;
					var nextMonth = currentMonth +1;
					if(currentMonth==0){
						currentMonth=12;
						currentYear = currentYear - 1;
					}
					if(currentMonth>12){
						currentMonth=1;
						currentYear = currentYear + 1;
					}
					//判断是否为闰年，设置2月份的天数
					if ( (currentYear%4==0) && (currentYear%100!=0) || (currentYear%400==0) ) {
						monthDays[1] = 29;
					}else{
						monthDays[1] = 28;
					}

					//初始化 输出当前日期时间
					if(!isChange){
						var dateArray=[], timeArray=[], timeArray2=[];
						//如果有初始化时间
						if( initDate!='' ){
							//如果显示时、分、秒
							if( /:/.test(initDate) ){
								//取得初始化的时分秒
								if( / /.test(initDate) ){
									//前面有年月日
									timeArray = initDate.split(" ");
									timeArray2 = timeArray[1].split(":");
									dateArray = timeArray[0];
								}else{
									//前面没有年月日
									var timeArray2 = timeArray[0].split(":");
								}
								var currentHour = timeArray2[0],
									currentMinute = timeArray2[1],
									currentSecond = timeArray2[2];
								
								//取得初始化的年月日
								if( dateArray.length>0 ){
									if( /\./.test(initDate) ){
										dateArray = dateArray.split(".");
									}else if( /\//.test(initDate) ){
										dateArray = dateArray.split("/");
									}else if( /\-/.test(initDate) ){
										dateArray = dateArray.split("-");
									}
									currentYear = dateArray[0];
									currentMonth = parseInt(dateArray[1]);
									var initDay = parseInt(dateArray[2]);
									thisDay = parseInt(dateArray[2]);
								}
							}
							//如果不显示时、分、秒
							else{
								if( /\./.test(initDate) ){
									dateArray = initDate.split(".");
								}else if( /\//.test(initDate) ){
									dateArray = initDate.split("/");
								}else if( /\-/.test(initDate) ){
									dateArray = initDate.split("-");
								}
								currentYear = dateArray[0];
								currentMonth = parseInt(dateArray[1]);
								var initDay = parseInt(dateArray[2]);
								thisDay = parseInt(dateArray[2]);
							}
							
							//初始化时，如果初始化日期大于最大时间，则日历显示最大时间
							if( Date.parse(currentYear+'-'+currentMonth+"-"+initDay)>=Date.parse(maxYear+'-'+maxMonth+"-"+maxDay) ){
								currentYear = maxYear;
								currentMonth = maxMonth;
								initDay = maxDay;
								thisDay = maxDay;
							}
							//初始化时，如果初始化日期小于最小时间，则日历显示最小时间
							if( Date.parse(currentYear+'-'+currentMonth+"-"+initDay)<Date.parse(minYear+'-'+minMonth+"-"+minDay) ){
								currentYear = minYear;
								currentMonth = minMonth;
								initDay = minDay;
								thisDay = minDay;
							}
							
						}
						//如果没有初始时间，但指定显示最小时间
						else if(opt.initMinDate===true){
								currentYear = minYear;
								currentMonth = minMonth;
								thisDay = minDay;
						}
						//如果没有初始化时间，但有最大时间
						else if(opt.maxDate){
								currentYear = maxYear;
								currentMonth = maxMonth;
								thisDay = maxDay;
						}
						//如果没有初始化时间和最大时间，但有最小时间
						else if(opt.minDate){
								currentYear = minYear;
								currentMonth = minMonth;
								thisDay = minDay;							
						}else{
							currentYear = thisYear;
							
						}
					}else{
						if(oldDay){
							thisDay = oldDay;
						}
					}
					
					//日历为最大年
					if( currentYear==maxYear){
						//上一年、上一月可点
						$("#showCalendar #pre, #showCalendar #preY").removeClass("forbid");	
						//下一年不可点
						$("#showCalendar #nextY").addClass("forbid");	
						//隐藏大于最大月的月份
						$(".currentMonth option").each(function(){
							$(this).removeAttr("style");	
							var m = $(this).val();
							if( m>maxMonth ){
								$(this).hide();
							}
						});
						if(currentMonth>=maxMonth){
							currentMonth = maxMonth
							//下一月不可点
							$("#showCalendar #next").addClass("forbid");
						}else{
							//下一月可点
							$("#showCalendar #next").removeClass("forbid");
						}	
					}
					//日历为最小年
					else if( currentYear==minYear){
						//下一月、下一年可点
						$("#showCalendar #next, #showCalendar #nextY").removeClass("forbid");
						//上一年不可点
						$("#showCalendar #preY").addClass("forbid");	
						//隐藏小于最小月的月份
						$(".currentMonth option").each(function(){
							$(this).removeAttr("style");	
							var m = $(this).val();
							if( m<minMonth ){
								$(this).hide();
							}
						});
						if(currentMonth<=minMonth){
							currentMonth = minMonth;
							//上一月不可点
							$("#showCalendar #pre").addClass("forbid");
						}else{
							//上一月可点
							$("#showCalendar #pre").removeClass("forbid");
						}
					}else{
						$(".currentMonth option").removeAttr("style");
						$("#showCalendar #pre, #showCalendar #preY").removeClass("forbid");	
						$("#showCalendar #next, #showCalendar #nextY").removeClass("forbid");
					}
					
							
					//年、月、时、分、秒下拉列表选中某值
					$(".currentYear option[value='" + currentYear + "']").attr("selected","selected").siblings().removeAttr("selected");
					$(".currentMonth option[value='" + currentMonth + "']").attr("selected","selected").siblings().removeAttr("selected");
					$(".currentHour option[value='" + currentHour + "']").attr("selected","selected").siblings().removeAttr("selected");
					$(".currentMinute option[value='" + currentMinute + "']").attr("selected","selected").siblings().removeAttr("selected");
					$(".currentSecond option[value='" + currentSecond + "']").attr("selected","selected").siblings().removeAttr("selected");
					
					//输出星期
					for(j=0; j<week.length; j++){
						$("#showCalendar .calendar ul").append("<li class='week'>" + week[j] + "</li>");
					}
					
					//判断每个月的第一天是星期几
					var currentMonth_firstDay = new Date(currentYear,(currentMonth-1),1); //设置当前月的日期对象  new Date(年，月，日)设置特定日期对象
					var currentMonth_firstDay_getDay = currentMonth_firstDay.getDay(); //获得当前月第一天是星期几
					var nextMonth_firstDay = new Date(nextYear,(nextMonth-1),1); //设置下个月的日期对象  new Date(年，月，日)设置特定日期对象
					var nextMonth_firstDay_getDay = nextMonth_firstDay.getDay(); //获得下个月第一天是星期几
					for(i=0; i<currentMonth_firstDay_getDay; i++){
						$("#showCalendar .monthFirst ul").append("<li>&nbsp;</li>");
					}
					
					//输出日历
					var nDays = monthDays[currentMonth-1]; //获得当前月的天数
					var nextMonthDays = monthDays[nextMonth-1]; //获得下个月的天数
					var liStr = '';
					for(i=1; i<=nDays; i++){
						if(maxDay && i>maxDay && currentYear==maxYear && currentMonth>=maxMonth){
							liStr += "<li data-val='"+i+"' class='noActive'>" + i + "</li>";
							continue
						}
						if( minDay && i<minDay && currentYear==minYear && currentMonth<=minMonth ){
							liStr += "<li data-val='"+i+"' class='noActive'>" + i + "</li>";
							continue
						}
						if(i==thisDay){
							liStr += "<li data-val='"+i+"' class='selected'><a href='javascript:;' title='" + currentYear + "-" + currentMonth + "-" + i + "'>" + i + "</a></li>";
						}else{
							liStr += "<li data-val='"+i+"'><a href='javascript:;' title='" + currentYear + "-" + currentMonth + "-" + i + "'>" + i + "</a></li>";
						}
					}
					$("#showCalendar .monthFirst ul").append(liStr);

					//高亮选中日期     //获取选择结果（点击具体天数时，把当前日期附值给日期文本框）
					$("#showCalendar .calendar li a").click(function(){
						$(this).parent().addClass("selected").siblings().removeClass("selected");
					});
					
					//确定选择结果
					$(".databtnlist .submit").click(function(){
						var result = '';
						var dataValue = $(".calendar li.selected a").attr("title");
						if(dataValue==null){ 
							result = '';
							//alert("请选择日期！"); return;
						}else{
							var hoursMinutes = "";
							if(opt.showHours==true){
								hoursMinutes = " " + $(".currentHour option:selected").val() + ":" + $(".currentMinute option:selected").val() + ":" + $(".currentSecond option:selected").val();
							}
							result = dataValue + hoursMinutes
						}
						if( target.hasClass("dateSelect") ){
							target.removeClass("active");
							target.siblings().val(result);
						}
						target.val(result);	
						$("#showCalendar").remove();
						//回调
						if( typeof(opt.callback)=="function" ){
							opt.callback(result); //将选择结果作为参数附给回调函数，以便在回调时获取
						}	
					});
					
					//获取今天日期
					$(".databtnlist .today").click(function(){
						var hoursMinutes = "";
						if(opt.showHours==true){
							var thisDate = new Date();
							thisHours = thisDate.getHours();
							thisMinutes = thisDate.getMinutes();
							thisSeconds = thisDate.getSeconds();
							thisHours = thisHours<10 ? "0"+thisHours : thisHours;
							thisMinutes = thisMinutes<10 ? "0"+thisMinutes : thisMinutes;
							thisSeconds = thisSeconds<10 ? "0"+thisSeconds : thisSeconds;
							$(".currentHour option[value='" + thisHours + "']").attr("selected","selected").siblings().removeAttr("selected");
							$(".currentMinute option[value='" + thisMinutes + "']").attr("selected","selected").siblings().removeAttr("selected");
							$(".currentSecond option[value='" + thisSeconds + "']").attr("selected","selected").siblings().removeAttr("selected");
							hoursMinutes = thisHours + ":" + thisMinutes + ":" + thisSeconds;
						}
						
						$(".currentYear option[value='" + thisYear + "']").attr("selected","selected").siblings().removeAttr("selected");
						$(".currentMonth option[value='" + (todayMonth+1) + "']").attr("selected","selected").siblings().removeAttr("selected");
						
						$("#showCalendar li").each(function(){
							//当前日期高亮，并重写title
							if( $(this).text()==thisDay ){
								$(this).addClass("selected").siblings().removeClass("selected");
								$(this).find("a").attr("title", thisYear + "-" + (todayMonth+1) + "-" + thisDay)
							}
							//大于最大时间的天改为禁用状态
							if( thisYear==maxYear && (todayMonth+1)==maxMonth ){
								if( $(this).text()>maxDay ){
									$(this).html( $(this).text() ).addClass("noActive");
								}
							}
						});
						
						//如果不显示时分秒，则点完后关闭日历框，并附值
						if(opt.showHours==false){
							target.val(thisYear + "-" + (todayMonth+1) + "-" + thisDay + " " + hoursMinutes);	
							$("#showCalendar").remove();
							//回调
							if( typeof(opt.callback)=="function" ){
								opt.callback();
							}
						}
					});
					
					//清空日期
					$(".cleartime").click(function(){
						$("#showCalendar li.selected").removeClass("selected");
						target.val("");
					});
					//关闭日期选择器
					$(".closecalendar").click(function(){
						$("#showCalendar").remove();
					});
				} //日历渲染函数 结束
				
				//日历初始化
				var monthNum = todayMonth+1; //获得当前月
				var year = thisYear + parseInt(todayMonth/12); /*获得当前年*/
				showCalendar(monthNum,year); 

				//var minYear = parseInt($(".currentYear option:first").val());
				//var maxYear = parseInt($(".currentYear option:last").val());
				//点击上一年、下一年时调用函数，并且改变年份
				$("#preY").click(function(){
					currentY = parseInt($(".currentYear option:selected").val());
					currentM = parseInt($(".currentMonth option:selected").val());
					year = currentY-1;
					if(year<minYear) return;
					showCalendar(currentM,year,true);
				});
				$("#nextY").click(function(){
					currentY = parseInt($(".currentYear option:selected").val());
					currentM = parseInt($(".currentMonth option:selected").val());
					year = currentY+1;
					if(year>maxYear) return;
					showCalendar(currentM,year,true);
				});
				
				//点击上一月时，改变日历
				$("#pre").click(function(){
					currentY = parseInt($(".currentYear option:selected").val());
					currentM = parseInt($(".currentMonth option:selected").val());
					monthNum = currentM-1;
					if(monthNum==0 && currentY==minYear) return;
					if(currentY==minYear && monthNum<minMonth) return;
					showCalendar(monthNum,currentY,true);
				});
				//点击下一月时，改变日历
				$("#next").click(function(){
					currentY = parseInt($(".currentYear option:selected").val());
					currentM = parseInt($(".currentMonth option:selected").val());
					monthNum = currentM+1;
					if(monthNum>12 && currentY==maxYear) return;
					if(currentY==maxYear && monthNum>maxMonth) return;
					showCalendar(monthNum,currentY,true);
				});
				
				//选择年份时改变日历
				$(".currentYear").change(function(){
					currentY = parseInt($(this).find("option:selected").val());
					currentM = parseInt($(".currentMonth option:selected").val());
					showCalendar(currentM,currentY,true);
				});
				//选择月份时，改变日历
				$(".currentMonth").change(function(){
					currentY = parseInt($(".currentYear option:selected").val());
					currentM = parseInt($(this).find("option:selected").val());
					showCalendar(currentM,currentY,true); 
				});
				
				//点击文档隐藏日期
				$(document).click(function(){
					$("#showCalendar").remove();
				});
				target.click(function(e){e.stopPropagation();}); //点击日期输入框时不隐藏
				$("#showCalendar").click(function(e){e.stopPropagation();}); //点击日历本身时不隐藏	
				
				//日历定位
				var windowW = $(window).width(),
					windowH = $(window).height(),
					documentW = $(document).width(),
					documentH = $(document).height();
				var elemHeight = target.outerHeight(),
					elemWidth = target.outerWidth(),
					elemLeft = target.offset().left,
					elemTop = target.offset().top;
				var windowTop = target[0].getBoundingClientRect().top,
					windowBottom = windowH-windowTop-elemHeight,
					windowLeft = target[0].getBoundingClientRect().left,
					windowRight = windowW-windowLeft;
				var calendarH = $("#showCalendar").height(),
					calendarW = $("#showCalendar").width();	
				var elemTop2, elemLeft2;
				//设置top定位
					if(windowTop>=calendarH+5){ //窗口上边够
						elemTop2 = elemTop-calendarH-5;
					}else if(windowBottom>=calendarH){ //窗口下边够
						elemTop2 = elemTop+elemHeight+5;
					}else if(elemTop>=calendarH+5){ //窗口上下都不够，但文档上边够
						elemTop2 = elemTop-calendarH-5;
					}else if(documentH-elemTop-elemHeight>calendarH+5){ //窗口上下都不够，但文档下边够
						elemTop2 = elemTop+elemHeight+5;
					}else{
						elemTop2 = elemTop+elemHeight+5;
					}
					$("#showCalendar").css({top:elemTop2});				
				//设置left定位
					if(windowRight>=calendarW){ //窗口右边够（主要以右边显示为主）
						elemLeft2 = elemLeft;
					}else if(windowW>=calendarW){ //窗口右边不够，但窗口整体够（设为靠右显示）
						elemLeft2 = elemLeft - (calendarW-windowRight)-5;
					}else if(documentW-elemLeft>=calendarH){ //窗口右边不够，但文档右边够
						elemLeft2 = elemLeft;	
					}else{ //窗口右边、文档右边都不够，文档左边够
						elemLeft2 = elemLeft - calendarW;
					}
					$("#showCalendar").css({left:elemLeft2});			
			}
		}
	});
})(jQuery);
