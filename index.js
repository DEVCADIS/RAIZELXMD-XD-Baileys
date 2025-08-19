/**
   * Create By king Richie.
   * Contact Me on tg  t.me/Hmmletts 
*/
// Import required modules
// Import required modules
const fs = require('fs');
const figlet = require('figlet');
const readline = require('readline');
const chalk = require('chalk');
const { startupPassword } = require('./token');

const AUTH_FILE = './auth.json'; // file to store authentication state

function isAuthenticated() {
  return fs.existsSync(AUTH_FILE) && JSON.parse(fs.readFileSync(AUTH_FILE)).authenticated;
}

function setAuthenticated(value) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ authenticated: value }));
}

// Show banner
console.log(figlet.textSync('ZERO', {
  font: 'Standard',
  horizontalLayout: 'default',
  verticalLayout: 'default'
}));

// If already authenticated, launch directly
if (isAuthenticated()) {
  console.log(chalk.green('Welcome back! Skipping password...'));
  launchBot();
} else {
  // Prompt for password
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.stdoutMuted = true;

  console.log(chalk.bold.yellow('Enter password to start bot: '));

  rl.question(chalk.green('Password: '), function (input) {
    if (input !== startupPassword) {
      console.log(chalk.red('\nâ Incorrect password. Exiting...'));
      process.exit(1);
    }
    console.log(chalk.green('\nâ Password correct. Booting bot...'));
    setAuthenticated(true);
    rl.close();
    launchBot();
  });

  rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (rl.stdoutMuted) rl.output.write("*");
    else rl.output.write(stringToWrite);
  };
}

// Your bot launcher
async function launchBot() {
  console.clear();
  console.log(chalk.green('Starting bot...'))
  require('../setting/config');
const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    prepareWAMessageMedia, 
    DisconnectReason, 
    fetchLatestBaileysVersion, 
    makeInMemoryStore, 
    generateWAMessageFromContent, 
    generateWAMessageContent, 
    jidDecode, 
    proto, 
    relayWAMessage, 
    getContentType, 
    getAggregateVotesInPollMessage, 
    downloadContentFromMessage, 
    fetchLatestWaWebVersion, 
    InteractiveMessage, 
    makeCacheableSignalKeyStore, 
    Browsers, 
    generateForwardMessageContent, 
    MessageRetryMap 
} = require("@whiskeysockets/baileys");

const pino = require('pino');
const readline = require("readline");
const fs = require('fs');
const { Boom } = require('@hapi/boom');
const { color } = require('./lib/color');
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./lib/myfunction');
const createToxxicStore = require('./richstore'); // adjust path if needed
const richHandler = require('./response');
const question = (txt) => new Promise(resolve => rl.question(txt, resolve));

const store = createToxxicStore('./store', {
    maxMessagesPerChat: 100,
    memoryOnly: false
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const { state, saveCreds } = await useMultiFileAuthState('./session');

const usePairingCode = true; // or false, based on your config

const client = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !usePairingCode,
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    version: [2, 3000, 1023223821] // â Ajout pour corriger l'erreur de connexion
});

    if (usePairingCode && !client.authState.creds.registered) {
        const phoneNumber = await question('please enter your WhatsApp number, starting with 237:\n');
        const code = await client.requestPairingCode(phoneNumber.trim());
        console.log(`your pairing code: ${code}`);
    }

    store.bind(client.ev);

    client.ev.on('messages.upsert', async chatUpdate => {
        try {
            if (!chatUpdate.messages || chatUpdate.messages.length === 0) return;
            const mek = chatUpdate.messages[0];

            if (!mek.message) return;
            mek.message =
                Object.keys(mek.message)[0] === 'ephemeralMessage'
                    ? mek.message.ephemeralMessage.message
                    : mek.message;

            if (mek.key && mek.key.remoteJid === 'status@broadcast') {
                const emoji = ['ð', 'ð­', 'ð', 'ð¹', 'ð', 'ð', 'ð', 'ð', 'ð¢', 'ð ', 'ð¤«', 'ð'];
                const sigma = emoji[Math.floor(Math.random() * emoji.length)];
                await client.readMessages([mek.key]);
                client.sendMessage(
                    'status@broadcast',
                    { react: { text: sigma, key: mek.key } },
                    { statusJidList: [mek.key.participant] },
                );
            }

            if (mek.key && mek.key.remoteJid.includes('@newsletter')) return;
            if (!client.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;

            const m = smsg(client, mek, store);
            richHandler(client, m, chatUpdate, store);
        } catch (err) {
            console.error(err);
        }
    });
      
      client.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    client.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = client.decodeJid(contact.id);
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
        }
    });
     
    client.serializeM = (m) => smsg(client, m, store);
    
    client.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = {
                ...message.message.viewOnceMessage.message
            }
        }

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await client.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }

    client.public = global.status;

    client.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            console.log(color(lastDisconnect.error, 'deeppink'));
            if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
                process.exit();
            } else if (reason === DisconnectReason.badSession) {
                console.log(color(`Bad Session File, Please Delete Session and Scan Again`));
                process.exit();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'));
                process.exit();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'));
                process.exit();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'));
                client.logout();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(color(`Device Logged Out, Please Scan Again And Run.`));
                client.logout();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(color('Restart Required, Restarting...'));
                await launchBot();
            } else if (reason === DisconnectReason.timedOut) {
                console.log(color('Connection TimedOut, Reconnecting...'));
                clientstart();
            }
        } else if (connection === "connecting") {
            console.log(color('Connect . . . '));
        } else if (connection === "open") {
            console.log(color('Bot Connected Successfully'));
        }
    });
    client.ev.on('group-participants.update', async (update) => {
  if (!global.goodbye) return;
  const { id, participants, action } = update;

  const metadata = await client.groupMetadata(id);

  for (const user of participants) {
    if (action === 'remove') {
      let pp;
      try {
        pp = await client.profilePictureUrl(user, 'image');
      } catch {
        pp = 'https://files.catbox.moe/aanan8.jpg';
      }

      const name = metadata.subject;
      const desc = metadata.desc || 'No description';
      const count = metadata.participants.length;

      await client.sendMessage(id, {
        image: { url: pp },
        caption: `ð *Goodbye @${user.split('@')[0]}*\nð Group: *${name}*\nð¥ Members: *${count}*ð Description: ${desc}`,
        mentions: [user],
        contextInfo: {
          forwardingScore: 5,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterName: "É´ÉªÉ´á´á´xx-á´á´á´Ê",
            newsletterJid: "120363419154765757@newsletter"
          }
        }
      });
    }
  }
});

