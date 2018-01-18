/** @babel */
import PublishPostsPanel from '../panels/publish-posts-panel'
import SettingsPanel from '../panels/settings-panel'

const PANEL_ID_PUBLISH_POSTS = 'publish-posts'
const PANEL_ID_SETTINGS = 'settings'

export default {
    defaultPanel: PANEL_ID_PUBLISH_POSTS,
    panels: [
        {
            id: PANEL_ID_PUBLISH_POSTS,
            name: 'Publish Posts',
            iconName: 'icon-pencil',
            auth: true,
            creator: () => new PublishPostsPanel()
        },
        {
            id: PANEL_ID_SETTINGS,
            name: 'Settings',
            iconName: 'icon-settings',
            creator: () => new SettingsPanel()
        },
    ]
}
