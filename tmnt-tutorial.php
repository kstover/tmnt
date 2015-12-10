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
	.character-select {
		float: left;
		display: block;
		width: 200px;
	}
	.character-select::after {
	   clear: both;
	   content: "";
	   display: block;
	}
	.character-info {
	   float: left;
	   width: 400px;
	}
	.character-info::after {
	   clear: both;
	   content: "";
	   display: block;
	}
	.contact-card {
	   background: #fff;
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
	   padding: 0 20px 20px;
	   width: 205px;
	}
	</style>
	<div>
		<h1>Select A TMNT Character!</h1>
		<div class="character-select">
			<ul class="characters"></ul>
		</div>
		<div class="character-info">
			<div class="contact-card"></div>
		</div>
	</div>

	<script id="tmpl-character-radio" type="text/template">
		<li>
			<label><input type="radio" class="character" name="character" value="<%= id %>"> <%= name %></label>
		</li>
	</script>

	<script id="tmpl-contact-card" type="text/template">
		<div class="profile-pic">
	       <img class="img" src="<%= img %>">
	   </div>
	   <div class="profile-info">
	       <h2 class="name"><%= name %></h2>
	       <ul>
	           <li><strong>Favourite Weapon:</strong> <%= weapon %></li>
	           <li><strong>Favourite Colour:</strong> <%= colour %></li>
	           <li><strong>Favourite Saying:</strong> <%= saying %></li>
	           <li><strong>Favourite Food:</strong> <%= food %></li>
	       </ul>
	       <a href="#" class="delete">Delete</a>
	   </div>
	</script>
	<?php
}

function tmnt_tutorial_css_js() {
	wp_enqueue_script( 'tmnt-tutorial', plugin_dir_url( __FILE__ ) .'admin.js', array( 'jquery', 'backbone', 'underscore' ) );
	wp_localize_script( 'tmnt-tutorial', 'tmnt', array( 'imgSrc' => plugin_dir_url( __FILE__ ) . 'images/' ) );
}
