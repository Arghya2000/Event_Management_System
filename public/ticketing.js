document.getElementById("choose_title").selectedIndex = 0; //Option 0

//Get select object
var objSelect = document.getElementById("choose_title");

//Set selected
setSelectedValue(objSelect, "10");

function setSelectedValue(selectObj, valueToSet) {
    for (var i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].text== valueToSet) {
            selectObj.options[i].selected = true;
            return;
        }
    }
}