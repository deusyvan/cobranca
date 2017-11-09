package com.algaworks.cobranca.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.algaworks.cobranca.model.Titulo;

@Controller
public class TituloController {

	@RequestMapping("titulos/novo")
	public String novo() {
		return "CadastroTitulo";
	}
	
	@RequestMapping(value = "/titulos", method = RequestMethod.POST)
	public void salvar(Titulo titulo) {
		
	}
}
