const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const browseBtn = document.getElementById("browseBtn");
const fileList = document.getElementById("fileList");
const uploadBtn = document.getElementById("uploadBtn");
const status = document.getElementById("status");

// Use DataTransfer to manage file list (since FileList is read-only)
// add or remove files dynamically
let dt = new DataTransfer();

// Drag over event to allow drop and apply hover styling
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault(); //stops the default behavior (e.g., opening the file in the browser) when dragging over the drop zone
  dropZone.classList.add("hover"); //applies a CSS class so user can see the change
});

// Remove hover styling when file is dragged out
dropZone.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropZone.classList.remove("hover"); // When the dragged file leaves the drop zone, the code removes the hover styling to revert to the normal appearance
});

// Handle drop event: add dropped files to our DataTransfer
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("hover");
  const files = e.dataTransfer.files; // retrieves the files dropped by the user.
  addFiles(files);
});

// Open file picker when browse button is clicked
browseBtn.addEventListener("click", () => {
  fileInput.click();
});

// Add selected files from file input to our DataTransfer
fileInput.addEventListener("change", () => {
  addFiles(fileInput.files); // adds the selected files to the DataTransfer object
  fileInput.value = ''; // Reset file input after adding
});

// function accepts a FileList (from drag-and-drop or file picker)
function addFiles(files) {
  for (let file of files) {
    dt.items.add(file); //loops through each file and adds it to the DataTransfer object
  }
  updateFileList(); // after add file, calls updateFileList() to refresh the UI list of selected files
}

// Update the display of selected files and add cancel buttons
function updateFileList() {
  fileList.innerHTML = ""; // Clear current file listed
  for (let i = 0; i < dt.files.length; i++) { // loop through every file
    const file = dt.files[i]; 
    const div = document.createElement("div"); // for each file, create a div display name and show cancel button
    div.classList.add("file-item");
    div.innerHTML = `<span>${file.name}</span> <button class="cancelBtn" data-index="${i}">Cancel</button>`;
    fileList.appendChild(div);
  }
}

// Handle cancel button click to remove a file from the DataTransfer
fileList.addEventListener("click", (e) => {
  if (e.target.classList.contains("cancelBtn")) { // checks if the clicked element is a cancel button
    const index = e.target.getAttribute("data-index"); // retrieved attribute, tell which file to remove
    dt.items.remove(index); // Removes the file at that index from the DataTransfer object
    updateFileList(); // update UI
  }
});


