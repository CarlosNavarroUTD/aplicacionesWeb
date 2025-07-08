import React from 'react';
import { Table, Tag } from 'antd';

const mockProducts = [
  {
    key: '1',
    name: 'Laptop HP',
    price: 1200,
    qty: 10,
    status: true,
  },
  {
    key: '2',
    name: 'Teclado Mecánico',
    price: 75,
    qty: 25,
    status: true,
  },
  {
    key: '3',
    name: 'Mouse Inalámbrico',
    price: 35,
    qty: 0,
    status: false,
  },
];

const columns = [
  { title: 'Nombre', dataIndex: 'name', key: 'name' },
  { title: 'Precio', dataIndex: 'price', key: 'price', render: (price: number) => `$${price}` },
  { title: 'Cantidad', dataIndex: 'qty', key: 'qty' },
  {
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
    render: (status: boolean) => (
      <Tag color={status ? 'green' : 'red'}>
        {status ? 'Disponible' : 'No disponible'}
      </Tag>
    ),
  },
];

const ProductTable: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2>Productos</h2>
      <Table columns={columns} dataSource={mockProducts} />
    </div>
  );
};

export default ProductTable;
