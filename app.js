const check = document.querySelectorAll('.checked');
const c = document.querySelectorAll('.userData');
const w = document.querySelector('.warning');
const submit = document.querySelector('#submit');
const resett = document.querySelector('#reset');
const container = document.querySelector('.mainContent');
submit.setAttribute('disabled', '');

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
  running();
}

function running() {
  const check = document.querySelectorAll('.checked');
  const c = document.querySelectorAll('.userData');
  const w = document.querySelector('.warning');
  const submit = document.querySelector('#submit');
  const resett = document.querySelector('#reset');
  const container = document.querySelector('.mainContent');
  submit.setAttribute('disabled', '');

  check.forEach((element) => {
    element.addEventListener('click', () => {
      const r = [...c].every((e) => {
        return e.value;
      });
      if (r) {
        element.parentElement.classList.add('completed');
        element.nextElementSibling.setAttribute('disabled', '');
      } else {
        w.classList.add('block');
      }
      const btnEbl = [...check].every((ele) =>
        ele.parentElement.classList.contains('completed')
      );

      if (btnEbl) {
        submit.removeAttribute('disabled');
      }
    });
  });
  c.forEach((focus) => {
    focus.addEventListener('focus', () => {
      w.classList.remove('block');
    });
  });
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
    document.querySelector('#reset').addEventListener('click', reset);
  });
}

running();
