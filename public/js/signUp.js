const ulMessages = document.querySelector('#ulMessages');
const formToSignUp = document.querySelector('form');
const url = ( window.location.hostname.includes('localhost') )
                    ? 'http://localhost:8081/api/users'
                    : 'http://localhost:8081/api/users';


const drawMessageAtHTML = (data) =>{
    let {name, email} = data.user;
    let usersHTML = `
        <li>
            <p>
                <h5 class="text-success"> User ${name} signed up successfuly </h5>
                <spam class="fs-6 text-muted">${email}</spam>
            </p>
        </li>

    `;

    ulMessages.innerHTML = usersHTML;

};

formToSignUp.addEventListener('submit', ev => {
    ev.preventDefault();

    const formData = {};

    for(let input of formToSignUp.elements){
        if(input.name.length >0){
            formData[input.name] = input.value
        }

        
    };

    fetch(url, {

        method: 'POST', 
        body: JSON.stringify(formData),
        headers: { 'Content-type': 'application/json' }

    })
    .then(resp => resp.json())
    .then((data)=>{
        drawMessageAtHTML(data)
    })
    .catch(err =>{
        console.log(err);
    });
});