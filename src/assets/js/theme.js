
//"../node_modules/bootstrap/dist/css/bootstrap.min.css",

$(function() {
	'use strict';
	 // Autocomplete
	//  $('#hotelsFrom,#flightFrom,#flightTo,#trainFrom,#trainTo,#busFrom,#busTo,#carsCity').autocomplete({
	// 	 minLength: 3,
	// 	 delay: 100,
	// 	 source: function (request, response) {
	// 	   $.getJSON(
	// 		'http://gd.geobytes.com/AutoCompleteCity?callback=?&q='+request.term,
	// 		 function (data) {
	// 			response(data);
	// 	   }
	//    );
	//    },
	//  });
	//  // Hotels Check In Date
	//  $('#hotelsCheckIn').daterangepicker({
	//    singleDatePicker: true,
	//    minDate: moment(),
	//    autoUpdateInput: false,
	//    }, function(chosen_date) {
	//  $('#hotelsCheckIn').val(chosen_date.format('MM-DD-YYYY'));
	//  });
	 
	//  // Hotels Check Out Date
	//  $('#hotelsCheckOut').daterangepicker({
	//    singleDatePicker: true,
	//    minDate: moment(),
	//    autoUpdateInput: false,
	//    }, function(chosen_date) {
	//  $('#hotelsCheckOut').val(chosen_date.format('MM-DD-YYYY'));
	//  });
	//  // Flight Depart Date
	//  $('#flightDepart').daterangepicker({
	//    singleDatePicker: true,
	//    minDate: moment(),
	//    autoUpdateInput: false,
	//    }, function(chosen_date) {
	//  $('#flightDepart').val(chosen_date.format('MM-DD-YYYY'));
	//  });
	 
	//  // Flight Return Date
	//  $('#flightReturn').daterangepicker({
	//    singleDatePicker: true,
	//    minDate: moment(),
	//    autoUpdateInput: false,
	//    }, function(chosen_date) {
	//  $('#flightReturn').val(chosen_date.format('MM-DD-YYYY'));
	//  });
	 
	
   });

/*
Template:  		Quickai HTML5 Template
Written by: 	Harnish Design - (http://www.harnishdesign.net)
*/

(function ($) {
	"use strict";

// Preloader
// $(window).on('load', function () {
// 	$('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
// 	$('#preloader').delay(333).fadeOut('slow'); // will fade out the white DIV that covers the website.
// 	$('body').delay(333);
// });
	 
/*---------------------------------------------------
    Primary Menu
----------------------------------------------------- */

// Dropdown show on hover
$(document).on("mouseover",".primary-menu ul.navbar-nav li.dropdown",function(){
	if ($(window).width() > 991) {
		$(this).find('> .dropdown-menu').stop().slideDown('fast');
		$(this).bind('mouseleave', function() {
		$(this).find('> .dropdown-menu').stop().css('display', 'none'); 
		});
	}
});
$(document).on("mouseover","#main-wrapper",function(){
	//console.log("working")
		$(".no-gutters .elipsis_tri").each(function(index){
			//console.log("working")
			var thistext = $(this).text();
			//console.log($(this).text());
			if(thistext.length > 15){
				//console.log($(this).text());
				$(this).addClass("working");
				
				$(this).text(thistext.substring(0,15)+"...");
			}
			
		});
});
$(document).on("click",".value_item",function(){
	$("#flightMatrix").removeClass("show").fadeOut();
	$(".modal-backdrop").removeClass("show").fadeOut();
	$("body").attr("class","");
});
$(document).on("click",".collapse",function(){
	console.log($(this).attr("id"));
	// $(".no-gutters .collapse").each(function(index){
		
	// 	$(this).on("click",function(){
	// 		alert($(this).attr("id"));
	// 	})
	// });
	
});

// jQuery(function($) { 
// 	 	$(".collapse").on("click",function(){
// 	 		alert($(this).attr("id"));
// 	 	})
//  })(jQuery);



	//alert()
	// var interval = setInterval( dont_break , 100);

	// function dont_break(){
	// 	console.log("kdsjvskdhb");
	// 	if($(document).hasClass("elipsis_tri")){
	// 		$(".elipsis_tri").each(function(index){
	// 			if($(this).lenght > 1){
	// 				console.log($(this).text());
	// 				$(this).addClass("testing");
	// 			}
	// 		});
	// 		clearInterval(interval);
	// 	}
	// 	//clearInterval(interval);
	// }








	
// $(document).on("ready",function(){

// 	$(".prevent_three_line_break").each(function(index){
// 		console.log(index);
// 	})

// 	if ($(window).width() > 991) {
// 		$(this).find('> .dropdown-menu').stop().slideDown('fast');
// 		$(this).bind('mouseleave', function() {
// 		$(this).find('> .dropdown-menu').stop().css('display', 'none'); 
// 		});
// 	}
// });














// $('.primary-menu ul.navbar-nav li.dropdown').on("mouseover", function() {
// 	if ($(window).width() > 991) {
// 		$(this).find('> .dropdown-menu').stop().slideDown('fast');
// 		$(this).bind('mouseleave', function() {
// 		$(this).find('> .dropdown-menu').stop().css('display', 'none'); 
// 		});
// 	}
// });

// When dropdown going off to the out of the screen.

	$('.primary-menu .dropdown-menu').each(function() {
		var menu = $('#header .header-row').offset();
		var dropdown = $(this).parent().offset();
		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#header .header-row').outerWidth());
		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 5) + 'px');
		}
	});
