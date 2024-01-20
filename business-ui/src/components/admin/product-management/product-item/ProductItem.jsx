import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function ProductItem(props) {
  const { productItem, no } = props;
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (props.productItem.id) {
      setFormvalues({
        id: productItem.id,
        code: productItem.code,
        name: productItem.name,
        quantity: productItem.quantity,
        unit: productItem.unit,
        costPrice: productItem.costPrice,
        retailPrice: productItem.retailPrice,
        discountPercent: productItem.discountPercent,
        salePrice: productItem.salePrice,
      });
      setFormErrors({});
    }
  }, [props.productItem]);

  const deleteItem = (id) => {
    props.deleteItem(id);
  };

  return (
    <>
      <tr className={`text-center ${display ? "displayNone" : null}`}>
        <th>{no}</th>
        <td>{productItem.code}</td>
        <td>{productItem.name}</td>
        <td>{productItem.quantity}</td>
        <td>{productItem.unit}</td>
        <td>{productItem.costPrice}</td>
        <td>{productItem.retailPrice}</td>
        <td>{productItem.discountPercent}</td>
        <td>{productItem.salePrice}</td>
        <td className="text-center d-flex justify-content-around">
          <Link as={Link} to={`/edit/${productItem.id}`} className="text-white">
            <i className="fa-regular fa-pen-to-square text-primary"></i>
          </Link>

          <Link onClick={() => deleteItem(productItem.id)}>
            <i className="fa-solid fa-trash text-secondary"></i>
          </Link>
        </td>
      </tr>
    </>
  );
}

export default ProductItem;
