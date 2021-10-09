var socket = io('http://localhost:3000');
const l = console.log
function getEl(id) {
    return document.getElementById(id)
}
const editor1 = getEl("editor1")
// let edit = ace.edit("editor") 
editor1.addEventListener("keyup", (evt) => {
   // l(evt);
   //console.log(evt);
    const text = edit.getValue();
    socket.send(text)
})



socket.on('message', (data) => {
    console.log(data);
    edit.session.setValue(data);
   
})