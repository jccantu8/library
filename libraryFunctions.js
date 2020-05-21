let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  }
}

myLibrary.push(new Book ('The Hobbit', 'Tolkien', 295, false))
myLibrary.push(new Book ('Don Quixote', 'Cervantes', 863, true))
myLibrary.push(new Book ('War and Peace', 'Tolstoy', 1225, false))

function addBookToLibrary() {
	let title = prompt("Please enter the book title.");
	let author = prompt("Please enter the book author.");
	let pages = prompt("Please enter how many pages the book has.");
	let read = null;

	do {
		let readStatus = prompt("Did you read the book? (y or n)");
		
		if (readStatus.toLowerCase() === 'y') {
			read = true;
		} else if (readStatus.toLowerCase() === 'n') {
			read = false;
		}
	} while (read === null);

	let newbook = new Book (title, author, pages, read);

	myLibrary.push(newbook);

	render(newbook);
}

function haveRead(x) {
	return (x ? 'Yes' : 'No')
}

function deleteBook(title) {
	let mytable = document.getElementById("libraryTable");
	let index = myLibrary.findIndex(x => x.title === title);
	myLibrary.splice(index, 1);
	mytable.deleteRow(index + 1);
}

function updateReadStatus(title){
	let mytable = document.getElementById("libraryTable");
	let index = myLibrary.findIndex(x => x.title === title);

	if (myLibrary[index].read) {
		myLibrary[index].read = false;
	} else {
		myLibrary[index].read = true;
	}

	let status = myLibrary[index].read;

	mytable.rows[index + 1].cells[3].innerHTML = haveRead(status);
}

function render(book) {
	let mytable = document.getElementById("libraryTable");

	let newrow = mytable.insertRow(-1);

	let newcell1 = newrow.insertCell(0);
	let newcell2 = newrow.insertCell(1);
	let newcell3 = newrow.insertCell(2);
	let newcell4 = newrow.insertCell(3);

	newcell1.innerHTML = book.title;
	newcell2.innerHTML = book.author;
	newcell3.innerHTML = book.pages;
	newcell4.innerHTML = haveRead(book.read);

	let readbtn = document.createElement("BUTTON");
	readbtn.innerHTML = 'Toggle Read Status';
	newrow.appendChild(readbtn);
	readbtn.onclick = function(){updateReadStatus(book.title)};

	let deletebtn = document.createElement("BUTTON");
	deletebtn.innerHTML = 'Delete';
	newrow.appendChild(deletebtn);
	deletebtn.onclick = function(){deleteBook(book.title)};
}

myLibrary.forEach(render);