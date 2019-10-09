var employeePractice = {}
require('../testAssets/employeeManagerData')
/**
/**
 * Clicks an element whose text equals the `text` parameter - element must have a unique text value.
 * @param {object} browser - `browser`/`client` in use
 * @param {string} text - the text of the element that should be clicked
 */
module.exports = {
    beforeEach: browser => {
        employeePractice = browser.page.employeeManagerObject()
        employeePractice.navigate()
    },
    'Testing if "New Employee" exists then change information, else create a "New Employee"': browser => {
        employeePractice
            .getText('@lastChild', function( result){
                if(result.value == "New Employee"){
                    employeePractice.changeEmployee(result.value, newData)
                }
                else {
                    employeePractice.createEmployee(newData)
                }
            })
    },
    'Testing error messages': browser => {
        employeePractice
            .verifyErrorMessages(newData)
    },
    'Delete an Employee': browser => {
        employeePractice
            .deleteEmployee(deleteData)
    }
}