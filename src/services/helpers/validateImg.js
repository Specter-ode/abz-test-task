export const maxAllowedSizeError = file => {
  const maxAllowedSize = 5 * 1024 * 1024;
  const fileSize = file?.size;
  if (fileSize > maxAllowedSize) {
    return true;
  }
  return false;
};

export const maxWidthAndHeightError = file => {
  let img = new Image();

  img.src = window.URL.createObjectURL(file);
  img.onload = () => {
    if (img.width < 70 || img.height < 70) {
      return true;
    }
    return false;
  };
};
export const typeError = file => {
  return file.type !== 'image/jpeg' && file.type !== 'image/jpg';
};

export const checkImgName = (width, text) => {
  if (width < 768) {
    return {
      tooltip: text.length > 24,
      value: text.length > 24 ? text.slice(0, 22) + '...' : text,
    };
  }
  return {
    tooltip: text.length > 30,
    value: text.length > 30 ? text.slice(0, 28) + '...' : text,
  };
};

export const checkImageFormatFromDB = str => {
  // функция дает ответ соотвествует ли  формат файла полученный с сервера  необходимому "jpg" или "jpeg"
  const arr = str.split('');
  let startIndex;
  const testedWord = [];
  for (let i = arr.length - 1; i > 4; i -= 1) {
    if (arr[i] === '.') {
      startIndex = i;
      break;
    }
  }
  for (let j = startIndex + 1; j < arr.length; j += 1) {
    testedWord.push(arr[j]);
  }
  const result = testedWord.join('');
  if (result === 'jpg' || result === 'jpeg') {
    return true;
  }
  return false;
};
