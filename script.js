const fetchGETAlunos = async () => {
    try {
        let resposta = await fetch('http://localhost:3000/users');
        resposta = await resposta.json();
        return resposta;
    } catch (e) {
        console.error(e);
    }
};

const enviarAluno = async () => {
    const nome = document.querySelector("#novo-nome").value;
    const idade = document.querySelector("#novo-idade").value;
    const feedback = document.querySelector('#feedback');

    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: { nome, idade }})
        }
        let resposta = await fetch('http://localhost:3000/users', options);
        resposta = await resposta.json();
        feedback.textContent = resposta;
        limparAlunos();
        await renderAlunos();
    } catch (e) {
        console.error(e);
    }
}

const removerAluno = async (event) => {
    const id = event.target.dataset.id;
    try {
        await fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        });
        event.target.parentElement.remove();
    } catch (e) {
        console.error(e);
    }
};

const renderAlunos = async () => {
    const alunos = await fetchGETAlunos();
    const elemUl = document.querySelector('#lista-alunos');

    for (let aluno of alunos) {
        const elemLi = document.createElement('li');

        elemLi.innerHTML = `Nome: ${aluno.nome} - Idade: ${aluno.idade}`;
        const btRemover = document.createElement('button');
        btRemover.dataset.id = aluno._id;
        btRemover.textContent = '❌';
        btRemover.onclick = removerAluno;

        const btEditar = document.createElement('button');
        btEditar.dataset.id = aluno._id;
        btEditar.textContent = '✏️';
        btEditar.onclick = editarAluno;

        elemLi.appendChild(btRemover);
        elemLi.appendChild(btEditar);
        elemUl.appendChild(elemLi);
    }
};

const editarAluno = async (evento) => {
    const inputNome = document.createElement('input');
    inputNome.type = 'text';
    inputNome.placeholder = 'Nome';
    inputNome.id = 'editar-nome';

    const inputIdade = document.createElement('input');
    inputIdade.type = 'number';
    inputIdade.placeholder = 'Idade';
    inputIdade.id = 'editar-idade';

    const btAtualizar = document.createElement('button');
    btAtualizar.innerText = '✔️';
    btAtualizar.dataset.id = evento.target.dataset.id;
    btAtualizar.onclick = atualizarAluno;

    evento.target.parentNode.appendChild(inputNome);
    evento.target.parentNode.appendChild(inputIdade);
    evento.target.parentNode.appendChild(btAtualizar);
}

const atualizarAluno = async (evento) => {
    const nome = document.querySelector('#editar-nome').value;
    const idade = document.querySelector('#editar-idade').value;
    const feedback = document.querySelector('#feedback');

    try {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: { nome, idade}})
        }
        let resposta = await fetch(`http://localhost:3000/users/${evento.target.dataset.id}`, options);
        resposta = await resposta.json();
        feedback.textContent = resposta;
        limparAlunos();
        await renderAlunos();
    } catch (e) {
        console.error(e);
    }
}

const limparAlunos = () => {
    const elemUl = document.querySelector('#lista-alunos');

    while (elemUl.firstChild) {
        elemUl.removeChild(elemUl.firstChild);
    }
}

const botaoEnviar = document.querySelector('#enviar');
renderAlunos()

botaoEnviar.addEventListener('click', enviarAluno);