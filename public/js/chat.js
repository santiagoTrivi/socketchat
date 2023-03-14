
let user = null;
let socket = null;

// html references
const txtUid = document.querySelector('#txtUid');
const txtmessage = document.querySelector('#txtmessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnExit = document.querySelector('#btnExit');

const url = ( window.location.hostname.includes('localhost') )
                    ? 'http://localhost:8081/api/auth'
                    : 'http://localhost:8081/api/auth';

const validateJWT = async() => {
    const token = localStorage.getItem('token');

    if(token.length <= 10){
        window.location = 'index.html';
        throw new Error('There is no token on the server');
    };

    const resp = await fetch(url, {
        headers: {'Authorization': token}
    });

    const {authUser, sessionToken} = await resp.json();
    user = authUser;

    document.title = user.name;
    
    await connectTosocket();

}

const connectTosocket = async() => {

    socket = io({
        'extraHeaders': {
            'Authorization': localStorage.getItem('token')
        }
    });

    socket.on('connect', () =>{
        console.log('Socket online');
    });

    socket.on('disconnect', () => {
        console.log('Socket offline');
    });

    socket.on('recieve-messages', drawMessages);

    socket.on('users-on', drawUsers);

    socket.on('private-message', () => {

    });

}

const drawUsers = (users = [] ) =>{
    let usersHTML = '';
    users.forEach( ({name, id}) => {

        usersHTML += `
            <li>
                <p>
                    <h5 class="text-success">${name}</h5>
                    <spam class="fs-6 text-muted">${id}</spam>
                </p>
            </li>

        `;

    });

    ulUsers.innerHTML = usersHTML;
}

const drawMessages = (chats = [] ) =>{
    let chatsHTML = '';
    chats.forEach( ({uid, name, message}) => {

        chatsHTML += `
            <li>
                <p>
                    <h5 class="text-success">${name}</h5>
                    <spam class="fs-6 text-muted">${message}</spam>
                </p>
            </li>

        `;

    });

    ulMessages.innerHTML = chatsHTML;
}

txtmessage.addEventListener('keyup', ({keyCode})=> {
    const message = txtmessage.value;
    const uid = txtUid.value;
    
    
    if(message.length === 0){return};
    if(keyCode === 13){
        socket.emit('send-message', {message, uid});
    
        txtmessage.value = '';
    };
    
    
});


const main = async() =>{

    await validateJWT();

}

main();

