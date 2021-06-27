const searchBar= document.getElementById('search')
const searchBox= document.getElementById('search-box')
const results= document.getElementById('results')

searchBar.addEventListener('keydown',(e)=>{
    console.log(e.target.value)
})

 async function getData(e){
    e.preventDefault()
    
    let term= searchBar.value

     await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      })
     .then((response)=>{
         console.log(response)
         results.innerHTML =response.data.query.search.map(wiki=>
            `
            <div class='result'>
              <h3>${wiki.title}</h3>
              <p>${wiki.snippet}</p>
              <a href='https://en.wikipedia.org/?curid=${wiki.pageid}' target='_blank'>Read More</a>
            </div>
            `
         )
     })
     searchBar.value=''
}

searchBox.addEventListener('submit', getData)
