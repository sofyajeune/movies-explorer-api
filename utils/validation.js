// Регулярные выражения для валидации url и email
const validationEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validationUrl = /^(http|https):\/\/[^"]+\.\w{2,}/;

module.exports = {
  validationUrl,
  validationEmail,
};
