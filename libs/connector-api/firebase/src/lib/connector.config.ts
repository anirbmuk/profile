import { FirebaseConfig, SharedConfig } from './configs';

export interface ConnectorConfig {
  firebaseConfig: FirebaseConfig;
  shared?: SharedConfig;
}
