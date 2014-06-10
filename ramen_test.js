var expect = require("chai").expect;
var sinon = require("sinon");

var Ramen = require("./lib/ramen.js");

describe("Ramen", function() { 
	describe("#make", function() {
		it("should make a ramen with default ingredients if none are provided", function() {
			var testRamen = new Ramen();
			expect(testRamen.meat		).to.equal("Sliced Pork");
			expect(testRamen.vegetable	).to.equal("Scallions");
			expect(testRamen.broth 		).to.equal("Miso");
			expect(testRamen.noodle 	).to.equal("Thin");	
			expect(testRamen.topping 	).to.equal("Nori");
			expect(testRamen.extra 		).to.equal(false); 
		});

		it("should throw an error if the ingredients are not enough", function() {
			var notEnough = ["Beef", "Bok Choy", "Beef", "Thick"];
			expect( function() { new Ramen( notEnough ) }).throw(Error);
		});

		it("should make a ramen with provided ingredients", function() {
			var myPreference = ["Braised Sliced Pork", "Spinach", "Tonkotsu", 'Thick', "Half-Boiled Egg"];
			var myRamen = new Ramen(myPreference);
			expect( myRamen.meat		).to.equal(myPreference[0]);
			expect( myRamen.vegetable 	).to.equal(myPreference[1]);
			expect( myRamen.broth 		).to.equal(myPreference[2]);
			expect( myRamen.noodle 		).to.equal(myPreference[3]);	
			expect( myRamen.topping 	).to.equal(myPreference[4]);
			expect( myRamen.extra 		).to.equal(false);
		});
	});

	describe("#addExtra", function(){
		it("should throw an error if extra ingredient isn't provided", function() {
			var extra1 = "";
			var extra2 = undefined;
			expect(function() { new Ramen().addExtra(extra1) }).to.throw(Error);
			expect(function() { new Ramen().addExtra(extra2) }).to.throw(Error);
		});

		it("should add an extra ingredient to your ramen", function(){
			var extra1 = "noodles";
			var extra2 = "broth";
			expect( new Ramen().addExtra(extra1) ).to.equal("Adding extra noodles to your ramen");
			expect( new Ramen().addExtra(extra2) ).to.equal("Adding extra broth to your ramen");
		});
	});

	describe("#changeBroth", function() {
		it("should throw an error if replacement broth isn't provided", function() {
			var broth1 = "";
			var broth2 = undefined; 
			expect(function() { new Ramen().changeBroth(broth1) }).to.throw(Error);
			expect(function() { new Ramen().changeBroth(broth2) }).to.throw(Error);
		});

		it("should replace the broth type with the provided replacement", function(){
			var broth1 = "Beer";
			var broth2 = "Orange Juice";
			expect( new Ramen().changeBroth(broth1) ).to.equal("Changed broth from Miso to Beer");
			expect( new Ramen().changeBroth(broth2) ).to.equal("Changed broth from Miso to Orange Juice");
		});
	});

	describe("#checkout", function() {
		it("should print out the total without extra toppings fee", function() {		
			expect( new Ramen().checkout() ).to.equal("Your total is $17.18");
		});

		it("should print out the total with extra toppings fee", function() {		
			var myRamen = new Ramen();
			myRamen.addExtra("broth");
			expect( myRamen.checkout() ).to.equal("Your total is $19.17");
		});

		it("should print out the total with extra topping and side", function() { 
			var myRamen = new Ramen();
			myRamen.addExtra("meat");
			myRamen.addSideOrder("steamed dumplings");
			expect( myRamen.checkout() ).to.equal("Your total is $20.16");
		});
	});

	describe("addSideOrder", function() {
		it("should throw an error if a side is not given", function() {
			var myRamen = new Ramen();
			expect(function() { myRamen.addSideOrder("") } ).to.throw(Error);
		});
	});

	// Sinon Test Case
	describe("#saveRamen", function() { 
		var sandbox;

		beforeEach(function() {
			sandbox = sinon.sandbox.create();
			sandbox.stub(console, "log");
			sandbox.stub(console, "error");
		});
		
		afterEach(function() {
			sandbox.restore();
		}); 

		it("should throw an error if the name is not provided", function() {
			var name = "";
			new Ramen().saveRamen(name);
			sinon.assert.notCalled(console.log);
			sinon.assert.calledOnce(console.error);
			sinon.assert.calledWithExactly(console.error, "You did not give a name for your ramen")
		});

		it("should save the ingredients of the ramen wrapped by a given name", function() {
			var myRamen = new Ramen();
			myRamen.saveRamen("Blue Dragon House Ramen");
			sinon.assert.notCalled(console.error);
			sinon.assert.calledOnce(console.log);
			sinon.assert.calledWithExactly(console.log, "Saved 'Blue Dragon House Ramen'");
		});
	});
	// More test cases added to test Drone.io automatics build
	describe("#randomRamen", function() {
		it("should switch up all the ingredients", function() {
			var myRamen		= new Ramen();
			var original	= myRamen.list;
			expect( myRamen.randomize() ).to.be.an.instanceof(Ramen);
			expect( original ).to.not.eql( myRamen.randomize().list );
		});
	});
})