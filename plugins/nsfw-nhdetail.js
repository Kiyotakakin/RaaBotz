let fetch = require('node-fetch')
let handler = async(m, { conn, args, usedPrefix, command}) => {
    if (!args[0]) throw `Masukkan kode, berikut: ${usedPrefix + command} 304307`
    let res = await fetch(`https://mxmxk.herokuapp.com/nhentai?code=${args[0]}`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    let ayaka = `
𝙉𝙝𝙚𝙣𝙩𝙖𝙞 𝘿𝙚𝙩𝙖𝙞𝙡:
*Id:* _${json.result.id}_
*Title:* _${json.result.title.japanese}_
*Title (Native):* _${json.result.title.english}_
*language:* _${json.result.lang}_
*Pages:* _${json.result.num_pages}_
*favorite:* _${json.result.num_favorites}_
*Uploaded:* _${json.result.upload_time}_
*_Button tidak work untuk pesan sementara/wa mod silahkan pakai ${usedPrefix}nhpdf ${args[0]}_*
`.trim()
    conn.sendButtonImg(m.chat, await (await fetch(json.result.images.cover)).buffer(), ayaka, packname, 'Download', `.nhpdf ${args[0]}`, m)
}
handler.command = /^nh$/i
handler.tags = ['nsfw','internet']
handler.help = ['nh <code>']
handler.nsfw = true
module.exports = handler
