import _ from 'lodash'
import moment from 'moment'
import db from '@/lib/db'

export default {
  async findAll({ q, limit, offset }) {
    let query = db.code_items.toCollection()
    if (q !== '') {
      query = query.filter(
        it => it.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
      )
    }

    return await query
      .limit(limit)
      .offset(offset)
      .reverse()
      .sortBy('updated_at')
  },
  async trashById(id) {
    return await db.code_items.update(id, {
      deleted_at: moment()
        .utc()
        .format()
    })
  },
  async deleteById(id) {
    return await db.code_items.delete(id)
  },
  async update(id, data) {
    const updates = _.pick(data, ['name', 'language', 'code'])
    updates.updated_at = moment()
      .utc()
      .format()
    return await db.code_items.update(id, updates)
  },
  async findById(id) {
    return await db.code_items.get(id)
  },
  async create(data) {
    const insert = _.pick(data, ['name', 'language', 'code'])
    insert.created_at = insert.updated_at = moment()
      .utc()
      .format()

    return await db.code_items.add(insert)
  }
}
