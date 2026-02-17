const Log = function(status, method, path, params, headers, user){
    this.status     = status
    this.method     = method
    this.path       = path
    this.params     = params
    this.header     = headers
    this.user       = user
    this.timestamp  = (new Date().toISOString())
}

module.exports = Log