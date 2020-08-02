import Sequelize from 'sequelize'
import task from '../models/task'
// import _ from 'lodash'
import path from 'path'
import fs from 'fs'

      // this.sequelize = new this.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      //   host: process.env.DB_HOST,
      //   port: process.env.DB_PORT,
      //   logging: false, // Disable the logging. It is consuming the time on lambda function.
      //   dialect: 'postgresql',
      //   dialectOptions: {
      //     useUTC: false // for reading from database
      //   },
      //   // Use a different storage type. Default: sequelize
      //   migrationStorage: 'json',

      //   // Use a different file name. Default: sequelize-meta.json
      //   migrationStoragePath: 'sequelizeMeta.json',

      //   // Use a different table name. Default: SequelizeMeta
      //   migrationStorageTableName: 'sequelize_meta'
      // })

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false, // Disable the logging. It is consuming the time on lambda function.
    dialect: 'postgres',
  },
);

const models = {
  Task: require(path.join('src/db/models/task.js')(sequelize, Sequelize.DataTypes))
}

// Object.keys(models).forEach(key => {
//   if ('associate' in models[key]) {
//     models[key].associate(models);
//   }
// });

      // models.forEach((modelName) => {
        // const model = require(path.resolve(__dirname, `${modelName}.js`))(this.sequelize, Sequelize.DataTypes)

      //   modelName = _.upperFirst(modelName)
      //   this[modelName] = model
      // })
      // this.sequelize.sync({force: false});


export {sequelize}
export default models
