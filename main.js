// Returns a single random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

/*
Factory function pAequorFactory() has two parameters. The 
first parameter is a number (no two organisms should have 
the same number). The second parameter is an array of 15 
DNA bases. Returns an object that contains the properties 
specimenNum and dna that correspond to the parameters provided.
*/
const pAequorFactory = (specimenNum, dnaArray) => {
  return {
    specimenNum: specimenNum,
    dna: dnaArray,

    /*
    Mutate() changes one of the DNA bases by randomly 
    picking an index and assigning it a new base letter. 
    Uses a do...while loop to avoid assigning the same 
    base letter to the chosen index.
    */
    mutate() {
      let randBaseIndex = Math.floor(Math.random() * this.dna.length);
      let randBase = dnaArray[randBaseIndex];
      let newBase = "";
      do {
        newBase = returnRandBase();
      } while (randBase === newBase);
      dnaArray[randBaseIndex] = newBase;
    },

    /*
    compareDNA() compares current DNA array to new 
    DNA array passed to method. Prints to console
    the index and letter pairs that match and then
    prints to console a % of DNA pairs that match.
    */
    compareDNA(newDnaObj) {
      let matchCnt = 0;
      let percentMatch = 0;
      let numBases = this.dna.length;
      console.log("DNA Base match:");
      console.log(`\t#${this.specimenNum}\t#${newDnaObj.specimenNum}`);

      //Compare DNA bases in each DNA array index by index,
      //keep count of # of matches and print to console each match
      for (let i = 0; i < numBases; i++) {
        if (this.dna[i] === newDnaObj.dna[i]) {
          matchCnt++;
          console.log(`${i}:\t${this.dna[i]}\t${newDnaObj.dna[i]}`);
        }
      }
      console.log(`# of matches: ${matchCnt}`);
      percentMatch = (matchCnt / numBases) * 100;
      console.log(
        `specimen #${this.specimenNum} and specimen #${
          newDnaObj.specimenNum
        } have ${percentMatch.toFixed(0)}% DNA in common`
      );
    },

    /*
    willLikelySurvive() returns true if the object’s .dna
    array contains at least 60% 'C' or 'G' bases. 
    Otherwise, it returns false.
    */
    willLikelySurvive() {
      let matchCorG = 0;
      let arrayLength = this.dna.length;
      for (let i = 0; i < arrayLength; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          matchCorG++;
        }
      }
      return matchCorG / arrayLength >= 0.6 ? true : false;
    },
    complementStrand() {
      const complementaryArray = [];
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "A") {
          complementaryArray[i] = "T";
        } else if (this.dna[i] === "T") {
          complementaryArray[i] = "A";
        } else if (this.dna[i] === "C") {
          complementaryArray[i] = "G";
        } else if (this.dna[i] === "G") {
          complementaryArray[i] = "C";
        }
      }
      return complementaryArray;
    },
  }; //end return statement
}; //end pAequorFactory

function makeObj(numObj) {
  let storageArray = [];
  let specimenNum = 0;
  let currObj = {};
  do {
    specimenNum++;
    currObj = pAequorFactory(specimenNum, mockUpStrand());
    if (currObj.willLikelySurvive) {
      storageArray.push(currObj);
    }
  } while (storageArray.length < numObj);
  return storageArray;
}

//test statements
let DnaStrand1 = mockUpStrand();
//let DnaStrand2 = mockUpStrand();
let DnaObj1 = pAequorFactory(1, DnaStrand1);
//let DnaObj2 = pAequorFactory(2, DnaStrand2);

console.log(DnaObj1.dna);
console.log("");
//DnaObj1.compareDNA(DnaObj2);
//console.log(DnaObj1.willLikelySurvive());
//console.log(makeObj(1));
console.log(DnaObj1.complementStrand());
