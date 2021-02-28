
import arg from 'arg';
import inquirer from 'inquirer';
import readline from 'readline';
import keypress from 'keypress';

import chalk from 'chalk';
import osc from 'osc';

let oscHostPort = 5300;
let oscTargetPort = 5300;
let oscMsg = "/cue/1/go";
let oscUdpPort;
let oscReady = false;


const parseArgumentsIntoOptions = (rawArgs) => {
  const args = arg(
    {
      '--hostPort': Number,
      '--targetPort': Number,
      '--message': String
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    hostPortOverride: args['--hostPort'] || 5300,
    targetPortOverride: args['--targetPort'] || 5300,
    messageOverride: args['--message'] || "/cue/1/go",
  };
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

  setupOsc(oscHostPort )


  //Setup Listing for keystrokes
  keypress(process.stdin);

  // listen for the "keypress" event
  process.stdin.on('keypress', function (ch, key) {
    if ((key && key.ctrl && key.name == 'c') || (key && key.name == 'q')) {
      console.log(chalk.red("Exiting...."))
      process.stdin.pause();
      process.exit();
    }
    else if (key && key.name == 's') {
      sendMessage(answers.destinationIP)
    }else{
      console.log("Waiting for keystroke: " + chalk.yellow("s") + " to send | " + chalk.red("q ") + "to quit:")

    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

  console.log("Waiting for keystroke: " + chalk.yellow("s") + " to send | " + chalk.red("q ") + "to quit.")

}

const sendMessage = (ip: string) => {

  console.log(chalk.green(`Sending Message to ${ip}`))

  if (oscReady) {

    oscUdpPort.send({
      address: oscMsg,
      args: [
      ]
    }, ip, oscTargetPort);

    console.log(chalk.yellow("s") + " to send | " + chalk.red("q ") + "to quit: ")


  } else {
    console.log(chalk.red(`OSC Not Ready`))
  }

}

const setupForReceiving = async () => {
  console.log("Running: Receiving Setup");

  // Listen for incoming OSC messages.
  setupOsc(oscHostPort);

  oscUdpPort.on("message", function (oscMsg, timeTag, info) {
    console.log("An OSC message just arrived!", oscMsg);
    console.log("Remote info is: ", info);
  });
}



//Utils:
const validateIPaddress = (ipaddress: string): boolean => {

  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
    return (true)
  }
  return (false)
}

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
  let options = parseArgumentsIntoOptions(args);
console.log("Options: ", options)


 oscTargetPort = options.targetPortOverride;
 oscHostPort = options.hostPortOverride;
 oscMsg = options.messageOverride;

  console.log(`Using host Port ${oscHostPort}|Using target Port ${oscTargetPort} | Sending Msg: ${oscMsg}`)
  const action = await promptForAction();
  switch (action) {
    case 'Send Messages': await setupForSending(); break;
    case 'Receive Messages': await setupForReceiving(); break;
  }
}



