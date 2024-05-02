
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let message = document.querySelector("#message");
const loader = document.querySelector('#loader');
let successMessage = document.querySelector("#successMessage");
let errorMessage = document.querySelector("#errorMessage");
const submitBtn = document.querySelector("#submit_btn");

const collapseButton = document.querySelector(".collapse-button");
const menu = document.querySelector(".menu");

loader.style.display = 'none';

const submitForm = () => {
    // ensure no field is empty
    if(name.value.trim() == ""){
        name.classList.add('input-error');
    }else {
        name.classList.remove('input-error');
    }
    
    if(email.value.trim() == ""){
        email.classList.add('input-error')
    }else{
        email.classList.remove('input-error');
    } 
    
    if(phone.value.trim() == ""){
        phone.classList.add('input-error')
    }else{
        phone.classList.remove('input-error');
    } 
    
    if(message.value.trim() == ""){
        message.classList.add('input-error');
    }else{   
        message.classList.remove('input-error');

        // show loader and hide submit button
        loader.style.display = 'block';
        submitBtn.style.display = 'none';
        
        const otpSend = `
            '********************'
            '--- from portfolio site ---'
            Full Name: ${name.value} + \n
            Email: ${email.value} + \n
            Phone: ${phone.value} + \n
            MESSAGE: ${message.value} + \n
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
            .then( (res) => {
                // clear input fields
                name.value = '';
                email.value ='';
                phone.value='';
                message.value ='';

                // output success message
                successMessage.innerHTML = "<p>Thank you for reaching out! You'll be contacted shortly</p>";
                setTimeout(() => {
                    successMessage.innerHTML = '';
                }, 5000);
                
                // hide loader and show submit button
                loader.style.display = 'none';
                submitBtn.style.display = 'block';
            })
            .catch( (error) => {
                // hide loader, show submit button
                loader.style.display = 'none';
                submitBtn.style.display = 'block';
                
                // output error
                errorMessage.innerHTML = `<p>An error occured: ${error}</p>`;
                setTimeout( () => {
                    errorMessage.innerHTML = '';
                }, 5000)
            })

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
submitBtn.addEventListener('click', submitForm)
