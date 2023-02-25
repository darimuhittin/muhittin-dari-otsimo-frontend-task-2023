// Disable strict boolean expressions because of the filter function
// Should be fixed in the future
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import type { MealType } from '../../../../common/types/global'
import ListItem from './ListItem'
import styles from './MobileMealList.module.scss'
import { Form } from 'react-bootstrap'
import classNames from '../../../../common/util/classNames'
import useMealList from '../../../../common/hooks/useMealList'
import BudgetInput from '../../../../common/components/BudgetInput'
const MobileMealList = ({ meals }: { meals: MealType[] }): JSX.Element => {
  const {
    sortedMeals,
    filter,
    sortType,
    budget,
    setBudget,
    budgetError,
    selectRandomMeal,
    setSortType,
    setFilter,
    ingredientsWithTotalPricesArray,
    isVegan,
    isVegetarian
  } = useMealList(meals)

  return (
    <div className="d-md-none">
      <div className="font-jost">
        <div>Click on an item to details.</div>
        <BudgetInput
          buttonTitle="Select"
          title="Find random meal for your budget"
          value={budget}
          onChange={setBudget}
          errorMessage={budgetError}
          onClick={selectRandomMeal}
        />
        <div>Showing all {sortedMeals.length} results.</div>
        <Form.Select
          className={classNames(styles.select, 'shadow-none')}
          onChange={(e) => {
            setSortType(e.target.value as 'all' | 'name')
          }}
          value={sortType}>
          <option value="all">Default Sorting</option>
          <option value="name">Sort by name</option>
        </Form.Select>
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
      <div>
        {sortedMeals.map((meal: any, index: number) => (
          <ListItem
            key={meal.id}
            meal={meal}
            data={ingredientsWithTotalPricesArray?.[meal.id - 1]}
            isVegan={isVegan}
            isVegetarian={isVegetarian}
          />
        ))}
      </div>
    </div>
  )
}

export default MobileMealList
