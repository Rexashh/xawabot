import similarity from 'similarity'
import db from '../lib/database.js'

const threshold = 0.72
export async function before(m) {
      let id = m.chat
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*hint/i.test(m.quoted.contentText)) return !0
  this.tebakgambar = this.tebakgambar ? this.tebakgambar : {}
  if (!(id in this.tebakgambar)) return m.reply('Soal itu telah berakhir')
  if (/^nyerah$/i.test(m.text)) {
    await this.sendButton(m.chat, `Jawabannya adalah ${JSON.parse(JSON.stringify(this.tebakgambar[id][1].jawaban))}`.trim(), author, null, buttonTebakgambar, m').then(() => { delete this.tebakgambar[id] })
  }
  // if (m.quoted.id == this.tebakgambar[id][0].id) { // undefined T_T
  let json = JSON.parse(JSON.stringify(this.tebakgambar[id][1]))
  if (['.hint', 'BANTUAN', ''].includes(m.text)) return !0
  if (m.text.toLowerCase() == json.jawaban.toLowerCase()) {
    global.DATABASE.data.users[m.sender].exp += this.tebakgambar[id][2]
    await this.sendButton(m.chat, `*Benar!* +${this.tebakgambar[id][2]} XP`, author, null, buttonTebakgambar, m)
    clearTimeout(this.tebakgambar[id][3])
    delete this.tebakgambar[id]
  } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
  else m.reply(`*Salah!*`)
  // }
  return !0
}
export const exp = 0

const buttonTebakgambar = [
    ['tebakgambar', '/tebakgambar']
]
