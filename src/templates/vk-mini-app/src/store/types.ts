export type ApiResponse<T> = {
  response?: T;
  error?: any;
  errorData?: any;
};

export interface ApiVkResponse<T> {
  response?: T;
  error?: any;
}

export interface VkUser {
  first_name: string;
  id: number;
  last_name: string;
}

export enum FlagsEnum {
  finishedOnboarding = 'onboarding',
}

export const normalizeAuth = (data: any) => {
  const { user, messages_allowed } = data;
  return {
    isAllowGroupMessages: messages_allowed,
  };
};
