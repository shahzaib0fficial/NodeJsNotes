const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      // console.log(xhr.response);
      console.log(JSON.parse(xhr.response).fact)
    }
    else {
      console.log("Error from API response")
    }
  }
}
xhr.open("GET", "https://catfact.ninja/fact")
xhr.send()