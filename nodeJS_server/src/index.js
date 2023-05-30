const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid")
const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./data");


// const contacts = [
//   { id: "1",img: "BahtovarMamurov.png" ,firstName: "Бахтовар", lastName: "Мамуров" },
//   { id: "2",img: "FarruhIsaev.png", firstName: "Фаррух", lastName: "Исаев" },
//   { id: "3", img: "DilovarSaidov.png" ,firstName: "Диловар", lastName: "Саидов" },
// ];

// localStorage.setItem("contacts", JSON.stringify(contacts))
// const messages = [];
// localStorage.setItem("messages", JSON.stringify(messages))
app.use(bodyParser.json());

app.use(cors());
app.get("/contacts", (req, res) => {
  res.send(localStorage.getItem("contacts"));
});

//messages
// app.get("/messages", (req, res) => {
//   res.send(localStorage.getItem("messages"));
// });

app.post("/create-message", (req, res) => {
  const messages = localStorage.getItem("messages");
  const newMessages = messages ? JSON.parse(messages) : [];
  newMessages.push(req.body);
  localStorage.setItem("messages", JSON.stringify(newMessages));
  res.send(newMessages);
});


//фильтрация должна быть тут - все что есть на фронте - нужно передать сюда. TODO 
app.get('/message-user/:id', (req, res) => {
  const { id } = req.params;
  const messages = localStorage.getItem('messages');
  const fiterMessages = JSON.parse(messages).filter((message) => (
    (message.senderId === 1 && message.receiverId === id)
   ))
  res.send(fiterMessages)
});


// //add our users - for Log in 
app.post('/create-user', (req, res) => {
  const user = {
    id: uuid.v4(),
    login: req.body.login,
    password: req.body.password
  }
  localStorage.setItem("user", JSON.stringify(user))
  res.send(user);
})
// app.get('create-user', (req, res) =>{
//   const { id } = req.params;
//   const users = localStorage.getItem('users');
//   const fiterUsers = JSON.parse(users).filter((users) => (
//     (users.senderId === 1 && users.receiverId === id)
//    ))
//   res.send(fiterUsers)
// });

// //Логин нужно проверить и сравнить 
app.post("/login", (req, res) => {
const userFromStorage = JSON.parse(localStorage.getItem("user"))

if (userFromStorage.login === req.body.login && 
  userFromStorage.password === req.body.password )
  {
    res.send (true)
  } else {
    res.send (false)
  }
})


app.listen(3001, () => {
  console.log(`Hola KSG, everythings work well`);
});
