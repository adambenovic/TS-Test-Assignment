import cors from 'cors'
import bodyParser from 'body-parser'

export default function (server) {
  console.info('SETUP - Loading modules...')
  server.use(cors())
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({extended: false}))
}
