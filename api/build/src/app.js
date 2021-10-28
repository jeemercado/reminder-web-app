"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const express_1 = __importDefault(require("express"));
const connect_1 = require("./utils/connect");
const SERVER_PORT = config_1.default.get('SERVER_PORT');
const app = (0, express_1.default)();
const handleOnListen = () => {
    console.log(`Server is now running. Listening in port ${SERVER_PORT}`);
    (0, connect_1.connectDb)();
};
app.listen(SERVER_PORT, handleOnListen);
