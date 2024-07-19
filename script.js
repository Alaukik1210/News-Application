const api_key = "fd8c052b61a24ee484292e5ee38afc96";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=> fetchNews("India"));

async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${api_key}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardscontainer = document.getElementById('cards-container');
    const newscardtemplate = document.getElementById('template-news-card');

    cardscontainer.innerHTML = '';
     
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardclone = newscardtemplate.content.cloneNode(true);
        fillDataInCard(cardclone,article);
        cardscontainer.appendChild(cardclone);
        
    });
}

function fillDataInCard(cardclone, article){
    const newsImg = cardclone.querySelector('#news-img');
    const newsTitle = cardclone.querySelector('#news-title');
    const newsSource = cardclone.querySelector('#news-source');
    const newsDesc = cardclone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
   

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name}. ${date}`;

    cardclone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchbtn = document.getElementById("search-button");
const  searchtext = document.getElementById("news-input");

searchbtn.addEventListener("click",()=>{
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);

})

document.getElementById('hamburger').addEventListener('click', function() {
    var navMenu = document.getElementById('nav-menu');
    if (navMenu.style.display === "none") {
        navMenu.style.display = "block";
    } else {
        navMenu.style.display = "none";
    }
});