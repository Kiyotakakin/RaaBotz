const {neonime} = require('../lib/anime')
	let handler = async (m, {conn, text, args}){
		async function anime(q, page){
			const cari = await neonime.search(q, page)
			const list = [
			{
				title: `Next Page`,
				rows: [{
					title: 'Next Page',
					rowId: `.animenext ${Number(cari.page) + 1}/${cari.query} ${m.sender}`
				}]
			},
			{
				title: `Result From ${q}`,
				rows: []
			}]
			for (let i of cari.result) {
			    list[1].rows.push({
			    	title: i.title,
			    	rowId: `.animedl ${i.url} ${m.sender}`,
			    	description: i.episode
			    })
			}
			const listMessage = {
				text: `Page : ${cari.page}\n\nSelect the anime you want to download below`,
				footer: "neonime.watch",
				title: "*ANIME SEARCH*",
				buttonText: "Click Here",
				sections: list
			}
			await conn.sendMessage(m.from, listMessage, {quoted: m})
		}
		}
	}

handler.help = ['tes']
handler.tags = ['anime']
handler.command = /^(test)$/i

module.exports = handler