$(function () {
	$(document).on("mouseenter mouseleave",".dropdown li",function(e){
		if ($(window).width() > 991) {
            var elm = $('.dropdown-menu', this);
            var off = elm.offset();
            var l = off.left;
            var w = elm.width();
            var docW = $(window).width();
            var isEntirelyVisible = (l + w <= docW);
            if (!isEntirelyVisible) {
                $(elm).addClass('dropdown-menu-right');
            } else {
                $(elm).removeClass('dropdown-menu-right');
            }
			}
	})
    // $(".dropdown li").on('mouseenter mouseleave', function (e) {
	// 	if ($(window).width() > 991) {
    //         var elm = $('.dropdown-menu', this);
    //         var off = elm.offset();
    //         var l = off.left;
    //         var w = elm.width();
    //         var docW = $(window).width();
    //         var isEntirelyVisible = (l + w <= docW);
    //         if (!isEntirelyVisible) {
    //             $(elm).addClass('dropdown-menu-right');
    //         } else {
    //             $(elm).removeClass('dropdown-menu-right');
    //         }
	// 		}
    // });
});

// Mobile Collapse Nav
$(document).on('click','.primary-menu .dropdown-toggle[href="#"] , .primary-menu .dropdown-toggle[href!="#"] .arrow',function(e) {
	if ($(window).width() < 991) {
        e.preventDefault();
        var $parentli = $(this).closest('li');
        $parentli.siblings('li').find('.dropdown-menu:visible').slideUp();
        $parentli.find('> .dropdown-menu').stop().slideToggle();
        $parentli.siblings('li').find('a .arrow.open').toggleClass('open');
		$parentli.find('> a .arrow').toggleClass('open');
	}
});
// $('.primary-menu .dropdown-toggle[href="#"], .primary-menu .dropdown-toggle[href!="#"] .arrow').on('click', function(e) {
// 	if ($(window).width() < 991) {
//         e.preventDefault();
//         var $parentli = $(this).closest('li');
//         $parentli.siblings('li').find('.dropdown-menu:visible').slideUp();
//         $parentli.find('> .dropdown-menu').stop().slideToggle();
//         $parentli.siblings('li').find('a .arrow.open').toggleClass('open');
// 		$parentli.find('> a .arrow').toggleClass('open');
// 	}
// });

// DropDown Arrow
$('.primary-menu').find('a.dropdown-toggle').append($('<i />').addClass('arrow'));
	
// Mobile Menu Button Icon
$(document).on('click','.navbar-toggler', function() {
		$(this).toggleClass('open');
	});

/*---------------------------------------------
    Booking (Flights, Train, Bus, Hotels, )
---------------------------------------------- */

