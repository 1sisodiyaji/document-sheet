import React from 'react'
import "./Template.css";

const Template =  ({name,place, reason,date,serialNumber,QrCode}) => {
    return (
      <>
       <div id="Main_Container">
          <div id="Image_section">
                <input type="date" name="" id="Date_system"/>
                <input type="text" name="" maxlength="40"  id="Place_Section"/>
                  <select name="" id="Reason_Section" >
                      <option value="POWER OF ATONY">POWER OF ATONY</option>
                      <option value="RENTAL STRUCTURE">RENTAL STRUCTURE</option>
                      <option value="LEGAL POWER">LEGAL POWER</option>
                  </select>
                  <div>
                      <input type="text" name="" maxlength="30"  id="Nameing_Section"/>
                  </div> 
          </div>
  
      </div>
      </>
    )
  }

export default Template