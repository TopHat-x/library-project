let myLibrary = [];

function Book(title, author, year){
    this.title = title;
    this.author = author;
    this.year = year;
    addBookToLibrary(this);
    displayBooks(this);
}

let index = 1;
function addBookToLibrary(book){
    myLibrary[index] = book;
    index++;
}

function displayBooks(book){
    row = tbl.insertRow();
    rowID = myLibrary.length - 1;
    row.id = "row" + (myLibrary.length - 1);
    
    cell1 = row.insertCell();
    cell1.textContent = book.title;
    cell2 = row.insertCell();
    cell2.textContent = book.author;
    cell3 = row.insertCell();
    cell3.textContent = book.year;

    cell4 = row.insertCell();
    cell4.textContent = "Not Read";
    cell4.id = "read" + rowID;
    
    cell5 = row.insertCell();
    cell5.style.width = '80px';
    let readToggleBtn = document.createElement("button");
    readToggleBtn.textContent = "Toggle";
    readToggleBtn.className = "readToggleBtn";
    readToggleBtn.setAttribute("data-rowID", rowID);
    cell5.appendChild(readToggleBtn);
    

    readToggleBtn.addEventListener("click", e => {
        rowID = e.target.getAttribute("data-rowID");
        cell = document.querySelector("#read" + rowID);

        if(cell.textContent === "Not Read"){
            cell.textContent = "Read";
        } else {
            cell.textContent = "Not Read";
        }
    })

    cell6 = row.insertCell();
    cell6.className = "invisCell";

    let delBtn = document.createElement("button");
    delBtn.textContent = "x";
    delBtn.className = "delBtn";
    delBtn.id = "delBtn" + (rowID);
    delBtn.setAttribute("data-rowID", rowID);
    cell6.appendChild(delBtn);

    delBtn.addEventListener("click", e => {
        rowID = parseInt(e.target.getAttribute("data-rowID"));
        deleteBook(rowID)
    });

}

function addBookPrompt(){
    let title = prompt("What is the book's title?");
    let author = prompt("What is the book's author?");
    let year = prompt("What year was the book published?");
    new Book(title, author, year);
}

function deleteBook(rowID){
    let rowIndex = rowID + 2;
    tbl.deleteRow(rowIndex);
    
    let tblLength = tbl.rows.length;

    for(i = rowID + 1; i <= tblLength - 2; i++){
        row = tbl.querySelector("#row" + i);
        row.id = "row" + (i - 1);

        delBtn = tbl.querySelector("#delBtn" + i);
        delBtn.id ="delBtn" + (i - 1);

        delBtn.setAttribute("data-rowID", i-1);
    }

    myLibrary.splice(rowID,1);
    index--;
}

const tbl = document.querySelector("#bookTable");
const btn = document.querySelector("#addBookButton");

btn.addEventListener("click", () => {addBookPrompt()});