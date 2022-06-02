// ******* constants ******* //
const BASE_URL =
	'https://data.cityofnewyork.us/resource/erm2-nwe9.json?agency=NYPD&borough=';
const btnParentEl = document.querySelector('#buttonParent');
const inputEl = document.querySelector('#userNum');
const brooklynEl = document.querySelector('#brooklyn');
const manhattanEl = document.querySelector('#manhattan');
const queensEl = document.querySelector('#queens');
const bronxEl = document.querySelector('#bronx');
const statenEl = document.querySelector('#statenIsland');

// console.log('nom');

let complaintsnum = 10;

// ******* constants ******* //
function getData(event) {
	event.preventDefault();
	if (event.target.classList.contains('boroughBtn')) {
		const complaintsNum = inputEl.value;
		const borough = event.target.id.toUpperCase();
		console.log(complaintsNum);
		console.log(borough);
		fetch(BASE_URL + `${borough}&$limit=${complaintsNum}`)
			.then(function (res) {
				// console.log(res);
				// console.log(res.json);
				return res.json();
				// console.log(dataObject);
			})
			.then(function (data) {
				console.log('yo, data!', data);
				for (let i = 0; i < complaintsNum; i++) {
					let newLi = document.createElement('li');
					let newContent = document.createTextNode(
						data[i].complaint_type.toString()
					);
					newLi.appendChild(newContent);
					document.querySelector('#complaintsList').insertBefore(newLi, null);
					let newBtn = document.createElement('button');
					newBtn.className = 'policeAction';
					newBtn.innerText = 'WHAT DID THE POLICE DO?';
					newBtn.addEventListener('click', (event) => {
						event.target.nextElementSibling.style.display =
							event.target.nextElementSibling.style.display === 'none'
								? 'block'
								: 'none';
					});
					newLi.appendChild(newBtn);
					let newP = document.createElement('p');
					// let pText = document.createTextNode(
					// 	data[i].resolution_description.toString()
					// );
					newP.innerText = data[i].resolution_description.toString();
					newP.style.display = 'none';
					newLi.appendChild(newP);
				}
			});
	}
}

btnParentEl.addEventListener('click', getData);

// brooklynEl.addEventListener('submit', getData);
// manhattanEl.addEventListener('submit', getData);
// queensEl.addEventListener('submit', getData);
// bronxEl.addEventListener('submit', getData);
// statenEl.addEventListener('submit', getData);

// getData();
