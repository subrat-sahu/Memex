import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import Dropdown from './DropdownContainer'
import EditDropdown from './ListEditDropdown'
import { selectors, actions } from 'src/custom-lists'

class ListEditDropdown extends Component {
    static propTypes = {
        urlsAdded: PropTypes.arrayOf(String).isRequired,
        applyBulkEdits: PropTypes.func.isRequired,
        handleToggleAddToList: PropTypes.func.isRequired,
        showAddToList: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            addToList: false,
        }
    }

    handleRenderDropdown = () =>
        this.props.showAddToList ? <Dropdown {...this.props} /> : null

    render() {
        return (
            <EditDropdown
                toggleAddToList={this.props.handleToggleAddToList}
                urlsAdded={this.props.urlsAdded}
                handleRenderDropdown={this.handleRenderDropdown()}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = state => ({
    urlsAdded: selectors.getUrlsToEdit(state),
    results: selectors.results(state),
    showAddToList: selectors.showAddToList(state),
})

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            bulkAddPagesToList: actions.bulkAddPagesToList,
            bulkRemovePagesFromList: actions.bulkRemovePagesFromList,
            applyBulkEdits: actions.applyBulkEdits,
            resetPagesinTempList: actions.resetPagesinTempList,
            setTempLists: actions.setTempLists,
            handleToggleAddToList: actions.handleToggleAddToList,
            closeAddToList: actions.closeAddToList,
        },
        dispatch,
    ),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListEditDropdown)