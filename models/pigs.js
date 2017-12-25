var nano = require('nano')('http://localhost:5984');

var db = nano.db.use('nokdondb');

module.exports = {
  insert(key, obj, callback) {
    //console.log(key);
    db.insert(obj, key, (err, body, header) => {
      if (err) {
        console.log('[insert] ' + err.message);
      }
      //console.log('Updated pig');
      //console.log(body);
      callback(body);
    })
  },

  insertObjs(objsArr) {
    
  },

  update(key, obj, callback) {
    db.get(key, (error, existing) => { 
      if(!error) obj._rev = existing._rev;
      db.insert(obj, key, callback);
    });
  },

  
  /**
   * Run Query
   * @param {json} queryString 
   */
  runQuery(queryString, callback) {
    db.list(queryString, (err, body) => {
      if (!err) {
        //console.log(body)
        callback(body);
        /*
        body.rows.forEach(function(doc) {
          console.log(doc.length);
        });
        if (body.rows == 0)
          console.log('0')
        */
      }
    })
  },
}