
const randomId = (context, events, done) => {
  context.vars['id'] = Math.floor(Math.random() * 10000000);
  return done();
};

module.exports = { randomId };