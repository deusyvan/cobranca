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
	- Agora vamos adicionar uma mensagem que o titulo foi excluído com sucesso, apenas colocando um
	attributes como parametro no metodo excluir do nosso controller e chamando a mensagem:
	attributes.addFlashAttribute("mensagem", "Titulo excluído com sucesso!");
	E na tela de pesquisa vamos colocar a renderização da mensagem como no cadastro:
	<div layout:include="Mensagem"></div>
	É claro que teremos outro tipo de html para mensagens excluídas:
	Faremos algumas alterações para isso nos dois html das mensagens dividindo suas funções.
	- A função do atributo tabindex com o valor -1:
	É para que a tag não seja levada em consideração quando o usuário clicar na tecla "TAB". 
	Mas, não afeta o funcionamento da aplicação.
	O tabindex=0 coloca o elemento para receber o foco na ordem em que ele está na página.
	- Para colocar o botão X para fechar o Dialog, podemos usar um button assim:
	<button type="button" class="close" data-dismiss="modal"
	   aria-label="Close">
	     <span aria-hidden="true">&times;</span>
	</button>
	O mesmo funcionaria para fechar os alerts, apenas temos que mudar o data-dismiss para alert. 
	- Para os alerts fecharem sozinhos depois de um tempo:
	http://stackoverflow.com/questions/23101966/bootstrap-alert-auto-close
	- Outra forma:
	/* Botão fechar no dialog... ;-) */
	<div class="modal-header">
	   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	      <span aria-hidden="true">&times;</span>
	   </button>
	   <h4 class="modal-title">Você tem certeza?</h4>
	</div>
	- Arrumando o codigo do curso para o botao excluir:
	 <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
         <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="modal-title">Você tem certeza?</h4>
   	</div>

# CORRIGINDO BUG EXCLUSÃO
	- Vamos definir uma url básica no nosso data do html e chamá-ĺa no js, ou seja mudamos o action:
	<form th:attr="data-url-base='/titulos'" method="POST">
	- Mudamos a forma de carregar o action no js:
	var action = form.data('url-base');
	
# COMPONENTE TOOLTIP
	- Usando o tooltip do bootstrap ver na documentação, lembrando que já estamos usando data-toogle no modal, usaremos outro atributo: 
	title="Editar" rel="tooltip" data-placement="top"
	- Teremos que ativa via javascript:
	Vamos criar uma função dentro do componente jquery:
	$(function(){
	
	});
	- Nesta função quando carregar a página ele vai procurar os componentes e faça o tooltip:
	
	$(function(){
				$('[rel="tooltip"]').tooltip();
	});
	
# PLUGIN PARA CALENDÁRIO
	- bootstrap-datepicker: 	
	Baixar três arquivos no  Edit on GitHub: 
	https://github.com/uxsolutions/bootstrap-datepicker/blob/master/docs/index.rst
		-	bootstrap-datepicker.min.js
		-	bootstrap-datepicker.pt-BR.min.js
		-	bootstrap-datepicker.standalone.min.css
	- Agora vamos configura-los:
	importando-os no LayoutPadrão: 
	<link rel="stylesheet" type="text/css" href="/css/bootstrap-datepicker.standalone.min.css"/>
	<script src="/js/bootstrap-datepicker.min.js"></script>
	<script src="/js/bootstrap-datepicker.pt-BR.min.js"></script>
	- Após vamos configurar editando a pagina de cadastro com alguns atributos na data:
	<input type="text" class="form-control"	id="dataVencimento" th:field="*{dataVencimento}"
		data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-language="pt-BR"
		data-date-autoclose="true"  data-date-today-higlight="true"/>
	- Agora vamos tratar a DataException:
		- Primeiro no metodo salvar (controller) vamos colocar em volta de um try cath,
		
# 	MÁSCARA DE ENTRADA DE VALORES
	- Vamos baixar o jquery:
	https://github.com/plentz/jquery-maskmoney/tree/master/dist
	- Importar no LayoutPadrão:
	<script src="/js/jquery.maskMoney.min.js"></script>
	- Na documentação vemos como se faz a chamada que é por um id da tag no html,
	mas iremos fazer a chamada por uma classe css.
	<input type="text" class="form-control js-currency" id="valor" th:field="*{valor}"/>
	- js-currency: Classe de marcação que poderá ser chamada por um js.
	- No js onde: $('.js-currency').maskMoney(); quer dizer encontre todas as classes com esse nome
	e passe a função maskMoney(), e ainda iremos passar algumas opções, onde no demo podemos ver esses exemplos: 
	decimal no Br é ","
	thousands (separador de milhar) no Br é "."
	allowZero:true para permitir deixar um zero
	$('.js-currency').maskMoney({decimal: ',', thousands: '.', allowZero: true});
	- No caso para colocar somente números:
	$(SELETOR).maskMoney({ thousands: '', allowZero: true, precision: 0 });
	- Ver este plugin que pode melhorar a questão das datas:
	https://igorescobar.github.io/jQuery-Mask-Plugin/
	
