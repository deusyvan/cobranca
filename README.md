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
	- Utilizando o objeto utilitário lists: th:if="${#lists.isEmpty(titulos)}" 
	mostramos apenas se titulos estiver vazio.
	- Usaremos o thymeleaf agora para nos ajudar a formatar a data, usando apenas duas chaves no campo
	da data para que ele use o formato definido no model, a mesma coisa funcina para os números.
	- Com base no status vamos mudar sua apresentação usando bootstrap para desenhar:
	- Na documentação de objetos utilitários vamos ver como fazer a expressão de strings
	para que transformemos um objeto em uma string: Expression Utility Objects
		http://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#strings
	- Melhoramos a apresentação mostrando através de um método.
	- Para mais de dois tipos de status veja o código do curso:
		https://github.com/algaworks/curso-sistemas-web-com-spring-javascript-bootstrap

# PLUGIN PARA COMPLETAR O CODIGO NO THYMELEAF
	http://www.thymeleaf.org/ecosystem.html#thymeleaf-eclipse-plugin
		Para instalar vá em Help >> Install new Software >> e cole esse link para dowload:
		http://www.thymeleaf.org/eclipse-plugin-update-site/
		Ou ainda pode baixar do tipo zip: 
		https://bintray.com/thymeleaf/downloads/thymeleaf-extras-eclipse-plugin/

# PRODUTIVIDADE COM DEVTOOLS E LIVERELOAD 
	- Já temos o devtools instalado na aplicaçao que já compila automaticamente.
	- Usaremos o chrome o livereload para atualizar a página automaticamente sem 
	interação do desenvolvedor:
		Adicione ao chrome: 
		https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

# EXPRESSÕES DO THYMELEAF
	- Documentação capitulo 4: sintaxes
		Expressões de variáveis: "${titulos}"    >>>     "titulos"
		th:each
		th:text
		${{   }}   >>>   formatar de acordo com o formato definido no model
		th:classappen    adiciona uma classe
		th:if     >>>>  só vai renderizar se a expressão for verdadeira
		#lists   >>>>  Objetos Úteis  Expressions Utility Objects dentro de uma expressão do thymeleaf "${     }"
		
		Selection Variable Expression *{...}  >>>> para os cadastros manter valores
		Message Expression: #{...}    >>>>>    recuperar properties para mensagens (Internacionalização)
		Link URL Expression: @{...}     >>>>>>  href=""   Melhorar as referências quando estiver em outro contexto.
		 
# VALIDAÇÕES COM BEAN VALIDATION
	- Executado no servidor. Validação no bean: Entidade com meta informações
	- Mostrar a mensagem de erro ao usuario: o spring já cria um objeto chamado Errors
	 		
# MANTENDO OS VALORES NO FORMULÁRIO
	- Usando o th:field conseguimos manter os dados no formulário.
	- Usaremos o redirect para limpar os dados do formulário. Retornando o status 302 no http,
	redirecionando para uma outra página, fazendo com que o browser faça uma nova requisição para
	"titulos/novo". 
	- Vamos usar o RedirectAttributes para levar atributos para um novo redirect, no nosso caso
	a mensagem e mostrar a mensagem de sucesso.
	- Melhoramos o código faremos que o método retorne ao invés de um ModelAndView uma String e 
	retiramos todos os ModelAndView do nosso método. 
	
# IMPLEMENTANDO A EDIÇÃO
	- Inserimos na pesquisa nosso icone de edição: glyphicon-pencil
	- Editaremos o controler para apontar para uma requisição do tipo get, lembrando que não podemos
	ter @RequestMapping iguais, por isso faremos esta diferenciação:
	@RequestMapping("{codigo}")
	- O método editar recebe uma variavel path do caminho por isso a anotação "@PathVariable Long codigo"
	para transformar o parametro.
	- Nosso método está recebendo o codigo via get e redirecionando a "/titulos/novo".
	- Alterando o metodo passamos a receber o titulo na view mas um titulo fixo.
	- Passamos a receber o codigo do titulo preenchido com dados do banco, e vamos usar a expression
	@{...} para fazer referencia ao link da url.
	- @{...} monta nossos links, podendo definir variáveis depois dentro do contexto. Ainda veremos outras 
	funcionalidades dele, criando aqui nossa url dinâmica, incluindo continuar mantendo os valores através
	do th:field na hora da edição também.
	- Até aqui a edição que busca os dados e entrega no formulário de cadastro, ainda não sabemos que é um
	titulo existente, então passamos a implementar isso, colcaremos um campo oculto do codigo no cadastro:
	<input type="hidden" th:field="*{codigo}"/>
	- Pegamos o codigo e inserimos no campo para receber na requisição via get e usarmos para editar o 
	titulo existente, ele estando null salvamos um novo e se existir atualizamos o atual no banco, o jpa
	faz isso pra gente no método save: "titulos.save(titulo)"
	- Melhorando o código o spring sabe, se estivermos usando jpa, evitando a necessidade de fazer um
	titulos.findOne(codigo);
	Da seguinte maneira, recebendo ao inves de um codigo o título:
	"@PathVariable("codigo") Titulo titulo"
	- Ao invés de lapis deixar o codigo sublinhado para edição:
	https://github.com/algaworks/2a-oficina-spring-framework/blob/master/video-3/aw-vinhos/src/main/resources/templates/vinho/pesquisa-vinhos.html
	- Para mostrar os sql no console colocar no application.properties:
	spring.jpa.show-sql=true 
	- Outra forma de pegar o codigo:
	<a class="btn btn-link btn-xs" th:href="|/titulos/${titulo.codigo}|"> 
		
