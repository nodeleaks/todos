const Sequelize = require('sequelize')
const path = require('path')

const models = [
  'task',
]

class DB {
  constructor(Sequelize) {
    this.Sequelize = Sequelize
  }

  init() {
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
          useUTC: false, // for reading from database
        },
        operatorsAliases,
        // migrationStorageTableName: '_sequelize_meta'
      });

      models.forEach((modelName) => {
        const model = this.sequelize.import(path.join(__dirname, './../common/models/', `${modelName}.js`));
        // let originalModelName = '' + modelName;

        modelName = _.upperFirst(modelName);
        this[modelName] = model;
      });
    } catch (e) {
    console.log('db init error');
    console.log({ e });
  } 

    return undefined;
  }

  close() {
    return this.sequelize.close();
  }
}
module.exports = new DB(Sequelize);