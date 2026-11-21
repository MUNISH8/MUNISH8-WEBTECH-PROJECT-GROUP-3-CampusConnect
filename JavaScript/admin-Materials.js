
// ---------- STEP 1: SHARED STORAGE ----------

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

function saveMaterials(list)
{
    try
    {
        localStorage.setItem("materials", JSON.stringify(list));
        return true;
    }
    catch (error)
    {
        alert("Storage is full. Try a smaller file.");
        return false;
    }
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

        let fileInfo = "";

        if (m.fileName != "")
        {
            fileInfo = ' | ' + escapeHtml(m.fileName);
        }

        card.innerHTML =
            '<span class="badge ' + m.type + '">' + m.type.toUpperCase() + '</span>' +

            '<h3>' + escapeHtml(m.title) + '</h3>' +

            '<p class="code">' + escapeHtml(m.code) + '</p>' +

            '<p class="details">' + m.dept + ' | Semester ' + m.sem +
            ' | Uploaded ' + m.date + fileInfo + '</p>' +

            '<button class="delete-btn" data-id="' + m.id + '">Delete</button>';

        grid.appendChild(card);
    }

    filterMaterials();
}


// ---------- STEP 3: SHOW AND HIDE UPLOAD FORM ----------

document.getElementById("createBtn").addEventListener("click", function()
{
    document.getElementById("materialForm").hidden = false;
});

document.getElementById("cancelBtn").addEventListener("click", function()
{
    document.getElementById("materialForm").hidden = true;
});


// ---------- STEP 4: UPLOAD NEW MATERIAL ----------

function addMaterial(title, code, dept, sem, type, fileName, fileData)
{
    let list = getMaterials();

    let today = new Date().toLocaleDateString("en-US",
    {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    list.push({
        id: Date.now(),
        title: title,
        code: code,
        dept: dept,
        sem: sem,
        type: type,
        date: today,
        fileName: fileName,
        fileData: fileData
    });

    if (saveMaterials(list) == false)
    {
        return;
    }

    document.getElementById("materialForm").reset();
    document.getElementById("materialForm").hidden = true;

    alert("Material uploaded successfully");

    showMaterials();
}


document.getElementById("materialForm").addEventListener("submit", function(event)
{
    event.preventDefault();

    let title = document.getElementById("title").value.trim();
    let code = document.getElementById("code").value.trim();
    let dept = document.getElementById("dept").value;
    let sem = document.getElementById("sem").value;
    let type = document.getElementById("type").value;
    let file = document.getElementById("file").files[0];

    if (title == "" || code == "")
    {
        alert("Please fill in all fields");
        return;
    }

    // No file chosen: save details only

    if (file == undefined)
    {
        addMaterial(title, code, dept, sem, type, "", "");
        return;
    }

    // File chosen: limit size (browser storage is small)

    if (file.size > 2 * 1024 * 1024)
    {
        alert("File is too large. Please choose a file under 2 MB.");
        return;
    }

    let reader = new FileReader();

    reader.onload = function()
    {
        addMaterial(title, code, dept, sem, type, file.name, reader.result);
    };

    reader.readAsDataURL(file);
});


// ---------- STEP 5: DELETE MATERIAL ----------

document.getElementById("materialGrid").addEventListener("click", function(event)
{
    if (event.target.className == "delete-btn")
    {
        let id = Number(event.target.getAttribute("data-id"));

        let list = getMaterials();

        let newList = [];

        for (let i = 0; i < list.length; i++)
        {
            if (list[i].id != id)
            {
                newList.push(list[i]);
            }
        }

        saveMaterials(newList);

        showMaterials();
    }
});


// ---------- STEP 6: SEARCH AND FILTER ----------

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