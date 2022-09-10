import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterData: GetTaskFilterDto): Task[] {
    const { status, search } = filterData;
    let task = this.getAllTasks();
    if (status) {
      task = task.filter((task) => task['status'] === status);
    }
    if (search) {
      task = task.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return task;
        }
      });
    }
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): { message: string } {
    this.tasks = this.tasks.filter((ele) => ele['id'] !== id);
    return { message: `Task id:${id} Deleted` };
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const find_task = this.tasks.findIndex((ele) => ele['id'] === id);
    this.tasks[find_task]['status'] = TaskStatus[status];
    return { message: 'Task Updated' };
  }

  createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
