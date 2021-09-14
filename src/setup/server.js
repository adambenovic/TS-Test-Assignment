import models from '../models/index'
import config from '../../config/config.json'

export default function (server) {
  // console.info('SETUP - Syncing database tables...')

  console.info('SETUP - Starting server...')

  server.listen(config.port, (error) => {
    if (error) {
      console.error('ERROR - Unable to start server.')
    } else {
      console.info(`INFO - Server started on port ${config.port}.`)
    }
  })

  // models.sequelize.sync({})
  //   .then(() => {
  //     console.info('INFO - Database sync complete.')
  //     console.info('SETUP - Starting server...')
  //
  //     server.listen(config.port, (error) => {
  //       if (error) {
  //         console.error('ERROR - Unable to start server.')
  //       } else {
  //         console.info(`INFO - Server started on port ${config.port}.`)
  //       }
  //     })
  //   })
  //   .catch(() => {
  //     console.error('ERROR - Unable to sync database.')
  //     console.error('ERROR - Server not started.')
  //   })
}
