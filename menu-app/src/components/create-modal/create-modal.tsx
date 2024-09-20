import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import "./modal.css";

interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: string | number): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input
                type={typeof value === "number" ? "number" : "text"}
                value={value}
                onChange={(e) =>
                    updateValue(
                        typeof value === "number"
                            ? Number(e.target.value)
                            : e.target.value
                    )
                }
            />
        </>
    );
};

interface FoodData {
    title: string;
    price: number;
    image: string;
}

interface ModalProps {
    closeModal(): void;
}

export function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const { mutate, isSuccess, isLoading } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image,
        };

        mutate(foodData);
    };

    useEffect(() => {
        if (!isSuccess) return;
        closeModal();
    }, [isSuccess, closeModal]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle} />
                    <Input label="price" value={price} updateValue={setPrice} />
                    <Input label="image" value={image} updateValue={setImage} />
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? "postando..." : "postar"}
                </button>
            </div>
        </div>
    );
}
