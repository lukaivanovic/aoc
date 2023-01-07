const { dir } = require("console");
const fs = require("fs");
const path = require("path");
const { toASCII } = require("punycode");
const { start } = require("repl");

let answer = 0;
let packetIndex = 1;
let count = 0;
const packets = new Map()

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
    const lines = rawInput.split('\n');

    for(const line of lines){
        if(line == ''){

        } else {
            packets.set(packetIndex, {
                content: JSON.parse(line),
                matching: []
            });
            packetIndex++;
        }
    }


    packets.forEach(findPairs);

    console.log(packets);
}

function findPairs(value, key, map){
    currentPacket = value.content;
    currentPacketMatching = value.matching;

    for(let i = 1; i <= 300; i++){
        if( i == key){
            continue;
        } else {
            const isMatching = resolve(currentPacket, packets.get(i).content);

            if(isMatching == true){
                currentPacketMatching.push(i);
            }
        }
    }

    packets.set(key, {
        content: value.content,
        matching: currentPacketMatching
    });
}

function sort(isSorted){
    let count = packets.size/2

    while(!isSorted){
        for(let i = 1; i < count; i++){
            left = packets.get(i*2-1);
            right = packets.get(i*2);
            resolve(left, right, false);
        }
    }
}

function resolve(left, right , isSolved){
    if( typeof left != 'object'){
        left = [left];
    } else if( typeof right != 'object'){
        right = [right];
    }

    let length = left.length;
    let i = 0;
    if(left.length > right.length){
        length = right.length;
    } else if(left.length < right.length){
        length = left.length;
    }

    while(!isSolved && i < length){
        console.log('Comparing: ' + left[i] + ' with: ' + right[i]);

        if(typeof left[i] == 'object' || typeof right[i] == 'object'){
            const result = resolve(left[i], right[i], false);
            if(result == true || result == false){
                return result;
            }
        } else {
            const result = compareNumbers(left[i], right[i]);
            if(result == true && result == false){
                return result;
            }
        }
        i++;
    }

    if( i >= length && isSolved == false){
        if(left.length < right.length){
            console.log('Correct');
            answer += packetIndex;
            return true;
        } else if(left.length > right.length){
            console.log('Incorrect');
            return false;
        }
    }
}

function compareNumbers(left, right){
    if(left < right){
        answer += packetIndex;
        console.log('Correct');
        return true;
    } else if (left > right){
        console.log('Incorrect');
        return false;
    }
}

main();