const Express = require("express");
const Http = require("http").Server(Express);
var socket = require('socket.io');

const chat = require('./routes/index');

