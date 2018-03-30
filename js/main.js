//team
$(function(){

	$('.team__link').on('click', function(e){
		e.preventDefault();

		var target = $(e.target);
		var item = target.closest('.team__item');
		var content = item.find('.team__item-desc');
		var reqHeight = content.find('.team-content').outerHeight();

		if (!item.hasClass('active')) {
			item.addClass('active');
			item.siblings().removeClass('active');
			content.height(reqHeight);
			item.siblings().find('.team__item-desc').height(0);
		} else {
			item.removeClass('active');
			content.height(0);
		}			
	});

});

// menu
$(function(){

	$('.menu__block').on('click', function(e){
		e.preventDefault();
		var target = $(e.target);
		var item = target.closest('.menu__item');
		var content = item.find('.menu__content');
		var desc = item.find('.menu__desc');
		var block = item.find('.menu__block');
		var reqWidth;
		var windowWidth = $(window).width();
		var listWidth = $('.menu__block').width() * $('.menu__block').length;

		if (windowWidth < 769) {
			reqWidth = windowWidth - listWidth;
		} else {
			reqWidth = 540;
		}

		if (windowWidth < 481) {
			if (!item.hasClass('active')) {
				item.siblings().hide(400);
				item.addClass('active');
				content.width(windowWidth - block.width());
				desc.delay(400).fadeIn();
			} else {
				item.siblings().show(400);
				item.removeClass('active');
				desc.css({
					display : "none"
				});
				content.width(0);
			}
		}

		if (windowWidth > 480) {
			if (!item.hasClass('active')) {
				item.addClass('active');
				item.siblings().removeClass('active');
				content.width(reqWidth);
				desc.delay(400).fadeIn();
				item.siblings().find('.menu__desc').css({
					display : "none"
				});
				item.siblings().find('.menu__content').width(0);
			} else {
				item.removeClass('active');
				desc.css({
					display : "none"
				});
				content.width(0);
			}
		}			

	});

});

//onepagescroll
$(function(){
	
	var sections = $('.section');
	var activeSection;
	var reqSection;
	var reqSectionIndex;
	var position;
	var inScroll = false;

	function coloringDots(index){
		$('.fixed-menu__item').eq(index)
			.addClass('active')
			.siblings().removeClass('active');
	}

	function generateDots(){
		var fixedMenuList = $('.fixed-menu__list');
		$('.section').each(function(){
			var fixedMenuItem = $('<li>', {
				attr: {
					class: 'fixed-menu__item'
				},
				html: '<a href class="fixed-menu__link"></a>'
			});
			fixedMenuList.append(fixedMenuItem);
		});
		$('.fixed-menu__item:first-child').addClass('active');
	}
	generateDots();
		
	function moveSectionByNavigation(sectionNum){
		reqSection = sections.eq(sectionNum);
		reqSectionIndex = reqSection.index();
		position = -reqSectionIndex * 100 + '%';
		move(sectionNum);
	}

	function move(index){
		if (reqSection.length && !inScroll) {
			inScroll = true;
			coloringDots(index);
			$('.maincontent').css({
				'transform': 'translateY(' + position + ')',
				'-webkit-transform': 'translateY(' + position + ')'
			});
			reqSection.addClass('active').siblings().removeClass('active');
			setTimeout(function(){
				inScroll = false;
			}, 1100);
		}
	}

	$('.wrapper').on('touchmove', function(e){
		e.preventDefault();
	});

	$(window).on('wheel keydown', function(e){
		e.preventDefault();
		activeSection = sections.filter('.active');

		if (e.originalEvent.deltaY < 0 || e.keyCode == 38) {
			reqSection = activeSection.prev();
		}
		if (e.originalEvent.deltaY > 0 || e.keyCode == 40) {
			reqSection = activeSection.next();
		}
		reqSectionIndex = reqSection.index();	
		position = -reqSectionIndex * 100 + '%';
		move(reqSectionIndex);
	});

	$(window).swipe( {
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      activeSection = sections.filter('.active');

		if (direction == "down") {
			reqSection = activeSection.prev();
		}
		if (direction == "up") {
			reqSection = activeSection.next();
		}
		reqSectionIndex = reqSection.index();	
		position = -reqSectionIndex * 100 + '%';
		move(reqSectionIndex);
    }
  });	

	$('body').on('click', '.fixed-menu__item', function(e){
		e.preventDefault();
		var sectionNum = $(this).index();
		moveSectionByNavigation(sectionNum);
	});

	$('[data-scroll-to]').on('click', function moove(e){
		e.preventDefault();
		var dataNum = $(e.target).attr('data-scroll-to');
		moveSectionByNavigation(dataNum);
	});

});

//owl-carousel
$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
  	loop: true,
   items: 1,
   dots: false,
   nav: true,
	navText: [
		'<img src="img/hero/arrow-scroll.png" alt="">',
		'<img src="img/hero/arrow-scroll.png" alt="">'
	]
  });
});

//popup
$(function(){
	$('.opinion__btn').fancybox();

	$('body').on('click', '.opinion__btn', function(e){
		e.preventDefault();
		var target = $(e.target);
		var item = target.closest('.opinions__item');
		var popup = $('.popup');
		var content = item.find('.opinion__content-main');
		var closeBtn = $('<a>', {
			attr: {
				href: '',
				class: 'close-popup'
			},
			html: 'x'
		});
		popup.html(content.html());
		popup.append(closeBtn);
	});

	$('body').on('click', '.close-popup', function(e){
		e.preventDefault();
		$.fancybox.close();
	});
});

//hamburger-menu
$(function(){
	$('.hamburger').on('click', function(e){
		e.preventDefault();
		$('.hamburger__menu').addClass('hamburger__menu-visible');
	});

	$('.hamburger__menu-close').on('click', function(e){
		e.preventDefault();
		$('.hamburger__menu').removeClass('hamburger__menu-visible');
	});

	$('.nav__hamburger').on('click', '.nav__item', function(e){
		e.preventDefault();
		$('.hamburger__menu').removeClass('hamburger__menu-visible');
	});
});