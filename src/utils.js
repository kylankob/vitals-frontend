export const CONTRACT_ADDRESS = "0x4282711AE0877EF13000F8D61ba91a8B6967E5ec"; // ropsten
export const CHAIN_ID = 3; // ropsten

export function isFieldError(array, val) {
  return array.includes(val);
}

export function createMarkup(html) {
  return { __html: html };
}

const isBrowser = () => typeof window !== "undefined";

export const setValToLS = (key, val, useSessionStorage = false) => {
  if (isBrowser() && val) {
    useSessionStorage
      ? window.sessionStorage.setItem(key, val)
      : window.localStorage.setItem(key, val);
  } else {
    useSessionStorage
      ? window.sessionStorage.removeItem(key)
      : window.localStorage.removeItem(key);
  }
  return true;
};

export const getValFromLS = (key, useSessionStorage = false) => {
  if (useSessionStorage) {
    return isBrowser() && window.sessionStorage.getItem(key)
      ? window.sessionStorage.getItem(key)
      : undefined;
  } else {
    return isBrowser() && window.localStorage.getItem(key)
      ? window.localStorage.getItem(key)
      : undefined;
  }
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

export function monthsSelect() {
  let array = [
    {
      value: "",
      name: "--",
    },
  ];
  months.forEach((item, index) => {
    let mo = index + 1;
    if (mo < 10) {
      mo = `0${mo}`;
    } else {
      mo = `${mo}`;
    }

    array.push({
      value: mo,
      name: item,
    });
  });

  return array;
}

export function daysSelect() {
  let array = [
    {
      value: "",
      name: "--",
    },
  ];
  days.forEach((item) => {
    array.push({
      value: item < 10 ? `0${item}` : `${item}`,
      name: item,
    });
  });

  return array;
}

export function today() {
  const d = new Date();

  const monthIndex = d.getMonth();
  const day = d.getDate();
  const year = d.getFullYear();

  return `${months[monthIndex]} ${day}, ${year}`;
}
