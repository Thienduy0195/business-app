import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function ProductItem(props) {
  const { productItem, no } = props;

  const initalValues = {
    id: "",
    code: "",
    name: "",
    quantity: "",
    unit: "",
    costPrice: "",
    retailPrice: "",
    discountPercent: "",
    salePrice: "",
  };
  const [formValues, setFormvalues] = useState(initalValues);
  const [formErrors, setFormErrors] = useState({});
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value });
  };

  //   const validate = (item) => {
  //     const error = {};
  //     const alphabet = /^[a-zA-Z ]*$/;
  //     const phone = /^[0-9]{10}$/;
  //     item.name = item.name.trim();
  //     item.address = item.address.trim();
  //     if (!item.name) {
  //       error.name = "Name must not be blank!";
  //     } else if (!alphabet.test(item.name)) {
  //       error.name = "Name is invalid!";
  //     }
  //     if (!item.age) {
  //       error.age = "Age must not be blank!";
  //     } else if (isNaN(item.age) || parseInt(item.age) < 0) {
  //       console.log("error");
  //       error.age = "Age must be a positive number!";
  //     }
  //     if (!item.address) {
  //       error.address = "Address must not be blank!";
  //     }
  //     if (!item.phone) {
  //       error.phone = "Phone number must not be blank!";
  //     } else if (!phone.test(item.phone)) {
  //       error.phone = "Invalid phone number (must be 10 character)!";
  //     }
  //     return error;
  //   };

  const showUpdateForm = (id) => {
    props.showUpdateForm(id);
  };

  const deleteItem = (id) => {
    props.deleteItem(id);
  };

  const updateItemInLine = () => {
    //   setFormErrors(validate(formValues));
    //   const errors = validate(formValues);
    //   console.log("errors", errors);
    //   if (Object.keys(errors).length === 0) {
    props.updateItemInLine(formValues);
    //     setDisplay(false);
    //     setFormErrors({});
    //   }
  };

  return (
    <>
      <tr className={display ? "displayNone" : null}>
        <td className="text-center">{no}</td>
        <td className="text-center">{productItem.code}</td>
        <td onClick={() => setDisplay(true)}>{productItem.name}</td>
        <td onClick={() => setDisplay(true)}>{productItem.quantity}</td>
        <td onClick={() => setDisplay(true)}>{productItem.unit}</td>
        <td onClick={() => setDisplay(true)}>{productItem.costPrice}</td>
        <td onClick={() => setDisplay(true)}>{productItem.retailPrice}</td>
        <td onClick={() => setDisplay(true)}>{productItem.discountPercent}</td>
        <td onClick={() => setDisplay(true)}>{productItem.salePrice}</td>
        <td className="text-center">
          <Link
            as={Link}
            to={`/edit/${productItem.id}`}
            className="text-white"
          >
            <i className="fa-regular fa-pen-to-square text-primary"></i>
          </Link>

          <span onClick={() => deleteItem(productItem.id)}>
            <i className="fa-solid fa-trash text-danger"></i>
          </span>
        </td>
      </tr>

      <tr className={`edit-tr ${display ? null : "displayNone"}`}>
        <td className="text-center">{props.no}</td>
        <td className="text-center">{props.productItem.code}</td>
        <td>
          <input
            className={`${!formErrors.name ? "" : "is-invalid"}`}
            value={formValues.name}
            onChange={handleChange}
            name="name"
            id="name"
            type="text"
          />
          <span className="invalid-feedback"> {formErrors.name}</span>
        </td>
        <td>
          <input
            className={`${!formErrors.quantity ? "" : "is-invalid"}`}
            value={formValues.quantity}
            onChange={handleChange}
            name="quantity"
            id="quantity"
            type="number"
          />
          <span className="invalid-feedback"> {formErrors.quantity}</span>
        </td>
        <td>
          <input
            className={`${!formErrors.unit ? "" : "is-invalid"}`}
            value={formValues.unit}
            onChange={handleChange}
            name="unit"
            id="unit"
            type="text"
          />
          <span className="invalid-feedback"> {formErrors.unit}</span>
        </td>
        <td>
          <input
            className={`${!formErrors.costPrice ? "" : "is-invalid"}`}
            value={formValues.costPrice}
            onChange={handleChange}
            name="costPrice"
            id="costPrice"
            type="text"
          />
          <span className="invalid-feedback"> {formErrors.costPrice}</span>
        </td>
        <td>
          <input
            className={`${!formErrors.retailPrice ? "" : "is-invalid"}`}
            value={formValues.retailPrice}
            onChange={handleChange}
            name="retailPrice"
            id="retailPrice"
            type="number"
          />
          <span className="invalid-feedback"> {formErrors.retailPrice}</span>
        </td>
        <td>
          <input
            className={`${!formErrors.discountPercent ? "" : "is-invalid"}`}
            value={formValues.discountPercent}
            onChange={handleChange}
            name="discountPercent"
            id="discountPercent"
            type="number"
          />
          <span className="invalid-feedback">
            {" "}
            {formErrors.discountPercent}
          </span>
        </td>
        <td>
          <input
            className={`${!formErrors.salePrice ? "" : "is-invalid"}`}
            value={formValues.salePrice}
            onChange={handleChange}
            name="salePrice"
            id="salePrice"
            type="number"
          />
          <span className="invalid-feedback"> {formErrors.salePrice}</span>
        </td>
        <td className="text-center">
          <span>
            <i
              onClick={() => updateItemInLine()}
              className="fa-solid fa-square-check text-primary"
            ></i>
          </span>
        </td>
      </tr>
    </>
  );
}

export default ProductItem;
