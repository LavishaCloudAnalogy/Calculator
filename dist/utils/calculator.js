"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = tokenize;
exports.toPostfix = toPostfix;
exports.evaluatePostfix = evaluatePostfix;
exports.calculate = calculate;
const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
};
function tokenize(input) {
    return input.match(/\d+(\.\d+)?|[+\-*/()]/g) || [];
}
function toPostfix(input) {
    const output = [];
    const operators = [];
    for (const token of input) {
        if (!isNaN(Number(token))) {
            output.push(token);
        }
        else if (token in precedence) {
            while (precedence[operators[operators.length - 1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
        else if (token == '(') {
            operators.push(token);
        }
        else if (token == ')') {
            while (operators.length > 0 && operators[operators.length - 1] != '(') {
                output.push(operators.pop());
            }
            operators.pop();
        }
    }
    return [...output, ...operators.reverse()];
}
function evaluatePostfix(input) {
    const stack = [];
    for (const token of input) {
        if (!isNaN(Number(token))) {
            stack.push(Number(token));
        }
        else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
            }
        }
    }
    return stack.pop();
}
function calculate(expression) {
    const tokens = tokenize(expression);
    const postfix = toPostfix(tokens);
    return evaluatePostfix(postfix);
}
