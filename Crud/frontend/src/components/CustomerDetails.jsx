
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

function CustomerDetails() {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [productOrdered, setProductOrdered] = useState('');
  const [amountPaid, setAmountPaid] = useState('');

  const [editId, setEditId] = useState(null);
  const [customers, setCustomers] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const API = 'http://localhost:5050/custdetails';

  // ============================
  // FETCH CUSTOMERS
  // ============================

  const fetchCustomers = () => {

    axios.get(API)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });

  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ============================
  // RESET FORM
  // ============================

  const resetForm = () => {

    setName('');
    setLocation('');
    setProductOrdered('');
    setAmountPaid('');
    setEditId(null);

  };

  // ============================
  // CREATE / UPDATE
  // ============================

  const handleSubmit = (e) => {

    e.preventDefault();

    const payload = {
      custname: name,
      location: location,
      productOrdered: productOrdered,
      amountPaid: Number(amountPaid)
    };

    // UPDATE
    if (editId !== null) {

      axios.put(`${API}/${editId}`, payload)
        .then(() => {

          alert('Customer updated successfully');

          resetForm();
          fetchCustomers();

        })
        .catch((error) => {
          console.error('Update error:', error);
        });

    }

    // CREATE
    else {

      axios.post(API, payload)
        .then(() => {

        //   alert('Customer added successfully');

          resetForm();
          setCurrentPage(1);
          fetchCustomers();

        })
        .catch((error) => {
          console.error('Create error:', error);
        });

    }

  };

  // ============================
  // DELETE
  // ============================

  const handleDelete = (id) => {

    // if (!window.confirm('Are you sure you want to delete this customer?')) {
    //   return;
    // }

    axios.delete(`${API}/${id}`)
      .then(() => {

        alert('Customer deleted successfully');

        fetchCustomers();

        if (editId === id) {
          resetForm();
        }

      })
      .catch((error) => {
        console.error('Delete error:', error);
      });

  };

  // ============================
  // EDIT
  // ============================

  const handleEdit = (customer) => {

    setEditId(customer.id);
    setName(customer.custname);
    setLocation(customer.location || '');
    setProductOrdered(customer.productOrdered || '');
    setAmountPaid(customer.amountPaid);

  };

  // ============================
  // PAGINATION
  // ============================

  const totalPages = Math.ceil(
    customers.length / recordsPerPage
  );

  // ============================
  // useMemo
  // ============================

  const currentCustomers = useMemo(() => {

    const startIndex =
      (currentPage - 1) * recordsPerPage;

    const endIndex =
      startIndex + recordsPerPage;

    return customers.slice(startIndex, endIndex);

  }, [customers, currentPage]);

  // ============================
  // NEXT PAGE
  // ============================

  const nextPage = () => {

    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }

  };

  // ============================
  // PREVIOUS PAGE
  // ============================

  const previousPage = () => {

    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

  };

  // ============================
  // JSX
  // ============================

  return (

    <div style={{
      padding: '20px',
      maxWidth: '900px',
      margin: 'auto'
    }}>

      <h2>Customer Details</h2>

      {/* FORM */}

      <form style={{ marginBottom: '20px' }} backgroundColor="lightpink" border="1" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Product Ordered"
          value={productOrdered}
          onChange={(e) => setProductOrdered(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Amount Paid"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          min="0"
          step="0.01"
          required
        />

        <br /><br />

        <button type="submit">
          {editId !== null ? 'Update Customer' : 'Add Customer'}
        </button>

        {editId !== null && (

          <button
            type="button"
            onClick={resetForm}
          >
            Cancel
          </button>

        )}

      </form>

      <hr />

      {/* TABLE */}

      <table
        border="1"
        cellPadding="10"
        style={{
          marginTop: '20px',
          width: '100%',
          textAlign: 'center',
          borderCollapse: 'collapse'
        }}
      >

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Product Ordered</th>
            <th>Amount Paid</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {currentCustomers.length > 0 ? (

            currentCustomers.map((customer) => (

              <tr key={customer.id}>

                <td>{customer.id}</td>

                <td>{customer.custname}</td>

                <td>{customer.location}</td>

                <td>{customer.productOrdered}</td>

                <td>{customer.amountPaid}</td>

                <td>

                  <button
                    type="button"
                    onClick={() => handleEdit(customer)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="6">
                No customers found
              </td>
            </tr>

          )}

        </tbody>

      </table>

      {/* PAGINATION */}

      <div style={{
        marginTop: '20px',
        textAlign: 'center'
      }}>

        <button
          type="button"
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{
          margin: '0 20px',
          fontWeight: 'bold'
        }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={nextPage}
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
        >
          Next
        </button>

      </div>

      {/* TOTAL CUSTOMERS */}

      <p style={{ textAlign: 'center' }}>
        Total Customers: {customers.length}
      </p>

    </div>

  );

}

export default CustomerDetails;
