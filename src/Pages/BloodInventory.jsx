import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BloodInventory.css'; // Import the CSS file

function BloodInventory() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch inventory on component mount
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                // Using axios to get inventory data from your backend
                const response = await axios.get('http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/inventory');
                setInventory(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch inventory", error);
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }


    return (
        <div className="inventory-container">
            <h1>Blood Inventory</h1>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Blood ID</th>
                        <th>Blood Type</th>
                        <th>Quantity</th>
                        <th>Storage Location</th>
                        <th>Expiry Date</th>
                        <th>Donor ID</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.Blood_ID}>
                            <td>{item.Blood_ID}</td>
                            <td>{item.Blood_Type}</td>
                            <td>{item.Quantity}</td>
                            <td>{item.Storage_Location}</td>
                            <td>{item.Expiry_Date.slice(1,10)}</td>
                            <td>{item.Donor_ID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BloodInventory;