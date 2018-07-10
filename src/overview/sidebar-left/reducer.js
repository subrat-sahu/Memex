import { createReducer } from 'redux-act'

import * as actions from './actions'

const defaultState = {
    openSidebar: false,
    showFilters: false,
}

const showFilters = state => ({
    ...state,
    showFilters: true,
})

const hideFilters = state => ({
    ...state,
    showFilters: false,
})

const openSidebar = state => ({
    ...state,
    openSidebar: true,
})

const closeSidebar = state => ({
    ...state,
    openSidebar: true,
})

const setSidebarState = (state, isOpen) => ({
    ...state,
    openSidebar: isOpen,
})

export default createReducer(
    {
        [actions.openSidebar]: openSidebar,
        [actions.closeSidebar]: closeSidebar,
        [actions.showFilters]: showFilters,
        [actions.hideFilters]: hideFilters,
        [actions.setSidebarState]: setSidebarState,
    },
    defaultState,
)