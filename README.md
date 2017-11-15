# COBRANÇA
Curso Spring Boot - Workshop


# COMPONENTES INICIAIS:
- WEB
- JPA
- THYMELEAF
- DEVTOOLS


# CRIANDO O PROJETO
	- Cópia do nosso arquivo 
	GitIgnore:
		- *.class
		- .DS_Store
		- Servers/*
		- .metadata
		- .settings
		- .classpath
		- .project
		- target/
		- bin/
		- rebel.xml
		- .mvn*
		- mvnw*

- TOMCAT:
Para mudar a porta do tomcat:
	* No arquivo application.properties dentro do src/main/resources adicione:
	server.port=8090
	* Para trocar para 8090 por exemplo.

# PROTÓTIPO DO CADASTRO DE TÍTULO
	- Criação da página html e do controller
	- Acrescentando o DevTools
	
# ENVIANDO DADOS AO SERVIDOR
	- Criando a entidade para poder salvar no banco de dados, vamos linkar os dados da página 
		com o servidor: Criamos o model.
	- Editando o controle e criando um método para salvar no banco de dados, que recebe um objeto
	titulo que é convertido pelo spring para salvar no banco de dados, onde é enviado via post
	pelo RequestMapping, o spring pega os dados que vem na requisição e converte automaticamente.
	- Sem ainda salvar no banco de dados vamos retornar no método uma string para que busque a view
	onde seria o retorno para o browser
	- Na página vamos colocar os mesmos nomes dos input's com o nome dos atributos da entidade.
	- Alteramos o arquivo application.properties que é um arquivo dentro do sprigBoot que lê ele
	no qual já possui várias configurações default e neste arquivo conseguimos customizar essas
	configurações, algumas delas:
	Ver na documentação:
	https://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html
	- logging.level.root=DEBUG vamos ver o debug para todas as classes do sistema.
	
# CADASTRANDO UM NOVO TÍTULO
	- Vamos começar usando nossa interface para um repositorio do nosso JPA
	- Por estarmos usando uma aplicação web + h2 + devtools: conseguimos acessar o console do h2:
	http://localhost:8080/h2-console
	- Lembrar de trocar a url do jdbc para:
	jdbc:h2:mem:testdb
	- Vamos configurar a aplicação para pt-BR como default para acertar a linguagem e os dados no banco
	- Depois colocamos a validação nos atributos para ser aceito no banco de dados.

# MOSTRANDO A MENSAGEM DE SUCESSO
	- Configuramos uma mensagem simples de sucesso
	- Usaremos agora o thymeleaf para dinamicamente criar apenas se tiver uma mensagem sucesso para mostrar.
	- Adiciona o cabeçalho: xmlns:th="http://www.thymeleaf.org"
	- Vamos usar o if: th:if="${!#strings.isEmpty(mensagem)}"
	Podemos encontrar na documentação em 
	http://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#strings
	
# MONTANDO COMBO DINAMICAMENTE
	- Trabalhar no status pra mostrar dinamicamente do objeto, iterando sobre uma coleção.
	- Primeiro fizemos adicionar no mv da chamada /novo uma list e depois percorremos na página
	- Visto que teríamos que ficar repetindo o código nas outras chamadas modificamos com um
	método anotado com @ModelAttribute("todosStatusTitulo") e que recebe como parametro o nome
	do objeto que vamos interar na página, fazendo com que todos os modelAndView sejam carregados
	com a List retornada no método que retorna um array de todosStatusTitulo: Arrays.asList(StatusTitulo.values());
	- Melhor explicação: Quando usamos um @ModelAttribute deixamos disponível um atributo para todas as páginas.
	- O atributo só fica nas páginas do controller, mas se quiser disponibilizar para todas as
	páginas do sistema poderia usar uma anotação @ControllerAdvice em uma nova classe e lá usar o @ModelAttribute por exemplo:
	https://github.com/algaworks/curso-sistemas-web-com-spring-javascript-bootstrap/tree/master/12.3-modularizando-o-cadastro-rapido-de-estilo/brewer 
	- Para preencher o combo com dados de uma tabela e depois salvar a chave extrangeira:
	https://github.com/algaworks/curso-sistemas-web-com-spring-javascript-bootstrap/tree/master/9.8-iniciando-a-transacao-para-salvar-a-cerveja 
	- @ModelAttribute você irá enviar sempre o retorno do método como um objeto para a view para este controller.
	- @RedirectAttributes você consegue adicionar objetos também, mas eles ficam vivos (flash attributes) mesmo depois de um redirect.
	- Testando podemos criar um outro controller e anote-o com @ControllerAdvice, ai criamos o método com o @ModelAttribute.
	- Para autocompletar o thymeleaf: https://github.com/thymeleaf/thymeleaf-extras-eclipse-plugin 

# CONECTANDO AO MYSQL
	- Coloque na URL de conexão, no application.properties. Se estiver ocorrendo algum warn:
	jdbc:mysql://localhost/cobranca?useSSL=false
	- Como configurar um pool de conexões do banco de dados: 
	- Na documentação do Spring Boot tem uma recomendação para conectar em um banco de produção: 	
	https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-sql.html#boot-features-connect-to-production-database 
	- No próximo curso teremos datasource, pool de conexões, controle transacional manual e muito
	mais.
	- Quando temos um grande número de acessos a nossa aplicação, quanto mais conexões ao banco
	tivermos, mais rapidamente nossa aplicação irá responder. No próximo curso de Spring já vou usar
	Datasources com Pool de Conexões.
	
# PROTÓTIPO DA PESQUISA DE TÍTULOS
	- Criando o html para o protótipo.
	- Veremos mais usos do thymeleaf
	- Usando a versão do js do curso no final até podemos fazer a atualização
	
# TEMPLATE COM THYMELEAF
	- Vamos usar https://github.com/ultraq/thymeleaf-layout-dialect aqui encontramos a documentação
	não precisamos baixar pois já está no pom.xml onde configuramos no início do projeto.
	- Na documentação vemos as funcionalidades do bootstrap:
		https://getbootstrap.com/docs/4.0/utilities/clearfix/
		Para ajudar a consertar a página.
	- Customizamos as páginas e os css, apontando também às classes do cleafix.
	
# LISTANDO OS TÍTULOS	
	- Enviando dados do controller para a view em pesquisa.
	- 
	
	
	
	
	
	
