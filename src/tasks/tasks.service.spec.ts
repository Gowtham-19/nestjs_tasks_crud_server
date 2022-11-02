/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { ConfigService } from '@nestjs/config';


describe('Task Controller', () => {
    let taskController: TasksController;
    let taskService: TasksService;
    let taskRepository:Repository<Task>
    let configService:ConfigService
    beforeEach(() => {
     taskService = new TasksService(taskRepository);
      taskController = new TasksController(taskService,configService);
    });
  
    describe('findAll', () => {
      it('should return an array of Tasks', async () => {
        const result:Task[]=[{id:"fgfgfg-gfgdg",title:"desc",description:"test_desc",status:"open",user:[{id:"22a5387b-5889-4fb3-a50e-823d7646f3d2",username:"test2"}]}] 
        
        jest.spyOn(taskService, 'getTasks').mockResolvedValue(result);
  
        expect(await taskController.getTasks(null,{id:"22a5387b-5889-4fb3-a50e-823d7646f3d2",username:"test2",password:"Abcd@1234",task:[]})).toBe(result);
      });
    });
    
  });