--> REQUISIÇÃO
    --> APP - OK
    --> ROTA --> OK
        --> MIDDLEWARE
        --> CONTROLLER - OK - FAlta o cache
            --> REPOSITORY - OK
                --> Entidades - OK
                    --> Migrações - OK


--> FLUXO DO CACHE

--> REQUISIÇÃO
    --> GET
        --> CONSULTA NO CACHE 
            --> SE SIM RETORNA O CACHE
            --> SE NÃO
                --> CONSULTA NO DB
                --> SALVA ESSA CONSULTA NO CACHE
                --> RETORNA PARA A RESPOSTA


CACHE
    [
        {
            1,
            'PROJETO 1,
        },
        {
            2,
            'PROJETO'
        },
        {
            3,
            'PROJETO NOVO'
        }
    ]

-- LI O CACHE
-- INCLUIR UM PROJETO
-- INCLUIR UM PROJETO


--> ATUALIZAÇÃO DE REGISTRO
    1 - APAGAR O CACHE ANTIGO (CASO EXISTA)
    2 - ATUALIZAR O CACHE


--> CRIAR UMA FEATURE PARA TASK
    --> ID
    --> NAME
    --> DESCRIPTION
    --> PROJECTID

    - Um projeto tem várias tarefas
    - Uma tarefa, pertence a um projeto    

    --> CRIAR O CRUD
    --> CRIAR ESTRATÉGIA PARA CACHE


