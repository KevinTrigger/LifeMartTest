import cl from './TableHead.module.css'

const TableHead: React.FC = () => {
  return (
    <thead className={cl.thead}>
      <tr className={cl.thead__titles}>
        <td className={cl.thead__titles}>Название товара</td>
        <td className={cl.thead__titles}>Количество</td>
        <td className={cl.thead__titles}>Стоимость</td>
      </tr>
    </thead>
  );
};

export default TableHead;
