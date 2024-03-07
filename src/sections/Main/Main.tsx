import AddForm from "../../components/AddForm/AddForm";
import SaveForm from "../../components/OrderForm/OrderForm";
import cl from "./Main.module.css";

const Main = () => {
  return (
    <main className={cl.main_wrap}>
      <div className="container">
        <div className={cl.content_wrap}>
          <AddForm />
          <SaveForm />
        </div>
      </div>
    </main>
  );
};

export default Main;
