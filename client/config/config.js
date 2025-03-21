const UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL;
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;





// Handle upload button click to send files to the backend
uploadBtn.addEventListener("click", async () => {
    if (dt.files.length === 0) {
      status.innerText = "No files selected!";
      return;
    }
    let formData = new FormData();
    for (let file of dt.files) {
      formData.append("files", file);
    }
    try {
        let response = await fetch(UPLOAD_URL, {
            method: "POST",
            body: formData
          });
      let result = await response.json();
      status.innerText = result.message;
      // Clear file list on successful upload
      dt = new DataTransfer();
      updateFileList();
    } catch (err) {
      status.innerText = "Upload failed!";
    }
  });

// Handle Login button click to sent name to backend
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Use REGISTER_URL from the .env file
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login Successful!");
            window.location.href = './client/main.html'; // Adjust path as needed
        } else {
            alert("Login Failed: " + data);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Login error: ' + error.message);
    }
});
