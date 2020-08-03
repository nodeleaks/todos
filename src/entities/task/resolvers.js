export const resolvers = {
  Query: {
    tasks: async (parent, args, context) => {
      console.log(await context.db)
      // const tasks = await context.db.Task.findAll({
      //   order: [['createdAt', 'desc']],
      //   limit: args.limit,
      //   offset: args.offset
      // })

      return tasks
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
