import React from 'react';
import {
  View,
  ViewProps,
  ScrollViewProps,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';

export interface ScreenContainerProps extends Omit<ViewProps, 'style'>, Omit<ScrollViewProps, 'style' | 'contentContainerStyle'> {
  scrollable?: boolean;
  padding?: boolean;
  keyboardAvoid?: boolean;
  safeArea?: boolean | { top?: boolean; bottom?: boolean };
  children: React.ReactNode;
  style?: ViewProps['style'] | ScrollViewProps['style'];
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  scrollable = false,
  padding = true,
  keyboardAvoid = true,
  safeArea = true,
  style,
  contentContainerStyle,
  children,
  ...props
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const getSafeAreaPadding = () => {
    let paddingTop = 0;
    let paddingBottom = 0;

    if (safeArea === true) {
      paddingTop = insets.top;
      paddingBottom = insets.bottom;
    } else if (typeof safeArea === 'object') {
      if (safeArea.top) paddingTop = insets.top;
      if (safeArea.bottom) paddingBottom = insets.bottom;
    }

    return { paddingTop, paddingBottom };
  };

  const containerStyle = {
    flex: 1,
    backgroundColor: theme.colors.background,
    ...getSafeAreaPadding(),
  };

  const contentStyle = {
    flexGrow: 1,
    padding: padding ? theme.spacing[16] : 0,
  };

  const renderContent = () => {
    if (scrollable) {
      return (
        <ScrollView
          contentContainerStyle={[contentStyle, contentContainerStyle || style as any]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          {...(props as Omit<ScrollViewProps, 'style' | 'contentContainerStyle'>)}
        >
          {children}
        </ScrollView>
      );
    }

    return (
      <View style={[contentStyle, style as any]} {...(props as ViewProps)}>
        {children}
      </View>
    );
  };

  if (keyboardAvoid) {
    return (
      <KeyboardAvoidingView
        style={containerStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {renderContent()}
      </KeyboardAvoidingView>
    );
  }

  return <View style={containerStyle}>{renderContent()}</View>;
};
