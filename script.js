// =====================================
// Task Manager
// =====================================

class TaskManager {
    constructor() {
        this.tasks = [];
        this.editingTaskId = null;

        // Load saved tasks when the application starts
        this.loadTasks();
    }

    // Add a new task
    addTask(text) {
        const task = {
            id: Date.now(),
            text: text,
            completed: false
        };

        this.tasks.push(task);

        this.saveTasks();
        this.renderTasks();
    }

    // Mark a task as completed or pending
    toggleTask(id) {
        const task = this.tasks.find((task) => task.id === id);

        if (task) {
            task.completed = !task.completed;

            this.saveTasks();
            this.renderTasks();
        }
    }

    // Start editing a task
    startEditing(id) {
        const task = this.tasks.find((task) => task.id === id);

        if (task) {
            this.editingTaskId = id;
            this.renderTasks();
        }
    }

    // Save an edited task
    saveEdit(id, newText) {
        const task = this.tasks.find((task) => task.id === id);

        if (!task) {
            return;
        }

        const trimmedText = newText.trim();

        if (trimmedText === "") {
            this.showError("Please enter a task.");
            return;
        }

        task.text = trimmedText;

        this.editingTaskId = null;

        this.saveTasks();
        this.clearError();
        this.renderTasks();
    }

    // Cancel editing
    cancelEdit() {
        this.editingTaskId = null;

        this.clearError();
        this.renderTasks();
    }

    // Delete a task
    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);

        if (this.editingTaskId === id) {
            this.editingTaskId = null;
        }

        this.saveTasks();
        this.renderTasks();
    }

    // Save tasks to Local Storage
    saveTasks() {
        localStorage.setItem("todoTasks", JSON.stringify(this.tasks));
    }

    // Load tasks from Local Storage
    loadTasks() {
        const savedTasks = localStorage.getItem("todoTasks");

        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
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

                // Checkbox
                const checkbox = document.createElement("input");

                checkbox.type = "checkbox";
                checkbox.className = "complete-checkbox";
                checkbox.dataset.id = task.id;
                checkbox.checked = task.completed;

                listItem.appendChild(checkbox);

                // Editing mode
                if (this.editingTaskId === task.id) {
                    const editInput = document.createElement("input");

                    editInput.type = "text";
                    editInput.className = "edit-input";
                    editInput.value = task.text;
                    editInput.dataset.id = task.id;

                    const saveButton = document.createElement("button");

                    saveButton.type = "button";
                    saveButton.className = "save-button";
                    saveButton.dataset.id = task.id;
                    saveButton.textContent = "Save";

                    const cancelButton = document.createElement("button");

                    cancelButton.type = "button";
                    cancelButton.className = "cancel-button";
                    cancelButton.dataset.id = task.id;
                    cancelButton.textContent = "Cancel";

                    listItem.appendChild(editInput);
                    listItem.appendChild(saveButton);
                    listItem.appendChild(cancelButton);

                } else {
                    // Normal task display
                    const taskText = document.createElement("span");

                    taskText.className = "task-text";
                    taskText.textContent = task.text;

                    const editButton = document.createElement("button");

                    editButton.type = "button";
                    editButton.className = "edit-button";
                    editButton.dataset.id = task.id;
                    editButton.textContent = "Edit";

                    const deleteButton = document.createElement("button");

                    deleteButton.type = "button";
                    deleteButton.className = "delete-button";
                    deleteButton.dataset.id = task.id;
                    deleteButton.textContent = "Delete";

                    listItem.appendChild(taskText);
                    listItem.appendChild(editButton);
                    listItem.appendChild(deleteButton);
                }

                taskList.appendChild(listItem);
            });
        }

        this.updateTaskCount();

        // Automatically focus the edit input
        if (this.editingTaskId !== null) {
            const editInput = document.querySelector(".edit-input");

            if (editInput) {
                editInput.focus();
                editInput.select();
            }
        }
    }

    // Update task counter
    updateTaskCount() {
        const taskCount = document.getElementById("task-count");

        taskCount.textContent = `Total Tasks: ${this.tasks.length}`;
    }

    // Display an error message
    showError(message) {
        const errorMessage = document.getElementById("error-message");

        errorMessage.textContent = message;
    }

    // Clear error message
    clearError() {
        const errorMessage = document.getElementById("error-message");

        errorMessage.textContent = "";
    }
}


// =====================================
// Application Setup
// =====================================

const taskManager = new TaskManager();

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");


// =====================================
// Add Task
// =====================================

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        taskManager.showError("Please enter a task.");
        return;
    }

    taskManager.clearError();

    taskManager.addTask(taskText);

    taskInput.value = "";
});


// =====================================
// Complete Task
// =====================================

taskList.addEventListener("change", (event) => {
    if (event.target.classList.contains("complete-checkbox")) {
        const taskId = Number(event.target.dataset.id);

        taskManager.toggleTask(taskId);
    }
});


// =====================================
// Edit and Delete Buttons
// =====================================

taskList.addEventListener("click", (event) => {

    // Edit
    if (event.target.classList.contains("edit-button")) {
        const taskId = Number(event.target.dataset.id);

        taskManager.startEditing(taskId);
    }

    // Save edited task
    if (event.target.classList.contains("save-button")) {
        const taskId = Number(event.target.dataset.id);

        const editInput = document.querySelector(".edit-input");

        if (editInput) {
            taskManager.saveEdit(taskId, editInput.value);
        }
    }

    // Cancel editing
    if (event.target.classList.contains("cancel-button")) {
        taskManager.cancelEdit();
    }

    // Delete
    if (event.target.classList.contains("delete-button")) {
        const taskId = Number(event.target.dataset.id);

        taskManager.deleteTask(taskId);
    }
});


// =====================================
// Display Tasks
// =====================================

taskManager.renderTasks();