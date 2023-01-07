const fs = require("fs");
const path = require("path");

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

    const sortedInput = rawInput.split(/\r?\n/);

    let highest = [0, 0, 0];
    let current = 0;

    sortedInput.forEach(element => {
        if(element != '') {
            current += parseInt(element);
        } else {
            let lowestIndex = 0;

            for(let i = 0; i < highest.length; i++){
                if(highest[i] < highest[lowestIndex]){
                    lowestIndex = i;
                }
            }

            if(current > highest[lowestIndex]){
                highest[lowestIndex] = current;
            }

            current = 0;
        }
    });
}

main();