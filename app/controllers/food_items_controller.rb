class FoodItemsController < ApplicationController
    def index 
        food_items = FoodItem.all 
        render json: food_items
    end

    def create
        food_item = FoodItem.create(food_params)
        if food_item.valid?
            render json: food_item
        else
            render json: food_item.errors, status: 422
        end
    end
    def destroy
        food_item = FoodItem.find(params[:id])
        food_item.destroy
        if food_item.valid?
            render json: food_item
        end
    end
    def update
        food_item = FoodItem.find(params[:id])
        food_item.update(food_params)
        if food_item.valid?
            render json: food_item
        else
            render json: food_item.errors, status: 422
        end
    end
   

    private
    def food_params
        params.require(:food_item).permit(:name, :quantity, :expiration_date, :location, :image, :user_id)
    end
end
