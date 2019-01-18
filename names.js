const fs = require("fs");

class NameCreator{
    constructor(){
        this.parts = this.getParts();
    }

    getParts (){
	    return ['arms_left', 'bodies_left', 'eyes','mouths_noses', 'eyes', 'bodies_right', 'arms_right'].map(fileName => {
		    return fs.readFileSync(`./parts/${fileName}.txt`, 'utf8').split('\n');
        });
    }
    
    generateNames(n){
        return this.getCombinations(this.parts, n)
    }

    getCombinations(arr, n) {
        if (arr.length === 1) {
            return arr[0];
        } else {
            let result = [];
            let allCasesOfRest = this.getCombinations(arr.slice(1), n);  // recur with the rest of array
            for (let i = 0; i < allCasesOfRest.length; i++) {
                for (let j = 0; j < arr[0].length; j++) {
                    result.push(arr[0][j] + allCasesOfRest[i]);
                    if (result.length >= n) {
                        return result
                    }
                }
            }
            return result;
        }
    }
}

module.exports = NameCreator;
