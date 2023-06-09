import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import FoodItemShow from "./pages/FoodItemShow";
import FoodItemNew from "./pages/FoodItemNew";
import FoodItemEditModal from './components/FoodItemEditModal';
import ProtectedIndex from "./pages/ProtectedIndex";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = (props) => {
  const [foodItems, setFoodItems] = useState([])
  useEffect(() => {
    readFoodItems()
  }, [])
  const readFoodItems = () => {
    fetch("/food_items")
    .then((response) => response.json())
    .then((payload) => setFoodItems(payload))
    .catch((error) => console.log(error))
  }
  const createFoodItem = (foodItem) => {
    fetch("/food_items", {
        body: JSON.stringify(foodItem),
        headers: {
            "Content-Type": "application/json"
        }, 
        method: "POST"
    })
    .then((response) => response.json())
    .then(() => readFoodItems())
    .catch((errors) => console.log(errors))
  }
  const updateFoodItem = (foodItem, id) => {
    fetch(`/food_items/${id}`, {
      body: JSON.stringify(foodItem),
        headers: {
            "Content-Type": "application/json"
        }, 
        method: "PATCH"
    })
    .then((response) => response.json())
    .then((payload) => readFoodItems(payload))
    .catch((errors) => console.log("FoodItem update errors:", errors))
  }
  const deleteFoodItem = (id) => {
    fetch(`/food_items/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }, 
        method: "DELETE"
    })
    .then((response) => response.json())
    .then(() => readFoodItems())
    .catch((errors) => console.log(errors))
  }
  return (
    <>
      <BrowserRouter>
         <Header {...props}/>
         <Routes>
          <Route path="/" element={<Home {...props} current_user={props.current_user}/>} />
          <Route path="/fooditemshow/:id" element={<FoodItemShow {...props} foodItems={foodItems} deleteFoodItem={deleteFoodItem} updateFoodItem={updateFoodItem}/>} />
          <Route path="/fooditemnew" element={<FoodItemNew current_user={props.current_user} createFoodItem={createFoodItem}/>} />
          <Route path="/fooditemeditmodal/:id" element={<FoodItemEditModal current_user={props.current_user} foodItems={foodItems} />} />
          <Route path="/protectedindex" element={<ProtectedIndex foodItems={foodItems} current_user={props.current_user} />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
export default App
