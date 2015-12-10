/*
 * Working with WordPress in PHP, we need to prefix our functions so that we avoid collision.
 * When we're working in JS, we need to do the same thing. 
 * 
 * We'll create an object to hold our functions and variables, which will avoid any collision.
 * This will let us do things like: tmnt.variable rather than just variable.
 * These are called object properties. Note that a property can be a variable or a function or another object.
 *
 * Unlike PHP, if we give a function the same name as a function that already exists, we won't get an error; the last reference on the page will be used.
 * The same goes for variables.
 *
 * This definition is outside of our document.ready so that it's available as soon as the page loads.
 * This means that other code that's wrapped in document.ready could read it as well.
 * In this example that isn't very important, but its generally good practice if you think that the variable might be accessed by other JS code.
 *
 * 
 * In JS, you can create a new object at any time by using: var obj = {}
 * 
 * You can also use:
 * var obj = {
 * 	  name: 'bob',
 * 	  address: '123 any street',
 * 	  city: 'myTown'
 * }
 *
 * Which would yield:
 *
 * obj.name = 'bob';
 * obj.address = '123 any street';
 * obj.city = 'myTown';
 *
 * The tmnt = tmnt || {} code means: if tmnt is already defined, use that variable. If it isn't create a new object.
 */
var tmnt = tmnt || {}

/*
 * In JS, we can set object properties using the . notation. Here, we setup our default character array.
 * 
 * When we instantiate the character collection, we'll be passing it the information we'd like to start with.
 * 
 * [] is the JS notation for an array. There aren't any associative arrays in JS. If you want an associative, array, use an object.
 * 
 * This is an example of creating an array:
 * 
 * var myStuff = [
 * 	 'katana',
 * 	 'throwing star',
 * 	 'ninja mask'
 * ];
 *
 * Which would yield:
 *
 * myStuff[0] = 'katana';
 * myStuff[1] = 'throwing star';
 * mystuff[2] = 'ninja mask';
 * 
 * Each section of {} is one object and will be added as one model.
 *
 * We're defining this data in our JS file, but ideally it would come from our server or another data source.
 */
tmnt.defaultCharacters = [
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
	tmnt.CharacterModel = Backbone.Model.extend();
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
	tmnt.CharacterCollection = Backbone.Collection.extend( {
		// Use the character model we defined above.
		model: tmnt.CharacterModel
	} );

	/*
	 * Views represent UI output. 
	 * Because Backbone isn't opinionated, we have some crucial pieces to setup here, especially the render function.
	 */
	tmnt.CharacterSelectView = Backbone.View.extend( {
		// This is the jQuery/CSS selector that represents the DOM element we are going to reference in our render function.
		el: '.character-select',
		/*
		 * We don't necessarily need to define these as view-objects, but it's helpful when we're reviewing our code later.
		 */
		liTemplate: '#tmpl-character-radio',
		resetTemplate: '#tmpl-character-reset',

		/*
		 * As the name implies, this runs whenever we call new tmnt.CharacterSelectView()
		 */
		initialize: function() {
			/*
			 * 
			 * Usually 'this' refers to the immediate context of where you are.
			 * If you use jQuery to select an element, for example, 'this' will refer to that element.
			 * $( '.my-class' ).click( function() { console.log( $( this ) ) } );
			 * will output the jQuery representation of the element with the class of 'my-class'.
			 *
			 * When you're working within a function that is the property of a JS object, as we are currently, 'this' refers to the object.
			 * So you can refer to other object properties by using 'this.property'.
			 *
			 * In this function, we're referring to other properties of the tmnt.CharacterSelectView by using this.property.
			 *
			 * Backbone views don't automatically render when you create them, so if we want to self-render, we have to do that here.
			 */
			this.render();
			/*
			 * Views can listen to the collection and model passed to them.
			 * When we instantiate this view, we'll be passing a collection to it.
			 * We can refer that collection in our functions by using this.collection.
			 * 
			 * Here, we tell this view to call the render function when a model is removed from the collection and when the collection is reset.
			 */
			this.collection.on( 'remove', this.render, this );
			this.collection.on( 'reset', this.render, this );
		},

		/*
		 * This function tells our view how to inject HTML into our DOM.
		 * Note that Backbone views don't define render by default. We have to create it ourselves.
		 */
		render: function() {
			/*
			 * I don't like including any HTML in my JS, but for this tutorial I felt like it was less confusing to read than the other options.
			 * In a more advanced tutorial, we'll cover some other ways to wrap template output.
			 */ 
			var html = '<ul>';
			/*
			 * We are going to be looping over all of the models in our character collection, and within that context 'this' refers to the item being looped over.
			 */
			var that = this;
			_.each( this.collection.models, function( character ) {
				html += _.template( $( that.liTemplate ).html(), character.attributes );
			} );
			html += '</ul>';
			html += _.template( $( this.resetTemplate ).html(), {} );

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
			tmnt.cardView.render( characterModel );
		},

		clickReset: function( e ) {
			tmnt.characters.reset( tmnt.defaultCharacters );
			tmnt.cardView.render();
		}

	} );

	/*
	 * Create our card view
	 */
	 tmnt.CardView = Backbone.View.extend( {
	 	el: '.contact-card',
	 	template: '#tmpl-contact-card',
	 	emptyTemplate: '#tmpl-contact-card-empty',

	 	initialize: function() {
	 		this.render();
	 	},

	 	render: function( model ) {
	 		if ( model ) {
	 			this.model = model;
	 			var html = _.template( $( this.template ).html(), model.attributes );
	 		} else {
	 			var html = _.template( $( this.emptyTemplate ).html() );
	 		}
	 		this.$el.html( html );
	 		return this;
	 	},

	 	events: {
	 		'click .delete': 'deleteCharacter'
	 	},

	 	deleteCharacter: function( e ) {
	 		e.preventDefault();
	 		tmnt.characters.remove( this.model );
	 		this.render();
	 	}

	 } );

	tmnt.characters = new tmnt.CharacterCollection( tmnt.defaultCharacters );

	tmnt.characterSelectView = new tmnt.CharacterSelectView( { collection: tmnt.characters } );
	tmnt.cardView = new tmnt.CardView();
} );