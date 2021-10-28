"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const config_1 = __importDefault(require("config"));
const typeorm_1 = require("typeorm");
let connection = null;
const connectDb = () => {
    // Initialize DB Config
    connection = (0, typeorm_1.createConnection)({
        type: 'postgres',
        host: config_1.default.get('DATABASE_HOST'),
        port: config_1.default.get('DATABASE_PORT'),
        username: config_1.default.get('DATABASE_USER'),
        password: config_1.default.get('DATABASE_PASSWORD'),
        database: config_1.default.get('DATABASE_NAME'),
    }).then(() => {
        console.log('Connection has been established successfully.');
    }, (error) => {
        console.log('Unable to connect to the database', error);
    });
    return connection;
};
exports.connectDb = connectDb;
