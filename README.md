# PlagueSweeper ReadMe


## Description

I set out trying to make a rendition of the classic game “MineSweeper”! When trying to make it my own, I imagined in what other scenario someone would try to get rid of a bunch of similar items, and “clear” an area…and my mind somehow arrived at getting rid of rats during the plague! Hence, “PlagueSweeper”. The game works the same as MineSweeper (you have to avoid clicking the rats, and clicking any other cell reveals that cell, and clicking empty cells reveals all adjacent empty cells in a “flood” like manoeuvre), and has 3 difficulties that change both the size of the board and the number of rats. 

## Deployment link

https://turq-uoise.github.io/MineSweeper-JS/


## Getting Started/Code Installation

Follow the GitHub Pages link, and left click one of the difficulty options to get started!



## Timeframe & Working Team (Solo/Pair/Group)

I was working as a sole developer, and in total this code took me about 12 or less hours to write. 



## Technologies Used

I used JavaScript, HTML and CSS to write this program.



## Brief

I was told to recreate “MineSweeper”, and that the “flood” mechanic must be implemented. The following was in my technical brief:

- Render a game in the browser.

- Include win/loss logic and render win/loss messages in HTML. Popup alerts using the alert() method are okay during development, but not production.

- Include separate HTML, CSS & JavaScript files.

- Use vanilla JavaScript, not jQuery.

- Have properly indented HTML, CSS & JavaScript. In addition, vertical whitespace needs to be consistent.

- No remaining unused and/or commented out code (code that will never be called) .

- Have functions and variables that are named sensibly. Remember, functions are typically named as verbs and variables (data) named as nouns.

- Be coded in a consistent manner. For example, choose between your preference for function declarations vs. function expressions.

- Be deployed online using GitHub Pages so that the rest of the world can play your game!

## Planning

I mocked up a very simple wireframe before the start of my coding journey. Since MineSweeper looks like MineSweeper, there was very little I had to do to follow my theme idea:

![image](https://github.com/Turq-uoise/MineSweeper-JS/assets/107884520/bb38dec1-64ce-423b-91ad-83c75feb5890)

PseudoCode:
1) Handle Game Start
     - Generate Grid according to difficulty (20x20, 40x40, 60x60)
     - Randomly generate bombs
     - Prepare Timer
     - Set Smiley Face (plague doctor mask)
     - Reset Flag Count (10 on easy, 20 on medium and 40 on hard)
2) Handle Click

        If right click, place Flag (to fit theme, will probably be a rat trap or something)
        Reduce Flag Count by 1
        If left click
        Check if it's a bomb, if yes then unhide all markers and make rats red
        If not 
           Check if all adjacent tiles are empty 
                If yes then unhide all empty tiles that touch it and ones that touch those (i think this is how flood works)
           If there are non-empty adjacent tiles
                Check all adjacent tiles and unhide all empty tiles that touch it 
                Count non-empty adjacent tiles, update Clicked Tile to contain this Count







## Build/Code Process
The very first thing I did upon setting up the template (i.e generating the grids and cells) was get to work on spawning the rats. 

