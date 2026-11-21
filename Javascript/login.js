
document.getElementById("loginForm").addEventListener("submit", function(event)
{
    event.preventDefault();

    // Step 1: Get input values

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let message = document.getElementById("message");

    message.innerHTML = "";


    // Step 2: Validation

    let valid = true;

    if (email == "")
    {
        message.innerHTML = "Email is required";
        valid = false;
    }

    else if (!email.endsWith("@university.edu"))
    {
        message.innerHTML = "Enter a valid university email";
        valid = false;
    }

    if (password == "")
    {
        message.innerHTML = "Password is required";
        valid = false;
    }

    if (valid == false)
    {
        return;
    }


    // Step 3: Check user type

    if (email.startsWith("admin"))
    {
        window.location.href = "admin.html";
    }

    else
    {
        window.location.href = "dashboard.html";
    }

});
