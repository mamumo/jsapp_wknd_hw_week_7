
window.onload = function () {
    var url = 'http://hp-api.herokuapp.com/api/characters'
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            var jsonString = request.responseText;
            var hpcharacters = JSON.parse(jsonString);
            main(hpcharacters);
        }
    }
    request.send();

};

var main = function (hpcharacters) {
    populateSelect(hpcharacters);
    var cached = localStorage.getItem("selectedCharacter");
    var selected = hpcharacters[0];
    if(cached){
        selected = JSON.parse(cached);
        document.querySelector('#hpcharacters').selectedIndex = selected.index;
    }
    updateDisplay(selected);
    document.querySelector('#info').style.display = 'block';
}

var populateSelect = function (hpcharacters) {
    var parent = document.querySelector('#hpcharacters');
    hpcharacters.forEach(function (item, index) {
        item.index = index;
        var option = document.createElement("option");
        option.value = index.toString();
        option.text = item.name;
        parent.appendChild(option);
    });
    parent.style.display = 'block';
    parent.addEventListener('change', function (e) {
        var index = this.value;
        var character = hpcharacters[index];
        updateDisplay(character);
        localStorage.setItem("selectedCharacter",JSON.stringify(character));
    });
}