let btn = document.querySelector('#btnsubmit');
let containerData = document.querySelector('.dataUser');

btn.onclick = () => {
    addData();
}

const matchData = (data) => {
    let listData = document.createElement('ul');
    listData.setAttribute('class','list-group');
    data.forEach(element => {
        let stringData = document.createElement('li');
        stringData.setAttribute('class','list-group-item');
        stringData.textContent = element.name;
        listData.appendChild(stringData);
    });

    containerData.innerHTML = ''; 
    containerData.appendChild(listData);
}

const addData = () => {
    let inpUser = document.querySelector('input[name="user"]').value;
    const url = `https://api.github.com/users/${inpUser}/repos`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('O status da requisição não é válido' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            matchData(data);
        })
        .catch(error => {
            console.error('Erro de fetching:', error);
            containerData.innerHTML = '<p>Erro de fetching. Tente novamente.</p>';
        });
}
