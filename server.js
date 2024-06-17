const express = require('express');
const cors = require('cors');

const port = 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/statsinfo', require('./routes/statsRoute'))
app.use('/topitems', require('./routes/topRatedRoute'))
app.use('/lowstock', require('./routes/lowStockItems'))
app.use('/inventory', require('./routes/inventoryRoute'))
app.use('/deletedItems', require('./routes/deletedRoute'))
app.use('/create', require('./routes/createRoute'))

app.listen(port, () => console.log(`Listening to ${port}`))