'use babel'

import Environment from './environment'

const env = (new Environment()).getEnv()

const isDev = (env.APP_ENV || 'production') !== 'production'
const ROOT_URL = env.ROOT_URL || 'https://viblo.asia'
const API_URL = env.API_URL || 'https://api.viblo.asia'

export default {
    isDev,
    ROOT_URL,
    API_URL,
    ATOM_URI: 'atom://viblo',
    REGEX_SYSTEM_PANEL: /viblo\/([a-zA-Z0-9_-]+)\/?([a-zA-Z0-9_-]*)$/i,
    REGEX_POST_EDITOR: /viblo\/p\/(tmp\/)?([a-zA-Z0-9]+)\.md$/,
    REGEX_PREVIEW_URI: /viblo-preview:\/\/(editor|file)\/([a-zA-Z0-9]+)/
}
