/**
	-=[ jQuery Style Switcher ]=-
 *  
 * [What is the Style Switcher?]:
 * 
 *      Simple script intended to build interactive sites with flexible design.
 *      Using this you can allow user to modify color shemas, font and layout variants.
 *      Switcher have a memory function based on local storage and can be used in multiple mode.
 *
 * [Arguments]:	
 *
 *      @place: 	element selector to apply menu ( e.g. jQuery('body'), jQuery('#head'), jQuery('.here') );
 *      @group:     style propetries group e.g. color, font or layout;
 *      @skinsPath:	path to advanced stylesheets (every group need a different path);
 *      @styles: 	number of styles from 1 to n;
 *
 * [Usage example for single mode]: 
 * 
 *      var place = jQuery('#shell'),
 *      path = 'sc/';
 *      style_switcher( placeholder, path, 2 );
 *
 *
 * [Usage example for multiply mode]: 
 *
 *      var place = jQuery('#shell'),
 *      group = 'color',
 *      path  = 'sc/';
 *      style_switcher( placeholder, path, 2, group );
 *
 *
 * [About this]:
 *
 *      @autor:     FroZen Code: www.Shift-Web.ru
 *      @license:   CC-BY-SA 3.0
 *      @version:   2.0 beta 
 *
 *
 * [In future]:
 *  
 *      More optimized engine;
 *      Support client side DB API for better performance & scalability;
 *      Plagin oriented code style;
 *      
 *
 
 **/
 
style_switcher = function( pl, sp, st, gr ) {

	var templateURI = jQuery('#templateURI').val();
   
    //self configuration
    var group = ( gr !== undefined ) ? 'usr_style_' + gr : 'usr_style';
    var input_box = '<span class="radio_text"><input type="radio" name="layout" value="Wide" checked > Wide</span> <span class="radio_text"><input type="radio" name="layout" value="Boxed"> Boxed</span>';

	var	menu	  = jQuery('<menu class="switcher" data-st-control="'+ group +'"></menu>'),
		toogle	  = jQuery('<div class="style-toggle"></div>');
		data 	  = jQuery.Storage.get( group ),
		items	  = links = unify = '',
		pattern1   = '<a href="#" name="pattern1"><img src="'+ templateURI +'/images/patterns/pattern1.png" alt="" /></a>',
		pattern2   = '<a href="#" name="pattern2"><img src="'+ templateURI +'/images/patterns/pattern2.png" alt="" /></a>',
		pattern3   = '<a href="#" name="pattern3"><img src="'+ templateURI +'/images/patterns/pattern3.png" alt="" /></a>',
		pattern4   = '<a href="#" name="pattern4"><img src="'+ templateURI +'/images/patterns/pattern4.png" alt="" /></a>',
		pattern5   = '<a href="#" name="pattern5"><img src="'+ templateURI +'/images/patterns/pattern5.png" alt="" /></a>',
		pattern6   = '<a href="#" name="pattern6"><img src="'+ templateURI +'/images/patterns/pattern6.png" alt="" /></a>',
		pattern7   = '<a href="#" name="pattern7"><img src="'+ templateURI +'/images/patterns/pattern7.png" alt="" /></a>',
		pattern8   = '<a href="#" name="pattern8"><img src="'+ templateURI +'/images/patterns/pattern8.png" alt="" /></a>',
		bkgd1   = '<a href="#" class="bkgd" name="bkgd1"><img src="'+ templateURI +'/images/patterns/bkgd1.gif" alt="" /></a>',
		bkgd2   = '<a href="#" class="bkgd" name="bkgd2"><img src="'+ templateURI +'/images/patterns/bkgd2.gif" alt="" /></a>',
		bkgd3   = '<a href="#" class="bkgd" name="bkgd3"><img src="'+ templateURI +'/images/patterns/bkgd3.gif" alt="" /></a>',
		bkgd4   = '<a href="#" class="bkgd" name="bkgd4"><img src="'+ templateURI +'/images/patterns/bkgd4.gif" alt="" /></a>';
        
    //unification parameter (use it for debug only): do random query argument in link href
    //var unify = '?' + Math.floor( Math.random( 1, 30 ) * 200 );
    
    //console.log( group );
	
	//apply style list
	for( i = 1; i <= st; i++ ) {
		var marker 	 = 'id="st'+ i +'" data-st="st'+ i + '_'+ group +'"',
			items 	 = items + '<li '+ marker +'></li>',
			links	 = links + '<link '+ marker +' rel="fake" media="screen" href="'+ sp +'st'+ i +'.css'+ unify +'">'; 
	}

	//construct dom
	jQuery('head').append(links);
	jQuery(pl).prepend(menu);
	menu.append('<div class="style-main-title">THEME SETTINGS</div>');
	menu.append('<div class="example"><small>You can build your own style in the backend</small></div>');
	menu.append('<div class="box-title">Preset Color Skins</div>');
	menu.append('<ul class="images predefined clearfix">' + items + '</ul>');
	menu.append('<div class="box-title">Layout Style</div>');
	menu.append('<div class="input-box"><div class="input">'+ input_box +'</div></div>');
	menu.append('<div class="box-title">Patterns and Images Background</div>');
	menu.append('<div class="images patterns">'+ pattern1 + pattern2 + pattern3 + pattern4 + pattern5 + pattern6 + pattern7 + pattern8 + bkgd1 + bkgd2 + bkgd3 + bkgd4 +'</div>');
	jQuery(pl).prepend(toogle);

	//check for choice & activate
	if( data !== undefined ) {
		//jQuery('link[data-st='+ data +']', 'head').attr('rel', 'stylesheet');
		//jQuery('li[data-st='+ data +']', '.switcher[data-st-control="'+ group +'"]').addClass('active');
	}

	//switch engine
	jQuery('.switcher li').click(function() {	
		var t = jQuery(this).attr('data-st');
		
		//clear
		jQuery('link[data-st]', 'head').attr('rel','fake');
		jQuery('li', '.switcher[data-st-control="'+ group +'"]').removeClass('active');
		
		//set
		jQuery('link[data-st='+ t +']','head').attr('rel', 'stylesheet');
        this.setAttribute('class', 'active');
		jQuery.Storage.set( group, t );
	});
		
} //end switcher
