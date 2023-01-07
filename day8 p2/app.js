const { dir } = require("console");
const fs = require("fs");
const path = require("path");

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
    const rows = rawInput.split('\n');
    const numOfTrees = 99;


    let scenicScore = 0;

    for(let i = 1; i < numOfTrees - 1; i++){ 

        treeList = rows[i].split('');
        
        for(let k = 1; k < numOfTrees - 1; k++){

            let currentTreeScore = 1;
            let currentTree = parseInt(treeList[k]);
            let treeX = k;
            let treeY = i;
            let j = treeX - 1;
            let solved = false;

            while(!solved && j >= 0){
                let comparedTree = parseInt(treeList[j]);
                // console.log('Comparing column ' + treeX + '(' + currentTree + ')' + ' with column ' + j + '(' + comparedTree + ')');

                if( j == 0 || currentTree <= comparedTree){
                    currentTreeScore *= ( treeX - j);
                    solved = true;
                }

                j--;
            }

            // console.log('\n')
            solved = false;
            j = treeX + 1;

            while(!solved && j < numOfTrees){
                let comparedTree = parseInt(treeList[j]);
                // console.log('Comparing column ' + treeX + '(' + currentTree + ')' + ' with column ' + j + '(' + comparedTree + ')');

                if( j == numOfTrees - 1 || currentTree <= comparedTree){
                    currentTreeScore *= ( j - treeX);
                    solved = true;
                }

                j++;
            }

            // console.log('\n')
            solved = false;
            j = treeY - 1;

            while(!solved && j >= 0){
                let comparedTree = rows[j].split('');
                comparedTree = parseInt(comparedTree[k]);
                // console.log('Comparing row ' + treeY + '(' + currentTree + ')' + ' with row ' + j + '(' + comparedTree + ')');

                if( j == 0 || currentTree <= comparedTree){
                    currentTreeScore *= ( treeY - j);
                    solved = true;
                }

                j--;
            }

            // console.log('\n')
            solved = false;
            j = treeY + 1;

            while(!solved && j < numOfTrees){
                let comparedTree = rows[j].split('');
                comparedTree = parseInt(comparedTree[k]);
                // console.log('Comparing row ' + treeY + '(' + currentTree + ')' + ' with row ' + j + '(' + comparedTree + ')');

                if( j == numOfTrees - 1 || currentTree <= comparedTree){
                    currentTreeScore *= ( j - treeY);
                    solved = true;
                }

                j++;
            }

            // console.log(currentTreeScore);

            if ( scenicScore < currentTreeScore ) {
                scenicScore = currentTreeScore;
            }
        } 
    }

    console.log(scenicScore);
}

main();