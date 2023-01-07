const fs = require("fs");
const path = require("path");

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

    const sortedInput = rawInput.split(/\r?\n/);

    let score = 0;

    sortedInput.forEach(element => {
        // console.log(element.charCodeAt(2)-element.charCodeAt(0));

        switch(element.charCodeAt(2)){
            case 88:
                // lose
                switch(element.charCodeAt(0)){
                    case 65:
                        score += 3;
                    break;
                    case 66:
                        score += 1;
                    break;
                    case 67:
                        score += 2;
                    break;
                }
            break;
            case 89:
                //draw
                score += 3;

                switch(element.charCodeAt(0)){
                    case 65:
                        score += 1;
                    break;
                    case 66:
                        score += 2;
                    break;
                    case 67:
                        score += 3;
                    break;
                }
            break;
            case 90:
                //win
                score += 6;

                switch(element.charCodeAt(0)){
                    case 65:
                        score += 2;
                    break;
                    case 66:
                        score += 3;
                    break;
                    case 67:
                        score += 1;
                    break;
                }
            break;
        }

        /** switch(element.charCodeAt(2)-element.charCodeAt(0)){
            case 24:
                // console.log('win');
                score += 6;
            break;
            case 21:
                // console.log('win');
                score += 6;
            break;
            case 22:
                // console.log('lose');
            break;
            case 25:
                // console.log('lose');
            break;
            case 23:
                // console.log('draw');
                score += 3;
            break;
        } **/
    });

    console.log("Score is " + score);
}

main();