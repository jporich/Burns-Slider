// JavaScript Document
$(document).ready(function() {
	
	/*------ VARIABLES ---------------*/
	
	var images = $("#burnscontainer > .slideback"); /*Dynamically count all instances of burnsimage*/
	
	var activeSlide = $(".currentSlide");
	
	activeSlide.addClass("burnsanimate"); /*animate first slide straight away */
	$(".currentslide .burnscaption").addClass("captionanimate"); /*animate caption straight away */
	
	
	var slideTransition = 400; /* value is equal to your slide transition in millisecond, set in burnsslider.css under fader keyframe*/
	
	var timer = 6000; /*Time of slide change in milliseconds
	be sure to change .burnsanimte transition to be slightly more than this value*/
	
	var current = 1; /*slider counter */
	
	var timeloop = setInterval(function() {
		
    	nextSlide()
		
  	}, timer);
	
	/*------ FUNCTIONS ---------------*/
	
	function resetTimer() {
		
		clearTimeout(timeloop); /* Reset timer */
		
		timeloop = setInterval(function() {
			
    		nextSlide()
			
  		}, timer);
		
	};
	
	function nextSlide(){
		$(".navitem").eq(current-1).removeClass("activenav");
		current++;
		
		if(current >= images.length+1) {
			
			var nextSlide = $(".slideback:first");
			current = 1;
			
		} else {
			
			var nextSlide = $(".currentslide").next();
			
		};
		
		/* Mark the present slide for next, shuffling it down, move next on top, reveal it, at end revert previous back to normal slide*/
		$(".currentslide").addClass("prevslide");
		
		nextSlide.addClass("currentslide");
		
		setTimeout(function() {
			
			$(".prevslide").find(".burnscaption").removeClass("captionanimate");
			$(".prevslide").removeClass("currentslide prevslide burnsanimate");
			
		}, slideTransition); 
		
		nextSlide.addClass("burnsanimate");
		$(".navitem").eq(current-1).addClass("activenav");
		nextSlide.find(".burnscaption").addClass("captionanimate");
	};
	
	function prevSlide(){
		
		$(".navitem").eq(current-1).removeClass("activenav");
		
		current--;
		
		if(current <= 0) {
			var prevSlide = $(".slideback:last");
			current = images.length;
			
		} else {
			var prevSlide = $(".currentslide").prev();
		};
		
		/* Mark the present slide for next, shuffling it down, move next on top, reveal it, at end revert previous back to normal slide*/
		$(".currentslide").addClass("prevslide");
		
		prevSlide.addClass("currentslide");
		
		setTimeout(function() {
			
			$(".prevslide").find(".burnscaption").removeClass("captionanimate");
			$(".prevslide").removeClass("currentslide prevslide burnsanimate");
			
		}, slideTransition); 
		
		prevSlide.addClass("burnsanimate");
		$(".navitem").eq(current-1).addClass("activenav");
		prevSlide.find(".burnscaption").addClass("captionanimate");
		
	};
	
	function changeSlide(buttonNum) {
		
		if ((current) == buttonNum) {
			resetTimer();
		} else { 
		
			$(".navitem").eq(current-1).removeClass("activenav");
			
			current = buttonNum;
		
			var nextSlide = $(".slideback").eq(current - 1);
		
			/* Mark the present slide for next, shuffling it down, move next on top, reveal it, at end revert previous back to normal slide*/
			$(".currentslide").addClass("prevslide");
			
			nextSlide.addClass("currentslide");
			
			setTimeout(function() {
				
				$(".prevslide").find(".burnscaption").removeClass("captionanimate");
				$(".prevslide").removeClass("currentslide prevslide burnsanimate");
				
			}, slideTransition); 
			
			nextSlide.addClass("burnsanimate");
			$(".navitem").eq(current-1).addClass("activenav");
			nextSlide.find(".burnscaption").addClass("captionanimate");
		}
	}
	
	function createBullets() {
		
		$(".slideback").each(function(){
			$(".navholder").append("<div class='navitem'></div>");
		});
		
	};
	/*----- CALLS -------------*/
	createBullets();
	$(".navitem:first-child").addClass("activenav");/*animate first nav item highlight*/
	
	$(".rightarrow").click(function() {
		
		nextSlide();
		resetTimer();
		
	});
	
	$(".leftarrow").click(function() {
		
		prevSlide();
		resetTimer();
		
	});
	
	$(".navitem").click(function() {
		
		var buttonNum = $(".navitem").index(this) + 1;
		
		changeSlide(buttonNum);
		
		resetTimer();
	});
	
	$(".navitem").hover(function() {
		
		resetTimer();
		
	});
	
});