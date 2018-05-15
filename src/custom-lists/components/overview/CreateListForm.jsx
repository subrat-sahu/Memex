import React from 'react'
import styles from './Index.css'

const CreateListForm = ({ value }) => (
    <div className={styles.createListForm}>
        <div className={styles.tickWrap}>
            <img src="/img/tick.svg" className={styles.tick} />
        </div>
        <input
            className={styles.listForm}
            type="text"
            placeholder=""
            value={value}
            autoFocus
        />
    </div>
)

export default CreateListForm
