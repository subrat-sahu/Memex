import React from 'react'
import styles from './Index.css'
import PropTypes from 'prop-types'
// TODO: search find a better name

const List = props => (
    <div className={styles.collection}>
        <span className={styles.myCollection}> My Collections </span>
        <span className={styles.plus} onClick={props.handleRenderCreateList}>
            {' '}
            +{' '}
        </span>
    </div>
)

List.propTypes = {
    // renderCreateList: PropTypes.func.isRequired,
    handleRenderCreateList: PropTypes.func.isRequired,
}

export default List
