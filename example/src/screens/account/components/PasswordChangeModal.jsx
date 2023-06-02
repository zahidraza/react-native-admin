import * as React from 'react';
import { Modal, FormControl, Input, Button, useToast } from 'native-base';

import { useTranslate, useSafeState, useAuthProvider, isEmpty } from '@jazasoft/react-native-admin';

const validate = ({ oldPassword, newPassword, confirmNewPassword }) => {
  let errors = {};
  if (isEmpty(oldPassword)) {
    errors.oldPassword = 'Old Password Required';
  }
  if (isEmpty(newPassword)) {
    errors.newPassword = 'New Password Required';
  }
  if (isEmpty(confirmNewPassword)) {
    errors.confirmNewPassword = 'Confirm New Password Required';
  }
  if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
    errors.confirmNewPassword = 'Password do not match';
  }
  return errors;
};

const PasswordChangeModal = ({ isOpen, onClose }) => {
  const translate = useTranslate();
  const toast = useToast();
  const { changePassword } = useAuthProvider();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [formData, setFormData] = useSafeState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errors, setErrors] = useSafeState({});

  const onChangeText = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async () => {
    const errs = validate(formData);
    if (!isEmpty(errs)) {
      setErrors(errs);
    } else {
      await changePassword(formData);
      toast.show({
        description: translate('auth.message.password_change_success'),
      });
      setFormData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
      onClose && onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} justifyContent="flex-start" top="1/6" size="lg" initialFocusRef={initialRef} finalFocusRef={finalRef}>
      <Modal.Content>
        <Modal.Header>{translate('auth.heading.change_password')}</Modal.Header>
        <Modal.Body>
          <FormControl isInvalid={!isEmpty(errors.oldPassword)} isRequired>
            <FormControl.Label>{translate('auth.label.old_password')}</FormControl.Label>
            <Input
              ref={initialRef}
              type="password"
              placeholder={translate('auth.label.old_password')}
              value={formData.oldPassword}
              onChangeText={(text) => onChangeText('oldPassword', text)}
            />
            <FormControl.ErrorMessage>{errors.oldPassword}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt="3" isInvalid={!isEmpty(errors.newPassword)} isRequired>
            <FormControl.Label>{translate('auth.label.new_password')}</FormControl.Label>
            <Input
              type="password"
              placeholder={translate('auth.label.new_password')}
              value={formData.newPassword}
              onChangeText={(text) => onChangeText('newPassword', text)}
            />
            <FormControl.ErrorMessage>{errors.newPassword}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt="3" isInvalid={!isEmpty(errors.confirmNewPassword)} isRequired>
            <FormControl.Label>{translate('auth.label.confirm_new_password')}</FormControl.Label>
            <Input
              ref={finalRef}
              type="password"
              placeholder={translate('auth.label.confirm_new_password')}
              value={formData.confirmNewPassword}
              onChangeText={(text) => onChangeText('confirmNewPassword', text)}
            />
            <FormControl.ErrorMessage>{errors.confirmNewPassword}</FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
        <Modal.Footer py="3">
          <Button.Group space={2}>
            <Button py="1.5" px="6" mt="0" variant="ghost" onPress={onClose}>
              {translate('action.cancel')}
            </Button>
            <Button py="1.5" px="6" mt="0" onPress={onSubmit}>
              {translate('action.submit')}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default PasswordChangeModal;
