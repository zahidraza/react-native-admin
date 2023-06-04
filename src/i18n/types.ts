export interface StringMap {
  [key: string]: StringMap | string | undefined;
}

export interface Translations {
  [key: string]: TranslationMessages;
}

type Plural = {
  zero?: string;
  one: string;
  other: string;
};

export interface TranslationMessages extends StringMap {
  action: {
    // for custom translation strings
    [key: string]: StringMap | string;
    add: string;
    create: string;
    save: string;
    submit: string;
    back: string;
    confirm: string;
    cancel: string;
    delete: string;
    remove: string;
    edit: string;
    update: string;
    refresh: string;
    search: string;
    filter: string;
    sort: string;
    toggle_theme: string;
  };
  message: {
    [key: string]: StringMap | string;
    are_you_sure: string;
    bulk_delete_content: Plural;
    bulk_delete_title: Plural;
    bulk_update_content: Plural;
    bulk_update_title: Plural;
    delete_content: string;
    delete_title: string;
    error: string;
    loading: string;
    no: string;
    yes: string;
  };
  auth: {
    [key: string]: StringMap | string;
  };
  notification: {
    [key: string]: StringMap | string;
    updated: Plural | string;
    created: string;
    deleted: Plural | string;
    item_doesnt_exist: string;
    server_error: string;
    canceled: string;
    logged_out: string;
    not_authorized: string;
  };
  validation: {
    [key: string]: StringMap | string;
    required: string;
    minLength: string;
    maxLength: string;
    minValue: string;
    maxValue: string;
    number: string;
    email: string;
    oneOf: string;
    regex: string;
  };
}
