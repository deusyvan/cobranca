$('#confirmacaoExclusaoModal').on('show.bs.modal', function(event){
	
	var button = $(event.relatedTarget);
	
	var codigoTitulo = button.data('codigo');
	var descricaoTitulo = button.data('descricao');
	var modal = $(this);
	
	var form = modal.find('form');
	
	var action = form.data('url-base');
	
	if(!action.endsWith('/')){
		action += '/';
	}
	
	form.attr('action', action + codigoTitulo);
	
	modal.find('.modal-body span').html('Tem certeza que deseja excluir o título <strong>' + descricaoTitulo + '</strong>?');
});

$(function(){
	$('[rel="tooltip"]').tooltip();
	$('.js-currency').maskMoney({decimal: ',', thousands: '.', allowZero: true});
	
	$('.js-atualizar-status').on('click', function(event){
		event.preventDefault();
	//	console.log('clicou');
		var botaoReceber = $(event.currentTarget);
		var urlReceber = botaoReceber.attr('href');
	//	console.log('urlReceber', urlReceber);
		
		var response = $.ajax({
								url: urlReceber,
								type: 'PUT', //Para uma atualização
								
						});
		response.done(function(e){
			
		});
		
		response.fail(function(e){
			console.log(e);
			alert('Erro recebendo a cobrança');
		});
	});
});




