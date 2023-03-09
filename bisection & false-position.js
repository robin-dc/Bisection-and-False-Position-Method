const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(" ")
console.log("===========================================================================================================================================")
console.log("                                                           ")
console.log("                                                           BISECTION & FALSE-POSITION                ")
console.log("                                                           ")
console.log("===========================================================================================================================================")
console.log(" ")


const askMethod= () => {
    rl.question("Choose which method: A for bisection, B for false-position: ", checkMethod)
}

const checkMethod = chosen => {
    if(chosen === "A" || chosen === "a" || chosen === "1" || chosen === "A."){
        console.log("'BISECTION METHOD'")
        console.log("\nPlease enter your constant numbers (a,b,c):")
        bisection()
    }
    else if(chosen === "B" || chosen === "b" || chosen === "2" || chosen === "B."){
        console.log("'FALSE-POSITION METHOD'")
        console.log("\nPlease enter your constant numbers (a,b,c):")
        falsePosition()
    }
    else{
        askMethod()
    }
}

let a;
let b;
let c;
let xl;
let xu;

//================================================= BISECTION QUESTIONS ==========================================
const bisection = () => {

    function ask1st() {
        rl.question('A: ', first => {
            a = Number(first)
            ask2nd()
        });
    }
    function ask2nd() {
        rl.question('B: ', second => {
            b = Number(second)
            ask3rd()
        });
    }

    function ask3rd() {
        rl.question('C: ', third => {
            c = Number(third)
            checking()
        });
    }
    ask1st()
}

const checking = () => {
    let square = b*b;
    let result = square - 4*a*c;
    console.log("\nchecking result is: ", result)

    if(result < 0){
        console.log("equation has Imaginary roots, change your values.")
        bisection()
    }
    else{
        console.log("\nEQUATION CAN BE SOLVED: "+ a+"x² + "+b+"x + "+c)
        console.log("\nPlease enter your guesses:")
        guess()
    }
}

const guess = () => {
    function askXL() {
        rl.question('XL: ', first => {
            xl = Number(first)
            askXU()
        });
    }
    function askXU() {
        rl.question('XU: ', second => {
            xu = Number(second)
            if(xu < xl){
                console.log("XL cannot be less than XU, enter again!")
                guess()
            }
            else{
                bisectionIteration()
            }
        });
    }
    askXL()
}

//================================================= FALSE POSITION QUESTIONS ================================
const falsePosition = () => {

    function ask1st() {
        rl.question('A: ', first => {
            a = Number(first)
            ask2nd()
        });
    }
    function ask2nd() {
        rl.question('B: ', second => {
            b = Number(second)
            ask3rd()
        });
    }

    function ask3rd() {
        rl.question('C: ', third => {
            c = Number(third)
            falseChecking()
        });
    }
    ask1st()
}

const falseChecking = () => {
    let square = b*b;
    let result = square - 4*a*c;
    console.log("\nchecking result is: ", result)

    if(result < 0){
        console.log("equation has Imaginary roots, change your values.")
        falsePosition()
    }
    else{
        console.log("\nEQUATION CAN BE SOLVED: "+ a+"x² + "+b+"x + "+c)
        console.log("\nPlease enter your guesses:")
        falseGuess()
    }
}

const falseGuess = () => {
    function askXL() {
        rl.question('XL: ', first => {
            xl = Number(first)
            askXU()
        });
    }
    function askXU() {
        rl.question('XU: ', second => {
            xu = Number(second)
            if(xu < xl){
                console.log("XL cannot be less than XU, enter again!")
                falseGuess()
            }
            else{
                falsePositionIteration()
            }
        });
    }
    askXL()
}
let squarexl;
let squarexu;
let quadxl;
let quadxu;
let xr;
let squarexr;
let quadxr;
let fxrXu;
let fxrXl;
let RE;
let array = []

//================================================= BISECTION FORMULAS ==========================================
const formulas = (xl, xu, array) => {
    squarexl = xl*xl;
    squarexu = xu*xu;
    quadxl = Math.round((a*squarexl + b*xl + c) * Math.pow(10,2)) / Math.pow(10,2);
    quadxu = Math.round((a*squarexu + b*xu + c) * Math.pow(10,2)) / Math.pow(10,2);
    xr = (xl + xu) /2;
    array.push(xr)
    squarexr = xr*xr;
    quadxr = Math.round((a*squarexr + b*xr + c) * Math.pow(10,2)) / Math.pow(10,2);
    fxrXu = Math.round((quadxr * quadxu) * Math.pow(10,2)) / Math.pow(10,2);
    fxrXl = Math.round((quadxr * quadxl) * Math.pow(10,2)) / Math.pow(10,2);
    let xnew = array[array.length-1];
    let xold = array[array.length-2];
    RE = (xnew - xold)/xnew * 100;
}

//================================================= FALSE POSITION FORMULAS ==========================================
const falseFormulas = (xl, xu, array) => {
    squarexl = xl*xl;
    squarexu = xu*xu;
    quadxl = Math.round((a*squarexl + b*xl + c) * Math.pow(10,2)) / Math.pow(10,2);
    quadxu = Math.round((a*squarexu + b*xu + c) * Math.pow(10,2)) / Math.pow(10,2);
    xr = xu - (quadxu *(xl-xu)) / (quadxl -quadxu)
    array.push(xr)
    squarexr = xr*xr;
    quadxr = Math.round((a*squarexr + b*xr + c) * Math.pow(10,2)) / Math.pow(10,2);
    fxrXu = Math.round((quadxr * quadxu) * Math.pow(10,2)) / Math.pow(10,2);
    fxrXl = Math.round((quadxr * quadxl) * Math.pow(10,2)) / Math.pow(10,2);
    let xnew = array[array.length-1];
    let xold = array[array.length-2];
    RE = (xnew - xold)/xnew * 100;
}

