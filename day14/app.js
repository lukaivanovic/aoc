const { dir } = require("console");
const fs = require("fs");
const path = require("path");
const { toASCII } = require("punycode");
const { start } = require("repl");


function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
    const world = new Map();
    let maxDepth = 0;

    rawInput.split("\n").forEach((line) => {
        const corners = line.split(" -> ");
        for (let i = 0; i < corners.length - 1; i++) {
            const [startX, startY] = corners[i].split(",").map((raw) => parseInt(raw));
            const [endX, endY] = corners[i + 1].split(",").map((raw) => parseInt(raw));

            if ( endY > maxDepth){
                maxDepth = endY;
            }

            if (startX === endX) {
                const min = Math.min(startY, endY);
                const max = Math.max(startY, endY);
                for (let y = min; y <= max; y++) {
                    world.set(`${startX}_${y}`, "#");
                }
            } else if (startY === endY) {
                const min = Math.min(startX, endX);
                const max = Math.max(startX, endX);
                for (let x = min; x <= max; x++) {
                    world.set(`${x}_${startY}`, "#");
                }
            }
        }
    });

    function step() {
        let x = 500;
        let y = 0;
        while (y < maxDepth + 1) {
            if (!world.has(`${x}_${y + 1}`)) {
                y += 1;
                continue;
            }
            if (!world.has(`${x - 1}_${y + 1}`)) {
                y += 1;
                x -= 1;
                continue;
            }
            if (!world.has(`${x + 1}_${y + 1}`)) {
                y += 1;
                x += 1;
                continue;
            }
            world.set(`${x}_${y}`, "o");
            return;
        }
        world.set(`${x}_${y}`, "o");
    }

    let count = 0;
    while (!world.has('500_0')) {
        isResting = step();
        count++;
        
    }

    console.log(count);
}

main();