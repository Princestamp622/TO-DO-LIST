// =====================================
// Task Manager
// =====================================

class TaskManager {
    constructor() {
        this.tasks = [];
        this.editingTaskId = null;
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

                // Check whether this task is currently being edited
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

        // Put the cursor inside the edit box automatically
        if (this.editingTaskId !== null) {
            const editInput = document.querySelector(".edit-input");

            if (editInput) {
                editInput.focus();
                editInput.select();
            }
        }
    }

    // Update total task count
    updateTaskCount() {
        const taskCount = document.getElementById("task-count");

        taskCount.textContent = `Total Tasks: ${this.tasks.length}`;
    }

    // Display an error message
    showError(message) {
        const errorMessage = document.getElementById("error-message");

        errorMessage.textContent = message;
    }

    // Clear the error message
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
// Task Completion
// =====================================

taskList.addEventListener("change", (event) => {
    if (event.target.classList.contains("complete-checkbox")) {
        const taskId = Number(event.target.dataset.id);

        taskManager.toggleTask(taskId);
    }
});


// =====================================
// Task Buttons
// =====================================

taskList.addEventListener("click", (event) => {

    // Edit button
    if (event.target.classList.contains("edit-button")) {
        const taskId = Number(event.target.dataset.id);

        taskManager.startEditing(taskId);
    }

    // Save button
    if (event.target.classList.contains("save-button")) {
        const taskId = Number(event.target.dataset.id);
        const editInput = document.querySelector(".edit-input");

        if (editInput) {
            taskManager.saveEdit(taskId, editInput.value);
        }
    }

    // Cancel button
    if (event.target.classList.contains("cancel-button")) {
        taskManager.cancelEdit();
    }

    // Delete button
    if (event.target.classList.contains("delete-button")) {
        const taskId = Number(event.target.dataset.id);

        taskManager.deleteTask(taskId);
    }
});


// =====================================
// Initial Display
// =====================================

taskManager.renderTasks();