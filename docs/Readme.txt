Problema: Armas de um Jogo de tiro
Framework:

O objetivo do problema é desenvolver um framework que gerencie as armas de um jogo de tiro.

No framework deve ser possível criar um repositório de armas e deve ser possível:
    *Armazenar armas
    *Remover armas
    *Limitar quantidade de armas por peso

Com o framework deve ser possível controlar vários tipos de armas, por exemplo:
    *Armas que não dependem de munição (faca, katana)
    *Armas que dependem de munição

Para cada arma deve ser possível gerenciar:
    Características básicas da arma 
        *nome
        *descrição
        *imagem
        *peso

    Ataques da arma:
        *Se utilizar munição, qual tipo
        *Danos (máximo, mínimo e médio)
        *Tempo entre cada ataque
        *Tempo de recarregar a munição

    Quantidade máxima de munição:
        *Por cartucho
        *Reserva

    Se é possível ou não utilizar a arma (não será possível utilizar quando estiver recarregando munição ou sem munição)

Ações que devem ser possíveis com cada arma:
    *Atacar (com cada tipo de ataque) obs.: após atirar, devo saber se disparou ou não.
    *Recarregar (cartucho) obs.: não deve ser possível recarregar se já estiver com o máximo
    *Recarregar (reserva) obs.: não deve ser possível recarregar se já estiver com o máximo

Obs.: É opcional o desenvolvimento de persistência, portanto, o gerenciamento dos estados pode ser feito somente em memória.

Exemplos de armas:
Faca:
Munição: infinita
Tipos de ‘munição’: Ataque leve, Ataque forte
Tempo de recarregar (entre cada golpe): Ataque leve: 0,2 s, Ataque forte 1s
Dano causado: Ataque leve: (minimo: 10%, medio: 15%, maximo: 25%), Ataque forte (minimo: 15%, médio: 35%, máximo: 70%)

Pistola:
Munição: 100
Tipos de ‘munição’: Tiro comum
Tempo entre cada ataque: 0,01s
Tempo de recarregar munição: 1s
Dano causado: Minimo: 10%, Médio: 20%, Máximo: 100%

Interface Gráfica / API
Deverá ser criada uma interface gráfica para o framework, ou uma API, onde deverá ser possível:
    Repositório de armas
        Criar
        Remover
        Definir limite de peso
        Visualizar estado do repositório (armas que contém)

    Armas
        Criar
        Remover
        Inserir armas nos repositórios
        Remover armas dos repositórios
        Disparar/Atacar (escolhendo tipo de ataque) - Informar se o ataque foi possível e o dano causado;
        Recarregar (escolhendo tipo de munição) - Informar se foi possível recarregar
        Visualizar estado das munições

Obs.: Não é necessário criar um “jogo”, apenas interfaces que tornem possível a execução das ações listadas acima.
Exemplo: Na exibição da arma a ação de “atacar” pode ser apenas um botão;