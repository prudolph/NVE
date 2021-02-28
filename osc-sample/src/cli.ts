
import arg from 'arg';
import inquirer from 'inquirer';
import readline from 'readline';
import ioHook from 'iohook';

import chalk from 'chalk';
import osc from 'osc';

const oscPort = 5300;
let oscUdpPort;
let oscReady = false;


const parseArgumentsIntoOptions = (rawArgs) => {
  const args = arg(
    {
      '--yes': Boolean,
      '--install': Boolean,
      '-y': '--yes',
      '-i': '--install',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args['--yes'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
  };
}

const validateIPaddress = (ipaddress: string): boolean => {

  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
    return (true)
  }
  return (false)
}


const promptForAction = async () => {
  return await inquirer
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
}


const setupForSending = async () => {
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

  const answers = await inquirer.prompt(questions);

  setupOsc(oscPort + 1)


  //Setup Listing for keystrokes
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  process.stdin.setRawMode(true);

  
  rl.on('line', (input) => {
    if (input == 'q') {
      console.log(chalk.red("Exiting...."))
      process.exit();
    }
    else if (input == 's') {
      sendMessage(answers.destinationIP)
    }

  });

  //Listen for ctrl-c
  rl.on('SIGINT', () => {
    rl.question('Are you sure you want to exit? (y | yes)', (answer) => {
      if (answer.match(/^y(es)?$/i)) {
        console.log(chalk.red("Exiting...."))
        rl.pause();
        process.exit();
      }else{
        console.log("Waiting for keystroke: " + chalk.yellow("s") + " to send | " + chalk.red("q ") + "to quit.")

      }
    });
  });

  console.log("Waiting for keystroke: " + chalk.yellow("s") + " to send | " + chalk.red("q ") + "to quit.")

}

const sendMessage = (ip: string) => {

  console.log(chalk.green(`Sending Message to ${ip}`))

  if (oscReady) {

    oscUdpPort.send({
      address: "/cue/1/go",
      args: [
      ]
    }, ip, oscPort);

    console.log(chalk.yellow("s") + " to send | " + chalk.red("q ") + "to quit: ")


  } else {
    console.log(chalk.red(`OSC Not Ready`))
  }

}

const setupForReceiving = async () => {
  console.log("Running: Receiving Setup");

  // Listen for incoming OSC messages.
  setupOsc(oscPort);

  oscUdpPort.on("message", function (oscMsg, timeTag, info) {
    console.log("An OSC message just arrived!", oscMsg);
    console.log("Remote info is: ", info);
  });
}



//Utils:
const setupOsc = (port: number) => {
  oscUdpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: port
  });

  oscUdpPort.on("ready", function () {
    console.log("OSC Ready")
    oscReady = true;
  })

  oscUdpPort.open();

}


//Main/////////////////////////////////

export const cli = async (args) => {

  const action = await promptForAction();
  switch (action) {
    case 'Send Messages': await setupForSending(); break;
    case 'Receive Messages': await setupForReceiving(); break;
  }
}



