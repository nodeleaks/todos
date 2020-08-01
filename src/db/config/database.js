import {Sequelize} from 'sequelize'
import _ from 'lodash'
import path from 'path'

const models = [
  'task'
]

class DB {
  constructor (SequelizeClass) {
    this.Sequelize = SequelizeClass
  }

  init () {
    if (this.sequelize) {
      return this.sequelize
    }

    try {
      this.sequelize = new this.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: false, // Disable the logging. It is consuming the time on lambda function.
        dialect: 'postgresql',
        dialectOptions: {
          useUTC: false // for reading from database
        },
        // Use a different storage type. Default: sequelize
        migrationStorage: 'json',

        // Use a different file name. Default: sequelize-meta.json
        migrationStoragePath: 'sequelizeMeta.json',

        // Use a different table name. Default: SequelizeMeta
        migrationStorageTableName: 'sequelize_meta'
      })

      models.forEach((modelName) => {
        const model = require(path.resolve(__dirname, `${modelName}.js`))(this.sequelize, Sequelize.DataTypes)

        modelName = _.upperFirst(modelName)
        this[modelName] = model
      })
      // this.sequelize.sync({force: false});
    } catch (e) {
      console.log('db init error')
      console.log({ e })
    }

    return undefined
  }

  close () {
    return this.sequelize.close()
  }
}
export default new DB(Sequelize)
