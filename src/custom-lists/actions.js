import { createAction } from 'redux-act'
import * as selectors from './selectors'
// import constants from './constants'
// import { custom-lists } from '../custom-lists/selectors';

import dummyData from './dummy-data/index'

export const getAllLists = createAction('custom-lists/listData')
export const updatePageLists = createAction('custom-lists/updateList')
export const createList = createAction('custom-lists/addList')
export const deleteList = createAction(
    'custom-lists/deleteList',
    (id, index) => ({
        id,
        index,
    }),
)
export const updateListName = createAction(
    'custom-lists/updateListName',
    (value, index) => ({
        value,
        index,
    }),
)

export const addPagetoList = createAction(
    'custom-lists/addPagetoList',
    (url, index) => ({
        url,
        index,
    }),
)
export const removePageFromList = createAction(
    'custom-lists/removePageFromList',
)
export const showListDeleteModal = createAction(
    'custom-lists/showListDeleteModal',
    (id, index) => ({
        id,
        index,
    }),
)
export const hideListDeleteModal = createAction(
    'custom-lists/hideListDeleteModal',
)
// TODO: change names
export const resetListDeleteModal = createAction(
    'custom-lists/resetListDeleteModal',
)
export const resetActiveListIndex = createAction(
    'custom-lists/resetActiveListIndex',
)
export const setActiveListIndex = createAction(
    'custom-lists/setActiveListIndex',
)

// returns instance of ListStorageHandler class
export const listStorage = () => (dispatch, getState) =>
    new ListStorageHandler(dispatch, getState)

export const showEditBox = index => (dispatch, getState) => {
    const activeListIndex = selectors.activeListIndex(getState())
    if (activeListIndex === index) {
        dispatch(resetActiveListIndex())
    } else {
        dispatch(setActiveListIndex(index))
    }
}

/** 
 * @class
*/
export default class ListStorageHandler {
    constructor(dispatch, getState) {
        this._dispatch = dispatch
        this._getState = getState
    }

    async getListFromDB() {
        this._dispatch(getAllLists(dummyData))
    }

    async createList(event) {
        event.preventDefault()
        const { value } = event.target.elements['listName']
        const list = {
            _id: null,
            name: value,
            isDeletable: true,
            pages: [],
        }
        this._dispatch(createList(list))
    }

    getListById() {}

    delListById() {}

    updateList = index => async event => {
        event.preventDefault()
        const { value } = event.target.elements['listName']
        this._dispatch(resetActiveListIndex())
        this._dispatch(updateListName(value, index))
    }

    deleteList = () => event => {
        event.preventDefault()
        const { id, deleting } = selectors.deleteConfirmProps(this._getState())
        this._dispatch(deleteList(id, deleting))
        this._dispatch(resetListDeleteModal())
    }

    addPagetoList = (_id, index) => url => {
        this._dispatch(addPagetoList(url, index))
    }

    delPageFromList() {}
}