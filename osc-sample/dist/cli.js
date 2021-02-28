"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const arg_1 = __importDefault(require("arg"));
const inquirer_1 = __importDefault(require("inquirer"));
const keypress_1 = __importDefault(require("keypress"));
const chalk_1 = __importDefault(require("chalk"));
const osc_1 = __importDefault(require("osc"));
let oscHostPort = 5300;
let oscTargetPort = 5300;
let oscMsg = "/cue/1/go";
let oscUdpPort;
let oscReady = false;
const parseArgumentsIntoOptions = (rawArgs) => {
    const args = arg_1.default({
        '--hostPort': Number,
        '--targetPort': Number,
        '--message': String
    }, {
        argv: rawArgs.slice(2),
    });
    return {
        hostPortOverride: args['--hostPort'] || 5300,
        targetPortOverride: args['--targetPort'] || 5300,
        messageOverride: args['--message'] || "/cue/1/go",
    };
};
const promptForAction = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield inquirer_1.default
        .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Send Messages', 'Receive Messages'],
        },
    ])
        .then(response => {
        return response.action;
    });
});
const setupForSending = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running: Sending Setup");
    const questions = [];
    questions.push({
        type: 'input',
        name: 'destinationIP',
        message: 'Destination IP:',
        validate: (input) => {
            const isValid = validateIPaddress(input);
            return isValid ? true : "Invalid Ip Adresss";
        }
    });
    const answers = yield inquirer_1.default.prompt(questions);
    setupOsc(oscHostPort);
    //Setup Listing for keystrokes
    keypress_1.default(process.stdin);
    // listen for the "keypress" event
    process.stdin.on('keypress', function (ch, key) {
        if ((key && key.ctrl && key.name == 'c') || (key && key.name == 'q')) {
            console.log(chalk_1.default.red("Exiting...."));
            process.stdin.pause();
            process.exit();
        }
        else if (key && key.name == 's') {
            sendMessage(answers.destinationIP);
        }
        else {
            console.log("Waiting for keystroke: " + chalk_1.default.yellow("s") + " to send | " + chalk_1.default.red("q ") + "to quit:");
        }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
    console.log("Waiting for keystroke: " + chalk_1.default.yellow("s") + " to send | " + chalk_1.default.red("q ") + "to quit.");
});
const sendMessage = (ip) => {
    console.log(chalk_1.default.green(`Sending Message to ${ip}`));
    if (oscReady) {
        oscUdpPort.send({
            address: oscMsg,
            args: []
        }, ip, oscTargetPort);
        console.log(chalk_1.default.yellow("s") + " to send | " + chalk_1.default.red("q ") + "to quit: ");
    }
    else {
        console.log(chalk_1.default.red(`OSC Not Ready`));
    }
};
const setupForReceiving = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running: Receiving Setup");
    // Listen for incoming OSC messages.
    setupOsc(oscHostPort);
    oscUdpPort.on("message", function (oscMsg, timeTag, info) {
        console.log("An OSC message just arrived!", oscMsg);
        console.log("Remote info is: ", info);
    });
});
//Utils:
const validateIPaddress = (ipaddress) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true);
    }
    return (false);
};
const setupOsc = (port) => {
    oscUdpPort = new osc_1.default.UDPPort({
        localAddress: "0.0.0.0",
        localPort: port
    });
    oscUdpPort.on("ready", function () {
        console.log("OSC Ready");
        oscReady = true;
    });
    oscUdpPort.open();
};
//Main/////////////////////////////////
const cli = (args) => __awaiter(void 0, void 0, void 0, function* () {
    let options = parseArgumentsIntoOptions(args);
    console.log("Options: ", options);
    oscTargetPort = options.targetPortOverride;
    oscHostPort = options.hostPortOverride;
    oscMsg = options.messageOverride;
    console.log(`Using host Port ${oscHostPort}|Using target Port ${oscTargetPort} | Sending Msg: ${oscMsg}`);
    const action = yield promptForAction();
    switch (action) {
        case 'Send Messages':
            yield setupForSending();
            break;
        case 'Receive Messages':
            yield setupForReceiving();
            break;
    }
});
exports.cli = cli;
//# sourceMappingURL=cli.js.map