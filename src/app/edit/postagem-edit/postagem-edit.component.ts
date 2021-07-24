import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()

  idTema: number

  listaTemas: Tema[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if (environment.token == '') {
      alert('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']
    this.postagemService.refreshToken()
    this.temaService.refreshToken()
    this.authservice.refreshToken()
    this.findByIdPostagem(id)
    this.findAllTemas()
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resposta: Postagem) => {
      this.postagem = resposta
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resposta: Tema) => {
      this.tema = resposta
    })
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resposta: Tema[]) => {
      this.listaTemas = resposta
    })
  }

  atualizar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.postagemService.putPostagem(this.postagem).subscribe((resposta: Postagem) => {
      this.postagem = resposta
      alert('Postagem atualizada com sucesso!')
      this.router.navigate(['/inicio'])
    })

  }

}
