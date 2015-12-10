jQuery( document ).ready( function( $ ) {
	/*
	 * When someone changes their radio selection, change the contact card.	 * 
	 */
	$( document ).on( 'change', '.character', function( e ) {
		// Set variables based on our character selection.
		switch( $( this ).val() ) {
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
		$( '.name' ).html( characterName );
		$( '.img' ).attr( 'src', img );

		// Set our delete character data character so that we can delete this character.
		$( '.delete' ).data( 'character', $( this ).val() );
	} );
	
	/*
	 * When someone clicks the reset button, clear and hide the contact card and remove selections on our radio.
	 */
	$( '.reset' ).click( function( e ) {
		// Clear our character selection radio buttons
		$( '.character' ).each( function() {
			$( this ).attr( 'checked', false );
		} );

		// Clear our contact card
		tmntClearHideCard();

		// Reset our character list
		var html = '<li><label><input type="radio" class="character" name="character" value="leonardo"> Leonardo</label></li>';
		html += '<li><label><input type="radio" class="character" name="character" value="raphael"> Raphael</label></li>';
		html += '<li><label><input type="radio" class="character" name="character" value="michelangelo"> Michelangelo</label></li>';
		html += '<li><label><input type="radio" class="character" name="character" value="donatello"> Donatello</label></li>';
		
		$( '.characters' ).html( html );
	} );

	/*
	 * When someone clicks on the delete button:
	 * 
	 * Remove their radio button
	 * Clear and hide the contact card
	 */
	$( document ).on( 'click', '.delete', function( e ) {
		// Remove the radio button for this character
		$( '.character[value="' + $( this ).data( 'character' ) + '"]').parent().remove();
		// Clear our contact card
		tmntClearHideCard();
	} );

	function tmntClearHideCard() {
		// Clear our contact card
		var weapon = '';
		var food = '';
		var colour = '';
		var saying = '';
		var img = 'http://placehold.it/100x100';
		var characterName = '';

		// Change our DOM using the variables above.
		$( '.weapon' ).html( weapon );
		$( '.food' ).html( food );
		$( '.colour' ).html( colour );
		$( '.saying' ).html( saying );
		$( '.name' ).html( characterName );
		$( '.img' ).attr( 'src', img );

		// Show the character info section if we havent't selected the 'reset' option.
		$( '.contact-card' ).html( '<h4>Character Info Will Appear Here</h4>' );
	}
} );