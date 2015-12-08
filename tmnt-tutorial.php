<?php
/*
Plugin Name: TMNT: Who's Your Favourite Turtle?
Plugin URI: http://kstover.codes/tmnt-tutorial
Description: Select your favourite Ninja Turtle!
Version: 0.1
Author: Kevin Stover
License: GPLv2
*/

// Quickest way to add an admin page.
function tmnt_tutorial_add_menu(){
	$page = add_menu_page( 'TMNT' , 'Pick a Turtle!', 'manage_options', 'tmnt-tutorial', 'tmnt_tutorial', 'dashicons-art' );
}

add_action( 'admin_menu', 'tmnt_tutorial_add_menu' );

function tmnt_tutorial() {
	?>
	Please select your favourite Ninja Turtle!
	<ul>
		<li>
			<label><input type="radio" name="turtle" value="leonardo"> Leonardo</label>
		</li>
		<li>
			<label><input type="radio" name="turtle" value="raphael"> Raphael</label>
		</li>
		<li>
			<label><input type="radio" name="turtle" value="michelangelo"> Michelangelo</label>
		</li>
		<li>
			<label><input type="radio" name="turtle" value="donatello"> Donatello</label>
		</li>
	</ul>
	Your favourite turtle is: <span class="fav-turtle"></span>
	<?php
}
