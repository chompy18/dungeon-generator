const Dungeon  = require('./lib/generators/dungeon').default;

let dungeon = new Dungeon();

dungeon.generate();
console.log(Object.keys(dungeon.rooms).length);
for (let id in Object.keys(dungeon.rooms)) {
    console.log(dungeon.rooms[id].options.tikalTag);
}