# CAMADA DE SERVIÇO
	- Adicionando a camada de serviço: Regras de negócio
	Fica entre o controller e acessar o repositório.
	- Evitar colocar regras no controller
	- Quando se faz uma consulta no repositorio e daí não vai fazer mais nada lá na frente, podemos colocar no controle para excutar, mas se tiver mais iterações, claro mai para o service.
	- Criamos nossa classe de serviço anotada com @Service para indicar que esta classe é um serviço e que possui regras de negócio.
	- Injetamos o serviço no controller, para o Spring conseguir injetar:
	@Autowired
	private CadastroTituloService cadastroTituloService;
	- A anotação na classe é para que o spring localize o serviço e fazer alguma coisa, tem que ter no mínimo uma anotação como a @Component para poder conseguir injetar, mas como sendo uma classe de serviço: @Service.
	- Passamos a mudar de titulos.save para cadastroTituloService.salvar ou seja passando o isso ao serviço.
	- Melhorando o código vamos pegar a excessão para o método salvar em service:
		public void salvar(Titulo titulo) {
			try {
				titulos.save(titulo);
			} catch (DataIntegrityViolationException e) {
				throw new IllegalArgumentException("Formato de data inválido!.");
			}
		}
	- Como não temos nenhuma regra específica para salvar o título então passamos a excessão para o método salvar no service e lançamos uma excessão IllegalArgumentException que é capturada no controller e a msg do serviço:
		try {
				cadastroTituloService.salvar(titulo);//Chamando a camada de serviço
				attributes.addFlashAttribute("mensagem", "Titulo salvo com sucesso!");
				return "redirect:/titulos/novo";//Redirect para uma url
			} catch (IllegalArgumentException e) {//Passamos a buscar o IllegalArgumentException
				errors.rejectValue("dataVencimento", null, e.getMessage());
				return CADASTRO_VIEW;
			}
	- Ou seja passamos uma regra de capturar uma excessão da DAO DataIntegrityViolationException que está relacionado a banco de dados de baixo nível e lançamos uma de alto nível para a camada do controller trabalhar.
	- Vamos também passar o excluir, retirando o delete do controller e levando ao service:
		Controller:
		@RequestMapping(value="{codigo}", method = RequestMethod.DELETE)
		public String excluir(@PathVariable Long codigo, RedirectAttributes attributes) {
			cadastroTituloService.excluir(codigo);
			attributes.addFlashAttribute("mensagem", "Titulo excluído com sucesso!");
			return "redirect:/titulos";
		}
		Service:
		public void excluir(Long codigo) {
				titulos.delete(codigo);
			}

