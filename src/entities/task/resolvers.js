import {Task} from "../../models/Task";

export const resolvers = {
  Query: {
    tasks: async (parent, args, context) => {
      console.log(await context);
      // const tasks = await context.db.connection.manager.find(Task)
        // order: [['createdAt', 'desc']],
        // limit: args.limit,
        // offset: args.offset
      // })

      // return tasks
    }
  },
  Mutation: {
    createTask: async (parent, args, context) => {
      const task = await context.db.Task.create(args)

      return task
    },

    updateTask: async (parent, args, context) => {
      const task = await context.db.Task.findByPk(args.id)

      if (!task) {
        return new Error('Task does not exist')
      }

      await task.update(args)
      return task
    },

    deleteTask: async (parent, args, context) => {
      const task = await context.db.Task.findByPk(args.id)

      if (!task) {
        return new Error('Task does not exist')
      }

      await task.destroy()
      return true
    }
  }
}
