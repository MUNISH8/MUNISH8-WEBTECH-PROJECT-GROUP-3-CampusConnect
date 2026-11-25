
// Step 1: Show and Hide Create Event Form

document.getElementById("createBtn").addEventListener("click", function()
{
    document.getElementById("eventForm").hidden = false; //create event e click korle, form ta ar hidden thakbena
});


document.getElementById("cancelBtn").addEventListener("click", function()
{
    document.getElementById("eventForm").hidden = true; //cancle button e click korle form ta hidden hoye jabe
});


// Step 2: Create New Event

document.getElementById("eventForm").addEventListener("submit", function(event)
{
    event.preventDefault();

    // Get input values

    let name = document.getElementById("eventName").value.trim();
    let club = document.getElementById("club").value.trim();
    let date = document.getElementById("eventDate").value;
    let location = document.getElementById("location").value.trim();
    let deadline = document.getElementById("deadline").value;
    let description = document.getElementById("description").value.trim();
    let status = document.getElementById("status").value;


    // Check input values

    if (name == "" || club == "" || date == "" ||
        location == "" || deadline == "" || description == "")
    {
        alert("Please fill in all fields");
        return;
    }


    // Create new event card

    let card = document.createElement("div");

    card.className = "event-card";
    card.setAttribute("data-status", status); //card er attribute ta status theke nicche

    let badgeClass = status.toLowerCase(); //admin jei status dibe, shei status tai hobe badgeclass er bhitorer value

    card.innerHTML =
        '<span class="badge ' + badgeClass + '">' +
        'Registration ' + status +
        '</span>' +

        '<h3>' + name + '</h3>' +

        '<p class="club">' + club + '</p>' +

        '<p class="details">' + date + ' | ' + location + '</p>' +

        '<p class="desc">' + description + '</p>' +

        '<p class="registered-count">' +
        '0 registered | Deadline ' + deadline +
        '</p>' +

        '<button class="delete-btn">Delete</button>';


    document.getElementById("eventGrid").appendChild(card);


    // Add Delete functionality to new card

    card.getElementsByClassName("delete-btn")[0].addEventListener("click", function()
    {
        card.remove();
        filterEvents();
    });


    // Reset form

    this.reset();

    this.hidden = true;

    alert("Event created successfully");


    filterEvents();

});


// Step 3: Delete Existing Events

let deleteButtons = document.getElementsByClassName("delete-btn"); //jehetu shob gula delete button e same event lagbe 

for (let i = 0; i < deleteButtons.length; i++)
{
    deleteButtons[i].addEventListener("click", function()  //selecting all the delete button; karon each existing event er delete button e click korle same event occur hobe.
    {
        let card = this.parentElement; // delete button ta jei event-card er child take card e rakhtesi;

        card.remove();

        filterEvents();
    });
}


// Step 4: Search and Filter Events

function filterEvents()
{
    let search = document.getElementById("searchBox").value.toLowerCase();

    let filter = document.getElementById("filterBox").value;

    let cards = document.getElementsByClassName("event-card");

    let count = 0;


    for (let i = 0; i < cards.length; i++)
    {
        let title = cards[i].getElementsByTagName("h3")[0].innerHTML.toLowerCase();

        let club = cards[i].getElementsByClassName("club")[0].innerHTML.toLowerCase();

        let status = cards[i].getAttribute("data-status");


        if ((title.includes(search) || club.includes(search)) &&
            (filter == "" || filter == status))
        {
            cards[i].style.display = "block";
            count++;
        }

        else
        {
            cards[i].style.display = "none";
        }
    }


    if (count == 0)
    {
        document.getElementById("noResult").hidden = false;
    }

    else
    {
        document.getElementById("noResult").hidden = true;
    }
}


// Search Event

document.getElementById("searchBox").addEventListener("input", filterEvents);


// Filter Event

document.getElementById("filterBox").addEventListener("change", filterEvents);
