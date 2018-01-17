'use babel'

const env = require('../.env.json')

const PACKAGE_NAME = env.APP_NAME || 'viblo'
const isDev = (env.APP_ENV || 'production') !== 'production'
const ROOT_URL = env.ROOT_URL || 'https://viblo.asia'
const API_URL = env.API_URL || 'https://api.viblo.asia'

export default {
    isDev,
    ROOT_URL,
    API_URL,
    ATOM_URI: `atom://${PACKAGE_NAME}`,
    URI_REGEX: new RegExp(`${PACKAGE_NAME}\/([a-z]+)\/?([a-zA-Z0-9_-]+)?`, 'i')
}
