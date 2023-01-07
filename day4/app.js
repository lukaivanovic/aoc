const fs = require("fs");
const path = require("path");

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

    // const sortedInput = rawInput.split(/\r?\n/);

    const sortedInput = rawInput.split(/\r?\n/);

    let matchingPairs = 0;


    sortedInput.forEach(element => {
        let filtered = element.split(',');

        let firstPair = filtered[0].split('-');
        let secondPair = filtered[1].split('-');

        let elf1start = parseInt(firstPair[0]);
        let elf2start = parseInt(secondPair[0]);
        let elf1end = parseInt(firstPair[1]);
        let elf2end = parseInt(secondPair[1]);

        // 61 8   81 61

        if( ( elf2start >= elf1start && elf2start <= elf1end ) || (elf2end >= elf1start && elf2end <= elf1end) ){
            matchingPairs++;
            console.log("matched" + matchingPairs);
        } else if(( elf1start >= elf2start && elf1start <= elf2end ) || (elf1end >= elf2start && elf1end <= elf2end)){
            matchingPairs++;
            console.log("matched" + matchingPairs);
        }
    });

    console.log("There are " + matchingPairs);
}

main();