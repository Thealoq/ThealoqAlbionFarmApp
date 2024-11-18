import React from 'react';

const Summary = () => {
    const islandsData = JSON.parse(localStorage.getItem('islandsData')) || [];

    return (
        <div style={{ marginTop: '20px' }}>
            <h2>Özet</h2>
            {islandsData.map((island, index) => {
                const totalCost = island.quantity * island.unitPrice;
                return (
                    <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
                        <svg 
                            width="200" 
                            height="150" 
                            viewBox="0 0 200 150"
                            style={{ backgroundColor: '#a8d5ff' }}
                        >
                            <path
                                d="M40,80 Q60,20 100,40 T160,80 T100,110 T40,80"
                                fill="#90b167"
                                stroke="#6b8e23"
                                strokeWidth="2"
                            >
                                <animate
                                    attributeName="d"
                                    dur="10s"
                                    repeatCount="indefinite"
                                    values="
                                        M40,80 Q60,20 100,40 T160,80 T100,110 T40,80;
                                        M45,85 Q65,25 100,45 T165,85 T100,115 T45,85;
                                        M40,80 Q60,20 100,40 T160,80 T100,110 T40,80
                                    "
                                />
                            </path>
                            <path
                                d="M45,82 Q63,25 100,43 T158,82"
                                fill="none"
                                stroke="#e3dac9"
                                strokeWidth="4"
                                opacity="0.6"
                            />
                            <circle cx="90" cy="60" r="8" fill="#2d5a27"/>
                            <circle cx="110" cy="65" r="6" fill="#2d5a27"/>
                            <circle cx="75" cy="70" r="7" fill="#2d5a27"/>
                            <circle cx="130" cy="75" r="8" fill="#2d5a27"/>
                            <text
                                x="100"
                                y="85"
                                textAnchor="middle"
                                fill="#000"
                                fontSize="14"
                                fontWeight="bold"
                            >
                                Ada {index + 1}
                            </text>
                        </svg>
                        <h4>Ada {index + 1}</h4>
                        <p>Ürün: {island.itemName}</p>
                        <p>Adet: {island.quantity}</p>
                        <p>Birim Fiyat: {island.unitPrice} silver</p>
                        <p>Toplam Maliyet: {totalCost} silver</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Summary;