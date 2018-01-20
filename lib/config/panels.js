/** @babel */
import PublishPostsPanel from '../panels/publish-posts-panel'
import DraftPanel from '../panels/draft-posts-panel'
import SettingsPanel from '../panels/settings-panel'

const PANEL_ID_DRAFT_POSTS = 'draft-posts'
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
            id: PANEL_ID_DRAFT_POSTS,
            name: 'Drafts',
            iconName: 'icon-lock',
            auth: true,
            creator: () => new DraftPanel()
        },
        {
            id: PANEL_ID_SETTINGS,
            name: 'Settings',
            iconName: 'icon-settings',
            creator: () => new SettingsPanel()
        },
    ]
}
