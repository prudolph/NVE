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
const readline_1 = __importDefault(require("readline"));
const chalk_1 = __importDefault(require("chalk"));
const osc_1 = __importDefault(require("osc"));
const oscPort = 5300;
let oscUdpPort;
let oscReady = false;
const parseArgumentsIntoOptions = (rawArgs) => {
    const args = arg_1.default({
        '--yes': Boolean,
        '--install': Boolean,
        '-y': '--yes',
        '-i': '--install',
    }, {
        argv: rawArgs.slice(2),
    });
    return {
        skipPrompts: args['--yes'] || false,
        template: args._[0],
        runInstall: args['--install'] || false,
    };
};
const validateIPaddress = (ipaddress) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true);
    }
    return (false);
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
    setupOsc(oscPort + 1);
    //Setup Listing for keystrokes
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    process.stdin.setRawMode(true);
    rl.on('line', (input) => {
        if (input == 'q') {
            console.log(chalk_1.default.red("Exiting...."));
            process.exit();
        }
        else if (input == 's') {
            sendMessage(answers.destinationIP);
        }
    });
    //Listen for ctrl-c
    rl.on('SIGINT', () => {
        rl.question('Are you sure you want to exit? (y | yes)', (answer) => {
            if (answer.match(/^y(es)?$/i)) {
                console.log(chalk_1.default.red("Exiting...."));
                rl.pause();
                process.exit();
            }
            else {
                console.log("Waiting for keystroke: " + chalk_1.default.yellow("s") + " to send | " + chalk_1.default.red("q ") + "to quit.");
            }
        });
    });
    console.log("Waiting for keystroke: " + chalk_1.default.yellow("s") + " to send | " + chalk_1.default.red("q ") + "to quit.");
});
const sendMessage = (ip) => {
    console.log(chalk_1.default.green(`Sending Message to ${ip}`));
    if (oscReady) {
        oscUdpPort.send({
            address: "/cue/1/go",
            args: []
        }, ip, oscPort);
        console.log(chalk_1.default.yellow("s") + " to send | " + chalk_1.default.red("q ") + "to quit: ");
    }
    else {
        console.log(chalk_1.default.red(`OSC Not Ready`));
    }
};
const setupForReceiving = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running: Receiving Setup");
    // Listen for incoming OSC messages.
    setupOsc(oscPort);
    oscUdpPort.on("message", function (oscMsg, timeTag, info) {
        console.log("An OSC message just arrived!", oscMsg);
        console.log("Remote info is: ", info);
    });
});
//Utils:
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