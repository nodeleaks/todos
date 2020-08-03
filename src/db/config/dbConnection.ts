import "reflect-metadata";
import {createConnection} from "typeorm";

export const db = createConnection().then(async connection => {

    // console.log("Inserting a new task into the database...");
    // const task = new Task();
    // task.summary = "Timber";
    // task.description = "Saw";
    // task.status;
    // await connection.manager.save(task);
    // console.log("Saved a new task with id: " + task.id);

    // console.log("Loading users from the database...");
    // const tasks = await connection.manager.find(Task);
    // console.log("Loaded users: ", tasks);

    // console.log("Here you can setup and run express/koa/any other framework.");
    return connection

}).catch(error => console.log(error));
