# Cobranca
Curso Spring Boot - Workshop


    COMPONENTES INICIAIS:
- WEB
- JPA
- THYMELEAF
- DEVTOOLS


- CRIANDO O PROJETO
	- Cópia do nosso arquivo GitIgnore:
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

- PROTÓTIPO DO CADASTRO DE TÍTULO
	- Criação da página html e do controller
	- Acrescentando o DevTools
	
- ENVIANDO DADOS AO SERVIDOR
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
	
- CADASTRANDO UM NOVO TÍTULO
	-
	
	
