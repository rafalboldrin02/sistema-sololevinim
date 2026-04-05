let data = JSON.parse(localStorage.getItem("system")) || {
  name: "",
  xp: 0,
  level: 1,
  xpMax: 100,
  bonus: 1,
  missions: [],
  tasks: []
};

function save() {
  localStorage.setItem("system", JSON.stringify(data));
}

function updateUI() {
  document.getElementById("playerName").value = data.name;
  document.getElementById("level").innerText = data.level;
  document.getElementById("xp").innerText = data.xp;
  document.getElementById("xpMax").innerText = data.xpMax;

  let percent = (data.xp / data.xpMax) * 100;
  document.getElementById("xpFill").style.width = percent + "%";

  renderMissions();
  renderTasks();
}

document.getElementById("playerName").addEventListener("input", (e) => {
  data.name = e.target.value;
  save();
});

function gainXP(amount) {
  amount = Math.floor(amount * data.bonus);
  data.xp += amount;

  if (data.xp >= data.xpMax) {
    data.xp -= data.xpMax;
    data.level++;
    data.xpMax = Math.floor(data.xpMax * 1.2);
  }

  save();
  updateUI();
}

function addMission() {
  let text = document.getElementById("missionText").value;
  let xp = parseInt(document.getElementById("missionXP").value);

  data.missions.push({ text, xp });
  save();
  updateUI();
}

function renderMissions() {
  let list = document.getElementById("missionList");
  list.innerHTML = "";

  data.missions.forEach((m, i) => {
    let li = document.createElement("li");
    li.innerHTML = `${m.text} (+${m.xp} XP)
      <button onclick="completeMission(${i})">✔</button>`;
    list.appendChild(li);
  });
}

function completeMission(i) {
  gainXP(data.missions[i].xp);
  data.missions.splice(i, 1);
  save();
  updateUI();
}

function addTask() {
  let text = document.getElementById("taskText").value;
  data.tasks.push(text);
  save();
  updateUI();
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  data.tasks.forEach((t, i) => {
    let li = document.createElement("li");
    li.innerHTML = `${t}
      <button onclick="completeTask(${i})">✔</button>`;
    list.appendChild(li);
  });
}

function completeTask(i) {
  gainXP(20);
  data.tasks.splice(i, 1);
  save();
  updateUI();
}

function buyUpgrade() {
  if (data.xp >= 100) {
    data.xp -= 100;
    data.bonus += 0.1;
    save();
    updateUI();
  } else {
    alert("XP insuficiente");
  }
}

function showTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(tab).classList.remove("hidden");
}

updateUI();
