import { Task } from "../Models/Task.js";
import { randomUUID } from 'node:crypto';

const taskModel = new Task();

export class TasksController{

    selectAll(request,response){
        const { search } = request.query;

        const tasks = taskModel.select('tasks', search ? {
            title:search,
            description:search
        }: null);

        return response.end(JSON.stringify(tasks));
    }

    create(request, response){
        const {title,description} = request.body;

        if (!title.trim() || !description.trim()) {
            return response.writeHead(400).end(
              JSON.stringify({ message: 'title or description are required' })
            )
          }

        const task = {
            id:randomUUID(),
            title,
            description,
            completed_at:null,
            created_at: new Date(),
            updated_at: new Date()
        }

        taskModel.insert('tasks',task);

        return response.writeHead(201).end();
    }

    updateTask(request, response){
        const{id} = request.params;
        const{title,description} = request.body;

        const taskExist = taskModel.verifyId('tasks', id);
        
        if(!taskExist){
            return response.writeHead(404).end();
        }

        if (!title.trim() || !description.trim()) {
            return response.writeHead(400).end(
              JSON.stringify({ message: 'title or description are required' })
            )
          }
        
        taskModel.update('tasks',id, {title,description})
        return response.writeHead(204).end();
    }

    deleteTask(request, response){
        const { id } = request.params;
        const taskExist = taskModel.verifyTaskId('tasks', id);

        if(!taskExist){
            return response.writeHead(404).end();
        }
        taskModel.delete('tasks',id);
        return response.writeHead(204).end();
    }

    completeTask(request,response){
        const { id } = request.params;
        const taskExist = taskModel.verifyTaskId('tasks', id);
        
        if(!taskExist){
            return response.writeHead(404).end();
        }

        const taskCompleted = !!taskExist.completed_at;
        const completed_at = taskCompleted ? null : new Date();


        taskModel.update('tasks',id, {completed_at});

        return response.writeHead(204).end();

    }
}