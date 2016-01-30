/*
I used a bit of jQuery here, but I think I'm more comfortable with vanilla JavaScript since typing speed isn't really a bottleneck for me yet. It's still great for cross-browser compatability though.
*/


var channelNames = [
	"freecodecamp", 
	"storbeck", 
	"terakilobyte", 
	"ESL_SC2",
	"habathcx",
	"brunofin",
	"comster404",
	"RobotCaleb",
	"thomasballinger",
	"noobs2ninjas",
	"beohoff",
	'pink_sparkles',
]

/*
$( document ).ready(function() {
	console.log("doc ready");
	var channels = channelNames.map(function(x) {
		return new Channel(x);
	}).slice();
	console.log(channels);
	console.log("doc ready");
}); */

console.log("doc ready");
var channels = channelNames.map(function(x) {
		//return new Channel(x);
});
console.log(channels);
console.log("doc ready");


var channelList; //maybe or maybe not remove once done coding?
$( document ).ready(function() {
	channelNames.map(function(x) {
		createChannelLine(x, 'streamer-list');
	});
	//createChannelLine('ESL_SC2', 'streamer-list');
});


var defaultAvatar = 'http://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F';
// info is pulled by 'username'
// this function will create the DOM elements of each line
// each line will be defined by ID = username
function createChannelLine(username, listID) {
	var list = $('#' + listID);
	list.append('<div id="' + username + '" class="streamer"></div>')
	var channelContainer = document.getElementById(username);
	
	// CHANNEL AVATAR - class="avatar"
	$('#' + username).append('<img src="' + defaultAvatar + '"class="avatar">');
	// container for NAME and GAME&DESCRIPTION
	$('#' + username).append('<div class="textbox"></div>');
	// CHANNEL NAME - class="username"
	$('#' + username + " .textbox").append('<div class="username">' + username + '</div>');
	// CURRENT GAME&DESCRIPTION - class="current"
	$('#' + username + " .textbox").append('<div class="current"><br>Offline<br>&nbsp;</div>');
	
	var urlRequest = 'https://api.twitch.tv/kraken'
	
	// get account info and refresh
	$.getJSON('https://api.twitch.tv/kraken/channels/' + username + '?callback=?', function (channel) {
		console.log('channel', channel);
		channelContainer.getElementsByClassName("avatar")[0].src = channel.logo || defaultAvatar;
		// channelLink does nothing right now !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		var channelLink = channel.url;
	});
	// check if streaming, if so update what they are streaming
	$.getJSON('https://api.twitch.tv/kraken/streams/' + username + '?callback=?', function (data) {
		console.log('stream', data);
		if (data.stream) {
			console.log('stream should update');
			console.log(channelContainer.getElementsByClassName("current"));
			var gameAndDescription = data.stream.game + ": " + data.stream.channel.status;
			channelContainer.getElementsByClassName("current")[0].innerHTML = gameAndDescription;
			// maybe also get the data.stream.channel.banner?
		} else if (data.status = 422) {
			console.log("DANGER WILL ROBINSON DANGER");
			channelContainer.getElementsByClassName("current").innerHTML = "Account has been deleted";
		}
	});
	
	this.html = 
		'<div id="streamer-list">'
			'<div class="streamer">'
				'<img src="' + this.avatar + '" class="avatar">'
				'<span class="username">' + this.name + '</span>'
				'<span class="current">' + this.game + '</span>'
				'<span class="description">' + this.description + '</span>'
			'</div><!--end .streamer-->'
		'</div> <!--end #streamer-list-->'
} 

// can use delay null 


/*
$.getJSON('https://api.twitch.tv/kraken/streams?stream_type=all&channel='+ channels.join(','), function(data) {
	console.log(data);
});
*/