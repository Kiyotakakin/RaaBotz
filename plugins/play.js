const fetch = require('node-fetch')
const { youtubeSearch } = require('@bochilteam/scraper')
let handler = async (m, { conn, groupMetadata, usedPrefix, text, args, command }) => {
if (!text) throw 'Input Query'
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Tidak Ditemukan'
  let { title, description, thumbnail, videoId, durationH, durationS, viewH, publishedTime } = vid
  let url = 'https://www.youtube.com/watch?v=' + videoId
  let ytLink = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=b7483529cb221c7761d8b2e4&url=${url}`)
  let json = await ytLink.json()
  let capt = `*Title:* ${title}
*Published:* ${publishedTime}
*Duration:* ${durationH}
*Views:* ${viewH}
*Url:* ${url}`
  let buttons = [{ buttonText: { displayText: 'Video' }, buttonId: `${usedPrefix}ytv ${url}` }]
  let msg = await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: capt, footer: '_Audio on progress..._', buttons }, { quoted: m })
  // if (durationS > 4000) return conn.sendMessage(m.chat, { text: `*Download:* ${await shortUrl(ytLink)}\n\n_Duration too long..._` }, { quoted: msg })
 conn.sendFile(m.chat, json.result.link, 'tts.opus', null, msg, true)
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
