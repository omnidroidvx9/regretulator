class Page {
    getYears() {
        return cy.get('#years')
    }

    getAmount() {
        return cy.get('[name=amount]')
    }

    getButton() {
        return cy.get('button')
    }

    getResult() {
        return cy.get('#result')
    }

    clickSubmit() {
        let button = this.getButton()

        button.click()
    }

    enterAmount(amount) {
        let amountField = this.getAmount()

        amountField.type(`${amount}`)
    }    

    selectYear(year) {
        let years = this.getYears()

        years.select(year);
    }
}

module.exports = Page