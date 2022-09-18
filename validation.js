let email=document.getElementById("email");
email.addEventListener("input",()=>emailvalidate(email))
function emailvalidate(element){
    if(element.validity.typeMismatch){
        element.setCustomValidity("enter a valid email");
        element.reportValidity();
        }
        else{
        element.setCustomValidity("");
        }
}    
let date_of_birth=document.getElementById("dob");
date_of_birth.addEventListener("change",()=>agevalidate(date_of_birth));
function agevalidate(element)
{
    let get_date=element.value.split("-");
    let year=get_date[0];
    let month=get_date[1];
    let date=get_date[2];
    let birth_date=new Date(year,month,date);
    let today = new Date();
    let currentYear= today.getFullYear();
    let birth_Year=birth_date.getFullYear()
    let age = currentYear - birth_Year;
    let monthDiff = today.getMonth() - birth_date.getMonth();
    if ((today.getDate() < birth_date.getDate())||monthDiff<0) 
    {
    age--;
    }
    if (age<18 || age>55) 
    {
    dob.setCustomValidity("age should be between 18 and 55");
    dob.reportValidity();
    }
    else
    {
    dob.setCustomValidity("");
    }
}
let userform=document.getElementById('form_data');
const retriveEntries=()=>{
    let entries=localStorage.getItem("entries");
    if(entries){
        entries=JSON.parse(entries);
    }
    else{
        entries=[];
    }
    return entries;
}
let userEntries=retriveEntries();

const displayEntries=()=>{
    let entries=retriveEntries();
    const tableEntries=entries.map((entry)=>{
    const name=`<td>${entry.name}</td>`;
    const email=`<td>${entry.email}</td>`;
    const password=`<td>${entry.password}</td>`;
    const dob=`<td >${entry.dob}</td>`;
    const accept=`<td>${entry.acceptedTermsAndCondition}</td>`;
    const row=`<tr>${name} ${email} ${password} ${dob} ${accept}</tr>`;
    return row;
    }).join("\n");
    const table=`<table border="2">
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th >Password</th>
    <th>Dob</th>
    <th>Accepted terms?</th>
    </tr>
    ${tableEntries}</table>`;
    let details=document.getElementById("entries");
    details.innerHTML=table;
}
const saveUserForm=(event)=>{
     event.preventDefault();
     const name=document.getElementById("name").value;
     const email=document.getElementById("email").value;
     const password=document.getElementById("password").value;
     const dob=document.getElementById("dob").value;

     const acceptedTermsAndCondition=document.getElementById("acceptTerms").checked;
     const entry={
        name,
        email,
        password,
        dob,
        acceptedTermsAndCondition
     };
     userEntries.push(entry);
     localStorage.setItem("entries",JSON.stringify(userEntries));
     displayEntries();
}
userform.addEventListener("submit",saveUserForm);
displayEntries();