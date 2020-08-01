(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./handler.js":
/*!********************!*\
  !*** ./handler.js ***!
  \********************/
/*! exports provided: api */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "api", function() { return api; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_db_config_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/db/config/database */ "./src/db/config/database.js");
/* harmony import */ var _src_commonTypeDef__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/commonTypeDef */ "./src/commonTypeDef.js");
/* harmony import */ var _src_entities_task__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/entities/task */ "./src/entities/task/index.js");






__webpack_require__(/*! dotenv */ "dotenv").config();

const schema = Object(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1__["makeExecutableSchema"])({
  typeDefs: [_src_commonTypeDef__WEBPACK_IMPORTED_MODULE_3__["default"], _src_entities_task__WEBPACK_IMPORTED_MODULE_4__["typeDef"]],
  resolvers: [_src_entities_task__WEBPACK_IMPORTED_MODULE_4__["resolvers"]],
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});
const server = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1__["ApolloServer"]({
  schema,
  formatError: err => {
    let newError = null;

    if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
      newError = {
        key: err.path,
        message: err.message
      };
    }

    return newError || err;
  },
  context: async ({
    event,
    context
  }) => {
    _src_db_config_database__WEBPACK_IMPORTED_MODULE_2__["default"].init();
    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      db: _src_db_config_database__WEBPACK_IMPORTED_MODULE_2__["default"]
    };
  }
});
const api = (event, context, callback) => {
  const handler = server.createHandler({
    cors: {
      origin: '*'
    }
  });
  return handler(event, context, callback);
};

/***/ }),

/***/ "./src/commonTypeDef.js":
/*!******************************!*\
  !*** ./src/commonTypeDef.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);


const {
  gql
} = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");

const commonTypeDef = gql`

scalar DateTime

  type Query{
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (commonTypeDef);

/***/ }),

/***/ "./src/db/config sync recursive":
/*!****************************!*\
  !*** ./src/db/config sync ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./src/db/config sync recursive";

/***/ }),

/***/ "./src/db/config/database.js":
/*!***********************************!*\
  !*** ./src/db/config/database.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);


const Sequelize = __webpack_require__(/*! sequelize */ "sequelize");

const _ = __webpack_require__(/*! lodash */ "lodash");

const path = __webpack_require__(/*! path */ "path");

const models = ['task'];

class DB {
  constructor(SequelizeClass) {
    this.Sequelize = SequelizeClass;
  }

  init() {
    if (this.sequelize) {
      return this.sequelize;
    }

    try {
      this.sequelize = new this.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: false,
        // Disable the logging. It is consuming the time on lambda function.
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
      });
      models.forEach(modelName => {
        const model = __webpack_require__("./src/db/config sync recursive")(path.resolve(__dirname, `${modelName}.js`))(this.sequelize, Sequelize.DataTypes);

        modelName = _.upperFirst(modelName);
        this[modelName] = model;
      }); // this.sequelize.sync({force: false});
    } catch (e) {
      console.log('db init error');
      console.log({
        e
      });
    }

    return undefined;
  }

  close() {
    return this.sequelize.close();
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new DB(Sequelize));

/***/ }),

/***/ "./src/entities/task/index.js":
/*!************************************!*\
  !*** ./src/entities/task/index.js ***!
  \************************************/
/*! exports provided: resolvers, typeDef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolvers */ "./src/entities/task/resolvers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return _resolvers__WEBPACK_IMPORTED_MODULE_1__["resolvers"]; });

/* harmony import */ var _typeDef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./typeDef */ "./src/entities/task/typeDef.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "typeDef", function() { return _typeDef__WEBPACK_IMPORTED_MODULE_2__["typeDef"]; });





/***/ }),

/***/ "./src/entities/task/resolvers.js":
/*!****************************************!*\
  !*** ./src/entities/task/resolvers.js ***!
  \****************************************/
/*! exports provided: resolvers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

const resolvers = {
  Query: {
    tasks: async (parent, args, context) => {
      const tasks = await context.db.Task.findAll({
        order: [['createdAt', 'desc']],
        limit: args.limit,
        offset: args.offset
      });
      return tasks;
    }
  },
  Mutation: {
    createTask: async (parent, args, context) => {
      const task = await context.db.Task.create(args);
      return task;
    },
    updateTask: async (parent, args, context) => {
      const task = await context.db.Task.findByPk(args.id);

      if (!task) {
        return new Error('Task does not exist');
      }

      await task.update(args);
      return task;
    },
    deleteTask: async (parent, args, context) => {
      const task = await context.db.Task.findByPk(args.id);

      if (!task) {
        return new Error('Task does not exist');
      }

      await task.destroy();
      return true;
    }
  }
};

/***/ }),

/***/ "./src/entities/task/typeDef.js":
/*!**************************************!*\
  !*** ./src/entities/task/typeDef.js ***!
  \**************************************/
/*! exports provided: typeDef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDef", function() { return typeDef; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1__);


const typeDef = apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1__["gql"]`
  
  type Task {
    id: ID,
    summary: String,
    description: String,
    status: StatusEnum
    createdAt: DateTime,
    updatedAt: DateTime
  }

  enum StatusEnum {
    todo
    done
  }

  extend type Mutation {
    createTask (
      summary: String!,
      description: String,
      status: StatusEnum
    ): Task  

    updateTask (
      id: ID!,
      status: StatusEnum!
    ): Task

    deleteTask (
      id: ID!
    ): Boolean
  }

  extend type Query {
    tasks (limit: Int, offset: Int): [Task]
  }
  
`;

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ })

/******/ })));
//# sourceMappingURL=handler.js.map