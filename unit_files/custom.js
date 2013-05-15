jQuery(document).ready(function(){
		jQuery.ajaxSetup({cache:false});
		jQuery("body").on("click", 'a.loadcontent, .pagination .next a, .pagination .previous a', function() {

			var post_id = jQuery(this).data('id');
			var type = jQuery(this).data('type');
			var id = jQuery(this).data('id');
			var slug = jQuery(this).data('slug');
			var href = jQuery(this).attr('href');

			jQuery(".loader").show();
			jQuery("#contentload").animate({top:'0%'},400, function(){
					jQuery("#contentload .content-inner").load(href, {id:post_id}, function(){
					jQuery("#contentload .content-inner").animate({width:'90%'},500,function(){});
					jQuery(".scroll-pane").height(jQuery(window).height()*0.75+'px');
					jQuery(".scroll-pane").jScrollPane({showArrows:true}); jQuery(".loader").hide();
				});
			});
			return false;
		});
		jQuery("body").on("click", 'a.closecontent, a.close', function() {
			jQuery("#contentload .content-inner").animate({width:'0px'},500, function(){jQuery('#contentload').css({top:'-100%'});});
			 
			return false;
		});
	});
jQuery(document).ready(function(){
	var width_header = jQuery('#main').width();
	jQuery('header#header').css({width:width_header+'px'});
jQuery(window).resize(function(){
	var width_header = jQuery('#main').width();
	jQuery('header#header').css({width:width_header+'px'});
});

jQuery("#clients").elastislide({
	imageW 		: 171,
	minItems	: 3,
	speed		: 600,
	easing		: "easeOutQuart",
	margin		: 78,
	border		: 0,
	onClick		: function() {}
});

jQuery('.btn[href="#"]').click(function(){
	return false;
});

// prettyphoto init
jQuery("a[rel^='prettyPhoto']").prettyPhoto({
	animation_speed:'normal',
	slideshow:5000,
	autoplay_slideshow: false,
	overlay_gallery: true
});

jQuery(".bottom-arrow").hover(function(){jQuery(this).stop().animate({top:'0'},200)},function(){jQuery(this).stop().animate({top:'-81px'},200)});
//scroll menu


// ---------------------------------------------------------
// Tooltip
// ---------------------------------------------------------
jQuery("[rel='tooltip']").tooltip();

jQuery("[rel='external']").tooltip({
	animation:true,
	placement:'top'
});

//recent works item animation
//var $item_anim = jQuery(".es-carousel ul li .small-arrow");
jQuery(".es-carousel ul li").hover(
	function(){jQuery(this).find(".small-arrow").stop().animate({height:'55px'},300,'easeInExpo')},
	function(){jQuery(this).find(".small-arrow").stop().animate({height:'10px'},300,'easeOutExpo')}
);
jQuery(".es-carousel ul li").hover(
	function(){jQuery(this).find(".meta").stop().animate({bottom:'0%'},300,'easeInExpo')},
	function(){jQuery(this).find(".meta").stop().animate({bottom:'100%'},300,'easeOutExpo')}
);
jQuery(".recent_works li").hover(
	function(){jQuery(this).find(".small-arrow").stop().animate({height:'55px'},300,'easeInExpo')},
	function(){jQuery(this).find(".small-arrow").stop().animate({height:'10px'},300,'easeOutExpo')}
);
jQuery(".recent_works li").hover(
	function(){jQuery(this).find(".meta").stop().animate({bottom:'0%'},300,'easeInExpo')},
	function(){jQuery(this).find(".meta").stop().animate({bottom:'100%'},300,'easeOutExpo')}
);
jQuery("#portfolio-grid li").hover(
	function(){jQuery(this).find(".small-arrow").stop().animate({height:'55px'},300,'easeInExpo')},
	function(){jQuery(this).find(".small-arrow").stop().animate({height:'10px'},300,'easeOutExpo')}
);
jQuery("#portfolio-grid li").hover(
	function(){jQuery(this).find(".meta").stop().animate({bottom:'0%'},300,'easeInExpo',function(){jQuery(this).find(".zoom-link").stop().animate({top:'50%'},100)})},
	function(){jQuery(this).find(".meta").stop().animate({bottom:'100%'},300,'easeOutExpo',function(){jQuery(this).find(".zoom-link").stop().animate({top:'-52px'},100)})}
);

// ---------------------------------------------------------
// Isotope plugin
// ---------------------------------------------------------

	
	// Folio 3cols
	var $container = jQuery('#portfolio-grid');
	
	$container.imagesLoaded( function(){	
		setColumnWidth();
		$container.isotope({
				itemSelector : '.item',
				resizable : false,
				transformsEnabled : true
		});		
	});
	
	function getNumColumns(){
		
		var $folioWrapper = jQuery('#portfolio-grid').data('cols');
		
		if($folioWrapper == '1col') {
			var winWidth = jQuery("#portfolio-grid").width();		
			var column = 1;		
			return column;
		}
		
		if($folioWrapper == '2cols') {
			var winWidth = jQuery("#portfolio-grid").width();		
			var column = 2;		
			if (winWidth<380) column = 1;
			return column;
		}
		
		else if ($folioWrapper == '3cols') {
			var winWidth = jQuery("#portfolio-grid").width();		
			var column = 3;		
			if (winWidth<380) column = 1;
			else if(winWidth>=380 && winWidth<788)  column = 2;
			else if(winWidth>=788 && winWidth<1160)  column = 3;
			else if(winWidth>=1160) column = 3;
			return column;
		}
		
		else if ($folioWrapper == '4cols') {
			var winWidth = jQuery("#portfolio-grid").width();		
			var column = 4;		
			if (winWidth<380) column = 1;
			else if(winWidth>=380 && winWidth<788)  column = 2;
			else if(winWidth>=788 && winWidth<1160)  column = 3;
			else if(winWidth>=1160) column = 4;		
			return column;
		}
		
	}
	
	function setColumnWidth(){
		var columns = getNumColumns();		
	
		var containerWidth = jQuery("#portfolio-grid").width();		
		var postWidth = containerWidth/columns;
		postWidth = Math.floor(postWidth);
 		
		jQuery(".item").each(function(index){
			jQuery(this).css({"width":postWidth+"px"});				
		});
	}
		
	function arrange(){
		setColumnWidth();		
		$container.isotope('reLayout');	
	}
		
	jQuery(window).on("debouncedresize", function( event ) {	
		arrange();		
	});
	
	
	// Filter projects
	var $itemsFilter = jQuery('#filters')
	
	$itemsFilter.on('click', 'a', function(e) {
		var $this = jQuery(this).parent('li');

		$itemsFilter.find('li').removeClass('active');
		$this.addClass('active');
		
		var selector = jQuery(this).attr('data-filter');
		$container.isotope({ filter: selector });
		
		e.preventDefault();
	});
	

});

