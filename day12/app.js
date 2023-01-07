const { dir } = require("console");
const fs = require("fs");
const path = require("path");
const { toASCII } = require("punycode");
const { start } = require("repl");

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
    const lines = rawInput.split('\n');
    const coords = new Map();
    const paths = new Map();
    let endPoint;
    let startingPoint;
    let yAxis = 0;


    for(const line of lines){
        const chars = line.split('');
         // console.log(chars);

        let xAxis = 0;

        for(const char of chars){
            const charName = `${xAxis} ${yAxis}`;
            let height = char.charCodeAt(0) - 97;

            if(char == 'S'){
                startingPoint = `${xAxis} ${yAxis}`;
                height = 0;
            } else if(char == 'E'){
                endPoint = [xAxis, yAxis];
                height = 25;
            }

            coords.set(charName, {
                x: xAxis,
                y: yAxis,
                height: height,
                letter: char
            });
            xAxis++;
        }

        yAxis++;
    }

    let currentPoint = `${endPoint[0]} ${endPoint[1]}`;
    let currentPath = 1;
    let currentPathID = 1;
    paths.set(currentPath, {
        steps: 0,
        path: [currentPoint],
    });

    let solvedPaths = 0;

    paths.forEach((value) => {
        console.log('Starting to solve a path...');
        const ignoreList = new Map();
        currentPoint = paths.get(currentPathID).path[paths.get(currentPathID).path.length-1];

        ignoreList.set(currentPoint, {
            ignore: ['aaa','bbb'],
        });

        console.log(ignoreList.get(currentPoint));

        while ( currentPoint != startingPoint){
            console.log(currentPoint);
            const { height , x, y } = coords.get(currentPoint);
            let { steps, path} = paths.get(currentPath);
            const { ignore } = ignoreList.get(currentPoint);
            const comparedCoords = [`${x} ${y+1}`, `${x+1} ${y}`, `${x} ${y-1}`, `${x-1} ${y}`];
            
            // console.log('Current point is: ' + currentPoint);
            // console.log('Current ignore list is: ' + ignore);
            // console.log('Nearby coords: ' + comparedCoords);
            // console.log('Height is: ' + height);
            // console.log('Currrent path is ' + paths.get(1).path);
            // console.log('\n');
            let availableMoves = [];

            for(let i = 0; i < 4; i++){
                if(coords.has(comparedCoords[i])){
                    const comparedHeight = coords.get(comparedCoords[i]).height;

                    if ( comparedHeight >= height - 1 && !path.includes(comparedCoords[i]) && !ignore.includes(comparedCoords[i]) ){
                        availableMoves.push(comparedCoords[i]);

                        paths.set(currentPathID,{
                            steps: 0,
                            path: 'random'
                        });
                        currentPathID++;
                    }
                }
            }

            if(!Array.isArray(availableMoves) || !availableMoves.length){
                console.log(availableMoves);
                currentPoint = availableMoves[0];

                path.push(currentPoint);
                        steps++;
                        paths.set(currentPath, {
                            steps: steps,
                            path: path
                        });

            } else {
                const toIgnore = currentPoint;
                path.pop();
                currentPoint = path[path.length-1];

                const { ignore } = ignoreList.get(currentPoint);
                ignore.push(toIgnore);

                ignoreList.set( currentPoint,{
                    ignore: ignore
                });

                steps--;
                paths.set(currentPath, {
                    steps: steps,
                    path: path
                });
            }
        }
    });

    
    let answer = 0;
    console.log('At the starting point!');
}

main();