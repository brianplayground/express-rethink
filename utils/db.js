const r = require('rethinkdb')

const config = require('../config/database')

r.connect(config).then(function(connection){

    module.exports.findAll = (tableName) => {
        return r.table(tableName).run(connection).then((cursor) => {
            return cursor.toArray();
        })
    }

    module.exports.findById = (tableName, id) => {
        return r.table(tableName).get(id).run(connection).then((cursor) => {
            return cursor
        })
    }

    module.exports.insertNew = (tableName, body) => {
        return r.table(tableName).insert(body).run(connection).then(() => {
            return body
        })
    }

    module.exports.update = (tableName, id, body) => {
        return r.table(tableName).get(id).update(body).run(connection).then(() => {
            return body
        })
    }

    module.exports.delete = (tableName, id) => {
        return r.table(tableName).get(id).delete().run(connection).then(() =>{
            return { id: id, message: "deleted" }
        })
    }

})