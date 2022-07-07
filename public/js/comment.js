console.log("start");
const { Trip } = require("../db/models");
const { User } = require("../db/models");
const comment = document.forms.comm;
comment.addEventListener("submit", async(e) => {
  e.preventDefault();
const text = e.target.querySelector('textarea').value;
    const response = await fetch(
      "http://localhost:3000/cycling-trips/detalinformform/:id",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({comment:text}),
      }
    );

    if(response.status === 200){
        console.log(323232);
    }

  console.log(entry);
 



});
