import React from 'react';
import { Table, Tag } from 'antd';

const mockOrders = [
  {
    key: '1',
    user: 'Juan Pérez',
    status: 'Pagado',
    subtotal: 150,
    total: 165,
    createDate: '2024-06-01',
  },
  {
    key: '2',
    user: 'Ana López',
    status: 'Pendiente',
    subtotal: 300,
    total: 330,
    createDate: '2024-06-10',
  },
  {
    key: '3',
    user: 'Carlos Ruiz',
    status: 'Cancelado',
    subtotal: 200,
    total: 200,
    createDate: '2024-06-15',
  },
];

const columns = [
  { title: 'Usuario', dataIndex: 'user', key: 'user' },
  { title: 'Estado', dataIndex: 'status', key: 'status',
    render: (status: string) => {
      const color = status === 'Pagado' ? 'green' : status === 'Pendiente' ? 'orange' : 'red';
      return <Tag color={color}>{status}</Tag>;
    }
  },
  { title: 'Subtotal', dataIndex: 'subtotal', key: 'subtotal' },
  { title: 'Total', dataIndex: 'total', key: 'total' },
  { title: 'Fecha de creación', dataIndex: 'createDate', key: 'createDate' },
];

const OrderTable: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2>Órdenes</h2>
      <Table columns={columns} dataSource={mockOrders} />
    </div>
  );
};

export default OrderTable;
