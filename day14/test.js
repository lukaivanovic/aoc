const { dir } = require("console");
const fs = require("fs");
const path = require("path");
const { toASCII } = require("punycode");
const { start } = require("repl");


normalize=e=>e
    .replace(/10/g,'A')
    .split('')
    .reduce(([r,l],c)=>{
        switch(c){
            case '[':return [r,l+1];
            case ']':return [r,l-1];
            case ',':return [r+String.fromCharCode('!'.charCodeAt(0)+l),l];
            default:return [r+c,l];
        }
    },['',0])[0]


// Part 2
dividers = ['[[2]]','[[6]]']
let rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
 
rawInput = rawInput.split('\n');
console.log(rawInput);

rawInput = rawInput.concat(dividers)
console.log(rawInput);

rawInput = rawInput.filter(i=>i)
console.log(rawInput);

rawInput = rawInput.map(e=>[e,normalize(e)])
console.log(rawInput);

rawInput = rawInput.sort((a,b)=>a[1]<b[1]?-1:1)
console.log(rawInput);

rawInput = rawInput.map((a,i)=>[a[0],i])
console.log(rawInput);

rawInput = rawInput.filter(e=>dividers.includes(e[0]))
console.log(rawInput);

rawInput = rawInput.map(e=>e[1])
console.log(rawInput);

rawInput = rawInput.reduce((a,b)=>a*(b+1),1)
console.log(rawInput);

