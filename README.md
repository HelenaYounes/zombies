# Zombie Apocalypse Game from CodinGame : https://www.codingame.com/ide/puzzle/code-vs-zombies

## The Goal

Destroy zombies quickly to earn points and ensure the survival of humans to achieve the highest score possible.

## Rules

The game is played in a zone 16000 units wide by 9000 units high. You control a man named Ash, equipped with a gun that can eliminate any zombie within a certain range around him.

### Ash's Movements:

- Ash can be directed to move to any point within the game zone by outputting coordinates (X, Y). The top-left point is 0,0.
- Each turn, Ash will move exactly 1000 units towards the target coordinate or onto the target coordinates if he is less than 1000 units away.
- If a zombie is within 2000 units of Ash at the end of a turn, Ash will shoot and destroy the zombie.

### Other Humans:

- Other humans are present in the game zone but do not move.
- If zombies kill all other humans, you lose the game and score 0 points for the current test case.

### Zombies' Movements:

- Each turn, every zombie will target the closest human, including Ash, and move 400 units towards them.
- If a zombie is less than 400 units away from a human, the human is killed, and the zombie moves onto their coordinate.
- Two zombies may occupy the same coordinate.

### Order of Actions:

1. Zombies move towards their targets.
2. Ash moves towards his target.
3. Zombies within a 2000 unit range around Ash are destroyed.
4. Zombies eat any human they share coordinates with.

## Scoring

- A zombie's worth is calculated as the number of humans still alive squared, multiplied by 10, excluding Ash.
- If multiple zombies are destroyed during the same round, the nth zombie's worth is multiplied by the (n+2)th number of the Fibonacci sequence (1, 2, 3, 5, 8, and so on).

**Tip:** Maximize the number of zombies killed during a single turn to optimize your score.

## Expert Rules

- The coordinate system of the game uses whole numbers only. If Ash or a zombie should land in a non whole coordinate, that coordinate is rounded down.

For example, if a zombie were to move from X=0, Y=0 towards X=500, Y=500, since it may only travel 400 units in one turn it should land on X=282.843, Y=282.843 but will in fact land on X=282, Y=282.

To help, each zombie's future coordinates will be sent along side the current coordinates.
Have fun playing and surviving the Zombie Apocalypse!

## Game Input

- The program must, within an infinite loop, read the contextual data from the standard input (human and zombie positions) and provide to the standard output the desired instruction.
  Input for one game turn

- Line 1: two space-separated integers x and y, the coordinate of your character.

- Line 2: one integer humanCount, the amount of other humans still alive.

- Next humanCount lines : three space-separated integers humanId, humanX & humanY, the unique id and coordinates of a human.

- Next line: one integer zombieCount, the amount of zombies left to destroy.

- Next zombieCount lines: five space-separated integers zombieId, zombieX, zombieY, zombieXNext & zombieYNext, the unique id, current coordinates and future coordinates of a zombie.

## Output for one game turn

- A single line: two integers targetX and targetY, the coordinate you want your character to move towards. You may also some text message which will be displayed on screen.

## Constraints

- 0 ≤ x < 16000

- 0 ≤ y < 9000

- 1 ≤ humanCount < 100

- 1 ≤ zombieCount < 100

- Response time per game turn ≤ 100ms
