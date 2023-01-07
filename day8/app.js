const { dir } = require("console");
const fs = require("fs");
const path = require("path");

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

    const rows = rawInput.split('\n');

    const numOfTrees = 99;

    // console.log(lines);

    let answer = 0;

    for(let i = 1; i < numOfTrees - 1; i++){ 

        // console.log(rows[i]);

        treeList = rows[i].split(''); // get all trees from row in array

        // console.log(treeList);
        
        for(let k = 1; k < numOfTrees - 1; k++){
            currentTree = parseInt(treeList[k]);

            let j = 0;
            let solved = false;
            let visibleV = true;
            let visibleH = true;

            while(!solved && j < numOfTrees){
                comparedTreeH = parseInt(treeList[j]);
                comparedTreeV = rows[j].split('');
                comparedTreeV = parseInt(comparedTreeV[k]);

                // console.log('Comparing row ' + k + '(' + currentTree + ')' + ' with row ' + j + '(' + comparedTreeH + ')' + ' and column ' + i + ' with column ' + j + '(' + comparedTreeV + ')');

                if( j == k && solved == false){
                    if(visibleH){
                        solved = true;
                        // console.log('Visible');
                        visibleH = false;
                        visibleV = false;
                        answer++;
                    } else{
                        // console.log('Reset visibleH');
                        visibleH = true;
                    }
                } else if(currentTree <= comparedTreeH){
                    // console.log('Comparing with horizontal tree ' + comparedTreeH);
                    visibleH = false;
                    // console.log("Not visible horizontally");
                }
                
                if( j == i && solved == false){
                    // console.log('Comparing ' + currentTree + ' with vertical ' + comparedTreeV);
                    if(visibleV){
                        solved = true;
                        // console.log('Visible');
                        visibleH = false;
                        visibleV = false;
                        answer++;
                    } else{
                        // console.log('Reset visibleV');
                        visibleV = true;
                    }
                } else if(currentTree <= comparedTreeV){
                    // console.log('Comparing with vertical tree ' + comparedTreeV);
                    visibleV = false;
                }
                
                j++;

                // console.log('\n')
            }

            if ( visibleH == true || visibleV == true ) {
                // console.log("Visible");
                answer++;
            }
        } 
    }

    console.log(answer);
    answer += (numOfTrees * 2) + (numOfTrees - 2) * 2;

    console.log(answer);
}

main();