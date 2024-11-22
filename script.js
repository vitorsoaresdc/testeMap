
document.getElementById('botaoEnviar').addEventListener('click', function() {
    // pega o input do usuario
    const usuario = document.getElementById('usuario').value;
    const url = `https://api.github.com/users/${usuario}/repos`;
    console.log(url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // verifica status 200
                throw new Error('Usuário não encontrado');
            }
            return response.json();
        })
        .then(repos => {
            const listaRepos = document.createElement('ul');
            if (repos.length === 0) {

                const noReposMessage = document.createElement('li');
                noReposMessage.textContent = 'Este usuário não tem repositórios públicos.';
                listaRepos.appendChild(noReposMessage);
            } else {
                repos.forEach(repo => {
                    const listItem = document.createElement('li');
                    const descricao = repo.description ? ` - Descrição: ${repo.description}` : ' - Sem descrição ';

                    const link = document.createElement('a');
                    link.href = repo.html_url; // URL do repositório no GitHub
                    link.textContent = `O repositório é: ${repo.name}${descricao}`;
                    link.target = '_blank'; // Abre o link em uma nova aba

                    listItem.appendChild(link);
                    listaRepos.appendChild(listItem);
                });
            }

            document.body.appendChild(listaRepos);
        })
        .catch(error => {
            const mensagemErro = document.createElement('p');
            mensagemErro.textContent = error.message;
            document.body.appendChild(mensagemErro);
        });

});


