import { Link } from 'react-router-dom'
import type { MealType } from '../../../../common/types/global'
import styles from './ListItem.module.scss'
const ListItem = ({
  meal,
  data,
  isVegan,
  isVegetarian
}: {
  meal: MealType
  data: Array<{
    options: Array<{
      totalPrice: number
      name: string
      quality: 'high' | 'low' | 'medium'
      price: number
      per_amount: 'kilogram' | 'litre'
    }>
    name: string
    groups?: Array<'vegan' | 'vegetarian'>
    quantity: number
    quantity_type: 'gram' | 'millilitre'
  }>
  isVegan: (meal: MealType) => boolean
  isVegetarian: (meal: MealType) => boolean
}): JSX.Element => {
  console.log('DATA ::: ', data)
  return (
    <Link to={`/meals/${meal.id}`}>
      <div className={styles.container}>
        <div className="text-center">
          <img
            src={`/images/meal_list/${(meal.id % 4) + 1}.jpg`}
            alt="meal"
            width={'100%'}
            height={'auto'}
          />
          <div className={styles.meal_name}>{meal.name}</div>
          <div>{meal.ingredients.map((ingredient) => ingredient.name).join(', ')}</div>
          <div className="d-flex align-items-center flex-column space-y-2 my-2">
            <div className={styles.info_box}>
              {data !== undefined && data !== null
                ? `Min Price : $${data
                    ?.reduce((acc: number, cur: Record<string, any>) => {
                      const currentPrice = Number(
                        cur.options.find((option: any) => option.quality === 'low').totalPrice
                      )
                      return currentPrice + acc
                    }, 0)
                    .toFixed(2)}`
                : 'Calculating ...'}
            </div>
            <div className={styles.info_box}>
              {' '}
              {data !== undefined && data !== null
                ? `Max Price : $${data
                    ?.reduce((acc: number, cur: Record<string, any>) => {
                      const currentPrice = Number(
                        cur.options.find((option: any) => option.quality === 'high').totalPrice
                      )
                      return currentPrice + acc
                    }, 0)
                    .toFixed(2)}`
                : 'Calculating ...'}
            </div>
            <div className={styles.info_box}>
              {' '}
              {isVegan(meal) ? (
                <span className="text-success">Vegan</span>
              ) : isVegetarian(meal) ? (
                <span className="text-warning">Vegetarian</span>
              ) : (
                <span>Non-Vegetarian</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ListItem
