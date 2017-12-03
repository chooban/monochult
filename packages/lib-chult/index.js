const chult = require('./lib/chult');

for (var i = 0; i < 10; i++) {
  console.log(`Day ${i+1}: ${JSON.stringify(chult.day(), null, 2)}\n\n`);
}
