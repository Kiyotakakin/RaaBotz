const fetch = require('node-fetch')
const { youtubeSearch } = require('@bochilteam/scraper')
let handler = async (m, { conn, groupMetadata, usedPrefix, text, args, command }) => {
if (!text) throw 'Input Query'
  let vid = await fetch(`https://api.lolhuman.xyz/api/ytplay?apikey=kytokin&query=$text})
  if (!vid) throw 'Video/Audio Tidak Ditemukan'
  let url = 'https://www.youtube.com/watch?v=' + videoId
  let json = await vid.json()
  let capt = `*Title:* ${json.result.info.title}
*Published:* ${json.result.info.uploader}
*Duration:* ${json.result.info.duration}
*Views:* ${json.result.info.view}
*Url:* ${url}`
  let buttons = [{ buttonText: { displayText: 'Video' }, buttonId: `${usedPrefix}ytv ${url}` }]
  let msg = await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: capt, footer: '_Audio on progress..._', buttons }, { quoted: m })
  // if (durationS > 4000) return conn.sendMessage(m.chat, { text: `*Download:* ${await shortUrl(url)}\n\n_Duration too long..._` }, { quoted: msg })
 conn.sendFile(m.chat, json.result.audio.link, 'tts.opus', null, msg, true)
}

handler.help = ['play', 'play'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^(y((outube|((utu|t)b|t))play|tp)|play(yt)?)$/i

handler.exp = 0
handler.limit = false

module.exports = handler

async function shortUrl(url) {
  url = encodeURIComponent(url)
  let res = await fetch(`https://is.gd/create.php?format=simple&url=${url}`)
  if (!res.ok) throw false
  return await res.text()
}
