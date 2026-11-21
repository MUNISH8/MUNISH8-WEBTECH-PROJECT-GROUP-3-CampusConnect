
// ---------- STEP 1: READ SHARED STORAGE ----------

let defaultMaterials = [
    { id: 1, title: "Introduction to Algorithms", code: "CSE 2211", dept: "CSE", sem: "3", type: "pdf",  date: "Oct 1, 2026",  fileName: "", fileData: "" },
    { id: 2, title: "Digital Logic Slides",        code: "CSE 1201", dept: "CSE", sem: "2", type: "pptx", date: "Oct 5, 2026",  fileName: "", fileData: "" },
    { id: 3, title: "Circuit Analysis Notes",      code: "EEE 1101", dept: "EEE", sem: "1", type: "docx", date: "Oct 10, 2026", fileName: "", fileData: "" },
    { id: 4, title: "Marketing Management Past Questions", code: "BBA 2105", dept: "BBA", sem: "4", type: "pdf", date: "Oct 12, 2026", fileName: "", fileData: "" }
];

function getMaterials()
{
    let data = localStorage.getItem("materials");

    if (data == null)
    {
        localStorage.setItem("materials", JSON.stringify(defaultMaterials));
        return defaultMaterials;
    }

    return JSON.parse(data);
}

function escapeHtml(text)
{
    let div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}


// ---------- STEP 2: SHOW MATERIALS ----------

function showMaterials()
{
    let list = getMaterials();

    let grid = document.getElementById("materialGrid");

    grid.innerHTML = "";

    for (let i = 0; i < list.length; i++)
    {
        let m = list[i];

        let card = document.createElement("div");

        card.className = "material-card";
        card.setAttribute("data-dept", m.dept);
        card.setAttribute("data-sem", m.sem);
        card.setAttribute("data-type", m.type);

        card.innerHTML =
            '<span class="badge ' + m.type + '">' + m.type.toUpperCase() + '</span>' +

            '<h3>' + escapeHtml(m.title) + '</h3>' +

            '<p class="code">' + escapeHtml(m.code) + '</p>' +

            '<p class="details">' + m.dept + ' | Semester ' + m.sem +
            ' | Uploaded ' + m.date + '</p>' +

            '<button class="download-btn" data-id="' + m.id + '">Download</button>';

        grid.appendChild(card);
    }

    filterMaterials();
}


// ---------- STEP 3: DOWNLOAD ----------

document.getElementById("materialGrid").addEventListener("click", function(event)
{
    if (event.target.className == "download-btn")
    {
        let id = Number(event.target.getAttribute("data-id"));

        let list = getMaterials();

        for (let i = 0; i < list.length; i++)
        {
            if (list[i].id == id)
            {
                if (list[i].fileData == "")
                {
                    alert("No file has been attached to this material yet.");
                    return;
                }

                let link = document.createElement("a");

                link.href = list[i].fileData;
                link.download = list[i].fileName;

                document.body.appendChild(link);
                link.click();
                link.remove();

                return;
            }
        }
    }
});


// ---------- STEP 4: SEARCH AND FILTER ----------

function filterMaterials()
{
    let search = document.getElementById("searchBox").value.toLowerCase();

    let dept = document.getElementById("deptFilter").value;

    let sem = document.getElementById("semFilter").value;

    let type = document.getElementById("typeFilter").value;

    let cards = document.getElementsByClassName("material-card");

    let count = 0;

    for (let i = 0; i < cards.length; i++)
    {
        let title = cards[i].getElementsByTagName("h3")[0].innerHTML.toLowerCase();

        let code = cards[i].getElementsByClassName("code")[0].innerHTML.toLowerCase();

        let cardDept = cards[i].getAttribute("data-dept");
        let cardSem = cards[i].getAttribute("data-sem");
        let cardType = cards[i].getAttribute("data-type");

        if ((title.includes(search) || code.includes(search)) &&
            (dept == "" || dept == cardDept) &&
            (sem == "" || sem == cardSem) &&
            (type == "" || type == cardType))
        {
            cards[i].style.display = "block";
            count++;
        }
        else
        {
            cards[i].style.display = "none";
        }
    }

    document.getElementById("noResult").hidden = (count != 0);
}

document.getElementById("searchBox").addEventListener("input", filterMaterials);
document.getElementById("deptFilter").addEventListener("change", filterMaterials);
document.getElementById("semFilter").addEventListener("change", filterMaterials);
document.getElementById("typeFilter").addEventListener("change", filterMaterials);


// ---------- START ----------

showMaterials();