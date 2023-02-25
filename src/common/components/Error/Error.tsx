import styles from './Error.module.scss'
import classNames from '../../util/classNames'

const Error = ({ error }: { error: string }): JSX.Element => {
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
          <div>
            <div className={styles.header}>
              <strong>Oh snap !</strong>
              something went wrong. Please try again later.
            </div>
            <div className={styles.error}>
              <strong>Error: </strong>
              {error}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Error
