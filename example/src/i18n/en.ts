import type { TranslationMessages } from '@jazasoft/react-native-admin';

const englishTranslationMessages: TranslationMessages = {
  app: {
    name: 'OptaFloor',
    description: 'Supervisor',
    copyright: 'Jaza Software',
  },
  Screens: {
    RoleSelector: {
      name: 'Choose Role',
      message: {
        select_role: 'Select Role',
      },
    },
    AccountTab: {
      name: 'Account',
    },
    Account: {
      name: 'Account',
      title: {
        profile: 'Profile',
        settings: 'Settings',
      },
      lang: {
        title: 'Choose Language',
        label: 'Language',
      },
      theme: {
        title: 'Choose Theme',
        label: 'Theme',
        value_automatic: 'Automatic',
        value_light: 'Light',
        value_dark: 'Dark',
      },
      role: {
        title: 'Choose Role',
        label: 'Role',
      },
      profile: {
        full_name: 'Full Name',
        department: 'Department',
        line: 'Line',
      },
    },
    Test: {
      name: 'Test',
    },
    Test2: {
      name: 'Test 2',
    },
  },
  action: {
    add: 'Add',
    create: 'Create',
    save: 'Save',
    next: 'Next',
    submit: 'Submit',
    back: 'Back',
    confirm: 'Confirm',
    cancel: 'Cancel',
    delete: 'Delete',
    remove: 'Remove',
    edit: 'Edit',
    update: 'Update',
    refresh: 'Refresh',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    toggle_theme: 'Toggle Theme',
  },
  message: {
    are_you_sure: 'Are you sure?',
    bulk_delete_content: {
      one: 'Are you sure you want to delete this %{element}?',
      other: 'Are you sure you want to delete these %{count} %{elements}?',
    },
    bulk_delete_title: {
      one: 'Delete %{element}',
      other: 'Delete %{count} %{element}',
    },
    bulk_update_content: {
      one: 'Are you sure you want to update this %{element}?',
      other: 'Are you sure you want to update these %{count} %{elements}?',
    },
    bulk_update_title: {
      one: 'Update %{element}',
      other: 'Update %{count} %{element}',
    },
    delete_content: 'Are you sure you want to delete this item?',
    delete_title: 'Delete %{name}',
    error: "A client error occurred and your request couldn't be completed.",
    invalid_form: 'The form is not valid. Please check for errors',
    loading: 'The page is loading, just a moment please',
    no: 'No',
    yes: 'Yes',
  },
  filter: {
    label: 'Filter',
    sort_by: 'Sort By',
    apply: 'Apply',
    clear: 'Clear',
    location: {
      department: 'Department',
      line: 'Line',
      section: 'Section',
    },
  },
  auth: {
    label: {
      username: 'Username',
      password: 'Password',
      old_password: 'Old Password',
      new_password: 'New Password',
      confirm_new_password: 'Confirm New Password',
      otp: 'OTP',
    },
    button: {
      login: 'Login',
      logout: 'Logout',
      forgot_password: 'Forgot Password?',
      change_password: 'Change Password',
    },
    heading: {
      change_password: 'Change Password',
    },
    message: {
      login_error: 'Authentication failed, please retry',
      password_change_success: 'Password changed successfully',
      unsupported_role: 'Roles - [ %{roleIds} ] is not supported in mobile app. Supported roles are - [ %{roles} ]',
    },
  },
  notification: {
    updated: {
      zero: '%{count} %{elements} updated',
      one: '%{element} updated',
      other: '%{count} %{elements} updated',
    },
    created: 'Element created',
    deleted: {
      zero: '%{count} %{elements} deleted',
      one: '%{element} deleted',
      other: '%{count} %{elements} deleted',
    },
    item_doesnt_exist: '%{element} does not exist',
    server_error: 'Server communication error',
    i18n_error: 'Cannot load the translations for the specified language',
    canceled: 'Action cancelled',
    logged_out: 'Your session has ended, please reconnect.',
    not_authorized: "You're not authorized to access this resource.",
  },
  validation: {
    required: 'Required',
    minLength: 'Must be %{min} characters at least',
    maxLength: 'Must be %{max} characters or less',
    minValue: 'Must be at least %{min}',
    maxValue: 'Must be %{max} or less',
    number: 'Must be a number',
    email: 'Must be a valid email',
    oneOf: 'Must be one of: %{options}',
    regex: 'Must match a specific format (regexp): %{pattern}',
  },
};

export default englishTranslationMessages;
