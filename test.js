const Dungeon  = require('./lib/generators/dungeon').default;

let dungeon = new Dungeon();

dungeon.generate();

const dng = dungeon.persist();
console.log(JSON.stringify(dng));