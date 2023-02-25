import styles from './LoadingSpinner.module.scss'
import classNames from '../../util/classNames'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.backdrop__banner} />

      <section
        className={classNames(styles.banner, 'd-flex align-items-center justify-content-center')}>
        <div className={classNames(styles.banner__content, 'container')}>
          <div className={styles.company_name}>
            <h2 className="text-center">
              <strong>MEAL LIST</strong>
            </h2>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={classNames('container space-y-6', styles.loading)}>
          <Spinner
            animation="border"
            role="status"
            style={{
              width: '3rem',
              height: '3rem',
              margin: 'auto',
              display: 'block'
            }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </section>
    </div>
  )
}

export default LoadingSpinner
