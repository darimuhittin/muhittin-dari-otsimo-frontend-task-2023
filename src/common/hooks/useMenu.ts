import { useState, useEffect } from 'react'
import { getIngredientsWithTotalPrices, getPermutations } from '../util/functions'
import type { MenuType, OptionType } from '../types/global'

const useMenu = (menu: MenuType, preSelectQualities: string[] | undefined): any => {
  const [selectedIngredientOptions, setSelectedIngredientOptions] = useState<
    Array<{ name: string; option: OptionType }>
  >([] as Array<{ name: string; option: OptionType }>)
  const [menuOverallQuality, setMenuOverallQuality] = useState<string>('' as string)
  const [menuOverallPrice, setMenuOverallPrice] = useState<number>(0 as number)
  const [menuImage] = useState<string>(`/images/meals/${Math.floor(Math.random() * 3 + 1)}.jpg`)
  const [budget, setBudget] = useState<number>(0)
  const [budgetFinderErrorMessage, setBudgetFinderErrorMessage] = useState<string>('' as string)
  const [ingredientsWithTotalPrices, setIngredientsWithTotalPrices] = useState<
    Array<{
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
  >([])

  useEffect(() => {
    setIngredientsWithTotalPrices(getIngredientsWithTotalPrices(menu))
  }, [])
  useEffect(() => {
    calculateQuality()
    calculatePrice()
  }, [selectedIngredientOptions])

  useEffect(() => {
    setBudgetFinderErrorMessage('')
  }, [budget])

  useEffect(() => {
    if (preSelectQualities === undefined) return
    const _selectedIngredientOptions: Array<{ name: string; option: OptionType }> = []
    menu.ingredients.forEach((ingredient, index) => {
      const option = ingredient.options.find(
        (option) => option.quality === preSelectQualities[index]
      )
      if (option === undefined) return
      _selectedIngredientOptions.push({ name: ingredient.name, option })
    })
    setSelectedIngredientOptions(_selectedIngredientOptions)
  }, [preSelectQualities])

  const calculateQuality = (): void => {
    if (selectedIngredientOptions.length === menu.ingredients.length) {
      let quality = 0
      selectedIngredientOptions.forEach((option) => {
        if (option.option.quality === 'high') {
          quality += 30
        } else if (option.option.quality === 'medium') {
          quality += 20
        } else if (option.option.quality === 'low') {
          quality += 10
        }
      })
      const avarageQuality = quality / menu.ingredients.length
      if (avarageQuality >= 25) {
        setMenuOverallQuality('HIGH')
      } else if (avarageQuality >= 15) {
        setMenuOverallQuality('MEDIUM')
      } else {
        setMenuOverallQuality('LOW')
      }
    }
  }

  const calculatePrice = (): void => {
    if (selectedIngredientOptions.length === menu.ingredients.length) {
      let price = 0

      selectedIngredientOptions.forEach((option) => {
        const ingredient = menu.ingredients.find((ingredient) => ingredient.name === option.name)
        if (ingredient === undefined) return
        const quantity = ingredient.quantity
        // const pricePerAmount = option.option.per_amount
        // const quantityType = ingredient.quantity_type
        const pricePerUnit = option.option.price

        const multiplier = quantity / 1000

        // I DISABLED THIS LINE BECAUSE FOR "Pork chops with mashed potatoes and gravy" options' per_amount sections are litre but ingredients' quantity_type is gram this is a wrong information
        // These two are unnecessary but i included them for future use
        // if (pricePerAmount === 'kilogram') {
        //   if (quantityType === 'gram') {
        //     multiplier = quantity / 1000
        //   }
        // } else if (pricePerAmount === 'litre') {
        //   if (quantityType === 'millilitre') {
        //     multiplier = quantity / 1000
        //   }
        // }

        let additionalCost = 0
        if (option.option.quality === 'low') {
          additionalCost = 0.1
        } else if (option.option.quality === 'medium') {
          additionalCost = 0.05
        }

        const optionPrice = pricePerUnit * multiplier + additionalCost
        price += optionPrice
      })

      setMenuOverallPrice(price)
    }
  }

  const findHighestQualityMeal = (): void => {
    const _ingredientsWithTotalPrices = getIngredientsWithTotalPrices(menu)

    const qualities = ['high', 'medium', 'low']

    const permutations = getPermutations(qualities, menu.ingredients.length)

    const withQualityScores: [] = permutations.map((el: []) => {
      return {
        qualities: el,
        score: el.reduce((total: number, el: string): number => {
          if (el === 'high') {
            return total + 30
          } else if (el === 'medium') {
            return total + 20
          } else if (el === 'low') {
            return total + 10
          } else {
            return total
          }
        }, 0)
      }
    })

    const sortedQualityScores = withQualityScores.sort((a: any, b: any) => {
      return b.score - a.score
    })

    const qualityScoreTotalCostArray = sortedQualityScores.map((qualityScore: any) => {
      let totalCost = 0
      qualityScore.qualities.forEach((quality: string, index: number) => {
        const selectedOption = _ingredientsWithTotalPrices[index].options.find(
          (option) => option.quality === quality
        )
        if (selectedOption !== null && selectedOption !== undefined) {
          totalCost += selectedOption.totalPrice
        }
      })

      return {
        ...qualityScore,
        totalCost
      }
    })

    const finalSelectedQualityScores: Array<{
      qualities: string[]
      score: number
      totalCost: number
    }> = []
    let topScore = 0
    for (let i = 0; i < qualityScoreTotalCostArray.length; i++) {
      const current = qualityScoreTotalCostArray[i]
      if (current.totalCost <= budget && topScore <= current.score) {
        topScore = current.score
        finalSelectedQualityScores.push(current)
      }
    }

    let cheapestPrice = Number.MAX_VALUE
    let best: { qualities: string[]; score: number; totalCost: number }
    finalSelectedQualityScores.forEach((qualityScoreTotalCostObject) => {
      if (qualityScoreTotalCostObject.totalCost < cheapestPrice) {
        cheapestPrice = qualityScoreTotalCostObject.totalCost
        best = qualityScoreTotalCostObject
      }
    })

    const selected = menu.ingredients.map((ingredient, index) => {
      return {
        name: ingredient.name,
        option:
          ingredient?.options?.find((option) => option.quality === best?.qualities[index]) ??
          selectedIngredientOptions[index]?.option
      }
    })

    if (finalSelectedQualityScores.length > 0) {
      setSelectedIngredientOptions(selected)
    } else {
      setBudgetFinderErrorMessage(
        'No meal found with the given budget. Please increase the amount.'
      )
    }
  }
  return {
    menuImage,
    menuOverallPrice,
    menuOverallQuality,
    budget,
    selectedIngredientOptions,
    budgetFinderErrorMessage,
    ingredientsWithTotalPrices,
    findHighestQualityMeal,
    setSelectedIngredientOptions,
    setBudget,
    setBudgetFinderErrorMessage
  }
}

export default useMenu
