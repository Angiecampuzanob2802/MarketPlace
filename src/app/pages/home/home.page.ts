import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButton, IonFooter, IonTabBar, IonTabButton,
IonIcon, IonLabel, IonButtons, NavController, IonMenuButton, IonToast} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonButton,
    IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel, IonButtons, IonMenuButton, IonToast]
})
export class HomePage implements OnInit {

  user : any; // variable para almacenar los datos 
  constructor(private navCtrl: NavController) { }

  ngOnInit() {

    this.loadUserData();

  }


  loadUserData()
  {
      const userData = localStorage.getItem('currentUser');
      this.user = userData ? JSON.parse(userData) :  null;
      console.log("user ->> " ,this.user);
  }

  goToMisProductos() {
  this.navCtrl.navigateForward('/products'); // Asegúrate que la ruta esté bien definida en tu router
}


  logout(){
    // Elimina los datos y redirige al login
    localStorage.removeItem('currentUser');
    this.navCtrl.navigateRoot('/login');
  }

}
