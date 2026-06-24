// MUDAR PARA TABELA
const botao = document.getElementById("btn-entrar"); // Seleciona o botão com o ID "btn-entrar"

botao?.addEventListener("click", () => { // Adiciona um evento de clique ao botão
    window.location.href = "/tabela"; // Redireciona para a página "/tabela" quando o botão é clicado
});


// SALVAR + CARREGAR RASCUNHO
function salvarRascunho() { // Função para salvar o rascunho (o que o usuário já preencheu)
    const nome = document.getElementById("nome")?.value; 
    const qtde = document.getElementById("qtde")?.value;
    const responsavel = document.getElementById("responsavel")?.value;
    const preco = document.getElementById("preco")?.value;
    const estoque_min = document.getElementById("estoque_min")?.value;
    const descricao = document.getElementById("descricao")?.value;
    const categoria = document.getElementById("categoria")?.value; // ?.value serve para evitar erros caso o elemento não exista na página

    const dados = {
        nome,
        qtde,
        responsavel,
        preco,
        estoque_min,
        descricao,
        categoria,
        tipoMovimentacao: window.tipoMovimentacao || "" // Salva o tipo de movimentação (entrada ou saída) no rascunho
    };

    localStorage.setItem("rascunho_editar", JSON.stringify(dados)); // Salva os dados no localStorage (memória do navegador) como uma string JSON que transforma o objeto em texto
}

// EXCLUIR USUÁRIO 
window.excluirUsuario = async function (id) { // Função para excluir um usuário, recebe o ID do usuário como parâmetro

    const confirmacao = confirm("Tem certeza que deseja excluir este usuário?"); // Exibe uma caixa de confirmação para o usuário
    if (!confirmacao) return; // Se o usuário clicar em "Cancelar", a função retorna e não faz nada

    const resposta = await fetch(`/excluirUsuario/${id}`, { // Faz uma requisição para o servidor para excluir o usuário com o ID fornecido
        method: "DELETE" // O método DELETE é usado para excluir recursos no servidor
    });

    const data = await resposta.json(); // Converte a resposta do servidor em JSON

    if (data.success) { // Se a exclusão foi bem-sucedida, exibe uma mensagem de sucesso e recarrega a página
        alert("Usuário excluído com sucesso!");
        location.reload();
    } else {
        alert("Erro ao excluir usuário"); // Se houve um erro na exclusão, exibe uma mensagem de erro
    }
};


// EXCLUIR ITEM
window.excluirItem = async function (id) { // Função para excluir um item, recebe o ID do item como parâmetro

    const confirmacao = confirm("Tem certeza que deseja excluir este item?"); // Exibe uma caixa de confirmação para o usuário
    if (!confirmacao) return;

    const resposta = await fetch(`/excluir/${id}`, { // Faz uma requisição para o servidor para excluir o item com o ID fornecido
        method: "DELETE" // O método DELETE é usado para excluir recursos no servidor
    });

    const data = await resposta.json(); // Converte a resposta do servidor em JSON

    if (data.success) {
        alert("Item excluído com sucesso!"); // Se a exclusão foi bem-sucedida, exibe uma mensagem de sucesso e recarrega a página
        location.reload();
    } else {
        alert("Erro ao excluir"); // Se houve um erro na exclusão, exibe uma mensagem de erro
    }
};


