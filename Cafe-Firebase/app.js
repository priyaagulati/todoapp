const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().Name;
    // city.textContent = doc.data().City;
    cross.textContent = 'x';

    li.appendChild(name);
    // li.appendChild(city);
    li.appendChild(cross);
    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e)=> {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Todos').doc(id).delete();
    })
}


// saving data
form.addEventListener('submit', (e)=> {
    e.preventDefault();
    db.collection('Todos').add({
        Name: form.Name.value,
        // City: form.City.value
    })
    form.Name.value = '';
    // form.City.value = '';
});

//real-time listener
db.collection('Todos').orderBy('Name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if(change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    })
})