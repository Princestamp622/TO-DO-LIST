// =====================================
// Task Manager
// =====================================

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    // Add a new task
    addTask(text) {
        const task = {
            id: Date.now(),
            text: text,
            completed: false
        };

        this.tasks.push(task);
        this.renderTasks();
    }

    // Display all tasks
    renderTasks() {
        const taskList = document.getElementById("task-list");
        const emptyState = document.getElementById("empty-state");

        taskList.innerHTML = "";

        if (this.tasks.length === 0) {
            emptyState.style.display = "block";
        } else {
            emptyState.style.display = "none";

            this.tasks.forEach((task) => {
                const listItem = document.createElement("li");

                listItem.innerHTML = `
                    <span>${task.text}</span>
                `;

                taskList.appendChild(listItem);
            });
        }

        this.updateTaskCount();
    }

    // Update total task count
    updateTaskCount() {
        const taskCount = document.getElementById("task-count");

        taskCount.textContent = `Total Tasks: ${this.tasks.length}`;
    }
}


// =====================================
// Application Setup
// =====================================

const taskManager = new TaskManager();

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        taskManager.addTask(taskText);
        taskInput.value = "";
    }
});