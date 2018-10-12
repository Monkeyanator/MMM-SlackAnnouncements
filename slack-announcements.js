/* global Module */

/* Magic Mirror
 * Module: slack-announcements
 *
 * By HackerHome MTV
 * MIT Licensed.
 */

 Module.register("slack-announcements", {
     
    // Configuration
    defaults: {
        channel: "CDAQZ4JPL",
        slackToken: "xoxa-2-358490956676-453043057765-452761999987-6feeaa569f409a1f41143c3fbd7a95f4",
        messages: 3,
        updateInterval: 60, // in seconds
    },

    getChannelMessages: function(){
        var url = "https://slack.com/api/channels.history?token=xoxa-2-358490956676-453043057765-452761999987-6feeaa569f409a1f41143c3fbd7a95f4&channel=CDAQZ4JPL&count=1";
        var self = this;
        var slackMessageRequest = new XMLHttpRequest();

        slackMessageRequest.open("GET", url, true);
        slackMessageRequest.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
                    var parsedResponse = JSON.parse(this.response); 
                    var message = parsedResponse.messages[0].text
                    self.processMessage(message);
                } else if (this.status === 401) {
					self.updateDom(self.config.animationSpeed);
					Log.error(self.name + ": Incorrect APPID.");
					
				} else {
					Log.error(self.name + ": Could not load weather.");
				}
			}
        };
        
        slackMessageRequest.send();
        
    },

    processMessage: function(message) {
        this.message = message;
        this.updateDom();
    },

    start: function(){ 
        console.log("I'm confused");
        Log.info("Starting module: slack announcements");

		var self = this;
		setIntervalf(function() {
			self.getChannelMessages();
		}, 3000);

    },

    getDom: function(){

        console.log("abcdsafdasjflasdfljasjflsakjf");
        var wrapper = document.createElement("div");

        wrapper.innerHTML = this.message;
        return wrapper;

    }

 });