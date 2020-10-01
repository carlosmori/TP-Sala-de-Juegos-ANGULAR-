import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any;
  usersCollection: any;
  constructor(private firestore: AngularFirestore, private authService: AuthService) {
    this.usersCollection = this.firestore.collection<any>('users');
  }

  listUsers() {
    return this.authService.userData;
  }
  public saveUser() {
    return;
    // const { uid, displayName, photoURL, email } = this.authService.userData;
    // return this.firestore
    //   .collection('users')
    //   .add({ uid, name: displayName, sexo: 'Masculino', cuit: '20192871868', photoURL, email });
  }
  public getUsers() {
    return this.usersCollection.valueChanges();
  }
}
