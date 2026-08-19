# To-Do List Application

## Project Description

The To-Do List Application is a responsive web application designed to help users manage their daily tasks.

Users will be able to add, view, complete, edit, and delete tasks. The application will also display the total number of tasks and save task information using the browser's Local Storage.

The application is being developed as a practical programming assessment project using HTML5, CSS3, Vanilla JavaScript, Git, and GitHub.

---

## Requirements

The application must allow users to:

1. Add new tasks.
2. View all tasks.
3. Mark tasks as completed.
4. Edit existing tasks.
5. Delete tasks.
6. View the total number of tasks.
7. Save tasks using Local Storage.
8. Prevent empty or spaces-only tasks.
9. Work properly on desktop, tablet, and mobile devices.
10. Provide a clear, modern, and attractive user interface.

---

## Planned Features

### Add Task

Users will enter a task into an input field and click the Add button.

### Display Tasks

All saved tasks will appear clearly in the task list.

Each task will contain:

- Task text
- Completion control
- Edit button
- Delete button

### Complete Task

Users will be able to mark a task as completed.

Completed tasks will have a different visual appearance, including:

- Strikethrough text
- Reduced opacity
- Different background styling

### Edit Task

Users will be able to edit an existing task.

The application will prevent an edited task from being saved if the new text is empty.

### Delete Task

Users will be able to delete tasks.

After deletion, the task count and Local Storage will be updated.

### Task Counter

The application will display the current number of tasks.

Example:

**Total Tasks: 5**

The number will update automatically whenever tasks are added or deleted.

### Local Storage

Tasks will be saved using the browser's Local Storage.

Tasks should remain available after the browser page is refreshed.

### Input Validation

The application will reject:

- Empty input
- Input containing only spaces

A clear validation message will be displayed.

---

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Browser Local Storage
- Git
- GitHub

No JavaScript frameworks will be used.

---

## Planned JavaScript Structure

The application will use a JavaScript class called:

### TaskManager

The `TaskManager` class will manage the application's tasks and functionality.

Planned methods include:

- `addTask()`
- `deleteTask()`
- `editTask()`
- `toggleTask()`
- `saveTasks()`
- `loadTasks()`
- `renderTasks()`
- `updateTaskCount()`
- `validateTask()`

The exact implementation may be adjusted during development while keeping the code simple and easy to understand.

---

## Task Data Structure

Each task will contain three main properties:

- `id`
- `text`
- `completed`

Example:

```javascript
{
    id: unique identifier,
    text: "Complete JavaScript assignment",
    completed: false
}