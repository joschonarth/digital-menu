import { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, refetch } = useFoodData(); // Supondo que useFoodData tenha um método refetch para atualizar os dados

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleDelete = async (id: number | undefined) => {
    try {
      await fetch(`http://localhost:8080/food/${id}`, {
        method: 'DELETE',
      });
      refetch(); // Atualiza a lista após a deleção
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const handleEdit = async (id: number | undefined, updatedData: unknown) => {
    try {
      await fetch(`http://localhost:8080/food/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      refetch(); // Atualiza a lista após a edição
    } catch (error) {
      console.error('Erro ao editar:', error);
    }
  };

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map(foodData => (
          <Card 
            key={foodData.id} // Alterado para usar 'id' como chave única
            price={foodData.price} 
            title={foodData.title} 
            image={foodData.image}
            onDelete={() => handleDelete(foodData.id)} // Passa a função de deletar
            onEdit={(updatedData: unknown) => handleEdit(foodData.id, updatedData)} // Passa a função de editar
          />
        ))}
      </div>
        
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
        
      <button onClick={handleOpenModal}>Adicionar</button>
    </div>
  );
}

export default App;
