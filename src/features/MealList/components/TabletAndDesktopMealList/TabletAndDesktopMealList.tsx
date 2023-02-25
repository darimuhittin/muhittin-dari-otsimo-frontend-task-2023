import { useEffect } from 'react'
import type { MealType } from '../../../../common/types/global'
import styles from './TabletAndDesktopMealList.module.scss'
import { Form, Row, Col } from 'react-bootstrap'
import classNames from '../../../../common/util/classNames'
import useMealList from '../../../../common/hooks/useMealList'
import { Link } from 'react-router-dom'
import BudgetInput from '../../../../common/components/BudgetInput'

const TabletAndDesktopMealList = ({ meals }: { meals: MealType[] }): JSX.Element => {
  const {
    sortedMeals,
    filter,
    budget,
    budgetError,
    sortType,
    ingredientsWithTotalPricesArray,
    cheapestPrices,
    mostExpensivePrices,
    setSortType,
    setFilter,
    setBudget,
    selectRandomMeal,
    isVegan,
    isVegetarian
  }: {
    sortedMeals: MealType[]
    filter: 'all' | 'vegan' | 'vegetarian'
    budget: number
    budgetError: string
    sortType: 'all' | 'name'
    ingredientsWithTotalPricesArray: any
    cheapestPrices: number[]
    mostExpensivePrices: number[]
    setSortType: (sortType: 'all' | 'name') => void
    setFilter: (filter: 'all' | 'vegan' | 'vegetarian') => void
    setBudget: (budget: number) => void
    selectRandomMeal: () => void
    isVegan: (meal: MealType) => boolean
    isVegetarian: (meal: MealType) => boolean
  } = useMealList(meals)

  useEffect(() => {
    console.log(ingredientsWithTotalPricesArray)
  }, [ingredientsWithTotalPricesArray])
  return (
    <div className="d-none d-md-block">
      <div className="font-jost">
        <div className="text-muted">Click on product to view details</div>
        <div className={styles.budget_input_container}>
          <BudgetInput
            buttonTitle="Select"
            title="Find random meal for your budget"
            value={budget}
            onChange={setBudget}
            errorMessage={budgetError}
            onClick={selectRandomMeal}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <Form.Select
            className={classNames(styles.select, 'shadow-none')}
            onChange={(e) => {
              setSortType(e.target.value as 'all' | 'name')
            }}
            value={sortType}>
            <option value="all">Default Sorting</option>
            <option value="name">Sort by name</option>
          </Form.Select>

          <div className="w-100 text-center">Showing all {sortedMeals.length} results.</div>
          <Form.Select
            className={classNames(styles.select, 'shadow-none')}
            onChange={(e) => {
              setFilter(e.target.value as 'all' | 'vegan' | 'vegetarian')
            }}
            value={filter}>
            <option value="all">All Types</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
          </Form.Select>
        </div>
      </div>
      <div>
        <Row>
          <Col md={3}>Image</Col>
          <Col md={2}>Name</Col>
          <Col md={2}>Ingredients</Col>
          <Col md={2}>Min. Price</Col>
          <Col md={2}>Max. Price</Col>
          <Col md={1}>Type</Col>
        </Row>
        {sortedMeals.map((meal: MealType, index: number) => {
          return (
            <Link to={`/meals/${meal.id}`} key={meal.id}>
              <Row key={meal.name} className={styles.meal_row}>
                <Col md={3}>
                  <img src={`/images/meal_list/${(meal.id % 4) + 1}.jpg`} alt="" width={150} />
                </Col>
                <Col md={2}>{meal.name}</Col>
                <Col md={2}>{meal.ingredients.map((e) => e.name).join(', ')}</Col>
                <Col md={2} className="text-success">
                  {cheapestPrices[meal.id - 1]?.toFixed(2) ?? 'Calculating...'}
                </Col>
                <Col md={2} className="text-warning">
                  {mostExpensivePrices[meal.id - 1]?.toFixed(2) ?? 'Calculating...'}
                </Col>
                <Col md={1}>
                  {isVegan(meal) ? (
                    <span className="text-success">Vegan</span>
                  ) : isVegetarian(meal) ? (
                    <span className="text-warning">Vegetarian</span>
                  ) : (
                    <span>Non-Vegetarian</span>
                  )}
                </Col>
              </Row>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TabletAndDesktopMealList
