import React, { useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface FoodPlate {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

type CreateFoodData = Omit<FoodPlate, "id">;

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: (Omit<FoodPlate, 'id' | 'available'>)) => void;
}
  
  const ModalAddFood: React.FC<ModalProps> = (
{
      isOpen, 
      setIsOpen, 
      handleAddFood,
    }
    ) => {
    const formRef = useRef<FormHandles>(null);


    const handleSubmit = useCallback(
      async (data: CreateFoodData) => {
        handleAddFood(data);
        setIsOpen();
      },
      [handleAddFood, setIsOpen],
    )
  
    return (
      
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
};

export default ModalAddFood;