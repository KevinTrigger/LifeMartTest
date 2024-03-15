import AddForm from "../../components/AddForm/AddForm";
import OrderForm from "../../components/OrderForm/OrderForm";
import cl from "./Main.module.css";

const Main = () => {
  return (
    <main className={cl.main__wrap}>
      <div className="container">
        <div className={cl.main__content}>
          <AddForm />
          <OrderForm />
        </div>
      </div>
    </main>
  );
};

export default Main;
