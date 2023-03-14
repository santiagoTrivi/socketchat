
const myform = document.querySelector('form');
const url = ( window.location.hostname.includes('localhost') )
                    ? 'http://localhost:8081/api/auth/login'
                    : 'http://localhost:8081/api/auth/login';

myform.addEventListener('submit', ev =>{
    ev.preventDefault();

    const formData = {};

    for(let input of myform.elements){
        if(input.name.length >0){
            formData[input.name] = input.value
        }

        
    }
    
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-type': 'application/json' }
    })
    .then(resp => resp.json())
    .then(({token}) =>{
        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch(err =>{
        console.log(err)
    })

});

