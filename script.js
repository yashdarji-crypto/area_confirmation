const select = document.getElementById("memberSelect");
const input = document.getElementById("areaInput");
const msg = document.getElementById("message");

// Load data
let data = JSON.parse(localStorage.getItem("flatData")) || membersData;

// Populate dropdown
data.forEach(item => {
    const option = document.createElement("option");
    option.value = item.member;
    option.textContent = item.member;
    select.appendChild(option);
});

function saveArea() {
    const member = select.value;
    const area = input.value;

    if (!area) {
        msg.textContent = "❌ Please enter flat area";
        msg.style.color = "red";
        return;
    }

    const index = data.findIndex(d => d.member === member);

    if (data[index].area) {
        msg.textContent = "⚠️ Area already exists (overwrite allowed)";
        msg.style.color = "orange";
    }

    data[index].area = area;
    localStorage.setItem("flatData", JSON.stringify(data));

    msg.textContent = "✅ Flat area saved successfully";
    msg.style.color = "green";
    input.value = "";
}
