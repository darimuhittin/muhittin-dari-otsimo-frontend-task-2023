import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './DesktopHeader.module.scss'
import classNames from 'common/util/classNames'
import { Link } from 'react-router-dom'
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faPinterest,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
const DesktopHeader = () => {
  return (
    <div className={classNames(styles.header, 'd-none d-lg-block')}>
      <div className={classNames(styles.header__container, 'container')}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex space-x-6 font-jost">
            <Link to="/">HOME</Link>
            <Link to="/meal-list">MENU LIST</Link>
            <Link to="#">CONTACT</Link>
            <Link to="#">SHOP</Link>
          </div>
          <div>
            <span className={styles.brand}>T.</span>
          </div>
          <div
            className={classNames(styles['header__icon-container'], 'd-flex align-items-center')}>
            <div className={styles.social}>
              <div className="d-flex space-x-5">
                <FontAwesomeIcon icon={faFacebookF} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faPinterest} />
                <FontAwesomeIcon icon={faYoutube} />

                <FontAwesomeIcon icon={faShoppingBag} onClick={() => {}} size={'1x'} />
                {/* CART ITEM COUNT INDICATOR ABSOLUTE */}
                {/* {items && items.length > 0 && (
                <div className={styles.cart__itemCount}>{items.length}</div>
              )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopHeader
