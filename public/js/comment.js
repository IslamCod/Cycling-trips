const comment = document.forms.comm;
console.log('drtyuygfd')
comment.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = e.target.querySelector("textarea").value;
  console.log(text);
  const response = await fetch(
    "http://localhost:3000/cycling-trips/detalinformform/:id",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: text }),
    }
  );
  if (response.ok) {
    const responseJson = await response.json(); //получаем коммент
    const divPosts = document.querySelector("#postList"); //ищем див с комментами
    divPosts.insertAdjacentHTML('afterbegin', ` <div>${responseJson}</div`); // добавляем новый коммент
  }
});
