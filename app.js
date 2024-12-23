const check = document.querySelectorAll('.checked');
const userData = document.querySelectorAll('.userData');
const error = document.querySelector('.warning');
const progressBar = document.querySelector('#progressupdate');
const container = document.querySelector('.mainContent');
const submit = document.querySelector('#submit');
let date = document.querySelector('#todayDate');
let time = document.querySelector('#currentTime');

function dateAndTime() {
  let todayDate = new Date();
  date.innerText = todayDate.toLocaleDateString();
  setInterval(() => {
    let todayDate = new Date();
    time.innerText = todayDate.toLocaleTimeString();
  }, 10);
}
dateAndTime();
submit.setAttribute('disabled', '');

const userInputData = JSON.parse(localStorage.getItem('task')) || {};
let width = Object.values(userInputData).filter((e) => e.isCompleted).length;
progressBar.style.width = `${(width / 3) * 100}%`;

check.forEach((checkBtn) => {
  checkBtn.addEventListener('click', () => {
    const userDataValue = [...userData].every((input) => {
      return input.value.trim();
    });
    if (userDataValue) {
      checkBtn.parentElement.classList.add('completed');
      checkBtn.nextElementSibling.setAttribute('disabled', '');
      const nextElementId = checkBtn.nextElementSibling.id;
      userInputData[nextElementId].isCompleted =
        !userInputData[nextElementId].isCompleted;
      let width = Object.values(userInputData).filter(
        (e) => e.isCompleted
      ).length;
      progressBar.style.width = `${(width / 3) * 100}%`;
      localStorage.setItem('task', JSON.stringify(userInputData));
    } else {
      error.classList.add('block');
    }
    const btnEbl = [...check].every((ele) =>
      ele.parentElement.classList.contains('completed')
    );
    if (btnEbl) {
      submit.removeAttribute('disabled');
    }
  });
});

userData.forEach((userDataInput) => {
  userDataInput.value = userInputData[userDataInput.id]?.task || '';
  if (userInputData[userDataInput.id]?.isCompleted) {
    userDataInput.parentElement.classList.add('completed');
  }
  userDataInput.addEventListener('focus', () => {
    error.classList.remove('block');
  });
  userDataInput.addEventListener('input', () => {
    userInputData[userDataInput.id] = {
      task: userDataInput.value,
      isCompleted: false,
    };
    localStorage.setItem('task', JSON.stringify(userInputData));
  });
});
const btnEbl = [...check].every((ele) =>
  ele.parentElement.classList.contains('completed')
);
if (btnEbl) {
  submit.removeAttribute('disabled');
}

function reset() {
  container.classList.remove('center');
  container.innerHTML = `           <h2 id="today">Today</h2>
          <p id="quotes">Raise the bar by completing your goals!</p>
          <div id="progress">
            <div id="progressbar">
              <div id="progressupdate"></div>
            </div>
            <p class="warning">Please select all goals to continue</p>
          </div>
          <form action="" method="get">
            <div class="goals">
              <div class="checked"></div>
              <input type="text" placeholder="Add new goal" class="userData" />
            </div>
            <div class="goals">
              <div class="checked"></div>
              <input type="text" placeholder="Add new goal" class="userData" />
            </div>
            <div class="goals">
              <div class="checked"></div>
              <input type="text" placeholder="Add new goal" class="userData" />
            </div>
          </form>
          <div id="btn">
            <button type="submit" id="submit">Submit</button>
          </div>`;
  location.reload();
}
submit.addEventListener('click', (e) => {
  e.stopPropagation();
  container.classList.add('center');
  container.innerHTML = ` <div class="celebrate">
            <h2 id="celebTitle">
              You Completed Your Task <span id="cTS"> Hurray!</span>
            </h2>
            <div class="button">
              <h3>Set your task again -</h3>
              <button id="reset">Taskly</button>
            </div>
          </div>`;
  localStorage.removeItem('task');
  document.querySelector('#reset').addEventListener('click', reset);
});
