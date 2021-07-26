import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
 
  user: User = new User()
  confirmaSenha: string
  tipoUsuario: string
  idUsuario: number
 

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token ==''){
      alert('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
    }
    this.idUsuario = this.route.snapshot.params['id']
    this.authService.refreshToken()
    this.findByIdUsuario(this.idUsuario)
  }

  confirmSenha(event: any) {
    this.confirmaSenha = event.target.value
  }
  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  findByIdUsuario(id: number){
    this.authService.getByIdUsuario(id).subscribe((resposta: User)=>{
      this.user = resposta
    })
  }


  atualizar() {
    this.user.tipo = this.tipoUsuario
    if (this.user.senha != this.confirmaSenha) {
      alert('A senhas são diferentes.')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        alert('Usuário atualizado com sucesso!')
        alert('Faça o login novamente.')
        environment.token = ''
        environment.nome = ''
        environment.id = 0
        environment.foto = ''
        this.router.navigate(['/entrar'])
      })
    }

  }

}
