module.exports = Ramen;

function Ramen(ingredients) { 
	if (!ingredients){ 
		var defaults = ["Sliced Pork", "Scallions", "Pork", "Thin", "Nori"];
		this.list 		= defaults;
		this.meat 		= defaults[0];
		this.vegetable 	= defaults[1];
		this.broth 		= defaults[2]; 
		this.noodle 	= defaults[3]; 
		this.topping 	= defaults[4];
		this.extra 		= false;
		this.side 		= false;
	} else { 
		if (ingredients.length != 5) { throw new Error('Not enough ingredients (meat, vegetable, broth, noodle, topping)'); }
		this.list 		= ingredients;
		this.meat 		= ingredients[0];
		this.vegetable 	= ingredients[1];
		this.broth 		= ingredients[2]; 
		this.noodle 	= ingredients[3]; 
		this.topping	= ingredients[4];
		this.extra 		= false;
		this.side 		= false;
	}
}

Ramen.prototype = {
	addExtra: function(extra) {
		if (!extra) { throw new Error("What ingredient do you want to add more?"); }
		this.extra = extra;
		return "Adding extra " + extra + " to your ramen";
	},

	changeBroth: function(replacement) {
		if (!replacement) { throw new Error("What do you want to replace your broth with?"); }
		var old = this.broth;
		this.broth = replacement; 
		return "Changed broth from " + old + " to " + replacement;
	},

	checkout: function(){
		if (!this) { throw new Error("Did you order a ramen?") }			
		var subtotal = 12.99;
		var tax 	 = subtotal * 0.15;
		var tips	 = (subtotal + tax) * 0.15;
		var options  = (this.extra) ? 1.99 : 0;
		var side     = (this.side) ? 0.99: 0;
		var total 	 = subtotal + tax + tips + options + side;
		return "Your total is $" + Math.round(total * 100) / 100; 
	},
	
	addSideOrder: function(side) { 
		if (!side) { throw new Error("What side do you want to add more?") }
		this.side = side; 
		console.log("Added " + side + " as a side order");
	},
	
	saveRamen: function(name) {
		if (!name) { return console.error("You did not give a name for your ramen") }
		// ....some code to save the ingredients...
		console.log("Saved '" + name + "'");
	}
}


