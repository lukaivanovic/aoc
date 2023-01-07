const { dir } = require("console");
const fs = require("fs");
const path = require("path");
const { toASCII } = require("punycode");

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

    const lines = rawInput.split('\n');

    let answer = 0;

    const knots = new Map();
    const numOfKnots = 9;

    for (let i = 1; i < numOfKnots + 1; i++){
        knots.set(`${i}`, {
            x: 0,
            y: 0
        });
    }

    knots.set('head', {
        x: 0,
        y: 0
    });

    knots.set('tail', {
        x: 0,
        y: 0
    });

    const head = knots.get('head');

    const tail = knots.get('tail');


    const coordinates = new Map();

    for ( const line of lines ) {
        const [direction , steps] = line.split(' ');
        
        for ( let i = 0; i < steps; i++){

            let { x } = knots.get('head');
            let { y } = knots.get('head');

            switch(direction){
                case 'L':
                    console.log('Moving head left');
                    x--;
                    break;
                case 'R':
                    console.log('Moving head right');
                    x++;
                    break;
                case 'U':
                    console.log('Moving head up');
                    y++;
                    break;
                case 'D':
                    console.log('Moving head down');
                    y--;
                    break;
            }

            knots.set('head', {
                x: x,
                y: y
            });

            console.log('Head is now on ' + x + ' ' + y);

            for ( let j = 1; j < numOfKnots + 1; j++){

                currentKnotX = knots.get(`${j}`).x;
                currentKnotY = knots.get(`${j}`).y;

                let distanceX;
                let distanceY;

                if( j == 1){
                    prevKnotX = x;
                    prevKnotY = y;
                    distanceX = prevKnotX - currentKnotX;
                    distanceY = prevKnotY - currentKnotY;
                } else {
                    prevKnotX = knots.get(`${j-1}`).x;
                    prevKnotY = knots.get(`${j-1}`).y;
                    distanceX = prevKnotX - currentKnotX;
                    distanceY = prevKnotY - currentKnotY;
                }

                // console.log('X distance is' + distanceX);
                // console.log('Y distance is' + distanceY);

                if ( distanceX <= 1 && distanceX >= -1 && distanceY <= 1 && distanceY >= -1 ) {
                    // console.log('Knot number ' + j + ' stays at ' + currentKnotX + ' ' + currentKnotY);
                } else {
                    // console.log('Knot number ' + j + ' moves');

                    if ( prevKnotY == currentKnotY ){
                        if ( distanceX > 0 ){
                            currentKnotX++;
                        } else {
                            currentKnotX--;
                        }
                    } else if ( prevKnotX == currentKnotX ){
                        if ( distanceY > 0 ){
                            currentKnotY++;
                        } else {
                            currentKnotY--;
                        }
                    } else {
                        if ( distanceY > 0 ){
                            currentKnotY++;
                        } else {
                            currentKnotY--;
                        }

                        if ( distanceX > 0 ){
                            currentKnotX++;
                        } else {
                            currentKnotX--;
                        }
                    }

                    knots.set(`${j}`, {
                        x: currentKnotX,
                        y: currentKnotY
                    });
                }

            }

            console.log('Tail moves to ' + currentKnotX + ' ' + currentKnotY);
            const tailCoords = `${currentKnotX},${currentKnotY}`

            if ( !coordinates.has(tailCoords) ) {
                coordinates.set( tailCoords, {
                    x: currentKnotX,
                    y: currentKnotY,
                });
            }

            console.log('\n');
        }
    }
    console.log(coordinates.size);
}

main();