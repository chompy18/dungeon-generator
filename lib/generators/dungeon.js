'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generator = require('./generator');

var _generator2 = _interopRequireDefault(_generator);

var _corridor = require('../pieces/corridor');

var _corridor2 = _interopRequireDefault(_corridor);

var _room = require('../pieces/room');

var _room2 = _interopRequireDefault(_room);

var _const = require('../const');

var _utils = require('../utils');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dungeon = function (_Generator) {
    _inherits(Dungeon, _Generator);

    function Dungeon(options) {
        _classCallCheck(this, Dungeon);

        options = Object.assign({}, {
            "size": [150, 150],
            "rooms": {
                "initial": {
                    "min_size": [3, 3],
                    "max_size": [3, 3],
                    "max_exits": 3
                },
                "any": {
                    "min_size": [3, 3],
                    "max_size": [3, 3],
                    "max_exits": 3
                }
            },
            "max_corridor_length": 2,
            "min_corridor_length": 2,
            "corridor_density": 0.25,
            "symmetric_rooms": true,
            "interconnects": 1,
            "max_interconnect_length": 10,
            "room_count": 50
        }, options);

        var _this = _possibleConstructorReturn(this, (Dungeon.__proto__ || Object.getPrototypeOf(Dungeon)).call(this, options));

        var sample = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        _this.hash = (0, _lodash.sampleSize)(sample, _this.options.room_count);

        _this.room_tags = Object.keys(_this.rooms).filter(function (tag) {
            return tag !== 'any' && tag !== 'initial';
        });

        for (var i = _this.room_tags.length; i < _this.room_count; i++) {
            _this.room_tags.push('any');
        }

        _this.rooms = [];
        _this.corridors = [];
        return _this;
    }

    _createClass(Dungeon, [{
        key: 'add_room',
        value: function add_room(room, exit) {
            var add_to_room = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var g_add_to_room = add_to_room;
            //add a new piece, exit is local perimeter pos for that exit;
            var choices = void 0,
                old_room = void 0,
                i = 0;
            while (true) {
                //pick a placed room to connect this piece to
                if (add_to_room) {
                    old_room = add_to_room;
                    add_to_room = null;
                } else {
                    choices = this.get_open_pieces(this.children);
                    if (choices && choices.length) {
                        old_room = this.random.choose(choices);
                    } else {
                        console.log('ran out of choices connecting');
                        break;
                    }
                }

                //if exit is specified, try joining  to this specific exit
                if (exit) {
                    //try joining the rooms
                    if (this.join(old_room, exit, room)) {
                        return true;
                    }
                    //else try all perims to see
                } else {
                    var perim = room.perimeter.slice();
                    while (perim.length) {
                        if (this.join(old_room, this.random.choose(perim, true), room)) {
                            return true;
                        }
                    }
                }

                if (i++ === 100) {
                    console.log('failed to connect 100 times :(', room, exit, g_add_to_room);
                    return false;
                }
            }
        }
    }, {
        key: 'new_corridor',
        value: function new_corridor() {
            return new _corridor2.default({
                length: this.random.int(this.min_corridor_length, this.max_corridor_length),
                facing: this.random.choose(_const.FACING)
            });
        }
    }, {
        key: 'add_interconnect',
        value: function add_interconnect() {
            var perims = {},
                hash = void 0,
                exit = void 0,
                p = void 0;

            //hash all possible exits
            this.children.forEach(function (child) {
                if (child.exits.length < child.max_exits) {
                    child.perimeter.forEach(function (exit) {
                        p = child.parent_pos(exit[0]);
                        hash = p[0] + '_' + p[1];
                        perims[hash] = [exit, child];
                    });
                }
            });

            //search each room for a possible interconnect, backwards
            var room = void 0,
                mod = void 0,
                length = void 0,
                corridor = void 0,
                room2 = void 0;
            for (var i = this.children.length - 1; i--; i >= 0) {
                room = this.children[i];

                //if room has exits available
                if (room.exits.length < room.max_exits) {

                    //iterate exits
                    for (var k = 0; k < room.perimeter.length; k++) {
                        exit = room.perimeter[k];
                        p = room.parent_pos(exit[0]);
                        length = -1;

                        //try to dig a tunnel from this exit and see if it hits anything
                        while (length <= this.max_interconnect_length) {
                            //check if space is not occupied
                            if (!this.walls.get(p) || !this.walls.get((0, _utils.shift_left)(p, exit[1])) || !this.walls.get((0, _utils.shift_right)(p, exit[1]))) {
                                break;
                            }
                            hash = p[0] + '_' + p[1];

                            //is there a potential exit at these coordiantes (not of the same room)
                            if (perims[hash] && perims[hash][1].id !== room.id) {
                                room2 = perims[hash][1];

                                //rooms cant be joined directly, add a corridor
                                if (length > -1) {
                                    corridor = new _corridor2.default({
                                        length: length,
                                        facing: exit[1]
                                    });

                                    if (this.join(room, corridor.perimeter[0], corridor, exit)) {
                                        this.join_exits(room2, perims[hash][0], corridor, corridor.perimeter[corridor.perimeter.length - 1]);
                                        return true;
                                    } else {
                                        return false;
                                    }
                                    //rooms can be joined directly
                                } else {
                                    this.join_exits(room2, perims[hash][0], room, exit);
                                    return true;
                                }
                            }

                            //exit not found, try to make the interconnect longer
                            p = (0, _utils.shift)(p, exit[1]);
                            length++;
                        }
                    }
                }
            }
        }
    }, {
        key: 'new_room',
        value: function new_room(key) {
            //spawn next room
            key = key || this.random.choose(this.room_tags, false);

            var opts = this.options.rooms[key];

            var room = new _room2.default({
                size: this.random.vec(opts.min_size, opts.max_size),
                max_exits: opts.max_exits,
                symmetric: this.symmetric_rooms,
                tag: key,
                tikalTag: this.hash.pop()
            });

            this.room_tags.splice(this.room_tags.indexOf(key), 1);

            if (key === 'initial') {
                this.initial_room = room;
            }
            return room;
        }
    }, {
        key: 'persistRoom',
        value: function persistRoom(room) {
            var proom = {
                id: room.id,
                size: room.size,
                position: room.position,
                tikalTag: room.options.tikalTag,
                exits: []

            };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = room.exits[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var exit = _step.value;

                    proom.exits.push({
                        direction: exit[1],
                        targetRoomId: exit[2].id
                    });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return proom;
        }
    }, {
        key: 'persist',
        value: function persist() {
            var _this2 = this;

            var pDungeon = {};

            this.rooms.map(function (room) {
                pDungeon[room.id] = _this2.persistRoom(room);
            });

            return pDungeon;
        }
    }, {
        key: 'generate',
        value: function generate() {
            var no_rooms = this.options.room_count - 1,
                room = this.new_room(this.options.rooms.initial ? 'initial' : undefined),
                no_corridors = Math.round(this.corridor_density * no_rooms);

            this.add_piece(room, this.options.rooms.initial && this.options.rooms.initial.position ? this.options.rooms.initial.position : this.get_center_pos());
            this.rooms.push(room);
            var k = void 0;
            console.log(no_corridors);
            while (no_corridors || no_rooms) {
                k = this.random.int(1, no_rooms + no_corridors);
                if (k <= no_corridors) {
                    var corridor = this.new_corridor();
                    var added = this.add_room(corridor, corridor.perimeter[0]);
                    no_corridors--;

                    //try to connect to this corridor next
                    if (no_rooms > 0 && added) {
                        var r = this.new_room();
                        this.add_room(r, null, corridor);
                        this.rooms.push(r);
                        no_rooms--;
                    }
                } else {
                    var _r = this.new_room();
                    this.add_room(_r);
                    this.rooms.push(_r);
                    no_rooms--;
                }
            }

            for (k = 0; k < this.interconnects; k++) {
                this.add_interconnect();
            }

            this.trim();

            if (this.initial_room) {
                this.start_pos = this.initial_room.global_pos(this.initial_room.get_center_pos());
            }
        }
    }]);

    return Dungeon;
}(_generator2.default);

exports.default = Dungeon;