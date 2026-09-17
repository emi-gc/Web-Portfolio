
const scheduleForm = document.getElementById("schedule-form");
const scheduleTable = document.getElementById("schedule-table");
const scheduleMessage = document.getElementById("schedule-message");

function addToSchedule(event) {
    event.preventDefault();
    const date = scheduleForm.elements["date"].value;
    const start = scheduleForm.elements["start"].value;
    const end = scheduleForm.elements["end"].value;
    const activity = scheduleForm.elements["activity"].value;
    const place = scheduleForm.elements["place"].value;
    const notes = scheduleForm.elements["notes"].value;
    const flag = scheduleForm.elements["flag"].value;
    const busy = scheduleForm.elements["busy"].checked;

    const typeMenu = scheduleForm.elements["type"];
    const selectedOption = typeMenu.options[typeMenu.selectedIndex];
    const type = selectedOption.text;
    const row = scheduleTable.insertRow();

    const statusCell = row.insertCell();
    const dateCell = row.insertCell();
    const startCell = row.insertCell();
    const endCell = row.insertCell();
    const activityCell = row.insertCell();
    const placeCell = row.insertCell();
    const typeCell = row.insertCell();
    const notesCell = row.insertCell();

    const statusImage = document.createElement("img");

    if (busy) {
        statusImage.src = "images/busy.png";
        statusImage.alt = "Busy";
    } else {
        statusImage.src = "images/free.png";
        statusImage.alt = "Free";
    }

    statusImage.width = 20;
    statusCell.appendChild(statusImage);

    statusCell.style.borderLeftWidth = "6px";
    statusCell.style.borderLeftStyle = "solid";
    statusCell.style.borderLeftColor = flag;
    statusCell.title = "Flag: " + flag;

    dateCell.textContent = date;
    startCell.textContent = start;
    endCell.textContent = end;
    activityCell.textContent = activity;
    placeCell.textContent = place;
    typeCell.textContent = type;
    notesCell.textContent = notes;

    scheduleMessage.textContent = activity + " added to the schedule.";
    scheduleForm.reset();
}

scheduleForm.addEventListener("submit", addToSchedule);
