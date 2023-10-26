import { useState } from 'react';
import styles from '../styles/EducationSection.module.css';

// 
// This component handles the general section of the CV application
// 
export function EducationSection() {
    // Keeps track if the user is currently editing the form.
    const [isEdit, setIsEdit] = useState(false);

    // This state holds the data that will keep track of user's information
    const [data, setData] = useState([
        {name:"Simba", email:"simba@host.com", phone: 1112223333},
        {name:"Jimba", email:"jimba@host.com", phone: 1112223333},
        {name:"Zimba", email:"zimba@host.com", phone: 1112223333},
        {name:"Ximba", email:"zimba@host.com", phone: 1112223333},
    ]);

    // This method change'header's the state for isEdit
    const changeIsEdit = () => {
        setIsEdit((prevState) => !prevState);
    }

    // This method changes the state for data by receiving form data
    // and extracting values needed to update data.
    const changeData = (formData) => {
        // Prevent default submission and stop reloading the page
        formData.preventDefault(); 
        // New array to store all the inputGroup elements
        let fieldsetArray = [];
        // We want to convert the collections of elements into an array of elements
        fieldsetArray = Array.from(formData.target.elements);
        // Then we make sure to filter the array and grab just the elements that are fieldsets (these should be inputGroups)
        fieldsetArray = fieldsetArray.filter((e) => e.nodeName === "FIELDSET");
        // Grab inputFields of each fieldset and create a new data object that
        // will store all the new data.
        let newData = [];
        fieldsetArray.forEach(fieldset => {
            newData.push({
                    name: fieldset.elements.name.value, 
                    email: fieldset.elements.email.value, 
                    phone: fieldset.elements.phone.value}
                );
        });
        console.log(newData);
        // Once we have the correct newData from the formData, we want to go ahead
        // and replace the state: data with the newData.
        setData(newData);
        // // Make sure that we exit from the edit mode after submission
        changeIsEdit();
    }

    // We want to check if the isEdit state is true or false
    // If it's false then we want to make sure to display just the
    // info for the section without the form.
    if(!isEdit) {

        let infoBoxArray = []
        data.forEach(element => {
            infoBoxArray.push(
                <fieldset className={styles.infoGroup}>
                    <legend>Education #???</legend>
                    <h2 className={styles.infoField}>Name: {element.name}</h2>
                    <h2 className={styles.infoField}>Email: {element.email}</h2>
                    <h2 className={styles.infoField}>Phone: {element.phone}</h2>
                </fieldset>
            );
        });

        return (
            <div className={styles.container}>
                <h1 className={styles.header}>Education Information</h1>
                <button className={styles.editButton} onClick={changeIsEdit}>Edit</button>
                <div className={styles.infoBox}>
                    {infoBoxArray}
                </div>   
            </div>
        )
    }  
    // Else we want to make sure that if we are editing the secition
    // to show the form with the CURRENT data info for the user to edit and submit.
    // Submit button will update the data state with new info.
    else {

        let infoBoxArray = []
        data.forEach(element => {
            infoBoxArray.push(
                <fieldset className={styles.inputGroup}>
                    <legend>Education #???</legend>
                    <div className={styles.inputBox}>
                        <label htmlFor="name" className={styles.labelField}>Name: </label>
                        <input type="text" className={styles.inputField} name='name' defaultValue={element.name}/>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="email" className={styles.labelField}>Email: </label>
                        <input type="text" className={styles.inputField} name='email' defaultValue={element.email}/>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="phone" className={styles.labelField}>Phone Number: </label>
                        <input type="text" className={styles.inputField} name='phone' defaultValue={element.phone}/>
                    </div>
                </fieldset>
            );
        });

        return (
            <div className={styles.container}>
                <h1 className={styles.header}>Education Information</h1>
                <form onSubmit={changeData}>
                    <div className="infoBox">
                        {infoBoxArray}
                    </div>
                    <button type='submit' className={styles.submitButton}>Submit</button>
                </form>
            </div>
        );
    }
};