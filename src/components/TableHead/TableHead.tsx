import cl from './TableHead.module.css'

const TableHead: React.FC = () => {
  return (
    <thead>
      <tr className={cl.columns_title}>
        <td>Название товара</td>
        <td className={cl.column_rightSide}>Количество</td>
        <td className={cl.column_rightSide}>Стоимость</td>
      </tr>
    </thead>
  );
};

export default TableHead;
