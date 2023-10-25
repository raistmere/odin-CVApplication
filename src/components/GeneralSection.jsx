import { useState } from 'react';
import '../styles/GeneralSection.css';

// 
// This component handles the general section of the CV application
// 
export function GeneralSection() {
    // Keeps track if the user is currently editing the form.
    const [isEdit, setIsEdit] = useState(false);

    // This state holds the data that will keep track of user's information
    const [data, setData] = useState({name:"Simba", email:"simba@host.com", phone: 1112223333});

    // This method changes the state for isEdit
    const changeIsEdit = () => {
        setIsEdit((prevState) => !prevState);
    }

    // This method changes the state for data
    const changeData = (newData) => {
        // Prevent default submission and stop reloading the page
        newData.preventDefault();
        console.log(newData);
        // Create some temp variables that will get the new data
        let name = newData.target.name.value;
        let email = newData.target.email.value;
        let phone = newData.target.phone.value;
        // We use that new data and create a new object that will replace the previous data.
        setData({name, email, phone});
        // Make sure that we exit from the edit mode after submission
        changeIsEdit();
    }
    
    // We want to check if the isEdit state is true or false
    // If it's false then we want to make sure to display just the
    // info for the section without the form.
    if(!isEdit) {
        return (
            <div className="container">
                <h1 className='header'>General Information</h1>
                <button className='editButton' onClick={changeIsEdit}>Edit</button>
                <div className="infoBox">
                    <h2>Name: {data.name}</h2>
                    <h2>Email: {data.email}</h2>
                    <h2>Phone: {data.phone}</h2>
                </div>
            </div>
        )
    }  
    // Else we want to make sure that if we are editing the secition
    // to show the form with the CURRENT data info for the user to edit and submit.
    // Submit button will update the data state with new info.
    else {
        return (
            <div className="container">
                <h1 className='header'>General Information</h1>
                <form onSubmit={changeData}>
                    <div className="infoBox">
                        <div className='inputBox'>
                            <label htmlFor="name">Name: </label>
                            <input type="text" name='name' defaultValue={data.name}/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor="email">Email: </label>
                            <input type="text" name='email' defaultValue={data.email}/>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor="phone">Phone Number: </label>
                            <input type="tel" name='phone' defaultValue={data.phone}/>
                        </div>
                    </div>
                    <button type='submit' className='submitButton'>Submit</button>
                </form>
            </div>
        );
    }
};