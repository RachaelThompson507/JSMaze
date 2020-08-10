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

//Grid for maze (generator)ß
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

console.log(grid);

//Vertical and Horizontal
const verticals = Array(cells-1)
  .fill(null)
  .map(() => Array(cells).fill(false));
const horizontals = Array(cells)
  .fill(null)
  .map(() => Array(cells-1).fill(false));

console.log(horizontals, verticals);
