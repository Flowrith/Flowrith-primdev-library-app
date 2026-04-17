import express from 'express'
import router from './routes/index.route.js'

const app = express()
const port = 3000
app.use(express.json())
app.use(router)

app.get('/', (req, res) => {
  res.send('Hai! Selamat datang di aplikasi Express.js! <br> Semoga harimu menyenangkan! :)')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.json())
app.use(router)

