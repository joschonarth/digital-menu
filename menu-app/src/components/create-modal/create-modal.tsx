import { useState } from "react"
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void

}

const Input = ({label, value, updateValue}: InputProps) => {
    return (
        <>
            <label htmlFor="">{label}</label>
            <input type="text" value={value} onChange={e => updateValue(e.target.value)}/>
        </>
    )
}

export function CreateModal() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }

        mutate(foodData)
    }
    
    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form action="" className="input-container">
                    <Input label="title" value={title} updateValue={setTitle}/>
                    <Input label="price" value={price} updateValue={setPrice}/>
                    <Input label="image" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary">Postar</button>
            </div>
        </div>
    )
}