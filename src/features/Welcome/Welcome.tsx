import LineHeader from '../../common/components/LineHeader'
import SelectionCard from '../../common/components/SelectionCard'
import classNames from '../../common/util/classNames'
import styles from './Welcome.module.scss'
import { useQuery } from 'react-query'
import { getQuery } from '../../app/api/API'
import type { MealType } from '../../common/types/global'
import LoadingSpinner from '../../common/components/LoadingSpinner'
import Error from '../../common/components/Error'

const Welcome = (): JSX.Element => {
  const query = useQuery('todos', {
    queryFn: async () => await getQuery('/listMeals'),
    onSuccess: (data) => {}
  })

  if (query.isError) return <Error error={query?.error?.toString() ?? ''} />
  if (query.isLoading) return <LoadingSpinner />

  return (
    <div className={styles.container}>
      <div className={styles.backdrop__banner} />

      <section
        className={classNames(styles.banner, 'd-flex align-items-center justify-content-center')}>
        <div className={classNames(styles.banner__content, 'container')}>
          <LineHeader text="WELCOME TO" />

          <div className={styles.company_name}>
            <h2 className="text-center">
              <strong>TRANSPARENT</strong>
              <br />
              RESTAURANT
            </h2>
          </div>
          <div className={classNames(styles.meals, 'font-jost')}>
            <p className="text-center mt-4">Rice. Pasta. Chicken. Beef. Wine.</p>
          </div>
        </div>
      </section>

      <section className={styles.about_us}>
        <div className="container space-y-6">
          <div>
            <LineHeader text="ABOUT US" />
            <p className="text-center font-jost">
              Welcome to our restaurant! At Transparent Restaurant, we believe in transparency and
              honesty when it comes to the quality of ingredients we use in our meals. We take pride
              in giving our customers the power to choose the ingredients they want and the quality
              level they prefer. Whether you want the cheapest option or the most expensive, we give
              you the choice to customize your meal according to your budget and taste.
              <br />
              <br /> Our menu is carefully crafted to cater to different dietary preferences,
              including vegan and vegetarian options. We source our ingredients from local farmers
              and suppliers, ensuring that we only serve the freshest and highest quality
              ingredients in our dishes. <br />
              <br /> We understand that time is of the essence, especially when you&apos;re hungry
              and waiting for your food. That&apos;s why we&apos;ve designed our website to make it
              easy and fast for you to choose and customize your meal. With just a few clicks, you
              can select the ingredients and quality level you want, and our system will dynamically
              calculate the price for you. <br />
              <br /> We hope you enjoy your dining experience with us, and we look forward to
              serving you the best meals with honesty and transparency.
            </p>
          </div>

          <div>
            <LineHeader text="OUR SELECTIONS" />
          </div>
          <div className={styles.selection_cards}>
            {query.data.slice(0, 3).map((meal: MealType, index: number) => (
              <SelectionCard key={meal.id} meal={meal} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Welcome
