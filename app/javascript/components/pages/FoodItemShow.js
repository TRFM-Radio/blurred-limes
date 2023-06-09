import React, { useState } from "react";
import { Card, CardBody, CardText, CardTitle, Button, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import FoodItemEditModal from "../components/FoodItemEditModal";

const FoodItemShow = ({foodItems, logged_in, current_user, updateFoodItem, deleteFoodItem}) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)

  let selectedFoodItem = foodItems?.find((foodItem) => foodItem.id === +id)

  const toggleModal = () => setVisible(!visible)
  const toggleEditModal = () => setEditModalVisible(!editModalVisible)

  const handleSubmit = () => {
    const confirmDelete = "Are you sure you want to delete this?"
    if (confirmDelete) {
      deleteFoodItem(selectedFoodItem.id)
      toggleModal()
      navigate("/protectedindex")
    }
  };

  const handleEdit = () => {
    toggleEditModal()
  };

  return (
    <>
      <h1>Food Item</h1>
      <br />
      <div className="show-item">
        {selectedFoodItem && (
          <Card>
            <CardBody>
              <CardTitle tag="h5">
                {selectedFoodItem.name}
              </CardTitle>
              <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
              >
                {selectedFoodItem.location}
              </CardSubtitle>
            </CardBody>
            <img
                alt={selectedFoodItem.name}
                src={selectedFoodItem.image}
                width="60%"
                height="300px"
                object-fit="contain"
                margin="auto"
              />
            <CardBody>
              <CardText>
                Quantity: {selectedFoodItem.quantity}
              </CardText>
              <CardText>
                Expiration Date: {selectedFoodItem.expiration_date}
              </CardText>
              {logged_in && (
                <>
                  <Button className="show-btns" onClick={handleEdit}>
                    Edit Food Item
                  </Button>
                  <Button className="show-btns" onClick={toggleModal}>
                    Remove from Inventory
                  </Button>
                </>
              )}
              <Button className="show-btns">
                <NavLink style={{ color: "white" }} to={"/protectedindex"}>
                  Back to Inventory
                </NavLink>
              </Button>
            </CardBody>
          </Card>
        )}
      </div>
      <Modal isOpen={visible} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Delete Food Item</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this food item?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleSubmit}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <FoodItemEditModal
        isOpen={editModalVisible}
        toggleModal={toggleEditModal}
        foodItems={foodItems}
        current_user={current_user}
        selectedFoodItem={selectedFoodItem}
        updateFoodItem={updateFoodItem}
      />
    </>
  )
}
export default FoodItemShow

