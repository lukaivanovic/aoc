const fs = require("fs");
const path = require("path");

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

    const sortedInput = rawInput.split(/\r?\n/);

    let stack = [
        ['F','R','W'],
        ['T','H','M','C','D','V','W','P'],
        ['P','M','Z','N','L'],
        ['J','C','H','R'],
        ['C','P','G','H','Q','T','B'],
        ['G','C','W','L','F','Z'],
        ['W','V','L','Q','Z','J','G','C'],
        ['P','N','R','F','W','T','V','C'],
        ['J','W','H','G','R','S','V'],
    ]

    sortedInput.forEach(element => {
        let filtered = element.split(' ');

        let quantity = parseInt(filtered[1]);
        let source = parseInt(filtered[3]);
        let target = parseInt(filtered[5]);

        // 4 - 2 + 1

        let items = stack[source-1].splice(stack[source-1].length - quantity, quantity);

        // stack[target-1].concat(items);

        console.log(items);

        /* for(let i = items.length; i > 0; i--){
            stack[target-1].push(items[i-1]);
        } */

        stack[target-1].push(...items);

        console.log("Moved " + items + " from " + stack[source-1] + " to " + stack[target-1]);

        // stack[target-1].concat(items);
        
    });

    console.log(stack);
}

main();