const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


//HTML CLASSES
 const CHECK = "fa-check-circle";
 const UNCHECK = 'fa-circle-thin';
 const LINE_THROUGH = "lineThrough";
let LIST;
let id;

//gettin data from local storage

let data = localStorage.getItem("TODO");

if(data){
    LIST =JSON.parse(data);
    numberofelement = LIST.length;
    loadList(LIST, numberofelement);
}else {
    LIST = [];
}

function loadList(LIST){
    LIST.forEach(element => {
        addToDO(element.name, element.id, element.done, element.trash);
    });
}
//date
const options = {  weekday: "long",
                    month: "short",
                    day: "numeric"
                };
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);


function addToDO(todo, id, done, trash) {
    if(trash){
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : " ";
    const item = `
                    <li class="item">
                    <i class="fa ${DONE} co" job="complete" id=${id}></i>
                    <p class="text ${LINE}">${todo}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                     </li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);

    
    
}

document.addEventListener("keyup", function(evt){
    if(evt.keyCode === 13){
        const todo = input.value;
        if(todo){
            addToDO(todo, id, false, false);
            LIST.push({
                "name": todo,
                "id": id,
                "done": false,
                "trash": false
            })
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
            input.value = "";

        }
    }
})

function completeTODO(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.nextElementSibling.classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? true : false;
}

// not deleting from local storage just not rendering it
function removeTODO(element) {
    console.log(element.parentNode);
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
list.addEventListener("click", function (evt){
    const element = evt.target;

    let elementJob;
    elementJob = element.attributes.job.value;
    
   
    if(elementJob === "complete") {
        completeTODO(element);
    }
    else if(elementJob === "delete") {
        removeTODO(element);
    }
})

// Refresh the list i.e.. deleting from local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})