import urlRegex from 'url-regex'

import {
    OVERVIEW_URL,
    CONFIGURE_SHORTCUTS_URL,
    BOOKMARK_EXIST_ERROR,
} from 'src/background'
import { isLoggable } from 'src/activity-logger'
import { createBookmarkByUrl } from 'src/bookmarks/background/addition'
import removeBookmarkByUrl from 'src/bookmarks/background/deletion'

const sendNotification = (title = 'Notification', message = '') => {
    browser.notifications.create({
        type: 'basic',
        title,
        iconUrl: '/img/worldbrain-logo-narrow.png',
        message,
    })
}

async function createOrUpdateTab(url) {
    const [currentTab] = await browser.tabs.query({ active: true })
    console.log(url)

    // Either create new tab or update current tab with overview page, depending on URL validity
    if (currentTab && currentTab.url && urlRegex().test(currentTab.url)) {
        browser.tabs.create({ url })
    } else {
        browser.tabs.update({ url })
    }
}
export async function openOverview() {
    createOrUpdateTab(OVERVIEW_URL)
}

export async function bookmarkPage() {
    const [currentTab] = await browser.tabs.query({ active: true })

    // Don't do anything on non-loggable pages
    if (!isLoggable({ url: currentTab.url })) {
        return
    }

    try {
        await createBookmarkByUrl(currentTab.url, currentTab.id)

        sendNotification('Memex Page Bookmarked', currentTab.url)
    } catch (error) {
        if (error.name === BOOKMARK_EXIST_ERROR)
            try {
                await removeBookmarkByUrl(currentTab.url)

                sendNotification('Memex Page UnBookmarked', currentTab.url)
            } catch (err) {
                console.log(err)
            }
    }
}

export async function configureShortcuts() {
    createOrUpdateTab(CONFIGURE_SHORTCUTS_URL)
}

// Set up commands listener
browser.commands.onCommand.addListener(command => {
    switch (command) {
        case 'openOverview':
            return openOverview()
        case 'bookmarkPage':
            return bookmarkPage()
        case 'configureShortcuts':
            return configureShortcuts()
        default:
    }
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(
        sender.tab
            ? 'from a content script:' + sender.tab.url
            : 'from the extension',
    )
    if (request === 'openOverview') openOverview(sendResponse)
})
