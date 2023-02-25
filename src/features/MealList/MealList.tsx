import LineHeader from '../../common/components/LineHeader'
import classNames from '../../common/util/classNames'
import styles from './MealList.module.scss'
import { useQuery } from 'react-query'
import { getQuery } from '../../app/api/API'
import MobileMealList from './components/MobileMealList'
import TabletAndDesktopMealList from './components/TabletAndDesktopMealList'
import LoadingSpinner from '../../common/components/LoadingSpinner'
import useWindowSize from '../../common/hooks/useWindowSize'
import Error from '../../common/components/Error'

const MealList = (): JSX.Element => {
  const { width } = useWindowSize()
  const query = useQuery('meals', {
    queryFn: async () => await getQuery('/listMeals'),
    onSuccess: (data) => {}
  })

  if (query?.isError) return <Error error={query?.error?.toString() ?? ''} />

  if (query.isLoading) return <LoadingSpinner />

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
        <div className="container space-y-6">
          <div>
            <LineHeader text="LIST" />
            {width !== null && width !== undefined && width < 768 ? (
              <MobileMealList meals={query.data} />
            ) : (
              <TabletAndDesktopMealList meals={query.data} />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default MealList
