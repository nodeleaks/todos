import Sequelize from 'sequelize'
// import _ from 'lodash'
import path from 'path'
import fs from 'fs'
const basename = path.basename(__filename)

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
        }
        // migrationStorageTableName: '_sequelize_meta'
      })

      fs
        .readdirSync(__dirname)
        .filter(file => {
          return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
        })
        .forEach(file => {
          const model = require(path.join(__dirname, './', file))(this.sequelize, Sequelize.DataTypes)

          this[model.name] = model
        })

      // Object.keys(this).forEach(modelName => {
      //   if (this[modelName].associate) {
      //     this[modelName].associate(this)
      //   }
      // })

      // models.forEach((modelName) => {
      //   const model = require(path.join(__dirname, './../models/', `${modelName}.js`))(this.sequelize, Sequelize.DataTypes)

      //   modelName = _.upperFirst(modelName)
      //   this[modelName] = model
      // })
    } catch (e) {
      console.log('DB INIT ERROR')
      console.log({ e })
    }

    return undefined
  }

  close () {
    return this.sequelize.close()
  }
}

export default new DB(Sequelize)
