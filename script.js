const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

eventListeners();

function eventListeners() {

    //submit event
    form.addEventListener("submit", addNewItem);

    //delete an item
    taskList.addEventListener("click", deleteItem);

    //delete all items
    btnDeleteAll.addEventListener("click", deleteAllItems);

}


//create an item
function createItem(text) {

    //create li
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));

    //create a
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href","#");
    a.innerHTML="<i class='fas fa-times'></i>";

    //add a to li
    li.appendChild(a);

    //add li tol ul
    taskList.appendChild(li);
}


//add new item
function addNewItem(event) {

    if (input.value === "") {
        alert("Add new item!");
    } else {

        //create an item
        createItem(input.value);

        //save to local storage
        setItemToLs(input.value);

        //clear input
        input.value = "";

    }

    

    event.preventDefault();
}


//delete an item
function deleteItem(event) {

    if (event.target.className === "fas fa-times") {
        if (confirm("Are you sure?")) {
            event.target.parentElement.parentElement.remove();
            
            //delete item from local storage
            deleteItemFromLs(e.target.parentElement.parentElement.textContent);
        }
    }

    event.preventDefault();

}

//delete all items
function deleteAllItems(event) {

    if (confirm("Are you sure to delete all items?")) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    
    event.preventDefault();
}


//get items from local storage
function getItemsFromLs(){
    if(localStorage.getItem("items") === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }

    return items;
}


//set item to local storage
function setItemToLs(text){
    items = getItemsFromLs();
    items.push(text);
    localStorage.setItem("items", JSON.stringify(items));
}


//delete item from local storage
function deleteItemFromLs(text){
    items = getItemsFromLs();
    items.forEach(function(item, index){
        if(item == text){
            items.splice(index, 1);
        }
    });

    localStorage.setItem("items", JSON.stringify(items));
}


//load items
function loadItems(){
    items = getItemsFromLs();
    items.forEach(function(item){
        createItem(item);
    });
}