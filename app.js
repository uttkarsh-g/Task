// const check = document.querySelectorAll('.checked');
// const c = document.querySelectorAll('.userData');
// const w = document.querySelector('.warning');
// const submit = document.querySelector('#submit');
// check.forEach((e) => {
//   e.addEventListener('click', () => {
//     const r = [...c].every((e) => {
//       return e.value;
//     });
//     if (r) {
//       e.parentElement.classList.add('completed');
//     } else {
//       w.classList.add('block');
//     }
//     const p = e.parentElement.classList.contains('completed');
//     if (!p) {
//       submit.disabled = true;
//     } else {
//       submit.disabled = false;
//     }
//     c.forEach((e) => {
//       e.addEventListener('focus', () => {
//         w.classList.remove('block');
//       });
//     });
//   });
// });
