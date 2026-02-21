/**
 * 早期关注邮箱采集 API
 * 将邮箱存储到服务器本地 data/emails.json
 */
import express from 'express'
import cors from 'cors'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, 'data')
const EMAILS_FILE = join(DATA_DIR, 'emails.json')

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

async function loadEmails() {
  if (!existsSync(EMAILS_FILE)) return []
  const data = await readFile(EMAILS_FILE, 'utf-8')
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function saveEmails(emails) {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
  await writeFile(EMAILS_FILE, JSON.stringify(emails, null, 2), 'utf-8')
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.post('/api/early-access', async (req, res) => {
  const email = req.body?.email?.trim()
  if (!email) {
    return res.status(400).json({ ok: false, message: '缺少邮箱' })
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ ok: false, message: '邮箱格式无效' })
  }
  try {
    const emails = await loadEmails()
    const lower = email.toLowerCase()
    const exists = emails.some((e) => e.email.toLowerCase() === lower)
    if (!exists) {
      emails.push({ email: email.trim(), timestamp: new Date().toISOString() })
      await saveEmails(emails)
    }
    return res.json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ ok: false, message: '服务器错误' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`[早期关注 API] http://localhost:${PORT}`)
})
