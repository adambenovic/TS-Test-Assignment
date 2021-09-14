import express from 'express'
import setupLoadModules from './setup/loadModules'
import setupGraphQL from './setup/graphQl'
import setupStartServer from './setup/server'

const server = express()

setupLoadModules(server)
setupGraphQL(server)
setupStartServer(server)
