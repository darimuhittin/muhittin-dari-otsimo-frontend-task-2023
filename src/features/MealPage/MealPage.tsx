import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import type { MenuType } from '../../common/types/global'
import { getQuery } from '../../app/api/API'
import styles from './MealPage.module.scss'
import classNames from '../../common/util/classNames'

import MenuMobile from './components/MenuMobile'
import MenuDesktop from './components/MenuDesktop'
import LoadingSpinner from '../../common/components/LoadingSpinner'
import useWindowSize from '../../common/hooks/useWindowSize'
import Error from '../../common/components/Error'
const MealPage = (par: any): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const qualities = searchParams.get('qualities')
  const windowSize = useWindowSize()

  if (id === undefined) return <div>Meal Page</div>

  const {
    data: menu,
    isLoading,
    isError,
    error
  } = useQuery<MenuType>(['meal', id], {
    queryFn: async () => await getQuery(`/get/${id}`),
    onSuccess: (data) => {},
    enabled: id !== undefined
  })

  if (isError) return <Error error={error?.toString() ?? ''} />

  if (menu === undefined || isLoading) return <LoadingSpinner />

  return (
    <div className={styles.container}>
      <div className={styles.backdrop__banner} />

      <section
        className={classNames(styles.banner, 'd-flex align-items-center justify-content-center')}>
        <div className={classNames(styles.banner__content, 'container')}>
          <div className={styles.company_name}>
            <h2 className="text-center">
              <strong></strong>
            </h2>
          </div>
        </div>
      </section>

      <section className={styles.menu_section}>
        <div className="container space-y-6">
          <div>
            <div className={classNames('font-jost w-100 text-center', styles.menu_name)}>
              {menu.name.toUpperCase()}
            </div>
            {windowSize.width !== null &&
            windowSize.width !== undefined &&
            windowSize.width >= 1024 ? (
              <MenuDesktop menu={menu} preSelectQualities={qualities?.split(',')} />
            ) : (
              <MenuMobile menu={menu} preSelectQualities={qualities?.split(',')} />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default MealPage