// JS PRINCIPAL
window.addEventListener("DOMContentLoaded", () => { // Aguarda o carregamento completo do DOM antes de executar o código

    const btnEntrada = document.getElementById("btnEntrada");
    const btnSaida = document.getElementById("btnSaida");
    const btnRegistrar = document.getElementById("btnRegistrar");
    const btnUpload = document.getElementById("btnUpload");
    const fileInput = document.getElementById("fileInput"); // Seleciona os botões e o input pelo nome

    window.tipoMovimentacao = ""; // Inicializa a variável global para armazenar o tipo de movimentação (entrada ou saída)

    function limparSelecao() { // Função para limpar a seleção dos botões de entrada e saída
        btnEntrada?.classList.remove("btn-selecionado"); // Só executa se o botão existir, e atualiza no CSS ao clicar
        btnSaida?.classList.remove("btn-selecionado"); // Só executa se o botão existir, e atualiza no CSS ao clicar
    }

    // CARREGAR RASCUNHO
    const rascunho = JSON.parse(localStorage.getItem("rascunho_editar")); // Recupera o rascunho salvo no localStorage (memória do navegador) e converte de volta para objeto

    if (rascunho && document.getElementById("nome")) { // Se houver rascunho e o elemento "nome" existir na página, preenche os campos com os valores salvos no rascunho

        document.getElementById("nome").value = rascunho.nome || "";
        document.getElementById("qtde").value = rascunho.qtde || "";
        document.getElementById("responsavel").value = rascunho.responsavel || "";
        document.getElementById("preco").value = rascunho.preco || "";
        document.getElementById("estoque_min").value = rascunho.estoque_min || "";
        document.getElementById("descricao").value = rascunho.descricao || "";
        document.getElementById("categoria").value = rascunho.categoria || ""; // Preenche os campos com os valores salvos no rascunho, ou deixa vazio se não houver valor

        window.tipoMovimentacao = rascunho.tipoMovimentacao || ""; // Restaura o tipo de movimentação (entrada ou saída) do rascunho
    }

    limparSelecao(); // Limpa a seleção dos botões de entrada e saída ao carregar a página

    if (window.tipoMovimentacao === "entrada") {
        document.getElementById("btnEntrada")?.classList.add("btn-selecionado"); // Se o tipo de movimentação for "entrada", adiciona a classe "btn-selecionado" ao botão de entrada
    }

    if (window.tipoMovimentacao === "saida") {
        document.getElementById("btnSaida")?.classList.add("btn-selecionado"); // Se o tipo de movimentação for "saida", adiciona a classe "btn-selecionado" ao botão de saída
    }

    document.addEventListener("input", salvarRascunho); // Adiciona um evento de input a todo o documento, para salvar o rascunho sempre que o usuário digitar algo em qualquer campo

    btnEntrada?.addEventListener("click", () => { // Adiciona um evento de clique ao botão de entrada
        window.tipoMovimentacao = "entrada";
        limparSelecao(); 
        btnEntrada.classList.add("btn-selecionado"); 
        salvarRascunho(); // Salva o rascunho sempre que o usuário clicar no botão de entrada
    });

    btnSaida?.addEventListener("click", () => {
        window.tipoMovimentacao = "saida";
        limparSelecao();
        btnSaida.classList.add("btn-selecionado");
        salvarRascunho(); // Salva o rascunho sempre que o usuário clicar no botão de saída
    });

    btnRegistrar?.addEventListener("click", async () => { // Adiciona um evento de clique ao botão de registrar

        if (!window.tipoMovimentacao) {
            alert("Selecione Entrada ou Saída."); // Se o usuário não selecionou entrada ou saída, exibe um alerta e retorna sem fazer nada
            return;
        }

        const nome = document.getElementById("nome").value;
        const qtde = document.getElementById("qtde").value;
        const responsavel = document.getElementById("responsavel").value;
        const preco = document.getElementById("preco").value;
        const estoque_min = document.getElementById("estoque_min").value;
        const descricao = document.getElementById("descricao").value;
        const categoria = document.getElementById("categoria").value; // Pega os valores dos campos do formulário
        const imagem = fileInput?.files[0]; // Pega o arquivo de imagem selecionado pelo usuário, se houver

        const formData = new FormData(); // Cria um objeto FormData (usado para enviar dados de formulários) incluindo o arquivo de imagem

        formData.append("nome", nome); 
        formData.append("qtde", qtde);
        formData.append("responsavel", responsavel);
        formData.append("preco", preco);
        formData.append("estoque_min", estoque_min);
        formData.append("descricao", descricao);
        formData.append("categoria", categoria);
        formData.append("tipo", window.tipoMovimentacao); // Adiciona os valores dos campos do formulário ao objeto FormData

        if (imagem) {
            formData.append("imagem", imagem); // Adiciona o arquivo de imagem ao objeto FormData, se houver
        }

        fetch("/entrada", { // Faz uma requisição para o servidor para registrar a entrada ou saída do item
            method: "POST", // O método POST é usado para enviar dados ao servidor
            body: formData // O corpo da requisição é o objeto FormData que contém os dados do formulário
        })
        .then(res => res.json()) // Converte a resposta do servidor em JSON
        .then(data => { // Manipula a resposta do servidor, exibindo uma mensagem de sucesso ou erro para o usuário

            const msg = document.getElementById("mensagem");

            if (data.success) {
                localStorage.removeItem("rascunho_editar");
                msg.innerText = "Registro salvo com sucesso ✔";
                msg.style.color = "green"; // Exibe uma mensagem de sucesso para o usuário e remove o rascunho salvo no localStorage

                setTimeout(() => { // Aguarda 1 segundo antes de redirecionar para a página de tabela
                    window.location.href = "/tabela";
                }, 1000);

            } else {
                msg.innerText = data.erro || "Erro ao salvar";
                msg.style.color = "red"; // Exibe uma mensagem de erro para o usuário, caso haja algum problema ao salvar os dados no servidor
            }
        })
        .catch(() => { // Caso haja algum erro na requisição, exibe uma mensagem de erro para o usuário
            const msg = document.getElementById("mensagem");
            msg.innerText = "Erro ao conectar com o servidor.";
            msg.style.color = "red";
        });
    });

    btnUpload?.addEventListener("click", () => { // Adiciona um evento de clique ao botão de upload de imagem
        fileInput?.click(); // Simula um clique no input de arquivo, abrindo a janela de seleção de arquivos para o usuário
    });

    fileInput?.addEventListener("change", () => {
        const msg = document.getElementById("mensagem");

        if (fileInput.files.length > 0) {
            msg.innerText = "Imagem adicionada com sucesso ✔";
            msg.style.color = "green"; // Exibe uma mensagem de sucesso para o usuário quando uma imagem é selecionada
        }
    });
});