import { Form, Row, Col } from 'react-bootstrap'
import type { MenuType, OptionType } from '../../../common/types/global'
import classNames from '../../../common/util/classNames'
import styles from './MenuMobile.module.scss'
import useMenu from '../../../common/hooks/useMenu'
import BudgetInput from '../../../common/components/BudgetInput'

const MenuMobile = ({
  menu,
  preSelectQualities
}: {
  menu: MenuType
  preSelectQualities: string[] | undefined
}): JSX.Element => {
  const {
    menuImage,
    menuOverallPrice,
    menuOverallQuality,
    budget,
    budgetFinderErrorMessage,
    selectedIngredientOptions,
    ingredientsWithTotalPrices,
    findHighestQualityMeal,
    setSelectedIngredientOptions,
    setBudget
  }: {
    menuOverallPrice: number
    menuImage: string
    menuOverallQuality: string
    budget: number
    budgetFinderErrorMessage: string
    selectedIngredientOptions: any
    ingredientsWithTotalPrices: Array<{
      options: Array<{
        totalPrice: number
        name: string
        quality: 'high' | 'low' | 'medium'
        price: number
        per_amount: 'kilogram' | 'litre'
      }>
      name: string
      groups: ['vegan' | 'vegetarian'] | undefined
      quantity: number
      quantity_type: 'gram' | 'millilitre'
    }>
    findHighestQualityMeal: () => void
    setSelectedIngredientOptions: (options: OptionType[]) => void
    setBudget: (budget: number) => void
    setBudgetFinderErrorMessage: (message: string) => void
  } = useMenu(menu, preSelectQualities)

  return (
    <div className={classNames(styles.container, 'd-lg-none')}>
      <div className="d-flex align-items-center justify-content-center">
        <img src={menuImage} alt="" width={'100%'} className={styles.img} />
      </div>

      <BudgetInput
        value={budget}
        errorMessage={budgetFinderErrorMessage}
        title="Find Best Quality"
        buttonTitle="Calculate"
        onChange={setBudget}
        onClick={findHighestQualityMeal}
      />
      <div className={styles.ingredients}>
        <span className={styles.ingredients__header}>Ingredients : </span>
        {menu.ingredients.map((ingredient, index) => (
          <div key={ingredient.name}>
            <div
              className={
                styles.ingredients__name
              }>{`${ingredient.name} - ${ingredientsWithTotalPrices[index]?.quantity} ${ingredientsWithTotalPrices[index]?.quantity_type}`}</div>
            <Row className={styles.ingredients__col_names}>
              <Col xs={3}>Quality :</Col>
              <Col xs={9}>Type :</Col>
            </Row>
            {ingredient.options.map((option: OptionType, optionIndex: number) => (
              <div key={option.name} className="my-4">
                <Row>
                  <Col xs={3}>{option.quality.toUpperCase()}</Col>
                  <Col xs={9}>
                    <Form.Check
                      type="radio"
                      id={option.name}
                      name={ingredient.name}
                      label={`${option.name}`}
                      className={styles.ingredients__option}
                      onChange={() => {
                        const newSelectedIngredientOptions = [...selectedIngredientOptions]
                        const index = newSelectedIngredientOptions.findIndex(
                          (selectedOption) => selectedOption.name === ingredient.name
                        )
                        if (index === -1) {
                          newSelectedIngredientOptions.push({
                            name: ingredient.name,
                            option
                          })
                        } else {
                          newSelectedIngredientOptions[index] = {
                            name: ingredient.name,
                            option
                          }
                        }
                        setSelectedIngredientOptions(newSelectedIngredientOptions)
                      }}
                      checked={selectedIngredientOptions[index]?.option?.name === option.name}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={3}>Price :</Col>
                  <Col xs={9}>
                    ${ingredientsWithTotalPrices[index]?.options[optionIndex]?.totalPrice}
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.price_quality_section}>
        <div>
          <span>Price : </span>
          <span>{menuOverallPrice > 0 ? `$${menuOverallPrice.toFixed(2)}` : 'Select all'}</span>
        </div>
        <div>
          <span>Quality : </span>
          <span>{menuOverallQuality ?? ' Select all '}</span>
        </div>
      </div>
    </div>
  )
}

export default MenuMobile
