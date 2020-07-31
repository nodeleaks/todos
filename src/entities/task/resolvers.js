const resolvers = {
  Query: {
    tasks: async (parent, args, context) => {
      const tasks = await context.db.Task.findAll();

      return tasks;
    }
  },
  Mutation: {
    createTask: async (parent, args, context) => {
      const task = await context.db.Task.create(args)

      return task;
    },

    updateTask: async (parent, args, context) => {

    }
  }
}

module.exports = resolvers;
