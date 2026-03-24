const precedence : Record<string,number>={
    "+":1,
    "-":1,
    "*":2,
    "/":2
}

export function tokenize(input : string) : string[]{
    return input.match(/\d+(\.\d+)?|[+\-*/()]/g) || [];
}

export function toPostfix(input:string[]):string[]{
    const output:string[]=[];
    const operators:string[]=[]
    for(const token of input){
        if(!isNaN(Number(token))){
            output.push(token);
        }else if(token in precedence){
            while(precedence[operators[operators.length-1]]>=precedence[token]){
                output.push(operators.pop()!);
            }
            operators.push(token)
        }else if(token=='('){
            operators.push(token);
        }else if(token==')'){ 
            while(operators.length>0 && operators[operators.length-1]!='('){
                output.push(operators.pop()!)
            }
            operators.pop();
            }
    }
    return [...output,...operators.reverse()]}

    export function evaluatePostfix(input:string[]):number{
        const stack:number[]=[];
        for(const token of input){
            if(!isNaN(Number(token))){
                stack.push(Number(token));
            }else{
                const b=stack.pop()!;
                const a =stack.pop()!;
                switch(token){
                    case '+':
                        stack.push(a+b);
                        break;
                    case '-':
                        stack.push(a-b);
                        break;
                    case '*':
                        stack.push(a*b);
                        break;
                    case '/':
                        stack.push(a/b);
                        break;

                }
            }
        }
        return stack.pop()!;
    }


export function calculate(expression:string):number{
    const tokens = tokenize(expression);
    const postfix=toPostfix(tokens);
    return evaluatePostfix(postfix);
}