// ---------------------------------------------------------
// Isotope Init
// ---------------------------------------------------------
jQuery(window).load(function(){
	jQuery("#portfolio-grid").css({"visibility" : "visible"});

	// ---------------------------------------------------------
	// Style switcher
	// ---------------------------------------------------------
	jQuery(".style-toggle").toggle(function(){
	    jQuery("#style_selector").stop().animate({left:"0px"}, {easing:"easeInOutQuad"}, "fast");
	},function(){
		jQuery("#style_selector").stop().animate({left:"-220px"}, {easing:"easeInOutQuad"}, "fast");
	});
	jQuery('#style_selector [type="radio"]').click(function() {
		var current = jQuery('input[name="layout"]:checked').val();
		
		if(current == 'Boxed') {
			jQuery('#main').addClass('boxed');
			jQuery('#main').removeClass('wide');
			var width_header = jQuery('#main').width();
			jQuery('header#header').css({width:width_header+'px'});
		} else {
			jQuery('#main').addClass('wide');
			jQuery('#main').removeClass('boxed');
			jQuery('body').css({'background-image':'none', 'background-color':'#fafafa'});
			var width_header = jQuery('#main').width();
			jQuery('header#header').css({width:width_header+'px'});
		}
	});
	jQuery('.patterns a').click(function(e) {
		e.preventDefault();

		var current = jQuery('#style_selector input[name=layout]:checked').val();

		if(current == 'Boxed') {
			jQuery(this).parent().find('img').removeClass('active');
			jQuery(this).find('img').addClass('active');

			var name = jQuery(this).attr('name');
			var templateURI = jQuery('#templateURI').val();
			
			if(jQuery(this).hasClass('bkgd')) {
				jQuery('body').css('background', 'url('+ templateURI + '/images/patterns/'+name+'.jpg) no-repeat center center fixed');
				jQuery('body').css('background-size', 'cover');
			} else {
				jQuery('body').css('background', 'url('+ templateURI + '/images/patterns/'+name+'.png) repeat center center scroll');
				jQuery('body').css('background-size', 'auto');
			}
		} else {
		alert('This is available with boxed layout');
		}
	});
});

