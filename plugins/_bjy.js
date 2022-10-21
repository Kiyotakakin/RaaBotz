let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} mabar`
    let res = await neonimek(text)
	let listbutton = []
	let no = 1
	for (var z of res) {
		let button = {
			title: 'Result - ' + no++ + ' ',
			rows: [{
				title: z.title,
				rowId: z.url
			}]
		};
		listbutton.push(button)
	}
	const listMessage = {
		text: `And More Results...`,
		title: res.title,
		buttonText: 'Select song',
		sections: listbutton
	}
	await conn.sendMessage(m.chat, listMessage, {quoted: m})
}

    handler.help = ['animek'].map(v => v + ' <pencarian>') 
 handler.tags = ['cristian'] 
 handler.command = /^(animek)$/i 
  
 module.exports = handler

let axios = require('axios') 
let cheerio = require('cheerio') 
async function neonimek(text) {
				const {data} = await axios.get(`https://neonime.cloud/page/1/?s=${text}`)
				const $ = cheerio.load(data)
				const results = []
				$('#contenedor').find('div.item_1.items > div').each(function(index, element){
						let title = $(this).find('a > div > span').text()
						let episode = $(this).find('div.fixyear > h2').text()
						let url= $(this).find('a').attr('href')
						results.push({
						  title,
						  episode,
						  url
					})
				})
				return results
}
