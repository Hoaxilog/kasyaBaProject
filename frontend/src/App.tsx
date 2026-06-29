import { useState } from 'react'
import './index.css'
import CameraViewport from './CameraViewport';
import Footer from './components/Footer';
import CartList from './CartList';

export type CartItem = {
  name: string,
  price: number
}

function App() {
  let [cartItems, setCartItems] = useState<CartItem[]>([])
  let [quantity, setQuantity] = useState<number>(0);

  console.log(cartItems);

  return (
    <>  
      <main className='border-2 max-h-dvh max-w-96 mx-auto'>
          <div className="p-4 space-y-4">
              <CameraViewport setCartItem={setCartItems}/>

              
              <div className="flex justify-between gap-4">
                  <h1> Your Basket </h1>
                 <p className="bg-[#ff8fab] text-white text-xs rounded-md px-3 py-1"> {cartItems.length}</p>
              </div>

              <section className='space-y-2'>
                {cartItems.map((element, index) => {
                  return <CartList key={index} productName={element.name} price={element.price} quantity={quantity} setQuantity={setQuantity}/>
                })}
              </section>
          </div>
      </main>

      <Footer />
    </>
  )
}

export default App