//================================================= BISECTION PROCESS =================================================
const bisectionIteration = () => {

    let iteration = 1;
    let conclusion = "Ok, the root is in between"
    sxl = xl*xl;
    sxu = xu*xu;
    fxl = Math.round((a*sxl + b*xl + c) * Math.pow(10,2)) / Math.pow(10,2);
    fxu = Math.round((a*sxu + b*xu + c) * Math.pow(10,2)) / Math.pow(10,2);

    if(fxl*fxu < 0){
        console.log("\nPASSED!")
        formulas(xl, xu, array)
        console.log("\nI \tXL \tXU \tXR \tf(XL) \tf(XU) \tf(XR) \tf(XU)*f(XR) \tf(XL)*f(XR) \tCONCLUSION \t\t\tRE")
        console.log("===========================================================================================================================================")
        printTable(iteration, xl, xu, xr, quadxl, quadxu, quadxr, fxrXu, fxrXl, conclusion, RE)
        for(let y = 0; y < 50; y++){
            if(RE < 0){
                RE = RE * -1
                if(RE <= 0.5){
                    y = 100
                    rl.close()
                    console.log("\nXR: ", Math.round((xr) * Math.pow(10,2)) / Math.pow(10,2) + '\t\t' + "RE: -", Math.round((RE) * Math.pow(10,4)) / Math.pow(10,4) + "%")
                }
            }
            else if(RE <= 0.5){
                y = 100
                rl.close()
                console.log("\nXR: ", Math.round((xr) * Math.pow(10,2)) / Math.pow(10,2) + '\t\t' + "RE: ", Math.round((RE) * Math.pow(10,4)) / Math.pow(10,4) + "%")
            }
            else if(quadxr * quadxu > 0){
                xu = xr;
                formulas(xl, xu, array)
                iteration+=1;
                printTable(iteration, xl, xu, xr, quadxl, quadxu, quadxr, fxrXu, fxrXl, conclusion, RE)
            }
            else{
                xl = xr;
                formulas(xl, xu, array)
                iteration+=1;
                printTable(iteration, xl, xu, xr, quadxl, quadxu, quadxr, fxrXu, fxrXl, conclusion, RE)
            }
        }

    }
    else{
        console.log("The root is not between your guesses, change your guesses")
        guess()
    }

}

//================================================= FALSE POSITION PROCESS ==========================================
const falsePositionIteration = () => {
    let iteration = 1;
    let conclusion = "Ok, the root is in between"
    sxl = xl*xl;
    sxu = xu*xu;
    fxl = Math.round((a*sxl + b*xl + c) * Math.pow(10,2)) / Math.pow(10,2);
    fxu = Math.round((a*sxu + b*xu + c) * Math.pow(10,2)) / Math.pow(10,2);

    if(fxl*fxu < 0){
        console.log("\nPASSED!")
        falseFormulas(xl, xu, array)
        console.log("\nI \tXL \tXU \tXR \tf(XL) \tf(XU) \tf(XR) \tf(XU)*f(XR) \tf(XL)*f(XR) \tCONCLUSION \t\t\tRE")
        console.log("===========================================================================================================================================")
        printTable(iteration, xl, xu, xr, quadxl, quadxu, quadxr, fxrXu, fxrXl, conclusion, RE)
        for(let y = 0; y < 50; y++){
            if(RE < 0){
                RE = RE * -1
                if(RE <= 0.5){
                    y = 100
                    rl.close()
                    console.log("\nXR: ", Math.round((xr) * Math.pow(10,2)) / Math.pow(10,2) + '\t\t' + "RE: -", Math.round((RE) * Math.pow(10,4)) / Math.pow(10,4) + "%")
                }
            }
            else if(RE <= 0.5){
                y = 100
                rl.close()
                console.log("\nXR: ", Math.round((xr) * Math.pow(10,2)) / Math.pow(10,2) + '\t\t' + "RE: ", Math.round((RE) * Math.pow(10,4)) / Math.pow(10,4) + "%")
            }
            else if(quadxr * quadxu > 0){
                xu = xr;
                falseFormulas(xl, xu, array)
                iteration+=1;
                printTable(iteration, xl, xu, xr, quadxl, quadxu, quadxr, fxrXu, fxrXl, conclusion, RE)
            }
            else{
                xl = xr;
                falseFormulas(xl, xu, array)
                iteration+=1;
                printTable(iteration, xl, xu, xr, quadxl, quadxu, quadxr, fxrXu, fxrXl, conclusion, RE)
            }
        }

    }
    else{
        console.log("The root is not between your guesses, change your guesses")
        falseGuess()
    }
}

//================================================= TABLE PRINTING ====================================================
const printTable = (iteration, xl, xu, xr, quadxl, quadxu, quadxr, fxrXu, fxrXl, conclusion, RE) => {
    if(!RE){
        RE = ""
    }
    console.log(iteration+ "\t"+Math.round((xl) * Math.pow(10,2)) / Math.pow(10,2)+ "\t"+Math.round((xu) * Math.pow(10,2)) / Math.pow(10,2)+ "\t"+Math.round((xr) * Math.pow(10,2)) / Math.pow(10,2)+ "\t"+quadxl+ "\t"+quadxu+ "\t"+quadxr+ "\t"+fxrXu+ "\t\t"+fxrXl+ "\t\t"+conclusion+ "\t"+RE)
}


askMethod()
