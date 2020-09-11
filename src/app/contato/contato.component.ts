import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';

import { ContatoService } from '../contato.service'

import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['id', 'nome', 'email', 'favorito']

  constructor(
    private fb: FormBuilder,
    private service: ContatoService,
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })

    this.listarContatos();
  }

  listarContatos(){
    this.service.list().subscribe( resposta =>{
      this.contatos = resposta;
    })
  }

  favoritar(contato: Contato){
    contato.favorito = !contato.favorito;
  }

  submit(){
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    this.service.save(contato).subscribe( resposta => {
      let lista: Contato[] = [ ...this.contatos, resposta]
      this.contatos = lista;
    })
    
  }

}
