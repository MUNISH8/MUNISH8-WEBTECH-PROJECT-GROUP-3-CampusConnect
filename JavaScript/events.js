
// Step 1: Search Events

document.getElementById("searchBox").addEventListener("input", function()
{
    let search = this.value.toLowerCase();

    let cards = document.getElementsByClassName("event-card");

    let count = 0;

    for (let i = 0; i < cards.length; i++)
    {
        let title = cards[i].getElementsByTagName("h3")[0].innerHTML.toLowerCase();

        let club = cards[i].getElementsByClassName("club")[0].innerHTML.toLowerCase();

        if (title.includes(search) || club.includes(search))
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
        document.getElementById("noResult").hidden = false;//count 0 thakle no rrsult ta hidden thakbena
    }
    else
    {
        document.getElementById("noResult").hidden = true;
    }
});


// Step 2: Filter Events

document.getElementById("filterBox").addEventListener("change", function()
{
    let filter = this.value;

    let cards = document.getElementsByClassName("event-card");

    let count = 0;

    for (let i = 0; i < cards.length; i++)
    {
        let status = cards[i].getAttribute("data-status");

        if (filter == "" || filter == status)
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
});


// Step 3: Register and Cancel Registration

let buttons = document.getElementsByClassName("register-btn");   // event er shob button e jehetu same kaj tai, shob gulo button nilam

for (let i = 0; i < buttons.length; i++)
{
    buttons[i].addEventListener("click", function()
    {
        let card = this.parentElement;//whole event-card tai holo parent, jekhane click kortesi she jei eventcard er ongsho 

        let badge = card.getElementsByClassName("badge")[0];

        let status = card.getAttribute("data-status");

        if (status == "Open")
        {
            card.setAttribute("data-status", "Registered"); //jodi open thake , dtata status registerd hoye jabe, bage hoye registerd and button e show hobe cancel registration.

            badge.innerHTML = "Registered";
            badge.className = "badge registered";  // s

            this.innerHTML = "Cancel Registration";
            this.className = "register-btn cancel";
        }

        else if (status == "Registered")
        {
            card.setAttribute("data-status", "Open");  //jodi  status Registered thake, student button e click korar por then data staus hoye jabe= Open, shekhetere button e show korbe Register ar badge e show korbe  Register Open 

            badge.innerHTML = "Registration Open";
            badge.className = "badge open";

            this.innerHTML = "Register Now";
            this.className = "register-btn";
        }
    });
}