![image](https://github.com/Turq-uoise/MineSweeper-JS/assets/107884520/341215df-529b-4a46-9d7c-dddfa2a6a825)

The first function is very similar to a code snippet I wrote while following a GA lecture. The second function was originally a bit simpler (the randomiser used a simple for loop), but I realised that the way I was randomising things would mean that there was a chance of repeat numbers (so rats would end up overlapping). I searched online for some fixes, and stackoverflow ended up having a very elegant solution: It creates an array of ascending numbers (from 0 up to the number of cells), and then randomly selects a “ratCount” amount from that array after sorting it into a random order. After this, I check each random ID sorted into “ratIdx” against the ids of the cells in the grid. If they are equal, I place a hidden rat!

Next was the first difficult part of this program. I had to calculate the numbers surrounding the bombs. That is, for each tile around the bomb, the value in it needs to go up by 1. This means that an empty tile that has 2 bombs surrounding it (i.e in the 3x3 grid it is inside) will have a value of “2”. What I have works, but I don’t think it’s particularly efficient:

![image](https://github.com/Turq-uoise/MineSweeper-JS/assets/107884520/f8414c54-aaa0-41a2-86aa-d813ea09ca42)
![image](https://github.com/Turq-uoise/MineSweeper-JS/assets/107884520/6414d20d-5af1-4f9f-af60-f30a851d19bb)
![image](https://github.com/Turq-uoise/MineSweeper-JS/assets/107884520/3890b46c-58dd-4c1d-b24d-81e0352f70d1)

“findRats” takes an array with numbers inside it, and then adds a value of 1 to whatever cell has an ID equal to those numbers. It takes the argument “ratCheck”, which I set beforehand. 
I split “ratCheck” into three parts, “Neutral”, “Above” and “Below”. This just makes the code a bit easier to read, but this could be done with just a single array. Then, those three arrays are populated with the respective cells, i.e for “Above”, it takes the given ID (i.e the ID of the rat) and gets the values for the IDs that are above it, above and to the left, and above and to the right. It repeats this with the Neutral and Below as you would expect, and then passes it to “findRats”. I believe there is probably a far less messy way to do this, and if I were to come back to this code at a later date, I’d like to clean it up. A similar bit of code I end up writing later is a bit cleaner, but still not perfect.

The penultimate (important) piece of code has to do with the actual clicking. 

![image](https://github.com/Turq-uoise/MineSweeper-JS/assets/107884520/63837289-69c9-48de-b6dd-157e91202328)
![image](https://github.com/Turq-uoise/MineSweeper-JS/assets/107884520/acd91eef-01c7-4833-a3d5-719b016888b2)

If a rat is clicked, I need to show all the rats and announce the loss of the player! If a cell with a certain value is clicked, I need to show that cell. However, if an empty cell is clicked…the “flood” occurs. This is the most important, most difficult, and final piece of code I wrote for this program.

![image](https://github.com/Turq-uoise/MineSweeper-JS/assets/107884520/c4c67f59-caf2-4bee-b985-eb3e0b836bd4)

And I’m pretty happy with it! Because there is no need to check diagonal cells, this ended up being quite a bit cleaner than the checkRats function. I accounted for all edge cases (literally; checked for everything along each edge, as well as in each corner) and managed to get the if statements to be very short thanks to turning the cardinal directions into vectors. The first step is to empty the square that’s clicked; the last step is to “flood” any adjacent empty squares. 
Any time the cell that is checked has a value of 0, the recursion kicks in, and sends that cell into a new “flood” function. And once that flood function finishes, the next cell gets sent into the “flood”, and so on. If the cell has a non-zero, non-rat value, there is no flood for that cell, and instead the score is “revealed” as text in that cell. 
This ends up reflecting what a normal MineSweeper game looks like!

![image](https://github.com/Turq-uoise/MineSweeper-JS/assets/107884520/3758155c-76e2-4bc9-a9db-3ad9d20afec0)


## Challenges

The “challenges” I ran into ended up being simple mistakes rather than technical or logic problems. For example, my flood mechanic seemed to not be recursing correctly, and only applying the flood to the first valid cell (i.e first cell that had a value of 0). After much struggle, I figured out that the issue was simply that I failed to clear the array in which I was storing the cell IDs (rainCheck in the above screenshots). I figured this out because, as I was implementing a reset, I decided to check all my variables and make sure they were getting properly cleared when “init” is run, and this happened to be one of them. 

Another challenge was trying to properly use the various variables within my “cells” object. Originally, this was just an array, and I had trouble manipulating each individual cell in a way that allowed me to calculate the score. I was going to make a separate array, but then thought that turning it into an object would give me a lot more freedom with how the scores interact with the cells. A lot of my struggles, however, ended up being caused by this. Not because it wasn’t the correct idea, but because the notation kept stumping me! In the end, I definitely don’t regret it, but I wish I didn’t make so many mistakes like that, as it wasted valuable time that I could have used on polishing. Thanks to this, though, I feel more confident that I’ll be able to avoid these rookie mistakes.


## Wins

The fact that I managed to get the flood mechanic to work on basically my first try, and that the only issue was not the logic, but a simple clerical error, made me quite happy. Overall I feel that the code is quite clean and easy to read, perhaps due to robust use of functions.

## Key Learnings/Takeaways

I was glad to learn that recursion is about as simple and powerful as I thought it was. I felt comfortable with JavaScript already, but this consolidated that. I do think that I could work on my CSS skills a bit more as there was a lot of copy-pasting from previous and example code provided by GA here, which I would like to avoid in future.. 



## Bugs

It’s hard to check, but I *think* that my bomb calculations are off by some amount. Most times they are correct, but occasionally there will be a square that overcounts by 1 or so. I thought that this was due to “overlapping”, and that fixing the randomiser would fix this, but it doesn’t seem to have done so. Obviously, something has gone wrong in the “checkRats” function, but I would rather not touch that again.

And I believe the final bug is that corners aren’t checked correctly. That is, when a “flood” occurs, any numbers on an inside corner aren’t revealed (which they should be in normal play). I believe the way to fix this would have been to check diagonal tiles for every empty cell, and to “display” it if it contains a number (and not a rat).


## Future Improvements

I think that a “render” function could be used here. I did originally have one, but I ended up rendering cells within functions themselves. I’m not sure how I would go about it, but I think it would be a lot easier to manipulate the screen if I instead sent information to a separate render function. For now, it still works fine, but bits of code that manipulate the DOM are spread out pretty far and repeated often, and if, for example, someone else were to work on this, it could end up being a bit messy. 

In future, I would probably have separate functions for each particular DOM element (i.e each individual cell, and maybe even separate functions for showing an empty cell, a score or a rat), and use those functions instead of copy-pasting the same code in so many places. On top of that, I’d probably be less afraid of making my code more verbose, so that I could use more variables to explain my code without having to use comments. In general, making my code easier to parse would be good, even if it were just for my own sake.



