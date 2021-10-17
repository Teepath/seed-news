import * as React from 'react';
import { Button } from 'react-native-paper';

export default function FancyButton(props) {
  return <Button theme={{ fonts: { medium: 'Open Sans' } }} {...props} />;
}