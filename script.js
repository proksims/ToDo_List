const input = document.getElementById("input");
const list = document.getElementById("list");
const clear_container = document.querySelector(".clear_container");

// const clearButton = document.getElementById("clear_id");
const clear_dialog = document.getElementById("clear_dialog");
const clear_yes = document.getElementById("clear_yes");
const clear_no = document.getElementById("clear_no");

function save() {
  localStorage.setItem("data", list.innerHTML);
}

// загружаем задачи
function show_task() {
  list.innerHTML = localStorage.getItem("data");
}

// загружаем кнопку
function show_clear() {
  if (list.childElementCount !== 0) {
    create_clear_button();
  }
}

// добавим задачу
function addTask() {
  if (input.value === "") {
    alert("add text");
  } else {
    // добавляем строку в список
    let li = document.createElement("li");
    li.innerHTML = input.value;
    list.appendChild(li);
    // добавим иконку delete
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    // добавим кнопку clear, если её нет
    create_clear_button();
  }
  input.value = "";
  save();
}

// добавим, что кнопка нажимается по enter
document.getElementById("input").addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.key === "Enter") {
    document.getElementById("button").click();
  }
});

// зачеркиваем или удаляем задачи
list.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      save();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      //   если удаляем посленюю задачу, удаляем кнопку
      if (list.childElementCount === 0) {
        clear_container.removeChild(clear_container.children[0]);
      }
      save();
    }
  },
  false
);

// создаем кнопку clear
function create_clear_button() {
  let clear_button = document.getElementById("clear_id");
  if (!clear_button) {
    let clear_button = document.createElement("button");
    clear_button.id = "clear_id";
    clear_button.innerHTML = "clear all";
    clear_button.className = "button";

    // выводим окно сообщения, если click
    clear_button.addEventListener("click", show_dialog);
    clear_yes.addEventListener("click", clear_task);
    clear_no.addEventListener("click", close_dialog);

    clear_container.appendChild(clear_button);
  }
}

// открываем диалог окно
function show_dialog() {
  clear_dialog.style.display = "block";
}

// отчистка clear all
function clear_task() {
  const count = list.childElementCount;
  for (let i = 0; i < count; i++) {
    list.removeChild(list.children[0]);
  }
  //   и удалим кнопку отчистки
  clear_container.removeChild(clear_container.children[0]);
  close_dialog(); // закрываем диалог окно
  save();
}

// закрываем диалог окно
function close_dialog() {
  clear_dialog.style.display = "none";
}

show_task();
show_clear();
