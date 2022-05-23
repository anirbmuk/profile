import { Injectable } from '@angular/core';
import { Inject } from '@nestjs/common';
import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import { FirebaseConfig, FIREBASE_CONFIG } from './configs';

export interface FirestoreWhere {
  column: string;
  operator: firebase.firestore.WhereFilterOp;
  condition: unknown;
}

export interface FirestoreOrderBy {
  attr: string;
  dir: firebase.firestore.OrderByDirection;
}

@Injectable()
export class FirebaseService {
  constructor(
    @Inject(FIREBASE_CONFIG) readonly firebaseConfig: FirebaseConfig
  ) {
    this.initFirebaseApp(firebaseConfig);
  }

  initFirebaseApp(firebaseConfig: FirebaseConfig) {
    firebase.initializeApp(firebaseConfig);
  }
}
