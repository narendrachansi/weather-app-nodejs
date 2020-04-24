const weatherForm= document.querySelector("form[name=forecast]");
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchaddress=document.getElementsByName('address')[0].value;
    const messageOne=document.getElementById('message-one');
    const messageTwo=document.getElementById('message-two');
    messageOne.textContent='Loading...';
    messageTwo.textContent='';
    fetch('http://localhost:3000/weather?address='+searchaddress).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    //console.log(error);
                    messageOne.textContent=data.error;
                }else{
                    messageOne.textContent=data.placename;
                    messageTwo.textContent=data.forecast;
                    //console.log(data);
                }
            });
    });
});
