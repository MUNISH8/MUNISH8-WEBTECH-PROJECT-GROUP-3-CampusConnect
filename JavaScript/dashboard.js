const searchBox = document.getElementById("searchBox");
const catFilter = document.getElementById("catFilter");
const notices   = document.querySelectorAll("#noticeList .notice");
const noResult  = document.getElementById("noResult");

function filterNotices() {
    const q   = searchBox.value.trim().toLowerCase();
    const cat = catFilter.value;
    let shown = 0;

    notices.forEach(n => {
        const matchText = n.textContent.toLowerCase().includes(q);
        const matchCat  = !cat || n.dataset.category === cat;
        const visible   = matchText && matchCat;
        n.hidden = !visible;
        if (visible) shown++;
    });

    noResult.hidden = shown > 0;
}

searchBox.addEventListener("input", filterNotices);
catFilter.addEventListener("change", filterNotices);
