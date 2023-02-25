import type { MenuType } from '../types/global'

// This function calculates permutations of a given array.
export const getPermutations = (list: any, maxLen: any): any => {
  // Copy initial values as arrays
  const perm = list.map(function (val: any) {
    return [val]
  })
  // Our permutation generator
  const generate = (perm: any, maxLen: any, currLen: number): any => {
    // Reached desired length
    if (currLen === maxLen) {
      return perm
    }
    // For each existing permutation
    for (let i = 0, len = perm.length; i < len; i++) {
      const currPerm = perm.shift()
      // Create new permutation
      for (let k = 0; k < list.length; k++) {
        perm.push(currPerm.concat(list[k]))
      }
    }
    // Recurse
    return generate(perm, maxLen, currLen + 1)
  }
  // Start with size 1 because of initial values
  return generate(perm, maxLen, 1)
}

// This function returns the ingredients with total prices.
export const getIngredientsWithTotalPrices = (
  menu: MenuType
): Array<{
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
}> => {
  return menu.ingredients.map((ingredient) => {
    return {
      ...ingredient,
      options: ingredient.options.map((option) => {
        return {
          ...option,
          totalPrice: Number(
            (
              (ingredient.quantity / 1000) * option.price +
              (option.quality === 'high'
                ? 0
                : option.quality === 'medium'
                ? 0.05
                : option.quality === 'low'
                ? 0.1
                : 0)
            ).toFixed(2)
          )
        }
      })
    }
  })
}

// This function returns an array that contains the menu id and the qualities of the ingredients
// and quality score and total cost of that choices for the given budget.
// results.totalCost < budget
// An example return value for menu with id 1 :
// [
//   {
//       "id": 1,
//       "qualities": [
//           "high",
//           "high"
//       ],
//       "score": 60,
//       "totalCost": 1.21
//   },
//   {
//       "id": 1,
//       "qualities": [
//           "high",
//           "medium"
//       ],
//       "score": 50,
//       "totalCost": 1.01
//   },
//   {
//       "id": 1,
//       "qualities": [
//           "medium",
//           "high"
//       ],
//       "score": 50,
//       "totalCost": 1.14
//   },
//   {
//       "id": 1,
//       "qualities": [
//           "high",
//           "low"
//       ],
//       "score": 40,
//       "totalCost": 0.8
//   },
//   {
//       "id": 1,
//       "qualities": [
//           "medium",
//           "medium"
//       ],
//       "score": 40,
//       "totalCost": 0.94
//   },
//   {
//       "id": 1,
//       "qualities": [
//           "low",
//           "high"
//       ],
//       "score": 40,
//       "totalCost": 1.13
//   },
//   {
//       "id": 1,
//       "qualities": [
//           "medium",
//           "low"
//       ],
//       "score": 30,
//       "totalCost": 0.73
//   },
//   {
//       "id": 1,
//       "qualities": [
//           "low",
//           "medium"
//       ],
//       "score": 30,
//       "totalCost": 0.93
//   },
//   {
//       "id": 1,
//       "qualities": [
//           "low",
//           "low"
//       ],
//       "score": 20,
//       "totalCost": 0.72
//   }
// ]
export const getPreparedMenuByBudget = (menu: MenuType, budget: number): any[] => {
  const ingredientsWithTotalPrices = getIngredientsWithTotalPrices(menu)

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
      const selectedOption = ingredientsWithTotalPrices[index].options.find(
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
    id: string
    qualities: string[]
    score: number
    totalCost: number
  }> = []

  for (let i = 0; i < qualityScoreTotalCostArray.length; i++) {
    const current = qualityScoreTotalCostArray[i]
    if (current.totalCost <= budget) {
      finalSelectedQualityScores.push({ id: menu.id, ...current })
    }
  }

  return finalSelectedQualityScores
}

// This function is same as above but it returns independent of the budget. ( all of them )
export const getPreparedMenu = (menu: MenuType): any[] => {
  const ingredientsWithTotalPrices = getIngredientsWithTotalPrices(menu)

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
      const selectedOption = ingredientsWithTotalPrices[index].options.find(
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

  return qualityScoreTotalCostArray
}
