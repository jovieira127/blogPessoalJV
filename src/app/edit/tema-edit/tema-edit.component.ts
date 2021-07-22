
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaservice: TemaService,
    private router: Router,
    private route: ActivatedRoute

  ) {}

  ngOnInit(){
    if(environment.token ==''){
      alert('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
  }

  findByIdTema(id: number){
this.temaservice.getByIdTema(id).subscribe((resposta: Tema)=>{
  this.tema = resposta
})
}

atualizar(){
  this.temaservice.putTema(this.tema).subscribe((resposta: Tema)=>{
    this.tema = resposta
    alert('Tema atualizado com sucesso!')
    this.router.navigate(['/tema'])
  })
}

}
