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
	add_action( 'admin_print_styles-' . $page, 'tmnt_tutorial_js' );
}

add_action( 'admin_menu', 'tmnt_tutorial_add_menu' );

function tmnt_tutorial() {
	?>
	Please select your favourite TMNT Character!
	<ul>
		<li>
			<label><input type="radio" name="char" value="leonardo"> Leonardo</label>
		</li>
		<li>
			<label><input type="radio" name="char" value="raphael"> Raphael</label>
		</li>
		<li>
			<label><input type="radio" name="char" value="michelangelo"> Michelangelo</label>
		</li>
		<li>
			<label><input type="radio" name="char" value="donatello"> Donatello</label>
		</li>
	</ul>
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


<div class="contact-card">
   <div class="profile-pic">
       <img src="http://placehold.it/100x100">
   </div>
   <div class="profile-info">
       <h2>Raphael</h2>
       <ul>
           <li>Favourite Weapon: Sai</li>
           <li>Favourite Colour: Red</li>
           <li>Favourite Saying: "All right! An all you can BEAT buffet!"</li>
           <li>Favourite Food: Pizza</li>
       </ul>
   </div>

</div>
	<?php
}

function tmnt_tutorial_js() {
	
}
