import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IslandForm = ({ index }) => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [unitPrice, setUnitPrice] = useState(0);
    const [islandsData, setIslandsData] = useState(JSON.parse(localStorage.getItem('islandsData')) || []);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newIslandData = { itemName, quantity: parseInt(quantity), unitPrice: parseFloat(unitPrice) };
        islandsData[index] = newIslandData; // Update the specific island data
        localStorage.setItem('islandsData', JSON.stringify(islandsData)); // Save to local storage
        navigate('/summary'); // Özet sayfasına yönlendir
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <h3>Ada {index + 1}</h3>
            <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Ekilmiş Ürün"
                required
            />
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Adet"
                required
            />
            <input
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="Birim Fiyat (silver)"
                required
            />
            <button type="submit">Kaydet ve Özetle</button>
        </form>
    );
};

export default IslandForm;