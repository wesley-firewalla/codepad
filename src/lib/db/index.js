import Dexie from 'dexie'

const db = new Dexie('codelife')
db.version(1).stores({
  code_items: '++id,name,language,code,created_at,updated_at,deleted_at',
  life_items: '++id,name,key,created_at,updated_at,deleted_at'
})

db.on('ready', async () => {
  // await db.life_items.add({
  //   id: 1,
  //   name: 'Unicode Text Convertor',
  //   key: 'unicode_text_convertor'
  // })
})

export default db
