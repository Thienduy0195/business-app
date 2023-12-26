import React from 'react';
import './ProductItem.css'; // Tạo một file CSS riêng cho component này

const ProductItem = ({ name, avatarURL, title, mainPrice }) => {

    const imageStyle = {
        width: '100%',
        padding: '0px',
    };
    return (
        <div className="card col-2">
            <img src={avatarURL} alt={name} className='productImage' style={imageStyle} />
            <p className='text-success fw-bold mt-2'>{name}</p>
            <span>{title}</span>
            <span className='fw-bold'>{mainPrice}</span>
        </div>
    );
};

export default ProductItem;