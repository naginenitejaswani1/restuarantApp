import React from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
// Adjust the path as needed

const Header = ({cartItems, restaurantName}) => {
  const renderCartIcon = () => (
    <div className='cart-icon-link'>
      <Link to='/cart'>
        <button type='button' className='cart-icon-button' data-testid='cart'>
          <AiOutlineShoppingCart className='cart-icon' />
        </button>
      </Link>
      <div className='cart-count-badge d-flex justify-content-center align-items-center'>
        <p className='m-0 cart-count'>{cartItems.length}</p>
      </div>
    </div>
  )

  return (
    <header className='nav-header'>
      <Link to='/'>
        <h1 className='m-0 logo-heading'>{restaurantName}</h1>
      </Link>
      <div className='d-flex flex-row align-items-center ms-auto'>
        <p className='mt-0 mb-0 me-2 d-none d-sm-block my-orders-text'>
          My Orders
        </p>
        <button type='button' className='log-out-btn'>
          Logout
        </button>
        {renderCartIcon()}
      </div>
    </header>
  )
}

export default Header
