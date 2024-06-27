import axios from 'axios';
import { useState } from 'react';
import InvoiceTableRow from './InvoiceTableRow.jsx';
import InvoiceTableHeader from './InvoiceTableHeader.jsx';
import InvoiceTableAddButton from './InvoiceTableAddButton.jsx';

import generateId from '../utils/idGenerator.js';
import './InvoiceTable.css';

function InvoiceTable({ initialInvoiceList }) {
  const [initialInvoiceData, setInitialInvoiceData] = useState(initialInvoiceList);

  const addInvoiceRow = async () => {
    const {data} = await axios.post('/api/invoice', {description: 'Description'})

    const newInvoice = {...data, isEditing: true}
    setInitialInvoiceData([...initialInvoiceData, newInvoice])
    // const newinitialInvoiceData = [...initialInvoiceData];
    // newinitialInvoiceData.push({
    //   id: generateId(),
    //   description: 'Description',
    //   rate: '',
    //   hours: '',
    //   isEditing: true,
    // });
    // setInitialInvoiceData(newinitialInvoiceData);
  };

  const deleteInvoiceRow = async (id) => {
    const {data} = await axios.delete(`/api/invoice/${id}/delete`)

    if(!data.error){
      const newinitialInvoiceData = [...initialInvoiceData];
      const index = newinitialInvoiceData.findIndex((invoice) => invoice.id === id);
      newinitialInvoiceData.splice(index, 1);
      setInitialInvoiceData(newinitialInvoiceData);
    }
  };

  const rows = initialInvoiceData.map(({ id, description, rate, hours, isEditing }) => (
    <InvoiceTableRow
      key={id}
      initialInvoiceData={{ id, description, rate, hours }}
      initialIsEditing={isEditing}
      onDeleteRow={() => deleteInvoiceRow(id)}
    />
  ));

  return (
    <table>
      <thead>
        <InvoiceTableHeader />
      </thead>
      <tbody>{rows}</tbody>
      <tfoot>
        <InvoiceTableAddButton onClick={addInvoiceRow} />
      </tfoot>
    </table>
  );
}

export default InvoiceTable;
