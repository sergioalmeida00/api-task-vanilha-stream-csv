import { TasksController } from "./Controller/TasksController.js";
import { buildRoutePath } from "./Utils/build-route-path.js";

const tasksController = new TasksController();

export const routes = [
    {
        endpoint:buildRoutePath('/tasks'),
        method:'POST',
        handler:tasksController.create
    },
    {
        endpoint:buildRoutePath('/tasks'),
        method:'GET',
        handler:tasksController.selectAll
    },
    {
        endpoint:buildRoutePath('/tasks/:id'),
        method:'PUT',
        handler:tasksController.updateTask
    },
    {
        endpoint:buildRoutePath('/tasks/:id'),
        method:'DELETE',
        handler:tasksController.deleteTask
    },
    {
        endpoint:buildRoutePath('/tasks/:id/complete'),
        method:'PATCH',
        handler:tasksController.completeTask
    }
]