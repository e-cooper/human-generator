Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};
Array.prototype.pickRemove = function() {
  var index = Math.floor(Math.random()*this.length);
  return this.splice(index,1)[0];
};

function getPerson() {
	var occupations = [
		{ title: 'a Personal Chef', tag: 'chef'}, 
		{ title: 'a Web Designer', tag: 'website'}, 
		{ title: 'a Photographer', tag: 'camera'},
		{ title: 'an Artist', tag: 'graffiti'}, 
		{ title: 'a Wedding Planner', tag: 'wedding'}, 
		{ title: 'a Filmmaker', tag: 'film'}, 
		{ title: 'a Journalist', tag: 'news'},
		{ title: 'a Doctor', tag: 'doctor'}, 
		{ title: 'an Entrepreneur', tag: 'suit'}, 
		{ title: 'a Florist', tag: 'flowers'}
		];

	var hobbies = [
		{ title: 'a Gamer', tag: 'gaming'}, 
		{ title: 'an Adrenaline Junkie', tag: 'rockclimbing'}, 
		{ title: 'a Blogger', tag: 'writing'},
		{ title: 'a Fisher', tag: 'fishing'}, 
		{ title: 'a Volunteer', tag: 'volunteer'}, 
		{ title: 'a Musician', tag: 'instrument'},
		{ title: 'a Swimmer', tag: 'swimming'},
		{ title: 'an Expert Poker Player', tag: 'poker'},
		{ title: 'an Amateur Pilot', tag: 'plane'},
		{ title: 'a Travel Enthusiast', tag: 'travel'}
		];

	var maleRoles = [
		{ title: 'and a Son', tag: 'son'},
		{ title: 'and a Father', tag: 'father'},
		{ title: 'and a Brother', tag: 'brother'}
		];

	var femaleRoles = [
		{ title: 'and a Daughter', tag: 'daughter'},
		{ title: 'and a Mother', tag: 'mother'},
		{ title: 'and a Sister', tag: 'sister'}
		];

	var foods = [
		{ title: 'Sushi', tag: 'sushi'}, 
		{ title: 'Burgers', tag: 'burger'}, 
		{ title: 'Cereal', tag: 'cereal'},
		{ title: 'Steak', tag: 'steak'}, 
		{ title: 'Barbeque', tag: 'barbeque'}, 
		{ title: 'Ice Cream', tag: 'icecream'},
		{ title: 'Tacos', tag: 'taco'},
		{ title: 'Italian Food', tag: 'spaghetti'},
		{ title: 'Desserts', tag: 'dessert'},
		{ title: 'Sandwiches', tag: 'sandwich'}
		];

	var drinks = [
		{ title: 'Beer', tag: 'beer'}, 
		{ title: 'Tea', tag: 'tea'}, 
		{ title: 'Juice', tag: 'juice'},
		{ title: 'Lemonade', tag: 'lemonade'},
		{ title: 'Water', tag: 'water'},
		{ title: 'Milk', tag: 'milk'}
		];

	var animals = [
		{ title: 'and Giraffes', tag: 'giraffe'}, 
		{ title: 'and Dogs', tag: 'puppy'}, 
		{ title: 'and Cats', tag: 'kitten'},
		{ title: 'and Koalas', tag: 'koala'}, 
		{ title: 'and Horses', tag: 'horse'}, 
		{ title: 'and Lizards', tag: 'lizard'},
		{ title: 'and Birds', tag: 'parrot'}
		];

	var countries = [
		{ title: 'in the US', tag: 'usa'}, 
		{ title: 'in Britain', tag: 'britain'}, 
		{ title: 'in China', tag: 'china'},
		{ title: 'in Japan', tag: 'tokyo'}, 
		{ title: 'in France', tag: 'france'}, 
		{ title: 'in Italy', tag: 'italy'},
		{ title: 'in South Africa', tag: 'southafrica'},
		{ title: 'in Brazil', tag: 'brazil'},
		{ title: 'in Germany', tag: 'germany'},
		{ title: 'in Ireland', tag: 'ireland'}
		];

	var locations = [
		{ title: 'on a Farm', tag: 'farm'}, 
		{ title: 'in a Suburb', tag: 'suburb'}, 
		{ title: 'in a Big City', tag: 'city'},
		{ title: 'on a Beach', tag: 'beach'}, 
		{ title: 'in the Mountains', tag: 'mountains'},
		{ title: 'in the Countryside', tag: 'countryside'}
		];

	var achievements = [
		{ title: 'and Survived Cancer', tag: 'cancer'}, 
		{ title: 'and Won the Lottery', tag: 'lottery'}, 
		{ title: 'and Built My Own Business', tag: 'money'},
		{ title: 'and Found Love', tag: 'truelove'}, 
		{ title: 'and I am Happy', tag: 'happy'}
		];

	var occupation = occupations.pick();
	var hobby = hobbies.pick();
	var food = foods.pick();
	var drink = drinks.pick();
	var animal = animals.pick();
	var country = countries.pick();
	var location = locations.pick();
	var achievement = achievements.pick();

	$.ajax({
	  url: 'http://api.randomuser.me/0.2/',
	  dataType: 'json',
	  success: function(data){
	  	getFont();

	    console.log(data);

	    var person = data.results[0].user;
	    var name = person.name.first + " " + person.name.last;
	    console.log(name);
	    $('.title').html('');
	    $('.title').append(name);

	    var picture = person.picture;

	    $('.img').html('');
	    $('.img').append('<img src="' + picture + '" />');

	    getColor();

	    var gender = person.gender;
	    var role;
	    if (gender === 'male') {
	    	role = maleRoles.pick();
	    }
	    else {
	    	role = femaleRoles.pick();
	    }

	    var extra = [
	    	{ obj: occupation, type: 'occupation'},
	    	{ obj: hobby, type: 'hobby'},
	    	{ obj: role, type: 'role'},
	    	{ obj: food, type: 'food'},
	    	{ obj: drink, type: 'drink'},
	    	{ obj: animal, type: 'animal'},
	    	{ obj: country, type: 'country'},
	    	{ obj: location, type: 'location'},
	    	{ obj: achievement, type: 'achievement'}
	    	];

	    getPhotos(extra[0].obj, 'occupation', extra, 0);
	  }
	});
}

