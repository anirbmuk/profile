import { Inject, Injectable } from '@nestjs/common';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Firestore,
  OrderByDirection,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  WhereFilterOp,
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore';
import { FIREBASE_CONFIG } from './firebase.constants';
import { FirebaseConfig } from './firebase.types';

export interface FirestoreWhere {
  column: string;
  operator: WhereFilterOp;
  condition: unknown;
}

export interface FirestoreOrderBy {
  attr: string;
  dir: OrderByDirection;
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

@Injectable()
export class FirebaseService {
  private _app: FirebaseApp | null;
  constructor(
    @Inject(FIREBASE_CONFIG) private readonly config: FirebaseConfig,
  ) {
    this._app = this.initFirebaseApp(this.config);
  }

  initFirebaseApp(firebaseConfig: FirebaseConfig) {
    return initializeApp(firebaseConfig);
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
      endAt,
    );
    const data: T[] = [];
    fetchData.forEach((each) => data.push(each.data() as T));
    return data;
  }

  async fetchUnit<T>(query: Partial<FirestoreQuery>): Promise<T> {
    const { collections, keys } = query;

    const fetchData = await this._getUnitDataFromFireStore(collections, keys);

    if (fetchData.exists()) {
      return fetchData.data() as T;
    }
    return {} as T;
  }

  private _getUnitDataFromFireStore(
    collections: string[] | undefined,
    keys: string[] | undefined,
  ) {
    const db = this.getFirestoreDb(this._app);
    if (!collections || !collections[0]) {
      return Promise.reject('Collection cannot be empty');
    }
    if (collections?.length === 1) {
      if (!keys || !keys?.[0]) {
        return Promise.reject('Parent key path cannot be empty');
      } else if (keys?.[0]) {
        const collectionRootDocRef = doc(db, collections?.[0], keys?.[0]);
        return getDoc(collectionRootDocRef);
      }
    }
    if (collections.length === 2) {
      if (!collections?.[1]) {
        return Promise.reject('Child collection cannot be empty');
      }
      if (!keys?.[1]) {
        return Promise.reject('Child key path cannot be empty');
      } else {
        const collectionChilDocdRef = doc(
          db,
          `/${collections?.[0]}/${keys?.[0]}/${collections?.[1]}`,
          keys?.[1],
        );
        return getDoc(collectionChilDocdRef);
      }
    }
    return Promise.reject('Incorrect data set for firestore query');
  }

  private _getCollectionDataFromFireStore(
    collections: string[] | undefined,
    keys: string[] | undefined,
    whereClause?: FirestoreWhere[],
    orderByClause?: FirestoreOrderBy[],
    limitValue?: number,
    startAtValue?: string | number | Date | undefined,
    endAtValue?: string | number | Date | undefined,
  ) {
    const db = this.getFirestoreDb(this._app);
    if (collections.length === 1) {
      const collectionRootRef = collection(db, collections?.[0]);
      let collectionRootQuery = query(collectionRootRef);
      if (whereClause) {
        const clauses: QueryFieldFilterConstraint[] = [];
        whereClause.forEach((clause: FirestoreWhere) =>
          clauses.push(where(clause.column, clause.operator, clause.condition)),
        );
        collectionRootQuery = query(collectionRootRef, ...clauses);
      }
      if (orderByClause) {
        const clauses: QueryOrderByConstraint[] = [];
        orderByClause.forEach((clause: FirestoreOrderBy) =>
          clauses.push(orderBy(clause.attr, clause.dir)),
        );
        collectionRootQuery = query(collectionRootQuery, ...clauses);
      }
      if (!!limitValue && limitValue !== 0) {
        collectionRootQuery = collectionRootQuery = query(
          collectionRootQuery,
          limit(limitValue),
        );
      }
      if (startAtValue) {
        collectionRootQuery = query(collectionRootQuery, startAt(startAtValue));
      }
      if (endAtValue) {
        collectionRootQuery = query(collectionRootQuery, endAt(endAtValue));
      }
      return getDocs(collectionRootQuery);
    }
    if (collections?.length === 2) {
      if (!collections?.[1]) {
        return Promise.reject('Child collection cannot be empty');
      }
      if (!keys?.[0]) {
        return Promise.reject('Parent collection key cannot be empty');
      }
      const collectionChildRef = collection(
        db,
        `/${collections?.[0]}/${keys?.[0]}/${collections?.[1]}`,
      );
      let collectionRootQuery = query(collectionChildRef);
      if (whereClause) {
        const clauses: QueryFieldFilterConstraint[] = [];
        whereClause.forEach((clause: FirestoreWhere) =>
          clauses.push(where(clause.column, clause.operator, clause.condition)),
        );
        collectionRootQuery = query(collectionChildRef, ...clauses);
      }
      if (orderByClause) {
        const clauses: QueryOrderByConstraint[] = [];
        orderByClause.forEach((clause: FirestoreOrderBy) =>
          clauses.push(orderBy(clause.attr, clause.dir)),
        );
        collectionRootQuery = query(collectionRootQuery, ...clauses);
      }
      if (!!limitValue && limitValue !== 0) {
        collectionRootQuery = collectionRootQuery = query(
          collectionRootQuery,
          limit(limitValue),
        );
      }
      if (startAtValue) {
        collectionRootQuery = query(collectionRootQuery, startAt(startAtValue));
      }
      if (endAtValue) {
        collectionRootQuery = query(collectionRootQuery, endAt(endAtValue));
      }
      return getDocs(collectionRootQuery);
    }
    return Promise.reject('Incorrect data set for firestore query');
  }

  private getFirestoreDb(app: FirebaseApp): Firestore {
    return getFirestore(app);
  }
}
