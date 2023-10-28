import React, { useState } from 'react';
import styles from '../styles/EducationSection.module.css';
import { v4 as uuidv4 } from 'uuid';

// 
// This component handles the general section of the CV application
// 
export function EducationSection() {
    // Keeps track if the user is currently editing the form.
    const [isEdit, setIsEdit] = useState(false);

    // This state holds the data that will keep track of user's information
    const [data, setData] = useState([
        {id: uuidv4(), name:"Simba", email:"simba@host.com", phone: 1112223333},
        {id: uuidv4(), name:"Jimba", email:"jimba@host.com", phone: 1112223333},
        {id: uuidv4(), name:"Zimba", email:"zimba@host.com", phone: 1112223333},
        {id: uuidv4(), name:"Ximba", email:"zimba@host.com", phone: 1112223333},
    ]);

    // This method changes the state for isEdit
    const changeIsEdit = () => {
        setIsEdit((prevState) => !prevState);
    }

    // This method changes the state: data by receiving form data
    // and extracting values needed to update data.
    const retrieveData = (formData) => {
        // New array to store all the inputGroup elements
        let fieldsetArray = [];
        // We want to convert the collections of elements into an array of elements
        // --OLD fieldsetArray = Array.from(formData.target.elements);
        fieldsetArray = Array.from(formData);
        // Then we make sure to filter the array and grab just the elements that are fieldsets (these should be inputGroups)
        fieldsetArray = fieldsetArray.filter((e) => e.nodeName === "FIELDSET");
        console.log("Fieldsets: ", fieldsetArray);
        // Grab inputFields of each fieldset and create a new data object that
        // will store all the new data.
        let newData = [];
        fieldsetArray.forEach(fieldset => {
            newData.push({
                    id: fieldset.getAttribute("data-key"),
                    name: fieldset.elements.name.value, 
                    email: fieldset.elements.email.value, 
                    phone: fieldset.elements.phone.value
                });
        });

        console.log("Retrieved Data: ", newData);
        // After we get the newData ready to go, we want to return it back to whoever called this function.
        return newData;
    }

    // This method handles adding a new infoGroup to the infoBox allowing the
    // user to add more education info to their application.
    const addNewGroup = () => {
        // We want to grab the current form elements so we can grab their current values.
        let formData = document.forms.educationForm.elements;
        console.log("Current Form Data: ", formData);
        // Go ahead and retrieve the current form data values.
        let newData = retrieveData(formData);
        // Add a new education data object to the existing newData
        console.log("Before Add: ", newData);
        newData.push({id: uuidv4(), name:"", email: "", phone:""});
        console.log("After Add: ", newData);
        // Once we have the correct newData from the formData, we want to go ahead
        // and replace the state: data with the newData.
        setData(newData);
    }

    const removeGroup = (e) => {
        // We want to remove the fieldset that the button is in. So we 
        // have to find the parent of the parent which will always be the fieldset.
        console.log("Removing group...", e.target.parentNode.parentNode.remove());
        e.target.parentNode.parentNode.remove();

        // I DONT KNOW WTF IS GOING ON BUT FOR SOME REASON I HAVE TO DO THIS IN ORDER TO NOT HAVE THE 
        // APP GO CRAZY AND BECOME SOME CTHULHU MONSTER WHERE ADD BUTTON REMOVES THINGS AND DELETES AND ...
        // Anyways, this is a super bandaid fix. We are just going to hard force submit the data and then
        // re-enter the edit mode right after to insure that no problems (the existing one without this bandadi)
        // occur.
        let submitButton = document.querySelector(`.${styles.submitButton}`);
        console.log(submitButton);
        submitButton.click();
        setTimeout(() => {
            let editButton = document.querySelector(`.${styles.editButton}`);
            editButton.click();
        }, 10);
    }

    // This method handles submitting the form data and any changes to the State: data
    const submitData = (formData) => {
        // Prevent default submission and stop reloading the page
        formData.preventDefault(); 
        //
        // --OLD changeData(formData);
        let newData = retrieveData(formData.target.elements);
        // Once we have the correct newData from the formData, we want to go ahead
        // and replace the state: data with the newData.
        setData(newData);
        // Make sure that we exit from the edit mode after submission
        changeIsEdit();
    }

    // We want to check if the isEdit state is true or false
    // If it's false then we want to make sure to display just the
    // info for the section without the form.
    if(!isEdit) {

        let infoBoxArray = []
        data.forEach(element => {
            infoBoxArray.push(
                <fieldset key={element.id} data-key={element.id} className={styles.infoGroup}>
                    <legend>Education #???</legend>
                    <h2 className={styles.infoField}>School name: {element.name}</h2>
                    <h2 className={styles.infoField}>Type of study: {element.email}</h2>
                    <h2 className={styles.infoField}>Date of study: {element.phone}</h2>
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
        );
    }  
    // Else we want to make sure that if we are editing the secition
    // to show the form with the CURRENT data info for the user to edit and submit.
    // Submit button will update the data state with new info.
    else {

        let infoBoxArray = []
        data.forEach(element => {
            infoBoxArray.push(
                <fieldset key={element.id} data-key={element.id} className={styles.inputGroup}>
                    <legend>Education #???</legend>
                    <div className={styles.inputBox}>
                        <label htmlFor="name" className={styles.labelField}>School name: </label>
                        <input type="text" className={styles.inputField} name='name' defaultValue={element.name}/>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="email" className={styles.labelField}>Title of study: </label>
                        <input type="text" className={styles.inputField} name='email' defaultValue={element.email}/>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="phone" className={styles.labelField}>Date of study: </label>
                        <input type="text" className={styles.inputField} name='phone' defaultValue={element.phone}/>
                    </div>
                    <div className={styles.removeButtonBox}>
                            <button type='button' className={styles.removeButton} onClick={removeGroup}>Remove Education</button>
                    </div>
                </fieldset>
            );
        });

        return (
            <div className={styles.container}>
                <h1 className={styles.header}>Education Information</h1>
                <form id="educationForm" onSubmit={submitData}>
                    <div className={styles.infoBox}>
                        {infoBoxArray}
                        <div className={styles.addButtonbuttonBox}>
                            <button type='button' className={styles.addButton} onClick={addNewGroup}>Add New Education</button>
                        </div>
                    </div>
                    <button type='submit' className={styles.submitButton}>Submit</button>
                </form>
            </div>
        );
    }
};