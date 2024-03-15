import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addProduct, fetchMenu, changeCount } from "../../redux/orderSlice";
import { formAddVariants } from "../../animations/variants";
import { motion } from "framer-motion";
import cl from "./AddForm.module.css";

const AddForm: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [productCount, setProductCount] = useState<string>('');

  const dispatch = useAppDispatch();
  const foodMenu = useAppSelector((state) => state.order.options);
  const foodList = useAppSelector((state) => state.order.list);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleChangeCount = (event: React.FormEvent<HTMLInputElement>) => {
    const newCount = event.currentTarget.value;
    setProductCount(newCount);
  }

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = event.target.value;
    setSelectedProductId(newId);
  }

  const handleAddProduct = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!productCount) {
      alert("Введите допустимое кол-во продукта");
      return;
    }
    
    if (!selectedProductId) {
      alert("Выберите название продукта");
      return;
    }
    
    const newProductOrder = foodMenu.find(elem => elem.id === Number(selectedProductId));

    if (newProductOrder) {
      const isRepeatProduct = foodList.find(elem => elem.id === newProductOrder.id);

      if (isRepeatProduct) {
        foodList.find(elem => {
          if (elem.id === newProductOrder.id) {
            dispatch(changeCount({
              id: elem.id,
              count: Number(productCount)
            }))
          }
        })
      }

      else {
        dispatch(
          addProduct({
            id: newProductOrder.id,
            title: newProductOrder.title,
            price: newProductOrder.price,
            count: Number(productCount)
          })
        );
      }
      
      setSelectedProductId('');
      setProductCount('');
    }
    else throw new Error('Ошибка при вводе данных')
  };

  return (
    <motion.form
      variants={formAddVariants}
      initial={"hidden"}
      animate={"visible"}
      transition={{ delay: 0.3 }}
      className={cl.form}
    >
      <div className={cl.form__item}>
        <label htmlFor="type">Выберите продукцию</label>
        <select
          value={selectedProductId}
          onChange={handleChangeProduct}
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

      <div className={cl.form__item}>
        <label htmlFor="count">Введите количество</label>
        <input
          value={productCount}
          onChange={handleChangeCount}
          type="number"
          id="count"
          placeholder="0"
          min="0"
        />
      </div>

      <button className={cl.form__button} onClick={handleAddProduct}>
        Добавить
      </button>
    </motion.form>
  );
};

export default AddForm;
