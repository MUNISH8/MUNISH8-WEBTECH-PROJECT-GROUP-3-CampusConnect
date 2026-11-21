
document.getElementById("registerForm").addEventListener("submit", function(event)
{
    event.preventDefault();

    // Step 1: Get input values

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim().toLowerCase();
    let studentId = document.getElementById("studentId").value.trim();
    let department = document.getElementById("department").value;
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    let message = document.getElementById("message");

    message.className = "error";
    message.innerHTML = "";


    // Remove old red borders

    let fields = document.querySelectorAll("#registerForm input, #registerForm select");

    for (let i = 0; i < fields.length; i++)
    {
        fields[i].classList.remove("invalid");
    }


    // Step 2: Validation (shows the first problem found)

    let errorField = null;
    let errorText = "";

    if (name == "")
    {
        errorText = "Full name is required";
        errorField = "name";
    }

    else if (email == "")
    {
        errorText = "Email is required";
        errorField = "email";
    }

    else if (!email.endsWith("@university.edu"))
    {
        errorText = "Enter a valid university email";
        errorField = "email";
    }

    else if (studentId == "")
    {
        errorText = "Student ID is required";
        errorField = "studentId";
    }

    else if (isNaN(studentId) || studentId.length < 5)
    {
        errorText = "Student ID must be numbers only (at least 5 digits)";
        errorField = "studentId";
    }

    else if (department == "")
    {
        errorText = "Please select a department";
        errorField = "department";
    }

    else if (password == "")
    {
        errorText = "Password is required";
        errorField = "password";
    }

    else if (password.length < 8)
    {
        errorText = "Password must be at least 8 characters";
        errorField = "password";
    }

    else if (confirmPassword == "")
    {
        errorText = "Please confirm your password";
        errorField = "confirmPassword";
    }

    else if (password != confirmPassword)
    {
        errorText = "Passwords do not match";
        errorField = "confirmPassword";
    }

    if (errorField != null)
    {
        message.innerHTML = errorText;
        document.getElementById(errorField).classList.add("invalid");
        document.getElementById(errorField).focus();
        return;
    }

       // Step 3: Check user type from email (same logic as login page)
    let accountType;

    if (email.includes("admin@university.edu"))
    {
        accountType = "admin";
    }

    else
    {
        accountType = "student";
    }


    // Step 4: Registration successful

    message.className = "success";
    message.innerHTML = "Account created as " + accountType + "! Redirecting to login...";

    this.reset();


    // Step 5: Go to login page

    setTimeout(function()
    {
        window.location.href = "login.html";
    }, 1500);

});