# Melory Docs

## func: generateArray(array)

### takes: array of string (unique IDs)
  Then doubles all strings and returns the new array
### goal
  All strings need a copy to match in the game.

## func: shuffle(array)
### takes: array of strings
 Takes the array with doubled strings and shuffles them to randomise their positions in the array.

## func: showContent(array)
### takes: array of strings
 ```
 board.classList.add("visible"); // shows the board
 gameGrid.classList.add("visible"); // shows the game button grid
 ```
Takes array and calls the `generateArray()` to create the necessary then `shuffle()` the array to randomise the buttons for the game.

`totalSeconds = 0; // reset game timer`





