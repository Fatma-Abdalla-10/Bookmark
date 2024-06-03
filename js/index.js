var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var newData = document.getElementById("tBody");

function loadBookmarks() {
    var storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
        return JSON.parse(storedBookmarks);
    } else {
        return [];
    }
}

var bookMarks = loadBookmarks();

function saveBookmarks(bookmarks) {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function addBookmark() {
    var siteName = siteNameInput.value;
    var siteUrl = siteUrlInput.value;

    if (!isValidURL(siteUrl)) {
        alert("Invalid URL. Please enter a valid URL.");
        return;
    }

    if (!isValidName(siteName)) {
        alert("Invalid Site Name. Please enter a valid Site Name.");
        return;
    }

    var newBookmark = {
        siteName: siteName,
        siteUrl: siteUrl
    };

    bookMarks.push(newBookmark);
    saveBookmarks(bookMarks);
    displayData();
    console.log(bookMarks);

    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function deleteBookmark(index) {
    bookMarks.splice(index, 1);
    saveBookmarks(bookMarks);
    displayData();
}

function displayData() {
    var allData = "";
    for (var i = 0; i < bookMarks.length; i++) {
        allData += `<tr>
            <td>${i + 1}</td>
            <td>${bookMarks[i].siteName}</td>
            <td><a href="${bookMarks[i].siteUrl}"  target="_blank" class="btn text-center">Visit</a></td>
            <td><button class="btn text-center" onclick="deleteBookmark(${i})">Delete</button></td>
        </tr>`;
    }
    newData.innerHTML = allData;
}

displayData();

function isValidURL(url) {
    var urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}

function isValidName(siteName) {
    var nameRegex = /^[a-z0-9_-]{3,15}$/;
    return nameRegex.test(siteName);
}
