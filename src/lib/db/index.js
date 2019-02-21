import Dexie from 'dexie'

const db = new Dexie('codepad')
db.version(1).stores({
  code_items: '++id,title,language,code,created_at,updated_at,deleted_at'
})

db.on('ready', async () => {})

export default db
