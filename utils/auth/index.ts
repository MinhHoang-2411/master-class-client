import { COOKIE_KEYS } from '@/constants/common';
import { AuthModel } from '@/declares/models/AuthModels';
import Cookies from 'js-cookie';
import Router from 'next/router';

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const auth = window.localStorage.getItem(COOKIE_KEYS.accessToken);
    const accessToken = JSON.parse(auth as string)?.api_token;
    return accessToken;
  }
};
const getLanguage = () => {
  if (typeof window !== 'undefined') {
    const language = localStorage.getItem('appLocale');

    return language;
  }
};

const getAuth = (): AuthModel | undefined => {
  let lsValue: string | null = '';

  if (typeof window !== 'undefined') {
    lsValue = localStorage.getItem(COOKIE_KEYS.accessToken);
  }

  if (!lsValue) {
    return;
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
  }
};

const getSessionStorage = (key: string): any => {
  let lsValue: string | null = '';
  if (typeof window !== 'undefined') {
    lsValue = sessionStorage.getItem(key);
  }

  if (!lsValue) {
    return;
  }

  try {
    const auth: any = JSON.parse(lsValue);

    if (auth) {
      return auth;
    }
  } catch (error) {
    console.error('AUTH SESSION STORAGE PARSE ERROR', error);
  }
};

const setAuth = (auth: AuthModel | undefined) => {
  if (!localStorage) {
    return;
  }
  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(COOKIE_KEYS.accessToken, lsValue);
    if (window) {
      window.location.href = window.location.href.split('?')[0];
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(COOKIE_KEYS.accessToken);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
  }
};

const logout = () => {
  const pathName = window.location.pathname;
  if (
    pathName.includes('/login') ||
    pathName.includes('/classes') ||
    pathName.includes('categories')
  ) {
    localStorage.removeItem(COOKIE_KEYS.accessToken);
    window.localStorage.setItem('logout', Date.now().toString());
    Router.reload();
  } else {
    localStorage.removeItem(COOKIE_KEYS.accessToken);
    window.localStorage.setItem('logout', Date.now().toString());
    window.location.href = '/';
    Router.replace('/');
  }
};

export { getAuth, setAuth, removeAuth, logout, getSessionStorage, getAccessToken, getLanguage };
