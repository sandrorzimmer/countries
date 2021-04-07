function getInfo() {
    let url = "https://restcountries.eu/rest/v2/name/";
    let country_name = document.getElementById("country_name_select").value;
    let xhttp = new XMLHttpRequest();

    //Get selected country's information
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(xhttp.response);
            
            let region      = info[0]["region"];
            let name        = info[0]["name"];
            let native_name = info[0]["nativeName"];
            let capital     = info[0]["capital"];
            let languages   = info[0]["languages"];
            let currencies  = info[0]["currencies"];
            let demonym     = info[0]["demonym"];
            let borders     = info[0]["borders"];
            let flag        = info[0]["flag"];

            document.getElementById("country_information").innerHTML = ""; //Clean previous country
            document.getElementById("card_title").innerHTML = name;        //Show country name

            document.getElementById("flag").setAttribute("src", flag);     //Show country flag
            document.getElementById("flag").style.display = "block";       //Show country flag

            writeInformation("Region", "region", region);
            writeInformation("Native name", "native_name", native_name);
            writeInformation("Capital", "capital", capital);
            writeInformation("Demonym", "demonym", demonym);
            writeInformation("Languages", "languages", languages);
            writeInformation("Currencies", "currencies", currencies);
            writeBorders(borders);

            document.getElementById("card").style.display = "block";       //Show country card
        };
    };
    xhttp.open("GET", url + country_name, true);
    xhttp.send();
    return;
}

function buildNamesSelect() {
    let url = "https://restcountries.eu/rest/v2/all";
    let xhttp = new XMLHttpRequest();
    let array_names = [];

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(xhttp.response);

            //Create an array of all country names
            for (let x = 0; x < info.length; x++) {
                let name = info[x]["name"];
                array_names.push(name);
            };
        };

        //Build the select options from country names array
        for (let x = 0; x < array_names.length; x++) {
            let select = document.getElementById("country_name_select"); //Get the <select> element
            let option = array_names[x];                                 //Get a value
            let element = document.createElement("OPTION");              //Create an <option> node
    
            element.textContent = option;                                //Set the text for <option>
            element.value = option;                                      //Set the value for <option>
            select.appendChild(element);                                 //Append <option> to <select>
        };
    };
    xhttp.open("GET", url, true);
    xhttp.send();
    return;
}

function writeInformation(title,list_name,data) {
    //Create item title
    let node_title = document.createElement("H6");
    let textnode_title = document.createTextNode(title);
    node_title.appendChild(textnode_title);
    document.getElementById("country_information").appendChild(node_title);

    //Create info list
    let node_list = document.createElement("UL");
    node_list.id = list_name;
    node_list.className = "list-unstyled";
    document.getElementById("country_information").appendChild(node_list);

    //If info is an array, create list items
    let data_items = [];
    if (typeof data === "object") {
        for (x = 0; x < data.length; x++) {
            let item = data[x]["name"];
            data_items.push(item);

            let node_list_item = document.createElement("LI");
            let textnode_list_item = document.createTextNode(item);
            node_list_item.appendChild(textnode_list_item);
            document.getElementById(list_name).appendChild(node_list_item);
        }
    //If info is a string, create list item
    } else {
        let node_list_item = document.createElement("LI");
        let textnode_list_item = document.createTextNode(data);
        node_list_item.appendChild(textnode_list_item);
        document.getElementById(list_name).appendChild(node_list_item);
    }
    return;
}

function writeBorders(borders_code_array) {
    //Create borders title
    let node_title = document.createElement("H6");
    let textnode_title = document.createTextNode("Borders");
    node_title.appendChild(textnode_title);
    document.getElementById("country_information").appendChild(node_title);

    //Create info list
    let node_list = document.createElement("UL");
    node_list.className = "list-unstyled";
    node_list.id = "borders_list";
    document.getElementById("country_information").appendChild(node_list);

    //Get each border country (3-letter country code)
    for (let x = 0; x < borders_code_array.length; x++) {
        getNameByCode(borders_code_array[x]);
    };
    return;
}

function getNameByCode(code) {
    let url = "https://restcountries.eu/rest/v2/alpha/";
    let xhttp = new XMLHttpRequest();
    let name;

    //Get country's information by 3-letter country code
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(xhttp.response);

            //Add a list item, converting 3-letter country code to country name
            let list_item = document.createElement("li");
            let text_item = document.createTextNode(info["name"]);
            list_item.appendChild(text_item);

            let borders_list = document.getElementById("borders_list");
            borders_list.appendChild(list_item);
        };
    };
    xhttp.open("GET", url + code, true);
    xhttp.send();  
    return;
}

//Build select field when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    buildNamesSelect();
}, false);