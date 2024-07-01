"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var handle_1 = require("./api/handle");
var config_1 = require("./config");
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.get('/ping', function (_, res) {
    res.send('pong!');
});
app.all('/api/builder/handle', (0, cors_1.default)(), function (req, res) {
    return (0, handle_1.handleEditor)(req, res);
});
app.listen(config_1.standaloneServerPort, function () {
    console.log("Server started at http://localhost:".concat(config_1.standaloneServerPort));
});
