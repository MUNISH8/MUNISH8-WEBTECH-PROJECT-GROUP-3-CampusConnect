
let notices = [];

function loadNotices() {
    let saved = localStorage.getItem("campusNotices");

    if (saved !== null) {
        notices = JSON.parse(saved);
    }

    showNotices();
}

function safeText(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function showNotices() {
    let search = document.getElementById("searchBox").value.toLowerCase();
    let category = document.getElementById("filterBox").value;
    let list = document.getElementById("noticeList");

    // Keep the original HTML cards.
    // Hide deleted sample notices.
    let sampleCards = list.getElementsByClassName("event-card");
    let sampleTitles = [
        "Midterm Examination Schedule",
        "Campus Cultural Program",
        "Library Opening Hours"
    ];

    for (let i = 0; i < 3 && i < sampleCards.length; i++) {
        sampleCards[i].style.display = "none";
    }

    // Remove previously displayed admin notices.
    let added = document.getElementById("adminNotices");

    if (added !== null) {
        added.remove();
    }

    let output = "";
    let found = false;

    for (let i = 0; i < notices.length; i++) {
        let notice = notices[i];

        let title = notice.title.toLowerCase();
        let message = notice.message.toLowerCase();

        if ((title.includes(search) || message.includes(search)) &&
            (category === "" || category === notice.category)) {

            found = true;

            let sampleIndex = sampleTitles.indexOf(notice.title);

            // Show matching original HTML sample card.
            if (sampleIndex !== -1 &&
                sampleIndex < sampleCards.length &&
                notice.message === sampleMessage(sampleIndex)) {

                sampleCards[sampleIndex].style.display = "block";

            } else {
                // Show newly posted admin notice.
                output += "<div class='event-card'>";

                if (notice.important) {
                    output += "<span class='badge important'>Important</span>";
                } else {
                    output += "<span class='badge new'>New</span>";
                }

                output += "<h3>" + safeText(notice.title) + "</h3>";
                output += "<p class='club'>" + safeText(notice.category) + "</p>";
                output += "<p class='details'>" + safeText(notice.date) + "</p>";
                output += "<p class='desc'>" + safeText(notice.message) + "</p>";
                output += "</div>";
            }
        }
    }

    list.innerHTML += "<div id='adminNotices' style='display:contents'>" + output + "</div>";

    document.getElementById("noResult").hidden = found;
}

function sampleMessage(index) {
    if (index === 0) {
        return "The midterm examination schedule has been published. Students are requested to check their exam dates.";
    }

    if (index === 1) {
        return "A cultural program will be held on campus. All students are welcome to attend.";
    }

    return "The university library has updated its opening hours. Students are requested to follow the new schedule.";
}

loadNotices();
