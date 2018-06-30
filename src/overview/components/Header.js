import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { OutLink } from 'src/common-ui/containers'
import DateRangeSelection from './DateRangeSelection'
import styles from './Overview.css'

const Header = ({
    currentQueryParams: { query, startDate, endDate },
    ...props
}) => (
    <div className={styles.navbar}>
        <div className={styles.logo} />
        <div className={styles.container}>
            <div className={styles.searchField}>
                <input
                    className={styles.query}
                    onChange={props.onInputChange}
                    placeholder="Search your memory; use # to filter by tag"
                    value={query}
                    ref={props.setInputRef}
                    onKeyDown={props.onQuerySearchKeyDown}
                    disabled={props.isSearchDisabled}
                />
                <DateRangeSelection
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={props.onStartDateChange}
                    onEndDateChange={props.onEndDateChange}
                    disabled={props.isSearchDisabled}
                />
            </div>
            <div
                className={styles.linkFilter}
                onClick={props.onShowFilterChange}
            >
                <img
                    src="/img/filter.png"
                    className={styles.iconFilter}
                    title="Click to view filters"
                />
            </div>
            <div
                className={styles.linkFilter}
                onClick={props.onListDropdownChange}
            >
                <img
                    src="/img/edit.svg"
                    className={styles.iconEdit}
                    title="Edit many results"
                />
            </div>
        </div>
        <div className={styles.links}>
            <OutLink
                className={styles.upgrade}
                to="https://worldbrain.io/pricing"
            >
                Upgrade Memex
            </OutLink>
            <Link to="/settings">
                <img src="/img/settings-icon.png" className={styles.icon} />
            </Link>
        </div>
    </div>
)

Header.propTypes = {
    currentQueryParams: PropTypes.shape({
        query: PropTypes.string,
        startDate: PropTypes.number,
        endDate: PropTypes.number,
    }).isRequired,
    setInputRef: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
    onShowFilterChange: PropTypes.func.isRequired,
    onQuerySearchKeyDown: PropTypes.func.isRequired,
    isSearchDisabled: PropTypes.bool,
    onListDropdownChange: PropTypes.func.isRequired,
}

export default Header
