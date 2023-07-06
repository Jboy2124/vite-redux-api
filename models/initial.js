module.exports = {
    initial(){
        try {
            return 'Hello, greetings from backend!'
        } catch (error) {
            console.log(error)
        }
    }
}