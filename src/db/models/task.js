const constants = require('../../constants');

module.exports = (sequelize, type) => {
  const task = sequelize.define('Task', {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    summary: {
      type: type.STRING(500),
      allowNull: false,
    },
    description: {
      type: type.STRING(500),
      allowNull: true,
    },
    status: {
      type: type.ENUM([
        constants.TASK.STATUS.TODO,
        constants.TASK.STATUS.DONE,
      ]),
      allowNull: false,
    },
    createdAt: type.DATE,
    updatedAt: type.DATE,
  });

  return task;
};
