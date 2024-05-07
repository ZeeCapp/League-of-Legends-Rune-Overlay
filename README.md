
# League of Legends Rune Overlay

**League of Legends Rune Overlay** is a simple Electron app that can be used to display an overlay with your currently chosen runes
on your stream. It can be used with any streaming software that is able to embed a web view.

This app gets all of its rune data from the [League Client API](https://developer.riotgames.com/docs/lol#league-client-api) and its rune images from [Comunity Dragon](https://www.communitydragon.org/). This ensures that you don't need to update the app unless you want to use new features or League Client API or Comunity Dragon make changes to their API that break backwards compatibility. 

![Overlay preview](https://private-user-images.githubusercontent.com/29626105/328596244-d058d2cf-8553-4846-b175-12102c773057.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTUwOTg0NDIsIm5iZiI6MTcxNTA5ODE0MiwicGF0aCI6Ii8yOTYyNjEwNS8zMjg1OTYyNDQtZDA1OGQyY2YtODU1My00ODQ2LWIxNzUtMTIxMDJjNzczMDU3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MDclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTA3VDE2MDkwMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWI0Y2NhZWJjZDY3MWY3YTcwZmZlNWUwN2M2ODk0YTIzZThjZjhkMzRhYWNmNGE4NmNkMDcxZmFhNDhkOGUwM2ImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.aTMyxCy0x5peAfG6ZGi9eGsPDiQonIfM8ckdIoDZLoU)

*The overlay can be scaled and rotated in your streaming software.*

## Build from source

In order to build this app from source, follow these steps:
- clone this repository and cd into it
- run `npm install` (you need to have node and npm installed on your machine)
- run `npm run build` - this will convert typescript files to javascript
- run `npm run package` to build the final package

## Planned features
- Add transition animations to the rune overlay
