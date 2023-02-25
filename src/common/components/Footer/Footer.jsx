import classNames from 'common/util/classNames'

import { faMapMarker, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Form } from 'react-bootstrap'

import styles from './Footer.module.scss'
const Footer = () => {
  return (
    <footer className={classNames(styles.footer__container, 'bg-dark font-jost')}>
      <Row className="container mx-auto">
        <Col xs={12} md={6} lg={3} className="font-14 my-4">
          <h4 className="mb-4">TRANSPARENT</h4>

          <ul className={styles.footer_ul}>
            <li>
              <i className="me-2">
                <FontAwesomeIcon icon={faMapMarker} />
              </i>
              <span>Fareli Çorba Cad. No:38 Çankaya ANKARA</span>
            </li>
            <li>
              <i className="me-2">
                <FontAwesomeIcon icon={faPhone} />
              </i>
              <span>0553 716 46 70</span>
            </li>
            <li>
              <i className="me-2">
                <FontAwesomeIcon icon={faEnvelope} />
              </i>
              <span>darimuhittin@gmail.com</span>
            </li>
          </ul>
        </Col>
        <Col xs={12} md={6} lg={3} className="font-14 my-4">
          <h4 className="mb-4">Corporate</h4>
          <ul className={styles.footer_ul}>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Gallery</a>
            </li>{' '}
            <li>
              <a href="#">Lorem ipsum dolor sit amet</a>
            </li>{' '}
            <li>
              <a href="#">Test</a>
            </li>{' '}
            <li>
              <a href="#">Shop</a>
            </li>
          </ul>
        </Col>
        <Col xs={12} md={6} lg={2} className="font-14 my-4">
          <h4 className="mb-4">Customer Service</h4>
          <ul className={styles.footer_ul}>
            <li>
              <a href="#">Security</a>
            </li>
            <li>
              <a href="#">Technical Informations</a>
            </li>{' '}
            <li>
              <a href="#">Return Policy</a>
            </li>{' '}
            <li>
              <a href="#">Privacy Policy</a>
            </li>{' '}
            <li>
              <a href="#">Working Hours</a>
            </li>
          </ul>
        </Col>
        <Col xs={12} md={6} lg={4} className="font-14 my-4">
          <h4 className="mb-4">Join our newsletter</h4>
          <span>
            Sign up for our newsletter to be instantly informed about our campaigns and discounted
            products.
          </span>
          <p className="mt-5">Enter Your E-Mail Address</p>
          <div className="mb-3 mt-4 d-lg-flex">
            <Form.Control placeholder="Your E-Mail Address" className={styles.footer__input} />
            <button className={styles.footer__button}>Subscribe</button>
          </div>
        </Col>
      </Row>
    </footer>
  )
}

export default Footer
