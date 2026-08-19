# To-Do List Application

## Project Description

The To-Do List Application is a simple web application designed to help users manage their daily tasks.

Users can add, view, complete, edit, and delete tasks. The application also keeps tasks saved in the browser using Local Storage, so tasks remain available after refreshing the page.

The application is designed to be simple enough for students and everyday users while providing a clean, modern, responsive interface.

---

## Project Requirements

The application was developed to meet the following requirements:

1. Users can add new tasks.
2. Users can view all saved tasks.
3. Users can mark tasks as completed.
4. Users can edit existing tasks.
5. Users can delete tasks.
6. Users can see the total number of tasks.
7. Tasks are saved using Browser Local Storage.
8. Empty or spaces-only tasks are rejected.
9. The application works on desktop, tablet, and mobile screens.
10. The application handles invalid input without crashing.

---

## Features

### Add Tasks

Users can enter a task and click the Add button to create a new task.

### Display Tasks

All tasks are displayed clearly in the task list.

### Complete Tasks

Users can click the checkbox beside a task to mark it as completed.

Completed tasks receive a different visual appearance and remain completed after refreshing the browser.

### Edit Tasks

Users can click Edit to change the text of an existing task.

The application provides Save and Cancel options.

Empty edited tasks are not allowed.

### Delete Tasks

Users can remove tasks using the Delete button.

The task counter and Local Storage are updated automatically.

### Task Counter

The application displays the total number of tasks.

For example:

`Total Tasks: 5`

The counter automatically updates when tasks are added or deleted.

### Local Storage

Tasks are stored in the browser using Local Storage.

This means tasks remain available after refreshing the page.

### Input Validation

The application prevents users from adding:

- Empty tasks
- Spaces-only tasks
- Empty edited tasks

A clear error message is displayed when invalid input is entered.

### Responsive Design

The application is designed to work on:

- Desktop
- Tablet
- Mobile devices

---

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Browser Local Storage
- Git
- GitHub

No JavaScript frameworks were used.

---

## JavaScript Structure

The application uses a JavaScript class called `TaskManager`.

The class manages the application's tasks and includes methods such as:

- `addTask()`
- `toggleTask()`
- `startEditing()`
- `saveEdit()`
- `cancelEdit()`
- `deleteTask()`
- `saveTasks()`
- `loadTasks()`
- `renderTasks()`
- `updateTaskCount()`
- `showError()`
- `clearError()`

The application uses an array of task objects.

Each task contains:

- `id`
- `text`
- `completed`

Example:

```javascript
{
    id: 123456789,
    text: "Study JavaScript",
    completed: false
}