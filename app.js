let ip_address; 
const menu = document.getElementById("mobile-menu");
const menuLinks = document.getElementsByClassName("navbar_menu");

  // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBgpsMm4jHCPLNJR6Tqp5F8XkkL1zbmP7c",
    authDomain: "word-data.firebaseapp.com",
    projectId: "word-data",
    storageBucket: "word-data.appspot.com",
    messagingSenderId: "304958249956",
    appId: "1:304958249956:web:f09809ca60f6d18fd485f1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


let postCollection = document.getElementById("posts-collection")

const data = firebase.firestore();
console.log(data)


function createPost(user, content, id){
    let div = document.createElement("div");
    
    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    let button = document.createElement("button");
    
    div.setAttribute("id", id)
    h2.textContent = content;
    h3.textContent = user;
    button.textContent = "x";
    button.className = id;
    
    
    div.appendChild(h2);
    div.appendChild(h3);
    //check if admin to att del button
    fetch("https://api.ipify.org/?format=json").then(results => results.json()).then(data => {
        ip_address = data.ip
        if(ip_address == "77.244.4.69" || ip_address == "82.100.127.46"){
            div.appendChild(button);
    
        }
    });
    
    button.addEventListener("click", function(){
        console.log(button.className)
        data.collection("posts").doc(id).delete()
    }, false)
    
    postCollection.appendChild(div);

}



data.collection("posts").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == "added"){
            createPost(change.doc.data().user, change.doc.data().content, change.doc.id);
            console.log("lmaoo")
        }
        else if(change.type == "removed"){
            document.getElementById(change.doc.id).remove()
            
        }
            
    });
})


menu.addEventListener("click", function(){
    menu.classList.toggle("is-active");
//    menuLinks.classList.toggle("active");
    for(let i = 0; i < menuLinks.length; i += 1) {
        menuLinks.item(i).classList.toggle("active");
    }
}, false)
