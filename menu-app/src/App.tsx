import { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';

interface FoodData {
    id: number;
    price: number;
    title: string;
    image: string;
}

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFoodData, setCurrentFoodData] = useState<FoodData | null>(null);
    const { data, refetch } = useFoodData();

    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev);
    };

    const handleDelete = async (id: number | undefined) => {
        try {
            await fetch(`http://localhost:8080/food/${id}`, {
                method: 'DELETE',
            });
            refetch(); 
        } catch (error) {
            console.error('Erro ao deletar:', error);
        }
    };

    const handleEdit = (foodData: FoodData) => {
        setCurrentFoodData(foodData);
        handleOpenModal();
    };

    const handleUpdate = async (updatedData: FoodData) => {
    try {
        await fetch(`http://localhost:8080/food/${currentFoodData?.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        refetch(); // Atualiza a lista após a edição
        setCurrentFoodData(null); // Limpa os dados após a atualização
        setIsModalOpen(false); // Fecha o modal após a atualização
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
                        key={foodData.id}
                        price={foodData.price} 
                        title={foodData.title} 
                        image={foodData.image}
                        onDelete={() => handleDelete(foodData.id)}
                        onEdit={() => handleEdit(foodData)}
                    />
                ))}
            </div>
                
            {isModalOpen && (
                <CreateModal 
                    closeModal={handleOpenModal} 
                    initialData={currentFoodData} // Passa os dados do item para o modal
                    onUpdate={handleUpdate} // Passa a função de atualização
                />
            )}
                
            <button onClick={handleOpenModal}>Adicionar</button>
        </div>
    );
}

export default App;
