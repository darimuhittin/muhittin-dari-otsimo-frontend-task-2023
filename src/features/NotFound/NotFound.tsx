import styles from './NotFound.module.scss'
import classNames from '../../common/util/classNames'

const NotFound = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <section
        className={classNames(styles.banner, 'd-flex align-items-center justify-content-center')}>
        <div className={classNames(styles.banner__content, 'container')}>
          <div className={styles.company_name}>
            <h2 className="text-center">
              <strong>404</strong>
            </h2>
          </div>
        </div>
      </section>
      <section className={styles.content}>
        <div className="container space-y-6">
          <div>
            <h1 className={classNames('text-center', styles.h1)}>Oops.</h1>
            <h2 className={classNames('text-center', styles.h2)}>
              We could not find the page you are looking for.
            </h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NotFound
