<?php
/*
Plugin Name: TMNT: Who's Your Favourite Turtle?
Plugin URI: http://kstover.codes/tmnt-tutorial
Description: Select your favourite Ninja Turtle!
Version: 0.1
Author: Kevin Stover
License: GPLv2
*/

// Quick way to add an admin page.
function tmnt_tutorial_add_menu(){
	$page = add_menu_page( 'TMNT' , 'Pick a Character!', 'manage_options', 'tmnt-tutorial', 'tmnt_tutorial', 'dashicons-art' );
	add_action( 'admin_print_styles-' . $page, 'tmnt_tutorial_css_js' );
}

add_action( 'admin_menu', 'tmnt_tutorial_add_menu' );

/**
 * This is our main admin output function.
 * It includes an inline style section and requires a JS file.
 * 
 * @since  1.0
 * @return void
 */
function tmnt_tutorial() {
	?>
	<style>
	.contact-card {
	   border: 1px solid #ccc;
	   width: 400px;
	}
	.contact-card::after {
	   clear: both;
	   content: "";
	   display: block;
	}
	.contact-card .profile-pic {
	   float: left;
	   padding: 20px;
	   width: 100px;
	}
	.contact-card .profile-info {
	   float: left;
	   padding: 0 20px;
	   width: 205px;
	}
	</style>

	Please select your favourite TMNT Character!
	<ul>
		<li>
			<label><input type="radio" class="radio-character" name="character" value="leonardo"> Leonardo</label>
		</li>
		<li>
			<label><input type="radio" class="radio-character" name="character" value="raphael"> Raphael</label>
		</li>
		<li>
			<label><input type="radio" class="radio-character" name="character" value="michelangelo"> Michelangelo</label>
		</li>
		<li>
			<label><input type="radio" class="radio-character" name="character" value="donatello"> Donatello</label>
		</li>
	</ul>

	<div class="contact-card">
	   <div class="profile-pic">
	       <img src="http://placehold.it/100x100">
	   </div>
	   <div class="profile-info">
	       <h2 class="name"></h2>
	       <ul>
	           <li>Favourite Weapon: <span class="weapon"></span></li>
	           <li>Favourite Colour: <span class="colour"></span></li>
	           <li>Favourite Saying: <span class="saying"></span></li>
	           <li>Favourite Food: <span class="food"></span></li>
	       </ul>
	   </div>
	</div>
	<?php
}

function tmnt_tutorial_css_js() {
	wp_enqueue_script( 'tmnt-tutorial', plugin_dir_url( __FILE__ ) .'admin.js' );
}
