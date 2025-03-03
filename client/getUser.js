const fetchUsers = async () => {
    const tableBody = document.getElementById("userTableBody");
    try {
        const response = await fetch("http://localhost:3000/getallusers"); // Fetch all users from API
        const users = await response.json();

        tableBody.innerHTML = ""; // Clear table before updating

        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.name || user.Name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="update" onclick="updateUser('${user.id}')">Update</button>
                        <button class="delete" onclick="deleteUser('${user.id}')">Delete</button>
                    </td>
                </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        tableBody.innerHTML = `<tr><td colspan="3" class="center">Failed to fetch users.</td></tr>`;
        console.error("Error fetching users:", error);
    }
};

// Function to delete a user
const deleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
        const response = await fetch(`http://localhost:3000/deleteuser/${userId}`, {
            method: "POST" // Using POST because your backend expects a POST request
        });

        if (response.ok) {
            alert("User deleted successfully!");
            fetchUsers(); // Refresh the user list
        } else {
            alert("Failed to delete user.");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

// Function to update a user
const updateUser = async (userId) => {
    const newName = prompt("Enter new name:");
    const newEmail = prompt("Enter new email:");

    if (!newName || !newEmail) {
        alert("Name and email cannot be empty!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/updateuser/${userId}`, {
            method: "POST", // Your backend uses POST for updating users
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: newName, email: newEmail }) // Send updated data
        });

        if (response.ok) {
            alert("User updated successfully!");
            fetchUsers(); // Refresh the user list
        } else {
            alert("Failed to update user.");
        }
    } catch (error) {
        console.error("Error updating user:", error);
    }
};

// Fetch users when the page loads
document.addEventListener("DOMContentLoaded", fetchUsers);
