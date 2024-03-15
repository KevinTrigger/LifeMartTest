import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { clearProducts } from "../../redux/orderSlice";
import { motion } from "framer-motion";
import { formOrderVariants, productVariants } from "../../animations/variants";
import TableHead from "../TableHead/TableHead";
import EmptyBasket from "../EmptyBasket/EmptyBasket";
import cl from "./OrderForm.module.css";

const OrderForm: React.FC = () => {
  const order = useAppSelector((state) => state.order.list);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<number>(0);

  const cardTotal = () => {
    order.forEach((elem) => {
      const priceNewProduct = elem.count * elem.price;
      setAmount(amount + priceNewProduct);
    });
  };

  const sendPostRequestOrder = (e: React.MouseEvent) => {
    e.preventDefault();

    const postData = order.map((elem) => ({
      product_id: elem.id,
      quantity: elem.count,
    }));

    if (!postData.length) {
      alert("Заказ пуст. Начните покупки!");
      return;
    }

    (async () => {
      try {
        const response = await axios.post("https://dev-su.eda1.ru/test_task/save.php", postData);
        if (response.data.success) alert(`Успешно! Номер заказа: ${response.data.code}`);
        dispatch(clearProducts());
        setAmount(0);
      }
      catch (error) {
        console.error(error);
      }
    })();
  };

  useEffect(() => {
    cardTotal();
  }, [order]);

  return (
    <motion.div
      custom={2}
      variants={formOrderVariants}
      initial={"hidden"}
      animate={"visible"}
      transition={{ delay: 0.3 }}
      className={cl.order__wrap}
    >
      <table>
        <TableHead />
        <tbody>
          {!order.length ? (
            <EmptyBasket />
          ) : (
            order.map((elem) => (
              <motion.tr variants={productVariants} initial={'hidden'} animate={'visible'} transition={{delay: 0.3}} className={cl.product_wrap} key={elem.id}>
                <td className={cl.product__title}>{elem.title}</td>
                <td className={cl.product__info}>{elem.count} шт.</td>
                <td className={cl.product__info}>
                  {(elem.price * elem.count).toFixed(2)} ₽
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>

      <div className={cl.total__wrap}>
        <div className={cl.total__amount}>Итого: {amount.toFixed(2)} ₽</div>
        <button className={cl.total__button} onClick={sendPostRequestOrder}>
          Сохранить
        </button>
      </div>
    </motion.div>
  );
};

export default OrderForm;
