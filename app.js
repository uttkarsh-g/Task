const check = document.querySelectorAll('.checked');
const userData = document.querySelectorAll('.userData');
const error = document.querySelector('.warning');
const progressBar = document.querySelector('#progressupdate');
const reset = document.querySelector('#reset');
const userInputData = JSON.parse(localStorage.getItem('task')) || {};
let width = Object.values(userInputData).filter((e) => e.isCompleted).length;
progressBar.style.width = `${(width / 3) * 100}%`;

check.forEach((checkBtn) => {
  checkBtn.addEventListener('click', () => {
    const userDataValue = [...userData].every((input) => {
      return input.value.trim();
    });
    if (userDataValue) {
      checkBtn.parentElement.classList.toggle('completed');
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

reset.addEventListener('click', () => {
  localStorage.removeItem('task');
  location.reload();
});
