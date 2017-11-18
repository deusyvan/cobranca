$('#confirmacaoExclusaoModal').on('show.bs.modal', function(event){
	
	var button = $(event.relatedTarget);
	
	var codigoTitulo = button.data('codigo');
	
	alert(codigoTitulo); 
	
});