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

    // Mark a task as completed or pending
    toggleTask(id) {
        const task = this.tasks.find((task) => task.id === id);

        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
        }
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

                if (task.completed) {
                    listItem.classList.add("completed");
                }

                listItem.innerHTML = `
                    <input
                        type="checkbox"
                        class="complete-checkbox"
                        data-id="${task.id}"
                        ${task.completed ? "checked" : ""}
                    >

                    <span class="task-text">${task.text}</span>

                    <button class="edit-button" type="button">
                        Edit
                    </button>

                    <button class="delete-button" type="button">
                        Delete
                    </button>
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

// Add a new task when the form is submitted
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        taskManager.addTask(taskText);
        taskInput.value = "";
    }
});


// =====================================
// Task Completion
// =====================================

document.getElementById("task-list").addEventListener("change", (event) => {
    if (event.target.classList.contains("complete-checkbox")) {
        const taskId = Number(event.target.dataset.id);

        taskManager.toggleTask(taskId);
    }
});