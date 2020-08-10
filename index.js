const { Engine, Render, Runner, World, Bodies } = Matter;

//grid variables
const cells = 3;
//canvass dimensions
const width = 600;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);

//Walls for canvass
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }),
];
World.add(world, walls);

//Grid for maze (generator)
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

//Vertical and Horizontal
const verticals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));
const horizontals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

//maze generator
const shuffle = (arr) => {
  //get arr length
  let counter = arr.length;
  //iterate arr
  while (counter > 0) {
    //get rand index
    const index = Math.floor(Math.random() * counter);
    // decrement counter
    counter--;
    //shuffle arr elements at least one time
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const mazeCellGen = (row, column) => {
  // If I have been in cell [row, column] return
  if (grid[row][column]) {
    return;
  }
  // Mark cell visited
  grid[row][column] = true;
  // Assemble random-order list of neighbors
  //call fx to shuffle neighbor array
  const neighbors = shuffle([
    [row - 1, column, "up"],
    [row, column + 1, "rt"],
    [row + 1, column, "down"],
    [row, column - 1, "lt"],
  ]);
  //For each neighbor
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;
    //Check is neighbor is out of bounds
    if (nextRow < 0 || nextRow >= 3 || nextColumn < 0 || nextColumn >= 3) {
      continue;
    }
    //If we have visited neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    //Remove wall either horizontal or vertical
    if (direction === "lt") {
      verticals[row][column - 1] = true;
    } else if (direction === "rt") {
      verticals[row][column] = true;
    } else if (direction === "up") {
      horizontals[row - 1][column] = true;
    } else if (direction === "down") {
      horizontals[row][column] = true;
    }
     //Visit next neighbor
    mazeCellGen(nextRow, nextColumn);
  }
};
mazeCellGen(startRow, startColumn);

