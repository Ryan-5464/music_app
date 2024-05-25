const { Logger } = require("../handlers/Logger.js")
const path = require('path');
const script_name = path.basename(__filename);
const { get_function_name } = require("../helpers/get_function_name.js")


class TestLogger {
    test_logger(arg1, arg2) {
        const logger = new Logger()
        const args = Array.from(arguments)
        logger.log("error", "111", script_name, get_function_name(), "test message", this.name, Array.from(arguments))
    }
}

const test_logger = new TestLogger()
test_logger.test_logger("arg 1", "arg 2")