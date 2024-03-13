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
      setAmount(amount + elem.count * elem.price);
    });
  };

  const sendPostRequestOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const postData = order.map((elem) => ({
      product_id: elem.id,
      quantity: elem.count,
    }));

    if (!postData.length) {
      alert("Заказ пуст");
      return;
    }

    const request = axios
      .post("https://dev-su.eda1.ru/test_task/save.php", postData)
      .then((response) =>
        alert(`Успешно! Номер заказа: ${response.data.code}`)
      );

    dispatch(clearProducts());
    setAmount(0);
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
      className={cl.form_wrap}
    >
      <table>
        <TableHead />
        <tbody>
          {!order.length ? (
            <EmptyBasket />
          ) : (
            order.map((elem) => (
              <motion.tr variants={productVariants} initial={'hidden'} animate={'visible'} transition={{delay: 0.3}} className={cl.product_wrap} key={elem.id}>
                <td className={cl.product_title}>{elem.title}</td>
                <td className={cl.column_rightSide}>{elem.count} шт.</td>
                <td className={cl.column_rightSide}>
                  {(elem.price * elem.count).toFixed(2)}₽
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>

      <div className={cl.lowerBlock}>
        <div className={cl.amount}>Итого: {amount} ₽.</div>
        <button className={cl.buttonSave} onClick={sendPostRequestOrder}>
          Сохранить
        </button>
      </div>
    </motion.div>
  );
};

export default OrderForm;
