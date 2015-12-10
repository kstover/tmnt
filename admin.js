/*
 * When we instantiate the character collection, we'll be passing it the information we'd like to start with.
 * [] is the JS notation for an array.
 * Each section of {} is one object and will be added as one model.
 *
 * We're defining this data in our JS file, but ideally it would come from our server or another data source.
 */
var defaultCharacters = [
	{
		id: 'leonardo',
		name: 'Leonardo',
		weapon: 'Katana',
		colour: 'Blue',
		saying: 'One of these guys must know where they’re holding Splinter, so don’t knock them all out.',
		food: 'Jelly Bean Pizza',
		img: tmnt.imgSrc + 'leonardo.jpg'
	},
	{
		id: 'raphael',
		name: 'Raphael',
		weapon: 'Sai',
		colour: 'Red',
		saying: 'Why? Why – Oh I don’t know, ’cause I wanted to redecorate. You know, a couple of throw pillows, a TV news reporter, what do ya think?',
		food: 'Tuna Fish Pizza',
		img: tmnt.imgSrc + 'raphael.jpg'
	},
	{
		id: 'michelangelo',
		name: 'Michelangelo',
		weapon: 'Nunchucks',
		colour: 'Orange',
		saying: 'I Love Being A Turtle!',
		food: 'Tuna Fish Pizza',
		img: tmnt.imgSrc + 'michelangelo.jpg'
	},
	{
		id: 'donatello',
		name: 'Donatello',
		weapon: 'Bo Staff',
		colour: 'Purple',
		saying: 'Bossanova!',
		food: 'Peanut Butter Pizza',
		img: tmnt.imgSrc + 'donatello.jpg'
	}
];


jQuery( document ).ready( function( $ ) {
	/*
	 * Setup our Backbone model to hold our character information
	 * Think of this like creating a class in PHP.
	 * We can instantiate the model by calling: new CharacterModel()
	 */
	var CharacterModel = Backbone.Model.extend();
	/*
	 * Setup our Backbone collection that will hold all of our characters
	 * This is a container for multiple models. Like the model above, this is just our class definition.
	 * We'll instantiate this later by calling: new CharacterCollection.
	 *
	 * When passing variables in JS, a common convention is to pass an object of options like:
	 * { key: value, key: value }
	 *
	 * This is what we're doing here. The only option that we need to pass to the collection is the name of our model class.
	 * Note that we don't pass an INSTANTIATED variable, but the model definition itself.
	 * Anytime we add a new model to this collection, it'll create a new model of that type.
	 */
	var CharacterCollection = Backbone.Collection.extend( {
		// Use the character model we defined above.
		model: CharacterModel
	} );

	/*
	 * Views represent UI output. 
	 * Because Backbone isn't opinionated, we have some crucial pieces to setup here, especially the render function.
	 */
	var CharacterSelectView = Backbone.View.extend( {
		// This is the jQuery/CSS selector that represents the DOM element we are going to reference in our render function.
		el: '.character-select',
		template: '#tmpl-character-radio',

		initialize: function() {
			// Backbone views don't automatically render when you create them, so if we want to self-render, we have to do that here.
			this.render();
			/*
			 * Views can listen to the collection and model passed to them.
			 * Here, we tell this view to call the render function when a model is removed from the collection and when the collection is reset.
			 */
			this.collection.on( 'remove', this.render, this );
			this.collection.on( 'reset', this.render, this );
		},

		//
		render: function() {
			var html = '<ul class="characters">';
			var that = this;
			_.each( this.collection.models, function( character ) {
				html += _.template( $( that.template ).html(), character.attributes );
			} );
			html += '</ul>';
			html += '<input type="button" class="button-secondary reset" value="Reset">';

			// This sets our view element HTML. It actually injects the html var into our DOM.
			this.$el.html( html );
			// Backbone convention is to return this context from render functions.
			return this;
		},

		events: {
			'change .character'	: 'changeCharacter',
			'click .reset'		: 'clickReset'
		},

		changeCharacter: function( e ) {
			var characterID = e.target.value;
			var characterModel = this.collection.get( characterID );
			cardView.render( characterModel );
		},

		clickReset: function( e ) {
			characters.reset( defaultCharacters );
		}

	} );

	/*
	 * Create our card view
	 */
	 var CardView = Backbone.View.extend( {
	 	el: '.contact-card',
	 	template: '#tmpl-contact-card',

	 	render: function( model ) {
	 		if ( model ) {
	 			this.model = model;
	 			var html = _.template( $( this.template ).html(), model.attributes );
	 		} else {
	 			var html = '';
	 		}
	 		this.$el.html( html );
	 		return this;
	 	},

	 	events: {
	 		'click .delete': 'deleteCharacter'
	 	},

	 	deleteCharacter: function( e ) {
	 		characters.remove( this.model );
	 		this.render();
	 	}

	 } );

	var characters = new CharacterCollection( defaultCharacters );

	var characterSelectView = new CharacterSelectView( { collection: characters } );
	var cardView = new CardView();
} );