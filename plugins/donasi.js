let handler = async (m, { conn, usedPrefix }) => conn.sendButton(m.chat, `
╭─「 Donasi • Dana 」
│ • Axis [083172999950]
│ • Dana  [083172999950]
╰────
╭─「 *NOTE* 」
│ > Ingin donasi? Wa.me/6283172999950
│ _Hasil donasi akan digunakan buat sewa_
│ _atau beli *RDP/VPS* agar bot bisa jalan_
│ _24jam tanpa kendala_
╰────
`.trim(), wm, 'Menu', usedPrefix + 'menu', m) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['about']
handler.command = /^dona(te|si)$/i

module.exports = handler
