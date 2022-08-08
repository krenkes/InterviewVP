let batch = {
    batchNumber: null,
    //The properties definitions are:
    //batchWeight: Weight of the molten metal in the ladle after removing the sample(although probably neglible in most cases)
    //initial: Initial Percentages for each element in the batch from sample
    //desired: Desired Percentages for each element in the steel spec
    //initialWeight:: Calculated weight of each element in the batch before any additional amount of material is added
    //ratioMax: Maximum ratio initial%/desired% of all the elements
    //finalWeight: Calculated weight for each element in the batch after adjustments have been made
    //addWeightPerElement: Weight of each element to add to move from intital to desired chemical composition
    //sumFinalWeight: Calculated weight of batch after adjustments have been made
    //percentFinal: Calculated final chemical composition of batch
    batchWeight: null,
    initial: null,
    desired: null,
    initialWeight: {}, 
    ratioMax: 1, 
    finalWeight: {},
    addWeightPerElement: {}, 
    sumFinalWeight: null,
    percentFinal: {},
    // The setCheckInputs method: 
    // Populates the batchWeight, initial, and desired properties for the batch
    // Checks initial and desired sum to 100%
    // Checks to confirm the same elements are in both and that they are positive numbers
    setCheckInputs: function(batchWeight, initial, desired) {
        this.batchWeight = batchWeight
        this.initial = initial
        this.desired = desired
        let sumCheck=(data)=>{
            let sum = 0;
            for (let x in data){
                sum += data[x]
            }
            return Math.round(sum*10000)/10000
        }
        if (sumCheck(this.initial) !== 100){
            return `Initial Percentages equal ${sumCheck(this.initial)}% and should total to 100%`
        } 
        if (sumCheck(this.desired) !== 100){
            return `Desired Percentages equal ${sumCheck(this.desired)}% and should total to 100%`
        }
        for (let x in this.initial) {
            if (this.initial[x] < 0){
                return `The value for element "${x}" cannot be a negative number`
            }
            if (!this.desired.hasOwnProperty(x)){
                return `Property "${x}" is listed in the initial percentages, but not in the desired percentages`
            }
        }
        for (let x in this.desired) {
            if (this.desired[x] <= 0){
                return `The value for element "${x}" cannot be a zero or a negative number`
            }
            if (!this.initial.hasOwnProperty(x)){
                return `Property "${x}" is listed in the initial percentages, but not in the desired percentages`
            }
        }
        return true
    },
    // The getInitialWeight method:
    // Runs the setCheckInputs method
    // Calculates the inititalWeight of each element in the batch
    // Calculates the ratioMax
    getInitialWeight: function(batchWeight, initial, desired) {
        let check = this.setCheckInputs(batchWeight, initial, desired)
        if (check !== true) {
            return check
        }
        for (let x in this.initial){
            this.initialWeight[x] = this.initial[x]/100*this.batchWeight
            let ratio = this.initial[x]/this.desired[x];
            if (ratio > this.ratioMax) {
                this.ratioMax = ratio
            }    
        }
        return true
    },
    // The getAddWeight method:
    // Sets the batchNumber
    // Runs the getInitialWeight Method
    // Calculates the sumFinalWeight, finalWeight, addWeightPerElement, and the percentFinal
    // Console logs the addWeightPerElement  
    getAddWeight: function(batchNumber, batchWeight, initial, desired) {
        this.batchNumber = batchNumber;
        let initialWeight = this.getInitialWeight(batchWeight, initial, desired);
        if (initialWeight !== true) {
            return initialWeight
        }
        this.sumFinalWeight = this.ratioMax * this.batchWeight;
        for (let x in this.desired) {
            this.finalWeight[x] = this.desired[x]/100*this.ratioMax*this.batchWeight
            this.addWeightPerElement[x] = Math.abs(Math.round((this.finalWeight[x] - this.initialWeight[x])*1000000)/1000000)
            this.percentFinal[x]  = Math.round(100*this.finalWeight[x]/this.sumFinalWeight*10000)/10000
        }
        console.log(this.addWeightPerElement)
        console.log(this.percentFinal)
        return batch
    }
}

export {batch};