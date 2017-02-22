import { Component } from '@angular/core';

import { Task } from './model/task';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.css' ]
})

export class AppComponent {
    private tasks: Task[] = [];

    private currentTask = new Task(null, false);

    private addTask() {
        // Create local instance of task containing current task content and isCompleted values.
        let task = new Task(this.currentTask.content, this.currentTask.isCompleted);

        // Push to the tasks array.
        this.tasks.push(task);

        // Clear the input field
        this.currentTask.content = null;
    }
 }