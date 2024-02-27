

var config = {
  postsDatePrefix: false, // Indique si les URL des articles contiennent un préfixe de date
  accessOnly: false,      // Indique si l'accès est restreint
 
}

// Variables globales
var postsOrPages = ["pages", "posts"]; 
var blogId = "<data:blog.blogId/>";    
var urlTotal, fetchIndex = 1;          // pagination 
var ampChar = "&amp;"[0];              //'&'
var secondRequest = true;              // Indique s'il s'agit de la deuxième demande de contenu
var feedPriority = 0;                   // Priorité pour récupérer les données (0: pages, 1: articles)
var nextPageToken;                     // Jeton  pagination

// Fonction pour déterminer le type d'URL
function urlVal() {
  var url = window.location.pathname; 
  var length = url.length;            
  var urlEnd = url.substring(length - 5); // Extrait les 5 derniers caractères 

  if (urlEnd === ".html") return 0;     
  else if (length > 1) return 1;      
  else return 2;                        
}

// Fonction pour modifier l'URL en fonction du type
export function urlMod() {
  var url = window.location.pathname; 
const page = url.match(/\/p\/([^\/]+)\.html$/)
  if ( page){
    history.replaceState(null, null, "../" + page[1]); 
    return {type:'pages',url}
  } else {
    if (!config.postsDatePrefix) url = url.substring(url.indexOf("/", 7) + 1);
    else url = url.substring(1);
    url = url.substr(0, url.indexOf(".html"));
    history.replaceState(null, null, "../../" + url);
    return {type:'posts',url}
  }
}


function urlSearch(url, database) {
  var pathname = url + ".html"; // Ajoute l'extension '.html' à l'URL
  database.forEach(function(element) {
    var search = element.search(pathname); // Recherche l'URL dans la base de données
    if (search !== -1) window.location = element; // Si trouvé, redirige vers cette URL
  });
}

// gérer l'URL en fonction de son type
function urlManager() {
  var validation = urlVal(); // Détermine le type d'URL
  if (validation === 0) {
    // modifie l'URL 
    if (!config.accessOnly) urlMod();
  } else if (validation === 1) {
    //  récupère les données de la page ou des articles en fonction de la priorité
    fetchData(postsOrPages[feedPriority], 1);
  } else if (validation === 2) {
    
    if (!config.accessOnly) history.replaceState(null, null, "/");
  }
}

function fetchData(postsOrPages, index) {
  var script = document.createElement("script"); 
  var jsonUrl; 

    jsonUrl = window.location.protocol + "//" + window.location.hostname + "/feeds/" + postsOrPages + "/summary?start-index=" + index + "#max-results=150#orderby=published#alt=json-in-script#callback=parseData";
  
  jsonUrl = jsonUrl.replace(/#/g, ampChar);

  script.type = "text/javascript";
  script.src = jsonUrl;

  document.getElementsByTagName("head")[0].appendChild(script);
}

function parseData(json) {
  var database = []; // stocker les URL des articles ou des pages

    if (!urlTotal) urlTotal = parseInt(json.feed.openSearch$totalResults.$t);

    try {
      // extrait les URL des articles ou des pages
      json.feed.entry.forEach(function(element, index) {
        var entry = json.feed.entry[index];
        entry.link.forEach(function(element, index) {
          if (entry.link[index].rel === "alternate") database.push(entry.link[index].href);
        });
      });
    } catch (er) {}
    nextPageToken=json.nextPageToken
  // appel f() Recherche url et redirige si trouvé
  urlSearch(window.location.pathname, database);

  // Pagination des résultats si nécessaire
  if (urlTotal > 8) {
    fetchIndex += 8;
    urlTotal -= 8;
    fetchData(postsOrPages[feedPriority], fetchIndex); // Récupère les prochains résultats
  } else if (nextPageToken) {
    fetchData(postsOrPages[feedPriority]); // Récupère les prochains résultats avec le jeton de pagination
  } else if (secondRequest) {
    // Si une deuxième demande est nécessaire (pour récupérer les pages si les articles sont déjà récupérés, et vice versa)
    nextPageToken = undefined;
    urlTotal = 0;
    fetchIndex = 1;
    secondRequest = false;

    // Change la priorité de récupération et lance une nouvelle récupération
    if (feedPriority === 0) {
      feedPriority = 1;
      fetchData("posts", 1); // Récupère les articles
    } else if (feedPriority === 1) {
      feedPriority = 0;
      fetchData("pages", 1); // Récupère les pages
    }
  }
}

// Fonction principale pour initialiser le script
function bloggerJS(priority) {
  if (priority) feedPriority = priority; // Si une priorité est spécifiée, met à jour la priorité
  urlManager(); // Gère l'URL en fonction de son type
}
bloggerJS();

