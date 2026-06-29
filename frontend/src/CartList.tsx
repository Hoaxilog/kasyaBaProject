
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, MinusSignIcon } from "@hugeicons/core-free-icons";
import React, { useState } from "react";

type Product = {
    productName: string, 
    price: number, 
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>
}

export default function CartList(product : Product) {

    const addQuantity = () => {
        product.setQuantity((prev) => {
            return prev + 1;
        })
    }

    const removeQuantity = () => {
        product.setQuantity((prev) => {
            if (prev > 1) {
                return prev - 1
            }
            return 1;
        })
    }

    return (
        <>
            <div className="p-4 flex items-center justify-between border-2 border-black">
                <h1> {product.productName ?? "Nestle Bear Brand Milk"} </h1>
                <div className="text-center">
                    <p> ₱{product.price ?? "0.0"} </p>
                    <div className="border rounded-lg border-black flex justify-center items-center gap-4 px-2 ">
                        <button onClick={removeQuantity} className=""> <HugeiconsIcon icon={MinusSignIcon} size={16} /></button>
                            <span className=""> {product.quantity} </span>
                        <button onClick={addQuantity}> <HugeiconsIcon icon={Add01Icon} size={16}/> </button>
                    </div>
                </div>
            </div>
        </>
    )
}