import React from 'react';
import { cn } from '@bem-react/classname';

import './Table.css';

const cnTable = cn('Table');

const Table = ({ children, className, addons = [], ...restProps }) => {
  return (
    <div className={cnTable(null, [className])} {...restProps}>
      <table className={cnTable('Root')}>
        {children}
      </table>
      {addons}
    </div>
  );
};

const TableHead = ({ children, ...restProps }) => {
  return <thead className={cnTable('Head')} {...restProps}> {children}</thead>;
};

const TableHeadCell = ({ children, ...restProps }) => {
  return <th className={cnTable('HeadCell')} {...restProps}>{children}</th>;
};

const TableRow = ({ children, ...restProps }) => {
  return <tr className={cnTable('Row')} {...restProps}>{children}</tr>;
};

const TableCell = ({ children, align = 'center', ...restProps }) => {
  return <td className={cnTable('Cell', { align })} {...restProps}>{children}</td>;
};

const TableBody = ({ children, ...restProps }) => {
  return <tbody className={cnTable('Body')} {...restProps}>{children}</tbody>;
};

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Row = TableRow;
Table.HeadCell = TableHeadCell;

export default Table;
