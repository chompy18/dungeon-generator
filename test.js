const Dungeon = require('./lib/dungeon-generator').Dungeon;

let dungeon = new Dungeon();

dungeon.generate();

const dng = dungeon.persist();
console.log(JSON.stringify(dng));