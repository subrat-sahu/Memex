import { makeRemotelyCallable } from 'src/util/webextensionRPC'
import normalizeUrl from 'src/util/encode-url-for-id'
import CustomListStorage from './storage'

export default class CustomListBackground {
    constructor({ storageManager }) {
        // Makes the custom list Table in indexed DB.
        this.storage = new CustomListStorage(storageManager)
    }

    setupRemoteFunctions() {
        makeRemotelyCallable({
            createCustomList: (...params) => {
                return this.createCustomList(...params)
            },
            insertPageToList: (...params) => {
                return this.insertPageToList(...params)
            },
            updateListName: (...params) => {
                return this.updateList(...params)
            },
            removeList: (...params) => {
                return this.removeList(...params)
            },
            removePageFromList: (...params) => {
                return this.removePageFromList(...params)
            },
            getListById: (...params) => {
                return this.getListById(...params)
            },
            getAllLists: (...params) => {
                return this.getAllLists(...params)
            },
            getListAssocPage: (...params) => {
                return this.getListAssocPage(...params)
            },
            getListNameSuggestions: (...params) => {
                return this.getListNameSuggestions(...params)
            },
            checkPageInList: (...params) => {
                return this.checkPageInList(...params)
            },
            fetchListPages: (...params) => {
                return this.fetchListPages(...params)
            },
        })
    }

    async getAllLists({ query = {}, opts = {} }) {
        const lists = await this.storage.fetchAllList({ query, opts })
        return lists
    }

    /**
     * Takes and ID and returns an array
     * @param {Number} listId
     */
    async fetchListPages(listId) {
        return this.storage.fetchListPages(listId)
    }

    async getListAssocPage({ url }) {
        return this.storage.getListAssocPage({
            url: normalizeUrl(url),
        })
    }

    async createCustomList({ name }) {
        return await this.storage.insertCustomList({
            name,
        })
    }

    async updateList({ id, name }) {
        await this.storage.updateListName({
            id,
            name,
        })
    }

    // TODO: Just a hack, find a better way.
    async insertPageToList({ id, url }) {
        await this.storage.insertPageToList({
            listId: id,
            pageUrl: normalizeUrl(url[0]),
            fullUrl: url[0],
        })
    }

    async removeList({ id }) {
        await this.storage.removeList({
            id,
        })
    }

    async removePageFromList({ id, url }) {
        await this.storage.removePageFromList({
            listId: id,
            pageUrl: normalizeUrl(url),
        })
    }

    async getListById({ id }) {
        await this.storage.getListById({
            id,
        })
    }

    async getListNameSuggestions(name) {
        return await this.storage.getListNameSuggestions({ name })
    }

    async checkPageInList({ id, url }) {
        return await this.storage.checkPageInList({
            listId: id,
            pageUrl: normalizeUrl(url),
        })
    }
}
