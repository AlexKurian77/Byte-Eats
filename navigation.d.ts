// src/navigation.d.ts or just navigation.d.ts

import { RootStackParamList } from './types'; // adjust path if needed

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
