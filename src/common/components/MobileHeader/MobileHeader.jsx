import { faBars, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './MobileHeader.module.scss'
import { useDispatch } from 'react-redux'
import { TOGGLE_MOBILE_MENU } from '../../../global/slices/globalSlice'
import classNames from 'common/util/classNames'

const MobileHeader = () => {
  const dispatch = useDispatch()
  return (
    <div className={classNames(styles.header, 'd-lg-none')}>
      <div className={styles.header__container}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <div className={styles['header__icon-container']}>
              <FontAwesomeIcon
                icon={faBars}
                onClick={() => {
                  dispatch(TOGGLE_MOBILE_MENU())
                }}
                size="2x"
              />
            </div>
          </div>
          <div>
            <span className={styles.brand}>T.</span>
          </div>
          <div className={styles['header__icon-container']}>
            <div
              style={{
                cursor: 'pointer',
                marginLeft: '14px',
                display: 'inline-block',
                position: 'relative'
              }}>
              <FontAwesomeIcon icon={faShoppingBag} onClick={() => {}} size={'2x'} />
              {/* CART ITEM COUNT INDICATOR ABSOLUTE */}
              {/* {items && items.length > 0 && (
                <div className={styles.cart__itemCount}>{items.length}</div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileHeader
