import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { slide as Menu } from 'react-burger-menu'
import extStyles from './Index.css'
import List from './MyCollections'
import CreateListForm from './CreateListForm'
import { styles } from './ReactBurgerMenu'

class ListContainer extends Component {
    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            showCreateList: false,
        }
    }

    handleRenderCreateList = () =>
        this.setState({
            showCreateList: !this.state.showCreateList,
        })

    renderCreateList = (shouldDisplayForm, value = null) =>
        shouldDisplayForm ? <CreateListForm value={value} /> : null

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
                </Menu>
            </div>
        )
    }
}

export default ListContainer
