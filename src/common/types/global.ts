interface MealType {
  id: number
  name: string
  ingredients: [
    {
      name: string
      quantity: number
      quantity_type: string
    }
  ]
}

interface IngredientsType {
  name: string
  groups: ['vegan' | 'vegetarian'] | undefined
  options: [
    {
      name: string
      quality: 'high' | 'medium' | 'low'
      price: number
      per_amount: 'kilogram' | 'litre'
    }
  ]
}

interface OptionType {
  name: string
  quality: 'high' | 'medium' | 'low'
  price: number
  per_amount: 'kilogram' | 'litre'
}
interface MenuType {
  id: number
  name: string
  ingredients: [
    {
      name: string
      groups: ['vegan' | 'vegetarian'] | undefined
      options: OptionType[]
      quantity: number
      quantity_type: 'gram' | 'millilitre'
    }
  ]
}

export type { MealType, IngredientsType, MenuType, OptionType }
