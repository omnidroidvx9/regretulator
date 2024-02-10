export class Regretulator {	
	createArrayOfAnnualReturnsAfterSelectedYear(year, annualReturns) {
		let annualReturnsAfterSelectedYear = [];	
		let annualReturn = this.getObjectWithMatchingYear(year, annualReturns);
		let indexOfSelectedYear = annualReturns.indexOf(annualReturn);				
			
		for (let i = indexOfSelectedYear; i < annualReturns.length; i++) {							
			annualReturnsAfterSelectedYear.push(annualReturns.at(i));
		}			
		
		return annualReturnsAfterSelectedYear;
	}		
	
	getObjectWithMatchingYear(year, annualReturns) {
		return annualReturns.filter((annualReturn) => annualReturn.Year == year).at(0);
	}

	calculateTotalReturns(amount, year, annualReturns) {
		let annualReturnsAfterSelectedYear = this.createArrayOfAnnualReturnsAfterSelectedYear(year, annualReturns);
		let totalReturns = amount;

		for(let i = 0; i < annualReturnsAfterSelectedYear.length; i++) {
			let percentageChangeAsDecimal = (1 + annualReturnsAfterSelectedYear.at(i).PercentageChange * .01);
			totalReturns = totalReturns * percentageChangeAsDecimal			
		}

		return totalReturns;
	}
}