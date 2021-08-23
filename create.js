let inputs = document.getElementsByClassName("input");




document.getElementById("create-button").addEventListener("click", function(){
    let _user = document.getElementById("user").value;
    let _content = document.getElementById("content").value;

    if(_user === "" || _content === ""){
        alert("Fields are empty... -_-");

    }
    else{
        data.collection("posts").doc().set({
            user: _user,
            content: _content
        })
        document.getElementById("user").value = "";
        document.getElementById("content").value = "";
    }
})