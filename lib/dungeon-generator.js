(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("random-seed"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define("dungeon-generator", ["random-seed", "_"], factory);
	else if(typeof exports === 'object')
		exports["dungeon-generator"] = factory(require("random-seed"), require("lodash"));
	else
		root["dungeon-generator"] = factory(root["random-seed"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const TOP = 0;
/* unused harmony export TOP */

const RIGHT = 90;
/* unused harmony export RIGHT */

const BOTTOM = 180;
/* unused harmony export BOTTOM */

const LEFT = 270;
/* unused harmony export LEFT */


const FACING = [TOP, RIGHT, BOTTOM, LEFT];
/* harmony export (immutable) */ __webpack_exports__["a"] = FACING;


const FACING_TO_STRING = {
    [TOP]: 'top',
    [RIGHT]: 'right',
    [BOTTOM]: 'bottom',
    [LEFT]: 'left'
};
/* unused harmony export FACING_TO_STRING */


const FACING_TO_MOD = {
    [TOP]: [0, -1],
    [RIGHT]: [1, 0],
    [BOTTOM]: [0, 1],
    [LEFT]: [-1, 0]
};
/* harmony export (immutable) */ __webpack_exports__["b"] = FACING_TO_MOD;


const FACING_INVERSE = {
    [TOP]: BOTTOM,
    [RIGHT]: LEFT,
    [BOTTOM]: TOP,
    [LEFT]: RIGHT
};
/* harmony export (immutable) */ __webpack_exports__["c"] = FACING_INVERSE;


const FACING_MOD_RIGHT = {
    [TOP]: RIGHT,
    [RIGHT]: BOTTOM,
    [BOTTOM]: LEFT,
    [LEFT]: TOP
};
/* unused harmony export FACING_MOD_RIGHT */


const FACING_MOD_LEFT = {
    [TOP]: LEFT,
    [RIGHT]: TOP,
    [BOTTOM]: RIGHT,
    [LEFT]: BOTTOM
};
/* unused harmony export FACING_MOD_LEFT */


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__const__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["d"] = iter_adjacent;
/* harmony export (immutable) */ __webpack_exports__["h"] = iter_2d;
/* harmony export (immutable) */ __webpack_exports__["e"] = iter_range;
/* harmony export (immutable) */ __webpack_exports__["f"] = intersects;
/* harmony export (immutable) */ __webpack_exports__["g"] = array_test;
/* unused harmony export add */
/* harmony export (immutable) */ __webpack_exports__["c"] = shift;
/* harmony export (immutable) */ __webpack_exports__["a"] = shift_left;
/* harmony export (immutable) */ __webpack_exports__["b"] = shift_right;


function iter_adjacent([x, y], cb) {
    cb([x - 1, y]);
    cb([x, y - 1]);
    cb([x + 1, y]);
    cb([x, y + 1]);
}

function iter_2d(size, callback) {
    for (let y = 0; y < size[1]; y++) {
        for (let x = 0; x < size[0]; x++) {
            callback([x, y]);
        }
    }
}

function iter_range(from, to, callback) {
    let fx, fy, tx, ty;
    if (from[0] < to[0]) {
        fx = from[0];
        tx = to[0];
    } else {
        fx = to[0];
        tx = from[0];
    };
    if (from[1] < to[1]) {
        fy = from[1];
        ty = to[1];
    } else {
        fy = to[1];
        ty = from[1];
    };
    for (var x = fx; x <= tx; x++) {
        for (var y = fy; y <= ty; y++) {
            callback([x, y]);
        }
    }
}

function intersects(pos_1, size_1, pos_2, size_2) {
    return !pos_2[0] > pos_1[0] + size_1[0] || pos_2[0] + size_2[0] < pos_1[0] || pos_2[1] > pos_1[1] + size_1[1] || pos_2[1] + size_2[1] < size_1[1];
}

function array_test(array, test) {
    for (let i = 0; i < array.length; i++) {
        if (test(array[i])) {
            return true;
        }
    }
    return false;
}

function add(p1, p2) {
    return [p1[0] + p2[0], p1[1] + p2[1]];
}

function shift(pos, facing) {
    return add(pos, __WEBPACK_IMPORTED_MODULE_0__const__["b" /* FACING_TO_MOD */][facing]);
}

function shift_left(pos, facing) {
    return shift(pos, (facing - 90 + 360) % 360);
}

function shift_right(pos, facing) {
    return shift(pos, (facing + 90 + 360) % 360);
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_array2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_rectangle__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);




let next_piece_id = 0;

//base dungeon piece class, to be extended
class Piece {

    constructor(options) {

        options = Object.assign({
            size: [1, 1],
            position: [0, 0],
            parent: null,
            max_exits: 10,
            tag: ''
        }, options);

        Object.assign(this, options);

        this.options = options;

        this.id = next_piece_id++;
        this.walls = new __WEBPACK_IMPORTED_MODULE_0__utils_array2d__["a" /* default */](this.size, true);
        this.perimeter = [];
        this.exits = [];
        this.children = [];
    }

    get rect() {
        return new __WEBPACK_IMPORTED_MODULE_1__utils_rectangle__["a" /* default */](this.position[0], this.position[1], this.size[0], this.size[1]);
    }

    is_exit([x, y]) {
        return this.exits.filter(([exit_x, exit_y, ...rest]) => {
            return exit_x === x && exit_y === y;
        }).length !== 0;
    }

    get_non_wall_tiles() {
        let retv = [];
        this.walls.iter((pos, is_wall) => {
            if (!is_wall) {
                retv.push(pos);
            }
        });
        return retv;
    }

    get_perimeter_by_facing(facing) {
        return this.perimeter.filter(([[x, y], f]) => {
            return facing === f;
        });
    }

    get_inner_perimeter() {
        //returns array of tiles in the piece that are adjacent to a wall,
        // but not an exit;

        let retv = [],
            haswall,
            exit_adjacent;

        this.walls.iter((pos, is_wall) => {
            if (!is_wall && !this.is_exit(pos)) {
                haswall = false;
                exit_adjacent = false;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* iter_adjacent */])(pos, p => {
                    haswall = haswall || this.walls.get(p);
                    exit_adjacent = exit_adjacent || this.is_exit(p);
                });
                if (haswall && !exit_adjacent) {
                    retv.push(pos);
                }
            }
        });

        return retv;
    }

    //local position to parent position
    parent_pos([x, y]) {
        return [this.position[0] + x, this.position[1] + y];
    }

    //local position to global position
    global_pos(pos) {
        pos = this.parent_pos(pos);
        if (this.parent) {
            pos = this.parent.global_pos(pos);
        }
        return pos;
    }

    //parent position to local position
    local_pos(pos) {
        return [pos[0] - this.position[0], pos[1] - this.position[1]];
    }

    //get (roughly) center tile position for the piece
    // @TODO consider if should use Math.floor instead of Math.round
    get_center_pos() {
        return [Math.floor(this.size[0] / 2), Math.floor(this.size[1] / 2)];
    }

    add_perimeter(p_from, p_to, facing) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["e" /* iter_range */])(p_from, p_to, pos => {
            this.perimeter.push([pos, facing]);
        });
    }

    remove_perimeter(rect) {
        this.perimeter = this.perimeter.filter(([x, y, facing]) => {
            return !rect.contains(x, y, 1, 1);
        });
    }

    intersects(piece) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["f" /* intersects */])(this.position, this.size, piece.position, piece.size);
    }

    add_piece(piece, position = null) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["g" /* array_test */])(this.children, c => c.id === piece.id)) {
            return;
        }
        piece.parent = this;
        if (position) {
            piece.position = position;
        }
        this.children.push(piece);
        this.paste_in(piece);
    }

    paste_in(piece) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["h" /* iter_2d */])(piece.size, pos => {
            let is_wall = piece.walls.get(pos);
            if (!is_wall) {
                this.walls.set(piece.parent_pos(pos), false);
            }
        });
    }

    add_exit(exit, room) {
        this.walls.set(exit[0], false);
        if (this.parent) {
            this.parent.paste_in(this);
        }
        this.exits.push([exit[0], exit[1], room]);
    }

    print() {
        for (let y = 0; y < this.size[1]; y++) {
            let row = '';
            for (let x = 0; x < this.size[0]; x++) {
                if (this.start_pos && this.start_pos[0] === x && this.start_pos[1] === y) {
                    row += 's';
                } else {
                    row += this.walls.get([x, y]) ? 'x' : ' ';
                }
            }
            console.log(row);
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Piece;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);



class Room extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {

    constructor(options) {
        /*
        note, size to be provided is size without walls.
        */
        options.room_size = options.size;
        options.size = [options.size[0] + 2, options.size[1] + 2];

        options = Object.assign({}, {
            symmetric: false //if true, 
        }, options);

        super(options);

        this.walls.set_square([1, 1], this.room_size, false, true);

        if (!this.symmetric) {
            //any point at any wall can be exit
            this.add_perimeter([1, 0], [this.size[0] - 2, 0], 180);
            this.add_perimeter([0, 1], [0, this.size[1] - 2], 90);
            this.add_perimeter([1, this.size[1] - 1], [this.size[0] - 2, this.size[1] - 1], 0);
            this.add_perimeter([this.size[0] - 1, 1], [this.size[0] - 1, this.size[1] - 2], 270);
        } else {
            //only middle of each wall can be exit
            let [w, h] = this.get_center_pos();

            this.perimeter = [[[w, 0], 180], [[this.size[0] - 1, h], 270], [[w, this.size[1] - 1], 0], [[0, h], 90]];
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Room;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
* Rectangle
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module EaselJS
 */

// constructor:
/**
 * Represents a rectangle as defined by the points (x, y) and (x+width, y+height).
 *
 * <h4>Example</h4>
 *
 *      var rect = new createjs.Rectangle(0, 0, 100, 100);
 *
 * @class Rectangle
 * @param {Number} [x=0] X position.
 * @param {Number} [y=0] Y position.
 * @param {Number} [width=0] The width of the Rectangle.
 * @param {Number} [height=0] The height of the Rectangle.
 * @constructor
 **/
function Rectangle(x, y, width, height) {
  if (Array.isArray(x) && Array.isArray(y)) {
    [width, height] = y;
    [x, y] = x;
  }
  this.setValues(x, y, width, height);

  // public properties:
  // assigned in the setValues method.
  /**
   * X position.
   * @property x
   * @type Number
   **/

  /**
   * Y position.
   * @property y
   * @type Number
   **/

  /**
   * Width.
   * @property width
   * @type Number
   **/

  /**
   * Height.
   * @property height
   * @type Number
   **/
}
var p = Rectangle.prototype;

/**
 * <strong>REMOVED</strong>. Removed in favor of using `MySuperClass_constructor`.
 * See {{#crossLink "Utility Methods/extend"}}{{/crossLink}} and {{#crossLink "Utility Methods/promote"}}{{/crossLink}}
 * for details.
 *
 * There is an inheritance tutorial distributed with EaselJS in /tutorials/Inheritance.
 *
 * @method initialize
 * @protected
 * @deprecated
 */
// p.initialize = function() {}; // searchable for devs wondering where it is.


// public methods:
/** 
 * Sets the specified values on this instance.
 * @method setValues
 * @param {Number} [x=0] X position.
 * @param {Number} [y=0] Y position.
 * @param {Number} [width=0] The width of the Rectangle.
 * @param {Number} [height=0] The height of the Rectangle.
 * @return {Rectangle} This instance. Useful for chaining method calls.
 * @chainable
*/
p.setValues = function (x, y, width, height) {
  // don't forget to update docs in the constructor if these change:
  this.x = x || 0;
  this.y = y || 0;
  this.width = width || 0;
  this.height = height || 0;
  return this;
};

/** 
 * Extends the rectangle's bounds to include the described point or rectangle.
 * @method extend
 * @param {Number} x X position of the point or rectangle.
 * @param {Number} y Y position of the point or rectangle.
 * @param {Number} [width=0] The width of the rectangle.
 * @param {Number} [height=0] The height of the rectangle.
 * @return {Rectangle} This instance. Useful for chaining method calls.
 * @chainable
*/
p.extend = function (x, y, width, height) {
  width = width || 0;
  height = height || 0;
  if (x + width > this.x + this.width) {
    this.width = x + width - this.x;
  }
  if (y + height > this.y + this.height) {
    this.height = y + height - this.y;
  }
  if (x < this.x) {
    this.width += this.x - x;this.x = x;
  }
  if (y < this.y) {
    this.height += this.y - y;this.y = y;
  }
  return this;
};

/** 
 * Adds the specified padding to the rectangle's bounds.
 * @method pad
 * @param {Number} top
 * @param {Number} left
 * @param {Number} right
 * @param {Number} bottom
 * @return {Rectangle} This instance. Useful for chaining method calls.
 * @chainable
*/
p.pad = function (top, left, bottom, right) {
  this.x -= left;
  this.y -= top;
  this.width += left + right;
  this.height += top + bottom;
  return this;
};

/**
 * Copies all properties from the specified rectangle to this rectangle.
 * @method copy
 * @param {Rectangle} rectangle The rectangle to copy properties from.
 * @return {Rectangle} This rectangle. Useful for chaining method calls.
 * @chainable
*/
p.copy = function (rectangle) {
  return this.setValues(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
};

/** 
 * Returns true if this rectangle fully encloses the described point or rectangle.
 * @method contains
 * @param {Number} x X position of the point or rectangle.
 * @param {Number} y Y position of the point or rectangle.
 * @param {Number} [width=0] The width of the rectangle.
 * @param {Number} [height=0] The height of the rectangle.
 * @return {Boolean} True if the described point or rectangle is contained within this rectangle.
*/
p.contains = function (x, y, width, height) {
  width = width || 0;
  height = height || 0;
  return x >= this.x && x + width <= this.x + this.width && y >= this.y && y + height <= this.y + this.height;
};

/** 
 * Returns a new rectangle which contains this rectangle and the specified rectangle.
 * @method union
 * @param {Rectangle} rect The rectangle to calculate a union with.
 * @return {Rectangle} A new rectangle describing the union.
*/
p.union = function (rect) {
  return this.clone().extend(rect.x, rect.y, rect.width, rect.height);
};

/** 
 * Returns a new rectangle which describes the intersection (overlap) of this rectangle and the specified rectangle,
 * or null if they do not intersect.
 * @method intersection
 * @param {Rectangle} rect The rectangle to calculate an intersection with.
 * @return {Rectangle} A new rectangle describing the intersection or null.
*/
p.intersection = function (rect) {
  var x1 = rect.x,
      y1 = rect.y,
      x2 = x1 + rect.width,
      y2 = y1 + rect.height;
  if (this.x > x1) {
    x1 = this.x;
  }
  if (this.y > y1) {
    y1 = this.y;
  }
  if (this.x + this.width < x2) {
    x2 = this.x + this.width;
  }
  if (this.y + this.height < y2) {
    y2 = this.y + this.height;
  }
  return x2 <= x1 || y2 <= y1 ? null : new Rectangle(x1, y1, x2 - x1, y2 - y1);
};

/** 
 * Returns true if the specified rectangle intersects (has any overlap) with this rectangle.
 * @method intersects
 * @param {Rectangle} rect The rectangle to compare.
 * @return {Boolean} True if the rectangles intersect.
*/
p.intersects = function (rect) {
  return rect.x <= this.x + this.width && this.x <= rect.x + rect.width && rect.y <= this.y + this.height && this.y <= rect.y + rect.height;
};

/** 
 * Returns true if the width or height are equal or less than 0.
 * @method isEmpty
 * @return {Boolean} True if the rectangle is empty.
*/
p.isEmpty = function () {
  return this.width <= 0 || this.height <= 0;
};

/**
 * Returns a clone of the Rectangle instance.
 * @method clone
 * @return {Rectangle} a clone of the Rectangle instance.
 **/
p.clone = function () {
  return new Rectangle(this.x, this.y, this.width, this.height);
};

/**
 * Returns a string representation of this object.
 * @method toString
 * @return {String} a string representation of the instance.
 **/
p.toString = function () {
  return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]";
};

/* harmony default export */ __webpack_exports__["a"] = Rectangle;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__generator__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pieces_corridor__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pieces_room__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__const__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);







class Dungeon extends __WEBPACK_IMPORTED_MODULE_0__generator__["a" /* default */] {

    constructor(options) {
        options = Object.assign({}, {
            "size": [100, 100],
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
            "corridor_density": 0,
            "symmetric_rooms": true,
            "interconnects": 1,
            "max_interconnect_length": 10,
            "room_count": 50
        }, options);

        super(options);

        const sample = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        this.hash = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_lodash__["sampleSize"])(sample, this.options.room_count);

        this.room_tags = Object.keys(this.rooms).filter(tag => tag !== 'any' && tag !== 'initial');

        for (let i = this.room_tags.length; i < this.room_count; i++) {
            this.room_tags.push('any');
        }

        this.rooms = [];
        this.corridors = [];
    }

    add_room(room, exit, add_to_room = null) {
        let g_add_to_room = add_to_room;
        //add a new piece, exit is local perimeter pos for that exit;
        let choices,
            old_room,
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
                let perim = room.perimeter.slice();
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

    new_corridor() {
        return new __WEBPACK_IMPORTED_MODULE_1__pieces_corridor__["a" /* default */]({
            length: this.random.int(this.min_corridor_length, this.max_corridor_length),
            facing: this.random.choose(__WEBPACK_IMPORTED_MODULE_3__const__["a" /* FACING */])
        });
    }

    add_interconnect() {
        let perims = {},
            hash,
            exit,
            p;

        //hash all possible exits
        this.children.forEach(child => {
            if (child.exits.length < child.max_exits) {
                child.perimeter.forEach(exit => {
                    p = child.parent_pos(exit[0]);
                    hash = `${p[0]}_${p[1]}`;
                    perims[hash] = [exit, child];
                });
            }
        });

        //search each room for a possible interconnect, backwards
        let room, mod, length, corridor, room2;
        for (let i = this.children.length - 1; i--; i >= 0) {
            room = this.children[i];

            //if room has exits available
            if (room.exits.length < room.max_exits) {

                //iterate exits
                for (let k = 0; k < room.perimeter.length; k++) {
                    exit = room.perimeter[k];
                    p = room.parent_pos(exit[0]);
                    length = -1;

                    //try to dig a tunnel from this exit and see if it hits anything
                    while (length <= this.max_interconnect_length) {
                        //check if space is not occupied
                        if (!this.walls.get(p) || !this.walls.get(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* shift_left */])(p, exit[1])) || !this.walls.get(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* shift_right */])(p, exit[1]))) {
                            break;
                        }
                        hash = `${p[0]}_${p[1]}`;

                        //is there a potential exit at these coordiantes (not of the same room)
                        if (perims[hash] && perims[hash][1].id !== room.id) {
                            room2 = perims[hash][1];

                            //rooms cant be joined directly, add a corridor
                            if (length > -1) {
                                corridor = new __WEBPACK_IMPORTED_MODULE_1__pieces_corridor__["a" /* default */]({
                                    length,
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
                        p = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["c" /* shift */])(p, exit[1]);
                        length++;
                    }
                }
            }
        }
    }

    new_room(key) {
        //spawn next room
        key = key || this.random.choose(this.room_tags, false);

        let opts = this.options.rooms[key];

        let room = new __WEBPACK_IMPORTED_MODULE_2__pieces_room__["a" /* default */]({
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

    persistRoom(room) {
        let proom = {
            id: room.id,
            size: room.size,
            position: room.position,
            tikalTag: room.options.tikalTag,
            exits: []

        };

        for (let exit of room.exits) {
            proom.exits.push({
                direction: exit[1],
                targetRoomId: exit[2].id
            });
        }

        return proom;
    }

    persist() {
        let pDungeon = {};

        this.children.map(room => {
            pDungeon[room.id] = this.persistRoom(room);
        });

        return pDungeon;
    }

    generate() {
        let no_rooms = this.options.room_count - 1,
            room = this.new_room(this.options.rooms.initial ? 'initial' : undefined),
            no_corridors = Math.round(this.corridor_density * no_rooms);

        this.add_piece(room, this.options.rooms.initial && this.options.rooms.initial.position ? this.options.rooms.initial.position : this.get_center_pos());
        this.rooms.push(room);
        let k;

        while (no_corridors || no_rooms) {
            k = this.random.int(1, no_rooms + no_corridors);
            if (k <= no_corridors) {
                let corridor = this.new_corridor();
                let added = this.add_room(corridor, corridor.perimeter[0]);
                no_corridors--;

                //try to connect to this corridor next
                if (no_rooms > 0 && added) {
                    this.add_room(this.new_room(), null, corridor);
                    no_rooms--;
                }
            } else {
                this.add_room(this.new_room());
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
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Dungeon;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_random__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pieces_piece__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_rectangle__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__const__ = __webpack_require__(0);





class Generator extends __WEBPACK_IMPORTED_MODULE_1__pieces_piece__["a" /* default */] {

    constructor(options) {
        super(options);

        this.random = new __WEBPACK_IMPORTED_MODULE_0__utils_random__["a" /* default */](this.seed);

        this.start_pos = [0, 0];
        this.minx = this.size[0];
        this.maxx = 0;
        this.miny = this.size[1];
        this.maxy = 0;
    }

    add_piece(piece, position) {
        super.add_piece(piece, position);

        this.minx = Math.min(this.minx, piece.position[0]);
        this.maxx = Math.max(this.maxx, piece.position[0] + piece.size[0]);

        this.miny = Math.min(this.miny, piece.position[1]);
        this.maxy = Math.max(this.maxy, piece.position[1] + piece.size[1]);
    }

    trim() {
        this.size = [this.maxx - this.minx, this.maxy - this.miny];
        this.children.forEach(child => {
            child.position = [child.position[0] - this.minx, child.position[1] - this.miny];
        });

        this.start_pos = [this.start_pos[0] - this.minx, this.start_pos[1] - this.miny];
        this.walls = this.walls.get_square([this.minx, this.miny], this.size);

        this.minx = 0;
        this.maxx = this.size[0];

        this.miny = 0;
        this.maxy = this.size[1];
    }

    generate() {
        throw new Error('not implemented');
    }

    fits(piece, position) {
        let p, x, y;
        for (x = 0; x < piece.size[0]; x++) {
            for (y = 0; y < piece.size[1]; y++) {
                p = this.walls.get([position[0] + x, position[1] + y]);
                if (p === false || p === null || p === undefined) {
                    return false;
                }
            }
        }
        return true;
    }

    join_exits(piece1, piece1_exit, piece2, piece2_exit) {
        /*
        register an exit with each piece, remove intersecting perimeter tiles
        */

        piece1.add_exit(piece1_exit, piece2);
        piece2.add_exit(piece2_exit, piece1);

        let ic = piece1.rect.intersection(piece2.rect);
        if (ic) {
            piece1.remove_perimeter(new __WEBPACK_IMPORTED_MODULE_2__utils_rectangle__["a" /* default */](piece1.local_pos([ic[0], ic[1]], [ic.width, ic.height])));
            piece2.remove_perimeter(new __WEBPACK_IMPORTED_MODULE_2__utils_rectangle__["a" /* default */](piece2.local_pos([ic[0], ic[1]], [ic.width, ic.height])));
        }
    }

    join(piece1, piece2_exit, piece2, piece1_exit) {
        /*
        join piece 1 to piece2 provided at least one exit.
        piece1 should already be placed
        */
        if (!piece1_exit) {
            piece1_exit = this.random.choose(piece1.get_perimeter_by_facing(__WEBPACK_IMPORTED_MODULE_3__const__["c" /* FACING_INVERSE */][piece2_exit[1]]));
        }

        //global piece2 exit pos
        let piece2_exit_pos = piece1.parent_pos(piece1_exit[0]);

        //figure out piece2 position
        let piece2_pos = [piece2_exit_pos[0] - piece2_exit[0][0], piece2_exit_pos[1] - piece2_exit[0][1]];

        if (!this.fits(piece2, piece2_pos)) {
            return false;
        }

        this.join_exits(piece1, piece1_exit, piece2, piece2_exit);
        this.add_piece(piece2, piece2_pos);

        return true;
    }

    get_open_pieces(pieces) {
        //filter out pieces
        return pieces.filter(piece => {
            return piece.exits.length < piece.max_exits && piece.perimeter.length;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Generator;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__room__ = __webpack_require__(3);


class Corridor extends __WEBPACK_IMPORTED_MODULE_0__room__["a" /* default */] {

    constructor(options) {
        options = Object.assign({}, {
            length: 2,
            facing: 0,
            max_exits: 4
        }, options);

        options.size = options.facing === 0 || options.facing === 180 ? [1, options.length] : [options.length, 1];

        super(options);

        var w = this.size[0] - 1;
        var h = this.size[1] - 1;

        //special perimeter: allow only 4 exit points, to keep this corridor corridor-like..
        if (this.facing === 180) this.perimeter = [[[1, h], 0], [[0, 1], 90], [[2, 1], 270], [[1, 0], 180]];else if (this.facing === 270) this.perimeter = [[[0, 1], 90], [[w - 1, 0], 180], [[w - 1, 2], 0], [[w, 1], 270]];else if (this.facing === 0) this.perimeter = [[[1, 0], 180], [[2, h - 1], 270], [[0, h - 1], 90], [[1, h], 0]];else if (this.facing === 90) this.perimeter = [[[w, 1], 270], [[1, 2], 0], [[1, 0], 180], [[0, 1], 90]];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Corridor;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Array2d {

    constructor(size = [0, 0], default_value = null) {
        this.rows = [];
        this.size = [];

        for (let y = 0; y < size[1]; y++) {
            let row = [];
            for (let x = 0; x < size[0]; x++) {
                row.push(default_value);
            }
            this.rows.push(row);
        }
    }

    iter(callback, context) {
        for (let y = 0; y < size[1]; y++) {
            for (let x = 0; x < size[0]; x++) {
                callback.apply(context, [[x, y], this.get([x, y])]);
            }
        }
    }

    get([x, y]) {
        if (this.rows[y] === undefined) {
            return undefined;
        }
        return this.rows[y][x];
    }

    set([x, y], val) {
        this.rows[y][x] = val;
    }

    set_horizontal_line([start_x, start_y], delta_x, val) {
        let c = Math.abs(delta_x),
            mod = delta_x < 0 ? -1 : 1;

        for (let x = 0; x <= c; x++) {
            this.set([pos[0] + x * mod, pos[1]], val);
        }
    }

    set_vertical_line([start_x, start_y], delta_y, val) {
        let c = Math.abs(delta_y),
            mod = delta_y < 0 ? -1 : 1;

        for (let y = 0; y <= c; y++) {
            this.set([pos[0], pos[1] + y * mod], val);
        }
    }

    get_square([x, y], [size_x, size_y]) {
        let retv = new Array2d([size_x, size_y]);
        for (let dx = 0; dx < size_x; dx++) {
            for (let dy = 0; dy < size_y; dy++) {
                retv.set([dx, dy], this.get([x + dx, y + dy]));
            }
        }
        return retv;
    }

    set_square([x, y], [size_x, size_y], val, fill = false) {
        if (!fill) {
            this.line_h([x, y], size_x - 1, val);
            this.line_h([x, y + size_y - 1], size_x - 1, val);
            this.line_v([x, y], size_y - 1, val);
            this.line_v([x + size_x - 1, y], size_y - 1, val);
        } else {
            for (let dx = 0; dx < size_x; dx++) {
                for (let dy = 0; dy < size_y; dy++) {
                    this.set([x + dx, y + dy], val);
                }
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Array2d;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_random_seed__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_random_seed___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_random_seed__);


class Random {
    constructor(seed) {
        this.rng = __WEBPACK_IMPORTED_MODULE_0_random_seed___default.a.create(seed);
    }

    int(min, max) {
        return this.rng.intBetween(min, max);
    }

    float(min = 0, max = 1) {
        return this.rng.floatBetween(min, max);
    }

    vec(min, max) {
        //min and max are vectors [int, int];
        //returns [min[0]<=x<=max[0], min[1]<=y<=max[1]]
        return [this.int(min[0], max[0]), this.int(min[1], max[1])];
    }

    choose(items, remove = false) {
        let idx = this.rng.intBetween(0, items.length - 1);
        if (remove) {
            return items.splice(idx, 1)[0];
        } else {
            return items[idx];
        }
    }

    maybe(probability) {
        return this.float() <= probability;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Random;
;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports.Dungeon = __webpack_require__(5).default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=dungeon-generator.js.map