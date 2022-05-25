import { Injectable } from '@nestjs/common';
import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import { FirebaseConfig } from '.';

export interface FirestoreWhere {
  column: string;
  operator: firebase.firestore.WhereFilterOp;
  condition: unknown;
}

export interface FirestoreOrderBy {
  attr: string;
  dir: firebase.firestore.OrderByDirection;
}

export interface FirestoreQuery {
  collections: string[];
  keys: string[];
  whereClause?: FirestoreWhere[];
  orderByClause?: FirestoreOrderBy[];
  limit?: number;
  startAt?: string | number | Date | undefined;
  endAt?: string | number | Date | undefined;
}

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

@Injectable()
export class FirebaseService {
  constructor() {
    this.initFirebaseApp(config);
  }

  initFirebaseApp(firebaseConfig: FirebaseConfig) {
    firebase.initializeApp(firebaseConfig);
  }

  async fetchCollection<T>(query: Partial<FirestoreQuery>): Promise<T[]> {
    const {
      collections,
      keys,
      whereClause,
      orderByClause,
      limit,
      startAt,
      endAt,
    } = query;

    const fetchData = await this._getCollectionDataFromFireStore(
      collections,
      keys,
      whereClause,
      orderByClause,
      limit,
      startAt,
      endAt
    );
    const data: T[] = [];
    fetchData.forEach((each) => data.push(each.data() as T));
    return data;
  }

  async fetchUnit<T>(query: Partial<FirestoreQuery>): Promise<T> {
    const { collections, keys } = query;

    const fetchData = await this._getUnitDataFromFireStore(collections, keys);

    if (fetchData.exists) {
      return fetchData.data() as T;
    }
    return {} as T;
  }

  private _getUnitDataFromFireStore(collections: string[], keys: string[]) {
    const db = this.getFirestoreDb();
    if (!collections || !collections[0]) {
      return Promise.reject('Collection cannot be empty');
    }
    if (collections.length === 1) {
      if (!keys || !keys[0]) {
        return Promise.reject('Parent key path cannot be empty');
      } else if (keys[0]) {
        const collectionRootDocRef = db.collection(collections[0]).doc(keys[0]);
        return collectionRootDocRef.get();
      }
    }
    if (collections.length === 2) {
      if (!collections[1]) {
        return Promise.reject('Child collection cannot be empty');
      }
      if (!keys[1]) {
        return Promise.reject('Child key path cannot be empty');
      } else {
        const collectionChilDocdRef = db
          .collection(collections[0])
          .doc(keys[0])
          .collection(collections[1])
          .doc(keys[1]);
        return collectionChilDocdRef.get();
      }
    }
    return Promise.reject('Incorrect data set for firestore query');
  }

  private _getCollectionDataFromFireStore(
    collections: string[],
    keys: string[],
    whereClause?: FirestoreWhere[],
    orderByClause?: FirestoreOrderBy[],
    limit?: number,
    startAt?: string | number | Date | undefined,
    endAt?: string | number | Date | undefined
  ) {
    const db = this.getFirestoreDb();
    if (!collections || !collections[0]) {
      return Promise.reject('Collection cannot be empty');
    }
    if (collections.length === 1) {
      const collectionRootRef = db.collection(collections[0]);
      let collectionRootQuery = collectionRootRef as firebase.firestore.Query;
      if (whereClause) {
        whereClause.forEach(
          (clause: FirestoreWhere) =>
            (collectionRootQuery = collectionRootQuery.where(
              clause.column,
              clause.operator,
              clause.condition
            ))
        );
      }
      if (orderByClause) {
        orderByClause.forEach(
          (clause: FirestoreOrderBy) =>
            (collectionRootQuery = collectionRootQuery.orderBy(
              clause.attr,
              clause.dir
            ))
        );
      }
      if (!!limit && limit !== 0) {
        collectionRootQuery = collectionRootQuery.limit(limit);
      }
      if (startAt) {
        collectionRootQuery = collectionRootQuery.startAt(startAt);
      }
      if (endAt) {
        collectionRootQuery = collectionRootQuery.endAt(endAt);
      }
      return collectionRootQuery.get();
    }
    if (collections.length === 2) {
      if (!collections[1]) {
        return Promise.reject('Child collection cannot be empty');
      }
      if (!keys?.[0]) {
        return Promise.reject('Parent collection key cannot be empty');
      }
      const collectionChildRef = db
        .collection(collections[0])
        .doc(keys[0])
        .collection(collections[1]);
      let collectionRootQuery = collectionChildRef as firebase.firestore.Query;
      if (whereClause) {
        whereClause.forEach(
          (clause: FirestoreWhere) =>
            (collectionRootQuery = collectionRootQuery.where(
              clause.column,
              clause.operator,
              clause.condition
            ))
        );
      }
      if (orderByClause) {
        orderByClause.forEach(
          (clause: FirestoreOrderBy) =>
            (collectionRootQuery = collectionRootQuery.orderBy(
              clause.attr,
              clause.dir
            ))
        );
      }
      if (!!limit && limit !== 0) {
        collectionRootQuery = collectionRootQuery.limit(limit);
      }
      if (startAt) {
        collectionRootQuery = collectionRootQuery.startAt(startAt);
      }
      if (endAt) {
        collectionRootQuery = collectionRootQuery.endAt(endAt);
      }
      return collectionRootQuery.get();
    }
    return Promise.reject('Incorrect data set for firestore query');
  }

  private initAnalytics(): firebase.analytics.Analytics {
    return firebase.analytics();
  }

  private getFirestoreDb(): firebase.firestore.Firestore {
    return firebase.firestore();
  }

  private getFirestoreStorage(): firebase.storage.Reference {
    return firebase.storage().ref();
  }
}
