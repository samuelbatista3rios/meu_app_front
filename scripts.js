        // Função para exibir os itens cadastrados
        function displayItems() {
          // Limpa a lista antes de atualizá-la
          $("#itemList").empty();

          // Faz uma requisição GET para obter os itens cadastrados
          axios.get("http://localhost:5000/recipes")
              .then(function(response) {
                  // Itera sobre a lista de itens e adiciona cada um à lista na página
                  response.data.forEach(function(item) {
                      var listItem = $("<li>").text(item.title + " - " + item.description);
                      var deleteButton = $("<button>").text("Deletar");
                      deleteButton.click(function() {
                          deleteItem(item.id); // Chama a função para deletar o item quando o botão é clicado
                      });
                      listItem.append(deleteButton);
                      $("#itemList").append(listItem);
                  });
              })
              .catch(function(error) {
                  console.log(error);
              });
      }

      // Função para deletar um item
      function deleteItem(itemId) {
          axios.delete("http://localhost:5000/recipes/" + itemId)
              .then(function(response) {
                  alert("Item deletado com sucesso!");
                  displayItems(); // Atualiza a lista de itens cadastrados após deletar o item
              })
              .catch(function(error) {
                  alert("Erro ao deletar o item. Por favor, tente novamente.");
                  console.log(error);
              });
      }

      // Função para lidar com o envio do formulário
      $("#itemForm").submit(function(event) {
          event.preventDefault(); // Evita o comportamento padrão do formulário

          // Obtém os valores dos campos do formulário
          var itemName = $("#itemName").val();
          var itemDesc = $("#itemDesc").val();

          // Cria um objeto com os dados do item
          var newItem = {
              title: itemName,
              description: itemDesc
          };

          // Envia uma requisição POST para a API de cadastro de itens
          axios.post("http://localhost:5000/recipes", JSON.stringify(newItem), {
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          .then(function(response) {
              alert("Item cadastrado com sucesso!");
              // Limpa os campos do formulário após o cadastro
              $("#itemName").val("");
              $("#itemDesc").val("");
              // Atualiza a lista de itens cadastrados
              displayItems();
          })
          .catch(function(error) {
              alert("Erro ao cadastrar o item. Por favor, tente novamente.");
              console.log(error);
          });
      });

      // Exibe os itens cadastrados ao carregar a página
      displayItems();