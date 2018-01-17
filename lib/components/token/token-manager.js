'use babel'

import fs from 'fs-plus'

export default class TokenManager {
    constructor (options = {}) {
        this.homeDir = options.homeDir || fs.getHomeDirectory()
        this.vibloDir = options.vibloDir || `${this.homeDir}/.viblo`
        this.tokenPath = options.tokenPath || `${this.vibloDir}/api.token`
        this.token = options.token || ''
    }

    saveApiToken (token) {
        return new Promise((resolve, reject) => {
            fs.isDirectory(this.vibloDir, (result) => {
                if (!result) {
                    fs.makeTreeSync(this.vibloDir)
                }

                const writeStream = fs.createWriteStream(this.tokenPath)

                writeStream.end(token)
                writeStream.on('finish', () => resolve(token))
                writeStream.on('error', (error) => {
                    writeStream.close()
                    this.rollbackSaving()
                    reject(error)
                })
            })
        })
    }

    loadApiToken () {
        return new Promise((resolve, reject) => {
            if (fs.isFileSync(this.tokenPath)) {
                fs.readFile(this.tokenPath, (err, data) => {
                    return !err ? resolve(this.token = String.fromCharCode(...data)) : reject(err)
                })
            }
        })
    }

    rollbackSaving () {
        try {
            if (fs.existsSync(this.tokenPath)) {
                fs.unlinkSync(this.tokenPath)
            }
        } catch (e) {
            // Ignored
        }
    }

    getSavedToken () {
        return this.token
    }
}
