import { useState } from "react";
import "./App.css";

const orders = [
  {
    id: "ORD-101",
    customer: "Priya Vishwakarma",
    items: [
      { name: "Onesie - 0-3M", qty: 2, price: 599 },
      { name: "Swaddle Wrap", qty: 1, price: 899 },
    ],
    status: "fulfilled",
  },
  {
    id: "ORD-102",
    customer: "Anurag Shrivastva",
    items: [
      { name: "Baby Romper", qty: 3, price: 599 },
    ],
    status: "Cancelled",
  },
  {
    id: "ORD-103",
    customer: "Sunita Pariyar",
    items: [
      { name: "Onesie - 3-6M", qty: 1, price: 699 },
      { name: "Cap Set", qty: 2, price: 349 },
    ],
    status: "Cancelled",
  },
  {
    id: "ORD-104",
    customer: "Vishal kumar",
    items: [
      { name: "Sleepsuit", qty: 4, price: 649 },
    ],
    status: "fulfilled",
  },
  {
    id: "ORD-105",
    customer: "Neha Kapoor",
    items: [
      { name: "Bib Set", qty: 2, price: 349 },
      { name: "Muslin Cloth", qty: 3, price: 299 },
    ],
    status: "pending",
  },
];

function getTotal(items) {
  return items.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
}

function getItemCount(items) {
  return items.reduce(
    (total, item) => total + item.qty,
    0
  );
}

function App() {
  const [filter, setFilter] = useState("all");

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const fulfilledRevenue = orders
    .filter((order) => order.status === "fulfilled")
    .reduce(
      (total, order) => total + getTotal(order.items),
      0
    );

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="app">

      <h1>Order Summary</h1>

      <p className="subtitle">
        Baby Clothing Store
      </p>

      <div className="summary">

        <div className="card">
          <p>Fulfilled Revenue</p>
          <h2>
            ₹{fulfilledRevenue.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="card">
          <p>Pending Orders</p>
          <h2>{pendingOrders}</h2>
        </div>

      </div>

      <div className="orders">

        <div className="top">
          <h2>Orders</h2>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <table>

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {filteredOrders.map((order) => (
              <tr key={order.id}>

                <td>{order.id}</td>

                <td>{order.customer}</td>

                <td>
                  {getItemCount(order.items)}
                </td>

                <td>
                  ₹{getTotal(order.items).toLocaleString("en-IN")}
                </td>

                <td>
                  <span className={`status ${order.status}`}>
                    {order.status}
                  </span>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default App;
