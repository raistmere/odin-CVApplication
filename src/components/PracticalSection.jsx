import React, { useState } from 'react';
import styles from '../styles/PracticalSection.module.css';

// 
// This component handles the general section of the CV application
// 
export function PracticalSection() {
    // Keeps track if the user is currently editing the form.
    const [isEdit, setIsEdit] = useState(false);

    // This state holds the data that will keep track of user's information
    const [data, setData] = useState([
        {name:"Simba", position:"Chef", desc:"Cook food", startDate:"1/1/1", leaveDate:"2/2/2"},
        {name:"Zimba", position:"Cop", desc:"Catch Robbers", startDate:"1/1/1", leaveDate:"2/2/2"},
        {name:"Jimba", position:"Robber", desc:"Rob banks", startDate:"1/1/1", leaveDate:"2/2/2"},
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
                    name: fieldset.elements.name.value, 
                    position: fieldset.elements.position.value, 
                    desc: fieldset.elements.desc.value,
                    startDate: fieldset.elements.startDate.value,
                    leaveDate: fieldset.elements.leaveDate.value,
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
        newData.push({name:"", email: "", phone:""});
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
                <fieldset className={styles.infoGroup}>
                    <legend>Practical Experience #???</legend>
                    <h2 className={styles.infoField}>Company name: {element.name}</h2>
                    <h2 className={styles.infoField}>Position Title: {element.position}</h2>
                    <h2 className={styles.infoField}>Job Description: {element.desc}</h2>
                    <h2 className={styles.infoField}>Start Date: {element.startDate}</h2>
                    <h2 className={styles.infoField}>Leave Date: {element.leaveDate}</h2>
                </fieldset>
            );
        });

        return (
            <div className={styles.container}>
                <h1 className={styles.header}>Practical Experience</h1>
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
                <fieldset className={styles.inputGroup}>
                    <legend>Practical Experience #???</legend>
                    <div className={styles.inputBox}>
                        <label htmlFor="name" className={styles.labelField}>Company name: </label>
                        <input type="text" className={styles.inputField} name='name' defaultValue={element.name}/>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="position" className={styles.labelField}>Position Title: </label>
                        <input type="text" className={styles.inputField} name='position' defaultValue={element.position}/>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="desc" className={styles.labelField}>Main Responsibilities: </label>
                        <input type="text" className={styles.inputField} name='desc' defaultValue={element.desc}/>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="startDate" className={styles.labelField}>Start Date: </label>
                        <input type="text" className={styles.inputField} name='startDate' defaultValue={element.startDate}/>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="leaveDate" className={styles.labelField}>Leave Date: </label>
                        <input type="text" className={styles.inputField} name='leaveDate' defaultValue={element.leaveDate}/>
                    </div>
                    <div className={styles.removeButtonBox}>
                            <button type='button' className={styles.removeButton} onClick={removeGroup}>Remove Education</button>
                    </div>
                </fieldset>
            );
        });

        return (
            <div className={styles.container}>
                <h1 className={styles.header}>Practical Experience</h1>
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