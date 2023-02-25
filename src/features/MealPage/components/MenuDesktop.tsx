import { Form, Row, Col } from 'react-bootstrap'
import type { MenuType, OptionType } from '../../../common/types/global'
import classNames from '../../../common/util/classNames'
import styles from './MenuDesktop.module.scss'
import useMenu from '../../../common/hooks/useMenu'
import BudgetInput from '../../../common/components/BudgetInput'

const MenuDesktop = ({
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
    <div className={classNames(styles.container, 'd-none d-lg-block')}>
      <Row>
        <Col xs={12} className="d-flex align-items-center justify-content-center mb-4">
          <img src={menuImage} alt="" width={'100%'} className={styles.img} />
        </Col>
        <Col xs={12}>
          <div className={styles.ingredients}>
            <span className={styles.ingredients__header}>Select ingredients : </span>
            {menu.ingredients.map((ingredient, index) => (
              <div key={ingredient.name}>
                <Row className={styles.ingredients__row}>
                  <Col md={3}>
                    <div className={styles.ingredients__name}>{`${ingredient.name}`}</div>
                    <div
                      className={
                        styles.ingredients__amount
                      }>{`${ingredientsWithTotalPrices[index]?.quantity} ${ingredientsWithTotalPrices[index]?.quantity_type}`}</div>
                  </Col>

                  {ingredient.options.map((option: OptionType, optionIndex: number) => (
                    <Col md={3} key={option.name}>
                      <div>
                        <Col xs={9}>
                          <Form.Check
                            type="radio"
                            id={option.name}
                            name={ingredient.name}
                            label={`${option.name}`}
                            className={styles.ingredients__option}
                            onChange={(e) => {
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
                          <div className={styles.ingredients__option_total_price}>
                            {`$${ingredientsWithTotalPrices[index]?.options[optionIndex]?.totalPrice}`}
                          </div>
                        </Col>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <div className="d-flex justify-content-between">
        <BudgetInput
          value={budget}
          onChange={setBudget}
          errorMessage={budgetFinderErrorMessage}
          onClick={findHighestQualityMeal}
          title="Find Best Quality"
          buttonTitle="Calculate"
        />

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
    </div>
  )
}

export default MenuDesktop
