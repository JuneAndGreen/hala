'use strict';

const path = require('path');
const Hala = require('../index');

new Hala(path.join(__dirname, './hala.js'));

new Hala(path.join(__dirname, './hala2.js'));