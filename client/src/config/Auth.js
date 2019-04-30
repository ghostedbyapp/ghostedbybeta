import FB from './FB'

class Auth {

    constructor() {

        FB.auth().onAuthStateChanged(user => {

            if (user) {
                this.authenticated = true
                console.log("this.authenticated", this.authenticated)
            }
            else {
                this.authenticated = false
                console.log("this.authenticated", this.authenticated)
            }
        })
    }

    login(cb) {
        this.authenticated = true
        cb()
    }

    logout(cb) {
        this.authenticated = false
        cb()
    }

    isAuthenticated() {
        return this.authenticated
    }
}

export default new Auth();