# IMPLEMENTANDO A EXCLUSÃO
	- Vamos usar o modal para confirmação da exclusão, com javascript.
	- Criamos um include em pesquisa.
	- Para o bootstrap fazer aparecer o modal ele usa umas as formas como o "data":
	- Coloca <input type="hidden" name="_method" value="DELETE"></input>
	pois vai mapear no controller como delete, pois se colocar delete no formulario pode não aceitar.
	- Vamos mapear o metodo DELETE no controller:
	@RequestMapping(method = RequestMethod.DELETE)
	- Recebendo um codigo no path via delete vamos cair no metodo excluir, que vamos receber no parametro
	- Recebemos o codigo sem precisar converter para titulo porque já podemos excluir direto através do código:
	public void excluir(@PathVariable Long codigo) {
	titulos.delete(codigo);
	}
	- Até o momento estamos excluindo de forma estática, passaremos a excluir dinamicamente usando javascript, para pegar o codigo de cada uma delas junto com a descrição.
	- Criando o js:
	- Pegamos o id e toda vez que o evento show.bs.modal aconter vamos executar essa função:
	$('#confirmacaoExclusaoModal').on('show.bs.modal', function(event){
	
	});
	Documentação:  
	https://getbootstrap.com/docs/4.0/components/modal/
	- A execução da função:
	Pegamos o código através de um truque: th:attr="data-codigo=${titulo.codigo}"
	No js ele vai substituir "th:attr" por "data-codigo" daí podemos trata-lo no js
	No js vamos pegar o botão que disparou o evento recebido como parametro na função function(event):
	var button = $(event.relatedTarget);
	A variavel button é do tipo jquery daí podemos usar a função para pegar nosso código que veio nela, ou seja os atributos do data que foi definido anteriormente no html "data-codigo":
	var codigoTitulo = button.data('codigo');
	Para ver o codigo aparecendo no browser vemos aqui: alert(codigoTitulo); 
	- Teremos que adicionar o js na página:
	<script src="/js/cobranca.js"></script>  que por acaso foi colocado no LayoutPadrao
	- Iremos agora editar a url para tratarmos no js, para isso vamos pegar o modal e transformá-lo em um objeto do jquery:
	var modal = $(this);
	- E através desse objeto conseguimos pegar o formulario:
	var form = modal.find('form');
	- E através desse objeto tambem pegamos o action do formulario:
	var action = form.attr('action');   ou seja a nossa string que é a nossa url.
	- Daí usamos esse truque se a action não terminar com barra ('/') vamos colocar uma senão não colocamos:
	if(!action.endsWith('/')){
		action += '/';
	}
	- Esse truque evita uma url com duas barras evitando erros no js.
	- Agora no formulário em nosso atributo action vamos editar colocando o action + o codigo:
	form.attr('action', action + codigoTitulo);
	- Então teremos nossa url pronta ex: "/titulos/5" para fazer nosso submit, com o codigo correto para exclusão.
	- Para colocarmos uma mensagem personalizada do titulo que queremos excluir vamos pegar a descrição no js:
	var descricaoTitulo = button.data('descricao');
	- Para o html disponibilizar isso pra gente vamos separar por virgula mais um atributo na nossa página de pesquisa:
	th:attr="data-codigo=${titulo.codigo}, data-descricao=${titulo.descricao}">
	Fazendo com que deixemos disponível a descrição no nosso js.
	- No diálogo de confirmação vamos colocá-lo assim, acrescentando no nosso modal encontrado pela classe "modal-body" onde tiver um span substituiremos pelo html:
	'Tem certeza que deseja excluir o título <strong>' + descricaoTitulo + '</strong>?'
	Ou seja:
	modal.find('.modal-body span').html('Tem certeza que deseja excluir o título <strong>' + descricaoTitulo + '</strong>?');
	
	
	
	
	
	
		
	
	
	
		
		
	
	
	
	
	
	
	
	
	
	
		
	
