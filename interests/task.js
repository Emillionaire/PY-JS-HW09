const inputList = Array.from(document.getElementsByTagName('input'))

// Start handlers for all checkbox
inputList.forEach(element => element.addEventListener('change', clickHandler))

// Checkbox handler
function clickHandler(e) {
    handlerAbove(e.target)
    handlerBelow(e.target)
    
}

// Handles input one level higher
function handlerAbove(e) {
    // Clicked input
    currentClickInput = e

    // Parent avialable checker
    if (currentClickInput.closest('ul').parentElement.tagName == 'DIV') {
        parentCurrentClickInput = undefined
    } else {
        parentCurrentClickInput = currentClickInput.closest('ul').parentElement.getElementsByTagName('label')[0].children[0]
    }
    
    // Other input in current ul
    siblingCurrentClickInput = Array.from(currentClickInput.closest('ul').getElementsByTagName('input')).filter((e) => e.closest('ul') === currentClickInput.closest('ul'))
    
    // Status checked all input in current ul
    siblingCurrentClickInputCheckboxStatus = Array.from(siblingCurrentClickInput).map(e => e.checked)

    // Check all input in current ul
    let inputTrueAmount = 0
    siblingCurrentClickInputCheckboxStatus.forEach(e => e ? inputTrueAmount++ : e)

    // Checkbox setter for the parent element or nothing
    if (parentCurrentClickInput != undefined) {
        if (inputTrueAmount == siblingCurrentClickInputCheckboxStatus.length) {
            parentCurrentClickInput.checked = true
            parentCurrentClickInput.indeterminate = false
        } else if (inputTrueAmount > 0 || currentClickInput.indeterminate == true) {
            parentCurrentClickInput.checked = true
            parentCurrentClickInput.indeterminate = true
        } else {
            parentCurrentClickInput.checked = false
            parentCurrentClickInput.indeterminate = false
        }

        handlerAbove(parentCurrentClickInput)
    } else {
        // Do nothing becuse no parent
    }
}


// Handles input one level below
function handlerBelow(e) {
        // Clicked input
        currentClickInput = e
        
        // Child input of clicked input
        childCurrentClickInput = Array.from(currentClickInput.closest('li').getElementsByTagName('input')).filter((e) => e.closest('ul') === currentClickInput.closest('li').children[1])
        
        // Checkbox setter for the child element or nothing
        if (childCurrentClickInput.length == 0) {
            // Do nothing because no children
        } else {
            if (currentClickInput.checked == true || (currentClickInput.checked == false && currentClickInput.indeterminate == true)) {
                childCurrentClickInput.forEach(el => el.checked = true)
            } else {
                childCurrentClickInput.forEach(el => el.checked = false)
            }

            childCurrentClickInput.forEach(el => handlerBelow(el))
        }
}