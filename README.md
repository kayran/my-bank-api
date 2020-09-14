# my-bank-api
API em Node com Express feita para  a disciplina de Desenvolvimento de APIs no MBA de Front-End pelo IGTI

Repo: https://github.com/kayran/my-bank-api

Para rodar local é preciso da chave de acesso a Datastore na Google Cloud. Essa chave não vai se encontrar no repositório.

Para testar online utilize o endereço https://my-bank-api-dot-having-209902.rj.r.appspot.com/ e acesse a API. 

Workspace do Insomnia disponivel no arquivo Insomnia_2020-09-13.json

## Rotas disponiveis:

GET / => Hello World!

GET /accounts/list => Lista as contas existentes (Sem parametros)

GET /accounts/balance/accountId => Lista os dados da conta indicada por accountId

POST /accounts/create => Cria uma conta com os dados passados no corpo da requisição(formato JSON) 

Body: {
	"name":"José dos Santos",
	"balance": 2345.75
}

PUT /accounts/deposit => Efetua o acréscimo(depósito) do valor indicado em ammount, para a conta indicada por accountId

Body: {
	"accountId": 5634457830686720,
	"ammount": 0.01
}

PUT /accounts/withdraw => Efetua o decréscimo(saque) do valor indicado em ammount, para a conta indicada por accountId

Body: {
	"accountId": 5634457830686720,
	"ammount": 0.01
}

DELETE /accounts/remove/accountId => Remove a conta indicada por accountId da base.