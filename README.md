# basic-bot-template written in JavaScript
A basic discord level bot with costumizable welcome messages and rank command

# Requirements

- A mongodb url (Watch this tutorial if you don't know how: https://youtu.be/4X2qsZudLNY)
- An Heroku account to host the bot for 24/7 (Here you go as well: https://www.youtube.com/watch?v=8qIsRzV0Hpg&t=620s **NOTE**: Delete the folder `node_modules` before commiting to github)

# Things to do

- Install all packeges for testing porpuses with `npm install`
- Insert Bot token and Mongo url in the `.env` file  
- Add one or two images for the welcome message and the rank card
- Download the images where the `index.js` file is located
- Insert the image Name for the rank card in the `rank.js` file in the folder `commands` at line `37` and `65` here: `.setBackground("IMAGE", 'IMAGE_NAME');`
- Don't forget to enable presence intent in your bot settings!![Bild_2021-06-26_174955](https://user-images.githubusercontent.com/84540638/123518607-eaf87a00-d6a6-11eb-9ce5-847e70c2bbfe.png)
- For the welcome message insert the image path like here in the given example in the `welcome.js` file under `Events` like here 
`const background = await Canvas.loadImage('./canvas.jpg');`
- Start up command is `node .` for testing
- Change the invite URL in the `index.js` file at line 113 for your bot's invite url
- Your done and enjoy!

YOU CAN USE THIS BOT TEMPLATE FOR FREE BUT REMEMBER! 
~ *Blindly copy and pasting is a bad habbit, at least try to understand the code you are copieng* - literally everyone who code ~
