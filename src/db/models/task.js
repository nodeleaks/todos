import constants from '../../constants'

const task = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM([
        constants.TASK.STATUS.TODO,
        constants.TASK.STATUS.DONE
      ]),
      allowNull: false,
      defaultValue: constants.TASK.STATUS.TODO
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  return Task
}

export { task }
