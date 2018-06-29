import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './IndexDropdown.css'

class IndexDropdown extends PureComponent {
    static propTypes = {
        children: PropTypes.array.isRequired,
        onTagSearchChange: PropTypes.func.isRequired,
        onTagSearchKeyDown: PropTypes.func.isRequired,
        numberOfTags: PropTypes.number.isRequired,
        setTagDivRef: PropTypes.func,
        setInputRef: PropTypes.func.isRequired,
        tagSearchValue: PropTypes.string.isRequired,
        hover: PropTypes.bool,
        source: PropTypes.oneOf(['tag', 'domain', 'list']).isRequired,
        url: PropTypes.string,
    }

    get mainClass() {
        return cx(styles.tagDiv, {
            [styles.tagDivFromOverview]: this.props.hover,
            [styles.tagDivForFilter]: !this.props.url,
        })
    }

    get searchPlaceholder() {
        return `Search & Add ${this.placeholder}`
    }

    get placeholder() {
        let placeholder
        switch (this.props.source) {
            case 'tag':
                placeholder = 'Tags'
                break
            case 'domain':
                placeholder = 'Domain'
                break
            case 'list':
                placeholder = 'Lists'
                break
            default:
        }
        return placeholder
    }

    get unit() {
        return this.placeholder.toLowerCase()
    }

    render() {
        return (
            <div className={this.mainClass} ref={this.props.setTagDivRef}>
                <form className={styles.searchContainer}>
                    <input
                        className={styles.search}
                        name="query"
                        placeholder={this.searchPlaceholder}
                        onChange={this.props.onTagSearchChange}
                        onKeyDown={this.props.onTagSearchKeyDown}
                        ref={this.props.setInputRef}
                        autoComplete="off"
                        value={this.props.tagSearchValue}
                        autoFocus
                    />
                    <i className="material-icons">search</i>
                </form>
                <div className={styles.tagContainer}>{this.props.children}</div>
                <div className={styles.summaryTagContainer}>
                    <div className={styles.numberTags}>
                        <span className={styles.bold}>
                            {this.props.numberOfTags}
                        </span>{' '}
                        {this.unit} selected
                    </div>
                </div>
            </div>
        )
    }
}

export default IndexDropdown
