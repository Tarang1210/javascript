var TodoListApp = (function() {
    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    
    var a = 10;
    //console.log('Working');
    
    async function fetchTodos(){
        //Get request
        // fetch('https://jsonplaceholder.typicode.com/todos')
        //     .then(function(response){
        //         console.log(response);
        //         return response.json();
        //     }).then(function(data){
        //         console.log(data);
        //         tasks = data.slice(0,15);
        //         renderList();
        //     }).catch(function(error){
        //         console.log(error);
        //     })
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.slice(0,10);
            renderList();
        }
        catch(error){
            console.log(error);
        }
        
    }
    
    function addTaskToDOM(task){
        const li = document.createElement('li');
    
        li.innerHTML = `
                <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
                <label for="${task.id}">${task.title}</label>
                <img src="bin.png" class="delete" data-id="${task.id}" />
            `;
            taskList.append(li);
    
        }
    
    function renderList () {
        taskList.innerHTML = '';
        for(let i = 0; i < tasks.length; i++){
            addTaskToDOM(tasks[i]);
        }
    
        tasksCounter.innerHTML = tasks.length;
    }
    
    function toggleTask (taskId) {
        const task = tasks.filter(function(task){
            return task.id === Number(taskId);
        });
    
        if(task.length > 0){
            const currentTask = task[0];
    
            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification('Task toggled successfully');
            return;
        }
            showNotification('Could not toggled the task');
    }
    
    function deleteTask (taskId) {
        const newTasks = tasks.filter(function(task){
            return task.id !== Number(taskId);
        });
        tasks = newTasks;
        renderList();
        showNotification("Task Deleted Successfully");
    }
    
    function addTask (task) {
        if(task){
            tasks.push(task);
            renderList();
            showNotification("Task added successfully!");
            return;
        }
        showNotification("Task can not be added")
    }
    
    function showNotification(text) {
        alert(text);
    }
    
    function handleInputKeyPress(e) {
        if(e.key == 'Enter'){
            const text = e.target.value;
            console.log(text);
    
            if(!text){
                showNotification('Task text can not be empty');
                return;
            }
    
            const task = {
                title : text,
                id: Date.now(),
                completed:false 
            }
        
            e.target.value = '';
            addTask(task);
        }   
    }
    
    function handleClickListener(e){
        const target = e.target
        //console.log(target);
        if(target.className === 'delete'){
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
    
        } else if(target.className === 'custom-checkbox'){
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    }
    
    function initializeApp(){
        fetchTodos();
        addTaskInput.addEventListener('keyup',handleInputKeyPress);
        document.addEventListener('click',handleClickListener);     
    }
    
    return {
        initialize: initializeApp ,
        a: a
    } 
    
    })()


