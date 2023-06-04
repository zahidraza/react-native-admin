import { isEmpty } from 'lodash';
import * as React from 'react';

import { Modal, Text, Pressable, View, ScrollView, StyleSheet } from 'react-native';

import { useStore } from '@jazasoft/react-native-admin';
import type { Notification } from '@jazasoft/react-native-admin';

const NotificationModal = () => {
  const [notification, setNotification] = useStore<Notification>('@notification');
  const visible = !isEmpty(notification);
  const { title, message, timeout = 4000 } = notification || {};

  React.useEffect(() => {
    let timeoutID: any;
    if (visible) {
      timeoutID = setTimeout(() => {
        setNotification({});
      }, timeout);
    }

    return () => {
      timeoutID && clearTimeout(timeoutID);
    };
  }, [visible, timeout, setNotification]);

  const handleClose = () => {
    setNotification({});
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={handleClose}>
      <View style={styles.centeredView}>
        <View style={styles.container}>
          {title && <Text style={styles.title}>{title}</Text>}
          {message && (
            <ScrollView>
              <Text style={styles.message}>{message}</Text>
            </ScrollView>
          )}

          <Pressable style={[styles.button]} onPress={handleClose}>
            <Text style={styles.buttonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 2,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  message: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    marginTop: 12,
    marginBottom: 6,
    display: 'flex',
    alignItems: 'flex-end',
  },
  buttonText: {
    fontSize: 16,
    color: '#1e88e5',
  },
});
