
const searchBox  = document.getElementById("searchBox");
const catFilter  = document.getElementById("catFilter");
const noticeList = document.getElementById("noticeList");
const noResult   = document.getElementById("noResult");
const statNotices = document.getElementById("statNotices");

const modal      = document.getElementById("modal");
const form       = document.getElementById("noticeForm");
const toastBox   = document.getElementById("toast");

function toast(msg) {
 toastBox.textContent = msg;
    toastBox.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => toastBox.classList.remove("show"), 2400);
}



function updateCount() {
    statNotices.textContent = noticeList.querySelectorAll(".notice").length;
}

function filterNotices() {
    const q   = searchBox.value.trim().toLowerCase();
    const cat = catFilter.value;
    let shown = 0;

    noticeList.querySelectorAll(".notice").forEach(n => {
        const okText = n.textContent.toLowerCase().includes(q);
        const okCat  = !cat || n.dataset.category === cat;
        n.hidden = !(okText && okCat);
        if (!n.hidden) shown++;
    });

    noResult.hidden = shown > 0;
}

searchBox.addEventListener("input", filterNotices);
catFilter.addEventListener("change", filterNotices);

noticeList.addEventListener("click", e => {
    const btn = e.target.closest(".del");
    if (!btn) return;
    if (!confirm("Delete this record? This cannot be undone.")) return;

    btn.closest(".notice").remove();
    updateCount();
    filterNotices();
    toast("Record deleted");
});

function openModal() {
    form.reset();
    form.querySelectorAll(".err").forEach(d => d.textContent = "");
    form.querySelectorAll(".fg").forEach(g => g.classList.remove("bad"));
    modal.hidden = false;
    document.getElementById("nTitle").focus();
}

function closeModal() { modal.hidden = true; }

document.getElementById("openCreate").addEventListener("click", openModal);
document.getElementById("cancelCreate").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

form.addEventListener("submit", e => {
    e.preventDefault();

    const fields = [
        ["nTitle",   "Title"],
        ["nCat",     "Category"],
        ["nSummary", "Summary"]
    ];

    let ok = true;
    fields.forEach(([id, label]) => {
        const el = document.getElementById(id);
        const group = el.closest(".fg");
        const empty = el.value.trim() === "";
        group.classList.toggle("bad", empty);
        group.querySelector(".err").textContent = empty ? label + " is required" : "";
        if (empty) ok = false;
    });
    if (!ok) return;

    const title    = document.getElementById("nTitle").value.trim();
    const category = document.getElementById("nCat").value;
    const summary  = document.getElementById("nSummary").value.trim();
    const today    = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const card = document.createElement("article");
    card.className = "card pad notice";
    card.dataset.category = category;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = category;

    const h3 = document.createElement("h3");
    h3.textContent = title;

    const meta = document.createElement("p");
    meta.className = "mt";
    meta.textContent = "Administration \u00B7 " + today;

    const body = document.createElement("p");
    body.className = "body";
    body.textContent = summary;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "btn del";
    del.textContent = "Delete";

    card.append(badge, h3, meta, body, del);
    noticeList.prepend(card);

    updateCount();
    filterNotices();
    closeModal();
    toast("Notice published");
});