/* Flights Travellers and Class */
$(document).on('click','#flightTravellersClass', function() {
        $('.travellers-dropdown').slideToggle('fast');
		/* Change value of Travellers and Class */
		$('.qty-spinner, .flight-class').on('change', function() {
        var ids = ['flightAdult', 'flightChildren', 'flightInfants'];
		var totalCount = ids.reduce(function (prev, id) {
			return parseInt($('#' + id + '-travellers').val()) + prev}, 0);
        var fc = $('input[name="flight-class"]:checked  + label').text();
        $('#flightTravellersClass').val(totalCount + ' - ' + fc);
    }).trigger('change');
    });
	
	/* Trains Travellers and Class */
	$(document).on('click','#trainTravellersClass', function() {
        $('.travellers-dropdown').slideToggle('fast');
		/* Change value of Travellers and Class */
		$('.qty-spinner, #train-class').on('change', function() {
        var ids = ['trainAdult', 'trainChildren', 'trainInfants'];
		var totalCount = ids.reduce(function (prev, id) {
			return parseInt($('#' + id + '-travellers').val()) + prev}, 0);
		var fc = $('#train-class option:selected').text();
		
        $('#trainTravellersClass').val(totalCount + ' - ' + fc);
    }).trigger('change');
    });
	
	/* Bus Seats */
	$(document).on('click','#busTravellersClass', function() {
        $('.travellers-dropdown').slideToggle('fast');
		/* Change value of Seats */
		$('.qty-spinner').on('change', function() {
        var ids = ['adult'];
		var totalCount = ids.reduce(function (prev, id) {
			return parseInt($('#' + id + '-travellers').val()) + prev}, 0);
		
        $('#busTravellersClass').val(totalCount + '  ' + 'Seats');
    }).trigger('change');
    });
	
	/* Hotels People / Rooms */
	$(document).on('click','#hotelsTravellersClass', function() {
        $('.travellers-dropdown').slideToggle('fast');
		/* Change value of People */
		$('.qty-spinner').on('change', function() {
        var ids = ['adult', 'children'];
		var totalCount = ids.reduce(function (prev, id) {
			return parseInt($('#' + id + '-travellers').val()) + prev}, 0)+ ' ' +'People';
			
		var idsRoom = ['hotels-rooms'];
		var totalCountRoom = idsRoom.reduce(function (prev, id) {
			return parseInt($('#hotels-rooms').val()) + prev}, 0)+ ' ' +'Room';
		
        $('#hotelsTravellersClass').val(totalCountRoom + ' / ' + totalCount);
    }).trigger('change');
    });
	
	/* Hide dropdown when clicking outside */
	$(document).on('click', function(event) {
    if (!$(event.target).closest(".travellers-class").length) {
        $(".travellers-dropdown").hide();
    }
	
	/* Hide dropdown when clicking on Done Button */
	$(document).on('click','.submit-done', function() {
        $('.travellers-dropdown').fadeOut(function() {
            $(this).hide();
        });
    });
});

/*---------------------------------------------------
   Carousel (Owl Carousel)
----------------------------------------------------- */
$(".owl-carousel").each(function (index) {
    var a = $(this);
	$(this).owlCarousel({
		autoplay: a.data('autoplay'),
		autoplayTimeout: a.data('autoplaytimeout'),
		autoplayHoverPause: a.data('autoplayhoverpause'),
		loop: a.data('loop'),
		speed: a.data('speed'),
		nav: a.data('nav'),
		dots: a.data('dots'),
		autoHeight: a.data('autoheight'),
		autoWidth: a.data('autowidth'),
		margin: a.data('margin'),
		stagePadding: a.data('stagepadding'),
		slideBy: a.data('slideby'),
		lazyLoad: a.data('lazyload'),
		navText:['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		animateOut: a.data('animateout'),
		animateIn: a.data('animatein'),
		video: a.data('video'),
		items: a.data('items'),
		responsive:{
        0:{items: a.data('items-xs'),},
        576:{items: a.data('items-sm'),},
		768:{items: a.data('items-md'),},
        992:{items: a.data('items-lg'),}
    }
    });
});

/*---------------------------------------------------
   tooltips
----------------------------------------------------- */
$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});

/*---------------------------------------------------
   Scroll to top
----------------------------------------------------- */
$(function () {
		$(window).on('scroll', function(){
			if ($(this).scrollTop() > 150) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		});
$(document).on("click",'#back-to-top', function() {
	$('html, body').animate({scrollTop:0}, 'slow');
	return false;
});
$(document).on("click",'.redirectToSearch', function() {
	$('html, body').animate({scrollTop:150}, 'slow');
	return false;
});

$(document).on("click",'.smooth-scroll a', function() {
    var sectionTo = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(sectionTo).offset().top - 50}, 600);
});


})(jQuery);