import React, { useEffect, useState } from 'react';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    useEffect( () =>{
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data));
    }, [])
    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            fetch(`http://localhost:5000/services/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deleteCount > 0) {
                        window.alert('successful');
                    }
                    const remainingServices = services.filter(user => user._id !== id);
                    setServices(remainingServices);
                })
        }

    }
    return (
        <div>
            {
                services.map(service => <div key={service._id}>
                    <h4>{service.Name}</h4>
                    <div><img src={service.img} alt="" /></div>
                    <button onClick={() => handleDelete(service._id)}>Delete</button>
                </div>)
            }
        </div>
    );
};

export default ManageServices;