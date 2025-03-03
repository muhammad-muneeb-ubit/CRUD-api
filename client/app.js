document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signupForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const messageBox = document.getElementById("message");

        // Simple form validation
        if (!name || !email || !password) {
            messageBox.textContent = "All fields are required!";
            messageBox.classList.add("error");
            return;
        }

        const user = { name, email, password };

        try {
            const response = await fetch("http://localhost:3000/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();
            if (response.ok) {
                messageBox.textContent = "User created successfully!";
                messageBox.classList.remove("error");
                messageBox.classList.add("message");

                // Clear input fields
                document.getElementById("signupForm").reset();
            } else {
                messageBox.textContent = data.message || "Error creating user.";
                messageBox.classList.add("error");
            }
        } catch (error) {
            console.error("Error:", error);
            messageBox.textContent = "Failed to connect to server.";
            messageBox.classList.add("error");
        }
    });
});
