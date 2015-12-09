jQuery( document ).ready( function( $ ) {
	$( '.character' ).change( function( e ) {
		// Set variables based on our character selection.
		switch( $( this ).val() ) {
			case '':
				var weapon = '';
				var food = '';
				var colour = '';
				var saying = '';
				var img = 'http://placehold.it/100x100';
				var characterName = '';
				break;
			case 'leonardo':
				var weapon = 'Katana';
				var food = 'Jelly Bean Pizza';
				var colour = 'Blue';
				var saying = 'One of these guys must know where they’re holding Splinter, so don’t knock them all out.';
				var img = tmnt.imgSrc + 'leonardo.jpg';
				var characterName = 'Leonardo';
				break;
			case 'raphael':
				var weapon = 'Sai';
				var food = 'Tuna Fish Pizza';
				var colour = 'Red';
				var saying = 'Why? Why – Oh I don’t know, ’cause I wanted to redecorate. You know, a couple of throw pillows, a TV news reporter, what do ya think?';
				var img = tmnt.imgSrc + 'raphael.jpg';
				var characterName = 'Raphael';
				break;
			case 'michelangelo':
				var weapon = 'Nunchucks';
				var food = 'Anchovy Pizza';
				var colour = 'Orange';
				var saying = 'I Love Being A Turtle!';
				var img = tmnt.imgSrc + 'michelangelo.jpg';
				var characterName = 'Michelangelo';
				break;
			case 'donatello':
				var weapon = 'Bo Staff';
				var food = 'Peanut Butter Pizza';
				var colour = 'Purple';
				var saying = 'Bossanova!';
				var img = tmnt.imgSrc + 'donatello.jpg';
				var characterName = 'Donatello';
				break;
		}

		// Change our DOM using the variables above.
		$( '.weapon' ).html( weapon );
		$( '.food' ).html( food );
		$( '.colour' ).html( colour );
		$( '.saying' ).html( saying );
		$( '.character-name' ).html( characterName );
		$( '.img' ).attr( 'src', img );

		// Show the character info section if we havent't selected the 'reset' option.
		if ( $( this ).val() == '' ) {
			$( '.character-info' ).hide();
		} else {
			$( '.character-info' ).show();
		}
	} );
} );