import * as React from 'react';
import axios from 'axios';

import { Alert } from 'react-native';
import { Box, Input, Button, useToast } from 'native-base';
import { useTheme } from '@react-navigation/native';

import { useAuthUrl, useSafeState, useTranslate } from '@jazasoft/react-native-admin';

const ForgotPasswordScreen = ({ navigation }) => {
  const translate = useTranslate();
  const theme = useTheme();
  const toast = useToast();
  const authUrl = useAuthUrl();

  const [busy, setBusy] = useSafeState(false);
  const [formValues, setFormValues] = useSafeState({ action: 'send_otp', username: null, otp: null, newPassword: null, confirmPassword: null });

  const onSubmit = async () => {
    const { action, username, otp, newPassword, confirmPassword } = formValues;
    //validate
    if (action === 'send_otp' && !username) {
      toast.show({ description: 'Employee ID required' });
      return;
    } else if (action === 'confirm_otp' && !otp) {
      toast.show({ description: 'OTP required' });
      return;
    } else if (action === 'change_password') {
      if (!newPassword || !confirmPassword) {
        toast.show({ description: 'New Password required' });
        return;
      } else if (!confirmPassword) {
        toast.show({ description: 'Confirm Password required' });
        return;
      } else if (newPassword.trim().length < 4) {
        toast.show({ description: 'Password must be of minimum 4 characters.' });
        return;
      } else if (newPassword !== confirmPassword) {
        toast.show({ description: 'Passwords do not match' });
        return;
      }
    }

    setBusy(true);
    const options = {
      url: `${authUrl}/api/users/forgotPin`,
      method: 'put',
      params: { action, username, otp, newPassword },
    };

    try {
      const response = await axios(options);
      if (action === 'send_otp') {
        toast.show({ description: response.message });
        setFormValues((prev) => ({ ...prev, action: 'confirm_otp' }));
        setBusy(false);
      } else if (action === 'confirm_otp') {
        setFormValues((prev) => ({ ...prev, action: 'change_password' }));
        setBusy(false);
      } else if (action === 'change_password') {
        toast.show({ description: 'Password change successful.' });
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        Alert.alert('User Not Found', 'Invalid username. User does not exist in database.');
      } else {
        toast.show({ description: error.response?.message || error.message || JSON.stringify(error) });
        setBusy(false);
      }
    }
  };

  return (
    <Box p={['3', '4']} pt="6">
      {formValues.action === 'send_otp' && (
        <Input
          _dark={{ borderColor: 'coolGray.400', placeholderTextColor: 'coolGray.400' }}
          bgColor={theme.colors.card}
          placeholder={translate('auth.label.username')}
          value={formValues.username}
          onChangeText={(text) => setFormValues((prev) => ({ ...prev, username: text }))}
          returnKeyType="done"
        />
      )}
      {formValues.action === 'confirm_otp' && (
        <Input
          _dark={{ borderColor: 'coolGray.400', placeholderTextColor: 'coolGray.400' }}
          bgColor={theme.colors.card}
          placeholder={translate('auth.label.otp')}
          value={formValues.otp}
          onChangeText={(text) => setFormValues((prev) => ({ ...prev, otp: text }))}
          returnKeyType="done"
        />
      )}
      {formValues.action === 'change_password' && (
        <Input
          _dark={{ borderColor: 'coolGray.400', placeholderTextColor: 'coolGray.400' }}
          bgColor={theme.colors.card}
          type={'password'}
          placeholder={translate('auth.label.new_password')}
          value={formValues.newPassword}
          onChangeText={(text) => setFormValues((prev) => ({ ...prev, newPassword: text }))}
          returnKeyType="next"
        />
      )}
      {formValues.action === 'change_password' && (
        <Input
          mt="3"
          _dark={{ borderColor: 'coolGray.400', placeholderTextColor: 'coolGray.400' }}
          bgColor={theme.colors.card}
          type={'password'}
          placeholder={translate('auth.label.confirm_new_password')}
          value={formValues.confirmPassword}
          onChangeText={(text) => setFormValues((prev) => ({ ...prev, confirmPassword: text }))}
          returnKeyType="done"
        />
      )}

      <Button onPress={onSubmit} isLoading={busy} isLoadingText={translate('action.submit')} mt="4">
        {translate('action.submit')}
      </Button>
    </Box>
  );
};

export default ForgotPasswordScreen;
