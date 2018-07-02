const r = require('rethinkdb')

const config = require('../config/database')

let connection = r.connect(config).then(function(connection){
    module.exports.findAll = function(tableName){
        return r.table(tableName).run(connection).then(function(cursor){
            return cursor.toArray();
        })
    }

    module.exports.findById = function(tableName, id){
        return r.table(tableName).get(id).run(connection).then(function(cursor) {
            return cursor
        })
    }

    module.exports.insertNew = function(tableName, body){
        return r.table(tableName).insert(body).run(connection).then(function(){
            return body
        })
    }

    module.exports.update = function(tableName, id, body){
        return r.table(tableName).get(id).update(body).run(connection).then(function(){
            return body
        })
    }

    module.exports.delete = function(tableName, id){
        return r.table(tableName).get(id).delete().run(connection).then(function(){
            return { id: id, message: "deleted" }
        })
    }

})