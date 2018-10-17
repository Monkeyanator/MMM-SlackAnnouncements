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
        channel: "",
        slackToken: "",
        messages: 1,
        updateInterval: 60, // in seconds
    },

    getChannelMessages: function(){
        var url = "";
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

		var self = this;
		setInterval(function() {
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
