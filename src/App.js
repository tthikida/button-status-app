import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        // Fetch the initial status from MongoDB when the component mounts
        fetchData().then(r => console.print("fetchData - useEffect"));
    }, []);

    const toggleStatus = async () => {
        try {
            // Toggle the status locally
            setStatus(!status);

            // Update the status in MongoDB
            await axios.post('/api/updateStatus', { status: !status });
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const fetchData = async () => {
        try {
            // Fetch the current status from MongoDB
            const response = await axios.get('/api/getStatus');
            setStatus(response.data.status);
        } catch (error) {
            console.error('Error fetching status:', error);
        }
    };

    return (
        <div className="App">
            <h1>Toggle Button</h1>
            <label>
                Status: {status ? 'On' : 'Off'}
                <input type="checkbox" checked={status} onChange={toggleStatus} />
            </label>
        </div>
    );
}

export default App;
