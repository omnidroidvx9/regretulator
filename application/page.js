export class Page {
    constructor(elementUtility, regretulator, annualReturns) {
        this.elementUtility = elementUtility;
        this.regretulator = regretulator;
        this.annualReturns = annualReturns;
    }

    addCalculateTotalReturns() {
        this.elementUtility.button.addEventListener('click', () => {    
            let potentialAmount = this.regretulator.calculateTotalReturns(this.elementUtility.amount.value, this.elementUtility.year.value, this.annualReturns);
            let formattedPotentialAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(potentialAmount);
        
            this.elementUtility.result.innerHTML = formattedPotentialAmount;            
        });
    }
}