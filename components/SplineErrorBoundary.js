import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export class SplineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(_error, _errorInfo) {
    // Silently caught — fallback UI is rendered via getDerivedStateFromError
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('spline-error'));
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box display="flex" w="100%" h="100%" alignItems="center" justifyContent="center">
          <Text color="gray.500" opacity={0.6} fontSize="sm">
            {/* Fail silently by just showing a generic offline fallback or empty box */} 
            [3D Scene unavailable]
          </Text>
        </Box>
      );
    }
    return this.props.children;
  }
}
