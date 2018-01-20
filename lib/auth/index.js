/** @babel */
import {self} from 'viblo-sdk/api/me'
import TokenManager from './token-manager'

const auth = require('viblo-sdk/auth')
const tokenManager = new TokenManager()
tokenManager.loadApiToken()

export default {
    authenticated: false,
    user: null,
    tokenManager,

    setAccessToken () {
        auth.setAccessToken({
            token_type: 'Bearer',
            access_token: tokenManager.getSavedToken()
        })
    },

    login () {
        return self()
            .then((user) => {
                this.authenticated = user !== null
                this.user = user
                return user
            })
            .catch((e) => {
                this.authenticated = false
                this.user = null
                throw e
            })
    }
}
