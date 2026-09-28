import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonProgressBar, IonTitle, IonToolbar,IonItem, IonButton ,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput  } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular/standalone'; // Añade esto
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent,IonIcon, IonHeader,IonProgressBar, IonTitle, IonToolbar, CommonModule, FormsModule,IonItem, 
  IonButton ,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput ]
})
export class LoginPage implements OnInit {


  // variable para controlar la visibilidad del loader
  isLoading :  boolean = true;


  username: string = ''; // Declara e inicializa la propiedad username
  password: string = ''; // Declara e inicializa la propiedad password

  constructor(private authService: AuthService, private router: Router,  private navCtrl: NavController ) { }

  async ngOnInit() {

    // Espera 5 segundos para simular la carga de datos
    await new Promise (resolve => setTimeout(resolve,5000));

    // Cuando termina la carga , oculta la barra de progreso
    this.isLoading = false;


  }


  onLogin() {
    console.log("ok entra");

    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);

        if (response.success) { // Verifica si el login fue exitoso
          console.log('Inicio de sesión exitoso');


          // Guarda los datos del usuario en LocalStorage
          localStorage.setItem('currentUser', JSON.stringify(response.user));

          this.navCtrl.navigateForward('/home', {
            animationDirection: 'forward'
          }); // Navegación optimizada para Ionic

        } else {
          console.log('Credenciales incorrectas');
          // Puedes mostrar un mensaje de error al usuario
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        // Manejo de errores (ej: mostrar mensaje al usuario)
      }
    );
  }

}