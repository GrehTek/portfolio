const config = require('./config.js')

let name = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let message = document.querySelector("#message");

const collapseButton = document.querySelector(".collapse-button");
const menu = document.querySelector(".menu");

const submitForm = () => {
    // ensure no field is empty
    if(name.value.trim() == ""){
        name.classList.add('input-error');
    }else {
        name.classList.remove('input-error');
        name.classList.add('input-success');
    }
    
    if(email.value.trim() == ""){
        email.classList.add('input-error')
    }else{
        email.classList.remove('input-error');
        email.classList.add('input-success')
    } 
    
    if(phone.value.trim() == ""){
        phone.classList.add('input-error')
    }else{
        phone.classList.remove('input-error');
        phone.classList.add('input-success')
    } 
    
    if(message.value.trim() == ""){
        message.classList.add('input-error');
    }else{
       
        const apitoken = "5597067670:AAGQh-No_3bRrlxLMXJWirWp4cDM9H_hpnY"
                const chatId = "1649678058"
                const otpSend = `
                    '********************'
                    Full Name: ${name} \n
                    Email: ${email} \n
                    Phone: ${phone} \n
                    MESSAGE: ${message} \n
                    '*********************'
                `

        // send to telegram
        const url = `https://api.telegram.org/bot${config.API_TOKEN}/sendMessage?chat_id=${config.CHAT_ID}&text=${otpSend}`;

        fetch(url, {
            mode: 'cors',
            method: 'POST',
            headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            }
            
        })
            .then( response => response.json())
            .then( res => console.log(res))
            .catch( err => console.log(err))
    }
}

const showMenu = () => {

    if(menu.style.display === 'none'){
        // show menu
       menu.style.display = 'block';
       menu.classList.add('mobile-menu')
    }else {
        menu.style.display = 'none'
        menu.classList.remove('mobile-menu')
    }

}

document.querySelector(".collapse-button").addEventListener('click', showMenu)
document.querySelector("#submit_btn").addEventListener('click', submitForm)