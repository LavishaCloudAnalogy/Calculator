"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculator_js_1 = require("./utils/calculator.js");
const expression = "3 + 4 * 2 / ( 1 - 5 )";
const res = (0, calculator_js_1.calculate)(expression);
console.log(res);
