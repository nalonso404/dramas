function gracia(event){
    const invisible= document.querySelector('.invisible')
    const message = document.querySelector('.delete-message')
    invisible.addEventListener('click',(event)=>{
        message.classList.toggle('off');
        invisible.remove();
    })
}
gracia();