# RECEBENDO O TÍTULO COM AJAX - PARTE 1
	- Colcaremos o ícone na página de pesquisa:
	<a class="btn btn-link btn-xs" title="Receber" rel="tooltip" data-placement="top">
	   		<span class="glyphicon glyphicon-check"></span>
	</a>
	- Trabalharemos com a tag th:if para renderizar o botão somente onde houver pendente:
	th:if="${titulo.pendente}"
	- Criaremos uma classe de marcação para executar uma função em nosso cobrança.js:
	js-atualizar-status
	- Na função dizemos que qualquer elemento que possuir a a classe vai realizar o seguinte:
	$('.js-atualizar-status').on('click', function(event){
	//	alert('clicado!');
		console.log('clicou');
	});
	Apenas mostrando na tela que o ícone foi clicado.
	- Vamos definir uma url para chamar no controle, uma que recebe o status
	No Controller precisamos saber qual é a url:
	@RequestMapping(value="????url????")
	public void receber(Long codigo) {
		
	}
	- Tal url seria mais ou menos assim:
	th:rel="/titulos/{codigo}/receber"
	Uma atualização em titulos pelo codigo que será receber. Não será via "GET" e sim "PUT", JS e AJAX
	- Aproveitando o thymeleaf usando o codigo que é um parametro variável:
	th:rel="@{/titulos/{codigo}/receber(codigo=${titulo.codigo})}"
	- A url estando correta, mas ainda não foi mapeada, se clicar vai dar erro 404, no js vamos tirar
	o comportamento default do link através do event para não encaminhar aquele link:
	event.preventDefault();
	- Vamos pegar no botão a url através do link no nosso js:
	var botaoReceber = $(event.currentTarget); //Botão
	var urlReceber = botaoReceber.attr('href'); //Url
	Com essa url vamos fazer a requisição ajax.
	- Diferença entre event.relatedTarget  e event.currentTarget:
	O relatedTarget seria o elemento que perdeu a ação que o elemento atual está recebendo:
	http://jsfiddle.net/uTe99/229/
	- Inserir uma mensagem para aparecer ao lado da interrogação do alert: ! Mensagem de alerta:
	<div class="alert alert-danger" th:if="${#fields.hasAnyErrors()}">
	    <div>
			<span class="glyphicon glyphicon-exclamation-sign"></span>
			<div th:each="detailedError : ${#fields.detailedErrors()}" th:remove="tag">
				<span th:text="${detailedError.message}"></span>
			</div>
	    </div>
	</div>
	- Atalhos do eclipse: 
	http://blog.algaworks.com/atalhos-e-configuracoes-para-ganhar-produtividade-com-eclipse/
	
