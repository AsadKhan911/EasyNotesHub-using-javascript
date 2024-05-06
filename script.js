//Event listener for , if user adds a note , add it to the local storage.
showNotes() //show notes when page gets reload
let addBtn = document.getElementById('add_btn')
addBtn.addEventListener('click' , function(e)
{
    let addTxt = document.getElementById('add_txt')
    let addTitle = document.getElementById('add_title')
    let notes = localStorage.getItem('notes')
    let notesObj
    if(notes == null)
    {
        notesObj = [] //initializing an empty array
    }
    else{
        notesObj = JSON.parse(notes) //it converts the notesObj array into java script object (json) format
    } //This step is crucial because data retrieved from localStorage is stored as a string

    let myObj = {
        title : addTitle.value ,
        text : addTxt.value
    }

    notesObj.push(myObj) //making added text value to json format
    localStorage.setItem('notes' , JSON.stringify(notesObj)) //converting back json object to json string..This is necessary because localStorage can only store strings, so JSON.stringify() ensures that the array of notes is represented as a string before storage.
    addTxt.value = ""
    addTitle.value = ""
    console.log(notesObj)
    showNotes()
})

function showNotes () //show notes by reading all the notes from local storage
{
    let notes = localStorage.getItem('notes')
    if(notes == null)
    {
        notesObj = []
    }
    else{
        notesObj = JSON.parse(notes)
    }
    let html = ""
    notesObj.forEach(function(element , index){ //applying for each on notesObj.push(myObj) object
        html += ` <div class="card border border-danger  mx-2 my-2 note_card" style="width: 18rem;">
       <img src="bookmark.png" id=bookmark-${index} class="card-img-top" alt="Bookmark" style="width: 25px; height: 25px; margin-top: 5px; margin-left: -7px;">

        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`
    })
    let notesElm = document.getElementById('notes')
    if(notesObj.length != 0){
        notesElm.innerHTML = html
    }
    else{ //if(notesObj.length==0)
        notesElm.innerHTML = `No content available! Employ the "Add note section" above to insert new notes.`
    }

}

//Function to delete a note

function deleteNote(index) {
    console.log("I am deleting index " + index);

    let notes = localStorage.getItem('notes');
    let notesObj;

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

//Adding Event Listener for search functionality

let searchTxt = document.getElementById('search')
searchTxt.addEventListener("input" , function(){
    let searchVal = searchTxt.value.toLowerCase()
    let noteCards =  document.getElementsByClassName('note_card') //html cards class
    Array.from(noteCards).forEach(function (element) { //all cards will be converted into array and then executed one by one in loop using for each
        let cardTitle = element.getElementsByTagName('h5')[0].innerText //as we have one para in card , so [0] index card will be targeted
        let cardDesc = element.getElementsByTagName('p')[0].innerText //as we have one para in card , so [0] index card will be targeted
        if(cardTitle.includes(searchVal)||cardDesc.includes(searchVal)){ 
            element.style.display = 'block' //if it includes that text display will be block(shown)
        }
        else{
            element.style.display = 'none' //otherwise hidden
        }
    })
})



let notes = localStorage.getItem('notes');
if (notes == null) {
    notesObj = [];
} else {
    notesObj = JSON.parse(notes);
}

//Bookmark functionality 

const BookMark = () =>
    {
notesObj.forEach(function(element, index) {
    let bookmark_img = document.getElementById(`bookmark-${index}`);
    if (bookmark_img) {
        bookmark_img.addEventListener('click', function(e) {
            // Use a clear and correct path with the right file extension
            const bookmarked = 'bookmarkyellow.png';
            const unbookmarked = 'bookmark.png';

            // Toggle the image source based on its current state
            if (bookmark_img.src.includes(unbookmarked)) {
                bookmark_img.src = bookmarked;
            } else {
                bookmark_img.src = unbookmarked;
            }
        });
    }
})
    };

    document.addEventListener('DOMContentLoaded', function() {
        // Add bookmark event listeners after the DOM content is fully loaded
        BookMark();
    });


