import { useState } from 'react'

import {
  faChevronDown,
  faTimes,
  faChevronUp,
  faLocationDot,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'common/util/classNames'
import styles from './styles.module.scss'
import { CLOSE_MOBILE_MENU } from 'global/slices/globalSlice'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterest,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

const MobileMenu = () => {
  const { isMobileMenuOpen } = useSelector((state) => state.global)
  const [activeSubMenu, setActiveSubMenu] = useState(false)
  const dispatch = useDispatch()
  return (
    <div
      className={classNames(styles.mobile_menu_container, isMobileMenuOpen ? styles.active : '')}>
      <div className={styles.mobile_menu_wrapper}>
        <div className={classNames('d-flex justify-content-between', styles.head)}>
          <div className={styles.brand}>T.</div>
          <span className={styles.mobile_menu_close}>
            <FontAwesomeIcon
              icon={faTimes}
              className={styles.chevron}
              onClick={() => {
                dispatch(CLOSE_MOBILE_MENU())
              }}
              size="2x"
            />
          </span>
        </div>
        <nav className={styles.mobile_nav}>
          <ul className={classNames(styles.mobile_menu, 'font-jost')}>
            <li>
              <Link
                to={'/'}
                onClick={() => {
                  dispatch(CLOSE_MOBILE_MENU())
                }}>
                Home
              </Link>
            </li>{' '}
            <li>
              <Link
                to={'/meal-list'}
                onClick={() => {
                  dispatch(CLOSE_MOBILE_MENU())
                }}>
                Meal List
              </Link>
            </li>{' '}
            <li>
              <a href="#">Our Menu</a>
            </li>{' '}
            <li className={styles.dropdown}>
              <a className={styles.dropdownBtn}>
                <div>Contact</div>
                <FontAwesomeIcon
                  icon={activeSubMenu ? faChevronUp : faChevronDown}
                  className={styles.chevron}
                  onClick={() => {
                    setActiveSubMenu(!activeSubMenu)
                  }}
                />
              </a>
              <ul className={classNames(styles.subMenu, activeSubMenu ? styles.active : '')}>
                <li>
                  <a href="#">Reservation</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
          </ul>
        </nav>

        <div className={styles.social}>
          <div className="d-flex space-x-4">
            <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faPinterest} />
            <FontAwesomeIcon icon={faYoutube} />
          </div>
        </div>

        <div className={classNames(styles.contact, 'font-jost')}>
          <div className="d-flex space-x-5 align-items-center">
            <FontAwesomeIcon icon={faLocationDot} />
            <div>Ankara, Çankaya</div>
          </div>
          <div className="d-flex space-x-4 align-items-center">
            <FontAwesomeIcon icon={faPhone} />
            <div>+90-553-716-46-70</div>
          </div>
          <div className="d-flex space-x-4 align-items-center">
            <FontAwesomeIcon icon={faEnvelope} />
            <div>otsimo@otsimo.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
