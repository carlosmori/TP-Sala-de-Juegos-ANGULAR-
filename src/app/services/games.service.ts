import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(
    public firestore: AngularFirestore // Inject Firestore service
  ) {}

  getAllGameResults({ gameId }) {
    const gameRef = this.firestore.collection<any>('results', (ref) =>
      ref.where('gameId', '==', gameId).orderBy('result', 'desc')
    );
    return gameRef.valueChanges();
  }
  getGameResultsById({ gameId, userId }) {
    const gameRef = this.firestore.collection<any>('results', (ref) =>
      ref.where('gameId', '==', gameId).where('userId', '==', userId)
    );
    return gameRef.valueChanges({ idField: 'resultId' });
  }
  updateScoreByUserId({ resultId, result }) {
    return this.firestore.collection('results').doc(resultId).set({ result }, { merge: true });
  }
  getGameIdByName({ name }) {
    const gameRef = this.firestore.collection<any>('games', (ref) => ref.where('name', '==', name));
    return gameRef.valueChanges({ idField: 'gameId' });
  }
  getGames() {
    const gameRef = this.firestore.collection<any>('games');
    return gameRef.valueChanges({ idField: 'gameId' });
  }
  createResult(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('results')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }
}