// fade in #back-top
jQuery(function () {
	//mobile select menu
	IE = jQuery('html').attr('class').match(/ie(6|7)/)|| false;
	if(!IE){
		jQuery('.sf-menu').mobileMenu();
	}

	var placeholderMultiple = jQuery('#style_selector'),
   	   templateURI = jQuery('#templateURI').val(),
   	   pathMultiple = templateURI + '/css/skins/color/';

   /* init of [multiple] group switcher */
   style_switcher( placeholderMultiple, pathMultiple, 8, 'color' );
});
//scroll for one page design
jQuery(document).ready(function($) {
	var timeout,
		sections = new Array(),
		sectionscount = 0,
		win = $(window),
		nav = $('.sf-menu'),
		navanchors = nav.find('a'),
		timeoffset = 50,
		hash = location.hash || null;
		iDevice = navigator.userAgent.match(/iphone|ipod|ipad/i) || false,
		badIE = $('html').attr('class').match(/ie(6|7)/)|| false;
		
		
	//IE 8 and lower doesn't like the smooth pagescroll
	if(!badIE){
		window.scroll(0,0);
		
		$('.sf-menu a').bind('click',function(){
			hash = $(this).attr('href');
			$.scrollTo.window().queue([]).stop();
			goTo(hash);
			return false;
		});
		
		//if a hash is set => go to it
		if(hash){
			setTimeout(function(){
				goTo(hash);
			},500);
		}
	}
	
	
	//We need the position of each section until the full page with all images is loaded
	win.bind('load',function(){
		
		//saving some information
		$('section').each(function(i,e){
			var _this = $(this);
			var p = {
				id: this.id,
				pos: _this.offset().top
			};
			sections.push(p);
		});
		
		//iPhone, iPod and iPad don't trigger the scroll event
		if(iDevice){
			nav.find('a').bind('click',function(){
				setTimeout(function(){
					win.trigger('scroll');				
				},duration);
				
			});
			//scroll to top
			window.scroll(0,0);
		}

		//how many sections
		sectionscount = sections.length;
		
		//bind the handler to the scroll event
		win.bind('scroll',function(event){
			clearInterval(timeout);
			//should occur with a delay
			timeout = setTimeout(function(){
				//get the position from the very top in all browsers
				pos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				
				//activate Nav element at the current position
				activateNav(pos);
			},timeoffset);
		}).trigger('scroll');

	});
	
	//the function is called when the hash changes
	function hashchange(){
		goTo(location.hash, false);
	}
	
	//scroll to a section and set the hash
	function goTo(hash,changehash){
		win.unbind('hashchange', hashchange);
		hash = hash.replace(/!\//,'');
		win.stop().scrollTo(hash,duration,{
			axis:'y',
			easing:easing
		});
		if(changehash !== false){
			var l = location;
			location.href = (l.protocol+'//'+l.host+l.pathname+'#!/'+hash.substr(1));
		}
		win.bind('hashchange', hashchange);
	}
	
	
	//activate current nav element
	function activateNav(pos){
		var offset = 100;
		win.unbind('hashchange', hashchange);
		for(var i=sectionscount;i>0;i--){
			if(sections[i-1].pos <= pos+offset){
				navanchors.removeClass('current');
				navanchors.eq(i-1).addClass('current');
				win.bind('hashchange', hashchange);
				break;
			};
		}	
	}
	
	
});
document.createElement('section');var duration=900,easing='easeOutExpo';