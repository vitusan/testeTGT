# testeTGT
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/vitusan/testeTGT/blob/main/LICENSE) 

# Sobre o projeto

https://app-banco-azul.herokuapp.com/

testeTGT/Banco Azul é uma aplicação full stack web construída para uma entrevista de emprego na empresa **TGT Digital**, site [TGTDigital](https://www.tgtdigital.io/#/landing/tgt "Site da TGT Digital").

A aplicação consiste em uma plataforma web simulando um sistema de gerenciamento de clientes (CRUD) no servidor do banco, porém esta conta com o poder do OpenBanking que foi simulado através de uma API Backend do BACEN, onde os dados dos cidadãos são armazenados em banco público e estes são acessados pelos bancos públicos e privados afim de obter dados sobre seus clientes para diversos fins comerciais.

## Layout web
![Web 1](https://github.com/vitusan/testeTGT/blob/main/APP/assets/gitImages/1.png)

![Web 2](https://github.com/vitusan/testeTGT/blob/main/APP/assets/gitImages/2.png)

![Web 3](https://github.com/vitusan/testeTGT/blob/main/APP/assets/gitImages/3.png)

![Web 4](https://github.com/vitusan/testeTGT/blob/main/APP/assets/gitImages/4.png)

# Tecnologias utilizadas
## Back end
- NestJS
- Express
## Front end
- HTML5 / CSS3 / JS / TypeScript
- EJS
- Bootstrap5
## Implantação em produção
- Back end: Heroku
- Front end web: Heroku
- Banco de dados: Postgresql/MongoDB

# Como executar o projeto

## Back end
Pré-requisitos: Node 14

```bash
# clonar repositório
git clone https://github.com/vitusan/testeTGT

# entrar na pasta do projeto back end
cd API/nest-banco-central

# instalar os módulos necessários
node i

# executar o projeto
nest start:dev
```

## Front end web
Pré-requisitos: npm / yarn

```bash
# clonar repositório
git clone https://github.com/vitusan/vgasalespage

# entrar na pasta do projeto front end web
cd APP

# instalar dependências
node i

# executar o projeto
node index.js
```

# Autor

Victor Gonçalves de Andrade

https://www.linkedin.com/in/vitusan-li/