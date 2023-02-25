import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { get, getQuery } from '../../app/api/API'
import type { MealType, IngredientsType, MenuType } from '../types/global'
import {
  getIngredientsWithTotalPrices,
  getPreparedMenuByBudget,
  getPreparedMenu
} from '../util/functions'
const useMealList = (meals: MealType[]): any => {
  const navigate = useNavigate()

  const [sortedMeals, setSortedMeals] = useState<MealType[]>(meals)
  const [sortType, setSortType] = useState<'all' | 'name'>('all')
  const [filter, setFilter] = useState<'all' | 'vegan' | 'vegetarian'>('all')
  const [budget, setBudget] = useState<number>(0)
  const [budgetError, setBudgetError] = useState<string>('')
  const [menus, setMenus] = useState<MenuType[]>([])
  // const [ingredientsWithTotalPricesArray, setIngredientsWithTotalPricesArray]: Array<
  //   Array<{
  //     options: Array<{
  //       totalPrice: number
  //       name: string
  //       quality: 'high' | 'low' | 'medium'
  //       price: number
  //       per_amount: 'kilogram' | 'litre'
  //     }>
  //     name: string
  //     groups: ['vegan' | 'vegetarian'] | undefined
  //     quantity: number
  //     quantity_type: 'gram' | 'millilitre'
  //   }>
  // > = useState()
  const [ingredientsWithTotalPricesArray, setIngredientsWithTotalPricesArray]: [
    Array<
      Array<{
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
    >,
    React.Dispatch<
      React.SetStateAction<
        Array<
          Array<{
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
        >
      >
    >
  ] = useState([])
  const [cheapestPrices, setCheapestPrices] = useState<number[]>([])
  const [mostExpensivePrices, setMostExpensivePrices] = useState<number[]>([])

  const { data: ingredients } = useQuery<IngredientsType[]>('ingredients', {
    queryFn: async () => await getQuery('/listIngredients'),
    onSuccess: (data) => {}
  })

  const selectRandomMeal = (): any => {
    let calculatedMenus: any[] = []
    menus.forEach((menu) => {
      const calculatedMenu = getPreparedMenuByBudget(menu, budget)
      if (calculatedMenu.length > 0) {
        calculatedMenus.push([...calculatedMenu])
      }
    })

    calculatedMenus = calculatedMenus.flat()

    if (calculatedMenus.length === 0) {
      setBudgetError('No meals found for this budget')
    } else {
      const randomIndex = Math.floor(Math.random() * calculatedMenus.length)
      const selectedMenu: { id: number; qualities: string[]; score: number; totalCost: number } =
        calculatedMenus[randomIndex]

      navigate(`/meals/${selectedMenu.id}?qualities=${selectedMenu.qualities.join(',')}`)
    }
  }

  const calculateCheapestAndMostExpensive = (): any => {
    const calculatedMenus: any[] = []
    menus.forEach((menu) => {
      const calculatedMenu = getPreparedMenu(menu)
      if (calculatedMenu.length > 0) {
        calculatedMenus.push([...calculatedMenu])
      }
    })

    const cheapestArr: number[] = []
    const mostExpensiveArr: number[] = []

    calculatedMenus.forEach((menu) => {
      const cheapest = Math.min(...menu.map((item) => item.totalCost))
      const mostExpensive = Math.max(...menu.map((item) => item.totalCost))
      cheapestArr.push(cheapest)
      mostExpensiveArr.push(mostExpensive)
    })

    setCheapestPrices(cheapestArr)
    setMostExpensivePrices(mostExpensiveArr)
  }
  useEffect(() => {
    if (meals.length === 0) return
    const fetchMenus = async (): Promise<void> => {
      const _menus: MenuType[] = []
      for (const meal of meals) {
        const res = await get(`/get/${meal.id}`)
        _menus.push(res)
      }
      setMenus(_menus)
    }
    void fetchMenus()
  }, [])

  useEffect(() => {
    const arr: any = []
    menus.forEach((menu) => {
      arr.push(getIngredientsWithTotalPrices(menu))
    })
    setIngredientsWithTotalPricesArray(arr)
    calculateCheapestAndMostExpensive()
  }, [menus])

  useEffect(() => {
    let sortFn
    let filterFn

    if (sortType === 'all') {
      sortFn = (a: MealType, b: MealType) => {
        return 0
      }
    } else if (sortType === 'name') {
      sortFn = (a: MealType, b: MealType) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      }
    }

    if (filter === 'vegan') {
      filterFn = isVegan
    } else if (filter === 'vegetarian') {
      filterFn = isVegetarian
    } else {
      filterFn = () => true
    }

    const sortedMeals = meals.filter(filterFn).sort(sortFn)
    setSortedMeals(sortedMeals)
  }, [sortType, filter, meals])

  const isVegan = (meal: MealType): boolean => {
    // Line below is not the way it should be done but it is the way it is done
    if (ingredients === undefined) return false
    let vegan = true
    meal.ingredients.forEach((ingredient) => {
      const ingredientFull = ingredients.find((i) => i.name === ingredient.name)

      // Idk why some ingredients doesnt appear in the ingredients endpoint but it is
      if (ingredientFull === undefined || ingredientFull.groups === undefined) {
        vegan = false
        return
      }
      // Check if the ingredient is only vegan and not contains vegetarian
      if (
        !ingredientFull.groups?.includes('vegan') ||
        !ingredientFull.groups?.includes('vegetarian')
      ) {
        vegan = false
      }
    })
    return vegan
  }

  const isVegetarian = (meal: MealType): boolean => {
    // Line below is not the way it should be done but it is the way it is done
    if (ingredients === undefined) return false
    let vegetarian = true
    meal.ingredients.forEach((ingredient) => {
      const ingredientFull = ingredients.find((i) => i.name === ingredient.name)
      // Idk why some ingredients doesnt appear in the ingredients endpoint but it is
      if (ingredientFull === undefined || ingredientFull.groups === undefined) {
        vegetarian = false
        return
      }
      // Check if the ingredient is only vegan and not contains vegetarian

      if (!ingredientFull.groups.includes('vegetarian')) {
        vegetarian = false
      }
    })
    return vegetarian
  }
  return {
    sortedMeals,
    filter,
    sortType,
    budget,
    menus,
    budgetError,
    ingredientsWithTotalPricesArray,
    cheapestPrices,
    mostExpensivePrices,
    setBudget,
    setSortType,
    setFilter,
    selectRandomMeal,
    isVegan,
    isVegetarian
  }
}

export default useMealList
