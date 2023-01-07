const fs = require("fs");
const path = require("path");

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

    const sortedInput = rawInput.split(/\r?\n/);

    let score = 0;

    sortedInput.forEach(element => {
        // console.log(element.charCodeAt(2)-element.charCodeAt(0));
        let solved = false;
        const filtered = element.split('');
        let i = 0;
       
        while(!solved){

            let t = filtered.length/2;

            while(!solved && t < (filtered.length)){

                if(filtered[i] == filtered[t]){
                    solved = true;
                    console.log("Matched " + filtered[i] + " With " + filtered[t]);

                    if(filtered[t].charCodeAt(0) > 96){
                        score = score + (filtered[t].charCodeAt(0) - 96);
                    } else{
                        score = score + (filtered[t].charCodeAt(0) - 38);
                    }
                }

                t++;
            }

            i++;
        }

    });

    console.log("Score is " + score);
}

main();