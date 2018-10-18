/* global Module */

/* Magic Mirror
 * Module: slack-announcements
 *
 * By HackerHome MTV
 * MIT Licensed.
 */

Module.register("MMM-SlackAnnouncements", {
  // Configuration
  defaults: {
    title: "Announcements",
    channel: "",
    slackToken: "",
    updateMs: 3000 // in ms
  },

  getChannelMessages: function() {
    var url = `https://slack.com/api/channels.history?token=${
      this.config.slackToken
    }&channel=${this.config.channel}&count=1`;
    var self = this;
    var slackMessageRequest = new XMLHttpRequest();

    slackMessageRequest.open("GET", url, true);
    slackMessageRequest.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          var parsedResponse = JSON.parse(this.response);
          var message = parsedResponse.messages[0].text;
          self.processMessage(message);
        } else if (this.status === 401) {
          self.updateDom(self.config.animationSpeed);
        }
      }
    };

    slackMessageRequest.send();
  },

  processMessage: function(message) {
    this.message = message;
    this.updateDom();
  },

  start: function() {
    var self = this;
    setInterval(function() {
      self.getChannelMessages();
    }, this.config.updateMs);
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    var displayText = this.message == undefined ? "Loading..." : this.message;

    wrapper.innerHTML = `
            <h1> ${this.config.title} </h1>
            ${displayText}
        `;

    return wrapper;
  }
});
