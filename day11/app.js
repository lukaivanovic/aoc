const { dir } = require("console");
const fs = require("fs");
const path = require("path");
const { toASCII } = require("punycode");
const { start } = require("repl");

const monkeys = new Map();

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
    const sections = rawInput.split(/\n\s*\n/);
    const numOfRounds = 10000;
    let monkeyBusiness = [0, 0, 0, 0, 0, 0, 0, 0];
    let cycle = 1;

    for(const section of sections) {

        const sortedSection = section.split('\n')
        const name = sortedSection[0].match(/[^:]*/)
        const startingItems = sortedSection[1].match(/\d\d*/g);
        const [, operation, value] = sortedSection[2].match(/([+*]) (\w+$)/);
        const factor = sortedSection[3].match(/\d\d*/);
        const ifTrue = sortedSection[4].match(/\d/);
        const ifFalse = sortedSection[5].match(/\d/);

        const startingsItemsParsed = startingItems.map(function (x) { 
            return BigInt(parseInt(x, 10)); 
        });

        monkeys.set(name[0], {
            items: startingsItemsParsed,
            operation: operation,
            value: value,
            test: parseInt(factor[0]),
            ifTrue: parseInt(ifTrue[0]),
            ifFalse: parseInt(ifFalse[0])
        });

        cycle *= parseInt(factor);

    }

    const numOfMonkeys = 8;

    for(let round = 0; round < numOfRounds; round++){

        for(let i = 0; i < numOfMonkeys; i++){

            const { items } = monkeys.get(`Monkey ${i}`);
            const { operation } = monkeys.get(`Monkey ${i}`);
            let { value } = monkeys.get(`Monkey ${i}`);
            const { test } = monkeys.get(`Monkey ${i}`);
            const { ifTrue } = monkeys.get(`Monkey ${i}`);
            const { ifFalse } = monkeys.get(`Monkey ${i}`);

            if(items == []){
                continue;
            } else{

                for(let item of items){
                    if(value == 'old'){
                        if(operation == '*'){
                            item *= item;
                        } else {
                            item += item;
                            // console.log('Raising the item with itself');
                        }
                    } else {
                        value = parseInt(value);
                        if(operation == '*'){
                            item *= BigInt(value);
                        } else {
                            item += BigInt(value);
                        }
                    }

                    monkeyBusiness[i]++;

                    item = item % BigInt(cycle);

                    if(item % BigInt(test) == 0){
                        let targetMonkeyItems = monkeys.get(`Monkey ${ifTrue}`).items;
                        targetMonkeyItems.push(item);

                        updateMap(targetMonkeyItems, ifTrue);
                    } else {
                        let targetMonkeyItems = monkeys.get(`Monkey ${ifFalse}`).items;
                        targetMonkeyItems.push(item);

                        updateMap(targetMonkeyItems, ifFalse);
                    }
                }

            }
            updateMap([], i);
        }
    }

    console.log(monkeyBusiness);
}

function updateMap(items, monkeyNo){
    const { operation } = monkeys.get(`Monkey ${monkeyNo}`);
    let { value } = monkeys.get(`Monkey ${monkeyNo}`);
    const { test } = monkeys.get(`Monkey ${monkeyNo}`);
    const { ifTrue } = monkeys.get(`Monkey ${monkeyNo}`);
    const { ifFalse } = monkeys.get(`Monkey ${monkeyNo}`);

    monkeys.set(`Monkey ${monkeyNo}`, {
        items: items,
        operation: operation,
        value: value,
        test: test,
        ifTrue: ifTrue,
        ifFalse: ifFalse
    });

}

main();