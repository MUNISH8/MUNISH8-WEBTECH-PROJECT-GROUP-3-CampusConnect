
let notices = [];

function loadNotices() {
    let saved = localStorage.getItem("campusNotices");

    if (saved === null) {
        notices = [
            {
                title: "Midterm Examination Schedule",
                category: "Exam",
                message: "The midterm examination schedule has been published. Students are requested to check their exam dates.",
                date: "November 15, 2026",
                important: true
            },
            {
                title: "Campus Cultural Program",
                category: "Event",
                message: "A cultural program will be held on campus. All students are welcome to attend.",
                date: "November 18, 2026",
                important: false
            },
            {
                title: "Library Opening Hours",
                category: "General",
                message: "The university library has updated its opening hours. Students are requested to follow the new schedule.",
                date: "November 20, 2026",
                important: false
            }
        ];

        saveNotices();
    } else {
        notices = JSON.parse(saved);
    }
}

function saveNotices() {
    localStorage.setItem("campusNotices", JSON.stringify(notices));
}

function postNotice() {
    let title = document.getElementById("noticeTitle").value.trim();
    let category = document.getElementById("noticeCategory").value;
    let message = document.getElementById("noticeMessage").value.trim();
    let important = document.getElementById("noticeImportant").checked;

    if (title === "" || category === "" || message === "") {
        alert("Please fill in all fields.");
        return false;
    }

    let today = new Date();

    let notice = {
        title: title,
        category: category,
        message: message,
        date: today.toLocaleDateString("en-US"),
        important: important
    };

    notices.push(notice);
    saveNotices();
    showAdminNotices();

    document.querySelector("form").reset();
    alert("Notice posted successfully!");

    return false;
}

function deleteNotice(index) {
    if (confirm("Delete this notice?")) {
        notices.splice(index, 1);
        saveNotices();
        showAdminNotices();
    }
}

function showAdminNotices() {
    let table = document.getElementById("noticeTable");
    let output = "";

    for (let i = 0; i < notices.length; i++) {
        output += "<tr>";
        output += "<td>" + safeText(notices[i].title) + "</td>";
        output += "<td>" + safeText(notices[i].category) + "</td>";
        output += "<td>" + safeText(notices[i].date) + "</td>";
        output += "<td>" + (notices[i].important ? "Yes" : "No") + "</td>";
        output += "<td><button class='delete-btn' onclick='deleteNotice(" + i + ")'>Delete</button></td>";
        output += "</tr>";
    }

    table.innerHTML = output;
    document.getElementById("totalNotices").innerText = notices.length;
}

function safeText(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

loadNotices();
showAdminNotices();
