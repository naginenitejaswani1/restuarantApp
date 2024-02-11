import React, {useState, useEffect} from 'react'
import Header from '../Header' // Import your Header component
import DishItem from '../DishItem' // Import your DishItem component

const Home = () => {
  const [response, setResponse] = useState([])
  const [restaurantName, setRestaurantName] = useState('')
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  const fetchRestaurantApi = async () => {
    const api = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    try {
      const apiResponse = await fetch(api)
      const data = await apiResponse.json()
      const updatedData = getUpdatedData(data[0].table_menu_list)

      setResponse(updatedData)
      setRestaurantName(data[0].restaurant_name)
      setActiveCategoryId(updatedData[0].menuCategoryId)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchRestaurantApi()
  }, [])

  const onUpdateActiveCategoryIdx = menuCategoryId =>
    setActiveCategoryId(menuCategoryId)

  const renderTabMenuList = () =>
    response.map(eachCategory => {
      const onClickHandler = () =>
        onUpdateActiveCategoryIdx(eachCategory.menuCategoryId)

      return (
        <li
          className={`each-tab-item ${
            eachCategory.menuCategoryId === activeCategoryId
              ? 'active-tab-item'
              : ''
          }`}
          key={eachCategory.menuCategoryId}
          onClick={onClickHandler}
        >
          <button
            type='button'
            className='mt-0 mb-0 ms-2 me-2 tab-category-button'
          >
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })

  const renderDishes = () => {
    const activeCategory = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    if (!activeCategory) {
      return null // Handle case where active category is not found
    }

    const {categoryDishes} = activeCategory

    return (
      <ul className='m-0 d-flex flex-column dishes-list-container'>
        {categoryDishes.map(eachDish => (
          <DishItem key={eachDish.dishId} dishDetails={eachDish} />
        ))}
      </ul>
    )
  }

  return (
    <div className='home-background'>
      <Header cartItems={[]} restaurantName={restaurantName} />
      <ul className='m-0 ps-0 d-flex tab-container'>{renderTabMenuList()}</ul>
      {renderDishes()}
    </div>
  )
}

export default Home
