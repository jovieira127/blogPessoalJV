
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  postagem: Postagem = new Postagem()
  listaTemas: Tema[]
  listaPostagens: Postagem[]
  idTema: number
  tema: Tema = new Tema

  usuario: User = new User
  idUsuario = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authservice: AuthService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token ==''){
      alert('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
    }

    this.postagemService.refreshToken()
    this.temaService.refreshToken()
    this.authservice.refreshToken()
    this.findAllTemas()
    this.findAllPostagens()
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resposta: Tema[])=>{
      this.listaTemas = resposta
    })
  }

  findAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resposta: Postagem[])=>{
      this.listaPostagens = resposta
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resposta: Tema)=>{
      this.tema = resposta
    })
  }

  findByIdUsuario(){
    this.authservice.getByIdUsuario(this.idUsuario).subscribe((resposta: User)=>{
      this.usuario = resposta
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    console.log(this.idTema)

    this.postagemService.postPostagem(this.postagem).subscribe((resposta: Postagem)=>{
      this.postagem = resposta
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.findAllPostagens()
    })
  }



}
