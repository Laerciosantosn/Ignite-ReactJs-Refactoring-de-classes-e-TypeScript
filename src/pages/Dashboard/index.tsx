import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

interface FoodPlate {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

const Dashboard: React.FC = () => {

  const [foods, setFoods] = useState<FoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<FoodPlate>({} as FoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      api.get('/foods').then(response => {
        setFoods(response.data);
      })
    }

    loadFoods();
  }, [])

  async function handleAddFood(
    food: Omit<FoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      console.log(food)
      api.post('/foods', { ...food, available: true }).then(response => {
        setFoods(state => [...state, response.data]);
      });

    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateFood(
    food: Omit<FoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      })
        .then(response => {
          setFoods(state => {
            const newState = state.map(stateFood => {
              if (stateFood.id === editingFood.id) {
                return { ...response.data }
              }
              return stateFood;
            });
            return newState;
          });
        });

      setEditingFood({} as FoodPlate);

    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteFood(id: number): Promise<void> {
    api.delete(`/foods/${id}`);

    setFoods(stateFood => stateFood.filter(food => food.id !== id));
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }

  const handleEditFood = (food: FoodPlate) => {
    setEditingFood(food);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              toggleModal={toggleEditModal}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
