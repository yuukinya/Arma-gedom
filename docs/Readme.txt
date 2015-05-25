Problema: Armas de um Jogo de tiro
Framework:

O objetivo do problema � desenvolver um framework que gerencie as armas de um jogo de tiro.

No framework deve ser poss�vel criar um reposit�rio de armas e deve ser poss�vel:
    *Armazenar armas
    *Remover armas
    *Limitar quantidade de armas por peso

Com o framework deve ser poss�vel controlar v�rios tipos de armas, por exemplo:
    *Armas que n�o dependem de muni��o (faca, katana)
    *Armas que dependem de muni��o

Para cada arma deve ser poss�vel gerenciar:
    Caracter�sticas b�sicas da arma 
        *nome
        *descri��o
        *imagem
        *peso

    Ataques da arma:
        *Se utilizar muni��o, qual tipo
        *Danos (m�ximo, m�nimo e m�dio)
        *Tempo entre cada ataque
        *Tempo de recarregar a muni��o

    Quantidade m�xima de muni��o:
        *Por cartucho
        *Reserva

    Se � poss�vel ou n�o utilizar a arma (n�o ser� poss�vel utilizar quando estiver recarregando muni��o ou sem muni��o)

A��es que devem ser poss�veis com cada arma:
    *Atacar (com cada tipo de ataque) obs.: ap�s atirar, devo saber se disparou ou n�o.
    *Recarregar (cartucho) obs.: n�o deve ser poss�vel recarregar se j� estiver com o m�ximo
    *Recarregar (reserva) obs.: n�o deve ser poss�vel recarregar se j� estiver com o m�ximo

Obs.: � opcional o desenvolvimento de persist�ncia, portanto, o gerenciamento dos estados pode ser feito somente em mem�ria.

Exemplos de armas:
Faca:
Muni��o: infinita
Tipos de �muni��o�: Ataque leve, Ataque forte
Tempo de recarregar (entre cada golpe): Ataque leve: 0,2 s, Ataque forte 1s
Dano causado: Ataque leve: (minimo: 10%, medio: 15%, maximo: 25%), Ataque forte (minimo: 15%, m�dio: 35%, m�ximo: 70%)

Pistola:
Muni��o: 100
Tipos de �muni��o�: Tiro comum
Tempo entre cada ataque: 0,01s
Tempo de recarregar muni��o: 1s
Dano causado: Minimo: 10%, M�dio: 20%, M�ximo: 100%

Interface Gr�fica / API
Dever� ser criada uma interface gr�fica para o framework, ou uma API, onde dever� ser poss�vel:
    Reposit�rio de armas
        Criar
        Remover
        Definir limite de peso
        Visualizar estado do reposit�rio (armas que cont�m)

    Armas
        Criar
        Remover
        Inserir armas nos reposit�rios
        Remover armas dos reposit�rios
        Disparar/Atacar (escolhendo tipo de ataque) - Informar se o ataque foi poss�vel e o dano causado;
        Recarregar (escolhendo tipo de muni��o) - Informar se foi poss�vel recarregar
        Visualizar estado das muni��es

Obs.: N�o � necess�rio criar um �jogo�, apenas interfaces que tornem poss�vel a execu��o das a��es listadas acima.
Exemplo: Na exibi��o da arma a a��o de �atacar� pode ser apenas um bot�o;