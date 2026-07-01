jest.mock('react-native-maps', () => {
  const React = require('react');
  const MapView = (props) => React.createElement('MapView', props, props.children);
  const Marker = (props) => React.createElement('Marker', props, props.children);
  return {
    __esModule: true,
    default: MapView,
    Marker,
    PROVIDER_GOOGLE: 'google',
  };
});

jest.mock('@react-native-firebase/app', () => {
  return {
    app: jest.fn(() => ({
      utils: jest.fn(() => ({})),
    })),
    apps: [],
    initializeApp: jest.fn(),
  };
});

jest.mock('@react-native-firebase/database', () => {
  return jest.fn(() => ({
    ref: jest.fn(() => ({
      on: jest.fn(),
      off: jest.fn(),
      once: jest.fn(),
      set: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      orderByChild: jest.fn(() => ({
        equalTo: jest.fn(() => ({
          once: jest.fn()
        }))
      }))
    })),
  }));
});

jest.mock('react-native-config', () => {
  return {
    FIREBASE_API_KEY: 'test-api-key',
    FIREBASE_PROJECT_ID: 'test-project',
    FIREBASE_APP_ID: 'test-app-id',
    FIREBASE_DATABASE_URL: 'https://test.firebaseio.com'
  };
});

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
    GestureHandlerRootView: View,
  };
});

jest.mock('@react-native-firebase/app', () => {
  return {
    app: jest.fn(() => ({
      utils: jest.fn(() => ({})),
    })),
    apps: [],
    initializeApp: jest.fn(),
    utils: jest.fn(() => ({
      FilePath: {
        PICTURES_DIRECTORY: 'PICTURES_DIRECTORY',
        DOCUMENT_DIRECTORY: 'DOCUMENT_DIRECTORY',
      },
    })),
  };
});

jest.mock('@react-native-firebase/auth', () => {
  return jest.fn(() => ({
    signInAnonymously: jest.fn(),
    onAuthStateChanged: jest.fn(),
  }));
});

jest.mock('@react-native-firebase/firestore', () => {
  return jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
        set: jest.fn(),
        update: jest.fn(),
      })),
    })),
  }));
});

jest.mock('@react-native-firebase/storage', () => {
  return jest.fn(() => ({
    ref: jest.fn(() => ({
      putFile: jest.fn(),
      getDownloadURL: jest.fn(),
    })),
  }));
});
