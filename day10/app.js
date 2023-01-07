const { dir } = require("console");
const fs = require("fs");
const path = require("path");
const { toASCII } = require("punycode");

const pixels = ['','','','','','',''];

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");


    const width = 40;
    const height = 6;
    const lines = rawInput.split('\n');
    let cycle = 1;
    let register = 1;
    let j = 1;
    let currentHeight = 0;

    for(const line of lines) {

        console.log('line ' + j);

        if( line == 'noop'){
            if ( (cycle - 1) % width == 0 && cycle - 1 != 0){
                console.log('New CRT row starting ');
                currentHeight++;
            }

            console.log('cycle is ' + cycle);
            draw(cycle, register, currentHeight);
            cycle++;

            console.log('\n');

        } else {
            
            for(let i = 0; i < 2; i++){
                if ( (cycle - 1) % width == 0 && cycle - 1 != 0){
                    console.log('New CRT row starting ');
                    currentHeight++;
                }

                console.log('cycle is ' + cycle);
                draw(cycle, register, currentHeight);
                cycle++;
                
                
                console.log('\n');
            }

            const [, value] = line.split(' ');
            register += parseInt(value);
        }

        j++;
        console.log('\n');
    }    

    

    console.log(pixels);
    
}

function draw(cycle, register, row){

    cycle = cycle - row * 40;
    currentPixel = cycle - 1;
    console.log('Drawing pixel ' + currentPixel + ' in row ' + row)
    const sprite = [register - 1, register, register + 1];

    if( sprite.includes(cycle - 1) ){
        pixels[row] = pixels[row].concat('#');
    } else {
        pixels[row] = pixels[row].concat('.');
    }
}

main();