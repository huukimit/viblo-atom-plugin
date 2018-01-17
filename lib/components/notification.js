'use babel'

export default class Notification {
    success (message, description = '', dismissable = true) {
        return this.show('addSuccess', message, description, dismissable, false)
    }

    successWithReload (message, description = '', dismissable = true) {
        return this.show('addSuccess', message, description, dismissable, true)
    }

    error (message, description = '', dismissable = true) {
        return this.show('addError', message, description, dismissable, false)
    }

    errorWithReload (message, description = '', dismissable = true) {
        return this.show('addError', message, description, dismissable, true)
    }

    show (type = 'addSuccess', message, description = '', dismissable = true, withReload = false) {
        let buttonReload = [{
            text: 'Reload Atom',
            onDidClick: () => atom.reload()
        }]

        let notification = atom.notifications[type](message, {
            description,
            dismissable,
            buttons: [...buttonReload, {
                text: 'Cancel',
                onDidClick: () => notification.dismiss()
            }]
        })
    }
}
