const fs = require("fs");
const path = require("path");

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

    const sortedInput = rawInput.split('');

    let solved = false;
    let current = Array(14);
    let nextItem;
    let position;

    for(let i = 0; i < current.length; i++){
        current[i]=sortedInput[i];
    }

    nextItem = 14;
    let sameIndex = 0;

    while(!solved){
        let isSame = false;
        let i = 12;

        current.shift();
        current.push(sortedInput[nextItem]);

        while(!solved && i >= 0 && !isSame){

            if(current[13] == current[i]){
                isSame = true;
                if(sameIndex < i + 1){
                    sameIndex = i + 1;
                }
            }

            i--;
        }

        if(sameIndex != 0){
            sameIndex--;
        } else if((current[14] != current[0]) && (isSame == false)){
            solved = true;
            position = nextItem + 1;
        }

        nextItem++;
    }

    console.log(position);
}

main();