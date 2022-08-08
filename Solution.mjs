import {batch} from './batch.mjs'

let batchNumber = "KMR0000001";

//Weight of the molten metal in the ladle after removing the sample
let batchWeight = 1; 

//Input initial percentages of each element
let initial = {
    'Cr': 14.79,
    'Ni': 2,
    'Mo': .5,
    'C': .01,
    'Mn': 1,
    'P': .03,
    'S': .02,
    'Si': .6,
    'N' : .05,
    'Fe' : 81
};

//Input percentages of each element for the desired steel grade  
const desired = {
    'Cr': 17,
    'Ni': 12,
    'Mo': 2.5,
    'C': .08,
    'Mn': 2,
    'P': .05,
    'S': .03,
    'Si': .75,
    'N' : .1,
    'Fe' : 65.49,
};

let currentbatch = batch.getAddWeight(batchNumber, batchWeight, initial, desired)

// console.log(currentbatch)
// console.log(currentbatch.addWeightPerElement)