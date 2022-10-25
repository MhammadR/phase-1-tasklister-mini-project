document.addEventListener("DOMContentLoaded", () => {
  const inputArr = [];
  const submit = document.querySelector("form input[type='submit']");
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    const task = event.target.parentNode.querySelector("#new-task-description");
    const duration = event.target.parentNode.querySelector("#duration");
    inputArr.push([task.value, 2, "high priority", "red", duration.value]);
    task.value = "";
    duration.value = "";
    appendListByPriority();
  });

  function appendListByPriority() {
    inputArr.sort();
    inputArr.sort((a, b) => {
      return b[1] - a[1];
    });
    const ul = document.querySelector("#tasks");
    ul.innerHTML = "";
    inputArr.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<input class="default-mode" type="text" value="${item[0]}" readonly/>
        <select name="prioritize" id="priority">
          <option value="high priority">High</option>
          <option value="medium priority">Medium</option>
          <option value="low priority">Low</option>
        </select>
        <input class="default-mode" type="time" value="${item[4]}" readonly/>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      `;
      const editButton = li.querySelector(".edit");
      editButton.addEventListener("click", editItem);
      const deleteButton = li.querySelector(".delete");
      deleteButton.addEventListener("click", deleteItem);
      const selectOption = li.querySelector("select");
      selectOption.value = item[2];
      li.querySelector("input").style.color = item[3];
      selectOption.addEventListener("change", orderByPriority);
      ul.append(li);
    });
  }

  function orderByPriority(event) {
    const ul = document.querySelector("#tasks");
    const li = event.target.parentNode;
    const selectedOption = event.target.value;
    const index = Array.prototype.indexOf.call(ul.children, li);
    let priorityCode, priority, color;

    if (selectedOption === "high priority") {
      priorityCode = 2;
      priority = "high priority";
      color = "red";
    } else if (selectedOption === "medium priority") {
      priorityCode = 1;
      priority = "medium priority";
      color = "yellow";
    } else {
      priorityCode = 0;
      priority = "low priority";
      color = "green";
    }
    inputArr[index][1] = priorityCode;
    inputArr[index][2] = priority;
    inputArr[index][3] = color;

    appendListByPriority();
  }

  function editItem(event) {
    const li = event.target.parentNode;
    const input = li.querySelectorAll("input");
    input.forEach((item) => {
      item.classList.toggle("default-mode");
      if (item.classList.contains("default-mode")) {
        item.readOnly = true;
      } else {
        item.readOnly = false;
      }
    });
  }

  function deleteItem(event) {
    const ul = document.querySelector("#tasks");
    const li = event.target.parentNode;
    const index = Array.prototype.indexOf.call(ul.children, li);
    li.remove();
    inputArr.splice(index, 1);
  }
});

function changeColor() {
  const color1 = document.getElementById("primary-color").value;
  const color2 = document.getElementById("secondary-color").value;
  const body = document.getElementsByTagName("body")[0];
  body.style.background = `linear-gradient(${color1}, ${color2})`;
}
