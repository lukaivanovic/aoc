const fs = require("fs");
const path = require("path");

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

    // const sortedInput = rawInput.split(/\r?\n/);

    const sortedInput = rawInput.match(/(?:^.*$\n?){1,3}/mg);

    let score = 0;


    sortedInput.forEach(element => {
        // console.log(element.charCodeAt(2)-element.charCodeAt(0));
        let solved = false;

        const filtered = element.split(/\r?\n/);

        const first = filtered[0].split('');
        const second = filtered[1].split('');
        const third = filtered[2].split('');

        let i = 0;

        const firstPass = first.filter(element => second.includes(element));
        const solution = firstPass.filter(element => third.includes(element));

        if(solution[0].charCodeAt(0) > 96){
            score = score + (solution[0].charCodeAt(0) - 96);
        } else{
            score = score + (solution[0].charCodeAt(0) - 38);
        }

    });

    console.log("Score is " + score);
}

main();