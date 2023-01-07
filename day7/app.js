const { dir } = require("console");
const fs = require("fs");
const path = require("path");

function main(){
    const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

    const lines = rawInput.split('\n');

    // console.log(lines);

    const directories = new Map();
    
    directories.set("/", {
        name: "/",
        level: 0,
        size: 0,
    });

    let currentDirectory = '/';

    for(const line of lines) {

        if(line.startsWith("$ ls")){
            continue;
        }

        if(line.startsWith("$ cd")){
            const directoryName = line.replace("$ cd ", "");

            if(directoryName === '/'){
                currentDirectory = '/';
            } else if(directoryName === '..'){
                const { parent } = directories.get(currentDirectory);
                currentDirectory = parent;
            } else {
                const directory = currentDirectory == '/' ? directoryName : `${currentDirectory}/${directoryName}`;
                const parentDirectory = directories.get(currentDirectory);

                if(!directories.has(directory)){
                    directories.set(directory, {
                        name: directory,
                        size: 0,
                        parent: currentDirectory,
                        level: parentDirectory.level + 1,
                    });
                }
                currentDirectory = directory;
            }
            continue;
        }

        if(line.startsWith("dir")) continue;
        const [, size, filename] = line.match(/^(\d+) (.+)$/);
        directories.get(currentDirectory).size = directories.get(currentDirectory).size + parseInt(size);
    }

    const sortedDirectories = [...directories.values()].sort((a,b) => b.level - a.level);

    for(const dir of sortedDirectories){
        if(dir.parent){
            directories.get(dir.parent).size = directories.get(dir.parent).size + dir.size;
        }
    }

    /* const answer = sortedDirectories.reduce((sum, dir) => {
        if(dir.name === "/") return sum;
        return dir.size <= 100000 ? sum + dir.size : sum;
    }, 0); */

    const availableSpace = 70000000;
    const takenSpace = sortedDirectories.find(element => element.name === "/").size
    const neededSpace = 30000000 - (availableSpace - takenSpace);


    const matchingDirectories = sortedDirectories.filter(element => element.size >= neededSpace)

    let answer = 70000000;

    for(const dir of matchingDirectories){
        if(dir.size < answer){
            answer = dir.size;
            console.log(answer);
        }
    }

    console.log(matchingDirectories);
    console.log(answer);
}

main();