# RECEBENDO O TÍTULO COM AJAX - PARTE 2
	- Vamos entrar no jquery com ajax para receber no servidor a requisição através de controle via ajax:
	$.ajax({
			
		});
	- Essa função vai devolver um objeto que chamaremos de response:
	var response = $.ajax({
			
						});
	- Poderemos adicinar outras funções se der certo ou errado, para configurar precisamos de alguns parametros:
	url : onde vai enviar a requisição
	type:  tipo da requisição (via PUT, POST, GET):
	url: urlReceber,
	type: 'PUT',
	- No controller vamos dizer como vamos tratar através do método:
	@RequestMapping(value="/{codigo}/receber", method = RequestMethod.PUT)
	public String receber(@PathVariable Long codigo) {
		System.out.println(">>>> codigo: " + codigo);
		return "OK";
	}
	Mostrando no console o codigo, prova que chegou no servidor e retornando um erro pois não existe 
	a view OK.
	- Mas como não vamos mandar para uma outra view nem mesmo para a mesma tela, porque estamos fazendo
	uma requisição via ajax, o que quero receber de volta é uma mensagem que deu certo ou alguma
	informação que desejamos atualizar na tela, então para não retornar uma view e retornar apenas uma
	string que eu consiga trabalhar no JS iremos fazer uma anotação @ResponseBody:
	public @ResponseBody String receber(@PathVariable Long codigo) {
		System.out.println(">>>> codigo: " + codigo);
		return "OK";
	}
	O Spring entende com isso que estamos querendo apenas retornar essa string como o corpo da resposta
	e não uma view.
	- Retornando uma string "OK" e podemos ter ainda mais parametros tambem.
	- Passaremos a regra de atualizar o status para um serviço:
	cadastroTituloService.receber(codigo);
	- No Service implementamos essa regra recuperando o titulo que tem o codigo, alterando o status e
	salvando o titulo:
	public void receber(Long codigo) {
		Titulo titulo = titulos.findOne(codigo);
		titulo.setStatus(StatusTitulo.RECEBIDO);
		titulos.save(titulo);
	}
	Com isso conseguimos ir no banco e atualizar status, mas para ver isso precisamos dar um refresh na
	tela para ver essa atualização.
	- Vamos fazer com que o js atualize o status na página automaticamente.
	- No js se deu certo vamos pegar o response e implementar uma função:
	response.done(function(e){
			
		});
	- Se deu errado implementamos outra função:
	response.fail(function(e){
			
		});
	- Para a falha:
	console.log(e);
	alert('Erro recebendo a cobrança');
	- Para o sucesso, atualizaremos a página ocultando o botão de receber:
		botaoReceber.hide();
	- Para atualizar o status precisamos recuperar o titulo, iremos trocar o span da página de pesquisa
	iremos atribuir o código do titulo para cada status da tabela através de um atributo dentro do 
	html (thymeleaf):
	data-role
	Significa que a regra para escolhermos esse cara é pelo código:
	"data-role=${titulo.codigo}"
	- Com isso agora podemos usá-lo no nosso js para atualizar o html, vamos selecionar o codigo 
	colocando o titulo.codigo tambem no botao, para não precisarmos recuperar ele pela url, fazendo um
	parse:
	th:attr="data-codigo=${titulo.codigo}"
	- Então recuperamos ele mais facilmente pelo botão receber:
	var codigoTitulo = botaoReceber.data('codigo');
	- Levamos o seletor para o td que iremos trabalhar:
	$('[data-role=' + codigoTitulo + ']');
	Substituindo por uma função html alterando nossa página:
	$('[data-role=' + codigoTitulo + ']').html('<span class="label label-success">Recebido</span>');
	- Para tirarmos o valor statico "Recebido" pegaremos ele do java. 
	- Através da string que o servidor nos retorna "OK" iremos receber do parametro da função o "e":
	response.done(function(e){ ...
	E concatenamos ele no html que vamos atualizar:
	$('[data-role=' + codigoTitulo + ']').html('<span class="label label-success">' + e + '</span>');
	- No Controller, ao invés de retornar o "OK" vamos fazer com que o service retorne isso pra gente:
	@RequestMapping(value="/{codigo}/receber", method = RequestMethod.PUT)
	public @ResponseBody String receber(@PathVariable Long codigo) {
		return cadastroTituloService.receber(codigo);
	}
	- Alteramos então o service pra retornar nossa string:
	public String receber(Long codigo) {
		Titulo titulo = titulos.findOne(codigo);
		titulo.setStatus(StatusTitulo.RECEBIDO);
		titulos.save(titulo);
		
		return StatusTitulo.RECEBIDO.getDescricao();
	}
	- Também podemos recuperar a string assim:
	return titulo.getStatus().getDescricao();
	- Outras consultas ajax:
	//Consulta o webservice viacep.com.br/
    $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(data){
            if (!("erro" in data)) {
                       // Aqui atualizar os campos do formulario
                       // Logradouro, Bairro, Municipio.... 
            			alert("Logradouro", data.logradouro );
            		} else {
            			alert("CEP não encontrado.");
            		}
     });
	- Significado de:
	var Brewer = Brewer || {};
	Esse é o operador "ou" normal mesmo, o que ele faz na inicialização da variável do JavaScript é
	dizer "caso a expressão do lado esquerdo não exista, use a do lado direito", ou seja, caso Brewer
	não esteja já inicializado (em outro arquivo por exemplo), iniciamos um novo objeto {}.
	
# STATUS SELECIONADO NA EDIÇÃO
	- Apenas faltava o th:field
	
# PROTÓTIPO DA CAIXA DE PESQUISA
	- Inserindo uma caixinha, campo de busca para a pesquisa que será submetido por um formulário via get:
		<form action="GET" class="form-horizontal">
	   			<div class="form-group">
	   				<div class="col-sm-4">
	   					<div class="input-group">
	   						<input></input>
	   						<span class="input-group-btn">
	   							<button type="submit" class="btn btn-default">
	   								<i class="glyphicon glyphicon-search"></i>
	   							</button>
	   						</span>
	   					</div>
	   				</div>
	   			</div>
	   		</form>
	- Corrigindo o input e colocando o placeholder="" e o autofocus=""
	<input class="form-control" placeholder="Qual o título você está procurando?" 	autofocus="autofocus"></input>

# IMPLEMENTANDO A PESQUISA
	- No método pesquisar precisamos receber uma string "descrição" colocando no input:
	name="descricao"
	- No Controlador colocamos como parâmetro no método pesquisar para recebermos a descrição:
	public ModelAndView pesquisar(String descricao) { ...
	- Não vamos mais precisar do findAll, no spring data JPA temos um recurso de criar uma pesquisa conforme a documentação de referência:
	https://docs.spring.io/spring-data/jpa/docs/2.0.1.RELEASE/reference/html/
	Podemos ver as várias possibilidades de pesquisa: 
	https://docs.spring.io/spring-data/jpa/docs/2.0.1.RELEASE/reference/html/#jpa.query-methods
	Temos na interface uma descrição do método, o spring data jpa vai montar a consulta de acordo com a consulta montada
	vemos uma tabela com estas formas. Vários padrões para seguir.
	- Vamos usar no repositorio Titulos a procura pela descrição contendo em qualquer posição a string de parametro:
	public List<Titulo> findByDescricaoContaining(String descricao);
	- Lançaremos no nosso controller no lugar de findAll:
	titulos.findByDescricaoContaining(descricao);
	
	
	
	
	
	
	 
	
	
	
	
	
	
	
	
	
	