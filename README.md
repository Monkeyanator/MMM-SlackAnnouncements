## Hacker Home Mountain View Presents...

![alt text](https://raw.githubusercontent.com/Monkeyanator/MMM-SlackAnnouncements/master/images/sample.png)

# MMM-SlackAnnouncements
MagicMirror<sup>2</sup> made.

## Dependencies
  * Must have the core installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)

## Installation
 1. Clone this repo into `~/MagicMirror/modules` directory.
 2. Configure your `~/MagicMirror/config/config.js`:
 
     ```
     {
         module: 'MMM-SlackAnnouncements',
         position: 'top_right',
         config: {
                // See 'Configuration options' for more information.
            }
     }
     ```

## Configuration Options
| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `title` | `Announcements` | Title for the module |
| `updateMs` | `3000` | Milliseconds in between announcement message refresh |
| `channel` | `[MUST SET]` | Slack channel to listen for announcements on |
| `slackToken` | `[MUST SET]` | Slack API token (must be authorized for channel.history) |
