import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addProduct, fetchMenu } from "../../redux/orderSlice";
import { formAddVariants } from "../../animations/variants";
import { motion } from "framer-motion";
import cl from "./AddForm.module.css";

const AddForm: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [productCount, setProductCount] = useState<string>("");

  const dispatch = useAppDispatch();
  const foodMenu = useAppSelector((state) => state.order.options);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleAddProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    if (productCount === "" || productCount === "0") {
      alert("Введите допустимое кол-во продукта");
      return;
    }
    const newProductOrder = foodMenu.filter(
      (elem) => elem.id === Number(selectedProductId)
    );
    if (!selectedProductId) {
      alert("Выберите название продукта");
      return;
    }
    dispatch(
      addProduct({
        id: newProductOrder[0].id,
        title: newProductOrder[0].title,
        price: newProductOrder[0].price,
        count: Number(productCount),
      })
    );
    setSelectedProductId("");
    setProductCount("");
  };

  return (
    <motion.form
      variants={formAddVariants}
      initial={"hidden"}
      animate={"visible"}
      transition={{ delay: 0.3 }}
      className={cl.form}
    >
      <div className={cl.form_item}>
        <label htmlFor="type">Выберите продукцию</label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          id="type"
        >
          <option selected disabled />
          {foodMenu.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </div>

      <div className={cl.form_item}>
        <label htmlFor="count">Введите количество</label>
        <input
          value={productCount}
          onChange={(e) => setProductCount(e.target.value)}
          type="number"
          id="count"
          placeholder="0"
          min="0"
        />
      </div>

      <button className={cl.button} onClick={handleAddProduct}>
        Добавить
      </button>
    </motion.form>
  );
};

export default AddForm;
