import React from "react";
import "./ProductCard.css"; // Tạo một file CSS riêng cho component này

const ProductCard = ({
  name,
  avatarURL,
  title,
  retailPrice,
  discountPercent,
  salePrice,
}) => {
  const convertToVND = (price) => {
    if (!price) {
      price = 0;
    }
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="product">
      <div>
        <img src={avatarURL} alt={name} className="product_image" />
      </div>
      <div className="product_content">
        <div className="product_name">
          <h4>{name}</h4>
        </div>
        <div className="product_description">
          <span>{title}</span>
        </div>
        <div className="product_price">
          <div className="main_price">
            <s>{convertToVND(retailPrice)}</s>
          </div>
          <div className="sale_price">
            <p className="text-success">
              <strong>{convertToVND(salePrice)}</strong>
            </p>
          </div>
        </div>

        <div className="product_note">
          <strong className="text-success">$ Góp chỉ từ 1.250.000/tháng</strong>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
