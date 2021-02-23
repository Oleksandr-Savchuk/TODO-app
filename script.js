// Variables:
let id = 0;
const taskList = document.querySelector('#list');

// Class UI:
class UI{
    //Display tasks:
    static displayTask(){
        const tasks = Store.gettasks();
        tasks.forEach((todo) => UI.addTaskToList(todo.text, todo.id, todo.completed));
    }

    //Add task to list:
    static addTaskToList(toDo, id, ifChecked){
        // 
        const completed = ifChecked ? 'doneLine' : '';
        const status = ifChecked ? 'fa-check-square' : 'fa-square';
        const liItem = `<li>
        <p class="text ${completed}">${toDo}</p>
        <i class="far ${status} co" action="complete" id="${id}"></i>
        <i class="fas fa-trash-alt" action="delete" id="${id}"></i>
        </li>`;
        const position = "beforeend";
        list.insertAdjacentHTML(position, liItem);
    }

    //Delete the element:
    static deleteTask(element){
        //Delete item from UI:
        element.parentNode.parentNode.removeChild(element.parentNode);
        
        //Get value of the current id and remove it from storage:
        const currentId = element.attributes.id.value;
        const tasks = Store.gettasks();
        tasks.forEach((todo, index) => {
            if(+todo.id === +currentId){
                tasks.splice(index, 1);
            }
        });

        localStorage.setItem('toDo', JSON.stringify(tasks));
    }

    //Complete element
    static completeTask(element){
        const Done = "fa-check-square";
        const Undone = "fa-square";
        element.classList.toggle(Done);
        element.classList.toggle(Undone);
        element.parentNode.querySelector(".text").classList.toggle("doneLine");

        //Update the storage data:
        const currentId = element.attributes.id.value;
        const tasks = Store.gettasks();
        tasks.forEach((todo, index) => {
            if(+todo.id === +currentId){
                tasks[index].completed = tasks[index].completed ? false : true;
            }
        });

        localStorage.setItem('toDo', JSON.stringify(tasks));
    }

    //Clear all the list items:
    static clearToDo(){
        list.innerHTML = '';
        localStorage.clear();
    }
}

//Class for storing:
class Store{
    static gettasks(){
        let tasks;
        if(localStorage.getItem('toDo') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('toDo'));
        }
        return tasks;
    }

    static addTaskToList(toDo, id){

        const tasks = Store.gettasks();

        tasks.push({text: toDo, id: id, completed: false});

        localStorage.setItem('toDo', JSON.stringify(tasks));
    }
}

// Event for task displaying:
document.addEventListener('DOMContentLoaded', UI.displayTask);

//If press Enter then call, add new task from UI:
document.addEventListener("keydown", function(ent_btn){
    if(ent_btn.key == "Enter"){
        const taskItem = input.value;
        //Validation part:
        if(taskItem){
            //Add task to UI:
            UI.addTaskToList(taskItem);

            //Add task to a loclal storage:
            Store.addTaskToList(taskItem);

            //Increment id:
            id++;
        }
        input.value = "";
    }
});

//Method for checking and removing list items:
list.addEventListener("click", (event) => {
    
    const element = event.target;
    if(element.attributes.action){
        const elementAction = element.attributes.action.value;
        if(elementAction == "complete"){
            UI.completeTask(element);
        }else if(elementAction == "delete"){
            UI.deleteTask(element);
        }
    }
    
});