function getFont() {
	$.ajax({
		url: 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + google.api_key,
		dataType: 'json',
		success: function(data){
			var family = data.items.pick().family;
			console.log(family);
			var familyPlus = family.split(' ').join('+');
			console.log(familyPlus);
			$('head').append('<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=' + familyPlus +'" />');

			$('.title').css('font-family', family);
		}
	});
}

function getColor() {
	$.ajax({
		url: 'http://www.colr.org/json/color/random',
		dataType: 'jsonp',
		success: function(data){
			console.log(data);
			var color = data.new_color;

			if (color === "") {
				console.log("No color!!! ------- fetching new!!!");
				getColor();
			}

			console.log(color);

			$('.titlebar').css('background-color', '#' + color);
			$('.footer').css('background-color', '#' + color);
		}
	});
}

function getPhotos(obj, type, extra, count) {

	console.log(obj.tag);

	var count = count;
	var which = 0;

	if (count > 2) {
		which = 1;
	}
	if (count > 5) {
		which = 2;
	}

	$.ajax({
		url: 'https://api.instagram.com/v1/tags/' + obj.tag + '/media/recent?client_id=' + instagram.clientID,
		dataType: 'jsonp',
		success: function(data){
			console.log(data);

			for (var i = 0; i < 4; i++) {
				var photo = data.data.pickRemove();
				while (photo.type !== "image") {
					console.log("Chose a video!!! -------- trying for an image again!!!");
					photo = data.data.pickRemove();
				}

				var photoUrl;

				if (i === 0) {
					photoUrl = photo.images.standard_resolution.url;
					$('.bigphotoContainer:eq(' + which + ')').append('<div class="bigphoto" id="' + type + '"><img src="' + photoUrl + '" /></div>');
				}
				else {
					photoUrl = photo.images.thumbnail.url;
					$('.photoList:eq(' + which + ')').append('<div class="imgwrapper"><img src="' + photoUrl + '" /></div>');
				}
			}

			$('.photoContainer:eq(' + which + ')').prepend('<h2 class="' + type + '"><span>' + obj.title + '</span></h2>');

			if (count < 8) {
				count = count + 1;
				getPhotos(extra[count].obj, extra[count].type, extra, count);
			}

			$(this).scrollTop(0);
		}
	});
}

$(document).ready(function() {
	getPerson();
	$(this).scrollTop(0);
});