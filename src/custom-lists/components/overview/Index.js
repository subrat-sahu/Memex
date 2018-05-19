import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { slide as Menu } from 'react-burger-menu'

import * as actions from '../../actions'
import * as selectors from '../../selectors'
import extStyles from './Index.css'
import List from './MyCollections'
import CreateListForm from './CreateListForm'
import ListItem from './ListItem'

import { styles } from './ReactBurgerMenu'

class ListContainer extends Component {
    static propTypes = {
        listStorageHandler: PropTypes.func.isRequired,
        lists: PropTypes.array.isRequired,
        handleEditBtnClick: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
        this._listStorageHandler = this.props.listStorageHandler()
        this.state = {
            showCreateList: false,
        }
    }

    componentWillMount() {
        this._listStorageHandler.getListFromDB()
    }

    handleRenderCreateList = () =>
        this.setState({
            showCreateList: !this.state.showCreateList,
        })

    handleCreateListSubmit = e => {
        this._listStorageHandler.createList(e)
        this.setState({
            showCreateList: false,
        })
    }

    renderAllLists = () => {
        return this.props.lists.map((list, i) => {
            return !list.isEditing ? (
                <ListItem
                    key={i}
                    listName={list.name}
                    // onChecboxClick={this.props.editListN    ame(/*something ,*/ i)}
                    onEditButtonClick={this.props.handleEditBtnClick(i)}
                />
            ) : (
                <CreateListForm
                    key={i}
                    onCheckboxClick={this._listStorageHandler.updateList(i)}
                    value={list.name}
                />
            )
        })
    }

    renderCreateList = (shouldDisplayForm, value = null) =>
        shouldDisplayForm ? (
            <CreateListForm onCheckboxClick={this.handleCreateListSubmit} />
        ) : null

    render() {
        return (
            <div>
                <Menu
                    styles={styles}
                    noOverlay
                    customBurgerIcon={<img src="/img/sidebar_icon.svg" />}
                    customCrossIcon={<img src="/img/cross.svg" />}
                >
                    <a className={extStyles.showAll}>Show All</a>
                    <hr className={extStyles.hr} />
                    <List
                        handleRenderCreateList={this.handleRenderCreateList}
                    />
                    {this.renderCreateList(this.state.showCreateList)}
                    {this.renderAllLists()}
                </Menu>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    lists: selectors.results(state),
})

const mapDispatchToProps = (dispatch, getState) => ({
    listStorageHandler: () => dispatch(actions.listStorage()),
    handleEditBtnClick: index => event => {
        event.preventDefault()
        dispatch(actions.showEditBox(index))
    },
    // createList: list => event => {
    //     event.preventDefault()
    //     dispatch(actions.showEditBox(list))
    // },
    // editListName: list => event => {
    //     event.preventDefault()
    //     dispatch(actions.showEditBox(list, index))
    // }
})

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
