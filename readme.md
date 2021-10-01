- Please provide a link to a public Git repo containing your solution
- Commit to the same repo at least at the completion of each part.
- Feel free to document any assumptions you’ve made if the requirements are not clear (intentionally or otherwise – we’re not expecting questions during the test, so do your best and make assumptions as necessary).
- We’d like to see solution in either JavaScript or preferably TypeScript
- We’d like to see unit tests demonstrating correctness of your solution
- Please email to advise when the last commit per part is done, and we’ll email you the next part.
- There are 3 parts in total – we’d expect most candidates to complete parts 1 and 2, and part 3 as a stretch goal.
- We’d advise spending no more than 2 hours total – hopefully it’s a fun puzzle to demonstrate how you tend to approach problems.

********************

## Welcome to Arachnid Robotics, delivering you Robot Spiders(TM) for all your robotic spider needs

I know you've only just landed here, but here's the Mk1 Prototype. Management are really excited about this one, and they've got lots of tricks up their sleeves for the Mk2 and the Mk3 which the guys in the big white coats in the science labs are busy working on as we speak. 

So, I understand you're the new software guy? Perfect. We need a first version of the navigation and locomotion code written. 

To start off with, we want to be able to remotely control the spiders movements with some simple text commands. It won't be interactive, we're only able to send a single message to tell the robot spider where to go at the minute.


## interucations 
The mk1 robot can move forwards, backwards and side to side. The control system will send the instructions in a single string, for example:

 
F = FORWARDS

B = BACKWARDS

L = LEFT

R = RIGHT

 

FRRRFFFFRFRFFFRFFLRLFFFFLRFF

 

This unit doesn't have any sensor tech yet (sigh. they're really cheaping out with this Mk1 ...), so at the moment the robot will just go where you tell it. 

 

The test chamber is set up with a flat surface and you need to tell the Robot where it is to begin with - (0,0) is at the bottom left of the grid (x,y) co-ordinates

 

I need the Robot Control Interface to accept two parameters - where it is (x,y) and the command sequence (FFFFFLLLLRRRFFFFBRRRBLLL). 

 

Given these two the robot should be able to report where it is at the end.

 

Get that done, and then maybe the mk2 will be ready!

 

Commit your code to a git repo and then we'll get it loaded up into the Mk1 Prototype in the test chamber and tell it where to go!

 

Here's some test data: 

 

0,0,FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF = ?

3,6,FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF = ?

0,7,RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR =?



### requirements:
- we want to be able to remotely control the spiders movements with some simple text commands. It won't be interactive, we're only able to send a single message to tell the robot spider where to go at the minute.
-  The test chamber is set up with a flat surface and you need to tell the Robot where it is to begin with - (0,0) is at the bottom left of the grid (x,y) co-ordinates
- Given these two the robot should be able to report where it is at the end.
0,0,FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF = ?

3,6,FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF = ?

0,7,RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR =?
## commands:
F = FORWARDS
B = BACKWARDS
L = LEFT
R = RIGHT

## Exmaples
```JSON
{
    "startingCoordinates": [
        10,
        50
    ],
    "movementCommands": "FRRRFFFFRFRFFFRFFLRLFFFFLRFF"
}
```