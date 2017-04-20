'use strict';

window.errorHandler = function (errorType, error) {
  var errorDiv = document.createElement('div');
  var errorDivStyle = errorDiv.style;
  var errorMessage;
  var errorStatus = 'Ошибка: ' + error;
  switch (errorType) {
    case 'statusErr':
      switch (error) {
        case 404:
          errorMessage = errorStatus + '. Страница не найдена.';
          break;
        case 403:
          errorMessage = errorStatus + '. Доступ запрещен.';
          break;
        case 401:
          errorMessage = errorStatus + '. Вы не авторизованы.';
          break;
        case 503:
          errorMessage = errorStatus + '. Сервер временно не доступен.';
          break;
        default:
          errorMessage = 'Что-то пошло не так.';
      }
      break;
    case 'timeoutErr':
      errorMessage = 'Запрос не успел выполниться за ' + error + 'мс';
      break;
    case 'connectionErr':
      errorMessage = error;
      break;
    default:
      errorMessage = 'Неизвестная ошибка.';
  }
  errorDivStyle.position = 'absolute';
  errorDivStyle.zIndex = '9999';
  errorDivStyle.top = '0';
  errorDivStyle.left = '0';
  errorDivStyle.padding = '20px';
  errorDivStyle.width = '100%';
  errorDivStyle.backgroundColor = 'red';
  errorDivStyle.color = '#ffffff';
  errorDivStyle.textAlign = 'center';
  errorDiv.innerHTML = '<p><b>' + errorMessage + '</b></p>';
  document.body.appendChild(errorDiv);
};
