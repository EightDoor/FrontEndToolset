module.exports = process.env.NODE_ENV === 'production' ? require("./dist/comm_variable/comm_variable.json") : require("../src/comm_variable/comm_variable.json")
