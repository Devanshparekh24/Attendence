import React, { useState, useEffect } from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { registerAlert } from '../../utils/CustomAlert';

const GlobalAlert = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    registerAlert((t, m) => {
      setTitle(t);
      setMessage(m);
      setVisible(true);
    });
  }, []);

  return (
    <Portal 
    style={{ backgroundColor: 'white' }}
    >
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title style={{ fontWeight: 'bold'}}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default GlobalAlert;
