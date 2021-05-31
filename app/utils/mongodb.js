import mongoose from 'mongoose'
mongoose.set('useCreateIndex', true)

export default (db) => {
  return mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => {
    if (err) {
      console.log('\x1B[31m%s\x1B[0m', `[ERROR]:`, `无法连接数据库`)

    }
  })
}