# Plataforma de Administração de Treinos e Metas para Brazilian Jiu-Jitsu Compass

## Objetivo do Projeto
Desenvolver o backend eficiente para suportar uma plataforma web que ajuda praticantes de Brazilian Jiu-Jitsu a administrar seus treinos e metas de forma organizada e eficaz.

## Funcionalidades do Backend

### 1. API de Registro de Treinos
- Desenvolvimento de endpoints para permitir que os usuários registrem detalhes de cada treino, como técnicas praticadas, tempo dedicado, intensidade e observações adicionais.
- Armazenamento seguro e eficiente dos dados de treino no banco de dados.

### 2. Gestão de Metas
- Implementação de lógica para permitir que os usuários definam e atualizem suas metas pessoais, como alcançar um novo grau de faixa, dominar técnicas específicas ou participar de competições.
- Sistema de notificações para alertar os usuários sobre o progresso em relação às metas estabelecidas.

### 3. Integração com Banco de Dados
- Utilização de MongoDB para armazenar e gerenciar de forma eficiente os dados dos usuários, garantindo escalabilidade e segurança.

### 4. Lógica de Negócios
- Desenvolvimento de regras de negócios para calcular estatísticas de progresso, como número de treinos realizados, minutos de prática, evolução nas técnicas aprendidas, entre outros indicadores.

## Tecnologias Utilizadas
- **Node.js**: Para o desenvolvimento do servidor backend, aproveitando a eficiência e escalabilidade da plataforma.
- **Express.js**: Framework web para Node.js, facilitando a criação de APIs.
- **MongoDB**: Banco de dados NoSQL para armazenamento dos dados dos usuários.
- **JWT (JSON Web Tokens)**: Para autenticação e segurança das API endpoints.
- **Resend**: Para envio de emails transacionais e notificações automatizadas.

## Documentação
A documentação completa das APIs está disponível no Swagger.
  ```sh
   http://localhost:3000/api-docs/
   ```

## Como Executar o Projeto
1. Clone o repositório:
   ```sh
   git clone https://github.com/bjj-compass.git
   cd bjj-compass
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Execute o servidor:
   ```sh
   npm run start
   ```

## Contribuição
Se deseja contribuir para o projeto, abra uma issue ou envie um pull request com suas sugestões e melhorias.

## Licença
Este projeto está licenciado sob a MIT License.

