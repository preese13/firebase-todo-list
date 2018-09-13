const barList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-bar-form');


function renderBar(doc){

    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x'

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    barList.appendChild(li);


    //delete data
    cross.addEventListener('click', (e) =>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('bars').doc(id).delete();
    })
}

//listen for data
db.collection('bars').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();

    changes.forEach(change => {
        if(change.type == 'added')
        {
            renderBar(change.doc)
        }
        else if( change.type == 'removed')
        {
            let li = barList.querySelector('[data-id=' + change.doc.id + ']');
            barList.removeChild(li);
        }
    })
})

//saving data
form.addEventListener('submit', (e) => {
        e.preventDefault();

        db.collection('bars').add({
            name: form.name.value,
            city: form.city.value
        });

        form.name.value = "";
        form.city.value = "";
})