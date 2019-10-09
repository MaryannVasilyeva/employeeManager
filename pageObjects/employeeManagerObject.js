var testCommands = {
    clickButtonByText: function (button) {
        this.api.useXpath()
        this.click(`//button[contains( text(), "${button}")]`)
        this.api.useCss()
        return this
    },
    //CLICKS IN THE BUTTON CONTAINS SPECIFIC TEXT
    clickByText: function (text) {
        this
            .api.useXpath()
        this
            .click(`//ul//*[text()[contains(.,"${text}")]]`)
        this
            .api.useCss()
        return this
    },
    //CHECKS IF THE ID IN FACT AN ID
    idCheck: function(){
        this.getText('@employeeID', function(result){
            let idNumber = Number(result.value.slice(3))
                this
                    .verify.ok(idNumber > 0, `The ID (${idNumber}) is a positive number.`)
                    .verify.ok(idNumber % 1 === 0, `The ID (${idNumber}) is a whole number.`)
            })
        return this
    },
    //CHECK TO SEE IF THE NEW EMPLOYEE EXISTS
    createEmployee: function (create) {
        this.clickByText("+ Add Employee")
        this.clickByText("New Employee")
            .clearValue('@inputNameEntry')
        this.setValue('@inputNameEntry', create[0].name)
            .clearValue('@inputPhoneEntry')
        this.setValue('@inputPhoneEntry', create[0].phone)
            .clearValue('@inputEmailEntry')
        this.setValue('@inputEmailEntry', create[0].email)
            .clearValue('@inputTitleEntry')
        this.setValue('@inputTitleEntry', create[0].title)
            .click('@confirmationButton')
        return this
    },
    changeEmployee: function (existingEmployee, change) {
        this
            .clickByText(existingEmployee)
            .idCheck()
            .waitForElementVisible('@employeeTitle')
        this
            .clearValue('@inputNameEntry')
        this.setValue('@inputNameEntry', change[0].name)
            .clearValue('@inputPhoneEntry')
        this.setValue('@inputPhoneEntry', change[0].phone)
            .clearValue('@inputEmailEntry')
        this.setValue('@inputEmailEntry', change[0].email)
            .clearValue('@inputTitleEntry')
        this.setValue('@inputTitleEntry', change[0].title)
            .click('@confirmationButton')
            .clickByText(change[0].nameTwo)
            .expect.element('#employeeTitle').text.not.equal(change[0].name)
        this
            .clickByText(change[0].name)
            .verify.valueContains('@inputNameEntry', change[0].name)
            .verify.valueContains('@inputPhoneEntry', change[0].phone)
            .verify.valueContains('@inputEmailEntry', change[0].email)
            .verify.valueContains('@inputTitleEntry', change[0].title)
        return this
    },
    verifyErrorMessages: function(data){
        this
            .clickByText(data[0].name)
        this
            .clearValue('@inputNameEntry')
        this.setValue('@inputNameEntry', "MaryMaryMaryMaryMaryMaryMaryMaryMaryMaryMaryMary")
            .clearValue('@inputPhoneEntry')
        this.setValue('@inputPhoneEntry', "MaryMaryMaryMaryMaryMaryMaryMaryMaryMaryMaryMary")
            .clearValue('@inputTitleEntry')
        this.setValue('@inputTitleEntry', "MaryMaryMaryMaryMaryMaryMaryMaryMaryMaryMaryMary")
            .click('@confirmationButton')
            .verify.elementPresent('@invalidInfo')
            .verify.elementPresent('.errorCard')
            .assert.containsText('.errorMessage', 'The name field must be between 1 and 30 characters long.')
            .assert.containsText('.errorMessage', 'The phone number must be 10 digits long.')
            .assert.containsText('.errorMessage', 'The title field must be between 1 and 30 characters long.')
        this
            .click('@cancelButton')
        return this
    },
    deleteEmployee: function (remove) {
        var self = this;
        self
            .clickByText(remove[0].name)
            .clickButtonByText('Delete')
            .api.acceptAlert()
        return this
    },
}
module.exports = {
    url: 'https://devmountain-qa.github.io/employee-manager-v2/build/index.html',
    commands: [testCommands],
    elements: {
        titleText: '.titleText',
        noEmployee: '#noEmployee',
        employeeTitle: '#employeeTitle',
        nameEntry: '[name="nameEntry"]',
        phoneEntry: '[name="phoneEntry"]',
        emailEntry: '[name="emailEntry"]',
        titleEntry: '[name="titleEntry"]',
        inputNameEntry: 'input[name="nameEntry"]',
        inputPhoneEntry: 'input[name="phoneEntry"]',
        inputEmailEntry: 'input[name="emailEntry"]',
        inputTitleEntry: 'input[name="titleEntry"]',
        employeeName: '[name="employeeName"]',
        confirmationButton: '.confirmationButton',
        cancelButton: '.neutralButton',
        addEmployee: '[name="addEmployee"]',
        infoCard: '.infoCard',
        invalidInfo: '.invalidInfo',
        errorCard: '.errorCard',
        errorMessage: '.errorMessage',
        invalidNameInfo: '[name="nameEntry"].invalidInfo',
        invalidTitleInfo: '[name="titleEntry"].invalidInfo',
        employeeID: '#employeeID',
        lastChild: 'li.listText:nth-last-child(2)'
    },
}