client.ev.on('messages.upsert', async ({ messages }) => {
  const msg = messages[0];
  if (!msg.message || msg.key.fromMe) return;

  const from = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;
  const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
  if (!text) return;
  if (!global.chatbotStatus || !global.chatbotStatus[from]) return;
  if (msg.key.participant === client.user.id.split(':')[0] + '@s.whatsapp.net') return;

  try {
    await client.sendMessage(from, { react: { text: 'ð¬', key: msg.key } });
    const query = encodeURIComponent(text);
    const res = await fetch(`https://api.blackbox.cool/api/chatbot?msg=${query}`);
    const data = await res.json();

    if (data.success) {
      await client.sendMessage(from, { text: data.response, mentions: [sender] }, { quoted: msg });
    }
  } catch (e) {
    console.log('Chatbot API error:', e);
  }
});
    client.ev.on('group-participants.update', async (update) => {
  if (!global.welcome) return;
  const { id, participants, action } = update;

  const metadata = await client.groupMetadata(id);

  for (const user of participants) {
    if (action === 'add') {
      let pp;
      try {
        pp = await client.profilePictureUrl(user, 'image');
      } catch {
        pp = 'https://files.catbox.moe/aanan8.jpg';
      }

      const name = metadata.subject;
      const desc = metadata.desc || 'No description';
      const count = metadata.participants.length;

      await client.sendMessage(id, {
        image: { url: pp },
        caption: `ð *Welcome @${user.split('@')[0]}*\nð Group: *${name}*\nð¥ Members: *${count}*ð Description: ${desc}`,
        mentions: [user],
        contextInfo: {
          forwardingScore: 5,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterName: "É´ÉªÉ´á´á´xx-á´á´á´Ê",
            newsletterJid: "120363419154765757@newsletter"
          }
        }
      });
    }
  }
});

client.ev.on("messages.upsert", async ({ messages }) => {
    try {
        const msg = messages[0];
        if (!msg || !msg.message) return;

        const m = smsg(client, msg, store);
        const from = m.chat;
        const sender = m.sender;

        // ===============================
        // ð» GHOST MODE (Auto suppression)
        // ===============================
        
        // ===============================
        // ð§  DÃLÃGUER AU FICHIER DE COMMANDES
        // ===============================
        require("./response")(m, client, store); // ou selon ton fichier

    } catch (err) {
        console.error("ð¥ Erreur dans messages.upsert :", err);
    }
});

    client.sendText = (jid, text, quoted = '', options) => client.sendMessage(jid, { text: text, ...options }, { quoted });
    
    client.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
return buffer
    } 
    
    client.ev.on('creds.update', saveCreds);
    return client;
}
  
launchBot();

require('./bot');

  const ignoredErrors = [
  'Socket connection timeout',
  'EKEYTYPE',
  'item-not-found',
  'rate-overlimit',
  'Connection Closed',
  'Timed Out',
  'Value not found',
];

  process.on('unhandledRejection', (reason) => {
    if (ignoredErrors.some((e) => String(reason).includes(e))) return;
    console.log('Unhandled Rejection: ', reason);
  });

  const originalConsoleError = console.error;
  console.error = function (message, ...optionalParams) {
    if (
      typeof message === 'string' &&
      ignoredErrors.some((e) => message.includes(e))
    )
      return;
    originalConsoleError.apply(console, [message, ...optionalParams]);
  };

  const originalStderrWrite = process.stderr.write;
  process.stderr.write = function (message, encoding, fd) {
    if (
      typeof message === 'string' &&
      ignoredErrors.some((e) => message.includes(e))
    )
      return;
    originalStderrWrite.apply(process.stderr, arguments);
  };

launchBot();
